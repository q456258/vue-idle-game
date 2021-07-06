<template>
<!--
材料：
    金币
    木材
    石材
    铁矿
建筑：
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
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" id="info" @click="switchTab('info')">信息</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: displayPage=='member' }" id="member" @click="switchTab('member')">成员</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: displayPage=='position' }" id="position" @click="switchTab('position')">职位</a>
      </li>
    </ul>
    <guildInfo v-show="displayPage=='info'"></guildInfo>
    <guildMember v-show="displayPage=='member'"></guildMember>
    <guildPosition v-show="displayPage=='position'"></guildPosition>
</div>
</template>
<script>
import {guildConfig} from '@/assets/config/guildConfig'
import { assist } from '../../assets/js/assist';
import cTooltip from '../uiComponent/tooltip';
import guildInfo from '../component/guildInfo';
import guildMember from '../component/guildMember';
import guildPosition from '../component/guildPosition';
export default {
    name: "guild",
    mixins: [assist, guildConfig],
    components: {cTooltip, guildInfo, guildMember, guildPosition},
    mounted() {
    },
    data() {
        return {
            displayPage: 'info'
        };
    },
    props: {
    },
    computed: {
        guild() {return this.$store.state.guildAttribute;},
        player() {return this.$store.state.playerAttribute;}
    },
    methods: {      
        switchTab(type){
            if(this.displayPage != type) {
                var element = document.getElementById(this.displayPage);
                element.classList.remove('active');
                var element = document.getElementById(type);
                element.classList.add('active');
                element.classList.remove('glow');
                this.displayPage = type;
            }
        },
        getGold(text, gold, showText=true, bonus=true) {
            gold = parseInt(gold);
            if(bonus)
                gold = Math.round(gold*(1+this.guild.shop*0.005));
            this.guild.gold += gold;
            if(showText) {
                this.$store.commit("set_sys_info", {
                    type: 'reward',
                    msg: text+'获得'+gold+'金币'
                });
            }
            var achievement = this.findBrothersComponents(this, 'achievement', false)[0];
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
            var achievement = this.findBrothersComponents(this, 'achievement', false)[0];
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
    border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 1em;
    height: 100%;
    width: 50rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    & > div {
        width: 25%;
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

</style>