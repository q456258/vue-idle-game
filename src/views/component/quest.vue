<template>
<draggable class="quest">
    <template slot="header">
        <div id="questHeader">
            <a href="#" class="close" @click="closeQuest()"></a>
            <div id="questTitle">
                任务
            </div>    
        </div>
    </template>
    <template slot="main" >
        <div id="questWrapper">
            <div id="questList" class="scrollbar-morpheus-den">
                <div class="questCateg" v-for="(v, k) in questCateg" :key="k" @click="expandQuestCateg($event)">
                    <span class="questCategName " v-if="k!='forceUpdate'">
                        <span class="questButton">&nbsp;&minus;&nbsp;</span>&nbsp;{{questCategory[k]}}
                    </span>
                    <span v-if="questCateg[k]">
                        <div :class="[{optionSelected: val==selectedQuest}, 'quests']" v-for="(val, key) in questCateg[k].list" :key="key" @click="selectQuest(val)">
                            <a class="optionHover"></a>
                            <span class="questName">（{{quests[val].lv}}）{{quests[val].name}}
                            </span>
                            <span class="questStatus" v-show="quests[val].status=='完成'">(完成)</span>
                        </div>
                    </span>
                </div>
            </div>
            <div id="questDetail">
                <div v-if="selectedQuest>=0">
                    <div class="questDetailField">
                        <div class="questDetailTitle">{{quests[selectedQuest].name}}</div>
                        <div class="questDetailContent">{{quests[selectedQuest].target}}</div>
                        <br>
                        <div v-for="(v, k) in quests[selectedQuest].reqs" :key="k">
                            {{v.current+"/"+v.target+" "+v.name}}
                        </div>
                    </div>
                    <div class="questDetailField">
                        <div class="questDetailTitle">描述</div>
                        <div class="questDetailContent">{{quests[selectedQuest].desc}}</div>
                    </div>
                    <div class="questDetailField">
                        <div class="questDetailTitle">奖励</div>
                        <div class="questDetailContent">
                            <div v-for="(v, k) in quests[selectedQuest].rewardItem" :key="k">
                                <div class="grid" v-if="v[0]" @mouseover="showInfo($event,v[0].itemType,v[0],true)" @mouseleave="closeInfo(v[0].itemType)">
                                    <div class="mediumIconContainer">
                                        <del :class="[{grey:v[0].quality.qualityLv==1, green:v[0].quality.qualityLv==3, blue:v[0].quality.qualityLv==4, purple:v[0].quality.qualityLv==5, orange:v[0].quality.qualityLv==6}, 'mediumIcon iconBorder']"></del>
                                        <img :src="v[0].description.iconSrc" alt="" />
                                    </div>
                                    <div class="quantity">{{v[0].quantity}}</div>
                                </div>
                            </div>
                            <div class="reward" v-for="(v, k) in quests[selectedQuest].reward" :key="k+'a'">
                                <div v-if="v[0]=='gold'"><currency :isCost="false" :amount="v[1]"></currency></div>
                                <div v-else>{{rewardType[v[0]]+': '+v[1]}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="questFooter">
                <div class="questFooterField">
                    <div class="questButton" v-if="selectedQuest>=0 && quests[selectedQuest].status=='完成'" @click="submitQuest()">提交</div>
                </div>
                <div class="questFooterField">
                    <div class="questButton forfeit" v-if="selectedQuest>=0 && questList[selectedQuest].forfeit" @click="forfeitQuest()">放弃</div>
                </div>
            </div>
        </div>
    </template>
</draggable>
</template>
<script>
import draggable from '../uiComponent/draggable';
import currency from '../uiComponent/currency';
import { questConfig } from '@/assets/config/questConfig';
import { monsterConfig } from '@/assets/config/monsterConfig';
import { itemConfig } from '@/assets/config/itemConfig';
export default {
    name:"quest",
    mixins: [questConfig, monsterConfig, itemConfig],
    components: {draggable, currency},
    props: {
    },
    data () {
        return {
            selectedQuest: -1,
            questTrack: {
                slain: {},
                collect: {},
                event: {}
            }
        }
    },
    mounted () {
        this.$store.globalComponent.quest = this;
        this.resetTracker();
    },
    watch: {
    },
    computed: {
        quests() { return this.$store.state.quests; },
        questCateg() { return this.$store.state.questCateg; }
    },
    methods: {
        init() {
            this.resetTracker();
        },
        resetTracker() {
            let quests = this.$store.state.quests;
            for(let questId in quests) {
                let reqs = quests[questId].reqs;
                for(let i in reqs) {
                    if(this.questTrack[reqs[i].reqType][reqs[i].type] == undefined)
                        this.questTrack[reqs[i].reqType][reqs[i].type] = []
                    this.questTrack[reqs[i].reqType][reqs[i].type].push(questId);
                }
            }
        },
        assignQuest(questId, questInfo={}) {
            if(this.quests[questId] != undefined) {
                this.$store.commit("set_sys_info", {
                    type: '',
                    msg: '任务重复接取!',
                });
                return;
            }
            this.$store.commit("set_sys_info", {
                type: 'win',
                msg: '新任务: '+this.questList[questId].name,
            });
            if(questInfo.id == undefined)
                questInfo = this.generateQuest(questId);
            this.addToTrack(questInfo);
            let category = this.questList[questId].category;
            if(this.questCateg[category] == undefined)
                this.questCateg[category] = {list: [], expand: true};
            this.questCateg[category].list.push(questId);

            this.questCateg.forceUpdate = 1;
            this.$set(this.questCateg, 'forceUpdate', this.questCateg.forceUpdate+1);
            this.$set(this.quests, questId, questInfo);
            this.checkStatus(questId);
        },
        generateQuest(questId) {
            let quest = {};
            quest.id = questId;
            quest.lv = this.questList[questId].lv;
            quest.name = this.questList[questId].name;
            quest.category = this.questList[questId].category;
            quest.desc = this.questList[questId].desc;
            quest.target = this.questList[questId].target;
            quest.reward = this.setQuestReward(questId);
            quest.rewardItem = this.setQuestRewardItem(questId);
            quest.reqs = this.setQuestRequirement(questId);
            quest.successor = this.questList[questId].successor;
            quest.status = '';
            return quest;
        },
        setQuestReward(questId) {
            let reward = [];
            for(let type in this.questList[questId].reward) {
                let rewardInfo = this.questList[questId].reward[type];
                reward.push([rewardInfo[0], rewardInfo[1]]);
            }
            return reward;
        },
        setQuestRewardItem(questId) {
            let equipInfo = this.$store.globalComponent.equipInfo;
            let itemInfo = this.$store.globalComponent.itemInfo;
            let backpack = this.$store.globalComponent.backpack;
            let reward = [];
            let lv = this.questList[questId].lv;
            for(let type in this.questList[questId].rewardItem) {
                let rewardInfo = this.questList[questId].rewardItem[type];
                let ran = Math.random()*100;
                if(rewardInfo[0] == 'unique_equip') {
                    if(ran < rewardInfo[3]) {
                        let newEquip = JSON.parse(equipInfo.createUniqueEquipTemplate(rewardInfo[1]));
                        reward.push([newEquip]);
                    }
                }
                else if(rewardInfo[0].indexOf('random_equip') != -1) {
                    reward.push([backpack.callItemEffect(rewardInfo[0], lv, {toBackpack: false, equipOption: rewardInfo[3]})]);
                }
                else if(ran < rewardInfo[2])
                    reward.push([JSON.parse(itemInfo.createItem(rewardInfo[0], rewardInfo[1], lv))]);
            }
            return reward;
        },
        setQuestRequirement(questId) {
            let reqList = [];
            let reqs = this.questList[questId].reqs;
            let itemInfo = this.$store.globalComponent.itemInfo;
            for(let i in reqs) {
                let reqInfo = {};
                reqInfo.reqType = reqs[i][0];
                reqInfo.type = reqs[i][1];
                reqInfo.target = reqs[i][2];
                reqInfo.current = 0;
                reqInfo.name = '';
                if(reqInfo.reqType == 'slain') {
                    reqInfo.name = this.monster[reqInfo.type].name;
                }
                else if(reqInfo.reqType == 'collect') {
                    reqInfo.name = this.itemType[reqInfo.type].description.name;
                    reqInfo.current = itemInfo.getItemQty(reqInfo.type);
                }
                else if(reqInfo.reqType == 'event') {
                    reqInfo.name = this.eventId[reqInfo.type];
                }
                reqList.push(reqInfo);
            }
            return reqList;
        },
        trackProgress(type, key, quantity) {
            let track = this.questTrack[type];
            for(let i in track[key]) {
                this.increaseProgress(type, track[key][i], key, quantity);
            }
        },
        removeFromCateg(questId) {
            if(questId == -1)
                return;
            let quest = this.quests[questId];
            let list = this.questCateg[quest.category].list;
            list.splice(list.indexOf(questId), 1);
            if(list.length == 0)
                delete this.questCateg[quest.category];
        },
        addToTrack(questInfo) {
            let reqs = questInfo.reqs;
            for(let i in reqs) {
                let reqInfo = {};
                reqInfo.reqType = reqs[i].reqType;
                reqInfo.type = reqs[i].type;
                if(this.questTrack[reqInfo.reqType][reqInfo.type] == undefined)
                    this.questTrack[reqInfo.reqType][reqInfo.type] = []
                this.questTrack[reqInfo.reqType][reqInfo.type].push(questInfo.id);
            }
        },
        removeFromTrack(questId) {
            let reqs = this.quests[questId].reqs;
            for(let i in reqs) {
                let type = this.questTrack[reqs[i].reqType][reqs[i].type];
                type.splice(type.indexOf(questId), 1);
                if(type.length == 0)
                    delete this.questTrack[reqs[i].reqType][reqs[i].type];
            }
        },
        increaseProgress(type, questId, key, quantity) {
            quantity = parseInt(quantity);
            let quest = this.quests[questId];
            let itemInfo = this.$store.globalComponent.itemInfo;
            for(let i in quest.reqs) {
                if(quest.reqs[i].type == key) {
                    if(type == 'collect') {
                        quest.reqs[i].current = itemInfo.getItemQty(key);
                        quantity = 0;
                    }
                    if(quest.reqs[i].current+quantity >= quest.reqs[i].target) {
                        quest.reqs[i].current += quantity;
                        this.checkStatus(questId);
                    }
                    else 
                        quest.reqs[i].current += quantity;
                }
            }
            if(quantity <= 0)
                this.checkStatus(questId);
        },
        checkStatus(questId) {
            let quest = this.quests[questId];
            for(let i in quest.reqs) {
                if(quest.reqs[i].current < quest.reqs[i].target) {
                    this.changeStatus(questId, "未完成");
                    return;
                }
            }
            this.changeStatus(questId, "完成");
        },
        changeStatus(questId, status) {
            let quest = this.quests[questId];
            quest.status = status;
        },
        expandQuestCateg(e) {
            if(!e.target.classList.contains("questCateg"))
                return;
            if(e.target.lastChild.style["display"] == 'none'){
                e.target.lastChild.style.display = 'block';
                e.target.firstChild.firstChild.innerHTML = '&nbsp;&minus;&nbsp;';
            }
            else {
                e.target.lastChild.style.display = 'none';
                e.target.firstChild.firstChild.innerHTML = '&nbsp;+&nbsp;';
            }
                
            // e.target.lastChild.classList.toggle("expand");
        },
        selectQuest(id) {
            this.selectedQuest = id;
        },
        submitQuest() {
            this.removeQuestItem();
            this.reward();
            this.successorQuest();
            this.removeQuest();
        },
        forfeitQuest() {
            this.$message({
                message: '确定放弃该任务吗?',
                confirmBtnText: '确认',
                onClose: () => {
                    this.removeQuest();
                }
            });
        },
        removeQuestItem() {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let reqs = this.$store.state.quests[this.selectedQuest].reqs;
            for(let i in reqs) {
                if(reqs[i].reqType == 'collect') {
                    itemInfo.removeItemByCode(reqs[i].type, reqs[i].target);
                }
            }
        },
        removeQuest() {
            this.removeFromCateg(this.selectedQuest);
            this.removeFromTrack(this.selectedQuest);
            delete this.$store.state.quests[this.selectedQuest];
            this.selectedQuest = -1;
        },
        reward() {
            let equip = ['helmet', 'weapon', 'armor', 'shoe', 'shoulder', 'glove', 'ring', 'cape', 'bracer', 'belt', 'legging', 'necklace'];
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let equipInfo = this.$store.globalComponent["equipInfo"];   
            let backpack = this.$store.globalComponent["backpack"];   
            let guild = this.$store.globalComponent["guild"];
            let mapEvent = this.$store.globalComponent["mapEvent"];
            let rewardList = this.$store.state.quests[this.selectedQuest].rewardItem;
            for(let k=0; k<rewardList.length; k++) {
                let type = rewardList[k][0].itemType;
                if(equip.indexOf(type) != -1)
                    backpack.giveEquip(JSON.parse(equipInfo.finishUniqueEquip(rewardList[k][0])), false, true);
                else
                    itemInfo.addItem(rewardList[k][0], true);
            }
            rewardList = this.$store.state.quests[this.selectedQuest].reward;
            for(let k=0; k<rewardList.length; k++) {
                switch(rewardList[k][0]) {
                    case 'gold':
                        guild.getGold('任务奖励', rewardList[k][1]);
                        break;
                    case 'guildReputation':
                        guild.getReputation('任务奖励', rewardList[k][1]);
                        break;
                }
            }
        },
        successorQuest() {
            let successor = this.questList[this.selectedQuest].successor;
            for(let i in successor) {
                this.assignQuest(successor[i]);
            }
        },
        closeQuest() {
            let index = this.$store.globalComponent["index"];
            index.openMenuPanel('quest');
        },
        showInfo($event, type, item, compare) {
            let index = this.$store.globalComponent["index"];
            index.showInfo($event, type, item, compare);
        },
        closeInfo(type) {
            let index = this.$store.globalComponent["index"];
            let equip = ['helmet', 'weapon', 'armor', 'shoe', 'shoulder', 'glove', 'ring', 'cape', 'bracer', 'belt', 'legging', 'necklace'];

            if(equip.indexOf(type) != -1)
                index.closeInfo('equip');
            else
                index.closeInfo('item');
        },
    }
}
</script>
<style lang="scss">
.quest {
    position: absolute;
	display: flex;
    flex-direction: column;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border: 2px solid #49474577;
    border-radius: 5px;
    background-color: #231f1bb2;
    // width: 650px;
    width: 790px;
    height: 603px;
    z-index: 9;
}
#questHeader {
    // width: 646px;
    width: 786px;
    height: 40px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding-left: 7px;
    border: 1px solid #494745;
    border-bottom: none;
    background-color: #231f1b;
}
#questTitle {
    height: 40px;
    font-size: 21px;
}
#questWrapper {
    margin-top: 40px;
	display: flex;
    flex-wrap: wrap;
    // width: 650px;
    width: 786px;
    height: 569px;
    z-index: 10;
    margin-left: auto;
    margin-right: auto;
}
#questList {
    display: flex;
    flex-direction: column;
    background-color: #161616;
    padding-right: 5px;
	// width: 254px;
	width: 392px;
	height: 529px;
    overflow: auto;
}
#questDetail {
    background-color: #000000;
    background-image: url("/icons/ui/questBG.png");
	width: 392px;
	height: 529px;
    padding: 10px;
    color: #000000;
}
#questFooter {
    background-color: #292929;
	width: 100%;
	height: 30px;
    display: flex;
}
.questCateg {
    text-align: left;
    .questCategName {
        pointer-events: none;
        .questButton {
            width: 10px;
        }
    }
}
.quests {
    position: relative;
    height: 25px;
    font-size: 15px;
    line-height: 25px;
    padding-left: 10px;
    display: block;
}
.questName {
    position: relative;
    left: 5px;
    float: left;
    display: flex;
    pointer-events: none;
}
.questStatus {
    float: right;
}
.questFooterField {
    display: flex;
    width: 50%;
}
.questButton {
    width: 50px;
    height: 25px;
    border: 1px solid #1d1d1d;
    border-radius: 5px;
    background-image: linear-gradient(180deg, rgb(39, 0, 0) 0%, #5a0000 30%, #5a0000 70%, rgb(39, 0, 0) 100%);
    box-shadow: inset 0 0 5px rgb(0, 0, 0);
    color: rgb(192, 163, 0);
    font-size: 15px;
    margin: auto 0 auto 0;
}
.questDetailField {
    margin-top: 10px;
    text-align: left;
}
.questDetailTitle {
    font-size: 22px;
}
.questDetailContent {
    display:flex;
    flex-wrap: wrap;
    .reward {
        width: 100%;
        // color: white;
        // text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
    }
}
</style>
