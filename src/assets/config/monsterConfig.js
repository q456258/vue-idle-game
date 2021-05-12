export const monsterConfig = {
    data() {
        return {
            name: ['海的那边', '史莱姆'],
            monster: {
                name: '海的那边',
                // lv: 1,
                attribute: {
                    // CURHP: { value: 500, showValue: 500, },
                    MAXHP: { value: 2000, showValue: 2000, },        
                    ATK: { value: 60, showValue: 400, },
                    DEF: { value: 100, showValue: 100, },
                    // DEFRED: { value: 10, showValue: 10, },
                    AP: { value: 0, showValue: 0, },
                    MR: { value: 0, showValue: 0, },
                    CRIT: { value: 100, showValue: 100, },
                    CRITDMG: { value: 200, showValue: 200, },
                },

            }
        }
    }
}