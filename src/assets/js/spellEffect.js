export const spellEffect = {
    data() {
        return {
        }
    },
    methods: {
        getSpell(source, target) {
            if(source.buff['silence'] != undefined)
                return 'attack';
            if(source.type != 'player')
                return this.getenemySpell(source);

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
        getenemySpell(source) {
            let spellCycle = source.spellCycle;
            let curSpell = source.curSpell;
            let spell = spellCycle[curSpell];
            source.curSpell = (curSpell+1)%spellCycle.length;
            return spell;
        },
        setSpellProgress(source, target, type, spell, count) {
            let haste = target.attribute.HASTE.value;
            let progress = 0;
            let newVal = 0;
            let spellList = target.spells;
            if(spell == 'all') {
                if(type == 'add') {
                    progress = count+Math.floor(haste/100);
                    if(Math.random()*100 < haste%100) 
                        progress += 1;
                    for(let spell in spellList) {
                        newVal = spellList[spell].progress + progress;
                        spellList[spell].progress = newVal < this.spell[spell].max ? newVal : this.spell[spell].max;
                    }
                } else if(type == 'minus') {
                    for(let spell in spellList) {
                        newVal = spellList[spell].progress - count;
                        spellList[spell].progress = newVal > 0 ? newVal : 0;
                    }
                } else if(type == 'clear') {
                    for(let spell in spellList)
                        spellList[spell].progress = 0;
                } else if(type == 'full') {
                    for(let spell in spellList)
                        spellList[spell].progress = this.spell[spell].max;
                }
            } else {
                if(spellList[spell] == undefined)
                    return;
                if(type == 'add') {
                    progress = count+Math.floor(haste/100);
                    if(Math.random()*100 < haste%100) 
                        progress += 1;
                    newVal = spellList[spell].progress + progress;
                    spellList[spell].progress = newVal < this.spell[spell].max ? newVal : this.spell[spell].max;
                } else if(type == 'minus') {
                    newVal = spellList[spell].progress - count;
                    spellList[spell].progress = newVal < this.spell[spell].max ? newVal : this.spell[spell].max;
                } else if(type == 'clear') {
                    spellList[spell].progress = 0;
                } else if(type == 'full') {
                    spellList[spell].progress = this.spell[spell].max;
                }
            }
            let charInfo = this.$store.globalComponent["charInfo"];
            charInfo.forceRender = Math.random();
        },
        // 计算护甲减免百分比
        getDefRed(armor) {
            let sign = armor>=0 ? 1 : -1;
            armor = Math.abs(armor);
            return sign*Math.round((armor/(armor+3000))*1000000)/10000;
        },
        callAction(source, target) {
            let index = this.$store.globalComponent["index"];
            if(index.stun(source))
                return 0;
            let spell = this.getSpell(source, target);
            this.callSpell(source, target, spell);
            if(source.type == 'player')
                this.useCost(spell);
            let battleAnime = this.$store.globalComponent["battleAnime"];
            if(source.type == 'player')
                battleAnime.playerMove(spell);
            else
                battleAnime.enemyMove();
            if(this.spell[spell].max > 0)
                battleAnime.displayText(source.type, "spell", this.spell[spell].name);
        },
        callSpell(source, target, spell) {
            switch(spell) {
                case undefined:
                    break;
                case 'attack':
                    this.attack(source, target, spell);
                    break;
                //战士
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
                // case 'spell_warlock_soulburn':
                //     this.spell_warlock_soulburn(source, target, spell);
                //     break;
                //法师
                case 'inv_misc_food_73cinnamonroll':
                    this.inv_misc_food_73cinnamonroll(source, source, spell);
                    break;
                case 'inv_misc_gem_sapphire_02':
                    this.inv_misc_gem_sapphire_02(source, source, spell);
                    break;
                case 'spell_frost_icestorm':
                    this.spell_frost_icestorm(source, target, spell);
                    break;
                case 'ability_warlock_burningembersblue':
                    this.ability_warlock_burningembersblue(source, target, spell);
                    break;
                case 'spell_ice_lament':
                    this.spell_ice_lament(source, source, spell);
                    break;
                case 'spell_shadow_detectlesserinvisibility':
                    this.spell_shadow_detectlesserinvisibility(source, source, spell);
                    break;
                case 'ability_mage_arcanebarrage':
                    this.ability_mage_arcanebarrage(source, target, spell);
                    break;
                case 'spell_arcane_blast':
                    this.spell_arcane_blast(source, target, spell);
                    break;
                case 'spell_nature_starfall':
                    this.spell_nature_starfall(source, target, spell);
                    break;
                case 'spell_frost_wizardmark':
                    this.spell_frost_wizardmark(source, source, spell);
                    break;
                case 'spell_nature_purge':
                    this.spell_nature_purge(source, source, spell);
                    break;
                case 'ability_mage_timewarp':
                    this.ability_mage_timewarp(source, source, spell);
                    break;
                // 牧师
                case 'spell_holy_renew':
                    this.spell_holy_renew(source, source, spell);
                    break;
                case 'spell_holy_testoffaith':
                    this.spell_holy_testoffaith(source, source, spell);
                    break;
                case 'spell_shadow_unholyfrenzy':
                    this.spell_shadow_unholyfrenzy(source, target, spell);
                    break;
                case 'spell_holy_powerwordshield':
                    this.spell_holy_powerwordshield(source, source, spell);
                    break;
                case 'spell_shadow_shadowwordpain':
                    this.spell_shadow_shadowwordpain(source, target, spell);
                    break;
                case 'spell_shadow_shadowmend':
                    this.spell_shadow_shadowmend(source, target, spell);
                    break;
                case 'spell_holy_dispelmagic':
                    this.spell_holy_dispelmagic(source, target, spell);
                    break;
                case 'spell_shadow_demonicfortitude':
                    this.spell_shadow_demonicfortitude(source, target, spell);
                    break;
                case 'ability_priest_flashoflight':
                    this.ability_priest_flashoflight(source, target, spell);
                    break;
                case 'spell_nature_nullifydisease':
                    this.spell_nature_nullifydisease(source, target, spell);
                    break;
                // 野怪
                case 'spell_frost_frostward':
                    this.spell_frost_frostward(source, target, spell);
                    break;
                case 'ability_ghoulfrenzy':
                    this.ability_ghoulfrenzy(source, target, spell);
                    break;
                case 'inv_misc_food_meat_raw_04':
                    this.inv_misc_food_meat_raw_04(source, source, spell);
                    break;
                case 'ability_vehicle_shellshieldgenerator':
                    this.ability_vehicle_shellshieldgenerator(source, source, spell);
                    break;
                case 'spell_fire_flameblades':
                    this.spell_fire_flameblades(source, target, spell);
                    break;
                case 'inv_spiritshard_01':
                    this.inv_spiritshard_01(source, source, spell);
                    break;
                case 'spell_fire_immolation':
                    this.spell_fire_immolation(source, source, spell);
                    break;
                case 'sha_spell_fire_bluehellfire_nightmare':
                    this.sha_spell_fire_bluehellfire_nightmare(source, target, spell);
                    break;
                    
                default:
                    this.generalSpell(source, target, spell);
                    break;
            }
            if(this.spell[spell].max > 0) {
                let effectList = {};
                // 奥术专注
                let talent = 'spell_shadow_manaburn';
                if(source.talent[talent] > 0) {
                    let chance = source.talent[talent]*2;
                    effectList['focus'] = {stack: 1, chance: chance, target: 'self'};
                }
                // 奥术充能
                talent = 'spell_arcane_arcane01';
                if(source.talent[talent] > 0) {
                    let chance = source.talent[talent]*20;
                    effectList['arcCharge'] = {stack: 1, chance: chance, target: 'self'};
                }
                this.applyEffect(source, target, effectList);
            }
        },
        generalSpell(source, target, spell) {
            let dmgs = this.getSpellDmg(spell, source, target);
            this.getSpellHeal(spell, source, target, dmgs);
            let effectList = this.getSpellEffect(source, spell);
            let statBuffList = this.getStatBuff(source, spell);

            this.applyDmg(source, target, spell, dmgs);
            this.applyEffect(source, target, effectList);
            this.applyStatBuff(source, target, statBuffList);
        },
        checkCost(spell) {
            let attr = this.playerAttr.attribute;
            let spellLv = this.playerAttr.spells[spell].lv-1;
            let talent = 'ability_warrior_intensifyrage';
            if(this.playerAttr.talent[talent] > 0) {
                return true;
            }
            for(let cost in this.spell[spell].level[spellLv].cost) {
                if(cost == 'MP' && !(this.playerAttr.buff.focus > 0)) {
                    if(attr['CURMP'].value < this.spell[spell].level[spellLv].cost['MP']) {
                        let battleAnime = this.$store.globalComponent["battleAnime"];
                        battleAnime.displayText("player", "failSpell", this.spell[spell].name);
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
            let index = this.$store.globalComponent["index"];
            let attr = this.playerAttr.attribute;
            let spellLv = this.playerAttr.spells[spell].lv-1;
            let costs = this.spell[spell].level[spellLv];
            let talent;
            for(let cost in costs.cost) {
                let actualCost = costs.cost[cost];
                switch(cost) {
                    case 'HP':
                            index.hpChange(this.playerAttr, this.playerAttr, -1*actualCost);
                        break;
                    case 'CURHP':
                    case 'MAXHP':
                            index.hpChange(this.playerAttr, this.playerAttr, -1*actualCost*attr[cost].value);
                        break;
                    case 'MP':
                        if(index.buffReduce(this.playerAttr, this.playerAttr, 'focus'))
                            break;
                        talent = 'ability_socererking_arcanefortification';
                        if(this.playerAttr.talent[talent] > 0)
                            actualCost *= (1-this.playerAttr.talent[talent]*0.01);
                        talent = 'ability_warrior_intensifyrage';
                        if(this.playerAttr.talent[talent] > 0)
                            index.hpChange(this.playerAttr, this.playerAttr, -1*actualCost);
                        else
                            index.mpChange(this.playerAttr, this.playerAttr, -1*actualCost);
                        break;
                    case 'CURMP':
                    case 'MAXMP':
                        if(index.buffReduce(this.playerAttr, this.playerAttr, 'focus'))
                            break;
                        talent = 'ability_socererking_arcanefortification';
                        if(this.playerAttr.talent[talent] > 0)
                            actualCost *= (1-this.playerAttr.talent[talent]*0.01);
                        talent = 'ability_warrior_intensifyrage';
                        if(this.playerAttr.talent[talent] > 0)
                            index.hpChange(this.playerAttr, this.playerAttr, -1*actualCost*attr[cost].value);
                        else
                            index.mpChange(this.playerAttr, this.playerAttr, -1*actualCost*attr[cost].value);
                        break;
                }
            }
        },
        getSpellDmg(spell, source, target) {
            let spellLv = source.spells == undefined ? 0 : source.spells[spell].lv-1;
            let dmgs = this.spell[spell].level[spellLv];
            let dmg = {};
            // 物理
            if(dmgs.adDmg) {
                dmg.adDmg = dmgs.adDmg['FIX'] == undefined ? 0 : dmgs.adDmg['FIX'];
                for(let attr in dmgs.adDmg) {
                    if(attr.startsWith('t_')) {
                        let attr_no_t = attr.substring(2);
                        if(target.attribute[attr_no_t] != undefined)
                            dmg.adDmg += target.attribute[attr_no_t].value*dmgs.adDmg[attr];
                    } else {
                        if(source.attribute[attr] != undefined)
                            dmg.adDmg += source.attribute[attr].value*dmgs.adDmg[attr];
                    }
                }
            }
            // 魔法
            if(dmgs.apDmg) {
                dmg.apDmg = dmgs.apDmg['FIX'] == undefined ? 0 : dmgs.apDmg['FIX'];
                for(let attr in dmgs.apDmg) {
                    if(attr.startsWith('t_')) {
                        let attr_no_t = attr.substring(2);
                        if(target.attribute[attr_no_t] != undefined)
                            dmg.apDmg += target.attribute[attr_no_t].value*dmgs.apDmg[attr];
                    } else {
                        if(source.attribute[attr] != undefined)
                            dmg.apDmg += source.attribute[attr].value*dmgs.apDmg[attr];
                    }
                }
            }
            // 神圣
            if(dmgs.trueDmg) {
                dmg.trueDmg = dmgs.trueDmg['FIX'] == undefined ? 0 : dmgs.trueDmg['FIX'];
                for(let attr in dmgs.trueDmg) {
                    if(attr.startsWith('t_')) {
                        let attr_no_t = attr.substring(2);
                        if(target.attribute[attr_no_t] != undefined)
                            dmg.trueDmg += target.attribute[attr_no_t].value*dmgs.trueDmg[attr];
                    } else {
                        if(source.attribute[attr] != undefined)
                            dmg.trueDmg += source.attribute[attr].value*dmgs.trueDmg[attr];
                    }
                }
            }
            return dmg;
        },
        getSpellHeal(spell, source, target, dmgs) {
            let index = this.$store.globalComponent["index"];
            let spellLv = source.spells == undefined ? 0 : source.spells[spell].lv-1;
            let heals = this.spell[spell].level[spellLv];
            if(!heals.heal)
                return 0;
            let heal = heals.heal['FIX'] == undefined ? 0 : heals.heal['FIX'];
            for(let attr in heals.heal) {
                if(source.attribute[attr] != undefined)
                    heal += source.attribute[attr].value*heals.heal[attr];
            }
            heal = this.applySpellHealBonus(spell, source, heal);
            heal = Math.round(heal);
            index.set_heal(dmgs, heal);
            // 护盾戒律
            let talent = 'spell_holy_divineprotection';
            if(source.talent[talent] > 0 && index.get_dmg(dmgs, 'heal') > 0 && target.attribute.CURHP.value<(target.attribute.MAXHP.value*(0.05+0.15*source.talent[talent]))) {
                index.statBuffApply(source, source, 'AP', source.attribute.AP.value*0.05, 10, 'spell_holy_divineprotection_ap');
                index.statBuffApply(source, source, 'HEAL', source.attribute.HEAL.value*0.05, 10, 'spell_holy_divineprotection_heal');
            }
        },
        applySpellHealBonus(spell, source, heal) {
            if(heal <= 0)
                return heal;
            let mod = this.healBonusMod[spell] == undefined ? 1 : this.healBonusMod[spell];
            let healBonus = source.attribute['HEAL'].value;
            heal += healBonus*mod;
            let talent = 'ability_pvp_innerrenewal';
            if(source.talent[talent] > 0) {
                heal *= (1+source.talent[talent]*0.01);
            }
            return heal;
        },
        applyDmg(source, target, spell, oldDmg) {
            let dmgs = this.$deepCopy(oldDmg);
            let index = this.$store.globalComponent["index"];
            let spellInfo = this.spell[spell];
            
            if(target.buff['manaShield'] != undefined) {
                this.manaShield(source, target, dmgs);
            }
            // 物理
            this.applyAdReducedDmg(source, target, dmgs);
            this.applyCrit(source, dmgs, spell);
            this.applyBlock(source, target, dmgs, spell);
            // 魔法
            this.applyApReducedDmg(source, target, dmgs);
            this.applyApCrit(source, target, dmgs, spell);
            // 最终伤害
            this.applyBonusFinalDmg(source, target, spell, dmgs);
            let talent = 'ability_warrior_punishingblow';
            if(source.lv > target.lv && source.talent[talent] > 0) {
                index.set_ad_dmg(dmgs, index.get_dmg(dmgs, 'ad')+source.talent[talent]*10);
            }
            talent = 'ability_defend';
            if(target.talent[talent] > 0) {
                index.set_ad_dmg(dmgs, index.get_dmg(dmgs, 'ad')-target.talent[talent]*5);
            }
            index.triggerOnHit(source, target);
            talent = 'ability_revendreth_druid';
            if(source.talent[talent] > 0) {
                let heal = source.talent[talent]*0.004*(index.get_dmg(dmgs, 'ad')+index.get_dmg(dmgs, 'ap'));
                heal = Math.round(heal);
                index.hpChange(source, source, {heal: heal});
            }
            for(let i in dmgs) {
                dmgs[i] = Math.round(dmgs[i]);
            }
            talent = 'magic_immune';
            if(target.talent[talent] > 0)
                index.set_ap_dmg(dmgs, 0);
            talent = 'mine';
            if(target.talent[talent] > 0) {
                index.set_ad_dmg(dmgs, 1);
            }
            index.lifesteal(source, dmgs);
            index.manasteal(source, dmgs);
            index.hpChange(source, target, dmgs, spellInfo.name);
        },
        applyBonusFinalDmg(source, target, spell, dmgs) {
            let index = this.$store.globalComponent["index"];
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
            if(target.buff['spell_holy_powerwordbarrier'] != undefined)
                bonus -= 0.25;
            if(target.buff['spell_nature_skinofearth'] != undefined)
                bonus -= 0.10;
            if(source.attribute.VERSBONUS != undefined)
                bonus += source.attribute.VERSBONUS.value/100;
            // 全能减伤上限60%
            if(target.attribute.VERSBONUS != undefined) {
                if(target.attribute.VERSBONUS.value < 60)
                    bonus -= target.attribute.VERSBONUS.value/100;
                else
                    bonus -= 0.6;
            }
            for(let i in dmgs) {
                dmgs[i] = dmgs[i]*bonus;
            }
            
            index.set_ad_dmg(dmgs, index.get_dmg(dmgs, 'ad')*bonus);
            index.set_ap_dmg(dmgs, index.get_dmg(dmgs, 'ap')*bonus);
        },
        applyAdReducedDmg(source, target, dmgs) {
            let index = this.$store.globalComponent["index"];
            if(index.get_dmg(dmgs, 'ad') == 0)
                return 0;
            let dmg = index.get_dmg(dmgs, 'ad');
            dmg = index.charge(source, dmg);
            dmg = index.block(target, dmg);
            let penDmg = index.penetrate(source, dmg);
            let armor = index.sunder(source, target.attribute.DEF.value);
            let defRed = this.getDefRed(armor);
            dmg -= penDmg;
            dmg = dmg*(1-defRed/100)+penDmg;
            index.set_ad_dmg(dmgs, dmg);
        },
        applyApReducedDmg(source, target, dmgs) {
            let index = this.$store.globalComponent["index"];
            if(index.get_dmg(dmgs, 'ap') == 0)
                return;
            // 伤害减少 0%, 25%, 50%, 75%, 100%
            let reduce = [0, 0, 0, 0, 0];
            let mr = target.attribute.MR.value;
            if(source.attribute.APPEN)
                mr -= source.attribute.APPEN.value;
            let total = 0;
            let random = Math.random()*100;
            reduce[4] = mr/(mr+1000);
            reduce[3] = mr/(mr+200)*(100-reduce[4]);
            reduce[2] = mr/(mr+100)*(100-reduce[4]-reduce[3]);
            reduce[1] = mr/(mr+25)*(100-reduce[4]-reduce[3]-reduce[2]);
            for(let i=4; i>0; i--) {
                total += reduce[i];
                if(random < total) {
                    index.set_ap_dmg(dmgs, index.get_dmg(dmgs, 'ap')*(1-i*0.25));
                    return;
                }
            }
        },
        applyCrit(source, dmgs, spell) {
            let index = this.$store.globalComponent["index"];
            let crit = Math.round(Math.random()*100);
            if(spell == 'MUST_CRIT')
                crit = -1;
            if(crit < source.attribute.CRIT.value) {
                index.set_ad_dmg(dmgs, index.get_dmg(dmgs, 'ad')*source.attribute.CRITDMG.value/100);
                if(source.type == 'player') {
                    let talent = 'spell_shadow_summonimp';
                    if(source.talent[talent] > 0) {
                        let heal = source.talent[talent]*0.025*source.attribute.MAXHP.value;
                        heal = Math.round(heal);
                        index.hpChange(source, source, {heal: heal});
                    }
                }
            }
        },
        applyApCrit(source, target, dmgs, spell) {
            let index = this.$store.globalComponent["index"];
            let crit = Math.round(Math.random()*100);
            let talent = 'spell_fire_fire';
            // 纵火者
            if((spell == 'spell_fire_flamebolt' || spell == 'spell_fire_fireball02') && source.talent[talent] > 0 && target.attribute.CURHP.value >= target.attribute.MAXHP.value*0.8)
                crit = -1;
            if(crit < source.attribute.APCRIT.value) {
                index.set_ap_dmg(dmgs, index.get_dmg(dmgs, 'ap')*source.attribute.APCRITDMG.value/100);
            }
        },
        applyBlock(source, target, dmgs, spell) {
            if(dmgs.adDmg == undefined)
                return;
            let index = this.$store.globalComponent["index"];
            let attr = target.attribute;
            let value = attr['BLOCK'].value;
            index.set_ad_dmg(dmgs, index.get_dmg(dmgs, 'ad')-value);
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
        getStatBuff(source, spellName) {
            let spellLv = source.spells == undefined ? 0 : source.spells[spellName].lv-1;
            let statBuff = this.spell[spellName].level[spellLv].statBuff;
            let statBuffList = [];
            for(let buff in statBuff) {
                statBuffList.push(statBuff[buff]);
            }
            return statBuffList;
        },
        applyEffect(source, target, effectList) {
            let index = this.$store.globalComponent["index"];
            for(let eff in effectList) {
                if(Math.random()*100 < effectList[eff].chance) {
                    if(effectList[eff].target == 'self')
                        index.buffApply(source, source, eff, effectList[eff].stack);
                    else
                        index.buffApply(source, target, eff, effectList[eff].stack);
                }
            }
        },
        applyStatBuff(source, target, statBuffList) {
            let index = this.$store.globalComponent["index"];
            for(let i in statBuffList) {
                if(Math.random()*100 < statBuffList[i].chance) {
                    let value = statBuffList[i].valType == 'FIX' ? statBuffList[i].value : source.attribute[statBuffList[i].valType].value*statBuffList[i].value;
                    if(statBuffList[i].valSource != undefined)
                        value = statBuffList[i].valType == 'FIX' ? statBuffList[i].value : target.attribute[statBuffList[i].valType].value*statBuffList[i].value;

                    if(statBuffList[i].target == 'self')
                        index.statBuffApply(source, source, statBuffList[i].type, value, statBuffList[i].stack, statBuffList[i].buffGroup);
                    else
                        index.statBuffApply(source, target, statBuffList[i].type, value, statBuffList[i].stack, statBuffList[i].buffGroup);
                }
            }
        },
        // 普通攻击
        attack(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let dmgs = this.getSpellDmg(spell, source, target);
            let effectList = this.getSpellEffect(source, spell);
            // 强化攻击
            let talent = 'classicon_warrior';
            if(source.talent[talent] > 0) {
                let talentLv = source.talent[talent];
                index.set_ad_dmg(dmgs, source.attribute['ATK'].value*(1+talentLv*0.05));
            }
            // 重击
            talent = 'ability_warrior_decisivestrike';
            if(source.talent[talent] > 0) {
                let chance = source.talent[talent]*1;
                effectList['stun'] = {stack: 1, chance: chance, target: 'enemy'};
            }
            this.applyDmg(source, target, spell, dmgs);
            this.applyEffect(source, target, effectList);
        },
        // 雷霆一击
        spell_nature_thunderclap(source, target, spell) {
            let dmg = this.getSpellDmg(spell, source, target);
            let effectList = this.getSpellEffect(source, spell);
            // 风暴之锤
            let talent = 'warrior_talent_icon_stormbolt';
            if(source.talent[talent] > 0) {
                let chance = source.talent[talent]*10;
                effectList['stun'] = {stack: 1, chance: chance, target: 'enemy'};
            }
            // 无坚不摧之力
            talent = 'warrior_talent_icon_thunderstruck';
            if(source.talent[talent] > 0) {
                dmg.adDmg = dmg.adDmg*1.3;
                this.setSpellProgress(source, source, 'add', spell, 3);
            }
            // 十字军之力
            talent = 'ability_paladin_swiftretribution';
            if(source.talent[talent] > 0) {
                let stack = source.talent[talent]*1;
                this.setSpellProgress(source, source, 'add', 'spell_holy_crusaderstrike', stack);
            }
            
            this.applyDmg(source, target, spell, dmg);
            this.applyEffect(source, target, effectList);
        },
        // 屠杀
        inv_sword_48(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let dmg = this.getSpellDmg(spell, source, target);
            let hp_percent = target.attribute.CURHP.value/target.attribute.MAXHP.value*100;
            // 处刑
            let talent = 'ability_deathknight_deathchain';
            if(target.type != 'BOSS' && source.talent[talent] > 0 && hp_percent < source.talent[talent]*5) {
                index.set_enemy_hp('dead', source, target);
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
            let dmg = this.getSpellDmg(spell, source, target);
            let effectList = this.getSpellEffect(source, spell);
            // 盾牌猛击
            let talent = 'inv_shield_05';
            if(source.talent[talent] > 0) {
                let chance = source.talent[talent]*10;
                effectList['stun'] = {stack: 1, chance: chance, target: 'enemy'};
            }
            // 惩罚
            talent = 'ability_deathknight_sanguinfortitude';
            if(source.talent[talent] > 0) {
                dmg.adDmg = dmg.adDmg*(1+0.5*source.talent[talent]);
                let stack = source.talent[talent]*1;
                effectList['weak'] = {stack: stack, chance: 100, target: 'enemy'};
            }
            
            this.applyDmg(source, target, spell, dmg);
            this.applyEffect(source, target, effectList);
        },
        // 剑刃风暴
        ability_whirlwind(source, target, spell, count=8) {
            let index = this.$store.globalComponent["index"];
            if(count>0) {
                setTimeout(() => {
                    this.ability_whirlwind(source, target, spell, count-1);
                }, 100);
            }
            let buffList = Object.assign(source.buff, source.timedBuff);
            for(let buff in buffList) {
                if(this.buffType.statusDebuff[buff] != undefined)
                    index.buffRemoved(source, source, buff);
            }
            let dmg = this.getSpellDmg(spell, source, target);            
            this.applyDmg(source, target, spell, dmg);
        },
        // 天神下凡
        ability_racial_avatar(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            index.buffApply(player, player, 'avatar', 60);
            let buffList = Object.assign(source.buff, source.timedBuff);
            for(let buff in buffList) {
                if(this.buffType.statusDebuff[buff] != undefined || this.buffType.debuff[buff] != undefined)
                    index.buffRemoved(source, source, buff);
            }
            this.$store.commit("set_battle_info", {
                type: 'dmg',
                msg: '使用【天神下凡】'
            })
        },
        // 勾魂
        spell_warlock_soulburn(source, target, spell) {
            let dmg = this.getSpellDmg(spell, source, target);
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
            let dmg = this.getSpellDmg(spell, source, target);
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
        // 造餐术
        inv_misc_food_73cinnamonroll(source, target, spell) {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let item = itemInfo.createItem('inv_misc_food_73cinnamonroll', 3);  
            itemInfo.addItem(JSON.parse(item));
        },
        // 制造法力宝石
        inv_misc_gem_sapphire_02(source, target, spell) {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let item = itemInfo.createItem('inv_misc_gem_sapphire_02', 3);  
            itemInfo.addItem(JSON.parse(item));
        },
        // 暴风雪
        spell_frost_icestorm(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let count = 0;
            this.spell_frost_icestorm_dmg(source, target, spell);
            let timer = setInterval(() => {
                this.spell_frost_icestorm_dmg(source, target, spell);
                if(++count >= 7)
                    index.removeFromTimerList(target.type, timer);
            }, 1000);
            index.addToTimerList(target.type, timer);
        },
        spell_frost_icestorm_dmg(source, target, spell) {
            let dmg = this.getSpellDmg(spell, source, target);
            let effectList = this.getSpellEffect(source, spell);

            this.applyDmg(source, target, spell, dmg);
            this.applyEffect(source, target, effectList);
        },
        // 冰风暴
        ability_warlock_burningembersblue(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let count = 0;
            this.ability_warlock_burningembersblue_dmg(source, target, spell);
            let timer = setInterval(() => {
                this.ability_warlock_burningembersblue_dmg(source, target, spell);
                if(++count >= 14)
                    index.removeFromTimerList(target.type, timer);
            }, 333);
            index.addToTimerList(target.type, timer);
        },
        ability_warlock_burningembersblue_dmg(source, target, spell) {
            let dmg = this.getSpellDmg(spell, source, target);
            let effectList = this.getSpellEffect(source, spell);
            
            this.applyDmg(source, target, spell, dmg);
            this.applyEffect(source, target, effectList);
        },
        // 寒冰护体
        spell_ice_lament(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let spellLv = source.spells[spell].lv-1;
            let shield = {};
            shield.val = source.attribute.AP.value*0.6*(1+source.attribute.VERS.value*0.01);
            shield.time = this.spell[spell].level[spellLv].duration.time;
            index.shield(source, target, shield, spell);
        },
        // 法力护盾
        spell_shadow_detectlesserinvisibility(source, target, spell) {
            let effectList = {};
            effectList['manaShield'] = {stack: 10, chance: 100, target: 'self'};
            this.applyEffect(source, target, effectList);
        },
        manaShield(source, target, dmgs) {
            let index = this.$store.globalComponent["index"];
            let curMana = target.attribute.CURMP.value;
            let manaCost = 0;
            let denyMultiplier = 2;
            let min = Math.min(index.get_dmg(dmgs, 'ad')/denyMultiplier, curMana);
            index.set_ad_dmg(dmgs, index.get_dmg(dmgs, 'ad')-min*denyMultiplier);
            manaCost -= min;
            curMana -= min;

            min = Math.min(index.get_dmg(dmgs, 'ap')/denyMultiplier, curMana);
            index.set_ap_dmg(dmgs, index.get_dmg(dmgs, 'ap')-min*denyMultiplier);
            manaCost -= min;

            index.mpChange(target, target, manaCost);
        },
        // 奥术弹幕
        ability_mage_arcanebarrage(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let count = Math.floor(Math.random()*5)+1;
            let arcCharge = source.buff['arcCharge'] || 0;
            // 三之准则
            let talent = 'spell_arcane_invocation';
            if(source.talent[talent] > 0 && arcCharge >= 3) {
                let manaRec = source.attribute['MAXMP'].value*(0.03+0.03*source.talent[talent]);
                index.mpChange(source, source, manaRec);
            }
            index.buffReduce(source, source, 'arcCharge', arcCharge);
            let timer = setInterval(() => {
                this.arcaneGeneralSpell(source, target, spell, arcCharge);
                if(--count <= 0)
                    index.removeFromTimerList(target.type, timer);
            }, 100);
            index.addToTimerList(target.type, timer);
        },
        // 奥术冲击
        spell_arcane_blast(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let spellLv = source.spells[spell].lv-1;
            let arcCharge = source.buff['arcCharge'] || 0;
            // 三之准则
            let talent = 'spell_arcane_invocation';
            if(source.talent[talent] > 0 && arcCharge >= 3) {
                let manaRec = source.attribute['MAXMP'].value*(0.03+0.03*source.talent[talent]);
                index.mpChange(source, source, manaRec);
            }
            arcCharge = Math.min(arcCharge, Math.floor(source.attribute['CURMP'].value / this.spell[spell].level[spellLv].cost['MP']));
            index.buffReduce(source, source, 'arcCharge', arcCharge);
            this.setSpellProgress(source, source, 'add', 'spell_arcane_blast', arcCharge*3);
            this.arcaneGeneralSpell(source, target, spell, arcCharge);
        },
        // 奥术飞弹
        spell_nature_starfall(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let arcCharge = source.buff['arcCharge'] || 0;
            let count = 5+arcCharge;
            // 三之准则
            let talent = 'spell_arcane_invocation';
            if(source.talent[talent] > 0 && arcCharge >= 3) {
                let manaRec = source.attribute['MAXMP'].value*(0.03+0.03*source.talent[talent]);
                index.mpChange(source, source, manaRec);
            }
            index.buffReduce(source, source, 'arcCharge', arcCharge);
            let timer = setInterval(() => {
                this.arcaneGeneralSpell(source, target, spell, arcCharge);
                if(--count <= 0)
                    index.removeFromTimerList(target.type, timer);
            }, 100);
            index.addToTimerList(target.type, timer);
        },
        arcaneGeneralSpell(source, target, spell, arcCharge) {
            let index = this.$store.globalComponent["index"];
            let dmg = this.getSpellDmg(spell, source, target);
            let effectList = this.getSpellEffect(source, spell);
            switch(spell) {
                case 'ability_mage_arcanebarrage':
                    index.set_ap_dmg(dmg, index.get_dmg(dmg, 'ap')*(1+arcCharge*0.25));
                    break;
                case 'spell_arcane_blast':
                    index.set_ap_dmg(dmg, index.get_dmg(dmg, 'ap')*(1+arcCharge*0.6));
                    break;
            }

            this.applyDmg(source, target, spell, dmg);
            this.applyEffect(source, target, effectList);
        },
        // 急速冷却
        spell_frost_wizardmark(source, target, spell) {
            this.setSpellProgress(source, target, 'full', 'spell_frost_icestorm', 0);
            this.setSpellProgress(source, target, 'full', 'ability_warlock_burningembersblue', 0);
            this.setSpellProgress(source, target, 'full', 'spell_ice_lament', 0);
            this.setSpellProgress(source, target, 'full', 'spell_frost_coldhearted', 0);
        },
        // 唤醒
        spell_nature_purge(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let spellLv = source.spells[spell].lv-1;
            let manaRec = source.attribute['SPI'].value*(20+10*spellLv);
            index.mpChange(source, target, manaRec);
        },
        // 时间扭曲
        ability_mage_timewarp(source, target, spell) {
            this.setSpellProgress(source, target, 'full', 'all', 0);
            source.spells[spell].progress = 0;
        },
        // 恢复
        spell_holy_renew(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let count = 15;
            // 福音
            let talent = 'spell_holy_divineillumination';
            if(source.talent[talent] > 0) {
                count += (2*source.talent[talent]);
            }
            let dmgs = this.getSpellDmg(spell, source, target);
            this.getSpellHeal(spell, source, target, dmgs);
            let timer = setInterval(() => {
                this.applyDmg(source, target, spell, dmgs);
                if(--count <= 0)
                    index.removeFromTimerList(target.type, timer);
            }, 1000);
            index.addToTimerList(target.type, timer);
        },
        // 绝望祷言
        spell_holy_testoffaith(source, target, spell) {
            let dmgs = this.getSpellDmg(spell, source, target);
            this.getSpellHeal(spell, source, target, dmgs);
            let statBuffList = this.getStatBuff(source, spell);
            
            this.applyStatBuff(source, target, statBuffList);
            this.applyDmg(source, target, spell, dmgs);
        },
        // 心灵震爆
        spell_shadow_unholyfrenzy(source, target, spell) {
            let dmgs = this.getSpellDmg(spell, source, target);
            this.getSpellHeal(spell, source, target, dmgs);
            let effectList = this.getSpellEffect(source, spell);
            let statBuffList = this.getStatBuff(source, spell);
            // 精神灼伤
            let talent = 'spell_shadow_mindshear';
            if(source.talent[talent] > 0) {
                let chance = source.talent[talent]*10+10;
                effectList['weak'] = {stack: 1, chance: chance, target: 'enemy'};
            }
            
            this.applyDmg(source, target, spell, dmgs);
            this.applyEffect(source, target, effectList);
            this.applyStatBuff(source, target, statBuffList);
        },
        // 真言术：盾
        spell_holy_powerwordshield(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let spellLv = source.spells[spell].lv-1;
            let shield = {};
            shield.val = source.attribute.MAXHP.value*0.1*(1+source.attribute.VERS.value*0.01);
            shield.time = this.spell[spell].level[spellLv].duration.time;
            index.shield(source, target, shield, spell);
        },
        // 暗言术：痛
        spell_shadow_shadowwordpain(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let dmgs = this.getSpellDmg(spell, source, target);
            this.applyDmg(source, target, spell, dmgs);

            let count = 12;
            let dotDmg = {apDmg: source.attribute.AP.value*(0.08+source.spells[spell].lv*0.02)};
            let timer = setInterval(() => {
                this.applyDmg(source, target, spell, dotDmg);
                if(--count <= 0)
                    index.removeFromTimerList(target.type, timer);
            }, 1000);
            index.addToTimerList(target.type, timer);
        },
        // 暗影愈合
        spell_shadow_shadowmend(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let dmgs = this.getSpellDmg(spell, source, target);
            this.getSpellHeal(spell, source, target, dmgs);
            let timer;
            // 忍辱负重
            let talent = 'spell_shadow_misery';
            if(source.talent[talent] > 0) {
                index.set_ap_dmg(dmgs, dmgs.heal);
                delete dmgs.heal;
                let dotHeal = {heal: source.attribute.AP.value*0.16};
                timer = setInterval(() => {
                    this.applyDmg(source, target, spell, dotHeal);
                }, 1000);
                this.applyDmg(source, source, spell, dmgs);
            } else {
                dmgs.enemyHeal = dmgs.heal;
                delete dmgs.heal;
                let dotDmg = {apDmg: source.attribute.AP.value*0.16};
                timer = setInterval(() => {
                    this.applyDmg(source, target, spell, dotDmg);
                }, 1000);
                this.applyDmg(source, target, spell, dmgs);
            }
            index.addToTimerList(target.type, timer);
        },
        // 纯净术
        spell_holy_dispelmagic(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            for(let buff in target.buff) {
                if(index.buffType.statusBuff[buff] != undefined) {
                    index.buffRemoved(source, target, buff);
                }
            }
            // 驱散
            let talent = 'spell_arcane_massdispel';
            if(source.talent[talent] > 0) {
                let enemyBuff = target.tempStat;
                for(let i=enemyBuff.length-1; i>=0; i--)
                    index.statBuffRemove(source, target, enemyBuff[i].type, enemyBuff[i].value, i);
            }
        },
        // 暗言术·灭
        spell_shadow_demonicfortitude(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let dmgs = this.getSpellDmg(spell, source, target);

            if(target.attribute.CURHP.value < target.attribute.MAXHP.value*0.5)
                index.set_ap_dmg(dmgs, index.get_dmg(dmgs, 'ap')*2.5);

            this.applyDmg(source, target, spell, dmgs);
            if(target.attribute.CURHP.value > 0) {
                this.applyDmg(source, source, spell, dmgs);
            }
        },
        // 真言术：慰
        ability_priest_flashoflight(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let dmgs = this.getSpellDmg(spell, source, target);
            let manaRec = source.attribute['MAXMP'].value*(0.05*source.spells[spell].lv);

            index.mpChange(source, source, manaRec);
            this.applyDmg(source, target, spell, dmgs);
        },
        // 魔法夺取
        spell_nature_nullifydisease(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            for(let i=0; i<source.spells[spell].lv+1; i++) {
                let buffList = [];
                for(let buff in target.buff) {
                    if(index.buffType.statusBuff[buff] != undefined) {
                        buffList.push(buff);
                    }
                }
                if(buffList.length > 0) {
                    let ran = Math.floor(Math.random()*buffList.length);
                    index.buffReduce(source, target, buffList[ran], 1);
                    index.buffApply(source, source, buffList[ran], 1);
                }
            }
        },
        // 河爪烙印
        spell_frost_frostward(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let dmg = this.getSpellDmg(spell, source, target);
            let count = 0;
            let timer = setInterval(() => {
                this.applyDmg(source, target, spell, dmg);
                if(++count >= 4)
                    index.removeFromTimerList(target.type, timer);
            }, 1000);
            index.addToTimerList(target.type, timer);
        },
        // 痛击
        ability_ghoulfrenzy(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let count = Math.floor(Math.random()*4)+1;
            let timer = setInterval(() => {
                let dmg = this.getSpellDmg(spell, source, target);
                index.set_ad_dmg(dmg, index.get_dmg(dmg, 'ad')*(0.5+Math.random()*0.5))
                this.applyDmg(source, target, spell, dmg);
                if(--count <= 0)
                    index.removeFromTimerList(target.type, timer);
            }, 100);
            index.addToTimerList(target.type, timer);
        },
        // 恢复（霍格）
        inv_misc_food_meat_raw_04(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let count = 4;
            let dmgs = this.getSpellDmg(spell, source, target);
            this.getSpellHeal(spell, source, target, dmgs);
            let timer = setInterval(() => {
                this.applyDmg(source, target, spell, dmgs);
                if(--count <= 0)
                    index.removeFromTimerList(target.type, timer);
            }, 3000);
            index.addToTimerList(target.type, timer);
        },
        // 防护之壳(盐壳龟)
        ability_vehicle_shellshieldgenerator(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let shield = {};
            shield.val = source.attribute.DEF.value*0.1;
            shield.time = this.spell[spell].level[1].duration.time;
            index.shield(source, target, shield, spell);
        },
        // 熔岩之弧（火元素）
        spell_fire_flameblades(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let count = 3;
            let dmgs = this.getSpellDmg(spell, source, target);
            let effectList = this.getSpellEffect(source, spell);

            this.applyDmg(source, target, spell, dmgs);
            this.applyEffect(source, target, effectList);

            let timer = setInterval(() => {
                this.applyDmg(source, target, spell, 200);
                if(--count <= 0)
                    index.removeFromTimerList(target.type, timer);
            }, 2000);
            index.addToTimerList(target.type, timer);
        },
        // 石肤(石元素)
        inv_spiritshard_01(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let effectList = this.getSpellEffect(source, spell);
            this.applyEffect(source, target, effectList);
            let shield = {};
            shield.val = source.attribute.MAXHP.value*0.3;
            shield.time = this.spell[spell].level[1].duration.time;
            index.shield(source, target, shield, spell);
        },
        // 火焰护盾(熔岩元素)
        spell_fire_immolation(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let effectList = this.getSpellEffect(source, spell);
            this.applyEffect(source, target, effectList);
            let shield = {};
            shield.val = source.attribute.MAXHP.value*0.3;
            shield.time = this.spell[spell].level[1].duration.time;
            index.shield(source, target, shield, spell);
        },
        // 碎裂心智(熔岩元素)
        sha_spell_fire_bluehellfire_nightmare(source, target, spell) {
            let index = this.$store.globalComponent["index"];
            let dmgs = this.getSpellDmg(spell, source, target);
            let effectList = this.getSpellEffect(source, spell);
            let stack = target.buff['sha_spell_fire_bluehellfire_nightmare'] ? target.buff['sha_spell_fire_bluehellfire_nightmare'] : 0;

            index.set_ap_dmg(dmgs, index.get_dmg(dmgs, 'ap')*(1+stack*0.05));
            this.applyDmg(source, target, spell, dmgs);
            this.applyEffect(source, target, effectList);
        },
    }
}