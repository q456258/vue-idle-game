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
            playerAttribute.tempSpells = this.createTempSpell(playerAttribute);
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
            flexStats = ['MAXHP', 'ATK'],
            fixStats = ['AP', 'DEF', 'MR'];
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
            fixStats.forEach(stat => {
                let attribute = enermyAttribute.attribute[stat];
                // attribute.value = Math.round(attribute.value*(1+enermyAttribute.lv*0.15)*(1+Math.random()/10));
                // attribute.value = Math.round(attribute.value*(1+enermyAttribute.lv*0.15));
                attribute.value = Math.round(attribute.value*(enermyAttribute.lv));
                attribute.showValue = attribute.value;
                enermyAttribute.attribute[stat] = attribute;
            });
            attribute['CURHP'] = {
                value: attribute['MAXHP'].value,
                showValue: attribute['MAXHP'].value
            }
            
            val = Math.round(0.01 * attribute['DEF'].value / (1 + (0.0105 * attribute['DEF'].value))*10000)/100;
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
            var crit = Math.round(Math.random()*100);
            if(crit<source.attribute.CRIT.value) 
                dmg *= source.attribute.CRITDMG.value/100;
            dmg -= target.attribute.MR.value;
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
        createTempSpell(source) {
            var tempSpells = {total:0, spell: []};
            source.spells.forEach(spell => {
                tempSpells.total += this.spell[spell].weight;
            });
            tempSpells.spell = source.spells;
            return tempSpells;
        },
        getSpell(source) {
            if(source.tempSpells == undefined)
                return 'attack'
            var random = Math.floor(Math.random()*source.tempSpells.total);
            var curWeight = 0;
            var selectSpell = '';
            for(var spell in source.tempSpells.spell) {
                let name = source.tempSpells.spell[spell];
                let tempSpell = this.spell[name];
                curWeight += tempSpell.weight;
                if(curWeight > random) {
                    selectSpell = name;
                    break;
                }
            }   
            if(selectSpell != 'attack') {
                source.tempSpells.total -= this.spell[selectSpell].weight;
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
        reward(type, lv) {
            var equipInfo = this.findBrothersComponents(this, 'equipInfo', false)[0];
            var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            var index = this.findComponentUpward(this, 'index');
            var bonus = 0;
            var equip = null; 
            var item = null; 
            switch(type) {
                case 'gold':
                    let gold = Math.round((100+lv**2)*(2+2*Math.random()))
                    this.$store.state.guildAttribute.gold += gold;
                    this.$store.commit("set_sys_info", {
                        type: 'reward',
                        msg: '获得'+gold+'金币'
                    });
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
                    let crystal = Math.round((1+lv)*(1+Math.random()))
                    this.$store.state.guildAttribute.crystal += crystal;
                    this.$store.commit("set_sys_info", {
                        type: 'reward',
                        msg: '获得'+crystal+'水晶'
                    });
                    break;
                case 'chest':
                    this.$store.commit("set_sys_info", {
                        type: 'reward',
                        msg: '获得宝箱'
                    });
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
                if(backpack.autoSell[equip.quality.qualityLv-1])
                    backpack.sellEquipmentByEquip(equip);
                else {
                    for (let i = 0; i < backpack.grid.length; i++) {
                        if (JSON.stringify(backpack.grid[i]).length < 3) {
                            this.$set(backpack.grid, i, equip);
                            break;
                        }
                        if(i==backpack.grid.length-1){
                            backpack.sellEquipmentByEquip(equip);
                        }
                    }
                }
            }
            if(item != null) {
                item = JSON.parse(item);
                this.$store.commit("set_sys_info", {
                    type: 'reward',
                    msg: '获得战利品',
                    item: item
                });
                for (let i = 0; i < backpack.itemGrid.length; i++) {
                    if (JSON.stringify(backpack.itemGrid[i]).length < 3) {
                        this.$set(backpack.itemGrid, i, item);
                        break;
                    }
                    if(i==backpack.itemGrid.length-1){
                        backpack.sellEquipmentByEquip(item);
                    }
                }
            }
            index.nextLevel();
        },
        levelUp() {
            this.$store.state.playerAttribute.lv += 1;
            this.$store.state.dungeonInfo.advanture.level += 1;
            this.$store.state.dungeonInfo.trial.level += 1;
        }
    }
}


</script>