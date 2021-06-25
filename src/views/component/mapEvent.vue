<template>
  <div class='mapEvent'>
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
    data() {
        return {
            battleTimer: "",
            streak: 0
        }
    },
    methods: {
        battle(type) {
            var playerAttribute = this.$store.state.playerAttribute,
                enermyAttribute = type == 'trial' ? this.$store.state.trialAttribute : this.$store.state.enermyAttribute,
                dungeonInfo = this.$store.state.dungeonInfo;

            if(enermyAttribute.attribute.CURHP.value == 0) {
                this.generateEnermy(type, dungeonInfo[dungeonInfo.current].level);
                enermyAttribute = type == 'trial' ? this.$store.state.trialAttribute : this.$store.state.enermyAttribute;
            }
            if(this.$store.state.dungeonInfo.inBattle)
                return;
            this.setBattleStatus(true);
            this.battleTimer = setInterval(() => {
                this.set_enermy_hp(-1*this.dmgCalculate(playerAttribute, enermyAttribute, 'player'));
                if(enermyAttribute.attribute.CURHP.value == 0) {
                    this.enermySlain(this.monsterId[enermyAttribute.name], 1);
                    this.reward(type, enermyAttribute.lv, enermyAttribute.special);
                    this.setBattleStatus(false);
                    clearInterval(this.battleTimer);
                    let index = this.findComponentUpward(this, 'index'); 
                    if(dungeonInfo.current == 'advanture')
                        index.enableOption(dungeonInfo.current);
                    else if(dungeonInfo.current == 'trial') {
                        this.generateEnermy(type, dungeonInfo[dungeonInfo.current].level+1);
                    }
                    if(dungeonInfo.auto) {
                        index.startBattle();
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
                this.set_player_hp(-1*this.dmgCalculate(enermyAttribute, playerAttribute, 'enermy'));
                // this.$store.commit('set_player_hp', -1*this.dmgCalculate(enermyAttribute, playerAttribute, 'enermy'));
                if(playerAttribute.attribute.CURHP.value == 0) {
                    this.endStreak();
                    clearInterval(this.battleTimer);
                    this.setBattleStatus(false);
                    this.$store.commit("set_battle_info", {
                        type: 'lose',
                        msg: '战斗结束，你扑街了'
                    });
                } 
            }, 1000)
        },
        setBattleStatus(inBattle) {
            this.$store.state.dungeonInfo.inBattle = inBattle;
        },
        chest() {
            // 刷新一下option class style
            this.$store.commit("set_battle_info", {});            
            if(this.$store.state.dungeonInfo.inBattle)
                return;
            this.setBattleStatus(true);
            this.battleTimer = setTimeout(() => {
                this.setBattleStatus(false);
                this.reward('chest');
                let index = this.findComponentUpward(this, 'index'); 
                index.enableOption(this.$store.state.dungeonInfo.current);
                if(this.$store.state.dungeonInfo.auto) {
                    index.startBattle();
                }
            }, 1000)
        },
        generateEnermy(type, level) {
            var enermyAttribute = {};
            var lv = level == 1 ? 0 : Math.ceil(level/5);
            enermyAttribute.attribute = this.$deepCopy(this.monster[lv].template);
            var attribute = enermyAttribute.attribute,
            val = 0.0,
            flexStats = ['MAXHP', 'ATK', 'DEF'],
            lvStats = ['AP', 'MR'],
            fixStats = ['CRIT', 'CRITDMG'];
            enermyAttribute.lv = level;
            enermyAttribute.name = this.monster[lv].name;
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
            
            val = this.getDefRed(attribute['DEF'].value);
            attribute['DEFRED'] = {
                value: val,
                showValue: val+'%'
            }
            if(this.$store.state.dungeonInfo.current == 'trial') {
                attribute['RECOVERY'] = {
                    value: Math.round(attribute['MAXHP'].value*0.01),
                    showValue: Math.round(attribute['MAXHP'].value*0.01),
                }
            }
            else if(level > 10) {
                if(this.streak > 0 && this.streak%10 == 0&& this.streak%100 != 0) {
                    enermyAttribute.special = 'elite';
                    enermyAttribute.name += '精英';
                    attribute = this.eliteStat(attribute);
                }
                else if(this.streak > 0 && this.streak%100 == 0) {
                    enermyAttribute.special = 'boss';
                    enermyAttribute.name = this.bossName[Math.floor((level-1)/10)];
                    attribute = this.bossStat(attribute);
                }
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
            dmg += this.getApDmg(spell, source);
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
                this.useCost(selectSpell);
                this.applyEffect(source, target, selectSpell);
                return selectSpell;
            }
            return 'attack';
        },
        getReducedDmg(source, target, baseDmg) {
            if(baseDmg == 0)
                return 0;
            var sourceType = source.type==undefined? 'player':source.type;
            baseDmg = this.charge(source, baseDmg);
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
            var attr = this.$store.state.playerAttribute.attribute;
            var spellLv = this.$store.state.playerAttribute.spells.spell[spell].lv-1;
            for(let cost in this.spell[spell].cost) {
                if(cost == 'MP') {
                    if(attr['CURMP'].value < this.spell[spell].level[spellLv].cost['MP'])
                        return false;
                }
            }
            return true;
        },
        useCost(spell) {
            var attr = this.$store.state.playerAttribute.attribute;
            var spellLv = this.$store.state.playerAttribute.spells.spell[spell].lv-1;
            var costs = this.spell[spell].level[spellLv];
            for(let cost in costs.cost) {
                switch(cost) {
                    case 'MP':
                        this.$store.commit('set_player_mp', -1*costs.cost[cost]);
                        break;
                    case 'CURMP':
                        this.$store.commit('set_player_mp', -1*costs.cost[cost]*attr['CURMP'].value);
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
            var dmg = dmgs.dmg['fixed'] == undefined ? 0 : dmgs.dmg['fixed'];
            for(var attr in dmgs.dmg) {
                if(source.attribute[attr] != undefined)
                    dmg += source.attribute[attr].value*dmgs.dmg[attr];
            }
            return dmg;
        },
        getApDmg(spell, source) {
            var spellLv = source.spells == undefined ? 0 : source.spells.spell[spell].lv-1;
            var apDmgs = this.spell[spell].level[spellLv];
            if(!apDmgs.ap)
                return source.attribute['AP'].value;
            var ap = apDmgs.ap['fixed'] == undefined ? 0 : apDmgs.ap['fixed'];
            for(var attr in apDmgs.ap) {
                if(source.attribute[attr] != undefined)
                    ap += source.attribute[attr].value*apDmgs.ap[attr];
            }
            return ap;
        },
        getHeal(spell, source) {
            var spellLv = source.spells == undefined ? 0 : source.spells.spell[spell].lv-1;
            var heals = this.spell[spell].level[spellLv];
            if(!heals.heal)
                return 0;
            var heal = heals.heal['fixed'] == undefined ? 0 : heals.heal['fixed'];
            for(var attr in heals.heal) {
                if(source.attribute[attr] != undefined)
                    heal += source.attribute[attr].value*heals.heal[attr];
            }
            heal = Math.round(heal);
            this.set_player_hp(heal);
            // this.$store.commit('set_player_hp', heal);
            return heal;
        },
        getMrValue(type, target) {
            var attr = target.attribute;
            var value = attr['MR'].value;
            // 玩家进攻时无视目标魔法消耗
            if(type == 'player')
                return value;
            if(attr['CURMP'].value < value/4)
                value = attr['CURMP'].value * 4;
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
                    this.addStreak();
                    let gold = Math.round((100+lv**2)*(2+2*Math.random()))
                    guild.getGold('', gold);
                    break;
                case 'crystal':
                    this.addStreak();
                    let crystal = Math.round((1+lv*2)*(1+Math.random()))
                    guild.getCrystal('', crystal);
                    break;
                case 'chest':
                    item = itemInfo.createItem('inv_box_01', 1);
                    break;
                case 'equip':
                    this.addStreak();
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
            else if(this.$store.state.guildAttribute.smith >= 20 && Math.random() < 0.025){
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
            index.nextLevel();
        },
        levelUp() {
            let index = this.findComponentUpward(this, 'index'); 
            this.$store.state.playerAttribute.lv += 1;
            this.$store.state.dungeonInfo.trial.level += 1;
            index.enermyLvChange = this.$store.state.playerAttribute.lv;
            this.$store.state.dungeonInfo.advanture.level = index.enermyLvChange;
            this.endStreak();
            if(this.$store.state.playerAttribute.lv == 10) {
                var element = document.getElementById('guild');
                element.classList.add('glow');
            }
            if(this.$store.state.playerAttribute.lv == 20) {
                var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
                var item = itemInfo.createItem('spell_nature_thunderclap', 1);  
                itemInfo.addItem(JSON.parse(item));
            }
        },
        enermySlain(id, qty){
            var slain = {slain: {}};
            slain['slain'][id] = qty;
            this.$store.commit("set_statistic", slain);
        },
        addStreak() {
            this.streak += 1;
        },
        endStreak() {
            this.streak = 0;
        },
        eliteStat(attribute) {
            attribute['ATK'] = {
                value: attribute['ATK'].value*2,
                showValue: attribute['ATK'].value*2
            }
            attribute['AP'] = {
                value: attribute['AP'].value*2,
                showValue: attribute['AP'].value*2
            }
            attribute['MAXHP'] = {
                value: attribute['MAXHP'].value*10,
                showValue: attribute['MAXHP'].value*10
            }
            attribute['CURHP'] = {
                value: attribute['MAXHP'].value,
                showValue: attribute['MAXHP'].value
            }
        },
        bossStat(attribute) {
            attribute['ATK'] = {
                value: attribute['ATK'].value*5,
                showValue: attribute['ATK'].value*5
            }
            attribute['DEF'] = {
                value: attribute['DEF'].value*2,
                showValue: attribute['DEF'].value*2
            }
            attribute['AP'] = {
                value: attribute['AP'].value*5,
                showValue: attribute['AP'].value*5
            }
            attribute['MR'] = {
                value: attribute['MR'].value*2,
                showValue: attribute['MR'].value*2
            }
            attribute['MAXHP'] = {
                value: attribute['MAXHP'].value*100,
                showValue: attribute['MAXHP'].value*100
            }
            attribute['CURHP'] = {
                value: attribute['MAXHP'].value,
                showValue: attribute['MAXHP'].value
            }
        }
    }
}


</script>