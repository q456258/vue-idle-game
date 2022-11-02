<template>
<draggable class="equipPanel">
    <template slot="header">
    </template>
    <template slot="main" >
        <div v-if="equip.quality">
            <span class="title">· 强化 ·</span>
            <div class="info">
                <div class="name" :style="{color:equip.quality.color}">
                    {{ equip.description.name }}
                </div>
                <div class="largeIconContainer">
                    <del :class="[{grey:equip.quality.qualityLv==1, green:equip.quality.qualityLv==3, blue:equip.quality.qualityLv==4, purple:equip.quality.qualityLv==5, orange:equip.quality.qualityLv==5}, 'largeIcon iconBorder']"></del>
                    <img :src="equip.description.iconSrc" alt="icon" />
                </div>
                <span class="enhanceLv">
                    强化等级: {{equip.enhanceLv}}
                    <small v-if="enhanceable">{{currentProgress+'/'+req[equip.enhanceLv]}} </small>
                    <div v-if="!enhanceable" style="color:#c00;">强化等级已达到上限</div>
                    <div v-else>
                        <div class="progress">
                            <div class="progress-bar" :style="{width:currentProgress/req[equip.enhanceLv]*100+'%'}">
                            </div>
                        </div>
                    </div>
                </span>
            </div>
            <div class="addonGrid">
                <div class="icon"  style="cursor:pointer" @click="addMaterial($event, k)" @contextmenu="redMaterial($event, k)" v-for="(v, k) in gemType" :key="k">
                    <div class="mediumIconContainer" :style="{'box-shadow': 'inset 0 0 7px 2px ' + itemType[v].quality.color }">
                        <del :class="[{grey:itemType[v].quality==1, green:itemType[v].quality==3, blue:itemType[v].quality==4, purple:itemType[v].quality==5, orange:itemType[v].quality==5}, 'mediumIcon iconBorder']"></del>
                        <img :src="'./icons/item/'+v+'.jpg'" alt="" />
                    </div>
                    <div class="quantity">
                        {{applied[k]+'/'+itemQty[k]}}
                    </div>
                </div>
            </div>
            <div class="enhance" v-if="enhanceable">
                <div class="beforeEnhance">
                    <div v-for="v in equip.baseEntry" :key="v.id">
                        <div>
                            <span>{{v.name}} + {{Math.floor(v.base*(1+(equip.enhanceLv+1)*0.1))}}</span> 
                            <span class="bonus">
                                ↑({{Math.floor(v.base*(1+(equip.enhanceLv+1)*0.1)-v.value)}})
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="confirm" @click="enhance()" v-show="equip.enhanceLv < equip.maxEnhanceLv">
                强化
            </div>
            <div class="cancel" @click="closeInfo()">
                取消
            </div>
        </div>
    </template>
</draggable>
</template>
<script>


import { itemConfig } from '../../assets/config/itemConfig';
import draggable from '../uiComponent/draggable'
export default {
    name: "equipEnhance",
    mixins: [itemConfig],
    components: {draggable},
    data() {
        return {
            value: [1, 5, 10, 25, 100],
            req: [1, 2, 3, 4, 5, 
                10, 15, 20, 25, 30,
                50, 60, 70, 80, 90, 
                150, 175, 200, 225, 250, 
                400, 450, 500, 550, 600 ],
            gemType: ['inv_misc_gem_diamond_05', 'inv_misc_gem_diamond_04', 'inv_misc_gem_diamond_03', 'inv_misc_gem_diamond_02', 'inv_misc_gem_diamond_01'],
            applied: [],
            currentProgress: 0,

        };
    },
    mounted() {
        this.$store.globalComponent.equipEnhance = this;
    },
    props: {
        equip: {
            type:Object
        }
    },
    watch: {
        equip() {
            if(this.equip.enhanceCur == undefined)
                this.equip.enhanceCur = 0;
            this.currentProgress = this.equip.enhanceCur
            this.targetLv = this.equip.enhanceLv+1;
            this.applied = new Array(this.gemType.length).fill(0, 0, this.gemType.length);
        }
    },
    computed: {
        enhanceable() {
            return this.equip.enhanceLv < this.equip.maxEnhanceLv;
        },
        itemQty() {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let qtys = [];
            for(let i=0; i<this.gemType.length; i++) {
                qtys[i] = itemInfo.getItemQty(this.gemType[i]);
            }
            return qtys;
        }
    },
    methods: {
        enhance() {
            if(!this.enhanceable) {
                return;
            }
            this.consumeGem();

            this.equip.locked = true;
            if(this.equip.enhanceCur >= this.req[this.equip.enhanceLv]) {
                this.equip.enhanceCur -= this.req[this.equip.enhanceLv];
                this.currentProgress -= this.req[this.equip.enhanceLv];
                this.equip.enhanceLv += 1;
                let equipInfo = this.$store.globalComponent["equipInfo"];
                equipInfo.enhanceBaseEntryValue(this.equip);
                equipInfo.activePotential(this.equip);
                this.$store.commit('set_player_attribute');
            }
        },
        consumeGem() {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let cur = this.equip.enhanceCur;
            let max = this.req[this.equip.enhanceLv];
            for(let i=this.gemType.length-1; i>=0; i--) {
                let count = Math.min(this.applied[i], Math.ceil((max-cur)/this.value[i]));
                if(count > 0) {
                    this.applied[i] -= count;
                    cur += this.value[i]*count;
                    itemInfo.removeItemByCode(this.gemType[i], count);
                }
                if(cur >= max)
                    break;
            }
            this.equip.enhanceCur = cur;
        },
        addMaterial(event, k) {
            if(this.applied[k] >= this.itemQty[k])
                return;
            let qty = 1;
            if(event.shiftKey)
                qty = this.itemQty[k]-this.applied[k];
            this.currentProgress += this.value[k]*qty;
            this.applied[k] += qty;
        },
        redMaterial(event, k) {
            if(this.applied[k] <= 0)
                return;
            let qty = 1;
            if(event.shiftKey)
                qty = this.applied[k];
            this.currentProgress -= this.value[k]*qty;
            this.applied[k] -= qty;
        },
        closeInfo() {
            let index = this.$store.globalComponent["index"];
            index.closeInfo('enhance');
        }
    }
}
</script>
<style lang="scss" scoped>
.addonGrid {
    position: absolute;
    margin-top: 50%;
    width: 60%;
}
</style>