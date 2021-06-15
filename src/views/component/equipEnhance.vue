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
            <span class="cost" :class="{'warning':warning}" v-show="equip.enhanceLv < equip.maxEnhanceLv">消耗金币：{{cost}}</span>
            <span class="successRate" v-show="equip.enhanceLv < equip.maxEnhanceLv">
                成功率：{{successRate+'%'}}
                <span class="smith">{{"&nbsp;+"+(Math.round(successRate*smith)/100)+"%"}}</span>
            </span>
            <span class="auto" v-show="!autoing && equip.enhanceLv < equip.maxEnhanceLv">
                <input type="checkbox" v-model="auto">自动
                <br>
                <input class="target" type="number" :value="targetLv" @input="updateTargetLv" :max="maxLv" :min="minLv" />
            </span>
            <div class="confirm" @click="enhance()" v-show="!autoing && !auto && equip.enhanceLv < equip.maxEnhanceLv">
                强化
            </div>
            <div class="confirm" @click="autoEnhance()" v-show="!autoing && auto && equip.enhanceLv < equip.maxEnhanceLv">
                自动强化
            </div>
            <div class="confirm" @click="stopAutoEnhance()" v-show="autoing">
                中断···
            </div>
            <span class="msg" ref="info"></span>
            <div class="cancel" @click="closeInfo()" v-show="!autoing">
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
            auto: false,
            autoing: false,
            targetLv: 10,
            autoTimer: 0
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
        }
    },
    computed: {
        cost() {
            var cost = 5;
            cost *= (1+this.equip.lv)*this.equip.enhanceLv+10;
            return cost;
        },
        smith() {
            return this.$store.state.guildAttribute.smith;
        },
        warning() {
            return this.$store.state.guildAttribute.gold < this.cost;
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
        actualRate() {
            var rate = this.successRate;
            rate *= (1+this.smith/100);
            return Math.round(rate*100)/100;
        },
        maxLv() { return this.equip.maxEnhanceLv; },
        minLv() { return this.equip.enhanceLv+1; }
    },
    methods: {
        enhance() {
            if(this.$store.state.guildAttribute.gold < this.cost) {
                this.autoing = false;
                clearInterval(this.autoTimer);
                return;
            }
            this.$store.state.guildAttribute.gold -= this.cost;
            if(Math.random()*100 >= this.actualRate){
                this.enhanceInfo("强化失败", "fail");
                return;
            }
            this.enhanceInfo("强化成功", "success");
            var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            // backpack.lockEquipment(true);
            this.equip.locked = true;
            backpack.$forceUpdate();
            this.equip.enhanceLv = this.equip.enhanceLv + 1;
            var equipInfo = this.findBrothersComponents(this, 'equipInfo', false)[0];
            equipInfo.recomputeBaseEntryValue(this.equip);
            equipInfo.activePotential(this.equip);
            this.$store.commit('set_player_attribute');
        },
        autoEnhance() {
            this.autoing = true;
            this.autoTimer = setInterval(() => {
                if(this.equip.enhanceLv >= this.targetLv) {
                    this.autoing = false;
                    clearInterval(this.autoTimer);
                }
                this.enhance();
            }, 100);
        },
        stopAutoEnhance() {
            this.autoing = false;
            clearInterval(this.autoTimer);
        },
        enhanceInfo(info, type) {
            var element = this.$refs['info'];
            var node = document.createElement("DIV");
            var textnode = document.createTextNode(info);
            node.appendChild(textnode);
            element.appendChild(node); 
            node.style.position = 'absolute';
            node.style.width = '10rem';
            node.style.color = type=='success'?'#0f0' : '#f00';
            node.style.top = '-0.5rem';
            node.style.left = '-1rem';
            node.animate([{transform: 'translate(0px)', opacity: 1},
                {transform: 'translate(' + (0) + 'px, '+ (-50) + 'px)', opacity: 0.5}], { duration: 1000, ease:'ease-in', iterations: 1});
            setTimeout(()=>{
                element.removeChild(node);
            },900);
        },
        updateTargetLv(e) {
            var value = e.target.value;
            if(value > this.equip.enhanceLv && value <= this.equip.maxEnhanceLv)
                this.targetLv = e.target.value;
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
        top: 10rem;
        left: 35rem;
        bottom: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
    }
    .successRate {
        position: absolute;
        top: 11.5rem;
        left: 35rem;
        bottom: 0rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        .smith {
            color:#0f0;
            font-size: 0.8rem;
        }
    }
    .auto {
        position: absolute;
        top: 21rem;
        left: 31rem;
        bottom: 0rem;
        .target {
            width: 3rem;    
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 0.2rem;
            font-size: 1rem;
            background-color: #e0e8ea;
        }
    }
    .msg {
        position: absolute;
        top: 21rem;
        left: 35rem;
        font-size: 1.3rem;
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