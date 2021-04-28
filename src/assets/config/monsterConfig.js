export const monsterConfig = {
  data() {
    return {
      normal: {
        type: [{
            name: '海的那边',
            // lv: 1,
            attribute: {
                // CURHP: { value: 500, showValue: 500, },
                MAXHP: { value: 100, showValue: 100, },        
                ATK: { value: 10, showValue: 10, },
                DEF: { value: 10, showValue: 10, },
                // DEFRED: { value: 10, showValue: 10, },
                AP: { value: 0, showValue: 0, },
                MR: { value: 0, showValue: 0, },
                CRIT: { value: 100, showValue: 100, },
                CRITDMG: { value: 200, showValue: 200, },
            },
            initSpell: [
              'attack','thunder'
            ],
            tempSpells: {},
          },
        ]
      },
      elite: {
        type: [{
            name: '海的那边',
            // lv: 1,
            attribute: {
                // CURHP: { value: 500, showValue: 500, },
                MAXHP: { value: 1000, showValue: 1000, },        
                ATK: { value: 40, showValue: 40, },
                DEF: { value: 10, showValue: 10, },
                // DEFRED: { value: 10, showValue: 10, },
                AP: { value: 0, showValue: 0, },
                MR: { value: 0, showValue: 0, },
                CRIT: { value: 100, showValue: 100, },
                CRITDMG: { value: 200, showValue: 200, },
            },
            initSpell: [
              'attack','thunder'
            ],
            tempSpells: {},
          },
        ]
      },
      boss: {
        type: [{
            name: '海的那边',
            // lv: 1,
            attribute: {
                // CURHP: { value: 500, showValue: 500, },
                MAXHP: { value: 2000, showValue: 2000, },        
                ATK: { value: 400, showValue: 400, },
                DEF: { value: 100, showValue: 100, },
                // DEFRED: { value: 10, showValue: 10, },
                AP: { value: 0, showValue: 0, },
                MR: { value: 0, showValue: 0, },
                CRIT: { value: 100, showValue: 100, },
                CRITDMG: { value: 200, showValue: 200, },
            },
            initSpell: [
              'attack','thunder'
            ],
            tempSpells: {},
          },
        ]
          
      }
    }
  }
}