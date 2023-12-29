<template>
<div class="container scrollbar-morpheus-den">
    <div class="building" v-show="displayPage=='guild'">
        <div class="buildingUpgradeContainer">
            <div class="buildingUpgrade" v-for="(v, k) in displayUpgrades" :key="k">
                <div>{{guild[v].lv}}级{{guildBuildingName[v]}}
                    <br>
                    费用： <currency :amount="upgradeCost[v][guild[v].lv]"></currency><span v-if="!upgradeCost[v][guild[v].lv]">已满级</span>
                    <br>
                    <button class="btn btn-secondary" v-if="upgradeCost[v][guild[v].lv]" @click="upgradeBuilding(v)" :disabled="guild.gold<upgradeCost[v][guild[v].lv]">升级</button>
                </div>
            </div>
        </div>
    </div>
    <div class="building" v-show="displayPage=='shop'" :set="type='shop'">
        <!-- <div class="action">
            <div v-if="!inProgress[type]">
                <select v-model="selectedType[type]" @change="setSelectedType($event, type)" class="btn btn-light">
                    <option :value="option.value" v-for="(option, index) in selectOption[type]" :key="index" :disabled="guild[type].lv<option.lv">
                        {{option.name}}<span v-if="guild[type].lv<option.lv"> {{option.lv}}级</span>
                    </option>
                </select>
                &nbsp;<div class="btn btn-success" @click="start('shop')">开始</div>
            </div>
            <div v-else>
                &nbsp;<div class="btn btn-danger" @click="stop('shop')">停止</div>
            </div>
        </div> -->
    </div>
    <div class="building" v-show="displayPage=='smith'" :set="type='smith'">
        <div class="action" v-if="guild.smith.lv>=4">
            <div style="display:flex" v-if="!inProgress[type]">
                <select v-model="selectedType[type]" @change="setSelectedType($event, type)" class="btn btn-light">
                    <option :value="option.value" v-for="(option, index) in selectOption[type]" :key="index" :disabled="guild[type].lv<option.lv">
                        {{option.name}}<span v-if="guild[type].lv<option.lv"> {{option.lv}}级</span>
                    </option>
                </select>
                <span v-if="selectedType[type] != 'smith'">
                    主材料: <a v-if="smith_main.lv" :style="{color:smith_main.quality.color}" @mouseover="showInfo($event,smith_main.itemType,smith_main)" @mouseleave="closeInfo('equip')">{{smith_main.description.name}}</a>
                    <div class="btn btn-outline-light" @click="selectEquip('smith_main')">+</div>
                    副材料: <a v-if="smith_sub.lv" :style="{color:smith_sub.quality.color}" @mouseover="showInfo($event,smith_sub.itemType,smith_sub)" @mouseleave="closeInfo('equip')">{{smith_sub.description.name}}</a>
                    <div class="btn btn-outline-light" @click="selectEquip('smith_sub')">+</div>
                </span>
                &nbsp;<div class="btn btn-success" @click="start('smith')"><currency :amount="smithCost"></currency></div>
            </div>
            <div style="display:flex" v-else>
                &nbsp;<div class="btn btn-danger" @click="stop('smith')">停止</div>
            </div>
            <craftEquip></craftEquip>
        </div>
    </div>
    <div class="building" v-show="displayPage=='mine'" :set="type='mine'">
        <div class="queue">
            <table class="">
                <thead>
                    <tr>
                        <th scope="col" style="width: 7%;">等级</th>
                        <th scope="col" style="width: 12%;">剩余次数</th>
                        <th scope="col">产出</th>
                        <th scope="col" style="width: 20%;"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(mine, index) in mineQueue" :key="index">
                        <td>{{mine.lv}}</td>
                        <td>
                            <span v-if="mine.count>=0">{{mine.available+"/"+mine.count}}</span>
                            <span v-else>无限</span>
                            <div style="font-size: 10px">{{mine.progress[0]+'/'+mine.progress[1]}}</div>
                        </td>
                        <td class="reward">
                            <div class="grid" v-for="(v, k) in mine.reward" :key="k" @mouseover="showInfo($event,v[0].itemType,v[0],true)" @mouseleave="closeInfo('item')">
                                <div class="mediumIconContainer">
                                    <del :class="[{grey:v[0].quality.qualityLv==1, green:v[0].quality.qualityLv==3, blue:v[0].quality.qualityLv==4, purple:v[0].quality.qualityLv==5, orange:v[0].quality.qualityLv==6}, 'mediumIcon iconBorder']"></del>
                                    <img :src="v[0].description.iconSrc" alt="" />
                                </div>
                                <div class="quantity">{{v[1]+'%'}}</div>
                             </div>
                        </td>
                        <td>
                            <span class="button btn btn-success" @click="claimReward(index)">提取</span>
                            <span class="button btn btn-outline-danger" @click="removeFromQueue('mine', index)">移除</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="building" v-show="displayPage=='bar'" :set="type='bar'">
        <timer :time="this.progress['bar'].current"></timer>
        <div class="member scrollbar-morpheus-den">
            <table>
                <thead>
                    <tr>
                        <th scope="col">名称</th>
                        <th scope="col" style="cursor:pointer" @click="sortAppBy('lv')">等级</th>
                        <th scope="col" style="cursor:pointer" @click="sortAppBy('HP', 'stat')">生命</th>
                        <th scope="col" style="cursor:pointer" @click="sortAppBy('ATK', 'stat')">攻击</th>
                        <th scope="col" style="cursor:pointer" @click="sortAppBy('BLOCK', 'stat')">防御</th>
                        <th scope="col" style="cursor:pointer" @click="sortAppBy('GROWTH', 'stat')">成长</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(v, k) in applicantList" :key="k">
                        <td>{{v.name}}</td>
                        <td>{{v.lv}}</td>
                        <td>{{v.stat.HP}}</td>
                        <td>{{v.stat.ATK}}</td>
                        <td>{{v.stat.BLOCK}}</td>
                        <td>{{v.stat.GROWTH}}</td>
                        <td style="width: 4em;">
                            <span class="button specialButton accept" @click="recruit(k)">招募</span>
                        </td>
                        <td style="width: 4em;">
                            <span class="button specialButton reject" @click="reject(k)">婉拒</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
    
