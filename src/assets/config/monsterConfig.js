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
                '金矿': 1000,
                '宝藏': 2000
            },
            templateId: {
                0: 0,
                1: 1, 2: 2, 3: 1, 4: 2, 5: 2,
                11: 11, 12: 12, 13: 11, 14: 12, 15: 12,
                21: 21, 22: 22, 23: 21, 24: 22, 25: 22,
                31: 31, 32: 32, 33: 31, 34: 32, 35: 32, 
                41: 41, 42: 42, 43: 41, 44: 42, 45: 42,
                51: 51, 52: 52, 53: 51, 54: 52, 55: 52,
                61: 61, 62: 62, 63: 61, 64: 62, 65: 62,
                71: 71, 72: 72, 73: 71, 74: 72, 75: 72,
                81: 81, 82: 82, 83: 81, 84: 82, 85: 82,
                91: 91, 92: 92, 93: 91, 94: 92, 95: 92,
                101: 101, 102: 102, 103: 101, 104: 102, 105: 102,
                1000: 1000
            },
            monsterZone: [
                {name:'晴风村（下）', minLv:0, maxLv:10, imgSrc: './icons/fairbreezeValley.jpg'},
                {name:'晴风村（上）', minLv:11, maxLv:20, imgSrc: './icons/fairbreezeValley.jpg'},
                {name:'洛克莫丹（下）', minLv:21, maxLv:30, imgSrc: './icons/LochModan.jpg'},
                {name:'洛克莫丹（上）', minLv:31, maxLv:40, imgSrc: './icons/LochModan.jpg'},
                {name:'艾尔文森林（下）', minLv:41, maxLv:50, imgSrc: './icons/ElwynnForest.jpg'},
                {name:'艾尔文森林（上）', minLv:51, maxLv:60, imgSrc: './icons/ElwynnForest.jpg'},
                {name:'西部荒野（下）', minLv:61, maxLv:70, imgSrc: './icons/Westfall.jpg'},
                {name:'西部荒野（上）', minLv:71, maxLv:80, imgSrc: './icons/Westfall.jpg'},
                {name:'千针石林（下）', minLv:81, maxLv:90, imgSrc: './icons/ThousandNeedles.jpg'},
                {name:'千针石林（上）', minLv:91, maxLv:100, imgSrc: './icons/ThousandNeedles.jpg'},
                {name:'灼热峡谷（下）', minLv:101, maxLv:110, imgSrc: './icons/SearingGorge.jpg'},
                {name:'灼热峡谷（上）', minLv:111, maxLv:120, imgSrc: './icons/SearingGorge.jpg'},
                {name:'秘蓝岛（下）', minLv:121, maxLv:130, imgSrc: './icons/AzuremystIsle.jpg'},
                {name:'秘蓝岛（上）', minLv:131, maxLv:140, imgSrc: './icons/AzuremystIsle.jpg'},
                {name:'贫瘠之地（下）', minLv:141, maxLv:150, imgSrc: './icons/TheBarrens.jpg'},
                {name:'贫瘠之地（上）', minLv:151, maxLv:160, imgSrc: './icons/TheBarrens.jpg'},
                {name:'杜隆塔尔（下）', minLv:161, maxLv:170, imgSrc: './icons/Durotar.jpg'},
                {name:'杜隆塔尔（上）', minLv:171, maxLv:180, imgSrc: './icons/Durotar.jpg'},
                {name:'丹莫罗（下）', minLv:181, maxLv:190, imgSrc: './icons/DunMorogh.jpg'},
                {name:'丹莫罗（上）', minLv:191, maxLv:200, imgSrc: './icons/DunMorogh.jpg'},
                {name:'尘泥沼泽（下）', minLv:201, maxLv:210, imgSrc: './icons/DustwallowMarsh.jpg'},
                {name:'尘泥沼泽（上）', minLv:211, maxLv:220, imgSrc: './icons/DustwallowMarsh.jpg'},
            ],
            bossName: ['导师', '阿迦玛', '金牙', '霍格', '铁背龟', '地狱元素', '咕噜咕拉', '塞瑞娜·血羽', '科多兽', '维斯迦尔', '安戈雷尔'],
            monster: {
                0: {
                    name: '小鸡', 
                    template: {
                        MAXHP: { value: 70, showValue: 1000, },        
                        ATK: { value: 10, showValue: 5, },
                        DEF: { value: 5, showValue: 5, },
                        SUNDER: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                1: {
                    name: '训练假人', 
                    template:{
                        MAXHP: { value: 250, showValue: 1000, },        
                        ATK: { value: 16, showValue: 5, },
                        DEF: { value: 5, showValue: 5, },
                        SUNDER: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                2:{
                    name: '高级训练假人', 
                    template:{
                        MAXHP: { value: 280, showValue: 1000, },        
                        ATK: { value: 18, showValue: 5, },
                        DEF: { value: 10, showValue: 5, },
                        SUNDER: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                11: {
                    name: '杂斑野猪', 
                    template:{
                        MAXHP: { value: 300, showValue: 1000, },        
                        ATK: { value: 25, showValue: 5, },
                        DEF: { value: 5, showValue: 5, },
                        SUNDER: { value: 10, showValue: 0, },
                        MR: { value: 7, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                12: {
                    name: '癞皮山猪',   
                    template: {
                        MAXHP: { value: 350, showValue: 1000, },        
                        ATK: { value: 40, showValue: 5, },
                        DEF: { value: 5, showValue: 5, },
                        SUNDER: { value: 0, showValue: 0, },
                        MR: { value: 30, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                21: {
                    name: '狗头人矿工', 
                    template:{
                        MAXHP: { value: 400, showValue: 1000, },        
                        ATK: { value: 30, showValue: 5, },
                        DEF: { value: 10, showValue: 5, },
                        SUNDER: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 50, showValue: '50%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                22: {
                    name: '狗头人地卜师', 
                    template:{
                        MAXHP: { value: 400, showValue: 800, },        
                        ATK: { value: 60, showValue: 10, },
                        DEF: { value: 5, showValue: 5, },
                        SUNDER: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 10, showValue: '10%', },
                        CRITDMG: { value: 250, showValue: '400%', },
                    }
                }, 
                31: {
                    name: '河爪豺狼人', 
                    template: {
                        MAXHP: { value: 100, showValue: 800, },        
                        ATK: { value: 14, showValue: 10, },
                        DEF: { value: 3, showValue: 5, },
                        SUNDER: { value: 20, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 5, showValue: '5%', },
                        CRITDMG: { value: 300, showValue: '400%', },
                    }
                }, 
                32: {
                    name: '黑爪豺狼人', 
                    template: {
                        MAXHP: { value: 120, showValue: 800, },        
                        ATK: { value: 16, showValue: 10, },
                        DEF: { value: 4, showValue: 5, },
                        SUNDER: { value: 30, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 5, showValue: '5%', },
                        CRITDMG: { value: 300, showValue: '400%', },
                    }
                }, 
                41: {
                    name: '盐壳龟', 
                    template: {
                        MAXHP: { value: 80, showValue: 800, },        
                        ATK: { value: 18, showValue: 10, },
                        DEF: { value: 20, showValue: 5, },
                        SUNDER: { value: 0, showValue: 0, },
                        MR: { value: 75, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                42: {
                    name: '钳嘴龟', 
                    template: {
                        MAXHP: { value: 100, showValue: 800, },        
                        ATK: { value: 23, showValue: 10, },
                        DEF: { value: 7, showValue: 5, },
                        SUNDER: { value: 0, showValue: 0, },
                        MR: { value: 40, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                51: {
                    name: '灼热元素', 
                    template: {
                        MAXHP: { value: 120, showValue: 800, },        
                        ATK: { value: 0, showValue: 10, },
                        DEF: { value: 0, showValue: 5, },
                        SUNDER: { value: 100, showValue: 0, },
                        MR: { value: 500, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                52: {
                    name: '熔岩元素', 
                    template: {
                        MAXHP: { value: 150, showValue: 800, },        
                        ATK: { value: 0, showValue: 10, },
                        DEF: { value: 0, showValue: 5, },
                        SUNDER: { value: 100, showValue: 0, },
                        MR: { value: 700, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                61: {
                    name: '愤怒的鱼人', 
                    template: {
                        MAXHP: { value: 500, showValue: 1000, },            
                        ATK: { value: 50, showValue: 10, },
                        DEF: { value: 2, showValue: 5, },
                        SUNDER: { value: 0, showValue: 0, },
                        MR: { value: 50, showValue: 0, },
                        CRIT: { value: 20, showValue: '200%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                62: {
                    name: '沙鳞鱼人', 
                    template: {
                        MAXHP: { value: 145, showValue: 800, },        
                        ATK: { value: 75, showValue: 10, },
                        DEF: { value: 4, showValue: 5, },
                        SUNDER: { value: 0, showValue: 0, },
                        MR: { value: 75, showValue: 0, },
                        CRIT: { value: 25, showValue: '25%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                71: {
                    name: '巫翼鹰身人', 
                    template: {
                        MAXHP: { value: 125, showValue: 800, },        
                        ATK: { value: 110, showValue: 10, },
                        DEF: { value: 2, showValue: 5, },
                        SUNDER: { value: 0, showValue: 0, },
                        MR: { value: 200, showValue: 0, },
                        CRIT: { value: 0, showValue: '20%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                72: {
                    name: '巫翼游荡者', 
                    template: {
                        MAXHP: { value: 115, showValue: 800, },        
                        ATK: { value: 125, showValue: 10, },
                        DEF: { value: 1, showValue: 5, },
                        SUNDER: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 20, showValue: '5%', },
                        CRITDMG: { value: 250, showValue: '400%', },
                    }
                }, 
                81: {
                    name: '火蜥蜴', 
                    template: {
                        MAXHP: { value: 150, showValue: 800, },        
                        ATK: { value: 105, showValue: 10, },
                        DEF: { value: 3, showValue: 5, },
                        SUNDER: { value: 70, showValue: 0, },
                        MR: { value: 300, showValue: 0, },
                        CRIT: { value: 0, showValue: '20%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                82: {
                    name: '雷霆蜥蜴', 
                    template: {
                        MAXHP: { value: 160, showValue: 800, },        
                        ATK: { value: 115, showValue: 10, },
                        DEF: { value: 5, showValue: 5, },
                        SUNDER: { value: 80, showValue: 0, },
                        MR: { value: 400, showValue: 0, },
                        CRIT: { value: 0, showValue: '5%', },
                        CRITDMG: { value: 200, showValue: '400%', },
                    }
                }, 
                91: {
                    name: '黑熊', 
                    template: {
                        MAXHP: { value: 1000, showValue: 800, },        
                        ATK: { value: 155, showValue: 10, },
                        DEF: { value: 0.1, showValue: 5, },
                        SUNDER: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 0, showValue: '20%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                92: {
                    name: '冰爪熊', 
                    template: {
                        MAXHP: { value: 1500, showValue: 800, },        
                        ATK: { value: 165, showValue: 10, },
                        DEF: { value: 0.2, showValue: 5, },
                        SUNDER: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 0, showValue: '5%', },
                        CRITDMG: { value: 200, showValue: '400%', },
                    }
                }, 
                101: {
                    name: '滑壳龙虾人', 
                    template: {
                        MAXHP: { value: 115, showValue: 800, },        
                        ATK: { value: 155, showValue: 10, },
                        DEF: { value: 40, showValue: 5, },
                        SUNDER: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 50, showValue: '20%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                102: {
                    name: '巨壳甲壳蟹', 
                    template: {
                        MAXHP: { value: 125, showValue: 800, },        
                        ATK: { value: 165, showValue: 10, },
                        DEF: { value: 50, showValue: 5, },
                        SUNDER: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 50, showValue: '5%', },
                        CRITDMG: { value: 300, showValue: '400%', },
                    }
                }, 
                1000: {
                    name: '金矿', 
                    template: {
                        MAXHP: { value: 1000, showValue: 1000, },        
                        ATK: { value: 1, showValue: 5, },
                        DEF: { value: 5, showValue: 5, },
                        SUNDER: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                },
            },
            monsterReward: {
                0: [['random_equip_0', 10]],
                1: [['random_equip_0', 100], ['bTNMGExchange', 20]],
                2: [['random_equip_0', 100], ['bTNMGExchange', 20]],
                3: [['random_equip_1', 100], ['bossTicket0', 20], ['inv_misc_coin_01', 20]],
                4: [['random_equip_1', 100], ['bossTicket0', 20], ['inv_misc_coin_01', 20]],
                5: [['random_equip_3', 100]],
                11: [['random_equip_0', 100], ['bTNMGExchange', 20], ['inv_misc_gem_diamond_05', 20], ['inv_misc_enchantedpearla', 1]],
                12: [['random_equip_0', 100], ['bTNMGExchange', 20], ['inv_misc_gem_diamond_05', 20], ['inv_misc_enchantedpearla', 1]],
                13: [['random_equip_1', 100], ['inv_misc_gem_diamond_04', 25], ['inv_misc_coin_01', 20], ['inv_misc_note_06', 20], ['bossTicket1', 20], ['inv_misc_enchantedpearla', 1]],
                14: [['random_equip_1', 100], ['inv_misc_gem_diamond_04', 25], ['inv_misc_coin_01', 20], ['inv_misc_note_06', 20], ['bossTicket1', 20], ['inv_misc_enchantedpearla', 1]],
                15: [['random_equip_3', 100], ['inv_misc_gem_diamond_03', 50], ['inv_misc_coin_02', 20], ['inv_misc_enchantedpearla', 1]],
                1000: [['bTNMGExchange', 100]],
                2000: [['random_equip_2', 100], ['inv_misc_gem_diamond_02', 40]],

            }
        }
    }
}