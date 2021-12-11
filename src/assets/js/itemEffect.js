export const itemEffect = {
    data() {
        return {
            allSpell: ['spell_nature_thunderclap', 'spell_nature_thunderclap2', 'spell_nature_thunderclap3', 'spell_nature_thunderclap4', 
                'spell_fire_flamebolt', 'spell_fire_flamebolt2', 'spell_fire_flamebolt3', 'spell_fire_flamebolt4', 
                'ability_warrior_shieldbash', 'ability_warrior_shieldbash2', 'ability_warrior_shieldbash3', 'ability_warrior_shieldbash4', 
                'ability_druid_maul', 'ability_druid_maul2', 'ability_druid_maul3', 'ability_druid_maul4', 
                'spell_shadow_ritualofsacrifice', 'spell_shadow_ritualofsacrifice2', 'spell_shadow_ritualofsacrifice3', 
                'spell_holy_renew', 'spell_holy_renew2',
                'spell_warlock_soulburn', 'spell_warlock_soulburn2',
                'ability_warrior_shatteringthrow',

                'spell_holy_holybolt', 'spell_holy_holybolt2', 'spell_holy_holybolt3', 'spell_holy_holybolt4', 
                'spell_nature_lightning', 'spell_nature_lightning2', 'spell_nature_lightning3', 
                'spell_nature_starfall', 'spell_nature_starfall2', 'spell_nature_starfall3', 
                'spell_holy_powerwordshield', 'spell_holy_powerwordshield2', 
                'spell_animabastion_buff',
                'spell_animaardenweald_orb',

                'spell_shadow_curseofmannoroth', 'spell_shadow_curseofmannoroth2', 'spell_shadow_curseofmannoroth3',  'spell_shadow_curseofmannoroth4', 
                'spell_animaardenweald_groundstate', 'spell_animaardenweald_groundstate2', 'spell_animaardenweald_groundstate3',
                'spell_holy_powerwordshield', 'spell_holy_powerwordshield2', 'spell_holy_powerwordshield3',
                'spell_arcane_starfire', 'spell_arcane_starfire2', 
                'spell_holy_crusaderstrike', 'spell_holy_crusaderstrike2', 
                'spell_nature_wispsplode',

                'ability_rogue_shadowstrike', 'ability_rogue_shadowstrike2', 'ability_rogue_shadowstrike3', 'ability_rogue_shadowstrike4',
                'spell_holy_innerfire', 'spell_holy_innerfire2',
                'spell_holy_layonhands', 'spell_holy_layonhands2',
                'spell_shadow_deathscream', 'spell_shadow_deathscream2', 'spell_shadow_deathscream2',

                'ability_druid_starfall', 'ability_druid_starfall2', 'ability_druid_starfall3', 'ability_druid_starfall4', 'ability_druid_starfall5',
                'warrior_talent_icon_innerrage', 'warrior_talent_icon_innerrage2', 'warrior_talent_icon_innerrage3',

                'ability_revendreth_paladin', 'ability_revendreth_paladin2', 'ability_revendreth_paladin3', 'ability_revendreth_paladin4', 'ability_revendreth_paladin5',
                'ability_ardenweald_paladin_summer',
            ]
        }
    },
    methods: {
        callItemEffect(type, lv) {
            let used = false;
            switch(type) {
                case 'inv_misc_book_09':
                    used = this.randomSpell(lv, 1);
                    break;
                case 'inv_misc_book_08':
                    used = this.randomSpell(lv, 2);
                    break;
                case 'inv_misc_book_07':
                    used = this.randomSpell(lv, 3);
                    break;
                case 'bTNMGExchange':
                    used = this.randomGold(666, lv);
                    break;
                case 'inv_misc_coin_01':
                    used = this.randomGold(6666, lv);
                    break;
                case 'inv_misc_coin_01':
                    used = this.randomGold(66666, lv);
                    break;
                case 'inv_misc_note_06':
                    used = this.inv_misc_note_06();
                    break;
                case 'random_equip_0':
                    used = this.randomEquip(0, lv);
                    break;
                case 'random_equip_1':
                    used = this.randomEquip(1, lv);
                    break;
                case 'random_equip_2':
                    used = this.randomEquip(2, lv);
                    break;
                case 'random_equip_3':
                    used = this.randomEquip(3, lv);
                    break;
                case 'random_equip_4':
                    used = this.randomEquip(4, lv);
                    break;
                case 'random_equip_5':
                    used = this.randomEquip(5, lv);
                    break;
                case 'random_equip_6':
                    used = this.randomEquip(6, lv);
                    break;
                case 'random_equip_7':
                    used = this.randomEquip(7, lv);
                    break;
                case 'random_equip_8':
                    used = this.randomEquip(8, lv);
                    break;
                case 'random_equip_9':
                    used = this.randomEquip(9, lv);
                    break;
                // case 'inv_box_01':
                //     used = this.inv_box_01();
                //     break;
                // case 'inv_box_02':
                //     used = this.inv_box_02();
                //     break;
                // case 'inv_box_03':
                //     used = this.inv_box_03();
                //     break;
                case 'bossTicket0':
                    used = this.bossTicket(5);
                    break;
                case 'bossTicket1':
                    used = this.bossTicket(15);
                    break;
                case 'bossTicket2':
                    used = this.bossTicket(25);
                    break;
                case 'bossTicket3':
                    used = this.bossTicket(35);
                    break;
                case 'bossTicket4':
                    used = this.bossTicket(45);
                    break;
                case 'bossTicket5':
                    used = this.bossTicket(55);
                    break;
                case 'bossTicket6':
                    used = this.bossTicket(65);
                    break;
                case 'bossTicket7':
                    used = this.bossTicket(75);
                    break;
                case 'bossTicket8':
                    used = this.bossTicket(85);
                    break;
                case 'bossTicket9':
                    used = this.bossTicket(95);
                    break;
                case 'bossTicket10':
                    used = this.bossTicket(105);
                    break;
                case 'inv_potion_27':
                    used = this.inv_potion_27();
                    break;
            }
            return used;
        },
        //招募声明
        inv_misc_note_06() {
            let guildMember = this.findBrothersComponents(this, 'guildMember', false)[0];
            guildMember.generateApplicant();
            return true;
        },
        randomSpell(lv, rank) {
            let itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            let spell = this.getSpellList(lv, rank);
            let spellType = spell[Math.floor(Math.random()*spell.length)];
            let quantity = 1;
            item = itemInfo.createItem(spellType, quantity);  
            item = JSON.parse(item);
            this.$store.commit("set_sys_info", {
                type: 'reward',
                msg: '打开宝箱获得',
                item: item,
                quantity: quantity
            });
            itemInfo.addItem(item);
            return true;
        },
        randomGold(max, lv) {
            let guild = this.findBrothersComponents(this, 'guild', false)[0];
            let gold = Math.round(max*Math.random()*(1+lv*0.1))
            guild.getGold('', gold);
            return true;
        },
        randomEquip(qualitySet, lv) {
            let backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            let equipInfo = this.findBrothersComponents(this, 'equipInfo', false)[0];
            let itemLv = lv || this.$store.state.playerAttribute.lv;
            let equip = equipInfo.createEquip(-1, itemLv, 'random', qualitySet);  
            equip = JSON.parse(equip);
            this.$store.commit("set_sys_info", {
                type: 'reward',
                msg: '获得战利品',
                equip: equip
            });
            backpack.giveEquip(equip);
            return true;
        },
        bossTicket(monsterID) {
            let index = this.findComponentUpward(this, 'index');
            index.addToMap('boss', (monsterID+5)*2, 1, monsterID);
            return true;
        },
        inv_potion_27() {
            let player = this.$store.state.playerAttribute;
            let index = this.findComponentUpward(this, 'index');
            index.buffApply(player, player, 'minionSlayer', 600);
            return true;
        },
        getSpellList(lv, rank) {
            let spellList = [];
            let temp = [];
            switch(rank) {
                case 1:
                    if(lv > 10) {
                        temp = ['spell_nature_thunderclap', 'spell_nature_thunderclap2', 'spell_fire_flamebolt', 'ability_warrior_shieldbash', 'spell_holy_holybolt', 
                            'spell_nature_lightning'];
                        spellList = spellList.concat(temp);
                    }
                    if(lv > 50) {
                        temp = ['spell_nature_thunderclap3', 'spell_fire_flamebolt2', 'ability_warrior_shieldbash2', 
                            'ability_druid_maul', 'spell_shadow_ritualofsacrifice', 'spell_holy_renew', 'spell_holy_holybolt2', 'spell_holy_holybolt3',
                            'spell_nature_lightning2', 'spell_nature_starfall'];
                        spellList = spellList.concat(temp);
                    }
                    if(lv > 75) {
                        temp = ['spell_nature_thunderclap4', 'spell_fire_flamebolt3', 'ability_warrior_shieldbash3', 'ability_druid_maul2', 
                            'spell_shadow_ritualofsacrifice2', 'spell_holy_renew2', 'spell_warlock_soulburn', 'ability_warrior_shatteringthrow',
                            'spell_holy_holybolt4', 'spell_nature_lightning3', 'spell_nature_starfall2', 'spell_holy_powerwordshield'];
                        spellList = spellList.concat(temp);
                    }
                    if(lv > 100) {
                        temp = ['spell_fire_flamebolt4', 'ability_warrior_shieldbash4', 'ability_druid_maul3', 'spell_shadow_ritualofsacrifice3', 
                            'spell_holy_renew3', 'spell_warlock_soulburn2', 'ability_warrior_shatteringthrow2', 'spell_nature_starfall3',
                            'spell_holy_powerwordshield2', 'spell_animabastion_buff', 'spell_animaardenweald_orb'];
                        spellList = spellList.concat(temp);
                    }
                    if(lv > 125) {
                        temp = ['ability_druid_maul4'];
                        spellList = spellList.concat(temp);
                    }
                    break;
                case 2:
                    if(lv > 10) {
                        temp = ['spell_shadow_curseofmannoroth', 'ability_rogue_shadowstrike', ];
                        spellList = spellList.concat(temp);
                    } 
                    if(lv > 50) {
                        temp = ['spell_shadow_curseofmannoroth2', 'spell_shadow_curseofmannoroth3', 'spell_animaardenweald_groundstate', 'spell_holy_innerfire',
                            'ability_rogue_shadowstrike2', 'ability_rogue_shadowstrike3'];
                        spellList = spellList.concat(temp);
                    } 
                    if(lv > 75) {
                        temp = ['spell_shadow_curseofmannoroth4', 'spell_animaardenweald_groundstate2', 'spell_arcane_starfire', 'spell_holy_crusaderstrike',
                            'spell_holy_innerfire2'];
                        spellList = spellList.concat(temp);
                    } 
                    if(lv > 100) {
                        temp = ['spell_animaardenweald_groundstate3', 'spell_arcane_starfire2', 'spell_holy_crusaderstrike2', 'spell_nature_wispsplode',
                            'ability_rogue_shadowstrike4', 'spell_holy_innerfire3', 'spell_holy_layonhands'];
                        spellList = spellList.concat(temp);
                    }
                    if(lv > 125) {
                        temp = ['spell_holy_layonhands2'];
                        spellList = spellList.concat(temp);
                    }
                    break;
                case 3:
                    if(lv > 10) {
                        temp = ['ability_druid_starfall', 'ability_revendreth_paladin'];
                        spellList = spellList.concat(temp);
                    } else if(lv > 50) {
                        temp = ['ability_druid_starfall2', 'warrior_talent_icon_innerrage', 'ability_revendreth_paladin2'];
                        spellList = spellList.concat(temp);
                    } else if(lv > 75) {
                        temp = [];
                        spellList = spellList.concat(temp);
                    } else if(lv > 100) {
                        temp = ['ability_druid_starfall3', 'warrior_talent_icon_innerrage2', 'ability_revendreth_paladin3', 'ability_ardenweald_paladin_summer'];
                        spellList = spellList.concat(temp);
                    }
                    break;
            }
            return spellList;
        },
    }
}