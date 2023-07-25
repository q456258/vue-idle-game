export const monsterConfig = {
    data() {
        return {
            monsterId: {
                '小鸡': 0,
                '训练假人': 1, '高级训练假人': 2, '训练假人精英': 3, '高级训练假人精英': 4, '导师': 5,
                '杂斑野猪':11 , '癞皮山猪':12, '杂斑野猪精英':13 , '癞皮山猪精英':14, '阿迦玛': 15,
                '狗头人矿工':21 , '狗头人地卜师': 22, '狗头人矿工精英':23 , '狗头人地卜师精英': 24, '金牙': 25,
                '河爪豺狼人':31, '黑爪豺狼人':32 , '河爪豺狼人精英':33, '黑爪豺狼人精英':34, '霍格': 35, 
                '盐壳龟':41, '钳嘴龟':42, '盐壳龟精英':43, '钳嘴龟精英':44, '铁背龟': 45,
                '灼热元素':51, '熔岩元素':52, '灼热元素精英':53, '熔岩元素精英':54, '地狱元素': 55,
                '愤怒的鱼人':61, '沙鳞鱼人':62, '愤怒的鱼人精英':63, '沙鳞鱼人精英':64, '咕噜咕拉': 65,
                '巫翼鹰身人':71, '巫翼游荡者':72, '巫翼鹰身人精英':73, '巫翼游荡者精英':74, '塞瑞娜·血羽': 75,
                '火蜥蜴': 81, '雷霆蜥蜴': 82, '火蜥蜴精英': 83, '雷霆蜥蜴精英': 84, '科多兽': 85,
                '黑熊': 91,'冰爪熊': 92, '黑熊精英': 93,'冰爪熊精英': 94, '维斯迦尔': 95,
                '滑壳龙虾人': 101, '巨壳甲壳蟹': 102, '滑壳龙虾人精英': 103, '巨壳甲壳蟹精英': 104, '安戈雷尔': 105,
                '铜矿': 1000, '锡矿': 1001, '银矿': 1002, '铁矿': 1003, '金矿': 1005, '秘银矿': 1006,                 
                '宝藏': 2000
            },
            monsterZone: [
                {
                    name:'晴风村', minLv:0, maxLv:10, imgSrc: './icons/maps/fairbreezeValley.jpg', 
                    monsterList: [0,1,2,3,4,5], weight: [5000,10000,10000,1500,1500,50],
                    harvestList: [], harvestWeight: []
                }, {
                    name:'洛克莫丹', minLv:11, maxLv:20, imgSrc: './icons/maps/LochModan.jpg',
                    monsterList: [11,12,13,14,15,2000], 
                    weight: [10000,10000,2000,2000,180,100],
                    harvestList: [1000,1100,1101,1102],
                    harvestWeight: [100,100,100,100]
                }, {
                    name:'艾尔文森林', minLv:21, maxLv:30, imgSrc: './icons/maps/ElwynnForest.jpg',
                    monsterList: [21,22,23,24,25,2000], 
                    weight: [10000,10000,2000,2000,200,100],
                    harvestList: [1000,1002,1003,1005,1100,1101,1102,1103,1104,1105,1106,1107],
                    harvestWeight: [500,300,400,200,500,500,500,35,35,35,35,35]
                }, {
                    name:'西部荒野', minLv:31, maxLv:40, imgSrc: './icons/maps/Westfall.jpg',
                    monsterList: [31,32,33,34,35,2000], 
                    weight: [10000,10000,2000,2000,200,100],
                    harvestList: [1000,1002,1003,1005,1100,1101,1102,1103,1104,1105,1106,1107],
                    harvestWeight: [500,300,400,200,500,500,500,35,35,35,35,35]
                }, {
                    name:'千针石林', minLv:41, maxLv:50, imgSrc: './icons/maps/ThousandNeedles.jpg',
                    monsterList: [41,42,43,44,45,2000], 
                    weight: [10000,10000,2000,2000,200,100],
                    harvestList: [1000,1002,1003,1005,1100,1101,1102,1103,1104,1105,1106,1107],
                    harvestWeight: [500,300,400,200,500,500,500,35,35,35,35,35]
                }, {
                    name:'灼热峡谷', minLv:51, maxLv:60, imgSrc: './icons/maps/SearingGorge.jpg',
                    monsterList: [51,52,53,54,55,2000], 
                    weight: [10000,10000,2000,2000,200,100],
                    harvestList: [1000,1002,1003,1005,1100,1101,1102,1103,1104,1105,1106,1107],
                    harvestWeight: [500,300,400,200,500,500,500,35,35,35,35,35]
                }, {
                    name:'秘蓝岛', minLv:61, maxLv:70, imgSrc: './icons/maps/AzuremystIsle.jpg',
                    monsterList: [11,12,13,14,15,2000], 
                    weight: [10000,10000,2000,2000,200,100],
                    harvestList: [],
                    harvestWeight: []
                }, {
                    name:'贫瘠之地', minLv:71, maxLv:80, imgSrc: './icons/maps/TheBarrens.jpg',
                    monsterList: [11,12,13,14,15,2000], weight: [10000,10000,2000,2000,200,100],
                    harvestList: [],
                    harvestWeight: []
                }, {
                    name:'杜隆塔尔', minLv:81, maxLv:90, imgSrc: './icons/maps/Durotar.jpg',
                    monsterList: [11,12,13,14,15,2000], weight: [10000,10000,2000,2000,200,100],
                    harvestList: [],
                    harvestWeight: []
                }, {
                    name:'丹莫罗', minLv:91, maxLv:100, imgSrc: './icons/maps/DunMorogh.jpg',
                    monsterList: [11,12,13,14,15,2000], weight: [10000,10000,2000,2000,200,100],
                    harvestList: [],
                    harvestWeight: []
                }, {
                    name:'尘泥沼泽', minLv:101, maxLv:110, imgSrc: './icons/maps/DustwallowMarsh.jpg',
                    monsterList: [11,12,13,14,15,2000], weight: [10000,10000,2000,2000,200,100],
                    harvestList: [],
                    harvestWeight: []
                },
            ],
            bossName: ['导师', '阿迦玛', '金牙', '霍格', '铁背龟', '地狱元素', '咕噜咕拉', '塞瑞娜·血羽', '科多兽', '维斯迦尔', '安戈雷尔'],
            monster: {
                0: {
                    name: '小鸡', type: 'normal', minLv: 0, maxLv: 0,
                    spellCycle: ['attack'], talent: {}, anime: 'chicken.png',
                    template: {  
                        MAXHP: 100, ATK: 15, DEF: 0, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200,  
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                1: {
                    name: '训练假人', type: 'normal', minLv: 1, maxLv: 5,
                    spellCycle: ['attack'], talent: {}, anime: 'trainingDummy1.png',
                    template:{  
                        MAXHP: 220, ATK: 35, DEF: 5, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                2:{
                    name: '高级训练假人', type: 'normal', minLv: 6, maxLv: 10,
                    spellCycle: ['attack'], talent: {}, anime: 'trainingDummy2.png',
                    template:{  
                        MAXHP: 350, ATK: 55, DEF: 20, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                3: {
                    name: '训练假人精英', type: 'elite', minLv: 1, maxLv: 5,
                    spellCycle: ['attack'], talent: {}, anime: 'trainingDummy1.png',
                    template:{  
                        MAXHP: 275, ATK: 45, DEF: 20, BLOCK: 2, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                },  
                4: {
                    name: '高级训练假人精英', type: 'elite', minLv: 6, maxLv: 10,
                    spellCycle: ['attack'], talent: {}, anime: 'trainingDummy2.png',
                    template:{  
                        MAXHP: 425, ATK: 65, DEF: 30, BLOCK: 5, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                5: {
                    name: '导师', type: 'boss', minLv: 10, maxLv: 10,
                    spellCycle: ['attack', 'spell_frost_frostbolt02'], talent: {}, anime: 'trainer.png',
                    template:{  
                        MAXHP: 600, ATK: 80, DEF: 40, BLOCK: 10, AP: 80, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                11: {
                    name: '杂斑野猪', type: 'normal', minLv: 11, maxLv: 15,
                    spellCycle: ['attack'], talent: {}, anime: 'mottledBoar1.png',
                    template:{  
                        MAXHP: 700, ATK: 55, DEF: 50, BLOCK: 5, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 20, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                12: {
                    name: '癞皮山猪', type: 'normal', minLv: 16, maxLv: 20,
                    spellCycle: ['attack'], talent: {}, anime: 'mottledBoar2.png',
                    template:{  
                        MAXHP: 900, ATK: 80, DEF: 70, BLOCK: 5, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 30, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                13: {
                    name: '杂斑野猪精英', type: 'elite', minLv: 11, maxLv: 15,
                    spellCycle: ['attack','attack','spell_magic_polymorphpig','attack','attack','attack','attack','attack'], talent: {}, anime: 'mottledBoar1.png',
                    template:{  
                        MAXHP: 900, ATK: 60, DEF: 50, BLOCK: 10, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 20, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                14: {
                    name: '癞皮山猪精英', type: 'elite', minLv: 16, maxLv: 20,
                    spellCycle: ['attack','ability_hunter_pet_boar','attack','attack'], talent: {}, anime: 'mottledBoar2.png',
                    template:{  
                        MAXHP: 1025, ATK: 85, DEF: 70, BLOCK: 10, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 30, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                15: {
                    name: '阿迦玛', type: 'boss', minLv: 20, maxLv: 20,
                    spellCycle: ['spell_magic_polymorphpig','attack','attack','ability_hunter_pet_boar','attack','attack','ability_hunter_pet_boar','attack'
                        ,'ability_druid_berserk','ability_hunter_pet_boar','ability_hunter_pet_boar','ability_hunter_pet_boar'
                    ], talent: {}, anime: 'agamar.png',
                    template:{  
                        MAXHP: 1250, ATK: 50, DEF: 500, BLOCK: 25, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 30, CRITDMG: 250, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                21: {
                    name: '狗头人矿工', type: 'normal', minLv: 21, maxLv: 25,
                    spellCycle: ['attack'], talent: {}, anime: 'kobold1.png',
                    template:{  
                        MAXHP: 1300, ATK: 130, DEF: 200, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                22: {
                    name: '狗头人地卜师', type: 'normal', minLv: 26, maxLv: 30,
                    spellCycle: ['spell_frost_frostbolt02'], talent: {}, anime: 'kobold2.png',
                    template:{  
                        MAXHP: 1300, ATK: 0, DEF: 100, BLOCK: 0, AP: 80, APCRIT: 100, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                23: {
                    name: '狗头人矿工精英', type: 'elite', minLv: 21, maxLv: 25,
                    spellCycle: ['spell_shadow_vampiricaura','attack','attack','attack','attack'], talent: {}, anime: 'kobold1.png',
                    template:{  
                        MAXHP: 2000, ATK: 175, DEF: 150, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                24: {
                    name: '狗头人地卜师精英', type: 'elite', minLv: 26, maxLv: 30,
                    spellCycle: ['spell_frost_frostbolt02','spell_fire_flamebolt'], talent: {}, anime: 'kobold2.png',
                    template:{  
                        MAXHP: 2500, ATK: 0, DEF: 100, BLOCK: 0, AP: 110, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                25: {
                    name: '金牙', type: 'boss', minLv: 30, maxLv: 30,
                    spellCycle: ['poison_arrow','fireflask','poison_arrow','headbutt','poison_arrow',], talent: {}, anime: 'kobold2.png',
                    template:{  
                        MAXHP: 4000, ATK: 100, DEF: 100, BLOCK: 0, AP: 100, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                31: {
                    name: '河爪豺狼人', type: 'normal', minLv: 31, maxLv: 35,
                    spellCycle: ['attack'], talent: {}, anime: 'riverpawGnoll.png',
                    template:{  
                        MAXHP: 2200, ATK: 150, DEF: 500, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 50, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 10,
                    }
                }, 
                32: {
                    name: '黑爪豺狼人', type: 'normal', minLv: 36, maxLv: 40,
                    spellCycle: ['attack'], talent: {}, anime: 'mudsnoutGnoll.png',
                    template:{  
                        MAXHP: 2800, ATK: 200, DEF: 500, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 50, CRITDMG: 250, HEAL: 0, APPEN: 0, MR: 10,
                    }
                }, 
                33: {
                    name: '河爪豺狼人精英', type: 'elite', minLv: 31, maxLv: 35,
                    spellCycle: ['attack','spell_frost_frostward','attack','attack'], talent: {}, anime: 'riverpawGnoll.png',
                    template:{  
                        MAXHP: 3200, ATK: 180, DEF: 800, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 50, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 15,
                    }
                }, 
                34: {
                    name: '黑爪豺狼人精英', type: 'elite', minLv: 36, maxLv: 40,
                    spellCycle: ['attack','attack','attack','attack','ability_ghoulfrenzy'], talent: {}, anime: 'mudsnoutGnoll.png',
                    template:{  
                        MAXHP: 4000, ATK: 225, DEF: 800, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 50, CRITDMG: 250, HEAL: 0, APPEN: 0, MR: 15,
                    }
                }, 
                35: {
                    name: '霍格', type: 'boss', minLv: 40, maxLv: 40,
                    spellCycle: ['spell_frost_frostward','inv_misc_food_meat_raw_04','attack','attack','ability_ghoulfrenzy','attack','attack'], talent: {}, anime: 'hogger.png',
                    template:{  
                        MAXHP: 7000, ATK: 250, DEF: 1000, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 50, CRITDMG: 250, HEAL: 0, APPEN: 0, MR: 20,
                    } 
                }, 
                41: {
                    name: '盐壳龟', type: 'normal', minLv: 41, maxLv: 45,
                    spellCycle: ['attack'], talent: {}, anime: 'sparkleshell.png',
                    template:{  
                        MAXHP: 4000, ATK: 500, DEF: 5000, BLOCK: 50, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 70,
                    }
                }, 
                42: {
                    name: '钳嘴龟', type: 'normal', minLv: 46, maxLv: 50,
                    spellCycle: ['attack'], talent: {}, anime: 'snapjaw.png',
                    template:{  
                        MAXHP: 4500, ATK: 700, DEF: 2000, BLOCK: 30, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 35,
                    }
                }, 
                43: {
                    name: '盐壳龟精英', type: 'elite', minLv: 41, maxLv: 45,
                    spellCycle: ['attack','attack','attack','ability_vehicle_shellshieldgenerator','attack','attack'], talent: {}, anime: 'sparkleshell.png',
                    template:{  
                        MAXHP: 5000, ATK: 600, DEF: 5000, BLOCK: 50, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 70,
                    }
                }, 
                44: {
                    name: '钳嘴龟精英', type: 'elite', minLv: 46, maxLv: 50,
                    spellCycle: ['attack','attack','ability_creature_disease_01','attack','ability_creature_disease_01'], talent: {}, anime: 'snapjaw.png',
                    template:{  
                        MAXHP: 5500, ATK: 800, DEF: 2000, BLOCK: 30, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 35,
                    }
                }, 
                45: {
                    name: '铁背龟', type: 'boss', minLv: 50, maxLv: 50,
                    spellCycle: ['spell_nature_skinofearth','attack','ability_creature_disease_01','attack','ability_vehicle_shellshieldgenerator',
                        'attack','ability_creature_disease_01','attack','ability_vehicle_shellshieldgenerator'
                        ], talent: {}, anime: 'ironback.png',
                    template:{  
                        MAXHP: 10000, ATK: 1000, DEF: 5000, BLOCK: 50, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 100,
                    }
                }, 
                51: {
                    name: '火元素', type: 'normal', minLv: 51, maxLv: 55,
                    spellCycle: ['spell_frost_frostbolt02'], talent: {}, anime: 'infernoEle.png',
                    template:{  
                        MAXHP: 7000, ATK: 10, DEF: 10, BLOCK: 0, AP: 800, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 150,
                    }
                }, 
                52: {
                    name: '石元素', type: 'normal', minLv: 56, maxLv: 60,
                    spellCycle: ['attack'], talent: {}, anime: 'rockEle.png',
                    template: {  
                        MAXHP: 7000, ATK: 1200, DEF: 8000, BLOCK: 100, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                53: {
                    name: '火元素精英', type: 'elite', minLv: 51, maxLv: 55,
                    spellCycle: ['spell_fire_flameblades','spell_frost_frostbolt02','spell_frost_frostbolt02'], talent: {}, anime: 'infernoEle.png',
                    template:{  
                        MAXHP: 8000, ATK: 10, DEF: 10, BLOCK: 0, AP: 1000, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 150,
                    }
                }, 
                54: {
                    name: '石元素精英', type: 'elite', minLv: 56, maxLv: 60,
                    spellCycle: ['inv_spiritshard_01','attack','attack','attack','attack'], talent: {}, anime: 'rockEle.png',
                    template: {  
                        MAXHP: 8000, ATK: 1200, DEF: 8000, BLOCK: 100, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                55: {
                    name: '熔岩元素', type: 'boss', minLv: 60, maxLv: 60,
                    spellCycle: ['sha_spell_fire_bluehellfire_nightmare','spell_fire_immolation','sha_spell_fire_bluehellfire_nightmare',
                        'sha_spell_fire_bluehellfire_nightmare','sha_spell_fire_bluehellfire_nightmare','spell_fire_immolation',
                        'sha_spell_fire_bluehellfire_nightmare'
                    ], talent: {}, anime: 'magmaEle.png',
                    template: {  
                        MAXHP: 10000, ATK: 1500, DEF: 10000, BLOCK: 200, AP: 1, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 200,
                    }
                }, 
                61: {
                    name: '愤怒的鱼人', type: 'normal', minLv: 61, maxLv: 65,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                62: {
                    name: '沙鳞鱼人', type: 'normal', minLv: 66, maxLv: 70,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                63: {
                    name: '愤怒的鱼人精英', type: 'elite', minLv: 61, maxLv: 65,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                64: {
                    name: '沙鳞鱼人精英', type: 'elite', minLv: 66, maxLv: 70,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                65: {
                    name: '咕噜咕拉', type: 'boss', minLv: 70, maxLv: 70,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                71: {
                    name: '巫翼鹰身人', type: 'normal', minLv: 71, maxLv: 75,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                72: {
                    name: '巫翼游荡者', type: 'normal', minLv: 76, maxLv: 80,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                73: {
                    name: '巫翼鹰身人精英', type: 'elite', minLv: 71, maxLv: 75,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                74: {
                    name: '巫翼游荡者精英', type: 'elite', minLv: 76, maxLv: 80,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                75: {
                    name: '塞瑞娜·血羽', type: 'boss', minLv: 80, maxLv: 80,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                81: {
                    name: '火蜥蜴', type: 'normal', minLv: 81, maxLv: 85,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                82: {
                    name: '雷霆蜥蜴', type: 'normal', minLv: 86, maxLv: 90,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                83: {
                    name: '火蜥蜴精英', type: 'elite', minLv: 81, maxLv: 85,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                84: {
                    name: '雷霆蜥蜴精英', type: 'elite', minLv: 86, maxLv: 90,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                85: {
                    name: '科多兽', type: 'boss', minLv: 90, maxLv: 90,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                91: {
                    name: '黑熊', type: 'normal', minLv: 91, maxLv: 95,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                92: {
                    name: '冰爪熊', type: 'normal', minLv: 96, maxLv: 100,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                93: {
                    name: '黑熊精英', type: 'elite', minLv: 91, maxLv: 95,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                94: {
                    name: '冰爪熊精英', type: 'elite', minLv: 96, maxLv: 100,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                95: {
                    name: '维斯迦尔', type: 'boss', minLv: 100, maxLv: 100,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                101: {
                    name: '滑壳龙虾人', type: 'normal', minLv: 101, maxLv: 105,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                102: {
                    name: '巨壳甲壳蟹', type: 'normal', minLv: 106, maxLv: 110,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                103: {
                    name: '滑壳龙虾人精英', type: 'elite', minLv: 101, maxLv: 105,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                104: {
                    name: '巨壳甲壳蟹精英', type: 'elite', minLv: 106, maxLv: 110,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                105: {
                    name: '安戈雷尔', type: 'boss', minLv: 110, maxLv: 110,
                    spellCycle: ['attack'], talent: {}, anime: '',
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                1000: {
                    name: '铜矿', type: 'mine', minLv: 0, maxLv: 0,
                    spellCycle: [], talent: {'magic_immune': 1, 'mine': 1},
                    template: {  
                        MAXHP: 30, ATK: 1, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                },
                1001: {
                    name: '锡矿', type: 'mine', minLv: 0, maxLv: 0,
                    spellCycle: ['attack'], talent: {'magic_immune': 1, 'mine': 1},
                    template: {  
                        MAXHP: 60, ATK: 1, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                },
                1002: {
                    name: '银矿', type: 'mine', minLv: 0, maxLv: 0,
                    spellCycle: ['attack'], talent: {'magic_immune': 1, 'mine': 1},
                    template: {  
                        MAXHP: 100, ATK: 1, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                },
                1003: {
                    name: '铁矿', type: 'mine', minLv: 0, maxLv: 0,
                    spellCycle: ['attack'], talent: {'magic_immune': 1, 'mine': 1},
                    template: {  
                        MAXHP: 200, ATK: 1, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                },
                1005: {
                    name: '金矿', type: 'mine', minLv: 0, maxLv: 0,
                    spellCycle: ['attack'], talent: {'magic_immune': 1, 'mine': 1},
                    template: {  
                        MAXHP: 300, ATK: 1, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                },
                1006: {
                    name: '秘银矿', type: 'mine', minLv: 0, maxLv: 0,
                    spellCycle: ['attack'], talent: {'magic_immune': 1, 'mine': 1},
                    template: {  
                        MAXHP: 600, ATK: 1, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                },
                1100: {
                    name: '宁神花', type: 'herb', minLv: 0, maxLv: 0,
                },
                1101: {
                    name: '魔皇草', type: 'herb', minLv: 0, maxLv: 0,
                },
                1102: {
                    name: '跌打草', type: 'herb', minLv: 0, maxLv: 0,
                },
                1103: {
                    name: '地根草', type: 'herb', minLv: 0, maxLv: 0,
                },
                1104: {
                    name: '荆棘藻', type: 'herb', minLv: 0, maxLv: 0,
                },
                1105: {
                    name: '雨燕草', type: 'herb', minLv: 0, maxLv: 0,
                },
                1106: {
                    name: '巫妖花', type: 'herb', minLv: 0, maxLv: 0,
                },
                1107: {
                    name: '梦夜草', type: 'herb', minLv: 0, maxLv: 0,
                },
                2000: {
                    name: '宝箱', type: 'chest', minLv: 0, maxLv: 0
                },
            },
            monsterReward: {
                0: [["random_equip_normal_10", 20], ],
                1: [["random_equip_normal_0", 40], ],
                2: [["random_equip_normal_0", 20], ["inv_misc_coin_05", 35, 1, 20], ],
                3: [["random_equip_elite_1", 100], ],
                4: [["random_equip_elite_1", 100], ["inv_misc_coin_05", 35, 10, 40], ],
                5: [["random_equip_4", 100]],
                11: [["random_equip_normal_1", 20], ["inv_misc_coin_05", 50, 14], ["inv_misc_gem_diamond_05", 25], ["inv_misc_gem_diamond_05_bag", 1], 
                    ["inv_misc_enchantedpearla", 1], ],
                12: [["random_equip_normal_1", 20], ["inv_misc_coin_05", 50, 16], ["inv_misc_gem_diamond_05", 30], ["inv_misc_gem_diamond_05_bag", 1], 
                    ["inv_misc_enchantedpearla", 1], ],
                13: [["inv_misc_gem_diamond_05", 100, 1, 3],["random_equip_elite_2", 100], ["inv_misc_coin_05", 35, 75], ["inv_misc_gem_diamond_04", 25, 1, 2], 
                    ["inv_misc_gem_diamond_04_bag", 1], ["inv_misc_enchantedpearla", 5], ],
                14: [["inv_misc_gem_diamond_05", 100, 1, 4],["random_equip_elite_2", 100], ["inv_misc_coin_05", 35, 90], ["inv_misc_gem_diamond_04", 25, 1, 3], 
                    ["inv_misc_gem_diamond_04_bag", 1], ["inv_misc_enchantedpearla", 5], ],
                15: [["random_equip_4", 100], ["inv_misc_gem_diamond_03", 50, 3, 5], ["inv_misc_coin_03", 20, 5], ["inv_misc_gem_diamond_04_bag", 5], ["inv_misc_enchantedpearla_bag", 5],
                    ],
                21: [["random_equip_normal_1", 20], ["inv_misc_coin_05", 100, 17], ["inv_misc_gem_diamond_05", 45], ["inv_ore_copper_01", 10], ["inv_misc_gem_diamond_05_bag", 1], 
                    ["inv_misc_enchantedpearla", 1], ],
                22: [["random_equip_normal_1", 20], ["inv_misc_coin_05", 100, 20], ["inv_misc_gem_diamond_05", 50], ["inv_misc_gem_diamond_05_bag", 1], ["inv_misc_enchantedpearla", 1], 
                    ],
                23: [["inv_misc_gem_diamond_05", 100, 3, 5], ["random_equip_elite_3", 100], ["inv_misc_coin_03", 70, 1], ["inv_ore_copper_01", 30, 1, 5], ["inv_misc_gem_diamond_04", 25, 1, 3], 
                    ["inv_misc_gem_diamond_04_bag", 1], ["inv_misc_enchantedpearla", 5], ],
                24: [["inv_misc_gem_diamond_05", 100, 3, 6], ["random_equip_elite_3", 100], ["inv_misc_coin_03", 80, 1], ["inv_misc_gem_diamond_04", 25, 1, 3], 
                    ["inv_misc_gem_diamond_04_bag", 1], ["inv_misc_enchantedpearla", 5], ],
                25: [["random_equip_6", 100], ["inv_misc_gem_diamond_03", 50, 5, 7], ["inv_misc_coin_04", 20, 3], ["inv_ingot_03", 10, 5], ["racial_dwarf_findtreasure", 5], 
                    ["inv_misc_gem_diamond_04_bag", 5], ["inv_misc_enchantedpearla_bag", 5], ],
                31: [["random_equip_normal_1", 20], ["inv_misc_coin_05", 100, 40], ["inv_misc_gem_diamond_05", 65], ["inv_misc_gem_diamond_05_bag", 1], ["inv_misc_enchantedpearla", 1], ],
                32: [["random_equip_normal_1", 20], ["inv_misc_coin_05", 100, 48], ["inv_misc_gem_diamond_05", 70], ["inv_misc_gem_diamond_05_bag", 1], ["inv_misc_enchantedpearla", 1], ],
                33: [["inv_misc_gem_diamond_05", 100, 6, 8], ["random_equip_elite_4", 100], ["inv_misc_coin_03", 100, 1, 2], ["inv_misc_gem_diamond_04", 25, 2, 3], 
                    ["inv_misc_gem_diamond_04_bag", 1], ["inv_misc_enchantedpearla", 5], ["inv_potion_51", 10, 1, 5], ["inv_potion_72", 10, 1, 5], ["inv_potion_51_recipe", 1], ["inv_potion_72_recipe", 1]],
                34: [["inv_misc_gem_diamond_05", 100, 7, 9], ["random_equip_elite_4", 100], ["inv_misc_coin_03", 100, 2], ["inv_misc_gem_diamond_04", 25, 2, 4], 
                    ["inv_misc_gem_diamond_04_bag", 1], ["inv_misc_enchantedpearla", 5], ["inv_potion_52", 10, 1, 5], ["inv_potion_73", 10, 1, 5], ["inv_potion_52_recipe", 1], ["inv_potion_73_recipe", 1]],
                35: [["random_equip_6", 100], ["inv_misc_gem_diamond_03", 50, 8, 10], ["inv_misc_coin_04", 20, 10], ["inv_misc_gem_diamond_04_bag", 5], ["inv_misc_enchantedpearla_bag", 5],
                    ["inv_potion_160", 10, 10], ["inv_potion_163", 10, 10], ["inv_potion_160_recipe", 1], ["inv_potion_163_recipe", 1]], 
                41: [["random_equip_normal_2", 20], ["inv_misc_coin_03", 75, 1], ["inv_misc_gem_diamond_05", 85], ["inv_misc_gem_diamond_05_bag", 1], ["inv_misc_enchantedpearla", 1], ],
                42: [["random_equip_normal_2", 20], ["inv_misc_coin_03", 90, 1], ["inv_misc_gem_diamond_05", 90], ["inv_misc_gem_diamond_05_bag", 1], ["inv_misc_enchantedpearla", 1], ],
                43: [["inv_misc_gem_diamond_04", 100, 1, 4], ["random_equip_elite_4", 100], ["inv_misc_coin_03", 100, 3], ["inv_misc_gem_diamond_03", 25, 2, 3], 
                    ["inv_misc_gem_diamond_04_bag", 1], ["inv_misc_enchantedpearla", 5], ["inv_potion_44", 10, 1, 5], ["inv_potion_44_recipe", 1]],
                44: [["inv_misc_gem_diamond_04", 100, 1, 5], ["random_equip_elite_4", 100], ["inv_misc_coin_03", 100, 3, 4], ["inv_misc_gem_diamond_03", 25, 2, 4], 
                    ["inv_misc_gem_diamond_04_bag", 1], ["inv_misc_enchantedpearla", 5], ["inv_potion_45", 1, 1, 5], ["inv_potion_45_recipe", 1]],
                45: [["random_equip_6", 100], ["inv_misc_gem_diamond_02", 50, 6, 8], ["inv_misc_coin_01", 10, 1, 2], ["inv_misc_gem_diamond_03_bag", 1], ["inv_misc_gem_diamond_04_bag", 5], 
                    ["inv_misc_enchantedpearla_bag", 5], ["inv_potion_131", 10, 10], ["inv_potion_137", 10, 10], ["inv_potion_131_recipe", 1], ["inv_potion_137_recipe", 1]],
                51: [["random_equip_normal_2", 20], ["inv_misc_coin_03", 100, 1, 2], ["inv_misc_gem_diamond_05", 100], ["inv_misc_gem_diamond_05_bag", 1], ["inv_misc_enchantedpearla", 1], ],
                52: [["random_equip_normal_2", 20], ["inv_misc_coin_03", 100, 2, 4], ["inv_misc_gem_diamond_05", 100], ["inv_misc_gem_diamond_05_bag", 1], ["inv_misc_enchantedpearla", 1], ],
                53: [["inv_misc_gem_diamond_04", 100, 3, 7], ["random_equip_elite_4", 100], ["inv_misc_coin_03", 100, 6], ["inv_misc_gem_diamond_03", 25, 5, 7], 
                    ["inv_misc_gem_diamond_04_bag", 1], ["inv_misc_enchantedpearla", 5], ["inv_potion_53", 10, 1, 5], ["inv_potion_74", 10, 1, 5], ["inv_potion_53_recipe", 1], ["inv_potion_74_recipe", 1]],
                54: [["inv_misc_gem_diamond_04", 100, 5, 10], ["random_equip_elite_4", 100], ["inv_misc_coin_03", 100, 7], ["inv_misc_gem_diamond_03", 25, 7, 9], 
                    ["inv_misc_gem_diamond_04_bag", 1], ["inv_misc_enchantedpearla", 5], ["inv_potion_54", 1, 1, 5], ["inv_potion_75", 1, 1, 5], ["inv_potion_54_recipe", 1], ["inv_potion_75_recipe", 1]],
                55: [["random_equip_6", 100], ["inv_misc_gem_diamond_02", 50, 10, 15], ["inv_misc_coin_01", 10, 2], ["inv_misc_gem_diamond_03_bag", 1], ["inv_misc_gem_diamond_04_bag", 5], 
                    ["inv_misc_enchantedpearla_bag", 5], ["inv_potion_55", 10, 10], ["inv_potion_76", 10, 10], ["inv_potion_142", 5, 10], ["inv_potion_148", 5, 10], ["inv_potion_55_recipe", 1], ["inv_potion_76_recipe", 1], ["inv_potion_142_recipe", 0.5], ["inv_potion_148_recipe", 0.5]],
                1000: [["inv_ore_copper_01", 100, 1, 5], ["inv_misc_coin_05", 25, 20], ["inv_misc_coin_06", 10, 2], ],
                1001: [["inv_ore_tin_01", 100, 1, 5], ],
                1002: [["inv_stone_16", 100, 1, 5], ["inv_misc_coin_03", 5, 5], ["inv_misc_coin_04", 1], ],
                1003: [["inv_ore_iron_01", 100, 1, 5], ],
                1005: [["inv_ore_gold_01", 100, 1, 5], ["inv_misc_coin_01", 1], ["inv_misc_coin_02", 0.05],],
                1006: [["inv_ore_mithril_02", 100, 1, 5], ],
                1100: [["inv_misc_flower_02", 100, 1, 3], ["inv_misc_herb_10", 40], ["inv_misc_herb_03", 20], ["inv_misc_herb_18", 10], ["inv_misc_herb_mountainsilversage", 5], ["inv_misc_herb_blacklotus", 1],],
                1101: [["inv_jewelry_talisman_03", 100, 1, 3], ["inv_misc_herb_10", 40], ["inv_misc_herb_03", 20], ["inv_misc_herb_18", 10], ["inv_misc_herb_mountainsilversage", 5], ["inv_misc_herb_blacklotus", 1],],
                1102: [["inv_misc_herb_01", 100, 1, 3], ["inv_misc_herb_10", 40], ["inv_misc_herb_03", 20], ["inv_misc_herb_18", 10], ["inv_misc_herb_mountainsilversage", 5], ["inv_misc_herb_blacklotus", 1],],
                1103: [["inv_misc_herb_07", 100, 1, 2], ["inv_misc_herb_10", 40], ["inv_misc_herb_03", 20], ["inv_misc_herb_18", 10], ["inv_misc_herb_mountainsilversage", 5], ["inv_misc_herb_blacklotus", 1],],
                1104: [["inv_misc_herb_11", 100, 1, 2], ["inv_misc_herb_10", 40], ["inv_misc_herb_03", 20], ["inv_misc_herb_18", 10], ["inv_misc_herb_mountainsilversage", 5], ["inv_misc_herb_blacklotus", 1],],
                1105: [["inv_misc_herb_04", 100, 1, 2], ["inv_misc_herb_10", 40], ["inv_misc_herb_03", 20], ["inv_misc_herb_18", 10], ["inv_misc_herb_mountainsilversage", 5], ["inv_misc_herb_blacklotus", 1],],
                1106: [["inv_misc_herb_whispervine", 100, 1, 2], ["inv_misc_herb_10", 40], ["inv_misc_herb_03", 20], ["inv_misc_herb_18", 10], ["inv_misc_herb_mountainsilversage", 5], ["inv_misc_herb_blacklotus", 1],],
                1107: [["inv_misc_herb_dreamfoil", 100, 1, 2], ["inv_misc_herb_10", 40], ["inv_misc_herb_03", 20], ["inv_misc_herb_18", 10], ["inv_misc_herb_mountainsilversage", 5], ["inv_misc_herb_blacklotus", 1],],
                2000: [["random_equip_5", 100], ["inv_misc_gem_diamond_02", 40], ],
                

            }
        }
    }
}

