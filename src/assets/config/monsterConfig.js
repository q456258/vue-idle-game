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
                '金矿': 1000, '铜矿': 1001, '锡矿': 1002,
                '宝藏': 2000
            },
            monsterZone: [
                {name:'晴风村', minLv:0, maxLv:10, imgSrc: './icons/maps/fairbreezeValley.jpg', 
                    monsterList: [0,1,2,3,4,5,2000,1000], probability: [5000,10000,10000,1000,1000,50,100,100000]},
                {name:'洛克莫丹', minLv:11, maxLv:20, imgSrc: './icons/maps/LochModan.jpg',
                    monsterList: [11,12,13,14,15,2000], probability: [10000,10000,1000,1000,50,100]},
                {name:'艾尔文森林', minLv:21, maxLv:30, imgSrc: './icons/maps/ElwynnForest.jpg',
                    monsterList: [21,22,23,24,25,2000], probability: [10000,10000,1000,1000,50,100]},
                {name:'西部荒野', minLv:31, maxLv:40, imgSrc: './icons/maps/Westfall.jpg',
                    monsterList: [31,32,33,34,35,2000], probability: [10000,10000,1000,1000,50,100]},
                {name:'千针石林', minLv:41, maxLv:50, imgSrc: './icons/maps/ThousandNeedles.jpg',
                    monsterList: [11,12,13,14,15,2000], probability: [10000,10000,1000,1000,50,100]},
                {name:'灼热峡谷', minLv:51, maxLv:60, imgSrc: './icons/maps/SearingGorge.jpg',
                    monsterList: [11,12,13,14,15,2000], probability: [10000,10000,1000,1000,50,100]},
                {name:'秘蓝岛', minLv:61, maxLv:70, imgSrc: './icons/maps/AzuremystIsle.jpg',
                    monsterList: [11,12,13,14,15,2000], probability: [10000,10000,1000,1000,50,100]},
                {name:'贫瘠之地', minLv:71, maxLv:80, imgSrc: './icons/maps/TheBarrens.jpg',
                    monsterList: [11,12,13,14,15,2000], probability: [10000,10000,1000,1000,50,100]},
                {name:'杜隆塔尔', minLv:81, maxLv:90, imgSrc: './icons/maps/Durotar.jpg',
                    monsterList: [11,12,13,14,15,2000], probability: [10000,10000,1000,1000,50,100]},
                {name:'丹莫罗', minLv:91, maxLv:100, imgSrc: './icons/maps/DunMorogh.jpg',
                    monsterList: [11,12,13,14,15,2000], probability: [10000,10000,1000,1000,50,100]},
                {name:'尘泥沼泽', minLv:101, maxLv:110, imgSrc: './icons/maps/DustwallowMarsh.jpg',
                    monsterList: [11,12,13,14,15,2000], probability: [10000,10000,1000,1000,50,100]},
            ],
            bossName: ['导师', '阿迦玛', '金牙', '霍格', '铁背龟', '地狱元素', '咕噜咕拉', '塞瑞娜·血羽', '科多兽', '维斯迦尔', '安戈雷尔'],
            monster: {
                0: {
                    name: '小鸡', type: 'normal', minLv: 0, maxLv: 0,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 150, ATK: 15, DEF: 0, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200,  
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                1: {
                    name: '训练假人', type: 'normal', minLv: 1, maxLv: 5,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 250, ATK: 17, DEF: 5, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                2:{
                    name: '高级训练假人', type: 'normal', minLv: 6, maxLv: 10,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 400, ATK: 25, DEF: 7, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                3: {
                    name: '训练假人精英', type: 'elite', minLv: 1, maxLv: 5,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 3000, ATK: 20, DEF: 5, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                4: {
                    name: '高级训练假人精英', type: 'elite', minLv: 6, maxLv: 10,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 5000, ATK: 30, DEF: 5, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                5: {
                    name: '导师', type: 'boss', minLv: 10, maxLv: 10,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 20000, ATK: 500, DEF: 20, BLOCK: 20, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                11: {
                    name: '杂斑野猪', type: 'normal', minLv: 11, maxLv: 15,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 500, ATK: 35, DEF: 50, BLOCK: 5, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 20, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                12: {
                    name: '癞皮山猪', type: 'normal', minLv: 16, maxLv: 20,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 700, ATK: 45, DEF: 70, BLOCK: 15, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 20, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                13: {
                    name: '杂斑野猪精英', type: 'elite', minLv: 11, maxLv: 15,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 7000, ATK: 100, DEF: 150, BLOCK: 40, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 20, CRITDMG: 250, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                14: {
                    name: '癞皮山猪精英', type: 'elite', minLv: 16, maxLv: 20,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 9000, ATK: 120, DEF: 500, BLOCK: 50, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 20, CRITDMG: 300, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                15: {
                    name: '阿迦玛', type: 'boss', minLv: 2, maxLv: 20,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 300000, ATK: 500, DEF: 1000, BLOCK: 100, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 30, CRITDMG: 300, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                21: {
                    name: '狗头人矿工', type: 'normal', minLv: 21, maxLv: 25,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 2000, ATK: 70, DEF: 200, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                22: {
                    name: '狗头人地卜师', type: 'normal', minLv: 26, maxLv: 30,
                    spellCycle: ['spell_frost_frostbolt02'],
                    template:{  
                        MAXHP: 2000, ATK: 50, DEF: 100, BLOCK: 0, AP: 100, APCRIT: 100, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                23: {
                    name: '狗头人矿工精英', type: 'elite', minLv: 21, maxLv: 25,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 70, ATK: 10, DEF: 5, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                24: {
                    name: '狗头人地卜师精英', type: 'elite', minLv: 26, maxLv: 30,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 70, ATK: 10, DEF: 5, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                25: {
                    name: '金牙', type: 'boss', minLv: 30, maxLv: 30,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 70, ATK: 10, DEF: 5, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                31: {
                    name: '河爪豺狼人', type: 'normal', minLv: 31, maxLv: 36,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                32: {
                    name: '黑爪豺狼人', type: 'normal', minLv: 36, maxLv: 40,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                33: {
                    name: '河爪豺狼人精英', type: 'elite', minLv: 31, maxLv: 36,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                34: {
                    name: '黑爪豺狼人精英', type: 'elite', minLv: 36, maxLv: 40,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                35: {
                    name: '霍格', type: 'boss', minLv: 40, maxLv: 40,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                41: {
                    name: '盐壳龟', type: 'normal', minLv: 41, maxLv: 46,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                42: {
                    name: '钳嘴龟', type: 'normal', minLv: 46, maxLv: 50,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                43: {
                    name: '盐壳龟精英', type: 'elite', minLv: 41, maxLv: 46,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                45: {
                    name: '铁背龟', type: 'boss', minLv: 50, maxLv: 50,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                51: {
                    name: '灼热元素', type: 'normal', minLv: 51, maxLv: 55,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                52: {
                    name: '熔岩元素', type: 'normal', minLv: 56, maxLv: 60,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                53: {
                    name: '灼热元素精英', type: 'elite', minLv: 51, maxLv: 55,
                    spellCycle: ['attack'],
                    template:{  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                54: {
                    name: '熔岩元素精英', type: 'elite', minLv: 56, maxLv: 60,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                55: {
                    name: '地狱元素', type: 'boss', minLv: 60, maxLv: 60,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                61: {
                    name: '愤怒的鱼人', type: 'normal', minLv: 61, maxLv: 65,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                62: {
                    name: '沙鳞鱼人', type: 'normal', minLv: 66, maxLv: 70,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                63: {
                    name: '愤怒的鱼人精英', type: 'elite', minLv: 61, maxLv: 65,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                64: {
                    name: '沙鳞鱼人精英', type: 'elite', minLv: 66, maxLv: 70,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                65: {
                    name: '咕噜咕拉', type: 'boss', minLv: 70, maxLv: 70,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                71: {
                    name: '巫翼鹰身人', type: 'normal', minLv: 71, maxLv: 75,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                72: {
                    name: '巫翼游荡者', type: 'normal', minLv: 76, maxLv: 80,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                73: {
                    name: '巫翼鹰身人精英', type: 'elite', minLv: 71, maxLv: 75,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                74: {
                    name: '巫翼游荡者精英', type: 'elite', minLv: 76, maxLv: 80,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                75: {
                    name: '塞瑞娜·血羽', type: 'boss', minLv: 80, maxLv: 80,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                81: {
                    name: '火蜥蜴', type: 'normal', minLv: 81, maxLv: 85,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                82: {
                    name: '雷霆蜥蜴', type: 'normal', minLv: 86, maxLv: 90,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                83: {
                    name: '火蜥蜴精英', type: 'elite', minLv: 81, maxLv: 85,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                84: {
                    name: '雷霆蜥蜴精英', type: 'elite', minLv: 86, maxLv: 90,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                85: {
                    name: '科多兽', type: 'boss', minLv: 90, maxLv: 90,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                91: {
                    name: '黑熊', type: 'normal', minLv: 91, maxLv: 95,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                92: {
                    name: '冰爪熊', type: 'normal', minLv: 96, maxLv: 100,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                93: {
                    name: '黑熊精英', type: 'elite', minLv: 91, maxLv: 95,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                94: {
                    name: '冰爪熊精英', type: 'elite', minLv: 96, maxLv: 100,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                95: {
                    name: '维斯迦尔', type: 'boss', minLv: 100, maxLv: 100,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                101: {
                    name: '滑壳龙虾人', type: 'normal', minLv: 101, maxLv: 105,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                102: {
                    name: '巨壳甲壳蟹', type: 'normal', minLv: 106, maxLv: 110,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                103: {
                    name: '滑壳龙虾人精英', type: 'elite', minLv: 101, maxLv: 105,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                104: {
                    name: '巨壳甲壳蟹精英', type: 'elite', minLv: 106, maxLv: 110,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                105: {
                    name: '安戈雷尔', type: 'boss', minLv: 110, maxLv: 110,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 120, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                }, 
                1000: {
                    name: '金矿', type: 'gold', minLv: 0, maxLv: 0,
                    spellCycle: [], talent: {'magic_immune': 1, 'mine': 1},
                    template: {  
                        MAXHP: 800, ATK: 1, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                },
                1001: {
                    name: '铜矿', type: 'mine', minLv: 0, maxLv: 0,
                    spellCycle: ['attack'],
                    template: {  
                        MAXHP: 800, ATK: 1, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                },
                1002: {
                    name: '锡矿', type: 'mine', minLv: 0, maxLv: 0,
                    spellCycle: ['attack'], 
                    template: {  
                        MAXHP: 800, ATK: 1, DEF: 10, BLOCK: 0, AP: 0, APCRIT: 0, APCRITDMG: 200, 
                        CRIT: 0, CRITDMG: 200, HEAL: 0, APPEN: 0, MR: 0,
                    }
                },
                2000: {
                    name: '宝箱', type: 'chest', minLv: 0, maxLv: 0
                },
            },
            monsterReward: {
                0: [['random_equip_10', 50]],
                1: [['random_equip_0', 20], ['bTNMGExchange', 20]],
                2: [['random_equip_0', 20], ['bTNMGExchange', 20]],
                3: [['random_equip_3', 20], ['bossTicket0', 20], ['inv_misc_coin_01', 20]],
                4: [['random_equip_3', 20], ['bossTicket0', 20], ['inv_misc_coin_01', 20]],
                5: [['random_equip_6', 20]],
                11: [['random_equip_0', 20], ['bTNMGExchange', 20], ['inv_misc_gem_diamond_05', 20], ['inv_misc_enchantedpearla', 1]],
                12: [['random_equip_0', 20], ['bTNMGExchange', 20], ['inv_misc_gem_diamond_05', 20], ['inv_misc_enchantedpearla', 1]],
                13: [['random_equip_3', 20], ['inv_misc_gem_diamond_04', 25], ['inv_misc_coin_01', 20], ['inv_misc_note_06', 20], ['bossTicket1', 20], ['inv_misc_enchantedpearla', 1]],
                14: [['random_equip_3', 20], ['inv_misc_gem_diamond_04', 25], ['inv_misc_coin_01', 20], ['inv_misc_note_06', 20], ['bossTicket1', 20], ['inv_misc_enchantedpearla', 1]],
                15: [['random_equip_6', 20], ['inv_misc_gem_diamond_03', 50], ['inv_misc_coin_02', 20], ['inv_misc_enchantedpearla', 1]],
                1000: [['bTNMGExchange', 100]],
                1001: [['inv_ore_copper_01', 100]],
                1001: [['inv_ore_tin_01', 100]],
                2000: [['random_equip_5', 100], ['inv_misc_gem_diamond_02', 40]],

            }
        }
    }
}