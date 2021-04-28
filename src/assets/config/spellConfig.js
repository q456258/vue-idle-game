export const spellConfig = {
  data() {
    return{
      spell: {
        attack: {
          name: '普通攻击',
          // type: '物理',
          weight: 100,
          des: '普通攻击',
          dmg: {
            ATK: 1,
          }
        },
        thunder: {
          name: '雷霆一击',
          // type: '魔法',
          weight: 10,
          des: '普通攻击',
          dmg: {
            ATK: 1.1,
          }
        },
      },
    }
  },
}