<template>
<!--
材料: 
    金币
    木材
    石材
    铁矿
建筑: 
    公会
    练功房
    商店
    铁匠铺

    钱庄
    食堂
    金矿
    林地
    采石场
    矿场
    招募所
-->
<div class="guild">
    <div id="resource">
        金币:<currency :amount="guild.gold"></currency> <br>
        水晶:{{guild.crystal}} <br>
    </div>
    <div id="building">     
        <cTooltip :placement="'bottom'">
            <template v-slot:content>
                <a id="guildBtn" class='glowBtn btnActive' @click="switchTab($event, 'guild')">公会 {{guild.guild.lv}}</a>
            </template>
            <template v-slot:tip>
                <p class="info">* 每10级增加一个公会成员上限</p>
            </template>
        </cTooltip>   
        <cTooltip :placement="'bottom'" v-if="guild.guild.lv>0">
            <template v-slot:content>
                <a id="trainBtn" class='glowBtn' @click="switchTab($event, 'train')">练功房 {{guild.train.lv}}</a>
            </template>
            <template v-slot:tip>
                <p class="info">* 消耗水晶提升能力的场所</p>
                <p class="info">* 每一级提升1点训练效果</p>
            </template>
        </cTooltip>
        <cTooltip :placement="'bottom'" v-if="guild.guild.lv>0 && guild.train.lv>=15">
            <template v-slot:content>
                <a id="train2Btn" class='glowBtn' @click="switchTab($event, 'train2')">中级练功房 {{guild.train2.lv}}</a>
            </template>
            <template v-slot:tip>
                <p class="info">* 消耗水晶提升能力的场所</p>
                <p class="info">* 每一级提升1点训练效果</p>
                <p class="info">* 等级上限为练功房等级</p>
            </template>
        </cTooltip>
        <cTooltip :placement="'bottom'" v-if="guild.guild.lv>0 && guild.train2.lv>=15">
            <template v-slot:content>
                <a id="train3Btn" class='glowBtn' @click="switchTab($event, 'train3')">高级练功房 {{guild.train3.lv}}</a>
            </template>
            <template v-slot:tip>
                <p class="info">* 消耗水晶提升能力的场所</p>
                <p class="info">* 每一级提升1点训练效果</p>
                <p class="info">* 等级上限为中级练功房等级</p>
            </template>
        </cTooltip>
        <cTooltip :placement="'bottom'" v-if="guild.guild.lv>0">
            <template v-slot:content>
                <a id="shopBtn" class='glowBtn' @click="switchTab($event, 'shop')">商店 {{guild.shop.lv}}</a>
            </template>
            <template v-slot:tip>
                <p class="info">* 出售日常用品</p>
                <p class="info">* 每一级提升0.5%金币收入</p>
            </template>
        </cTooltip>
        <cTooltip :placement="'bottom'" v-if="guild.guild.lv>0">
            <template v-slot:content>
                <a id="smithBtn" class='glowBtn' @click="switchTab($event, 'smith')">铁匠铺 {{guild.smith.lv}}</a>
            </template>
            <template v-slot:tip>
                <p class="info">* 提供强化、锻造等服务</p>
                <p class="info">* 每一级提升1%强化成功率</p>
            </template>
        </cTooltip>
    </div>
    <guildPosition></guildPosition>
