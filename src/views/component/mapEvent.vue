<template>
    <div class='mapEvent scrollbar-morpheus-den scrollbar-square'>
        <div class="dungeonInfo" v-if="dungeon.type">
            <a href="#" class="close" @click="close()"></a>
            <div class="title">
                信息
            </div>
            <div class="detail">
                <!-- <div class="centerImg"><img :src="selectedDungeon.img"></div> -->
                <div>等级：{{selectedDungeon.lv}}</div>
                <div>类型：{{type[selectedDungeon.type]}}</div>
                <div>剩余次数：
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
                        <div class="grid" v-if="v[0]" @mouseover="showInfo($event,v[0].itemType,v[0],true)" @mouseleave="closeInfo">
                            <div class="icon" :style="{'box-shadow': 'inset 0 0 7px 2px ' + v[0].quality.color }">
                                <img :src="v[0].description.iconSrc" alt="" />
                            </div>
                            <div class="quantity">{{v[1]+'%'}}</div>
                        </div>
                    </div>
                </div>
                <!-- <div>奖励：{{selectedDungeon.reward}}</div> -->
            </div>
            <div class="action" v-if="!inBattle&&selectedDungeon.count!=0">
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
import { buffSystem } from '../../assets/js/buffSystem';
import { monsterConfig } from '@/assets/config/monsterConfig'
import { spellConfig } from '@/assets/config/spellConfig'
import { buffConfig } from '@/assets/config/buffConfig'
export default {
    name: 'mapEvent',
    mixins: [assist, buffSystem, monsterConfig, spellConfig, buffConfig],
    props: {
    },
    data() {
        return {
            battleTimer: "",
            selectedDungeon: {},
            reqExp: [],
            type: {normal: '普通', elite: '精英', boss: 'BOSS', trial: '试炼', gold: '金矿', chest: '宝藏'}
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
                this.setBattleStatus(false, false);
            else {
                this.startBattle(type);
            }
        },
        startBattle(type) {
            if(!type)
                type = this.dungeonInfo['advanture'].type;
            // if(['gold', 'wood', 'crystal', 'equip', 'trial'].indexOf(type) != -1)
            if(['normal', 'trial', 'elite', 'boss', 'gold'].indexOf(type) != -1)
                this.battle(type);
            if(type == 'chest')
                this.chest();
        },
        battle(type) {
            var playerAttribute = this.playerAttr,
                enermyAttribute = type == 'trial' ? this.$store.state.trialAttribute : this.$store.state.enermyAttribute,
                dungeonInfo = this.dungeonInfo;
            if(enermyAttribute.attribute.CURHP.value == 0) {
                if(type == 'trial')
                    this.generateEnermy('trial', dungeonInfo.trial.level);
                else
                    this.generateEnermy();
                enermyAttribute = type == 'trial' ? this.$store.state.trialAttribute : this.$store.state.enermyAttribute;
            }
            if(this.$store.state.dungeonInfo.inBattle)
                return;
            this.setBattleStatus(true);
            this.battleTimer = setInterval(() => {
                this.onHit('player');
                this.set_enermy_hp(-1*this.dmgCalculate(playerAttribute, enermyAttribute, 'player'));
                if(enermyAttribute.attribute.CURHP.value == 0) {
                    this.enermySlain(this.monsterId[enermyAttribute.name], 1);
                    this.reward();
                    this.setBattleStatus(false, dungeonInfo.auto);
                    if(dungeonInfo.current == 'normal')
                        this.generateEnermy();
                    else if(dungeonInfo.current == 'trial') {
                        dungeonInfo.trial.level += 20;
                        this.generateEnermy('trial', dungeonInfo.trial.level);
                    }
                    if(this.selectedDungeon.count == 0)
                        dungeonInfo.auto = false;
                    // if(dungeonInfo.auto) 
                    //     this.startBattle();
                    this.gainExp(enermyAttribute.lv);
                    this.$store.commit("set_battle_info", {
                        type: 'win',
                        msg: '战斗结束，你胜利了'
                    });
                    return;
                } 
                this.set_player_hp(-1*this.dmgCalculate(enermyAttribute, playerAttribute, 'enermy'), enermyAttribute);
                if(playerAttribute.attribute.CURHP.value == 0) {
                    var achievement = this.findBrothersComponents(this, 'achievement', false)[0];
                    achievement.set_statistic({death: 1});
                    this.set_enermy_hp('dead');
                    this.setBattleStatus(false, false);
                    this.$store.commit("set_battle_info", {
                        type: 'lose',
                        msg: '战斗结束，你扑街了'
                    });
                } 
            }, 1000)
        },
        reduceCount() {
            if(this.selectedDungeon.count > 0) {
                this.selectedDungeon.count -= 1;
                return true;
            }
            else if(this.selectedDungeon.count == 0)
                return false;
            return true;
        },
        gainExp(lv) {
            var exp = 35+lv*5;
            var playerLv = this.playerAttr.lv;
            if(lv>playerLv) {
                // 经验上限125%
                exp = Math.round(exp*(lv-playerLv)*1.05);
                exp = Math.min(exp, exp*1.25);
            }
            else {
                // 经验下限10%
                exp = Math.round(exp*(1-playerLv-lv*0.1));
                exp = Math.max(exp, exp*0.1);
            }
            var curExp = this.playerAttr.exp.cur + exp;
            var reqExp = this.reqExp[playerLv];
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
                var element = document.getElementById('expInfo');
                var node = document.createElement('DIV');
                var textnode = document.createTextNode("+"+exp+'exp');
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
                this.reqExp[i] = this.reqExp[i-1]+(150+i*50)
            }
        },
        levelUp() {
            var playerLv = this.playerAttr.lv;
            this.playerAttr.lv += 1;
            this.playerAttr.talentPoint += 1;
            this.playerAttr.exp.req = this.reqExp[playerLv+1];
            if(this.playerAttr.lv == 15) {
                var element = document.getElementById('guild');
                element.classList.add('glow');
            }
            if(this.playerAttr.lv == 20) {
                var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
                var item = itemInfo.createItem('spell_nature_thunderclap', 1);  
                itemInfo.addItem(JSON.parse(item));
            }
        },
        autoBattle(auto) {
            if(auto == undefined)
                this.dungeonInfo.auto = !this.dungeonInfo.auto;
            else
                this.dungeonInfo.auto = auto;
        },
        setBattleStatus(inBattle, auto=true) {
            this.dungeonInfo.inBattle = inBattle;
            if(!inBattle) {
                clearInterval(this.battleTimer);
                this.autoBattle(auto);
                this.set_enermy_hp('dead');
            }
        },
        chest() {
            if(!this.reduceCount())
                return;
            this.reward();
        },
        generateEnermy(type, level, monsterID) {
            if(!this.reduceCount())
                return;
            var enermyAttribute = {};
            if(!type)
                type = this.dungeonInfo[this.dungeonInfo.current].type;
            if(!level)
                level = this.dungeonInfo[this.dungeonInfo.current].level;
            if(!monsterID)
                monsterID = this.dungeonInfo[this.dungeonInfo.current].monsterID;
            var templateId = this.templateId[monsterID];
            enermyAttribute.attribute = this.$deepCopy(this.monster[templateId].template);
            var attribute = enermyAttribute.attribute,
            val = 0.0,
            flexStats = ['MAXHP', 'ATK', 'DEF'],
            lvStats = ['MR'],
            fixStats = ['SUNDER', 'CRIT', 'CRITDMG']; 
            enermyAttribute.lv = level;
            enermyAttribute.type = type;
            enermyAttribute.name = this.dungeonInfo[this.dungeonInfo.current].monsterName;
            flexStats.forEach(stat => {
                let attribute = enermyAttribute.attribute[stat];
                // attribute.value = Math.round(attribute.value*(1+enermyAttribute.lv*0.15)*(1+Math.random()/10));
                // attribute.value = Math.round(attribute.value*(1+enermyAttribute.lv*0.15));
                // attribute.value = Math.round(attribute.value*(1.5+enermyAttribute.lv*(enermyAttribute.lv-1)*(enermyAttribute.lv/50)));
                attribute.value = Math.round(attribute.value*(2+enermyAttribute.lv*(enermyAttribute.lv/15)));
                attribute.showValue = attribute.value;
                enermyAttribute.attribute[stat] = attribute;
            });
            lvStats.forEach(stat => {
                let attribute = enermyAttribute.attribute[stat];
                attribute.value = Math.round(attribute.value*(enermyAttribute.lv));
                attribute.showValue = attribute.value;
                enermyAttribute.attribute[stat] = attribute;
            });
            fixStats.forEach(stat => {
                let attribute = enermyAttribute.attribute[stat];
                // attribute.value = Math.round(attribute.value*(enermyAttribute.lv));
                attribute.showValue = attribute.value + '%';
                enermyAttribute.attribute[stat] = attribute;
            });
            attribute['CURHP'] = {
                value: attribute['MAXHP'].value,
                showValue: attribute['MAXHP'].value
            }
            if(type=='elite') {
                attribute = this.eliteStat(attribute);
            }
            else if(type=='boss') {
                attribute = this.bossStat(attribute);
            } if(type=='trial') {
                attribute = this.trialStat(attribute);
            }
            val = this.getDefRed(attribute['DEF'].value);
            attribute['DEFRED'] = {
                value: val,
                showValue: val+'%'
            }
            val = this.getSunderRed(attribute['SUNDER'].value);
            attribute['SUNDERRED'] = {
                value: val,
                showValue: val+'%'
            }
            this.$store.commit('set_enermy_attribute', enermyAttribute);
        },
        getDefRed(armor) {
            let sign = armor>=0 ? 1 : -1;
            armor = Math.abs(armor);
            return sign*Math.round((armor/(100+armor) + armor/(armor+3500))/2*1000000)/10000;
        },
        getSunderRed(sunder) {
            let sign = sunder>=0 ? 1 : -1;
            sunder = Math.abs(sunder);
            return sign*Math.round((sunder/(100+sunder))*100);
        },
        dmgCalculate(source, target, type) {
            if(this.stun(source))
                return 0;
            var spell = this.getSpell(source, target);
            var spellInfo = this.spell[spell];
            var dmg = this.getReducedDmg(source, target, this.getSpellDmg(spell, source));
            var heal = this.getHeal(spell, source);
            var crit = Math.round(Math.random()*100);
            if(crit<source.attribute.CRIT.value) 
                dmg *= source.attribute.CRITDMG.value/100;
            // dmg += this.getApDmg(spell, source, target);
            dmg -= this.getMrValue(type, target);
            dmg = Math.round(dmg);
            if(dmg < 0)
                dmg = 0;
            if(type == 'player') {
                this.$store.commit("set_battle_info", {
                    type: 'dmg',
                    msg: '使用【'+spellInfo.name+'】造成了'+dmg+'点伤害'
                })
                if(heal > 0) {
                    this.$store.commit("set_battle_info", {
                        type: 'win',
                        msg: '恢复了' + heal+ '点生命值'
                    })
                }
            } else {
                this.$store.commit("set_battle_info", {
                    type: 'dmged',
                    msg: '目标使用【'+spellInfo.name+'】对你造成了'+dmg+'点伤害'
                })
            }
            this.useCost(spell);
            this.applyEffect(source, target, spell);
            return dmg;
        },
        getSpell(source, target) {
            if(source.spells == undefined)
                return 'attack'
            var selectSpell = 'attack';
            let keys = Object.keys(source.spells).reverse();
            for(let i in keys) {
                let spell = keys[i];
                if(source.spells[spell].progress >= this.spell[spell].max) {
                    selectSpell = spell;
                    source.spells[spell].progress = 0;
                    break;
                }
            }   
            if(this.checkCost(selectSpell)) {
                return selectSpell;
            }
            return 'attack';
        },
        getReducedDmg(source, target, baseDmg) {
            if(baseDmg == 0)
                return 0;
            baseDmg = this.charge(source, baseDmg);
            baseDmg = this.block(target, baseDmg);
            var penDmg = this.penetrate(source, baseDmg);
            var armor = this.sunder(source, target.attribute.DEF.value);
            armor = Math.round(armor*(1-source.attribute.SUNDERRED.value/100));
            var defRed = this.getDefRed(armor);
            baseDmg -= penDmg;
            var dmg = baseDmg*(1-defRed/100)+penDmg;
            this.lifesteal(source, dmg);
            this.manasteal(source, dmg);
            return dmg;
        },
        checkCost(spell) {
            var attr = this.playerAttr.attribute;
            var spellLv = this.playerAttr.spells[spell].lv-1;
            for(let cost in this.spell[spell].level[spellLv].cost) {
                if(cost == 'MP') {
                    if(attr['CURMP'].value < this.spell[spell].level[spellLv].cost['MP'])
                        return false;
                }
            }
            return true;
        },
        useCost(spell) {
            var attr = this.playerAttr.attribute;
            var spellLv = this.playerAttr.spells[spell].lv-1;
            var costs = this.spell[spell].level[spellLv];
            for(let cost in costs.cost) {
                switch(cost) {
                    case 'HP':
                        this.set_player_hp(-1*costs.cost[cost], this.playerAttr);
                        break;
                    case 'CURHP':
                        this.set_player_hp(-1*costs.cost[cost]*attr['CURHP'].value, this.playerAttr);
                        break;
                    case 'MAXHP':
                        this.set_player_hp(-1*costs.cost[cost]*attr['MAXHP'].value, this.playerAttr);
                        break;
                    case 'MP':
                        this.$store.commit('set_player_mp', -1*costs.cost[cost]);
                        break;
                    case 'CURMP':
                        this.$store.commit('set_player_mp', -1*costs.cost[cost]*attr['CURMP'].value);
                        break;
                    case 'MAXMP':
                        this.$store.commit('set_player_mp', -1*costs.cost[cost]*attr['MAXMP'].value);
                        break;
                }
            }
        },
        applyEffect(source, target, spellName) {
            var sourceType = source.type==undefined? 'player':source.type;
            var targetType = target.type==undefined? 'player':target.type;
            var spellLv = source.spells == undefined ? 0 : source.spells[spellName].lv-1;
            var effect = this.spell[spellName].level[spellLv].effect;
            var effectList = {};
            for(var eff in effect) {
                effectList[eff] = effect[eff];
            }
            if(sourceType == 'player')
                effectList = this.getProficientEffect(source, target, spellName, effectList);
            for(var eff in effectList) {
                if(Math.random()*100 < effectList[eff].chance) {
                    if(effectList[eff].target == 'self')
                        this.buffApply(source, source, eff, effectList[eff].stack);
                    else
                        this.buffApply(source, target, eff, effectList[eff].stack);
                }
            }
        },
        getProficientEffect(source, target, spellName, effectList) {
            var proficientList = this.spell[spellName].proficient;
            if(proficientList == undefined) {
                return {};
            }
            var proficientLv = source.spells[spellName].proficient;
            for(var proficient in proficientList) {
                if(proficientLv >= proficient) {
                    let effect = proficientList[proficient].effect;
                    for(var eff in effect) {
                        effectList[eff] = effect[eff];
                    }
                }
            }
            return effectList;
        },
        getSpellDmg(spell, source) {
            var spellLv = source.spells == undefined ? 0 : source.spells[spell].lv-1;
            var dmgs = this.spell[spell].level[spellLv];
            var dmg = dmgs.dmg['FIX'] == undefined ? 0 : dmgs.dmg['FIX'];
            for(var attr in dmgs.dmg) {
                if(source.attribute[attr] != undefined)
                    dmg += source.attribute[attr].value*dmgs.dmg[attr];
            }
            return dmg;
        },
        // getApDmg(spell, source, target) {
        //     var spellLv = source.spells == undefined ? 0 : source.spells[spell].lv-1;
        //     var apDmgs = this.spell[spell].level[spellLv];
        //     if(!apDmgs.ap)
        //         return source.attribute['AP'].value;
        //     var ap = apDmgs.ap['FIX'] == undefined ? 0 : apDmgs.ap['FIX'];
        //     for(var attr in apDmgs.ap) {
        //         if(source.attribute[attr] != undefined)
        //             ap += source.attribute[attr].value*apDmgs.ap[attr];
        //     }
        //     ap = this.elementAffinity(source, ap);
        //     ap = this.forceOfNature(target, ap);
        //     return ap;
        // },
        getHeal(spell, source) {
            var spellLv = source.spells == undefined ? 0 : source.spells[spell].lv-1;
            var heals = this.spell[spell].level[spellLv];
            if(!heals.heal)
                return 0;
            var heal = heals.heal['FIX'] == undefined ? 0 : heals.heal['FIX'];
            for(var attr in heals.heal) {
                if(source.attribute[attr] != undefined)
                    heal += source.attribute[attr].value*heals.heal[attr];
            }
            heal = Math.round(heal);
            this.set_player_hp(heal, source);
            // this.$store.commit('set_player_hp', heal);
            return heal;
        },
        getMrValue(type, target) {
            var attr = target.attribute;
            var value = attr['MR'].value;
            // 玩家进攻时无视目标魔法消耗
            if(type == 'player')
                return value;
            var allowedMp = attr['CURMP'].value-attr['MAXMP'].value/5;
            if(allowedMp < value/4)
                value = allowedMp * 4;
            var cost = value/4;
            this.$store.commit('set_player_mp', -1*Math.round(cost));
            return Math.round(value);
        },
        onHit(target) {
            if(target == 'player') {
                let spellList = this.playerAttr.spells;
                for(let spell in spellList) {
                    if(spellList[spell].progress < this.spell[spell].max) {
                        spellList[spell].progress += 1;
                    }
                }
            }
        },
        reward() {
            var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            var type = this.dungeonInfo.current;
            if(type == 'trial') {
                var item = itemInfo.createItem('random_equip_4', 1);  
                item = JSON.parse(item);
                itemInfo.addItem(item);
            }
            else {
                var rewardList = this.dungeonInfo.advanture.reward;
                for(var k=0; k<rewardList.length; k++) {
                    let random = Math.random()*100;
                    if(random <= rewardList[k][1]) {
                        itemInfo.addItem(rewardList[k][0]);
                    }
                }
            }
            // var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            // itemInfo.addItem(item);
        },
        enermySlain(id, qty){
            var talentTree = this.findBrothersComponents(this, 'talentTree', false)[0];
            talentTree.talentTrigger('spell_deathknight_bloodpresence');
            talentTree.talentTrigger('spell_deathknight_frostpresence');
            var slain = {slain: {}};
            slain['slain'][id] = qty;
            var achievement = this.findBrothersComponents(this, 'achievement', false)[0];
            achievement.set_statistic(slain);
            // this.$store.commit("set_statistic", slain);
        },
        trialStat(attribute) {
            attribute['ATK'] = {
                value: Math.round(attribute['ATK'].value*1.25),
                showValue: Math.round(attribute['ATK'].value*1.25),
            }
            attribute['DEF'] = {
                value: attribute['DEF'].value*2,
                showValue: attribute['DEF'].value*2,
            }
            attribute['SUNDER'] = {
                value: Math.round(attribute['SUNDER'].value*1.25),
                showValue: Math.round(attribute['SUNDER'].value*1.25),
            }
            attribute['MR'] = {
                value: attribute['MR'].value*2,
                showValue: attribute['MR'].value*2,
            }
            attribute['MAXHP'] = {
                value: attribute['MAXHP'].value*20,
                showValue: attribute['MAXHP'].value*20
            }
            attribute['CURHP'] = {
                value: attribute['MAXHP'].value,
                showValue: attribute['MAXHP'].value
            }
            return attribute;
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
            attribute['SUNDER'] = {
                value: attribute['SUNDER'].value,
                showValue: attribute['SUNDER'].value,
            }
            attribute['MR'] = {
                value: attribute['MR'].value,
                showValue: attribute['MR'].value,
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
            attribute['SUNDER'] = {
                value: attribute['SUNDER'].value*2,
                showValue: attribute['SUNDER'].value*2,
            }
            attribute['MR'] = {
                value: attribute['MR'].value*2,
                showValue: attribute['MR'].value*2,
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
            var index = this.findComponentUpward(this, 'index');
            if(index.dungeon) {
                index.dungeon.selected = false;
                index.dungeon = {};
            }
        },
        showInfo($event, type, item, compare) {
            var index = this.findComponentUpward(this, 'index');
            index.showInfo($event, type, item, compare);
        },
        closeInfo() {
            var index = this.findComponentUpward(this, 'index');
            index.closeInfo('item');
        },
    }
}


</script>

<style lang="scss" scope>
.mapEvent {
    overflow-y: auto;
    max-height: 20rem;
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
    .grid {
        border: 1px solid rgb(72, 70, 63);
        border-radius: 0.3rem;
        margin: 2px;
        height: 3rem;
        width: 3rem;
        .icon {
            width: 2.9rem;
            height: 2.9rem;
            background-color: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto;
            border-radius: 0.3rem;
            img {
                width:2.9rem;
                height:2.9rem;
                border-radius: 1rem;
            }
        }
        .quantity {
            position: relative;
            top: -0.6rem;
            right: -0.8rem;
            width: 2rem;
            height: 0.5rem;
            font-size: 0.8rem;
            line-height: 0;
            text-align: right;
            text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
        }
    }
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