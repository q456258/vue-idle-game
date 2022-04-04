import Vue from 'vue'
import Vuex from 'vuex'
import vueInstance from './main'
Vue.use(Vuex)
//灰、白、蓝、紫、橙、红
//破旧, 普通, 精良, 完美, 史诗, 传说
//a1a1a1,D9D9D9,00BBFF,BB00FF,FFBB00,FF0000
let initial_shoe = {
        lv: 1,
        lvReq: 1,
        itemType: 'shoe',
        maxEnhanceLv: 0,
        enhanceLv: 0,
        quality: {
            color: "#a1a1a1",
            extraEntryNum: 1,
            name: "破旧",
            qualityCoefficient: 1.8,
            qualityLv: 1
        },
        description: {
            name: "村里最好的鞋子",
            desc: "",
            type: "鞋子",
            iconSrc: "./icons/shoe/inv_cloth_startinggear_a_01_boot.jpg",
        },
        baseEntry: [{
            value: 5,
            showVal: "+5%",
            type: "CRIT",
            name: "暴击率"
        }],
        extraBaseEntry: [],
        extraEntry: [],
        potential: []
    },
    initial_weapon = {
        lv: 1,
        lvReq: 1,
        itemType: 'weapon',
        maxEnhanceLv: 0,
        enhanceLv: 0,
        quality: {
            color: "#a1a1a1",
            extraEntryNum: 1,
            name: "破旧",
            qualityCoefficient: 1.8,
            qualityLv: 1
        },
        description: {
            name: "村里最好的武器",
            desc: "",
            type: "武器",
            iconSrc: "./icons/weapon/inv_axe_19.jpg",
        },
        baseEntry: [{
            value: 30,
            showVal: "+30",
            type: "ATK",
            name: "攻击"
        }],
        extraBaseEntry: [],
        extraEntry: [],
        potential: []
    },
    initial_armor = {
        lv: 1,
        lvReq: 1,
        itemType: 'armor',
        maxEnhanceLv: 0,
        enhanceLv: 0,
        quality: {
            color: "#a1a1a1",
            extraEntryNum: 1,
            name: "破旧",
            qualityCoefficient: 1.8,
            qualityLv: 1
        },
        description: {
            name: "村里最好的衣服",
            desc: "",
            type: "铠甲",
            iconSrc: "./icons/armor/inv_shirt_05.jpg",
        },
        baseEntry: [{
            value: 25,
            showVal: "+25",
            type: "DEF",
            name: "护甲"
        }],
        extraBaseEntry: [],
        extraEntry: [],
        potential: []
    },
    initial_legging = {
        lv: 1,
        lvReq: 1,
        itemType: 'legging',
        maxEnhanceLv: 0, 
        enhanceLv: 0,
        quality: {
            color: "#a1a1a1",
            extraEntryNum: 1,
            name: "破旧",
            qualityCoefficient: 1.8,
            qualityLv: 1
        },
        description: {
            name: "村里最好的裤子",
            desc: "",
            type: "腿部",
            iconSrc: "./icons/legging/inv_pants_09.jpg",
        },
        baseEntry: [{
            value: 5,
            showVal: "+5",
            type: "BLOCK",
            name: "格挡"
        }],
        extraBaseEntry: [],
        extraEntry: [],
        potential: []
    };

