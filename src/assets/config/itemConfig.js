export const itemConfig = {
    data() {
        return {
            itemQuality: [{
              name: '破旧',
              qualityLv: 1,
              color: '#a1a1a1',
            }, {
              name: '普通',
              qualityLv: 2,
              color: '#D9D9D9', 
            }, {
              name: '精良',
              qualityLv: 3,
              color: '#00BBFF', 
            }, {
              name: '完美',
              qualityLv: 4,
              color: '#BB00FF', 
            }, {
              name: '史诗',
              qualityLv: 5,
              color: '#FFBB00', 
            }, {
              name: '传说',
              qualityLv: 6,
              color: '#FF0000', 
            }],
            itemType:
            {
                inv_misc_enchantedpearla: {
                    quality: 2,
                    description: {
                        name: '神秘宝珠',
                        category: '材料',
                        desc: '具有神秘力量的宝珠，能够重置装备的潜在属性',
                        iconSrc: "./icons/item/Inv_misc_enchantedpearla.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                dust2: {
                    quality: 2,
                    description: {
                        name: '普通装备精华',
                        category: '材料',
                        desc: '分解普通装备获得，可用于升级普通品质的装备',
                        iconSrc: "./icons/item/Inv_enchanting_dust.png",
                    },
                    stack: true,
                    maxStack: 1000
                },
                dust3: {
                    quality: 3,
                    description: {
                        name: '精良装备精华',
                        category: '材料',
                        desc: '分解精良装备获得，可用于升级精良品质的装备',
                        iconSrc: "./icons/item/Inv_enchanting_70_arkhana.png",
                    },
                    stack: true,
                    maxStack: 1000
                },
                dust4: {
                    quality: 4,
                    description: {
                        name: '完美装备精华',
                        category: '材料',
                        desc: '分解完美装备获得，可用于升级完美品质的装备',
                        iconSrc: "./icons/item/Inv_misc_dust_infinite.png",
                    },
                    stack: true,
                    maxStack: 1000
                },
                dust5: {
                    quality: 5,
                    description: {
                        name: '史诗装备精华',
                        category: '材料',
                        desc: '分解史诗装备获得，可用于升级史诗品质的装备',
                        iconSrc: "./icons/item/Inv_enchanting_wod_dust3.png",
                    },
                    stack: true,
                    maxStack: 1000
                },
                dust6: {
                    quality: 6,
                    description: {
                        name: '传奇装备精华',
                        category: '材料',
                        desc: '分解传奇装备获得，可用于升级传奇品质的装备',
                        iconSrc: "./icons/item/Inv_enchant_dustillusion.png",
                    },
                    stack: true,
                    maxStack: 1000
                },
                inv_potion_27: {
                    quality: 4,
                    description: {
                        name: '屠魔药剂',
                        category: '消耗品',
                        desc: '使用后获得【野怪杀手】buff，对对冒险区非精英、BOSS类怪物额外造成50%伤害，持续10分钟',
                        iconSrc: "./icons/item/inv_potion_27.png",
                    },
                    stack: true,
                    maxStack: 5
                },
                inv_box_01: {
                    quality: 1,
                    description: {
                        name: '遗落的箱子',
                        category: '消耗品',
                        desc: '行人遗落的箱子，背后有着不为人知的故事，打开后随机获得金币、水晶、装备、技能书',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    stack: true,
                    maxStack: 20
                },
                inv_box_02: {
                    quality: 2,
                    description: {
                        name: '精英宝箱',
                        category: '消耗品',
                        desc: '精英怪用私房钱买的家当，来之不易，打开后随机获得金币、水晶、装备、技能书、BOSS挑战券',
                        iconSrc: "./icons/item/Inv_box_01.png",
                    },
                    stack: true,
                    maxStack: 20
                },
                inv_box_03: {
                    quality: 3,
                    description: {
                        name: 'BOSS宝箱',
                        category: '消耗品',
                        desc: '不是只有巨龙才喜欢财宝，BOSS级怪物多年的藏货，打开后随机获得金币、水晶、装备、技能书',
                        iconSrc: "./icons/item/Inv_box_02.png",
                    },
                    stack: true,
                    maxStack: 20
                },
                //'利姆鲁·特恩佩斯特', '巨人哥布林', '野猪王', '杰尼龟', '精灵女皇', '强盗首领', '俺已自了宫', '科多兽', '鬼神熊', '蛟龙'
                bossTicket1: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【利姆鲁·特恩佩斯】',
                        category: '消耗品',
                        desc: '挑战来自异世界的强大史莱姆',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    stack: true,
                    maxStack: 10
                },
                bossTicket2: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【巨人哥布林】',
                        category: '消耗品',
                        desc: '挑战哥布林中的王者',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    stack: true,
                    maxStack: 10
                },
                bossTicket3: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【野猪王】',
                        category: '消耗品',
                        desc: '挑战哥布林中的王者',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    stack: true,
                    maxStack: 10
                },
                bossTicket4: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【杰尼龟】',
                        category: '消耗品',
                        desc: '',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    stack: true,
                    maxStack: 10
                },
                bossTicket5: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【精灵女皇】',
                        category: '消耗品',
                        desc: '',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    stack: true,
                    maxStack: 10
                },
                bossTicket6: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【强盗首领】',
                        category: '消耗品',
                        desc: '',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    stack: true,
                    maxStack: 10
                },
                bossTicket7: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【俺已自了宫】',
                        category: '消耗品',
                        desc: '',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    stack: true,
                    maxStack: 10
                },
                bossTicket8: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【科多兽】',
                        category: '消耗品',
                        desc: '',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    stack: true,
                    maxStack: 10
                },
                bossTicket9: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【鬼神熊】',
                        category: '消耗品',
                        desc: '',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    stack: true,
                    maxStack: 10
                },
                bossTicket10: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【蛟龙】',
                        category: '消耗品',
                        desc: '',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    stack: true,
                    maxStack: 10
                },
                spell_nature_thunderclap: {
                    quality: 1,
                    description: {
                        name: '雷霆一击技能书',
                        category: '消耗品',
                        desc: '学习技能【雷霆一击】',
                        iconSrc: "./icons/spell/Spell_nature_thunderclap.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 20
                },
                spell_nature_thunderclap2: {
                    quality: 1,
                    description: {
                        name: '【二级】雷霆一击技能书',
                        category: '消耗品',
                        desc: '提升一级技能【雷霆一击】，上限为二级',
                        iconSrc: "./icons/spell/Spell_nature_thunderclap.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 45
                },
                spell_nature_thunderclap3: {
                    quality: 1,
                    description: {
                        name: '【三级】雷霆一击技能书',
                        category: '消耗品',
                        desc: '提升一级技能【雷霆一击】，上限为三级',
                        iconSrc: "./icons/spell/Spell_nature_thunderclap.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 70
                },
                spell_nature_thunderclap4: {
                    quality: 1,
                    description: {
                        name: '【四级】雷霆一击技能书',
                        category: '消耗品',
                        desc: '提升一级技能【雷霆一击】，上限为四级',
                        iconSrc: "./icons/spell/Spell_nature_thunderclap.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 95
                },
                spell_fire_flamebolt: {
                    quality: 1,
                    description: {
                        name: '火球术技能书',
                        category: '消耗品',
                        desc: '学习技能【火球术】',
                        iconSrc: "./icons/spell/spell_fire_flamebolt.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 30
                },
                spell_fire_flamebolt2: {
                    quality: 1,
                    description: {
                        name: '【二级】火球术技能书',
                        category: '消耗品',
                        desc: '提升一级技能【火球术】，上限为二级',
                        iconSrc: "./icons/spell/spell_fire_flamebolt.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 55
                },
                spell_fire_flamebolt3: {
                    quality: 1,
                    description: {
                        name: '【三级】火球术技能书',
                        category: '消耗品',
                        desc: '提升一级技能【火球术】，上限为三级',
                        iconSrc: "./icons/spell/spell_fire_flamebolt.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 80
                },
                spell_fire_flamebolt4: {
                    quality: 1,
                    description: {
                        name: '【四级】火球术技能书',
                        category: '消耗品',
                        desc: '提升一级技能【火球术】，上限为四级',
                        iconSrc: "./icons/spell/spell_fire_flamebolt.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 105
                },
                ability_warrior_shieldbash: {
                    quality: 1,
                    description: {
                        name: '盾击技能书',
                        category: '消耗品',
                        desc: '学习技能【盾击】',
                        iconSrc: "./icons/spell/ability_warrior_shieldbash.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 40
                },
                ability_warrior_shieldbash2: {
                    quality: 1,
                    description: {
                        name: '【二级】盾击技能书',
                        category: '消耗品',
                        desc: '提升一级技能【盾击】，上限为二级',
                        iconSrc: "./icons/spell/ability_warrior_shieldbash.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 65
                },
                ability_warrior_shieldbash3: {
                    quality: 1,
                    description: {
                        name: '【三级】盾击技能书',
                        category: '消耗品',
                        desc: '提升一级技能【盾击】，上限为三级',
                        iconSrc: "./icons/spell/ability_warrior_shieldbash.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 90
                },
                ability_warrior_shieldbash4: {
                    quality: 1,
                    description: {
                        name: '【四级】盾击技能书',
                        category: '消耗品',
                        desc: '提升一级技能【盾击】，上限为四级',
                        iconSrc: "./icons/spell/ability_warrior_shieldbash.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 115
                },
                ability_druid_maul: {
                    quality: 1,
                    description: {
                        name: '槌击技能书',
                        category: '消耗品',
                        desc: '学习技能【槌击】',
                        iconSrc: "./icons/spell/ability_druid_maul.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 50
                },
                ability_druid_maul2: {
                    quality: 1,
                    description: {
                        name: '【二级】槌击技能书',
                        category: '消耗品',
                        desc: '提升一级技能【槌击】，上限为二级',
                        iconSrc: "./icons/spell/ability_druid_maul.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 75
                },
                ability_druid_maul3: {
                    quality: 1,
                    description: {
                        name: '【三级】槌击技能书',
                        category: '消耗品',
                        desc: '提升一级技能【槌击】，上限为三级',
                        iconSrc: "./icons/spell/ability_druid_maul.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 100
                },
                ability_druid_maul4: {
                    quality: 1,
                    description: {
                        name: '【四级】槌击技能书',
                        category: '消耗品',
                        desc: '提升一级技能【槌击】，上限为四级',
                        iconSrc: "./icons/spell/ability_druid_maul.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 125
                },
                spell_shadow_ritualofsacrifice: {
                    quality: 1,
                    description: {
                        name: '影袭技能书',
                        category: '消耗品',
                        desc: '学习技能【影袭】',
                        iconSrc: "./icons/spell/spell_shadow_ritualofsacrifice.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 60
                },
                spell_shadow_ritualofsacrifice2: {
                    quality: 1,
                    description: {
                        name: '【二级】影袭技能书',
                        category: '消耗品',
                        desc: '提升一级技能【影袭】，上限为二级',
                        iconSrc: "./icons/spell/spell_shadow_ritualofsacrifice.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 85
                },
                spell_shadow_ritualofsacrifice3: {
                    quality: 1,
                    description: {
                        name: '【三级】影袭技能书',
                        category: '消耗品',
                        desc: '提升一级技能【影袭】，上限为三级',
                        iconSrc: "./icons/spell/spell_shadow_ritualofsacrifice.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 110
                },
                spell_holy_renew: {
                    quality: 1,
                    description: {
                        name: '恢复技能书',
                        category: '消耗品',
                        desc: '学习技能【恢复】',
                        iconSrc: "./icons/spell/spell_holy_renew.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 70
                },
                spell_holy_renew2: {
                    quality: 1,
                    description: {
                        name: '【二级】恢复技能书',
                        category: '消耗品',
                        desc: '提升一级技能【恢复】，上限为二级',
                        iconSrc: "./icons/spell/spell_holy_renew.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 95
                },
                spell_holy_renew3: {
                    quality: 1,
                    description: {
                        name: '【三级】恢复技能书',
                        category: '消耗品',
                        desc: '提升一级技能【恢复】，上限为四级',
                        iconSrc: "./icons/spell/spell_holy_renew.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 95
                },
                spell_warlock_soulburn: {
                    quality: 1,
                    description: {
                        name: '夺魂技能书',
                        category: '消耗品',
                        desc: '学习技能【夺魂】',
                        iconSrc: "./icons/spell/spell_warlock_soulburn.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 80
                },
                spell_warlock_soulburn2: {
                    quality: 1,
                    description: {
                        name: '【二级】夺魂技能书',
                        category: '消耗品',
                        desc: '提升一级技能【夺魂】，上限为二级',
                        iconSrc: "./icons/spell/spell_warlock_soulburn.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 105
                },
                ability_warrior_shatteringthrow: {
                    quality: 1,
                    description: {
                        name: '碎裂投掷技能书',
                        category: '消耗品',
                        desc: '学习技能【碎裂投掷】',
                        iconSrc: "./icons/spell/ability_warrior_shatteringthrow.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 90
                },
                ability_warrior_shatteringthrow2: {
                    quality: 1,
                    description: {
                        name: '【二级】碎裂投掷技能书',
                        category: '消耗品',
                        desc: '提升一级技能【碎裂投掷】，上限为二级',
                        iconSrc: "./icons/spell/ability_warrior_shatteringthrow.png",
                    },
                    stack: true,
                    maxStack: 20,
                    lvReq: 115
                },
                spell_holy_holybolt: {
                    quality: 2,
                    description: {
                        name: '圣光术技能书',
                        category: '消耗品',
                        desc: '学习技能【圣光术】',
                        iconSrc: "./icons/spell/spell_holy_holybolt.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 20
                },
                spell_holy_holybolt2: {
                    quality: 2,
                    description: {
                        name: '【二级】圣光术技能书',
                        category: '消耗品',
                        desc: '提升一级技能【圣光术】，上限为二级',
                        iconSrc: "./icons/spell/spell_holy_holybolt.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 45
                },
                spell_holy_holybolt3: {
                    quality: 2,
                    description: {
                        name: '【三级】圣光术技能书',
                        category: '消耗品',
                        desc: '提升一级技能【圣光术】，上限为三级',
                        iconSrc: "./icons/spell/spell_holy_holybolt.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 70
                },
                spell_holy_holybolt4: {
                    quality: 2,
                    description: {
                        name: '【四级】圣光术技能书',
                        category: '消耗品',
                        desc: '提升一级技能【圣光术】，上限为四级',
                        iconSrc: "./icons/spell/spell_holy_holybolt.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 115
                },
                spell_nature_lightning: {
                    quality: 2,
                    description: {
                        name: '闪电箭技能书',
                        category: '消耗品',
                        desc: '学习技能【闪电箭】',
                        iconSrc: "./icons/spell/Spell_nature_lightning.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 40
                },
                spell_nature_lightning2: {
                    quality: 2,
                    description: {
                        name: '【二级】闪电箭技能书',
                        category: '消耗品',
                        desc: '提升一级技能【闪电箭】，上限为二级',
                        iconSrc: "./icons/spell/Spell_nature_lightning.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 65
                },
                spell_nature_lightning3: {
                    quality: 2,
                    description: {
                        name: '【三级】闪电箭技能书',
                        category: '消耗品',
                        desc: '提升一级技能【闪电箭】，上限为三级',
                        iconSrc: "./icons/spell/Spell_nature_lightning.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 90
                },
                spell_nature_starfall: {
                    quality: 2,
                    description: {
                        name: '月火术技能书',
                        category: '消耗品',
                        desc: '学习技能【月火术】',
                        iconSrc: "./icons/spell/spell_nature_starfall.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 60
                },
                spell_nature_starfall2: {
                    quality: 2,
                    description: {
                        name: '【二级】月火术技能书',
                        category: '消耗品',
                        desc: '提升一级技能【月火术】，上限为二级',
                        iconSrc: "./icons/spell/spell_nature_starfall.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 85
                },
                spell_nature_starfall3: {
                    quality: 2,
                    description: {
                        name: '【三级】月火术技能书',
                        category: '消耗品',
                        desc: '提升一级技能【月火术】，上限为三级',
                        iconSrc: "./icons/spell/spell_nature_starfall.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 110
                },
                spell_holy_powerwordshield: {
                    quality: 2,
                    description: {
                        name: '圣佑术技能书',
                        category: '消耗品',
                        desc: '学习技能【圣佑术】',
                        iconSrc: "./icons/spell/spell_holy_powerwordshield.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 80
                },
                spell_holy_powerwordshield2: {
                    quality: 2,
                    description: {
                        name: '【二级】圣佑术技能书',
                        category: '消耗品',
                        desc: '提升一级技能【圣佑术】，上限为二级',
                        iconSrc: "./icons/spell/spell_holy_powerwordshield.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 105
                },
                spell_animabastion_buff: {
                    quality: 2,
                    description: {
                        name: '灵感技能书',
                        category: '消耗品',
                        desc: '学习技能【灵感】',
                        iconSrc: "./icons/spell/spell_animabastion_buff.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 100
                },
                spell_animaardenweald_orb: {
                    quality: 2,
                    description: {
                        name: '法夜祝福技能书',
                        category: '消耗品',
                        desc: '学习技能【法夜祝福】',
                        iconSrc: "./icons/spell/spell_animaardenweald_orb.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 120
                },
                spell_shadow_curseofmannoroth: {
                    quality: 3,
                    description: {
                        name: '残废术技能书',
                        category: '消耗品',
                        desc: '学习技能【残废术】',
                        iconSrc: "./icons/spell/spell_shadow_curseofmannoroth.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 20
                },
                spell_shadow_curseofmannoroth2: {
                    quality: 3,
                    description: {
                        name: '【二级】残废术技能书',
                        category: '消耗品',
                        desc: '提升一级技能【残废术】，上限为二级',
                        iconSrc: "./icons/spell/spell_shadow_curseofmannoroth.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 45
                },
                spell_shadow_curseofmannoroth3: {
                    quality: 3,
                    description: {
                        name: '【三级】残废术技能书',
                        category: '消耗品',
                        desc: '提升一级技能【残废术】，上限为三级',
                        iconSrc: "./icons/spell/spell_shadow_curseofmannoroth.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 70
                },
                spell_shadow_curseofmannoroth4: {
                    quality: 3,
                    description: {
                        name: '【四级】残废术技能书',
                        category: '消耗品',
                        desc: '提升一级技能【残废术】，上限为四级',
                        iconSrc: "./icons/spell/spell_shadow_curseofmannoroth.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 95
                },
                spell_shadow_curseofmannoroth5: {
                    quality: 3,
                    description: {
                        name: '【五级】残废术技能书',
                        category: '消耗品',
                        desc: '提升一级技能【残废术】，上限为五级',
                        iconSrc: "./icons/spell/spell_shadow_curseofmannoroth.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 120
                },
                spell_animaardenweald_groundstate: {
                    quality: 3,
                    description: {
                        name: '冥想技能书',
                        category: '消耗品',
                        desc: '学习技能【冥想】',
                        iconSrc: "./icons/spell/spell_animaardenweald_groundstate.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 50
                },
                spell_animaardenweald_groundstate2: {
                    quality: 3,
                    description: {
                        name: '【二级】冥想技能书',
                        category: '消耗品',
                        desc: '提升一级技能【冥想】，上限为二级',
                        iconSrc: "./icons/spell/spell_animaardenweald_groundstate.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 75
                },
                spell_animaardenweald_groundstate3: {
                    quality: 3,
                    description: {
                        name: '【三级】冥想技能书',
                        category: '消耗品',
                        desc: '提升一级技能【冥想】，上限为三级',
                        iconSrc: "./icons/spell/spell_animaardenweald_groundstate.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 100
                },
                spell_arcane_starfire: {
                    quality: 3,
                    description: {
                        name: '星火术技能书',
                        category: '消耗品',
                        desc: '学习技能【星火术】',
                        iconSrc: "./icons/spell/spell_arcane_starfire.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 80
                },
                spell_arcane_starfire2: {
                    quality: 3,
                    description: {
                        name: '【二级】星火术技能书',
                        category: '消耗品',
                        desc: '提升一级技能【星火术】，上限为二级',
                        iconSrc: "./icons/spell/spell_arcane_starfire.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 105
                },
                spell_holy_crusaderstrike: {
                    quality: 3,
                    description: {
                        name: '十字军打击技能书',
                        category: '消耗品',
                        desc: '学习技能【十字军打击】',
                        iconSrc: "./icons/spell/Spell_holy_crusaderstrike.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 80
                },
                spell_holy_crusaderstrike2: {
                    quality: 3,
                    description: {
                        name: '【二级】十字军打击技能书',
                        category: '消耗品',
                        desc:  '提升一级技能【十字军打击】，上限为二级',
                        iconSrc: "./icons/spell/Spell_holy_crusaderstrike.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 105
                },
                spell_nature_wispsplode: {
                    quality: 3,
                    description: {
                        name: '元素爆破技能书',
                        category: '消耗品',
                        desc: '学习技能【元素爆破】',
                        iconSrc: "./icons/spell/spell_nature_wispsplode.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 110
                },
                ability_rogue_shadowstrike: {
                    quality: 4,
                    description: {
                        name: '裂缝打击技能书',
                        category: '消耗品',
                        desc: '学习技能【裂缝打击】',
                        iconSrc: "./icons/spell/ability_rogue_shadowstrike.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 20
                },
                ability_rogue_shadowstrike2: {
                    quality: 4,
                    description: {
                        name: '【二级】裂缝打击技能书',
                        category: '消耗品',
                        desc: '提升一级技能【裂缝打击】，上限为二级',
                        iconSrc: "./icons/spell/ability_rogue_shadowstrike.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 45
                },
                ability_rogue_shadowstrike3: {
                    quality: 4,
                    description: {
                        name: '【三级】裂缝打击技能书',
                        category: '消耗品',
                        desc: '提升一级技能【裂缝打击】，上限为三级',
                        iconSrc: "./icons/spell/ability_rogue_shadowstrike.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 70
                },
                ability_rogue_shadowstrike4: {
                    quality: 4,
                    description: {
                        name: '【四级】裂缝打击技能书',
                        category: '消耗品',
                        desc: '提升一级技能【裂缝打击】，上限为四级',
                        iconSrc: "./icons/spell/ability_rogue_shadowstrike.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 95
                },
                spell_holy_innerfire: {
                    quality: 4,
                    description: {
                        name: '心灵之火技能书',
                        category: '消耗品',
                        desc: '学习技能【心灵之火】',
                        iconSrc: "./icons/spell/spell_holy_innerfire.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 60
                },
                spell_holy_innerfire2: {
                    quality: 4,
                    description: {
                        name: '【二级】心灵之火技能书',
                        category: '消耗品',
                        desc: '提升一级技能【心灵之火】，上限为二级',
                        iconSrc: "./icons/spell/spell_holy_innerfire.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 85
                },
                spell_holy_innerfire3: {
                    quality: 4,
                    description: {
                        name: '【三级】心灵之火技能书',
                        category: '消耗品',
                        desc: '提升一级技能【心灵之火】，上限为三级',
                        iconSrc: "./icons/spell/spell_holy_innerfire.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 120
                },
                spell_holy_layonhands: {
                    quality: 4,
                    description: {
                        name: '圣疗技能书',
                        category: '消耗品',
                        desc: '学习技能【圣疗】',
                        iconSrc: "./icons/spell/Spell_holy_layonhands.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 100
                },
                spell_holy_layonhands2: {
                    quality: 4,
                    description: {
                        name: '【二级】圣疗技能书',
                        category: '消耗品',
                        desc: '提升一级技能【圣疗】，上限为二级',
                        iconSrc: "./icons/spell/Spell_holy_layonhands.png",
                    },
                    stack: true,
                    maxStack: 10,
                    lvReq: 125
                },
                ability_druid_starfall: {
                    quality: 5,
                    description: {
                        name: '无尽之星技能书',
                        category: '消耗品',
                        desc: '学习技能【无尽之星】',
                        iconSrc: "./icons/spell/ability_druid_starfall.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 20
                },
                ability_druid_starfall2: {
                    quality: 5,
                    description: {
                        name: '【二级】无尽之星技能书',
                        category: '消耗品',
                        desc: '提升一级技能【无尽之星】，上限为二级',
                        iconSrc: "./icons/spell/ability_druid_starfall.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 70
                },
                ability_druid_starfall3: {
                    quality: 5,
                    description: {
                        name: '【三级】无尽之星技能书',
                        category: '消耗品',
                        desc: '提升一级技能【无尽之星】，上限为三级',
                        iconSrc: "./icons/spell/ability_druid_starfall.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 120
                },
                warrior_talent_icon_innerrage: {
                    quality: 5,
                    description: {
                        name: '鲁莽技能书',
                        category: '消耗品',
                        desc: '学习技能【鲁莽】',
                        iconSrc: "./icons/spell/warrior_talent_icon_innerrage.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 70
                },
                warrior_talent_icon_innerrage2: {
                    quality: 5,
                    description: {
                        name: '【二级】鲁莽技能书',
                        category: '消耗品',
                        desc: '提升一级技能【鲁莽】，上限为二级',
                        iconSrc: "./icons/spell/warrior_talent_icon_innerrage.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 120
                },
                ability_revendreth_paladin: {
                    quality: 6,
                    description: {
                        name: '血祭技能书',
                        category: '消耗品',
                        desc: '学习技能【血祭】',
                        iconSrc: "./icons/spell/ability_revendreth_paladin.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 10
                },
                ability_revendreth_paladin2: {
                    quality: 6,
                    description: {
                        name: '【二级】血祭技能书',
                        category: '消耗品',
                        desc: '提升一级技能【血祭】，上限为二级',
                        iconSrc: "./icons/spell/ability_revendreth_paladin.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 60
                },
                ability_revendreth_paladin3: {
                    quality: 6,
                    description: {
                        name: '【三级】血祭技能书',
                        category: '消耗品',
                        desc: '提升一级技能【血祭】，上限为三级',
                        iconSrc: "./icons/spell/ability_revendreth_paladin.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 110
                },
                ability_ardenweald_paladin_summer: {
                    quality: 6,
                    description: {
                        name: '仲夏祝福技能书',
                        category: '消耗品',
                        desc: '学习技能【仲夏祝福】',
                        iconSrc: "./icons/spell/ability_ardenweald_paladin_summer.png",
                    },
                    stack: true,
                    maxStack: 5,
                    lvReq: 100
                },
            }
        }
    }
}