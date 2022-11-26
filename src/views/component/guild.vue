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
<div class="guild">{{guild.name}}
    <div v-if="guild.name==null" id="createGuild">
        <div class="nameTitle">创建公会</div>
        <div class="nameContent">
            <input id="guildName" class="nameAnime" placeholder="请输入您的公会名" type="text" @input="updateName"/>  
            <div id="guildNameAlert" class="alert"></div>
            <button class="confirm" @click="confirmName">确认
            </button>
        </div>
    </div>
    <div v-show="guild.name">
        <div id="resource">
            {{guild.name}}
            <br>
            金币:<currency :amount="guild.gold"></currency> <br>
            公会名望: {{guild.reputation}}<img class="guildReputationIcon">
        </div>
        <div id="building">
            <div v-for="(v, k) in guildBuildingOptions" :key="k">
                <cTooltip :placement="'bottom'" v-if="guild[v].lv>0">
                    <template v-slot:content>
                        <a :id="v+'Btn'" class='glowBtn' @click="switchTab($event, v)">{{guildBuildingName[v]+" "+guild[v].lv}}</a>
                    </template>
                    <template v-slot:tip>
                        <div v-for="(v2, k2) in guildBuildingDesc[v]" :key="k2">
                            <span v-if="guildBuildingDesc[v][k2]!=''" :style="{color:guild[v].lv<k2?'#888':''}">{{k2+"级: "+guildBuildingDesc[v][k2]}}</span>
                        </div>
                    </template>
                </cTooltip>
            </div>
        </div>
        <guildPosition></guildPosition>
    </div>
</div>
</template>
<script>
import {guildConfig} from '@/assets/config/guildConfig'
import currency from '../uiComponent/currency';
import cTooltip from '../uiComponent/tooltip';
import guildPosition from '../component/guildPosition';
import countdown from '../uiComponent/countdown';
export default {
    name: "guild",
    mixins: [guildConfig],
    components: {cTooltip, guildPosition, countdown, currency},
    mounted() {
        this.$store.globalComponent.guild = this;
    },
    data() {
        return {
        };
    },
    props: {
    },
    computed: {
        guild() {return this.$store.state.guildAttribute;},
        player() {return this.$store.state.playerAttribute;},
        guildBuildingOptions() {
            return Object.keys(this.guildBuildingDesc).filter((k) => {
                return this.guild[k].lv>0;
            })
        }
    },
    methods: {    
        updateName(e) {
            let name = e.target.value;
            this.checkValidity(name);
        },
        confirmName() {
            let name = document.getElementById("guildName").value;
            let itemInfo = this.$store.globalComponent["itemInfo"];
            if(this.checkValidity(name)) {
                let quest =  this.$store.globalComponent['quest']; 
                itemInfo.removeItemByCode('inv_misc_bone_06', 1);
                this.$set(this.guild, 'name', name);
                this.guild.guild.lv = 1;
                this.guild.shop.lv = 1;
                this.guild.smith.lv = 1;
                quest.assignQuest(26);
            }
        },
        checkValidity(name) {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let alert = document.getElementById("guildNameAlert");
            if(name.length < 1 || name.length > 8) {
                alert.innerHTML = "公会名字限定在1-8个字符之间！";
                return false;
            }
            if(itemInfo.findItemIndex('inv_misc_bone_06') == -1) {
                alert.innerHTML = "缺少关键道具【阿迦玛的牙】";
                return false;
            }
            alert.innerHTML = "";
            return true;
        },  
        switchTab(e, type){
            let guildPosition = this.$store.globalComponent["guildPosition"];
            let active = document.getElementById(guildPosition.displayPage+'Btn');
            active.classList.remove('btnActive');
            guildPosition.displayPage = type;
            e.target.classList.add('btnActive');
        },    
        getGold(text, amount, showText=true, bonus=true) {
            if(isNaN(amount)) {
                console.log("获得异常数额金币");
                console.trace();
                return;
            }
            amount = parseInt(amount);
            if(amount <= 0){
                console.log("获得0或者负数金币"+amount);
                console.trace();
            }
            this.guild.gold += amount;
            if(showText) {
                this.$store.commit("set_sys_info", {
                    type: 'reward',
                    msg: text+'获得',
                    gold: amount
                });
            }
            let achievement = this.$store.globalComponent["achievement"];
            achievement.set_statistic({cumulatedGold: amount});
        },
        getReputation(text, amount, showText=true) {
            if(isNaN(amount)) {
                console.log("获得异常数名望");
                console.trace();
                return;
            }
            amount = parseInt(amount);
            this.guild.reputation += amount;
            if(showText) {
                this.$store.commit("set_sys_info", {
                    type: 'reward',
                    msg: text+'获得'+amount+'公会名望'
                });
            }
            let achievement = this.$store.globalComponent["achievement"];
            achievement.set_statistic({cumulatedReputation: amount});
        },
        useGold(amount) {
            if(isNaN(amount)) {
                console.log("扣除异常数额金币");
                console.trace();
                return;
            }
            amount = parseInt(amount);
            this.guild.gold -= amount;
        },
        useReputation(amount, reputationType) {
            if(isNaN(amount)) {
                console.log("扣除异常数额金币");
                console.trace();
                return;
            }
            amount = parseInt(amount);
            switch(reputationType) {
                case 'guildReputation':
                    this.guild.reputation -= amount;
                    break;
            }
        },
    }
}
</script>
<style lang="scss">
#createGuild {
    padding: 0.5rem;
    margin: 0.5rem;
    height: 100%;
    width: 50rem;
}
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