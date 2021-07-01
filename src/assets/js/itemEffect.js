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
        callItemEffect(type) {
            var used = false;
            var spellName = '';
            var spellLv = 1;
            if(this.allSpell.indexOf(type) != -1) {
                spellName = type;
                let tempLv = parseInt(type.charAt(type.length-1));
                if(!isNaN(tempLv)) {
                    spellLv = tempLv;
                    spellName = spellName.substring(0, type.length-1);
                }
                type = 'spellBook';
            }
            switch(type) {
                case 'inv_box_01':
                    used = this.inv_box_01();
                    break;
                case 'inv_box_02':
                    used = this.inv_box_02();
                    break;
                case 'inv_box_03':
                    used = this.inv_box_03();
                    break;
                case 'bossTicket1':
                    used = this.bossTicket(4);
                    break;
                case 'bossTicket2':
                    used = this.bossTicket(6);
                    break;
                case 'bossTicket3':
                    used = this.bossTicket(8);
                    break;
                case 'bossTicket4':
                    used = this.bossTicket(10);
                    break;
                case 'bossTicket5':
                    used = this.bossTicket(12);
                    break;
                case 'bossTicket6':
                    used = this.bossTicket(14);
                    break;
                case 'bossTicket7':
                    used = this.bossTicket(16);
                    break;
                case 'bossTicket8':
                    used = this.bossTicket(18);
                    break;
                case 'bossTicket9':
                    used = this.bossTicket(20);
                    break;
                case 'bossTicket10':
                    used = this.bossTicket(22);
                    break;
                case 'inv_potion_27':
                    used = this.inv_potion_27();
                    break;
                case 'spellBook':
                    used = this.learnSpell(spellName, spellLv);
                    if(used) {
                        // 刷新一下过滤技能列表
                        var charInfo = this.findBrothersComponents(this, 'charInfo', false)[0];
                        let temp = charInfo.dmgFilterSelected;
                        charInfo.dmgFilterSelected = '';
                        charInfo.dmgFilterSelected = temp;
                    }
                    break;
            }
            return used;
        },
        getSpellList(lv, rank) {
            var spellList = [];
            var temp = [];
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
        //宝箱
        inv_box_01() {
            var equipInfo = this.findBrothersComponents(this, 'equipInfo', false)[0];
            var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            var guild = this.findBrothersComponents(this, 'guild', false)[0];
            var reward = ['gold', 'crystal', 'equip', 'spell'];
            var type = reward[Math.floor(Math.random()*reward.length)];
            var lv = this.$store.state.playerAttribute.lv;
            switch(type) {
                case 'gold':
                    let gold = Math.round((100+lv**2)*(1+1*Math.random()))
                    guild.getGold('打开宝箱', gold);
                    return true;
                case 'crystal':
                    let crystal = Math.round((1+lv)*(1+Math.random()))
                    guild.getCrystal('打开宝箱', crystal);
                    return true;
                case 'equip':
                    let equip = equipInfo.createEquip(-1, lv, 'random', 0);  
                    equip = JSON.parse(equip);
                    this.$store.commit("set_sys_info", {
                        type: 'reward',
                        msg: '打开宝箱获得',
                        equip: equip
                    });
                    backpack.giveEquip(equip);
                    return true;
                case 'spell':
                    let spell = this.getSpellList(lv, 1);
                    let spellType = spell[Math.floor(Math.random()*spell.length)];
                    let quantity = 1;
                    let item = itemInfo.createItem(spellType, quantity);  
                    item = JSON.parse(item);
                    this.$store.commit("set_sys_info", {
                        type: 'reward',
                        msg: '打开宝箱获得',
                        item: item,
                        quantity: quantity
                    });
                    itemInfo.addItem(item);
                    return true;
            }
            return false;
        },
        inv_box_02() {
            var equipInfo = this.findBrothersComponents(this, 'equipInfo', false)[0];
            var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            var guild = this.findBrothersComponents(this, 'guild', false)[0];
            var reward = ['gold', 'crystal', 'equip', 'spell', 'ticket'];
            var type = reward[Math.floor(Math.random()*reward.length)];
            var lv = this.$store.state.playerAttribute.lv;
            var item = {};
            var quantity = 0;
            switch(type) {
                case 'gold':
                    let gold = Math.round((100+lv**2)*(10+4*Math.random()))
                    guild.getGold('打开宝箱', gold);
                    return true;
                case 'crystal':
                    let crystal = Math.round((1+lv*3)*(5+Math.random()))
                    guild.getCrystal('打开宝箱', crystal);
                    return true;
                case 'equip':
                    let equip = equipInfo.createEquip(-1, lv, 'random', 1);  
                    equip = JSON.parse(equip);
                    this.$store.commit("set_sys_info", {
                        type: 'reward',
                        msg: '打开宝箱获得',
                        equip: equip
                    });
                    backpack.giveEquip(equip);
                    return true;
                case 'spell':
                    let spell = this.getSpellList(lv, 2);
                    let spellType = spell[Math.floor(Math.random()*spell.length)];
                    quantity = 1;
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
                case 'ticket':
                    let tickets = ['bossTicket1', 'bossTicket2', 'bossTicket3', 'bossTicket4', 'bossTicket5', 'bossTicket6', 'bossTicket7', 'bossTicket8', 'bossTicket9', 
                            'bossTicket10'];
                    quantity = 1;
                    item = itemInfo.createItem(tickets[Math.floor((lv-1)/10)-1], quantity);  
                    item = JSON.parse(item);
                    this.$store.commit("set_sys_info", {
                        type: 'reward',
                        msg: '打开宝箱获得',
                        item: item,
                        quantity: quantity
                    });
                    itemInfo.addItem(item);
                    return true;
            }
            return false;
        },
        inv_box_03() {
            var equipInfo = this.findBrothersComponents(this, 'equipInfo', false)[0];
            var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            var guild = this.findBrothersComponents(this, 'guild', false)[0];
            var reward = ['gold', 'crystal', 'equip', 'spell'];
            var type = reward[Math.floor(Math.random()*reward.length)];
            var lv = this.$store.state.playerAttribute.lv;
            switch(type) {
                case 'gold':
                    let gold = Math.round((100+lv**2)*(100+4*Math.random()))
                    guild.getGold('打开宝箱', gold);
                    return true;
                case 'crystal':
                    let crystal = Math.round((1+lv)*(50+Math.random()))
                    guild.getCrystal('打开宝箱', crystal);
                    return true;
                case 'equip':
                    let equip = equipInfo.createEquip(-1, lv, 'random', 2);  
                    equip = JSON.parse(equip);
                    this.$store.commit("set_sys_info", {
                        type: 'reward',
                        msg: '打开宝箱获得',
                        equip: equip
                    });
                    backpack.giveEquip(equip);
                    return true;
                case 'spell':
                    let spell = this.getSpellList(lv, 3);
                    let spellType = spell[Math.floor(Math.random()*spell.length)];
                    let quantity = 1;
                    let item = itemInfo.createItem(spellType, quantity);  
                    item = JSON.parse(item);
                    this.$store.commit("set_sys_info", {
                        type: 'reward',
                        msg: '打开宝箱获得',
                        item: item,
                        quantity: quantity
                    });
                    itemInfo.addItem(item);
                    return true;
            }
            return false;
        },
        bossTicket(template) {
            var index = this.findComponentUpward(this, 'index');
            var mapEvent = this.findBrothersComponents(this, 'mapEvent', false)[0];
            index.set_enermy_hp('dead');
            mapEvent.generateEnermy('BOSS', this.$store.state.playerAttribute.lv, template);
        },
        inv_potion_27() {
            var player = this.$store.state.playerAttribute;
            var index = this.findComponentUpward(this, 'index');
            index.buffApply(player, player, 'minionSlayer', 600);
            return true;
        },
        learnSpell(spellName, lv) {
            var spellList = this.$store.state.playerAttribute.spells;
            if(spellList.spell[spellName] != undefined) {
                if(spellList.spell[spellName].lv < lv)
                    this.$store.state.playerAttribute.spells.spell[spellName].lv += 1;
                else
                    this.$store.state.playerAttribute.spells.spell[spellName].proficient += lv;
                return true;
            }
            else {
                var charInfo = this.findBrothersComponents(this, 'charInfo', false)[0];
                this.$store.state.playerAttribute.spells.spell[spellName] = {active: true, lv: 1, proficient: 0};
                charInfo.activeSpell(spellName, 1);
                return true;
            }

        }
    }
}