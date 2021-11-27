import Vue from 'vue'
import Vuex from 'vuex'
import vueInstance from './main'
Vue.use(Vuex)
//灰、白、蓝、紫、橙、红
//破旧，普通，精良，完美，史诗，传说
//a1a1a1,D9D9D9,00BBFF,BB00FF,FFBB00,FF0000
let initial_helmet = {
        lv: 1,
        lvReq: 1,
        itemType: 'helmet',
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
            name: "村里最好的头盔",
            desc: "",
            type: "头盔",
            iconSrc: "./icons/helmet/Inv_helm_cloth_sunhat_b_01.png",
        },
        baseEntry: [{
            value: 150,
            showVal: "+150",
            type: "HP",
            name: "生命值"
        }],
        extraEntry: [],
        potential: []
    },
    initial_shoe = {
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
            iconSrc: "./icons/shoe/INV_Boots_Leather_01.png",
        },
        baseEntry: [{
            value: 10,
            showVal: "+10",
            type: "CRIT",
            name: "暴击率"
        }],
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
            iconSrc: "./icons/weapon/INV_Axe_75.png",
        },
        baseEntry: [{
            value: 30,
            showVal: "+30",
            type: "ATK",
            name: "攻击"
        }],
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
            name: "村里最好的铠甲",
            desc: "",
            type: "铠甲",
            iconSrc: "./icons/armor/INV_Chest_Cloth_71.png",
        },
        baseEntry: [{
            value: 25,
            showVal: "+25",
            type: "DEF",
            name: "护甲"
        }],
        extraEntry: [],
        potential: []
    },
    initial_accessory = {
        lv: 1,
        lvReq: 1,
        itemType: 'accessory',
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
            name: "村里最好的项链",
            desc: "",
            type: "饰品",
            iconSrc: "./icons/accessory/Inv_jewelry_ring_03.png",
        },
        baseEntry: [{
            value: 3,
            showVal: "+3",
            type: "ALL",
            name: "全属性"
        }],
        extraEntry: [],
        potential: []
    },
    initial_shoulder = {
        lv: 1,
        lvReq: 1,
        itemType: 'shoulder',
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
            name: "村里最好的护肩",
            desc: "",
            type: "肩膀",
            iconSrc: "./icons/shoulder/Inv_shoulder_09.png",
        },
        baseEntry: [{
            value: 10,
            showVal: "+10",
            type: "MR",
            name: "能量盾"
        }],
        extraEntry: [],
        potential: []
    };