export default new Vuex.Store({
    state: {
        sysInfo: [{
            type: '',
            msg: "欢迎你勇士, 点击地图上的副本开始战斗。"
        }, {
            type: '',
            msg: "菜单栏可以刷新当前世界副本。"
        }],
        battleInfo: [{
            type: '',
            msg: "伤害"
        }, {
            type: '',
            msg: "菜单栏可以刷新当前世界副本。"
        }, {
            type: '',
            msg: "菜单栏可以刷新当前世界副"
        }],
        train: {
            train1: {
                timer: 0,
                tier: 0,
                finishTime: 0,
                speedUp: false,
                memberID: 0
            },
            train2: {
                timer: 0,
                tier: 0,
                finishTime: 0,
                speedUp: false,
                memberID: 0
            },
            train3: {
                timer: 0,
                tier: 0,
                finishTime: 0,
                speedUp: false,
                memberID: 0
            },
            train4: {
                timer: 0,
                tier: 0,
                finishTime: 0,
                speedUp: false,
                memberID: 0
            }
        },
        quests: {

        },
        dungeonInfo: {
            auto: false,
            inBattle: false,
            current: 'advanture',
            advanture: {
                level: -1,
                reward: 'None',
                type: 'normal',
                monsterID: 0,
                monsterName: ''
            },
        },
        guildAttribute: {
            gold: 0,
            crystal: 0,
            guild: {lv: 0},
            train: {lv: 0},
            train2: {lv: 0},
            train3: {lv: 0},
            shop: {lv: 0},
            smith: {lv: 0},
            mine: {lv: 0},
            herb: {lv: 0},
            bar: {lv: 0},
            member: []
        },
        playerAttribute: {
            name: '无名',
            lv: 1,
            talentLv: 1,
            type: 'player',
            healthRecoverySpeed: 1,
            attribute: {
                CURHP: { baseVal: 0, value: 300, showbaseVal: 0},
                MAXHP: { baseVal: 0, value: 300, showbaseVal: 0},
                CURMP: { baseVal: 0, value: 50, showbaseVal: 0},
                MAXMP: { baseVal: 0, value: 50, showbaseVal: 0},
                HP: { baseVal: 0, value: 0, showbaseVal: 0},
                MP: { baseVal: 0, value: 0, showbaseVal: 0},
                STR: { baseVal: 0, value: 0, showbaseVal: 0},
                AGI: { baseVal: 0, value: 0, showbaseVal: 0},
                INT: { baseVal: 0, value: 0, showbaseVal: 0},
                STA: { baseVal: 0, value: 0, showbaseVal: 0},
                SPI: { baseVal: 0, value: 0, showbaseVal: 0},
                ALL: { baseVal: 0, value: 0, showbaseVal: 0},
                ATK: { baseVal: 0, value: 5, showbaseVal: 0},
                DEF: { baseVal: 0, value: 0, showbaseVal: 0},
                DEFRED: { baseVal: 0, value: 0, showbaseVal: 0},
                BLOCK: { baseVal: 0, value: 0, showbaseVal: 0},
                AP: { baseVal: 0, value: 0, showbaseVal: 0},
                APCRIT: { baseVal: 0, value: 0, showbaseVal: 0},
                APCRITDMG: { baseVal: 200, value: 200, showbaseVal: 0},
                APPEN: { baseVal: 0, value: 0, showbaseVal: 0},
                MR: { baseVal: 0, value: 0, showbaseVal: 0},
                HASTE: { baseVal: 0, value: 0, showbaseVal: 0},
                HEAL: { baseVal: 0, value: 0, showbaseVal: 0},
                VERS: { baseVal: 0, value: 0, showbaseVal: 0},
                VERSBONUS: { baseVal: 0, value: 0, showbaseVal: 0},
                CRIT: { baseVal: 0, value: 0, showbaseVal: 0},
                CRITDMG: { baseVal: 0, value: 150, showbaseVal: 0},
                STRP: { baseVal: 0, value: 0, showbaseVal: 0},
                AGIP: { baseVal: 0, value: 0, showbaseVal: 0},
                INTP: { baseVal: 0, value: 0, showbaseVal: 0},
                STAP: { baseVal: 0, value: 0, showbaseVal: 0},
                SPIP: { baseVal: 0, value: 0, showbaseVal: 0},
                ALLP: { baseVal: 0, value: 0, showbaseVal: 0},
                HPP: { baseVal: 0, value: 0, showbaseVal: 0},
                MPP: { baseVal: 0, value: 0, showbaseVal: 0},
                ATKP: { baseVal: 0, value: 0, showbaseVal: 0},
                DEFP: { baseVal: 0, value: 0, showbaseVal: 0},
                BLOCKP: { baseVal: 0, value: 0, showbaseVal: 0},
                APP: { baseVal: 0, value: 0, showbaseVal: 0},
                APPENP: { baseVal: 0, value: 0, showbaseVal: 0},
                MRP: { baseVal: 0, value: 0, showbaseVal: 0},
            },
            simulatedAttribute: {
            },
            spells: {
                attack: {lv: 1, proficient: 0, progress: 0}
            },
            buff: {},
            talent: {
                generalBranch: 0
            },
            globalCD: {},
            talentPoint: 1,
            helmet: {},
            weapon: initial_weapon,
            armor: initial_armor,
            shoulder: {},
            shoe: initial_shoe,
            glove: {},
            ring: {},
            cape: {},
            bracer: {},
            belt: {},
            legging: initial_legging,
            necklace: {}
        },
        enemyAttribute: {
            name: "小鸡",
            lv: 0,
            attribute: {
                CURHP: { value: 0, showValue: 0, },
                MAXHP: { value: 0, showValue: 0, },                
                ATK: { value: 0, showValue: 0, },
                DEF: { value: 0, showValue: 0, },
                DEFRED: { value: 0, showValue: 0, },
                BLOCK: { value: 0, showValue: 0, },
                AP: { value: 0, showbaseVal: 0},
                APCRIT: { value: 0, showbaseVal: 0},
                APCRITDMG: { value: 0, showbaseVal: 0},
                APPEN: { value: 0, showbaseVal: 0},
                MR: { value: 0, showbaseVal: 0},
                HEAL: { value: 0, showbaseVal: 0},
                CRIT: { value: 0, showValue: 0, },
                CRITDMG: { value: 0, showValue: 0, },
            },
        },             
        baseAttribute: {
            CURHP: 0,
            MAXHP: 0,
            CURMP: 0,
            MAXMP: 0,
            HP: 200,
            MP: 100,
            STR: 0,
            AGI: 0,
            INT: 0,
            STA: 0,
            SPI: 0,
            ALL: 0,
            ATK: 10,
            DEF: 0,
            DEFRED: 0,
            BLOCK: 0,
            AP: 0,
            APCRIT: 0,
            APCRITDMG: 0,
            APPEN: 0,
            MR: 0,
            HASTE: 0,
            HEAL: 0,
            VERS: 0,
            VERSBONUS: 0,
            CRIT: 0,
            CRITDMG: 150,
            STRP: 0,
            AGIP: 0,
            INTP: 0,
            STAP: 0,
            SPIP: 0,
            ALLP: 0,
            HPP: 0,
            MPP: 0,
            ATKP: 0,
            DEFP: 0,
            BLOCKP: 0,
            APP: 0,
            APPENP: 0,
            MRP: 0,
        },    
        memberAttribute: {
            STR: 0,
            AGI: 0,
            STA: 0,
            INT: 0,
            SPI: 0
        },
        setting: {
            waitFull: false
        },
        statistic: {
            slain: {},
            slainBy: {},
            death: 0,
            gameStartDate: 0,
            gameTime: 0,
            awayTime: 0,
            cumulatedGold: 0,
            cumulatedCrystal: 0,
        },
        exitTime: 0
    },
    mutations: {             
        set_player_glove(state, data) {
            this.state.playerAttribute.glove = data || {};
            vueInstance.$store.commit('set_player_attribute');
        },
        set_player_ring(state, data) {
            this.state.playerAttribute.ring = data || {};
            vueInstance.$store.commit('set_player_attribute');
        },
        set_player_cape(state, data) {
            this.state.playerAttribute.cape = data || {};
            vueInstance.$store.commit('set_player_attribute');
        },
        set_player_bracer(state, data) {
            this.state.playerAttribute.bracer = data || {};
            vueInstance.$store.commit('set_player_attribute');
        },
        set_player_belt(state, data) {
            this.state.playerAttribute.belt = data || {};
            vueInstance.$store.commit('set_player_attribute');
        },
        set_player_legging(state, data) {
            this.state.playerAttribute.legging = data || {};
            vueInstance.$store.commit('set_player_attribute');
        },
        set_player_necklace(state, data) {
            this.state.playerAttribute.necklace = data || {};
            vueInstance.$store.commit('set_player_attribute');
        },
        set_player_helmet(state, data) {
            this.state.playerAttribute.helmet = data || initial_helmet;
            vueInstance.$store.commit('set_player_attribute');
        },
        set_player_weapon(state, data) {
            this.state.playerAttribute.weapon = data || initial_weapon;
            vueInstance.$store.commit('set_player_attribute');
        },
        set_player_armor(state, data) {
            this.state.playerAttribute.armor = data || initial_armor;
            vueInstance.$store.commit('set_player_attribute');
        },
        set_player_shoulder(state, data) {
            this.state.playerAttribute.shoulder = data || initial_shoulder;
            vueInstance.$store.commit('set_player_attribute');
        },
        set_player_shoe(state, data) {
            this.state.playerAttribute.shoe = data || initial_shoe;
            vueInstance.$store.commit('set_player_attribute');
        },
        set_player_attribute(state, data) {
            let playerAttribute = this.state.playerAttribute,
                helmet = playerAttribute.helmet,
                weapon = playerAttribute.weapon,
                armor = playerAttribute.armor,
                shoe = playerAttribute.shoe,
                shoulder = playerAttribute.shoulder,
                glove = playerAttribute.glove,
                ring = playerAttribute.ring,
                cape = playerAttribute.cape,
                bracer = playerAttribute.bracer,
                belt = playerAttribute.belt,
                legging = playerAttribute.legging,
                necklace = playerAttribute.necklace,
                entries = [],
                potentials = [];
            if(data != undefined && data.simulate == true) {
                switch (data.equip.itemType) {
                    case 'helmet':
                        helmet = data.equip;
                        break;
                    case 'weapon':
                        weapon = data.equip;
                        break;
                    case 'armor':
                        armor = data.equip;
                        break;
                    case 'shoulder':
                        shoulder = data.equip;
                        break;
                    case 'shoe':
                        shoe = data.equip;
                        break;
                    case 'glove':
                        glove = data.equip;
                        break;
                    case 'ring':
                        ring = data.equip;
                        break;
                    case 'cape':
                       cape = data.equip;
                       break;
                    case 'bracer':
                       bracer = data.equip;
                       break;
                    case 'belt':
                       belt = data.equip;
                       break;
                    case 'legging':
                       legging = data.equip;
                       break;
                    case 'necklace':
                       necklace = data.equip;
                       break;
                    default:
                        break;
                }
            }
            let hpPercent = playerAttribute.attribute.CURHP.value/playerAttribute.attribute.MAXHP.value,
                    mpPercent = playerAttribute.attribute.CURMP.value/playerAttribute.attribute.MAXMP.value;
            let attribute = {};
            let attributes = [
                'MAXHP','CURHP','MAXMP','CURMP','STR','AGI','INT','STA','SPI','ALL','CRIT','CRITDMG','ATK','DEF','DEFRED','BLOCK','AP','APCRIT','APCRITDMG','APPEN','MR','HASTE','HEAL','VERS','VERSBONUS','HP','MP',
                'STRP','AGIP','INTP','STAP','SPIP','ALLP','ATKP','DEFP','BLOCKP','APP','APPENP','MRP','HPP','MPP',
            ];
            let advancedAttributes = ['STR','AGI','INT','STA','SPI','ALL','STRP','AGIP','INTP','STAP','SPIP','ALLP',];
            let normalAttributes = [
                'CRIT','CRITDMG','ATK','DEF','DEFRED','BLOCK','AP','APCRIT','APCRITDMG','APPEN','MR','HASTE','HEAL','VERS','VERSBONUS','HP','MP',
                'ATKP','DEFP','BLOCKP','APP','APPENP','MRP','HPP','MPP',
            ];
            let percent = [
                'STRP','AGIP','INTP','STAP','SPIP','ALLP','CRIT','CRITDMG','APCRIT','APCRITDMG','ATKP','DEFP','BLOCKP','APP','APPENP','MRP','HPP','MPP'
            ];
            let hasPercent = [
                'STR','AGI','INT','STA','SPI','ALL','ATK','DEF','BLOCK','AP','APPEN','MR','HP','MP'
                
            ];
            let advancedAttr = {
                STR: { DEF: 3, BLOCK: 0.5}, 
                AGI: { ATK: 4, CRIT: 0.05}, 
                INT: { AP: 4, APCRIT: 0.1}, 
                STA: { HP: 15}, 
                SPI: { MP: 15}, 
                ALL: { VERS: 1}
            };
            attributes.forEach(attr => {
                let val = this.state.baseAttribute[attr];
                if(this.state.memberAttribute[attr] != undefined)
                    val += this.state.memberAttribute[attr];
                attribute[attr] = { 
                    baseVal: val, 
                    value: val, 
                    showValue: val
                }
            });

            entries = helmet.baseEntry ? entries.concat(helmet.baseEntry, helmet.extraBaseEntry, helmet.extraEntry) : entries;
            entries = weapon.baseEntry ? entries.concat(weapon.baseEntry, weapon.extraBaseEntry, weapon.extraEntry) : entries;
            entries = armor.baseEntry ? entries.concat(armor.baseEntry, armor.extraBaseEntry, armor.extraEntry) : entries;
            entries = shoe.baseEntry ? entries.concat(shoe.baseEntry, shoe.extraBaseEntry, shoe.extraEntry) : entries;
            entries = shoulder.baseEntry ? entries.concat(shoulder.baseEntry, shoulder.extraBaseEntry, shoulder.extraEntry) : entries;
            entries = glove.baseEntry ? entries.concat(glove.baseEntry, glove.extraBaseEntry, glove.extraEntry) : entries;
            entries = ring.baseEntry ? entries.concat(ring.baseEntry, ring.extraBaseEntry, ring.extraEntry) : entries;
            entries = cape.baseEntry ? entries.concat(cape.baseEntry, cape.extraBaseEntry, cape.extraEntry) : entries;
            entries = bracer.baseEntry ? entries.concat(bracer.baseEntry, bracer.extraBaseEntry, bracer.extraEntry) : entries;
            entries = belt.baseEntry ? entries.concat(belt.baseEntry, belt.extraBaseEntry, belt.extraEntry) : entries;
            entries = legging.baseEntry ? entries.concat(legging.baseEntry, legging.extraBaseEntry, legging.extraEntry) : entries;
            entries = necklace.baseEntry ? entries.concat(necklace.baseEntry, necklace.extraBaseEntry, necklace.extraEntry) : entries;

            entries.forEach(entry => {
                attribute[entry.type].baseVal += entry.value;
            });
            potentials = [].concat(weapon.potential, helmet.potential, armor.potential, shoe.potential, shoulder.potential,
                glove.potential, ring.potential, cape.potential, bracer.potential, belt.potential, legging.potential, necklace.potential);

            potentials.forEach(potential => {
                if(potential != undefined && potential.active)
                    attribute[potential.type].baseVal += potential.value;
            });

            attribute['STRP'].baseVal += attribute['ALLP'].baseVal;
            attribute['AGIP'].baseVal += attribute['ALLP'].baseVal;
            attribute['INTP'].baseVal += attribute['ALLP'].baseVal;
            attribute['STAP'].baseVal += attribute['ALLP'].baseVal;
            attribute['SPIP'].baseVal += attribute['ALLP'].baseVal;
            hasPercent.forEach(attr => {
                if(playerAttribute.talent[attr])
                    attribute[attr+'P'].baseVal += playerAttribute.talent[attr]*2;
            });
            ['CRIT', 'CRITDMG'].forEach(attr => {
                if(playerAttribute.talent[attr])
                    attribute[attr].baseVal += playerAttribute.talent[attr]*1;
            });

            advancedAttributes.forEach(attr => {
                if(hasPercent.indexOf(attr) > -1)
                    attribute[attr].value = Math.round(attribute[attr].baseVal*(1+attribute[attr+'P'].baseVal/100));
                else
                    attribute[attr].value = attribute[attr].baseVal;
            });
            attribute['STR'].value += attribute['ALL'].value;
            attribute['AGI'].value += attribute['ALL'].value;
            attribute['INT'].value += attribute['ALL'].value;
            attribute['STA'].value += attribute['ALL'].value;
            attribute['SPI'].value += attribute['ALL'].value;
            for(let adv in advancedAttr) {
                for(let attr in advancedAttr[adv]) {
                    attribute[attr].baseVal += Math.round(advancedAttr[adv][attr]*attribute[adv].value*100)/100;
                }
            }
            
            normalAttributes.forEach(attr => {
                if(hasPercent.indexOf(attr) > -1)
                    attribute[attr].value = Math.round(attribute[attr].baseVal*(1+attribute[attr+'P'].baseVal/100));
                else
                    attribute[attr].value = attribute[attr].baseVal;
            });

            for(let key in attribute) {
                if(percent.indexOf(key) > -1) {
                    attribute[key].showValue = attribute[key].value + '%';
                }
                else
                    attribute[key].showValue = attribute[key].value;
            }
            attribute['MAXHP'].value += attribute['HP'].value;
            attribute['CURHP'].value = Math.floor(hpPercent*attribute['HP'].value);
            attribute['MAXHP'].showValue += attribute['HP'].value;
            attribute['CURHP'].showValue += playerAttribute.attribute['CURHP'].value;
            attribute['MAXMP'].value += attribute['MP'].value;
            attribute['CURMP'].value = Math.floor(mpPercent*attribute['MP'].value);
            attribute['MAXMP'].showValue += attribute['MP'].value;
            attribute['CURMP'].showValue += playerAttribute.attribute['CURMP'].value;
            // attribute['DEFRED'].value = 
            //     Math.round((attribute['DEF'].value/(100+attribute['DEF'].value) + attribute['DEF'].value/(attribute['DEF'].value+3500))/2*10000)/100;
            attribute['DEFRED'].value = 
                Math.round((attribute['DEF'].value/(attribute['DEF'].value+5500))*10000)/100;
            // attribute['DEFRED'].value = Math.round(0.01 * attribute['DEF'].value / (1 + (0.0105 * attribute['DEF'].value))*1000000)/10000;
            // attribute['DEFRED'].value = Math.round(0.01 * attribute['DEF'].value / (1 + (0.01 * attribute['DEF'].value))*10000)/100;
            attribute['DEFRED'].showValue = attribute['DEFRED'].value+'%';
            attribute['VERSBONUS'].value = Math.round(attribute['VERS'].value*4)/100;
            attribute['VERSBONUS'].showValue = attribute['VERSBONUS'].value+'%';
            if(data != undefined && data.simulate == true)
                playerAttribute.simulatedAttribute = attribute;
            else
                playerAttribute.attribute = attribute;
        },  
        // set_player_hp(state, data) {
        //     let CURHP = this.state.playerAttribute.attribute.CURHP,
        //             MAXHP = this.state.playerAttribute.attribute.MAXHP
        //     vueInstance.$store.commit('set_hp', {data, CURHP, MAXHP});
        //     CURHP.showValue = CURHP.value;
        // },
        set_player_mp(state, data) {
            let CURMP = this.state.playerAttribute.attribute.CURMP,
                MAXMP = this.state.playerAttribute.attribute.MAXMP
            if(data == 'full'){
                CURMP.value = MAXMP.value
            }
            else {
                CURMP.value += Number(data);;
                if (CURMP.value > MAXMP.value) {
                    CURMP.value = MAXMP.value;
                }
                else if (CURMP.value <= 0) {
                    CURMP.value = 0;
                }
            }
            CURMP.showValue = CURMP.value;
        },
        set_enemy_attribute(state, data) {
            this.state.enemyAttribute = data;
        },
        set_hp(state, data) {
            let CURHP = data.CURHP,
                MAXHP = data.MAXHP;
            data = data.data;
            if(data == 'full'){
                CURHP.value = MAXHP.value
            }
            else if(data == 'dead'){
                CURHP.value = 0;
            }
            else {
                if(data.toString().indexOf('%') != -1) {
                    let percent = data.substring(0, data.length-1);
                    CURHP.value += Math.round(MAXHP.value*percent*0.01);
                }
                else if(isNaN(data)) {
                    console.log("回血数据传入非数字字符: " +data);
                    console.trace();
                }
                else
                    CURHP.value += Math.round(data);
                if (CURHP.value > MAXHP.value) {
                    CURHP.value = MAXHP.value;
                }
                else if (CURHP.value <= 0) {
                    CURHP.value = 0;
                }
            }
        },
        set_sys_info(state, data) {
            this.state.sysInfo.push(data);
            // let time = +new Date()
            // let date = new Date(time + 8 * 3600 * 1000); // 增加8小时
            // this.state.sysInfo[this.state.sysInfo.length - 1].time = date.toJSON().substr(11, 8).replace('T', ' ')
            if (this.state.sysInfo.length > 50) {
                this.state.sysInfo.shift()
            }
        },
        clear_sys_info(state, data) {
            this.state.sysInfo.splice(0, this.state.sysInfo.length);
        },        
        set_battle_info(state, data) {
            this.state.battleInfo.push(data);
            // let time = +new Date()
            // let date = new Date(time + 8 * 3600 * 1000); // 增加8小时
            // this.state.sysInfo[this.state.sysInfo.length - 1].time = date.toJSON().substr(11, 8).replace('T', ' ')
            if (this.state.battleInfo.length > 50) {
                this.state.battleInfo.shift()
            }
        },
        clear_battle_info(state, data) {
            this.state.battleInfo.splice(0, this.state.battleInfo.length);
        },        
        set_statistic(state, data) {
            for(let k in data) {
                switch(k) {
                    case 'slain':
                        for(let id in data[k]) {
                            if(state.statistic[k][id] == undefined)
                                state.statistic[k][id] = data[k][id];
                            else
                                state.statistic[k][id] += data[k][id];
                        }
                        break;
                    case 'slainBy':
                        if(state.statistic[k] == undefined)
                            state.statistic[k] = {};
                        for(let id in data[k]) {
                            if(state.statistic[k][id] == undefined)
                                state.statistic[k][id] = data[k][id];
                            else
                                state.statistic[k][id] += data[k][id];
                        }
                        break;
                    case 'gameStartDate':
                        if(state.statistic[k] == 0)
                            state.statistic[k] = data[k];
                        break;
                    default:
                        if(state.statistic[k] == undefined)
                            state.statistic[k] = 0;
                        state.statistic[k] += data[k];
                        break;
                }
            }
        },
    },
},

)
