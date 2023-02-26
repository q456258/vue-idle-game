//灰、白、蓝、紫、橙、红
//破旧, 普通, 精良, 完美, 史诗, 传说
//a1a1a1,D9D9D9,00BBFF,BB00FF,FFBB00,FF0000
//https://wowpedia.fandom.com/wiki/death_knight?file=inv_shoulder_09.jpg
//https://wowpedia.fandom.com/wiki/Wowpedia:Warcraft_III_icons
export const equipConfig = {
  data() {
    return{
      quality: [{
        name: '贫乏',
        qualityLv: 1,
        qualityCoefficient: 0.9,
        color: '#9D9D9D',
        extraEntryNum: 0,
      }, {
        name: '普通',
        qualityLv: 2,
        qualityCoefficient: 1,
        color: '#D9D9D9',
        extraEntryNum: 1,
      }, {
        name: '罕见',
        qualityLv: 3,
        qualityCoefficient: 1.15,
        color: '#1EFF00',
        extraEntryNum: 2,
      }, {
        name: '稀有',
        qualityLv: 4,
        qualityCoefficient: 1.3,
        color: '#0070DD',
        extraEntryNum: 3,
      }, {
        name: '史诗',
        qualityLv: 5,
        qualityCoefficient: 1.5,
        color: '#9345FF',
        extraEntryNum: 4,
      }, {
        name: '传奇',
        qualityLv: 6,
        qualityCoefficient: 1.75,
        color: '#FF8000',
        extraEntryNum: 5,
      }, 
      // {
      //   name: '神器',
      //   qualityLv: 7,
      //   qualityCoefficient: 2,
      //   color: '#E5CC80',
      //   extraEntryNum: 5,
      // }
    ],
      type: {
        helmet: '头盔',
        shoulder: '肩膀',
        weapon: '武器',
        armor: '盔甲',
        shoe: '鞋子',
        glove: '手部',
        ring: '戒指',
        cape: '背部',
        bracer: '手腕',
        belt: '腰带',
        legging: '腿部',
        necklace: '项链'
      },
      equipMod: {
        helmet: 1,
        shoulder: 0.74,
        weapon: 1,
        armor: 1,
        shoe: 0.74,
        glove: 0.74,
        ring: 0.54,
        cape: 0.54,
        bracer: 0.54,
        belt: 0.74,
        legging: 1,
        necklace: 0.68
      },
      entryInfo: {
        STR: { base: 2.5, name: '力量' }, 
        AGI: { base: 2.5, name: '敏捷' }, 
        INT: { base: 2.5, name: '智力' }, 
        STA: { base: 2.5, name: '耐力' }, 
        SPI: { base: 2.5, name: '精神' }, 
        ALL: { base: 0.8, name: '全属性'},
        ATK: { base: 5, name: '攻击' }, 
        DEF: { base: 10, name: '护甲' }, 
        BLOCK: { base: 2, name: '格挡' }, 
        AP: { base: 5, name: '法伤' }, 
        APCRIT: { base: 1, name: '法术暴击' }, 
        APCRITDMG: { base: 5, name: '法暴伤害' }, 
        APPEN: { base: 2, name: '法术穿透' }, 
        MR: { base: 2, name: '魔抗' }, 
        HASTE: { base: 4, name: '急速' }, 
        HEAL: { base: 8, name: '治疗效果' }, 
        VERS: { base: 4, name: '全能' }, 
        HP: { base: 40, name: '生命值' }, 
        MP: { base: 60, name: '魔法值' }, 
        CRIT: { base: 4, name: '暴击率' }, 
        CRITDMG: { base: 1, name: '暴击伤害' }, 
        STRP: { base: 9, name: '力量' }, 
        AGIP: { base: 9, name: '敏捷' }, 
        INTP: { base: 9, name: '智力' }, 
        STAP: { base: 9, name: '耐力' }, 
        SPIP: { base: 9, name: '精神' }, 
        ALLP: { base: 3, name: '全属性'},
        ATKP: { base: 9, name: '攻击力' }, 
        DEFP: { base: 9, name: '防御力' }, 
        BLOCKP: { base: 9, name: '格挡' }, 
        HPP: { base: 9, name: '生命值' }, 
        MPP: { base: 9, name: '魔法值' }, 
        BLOCKP: { base: 9, name: '格挡' }, 
        APP: { base: 9, name: '法伤' }, 
        APPENP: { base: 9, name: '法术穿透' }, 
        MRP: { base: 9, name: '魔抗' }, 
      },
      entries: [
        'STR','AGI','INT', 'ALL', 'CRIT','CRITDMG','ATK', 'DEF', 'BLOCK','HP', 'MP', 
      ],
      helmet: {
        fixEntry: ['DEF'],
        extraEntry: [
          'STR','AGI','INT','STA','SPI','ALL','ATK','AP','DEF','MR','BLOCK','HP','MP',
        ],
        type: {
          STR: [{
              name: '皮帽', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_04.jpg",
            },{
              name: '皮帽', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_04.jpg",
            },{
              name: '熔铸头盔', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_08.jpg",
            },{
              name: '无面者头盔', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_138.jpg",
            },{
              name: '烈焰王冠', desc: '',
              iconSrc: "./icons/helmet/inv_helm_circlet_firelands_d_01.jpg",
            },{
              name: '大领主战盔', desc: '',
              iconSrc: "./icons/helmet/inv_helm_plate_raidpaladinmythic_q_01.jpg",
            },
          ],
          AGI: [{
              name: '皮帽', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_04.jpg",
            },{
              name: '皮帽', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_04.jpg",
            },{
              name: '刺绣训鹰兜帽', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_137.jpg",
            },{
              name: '无面信徒面具', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_robe_raidwarlock_k_01.jpg",
            },{
              name: '复眼面具', desc: '',
              iconSrc: "./icons/helmet/inv_leather_raidrogue_q_01helm.jpg",
            },{
              name: '恐怖之痕', desc: '',
              iconSrc: "./icons/helmet/inv_helm_plate_raiddeathknight_s_01.jpg",
            },
          ],
          INT: [{
              name: '皮帽', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_04.jpg",
            },{
              name: '皮帽', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_04.jpg",
            },{
              name: '希望炽翼', desc: '',
              iconSrc: "./icons/helmet/inv_helm_plate_raidpaladin_k_01.jpg",
            },{
              name: '永冬之冠', desc: '',
              iconSrc: "./icons/helmet/inv_helm_eternalwinter_d_01.jpg",
            },{
              name: '灵风头冠', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_70.jpg",
            },{
              name: '火焰之王', desc: '',
              iconSrc: "./icons/helmet/inv_helm_robe_raidmage_i_01.jpg",
            },
          ],
          STA: [{
              name: '皮帽', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_04.jpg",
            },{
              name: '皮帽', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_04.jpg",
            },{
              name: '熔铸头盔', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_08.jpg",
            },{
              name: '灵枝头冠', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_leather_raiddruid_j_01.jpg",
            },{
              name: '恐目之凝视', desc: '',
              iconSrc: "./icons/helmet/inv_helm_mail_raidhunter_l_01.jpg",
            },{
              name: '风磨战盔', desc: '',
              iconSrc: "./icons/helmet/inv_helm_plate_raiddeathknight_q_01.jpg",
            },
          ],
          SPI: [{
              name: '皮帽', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_04.jpg",
            },{
              name: '皮帽', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_04.jpg",
            },{
              name: '希望炽翼', desc: '',
              iconSrc: "./icons/helmet/inv_helm_plate_raidpaladin_k_01.jpg",
            },{
              name: '观星帽', desc: '',
              iconSrc: "./icons/helmet/3752755.jpg",
            },{
              name: '虚空之心', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_89.jpg",
            },{
              name: '星界守护者', desc: '',
              iconSrc: "./icons/helmet/inv_helmet_leather_raiddruid_q_01.jpg",
            },
          ]
        },
      },
      weapon: {
        fixEntry: [ 'ATK'],
        extraEntry: [
          'STR','AGI','INT','STA','SPI','ALL','ATK','AP','DEF','MR','BLOCK','HP','MP',
        ],
        type: {
          STR: [{
              name: '木锤', desc: '',
              iconSrc: "./icons/weapon/inv_hammer_16.jpg",
            },{
              name: '铁锤', desc: '',
              iconSrc: "./icons/weapon/inv_hammer_10.jpg",
            },{
              name: '燃烧战斧', desc: '',
              iconSrc: "./icons/weapon/inv_axe_02.jpg",
            },{
              name: '染血刀刃', desc: '',
              iconSrc: "./icons/weapon/inv_axe_75.jpg",
            },{
              name: '开天', desc: '',
              iconSrc: "./icons/weapon/inv_axe_102.jpg",
            },{
              name: '公正使者', desc: '',
              iconSrc: "./icons/weapon/inv_axe_103.jpg",
            },
            
          ],
          AGI: [{
              name: '长弓', desc: '',
              iconSrc: "./icons/weapon/inv_weapon_bow_02.jpg",
            },{
              name: '大型长弓', desc: '',
              iconSrc: "./icons/weapon/inv_weapon_bow_01.jpg",
            },{
              name: '月光长弓', desc: '',
              iconSrc: "./icons/weapon/inv_bow_1h_draenorquest95_b_01.jpg",
            },{
              name: '日怒长弓', desc: '',
              iconSrc: "./icons/weapon/inv_weapon_bow_18.jpg",
            },{
              name: '击心者', desc: '',
              iconSrc: "./icons/weapon/inv_weapon_bow_09.jpg",
            },{
              name: '奎尔萨拉斯金弓', desc: '',
              iconSrc: "./icons/weapon/inv_weapon_bow_38.jpg",
            },
            
          ],
          INT: [{
              name: '无光魔杖', desc: '',
              iconSrc: "./icons/weapon/inv_wand_07.jpg",
            },{
              name: '奥金尼法杖', desc: '',
              iconSrc: "./icons/weapon/inv_staff_14.jpg",
            },{
              name: '泡沫法杖', desc: '',
              iconSrc: "./icons/weapon/inv_staff_06.jpg",
            },{
              name: '元素法杖', desc: '',
              iconSrc: "./icons/weapon/inv_staff_07.jpg",
            },{
              name: '诅咒', desc: '',
              iconSrc: "./icons/weapon/inv_staff_67.jpg",
            },{
              name: '尼伯龙根', desc: '',
              iconSrc: "./icons/weapon/inv_staff_109.jpg",
            },
          ],
          STA: [{
              name: '木锤', desc: '',
              iconSrc: "./icons/weapon/inv_hammer_16.jpg",
            },{
              name: '铁锤', desc: '',
              iconSrc: "./icons/weapon/inv_hammer_10.jpg",
            },{
              name: '护暮大锤', desc: '',
              iconSrc: "./icons/weapon/inv_mace_2h_ardenwealdquest_b_01.jpg",
            },{
              name: '冬脉重锤', desc: '',
              iconSrc: "./icons/weapon/inv_mace_2h_ardenweald_d_01.jpg",
            },{
              name: '惊雷', desc: '',
              iconSrc: "./icons/weapon/inv_mace_2h_blacksmithing_02.jpg",
            },{
              name: '风暴使者', desc: '',
              iconSrc: "./icons/weapon/inv_mace_2h_blacksmithing_03.jpg",
            },
          ],
          SPI: [{
              name: '无光魔杖', desc: '',
              iconSrc: "./icons/weapon/inv_wand_07.jpg",
            },{
              name: '奥金尼法杖', desc: '',
              iconSrc: "./icons/weapon/inv_staff_14.jpg",
            },{
              name: '冰怒魔杖', desc: '',
              iconSrc: "./icons/weapon/inv_wand_05.jpg",
            },{
              name: '废土魔杖', desc: '',
              iconSrc: "./icons/weapon/inv_wand_09.jpg",
            },{
              name: '冰冷魔杖', desc: '',
              iconSrc: "./icons/weapon/inv_wand_01.jpg",
            },{
              name: '创世权杖', desc: '',
              iconSrc: "./icons/weapon/inv_wand_29.jpg",
            },
          ]
        },
      },
      armor: {
        fixEntry: ['DEF'],
        extraEntry: [
          'STR','AGI','INT','STA','SPI','ALL','ATK','AP','DEF','MR','BLOCK','HP','MP',
        ],
        type: {
          STR: [{
              name: '软皮外套', desc: '',
              iconSrc: "./icons/armor/inv_chest_leather_03.jpg",
            },{
              name: '软皮外套', desc: '',
              iconSrc: "./icons/armor/inv_chest_leather_03.jpg",
            },{
              name: '裂心胸铠', desc: '',
              iconSrc: "./icons/armor/inv_chest_plate08.jpg",
            },{
              name: '猩红胸甲', desc: '',
              iconSrc: "./icons/armor/inv_chest_plate_revendreth_d_01.jpg",
            },{
              name: '凶星长袍', desc: '',
              iconSrc: "./icons/armor/inv_chest_cloth_68.jpg",
            },{
              name: '贪婪巨口', desc: '',
              iconSrc: "./icons/armor/inv_chest_leatherraidnzoth_d_01.jpg",
            },
          ],
          AGI: [{
              name: '软皮外套', desc: '',
              iconSrc: "./icons/armor/inv_chest_leather_03.jpg",
            },{
              name: '软皮外套', desc: '',
              iconSrc: "./icons/armor/inv_chest_leather_03.jpg",
            },{
              name: '翡翠胸甲', desc: '',
              iconSrc: "./icons/armor/inv_chest_plate07.jpg",
            },{
              name: '溪行者胸甲', desc: '',
              iconSrc: "./icons/armor/inv_chest_mail_draenordungeon_c_01.jpg",
            },{
              name: '幽皮外套', desc: '',
              iconSrc: "./icons/armor/inv_chest_leather_mawraid_d_01.jpg",
            },{
              name: '獠牙刺杀者', desc: '',
              iconSrc: "./icons/armor/inv_chest_leather_raidrogue_r_01.jpg",
            },
          ],
          INT: [{
              name: '软皮外套', desc: '',
              iconSrc: "./icons/armor/inv_chest_leather_03.jpg",
            },{
              name: '软皮外套', desc: '',
              iconSrc: "./icons/armor/inv_chest_leather_03.jpg",
            },{
              name: '牧师之袍', desc: '',
              iconSrc: "./icons/armor/inv_chest_cloth_42.jpg",
            },{
              name: '奥术烈焰法衣', desc: '',
              iconSrc: "./icons/armor/inv_chest_cloth_71.jpg",
            },{
              name: '死灵的低语', desc: '',
              iconSrc: "./icons/armor/inv_cloth_raidwarlock_o_01robe.jpg",
            },{
              name: '尊崇灵魂长袍', desc: '',
              iconSrc: "./icons/armor/inv_robe_mail_raidshaman_s_01.jpg",
            },
          ],
          STA: [{
              name: '软皮外套', desc: '',
              iconSrc: "./icons/armor/inv_chest_leather_03.jpg",
            },{
              name: '软皮外套', desc: '',
              iconSrc: "./icons/armor/inv_chest_leather_03.jpg",
            },{
              name: '裂心胸铠', desc: '',
              iconSrc: "./icons/armor/inv_chest_plate08.jpg",
            },{
              name: '熔火巨人', desc: '',
              iconSrc: "./icons/armor/inv_chest_plate_raidwarrior_j_01.jpg",
            },{
              name: '神祭胸铠', desc: '',
              iconSrc: "./icons/armor/inv_chest_plate_raidpaladin_j_01.jpg",
            },{
              name: '掌炉大师的外衣', desc: '',
              iconSrc: "./icons/armor/inv_chest_mail_bastion_d_01.jpg",
            },
          ],
          SPI: [{
              name: '软皮外套', desc: '',
              iconSrc: "./icons/armor/inv_chest_leather_03.jpg",
            },{
              name: '软皮外套', desc: '',
              iconSrc: "./icons/armor/inv_chest_leather_03.jpg",
            },{
              name: '牧师之袍', desc: '',
              iconSrc: "./icons/armor/inv_chest_cloth_42.jpg",
            },{
              name: '皎月祭司法袍', desc: '',
              iconSrc: "./icons/armor/inv_chest_cloth_warfrontsnightelf_d_01.jpg",
            },{
              name: '无私守魂者', desc: '',
              iconSrc: "./icons/armor/inv_robe_cloth_bastion_d_01.jpg",
            },{
              name: '天界观察者', desc: '',
              iconSrc: "./icons/armor/3752757.jpg",
            },
          ]
        },
      },
      shoe: {
        fixEntry: [],
        extraEntry: [
          'STR','AGI','INT','STA','SPI','ALL','ATK','AP','DEF','MR','BLOCK','HP','MP',
        ],
        type: {
          STR: [{
              name: '布鞋', desc: '',
              iconSrc: "./icons/shoe/inv_boots_01.jpg",
            },{
              name: '布鞋', desc: '',
              iconSrc: "./icons/shoe/inv_boots_01.jpg",
            },{
              name: '前线战靴', desc: '',
              iconSrc: "./icons/shoe/inv_boots_plate_20v1.jpg",
            },{
              name: '加洛西战靴', desc: '',
              iconSrc: "./icons/shoe/inv_boot_plate_legiondungeon_c_03.jpg",
            },{
              name: '践踏战靴', desc: '',
              iconSrc: "./icons/shoe/inv_plate_raidwarriormythic_q_01.jpg",
            },{
              name: '黑曜石战靴', desc: '',
              iconSrc: "./icons/shoe/inv_boots_plate_raidwarrior_j_01.jpg",
            },
          ],
          AGI: [{
              name: '布鞋', desc: '',
              iconSrc: "./icons/shoe/inv_boots_01.jpg",
            },{
              name: '布鞋', desc: '',
              iconSrc: "./icons/shoe/inv_boots_01.jpg",
            },{
              name: '游荡者的软鞋', desc: '',
              iconSrc: "./icons/shoe/inv_boot_cloth_raidwarlock_q_01.jpg",
            },{
              name: '踏火之靴', desc: '',
              iconSrc: "./icons/shoe/inv_boots_leather_02.jpg",
            },{
              name: '灭绝护腿', desc: '',
              iconSrc: "./icons/shoe/inv_mail_mawraid_d_01_boots.jpg",
            },{
              name: '凯旋之靴', desc: '',
              iconSrc: "./icons/shoe/inv_boots_cloth_29.jpg",
            },
          ],
          INT: [{
              name: '布鞋', desc: '',
              iconSrc: "./icons/shoe/inv_boots_01.jpg",
            },{
              name: '布鞋', desc: '',
              iconSrc: "./icons/shoe/inv_boots_01.jpg",
            },{
              name: '枯法者软鞋', desc: '',
              iconSrc: "./icons/shoe/inv_boot_cloth_legionendgame_c_01.jpg",
            },{
              name: '时空学者', desc: '',
              iconSrc: "./icons/shoe/inv_boot_cloth_legionquest100_b_01.jpg",
            },{
              name: '基柱之靴', desc: '',
              iconSrc: "./icons/shoe/inv_boots_plate_raidpaladin_k_01.jpg",
            },{
              name: '悠扬旋律', desc: '',
              iconSrc: "./icons/shoe/inv_boots_robe_raidmage_i_01.jpg",
            },
          ],
          STA: [{
              name: '布鞋', desc: '',
              iconSrc: "./icons/shoe/inv_boots_01.jpg",
            },{
              name: '布鞋', desc: '',
              iconSrc: "./icons/shoe/inv_boots_01.jpg",
            },{
              name: '前线战靴', desc: '',
              iconSrc: "./icons/shoe/inv_boots_plate_20v1.jpg",
            },{
              name: '越狱者战靴', desc: '',
              iconSrc: "./icons/shoe/inv_boot_plate_legionendgame_c_01.jpg",
            },{
              name: '皇裔护靴', desc: '',
              iconSrc: "./icons/shoe/inv_boots_plate_12.jpg",
            },{
              name: '高塔影怖战靴', desc: '',
              iconSrc: "./icons/shoe/inv_boot_plate_mawraid_d_01.jpg",
            },
          ],
          SPI: [{
              name: '布鞋', desc: '',
              iconSrc: "./icons/shoe/inv_boots_01.jpg",
            },{
              name: '布鞋', desc: '',
              iconSrc: "./icons/shoe/inv_boots_01.jpg",
            },{
              name: '枯法者软鞋', desc: '',
              iconSrc: "./icons/shoe/inv_boot_cloth_legionendgame_c_01.jpg",
            },{
              name: '不谐守魂者', desc: '',
              iconSrc: "./icons/shoe/inv_boot_cloth_bastion_d_01.jpg",
            },{
              name: '魔古重靴', desc: '',
              iconSrc: "./icons/shoe/inv_boots_plate_raidpaladin_k_01.jpg",
            },{
              name: '魔石战靴', desc: '',
              iconSrc: "./icons/shoe/inv_boot_plate_raiddeathknight_q_01.jpg",
            },
          ]
        },
      },
      shoulder: {
        fixEntry: ['DEF'],
        extraEntry: [
          'STR','AGI','INT','STA','SPI','ALL','ATK','AP','DEF','MR','BLOCK','HP','MP',
        ],
        type: {
          STR: [{
              name: '衬肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_09.jpg",
            },{
              name: '衬肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_09.jpg",
            },{
              name: '皮甲肩铠', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_07.jpg",
            },{
              name: '角斗士护肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_54.jpg",
            },{
              name: '獠牙肩甲', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_plate_garrosh_d_01.jpg",
            },{
              name: '鲜血王储', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_129.jpg",
            },
          ],
          AGI: [{
              name: '衬肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_09.jpg",
            },{
              name: '衬肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_09.jpg",
            },{
              name: '灭法者护肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_cloth_legionendgame_c_01.jpg",
            },{
              name: '驭龙者护肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_mail_vrykuldragonrider_b_01.jpg",
            },{
              name: '欺诈侯爵披肩', desc: '',
              iconSrc: "./icons/shoulder/inv_cloth_mawraid_d_01_shoulder.jpg",
            },{
              name: '玛洛恩护肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_44.jpg",
            },
          ],
          INT: [{
              name: '衬肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_09.jpg",
            },{
              name: '衬肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_09.jpg",
            },{
              name: '月光护肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_02.jpg",
            },{
              name: '静谧之途护肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_leather_raidmonk_l_01.jpg",
            },{
              name: '午夜使徒', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_plate_raiddeathknight_q_01.jpg",
            },{
              name: '伊梵雅丽的枝桠', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_leather_raiddruid_q_01.jpg",
            },
          ],
          STA: [{
              name: '衬肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_09.jpg",
            },{
              name: '衬肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_09.jpg",
            },{
              name: '皮甲肩铠', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_07.jpg",
            },{
              name: '巨石肩垫', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_51.jpg",
            },{
              name: '影怖护肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_plate_mawraidmythic_d_01.jpg",
            },{
              name: '恐惧之痕', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_plate_raiddeathknight_s_01.jpg",
            },
          ],
          SPI: [{
              name: '衬肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_09.jpg",
            },{
              name: '衬肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_09.jpg",
            },{
              name: '月光护肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_02.jpg",
            },{
              name: '野性魔法肩甲', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_33.jpg",
            },{
              name: '冥界衬肩', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_97.jpg",
            },{
              name: '元素之缚', desc: '',
              iconSrc: "./icons/shoulder/inv_shoulder_mail_raidshaman_q_01.jpg",
            }
          ]
        },
      },      
      glove: {
        fixEntry: [],
        extraEntry: [
          'STR','AGI','INT','STA','SPI','ALL','ATK','AP','DEF','MR','BLOCK','HP','MP',
        ],
        type: {
          STR: [{
              name: '皮手套', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_05.jpg",
            },{
              name: '皮手套', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_05.jpg",
            },{
              name: '龙皮手套', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_06.jpg",
            },{
              name: '巨神护手', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_03.jpg",
            },{
              name: '熔岩板甲手铠', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_plate_raiddeathknight_i_01.jpg",
            },{
              name: '猩红之握', desc: '',
              iconSrc: "./icons/glove/inv_glove_plate_revendreth_d_01.jpg",
            },
          ],
          AGI: [{
              name: '皮手套', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_05.jpg",
            },{
              name: '皮手套', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_05.jpg",
            },{
              name: '迷雾行者之握', desc: '',
              iconSrc: "./icons/glove/inv_glove_leather_vrykulhunter_b_01.jpg",
            },{
              name: '吟天者手套', desc: '',
              iconSrc: "./icons/glove/inv_leather_draenorquest95_b_01glove.jpg",
            },{
              name: '释放苦难之握', desc: '',
              iconSrc: "./icons/glove/inv_glove_leather_mawraid_d_01.jpg",
            },{
              name: '宿命半荒手甲', desc: '',
              iconSrc: "./icons/glove/inv_mail_mawraid_d_01_glove.jpg",
            },
          ],
          INT: [{
              name: '皮手套', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_05.jpg",
            },{
              name: '皮手套', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_05.jpg",
            },{
              name: '黑石萨满的手甲', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_109.jpg",
            },{
              name: '溪语者手套', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_50.jpg",
            },{
              name: '火焰之王手套', desc: '',
              iconSrc: "./icons/glove/inv_glove_robe_raidmage_i_01.jpg",
            },{
              name: '阿兰纳丝影织手套', desc: '',
              iconSrc: "./icons/glove/inv_glove_cloth_raidmage_s_01.jpg",
            },
          ],
          STA: [{
              name: '皮手套', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_05.jpg",
            },{
              name: '皮手套', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_05.jpg",
            },{
              name: '龙皮手套', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_06.jpg",
            },{
              name: '侵掠手套', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_08.jpg",
            },{
              name: '巨龙碎石手套', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_plate_raidwarrior_k_01.jpg",
            },{
              name: '断桥者手甲', desc: '',
              iconSrc: "./icons/glove/inv_glove_plate_raiddeathknight_q_01.jpg",
            },
          ],
          SPI: [{
              name: '皮手套', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_05.jpg",
            },{
              name: '皮手套', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_05.jpg",
            },{
              name: '黑石萨满的手甲', desc: '',
              iconSrc: "./icons/glove/inv_gauntlets_109.jpg",
            },{
              name: '虚空恶魔之握', desc: '',
              iconSrc: "./icons/glove/inv_glove_leather_legiondungeon_c_02.jpg",
            },{
              name: '呢喃应允手套', desc: '',
              iconSrc: "./icons/glove/inv_cloth_raidpriest_q_01_glove.jpg",
            },{
              name: '塑梦者手套', desc: '',
              iconSrc: "./icons/glove/inv_gloves_leather_raiddruid_q_01.jpg",
            },
          ]
        },
      },  
      ring: {
        fixEntry: [ 'HP'],
        extraEntry: [
          'STR','AGI','INT','STA','SPI','ALL','ATK','AP','DEF','MR','BLOCK','HP','MP',
        ],
        type: {
          STR: [{
              name: '全能戒指', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_03.jpg",
            },{
              name: '石卫指环', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_02.jpg",
            },{
              name: '琥珀指环', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_04.jpg",
            },{
              name: '魔铁血戒', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_39.jpg",
            },{
              name: '凋零之力', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_84.jpg",
            },{
              name: '骷髅领主之环', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_83.jpg",
            },
          ],
          AGI: [{
              name: '全能戒指', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_03.jpg",
            },{
              name: '草地戒指', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_12.jpg",
            },{
              name: '除虫之戒', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_44.jpg",
            },{
              name: '叶须指环', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_37.jpg",
            },{
              name: '无尽指环', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_143.jpg",
            },{
              name: '残酷指环', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_80.jpg",
            },
          ],
          INT: [{
              name: '全能戒指', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_03.jpg",
            },{
              name: '翡翠戒指', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_18.jpg",
            },{
              name: '血铸之环', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_36.jpg",
            },{
              name: '赤红怒火指环', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_65.jpg",
            },{
              name: '水魂玺戒', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_148.jpg",
            },{
              name: '全能之戒', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_68.jpg",
            },
          ],
          STA: [{
              name: '全能戒指', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_03.jpg",
            },{
              name: '青金石戒指', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_22.jpg",
            },{
              name: '失落纪元', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_121.jpg",
            },{
              name: '英杰唤醒者', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_115.jpg",
            },{
              name: '蛮力指环', desc: '',
              iconSrc: "./icons/ring/item_icecrownringd.jpg",
            },{
              name: '不屈之戒', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_146.jpg",
            },
          ],
          SPI: [{
              name: '全能戒指', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_03.jpg",
            },{
              name: '水蓝石戒指', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_01.jpg",
            },{
              name: '寒触戒指', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_57.jpg",
            },{
              name: '统御之戒', desc: '',
              iconSrc: "./icons/ring/Inv_jewelry_ring_60.jpg",
            },{
              name: '循环戒指', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_15.jpg",
            },{
              name: '永恒先知之戒', desc: '',
              iconSrc: "./icons/ring/inv_jewelry_ring_55.jpg",
            },
          ]
        },
      },
      cape: {
        fixEntry: [],
        extraEntry: [
          'STR','AGI','INT','STA','SPI','ALL','ATK','AP','DEF','MR','BLOCK','HP','MP',
        ],
        type: {
          STR: [{
              name: '披风', desc: '',
              iconSrc: "./icons/cape/inv_misc_cape_22.jpg",
            },{
              name: '披风', desc: '',
              iconSrc: "./icons/cape/inv_misc_cape_22.jpg",
            },{
              name: '蛇鳞披风', desc: '',
              iconSrc: "./icons/cape/inv_misc_monsterscales_03.jpg",
            },{
              name: '铁龟披风', desc: '',
              iconSrc: "./icons/cape/inv_misc_cape_naxxramas_02.jpg",
            },{
              name: '不屈大氅', desc: '',
              iconSrc: "./icons/cape/inv_misc_cape_deathwingraid_d_02.jpg",
            },{
              name: '窒息硫磺斗篷', desc: '',
              iconSrc: "./icons/cape/inv_cape_raidshamanmythic_q_01.jpg",
            },
          ],
          AGI: [{
              name: '披风', desc: '',
              iconSrc: "./icons/cape/inv_misc_cape_22.jpg",
            },{
              name: '披风', desc: '',
              iconSrc: "./icons/cape/inv_misc_cape_22.jpg",
            },{
              name: '金都大氅', desc: '',
              iconSrc: "./icons/cape/inv_cape_cloth_zandalarquest_b_01.jpg",
            },{
              name: '黑狼披风', desc: '',
              iconSrc: "./icons/cape/inv_misc_cape_cataclysm_melee_b_01.jpg",
            },{
              name: '秘室杀手斗篷', desc: '',
              iconSrc: "./icons/cape/item_icecrowncloak.jpg",
            },{
              name: '冲动恶徒披风', desc: '',
              iconSrc: "./icons/cape/inv_leather_raidrogue_s_01_cape.jpg",
            },
          ],
          INT: [{
              name: '披风', desc: '',
              iconSrc: "./icons/cape/inv_misc_cape_22.jpg",
            },{
              name: '披风', desc: '',
              iconSrc: "./icons/cape/inv_misc_cape_22.jpg",
            },{
              name: '精灵披风', desc: '',
              iconSrc: "./icons/cape/inv_chest_cloth_14.jpg",
            },{
              name: '冬脉斗披', desc: '',
              iconSrc: "./icons/cape/inv_cape_chest_ardenweald_d_01.jpg",
            },{
              name: '招魂披风', desc: '',
              iconSrc: "./icons/cape/inv_cape_felfireraid_d_02.jpg",
            },{
              name: '天堂之风', desc: '',
              iconSrc: "./icons/cape/inv_misc_cape_cataclysm_healer_d_01.jpg",
            },
          ],
          STA: [{
              name: '披风', desc: '',
              iconSrc: "./icons/cape/inv_misc_cape_22.jpg",
            },{
              name: '披风', desc: '',
              iconSrc: "./icons/cape/inv_misc_cape_22.jpg",
            },{
              name: '蛇鳞披风', desc: '',
              iconSrc: "./icons/cape/inv_misc_monsterscales_03.jpg",
            },{
              name: '碎魂者披风', desc: '',
              iconSrc: "./icons/cape/ivn_cape_legionquest100_b_04.jpg",
            },{
              name: '狂怒披风', desc: '',
              iconSrc: "./icons/cape/inv_cape_firelands_fireset_d_01.jpg",
            },{
              name: '恐惧之龙大氅', desc: '',
              iconSrc: "./icons/cape/inv_cape_legionraiddeathknight_d_01.jpg",
            },
          ],
          SPI: [{
              name: '披风', desc: '',
              iconSrc: "./icons/cape/inv_misc_cape_22.jpg",
            },{
              name: '披风', desc: '',
              iconSrc: "./icons/cape/inv_misc_cape_22.jpg",
            },{
              name: '精灵披风', desc: '',
              iconSrc: "./icons/cape/inv_chest_cloth_14.jpg",
            },{
              name: '月溪披风', desc: '',
              iconSrc: "./icons/cape/inv_misc_cape_cataclysm_caster_b_01.jpg",
            },{
              name: '祭师披肩', desc: '',
              iconSrc: "./icons/cape/inv_cape_mail_legiondungeon_c_03.jpg",
            },{
              name: '龙皮披风', desc: '',
              iconSrc: "./icons/cape/inv_cape_leather_raiddruid_q_01.jpg",
            },
          ]
        },
      },
      bracer: {
        fixEntry: [ 'DEF'],
        extraEntry: [
          'STR','AGI','INT','STA','SPI','ALL','ATK','AP','DEF','MR','BLOCK','HP','MP',
        ],
        type: {
          STR: [{
              name: '护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_03.jpg",
            },{
              name: '护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_03.jpg",
            },{
              name: '玉石臂铠', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_79.jpg",
            },{
              name: '峻岭臂铠', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_plate_panda_b_02green.jpg",
            },{
              name: '石像鬼护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_42.jpg",
            },{
              name: '龙骨腕甲', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_plate_raidwarriormythic_q_01.jpg",
            },
          ],
          AGI: [{
              name: '护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_03.jpg",
            },{
              name: '护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_03.jpg",
            },{
              name: '锯齿黄蜂护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_leather_raidrogue_j_01.jpg",
            },{
              name: '梦魇之链腕铐', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_mail_nzothraid_d_01.jpg",
            },{
              name: '奇美隆臂甲', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_mail_raidhunter_i_01.jpg",
            },{
              name: '珠光彩蝶护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_leather_raiddruid_l_01.jpg",
            },
          ],
          INT: [{
              name: '护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_03.jpg",
            },{
              name: '护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_03.jpg",
            },{
              name: '相位转化护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_40.jpg",
            },{
              name: '缚皮镣铐', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_mail_raidhunter_j_01.jpg",
            },{
              name: '奥能元素护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_mail_nazjatarraidmythic_d_01.jpg",
            },{
              name: '傲慢末日', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_robe_raidmage_j_01.jpg",
            },
          ],
          STA: [{
              name: '护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_03.jpg",
            },{
              name: '护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_03.jpg",
            },{
              name: '玉石臂铠', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_79.jpg",
            },{
              name: '武器支承护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_plate_cataclysm_b_02.jpg",
            },{
              name: '裂魂腕甲', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_plate_mawraid_d_01.jpg",
            },{
              name: '龙葵腕甲', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_43.jpg",
            },
          ],
          SPI: [{
              name: '护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_03.jpg",
            },{
              name: '护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_03.jpg",
            },{
              name: '相位转化护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_40.jpg",
            },{
              name: '狂热召唤护腕', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_cloth_zuldazarraidmythic_d_01.jpg",
            },{
              name: '阴暗祈咒腕带', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_cloth_nzothraid_d_01.jpg",
            },{
              name: '苍白圣徒腕甲', desc: '',
              iconSrc: "./icons/bracer/inv_bracer_37.jpg",
            },
          ]
        },
      },
      belt: {
        fixEntry: [ 'MP'],
        extraEntry: [
          'STR','AGI','INT','STA','SPI','ALL','ATK','AP','DEF','MR','BLOCK','HP','MP',
        ],
        type: {
          STR: [{
              name: '腰带', desc: '',
              iconSrc: "./icons/belt/inv_belt_01.jpg",
            },{
              name: '腰带', desc: '',
              iconSrc: "./icons/belt/inv_belt_01.jpg",
            },{
              name: '硬化源质束带', desc: '',
              iconSrc: "./icons/belt/inv_belt_plate_raidwarrior_i_01.jpg",
            },{
              name: '暮光巨龙腰带', desc: '',
              iconSrc: "./icons/belt/inv_belt_plate_raidwarrior_k_01.jpg",
            },{
              name: '猛狼腰铠', desc: '',
              iconSrc: "./icons/belt/inv_belt_plate_raiddeathknight_i_01.jpg",
            },{
              name: '淬炼光阴', desc: '',
              iconSrc: "./icons/belt/inv_belt_plate_raidwarriormythic_q_01.jpg",
            },
          ],
          AGI: [{
              name: '腰带', desc: '',
              iconSrc: "./icons/belt/inv_belt_01.jpg",
            },{
              name: '腰带', desc: '',
              iconSrc: "./icons/belt/inv_belt_01.jpg",
            },{
              name: '神殿毁灭者腰带', desc: '',
              iconSrc: "./icons/belt/inv_belt_mail_legiondungeon_c_02.jpg",
            },{
              name: '碎牢者腰带', desc: '',
              iconSrc: "./icons/belt/inv_belt_leather_panda_b_02_brown.jpg",
            },{
              name: '憎意束带', desc: '',
              iconSrc: "./icons/belt/inv_belt_mail_raidshaman_i_01.jpg",
            },{
              name: '念珠束带', desc: '',
              iconSrc: "./icons/belt/inv_leather_raidmonk_r_01_belt.jpg",
            },
          ],
          INT: [{
              name: '腰带', desc: '',
              iconSrc: "./icons/belt/inv_belt_01.jpg",
            },{
              name: '腰带', desc: '',
              iconSrc: "./icons/belt/inv_belt_01.jpg",
            },{
              name: '冬鳞护腰', desc: '',
              iconSrc: "./icons/belt/inv_belt_86.jpg",
            },{
              name: '涌潮腰带', desc: '',
              iconSrc: "./icons/belt/inv_belt_mail_legionquest100_b_01.jpg",
            },{
              name: '七印腰带', desc: '',
              iconSrc: "./icons/belt/inv_belt_plate_raidpaladin_j_01.jpg",
            },{
              name: '不屈烈火', desc: '',
              iconSrc: "./icons/belt/inv_belt_plate_raidwarrior_j_01.jpg",
            },
          ],
          STA: [{
              name: '腰带', desc: '',
              iconSrc: "./icons/belt/inv_belt_01.jpg",
            },{
              name: '腰带', desc: '',
              iconSrc: "./icons/belt/inv_belt_01.jpg",
            },{
              name: '硬化源质束带', desc: '',
              iconSrc: "./icons/belt/inv_belt_plate_raidwarrior_i_01.jpg",
            },{
              name: '战争腰带', desc: '',
              iconSrc: "./icons/belt/inv_belt_plate_maldraxxus_d_01.jpg",
            },{
              name: '邪钢护腰', desc: '',
              iconSrc: "./icons/belt/inv_belt_plate_legionendgame_c_01.jpg",
            },{
              name: '折磨者', desc: '',
              iconSrc: "./icons/belt/inv_belt_plate_mawraid_d_01.jpg",
            },
          ],
          SPI: [{
              name: '腰带', desc: '',
              iconSrc: "./icons/belt/inv_belt_01.jpg",
            },{
              name: '腰带', desc: '',
              iconSrc: "./icons/belt/inv_belt_01.jpg",
            },{
              name: '冬鳞护腰', desc: '',
              iconSrc: "./icons/belt/inv_belt_86.jpg",
            },{
              name: '静谧之途腰索', desc: '',
              iconSrc: "./icons/belt/inv_belt_leather_raidmonk_l_01.jpg",
            },{
              name: '月铸腰带', desc: '',
              iconSrc: "./icons/belt/inv_belt_mail_raidshaman_r_01.jpg",
            },{
              name: '受难之魂', desc: '',
              iconSrc: "./icons/belt/inv_belt_leather_mawraid_d_01.jpg",
            },
          ]
        },
      },
      legging: {
        fixEntry: [ 'DEF'],
        extraEntry: [
          'STR','AGI','INT','STA','SPI','ALL','ATK','AP','DEF','MR','BLOCK','HP','MP',
        ],
        type: {
          STR: [{
              name: '长裤', desc: '',
              iconSrc: "./icons/legging/inv_pants_02.jpg",
            },{
              name: '长裤', desc: '',
              iconSrc: "./icons/legging/inv_pants_02.jpg",
            },{
              name: '石片护腿', desc: '',
              iconSrc: "./icons/legging/inv_pants_plate_20.jpg",
            },{
              name: '卫兵护腿', desc: '',
              iconSrc: "./icons/legging/inv_pants_mail_36.jpg",
            },{
              name: '猩红护腿', desc: '',
              iconSrc: "./icons/legging/inv_pant_plate_revendreth_d_01.jpg",
            },{
              name: '失落神话', desc: '',
              iconSrc: "./icons/legging/inv_pant_plate_raidwarriormythic_q_01.jpg",
            },
          ],
          AGI: [{
              name: '长裤', desc: '',
              iconSrc: "./icons/legging/inv_pants_02.jpg",
            },{
              name: '长裤', desc: '',
              iconSrc: "./icons/legging/inv_pants_02.jpg",
            },{
              name: '鬼狐护腿', desc: '',
              iconSrc: "./icons/legging/inv_pants_leather_panda_b_01dark.jpg",
            },{
              name: '怒爪护腿', desc: '',
              iconSrc: "./icons/legging/inv_pants_leather_40.jpg",
            },{
              name: '迷影护腿', desc: '',
              iconSrc: "./icons/legging/inv_pants_mail_25.jpg",
            },{
              name: '永恒长夜', desc: '',
              iconSrc: "./icons/legging/inv_pants_leather_27.jpg",
            },
          ],
          INT: [{
              name: '长裤', desc: '',
              iconSrc: "./icons/legging/inv_pants_02.jpg",
            },{
              name: '长裤', desc: '',
              iconSrc: "./icons/legging/inv_pants_02.jpg",
            },{
              name: '雪山腿甲', desc: '',
              iconSrc: "./icons/legging/inv_pants_mail_37.jpg",
            },{
              name: '白水绑腿', desc: '',
              iconSrc: "./icons/legging/inv_pant_mail_legionquest100_b_01.jpg",
            },{
              name: '灵魂气息护腿', desc: '',
              iconSrc: "./icons/legging/inv_pants_robe_raidmage_i_01.jpg",
            },{
              name: '禁忌魔法护胫', desc: '',
              iconSrc: "./icons/legging/inv_pant_mail_nzothraid_d_01.jpg",
            },
          ],
          STA: [{
              name: '长裤', desc: '',
              iconSrc: "./icons/legging/inv_pants_02.jpg",
            },{
              name: '长裤', desc: '',
              iconSrc: "./icons/legging/inv_pants_02.jpg",
            },{
              name: '石片护腿', desc: '',
              iconSrc: "./icons/legging/inv_pants_plate_20.jpg",
            },{
              name: '汹涛护胫', desc: '',
              iconSrc: "./icons/legging/inv_pant_plate_nazjatar_c_01.jpg",
            },{
              name: '泰坦冲锋护胫', desc: '',
              iconSrc: "./icons/legging/inv_pant_plate_raidwarrior_r_01.jpg",
            },{
              name: '天灾收割者', desc: '',
              iconSrc: "./icons/legging/inv_pants_plate_32.jpg",
            },
          ],
          SPI: [{
              name: '长裤', desc: '',
              iconSrc: "./icons/legging/inv_pants_02.jpg",
            },{
              name: '长裤', desc: '',
              iconSrc: "./icons/legging/inv_pants_02.jpg",
            },{
              name: '雪山腿甲', desc: '',
              iconSrc: "./icons/legging/inv_pants_mail_37.jpg",
            },{
              name: '静谧之途护腿', desc: '',
              iconSrc: "./icons/legging/inv_pant_leather_raidmonk_l_01.jpg",
            },{
              name: '束缚灵魂护腿', desc: '',
              iconSrc: "./icons/legging/inv_pants_plate_12.jpg",
            },{
              name: '捆扎壁鳞护胫', desc: '',
              iconSrc: "./icons/legging/inv_pant_mail_nazjatarraidmythic_d_01.jpg",
            },
          ]
        },
      },
      necklace: {
        fixEntry: [ 'MR'],
        extraEntry: [
          'STR','AGI','INT','STA','SPI','ALL','ATK','AP','DEF','MR','BLOCK','HP','MP',
        ],
        type: {
          STR: [{
              name: '勇气勋章', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_amulet_03.jpg",
            },{
              name: '勇气勋章', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_amulet_03.jpg",
            },{
              name: '珀光盒坠', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_necklace_56.jpg",
            },{
              name: '影火项链', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_necklace_109.jpg",
            },{
              name: '焦灼项链', desc: '',
              iconSrc: "./icons/necklace/inv_neck_firelands_03.jpg",
            },{
              name: '地狱火坠饰', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_necklace_17.jpg",
            },
          ],
          AGI: [{
              name: '勇气勋章', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_amulet_03.jpg",
            },{
              name: '勇气勋章', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_amulet_03.jpg",
            },{
              name: '春雨项圈', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_necklace_71.jpg",
            },{
              name: '互敬项链', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_necklace_78.jpg",
            },{
              name: '凝虚项链', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_necklace_104.jpg",
            },{
              name: '悔恨之链', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_necklace_34.jpg",
            },
          ],
          INT: [{
              name: '勇气勋章', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_amulet_03.jpg",
            },{
              name: '勇气勋章', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_amulet_03.jpg",
            },{
              name: '苔原项链', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_necklace_11.jpg",
            },{
              name: '风暴之翼项链', desc: '',
              iconSrc: "./icons/necklace/inv_7_0raid_necklace_10a.jpg",
            },{
              name: '无尽梦魇项圈', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_necklace_35.jpg",
            },{
              name: '地狱光芒', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_necklace_32.jpg",
            },
          ],
          STA: [{
              name: '勇气勋章', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_amulet_03.jpg",
            },{
              name: '勇气勋章', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_amulet_03.jpg",
            },{
              name: '珀光盒坠', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_necklace_56.jpg",
            },{
              name: '战歌吊坠', desc: '',
              iconSrc: "./icons/necklace/inv_misc_necklace_6_0_021.jpg",
            },{
              name: '陶俑防御者项链', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_necklace_130.jpg",
            },{
              name: '苦痛刺圈', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_necklace_04.jpg",
            },
          ],
          SPI: [{
              name: '勇气勋章', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_amulet_03.jpg",
            },{
              name: '勇气勋章', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_amulet_03.jpg",
            },{
              name: '苔原项链', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_necklace_11.jpg",
            },{
              name: '密斯莱尔坠饰', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_necklace_07.jpg",
            },{
              name: '永冬护符', desc: '',
              iconSrc: "./icons/necklace/inv_7_0raid_necklace_03c.jpg",
            },{
              name: '救赎印记', desc: '',
              iconSrc: "./icons/necklace/inv_jewelry_necklace_31.jpg",
            },
          ]
        },
      },
      unique: {
        inv_sword_05: {
          itemType: 'weapon',
          lv: 10, quality: 3, enhanceLv: 5,
          desc: {
            name: '轻灵佩剑', desc: '导师的离别赠礼',
            iconSrc: "./icons/weapon/inv_sword_05.jpg",
          },
          baseEntry: [ 'AGI' ],
          option: []
        },
        inv_wand_06: {
          itemType: 'weapon',
          lv: 10, quality: 3, enhanceLv: 5,
          desc: {
            name: '魔术法杖', desc: '导师的离别赠礼',
            iconSrc: "./icons/weapon/inv_wand_06.jpg",
          },
          baseEntry: [ 'INT' ],
          option: []
        },
        inv_helmet_40: {
          itemType: 'helmet',
          lv: 45, quality: 2, enhanceLv: 0,
          desc: {
            name: '龟壳头盔', desc: '',
            iconSrc: "./icons/helmet/inv_helmet_40.jpg",
          },
          baseEntry: [ 'STA' ],
          option: ['STA', 'AGI', 'INT']
        },
        inv_gauntlets_05: {
          itemType: 'glove',
          lv: 45, quality: 2, enhanceLv: 0,
          desc: {
            name: '龟壳手套', desc: '',
            iconSrc: "./icons/glove/inv_gauntlets_05.jpg",
          },
          baseEntry: [ 'STA' ],
          option: ['STA', 'AGI', 'INT']
        },
        inv_bracer_06: {
          itemType: 'bracer',
          lv: 45, quality: 2, enhanceLv: 0,
          desc: {
            name: '龟壳护腕', desc: '',
            iconSrc: "./icons/bracer/inv_bracer_06.jpg",
          },
          baseEntry: [ 'STA' ],
          option: ['STA', 'AGI', 'INT']
        },
        inv_pants_02: {
          itemType: 'legging',
          lv: 45, quality: 2, enhanceLv: 0,
          desc: {
            name: '龟壳护腿', desc: '',
            iconSrc: "./icons/legging/inv_pants_02.jpg",
          },
          baseEntry: [ 'STA' ],
          option: ['STA', 'AGI', 'INT']
        },
        inv_chest_chain_12: {
          itemType: 'armor',
          lv: 45, quality: 2, enhanceLv: 0,
          desc: {
            name: '龟壳胸甲', desc: '',
            iconSrc: "./icons/armor/inv_chest_chain_12.jpg",
          },
          baseEntry: [ 'STA' ],
          option: ['STA', 'AGI', 'INT']
        },
      },
    }
  },

  methods: {
  }
};