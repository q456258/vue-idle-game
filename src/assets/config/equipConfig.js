//灰、白、蓝、紫、橙、红
//破旧，普通，精良，完美，史诗，传说
//a1a1a1,D9D9D9,00BBFF,BB00FF,FFBB00,FF0000
export const equipConfig = {
  data() {
    return{
      quality: [{
        name: '破旧',
        qualityCoefficient: 2,
        color: '#a1a1a1',
        extraEntryNum: 1,
      }, {
        name: '普通',
        qualityCoefficient: 1.5,
        color: '#D9D9D9', 
        extraEntryNum: 2,
      }, {
        name: '精良',
        qualityCoefficient: 1.25,
        color: '#00BBFF', 
        extraEntryNum: 3,
      }, {
        name: '完美',
        qualityCoefficient: 1.1,
        color: '#BB00FF', 
        extraEntryNum: 4,
      }, {
        name: '史诗',
        qualityCoefficient: 1,
        color: '#FFBB00', 
        extraEntryNum: 5,
      }, {
        name: '传说',
        qualityCoefficient: 0.95,
        color: '#FF0000', 
        extraEntryNum: 6,
      }],
      type: {
        helmet: '头盔',
        weapon: '武器',
        armor: '盔甲',
        shoe: '鞋子',
        ring: '戒指',
        necklace: '项链',
      },
      entryInfo: {
        STR: { base: 2, name: '力量' }, 
        AGI: { base: 2, name: '敏捷' }, 
        INT: { base: 2, name: '智力' }, 
        ALL: { base: 1, name: '全属性'},
        ATK: { base: 5, name: '攻击' }, 
        DEF: { base: 5, name: '防御' }, 
        AP: { base: 3, name: '元素伤害' }, 
        MR: { base: 3, name: '格挡' }, 
        HP: { base: 20, name: '生命值' }, 
        MP: { base: 10, name: '魔法值' }, 
        CRIT: { base: 5, name: '暴击率' }, 
        CRITDMG: { base: 10, name: '暴击伤害' }, 
        STRP: { base: 6, name: '力量' }, 
        AGIP: { base: 6, name: '敏捷' }, 
        INTP: { base: 6, name: '智力' }, 
        ALLP: { base: 2, name: '全属性'},
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
              desc: '哈皮毛毛',
              iconSrc: "./icons/helmet/INV_Helmet_136.png",
            },
            entry: [
              'STR'
            ],
          },{
            description: {
              name: '哈皮毛毛头盔',
              desc: '哈皮毛毛',
              iconSrc: "./icons/helmet/INV_Helmet_137.png",
            },
            entry: [
              'STR'
            ],
          },{
            description: {
              name: '哈皮毛毛头盔',
              desc: '哈皮毛毛',
              iconSrc: "./icons/helmet/INV_Helmet_138.png",
            },
            entry: [
              'STR'
            ],
          },{
            description: {
              name: '哈皮毛毛头盔',
              desc: '哈皮毛毛',
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
      necklace: {
        baseEntry: [ 
          'MP'
        ],
        extraEntry: [
          'STR','AGI','INT','ALL','CRIT','CRITDMG','ATK','DEF','AP','MR','HP','MP',
        ],
        type: [{
            description: {
              name: '哈皮毛毛挂坠',
              desc: '哈皮毛毛',
              iconSrc: "./icons/Ac_1.png",
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
      weapon: {
        baseEntry: [ 
          'ATK'
        ],
        extraEntry: [
          'STR','AGI','INT','ALL','CRIT','CRITDMG','ATK','DEF','AP','MR','HP','MP',
        ],
        type: [{
            description: {
              name: '测试',
              desc: '哈皮毛毛',
              iconSrc: "./icons/weapon/INV_Axe_75.png",
            },
            entry: [
              'DEF'
            ],
          },{
            description: {
              name: '测试',
              desc: '哈皮毛毛',
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
              desc: '哈皮毛毛',
              iconSrc: "./icons/armor/INV_Chest_Cloth_71.png",
            },
            entry: [
              'INT'
            ],
          },{
            description: {
              name: '萨布拉的征服法衣',
              desc: '哈皮毛毛',
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
              name: '哈皮毛毛连身衣',
              desc: '哈皮毛毛',
              iconSrc: "./icons/shoe/INV_Boots_Leather_01.png",
            },
            entry: [
              'DEF'
            ],
          },{
            description: {
              name: '哈皮毛毛连身衣',
              desc: '哈皮毛毛',
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
      ring: {
        baseEntry: [ 
          'ATK'
        ],
        extraEntry: [
          'STR','AGI','INT','ALL','CRIT','CRITDMG','ATK','DEF','AP','MR','HP','MP',
        ],
        type: [{
            description: {
              name: '守护指环',
              desc: '哈皮毛毛',
              iconSrc: "./icons/ring/Inv_jewelry_ring_02.png",
            },
            entry: [
              'DEF'
            ],
          },{
            description: {
              name: '哈皮毛毛连身衣',
              desc: '哈皮毛毛',
              iconSrc: "./icons/ring/Inv_jewelry_ring_03.png",
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
      }
    }
  },
  methods: {
  }
};