<template>
<draggable class="equip">
    <template slot="header">
    </template>
    <template slot="main" >
        <div v-if="equip.quality">
            <span class="title">· 强化 ·</span>
            <div class="info">
                <div class="name" :style="{color:equip.quality.color}">
                    {{ equip.description.name }}
                </div>
                <div class='icon'>
                    <img :src="equip.description.iconSrc" alt="icon">
                </div>
                <span class="enhanceLv">
                    <div v-if="equip.enhanceLv >= equip.maxEnhanceLv" style="color:#c00;">强化等级已达到上限</div>
                    强化等级：{{equip.enhanceLv+'/'+equip.maxEnhanceLv}}
                </span>
            </div>
            <div class="enhance">
                <div class="beforeEnhance">
                    <div v-for="v in equip.baseEntry" :key="v.id">
                        <div>
                            <span>{{v.name}} : {{v.showVal}}</span> 
                            <!-- <span v-if="equip.enhanceLv>0">&nbsp;({{v.base}}&nbsp;
                                <span style="color:#ABF6F4">+{{v.value-v.base}}</span>)
                            </span> -->
                        </div>
                    </div>
                </div>
                <span class="pointer" v-show="equip.enhanceLv < equip.maxEnhanceLv">→</span>
                <div class="afterEnhance" v-show="equip.enhanceLv < equip.maxEnhanceLv">
                    <div v-for="v in equip.baseEntry" :key="v.id">
                        <div>
                            &nbsp;{{Math.floor(v.base*(1+(equip.enhanceLv+1)*0.1))}}
                            <span class="bonus">
                                ↑({{Math.floor(v.base*(1+(equip.enhanceLv+1)*0.1)-v.value)}})
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <span class="cost" :class="{'warning':warning}" v-show="equip.enhanceLv < equip.maxEnhanceLv">消耗金币：{{cost}}</span> -->
            <span class="cost" :class="{'warning':warning}">
                消耗<img :src="'/icons/item/'+imgSrc+'.png'">&nbsp;{{cost}}/{{itemQty}}
            </span>
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
import { assist } from '../../assets/js/assist';
import draggable from '../uiComponent/draggable'
export default {
    name: "equipEnhance",
    mixins: [assist, ],
    components: {draggable},
    data() {
        return {
            material: '',
            imgSrc: ''
        };
    },
    props: {
        equip: {
            type:Object
        }
    },
    watch: {
        equip() {
            this.targetLv = this.equip.enhanceLv+1;
            this.setMaterial();
        }
    },
    computed: {
        cost() {
            var cost = this.equip.enhanceLv%5+1;
            return cost;
        },
        smith() {
            return this.$store.state.guildAttribute.smith;
        },
        maxLv() { return this.equip.maxEnhanceLv; },
        minLv() { return this.equip.enhanceLv+1; },
        warning() {
            return this.itemQty < this.cost;
        },
        item() {
            var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            var item = itemInfo.findItem(this.material);
            if(item == -1)
                return {quantity: 0};
            else
                return backpack.itemGrid[item];
        },
        itemQty() {
            var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            var qty = itemInfo.getItemQty(this.material);
            return qty;
        }
    },
    methods: {
        enhance() {
            if(this.warning) {
                return;
            }
            var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            itemInfo.removeItemByItem(this.item, this.cost);

            // backpack.lockEquipment(true);
            this.equip.locked = true;
            backpack.$forceUpdate();
            this.equip.enhanceLv = this.equip.enhanceLv + 1;
            var equipInfo = this.findBrothersComponents(this, 'equipInfo', false)[0];
            equipInfo.enhanceBaseEntryValue(this.equip);
            equipInfo.activePotential(this.equip);
            this.setMaterial();
            this.$store.commit('set_player_attribute');
        },
        setMaterial() {
            var index = Math.floor(this.equip.enhanceLv/5);
            console.log(index)
            var names = ['低级强化石', '中级强化石', '高级强化石', '顶级强化石', '终极强化石']
            var img = ['inv_misc_gem_diamond_05', 'inv_misc_gem_diamond_04', 'inv_misc_gem_diamond_03', 'inv_misc_gem_diamond_02', 'inv_misc_gem_diamond_01']
            this.material = names[index];
            this.imgSrc = img[index];
        },
        closeInfo() {
            var index = this.findComponentUpward(this, 'index');
            index.closeInfo('enhance');
        }
    }
}
</script>
<style lang="scss" scoped>
.equip {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 28rem;
    width: 48rem;
    background-image: url("/icons/enhancePanel2.png");
    background-repeat: no-repeat;
    background-size: 49rem 28rem;
    z-index: 10;
    .title {
        position: absolute;
        top: 1.4rem;
        left: 0;
        right: 0;
        font-weight: bold;
        font-size: 1.5rem;
    }
    .info {
        position: absolute;
        width: 50%;
        .name {
            position: relative;
            top: 11rem;
            left: 2.5rem;
        }
        .icon {
            position: relative;
            top: 12rem;
            left: 2.5rem;
        }
        .enhanceLv {
            position: relative;
            top: 15rem;
            left: 2.5rem;
        }
    }
    .enhance {
        position: absolute;
        margin-left: 55%;
        margin-top: 10%;
        width: 50%;
        height: 55%;
        display: flex;
        align-items: center;
        justify-content: center;
        .beforeEnhance {
            margin-left: 1rem;
            text-align: left;
            // width: 40%;
        }
        .afterEnhance {
            // width: 20%;
            .bonus {
                color: #0f0;
            }
        }
    }
    .warning {
        color: #D8000C;
    }
    .cost {
        position: absolute;
        top: 19rem;
        left: 35rem;
        bottom: 1.2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        img {
            height: 2rem;
            width: 2rem;
        }
    }    
    .confirm {
        position: absolute;
        top: 21rem;
        left: 35rem;
        height: 2.5rem;
        width: 8rem;
        background-image: url("/icons/button.png");
        background-repeat: no-repeat;
        background-size: 8rem 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        opacity: 0.8; 
        &:hover {
            opacity: 1; 
        }
    }
    .cancel {
        position: absolute;
        top: 24rem;
        left: 35rem;
        height: 2.5rem;
        width: 8rem;
        background-image: url("/icons/button.png");
        background-repeat: no-repeat;
        background-size: 8rem 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        opacity: 0.8; 
        &:hover {
            opacity: 1; 
        }
    }
}
</style>