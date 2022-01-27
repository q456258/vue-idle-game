export const itemConfig = {
    data() {
        return {
            itemQuality: [{
              name: '贫乏',
              qualityLv: 1,
              color: '#9D9D9D',
            }, {
              name: '普通',
              qualityLv: 2,
              color: '#D9D9D9', 
            }, {
              name: '罕见',
              qualityLv: 3,
              color: '#1EFF00', 
            }, {
              name: '稀有',
              qualityLv: 4,
              color: '#0070DD', 
            }, {
              name: '史诗',
              qualityLv: 5,
              color: '#9345FF', 
            }, {
              name: '传奇',
              qualityLv: 6,
              color: '#FF8000', 
            }],
            itemType:
            {
                inv_ore_copper_01: {
                    quality: 1,
                    description: {
                        name: '铜矿石',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ore_copper_01.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_ingot_02: {
                    quality: 2,
                    description: {
                        name: '铜锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_02.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_ore_tin_01: {
                    quality: 1,
                    description: {
                        name: '锡矿石',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ore_tin_01.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_ingot_05: {
                    quality: 2,
                    description: {
                        name: '锡锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_05.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_stone_16: {
                    quality: 1,
                    description: {
                        name: '银矿石',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_stone_16.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_ingot_01: {
                    quality: 2,
                    description: {
                        name: '银锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_01.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_ore_iron_01: {
                    quality: 1,
                    description: {
                        name: '铁矿石',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ore_iron_01.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_ingot_iron: {
                    quality: 2,
                    description: {
                        name: '铁锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_iron.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_ingot_steel: {
                    quality: 2,
                    description: {
                        name: '钢锭',
                        category: '材料',
                        desc: '由铁矿石合成',
                        iconSrc: "./icons/material/inv_ingot_steel.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_ore_gold_01: {
                    quality: 1,
                    description: {
                        name: '金矿石',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ore_gold_01.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_ingot_03: {
                    quality: 2,
                    description: {
                        name: '金锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_03.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_ore_mithril_02: {
                    quality: 1,
                    description: {
                        name: '秘银矿石',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ore_mithril_02.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_ingot_06: {
                    quality: 2,
                    description: {
                        name: '秘银锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_06.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_ore_truesilver_01: {
                    quality: 1,
                    description: {
                        name: '真银矿石',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ore_truesilver_01.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_ingot_08: {
                    quality: 2,
                    description: {
                        name: '真银锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_08.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_ore_thorium_02: {
                    quality: 1,
                    description: {
                        name: '瑟银矿石',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ore_thorium_02.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_ingot_07: {
                    quality: 2,
                    description: {
                        name: '瑟银锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_07.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_ore_mithril_01: {
                    quality: 1,
                    description: {
                        name: '黑铁矿石',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ore_mithril_01.png",
                    },
                    stack: true,
                    maxStack: 100
                },
                inv_ingot_mithril: {
                    quality: 2,
                    description: {
                        name: '黑铁锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_mithril.png",
                    },
                    stack: true,
                    maxStack: 100
                },
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
                inv_enchant_voidsphere: {
                    quality: 2,
                    description: {
                        name: '虚空宝珠',
                        category: '材料',
                        desc: '具有神秘力量的宝珠，能够重置装备的附加属性',
                        iconSrc: "./icons/item/Inv_enchant_voidsphere.png",
                    },
                    stack: true,
                    maxStack: 9999
                },
                inv_misc_gem_diamond_05: {
                    quality: 1,
                    description: {
                        name: '低级强化石',
                        category: '材料',
                        desc: '强化装备的材料，能够提升装备基础属性，可用于强化装备1-5星',
                        iconSrc: "./icons/item/Inv_misc_gem_diamond_05.png",
                    },
                    stack: true,
                    maxStack: 9999
                },
                inv_misc_gem_diamond_04: {
                    quality: 2,
                    description: {
                        name: '中级强化石',
                        category: '材料',
                        desc: '强化装备的材料，能够提升装备基础属性，可用于强化装备6-10星',
                        iconSrc: "./icons/item/Inv_misc_gem_diamond_04.png",
                    },
                    stack: true,
                    maxStack: 9999
                },
                inv_misc_gem_diamond_03: {
                    quality: 3,
                    description: {
                        name: '高级强化石',
                        category: '材料',
                        desc: '强化装备的材料，能够提升装备基础属性，可用于强化装备11-15星',
                        iconSrc: "./icons/item/Inv_misc_gem_diamond_03.png",
                    },
                    stack: true,
                    maxStack: 9999
                },
                inv_misc_gem_diamond_02: {
                    quality: 4,
                    description: {
                        name: '顶级强化石',
                        category: '材料',
                        desc: '强化装备的材料，能够提升装备基础属性，可用于强化装备16-20星',
                        iconSrc: "./icons/item/Inv_misc_gem_diamond_02.png",
                    },
                    stack: true,
                    maxStack: 9999
                },
                inv_misc_gem_diamond_01: {
                    quality: 5,
                    description: {
                        name: '终极强化石',
                        category: '材料',
                        desc: '强化装备的材料，能够提升装备基础属性，可用于强化装备21-25星',
                        iconSrc: "./icons/item/Inv_misc_gem_diamond_01.png",
                    },
                    stack: true,
                    maxStack: 9999
                },
                dust2: {
                    quality: 2,
                    description: {
                        name: '普通装备精华',
                        category: '材料',
                        desc: '分解普通装备获得，可用于升级普通品质的装备，可消耗10个合成精良装备精华',
                        iconSrc: "./icons/item/Inv_enchanting_dust.png",
                    },
                    stack: true,
                    merge: true,
                    mergeCount: 10,
                    mergeTarget: 'dust3',
                    maxStack: 1000
                },
                dust3: {
                    quality: 3,
                    description: {
                        name: '精良装备精华',
                        category: '材料',
                        desc: '分解精良装备获得，可用于升级精良品质的装备，可消耗10个合成完美装备精华',
                        iconSrc: "./icons/item/Inv_enchanting_70_arkhana.png",
                    },
                    stack: true,
                    merge: true,
                    mergeCount: 10,
                    mergeTarget: 'dust4',
                    maxStack: 1000
                },
                dust4: {
                    quality: 4,
                    description: {
                        name: '完美装备精华',
                        category: '材料',
                        desc: '分解完美装备获得，可用于升级完美品质的装备，可消耗10个合成史诗装备精华',
                        iconSrc: "./icons/item/Inv_misc_dust_infinite.png",
                    },
                    stack: true,
                    merge: true,
                    mergeCount: 10,
                    mergeTarget: 'dust5',
                    maxStack: 1000
                },
                dust5: {
                    quality: 5,
                    description: {
                        name: '史诗装备精华',
                        category: '材料',
                        desc: '分解史诗装备获得，可用于升级史诗品质的装备，可消耗10个合成传奇装备精华',
                        iconSrc: "./icons/item/Inv_enchanting_wod_dust3.png",
                    },
                    stack: true,
                    merge: true,
                    mergeCount: 10,
                    mergeTarget: 'dust6',
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
                    use: true,
                    stack: true,
                    maxStack: 5
                }, 
                inv_misc_note_06: {
                    quality: 1,
                    description: {
                        name: '招募启事',
                        category: '消耗品',
                        desc: '发布招募声明，吸引路人来申请公会',
                        iconSrc: "./icons/item/inv_misc_note_06.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 20
                },
                bTNMGExchange: {
                    quality: 1,
                    description: {
                        name: '少量金币',
                        category: '消耗品',
                        desc: '获得少量金币',
                        iconSrc: "./icons/item/BTNMGExchange.png",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    maxStack: 20
                },
                inv_misc_coin_01: {
                    quality: 2,
                    description: {
                        name: '中量金币',
                        category: '消耗品',
                        desc: '获得中量金币',
                        iconSrc: "./icons/item/Inv_misc_coin_01.png",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    maxStack: 20
                },
                inv_misc_coin_02: {
                    quality: 3,
                    description: {
                        name: '大量金币',
                        category: '消耗品',
                        desc: '获得大量金币',
                        iconSrc: "./icons/item/Inv_misc_coin_02.png",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    maxStack: 20
                },
                random_equip_0: {
                    quality: 1,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '大概率获得一件垃圾装备',
                        iconSrc: "./icons/item/BTNSelectHeroOn.png",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    maxStack: 20
                },
                random_equip_1: {
                    quality: 1,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '大概率获得一件垃圾装备',
                        iconSrc: "./icons/item/BTNSelectHeroOn.png",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    maxStack: 20
                },
                random_equip_2: {
                    quality: 2,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '大概率获得一件普通装备',
                        iconSrc: "./icons/item/BTNSelectHeroOn.png",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    maxStack: 20
                },
                random_equip_3: {
                    quality: 2,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '大概率获得一件普通装备',
                        iconSrc: "./icons/item/BTNSelectHeroOn.png",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    maxStack: 20
                },
                random_equip_4: {
                    quality: 3,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '大概率获得一件良品装备',
                        iconSrc: "./icons/item/BTNSelectHeroOn.png",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    maxStack: 20
                },
                random_equip_5: {
                    quality: 3,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '大概率获得一件良品装备',
                        iconSrc: "./icons/item/BTNSelectHeroOn.png",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    maxStack: 20
                },
                random_equip_6: {
                    quality: 4,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '大概率获得一件优质装备',
                        iconSrc: "./icons/item/BTNSelectHeroOn.png",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    maxStack: 20
                },
                random_equip_7: {
                    quality: 4,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '大概率获得一件优质装备',
                        iconSrc: "./icons/item/BTNSelectHeroOn.png",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    maxStack: 20
                },
                random_equip_8: {
                    quality: 5,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '大概率获得一件极品装备',
                        iconSrc: "./icons/item/BTNSelectHeroOn.png",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    maxStack: 20
                },
                random_equip_9: {
                    quality: 5,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '大概率获得一件极品装备',
                        iconSrc: "./icons/item/BTNSelectHeroOn.png",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    maxStack: 20
                },
                //'导师', '阿迦玛', '金牙', '霍格', '铁背龟', '熔岩元素', '咕噜咕拉', '塞瑞娜·血羽', '科多兽', '维斯迦尔', '安戈雷尔'
                bossTicket0: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【导师】',
                        category: '消耗品',
                        desc: '挑战【导师】',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 10
                },
                bossTicket1: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【阿迦玛】',
                        category: '消耗品',
                        desc: '挑战野猪王【阿迦玛】',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 10
                },
                bossTicket2: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【金牙】',
                        category: '消耗品',
                        desc: '挑战狗头人头目【金牙】',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 10
                },
                bossTicket3: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【霍格】',
                        category: '消耗品',
                        desc: '挑战豺狼人首领【霍格】',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 10
                },
                bossTicket4: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【铁背龟】',
                        category: '消耗品',
                        desc: '挑战乌龟BOSS【铁背龟】',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 10
                },
                bossTicket5: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【熔岩元素】',
                        category: '消耗品',
                        desc: '挑战元素BOSS【熔岩元素',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 10
                },
                bossTicket6: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【咕噜咕拉】',
                        category: '消耗品',
                        desc: '挑战鱼人首领【咕噜咕拉】',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 10
                },
                bossTicket7: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【塞瑞娜·血羽】',
                        category: '消耗品',
                        desc: '挑战鸟人头目【塞瑞娜·血羽】',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 10
                },
                bossTicket8: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【科多兽】',
                        category: '消耗品',
                        desc: '挑战蜥蜴头目【科多兽】',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 10
                },
                bossTicket9: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【维斯迦尔】',
                        category: '消耗品',
                        desc: '挑战熊怪首领【维斯迦尔】',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 10
                },
                bossTicket10: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【安戈雷尔】',
                        category: '消耗品',
                        desc: '挑战美味的龙虾【安戈雷尔】',
                        iconSrc: "./icons/item/Inv_crate_01.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 10
                },
                //potion
                Inv_alchemy_80_potion01red: {
                    quality: 1,
                    description: {
                        name: '特效生命药水',
                        category: '消耗品',
                        desc: '恢复100%生命值，战斗期间无法使用',
                        iconSrc: "./icons/potion/Inv_alchemy_80_potion01red.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_alchemy_80_potion01blue: {
                    quality: 1,
                    description: {
                        name: '特效法力药水',
                        category: '消耗品',
                        desc: '恢复100%法力值，战斗期间无法使用',
                        iconSrc: "./icons/potion/Inv_alchemy_80_potion01blue.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_49: {
                    quality: 2,
                    description: {
                        name: '初级治疗药水',
                        category: '消耗品',
                        desc: '每秒恢复15点生命值，持续10秒',
                        iconSrc: "./icons/potion/Inv_potion_49.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                Inv_potion_50: {
                    quality: 2,
                    description: {
                        name: '初级生命药水',
                        category: '消耗品',
                        desc: '恢复100生命值',
                        iconSrc: "./icons/potion/Inv_potion_50.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                Inv_potion_51: {
                    quality: 3,
                    description: {
                        name: '次级治疗药水',
                        category: '消耗品',
                        desc: '每秒恢复150点生命值，持续10秒',
                        iconSrc: "./icons/potion/Inv_potion_51.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_52: {
                    quality: 3,
                    description: {
                        name: '次级生命药水',
                        category: '消耗品',
                        desc: '恢复1000生命值',
                        iconSrc: "./icons/potion/Inv_potion_52.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_53: {
                    quality: 4,
                    description: {
                        name: '治疗药水',
                        category: '消耗品',
                        desc: '每秒恢复1500点生命值，持续10秒',
                        iconSrc: "./icons/potion/Inv_potion_53.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_54: {
                    quality: 4,
                    description: {
                        name: '生命药水',
                        category: '消耗品',
                        desc: '恢复10000生命值',
                        iconSrc: "./icons/potion/Inv_potion_54.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_160: {
                    quality: 3,
                    description: {
                        name: '强效治疗药水',
                        category: '消耗品',
                        desc: '每秒恢复1%最大生命值，持续100秒',
                        iconSrc: "./icons/potion/Inv_potion_160.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_55: {
                    quality: 4,
                    description: {
                        name: '超级治疗药水',
                        category: '消耗品',
                        desc: '每秒恢复5%最大生命值，持续100秒',
                        iconSrc: "./icons/potion/Inv_potion_55.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_131: {
                    quality: 3,
                    description: {
                        name: '强效生命药水',
                        category: '消耗品',
                        desc: '恢复25%最大生命值',
                        iconSrc: "./icons/potion/Inv_potion_131.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_142: {
                    quality: 4,
                    description: {
                        name: '超级生命药水',
                        category: '消耗品',
                        desc: '恢复50%最大生命值',
                        iconSrc: "./icons/potion/Inv_potion_142.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_167: {
                    quality: 5,
                    description: {
                        name: '终极生命药水',
                        category: '消耗品',
                        desc: '恢复100%最大生命值',
                        iconSrc: "./icons/potion/Inv_potion_167.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_70: {
                    quality: 2,
                    description: {
                        name: '初级魔能药水',
                        category: '消耗品',
                        desc: '每秒恢复15点魔法值，持续10秒',
                        iconSrc: "./icons/potion/Inv_potion_70.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100,
                    cdgroup: 'mpPotion',
                    cd: 15
                },
                Inv_potion_71: {
                    quality: 2,
                    description: {
                        name: '初级法力药水',
                        category: '消耗品',
                        desc: '恢复100法力值',
                        iconSrc: "./icons/potion/Inv_potion_71.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_72: {
                    quality: 3,
                    description: {
                        name: '次级魔能药水',
                        category: '消耗品',
                        desc: '每秒恢复150点法力值，持续10秒',
                        iconSrc: "./icons/potion/Inv_potion_72.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_73: {
                    quality: 3,
                    description: {
                        name: '次级法力药水',
                        category: '消耗品',
                        desc: '恢复1000法力值',
                        iconSrc: "./icons/potion/Inv_potion_73.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_74: {
                    quality: 4,
                    description: {
                        name: '魔能药水',
                        category: '消耗品',
                        desc: '每秒恢复1500点法力值，持续10秒',
                        iconSrc: "./icons/potion/Inv_potion_74.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_75: {
                    quality: 4,
                    description: {
                        name: '法力药水',
                        category: '消耗品',
                        desc: '恢复10000法力值',
                        iconSrc: "./icons/potion/Inv_potion_75.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_163: {
                    quality: 3,
                    description: {
                        name: '强效魔能药水',
                        category: '消耗品',
                        desc: '每秒恢复1%最大法力值，持续100秒',
                        iconSrc: "./icons/potion/Inv_potion_163.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_76: {
                    quality: 4,
                    description: {
                        name: '超级魔能药水',
                        category: '消耗品',
                        desc: '每秒恢复5%最大法力值，持续100秒',
                        iconSrc: "./icons/potion/Inv_potion_76.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_137: {
                    quality: 3,
                    description: {
                        name: '强效法力药水',
                        category: '消耗品',
                        desc: '恢复25%最大法力值',
                        iconSrc: "./icons/potion/Inv_potion_137.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_148: {
                    quality: 4,
                    description: {
                        name: '超级法力药水',
                        category: '消耗品',
                        desc: '恢复50%最大法力值',
                        iconSrc: "./icons/potion/Inv_potion_148.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_168: {
                    quality: 5,
                    description: {
                        name: '终极法力药水',
                        category: '消耗品',
                        desc: '恢复100%最大法力值',
                        iconSrc: "./icons/potion/Inv_potion_168.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_42: {
                    quality: 2,
                    description: {
                        name: '初级恢复药水',
                        category: '消耗品',
                        desc: '每秒恢复15点生命值以及15点魔法值，持续10秒',
                        iconSrc: "./icons/potion/Inv_potion_42.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_43: {
                    quality: 2,
                    description: {
                        name: '初级活力药水',
                        category: '消耗品',
                        desc: '恢复100生命值以及100点魔法值',
                        iconSrc: "./icons/potion/Inv_potion_43.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_44: {
                    quality: 3,
                    description: {
                        name: '次级恢复药水',
                        category: '消耗品',
                        desc: '每秒恢复150点生命值以及150点魔法值，持续10秒',
                        iconSrc: "./icons/potion/Inv_potion_44.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_45: {
                    quality: 3,
                    description: {
                        name: '次级活力药水',
                        category: '消耗品',
                        desc: '恢复1000生命值以及1000点魔法值',
                        iconSrc: "./icons/potion/Inv_potion_45.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_46: {
                    quality: 4,
                    description: {
                        name: '恢复药水',
                        category: '消耗品',
                        desc: '每秒恢复1500点生命值以及1500点魔法值，持续10秒',
                        iconSrc: "./icons/potion/Inv_potion_46.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_47: {
                    quality: 4,
                    description: {
                        name: '活力药水',
                        category: '消耗品',
                        desc: '恢复10000生命值以及10000点魔法值',
                        iconSrc: "./icons/potion/Inv_potion_47.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_164: {
                    quality: 3,
                    description: {
                        name: '强效恢复药水',
                        category: '消耗品',
                        desc: '每秒恢复1%最大生命值，持续100秒',
                        iconSrc: "./icons/potion/Inv_potion_164.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_48: {
                    quality: 4,
                    description: {
                        name: '超级恢复药水',
                        category: '消耗品',
                        desc: '每秒恢复5%最大生命值，持续100秒',
                        iconSrc: "./icons/potion/Inv_potion_48.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_134: {
                    quality: 4,
                    description: {
                        name: '强效活力药水',
                        category: '消耗品',
                        desc: '恢复33%最大生命值以及魔法值',
                        iconSrc: "./icons/potion/Inv_potion_134.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
                Inv_potion_145: {
                    quality: 5,
                    description: {
                        name: '超级活力药水',
                        category: '消耗品',
                        desc: '恢复75%最大生命值以及魔法值',
                        iconSrc: "./icons/potion/Inv_potion_145.png",
                    },
                    use: true,
                    stack: true,
                    maxStack: 100
                },
            }
        }
    }
}