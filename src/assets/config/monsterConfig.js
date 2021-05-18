export const monsterConfig = {
    data() {
        return {
            name: [
                {name: '海的那边', template:0}, 
                {name: '史莱姆1', template:1}, 
                {name: '史莱姆2', template:0}, 
                {name: '史莱姆3', template:1}, 
                {name: '史莱姆21', template:1}, 
                {name: '史莱姆22', template:0}, 
                {name: '史莱姆23', template:1}, 
                {name: '史莱姆31', template:1}, 
                {name: '史莱姆32', template:0}, 
                {name: '史莱姆33', template:1}, 
                {name: '史莱姆41', template:1}, 
                {name: '史莱姆42', template:0}, 
                {name: '史莱姆43', template:1}, 
                {name: '史莱姆51', template:1}, 
                {name: '史莱姆62', template:0}, 
                {name: '史莱姆73', template:1}, 
            ],
            monster: [
                {
                    MAXHP: { value: 500, showValue: 1000, },        
                    ATK: { value: 4, showValue: 5, },
                    DEF: { value: 5, showValue: 5, },
                    AP: { value: 0, showValue: 0, },
                    MR: { value: 0, showValue: 0, },
                    CRIT: { value: 100, showValue: '100%', },
                    CRITDMG: { value: 200, showValue: '200%', },
                }, {
                    MAXHP: { value: 500, showValue: 800, },        
                    ATK: { value: 7, showValue: 10, },
                    DEF: { value: 5, showValue: 5, },
                    AP: { value: 0, showValue: 0, },
                    MR: { value: 0, showValue: 0, },
                    CRIT: { value: 10, showValue: '10%', },
                    CRITDMG: { value: 200, showValue: '200%', },
                },
            ]
        }
    }
}