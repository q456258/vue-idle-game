export const spellEffect = {
    data() {
        return {
        }
    },
    methods: {
        getSpell(source, target) {
            if(source.spells == undefined)
                return 'attack'
            let selectSpell = 'attack';
            let keys = Object.keys(source.spells).reverse();
            for(let i in keys) {
                let spell = keys[i];
                if(source.spells[spell].progress >= this.spell[spell].max) {
                    selectSpell = spell;
                    source.spells[spell].progress = 0;
                    break;
                }
            }   
            if(source.type == 'player' && this.checkCost(selectSpell)) {
                return selectSpell;
            }
            return 'attack';
        },
        // 计算护甲减免百分比
        getDefRed(armor) {
            let sign = armor>=0 ? 1 : -1;
            armor = Math.abs(armor);
            return sign*Math.round((armor/(100+armor) + armor/(armor+3500))/2*1000000)/10000;
        },
        // 计算破甲百分比值
        getSunderRed(sunder) {
            let sign = sunder>=0 ? 1 : -1;
            sunder = Math.abs(sunder);
            return sign*Math.round((sunder/(100+sunder))*100);
        },
        callAction(source, target) {
            if(this.stun(source))
                return 0;
            let spell = this.getSpell(source, target);
            this.callSpell(source, target, spell);
            if(source.type == 'player')
                this.useCost(spell);
        },
        callSpell(source, target, spell) {
            switch(spell) {
                case 'attack':
                    this.attack(source, target, spell);
                    break;
                case 'spell_nature_thunderclap':
                    this.spell_nature_thunderclap(source, target, spell);
                    break;
                case 'inv_sword_48':
                    this.inv_sword_48(source, target, spell);
                    break;
                case 'ability_whirlwind':
                    this.ability_whirlwind(source, target, spell);
                    break;
                case 'ability_warrior_shieldbash':
                    this.ability_warrior_shieldbash(source, target, spell);
                    break;
                case 'ability_racial_avatar':
                    this.ability_racial_avatar(source, target, spell);
                    break;
                case 'spell_warlock_soulburn':
                    this.spell_warlock_soulburn(source, target, spell);
                    break;
                default:
                    this.generalSpell(source, target, spell);
                    break;
            }
            
        },
        generalSpell(source, target, spell) {
            let dmg = this.getSpellDmg(spell, source);
            let heal = this.getSpellHeal(spell, source);
            let effectList = this.getSpellEffect(source, spell);
            this.applyDmg(source, target, spell, dmg);
            this.applyHeal(source, spell, heal);
            this.applyEffect(source, target, effectList);
        },
        checkCost(spell) {
            let attr = this.playerAttr.attribute;
            let spellLv = this.playerAttr.spells[spell].lv-1;
            let talent = 'ability_warrior_intensifyrage';
            if(this.playerAttr.talent[talent] > 0) {
                return true;
            }
            for(let cost in this.spell[spell].level[spellLv].cost) {
                if(cost == 'MP') {
                    if(attr['CURMP'].value < this.spell[spell].level[spellLv].cost['MP'])
                        return false;
                }
            }
            return true;
        },
        useCost(spell) {
            // 怪用技能无消耗
            let attr = this.playerAttr.attribute;
            let spellLv = this.playerAttr.spells[spell].lv-1;
            let costs = this.spell[spell].level[spellLv];
            let talent = 'ability_warrior_intensifyrage';
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
                        if(this.playerAttr.talent[talent] > 0)
                            this.set_player_hp(-1*costs.cost[cost], this.playerAttr);
                        else
                            this.$store.commit('set_player_mp', -1*costs.cost[cost]);
                        break;
                    case 'CURMP':
                        if(this.playerAttr.talent[talent] > 0)
                            this.set_player_hp(-1*costs.cost[cost]*attr['CURMP'].value, this.playerAttr);
                        else
                            this.$store.commit('set_player_mp', -1*costs.cost[cost]*attr['CURMP'].value);
                        break;
                    case 'MAXMP':
                        if(this.playerAttr.talent[talent] > 0)
                            this.set_player_hp(-1*costs.cost[cost]*attr['MAXMP'].value, this.playerAttr);
                        else
                            this.$store.commit('set_player_mp', -1*costs.cost[cost]*attr['MAXMP'].value);
                        break;
                }
            }
        },
        getSpellDmg(spell, source) {
            let spellLv = source.spells == undefined ? 0 : source.spells[spell].lv-1;
            let dmgs = this.spell[spell].level[spellLv];
            let dmg = dmgs.dmg['FIX'] == undefined ? 0 : dmgs.dmg['FIX'];
            for(let attr in dmgs.dmg) {
                if(source.attribute[attr] != undefined)
                    dmg += source.attribute[attr].value*dmgs.dmg[attr];
            }
            return dmg;
        },
        getSpellHeal(spell, source) {
            let spellLv = source.spells == undefined ? 0 : source.spells[spell].lv-1;
            let heals = this.spell[spell].level[spellLv];
            if(!heals.heal)
                return 0;
            let heal = heals.heal['FIX'] == undefined ? 0 : heals.heal['FIX'];
            for(let attr in heals.heal) {
                if(source.attribute[attr] != undefined)
                    heal += source.attribute[attr].value*heals.heal[attr];
            }
            heal = Math.round(heal);
            return heal;
        },
        applyDmg(source, target, spell, dmg) {
            let spellInfo = this.spell[spell];
            dmg = this.applyReducedDmg(source, target, dmg);
            dmg = this.applyCrit(source, dmg, spell);
            dmg = this.applyMR(target, dmg, spell);
            dmg = this.applyBonusFinalDmg(source, target, spell, dmg);
            let talent = 'ability_warrior_punishingblow';
            if(source.lv > target.lv && source.talent[talent] > 0) {
                dmg += source.talent[talent]*50;
            }
            talent = 'ability_defend';
            if(target.talent[talent] > 0) {
                dmg -= source.talent[talent]*5;
            }
            dmg = Math.round(dmg);
            if(dmg < 0) {
                dmg = 0;
            }
            this.triggerOnHit(source, target);
            if(source.type == 'player') {
                talent = 'ability_revendreth_druid';
                if(source.talent[talent] > 0) {
                    let heal = source.talent[talent]*0.004*dmg;
                    heal = Math.round(heal);
                    this.set_player_hp(heal, source);
                }
                this.set_enermy_hp(-1*dmg);
                this.$store.commit("set_battle_info", {
                    type: 'dmg',
                    msg: '使用【'+spellInfo.name+'】造成了'+dmg+'点伤害'
                })
            } else {
                this.set_player_hp(-1*dmg, source);
                this.$store.commit("set_battle_info", {
                    type: 'dmged',
                    msg: '目标使用【'+spellInfo.name+'】对你造成了'+dmg+'点伤害'
                })
            }
        },
        applyBonusFinalDmg(source, target, spell, dmg) {
            let bonus = 1;
            // 天神下凡
            if(source.buff['avatar'] != undefined) {
                bonus += 0.2;
            } 
            let talent = 'ability_warrior_bloodfrenzy';
            if(source.talent[talent] > 0) {
                let lost_hp_percent = 100-source.attribute.CURHP.value/source.attribute.MAXHP.value*100;
                bonus += Math.floor(lost_hp_percent/(30-source.talent[talent]*5))*0.005;
            }
            talent = 'warrior_talent_icon_furyintheblood';
            if(source.talent[talent] > 0) {
                bonus += source.talent[talent]*0.01;
            }
            if(target.talent[talent] > 0) {
                bonus += source.talent[talent]*0.005;
            }
            talent = 'ability_warrior_revenge';
            if(source.talent[talent] > 0) {
                if(this.$store.state.statistic.slainBy[target.name] != undefined)
                    bonus += source.talent[talent]*0.02;
            }
            
            
            return dmg*bonus;
        },
        applyReducedDmg(source, target, baseDmg) {
            if(baseDmg == 0)
                return 0;
            baseDmg = this.charge(source, baseDmg);
            baseDmg = this.block(target, baseDmg);
            let penDmg = this.penetrate(source, baseDmg);
            let armor = this.sunder(source, target.attribute.DEF.value);
            armor = Math.round(armor*(1-source.attribute.SUNDERRED.value/100));
            let defRed = this.getDefRed(armor);
            baseDmg -= penDmg;
            let dmg = baseDmg*(1-defRed/100)+penDmg;
            this.lifesteal(source, dmg);
            this.manasteal(source, dmg);
            return dmg;
        },
        applyCrit(source, dmg, spell) {
            let crit = Math.round(Math.random()*100);
            if(spell == 'MUST_CRIT')
                crit = 100;
            if(crit<source.attribute.CRIT.value) {
                dmg *= source.attribute.CRITDMG.value/100;
                if(source.type == 'player') {
                    let talent = 'spell_shadow_summonimp';
                    if(source.talent[talent] > 0) {
                        let heal = source.talent[talent]*0.025*source.attribute.MAXHP.value;
                        heal = Math.round(heal);
                        this.set_player_hp(heal, source);
                    }
                }
            }
            return dmg;
        },
        applyMR(target, dmg, spell) {
            let attr = target.attribute;
            let value = attr['MR'].value;
            // 玩家进攻时无视目标魔法消耗
            if(target.type != 'player')
                return dmg-value;
            let allowedMp = attr['CURMP'].value-attr['MAXMP'].value/5;
            if(allowedMp < value/4)
                value = allowedMp * 4;
            let cost = value/4;
            this.$store.commit('set_player_mp', -1*Math.round(cost));
            return dmg-Math.round(value);
        },
        applyHeal(source, spell, heal) {
            let spellInfo = this.spell[spell];
            if(source.type == 'player' && heal > 0) {
                this.set_player_hp(heal, source);
                this.$store.commit("set_battle_info", {
                    type: 'win',
                    msg: '使用【'+spellInfo.name+'】恢复了' + heal+ '点生命值'
                })
            } else {
                // 敌人恢复生命值
            }
        },
        getSpellEffect(source, spellName) {
            let spellLv = source.spells == undefined ? 0 : source.spells[spellName].lv-1;
            let effect = this.spell[spellName].level[spellLv].effect;
            let effectList = {};
            for(let eff in effect) {
                effectList[eff] = effect[eff];
            }
            return effectList;
        },
        applyEffect(source, target, effectList) {
            for(let eff in effectList) {
                if(Math.random()*100 < effectList[eff].chance) {
                    if(effectList[eff].target == 'self')
                        this.buffApply(source, source, eff, effectList[eff].stack);
                    else
                        this.buffApply(source, target, eff, effectList[eff].stack);
                }
            }
        },
        // 普通攻击
        attack(source, target, spell) {
            let dmg = this.getSpellDmg(spell, source);
            let effectList = this.getSpellEffect(source, spell);
            // 强化攻击
            let talent = 'classicon_warrior';
            if(source.talent[talent] > 0) {
                let talentLv = source.talent[talent];
                dmg = source.attribute['ATK'].value*(1+talentLv*0.05);
            }
            // 重击
            talent = 'ability_warrior_decisivestrike';
            if(source.talent[talent] > 0) {
                let chance = source.talent[talent]*1;
                effectList['stun'] = {stack: 1, chance: chance, target: 'enermy'};
            }
            
            this.applyDmg(source, target, spell, dmg);
            this.applyEffect(source, target, effectList);
        },
        // 雷霆一击
        spell_nature_thunderclap(source, target, spell) {
            let dmg = this.getSpellDmg(spell, source);
            let effectList = this.getSpellEffect(source, spell);
            // 风暴之锤
            let talent = 'warrior_talent_icon_stormbolt';
            if(source.talent[talent] > 0) {
                let chance = source.talent[talent]*10;
                effectList['stun'] = {stack: 1, chance: chance, target: 'enermy'};
            }
            // 无坚不摧之力
            talent = 'warrior_talent_icon_thunderstruck';
            if(source.talent[talent] > 0) {
                dmg = dmg*1.3;
                source.spells[spell].progress += 3;
            }
            // 十字军之力
            talent = 'ability_paladin_swiftretribution';
            if(source.talent[talent] > 0) {
                let stack = source.talent[talent]*1;
                source.spells['spell_holy_crusaderstrike'].progress += stack;
            }
            
            this.applyDmg(source, target, spell, dmg);
            this.applyEffect(source, target, effectList);
        },
        // 屠杀
        inv_sword_48(source, target, spell) {
            let dmg = this.getSpellDmg(spell, source);
            let hp_percent = target.attribute.CURHP.value/target.attribute.MAXHP.value*100;
            // 处刑
            let talent = 'ability_deathknight_deathchain';
            if(target.type != 'BOSS' && source.talent[talent] > 0 && hp_percent < source.talent[talent]*5) {
                this.set_enermy_hp('dead');
            } else {
                // 斩杀
                talent = 'ability_blackhand_marked4death';
                if(source.talent[talent] > 0 && hp_percent < 50) {
                    let bonus = 0.9+source.talent[talent]/10;
                    dmg += source.attribute['ATK'].value*bonus;
                } else if(hp_percent < 80)
                    dmg += source.attribute['ATK'].value*(0.75);
                
                this.applyDmg(source, target, spell, dmg);
            }
        },
        // 盾击
        ability_warrior_shieldbash(source, target, spell) {
            let dmg = this.getSpellDmg(spell, source);
            let effectList = this.getSpellEffect(source, spell);
            // 盾牌猛击
            talent = 'inv_shield_05';
            if(source.talent[talent] > 0) {
                let chance = source.talent[talent]*10;
                effectList['stun'] = {stack: 1, chance: chance, target: 'enermy'};
            }
            // 惩罚
            talent = 'ability_deathknight_sanguinfortitude';
            if(source.talent[talent] > 0) {
                dmg = dmg*1.2;
                let stack = source.talent[talent]*1;
                effectList['weak'] = {stack: stack, chance: 100, target: 'enermy'};
            }
            
            this.applyDmg(source, target, spell, dmg);
            this.applyEffect(source, target, effectList);
        },
        // 剑刃风暴
        ability_whirlwind(source, target, spell, count=8) {
            if(count>0) {
                this.ability_whirlwind(source, target, spell, count-1);
            }
            let buffList = Object.assign(source.buff, source.timedBuff);
            for(let buff in buffList) {
                if(this.buffType.statusDebuff[buff] != undefined)
                    this.buffRemoved(source, source, buff);
            }
            let dmg = this.getSpellDmg(spell, source);            
            this.applyDmg(source, target, spell, dmg);
        },
        // 天神下凡
        ability_racial_avatar(source, target, spell) {
            this.buffApply(player, player, 'avatar', 60);
            let buffList = Object.assign(source.buff, source.timedBuff);
            for(let buff in buffList) {
                if(this.buffType.statusDebuff[buff] != undefined || this.buffType.debuff[buff] != undefined)
                    this.buffRemoved(source, source, buff);
            }
            this.$store.commit("set_battle_info", {
                type: 'dmg',
                msg: '使用【天神下凡】'
            })
        },
        // 勾魂
        spell_warlock_soulburn(source, target, spell) {
            let dmg = this.getSpellDmg(spell, source);
            let effectList = this.getSpellEffect(source, spell);
            // 夺魄
            let talent = 'ability_warlock_jinx';
            if(source.talent[talent] > 0) {
                let chance = source.talent[talent]*10;
                effectList['deathImmune'] = {stack: 1, chance: chance, target: 'self'};
            }
            
            this.applyDmg(source, target, spell, dmg);
            this.applyEffect(source, target, effectList);
        },
        // 破裂投掷
        ability_warrior_shatteringthrow(source, target, spell) {
            let dmg = this.getSpellDmg(spell, source);
            let effectList = this.getSpellEffect(source, spell);
            // 粉碎投掷
            let talent = 'ability_warrior_colossussmash';
            if(source.talent[talent] > 0) {
                let chance = source.talent[talent]*10;
                effectList['penetrate']['chance'] += chance;
            }
            
            this.applyDmg(source, target, spell, dmg);
            this.applyEffect(source, target, effectList);
        },
    }
}