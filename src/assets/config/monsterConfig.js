export const monsterConfig = {
    data() {
        return {
            monster: [
                {
                    name: '海的那边', 
                    template: {
                        MAXHP: { value: 50, showValue: 1000, },        
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
                        ATK: { value: 18, showValue: 5, },
                        DEF: { value: 5, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, {
                    name: '高级训练假人', 
                    template:{
                        MAXHP: { value: 150, showValue: 1000, },        
                        ATK: { value: 21, showValue: 5, },
                        DEF: { value: 5, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, {
                    name: '幼年史莱姆', 
                    template:{
                        MAXHP: { value: 200, showValue: 1000, },        
                        ATK: { value: 24, showValue: 5, },
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
                        ATK: { value: 24, showValue: 5, },
                        DEF: { value: 0, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 10, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, {
                    name: '哥布林', 
                    template:{
                        MAXHP: { value: 130, showValue: 1000, },        
                        ATK: { value: 18, showValue: 5, },
                        DEF: { value: 5, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 50, showValue: '50%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, {
                    name: '长矛哥布林', 
                    template:{
                        MAXHP: { value: 150, showValue: 800, },        
                        ATK: { value: 23, showValue: 10, },
                        DEF: { value: 5, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 10, showValue: '10%', },
                        CRITDMG: { value: 400, showValue: '400%', },
                    }
                }, 
                {
                    name: '豪猪', 
                    template: {
                        MAXHP: { value: 150, showValue: 800, },        
                        ATK: { value: 24, showValue: 10, },
                        DEF: { value: 5, showValue: 5, },
                        AP: { value: 20, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 5, showValue: '5%', },
                        CRITDMG: { value: 400, showValue: '400%', },
                    }
                }, 
                {
                    name: '刚毛豪猪', 
                    template: {
                        MAXHP: { value: 160, showValue: 800, },        
                        ATK: { value: 28, showValue: 10, },
                        DEF: { value: 5, showValue: 5, },
                        AP: { value: 40, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 5, showValue: '5%', },
                        CRITDMG: { value: 400, showValue: '400%', },
                    }
                }, 
                {
                    name: '硬壳龟', 
                    template: {
                        MAXHP: { value: 150, showValue: 800, },        
                        ATK: { value: 35, showValue: 10, },
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
                        MAXHP: { value: 150, showValue: 800, },        
                        ATK: { value: 50, showValue: 10, },
                        DEF: { value: 15, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 50, showValue: 0, },
                        CRIT: { value: 0, showValue: '0%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                {
                    name: '小精灵', 
                    template: {
                        MAXHP: { value: 150, showValue: 800, },        
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
                        MAXHP: { value: 170, showValue: 800, },        
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
                        ATK: { value: 65, showValue: 10, },
                        DEF: { value: 5, showValue: 5, },
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
                        ATK: { value: 75, showValue: 10, },
                        DEF: { value: 7, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 75, showValue: 0, },
                        CRIT: { value: 25, showValue: '25%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                {
                    name: '骷髅战士', 
                    template: {
                        MAXHP: { value: 250, showValue: 800, },        
                        ATK: { value: 85, showValue: 10, },
                        DEF: { value: 10, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 100, showValue: 0, },
                        CRIT: { value: 0, showValue: '20%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                {
                    name: '骷髅射手', 
                    template: {
                        MAXHP: { value: 220, showValue: 800, },        
                        ATK: { value: 85, showValue: 10, },
                        DEF: { value: 5, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 0, showValue: 0, },
                        CRIT: { value: 10, showValue: '5%', },
                        CRITDMG: { value: 400, showValue: '400%', },
                    }
                }, 
                {
                    name: '火蜥蜴', 
                    template: {
                        MAXHP: { value: 250, showValue: 800, },        
                        ATK: { value: 85, showValue: 10, },
                        DEF: { value: 10, showValue: 5, },
                        AP: { value: 300, showValue: 0, },
                        MR: { value: 300, showValue: 0, },
                        CRIT: { value: 0, showValue: '20%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                {
                    name: '雷霆蜥蜴', 
                    template: {
                        MAXHP: { value: 250, showValue: 800, },        
                        ATK: { value: 85, showValue: 10, },
                        DEF: { value: 10, showValue: 5, },
                        AP: { value: 500, showValue: 0, },
                        MR: { value: 500, showValue: 0, },
                        CRIT: { value: 0, showValue: '5%', },
                        CRITDMG: { value: 200, showValue: '400%', },
                    }
                }, 
                {
                    name: '熊怪', 
                    template: {
                        MAXHP: { value: 275, showValue: 800, },        
                        ATK: { value: 125, showValue: 10, },
                        DEF: { value: 10, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 100, showValue: 0, },
                        CRIT: { value: 0, showValue: '20%', },
                        CRITDMG: { value: 200, showValue: '200%', },
                    }
                }, 
                {
                    name: '熊妈', 
                    template: {
                        MAXHP: { value: 300, showValue: 800, },        
                        ATK: { value: 140, showValue: 10, },
                        DEF: { value: 10, showValue: 5, },
                        AP: { value: 0, showValue: 0, },
                        MR: { value: 200, showValue: 0, },
                        CRIT: { value: 0, showValue: '5%', },
                        CRITDMG: { value: 200, showValue: '400%', },
                    }
                }, 
            ],
        }
    }
}