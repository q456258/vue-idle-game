export const itemEffect = {
// 品质	名	等级
// 1	spell_nature_thunderclap	20
// 	spell_nature_thunderclap2	45
// 	spell_nature_thunderclap3	70
// 	spell_nature_thunderclap4	95
// 	spell_shadow_ritualofsacrifice	50
// 	spell_shadow_ritualofsacrifice2	80
// 	spell_shadow_ritualofsacrifice3	105
// 	ability_warrior_shieldbash	30
// 	ability_warrior_shieldbash2	55
// 	ability_warrior_shieldbash3	80
// 	ability_warrior_shieldbash4	105
// 	ability_druid_maul	35
// 	ability_druid_maul2	60
// 	ability_druid_maul3	85
// 	ability_druid_maul4	110
// 	spell_fire_flamebolt	25
// 	spell_fire_flamebolt2	50
// 	spell_fire_flamebolt3	75
// 	spell_fire_flamebolt4	100
// 2	spell_nature_starfall	60
// 	spell_nature_starfall2	85
// 	spell_nature_starfall3	110
// 	spell_holy_holybolt	40
// 	spell_holy_holybolt2	65
// 	spell_holy_holybolt3	90
// 	spell_holy_holybolt4	115
// 	spell_nature_lightning	40
// 	spell_nature_lightning2	65
// 	spell_nature_lightning3	90
		
// 3	spell_arcane_starfire	70
// 	spell_arcane_starfire2	95
// 	spell_holy_crusaderstrike	80
// 	spell_holy_crusaderstrike2	105
// 	spell_holy_layonhands	90
// 	spell_holy_layonhands2	115
    data() {
        return {
            allSpell: ['spell_nature_thunderclap', 'spell_nature_thunderclap2', 'spell_nature_thunderclap3', 'spell_nature_thunderclap4', 
                'spell_shadow_ritualofsacrifice', 'spell_shadow_ritualofsacrifice2', 'spell_shadow_ritualofsacrifice3', 
                'ability_warrior_shieldbash', 'ability_warrior_shieldbash2', 'ability_warrior_shieldbash3', 'ability_warrior_shieldbash4', 
                'ability_druid_maul', 'ability_druid_maul2', 'ability_druid_maul3', 'ability_druid_maul4', 
                'spell_fire_flamebolt', 'spell_fire_flamebolt2', 'spell_fire_flamebolt3', 'spell_fire_flamebolt4', 
                'spell_nature_starfall', 'spell_nature_starfall2', 'spell_nature_starfall3', 
                'spell_holy_holybolt', 'spell_holy_holybolt2', 'spell_holy_holybolt3', 'spell_holy_holybolt4', 
                'spell_nature_lightning', 'spell_nature_lightning2', 'spell_nature_lightning3', 
                'spell_arcane_starfire', 'spell_arcane_starfire2', 
                'spell_holy_crusaderstrike', 'spell_holy_crusaderstrike2', 
                'spell_holy_layonhands', 'spell_holy_layonhands2']
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
            var spellList = ['spell_nature_thunderclap'];
            var temp = [];
            switch(rank) {
                case 1:
                    if(lv > 10) {
                        temp = ['spell_nature_thunderclap', 'spell_fire_flamebolt'];
                        spellList = spellList.concat(temp);
                    }
                    if(lv > 50) {
                        temp = ['spell_nature_thunderclap2', 'spell_nature_lightning', 'spell_holy_holybolt', 
                            'ability_warrior_shieldbash','ability_druid_maul'];
                        spellList = spellList.concat(temp);
                    }
                    if(lv > 75) {
                        temp = ['spell_nature_thunderclap3', 'spell_nature_lightning2', 'spell_shadow_ritualofsacrifice', 'spell_holy_holybolt2', 
                            'spell_nature_starfall', 'ability_warrior_shieldbash2', 'ability_druid_maul2', 'spell_fire_flamebolt2'];
                        spellList = spellList.concat(temp);
                    }
                    if(lv > 100) {
                        temp = ['spell_nature_thunderclap4', 'spell_nature_lightning3', 'spell_shadow_ritualofsacrifice2', 
                            'spell_holy_holybolt3', 'spell_nature_starfall2', 'ability_warrior_shieldbash3',
                            'ability_druid_maul3', 'spell_fire_flamebolt3'];
                        spellList = spellList.concat(temp);
                    }
                    if(lv > 125) {
                        temp = ['spell_shadow_ritualofsacrifice3', 'spell_nature_starfall2', 'ability_warrior_shieldbash4', 
                            'ability_druid_maul4','spell_fire_flamebolt4'];
                        spellList = spellList.concat(temp);
                    }
                    break;
                case 2:
                    if(lv > 10) {
                        temp = ['spell_nature_thunderclap2', 'spell_nature_lightning', 'spell_holy_holybolt', 
                            'ability_warrior_shieldbash','ability_druid_maul', 'spell_fire_flamebolt'];
                        spellList = spellList.concat(temp);
                    } else if(lv > 50) {
                        temp = ['spell_nature_thunderclap3', 'spell_nature_lightning2', 'spell_shadow_ritualofsacrifice', 'spell_holy_holybolt2', 
                            'spell_arcane_starfire','spell_nature_starfall', 'ability_warrior_shieldbash2', 'ability_druid_maul2', 'spell_fire_flamebolt2'];
                        spellList = spellList.concat(temp);
                    } else if(lv > 75) {
                        temp = ['spell_nature_thunderclap4', 'spell_nature_lightning3', 'spell_holy_crusaderstrike', 'spell_shadow_ritualofsacrifice2', 
                            'spell_holy_layonhands','spell_holy_holybolt3', 'spell_arcane_starfire2', 'spell_nature_starfall2', 'ability_warrior_shieldbash3',
                            'ability_druid_maul3', 'spell_fire_flamebolt3'];
                        spellList = spellList.concat(temp);
                    } else if(lv > 100) {
                        temp = ['spell_holy_crusaderstrike2', 'spell_shadow_ritualofsacrifice3', 'spell_nature_starfall2', 'ability_warrior_shieldbash4', 
                            'ability_druid_maul4','spell_fire_flamebolt4'];
                        spellList = spellList.concat(temp);
                    }
                    break;
                case 3:
                    if(lv > 10) {
                        temp = ['spell_nature_thunderclap2', 'spell_nature_lightning', 'spell_holy_holybolt', 
                            'ability_warrior_shieldbash','ability_druid_maul', 'spell_fire_flamebolt'];
                        spellList = spellList.concat(temp);
                    } else if(lv > 50) {
                        temp = ['spell_nature_thunderclap3', 'spell_nature_lightning2', 'spell_shadow_ritualofsacrifice', 'spell_holy_holybolt2', 
                            'spell_arcane_starfire','spell_nature_starfall', 'ability_warrior_shieldbash2', 'ability_druid_maul2', 'spell_fire_flamebolt2'];
                        spellList = spellList.concat(temp);
                    } else if(lv > 75) {
                        temp = ['spell_nature_thunderclap4', 'spell_nature_lightning3', 'spell_holy_crusaderstrike', 'spell_shadow_ritualofsacrifice2', 
                            'spell_holy_layonhands','spell_holy_holybolt3', 'spell_arcane_starfire2', 'spell_nature_starfall2', 'ability_warrior_shieldbash3',
                            'ability_druid_maul3', 'spell_fire_flamebolt3'];
                        spellList = spellList.concat(temp);
                    } else if(lv > 100) {
                        temp = ['spell_holy_layonhands2', 'spell_holy_crusaderstrike2', 'spell_shadow_ritualofsacrifice3', 'spell_nature_starfall2', 'ability_warrior_shieldbash4', 
                            'ability_druid_maul4','spell_fire_flamebolt4'];
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
                    let gold = Math.round((100+lv**2)*(2+2*Math.random()))
                    guild.getGold('打开宝箱', gold);
                    return true;
                case 'crystal':
                    let crystal = Math.round((1+lv*3)*(1+Math.random()))
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
            var reward = ['gold', 'crystal', 'equip', 'spell'];
            var type = reward[Math.floor(Math.random()*reward.length)];
            var lv = this.$store.state.playerAttribute.lv;
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
                    let crystal = Math.round((1+lv*3)*(50+Math.random()))
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