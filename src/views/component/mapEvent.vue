<template>
  <div class='mapEvent'>
  </div>
</template>
<script>

import { assist } from '../../assets/js/assist';
import { monsterConfig } from '@/assets/config/monsterConfig'
import { spellConfig } from '@/assets/config/spellConfig'
export default {
    name: 'mapEvent',
    mixins: [assist, monsterConfig, spellConfig],
    data() {
        return {
            battleTimer: "",
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
                this.$store.commit('set_enermy_hp', -1*this.dmgCalculate(playerAttribute, enermyAttribute, 'player'));
                if(enermyAttribute.attribute.CURHP.value == 0) {
                    this.reward(type, enermyAttribute.lv);
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
                this.$store.commit('set_player_hp', -1*this.dmgCalculate(enermyAttribute, playerAttribute, 'enermy'));
                // if(enermyAttribute.attribute.RECOVERY != undefined) {
                //     this.$store.commit('set_enermy_hp', enermyAttribute.attribute.RECOVERY.value);
                //     this.$store.commit("set_battle_info", {
                //         type: 'dmged',
                //         msg: '【试炼】对方恢复了'+ enermyAttribute.attribute.RECOVERY.value+'点生命值'
                //     })

                // }
                if(playerAttribute.attribute.CURHP.value == 0) {
                    clearInterval(this.battleTimer);
                    // let index = this.findComponentUpward(this, 'index'); 
                    // index.stopBattle();
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
            
            val = Math.round((attribute['DEF'].value/(100+attribute['DEF'].value) + attribute['DEF'].value/(attribute['DEF'].value+3500))/2*1000000)/10000;
            // val = Math.round(0.01 * attribute['DEF'].value / (1 + (0.01 * attribute['DEF'].value))*10000)/100;
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
            this.$store.commit('set_enermy_attribute', enermyAttribute);
        },
        dmgCalculate(source, target, type) {
            var spell = this.getSpell(source);
            var spellInfo = this.spell[spell];
            var dmg = this.getSpellDmg(spell, source)*(1-target.attribute.DEFRED.value/100);
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
        getSpell(source) {
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
                return selectSpell;
            }
            return 'attack';
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
            this.$store.commit('set_player_hp', heal);
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
        reward(type, lv) {
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
                    let gold = Math.round((100+lv**2)*(2+2*Math.random()))
                    guild.getGold('', gold);
                    break;
                // case 'wood':
                //     let wood = Math.round((10+lv**1.5)*(1+Math.random()))
                //     this.$store.state.guildAttribute.wood += wood;
                //     this.$store.commit("set_sys_info", {
                //         type: 'reward',
                //         msg: '获得'+wood+'木材'
                //     });
                //     break;
                case 'crystal':
                    let crystal = Math.round((1+lv*2)*(1+Math.random()))
                    this.$store.state.guildAttribute.crystal += crystal;
                    this.$store.commit("set_sys_info", {
                        type: 'reward',
                        msg: '获得'+crystal+'水晶'
                    });
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
            if(item != null) {
                item = JSON.parse(item);
                let quantity = item.quantity;
                this.$store.commit("set_sys_info", {
                    type: 'reward',
                    msg: '获得战利品',
                    item: item,
                    quantity: quantity
                });
                itemInfo.addItem(item);
            }
            else if(this.$store.state.guildAttribute.smith >= 15 && Math.random() < 0.025){
                var item = itemInfo.createItem('inv_misc_enchantedpearla', 1);  
                item = JSON.parse(item);
                let quantity = item.quantity;
                this.$store.commit("set_sys_info", {
                    type: 'reward',
                    msg: '意外捡到一个',
                    item: item,
                    quantity: quantity
                });
                itemInfo.addItem(item);
            }
            index.nextLevel();
        },
        levelUp() {
            let index = this.findComponentUpward(this, 'index'); 
            this.$store.state.playerAttribute.lv += 1;
            this.$store.state.dungeonInfo.trial.level += 1;
            index.enermyLvChange = this.$store.state.playerAttribute.lv;
            this.$store.state.dungeonInfo.advanture.level = index.enermyLvChange;
            if(this.$store.state.playerAttribute.lv == 20) {
                var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
                var item = itemInfo.createItem('spell_nature_thunderclap', 1);  
                itemInfo.addItem(JSON.parse(item));
            }
        }
    }
}


</script>