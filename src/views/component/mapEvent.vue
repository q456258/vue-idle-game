<template>
    <div class='mapEvent scrollbar-morpheus-den scrollbar-square'>
        <minesweeper :difficulty="mineDifficulty" :rewardList="mineReward"></minesweeper>
        <battleAnime v-show="inBattle"></battleAnime>
        <!-- <battleAnime></battleAnime> -->
        <div class="dungeonInfo" v-if="dungeon.type">
            <a href="#" class="close" @click="close()"></a>
            <div class="title">
                信息
            </div>
            <div class="detail">
                <!-- <div class="centerImg"><img :src="selectedDungeon.img"></div> -->
                <div>怪物: {{selectedDungeon.monsterName}}</div>
                <div>等级: {{selectedDungeon.lv}}</div>
                <div>类型: {{type[selectedDungeon.type]}}</div>
                <div>剩余次数: 
                    <span v-if="selectedDungeon.count>=0">{{selectedDungeon.count}}</span>
                    <span v-else>无限</span>
                </div>
            </div>
            <div class="title">
                奖励
            </div>
            <div class="detail">
                <div class="reward">
                    <div v-for="(v, k) in selectedDungeon.reward" :key="k">
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
            <div class="action" v-if="!inBattle&&selectedDungeon.count!=0">
                <span v-if="selectedDungeon.type=='gold' || selectedDungeon.type=='mine'" >
                    <button class="btn btn-success btn-sm" @click="addToQueue(selectedDungeon)">
                        添加至队列
                    </button>   
                    <button class="btn btn-success btn-sm" @click="initMine()">
                        手动采集
                    </button>   
                </span>
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
            </div>    
            <div class="action" v-if="inBattle">
                <button v-if="inBattle" class="btn btn-danger btn-sm" @click="toggleBattle()">
                    放弃战斗
                </button>
            </div>    
        </div>
    </div>
</template>
<script>

