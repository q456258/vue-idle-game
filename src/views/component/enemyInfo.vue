<template>
<div class="enemy">{{attr.name+" (Lv:"+attr.lv+")"}}
    <hpmpBar :vpMin="0" :vpNow="attr.attribute.CURHP.value" :vpMax="attr.attribute.MAXHP.value" :shield="attr.attribute.SHIELD.value" :target="enemy" :type="'hp'"></hpmpBar>
    <!-- <div class="buffList">
        <span class="buff" v-for="(v, k) in attr.buff" :key="k">{{attr}}
            <img :title="buffType.statusBuff[k].desc" :src="buffType.statusBuff[k].iconSrc" alt="">
            <span class="buffText">{{v}}</span>
        </span>
    </div> -->
    <div class="buffList">
        <div class="buff">
            <span class="buffHolder" v-for="(v, k) in attr.buff" :key="k">
                <span v-if="v>0 && buffType.statusBuff[k]!=undefined">
                    <img :title="buffType.statusBuff[k].desc" :src="buffType.statusBuff[k].iconSrc" alt="">
                    <span class="buffText">{{v}}</span>
                </span>
            </span>
        </div>
        <div class="debuff">
            <span class="buffHolder" v-for="(v, k) in attr.buff" :key="k">
                <span v-if="v>0 && buffType.statusDebuff[k]!=undefined">
                    <img :title="buffType.statusDebuff[k].desc" :src="buffType.statusDebuff[k].iconSrc" alt="">
                    <span class="buffText">{{v}}</span>
                </span>
            </span>
        </div>
        <!-- <span class="buff" v-for="(v, k) in attr.buff" :key="k">
            <span v-if="v>0">
                <img :title="buffType.statusDebuff[k].desc" :src="buffType.statusDebuff[k].iconSrc" alt="">
                <span class="buffText">{{v}}</span>
            </span>
        </span> -->
    </div>
    <div class="other">
        <div class="item">
            <span class="smallIconContainer">
                <del class="grey smallIcon iconBorder"></del>
                <img src="/icons/stat/atk.jpg" alt="">
            </span>
            <div class="value">
                <span>{{attr.attribute.ATK.showValue}}</span>
            </div>
        </div>
        <div class="item">
            <span class="smallIconContainer">
                <del class="grey smallIcon iconBorder"></del>
                <img src="/icons/stat/arm.jpg" alt="">
            </span>
            <div class="value">
                <span>
                    {{attr.attribute.DEF.showValue}}
                    <div class="reducePercent">
                        ({{attr.attribute.DEFRED.showValue}})
                    </div>
                </span>
            </div>
        </div>
        <div class="item">
            <span class="smallIconContainer">
                <del class="grey smallIcon iconBorder"></del>
                <img src="/icons/stat/block.jpg" alt="">
            </span>
            <div class="value">
                <span>{{attr.attribute.BLOCK.showValue}}</span>
            </div>
        </div>
        <div class="item">
            <span class="smallIconContainer">
                <del class="grey smallIcon iconBorder"></del>
                <img src="/icons/stat/ap.jpg" alt="">
            </span>
            <div class="value">
                <span>{{attr.attribute.AP.showValue}}</span>
            </div>
        </div>
        <div class="item">
            <span class="smallIconContainer">
                <del class="grey smallIcon iconBorder"></del>
                <img src="/icons/stat/apcrit.jpg" alt="">
            </span>
            <div class="value">
                <span>{{attr.attribute.APCRIT.showValue}}</span>
            </div>
        </div>
        <div class="item">
            <span class="smallIconContainer">
                <del class="grey smallIcon iconBorder"></del>
                <img src="/icons/stat/crit.jpg" alt="">
            </span>
            <div class="value">
                <span>{{attr.attribute.CRIT.showValue}}</span>
            </div>
        </div>
        <div class="item">
            <span class="smallIconContainer">
                <del class="grey smallIcon iconBorder"></del>
                <img src="/icons/stat/critdmg.jpg" alt="">
            </span>
            <div class="value">
                <span>{{attr.attribute.CRITDMG.showValue}}</span>
            </div>
        </div>
        <div class="item">
            <span class="smallIconContainer">
                <del class="grey smallIcon iconBorder"></del>
                <img src="/icons/stat/hpreg.jpg" alt="">
            </span>
            <div class="value">
                <span>{{attr.attribute.HEAL.showValue}}</span>
            </div>
        </div>
        <div class="item">
            <span class="smallIconContainer">
                <del class="grey smallIcon iconBorder"></del>
                <img src="/icons/stat/appen.jpg" alt="">
            </span>
            <div class="value">
                <span>{{attr.attribute.APPEN.showValue}}</span>
            </div>
        </div>
        <div class="item">
            <span class="smallIconContainer">
                <del class="grey smallIcon iconBorder"></del>
                <img src="/icons/stat/mr.jpg" alt="">
            </span>
            <div class="value">
                <span>{{attr.attribute.MR.showValue}}</span>
            </div>
        </div>
    </div>
</div>
    
</template>
<script>
import cTooltip from '../uiComponent/tooltip';
import hpmpBar from '../uiComponent/hpmpBar';
import {buffConfig} from '@/assets/config/buffConfig';
export default {
    name: "enemyInfo",
    mixins: [buffConfig],
    components: {cTooltip, hpmpBar},
    props: {
        enemy: {
            type: String
        }
    },
    data() {
        return {
        };
    },
    mounted() {
        this.$store.globalComponent.enemyInfo = this;
    },
    watch: {
    },
    computed: {
        attr() { 
            return this.enemy == 'normal' ? this.$store.state.enemyAttribute : this.enemy == 'elite' ? this.$store.state.eliteAttribute : this.$store.state.bossAttribute;
        },
    },
    methods: {      

    }
}
</script>
<style lang="scss" scoped>
.enemy {
    margin: 1rem 2rem;
}
.buffList {
    width: 500px;
    height: 25px;
    display: flex;
    flex-direction: row;
    .buff {
        position: relative;
        display: flex;
        flex-direction: row;
        width: 215px;
    }
    .debuff {
        position: relative;
        display: flex;
        flex-direction: row-reverse;
        width: 215px;
    }
    .buffHolder {
        position: relative;
        img {
            height: 1.7rem;
        }
        .buffText {
            position: absolute;
            text-align: right;
            font-size: 11px;
            top: 10px;
            right: 0px;
            text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
        }
    }
}
// .buffList {
//     margin: 0.1rem 0rem 0 0rem;
//     width: 30.5rem;
//     height: 1.5rem;
//     display: flex;
//     flex-direction: row-reverse;
//     .buff{
//         position: relative;
//         img {
//             height: 1.7rem;
//         }
//         .buffText {
//             position: absolute;
//             font-size: 0.9rem;
//             top: 0.6rem;
//             left: 1rem; 
//             text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
//         }
//     }
// }
.other {
    width: 100%;
    flex: 1;
    padding: 0.1rem;
    margin-top: 0.06rem;
    flex-wrap: wrap;
    display: flex;
    img {
        width: 1.5rem;
        height: 1.5rem;
    }
    & > div,
    .item {
        width: 20%;
        padding-bottom: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        .value {
            font-size: 1rem;
            flex: 1;
            display: flex;
            align-items: center;
            text-align: center;
            .reducePercent {
                margin-top: -0.3rem;
                font-size: 0.75rem;
            }
        }
    }
}
</style>