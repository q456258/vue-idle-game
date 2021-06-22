
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
                        desc: '精英怪用私房钱买的家当，来之不易，打开后随机获得金币、水晶、装备、技能书',
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
                spell_nature_thunderclap: {
                    quality: 1,
                    description: {
                        name: '雷霆一击技能书',
                        category: '消耗品',
                        desc: '学习技能【雷霆一击】',
                        iconSrc: "./icons/spell/Spell_nature_thunderclap.png",
                    },
                    stack: false,
                },
                spell_nature_lightning: {
                    quality: 2,
                    description: {
                        name: '闪电箭技能书',
                        category: '消耗品',
                        desc: '学习技能【闪电箭】',
                        iconSrc: "./icons/spell/Spell_nature_lightning.png",
                    },
                    stack: false,
                },
                spell_holy_crusaderstrike: {
                    quality: 3,
                    description: {
                        name: '十字军打击技能书',
                        category: '消耗品',
                        desc: '学习技能【十字军打击】',
                        iconSrc: "./icons/spell/Spell_holy_crusaderstrike.png",
                    },
                    stack: false,
                },
                spell_shadow_ritualofsacrifice: {
                    quality: 1,
                    description: {
                        name: '影袭技能书',
                        category: '消耗品',
                        desc: '学习技能【影袭】',
                        iconSrc: "./icons/spell/spell_shadow_ritualofsacrifice.png",
                    },
                    stack: false,
                },
                spell_holy_layonhands: {
                    quality: 2,
                    description: {
                        name: '圣疗技能书',
                        category: '消耗品',
                        desc: '学习技能【圣疗】',
                        iconSrc: "./icons/spell/Spell_holy_layonhands.png",
                    },
                    stack: false,
                },
                spell_holy_holybolt: {
                    quality: 2,
                    description: {
                        name: '圣光术技能书',
                        category: '消耗品',
                        desc: '学习技能【圣光术】',
                        iconSrc: "./icons/spell/spell_holy_holybolt.png",
                    },
                    stack: false,
                },
                spell_arcane_starfire: {
                    quality: 3,
                    description: {
                        name: '星火术技能书',
                        category: '消耗品',
                        desc: '学习技能【星火术】',
                        iconSrc: "./icons/spell/spell_arcane_starfire.png",
                    },
                    stack: false,
                },
                spell_nature_starfall: {
                    quality: 2,
                    description: {
                        name: '月火术技能书',
                        category: '消耗品',
                        desc: '学习技能【月火术】',
                        iconSrc: "./icons/spell/spell_nature_starfall.png",
                    },
                    stack: false,
                },
                ability_warrior_shieldbash: {
                    quality: 1,
                    description: {
                        name: '盾击技能书',
                        category: '消耗品',
                        desc: '学习技能【盾击】',
                        iconSrc: "./icons/spell/ability_warrior_shieldbash.png",
                    },
                    stack: false,
                },
                ability_druid_maul: {
                    quality: 1,
                    description: {
                        name: '槌击技能书',
                        category: '消耗品',
                        desc: '学习技能【槌击】',
                        iconSrc: "./icons/spell/ability_druid_maul.png",
                    },
                    stack: false,
                },
                spell_fire_flamebolt: {
                    quality: 1,
                    description: {
                        name: '火球术技能书',
                        category: '消耗品',
                        desc: '学习技能【火球术】',
                        iconSrc: "./icons/spell/spell_fire_flamebolt.png",
                    },
                    stack: false,
                },
            }
        }
    }
}