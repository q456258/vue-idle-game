export const monsterConfig = {
    data() {
        return {
            bossName: ['', '利姆鲁·特恩佩斯特', '巨人哥布林', '野猪王', '杰尼龟', '精灵女皇', '山贼头目', '俺已自了宫', '科多兽', '鬼神熊', '蛟龙'],
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
                        MAXHP: { value: 100, showValue: 800, },        
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
                        MAXHP: { value: 120, showValue: 800, },        
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
                        MAXHP: { value: 140, showValue: 800, },        
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
                        MAXHP: { value: 160, showValue: 800, },        
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
                        MAXHP: { value: 220, showValue: 800, },        
                        ATK: { value: 60, showValue: 10, },
                        DEF: { value: 2, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 50, showValue: 0, },
                        CRIT: { value: 20, showValue: '200%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                {
                    name: '强盗头领', 
                    template: {
                        MAXHP: { value: 250, showValue: 800, },        
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
                        MAXHP: { value: 200, showValue: 800, },        
                        ATK: { value: 90, showValue: 10, },
                        DEF: { value: 2, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 100, showValue: 0, },
                        CRIT: { value: 0, showValue: '20%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                {
                    name: '骷髅射手', 
                    template: {
                        MAXHP: { value: 180, showValue: 800, },        
                        ATK: { value: 95, showValue: 10, },
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
                        MAXHP: { value: 250, showValue: 800, },        
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
                        MAXHP: { value: 250, showValue: 800, },        
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
                        MAXHP: { value: 200, showValue: 800, },        
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
                        MAXHP: { value: 225, showValue: 800, },        
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