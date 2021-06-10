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
        shoulder: '肩膀',
        weapon: '武器',
        armor: '盔甲',
        shoe: '鞋子',
        accessory: '饰品',
      },
      entryInfo: {
        STR: { base: 2.5, name: '力量' }, 
        AGI: { base: 2.5, name: '敏捷' }, 
        INT: { base: 2.5, name: '智力' }, 
        ALL: { base: 1, name: '全属性'},
        ATK: { base: 16, name: '攻击' }, 
        DEF: { base: 4, name: '护甲' }, 
        AP: { base: 12, name: '元素伤害' }, 
        MR: { base: 2, name: '格挡' }, 
        HP: { base: 40, name: '生命值' }, 
        MP: { base: 15, name: '魔法值' }, 
        CRIT: { base: 5, name: '暴击率' }, 
        CRITDMG: { base: 15, name: '暴击伤害' }, 
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
              name: '碎魂者兜帽',
              desc: '',
              iconSrc: "./icons/helmet/inv_helm_cloth_revendreth_d_01.png",
            },
            entry: [
              'STR'
            ],
          },{
            description: {
              name: '无面者头盔',
              desc: '',
              iconSrc: "./icons/helmet/INV_Helmet_138.png",
            },
            entry: [
              'AGI'
            ],
          },{
            description: {
              name: '灵风头冠',
              desc: '',
              iconSrc: "./icons/helmet/inv_helmet_70.png",
            },
            entry: [
              'INT'
            ],
          },{
            description: {
              name: '闪电皇冠',
              desc: '',
              iconSrc: "./icons/helmet/inv_helmet_06.png",
            },
            entry: [
              'ALL'
            ],
          },{
            description: {
              name: '欺诈者面具',
              desc: '',
              iconSrc: "./icons/helmet/inv_helmet_73.png",
            },
            entry: [
              'CRIT'
            ],
          },{
            description: {
              name: '凶星头巾',
              desc: '',
              iconSrc: "./icons/helmet/inv_helmet_103.png",
            },
            entry: [
              'CRITDMG'
            ],
          },{
            description: {
              name: '烈焰王冠',
              desc: '',
              iconSrc: "./icons/helmet/inv_helm_circlet_firelands_d_01.png",
            },
            entry: [
              'ATK'
            ],
          },{
            description: {
              name: '希望炽翼',
              desc: '',
              iconSrc: "./icons/helmet/inv_helm_plate_raidpaladin_k_01.png",
            },
            entry: [
              'DEF'
            ],
          },{
            description: {
              name: '虚空之心头冠',
              desc: '',
              iconSrc: "./icons/helmet/inv_helmet_89.png",
            },
            entry: [
              'AP'
            ],
          },{
            description: {
              name: '星界守护者',
              desc: '',
              iconSrc: "./icons/helmet/inv_helmet_leather_raiddruid_q_01.png",
            },
            entry: [
              'MR'
            ],
          },{
            description: {
              name: '熔铸头盔',
              desc: '',
              iconSrc: "./icons/helmet/inv_helmet_08.png",
            },
            entry: [
              'HP'
            ],
          },{
            description: {
              name: '永冬之冠',
              desc: '',
              iconSrc: "./icons/helmet/inv_helm_eternalwinter_d_01.png",
            },
            entry: [
              'MP'
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
              name: '地狱火坠饰',
              desc: '',
              iconSrc: "./icons/accessory/Inv_jewelry_necklace_17.png",
            },
            entry: [
              'STR'
            ],
          },{
            description: {
              name: '叶须指环',
              desc: '',
              iconSrc: "./icons/accessory/Inv_jewelry_ring_37.png",
            },
            entry: [
              'AGI'
            ],
          },{
            description: {
              name: '弧光护符',
              desc: '',
              iconSrc: "./icons/accessory/Inv_jewelry_necklace_11.png",
            },
            entry: [
              'INT'
            ],
          },{
            description: {
              name: '全能戒指',
              desc: '',
              iconSrc: "./icons/accessory/Inv_jewelry_ring_03.png",
            },
            entry: [
              'ALL'
            ],
          },{
            description: {
              name: '豹爪护符',
              desc: '',
              iconSrc: "./icons/accessory/inv_jewelry_necklace_34.png",
            },
            entry: [
              'CRIT'
            ],
          },{
            description: {
              name: '统御坠饰',
              desc: '',
              iconSrc: "./icons/accessory/inv_jewelry_necklace_36.png",
            },
            entry: [
              'CRITDMG'
            ],
          },{
            description: {
              name: '赤红怒火指环',
              desc: '',
              iconSrc: "./icons/accessory/inv_jewelry_ring_65.png",
            },
            entry: [
              'ATK'
            ],
          },{
            description: {
              name: '守护指环',
              desc: '',
              iconSrc: "./icons/accessory/Inv_jewelry_ring_02.png",
            },
            entry: [
              'DEF'
            ],
          },{
            description: {
              name: '循环之戒',
              desc: '',
              iconSrc: "./icons/accessory/inv_jewelry_ring_15.png",
            },
            entry: [
              'AP'
            ],
          },{
            description: {
              name: '统御之戒',
              desc: '',
              iconSrc: "./icons/accessory/inv_jewelry_ring_60.png",
            },
            entry: [
              'MR'
            ],
          },{
            description: {
              name: '魔铁血戒',
              desc: '',
              iconSrc: "./icons/accessory/Inv_jewelry_ring_39.png",
            },
            entry: [
              'HP'
            ],
          },{
            description: {
              name: '黎明勋章',
              desc: '',
              iconSrc: "./icons/accessory/inv_jewelry_amulet_04.png",
            },
            entry: [
              'MP'
            ],
          }
        ],
        unique: [{
            description: {
              name: '先代狂龙战士盔甲',
              desc: '',
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
              name: '燃烧战斧',
              desc: '',
              iconSrc: "./icons/weapon/Inv_axe_02.png",
            },
            entry: [
              'STR'
            ],
          },{
            description: {
              name: '铭银灭愿者短刀',
              desc: '',
              iconSrc: "./icons/weapon/inv_knife_1h_revendrethquest_b_03.png",
            },
            entry: [
              'AGI'
            ],
          },{
            description: {
              name: '奥金尼法杖',
              desc: '',
              iconSrc: "./icons/weapon/inv_staff_14.png",
            },
            entry: [
              'INT'
            ],
          },{
            description: {
              name: '荣耀的召唤',
              desc: '',
              iconSrc: "./icons/weapon/inv_sword_11.png",
            },
            entry: [
              'ALL'
            ],
          },{
            description: {
              name: '玛格汉愤怒指虎',
              desc: '',
              iconSrc: "./icons/weapon/inv_gauntlets_04.png",
            },
            entry: [
              'CRIT'
            ],
          },{
            description: {
              name: '毁灭之刃',
              desc: '',
              iconSrc: "./icons/weapon/Inv_sword_48.png",
            },
            entry: [
              'CRITDMG'
            ],
          },{
            description: {
              name: '日怒长弓',
              desc: '',
              iconSrc: "./icons/weapon/inv_weapon_bow_18.png",
            },
            entry: [
              'ATK'
            ],
          },{
            description: {
              name: '锋利手镰',
              desc: '',
              iconSrc: "./icons/weapon/inv_gauntlets_02.png",
            },
            entry: [
              'DEF'
            ],
          },{
            description: {
              name: '奥尔多灵魂魔杖',
              desc: '',
              iconSrc: "./icons/weapon/inv_wand_05.png",
            },
            entry: [
              'AP'
            ],
          },{
            description: {
              name: '大地守卫者',
              desc: '',
              iconSrc: "./icons/weapon/inv_hammer_10.png",
            },
            entry: [
              'MR'
            ],
          },{
            description: {
              name: '染血刀刃',
              desc: '',
              iconSrc: "./icons/weapon/INV_Axe_75.png",
            },
            entry: [
              'HP'
            ],
          },{
            description: {
              name: '战斗法师的权杖',
              desc: '',
              iconSrc: "./icons/weapon/inv_staff_07.png",
            },
            entry: [
              'MP'
            ],
          }
        ],
        unique: [{
            description: {
              name: '先代狂龙战士盔甲',
              desc: '',
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
            name: '裂心胸铠',
            desc: '',
            iconSrc: "./icons/armor/inv_chest_plate08.png",
          },
          entry: [
            'STR'
          ],
          },{
            description: {
              name: '翡翠胸甲',
              desc: '',
              iconSrc: "./icons/armor/Inv_chest_plate07.png",
            },
            entry: [
              'AGI'
            ],
          },{
            description: {
              name: '奥术烈焰法衣',
              desc: '',
              iconSrc: "./icons/armor/INV_Chest_Cloth_71.png",
            },
            entry: [
              'INT'
            ],
          },{
            description: {
              name: '圣日胸甲',
              desc: '',
              iconSrc: "./icons/armor/inv_chest_plate02.png",
            },
            entry: [
              'ALL'
            ],
          },{
            description: {
              name: '猩红胸甲',
              desc: '',
              iconSrc: "./icons/armor/inv_chest_plate_revendreth_d_01.png",
            },
            entry: [
              'CRIT'
            ],
          },{
            description: {
              name: '凶星长袍',
              desc: '',
              iconSrc: "./icons/armor/inv_chest_cloth_68.png",
            },
            entry: [
              'CRITDMG'
            ],
          },{
            description: {
              name: '熔火巨人',
              desc: '',
              iconSrc: "./icons/armor/inv_chest_plate_raidwarrior_j_01.png",
            },
            entry: [
              'ATK'
            ],
          },{
            description: {
              name: '自律守护者',
              desc: '',
              iconSrc: "./icons/armor/inv_chest_plate_24.png",
            },
            entry: [
              'DEF'
            ],
          },{
            description: {
              name: '虚空之心长袍',
              desc: '',
              iconSrc: "./icons/armor/inv_chest_cloth_62.png",
            },
            entry: [
              'AP'
            ],
          },{
            description: {
              name: '巨兽胸铠',
              desc: '',
              iconSrc: "./icons/armor/inv_chest_plate_23.png",
            },
            entry: [
              'MR'
            ],
          },{
            description: {
              name: '血伤胸铠',
              desc: '',
              iconSrc: "./icons/armor/inv_chest_plate20.png",
            },
            entry: [
              'HP'
            ],
          },{
            description: {
              name: '梅林法袍',
              desc: '',
              iconSrc: "./icons/armor/inv_chest_cloth_75.png",
            },
            entry: [
              'MP'
            ],
          }
        ],
        unique: [{
            description: {
              name: '先代狂龙战士盔甲',
              desc: '',
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
              name: '踏火之靴',
              desc: '',
              iconSrc: "./icons/shoe/INV_Boots_Leather_02.png",
            },
            entry: [
              'STR'
            ],
            },{
              description: {
                name: '永恒混沌软鞋',
                desc: '',
                iconSrc: "./icons/shoe/inv_boot_cloth_raidwarlock_q_01.png",
              },
              entry: [
                'AGI'
              ],
            },{
              description: {
                name: '魔古重靴',
                desc: '',
                iconSrc: "./icons/shoe/inv_boots_plate_raidwarrior_n_01.png",
              },
              entry: [
                'INT'
              ],
            },{
              description: {
                name: '黑曜石战靴',
                desc: '',
                iconSrc: "./icons/shoe/inv_boots_plate_raidwarrior_j_01.png",
              },
              entry: [
                'ALL'
              ],
            },{
              description: {
                name: '坚定净化者战靴',
                desc: '',
                iconSrc: "./icons/shoe/inv_boot_plate_raidpaladin_r_01.png",
              },
              entry: [
                'CRIT'
              ],
            },{
              description: {
                name: '践踏战靴',
                desc: '',
                iconSrc: "./icons/shoe/inv_plate_raidwarriormythic_q_01.png",
              },
              entry: [
                'CRITDMG'
              ],
            },{
              description: {
                name: '天定亡者护胫',
                desc: '',
                iconSrc: "./icons/shoe/Inv_plate_legionraid_d_01boots.png",
              },
              entry: [
                'ATK'
              ],
            },{
              description: {
                name: '皇裔护靴',
                desc: '',
                iconSrc: "./icons/shoe/inv_boots_plate_12.png",
              },
              entry: [
                'DEF'
              ],
            },{
              description: {
                name: '既定命运战靴',
                desc: '',
                iconSrc: "./icons/shoe/inv_boot_plate_raiddeathknight_q_01.png",
              },
              entry: [
                'AP'
              ],
            },{
              description: {
                name: '磐石长靴',
                desc: '',
                iconSrc: "./icons/shoe/inv_boots_mail_06.png",
              },
              entry: [
                'MR'
              ],
            },{
              description: {
                name: '生命使者',
                desc: '',
                iconSrc: "./icons/shoe/inv_boot_inv_leather_raidmonk_s_01.png",
              },
              entry: [
                'HP'
              ],
            },{
              description: {
                name: '基柱之靴',
                desc: '',
                iconSrc: "./icons/shoe/inv_boots_plate_raidpaladin_k_01.png",
              },
              entry: [
                'MP'
              ],
            }
        ],
        unique: [{
            description: {
              name: '先代狂龙战士盔甲',
              desc: '',
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
                name: '獠牙肩甲',
                desc: '',
                iconSrc: "./icons/shoulder/inv_shoulder_plate_garrosh_d_01.png",
              },
              entry: [
                'STR'
              ],
            },{
              description: {
                name: '玛洛恩护肩',
                desc: '',
                iconSrc: "./icons/shoulder/Inv_shoulder_44.png",
              },
              entry: [
                'AGI'
              ],
            },{
              description: {
                name: '灵风衬肩',
                desc: '',
                iconSrc: "./icons/shoulder/inv_shoulder_32.png",
              },
              entry: [
                'INT'
              ],
            },{
              description: {
                name: '月光护肩',
                desc: '',
                iconSrc: "./icons/shoulder/inv_shoulder_02.png",
              },
              entry: [
                'ALL'
              ],
            },{
              description: {
                name: '恐惧之龙肩甲',
                desc: '',
                iconSrc: "./icons/shoulder/inv_shoulder_plate_raiddeathknight_q_01.png",
              },
              entry: [
                'CRIT'
              ],
            },{
              description: {
                name: '凶星衬肩',
                desc: '',
                iconSrc: "./icons/shoulder/inv_shoulder_68.png",
              },
              entry: [
                'CRITDMG'
              ],
            },{
              description: {
                name: '战神肩铠',
                desc: '',
                iconSrc: "./icons/shoulder/Inv_shoulder_54.png",
              },
              entry: [
                'ATK'
              ],
            },{
              description: {
                name: '巨石肩垫',
                desc: '',
                iconSrc: "./icons/shoulder/inv_shoulder_51.png",
              },
              entry: [
                'DEF'
              ],
            },{
              description: {
                name: '虚空之心衬肩',
                desc: '',
                iconSrc: "./icons/shoulder/inv_shoulder_52.png",
              },
              entry: [
                'AP'
              ],
            },{
              description: {
                name: '冥界衬肩',
                desc: '',
                iconSrc: "./icons/shoulder/inv_shoulder_97.png",
              },
              entry: [
                'MR'
              ],
            },{
              description: {
                name: '生命之地护肩',
                desc: '',
                iconSrc: "./icons/shoulder/inv_shoulder_66.png",
              },
              entry: [
                'HP'
              ],
            },{
              description: {
                name: '野性魔法肩甲',
                desc: '',
                iconSrc: "./icons/shoulder/inv_shoulder_33.png",
              },
              entry: [
                'MP'
              ],
            }
        ],
        unique: [{
            description: {
              name: '先代狂龙战士盔甲',
              desc: '',
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