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
                    <del :class="[{grey:equip.quality.qualityLv==1, green:equip.quality.qualityLv==3, blue:equip.quality.qualityLv==4, purple:equip.quality.qualityLv==5, orange:equip.quality.qualityLv==6}, 'largeIcon iconBorder']"></del>
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
                        <del :class="[{grey:itemType[v].quality==1, green:itemType[v].quality==3, blue:itemType[v].quality==4, purple:itemType[v].quality==5, orange:itemType[v].quality==6}, 'mediumIcon iconBorder']"></del>
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
                            <span>{{v.name}} + {{Math.floor(v.base*(1+(equip.enhanceLv+1)*enhanceBonus))}}</span> 
                            <span class="bonus">
                                ↑({{Math.floor(v.base*(1+(equip.enhanceLv+1)*enhanceBonus)-v.value)}})
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <span  class="check_box actions"><input type="checkbox" name="" v-model="autoApply" @click="autoApplyGem(!autoApply)">自动添加</span>
            <div class="confirm actions image_button" @click="enhance()" v-show="equip.enhanceLv < equip.maxEnhanceLv">
                强化
            </div>
            <div class="cancel actions image_button" @click="closeInfo()">
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
            req: [
                1, 2, 3, 4, 5, 
                20, 30, 40, 50, 60, 
                150, 200, 250, 300, 350, 
                500, 600, 700, 800, 900, 
                1200, 1400, 1600, 1800, 2000  
            ],
            gemType: ['inv_misc_gem_diamond_05', 'inv_misc_gem_diamond_04', 'inv_misc_gem_diamond_03', 'inv_misc_gem_diamond_02', 'inv_misc_gem_diamond_01'],
            applied: [],
            autoApply: false,
            currentProgress: 0,
            enhanceBonus: 0.2


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
            this.targetLv = this.equip.enhanceLv+1;
            this.clearProgress();
            this.autoApplyGem();
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
                let quest = this.$store.globalComponent["quest"];
                quest.trackProgress('event', 5, 1);
            }
            this.autoApplyGem();
        },
        clearProgress() {
            this.currentProgress = this.equip.enhanceCur
            this.targetLv = this.equip.enhanceLv+1;
            this.applied = new Array(this.gemType.length).fill(0, 0, this.gemType.length);
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
        // 并非完美解, dp太消耗资源了
        autoApplyGem(autoApply) {
            if(autoApply==null)
                autoApply = this.autoApply;
            if(!autoApply)
                return;
            this.clearProgress();
            let req = this.req[this.equip.enhanceLv] - this.equip.enhanceCur;
            let gemTypes = this.value.length;
            let gemToApply = new Array(gemTypes).fill(0);
            let maxPoint = this.getMaxEnhancePoint();
            if(maxPoint <= req) {
                for(let i=0; i<gemTypes; i++) {
                    gemToApply[i] = this.itemQty[i];
                }
            } else {
                gemToApply = this.addGemsFloor(req);
                let remain = req - this.getEnhancePoint(gemToApply);
                remain = this.addGemsCeil(remain, gemToApply);
                this.removeOverflow(-1*remain, gemToApply);
            }
            
            for(let i=0; i<gemTypes; i++) {
                this.addMaterial({}, i, gemToApply[i]);
            }
        },
        // 获取一个数组可提供的强化点数
        getEnhancePoint(gemToApply) {
            let total = 0;
            let len = this.value.length;
            for(let i=0; i<len; i++) {
                total += gemToApply[i]*this.value[i];
            }
            return total;
        },
        // 获取拥有的强化石可提供的强化点数上限
        getMaxEnhancePoint() {
            let total = 0;
            let len = this.value.length;
            for(let i=0; i<len; i++) {
                total += this.itemQty[i]*this.value[i];
            }
            return total;
        },
        // 初始化数组, 从上往下计算, 材料充足可直接获取最优解
        addGemsFloor(req) {
            let len = this.value.length;
            let gemToApply = new Array(len).fill(0);
            for(let i=len-1; i>=0; i--) {
                if(req == 0)
                    break;
                let count = Math.floor(req/this.value[i]);
                count = Math.min(this.itemQty[i], count);
                let val = this.value[i]*count;
                req -= val;
                gemToApply[i] = count;
            }
            return gemToApply;
        },
        // 从下往上计算, 低级强化石不足以支撑最优解时, 允许溢出以达到目标强化点数, 部分情况非最优解
        addGemsCeil(req, gemToApply) {
            let len = this.value.length;
            for(let i=0; i<len-1; i++) {
                if(req == 0)
                    break;
                let count = Math.ceil(req/this.value[i]);
                count = count>=0 ? count : 0;
                count = Math.min(this.itemQty[i], count);
                let val = this.value[i]*count;
                req -= val;
                gemToApply[i] += count;
            }
            return req;
        },
        // 从下往上计算可能会导致溢出强化点数过多, 对溢出的进行一波优化
        removeOverflow(req, gemToApply) {
            let len = this.value.length;
            for(let i=0; i<len-1; i++) {
                if(req == 0)
                    return;
                let count = Math.floor(req/this.value[i]);
                count = count>=0 ? count : 0;
                count = Math.min(this.itemQty[i], count);
                let val = this.value[i]*count;
                req -= val;
                gemToApply[i] -= count;
            }
        },
        addMaterial(event, k, qty=1) {
            if(this.applied[k] >= this.itemQty[k])
                return;
            // let qty = 1;
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