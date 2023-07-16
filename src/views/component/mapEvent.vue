<template>
    <div class='mapEvent scrollbar-morpheus-den scrollbar-square'>
        <minesweeper :difficulty="mineDifficulty" :rewardList="mineReward"></minesweeper>
        <battleAnime v-show="inBattle"></battleAnime>
        <div class="dungeonInfo">
            <a v-show="!inBattle" href="#" class="smallClose close" @click="close()"></a>
            <div class="title">
                奖励
            </div>
            <div class="detail">
                <div class="reward">
                    <div v-for="(v, k) in extraDungeonInfo[dungeonInfo.current].reward" :key="k">
                        <div class="grid" v-if="v[0]" @mouseover="showInfo($event,v[0].itemType,v[0],true)" @mouseleave="closeInfo(v[0].itemType)">
                            <div class="mediumIconContainer">
                                <del :class="[{grey:v[0].quality.qualityLv==1, green:v[0].quality.qualityLv==3, blue:v[0].quality.qualityLv==4, purple:v[0].quality.qualityLv==5, orange:v[0].quality.qualityLv==6}, 'mediumIcon iconBorder']"></del>
                                <img :src="v[0].description.iconSrc" alt="" />
                            </div>
                            <div class="quantity">{{v[1]+'%'}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="action" v-if="!inBattle && !harvesting && selectedDungeon.count!=0">
                <span v-if="selectedDungeon.type=='mine' || selectedDungeon.type=='herb'" >
                    <!-- <button class="btn btn-success btn-sm" @click="addToQueue(selectedDungeon)">
                        添加至队列
                    </button>   
                    <button class="btn btn-success btn-sm" @click="initMine()">
                        手动采集
                    </button>    -->
                    <button class="btn btn-success btn-sm" @click="toggleHarvest()">
                        采集
                    </button>   
                </span>
                <span v-else >
                    <button class="btn btn-success btn-sm" @click="toggleBattle(selectedDungeon.type)">
                        开始战斗
                    </button>   
                    <span v-if="auto">
                        <button class="btn btn-danger btn-sm" @click="autoBattle(false)">
                            自动中···
                        </button>    
                    </span>
                    <span v-else>
                        <button class="btn btn-success btn-sm" @click="toggleBattle(selectedDungeon.type, true)">
                            连续战斗
                        </button>    
                    </span>  
                </span>
            </div>    
            <div class="action" v-if="inBattle || harvesting">
                <div v-show="harvesting">
                    <div class="progress">
                        <div id="harvestProgressBar" class="progress-bar progress-bar-striped" :style="{backgroundColor:'#f0ad4e', width: (harvestProgress*100)+'%'}">
                        </div>
                    </div>
                    <button class="btn btn-danger btn-sm" @click="toggleHarvest()">
                        停止采集
                    </button>
                </div>
                <button v-if="inBattle" class="btn btn-danger btn-sm" @click="toggleBattle()">
                    放弃战斗
                </button>
            </div>    
        </div>
    </div>
</template>
<script>


import { spellEffect } from '../../assets/js/spellEffect';
import { map } from '../../assets/js/map';
import { monsterConfig } from '@/assets/config/monsterConfig'
import { spellConfig } from '@/assets/config/spellConfig'
import { buffConfig } from '@/assets/config/buffConfig'
import minesweeper from '../component/minesweeper';
import battleAnime from '../component/battleAnime';
export default {
    name: 'mapEvent',
    mixins: [spellEffect, map, monsterConfig, spellConfig, buffConfig],
    components: {minesweeper, battleAnime},
    props: {
    },
    data() {
        return {
            battleTimer: "",
            harvestProgress: 0,
            harvestTimer: "",
            harvesting: false,
            selectedDungeon: {},
            extraDungeonInfo: {normal:{}, elite:{}, boss:{}},
            type: {normal: '普通', elite: '精英', boss: 'BOSS', chest: '宝藏', mine: '矿物', herb: '草药'},
            mineDifficulty: 0,
            mineReward: [],
            reqExp: [],
        }
    },
    watch: {
        dungeon() {
            this.selectedDungeon = this.dungeon;
            this.$store.state.dungeonInfo.auto = false;
        }
    },
    props: {
        dungeon: {
            type: Object
        }
    },
    mounted() {
        this.$store.globalComponent.mapEvent = this;
        this.expReq();
    },
    computed: {
        auto() { return this.$store.state.dungeonInfo.auto;},
        inBattle() { return this.$store.state.dungeonInfo.inBattle;},
        dungeonInfo() { return this.$store.state.dungeonInfo;},
        playerAttr() { return this.$store.state.playerAttribute;},
    },
    methods: {
        init() {
            this.setReward();
        },
        toggleBattle(type, auto=false) {
            this.autoBattle(auto);
            if(this.dungeonInfo.inBattle) 
                this.setBattleStatus(false, false, true);
            else {
                this.startBattle(type);
            }
        },
        toggleHarvest() {
            if(this.harvesting)
                this.stopHarvest();
            else
                this.startHarvest();
        },
        startHarvest() {
            this.harvesting = true;
            setTimeout(() => {
                this.harvestProgress = 0;
                document.getElementById('harvestProgressBar').style.transition = '3s linear';
                this.harvestProgress = 1;
            }, 1);
            this.harvestTimer = setInterval(() => {
                if(!this.reduceCount(1) || this.selectedDungeon.count <= 0) {
                    clearInterval(this.harvestTimer);
                    this.stopHarvest();
                    return;
                }
                let guildPosition = this.$store.globalComponent["guildPosition"];
                guildPosition.mineReward(this.selectedDungeon.reward, 1);
                document.getElementById('harvestProgressBar').style.transition = '0s linear';
                this.harvestProgress = 0;
                setTimeout(() => {
                    document.getElementById('harvestProgressBar').style.transition = '3s linear';
                    this.harvestProgress = 1;
                }, 10);
            }, 3010);
        },
        stopHarvest() {
            document.getElementById('harvestProgressBar').style.transition = '0s linear';
            this.harvestProgress = 0;
            this.harvesting = false;
            clearInterval(this.harvestTimer);
        },
        startBattle(type) {
            if(!type)
                type = this.dungeonInfo['normal'].type;
            if(['normal', 'elite', 'boss', 'mine', 'herb'].indexOf(type) != -1)
                this.battle(type);
            if(type == 'chest') {
                this.chest();
                this.autoBattle(false);
            }
        },
        battle(type) {
            let playerAttribute = this.playerAttr,
                enemyAttribute = type == 'normal' ? this.$store.state.enemyAttribute : type == 'elite' ? this.$store.state.eliteAttribute : this.$store.state.bossAttribute,
                dungeonInfo = this.dungeonInfo;
            if(dungeonInfo.inBattle || !this.reduceResetCount()) {
                this.setBattleStatus(false, false);
                return;
            }
            if(enemyAttribute.attribute.CURHP.value == 0) {
                this.generateenemy();
                enemyAttribute = this.$store.state.enemyAttribute;
            }
            this.$store.commit("set_battle_info", {
                type: '',
                msg: '————战斗开始————'
            });
            this.setBattleStatus(true, true);
            setTimeout(() => {
                if(!this.dungeonInfo.inBattle) {
                    return;
                }
                if(this.playerAction(playerAttribute, enemyAttribute,) != false) {
                    setTimeout(() => {
                        this.enemyAction(enemyAttribute, playerAttribute,);
                    }, 1000);
                }
                clearInterval(this.battleTimer);
                this.battleTimer = setInterval(() => {
                    if(!this.dungeonInfo.inBattle) {
                        clearInterval(this.battleTimer);
                        return;
                    }
                    if(this.playerAction(playerAttribute, enemyAttribute) != false) {
                        setTimeout(() => {
                            this.enemyAction(enemyAttribute, playerAttribute);
                        }, 1000);
                    }
                }, 2000)
            }, 1000);
        },
        playerAction(source, target) {
            let dungeonInfo = this.dungeonInfo;
            if(!dungeonInfo.inBattle)
                return false;
            this.onAttack(source, target);
            if(source.attribute.CURHP.value == 0 || target.attribute.CURHP.value == 0) {
                this.setBattleStatus(false, dungeonInfo.auto);
                return false;
            }
            this.callAction(source, target);
            if(target.attribute.CURHP.value == 0)
                return false;
            return true;
        },
        enemyAction(source, target) {
            if(!this.dungeonInfo.inBattle)
                return false;
            this.onAttack(source, target);
            if(source.attribute.CURHP.value == 0 || target.attribute.CURHP.value == 0) {
                return false;
            }
            this.callAction(source, target);
        },
        victory(source, target) {
            this.reward();
            this.setBattleStatus(false, this.dungeonInfo.auto);
            if(this.selectedDungeon.resetCount != this.selectedDungeon.resetMax)
                this.reduceResetCount(this.selectedDungeon.resetCount);
            if(this.selectedDungeon.count == 0)
                this.autoBattle(false);
            // this.levelToTarget(target.lv);
            this.gainExpByLv(target.lv, target.type);
            this.$store.commit("set_battle_info", {
                type: 'win',
                msg: '战斗结束, 你胜利了'
            });
        },
        defeat(source, target) {
            this.setBattleStatus(false, false);
            this.$store.commit("set_battle_info", {
                type: 'lose',
                msg: '战斗结束, 你扑街了'
            });
        },
        setReward() {
            let types = ['normal', 'elite', 'boss'];
            for(let i in types) {
                let type = types[i];
                let lv = this.dungeonInfo[type].level;
                let monsterID = this.getMonsterID(lv, type);
                let reward = this.getReward(type, monsterID);
                this.extraDungeonInfo[type].reward = this.actualReward(reward);
            }            
        },
        reduceCount(count=1) {
            if(this.selectedDungeon.count > 0) {
                this.selectedDungeon.count -= Math.min(count, this.selectedDungeon.count);
                this.selectedDungeon.resetCount = this.selectedDungeon.resetMax;
                return true;
            }
            else if(this.selectedDungeon.count == 0)
                return false;
            return true;
        },
        reduceResetCount(count=1) {
            if(this.selectedDungeon.resetCount <= 0) {
                return this.reduceCount();
            }
            this.selectedDungeon.resetCount -= count;
            if(this.selectedDungeon.resetCount == 0) {
                return this.reduceCount();
            }
            return true;
        },
        gainExpByLv(lv, type) {
            let exp = 35+lv*5;
            if(type == 'elite')
                exp *= 3;
            else if(type == 'boss')
                exp *= 10;
            let tempExp = 0;
            let playerLv = this.playerAttr.lv;
            if(lv>playerLv) {
                // 经验上限125%
                tempExp = exp*(lv-playerLv)*1.05;
                exp = Math.min(tempExp, exp*1.25);
            }
            else {
                // 经验下限10%
                tempExp = exp*(1-(playerLv-lv)*0.1);
                exp = Math.max(tempExp, exp*0.1);
            }
            this.gainExp(exp);
        },
        gainExp(exp) {
            exp = Math.round(exp);
            let playerLv = this.playerAttr.lv;
            let curExp = this.playerAttr.exp.cur + exp;
            let reqExp = this.reqExp[playerLv];
            if(reqExp == undefined) {
                this.expReq();
                reqExp = this.reqExp[playerLv];
            }
            if(curExp >= reqExp) {
                this.playerAttr.exp.cur = curExp-reqExp;
                this.levelUp();
            }
            else
                this.playerAttr.exp.cur = curExp;
            if(exp > 0) {
                let element = document.getElementById('expInfo');
                let node = document.createElement('DIV');
                let textnode = document.createTextNode("+"+exp+'exp');
                node.appendChild(textnode);
                element.appendChild(node); 
                node.style.position = 'absolute';
                node.style.width = '10rem';
                node.style.color = '#aaf';
                node.style.top = '2.5rem';
                node.style.right = '3rem';
                node.style.transition = '1s';
                node.style.transitionTimingFunction = 'ease-out';
                setTimeout(()=>{
                    node.style.top = '1rem';
                },1);
                setTimeout(()=>{
                    element.removeChild(node);
                },800);
            }
        },
        expReq() {
            this.reqExp[0] = 0;
            for(let i=1; i<200; i++) {
                if(i<10)
                    this.reqExp[i] = this.reqExp[i-1]+(20+i*10)
                else
                    this.reqExp[i] = this.reqExp[i-1]+(35+i*20)
            }
        },
        // levelToTarget(target) {
        //     this.talentLevelToTarget(target);
        //     while(this.playerAttr.lv < target)
        //         this.levelUp();
        // },
        levelUp() {
            let quest =  this.$store.globalComponent['quest']; 
            this.playerAttr.lv += 1;
            this.playerAttr.exp.req = this.reqExp[this.playerAttr.lv];
            this.talentLevelUp();
            if(this.playerAttr.lv == 10) {
                let element = document.getElementById('talentTree');
                element.classList.add('glow');
                quest.assignQuest(15);
                quest.assignQuest(16);
            }
            // 如果升级后有溢出经验，继续尝试升级
            this.gainExp(0);
        },
        talentLevelToTarget(target) {
            while(this.playerAttr.talentLv < target)
                this.talentLevelUp();
        },
        talentLevelUp() {
            this.playerAttr.talentLv += 1;
            if(this.playerAttr.talentLv > 10)
                this.playerAttr.talentPoint += 1;
        },
        autoBattle(auto) {
            if(auto == undefined)
                this.dungeonInfo.auto = !this.dungeonInfo.auto;
            else
                this.dungeonInfo.auto = auto;
        },
        setBattleStatus(inBattle, auto=true, immediate=false) {
            let index = this.$store.globalComponent["index"];
            index.clearShield(this.playerAttr);
            index.clearTurnbaseBuff(this.playerAttr);
            if(immediate || inBattle) {
                this.dungeonInfo.inBattle = inBattle;
                if(!inBattle) {
                    clearInterval(this.battleTimer);
                    this.autoBattle(auto);
                    if(this.selectedDungeon.resetCount < 1) {
                        index.set_enemy_hp('remove');
                    }
                }
            }
            else {
                setTimeout(() => {
                    this.dungeonInfo.inBattle = inBattle;
                    if(!inBattle) {
                        clearInterval(this.battleTimer);
                        this.autoBattle(auto);
                        if(this.selectedDungeon.resetCount < 1) {
                            index.set_enemy_hp('remove');
                        }
                        if(auto && !this.$store.state.setting.waitFull)
                            this.startBattle(this.dungeonInfo[this.dungeonInfo.current].option);
                    }
                }, 1000);
            }
        },
        addToQueue(dungeon) {
            let guildPosition = this.$store.globalComponent["guildPosition"];
            let guild = this.$store.state.guildAttribute;
            if(guildPosition.mineQueue.length >= guildPosition.mineMaxQty[guild.mine.lv]) {
                this.$store.commit("set_sys_info", {
                    type: 'danger',
                    msg: '挖矿队列已满',
                });
                return;
            }
            let newDungeon = this.$deepCopy(dungeon);
            newDungeon.progress = [0, this.monster[newDungeon.monsterID].template.MAXHP];
            newDungeon.available = 0;
            this.reduceCount(999999);
            switch(dungeon.type) {
                case 'mine':
                    newDungeon.member = {};
                    guildPosition.mineQueue.push(newDungeon);
                    break;
                case 'herb':
                    break;
            }
        },
        initMine() {
            if(!this.reduceCount(10))
                return;
            this.mineDifficulty = Math.floor(Math.random()*3);
            this.mineReward = this.$deepCopy(this.selectedDungeon.reward);
            let minesweeper = this.$store.globalComponent["minesweeper"];
            // 直接调用reset会导致传进去的mineDifficulty还是之前的值
            setTimeout(() => {
                minesweeper.reset();
            }, 1);
        },
        chest() {
            this.reduceResetCount();
            this.reward();
        },
        onAttack(source, target) {
            let index = this.$store.globalComponent["index"];
            index.TriggerOnAttack(source, target);
            if(source.type == 'player') {
                this.setSpellProgress(source, source, 'add', 'all', 1);
            }
        },
        reward() {
            let lottery = this.$store.globalComponent["lottery"];
            if(this.dungeonInfo.normal.isLottery) {
                lottery.initLottery(this.dungeonInfo.normal.lotReward, this.dungeonInfo.normal.level);
                return;
            }
            let equip = ['helmet', 'weapon', 'armor', 'shoe', 'shoulder', 'glove', 'ring', 'cape', 'bracer', 'belt', 'legging', 'necklace'];
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let equipInfo = this.$store.globalComponent["equipInfo"];   
            let backpack = this.$store.globalComponent["backpack"];   
            let rewardList = this.dungeonInfo.normal.reward;
            for(let k=0; k<rewardList.length; k++) {
                let random = Math.random()*100;
                if(random <= rewardList[k][1]) {
                    let type = rewardList[k][0].itemType;
                    if(equip.indexOf(type) != -1)
                        backpack.giveEquip(JSON.parse(equipInfo.finishUniqueEquip(rewardList[k][0])), false, true);
                    else {
                        let qty = rewardList[k][2]==undefined ? 1 : rewardList[k][2];
                        qty = rewardList[k][3]==undefined ? qty : qty+Math.ceil(Math.random()*(rewardList[k][3]-qty));
                        rewardList[k][0].quantity = qty;
                        itemInfo.addItem(rewardList[k][0], true);
                        rewardList[k][0].quantity = rewardList[k][2]==undefined ? 1 : rewardList[k][2];
                    }
                }
            }
        },
        eliteStat(attribute) {
            attribute['ATK'] = {
                value: attribute['ATK'].value,
                showValue: attribute['ATK'].value,
            }
            attribute['DEF'] = {
                value: attribute['DEF'].value,
                showValue: attribute['DEF'].value,
            }
            attribute['AP'] = {
                value: attribute['AP'].value,
                showValue: attribute['AP'].value,
            }
            attribute['BLOCK'] = {
                value: attribute['BLOCK'].value,
                showValue: attribute['BLOCK'].value,
            }
            attribute['MAXHP'] = {
                value: attribute['MAXHP'].value*15,
                showValue: attribute['MAXHP'].value*15
            }
            attribute['CURHP'] = {
                value: attribute['MAXHP'].value,
                showValue: attribute['MAXHP'].value
            }
            return attribute;
        },
        bossStat(attribute) {
            attribute['ATK'] = {
                value: attribute['ATK'].value*2,
                showValue: attribute['ATK'].value*2,
            }
            attribute['DEF'] = {
                value: attribute['DEF'].value*2,
                showValue: attribute['DEF'].value*2,
            }
            attribute['AP'] = {
                value: attribute['AP'].value*2,
                showValue: attribute['AP'].value*2,
            }
            attribute['BLOCK'] = {
                value: attribute['BLOCK'].value*2,
                showValue: attribute['BLOCK'].value*2,
            }
            attribute['MAXHP'] = {
                value: attribute['MAXHP'].value*100,
                showValue: attribute['MAXHP'].value*100
            }
            attribute['CURHP'] = {
                value: attribute['MAXHP'].value,
                showValue: attribute['MAXHP'].value
            }
            return attribute;
        },
        close() {
            let index = this.$store.globalComponent["index"];
            if(index.dungeon) {
                index.dungeon.selected = false;
                index.dungeon = {};
            }
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

<style lang="scss" scope>
.mapEvent {
    overflow-y: auto;
    height: calc(100% - 20rem);
}
.dungeonInfo {
    position: relative;
    margin: 0.5rem 0rem;
    max-height: 28rem;
    text-align: left;
    background: rgb(19, 19, 19);
    .title {
        height: 2rem;
        margin: 0.3rem 0rem;
        padding-left: 1rem;
        font-size: 1.1rem;
        background: rgb(32, 32, 32);
        box-shadow: 0 0 2px 2px rgba(7, 7, 7, 0.8);
        border-top: 2px solid rgb(43, 43, 43);
    }
    .detail {
        color: rgb(201, 201, 201);
        padding-left: 1rem;
        box-shadow: 0 0 1px 1px rgba(7, 7, 7, 0.5);
    }
    .action {
        text-align: center;
        button {
            margin: 0.5rem 1rem;
        }
    }
}
.reward {
    display: flex;
    flex-wrap: wrap;
}

</style>