import { assist } from '../../assets/js/assist';
import { spellEffect } from '../../assets/js/spellEffect';
import { buffAndTrigger } from '../../assets/js/buffAndTrigger';
import { monsterConfig } from '@/assets/config/monsterConfig'
import { spellConfig } from '@/assets/config/spellConfig'
import { buffConfig } from '@/assets/config/buffConfig'
import minesweeper from '../component/minesweeper';
import battleAnime from '../component/battleAnime';
export default {
    name: 'mapEvent',
    mixins: [assist, spellEffect, buffAndTrigger, monsterConfig, spellConfig, buffConfig],
    components: {minesweeper, battleAnime},
    props: {
    },
    data() {
        return {
            battleTimer: "",
            battleID: 1,
            selectedDungeon: {},
            reqExp: [],
            type: {normal: '普通', elite: '精英', boss: 'BOSS', chest: '宝藏', gold: '矿物', mine: '矿物', herb: '草药'},
            mineDifficulty: 0,
            mineReward: [],
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
        this.expReq();
    },
    computed: {
        auto() { return this.$store.state.dungeonInfo.auto;},
        inBattle() { return this.$store.state.dungeonInfo.inBattle;},
        dungeonInfo() { return this.$store.state.dungeonInfo;},
        playerAttr() { return this.$store.state.playerAttribute;},
    },
    methods: {
        toggleBattle(type, auto=false) {
            if(auto)
                this.autoBattle(true);
            if(this.dungeonInfo.inBattle) 
                this.setBattleStatus(false, false, true);
            else {
                this.startBattle(type);
            }
        },
        startBattle(type) {
            if(!type)
                type = this.dungeonInfo['advanture'].type;
            // if(['gold', 'wood', 'crystal', 'equip'].indexOf(type) != -1)
            if(['normal', 'elite', 'boss', 'gold'].indexOf(type) != -1)
                this.battle(type);
            if(type == 'chest')
                this.chest();
        },
        battle(type) {
            let playerAttribute = this.playerAttr,
                enemyAttribute = this.$store.state.enemyAttribute,
                dungeonInfo = this.dungeonInfo;
            if(enemyAttribute.attribute.CURHP.value == 0) {
                this.generateenemy();
                enemyAttribute = this.$store.state.enemyAttribute;
            }
            if(dungeonInfo.inBattle)
                return;
            this.setBattleStatus(true, true);
            let currentBattle = Math.floor(Math.random()*90071992547);
            this.battleID = currentBattle;
            setTimeout(() => {
                if(!this.dungeonInfo.inBattle || this.battleID != currentBattle) {
                    return;
                }
                if(this.playerAction(playerAttribute, enemyAttribute, currentBattle) != false) {
                    setTimeout(() => {
                        this.enemyAction(enemyAttribute, playerAttribute, currentBattle);
                    }, 1000);
                }
                clearInterval(this.battleTimer);
                this.battleTimer = setInterval(() => {
                    if(!this.dungeonInfo.inBattle || this.battleID != currentBattle) {
                        clearInterval(this.battleTimer);
                        return;
                    }
                    if(this.playerAction(playerAttribute, enemyAttribute, currentBattle) != false) {
                        setTimeout(() => {
                            this.enemyAction(enemyAttribute, playerAttribute, currentBattle);
                        }, 1000);
                    }
                }, 2000)
            }, 1000);
        },
        playerAction(source, target, battleID) {
            let dungeonInfo = this.dungeonInfo;
            if(!dungeonInfo.inBattle || this.battleID != battleID)
                return false;
            this.onAttack(source, target);
            if(source.attribute.CURHP.value == 0 || target.attribute.CURHP.value == 0) {
                this.setBattleStatus(false, dungeonInfo.auto);
                return false;
            }
            this.callAction(source, target);
            if(target.attribute.CURHP.value == 0) {
                this.enemySlain(this.monsterId[target.name], 1);
                this.reward();
                this.setBattleStatus(false, dungeonInfo.auto, true);
                // if(dungeonInfo.current == 'normal')
                //     this.generateenemy();
                if(this.selectedDungeon.count == 0)
                    dungeonInfo.auto = false;
                this.gainExp(target.lv);
                if(dungeonInfo.auto && !this.$store.state.setting.waitFull)
                    this.startBattle(this.dungeonInfo[this.dungeonInfo.current].option);
                this.$store.commit("set_battle_info", {
                    type: 'win',
                    msg: '战斗结束, 你胜利了'
                });
                return false;
            } 
            return true;
        },
        enemyAction(source, target, battleID) {
            if(!this.dungeonInfo.inBattle || this.battleID != battleID)
                return false;
            this.onAttack(source, target);
            if(source.attribute.CURHP.value == 0 || target.attribute.CURHP.value == 0) {
                return false;
            }
            this.callAction(source, target);
            if(target.attribute.CURHP.value == 0) {
                let achievement = this.findBrothersComponents(this, 'achievement', false)[0];
                achievement.set_statistic({death: 1});
                this.set_enemy_hp('dead');
                this.setBattleStatus(false, false);
                this.$store.commit("set_battle_info", {
                    type: 'lose',
                    msg: '战斗结束, 你扑街了'
                });
            } 
        },
        reduceCount(count=1) {
            if(this.selectedDungeon.count > 0) {
                this.selectedDungeon.count -= Math.min(count, this.selectedDungeon.count);
                return true;
            }
            else if(this.selectedDungeon.count == 0)
                return false;
            return true;
        },
        gainExp(lv) {
            let exp = 35+lv*5;
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
            exp = Math.round(exp);
            let curExp = this.playerAttr.exp.cur + exp;
            let reqExp = this.reqExp[playerLv];
            if(reqExp == undefined) {
                this.expReq();
                reqExp = this.reqExp[playerLv];
            }
            if(curExp > this.playerAttr.exp.req)
                this.playerAttr.exp.req = this.reqExp[playerLv];
            if(curExp >= reqExp) {
                this.levelUp();
                curExp -= reqExp;
            }
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
        levelUp() {
            let playerLv = this.playerAttr.lv;
            this.playerAttr.lv += 1;
            this.playerAttr.talentPoint += 1;
            this.playerAttr.exp.req = this.reqExp[playerLv+1];
            if(this.playerAttr.lv == 10) {
                let element = document.getElementById('talentTree');
                element.classList.add('glow');
            }
            if(this.playerAttr.lv == 20) {
                let element = document.getElementById('guild');
                element.classList.add('glow');
                guild = this.$store.state.guildAttribute;
                guild.guild.lv = 1;
                guild.train.lv = 1;
                guild.shop.lv = 1;
                guild.smith.lv = 1;
            }
        },
        autoBattle(auto) {
            if(auto == undefined)
                this.dungeonInfo.auto = !this.dungeonInfo.auto;
            else
                this.dungeonInfo.auto = auto;
        },
        setBattleStatus(inBattle, auto=true, immediate=false) {
            if(immediate || inBattle) {
                this.dungeonInfo.inBattle = inBattle;
                if(!inBattle) {
                    clearInterval(this.battleTimer);
                    this.autoBattle(auto);
                    this.set_enemy_hp('dead');
                }
            }
            else {
                setTimeout(() => {
                    this.dungeonInfo.inBattle = inBattle;
                    if(!inBattle) {
                        clearInterval(this.battleTimer);
                        this.autoBattle(auto);
                        this.set_enemy_hp('dead');
                    }
                }, 1000);
            }
        },
        addToQueue(dungeon) {
            let guild = this.findBrothersComponents(this, 'guild', false)[0];
            let guildPosition = this.findComponentDownward(guild, 'guildPosition');
            let newDungeon = this.$deepCopy(dungeon);
            newDungeon.progress = [0, this.monster[newDungeon.monsterID].template.MAXHP];
            this.reduceCount(999999);
            switch(dungeon.type) {
                case 'gold':
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
            let minesweeper = this.findComponentDownward(this, 'minesweeper');
            minesweeper.reset();
        },
        chest() {
            if(!this.reduceCount())
                return;
            this.reward();
        },
        generateenemy(type, level, monsterID) {
            if(!this.reduceCount())
                return;
            let enemyAttribute = {};
            if(!type)
                type = this.dungeonInfo[this.dungeonInfo.current].type;
            if(!level)
                level = this.dungeonInfo[this.dungeonInfo.current].level;
            if(!monsterID)
                monsterID = this.dungeonInfo[this.dungeonInfo.current].monsterID;
            enemyAttribute.attribute = {};
            enemyAttribute.spellCycle = this.$deepCopy(this.monster[monsterID].spellCycle);
            enemyAttribute.talent = this.$deepCopy(this.monster[monsterID].talent);
            enemyAttribute.curSpell = 0;
            for(let stat in this.monster[monsterID].template) {
                enemyAttribute.attribute[stat] = { value: this.monster[monsterID].template[stat] };
            }
            let attribute = enemyAttribute.attribute,
            val = 0.0,
            flexStats = ['MAXHP', 'ATK', 'AP', 'DEF', 'MR'],
            lvStats = ['BLOCK', 'HEAL', 'APPEN'],
            percentStats = ['CRIT', 'CRITDMG', 'APCRIT', 'APCRITDMG']; 
            enemyAttribute.lv = level;
            let flexLv = level - this.monster[monsterID].minLv;
            enemyAttribute.type = type;
            enemyAttribute.name = this.dungeonInfo[this.dungeonInfo.current].monsterName;
            // enemyAttribute.spell = {};
            flexStats.forEach(stat => {
                let attr = enemyAttribute.attribute[stat];
                // attribute.value = Math.round(attribute.value*(1+enemyAttribute.lv*0.15)*(1+Math.random()/10));
                // attribute.value = Math.round(attribute.value*(1+enemyAttribute.lv*0.15));
                // attribute.value = Math.round(attribute.value*(1.5+enemyAttribute.lv*(enemyAttribute.lv-1)*(enemyAttribute.lv/50)));
                // attr.value = Math.round(attr.value*(2+enemyAttribute.lv*(enemyAttribute.lv/35)*(0.9+Math.random()*0.2)));
                attr.value = Math.round(attr.value*(1+flexLv*(flexLv/75))*(0.9+Math.random()*0.2));
                attr.showValue = attr.value;
                enemyAttribute.attribute[stat] = attr;
            });
            lvStats.forEach(stat => {
                let attr = enemyAttribute.attribute[stat];
                attr.value = Math.round(attr.value*(1+flexLv/10));
                attr.showValue = attr.value;
                enemyAttribute.attribute[stat] = attr;
            });
            percentStats.forEach(stat => {
                let attr = enemyAttribute.attribute[stat];
                // attribute.value = Math.round(attribute.value*(enemyAttribute.lv));
                attr.showValue = attr.value + '%';
                enemyAttribute.attribute[stat] = attr;
            });
            attribute['CURHP'] = {
                value: attribute['MAXHP'].value,
                showValue: attribute['MAXHP'].value
            }
            // if(type=='elite') {
            //     attribute = this.eliteStat(attribute);
            // }
            // else if(type=='boss') {
            //     attribute = this.bossStat(attribute);
            // }
            val = this.getDefRed(attribute['DEF'].value);
            attribute['DEFRED'] = {
                value: val,
                showValue: val+'%'
            }
            
            let enemyPos = document.getElementById("enemyAnime");
            enemyPos.style.backgroundImage = "url(/icons/character/"+this.monster[monsterID].anime+")";
            this.$store.commit('set_enemy_attribute', enemyAttribute);
        },
        onAttack(source, target) {
            this.TriggerOnAttack(source, target);
            if(source.type == 'player') {
                let spellList = this.playerAttr.spells;
                let haste = this.playerAttr.attribute.HASTE.value;
                let progress = 1+Math.floor(haste/100);
                if(Math.random()*100 < haste%100) 
                    progress += 1;
                for(let spell in spellList) {
                    if(spellList[spell].progress < this.spell[spell].max) {
                        spellList[spell].progress += progress;
                    }
                }
            }
        },
        reward() {
            let equip = ['helmet', 'weapon', 'armor', 'shoe', 'shoulder', 'glove', 'ring', 'cape', 'bracer', 'belt', 'legging', 'necklace'];
            let itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            let equipInfo = this.findBrothersComponents(this, 'equipInfo', false)[0];   
            let backpack = this.findBrothersComponents(this, 'backpack', false)[0];   
            let rewardList = this.dungeonInfo.advanture.reward;
            for(let k=0; k<rewardList.length; k++) {
                let random = Math.random()*100;
                if(random <= rewardList[k][1]) {
                    let type = rewardList[k][0].itemType;
                    if(equip.indexOf(type) != -1)
                        backpack.giveEquip(JSON.parse(equipInfo.finishUniqueEquip(rewardList[k][0])), false, true);
                    else
                        itemInfo.addItem(rewardList[k][0], true);
                }
            }
            // let itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            // itemInfo.addItem(item);
        },
        enemySlain(id, qty){
            let talentTree = this.findBrothersComponents(this, 'talentTree', false)[0];
            talentTree.talentTrigger('spell_deathknight_bloodpresence');
            talentTree.talentTrigger('spell_deathknight_frostpresence');
            let slain = {slain: {}};
            slain['slain'][id] = qty;
            let achievement = this.findBrothersComponents(this, 'achievement', false)[0];
            achievement.set_statistic(slain);
            // this.$store.commit("set_statistic", slain);
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
            let index = this.findComponentUpward(this, 'index');
            if(index.dungeon) {
                index.dungeon.selected = false;
                index.dungeon = {};
            }
        },
        showInfo($event, type, item, compare) {
            let index = this.findComponentUpward(this, 'index');
            index.showInfo($event, type, item, compare);
        },
        closeInfo(type) {
            let index = this.findComponentUpward(this, 'index');
            let equip = ['helmet', 'weapon', 'armor', 'shoe', 'shoulder', 'glove', 'ring', 'cape', 'bracer', 'belt', 'legging', 'necklace'];

            if(equip.indexOf(type) != -1)
                index.closeInfo('eqiup');
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
.close {
    position: absolute;
    right: 10px;
    top: 5px;
    width: 15px;
    height: 15px;
    opacity: 0.7;
    z-index: 6;
}
.close:hover {
    opacity: 1;
}
.close:before, .close:after {
    position: absolute;
    left: 7px;
    content: ' ';
    height: 15px;
    width: 2px;
    background-color: rgb(255, 255, 255);
}
.close:before {
    transform: rotate(45deg);
}
.close:after {
    transform: rotate(-45deg);
}

</style>