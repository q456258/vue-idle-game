<template>
    <div class='mapEvent'>
        <div class="dungeonInfo" v-if="curDungeon">
            <a href="#" class="close" @click="close()"></a>
            <!-- <div class="centerImg"><img :src="curDungeon.img"></div> -->
            <div>类型：{{curDungeon.type}}</div>
            <div>奖励：{{curDungeon.reward}}</div>
            <div>等级：{{curDungeon.lv}}</div>
            <div>剩余挑战次数：{{curDungeon.count}}</div>
            <button class="btn btn-success btn-sm" @click="toggleBattle(curDungeon.type)">
                开始战斗
            </button>        
            <button class="btn btn-success btn-sm" @click="toggleBattle(curDungeon.type, true)">
                连续战斗
            </button>        
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
            curDungeon: false
        }
    },
    watch: {
    },
    computed: {
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
                let attr = this.playerAttr.attribute;
                if(this.dungeonInfo.current =='trial' && attr.CURHP.value < attr.MAXHP.value/2) {
                    this.$store.commit("set_sys_info", {
                        type: 'dmged',
                        msg: '试炼太危险了，至少恢复到半血再去挑战吧！'
                    });
                    return;
                }
                this.startBattle(type);
            }
        },
        startBattle(type) {
            if(!type)
                type = this.dungeonInfo[this.dungeonInfo.current].type;
            this.curDungeon = false;
            // if(['gold', 'wood', 'crystal', 'equip', 'trial'].indexOf(type) != -1)
            if(['normal', 'trial', 'elite', 'boss'].indexOf(type) != -1)
                this.battle(type);
            if(type == 'chest')
                this.chest();
        },
        battle(type) {
            var playerAttribute = this.playerAttr,
                enermyAttribute = type == 'trial' ? this.$store.state.trialAttribute : this.$store.state.enermyAttribute,
                dungeonInfo = this.dungeonInfo;
            if(enermyAttribute.attribute.CURHP.value == 0) {
                this.generateEnermy(type, dungeonInfo[dungeonInfo.current].level);
                enermyAttribute = type == 'trial' ? this.$store.state.trialAttribute : this.$store.state.enermyAttribute;
            }
            if(this.$store.state.dungeonInfo.inBattle)
                return;
            this.setBattleStatus(true);
            this.battleTimer = setInterval(() => {
            console.log('inbattle')
                this.set_enermy_hp(-1*this.dmgCalculate(playerAttribute, enermyAttribute, 'player'));
                if(enermyAttribute.attribute.CURHP.value == 0) {
                    this.enermySlain(this.monsterId[enermyAttribute.name], 1);
                    this.reward(type, enermyAttribute.lv, enermyAttribute.special);
                    this.setBattleStatus(false, dungeonInfo.auto);
                    if(dungeonInfo.current == 'normal')
                        this.generateEnermy(type, dungeonInfo[dungeonInfo.current].level);
                    else if(dungeonInfo.current == 'trial') {
                        this.generateEnermy(type, dungeonInfo[dungeonInfo.current].level+1);
                    }
                    if(dungeonInfo.auto) {
                        this.startBattle();
                    }
                    if(enermyAttribute.lv > playerAttribute.lv) {
                        this.levelUp();
                    }
                    this.$store.commit("set_battle_info", {
                        type: 'win',
                        msg: '战斗结束，你胜利了'
                    });
                    return;
                } 
                this.set_player_hp(-1*this.dmgCalculate(enermyAttribute, playerAttribute, 'enermy'), enermyAttribute);
                // this.$store.commit('set_player_hp', -1*this.dmgCalculate(enermyAttribute, playerAttribute, 'enermy'));
                if(playerAttribute.attribute.CURHP.value == 0) {
                    var achievement = this.findBrothersComponents(this, 'achievement', false)[0];
                    achievement.set_statistic({death: 1});
                    // this.$store.commit("set_statistic", {death: 1});
                    this.setBattleStatus(false, dungeonInfo.auto);
                    this.$store.commit("set_battle_info", {
                        type: 'lose',
                        msg: '战斗结束，你扑街了'
                    });
                } 
            }, 1000)
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
            }
        },
        chest() {
            this.reward('chest');
        },
        generateEnermy(type, level, templateId) {
            var enermyAttribute = {};
            if(!templateId)
                templateId = level == 1 ? 0 : Math.ceil(level/10);
            if(type=='elite' || type=='BOSS')
                enermyAttribute.attribute = this.$deepCopy(this.monster[templateId].template);
            else
                enermyAttribute.attribute = this.$deepCopy(this.monster[level == 1 ? 0 : 1].template);
            var attribute = enermyAttribute.attribute,
            val = 0.0,
            flexStats = ['MAXHP', 'ATK', 'DEF'],
            lvStats = ['AP', 'MR'],
            fixStats = ['CRIT', 'CRITDMG'];
            enermyAttribute.lv = level;
            enermyAttribute.name = this.monster[templateId].name;
            enermyAttribute.type = type=='trial' ? 'trial' : 'enermy';
            flexStats.forEach(stat => {
                let attribute = enermyAttribute.attribute[stat];
                // attribute.value = Math.round(attribute.value*(1+enermyAttribute.lv*0.15)*(1+Math.random()/10));
                // attribute.value = Math.round(attribute.value*(1+enermyAttribute.lv*0.15));
                attribute.value = Math.round(attribute.value*(1.5+enermyAttribute.lv*(enermyAttribute.lv-1)*(enermyAttribute.lv/50)));
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
            
            if(this.$store.state.dungeonInfo.current == 'trial') {
                attribute['RECOVERY'] = {
                    value: Math.round(attribute['MAXHP'].value*0.01),
                    showValue: Math.round(attribute['MAXHP'].value*0.01),
                }
                attribute = this.trialStat(attribute);
            }
            else if(type=='elite') {
                enermyAttribute.special = 'elite';
                enermyAttribute.name += '精英';
                attribute = this.eliteStat(attribute);
            }
            else if(type=='BOSS') {
                enermyAttribute.special = 'boss';
                enermyAttribute.name = this.bossName[Math.floor((templateId-1)/2)];
                attribute = this.bossStat(attribute);
            }
            val = this.getDefRed(attribute['DEF'].value);
            attribute['DEFRED'] = {
                value: val,
                showValue: val+'%'
            }
            this.$store.commit('set_enermy_attribute', enermyAttribute);
        },
        getDefRed(armor) {
            return Math.round((armor/(100+armor) + armor/(armor+3500))/2*1000000)/10000;
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
            dmg += this.getApDmg(spell, source, target);
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
            var random = Math.floor(Math.random()*source.spells.weight);
            var curWeight = 0;
            var selectSpell = 'attack';
            for(var spell in source.spells.spell) {
                if(!source.spells.spell[spell].active)
                    continue;
                curWeight += this.spell[spell].weight;
                if(curWeight > random) {
                    selectSpell = spell;
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
            var defRed = this.getDefRed(armor);
            baseDmg -= penDmg;
            var dmg = baseDmg*(1-defRed/100)+penDmg;
            this.lifesteal(source, dmg);
            this.manasteal(source, dmg);
            return dmg;
        },
        checkCost(spell) {
            var attr = this.playerAttr.attribute;
            var spellLv = this.playerAttr.spells.spell[spell].lv-1;
            for(let cost in this.spell[spell].cost) {
                if(cost == 'MP') {
                    if(attr['CURMP'].value < this.spell[spell].level[spellLv].cost['MP'])
                        return false;
                }
            }
            return true;
        },
        useCost(spell) {
            var attr = this.playerAttr.attribute;
            var spellLv = this.playerAttr.spells.spell[spell].lv-1;
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
            var spellLv = source.spells == undefined ? 0 : source.spells.spell[spellName].lv-1;
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
            var proficientLv = source.spells.spell[spellName].proficient;
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
            var spellLv = source.spells == undefined ? 0 : source.spells.spell[spell].lv-1;
            var dmgs = this.spell[spell].level[spellLv];
            var dmg = dmgs.dmg['FIX'] == undefined ? 0 : dmgs.dmg['FIX'];
            for(var attr in dmgs.dmg) {
                if(source.attribute[attr] != undefined)
                    dmg += source.attribute[attr].value*dmgs.dmg[attr];
            }
            return dmg;
        },
        getApDmg(spell, source, target) {
            var spellLv = source.spells == undefined ? 0 : source.spells.spell[spell].lv-1;
            var apDmgs = this.spell[spell].level[spellLv];
            if(!apDmgs.ap)
                return source.attribute['AP'].value;
            var ap = apDmgs.ap['FIX'] == undefined ? 0 : apDmgs.ap['FIX'];
            for(var attr in apDmgs.ap) {
                if(source.attribute[attr] != undefined)
                    ap += source.attribute[attr].value*apDmgs.ap[attr];
            }
            ap = this.elementAffinity(source, ap);
            ap = this.forceOfNature(target, ap);
            return ap;
        },
        getHeal(spell, source) {
            var spellLv = source.spells == undefined ? 0 : source.spells.spell[spell].lv-1;
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
        reward(type, lv, special='') {
            var equipInfo = this.findBrothersComponents(this, 'equipInfo', false)[0];
            var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            var guild = this.findBrothersComponents(this, 'guild', false)[0];
            var index = this.findComponentUpward(this, 'index');
            var bonus = 0;
            var equip = null; 
            var item = null; 
            switch(type) {
                case 'gold':
                    let gold = Math.round((100+lv**2)*(1+Math.random()))
                    guild.getGold('', gold);
                    break;
                case 'crystal':
                    let crystal = Math.round((1+lv)*(1+Math.random()))
                    guild.getCrystal('', crystal);
                    break;
                case 'chest':
                    item = itemInfo.createItem('inv_box_01', 1);
                    break;
                case 'equip':
                    equip = equipInfo.createEquip(-1, lv, 'random', bonus);  
                    break;
                case 'trial':
                    bonus = 1;
                    equip = equipInfo.createEquip(-1, lv, 'random', bonus);  
                    break;
            }
            if(equip != null) {
                equip = JSON.parse(equip);
                this.$store.commit("set_sys_info", {
                    type: 'reward',
                    msg: '获得战利品',
                    equip: equip
                });
                backpack.giveEquip(equip);
            }
            var quantity = 0;
            if(item != null) {
                item = JSON.parse(item);
                quantity = item.quantity;
                this.$store.commit("set_sys_info", {
                    type: 'reward',
                    msg: '获得战利品',
                    item: item,
                    quantity: quantity
                });
                itemInfo.addItem(item);
            }
            else if(this.$store.state.guildAttribute.smith.lv >= 20 && Math.random() < 0.01){
                var item = itemInfo.createItem('inv_misc_enchantedpearla', 1);  
                item = JSON.parse(item);
                quantity = item.quantity;
                this.$store.commit("set_sys_info", {
                    type: 'reward',
                    msg: '意外捡到一个',
                    item: item,
                    quantity: quantity
                });
                itemInfo.addItem(item);
            }
            switch(special) {
                case 'elite':
                    item = itemInfo.createItem('inv_box_02', 1);
                    item = JSON.parse(item);
                    quantity = item.quantity;
                    this.$store.commit("set_sys_info", {
                        type: 'reward',
                        msg: '击败精英获得额外奖励',
                        item: item,
                        quantity: quantity
                    });
                    itemInfo.addItem(item);
                    break;
                case 'boss':
                    item = itemInfo.createItem('inv_box_03', 1);
                    item = JSON.parse(item);
                    quantity = item.quantity;
                    this.$store.commit("set_sys_info", {
                        type: 'reward',
                        msg: '击败BOSS获得额外奖励',
                        item: item,
                        quantity: quantity
                    });
                    itemInfo.addItem(item);
                    break;
            }
        },
        levelUp() {
            let index = this.findComponentUpward(this, 'index'); 
            this.playerAttr.lv += 1;
            this.$store.state.dungeonInfo.trial.level += 1;
            index.enermyLvChange = this.playerAttr.lv;
            this.$store.state.dungeonInfo.advanture.level = index.enermyLvChange;
            if(this.playerAttr.lv == 10) {
                var element = document.getElementById('guild');
                element.classList.add('glow');
            }
            if(this.playerAttr.lv == 20) {
                var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
                var item = itemInfo.createItem('spell_nature_thunderclap', 1);  
                itemInfo.addItem(JSON.parse(item));
            }
        },
        enermySlain(id, qty){
            var slain = {slain: {}};
            slain['slain'][id] = qty;
            var achievement = this.findBrothersComponents(this, 'achievement', false)[0];
            achievement.set_statistic(slain);
            // this.$store.commit("set_statistic", slain);
        },
        trialStat(attribute) {
            attribute['ATK'] = {
                value: Math.round(attribute['ATK'].value*1.2),
                showValue: Math.round(attribute['ATK'].value*1.2),
            }
            attribute['DEF'] = {
                value: attribute['DEF'].value,
                showValue: attribute['DEF'].value,
            }
            attribute['AP'] = {
                value: Math.round(attribute['AP'].value*1.2),
                showValue: Math.round(attribute['AP'].value*1.2),
            }
            attribute['MR'] = {
                value: attribute['MR'].value,
                showValue: attribute['MR'].value,
            }
            attribute['MAXHP'] = {
                value: attribute['MAXHP'].value*3,
                showValue: attribute['MAXHP'].value*3
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
            attribute['AP'] = {
                value: attribute['AP'].value,
                showValue: attribute['AP'].value,
            }
            attribute['MR'] = {
                value: attribute['MR'].value,
                showValue: attribute['MR'].value,
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
            this.curDungeon = false;
        }
    }
}


</script>

<style lang="scss" scope>
.dungeonInfo {
    position: absolute;
    top: 5rem;
    left: 0;
    right: 0;
    margin: auto;
    padding-top: 1rem;
    width: 10rem;
    height: 10rem;
    border: 1px solid rgba(255, 255, 255, 0.404);
    background: black;
    z-index: 1;
    box-shadow: 0 0 4px 4px rgba(100, 255, 36, 0.5);
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