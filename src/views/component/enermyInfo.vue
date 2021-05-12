<template>
<div class="enermy">{{attr.name+" (Lv:"+attr.lv+")"}}
    <div class="progress" style="width:100%;">
        <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" :style="{width:attr.attribute.CURHP.value/attr.attribute.MAXHP.value*100+'%'}">
            <small class="justify-content-center d-flex position-absolute w-90" style="color:black">{{attr.attribute.CURHP.showValue}} / {{attr.attribute.MAXHP.showValue}} </small>
        </div>
    </div>

    <div class="other">
        <div class="item">
            <img src="../../assets/icons/stat/atk.png" alt="">
            <div class="value">
                <span>{{attr.attribute.ATK.showValue}}</span>
            </div>
        </div>
        <div class="item">
            <img src="../../assets/icons/stat/ap.png" alt="">
            <div class="value">
                <span>{{attr.attribute.AP.showValue}}</span>
            </div>
        </div>
        <div class="item">
            <img src="../../assets/icons/stat/crit.png" alt="">
            <div class="value">
                <span>{{attr.attribute.CRIT.showValue}}</span>
            </div>
        </div>
        <div class="item">
            <img src="../../assets/icons/stat/arm.png" alt="">
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
            <img src="../../assets/icons/stat/mr2.png" alt="">
            <div class="value">
                <span>
                    {{attr.attribute.MR.showValue}}
                </span>
            </div>
        </div>
        <div class="item">
            <img src="../../assets/icons/stat/critDmg2.png" alt="">
            <div class="value">
                <span>{{attr.attribute.CRITDMG.showValue}}</span>
            </div>
        </div>
    </div>
</div>
    
</template>
<script>
import cTooltip from '../uiComponent/tooltip';
export default {
    name: "enermyInfo",
    components: {cTooltip},
    data() {
        return {
        };
    },
    props: {
        enermy: {
            type: String
        }
    },
    computed: {
        attr() {
            if(this.enermy == 'trial')
                return this.$store.state.trialAttribute;
            else
                return this.$store.state.enermyAttribute;
        },
    },
    methods: {      

    }
}
</script>
<style lang="scss">
.enermy {
    margin: 1rem 2rem;
}
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
        width: 33.3%;
        padding-top: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        .value {
            margin-top: 0.3rem;
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

.w-90 {
    width: 90%;
    font-size: 0.8rem;
}
</style>