</template>
<script>
import { questConfig } from '@/assets/config/questConfig';
import {guildConfig} from '@/assets/config/guildConfig'
import {guildMemberConfig} from '@/assets/config/guildMemberConfig'
import cTooltip from '../uiComponent/tooltip';
import timer from '../uiComponent/timer';
import craftEquip from '../component/craftEquip';
import currency from '../uiComponent/currency';
export default {
    name: "guildPosition",
    mixins: [guildConfig, guildMemberConfig, questConfig],
    components: {cTooltip, timer, craftEquip, currency},
    mounted() {
        this.$store.globalComponent.guildPosition = this;
    },
    data() {
        return {
            building: {
                shop: [],
                smith: [],
                mine: [],
                herb: [],
            }, 
            totalEfficiency: {
                shop: 1, smith: 1,
            },
            timerList: {
                shop: 0, smith: 0, mine: 0, bar: 0
            },
            progress: {
                shop: { current: 0, max: 1000 },
                smith: { current: 0, max: 30 },
                bar: { current: 0, max: 300 },
            },
            smith_main: {},
            smith_sub: {},
            selectFor: 'None',
            selectOption: {
                shop: [{name: '1级贸易', value: 'shop1', lv: 0}, {name: '2级贸易', value: 'shop2', lv: 15}, {name: '3级贸易', value: 'shop3', lv: 30}, 
                        {name: '4级贸易', value: 'shop4', lv: 45}],
                smith: [{name: '打造', value: 'smith', lv: 3},{name: '精炼', value: 'refine', lv: 5}, {name: '熔炼', value: 'melt', lv: 6}],
            },
            selectedType: {
                shop: 'shop1',
                smith: 'smith',
            },
            inProgress: {
                shop: false, smith: false, 
            },
            displayPage: 'guild',
            mineQueue: [],
            memberID: '',
            applicantList: [],
        };
    },
    props: {
    },
    computed: {
        guild() { return this.$store.state.guildAttribute; },
        player() { return this.$store.state.playerAttribute; },
        playerGold() { return this.$store.state.guildAttribute.gold; },
        smithCost() { return Math.pow(10, this.guild.smith.lv)/2; },
        displayUpgrades() {
            return Object.keys(this.upgradeCost).filter((k) => {
                if(!this.buildingPreReq[k])
                    return;
                let lv = this.guild[k].lv;
                for(let i in this.buildingPreReq[k][lv]) {
                    let info = this.buildingPreReq[k][lv][i];
                    if(this.guild[info[0]].lv < info[1])
                        return false;
                }
                return true;
            });
        },
        barTimer() { 
            let s = this.progress['bar'].current < 60 ? '00:' : '0'+Math.floor(this.progress['bar'].current/60)+':';
            s += this.progress['bar'].current%60  < 10 ? '0'+this.progress['bar'].current%60 : this.progress['bar'].current%60;
            return s;
        },
    },
    methods: {    
        init() {
            for(let timer in this.timerList) 
                clearInterval(this.timerList[timer]);
            // this.start('shop');
            this.start('mine');
            this.start('bar');
            // this.start('smith');
            // this.smith_main = this.player.shoulder;
            // this.smith_sub = this.player.weapon;
            let types = ['guild','shop','smith',];
            // for(let type in types) 
            //     this.computeLv(types[type]);
        },
        upgradeBuilding(type) {
            let eventID = {
                guild: 101, bar: 102,
                questBoard:103, shop:104, blackmarket:105, smith:106, 
                mine: 110, herb: 111, treasury: 112
            };
            let quest = this.$store.globalComponent["quest"];
            let guild = this.$store.globalComponent["guild"];
            let cost = this.upgradeCost[type][this.guild[type].lv];
            guild.useGold(cost);
            this.guild[type].lv += 1;
            if(type in eventID)
                quest.trackProgress('event', eventID[type], this.guild[type].lv, true);
            if(type == 'questBoard')
                this.upgradeQuestBoard();
        },
        upgradeQuestBoard() {
            let quest =  this.$store.globalComponent['quest']; 
            let lv = this.guild['questBoard'].lv;
            for(let i in this.questBoardList[lv]) {
                let questID = this.questBoardList[lv][i];
                quest.assignQuest(questID);
            }
        },
        selectEquip(type) {
            let backpack = this.$store.globalComponent["backpack"];
            let index = this.$store.globalComponent["index"];
            this.selectFor = type;
            backpack.leftClickEnabled = true;
            index.closeMenuPanel('backpack');
            index.openMenuPanel('backpack');
        },
        selectedEquip(equip) {
            let backpack = this.$store.globalComponent["backpack"];
            switch(this.selectFor){
                case "smith_main":
                    if(this.smith_main.lv)
                        backpack.giveEquip(this.smith_main, false);
                    this.smith_main = equip;
                    break;
                case "smith_sub":
                    if(this.smith_sub.lv)
                        backpack.giveEquip(this.smith_sub, false);
                    this.smith_sub = equip;
                    break;
            }
            this.selectFor = 'None';
        },
        setSelectedType(e, type) {
            let value = e.target.value;
            this.selectedType[type] = value;
            this.computeMax(type);
        },
        computeMax(type) {
            let req = {
                HP: 25000,
                MP: 25000,
                ATK: 25000,
                DEF: 25000,
                AP: 35000,
                MR: 35000,
                STR: 50000,
                AGI: 50000,
                INT: 50000,
                shop1: 1000, 
                shop2: 5000,
                shop3: 25000, 
                shop4: 125000, 
                smith: 10000,
                refine: 50000,
                melt: 1000000
            };
            this.progress[type].max = req[this.selectedType[type]];
        },
        start(type) {
            this.inProgress[type] = true;
            let craftEquip = this.$store.globalComponent["craftEquip"];
            switch(type) {
                case 'smith':
                    if(this.playerGold < this.smithCost) {
                        this.inProgress[type] = false;
                        break;
                    }
                    let guild = this.$store.globalComponent["guild"];
                    guild.useGold(this.smithCost);
                    craftEquip.statusChange('wait');
                    break;
                case 'shop':
                    this.startShop();
                    break;
                case 'mine':
                    this.startMine();
                    break;
                case 'bar':
                    this.startBar();
                    break;
            }
        },
        stop(type) {
            let craftEquip = this.$store.globalComponent["craftEquip"];
            this.progress[type].current = 0;
            clearInterval(this.timerList[type]);
            this.inProgress[type] = false;
            switch(this.selectedType[type]) {
                case 'smith':
                    craftEquip.forfeit();
                    break;
            }
        },
        startShop() {
            let guild = this.$store.globalComponent["guild"];
            this.timerList['shop'] = setInterval(() => {
                this.progress['shop'].current += this.totalEfficiency['shop'];
                if(this.progress['shop'].current >= this.progress['shop'].max) {
                    this.progress['shop'].current = 0;
                    switch(this.selectedType['shop']) {
                        case 'shop1':
                            guild.getGold('', 666, false);
                            break;
                        case 'shop2':
                            guild.getGold('', 6666, false);
                            break;
                        case 'shop3':
                            guild.getGold('', 66666, false);
                            break;
                        case 'shop4':
                            guild.getGold('', 666666, false);
                            break;
                    } 
                }
            }, 1000);
        },
        startSmith() {
            let craftEquip = this.$store.globalComponent["craftEquip"];
            this.inProgress['smith'] = false;
            switch(this.selectedType['smith']) {
                case 'smith':
                    craftEquip.statusChange('done');
                    // craftEquip.craftEquip();
                    break;
                case 'refine':
                    this.refine();
                    break;
                case 'melt':
                    this.melt();
                    break;
            } 
        },
        startMine() {
            this.timerList['mine'] = setInterval(() => {
                for(let i=this.mineQueue.length-1; i>=0; i--) {
                    let mine = this.mineQueue[i];
                    if(!this.increaseMineProgress(mine)) 
                        this.mineQueue.splice(i, 1);
                }
            }, 1*1000);
        },
        startBar() {
            let type = 'bar';
            this.timerList[type] = setInterval(() => {
                this.progress[type].current -= 1;
                if(this.progress[type].current <= 0) {
                    this.progress[type].current = this.progress[type].max;
                    if(this.applicantList.length >= 5) {
                        this.applicantList.splice(0, this.applicantList.length-5);
                    }
                    for(let i=0; i<5; i++) {
                        let lv = this.guild.bar.lv > 0 ? this.guild.bar.lv : 1;
                        lv = Math.round((lv-Math.random())*10);
                        this.generateApplicant(lv);
                    }
                }
            }, 1*1000);
        },
        generateApplicant(lv, race, name) {
            let guildMember = this.$store.globalComponent["guildMember"];
            let applicant = guildMember.generateApplicant(lv, race, name);
            this.applicantList.push(applicant);
        },
        sortAppBy(type, type2='talent') {
            this.reverseSort = type==this.sortKey ? -1*this.reverseSort : -1;
            this.sortKey = type;
            if(type == 'lv') {
                this.applicantList.sort((a, b) => {
                    return this.reverseSort*(a[type]-b[type]);
                })
            } else {
                this.applicantList.sort((a, b) => {
                    return this.reverseSort*(a[type2][type]-b[type2][type]);
                })
            }
        },
        smith() {
            let equipInfo = this.$store.globalComponent["equipInfo"];
            let backpack = this.$store.globalComponent["backpack"];
            // 此处需改动qualitySet参数
            let equip = equipInfo.createEquip(-1, this.player.lv, 'random', 1);  
            equip = JSON.parse(equip);
            this.$store.commit("set_sys_info", {
                type: 'reward',
                msg: '打造完成, 获得',
                equip: equip
            });
            backpack.giveEquip(equip);
        },
        refine() {
            let equipInfo = this.$store.globalComponent["equipInfo"];
            let backpack = this.$store.globalComponent["backpack"];
            this.$store.commit("set_sys_info", {
                type: 'reward',
                msg: '消耗装备',
                equip: this.smith_sub
            });
            equipInfo.refine(this.smith_main, this.smith_sub);
            backpack.giveEquip(this.smith_main, false);
            this.$store.commit("set_sys_info", {
                type: 'reward',
                msg: '装备精炼完成',
                equip: this.smith_main
            });
            this.smith_main = {};
            this.smith_sub = {};
        },
        melt() {
            let equipInfo = this.$store.globalComponent["equipInfo"];
            let backpack = this.$store.globalComponent["backpack"];
            this.$store.commit("set_sys_info", {
                type: 'reward',
                msg: '消耗装备',
                equip: this.smith_sub
            });
            equipInfo.melt(this.smith_main, this.smith_sub);
            backpack.giveEquip(this.smith_main, false);
            this.$store.commit("set_sys_info", {
                type: 'reward',
                msg: '装备熔炼完成',
                equip: this.smith_main
            });
            this.smith_main = {};
            this.smith_sub = {};
        },
        increaseMineProgress(mine, progress=1) {
            this.$set(mine.progress, 0, mine.progress[0] + progress);
            if(mine.progress[0] >= mine.progress[1]) {
                let count = Math.floor(mine.progress[0]/mine.progress[1]);
                mine.progress[0] -= count*mine.progress[1];
                mine.available = Math.min(mine.available+count, mine.count);
                if(mine.available >= mine.count) {
                    this.mineReward(mine.reward, mine.available);
                    return false;
                }
            }
            return true;
        },
        claimReward(index) {
            this.mineReward(this.mineQueue[index].reward, this.mineQueue[index].available);
            this.mineQueue[index].count -= this.mineQueue[index].available;
            this.mineQueue[index].available = 0;
            if(this.mineQueue[index].count <= 0) 
                this.mineQueue.splice(index, 1);
        },
        mineReward(rewardList, rewardCount) {
            // 清零
            for(let k=0; k<rewardList.length; k++) {
                rewardList[k][0].quantity = 0;
            }
            if(rewardCount <= 0)
                return;
            let itemInfo = this.$store.globalComponent["itemInfo"];
            // 添加数量
            while(rewardCount > 0) {
                for(let k=0; k<rewardList.length; k++) {
                    let random = Math.random()*100;
                    if(random <= rewardList[k][1]) {
                        let qty = rewardList[k][2]==undefined ? 1 : rewardList[k][2];
                        qty = rewardList[k][3]==undefined ? qty : qty+Math.ceil(Math.random()*(rewardList[k][3]-qty));
                        rewardList[k][0].quantity += qty;
                    }
                }
                rewardCount--;
            }
            // 给予奖励
            for(let k=0; k<rewardList.length; k++) {
                if(rewardList[k][0].quantity > 0)
                    itemInfo.addItem(rewardList[k][0], true);
            }
        },
        findTarget(target) {
            if(target.job == 'None')
                return -1;
            let list = this.building[target.job];
            for(let i in list) {
                if(list[i].id == target.id)
                    return i;
            }
            return -1;
        },
        recruit(k) {
            if(this.guild.member.length >= this.maxMember)
                return;
            let quest = this.$store.globalComponent["quest"];
            this.applicantList[k].isMember = true;
            this.guild.member.push(this.applicantList[k]);
            this.applicantList.splice(k, 1);
            quest.trackProgress('event', 14, 1, true);
        },
        reject(k) {
            this.applicantList.splice(k, 1);
        },
        removeFromQueue(type, index) {
            this.mineReward(this.mineQueue[index].reward, this.mineQueue[index].available);
            this.mineQueue.splice(index, 1);
        },
        showInfo($event, type, item, compare) {
            let index = this.$store.globalComponent["index"];
            index.showInfo($event, type, item, compare);
        },
        closeInfo(type='equip') {
            let index = this.$store.globalComponent["index"];
            index.closeInfo(type);
        },
    }
}
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    width: 52rem;
    max-height: 50rem;
    margin: 0.5rem 0.5rem;
    padding: 0.5rem 0.5rem;
    overflow-y: auto;
    overflow-x: hidden;
}
.building {
    padding: 0.5rem;
    margin: 0.25rem;
    border-radius: 1rem;
    width: 50rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .buildInfo {
        width: 100%;
        margin: 0.2rem 0.2rem;
    }
    .buildingUpgradeContainer {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .buildingUpgrade {
            width: 30%;
            border: 1px solid rgba(255, 255, 255, 0.404);
            border-radius: 7px;
            margin: 5px;
            padding: 5px;
        }
    }
    .progress {
	    position: relative;
        margin: 0.2rem 0.2rem;
    }
}
.member {
    padding: 0.5rem;
    border-radius: 1rem;
    max-height: 35rem;
    width: 50rem;
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 0rem 0.5rem 0.5rem 0.5rem;
    width: 100%;
    .grid {
        border: 1px solid rgba(255, 255, 255, 0.404);
        width: fit-content;
        height: fit-content;
        display: flex;
        flex-wrap: wrap;
        .info {
            margin: auto 0.5rem;
            width: 6.5rem;
            .name {
                text-align: center;
                margin: auto 0rem;
                overflow: auto;
            }
        }
        .skillList {
            display: flex;
            flex-direction: column;
            margin: auto;
            width: 10rem;
            .skill {
                .skillDesc {
                    display: none;
                }
            }
            .skill:hover .skillName{
                display:none;
            }
            .skill:hover .skillDesc{
                display: inline;
            }
        }
        .action {
            width: 4rem;
            margin: auto 0rem;
            .accept {
                font-size: 15px;
                line-height: 15px;
                width: 50px;
                height: 30px;
            }
            .reject {
                font-size: 15px;
                line-height: 15px;
                width: 50px;
                height: 30px;
            }
        }
    }
}
.queue {
    width: 100%;
    color: #ffffff;
}
.progress-bar {
    transition: 1s linear;
}
.w-90 {
    width: 100%;
    font-size: 0.8rem;
}
</style>
