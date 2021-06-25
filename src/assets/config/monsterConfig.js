export const monsterConfig = {
    data() {
        return {
            monsterId: {
                '海的那边': 0,
                '训练假人': 1, '高级训练假人': 2, '训练假人精英': 3, '高级训练假人精英': 4,
                '幼年史莱姆':11 , '成年史莱姆':12, '幼年史莱姆精英':13 , '成年史莱姆精英':14, '利姆鲁·特恩佩斯特': 15,
                '哥布林':21 , '长矛哥布林': 22, '哥布林精英':23 , '长矛哥布林精英': 24, '巨人哥布林': 25,
                '豪猪':31, '刚毛豪猪':32 , '豪猪精英':33, '刚毛豪猪精英':34, '野猪王': 35, 
                '硬壳龟':41, '利爪龟':42, '硬壳龟精英':43, '利爪龟精英':44, '杰尼龟': 45,
                '小精灵':51, '微光精灵':52, '小精灵精英':53, '微光精灵精英':54, '精灵女皇': 55,
                '强盗':61, '强盗队长':62, '强盗精英':63, '强盗队长精英':64, '强盗首领': 65,
                '骷髅战士':71, '骷髅射手':72, '骷髅战士精英':73, '骷髅射手精英':74, '俺已自了宫': 75,
                '火蜥蜴': 81, '雷霆蜥蜴': 82, '火蜥蜴精英': 83, '雷霆蜥蜴精英': 84, '科多兽': 85,
                '熊怪': 91,'熊妈': 92, '熊怪精英': 93,'熊妈精英': 94, '鬼神熊': 95,
                '虾兵': 101, '蟹将': 102, '虾兵精英': 103, '蟹将精英': 104, '蛟龙': 105,
            },
            bossName: ['', '利姆鲁·特恩佩斯特', '巨人哥布林', '野猪王', '杰尼龟', '精灵女皇', '强盗首领', '俺已自了宫', '科多兽', '鬼神熊', '蛟龙'],
            monster: [
                {
                    name: '海的那边', 
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
                        MAXHP: { value: 150, showValue: 1000, },        
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
                        MAXHP: { value: 160, showValue: 1000, },        
                        ATK: { value: 16, showValue: 5, },
                        DEF: { value: 10, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, {
                    name: '幼年史莱姆', 
                    template:{
                        MAXHP: { value: 200, showValue: 1000, },        
                        ATK: { value: 16, showValue: 5, },
                        DEF: { value: 0, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 7, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, {
                    name: '成年史莱姆', 
                    template: {
                        MAXHP: { value: 220, showValue: 1000, },        
                        ATK: { value: 17, showValue: 5, },
                        DEF: { value: 0, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 10, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, {
                    name: '哥布林', 
                    template:{
                        MAXHP: { value: 140, showValue: 1000, },        
                        ATK: { value: 10, showValue: 5, },
                        DEF: { value: 1, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 50, showValue: '50%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, {
                    name: '长矛哥布林', 
                    template:{
                        MAXHP: { value: 150, showValue: 800, },        
                        ATK: { value: 14, showValue: 10, },
                        DEF: { value: 2, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 10, showValue: '10%', },
                        CRITDMG: { value: 250, showValue: '400%', },
                    }
                }, 
                {
                    name: '豪猪', 
                    template: {
                        MAXHP: { value: 140, showValue: 800, },        
                        ATK: { value: 14, showValue: 10, },
                        DEF: { value: 3, showValue: 5, },
                        AP: { value: 20, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 5, showValue: '5%', },
                        CRITDMG: { value: 300, showValue: '400%', },
                    }
                }, 
                {
                    name: '刚毛豪猪', 
                    template: {
                        MAXHP: { value: 150, showValue: 800, },        
                        ATK: { value: 16, showValue: 10, },
                        DEF: { value: 4, showValue: 5, },
                        AP: { value: 30, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 5, showValue: '5%', },
                        CRITDMG: { value: 300, showValue: '400%', },
                    }
                }, 
                {
                    name: '硬壳龟', 
                    template: {
                        MAXHP: { value: 120, showValue: 800, },        
                        ATK: { value: 18, showValue: 10, },
                        DEF: { value: 20, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 75, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                {
                    name: '利爪龟', 
                    template: {
                        MAXHP: { value: 140, showValue: 800, },        
                        ATK: { value: 23, showValue: 10, },
                        DEF: { value: 7, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 40, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                {
                    name: '小精灵', 
                    template: {
                        MAXHP: { value: 180, showValue: 800, },        
                        ATK: { value: 0, showValue: 10, },
                        DEF: { value: 0, showValue: 5, },
                        AP: { value: 500, showValue: 0, },
                        MR: { value: 500, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                {
                    name: '微光精灵', 
                    template: {
                        MAXHP: { value: 200, showValue: 800, },        
                        ATK: { value: 0, showValue: 10, },
                        DEF: { value: 0, showValue: 5, },
                        AP: { value: 700, showValue: 0, },
                        MR: { value: 700, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                {
                    name: '强盗', 
                    template: {
                        MAXHP: { value: 240, showValue: 800, },        
                        ATK: { value: 60, showValue: 10, },
                        DEF: { value: 2, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 50, showValue: 0, },
                        CRIT: { value: 20, showValue: '200%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                {
                    name: '强盗队长', 
                    template: {
                        MAXHP: { value: 270, showValue: 800, },        
                        ATK: { value: 65, showValue: 10, },
                        DEF: { value: 4, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 75, showValue: 0, },
                        CRIT: { value: 25, showValue: '25%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                {
                    name: '骷髅战士', 
                    template: {
                        MAXHP: { value: 350, showValue: 800, },        
                        ATK: { value: 110, showValue: 10, },
                        DEF: { value: 2, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 200, showValue: 0, },
                        CRIT: { value: 0, showValue: '20%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                {
                    name: '骷髅射手', 
                    template: {
                        MAXHP: { value: 330, showValue: 800, },        
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
                        MAXHP: { value: 300, showValue: 800, },        
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
                        MAXHP: { value: 320, showValue: 800, },        
                        ATK: { value: 115, showValue: 10, },
                        DEF: { value: 5, showValue: 5, },
                        AP: { value: 300, showValue: 0, },
                        MR: { value: 400, showValue: 0, },
                        CRIT: { value: 0, showValue: '5%', },
                        CRITDMG: { value: 200, showValue: '400%', },
                    }
                }, 
                {
                    name: '熊怪', 
                    template: {
                        MAXHP: { value: 2000, showValue: 800, },        
                        ATK: { value: 155, showValue: 10, },
                        DEF: { value: 0.1, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 0, showValue: '20%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                {
                    name: '熊妈', 
                    template: {
                        MAXHP: { value: 3000, showValue: 800, },        
                        ATK: { value: 165, showValue: 10, },
                        DEF: { value: 0.2, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 0, showValue: '5%', },
                        CRITDMG: { value: 200, showValue: '400%', },
                    }
                }, 
                {
                    name: '虾兵', 
                    template: {
                        MAXHP: { value: 230, showValue: 800, },        
                        ATK: { value: 155, showValue: 10, },
                        DEF: { value: 40, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 50, showValue: '20%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                {
                    name: '蟹将', 
                    template: {
                        MAXHP: { value: 245, showValue: 800, },        
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