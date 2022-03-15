export const spellEffect = {
    data() {
        return {
        }
    },
    methods: {
        getSpell(source, target) {
            if(source.type != 'player') {
                return this.getEnermySpell(source);
            }
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
        getEnermySpell(source) {
            let spellCycle = source.spellCycle;
            let curSpell = source.curSpell;
            let spell = spellCycle[curSpell];
            source.curSpell = (curSpell+1)%spellCycle.length;
            return spell;
        },
        // 计算护甲减免百分比
        getDefRed(armor) {
            let sign = armor>=0 ? 1 : -1;
            armor = Math.abs(armor);
            return sign*Math.round((armor/(100+armor) + armor/(armor+3500))/2*1000000)/10000;
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
                case undefined:
                    break;
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
            let dmgs = this.getSpellDmg(spell, source);
            this.getSpellHeal(spell, source, dmgs);
            let effectList = this.getSpellEffect(source, spell);
            this.applyDmg(source, target, spell, dmgs);
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
                    if(attr['CURMP'].value < this.spell[spell].level[spellLv].cost['MP']) {
                        this.$store.commit("set_battle_info", {
                            html: '<span style="color:#ff0000">【'+this.spell[spell].name+'】释放失败</span>'
                        })
                        return false;
                    }
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
                        this.hpChange(this.playerAttr, this.playerAttr, -1*costs.cost[cost]);
                        break;
                    case 'CURHP':
                    case 'MAXHP':
                        this.hpChange(this.playerAttr, this.playerAttr, -1*costs.cost[cost]*attr[cost].value);
                        break;
                    case 'MP':
                        if(this.playerAttr.talent[talent] > 0)
                            this.hpChange(this.playerAttr, this.playerAttr, -1*costs.cost[cost]);
                        else
                            this.mpChange(this.playerAttr, this.playerAttr, -1*costs.cost[cost]);
                        break;
                    case 'CURMP':
                    case 'MAXMP':
                        if(this.playerAttr.talent[talent] > 0)
                            this.hpChange(this.playerAttr, this.playerAttr, -1*costs.cost[cost]*attr[cost].value);
                        else
                            this.mpChange(this.playerAttr, this.playerAttr, -1*costs.cost[cost]*attr[cost].value);
                        break;
                }
            }
        },
        getSpellDmg(spell, source) {
            let spellLv = source.spells == undefined ? 0 : source.spells[spell].lv-1;
            let dmgs = this.spell[spell].level[spellLv];
            let dmg = {};
            // 物理
            if(dmgs.adDmg) {
                dmg.adDmg = dmgs.adDmg['FIX'] == undefined ? 0 : dmgs.adDmg['FIX'];
                for(let attr in dmgs.adDmg) {
                    if(source.attribute[attr] != undefined)
                        dmg.adDmg += source.attribute[attr].value*dmgs.adDmg[attr];
                }
            }
            // 魔法
            if(dmgs.apDmg) {
                dmg.apDmg = dmgs.apDmg['FIX'] == undefined ? 0 : dmgs.apDmg['FIX'];
                for(let attr in dmgs.apDmg) {
                    if(source.attribute[attr] != undefined)
                        dmg.apDmg += source.attribute[attr].value*dmgs.apDmg[attr];
                }
            }
            return dmg;
        },
        getSpellHeal(spell, source, dmgs) {
            let spellLv = source.spells == undefined ? 0 : source.spells[spell].lv-1;
            let heals = this.spell[spell].level[spellLv];
            let healBonus = source.attribute['HEAL'].value;
            if(!heals.heal)
                return 0;
            let heal = heals.heal['FIX'] == undefined ? 0 : heals.heal['FIX'];
            for(let attr in heals.heal) {
                if(source.attribute[attr] != undefined)
                    heal += source.attribute[attr].value*heals.heal[attr];
            }
            if(heal > 0)
                heal += healBonus;
            heal = Math.round(heal);
            this.set_heal(dmgs, heal);
        },
        applyDmg(source, target, spell, dmgs) {
            let spellInfo = this.spell[spell];
            // 物理
            this.applyAdReducedDmg(source, target, dmgs);
            this.applyCrit(source, dmgs, spell);
            this.applyBlock(source, target, dmgs, spell);
            // 魔法
            this.applyApReducedDmg(source, target, dmgs);
            this.applyApCrit(source, dmgs, spell);
            // 最终伤害
            this.applyBonusFinalDmg(source, target, spell, dmgs);
            let talent = 'ability_warrior_punishingblow';
            if(source.lv > target.lv && source.talent[talent] > 0) {
                this.set_ad_dmg(dmgs, this.get_dmg(dmgs, 'ad')+source.talent[talent]*10);
            }
            talent = 'ability_defend';
            if(target.talent[talent] > 0) {
                this.set_ad_dmg(dmgs, this.get_dmg(dmgs, 'ad')-source.talent[talent]*5);
            }
            this.triggerOnHit(source, target);
            talent = 'ability_revendreth_druid';
            if(source.talent[talent] > 0) {
                let heal = source.talent[talent]*0.004*(this.get_dmg(dmgs, 'ad')+this.get_dmg(dmgs, 'ap'));
                heal = Math.round(heal);
                this.hpChange(source, source, {heal: heal});
            }
            for(let i in dmgs) {
                dmgs[i] = Math.round(dmgs[i]);
            }
            talent = 'magic_immune';
            if(target.talent[talent] > 0)
                this.set_ap_dmg(dmgs, 0);
            talent = 'mine';
            if(target.talent[talent] > 0) {
                this.set_ad_dmg(dmgs, 1);
            }
            this.lifesteal(source, dmgs);
            this.manasteal(source, dmgs);
            this.hpChange(source, target, dmgs, spellInfo.name);
        },
        applyBonusFinalDmg(source, target, spell, dmgs) {
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
                bonus += target.talent[talent]*0.005;
            }
            talent = 'ability_warrior_revenge';
            if(source.talent[talent] > 0) {
                if(this.$store.state.statistic.slainBy[target.name] != undefined)
                    bonus += source.talent[talent]*0.02;
            }
            if(source.attribute.VERSBONUS != undefined)
                bonus += source.attribute.VERSBONUS.value/100;
            if(target.attribute.VERSBONUS != undefined)
                bonus -= target.attribute.VERSBONUS.value/100;
            for(let i in dmgs) {
                dmgs[i] = dmgs[i]*bonus;
            }
            
            this.set_ad_dmg(dmgs, this.get_dmg(dmgs, 'ad')*bonus);
            this.set_ap_dmg(dmgs, this.get_dmg(dmgs, 'ap')*bonus);
        },
        applyAdReducedDmg(source, target, dmgs) {
            if(this.get_dmg(dmgs, 'ad') == 0)
                return 0;
            let dmg = this.get_dmg(dmgs, 'ad');
            dmg = this.charge(source, dmg);
            dmg = this.block(target, dmg);
            let penDmg = this.penetrate(source, dmg);
            let armor = this.sunder(source, target.attribute.DEF.value);
            let defRed = this.getDefRed(armor);
            dmg -= penDmg;
            dmg = dmg*(1-defRed/100)+penDmg;
            this.set_ad_dmg(dmgs, dmg);
        },
        applyApReducedDmg(source, target, dmgs) {
            if(this.get_dmg(dmgs, 'ap') == 0)
                return;
            // 伤害减少 0%, 25%, 50%, 75%, 100%
            let reduce = [0, 0, 0, 0, 0];
            let mr = target.attribute.MR.value;
            if(source.attribute.APPEN)
                mr -= source.attribute.APPEN.value;
            let total = 0;
            let random = Math.random()*100;
            reduce[4] = mr/(mr+100)*25;
            reduce[3] = mr/(mr+50)*40;
            reduce[2] = mr/(mr+25)*20;
            reduce[1] = mr/(mr+10)*14;
            for(let i=4; i>0; i--) {
                total += reduce[i];
                if(random < total) {
                    this.set_ap_dmg(dmgs, this.get_dmg(dmgs, 'ap')*(1-i*0.25));
                    return;
                }
            }
        },
        applyCrit(source, dmgs, spell) {
            let crit = Math.round(Math.random()*100);
            if(spell == 'MUST_CRIT')
                crit = 100;
            if(crit<source.attribute.CRIT.value) {
                this.set_ad_dmg(dmgs, this.get_dmg(dmgs, 'ad')*source.attribute.CRITDMG.value/100);
                if(source.type == 'player') {
                    let talent = 'spell_shadow_summonimp';
                    if(source.talent[talent] > 0) {
                        let heal = source.talent[talent]*0.025*source.attribute.MAXHP.value;
                        heal = Math.round(heal);
                        this.hpChange(source, source, {heal: heal});
                    }
                }
            }
        },
        applyApCrit(source, dmgs, spell) {
            let crit = Math.round(Math.random()*100);
            if(spell == 'MUST_CRIT')
                crit = 100;
            if(crit<source.attribute.APCRIT.value) {
                this.set_ap_dmg(dmgs, this.get_dmg(dmgs, 'ap')*source.attribute.APCRITDMG.value/100);
            }
        },
        applyBlock(source, target, dmgs, spell) {
            let attr = target.attribute;
            let value = attr['BLOCK'].value;
            this.set_ad_dmg(dmgs, this.get_dmg(dmgs, 'ad')-value);
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
            let dmgs = this.getSpellDmg(spell, source);
            let effectList = this.getSpellEffect(source, spell);
            // 强化攻击
            let talent = 'classicon_warrior';
            if(source.talent[talent] > 0) {
                let talentLv = source.talent[talent];
                this.set_ad_dmg(dmgs, source.attribute['ATK'].value*(1+talentLv*0.05));
            }
            // 重击
            talent = 'ability_warrior_decisivestrike';
            if(source.talent[talent] > 0) {
                let chance = source.talent[talent]*1;
                effectList['stun'] = {stack: 1, chance: chance, target: 'enermy'};
            }
            this.applyDmg(source, target, spell, dmgs);
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
                dmg.adDmg = dmg.adDmg*1.3;
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
                    dmg.adDmg += source.attribute['ATK'].value*bonus;
                } else if(hp_percent < 80)
                    dmg.adDmg += source.attribute['ATK'].value*(0.75);
                
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
                dmg.adDmg = dmg.adDmg*(1+0.5*source.talent[talent]);
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