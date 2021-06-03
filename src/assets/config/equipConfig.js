//灰、白、蓝、紫、橙、红
//破旧，普通，精良，完美，史诗，传说
//a1a1a1,D9D9D9,00BBFF,BB00FF,FFBB00,FF0000
//https://wowpedia.fandom.com/wiki/File:Inv_shoulder_09.png
export const equipConfig = {
  data() {
    return{
      quality: [{
        name: '破旧',
        qualityLv: 1,
        qualityCoefficient: 1,
        color: '#a1a1a1',
        extraEntryNum: 1,
      }, {
        name: '普通',
        qualityLv: 2,
        qualityCoefficient: 1,
        color: '#D9D9D9', 
        extraEntryNum: 2,
      }, {
        name: '精良',
        qualityLv: 3,
        qualityCoefficient: 1,
        color: '#00BBFF', 
        extraEntryNum: 3,
      }, {
        name: '完美',
        qualityLv: 4,
        qualityCoefficient: 1,
        color: '#BB00FF', 
        extraEntryNum: 4,
      }, {
        name: '史诗',
        qualityLv: 5,
        qualityCoefficient: 1,
        color: '#FFBB00', 
        extraEntryNum: 5,
      }, {
        name: '传说',
        qualityLv: 6,
        qualityCoefficient: 1,
        color: '#FF0000', 
        extraEntryNum: 6,
      }],
      type: {
        helmet: '头盔',
        weapon: '武器',
        armor: '盔甲',
        shoe: '鞋子',
        shoulder: '肩膀',
        belt: '腰带',
      },
      entryInfo: {
        STR: { base: 2.5, name: '力量' }, 
        AGI: { base: 2.5, name: '敏捷' }, 
        INT: { base: 2.5, name: '智力' }, 
        ALL: { base: 1, name: '全属性'},
        ATK: { base: 16, name: '攻击' }, 
        DEF: { base: 4, name: '护甲' }, 
        AP: { base: 8, name: '元素伤害' }, 
        MR: { base: 2, name: '格挡' }, 
        HP: { base: 40, name: '生命值' }, 
        MP: { base: 15, name: '魔法值' }, 
        CRIT: { base: 5, name: '暴击率' }, 
        CRITDMG: { base: 25, name: '暴击伤害' }, 
        STRP: { base: 6, name: '力量' }, 
        AGIP: { base: 6, name: '敏捷' }, 
        INTP: { base: 6, name: '智力' }, 
        ALLP: { base: 6, name: '全属性'},
        ATKP: { base: 6, name: '攻击力' }, 
        DEFP: { base: 6, name: '防御力' }, 
        APP: { base: 6, name: '元素伤害' }, 
        MRP: { base: 6, name: '格挡' }, 
        HPP: { base: 6, name: '生命值' }, 
        MPP: { base: 6, name: '魔法值' }, 
      },
      entries: [
        'STR','AGI','INT', 'ALL', 'CRIT','CRITDMG','ATK', 'DEF', 'AP', 'MR', 'HP', 'MP', 
      ],
      helmet: {
        baseEntry: [ 
          'HP'
        ],
        extraEntry: [
          'STR','AGI','INT','ALL','CRIT','CRITDMG','ATK','DEF','AP','MR','HP','MP',
        ],
        type: [{
            description: {
              name: '泰坦铸造拯救兜帽',
              desc: '泰坦铸造拯救兜帽',
              iconSrc: "./icons/helmet/INV_Helmet_136.png",
            },
            entry: [
              'STR'
            ],
          },{
            description: {
              name: '刺绣训鹰兜帽',
              desc: '这兜帽是用来让鸟儿在训练时保持镇静的，上面有美丽的刺绣',
              iconSrc: "./icons/helmet/INV_Helmet_137.png",
            },
            entry: [
              'STR'
            ],
          },{
            description: {
              name: '泰坦铸造锁甲统御头盔',
              desc: '泰坦铸造锁甲统御头盔',
              iconSrc: "./icons/helmet/INV_Helmet_138.png",
            },
            entry: [
              'STR'
            ],
          },{
            description: {
              name: '暮光之锤兜帽',
              desc: '暮光之锤兜帽',
              iconSrc: "./icons/helmet/INV_Helmet_139.png",
            },
            entry: [
              'STR'
            ],
          }
        ],
        unique: [{
            description: {
              name: '先代狂龙战士盔甲',
              desc: '先代狂龙战士盔甲',
              iconSrc: "./icons/A_A1.png",
            },
            entry: [
              'DEF','BLOC', 'HP',
            ]
          },
        ],
      },
      accessory: {
        baseEntry: [ 
          'MP'
        ],
        extraEntry: [
          'STR','AGI','INT','ALL','CRIT','CRITDMG','ATK','DEF','AP','MR','HP','MP',
        ],
        type: [{
            description: {
              name: '守护指环',
              desc: '守护指环',
              iconSrc: "./icons/accessory/Inv_jewelry_ring_02.png",
            },
            entry: [
              'DEF'
            ],
          },{
            description: {
              name: '全能戒指',
              desc: '全能戒指',
              iconSrc: "./icons/accessory/Inv_jewelry_ring_03.png",
            },
            entry: [
              'ALL'
            ],
          }
        ],
        unique: [{
            description: {
              name: '先代狂龙战士盔甲',
              desc: '先代狂龙战士盔甲',
              iconSrc: "./icons/A_A1.png",
            },
            entry: [
              'DEF','BLOC', 'HP',
            ]
          },
        ],
      },
      weapon: {
        baseEntry: [ 
          'ATK'
        ],
        extraEntry: [
          'STR','AGI','INT','ALL','CRIT','CRITDMG','ATK','DEF','AP','MR','HP','MP',
        ],
        type: [{
            description: {
              name: '染血刀刃',
              desc: '这把武器的锋刃上还残留着之前激战时留下的血迹',
              iconSrc: "./icons/weapon/INV_Axe_75.png",
            },
            entry: [
              'DEF'
            ],
          },{
            description: {
              name: '狼獾人手斧',
              desc: '狼獾人常用的武器',
              iconSrc: "./icons/weapon/INV_Axe_77.png",
            },
            entry: [
              'DEF'
            ],
          }
        ],
        unique: [{
            description: {
              name: '先代狂龙战士盔甲',
              desc: '先代狂龙战士盔甲',
              type: "鞋子",
              iconSrc: "./icons/A_A1.png",
            },
            entry: [
              'DEF','BLOC', 'HP',
            ]
          },
        ],
      },
      armor: {
        baseEntry: [ 
          'DEF'
        ],
        extraEntry: [
          'STR','AGI','INT','ALL','CRIT','CRITDMG','ATK','DEF','AP','MR','HP','MP',
        ],
        type: [{
            description: {
              name: '奥术烈焰法衣',
              desc: '奥术烈焰法衣',
              iconSrc: "./icons/armor/INV_Chest_Cloth_71.png",
            },
            entry: [
              'INT'
            ],
          },{
            description: {
              name: '萨布拉的征服法衣',
              desc: '萨布拉的征服法衣',
              iconSrc: "./icons/armor/INV_Chest_Cloth_73.png",
            },
            entry: [
              'DEF'
            ],
          }
        ],
        unique: [{
            description: {
              name: '先代狂龙战士盔甲',
              desc: '先代狂龙战士盔甲',
              iconSrc: "./icons/A_A1.png",
            },
            entry: [
              'DEF','BLOC', 'HP',
            ]
          },
        ],
      },
      shoe: {
        baseEntry: [ 
          'DEF'
        ],
        extraEntry: [
          'STR','AGI','INT','ALL','CRIT','CRITDMG','ATK','DEF','AP','MR','HP','MP',
        ],
        type: [{
            description: {
              name: '沉寂足垫',
              desc: '沉寂足垫',
              iconSrc: "./icons/shoe/INV_Boots_Leather_01.png",
            },
            entry: [
              'DEF'
            ],
          },{
            description: {
              name: '踏火之靴',
              desc: '踏火之靴',
              iconSrc: "./icons/shoe/INV_Boots_Leather_02.png",
            },
            entry: [
              'DEF'
            ],
          }
        ],
        unique: [{
            description: {
              name: '先代狂龙战士盔甲',
              desc: '先代狂龙战士盔甲',
              iconSrc: "./icons/A_A1.png",
            },
            entry: [
              'DEF','BLOC', 'HP',
            ]
          },
        ],
      },
      shoulder: {
        baseEntry: [ 
          'ATK'
        ],
        extraEntry: [
          'STR','AGI','INT','ALL','CRIT','CRITDMG','ATK','DEF','AP','MR','HP','MP',
        ],
        type: [{
            description: {
              name: '仿制的少校鬼纹衬肩',
              desc: '仿制的少校鬼纹衬肩',
              iconSrc: "./icons/shoulder/inv_shoulder_23.png",
            },
            entry: [
              'DEF'
            ],
          },{
            description: {
              name: '帆布护肩',
              desc: '帆布护肩',
              iconSrc: "./icons/shoulder/inv_shoulder_09.png",
            },
            entry: [
              'ALL'
            ],
          }
        ],
        unique: [{
            description: {
              name: '先代狂龙战士盔甲',
              desc: '先代狂龙战士盔甲',
              iconSrc: "./icons/A_A1.png",
            },
            entry: [
              'DEF','BLOC', 'HP',
            ]
          },
        ],
      },
    }
  },
  methods: {
  }
};