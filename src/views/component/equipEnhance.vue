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
            <span class="cost" :class="{'warning':warning}" v-show="equip.enhanceLv < equip.maxEnhanceLv">消耗金币：{{cost}}</span>
            <span class="successRate" v-show="equip.enhanceLv < equip.maxEnhanceLv">成功率：{{successRate+'%'}}</span>
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
import { assist } from '../../assets/js/assist';
import draggable from '../uiComponent/draggable'
export default {
    name: "equipEnhance",
    mixins: [assist, ],
    components: {draggable},
    data() {
        return {
        };
    },
    props: {
        equip: {
            type:Object
        }
    },
    computed: {
        cost() {
            var cost = 5;
            cost *= (1+this.equip.lv)*this.equip.enhanceLv+10;
            return cost;
        },
        warning() {
            return this.$store.state.villageAttribute.gold < this.cost;
        },
        successRate() {
            var rate = 100;
            var target = this.equip.enhanceLv + 1;
            if(target<=10)
                rate -= (target-1)*10;
            else
                rate = 10*0.85**(target-10);
            return Math.round(rate*100)/100;
        },
    },
    methods: {
        enhance() {
            if(this.$store.state.villageAttribute.gold < this.cost)
                return;
            this.$store.state.villageAttribute.gold -= this.cost;
            this.equip.enhanceLv = this.equip.enhanceLv + 1;
            var equipInfo = this.findBrothersComponents(this, 'equipInfo', false)[0];
            equipInfo.recomputeBaseEntryValue(this.equip);
            equipInfo.activePotential(this.equip);
            this.$store.commit('set_player_attribute');
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
            width: 40%;
        }
        .afterEnhance {
            width: 20%;
            .bonus {
                color: #0f0;
            }
        }
        .warning {
            color: #D8000C;
        }
        .cost {
            position: absolute;
            bottom: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
        }
        .successRate {
            position: absolute;
            bottom: 0rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
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