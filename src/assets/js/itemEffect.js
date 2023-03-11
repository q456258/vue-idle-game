import { itemConfig } from '@/assets/config/itemConfig';
export const itemEffect = {
    mixins: [itemConfig],
    data() {
        return {
        }
    },
    methods: {
        callItemEffect(type, lv, options={}) {
            let itemInfo = this.itemType[type];
            let used = false;
            let toBackpack = options.toBackpack != undefined ? options.toBackpack : true;
            let equipOption = options.equipOption != undefined ? options.equipOption : {};
            let cd = this.$store.state.playerAttribute.globalCD[itemInfo.cdgroup];
            let msg = options.msg;
            let qty = options.qty;
            let recipeName = type;
            if(type.includes('_recipe'))
                type = 'recipe';
            if(cd != undefined && cd > Date.now()) {
                this.$store.commit("set_sys_info", {
                    msg: '物品冷却中, 剩余: '+Math.round((cd-Date.now())/1000)+'秒',
                    type: 'danger'
                });
                return used;
            }
            switch(type) {
                case 'recipe':
                    used = this.learnRecipe(recipeName);
                    break;
                case 'inv_enchant_voidsphere_bag':
                    used = this.giveItem('inv_enchant_voidsphere', 10);
                    break;
                case 'inv_misc_gem_diamond_05_bag':
                    used = this.giveItem('inv_misc_gem_diamond_05', 10);
                    break;
                case 'inv_misc_gem_diamond_04_bag':
                    used = this.giveItem('inv_misc_gem_diamond_04', 10);
                    break;
                case 'inv_misc_gem_diamond_03_bag':
                    used = this.giveItem('inv_misc_gem_diamond_03', 10);
                    break;
                case 'inv_misc_gem_diamond_02_bag':
                    used = this.giveItem('inv_misc_gem_diamond_02', 10);
                    break;
                case 'inv_misc_gem_diamond_01_bag':
                    used = this.giveItem('inv_misc_gem_diamond_01', 10);
                    break;
                case 'racial_dwarf_findtreasure':
                    used = this.randomGold(50000, 50000, msg, qty);
                    break;
                case 'inv_misc_coin_05':
                    used = this.randomGold(1, 2, msg, qty);
                    break;
                case 'inv_misc_coin_06':
                    used = this.randomGold(1, 10, msg, qty);
                    break;
                case 'inv_misc_coin_03':
                    used = this.randomGold(100, 200, msg, qty);
                    break;
                case 'inv_misc_coin_04':
                    used = this.randomGold(100, 1000, msg, qty);
                    break;
                case 'inv_misc_coin_01':
                    used = this.randomGold(10000, 20000, msg, qty);
                    break;
                case 'inv_misc_coin_02':
                    used = this.randomGold(10000, 100000, msg, qty);
                    break;
                case 'ability_racial_packhobgoblin':
                    used = this.randomGold(1000000, 10000000, msg, qty);
                    break;
                case 'inv_misc_note_06_mine':
                case 'inv_misc_note_06_mine2':
                    used = this.upgradeGuildBuild('mine');
                    break;
                // case 'inv_misc_note_06':
                //     used = this.inv_misc_note_06();
                //     break;
                case 'random_equip_normal_0':
                    equipOption.baseOption = ['STR', 'AGI', 'STA'];
                    used = this.randomEquip(0, lv, equipOption, toBackpack);
                    break;
                case 'random_equip_normal_1':
                    used = this.randomEquip(1, lv, equipOption, toBackpack);
                    break;
                case 'random_equip_normal_2':
                    used = this.randomEquip(2, lv, equipOption, toBackpack);
                    break;
                case 'random_equip_normal_3':
                    used = this.randomEquip(3, lv, equipOption, toBackpack);
                    break;
                case 'random_equip_normal_4':
                    used = this.randomEquip(4, lv, equipOption, toBackpack);
                    break;
                case 'random_equip_normal_10':
                    equipOption.baseOption = ['STR', 'AGI', 'STA'];
                    used = this.randomEquip(10, lv, equipOption, toBackpack);
                    break;
                case 'random_equip_elite_1':
                    equipOption.baseOption = ['STR', 'AGI', 'STA'];
                    equipOption.lv = lv+2;
                    used = this.randomEquip(1, lv, equipOption, toBackpack);
                    break;
                case 'random_equip_elite_2':
                    equipOption.baseOption = ['STR', 'AGI', 'STA'];
                    equipOption.lv = lv+2;
                    used = this.randomEquip(2, lv, equipOption, toBackpack);
                    break;
                case 'random_equip_elite_3':
                    equipOption.lv = lv+2;
                    used = this.randomEquip(3, lv, equipOption, toBackpack);
                    break;
                case 'random_equip_elite_4':
                    equipOption.lv = lv+2;
                    used = this.randomEquip(4, lv, equipOption, toBackpack);
                    break;
                case 'random_equip_4':
                    equipOption.lv = lv+5;
                    used = this.randomEquip(4, lv, equipOption, toBackpack);
                    break;
                case 'random_equip_5':
                    equipOption.lv = lv+5;
                    used = this.randomEquip(5, lv, equipOption, toBackpack);
                    break;
                case 'random_equip_6':
                    equipOption.lv = lv+5;
                    used = this.randomEquip(6, lv, equipOption, toBackpack);
                    break;
                case 'random_equip_7':
                    equipOption.lv = lv+5;
                    used = this.randomEquip(7, lv, equipOption, toBackpack);
                    break;
                case 'random_equip_8':
                    equipOption.lv = lv+5;
                    used = this.randomEquip(8, lv, equipOption, toBackpack);
                    break;
                case 'random_equip_9':
                    equipOption.lv = lv+5;
                    used = this.randomEquip(9, lv, equipOption, toBackpack);
                    break;
                case 'random_poor_equip':
                    used = this.randomEquip(10, lv, equipOption, toBackpack);
                    break;
                case 'random_common_equip':
                    used = this.randomEquip(11, lv, equipOption, toBackpack);
                    break;
                case 'random_uncommon_equip':
                    used = this.randomEquip(12, lv, equipOption, toBackpack);
                    break;
                case 'random_rare_equip':
                    used = this.randomEquip(13, lv, equipOption, toBackpack);
                    break;
                case 'random_epic_equip':
                    used = this.randomEquip(14, lv, equipOption, toBackpack);
                    break;
                case 'random_legendary_equip':
                    used = this.randomEquip(15, lv, equipOption, toBackpack);
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
                // 药剂
                case 'inv_misc_food_73cinnamonroll':
                case 'inv_misc_gem_sapphire_02':
                case 'inv_alchemy_80_potion01red':
                case 'inv_alchemy_80_potion01blue':
                case 'inv_potion_27':
                case 'inv_potion_49':
                case 'inv_potion_50':
                case 'inv_potion_51':
                case 'inv_potion_52':
                case 'inv_potion_53':
                case 'inv_potion_54':
                case 'inv_potion_160':
                case 'inv_potion_55':
                case 'inv_potion_131':
                case 'inv_potion_142':
                case 'inv_potion_167':
                case 'inv_potion_70':
                case 'inv_potion_71':
                case 'inv_potion_72':
                case 'inv_potion_73':
                case 'inv_potion_74':
                case 'inv_potion_75':
                case 'inv_potion_163':
                case 'inv_potion_76':
                case 'inv_potion_137':
                case 'inv_potion_148':
                case 'inv_potion_168':
                case 'inv_potion_42':
                case 'inv_potion_43':
                case 'inv_potion_44':
                case 'inv_potion_45':
                case 'inv_potion_46':
                case 'inv_potion_47':
                case 'inv_potion_164':
                case 'inv_potion_48':
                case 'inv_potion_134':
                case 'inv_potion_145':
                case 'trade_alchemy_potionc2':
                case 'trade_alchemy_potionc6':
                case 'trade_alchemy_potionc3':
                case 'trade_alchemy_potionc4':
                case 'trade_alchemy_potionc5':
                    used = this.potion(type);
                    break;
            }
            if(used) {
                this.$store.state.playerAttribute.globalCD[itemInfo.cdgroup] = Date.now()+(itemInfo.cd*1000);
            }
            return used;
        },
        //招募声明
        // inv_misc_note_06() {
        //     let guildMember = this.$store.globalComponent["guildMember"];
        //     guildMember.generateApplicant();
        //     return true;
        // },
        upgradeGuildBuild(type) {
            let guild = this.$store.state.guildAttribute;
            guild[type].lv += 1;
            return true;
        },
        giveItem(code, qty) {
            let itemInfo = this.$store.globalComponent["itemInfo"];;
            let item = itemInfo.createItem(code, qty);  
            itemInfo.addItem(JSON.parse(item));
            return true;
        },
        randomGold(min, max, msg, qty=1) {
            let guild = this.$store.globalComponent["guild"];
            let gold = 0;
            for(; qty>0; qty--)
                gold += Math.round(((max-min)*Math.random())+min);
            guild.getGold('', gold, msg);
            return true;
        },
        randomEquip(qualitySet, lv, optional={}, toBackpack) {
            let backpack = this.$store.globalComponent["backpack"];
            let equipInfo = this.$store.globalComponent["equipInfo"];
            let itemLv = lv || this.$store.state.playerAttribute.lv;
            let equip = equipInfo.createEquip(-1, itemLv, 'random', qualitySet, optional);  
            equip = JSON.parse(equip);
            // this.$store.commit("set_sys_info", {
            //     type: 'reward',
            //     msg: '获得战利品',
            //     equip: equip
            // });
            if(!toBackpack)
                return equip;
            backpack.giveEquip(equip, true, true);
            return true;
        },
        bossTicket(monsterID) {
            let index = this.$store.globalComponent.index;
            index.addToMap('boss', (monsterID+5)*2, 1, monsterID);
            return true;
        },
        learnRecipe(type) {
            let learnt = this.$store.state.playerAttribute.learntRecipe;
            let newType = type.replace("_recipe","");
            if(learnt.indexOf(newType) != -1) {
                this.$store.commit("set_sys_info", {
                    type: 'warning',
                    msg: '无法重复学习配方!'
                });
                return false;
            }
            learnt.push(newType);
            return true;
        },
        potion(type) {
            let used = false;
            let itemInfo = this.itemType[type];
            let src = this.$store.state.playerAttribute;
            let index = this.$store.globalComponent["index"];
            switch(type) {
                case 'inv_potion_27':
                    used = this.inv_potion_27();
                    break;
                case 'inv_alchemy_80_potion01red':
                case 'inv_misc_food_73cinnamonroll':
                    used = !this.inBattle() && this.hpPotion(100, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
                case 'inv_alchemy_80_potion01blue':
                case 'inv_misc_gem_sapphire_02':
                    used = !this.inBattle() && this.mpPotion(100, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
                case 'inv_potion_49':
                    used = this.hpPotion(25, 1, 10, 'fix');
                    break;
                case 'inv_potion_50':
                    used = this.hpPotion(200, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'inv_potion_51':
                    used = this.hpPotion(100, 1, 10, 'fix');
                    break;
                case 'inv_potion_52':
                    used = this.hpPotion(800, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'inv_potion_53':
                    used = this.hpPotion(500, 1, 10, 'fix');
                    break;
                case 'inv_potion_54':
                    used = this.hpPotion(4500, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'inv_potion_160':
                    used = this.hpPotion(1, 1, 100, 'maxPercent');
                    break;
                case 'inv_potion_55':
                    used = this.hpPotion(5, 1, 100, 'maxPercent');
                    break;
                case 'inv_potion_131':
                    used = this.hpPotion(25, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
                case 'inv_potion_142':
                    used = this.hpPotion(50, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
                case 'inv_potion_167':
                    used = this.hpPotion(100, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
                case 'inv_potion_70':
                    used = this.mpPotion(15, 1, 10, 'fix');
                    break;
                case 'inv_potion_71':
                    used = this.mpPotion(125, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'inv_potion_72':
                    used = this.mpPotion(50, 1, 10, 'fix');
                    break;
                case 'inv_potion_73':
                    used = this.mpPotion(400, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'inv_potion_74':
                    used = this.mpPotion(200, 1, 10, 'fix');
                    break;
                case 'inv_potion_75':
                    used = this.mpPotion(1750, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'inv_potion_163':
                    used = this.mpPotion(1, 1, 100, 'maxPercent');
                    break;
                case 'inv_potion_76':
                    used = this.mpPotion(5, 1, 100, 'maxPercent');
                    break;
                case 'inv_potion_137':
                    used = this.mpPotion(25, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
                case 'inv_potion_148':
                    used = this.mpPotion(50, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
                case 'inv_potion_168':
                    used = this.mpPotion(100, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
                case 'inv_potion_42':
                    used = this.hpPotion(15, 1, 10, 'fix') | this.mpPotion(15, 1, 10, 'fix');
                    break;
                case 'inv_potion_43':
                    used = this.hpPotion(125, 0, 0, 'fix', itemInfo.description.name) | this.mpPotion(125, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'inv_potion_44':
                    used = this.hpPotion(100, 1, 10, 'fix') | this.mpPotion(100, 1, 10, 'fix');
                    break;
                case 'inv_potion_45':
                    used = this.hpPotion(1000, 0, 0, 'fix', itemInfo.description.name) | this.mpPotion(1000, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'inv_potion_46':
                    used = this.hpPotion(1500, 1, 10, 'fix') | this.mpPotion(1500, 1, 10, 'fix');
                    break;
                case 'inv_potion_47':
                    used = this.hpPotion(10000, 0, 0, 'fix', itemInfo.description.name) | this.mpPotion(10000, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'inv_potion_164':
                    used = this.hpPotion(1, 1, 100, 'maxPercent') | this.mpPotion(1, 1, 100, 'maxPercent');
                    break;
                case 'inv_potion_48':
                    used = this.hpPotion(5, 1, 100, 'maxPercent') | this.mpPotion(5, 1, 100, 'maxPercent');
                    break;
                case 'inv_potion_134':
                    used = this.hpPotion(33, 0, 0, 'maxPercent', itemInfo.description.name) | this.mpPotion(33, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
                case 'inv_potion_145':
                    used = this.hpPotion(75, 0, 0, 'maxPercent', itemInfo.description.name) | this.mpPotion(75, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
                case 'trade_alchemy_potionc2':
                    index.statBuffApply(src, src, 'STR', src.lv, 1800, itemInfo.cdgroup);
                    used = true;
                    break;
                case 'trade_alchemy_potionc6':
                    index.statBuffApply(src, src, 'AGI', src.lv, 1800, itemInfo.cdgroup);
                    used = true;
                    break;
                case 'trade_alchemy_potionc3':
                    index.statBuffApply(src, src, 'STA', src.lv, 1800, itemInfo.cdgroup);
                    used = true;
                    break;
                case 'trade_alchemy_potionc4':
                    index.statBuffApply(src, src, 'INT', src.lv, 1800, itemInfo.cdgroup);
                    used = true;
                    break;
                case 'trade_alchemy_potionc5':
                    index.statBuffApply(src, src, 'SPI', src.lv, 1800, itemInfo.cdgroup);
                    used = true;
                    break;
            }
            let quest = this.$store.globalComponent["quest"];
            quest.trackProgress('event', 8, 1);
            return used;
        },
        inBattle() {
            return this.$store.state.dungeonInfo.inBattle;
        },
        inv_potion_27() {
            let player = this.$store.state.playerAttribute;
            let index = this.$store.globalComponent["index"];
            index.buffApply(player, player, 'minionSlayer', 600);
            return true;
        },
        hpPotion(value, gap, duration, type, sourceName) {
            let player = this.$store.state.playerAttribute;
            // 药剂增幅
            // 药剂禁止
            if(duration == 0) {
                if(type=='maxPercent')
                    value = Math.ceil(player.attribute.MAXHP.value*value/100);
                this.instaHpPotion(value, sourceName);
            }
            else  {
                this.durationHpPotion(value, gap, duration, type);
            }
            return true;
        },
        mpPotion(value, gap, duration, type, sourceName) {
            let player = this.$store.state.playerAttribute;
            // 药剂增幅
            // 药剂禁止
            if(duration == 0) {
                if(type=='maxPercent')
                    value = Math.ceil(player.attribute.MAXHP.value*value/100);
                this.instaMpPotion(value, sourceName);
            }
            else  {
                this.durationMpPotion(value, gap, duration, type);
            }
            return true;
        },
        instaHpPotion(value, sourceName) {
            let index = this.$store.globalComponent["index"];
            let player = this.$store.state.playerAttribute;
            index.hpChange(player, player, {heal: value}, sourceName);
        },
        instaMpPotion(value, sourceName) {
            let index = this.$store.globalComponent["index"];
            let player = this.$store.state.playerAttribute;
            index.mpChange(player, player, value, sourceName);
        },
        durationHpPotion(value, gap, duration, type) {
            let index = this.$store.globalComponent["index"];
            let player = this.$store.state.playerAttribute;
            let timer;
            timer = setInterval(() => {
                let newValue = value;
                if(type == 'maxPercent')
                    newValue = Math.ceil(player.attribute.MAXHP.value*value/100);
                    index.hpChange(player, player, {heal: newValue});
                duration -= gap;
                if(duration < 0) {
                    clearInterval(timer);
                }
            }, gap*1000);
        },
        durationMpPotion(value, gap, duration, type) {
            let index = this.$store.globalComponent["index"];
            let player = this.$store.state.playerAttribute;
            let timer;
            timer = setInterval(() => {
                let newValue = value;
                if(type == 'maxPercent')
                    newValue = Math.ceil(player.attribute.MAXMP.value*value/100);
                index.mpChange(player, player, newValue);
                duration -= gap;
                if(duration < 0) {
                    clearInterval(timer);
                }
            }, gap*1000);
        },
    }
}