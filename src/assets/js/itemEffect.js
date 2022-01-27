import { assist } from '@/assets/js/assist';
import { itemConfig } from '@/assets/config/itemConfig';
import { buffAndTrigger } from '@/assets/js/buffAndTrigger';
export const itemEffect = {
    mixins: [assist, itemConfig, buffAndTrigger],
    data() {
        return {
        }
    },
    methods: {
        callItemEffect(type, lv) {
            let itemInfo = this.itemType[type];
            let used = false;
            let info = {};
            let cd = this.$store.state.playerAttribute.globalCD[itemInfo.cdgroup];
            if(cd != undefined && cd > Date.now()) {
                return used;
            }
            switch(type) {
                case 'bTNMGExchange':
                    used = this.randomGold(666, lv);
                    break;
                case 'inv_misc_coin_01':
                    used = this.randomGold(6666, lv);
                    break;
                case 'inv_misc_coin_02':
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
                // 药剂
                case 'inv_potion_27':
                case 'Inv_potion_49':
                case 'Inv_potion_50':
                case 'Inv_potion_51':
                case 'Inv_potion_52':
                case 'Inv_potion_53':
                case 'Inv_potion_54':
                case 'Inv_potion_160':
                case 'Inv_potion_55':
                case 'Inv_potion_131':
                case 'Inv_potion_142':
                case 'Inv_potion_167':
                case 'Inv_potion_70':
                case 'Inv_potion_71':
                case 'Inv_potion_72':
                case 'Inv_potion_73':
                case 'Inv_potion_74':
                case 'Inv_potion_75':
                case 'Inv_potion_163':
                case 'Inv_potion_76':
                case 'Inv_potion_137':
                case 'Inv_potion_148':
                case 'Inv_potion_168':
                case 'Inv_potion_42':
                case 'Inv_potion_43':
                case 'Inv_potion_44':
                case 'Inv_potion_45':
                case 'Inv_potion_46':
                case 'Inv_potion_47':
                case 'Inv_potion_164':
                case 'Inv_potion_48':
                case 'Inv_potion_134':
                case 'Inv_potion_145':
                    used = this.potion(type);
                    break;
            }
            if(used) {
                this.$store.state.playerAttribute.globalCD[itemInfo.cdgroup] = Date.now()+(itemInfo.cd*1000);
            }
            return used;
        },
        //招募声明
        inv_misc_note_06() {
            let guildMember = this.findBrothersComponents(this, 'guildMember', false)[0];
            guildMember.generateApplicant();
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
        potion(type) {
            let used = false;
            let itemInfo = this.itemType[type];
            switch(type) {
                case 'inv_potion_27':
                    used = this.inv_potion_27();
                    break;
                case 'Inv_potion_49':
                    used = this.hpPotion(15, 1, 10, 'fix');
                    break;
                case 'Inv_potion_50':
                    used = this.hpPotion(100, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'Inv_potion_51':
                    used = this.hpPotion(150, 1, 10, 'fix');
                    break;
                case 'Inv_potion_52':
                    used = this.hpPotion(1000, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'Inv_potion_53':
                    used = this.hpPotion(1500, 1, 10, 'fix');
                    break;
                case 'Inv_potion_54':
                    used = this.hpPotion(10000, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'Inv_potion_160':
                    used = this.hpPotion(1, 1, 100, 'maxPercent');
                    break;
                case 'Inv_potion_55':
                    used = this.hpPotion(5, 1, 100, 'maxPercent');
                    break;
                case 'Inv_potion_131':
                    used = this.hpPotion(25, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
                case 'Inv_potion_142':
                    used = this.hpPotion(50, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
                case 'Inv_potion_167':
                    used = this.hpPotion(100, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
                case 'Inv_potion_70':
                    used = this.mpPotion(15, 1, 10, 'fix');
                    break;
                case 'Inv_potion_71':
                    used = this.mpPotion(100, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'Inv_potion_72':
                    used = this.mpPotion(150, 1, 10, 'fix');
                    break;
                case 'Inv_potion_73':
                    used = this.mpPotion(1000, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'Inv_potion_74':
                    used = this.mpPotion(1500, 1, 10, 'fix');
                    break;
                case 'Inv_potion_75':
                    used = this.mpPotion(10000, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'Inv_potion_163':
                    used = this.mpPotion(1, 1, 100, 'maxPercent');
                    break;
                case 'Inv_potion_76':
                    used = this.mpPotion(5, 1, 100, 'maxPercent');
                    break;
                case 'Inv_potion_137':
                    used = this.mpPotion(25, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
                case 'Inv_potion_148':
                    used = this.mpPotion(50, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
                case 'Inv_potion_168':
                    used = this.mpPotion(100, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
                case 'Inv_potion_42':
                    used = this.hpPotion(15, 1, 10, 'fix') && this.mpPotion(15, 1, 10, 'fix');
                    break;
                case 'Inv_potion_43':
                    used = this.hpPotion(100, 0, 0, 'fix', itemInfo.description.name) && this.mpPotion(100, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'Inv_potion_44':
                    used = this.hpPotion(150, 1, 10, 'fix') && this.mpPotion(150, 1, 10, 'fix');
                    break;
                case 'Inv_potion_45':
                    used = this.hpPotion(1000, 0, 0, 'fix', itemInfo.description.name) && this.mpPotion(1000, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'Inv_potion_46':
                    used = this.hpPotion(1500, 1, 10, 'fix') && this.mpPotion(1500, 1, 10, 'fix');
                    break;
                case 'Inv_potion_47':
                    used = this.hpPotion(10000, 0, 0, 'fix', itemInfo.description.name) && this.mpPotion(10000, 0, 0, 'fix', itemInfo.description.name);
                    break;
                case 'Inv_potion_164':
                    used = this.hpPotion(1, 1, 100, 'maxPercent') && this.mpPotion(1, 1, 100, 'maxPercent');
                    break;
                case 'Inv_potion_48':
                    used = this.hpPotion(5, 1, 100, 'maxPercent') && this.mpPotion(5, 1, 100, 'maxPercent');
                    break;
                case 'Inv_potion_134':
                    used = this.hpPotion(33, 0, 0, 'maxPercent', itemInfo.description.name) && this.mpPotion(33, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
                case 'Inv_potion_145':
                    used = this.hpPotion(75, 0, 0, 'maxPercent', itemInfo.description.name) && this.mpPotion(75, 0, 0, 'maxPercent', itemInfo.description.name);
                    break;
            }
            return used;
        },
        inv_potion_27() {
            let player = this.$store.state.playerAttribute;
            let index = this.findComponentUpward(this, 'index');
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
            let player = this.$store.state.playerAttribute;
            this.hpChange(player, player, value, sourceName);
        },
        instaMpPotion(value, sourceName) {
            let player = this.$store.state.playerAttribute;
            this.mpChange(player, player, value, sourceName);
        },
        durationHpPotion(value, gap, duration, type) {
            let player = this.$store.state.playerAttribute;
            let timer;
            timer = setInterval(() => {
                let newValue = value;
                if(type == 'maxPercent')
                    newValue = Math.ceil(player.attribute.MAXHP.value*value/100);
                this.hpChange(player, player, newValue);
                duration -= gap;
                if(duration < 0) {
                    clearInterval(timer);
                }
            }, gap*1000);
        },
        durationMpPotion(value, gap, duration, type) {
            let player = this.$store.state.playerAttribute;
            let timer;
            timer = setInterval(() => {
                let newValue = value;
                if(type == 'maxPercent')
                    newValue = Math.ceil(player.attribute.MAXMP.value*value/100);
                this.mpChange(player, player, newValue);
                duration -= gap;
                if(duration < 0) {
                    clearInterval(timer);
                }
            }, gap*1000);
        },
    }
}