export default new Vuex.Store({
    state: {
        needStrengthenEquipment: {}, //设定当前需要强化的装备
        sysInfo: [{
            type: '',
            msg: "欢迎你勇士，点击地图上的副本开始战斗。"
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
            trial: {
                level: 1,
                monsterID: 0,
            }
        },
        guildAttribute: {
            gold: 0,
            crystal: 0,
            guild: {lv: 1},
            train: {lv: 1},
            train2: {lv: 0},
            train3: {lv: 0},
            shop: {lv: 1},
            smith: {lv: 1},
            member: []
        },
        playerAttribute: {
            name: '无名',
            lv: 50,
            // lv: 1,
            type: 'player',
            exp: {cur: 0, req: 400},
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
                ALL: { baseVal: 0, value: 0, showbaseVal: 0},
                ATK: { baseVal: 0, value: 5, showbaseVal: 0},
                DEF: { baseVal: 0, value: 0, showbaseVal: 0},
                DEFRED: { baseVal: 0, value: 0, showbaseVal: 0},
                SUNDER: { baseVal: 0, value: 0, showbaseVal: 0},
                SUNDERRED: { baseVal: 0, value: 0, showbaseVal: 0},
                MR: { baseVal: 0, value: 0, showbaseVal: 0},
                CRIT: { baseVal: 0, value: 0, showbaseVal: 0},
                CRITDMG: { baseVal: 0, value: 150, showbaseVal: 0},
                STRP: { baseVal: 0, value: 0, showbaseVal: 0},
                AGIP: { baseVal: 0, value: 0, showbaseVal: 0},
                INTP: { baseVal: 0, value: 0, showbaseVal: 0},
                ALLP: { baseVal: 0, value: 0, showbaseVal: 0},
                HPP: { baseVal: 0, value: 0, showbaseVal: 0},
                MPP: { baseVal: 0, value: 0, showbaseVal: 0},
                ATKP: { baseVal: 0, value: 0, showbaseVal: 0},
                DEFP: { baseVal: 0, value: 0, showbaseVal: 0},
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
            // talentPoint: 1,
            talentPoint: 100,
            helmet: initial_helmet,
            weapon: initial_weapon,
            armor: initial_armor,
            shoulder: initial_shoulder,
            accessory: initial_accessory,
            shoe: initial_shoe,
        },
        trialAttribute: {
            name: "小鸡",
            lv: 1,
            attribute: {
                CURHP: { value: 0, showValue: 0, },
                MAXHP: { value: 0, showValue: 0, },                
                ATK: { value: 0, showValue: 0, },
                DEF: { value: 0, showValue: 0, },
                DEFRED: { value: 0, showValue: 0, },
                SUNDER: { value: 0, showValue: 0, },
                SUNDERRED: { value: 0, showValue: 0, },
                MR: { value: 0, showValue: 0, },
                CRIT: { value: 0, showValue: 0, },
                CRITDMG: { value: 200, showValue: 200, },
            },
        },
        enermyAttribute: {
            name: "小鸡",
            lv: 0,
            attribute: {
                CURHP: { value: 0, showValue: 0, },
                MAXHP: { value: 0, showValue: 0, },                
                ATK: { value: 0, showValue: 0, },
                DEF: { value: 0, showValue: 0, },
                DEFRED: { value: 0, showValue: 0, },
                SUNDER: { value: 0, showValue: 0, },
                SUNDERRED: { value: 0, showValue: 0, },
                MR: { value: 0, showValue: 0, },
                CRIT: { value: 0, showValue: 0, },
                CRITDMG: { value: 0, showValue: 0, },
            },
        },             
        baseAttribute: {
            CURHP: 0,
            MAXHP: 0,
            CURMP: 0,
            MAXMP: 0,
            HP: 100,
            MP: 100,
            STR: 0,
            AGI: 0,
            INT: 0,
            ALL: 0,
            ATK: 10,
            DEF: 0,
            DEFRED: 0,
            SUNDER: 0,
            MR: 0,
            CRIT: 0,
            CRITDMG: 150,
            STRP: 0,
            AGIP: 0,
            INTP: 0,
            ALLP: 0,
            HPP: 0,
            MPP: 0,
            ATKP: 0,
            DEFP: 0,
            MRP: 0,
        },    
        memberAttribute: {
            CURHP: 0,
            MAXHP: 0,
            CURMP: 0,
            MAXMP: 0,
            HP: 0,
            MP: 0,
            STR: 0,
            AGI: 0,
            INT: 0,
            ALL: 0,
            ATK: 0,
            DEF: 0,
            DEFRED: 0,
            SUNDER: 0,
            MR: 0,
            CRIT: 0,
            CRITDMG: 0,
            STRP: 0,
            AGIP: 0,
            INTP: 0,
            ALLP: 0,
            HPP: 0,
            MPP: 0,
            ATKP: 0,
            DEFP: 0,
            MRP: 0,
        },
        setting: {
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
        set_player_helmet(state, data) {
            this.state.playerAttribute.helmet = data || initial_helmet;
            vueInstance.$store.commit('set_player_attribute');
        },
        set_player_accessory(state, data) {
            this.state.playerAttribute.accessory = data || initial_accessory;
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
                accessory = playerAttribute.accessory,
                weapon = playerAttribute.weapon,
                armor = playerAttribute.armor,
                shoe = playerAttribute.shoe,
                shoulder = playerAttribute.shoulder,
                entries = [],
                potentials = [];
            if(data != undefined && data.simulate == true) {
                switch (data.equip.itemType) {
                    case 'helmet':
                        helmet = data.equip;
                        break;
                    case 'accessory':
                        accessory = data.equip;
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
                    default:
                        break;
                }
            }
            let hpPercent = playerAttribute.attribute.CURHP.value/playerAttribute.attribute.MAXHP.value,
                    mpPercent = playerAttribute.attribute.CURMP.value/playerAttribute.attribute.MAXMP.value;
            let attribute = {};
            let attributes = [
                'MAXHP','CURHP','MAXMP','CURMP','STR','AGI','INT','ALL','CRIT','CRITDMG','ATK','DEF','DEFRED','SUNDER','SUNDERRED','MR','HP','MP',
                'STRP','AGIP','INTP','ALLP','ATKP', 'MRP','DEFP','HPP','MPP',
            ];
            let advancedAttributes = ['STR','AGI','INT','ALL','STRP','AGIP','INTP','ALLP',];
            let normalAttributes = [
                'CRIT','CRITDMG','ATK','DEF','DEFRED','SUNDER','MR','HP','MP',
                'ATKP', 'MRP','DEFP','HPP','MPP',
            ];
            let percent = [
                'STRP','AGIP','INTP','ALLP','CRIT','CRITDMG','ATKP','DEFP','MRP','HPP','MPP'
            ];
            let hasPercent = [
                'STR','AGI','INT','ALL','ATK','DEF','MR','HP','MP'
            ];
            let advancedAttr = {
                STR: { HP: 10}, 
                AGI: { ATK: 4, DEF: 1}, 
                INT: { MP: 3, MR: 3 }, 
            };
            attributes.forEach(attr => {
                attribute[attr] = { 
                    baseVal: this.state.baseAttribute[attr] + this.state.memberAttribute[attr], 
                    value: this.state.baseAttribute[attr] + this.state.memberAttribute[attr], 
                    showValue: this.state.baseAttribute[attr] + this.state.memberAttribute[attr]}
            });

            entries = helmet.baseEntry ? entries.concat(helmet.baseEntry, helmet.extraEntry) : entries;
            entries = weapon.baseEntry ? entries.concat(weapon.baseEntry, weapon.extraEntry) : entries;
            entries = accessory.baseEntry ? entries.concat(accessory.baseEntry, accessory.extraEntry) : entries;
            entries = armor.baseEntry ? entries.concat(armor.baseEntry, armor.extraEntry) : entries;
            entries = shoe.baseEntry ? entries.concat(shoe.baseEntry, shoe.extraEntry) : entries;
            entries = shoulder.baseEntry ? entries.concat(shoulder.baseEntry, shoulder.extraEntry) : entries;

            entries.forEach(entry => {
                attribute[entry.type].baseVal += entry.value;
            });
            potentials = [].concat(weapon.potential, helmet.potential, 
                                                    accessory.potential, armor.potential, 
                                                    shoe.potential, shoulder.potential);

            potentials.forEach(potential => {
                if(potential != undefined && potential.active)
                    attribute[potential.type].baseVal += potential.value;
            });

            attribute['STRP'].baseVal += attribute['ALLP'].baseVal;
            attribute['AGIP'].baseVal += attribute['ALLP'].baseVal;
            attribute['INTP'].baseVal += attribute['ALLP'].baseVal;
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
            for(let adv in advancedAttr) {
                for(let attr in advancedAttr[adv]) {
                    attribute[attr].baseVal += advancedAttr[adv][attr]*attribute[adv].value;
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
            attribute['DEFRED'].value = 
                Math.round((attribute['DEF'].value/(100+attribute['DEF'].value) + attribute['DEF'].value/(attribute['DEF'].value+3500))/2*1000000)/10000;
            // attribute['DEFRED'].value = Math.round(0.01 * attribute['DEF'].value / (1 + (0.0105 * attribute['DEF'].value))*1000000)/10000;
            // attribute['DEFRED'].value = Math.round(0.01 * attribute['DEF'].value / (1 + (0.01 * attribute['DEF'].value))*10000)/100;
            attribute['SUNDERRED'].value = 
                Math.round((attribute['SUNDER'].value/(100+attribute['SUNDER'].value)*100));
            attribute['SUNDERRED'].showValue = attribute['SUNDERRED'].value+'%';
            attribute['DEFRED'].showValue = attribute['DEFRED'].value+'%';
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
        set_enermy_attribute(state, data) {
            if(this.state.dungeonInfo.current == 'trial')
                this.state.trialAttribute = data;
            else
                this.state.enermyAttribute = data;
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
