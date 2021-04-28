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
                enermyAttribute = this.$store.state.enermyAttribute,
                dungeonInfo = this.$store.state.dungeonInfo;
            if(enermyAttribute.attribute.CURHP.value == 0){
                this.generateEnermy(type, dungeonInfo[dungeonInfo.current].level);
                enermyAttribute = this.$store.state.enermyAttribute;
            }
            playerAttribute.tempSpells = this.$deepCopy(playerAttribute.spells),
            enermyAttribute.tempSpells = this.$deepCopy(enermyAttribute.spells);
            if(this.$store.state.dungeonInfo.inBattle)
                return;
            this.setBattleStatus(true);
            this.battleTimer = setInterval(() => {
                this.$store.commit('set_enermy_hp', -1*this.dmgCalculate(playerAttribute, enermyAttribute, 'player'));
                if(enermyAttribute.attribute.CURHP.value == 0) {
                    this.reward(type);
                    this.setBattleStatus(false);
                    clearInterval(this.battleTimer);
                    let index = this.findComponentUpward(this, 'index'); 
                    index.enableOption(dungeonInfo.current);
                    if(dungeonInfo.auto) {
                        index.startBattle();
                    }
                    this.$store.commit("set_battle_info", {
                        type: 'win',
                        msg: '战斗结束，你胜利了'
                    });
                    return;
                } 
                this.$store.commit('set_player_hp', -1*this.dmgCalculate(enermyAttribute, playerAttribute, 'enermy'));
                if(enermyAttribute.attribute.RECOVERY != undefined) {
                    this.$store.commit('set_enermy_hp', enermyAttribute.attribute.RECOVERY.value);
                    this.$store.commit("set_battle_info", {
                        type: 'dmged',
                        msg: '【试炼】对方恢复了'+ enermyAttribute.attribute.RECOVERY.value+'点生命值'
                    })

                }
                if(playerAttribute.attribute.CURHP.value == 0) {
                    clearInterval(this.battleTimer);
                    // let index = this.findComponentUpward(this, 'index'); 
                    // index.stopBattle();
                    this.$store.state.dungeonInfo.inBattle = false;
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
            var index = Math.floor(Math.random()*this[type].type.length),
            enermyAttribute = this.$deepCopy(this[type].type[index]),
            attribute = enermyAttribute.attribute,
            val = 0.0,
            flexStats = ['MAXHP', 'ATK', 'AP', 'DEF', 'MR'];
            enermyAttribute.lv = level;
            flexStats.forEach(stat => {
                let attribute = enermyAttribute.attribute[stat];
                attribute.value = Math.round(attribute.value*(1+enermyAttribute.lv*0.15)*(1+Math.random()/10));
                attribute.showValue = attribute.value;
                enermyAttribute.attribute[stat] = attribute;
            });
            attribute['CURHP'] = {
                value: attribute['MAXHP'].value,
                showValue: attribute['MAXHP'].value
            }

            val = Math.round(0.01 * attribute['DEF'].value / (1 + (0.0105 * attribute['DEF'].value))*10000)/100;
            attribute['DEFRED'] = {
                value: val,
                showValue: val+'%'
            }
            enermyAttribute.spells = {
                total: 0,
                spell: {}
            };
            enermyAttribute.initSpell.forEach(spell => {
                enermyAttribute.spells.spell[spell] = this.spell[spell]
                enermyAttribute.spells.total += this.spell[spell].weight
            });
            if(this.$store.state.dungeonInfo.current == 'trial') {
                attribute['RECOVERY'] = {
                    value: Math.round(attribute['MAXHP'].value*0.05),
                    showValue: Math.round(attribute['MAXHP'].value*0.05),
                }
            }

            this.$store.commit('set_enermy_attribute', enermyAttribute);
        },
        dmgCalculate(source, target, type) {
            var spell = this.getSpell(source);
            var spellInfo = source.spells.spell[spell];
            var dmg = this.getSpellDmg(spell, source)*(1-target.attribute.DEFRED.value/100);
            var crit = Math.round(Math.random()*100);
            if(crit<source.attribute.CRIT.value) 
                dmg *= source.attribute.CRITDMG.value/100;
            dmg += target.attribute.MR.value;
            dmg = Math.round(dmg);
            if(dmg < 0)
                dmg = 0;
            dmg += source.attribute.AP.value;
            if(type == 'player') {
                this.$store.commit("set_battle_info", {
                    type: 'dmg',
                    msg: '使用【'+spellInfo.name+'】造成了'+dmg+'点伤害'
                })
            } else {
                this.$store.commit("set_battle_info", {
                    type: 'dmged',
                    msg: '目标使用【'+spellInfo.name+'】对你造成了'+dmg+'点伤害'
                })
            }
            return dmg;
        },
        getSpell(source) {
            var random = Math.floor(Math.random()*source.tempSpells.total);
            var curWeight = 0;
            var selectSpell = '';
            for(var spell in source.tempSpells.spell) {
                let tempSpell = source.tempSpells.spell[spell];
                curWeight += tempSpell.weight;
                if(curWeight > random) {
                    selectSpell = spell;
                    break;
                }
            }   
            if(selectSpell != 'attack') {
                source.tempSpells.total -= source.tempSpells.spell[selectSpell].weight;
                delete source.tempSpells.spell[selectSpell];
            }
            return selectSpell;
        },
        getSpellDmg(spell, source) {
            var dmg = 0;
            for(var attr in this.spell[spell].dmg) {
                dmg += source.attribute[attr].value*this.spell[spell].dmg[attr];
            }
            return dmg;
        },
        reward(type) {
            var equipInfo = this.findBrothersComponents(this, 'equipInfo', false)[0];
            var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            var index = this.findComponentUpward(this, 'index');
            var limit = -1;
            switch(type) {
                case 'normal':
                    limit = 3;
                    break;
                case 'elite':
                    limit = 4;
                    break;
                case 'boss':
                    limit = 5;
                    break;
                case 'chest':
                    limit = 4;
                    break;
            }
            var equip = equipInfo.createEquip(-1, this.$store.state.enermyAttribute.lv, 'random', limit);  
            this.$store.commit("set_sys_info", {
                type: 'reward',
                msg: '获得战利品',
                equip: JSON.parse(equip)
            });
            for (let i = 0; i < backpack.grid.length; i++) {
              if (JSON.stringify(backpack.grid[i]).length < 3) {
                this.$set(backpack.grid, i, JSON.parse(equip));
                break;
              }
              if(i==backpack.grid.length-1)
                backpack.sellEquipment(JSON.parse(equip));
            }
            index.nextLevel();
        }
    }
}


</script>