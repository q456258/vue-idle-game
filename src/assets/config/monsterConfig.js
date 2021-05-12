export const monsterConfig = {
    data() {
        return {
            name: [
                {name: '海的那边', template:0}, 
                {name: '史莱姆', template:1}, 
                {name: '史莱姆2', template:0}, 
                {name: '史莱姆3', template:1}, 
            ],
            monster: [
                {
                    MAXHP: { value: 2000, showValue: 2000, },        
                    ATK: { value: 60, showValue: 400, },
                    DEF: { value: 100, showValue: 100, },
                    AP: { value: 0, showValue: 0, },
                    MR: { value: 0, showValue: 0, },
                    CRIT: { value: 100, showValue: '100%', },
                    CRITDMG: { value: 200, showValue: '200%', },
                }, {
                    MAXHP: { value: 2000, showValue: 2000, },        
                    ATK: { value: 60, showValue: 400, },
                    DEF: { value: 100, showValue: 100, },
                    AP: { value: 0, showValue: 0, },
                    MR: { value: 0, showValue: 0, },
                    CRIT: { value: 10, showValue: '10%', },
                    CRITDMG: { value: 2000, showValue: '2000%', },
                },
            ]
        }
    }
}