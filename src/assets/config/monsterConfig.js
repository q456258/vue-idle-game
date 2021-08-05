export const monsterConfig = {
    data() {
        return {
            monsterId: {
                '小鸡': 0,
                '训练假人': 1, '高级训练假人': 2, '训练假人精英': 3, '高级训练假人精英': 4, '导师': 5,
                '杂斑野猪':11 , '血牙野猪':12, '杂斑野猪精英':13 , '血牙野猪精英':14, '阿迦玛': 15,
                '狗头人矿工':21 , '狗头人地卜师': 22, '狗头人矿工精英':23 , '狗头人地卜师精英': 24, '金牙': 25,
                '河爪豺狼人':31, '黑爪豺狼人':32 , '河爪豺狼人精英':33, '黑爪豺狼人精英':34, '霍格': 35, 
                '盐壳龟':41, '钳嘴龟':42, '盐壳龟精英':43, '钳嘴龟精英':44, '铁背龟': 45,
                '空气之灵':51, '水流之灵':52, '空气之灵精英':53, '水流之灵精英':54, '熔岩元素': 55,
                '愤怒的鱼人':61, '沙鳞鱼人':62, '愤怒的鱼人精英':63, '沙鳞鱼人精英':64, '咕噜咕拉': 65,
                '巫翼鹰身人':71, '巫翼游荡者':72, '巫翼鹰身人精英':73, '巫翼游荡者精英':74, '塞瑞娜·血羽': 75,
                '火蜥蜴': 81, '雷霆蜥蜴': 82, '火蜥蜴精英': 83, '雷霆蜥蜴精英': 84, '科多兽': 85,
                '黑熊': 91,'冰爪熊': 92, '黑熊精英': 93,'冰爪熊精英': 94, '维斯迦尔': 95,
                '滑壳龙虾人': 101, '巨壳甲壳蟹': 102, '滑壳龙虾人精英': 103, '巨壳甲壳蟹精英': 104, '安戈雷尔': 105,
                '金矿': 1000,
                '宝藏': 2000
            },
            templateId: {
                '小鸡': 0,
                '训练假人': 1, '高级训练假人': 2, '训练假人精英': 1, '高级训练假人精英': 2, '导师': 2,
                '杂斑野猪':11 , '癞皮山猪':12, '杂斑野猪精英':11 , '癞皮山猪精英':12, '阿迦玛': 12,
                '狗头人矿工':21 , '狗头人地卜师': 22, '狗头人矿工精英':21 , '狗头人地卜师精英': 22, '金牙': 22,
                '河爪豺狼人':31, '黑爪豺狼人':32 , '河爪豺狼人精英':31, '黑爪豺狼人精英':32, '霍格': 32, 
                '盐壳龟':21, '钳嘴龟':22, '盐壳龟精英':21, '钳嘴龟精英':22, '铁背龟': 22,
                '灼热元素':21, '熔岩元素':22, '灼热元素精英':21, '熔岩元素精英':22, '地狱元素': 22,
                '愤怒的鱼人':61, '沙鳞鱼人':62, '愤怒的鱼人精英':61, '沙鳞鱼人精英':62, '咕噜咕拉': 62,
                '巫翼鹰身人':71, '巫翼游荡者':72, '巫翼鹰身人精英':71, '巫翼游荡者精英':72, '塞瑞娜·血羽': 72,
                '火蜥蜴': 81, '雷霆蜥蜴': 82, '火蜥蜴精英': 81, '雷霆蜥蜴精英': 82, '科多兽': 82,
                '黑熊': 91,'冰爪熊': 92, '黑熊精英': 91,'冰爪熊精英': 92, '维斯迦尔': 92,
                '滑壳龙虾人': 101, '巨壳甲壳蟹': 102, '滑壳龙虾人精英': 101, '巨壳甲壳蟹精英': 102, '安戈雷尔': 102,
                '金矿': 1000
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
            bossName: ['导师', '阿迦玛', '金牙', '霍格', '铁背龟', '熔岩元素', '咕噜咕拉', '塞瑞娜·血羽', '科多兽', '维斯迦尔', '安戈雷尔'],
            monster: {
                0: {
                    name: '小鸡', 
                    template: {
                        MAXHP: { value: 70, showValue: 1000, },        
                        ATK: { value: 10, showValue: 5, },
                        DEF: { value: 5, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                1: {
                    name: '训练假人', 
                    template:{
                        MAXHP: { value: 250, showValue: 1000, },        
                        ATK: { value: 20, showValue: 5, },
                        DEF: { value: 5, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                2:{
                    name: '高级训练假人', 
                    template:{
                        MAXHP: { value: 250, showValue: 1000, },        
                        ATK: { value: 25, showValue: 5, },
                        DEF: { value: 10, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                11: {
                    name: '杂斑野猪', 
                    template:{
                        MAXHP: { value: 160, showValue: 1000, },        
                        ATK: { value: 16, showValue: 5, },
                        DEF: { value: 0, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 7, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                12: {
                    name: '血牙野猪', 
                    template: {
                        MAXHP: { value: 180, showValue: 1000, },        
                        ATK: { value: 17, showValue: 5, },
                        DEF: { value: 0, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 10, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                21: {
                    name: '狗头人矿工', 
                    template:{
                        MAXHP: { value: 110, showValue: 1000, },        
                        ATK: { value: 10, showValue: 5, },
                        DEF: { value: 1, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 50, showValue: '50%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                22: {
                    name: '狗头人地卜师', 
                    template:{
                        MAXHP: { value: 130, showValue: 800, },        
                        ATK: { value: 14, showValue: 10, },
                        DEF: { value: 2, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
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
                        AP: { value: 20, showValue: 0, },
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
                        AP: { value: 30, showValue: 0, },
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
                        AP: { value: 0, showValue: 0, },
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
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 40, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                51: {
                    name: '空气之灵', 
                    template: {
                        MAXHP: { value: 120, showValue: 800, },        
                        ATK: { value: 0, showValue: 10, },
                        DEF: { value: 0, showValue: 5, },
                        AP: { value: 500, showValue: 0, },
                        MR: { value: 500, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                52: {
                    name: '水流之灵', 
                    template: {
                        MAXHP: { value: 150, showValue: 800, },        
                        ATK: { value: 0, showValue: 10, },
                        DEF: { value: 0, showValue: 5, },
                        AP: { value: 700, showValue: 0, },
                        MR: { value: 700, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                61: {
                    name: '愤怒的鱼人', 
                    template: {
                        MAXHP: { value: 120, showValue: 800, },        
                        ATK: { value: 65, showValue: 10, },
                        DEF: { value: 2, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
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
                        AP: { value: 0, showValue: 0, },
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
                        AP: { value: 0, showValue: 0, },
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
                        AP: { value: 0, showValue: 0, },
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
                        AP: { value: 200, showValue: 0, },
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
                        AP: { value: 300, showValue: 0, },
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
                        AP: { value: 0, showValue: 0, },
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
                        AP: { value: 0, showValue: 0, },
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
                        AP: { value: 0, showValue: 0, },
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
                        AP: { value: 0, showValue: 0, },
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
                        AP: { value: 0, showValue: 0, },
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
                11: [['random_equip_0', 100], ['bTNMGExchange', 20], ['inv_misc_enchantedpearla', 10]],
                12: [['random_equip_0', 100], ['bTNMGExchange', 20], ['inv_misc_enchantedpearla', 10]],
                13: [['random_equip_1', 100], ['inv_misc_coin_01', 20], ['inv_misc_note_06', 20], ['bossTicket1', 20], ['inv_misc_enchantedpearla', 10]],
                14: [['random_equip_1', 100], ['inv_misc_coin_01', 20], ['inv_misc_note_06', 20], ['bossTicket1', 20], ['inv_misc_enchantedpearla', 10]],
                15: [['random_equip_3', 100], ['inv_misc_coin_02', 20], ['inv_misc_enchantedpearla', 10]],
                1000: [['bTNMGExchange', 100]],
                2000: [['random_equip_2', 100]],

            }
        }
    }
}