</div>
</template>
<script>
import {guildConfig} from '@/assets/config/guildConfig'
import { assist } from '../../assets/js/assist';
import currency from '../uiComponent/currency';
import cTooltip from '../uiComponent/tooltip';
import guildMember from '../component/guildMember';
import guildPosition from '../component/guildPosition';
import countdown from '../uiComponent/countdown';
import trainStat from '../component/trainStat';
export default {
    name: "guild",
    mixins: [assist, guildConfig],
    components: {cTooltip, guildMember, guildPosition, countdown, trainStat, currency},
    mounted() {
    },
    data() {
        return {
        };
    },
    props: {
    },
    computed: {
        guild() {return this.$store.state.guildAttribute;},
        player() {return this.$store.state.playerAttribute;}
    },
    methods: {      
        switchTab(e, type){
            let guildPosition = this.findComponentDownward(this, 'guildPosition');
            let active = document.getElementById(guildPosition.displayPage+'Btn');
            active.classList.remove('btnActive');
            guildPosition.displayPage = type;
            e.target.classList.add('btnActive');
        },    
        getGold(text, gold, showText=true, bonus=true) {
            gold = parseInt(gold);
            if(bonus)
                gold = Math.round(gold*(1+this.guild.shop.lv*0.005));
            this.guild.gold += gold;
            if(showText) {
                this.$store.commit("set_sys_info", {
                    type: 'reward',
                    msg: text+'获得',
                    gold: gold
                });
            }
            let achievement = this.findBrothersComponents(this, 'achievement', false)[0];
            achievement.set_statistic({cumulatedGold: gold});
            // this.$store.commit("set_statistic", {cumulatedGold: gold});
        },
        getCrystal(text, crystal, showText=true) {
            crystal = parseInt(crystal);
            this.guild.crystal += crystal;
            if(showText) {
                this.$store.commit("set_sys_info", {
                    type: 'reward',
                    msg: text+'获得'+crystal+'水晶'
                });
            }
            let achievement = this.findBrothersComponents(this, 'achievement', false)[0];
            achievement.set_statistic({cumulatedCrystal: crystal});
            // this.$store.commit("set_statistic", {cumulatedCrystal: crystal});
        },
    }
}
</script>
<style lang="scss">
#resource {
    padding: 0.5rem;
    margin: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 1em;
    height: 100%;
    width: 50rem;
}
#building {
    padding: 0.5rem;
    margin: 0.5rem;
    // border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 1em;
    height: 100%;
    width: 50rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    & > div {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
    }
}
.build {
    height: 3rem;
    width: 10rem;
    font-size: 1rem;
    margin: 0.5rem;
}

.training {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 10rem;
    width: 50rem;
    padding: 0.5rem;
    margin: 0.5rem;
	background-color: #000;
}

.trainingProgressbars {
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	min-width: 270px;
	width: 100%;
	min-height: 100%;
}
a.glowBtn{
	z-index: 1;
    top: 0rem;
	line-height: 3rem;
	position: relative;
	letter-spacing: .1em;
	color: #afafaf;
	text-shadow: 0 1px 0 rgba(255,255,255,.1);
	font-weight: bold;
	border-radius:(3px);
}
a.glowBtn:after{
	z-index: -1;
	content: '';
	cursor: pointer;
	text-align: center;
	margin-left: 50%;
	top: -0.8rem;
	left: -4.8rem;
	width: 9.6rem;
	height: 2.8rem;
	display: block;
	position: absolute;
	background-image:(linear-gradient(#444,#373738));
	box-shadow:(
		inset 0 2px 1px -1px rgba(255,255,255,.2),
		inset 0 -2px 1px -1px rgba(0,0,0,.2),
		//-----Drop Shadow-----
		0 12px 12px rgba(0,0,0,.5),
		0 4px 6px rgba(0,0,0,.3));
	border-radius:(2px);
}
a.glowBtn:hover{
	color: #dfdfdf;
	text-shadow:0 -1px 0 rgba(0,0,0,.4);
}
a.glowBtn:active, a.btnActive,a.btnActive:hover{
	color: #00ccff;
	text-shadow:0 -1px 0 rgba(0,0,0,.3),0 0px 30px rgba(0,255,255,.7);
}
a.glowBtn:active, a.btnActive,a.btnActive:hover{
	text-shadow:0 -1px 0 rgba(0,0,0,1),0 0px 30px rgba(0,255,255,1),0 0px 50px rgba(0,255,255,1);
	}
a.glowBtn:active:after, a.btnActive:after,a.btnActive:hover:after {
	background-image:(linear-gradient(#262627, #2d2d2e));
	box-shadow:(
		inset 0 5px 6px rgba(0,0,0,.3), 
		inset 0 0 4px rgba(0,0,0,.9), 0 0 0 black);
}
</style>