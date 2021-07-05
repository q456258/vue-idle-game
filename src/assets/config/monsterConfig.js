export const monsterConfig = {
    data() {
        return {
            monsterId: {
                '小鸡': 0,
                '训练假人': 1, '高级训练假人': 2, '训练假人精英': 3, '高级训练假人精英': 4,
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
            },
            bossName: ['', '阿迦玛', '金牙', '霍格', '铁背龟', '熔岩元素', '咕噜咕拉', '塞瑞娜·血羽', '科多兽', '维斯迦尔', '安戈雷尔'],
            monster: [
                {
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
                }, {
                    name: '训练假人', 
                    template:{
                        MAXHP: { value: 120, showValue: 1000, },        
                        ATK: { value: 15, showValue: 5, },
                        DEF: { value: 5, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, {
                    name: '高级训练假人', 
                    template:{
                        MAXHP: { value: 130, showValue: 1000, },        
                        ATK: { value: 16, showValue: 5, },
                        DEF: { value: 10, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, {
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
                }, {
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
                }, {
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
                }, {
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
                {
                    name: '盐壳龟', 
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
                {
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
                {
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
                {
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
                {
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
                {
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
                {
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
                {
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
                {
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
                {
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
                {
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
                {
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
                {
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
                {
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
                {
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
                {
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
            ],
        }
    }
}