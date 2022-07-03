<template>
<div class="container scrollbar-morpheus-den">
    <div class="building" v-show="displayPage=='guild'">
        <div class="buildingUpgradeContainer">
            <div class="buildingUpgrade" v-for="(v, k) in upgradeCost" :key="k">
                <div>{{guild[k].lv}}级{{guildBuildingName[k]}}
                    <br>
                    费用： <currency :amount="upgradeCost[k][guild[k].lv]"></currency><span v-if="!upgradeCost[k][guild[k].lv]">已满级</span>
                    <br>
                    <button class="btn btn-secondary" v-if="upgradeCost[k][guild[k].lv]" @click="upgradeBuilding(k)" :disabled="guild.gold<upgradeCost[k][guild[k].lv]">升级</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 
    <div class="building" v-show="displayPage=='train'" :set="type='train'">
        <div class="training">
            <div class="trainingProgressbars">
                <countdown ref="countdown" :tier="0" :timer="$store.state.train.train1.timer" :level="guild.train.lv" v-if="guild.train.lv>0"></countdown>
                <countdown :tier="1" :timer="$store.state.train.train2.timer" :level="guild.train2.lv" v-if="guild.train.lv>0"></countdown>
                <countdown :tier="1" :timer="$store.state.train.train2.timer" :level="guild.train2.lv" v-if="guild.train2.lv>0"></countdown>
                <countdown :tier="2" :timer="$store.state.train.train3.timer" :level="guild.train3.lv" v-if="guild.train3.lv>0"></countdown>
            </div>
        </div>
    </div> 
    -->
    <div class="building" v-show="displayPage=='questBoard'">
        <div class="buildInfo">
            <div class="questRefresh">
                {{questTimer}}<div class="refresh btn btn-secondary" @click="refreshGuildQuest(false)"></div>
                <currency :amount="questRefreshCost"></currency>
            </div>
        </div>
        <div class="questBoardContainer">
            <div class="questContainer" v-for="(v1, k1) in guildAvailableQuest" :key="k1">
                <div class="questDetailField">
                    <div class="questDetailTitle">{{"("+v1.lv+")"+v1.name}}</div>
                    <br>
                    <div v-for="(v, k) in v1.reqs" :key="k">
                        {{v.current+"/"+v.target+" "+v.name}}
                    </div>
                </div>
                <div class="questDetailField">
                    <div class="questDetailTitle">奖励</div>
                    <div class="questDetailContent">
                        <div class="reward" v-for="(v, k) in v1.rewardItem" :key="k">
                            <div v-if="v[0]" @mouseover="showInfo($event,v[0].itemType,v[0],true)" @mouseleave="closeInfo(v[0].itemType)">
                                <div class="smallIconContainer">
                                    <del :class="[{grey:v[0].quality.qualityLv==1, green:v[0].quality.qualityLv==3, blue:v[0].quality.qualityLv==4, purple:v[0].quality.qualityLv==5, orange:v[0].quality.qualityLv==6}, 'smallIcon iconBorder']"></del>
                                    <img :src="v[0].description.iconSrc" alt="" />
                                </div>
                            </div>
                        </div>
                        <div class="reward" v-for="(v, k) in v1.reward" :key="k+'a'">
                            <div v-if="v[0]=='gold'"><currency :amount="v[1]"></currency></div>
                            <div v-else>{{rewardType[v[0]]+': '+v[1]}}</div>
                        </div>
                        <div class="acceptQuest btn btn-secondary" @click="acceptQuest(k1, v1)">领取</div>
                    </div>
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
        <div class="action" v-if="guild.smith.lv>=3">
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
</div>
    
