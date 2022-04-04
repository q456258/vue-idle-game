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
            <div id="questList">
                <div :class="[{questSelected: v.id==selectedQuest}, 'quests']" v-for="(v, k) in quests" :key="k" @click="selectQuest(v.id)">
                    <a class="questHover"></a>
                    <span class="questName">({{v.lv}}){{v.name}}
                    </span>
                    <span class="questStatus" v-show="v.status=='完成'">(完成)</span>
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
                            <div v-for="(v, k) in quests[selectedQuest].reward" :key="k">
                                <div class="grid" v-if="v[0]" @mouseover="showInfo($event,v[0].itemType,v[0],true)" @mouseleave="closeInfo(v[0].itemType)">
                                    <div class="mediumIconContainer">
                                        <del :class="[{grey:v[0].quality.qualityLv==1, green:v[0].quality.qualityLv==3, blue:v[0].quality.qualityLv==4, purple:v[0].quality.qualityLv==5, orange:v[0].quality.qualityLv==6}, 'mediumIcon iconBorder']"></del>
                                        <img :src="v[0].description.iconSrc" alt="" />
                                    </div>
                                    <div class="quantity">{{v[0].quantity}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="questFooter">
                <div class="questButton" v-if="selectedQuest>=0" @click="submitQuest()">提交</div>
                <div class="questButton" v-if="selectedQuest>=0" @click="forfeitQuest()">放弃</div>
            </div>
        </div>
    </template>
</draggable>
</template>
<script>
import draggable from '../uiComponent/draggable';
import { questConfig } from '@/assets/config/questConfig';
import { monsterConfig } from '@/assets/config/monsterConfig';
import { itemConfig } from '@/assets/config/itemConfig';
export default {
    name:"quest",
    mixins: [questConfig, monsterConfig, itemConfig],
    components: {draggable},
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
        quests() { return this.$store.state.quests; }
    },
    methods: {
        init() {
            this.resetTracker();
        },
        resetTracker() {
            let quests = this.$store.state.quests;
            for(let questId in quests) {
                let reqs = this.questList[questId].reqs;
                for(let i in reqs) {
                    if(this.questTrack[reqs[i][0]][reqs[i][1]] == undefined)
                        this.questTrack[reqs[i][0]][reqs[i][1]] = []
                    this.questTrack[reqs[i][0]][reqs[i][1]].push(questId);
                }
            }
        },
        assignQuest(questId) {
            if(this.$store.state.quests == undefined)
                this.$store.state.quests = {};
            if(this.$store.state.quests[questId] != undefined) {
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
            let quest = {};
            quest.id = questId;
            quest.lv = this.questList[questId].lv;
            quest.name = this.questList[questId].name;
            quest.desc = this.questList[questId].desc;
            quest.target = this.questList[questId].target;
            quest.reward = this.setQuestReward(questId);
            quest.reqs = this.setQuestRequirement(questId);
            quest.status = '';

            this.$store.state.quests[questId] = quest;
            this.checkStatus(questId);
        },
        setQuestReward(questId) {
            let equipInfo = this.$store.globalComponent.equipInfo;
            let itemInfo = this.$store.globalComponent.itemInfo;
            let reward = [];
            let lv = this.questList[questId].lv;
            for(let type in this.questList[questId].rewardType) {
                let rewardInfo = this.questList[questId].rewardType[type];
                let ran = Math.random()*100;
                if(rewardInfo[0] == 'unique_equip') {
                    if(ran < rewardInfo[2]) {
                        let newEquip = JSON.parse(equipInfo.createUniqueEquipTemplate(rewardInfo[1]));
                        reward.push([newEquip]);
                    }
                }
                else if(ran < rewardInfo[1])
                    reward.push([JSON.parse(itemInfo.createItem(rewardInfo[0], 1, lv))]);
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
                if(reqInfo.reqType == 'slain') {
                    reqInfo.name = this.monster[reqInfo.type].name;
                    if(this.questTrack[reqInfo.reqType][reqInfo.type] == undefined)
                        this.questTrack[reqInfo.reqType][reqInfo.type] = []
                    this.questTrack[reqInfo.reqType][reqInfo.type].push(questId);
                }
                else if(reqInfo.reqType == 'collect') {
                    reqInfo.name = this.itemType[reqInfo.type].description.name;
                    reqInfo.current = itemInfo.getItemQty(reqInfo.type);
                    if(this.questTrack[reqInfo.reqType][reqInfo.type] == undefined)
                        this.questTrack[reqInfo.reqType][reqInfo.type] = []
                    this.questTrack[reqInfo.reqType][reqInfo.type].push(questId);
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
        increaseProgress(type, questId, key, quantity) {
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
        selectQuest(id) {
            this.selectedQuest = id;
        },
        submitQuest() {
            this.removeQuestItem();
            this.reward();
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
            delete this.$store.state.quests[this.selectedQuest];
            this.selectedQuest = -1;
        },
        reward() {
            let equip = ['helmet', 'weapon', 'armor', 'shoe', 'shoulder', 'glove', 'ring', 'cape', 'bracer', 'belt', 'legging', 'necklace'];
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let equipInfo = this.$store.globalComponent["equipInfo"];   
            let backpack = this.$store.globalComponent["backpack"];   
            let rewardList = this.$store.state.quests[this.selectedQuest].reward;
            for(let k=0; k<rewardList.length; k++) {
                let type = rewardList[k][0].itemType;
                if(equip.indexOf(type) != -1)
                    backpack.giveEquip(JSON.parse(equipInfo.finishUniqueEquip(rewardList[k][0])), false, true);
                else
                    itemInfo.addItem(rewardList[k][0], true);
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
                index.closeInfo('eqiup');
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
.quests {
    position: relative;
    font-size: 15px;
    line-height: 25px;
}
.questName {
    position: relative;
    margin-left: 10px;
    float: left;
}
.questStatus {
    float: right;
}
.questHover {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    display: block;
    &:hover{
        box-shadow: inset 0 0 10px rgba(123, 176, 255, 0.651);
    }
}
.questSelected {
    box-shadow: inset 0 0 10px rgba(123, 255, 139, 0.651);
    background-image: linear-gradient(-270deg, rgba(167, 160, 160, 0) 0%, #59b94c85 40%, #87cf6b69 60%, rgba(255,255,255,0.00) 100%);
}
.questButton {
    width: 50px;
    height: 25px;
    border: 1px solid #494745;
    border-radius: 5px;
    background-image: linear-gradient(180deg, rgb(82, 0, 0) 0%, #910000 40%, #910000 60%, rgb(82, 0, 0) 100%);
    background-color: #a80000;
    box-shadow: inset 0 0 10px rgb(0, 0, 0);
    color: rgb(192, 163, 0);
    font-size: 15px;
    margin: auto 0 auto 0;
}
.questDetailField {
    margin-top: 10px;
    text-align: left;
}
.questDetailTitle {
    font-size: 25px;
    
}
// .questDetailContent {
// 
// }
</style>
