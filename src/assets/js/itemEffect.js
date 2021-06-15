export const itemEffect = {
    methods: {
        callItemEffect(type) {
            var used = false;
            var spellName = '';
            var spellBook = ['spell_nature_thunderclap', 'spell_nature_lightning', 'spell_holy_crusaderstrike', 'spell_shadow_ritualofsacrifice', 'spell_holy_layonhands',
            'spell_fire_flamebolt', 'ability_druid_maul', 'ability_warrior_shieldbash', 'spell_nature_starfall', 'spell_arcane_starfire', 'spell_holy_holybolt'];
            if(spellBook.indexOf(type) != -1) {
                spellName = type;
                type = 'spellBook';
            }
            switch(type) {
                case 'inv_box_01':
                    used = this.inv_box_01();
                    break;
                case 'spellBook':
                    used = this.learnSpell(spellName);
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
        //宝箱
        inv_box_01() {
            var equipInfo = this.findBrothersComponents(this, 'equipInfo', false)[0];
            var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            var reward = ['gold', 'crystal', 'equip', 'spell'];
            var type = reward[Math.floor(Math.random()*reward.length)];
            var lv = this.$store.state.playerAttribute.lv;
            switch(type) {
                case 'gold':
                    let gold = Math.round((100+lv**2)*(2+2*Math.random()))
                    this.$store.state.guildAttribute.gold += gold;
                    this.$store.commit("set_sys_info", {
                        type: 'reward',
                        msg: '打开宝箱获得'+gold+'金币'
                    });
                    return true;
                case 'crystal':
                    let crystal = Math.round((1+lv*2)*(1+Math.random()))
                    this.$store.state.guildAttribute.crystal += crystal;
                    this.$store.commit("set_sys_info", {
                        type: 'reward',
                        msg: '打开宝箱获得'+crystal+'水晶'
                    });
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
                    let spell = ['spell_nature_thunderclap', 'spell_nature_lightning', 'spell_holy_crusaderstrike', 'spell_shadow_ritualofsacrifice',
                        'spell_holy_layonhands', 'spell_fire_flamebolt', 'ability_druid_maul', 'ability_warrior_shieldbash', 'spell_nature_starfall', 
                        'spell_arcane_starfire', 'spell_holy_holybolt'];
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
        learnSpell(spellName) {
            var spellList = this.$store.state.playerAttribute.spells;
            if(spellList.spell[spellName] != undefined) {
                this.$store.commit("set_sys_info", {
                    type: 'warning',
                    msg: '技能已习得，无法重复学习',
                });
                return false;
            }
            else {
                var charInfo = this.findBrothersComponents(this, 'charInfo', false)[0];
                this.$store.state.playerAttribute.spells.spell[spellName] = {spellName: true};
                charInfo.activeSpell(spellName, 1);
                return true;
            }

        }
    }
}