</template>
<script>
import { questConfig } from '@/assets/config/questConfig';
import {guildConfig} from '@/assets/config/guildConfig'
import {guildMemberConfig} from '@/assets/config/guildMemberConfig'
import cTooltip from '../uiComponent/tooltip';
import countdown from '../uiComponent/countdown';
import craftEquip from '../component/craftEquip';
import currency from '../uiComponent/currency';
export default {
    name: "guildPosition",
    mixins: [guildConfig, guildMemberConfig, questConfig],
    components: {cTooltip, countdown, craftEquip, currency},
    mounted() {
        this.$store.globalComponent.guildPosition = this;
    },
    data() {
        return {
            building: {
                shop: [],
                smith: [],
                train: [],
                train2: [],
                train3: [],
                mine: [],
                herb: [],
            }, 
            maxMember: {
                shop: 1,
                smith: 1,
                train: 2,
                train2: 2,
                train3: 2,
                mine: 2,
                herb: 2,
            },
            totalEfficiency: {
                shop: 1, smith: 1, train: 1, train2: 1, train3: 1,
            },
            timerList: {
                shop: 0, smith: 0, train: 0, train2: 0, train3: 0, mine: 0, quest: 0
            },
            progress: {
                shop: { current: 0, max: 1000 },
                smith: { current: 0, max: 30 },
                train: { current: 0, max: 1000 },
                train2: { current: 0, max: 1000 },
                train3: { current: 0, max: 1000 },
                quest: { current: 0, max: 599 },
            },
            smith_main: {},
            smith_sub: {},
            train1_member: {},
            selectFor: 'None',
            selectOption: {
                shop: [{name: '1级贸易', value: 'shop1', lv: 0}, {name: '2级贸易', value: 'shop2', lv: 15}, {name: '3级贸易', value: 'shop3', lv: 30}, 
                        {name: '4级贸易', value: 'shop4', lv: 45}],
                smith: [{name: '打造', value: 'smith', lv: 3},{name: '精炼', value: 'refine', lv: 5}, {name: '熔炼', value: 'melt', lv: 6}],
                train: [{name: '生命训练', value: 'HP', lv: 0}, {name: '魔法训练', value: 'MP', lv: 0}, {name: '攻击训练', value: 'ATK', lv: 0},
                        {name: '防御训练', value: 'DEF', lv: 0}],
                train2: [{name: '元素训练', value: 'SUNDER', lv: 0}, {name: '格挡训练', value: 'BLOCK', lv: 0}],
                train3: [{name: '力量训练', value: 'STR', lv: 0}, {name: '敏捷训练', value: 'AGI', lv: 0}, {name: '智力训练', value: 'INT', lv: 0}],
            },
            selectedType: {
                shop: 'shop1',
                smith: 'smith',
                train: 'HP',
                train2: 'SUNDER',
                train3: 'STR',
            },
            inProgress: {
                shop: false, smith: false, train:  false, train2: false, train3: false,
            },
            displayPage: 'guild',
            mineQueue: [],
            memberID: 0,
            applicantList: [],
            guildAvailableQuest: [],
        };
    },
    props: {
    },
    computed: {
        guild() { return this.$store.state.guildAttribute; },
        player() { return this.$store.state.playerAttribute; },
        playerGold() { return this.$store.state.guildAttribute.gold; },
        questRefreshCost() { return 100*Math.pow(10, this.guild.questBoard.lv); },
        smithCost() { return 100*Math.pow(5, this.guild.smith.lv); },
        questTimer() { 
            let s = this.progress['quest'].current < 60 ? '00:' : '0'+Math.floor(this.progress['quest'].current/60)+':';
            s += this.progress['quest'].current%60  < 10 ? '0'+this.progress['quest'].current%60 : this.progress['quest'].current%60;
            return s;
        },
    },
    methods: {    
        init() {
            // for(let mem in this.maxMember) {
            //     this.maxMember[mem] = Math.floor(this.guild[mem].lv/10+1);
            // }
            for(var mem in this.guild.member) {
                if(this.guild.member[mem].job != 'None')
                    this.assignPosition(this.guild.member[mem].job, -1, this.guild.member[mem], true);
            }
            for(let timer in this.timerList) 
                clearInterval(this.timerList[timer]);
            // this.start('shop');
            this.start('mine');
            this.start('quest');
            // this.start('smith');
            // this.smith_main = this.player.shoulder;
            // this.smith_sub = this.player.weapon;
            let types = ['guild','shop','smith','train','train2','train3'];
            // for(let type in types) 
            //     this.computeLv(types[type]);
            this.generateGuildQuest();
        },
        upgradeBuilding(type) {
            let guild = this.$store.globalComponent["guild"];
            let cost = this.upgradeCost[type][this.guild[type].lv];
            guild.useGold(cost);
            this.guild[type].lv += 1;
        },
        refreshGuildQuest(free) {
            if(!free && this.playerGold < this.questRefreshCost)
                return;
            if(!free) {
                let guild = this.$store.globalComponent["guild"];
                guild.useGold(this.questRefreshCost);
            }
            this.generateGuildQuest();
        },
        generateGuildQuest() {
            let quest = this.$store.globalComponent["quest"];
            let list = [];
            this.guildAvailableQuest = [];
            for(let l=0; l<this.questBoardList.length; l++) {
                if(this.player.lv <= (l+1)*10)
                    break;
                for(let j=0; j<this.guild['questBoard'].lv; j++) {
                    for(let k in this.questBoardList[l][j]) {
                        list.push(this.questBoardList[l][j][k]);
                    }
                }
            }
            let len = Math.min(list.length, 6);
            for(let i=0; i<len; i++) {
                let index = Math.floor(Math.random()*list.length);
                let questId = list[index];
                let newQuest = quest.generateQuest(questId);
                this.guildAvailableQuest.push(newQuest);
                list[index], list[list.length-1] = list[list.length-1] , list[index];
                list.pop();
            }
        },
        acceptQuest(index, questInfo) {
            let quest = this.$store.globalComponent["quest"];
            quest.assignQuest(questInfo.id, questInfo);
            this.guildAvailableQuest.splice(index, 1);
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
                case 'quest':
                    this.startQuest();
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
        startQuest() {
            this.timerList['quest'] = setInterval(() => {
                this.progress['quest'].current -= 1;
                if(this.progress['quest'].current <= 0) {
                    this.refreshGuildQuest(true);
                    this.progress['quest'].current = this.progress['quest'].max;
                }
            }, 1*1000);
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
                        rewardList[k][0].quantity++;
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
            var list = this.building[target.job];
            for(var i in list) {
                if(list[i].id == target.id)
                    return i;
            }
            return -1;
        },
        assignPosition(type, index, target, force=false) {
            if(!force && type == target.job)
                return;
            if(target.job != 'None') {
                let targetIndex = this.findTarget(target);
                if(targetIndex != -1)
                    this.cancelPosition(target.job, targetIndex);
            }
            if(index == -1)
                this.building[type].push(target);
            else {
                this.cancelPosition(type, index, true);
                this.building[type][index] = target;
            }
            target.job = type;
        },
        recruit(k) {
            var guildMember = this.$store.globalComponent["guildMember"];
            guildMember.recruit(k);
        },
        reject(k) {
            var guildMember = this.$store.globalComponent["guildMember"];
            guildMember.reject(k);
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
    // border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 1rem;
    // max-height: 35rem;
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
        width: 100%;
        .buildingUpgrade {
            width: 45%;
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
    // margin: 0.5rem;
    // border: 1px solid rgba(255, 255, 255, 0.404);
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
.questBoardContainer {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .questContainer {
        display: flex;
        flex-wrap: wrap;
        margin: 1px;
        padding: 2px;
        height: auto;
        width: 32%;
        border: 1px solid #48463f;
        border-radius: 0.3rem;
    }
    .questDetailField {
        position: relative;
        width: 100%;
    }
    .questDetailTitle {
        font-size: 15px;
    }
    .acceptQuest {
        position: absolute;
        right: 0;
        bottom: 0;
    }
}
.questRefresh {
    float: right;
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
