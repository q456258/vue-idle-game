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
            if(this.checkCost(selectSpell)) {
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
            this.useCost(spell);
        },
        callSpell(source, target, spell) {
            switch(spell) {
                case 'spell_nature_thunderclap':
                    this.spell_nature_thunderclap(source, target, spell);
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
            for(let cost in this.spell[spell].level[spellLv].cost) {
                if(cost == 'MP') {
                    if(attr['CURMP'].value < this.spell[spell].level[spellLv].cost['MP'])
                        return false;
                }
            }
            return true;
        },
        useCost(spell) {
            let attr = this.playerAttr.attribute;
            let spellLv = this.playerAttr.spells[spell].lv-1;
            let costs = this.spell[spell].level[spellLv];
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
            dmg = Math.round(dmg);
            if(dmg < 0) {
                dmg = 0;
            }
            this.buffOnHit(source, target);
            if(source.type == 'player') {
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
                    if(this.playerAttr.talent[talent] != 0) {
                        let heal = this.playerAttr.talent[talent]*0.025*this.playerAttr.attribute.MAXHP.value;
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
        // 雷霆一击
        spell_nature_thunderclap(source, target, spell) {
            let dmg = this.getSpellDmg(spell, source);
            let effectList = this.getSpellEffect(source, spell);
            // 风暴之锤
            let talent = 'warrior_talent_icon_stormbolt';
            if(this.playerAttr.talent[talent] != 0) {
                let chance = this.playerAttr.talent[talent]*20;
                effectList['stun'] = {stack: 1, chance: chance, target: 'enermy'};
            }
            // 无坚不摧之力
            talent = 'warrior_talent_icon_thunderstruck';
            if(this.playerAttr.talent[talent] != 0) {
                dmg = dmg*1.3;
                source.spells[spell].progress += 3;
            }
            
            this.applyDmg(source, target, spell, dmg);
            this.applyEffect(source, target, effectList);
        },
        // 勾魂
        spell_warlock_soulburn(source, target, spell) {
            let dmg = this.getSpellDmg(spell, source);
            let effectList = this.getSpellEffect(source, spell);
            // 夺魄
            let talent = 'ability_warlock_jinx';
            if(this.playerAttr.talent[talent] != 0) {
                let chance = this.playerAttr.talent[talent]*10;
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
            if(this.playerAttr.talent[talent] != 0) {
                let chance = this.playerAttr.talent[talent]*10;
                effectList['penetrate']['chance'] += chance;
            }
            
            this.applyDmg(source, target, spell, dmg);
            this.applyEffect(source, target, effectList);
        },
    }
}