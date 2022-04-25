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
                        iconSrc: "./icons/material/inv_ore_copper_01.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_ingot_02: {
                    quality: 2,
                    description: {
                        name: '铜锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_02.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_ore_tin_01: {
                    quality: 1,
                    description: {
                        name: '锡矿石',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ore_tin_01.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_ingot_05: {
                    quality: 2,
                    description: {
                        name: '锡锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_05.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_stone_16: {
                    quality: 1,
                    description: {
                        name: '银矿石',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_stone_16.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_ingot_01: {
                    quality: 2,
                    description: {
                        name: '银锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_01.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_ore_iron_01: {
                    quality: 1,
                    description: {
                        name: '铁矿石',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ore_iron_01.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_ingot_iron: {
                    quality: 2,
                    description: {
                        name: '铁锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_iron.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_ingot_steel: {
                    quality: 2,
                    description: {
                        name: '钢锭',
                        category: '材料',
                        desc: '由铁矿石合成',
                        iconSrc: "./icons/material/inv_ingot_steel.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_ore_gold_01: {
                    quality: 1,
                    description: {
                        name: '金矿石',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ore_gold_01.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_ingot_03: {
                    quality: 2,
                    description: {
                        name: '金锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_03.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_ore_mithril_02: {
                    quality: 1,
                    description: {
                        name: '秘银矿石',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ore_mithril_02.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_ingot_06: {
                    quality: 2,
                    description: {
                        name: '秘银锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_06.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_ore_truesilver_01: {
                    quality: 1,
                    description: {
                        name: '真银矿石',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ore_truesilver_01.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_ingot_08: {
                    quality: 2,
                    description: {
                        name: '真银锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_08.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_ore_thorium_02: {
                    quality: 1,
                    description: {
                        name: '瑟银矿石',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ore_thorium_02.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_ingot_07: {
                    quality: 2,
                    description: {
                        name: '瑟银锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_07.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_ore_mithril_01: {
                    quality: 1,
                    description: {
                        name: '黑铁矿石',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ore_mithril_01.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_ingot_mithril: {
                    quality: 2,
                    description: {
                        name: '黑铁锭',
                        category: '材料',
                        desc: '',
                        iconSrc: "./icons/material/inv_ingot_mithril.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_misc_enchantedpearla: {
                    quality: 2,
                    description: {
                        name: '神秘宝珠',
                        category: '材料',
                        desc: '具有神秘力量的宝珠, 能够重置装备的潜在属性',
                        iconSrc: "./icons/item/inv_misc_enchantedpearla.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100
                },
                inv_enchant_voidsphere: {
                    quality: 2,
                    description: {
                        name: '虚空宝珠',
                        category: '材料',
                        desc: '具有神秘力量的宝珠, 能够重置装备的附加属性',
                        iconSrc: "./icons/item/inv_enchant_voidsphere.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 9999
                },
                inv_misc_gem_diamond_05: {
                    quality: 1,
                    description: {
                        name: '杂色强化石碎片',
                        category: '材料',
                        desc: '强化装备的材料, 能够提升装备基础属性, 提升1点强化进度',
                        iconSrc: "./icons/item/inv_misc_gem_diamond_05.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 9999
                },
                inv_misc_gem_diamond_04: {
                    quality: 2,
                    description: {
                        name: '杂色强化石',
                        category: '材料',
                        desc: '强化装备的材料, 能够提升装备基础属性, 提升5点强化进度',
                        iconSrc: "./icons/item/inv_misc_gem_diamond_04.jpg",
                    },
                    stack: true,
                    quantity: 2,
                    cost: 99990000,
                    maxStack: 9999
                },
                inv_misc_gem_diamond_03: {
                    quality: 3,
                    description: {
                        name: '纯净强化石碎片',
                        category: '材料',
                        desc: '强化装备的材料, 能够提升装备基础属性, 提升10点强化进度',
                        iconSrc: "./icons/item/inv_misc_gem_diamond_03.jpg",
                    },
                    stack: true,
                    quantity: 3,
                    cost: 99990000,
                    maxStack: 9999
                },
                inv_misc_gem_diamond_02: {
                    quality: 4,
                    description: {
                        name: '纯净强化石',
                        category: '材料',
                        desc: '强化装备的材料, 能够提升装备基础属性, 提升25点强化进度',
                        iconSrc: "./icons/item/inv_misc_gem_diamond_02.jpg",
                    },
                    stack: true,
                    quantity: 4,
                    cost: 99990000,
                    maxStack: 9999
                },
                inv_misc_gem_diamond_01: {
                    quality: 5,
                    description: {
                        name: '无暇强化石',
                        category: '材料',
                        desc: '强化装备的材料, 能够提升装备基础属性, 提升100点强化进度',
                        iconSrc: "./icons/item/inv_misc_gem_diamond_01.jpg",
                    },
                    stack: true,
                    quantity: 5,
                    cost: 99990000,
                    maxStack: 9999
                },
                dust2: {
                    quality: 2,
                    description: {
                        name: '普通装备精华',
                        category: '材料',
                        desc: '分解普通装备获得, 可用于升级普通品质的装备, 可消耗10个合成精良装备精华',
                        iconSrc: "./icons/item/inv_enchanting_dust.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
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
                        desc: '分解精良装备获得, 可用于升级精良品质的装备, 可消耗10个合成完美装备精华',
                        iconSrc: "./icons/item/inv_enchanting_70_arkhana.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
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
                        desc: '分解完美装备获得, 可用于升级完美品质的装备, 可消耗10个合成史诗装备精华',
                        iconSrc: "./icons/item/inv_misc_dust_infinite.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
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
                        desc: '分解史诗装备获得, 可用于升级史诗品质的装备, 可消耗10个合成传奇装备精华',
                        iconSrc: "./icons/item/inv_enchanting_wod_dust3.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
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
                        desc: '分解传奇装备获得, 可用于升级传奇品质的装备',
                        iconSrc: "./icons/item/inv_enchant_dustillusion.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 1000
                },
                inv_potion_27: {
                    quality: 4,
                    description: {
                        name: '屠魔药剂',
                        category: '消耗品',
                        desc: '使用后获得【野怪杀手】buff, 对对冒险区非精英、BOSS类怪物额外造成50%伤害, 持续10分钟',
                        iconSrc: "./icons/item/inv_potion_27.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 5
                }, 
                inv_misc_note_06: {
                    quality: 1,
                    description: {
                        name: '招募启事',
                        category: '消耗品',
                        desc: '发布招募声明, 吸引路人来申请公会',
                        iconSrc: "./icons/item/inv_misc_note_06.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                racial_dwarf_findtreasure: {
                    quality: 1,
                    description: {
                        name: '少量金币',
                        category: '消耗品',
                        desc: '获得少量金币',
                        iconSrc: "./icons/item/racial_dwarf_findtreasure.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                inv_misc_coin_01: {
                    quality: 2,
                    description: {
                        name: '中量金币',
                        category: '消耗品',
                        desc: '获得中量金币',
                        iconSrc: "./icons/item/inv_misc_coin_01.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                inv_misc_coin_02: {
                    quality: 3,
                    description: {
                        name: '大量金币',
                        category: '消耗品',
                        desc: '获得大量金币',
                        iconSrc: "./icons/item/inv_misc_coin_02.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_equip_normal_0: {
                    quality: 1,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '大概率获得一件【力量、敏捷、耐力】类型的垃圾武器、基础防具',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_equip_normal_1: {
                    quality: 1,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '有概率获得一件类型的普通武器、基础防具',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_equip_normal_2: {
                    quality: 1,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '极小概率获得一件优质武器、基础防具',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_equip_normal_3: {
                    quality: 1,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '小概率获得一件优质武器、基础防具',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_equip_normal_4: {
                    quality: 1,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '极小概率获得一件极品武器、防具',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_equip_normal_10: {
                    quality: 1,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '必定获得一件【力量、敏捷、耐力】类型的垃圾武器、基础防具',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_equip_elite_1: {
                    quality: 1,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '有概率获得一件【力量、敏捷、耐力】类型的垃圾武器、防具',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_equip_elite_3: {
                    quality: 1,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '小概率获得一件优质武器、防具',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_equip_elite_4: {
                    quality: 1,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '极小概率获得一件极品武器、防具',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_equip_4: {
                    quality: 3,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '极小概率获得一件极品装备',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_equip_5: {
                    quality: 3,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '极小概率获得一件神器',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_equip_6: {
                    quality: 4,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '大概率获得一件优质装备, 极小概率获得一件神器',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_equip_7: {
                    quality: 4,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '大概率获得一件优质装备',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_equip_8: {
                    quality: 5,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '大概率获得一件极品装备',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_equip_9: {
                    quality: 5,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '大概率获得一件极品装备',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                //'导师', '阿迦玛', '金牙', '霍格', '铁背龟', '熔岩元素', '咕噜咕拉', '塞瑞娜·血羽', '科多兽', '维斯迦尔', '安戈雷尔'
                bossTicket0: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【导师】',
                        category: '消耗品',
                        desc: '挑战【导师】',
                        iconSrc: "./icons/item/inv_crate_01.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 10
                },
                bossTicket1: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【阿迦玛】',
                        category: '消耗品',
                        desc: '挑战野猪王【阿迦玛】',
                        iconSrc: "./icons/item/inv_crate_01.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 10
                },
                bossTicket2: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【金牙】',
                        category: '消耗品',
                        desc: '挑战狗头人头目【金牙】',
                        iconSrc: "./icons/item/inv_crate_01.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 10
                },
                bossTicket3: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【霍格】',
                        category: '消耗品',
                        desc: '挑战豺狼人首领【霍格】',
                        iconSrc: "./icons/item/inv_crate_01.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 10
                },
                bossTicket4: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【铁背龟】',
                        category: '消耗品',
                        desc: '挑战乌龟BOSS【铁背龟】',
                        iconSrc: "./icons/item/inv_crate_01.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 10
                },
                bossTicket5: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【熔岩元素】',
                        category: '消耗品',
                        desc: '挑战元素BOSS【熔岩元素',
                        iconSrc: "./icons/item/inv_crate_01.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 10
                },
                bossTicket6: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【咕噜咕拉】',
                        category: '消耗品',
                        desc: '挑战鱼人首领【咕噜咕拉】',
                        iconSrc: "./icons/item/inv_crate_01.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 10
                },
                bossTicket7: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【塞瑞娜·血羽】',
                        category: '消耗品',
                        desc: '挑战鸟人头目【塞瑞娜·血羽】',
                        iconSrc: "./icons/item/inv_crate_01.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 10
                },
                bossTicket8: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【科多兽】',
                        category: '消耗品',
                        desc: '挑战蜥蜴头目【科多兽】',
                        iconSrc: "./icons/item/inv_crate_01.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 10
                },
                bossTicket9: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【维斯迦尔】',
                        category: '消耗品',
                        desc: '挑战熊怪首领【维斯迦尔】',
                        iconSrc: "./icons/item/inv_crate_01.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 10
                },
                bossTicket10: {
                    quality: 3,
                    description: {
                        name: 'BOSS挑战券【安戈雷尔】',
                        category: '消耗品',
                        desc: '挑战美味的龙虾【安戈雷尔】',
                        iconSrc: "./icons/item/inv_crate_01.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 100,
                    maxStack: 10
                },
                //potion
                inv_misc_food_73cinnamonroll: {
                    quality: 1,
                    description: {
                        name: '面包',
                        category: '消耗品',
                        desc: '恢复100%生命值, 战斗期间无法使用',
                        iconSrc: "./icons/spell/mage/inv_misc_food_73cinnamonroll.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 1,
                    maxStack: 100
                },
                inv_misc_gem_sapphire_02: {
                    quality: 1,
                    description: {
                        name: '法力宝石',
                        category: '消耗品',
                        desc: '恢复100%法力值, 战斗期间无法使用',
                        iconSrc: "./icons/spell/mage/inv_misc_gem_sapphire_02.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 1,
                    maxStack: 100
                },
                inv_alchemy_80_potion01red: {
                    quality: 1,
                    description: {
                        name: '特效生命药水',
                        category: '消耗品',
                        desc: '恢复100%生命值, 战斗期间无法使用',
                        iconSrc: "./icons/potion/inv_alchemy_80_potion01red.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 20,
                    cost: 100,
                    maxStack: 100
                },
                inv_alchemy_80_potion01blue: {
                    quality: 1,
                    description: {
                        name: '特效法力药水',
                        category: '消耗品',
                        desc: '恢复100%法力值, 战斗期间无法使用',
                        iconSrc: "./icons/potion/inv_alchemy_80_potion01blue.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 20,
                    cost: 100,
                    maxStack: 100
                },
                inv_potion_49: {
                    quality: 2,
                    description: {
                        name: '初级治疗药水',
                        category: '消耗品',
                        desc: '每秒恢复15点生命值, 持续10秒',
                        iconSrc: "./icons/potion/inv_potion_49.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 200,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                inv_potion_50: {
                    quality: 2,
                    description: {
                        name: '初级生命药水',
                        category: '消耗品',
                        desc: '恢复100生命值',
                        iconSrc: "./icons/potion/inv_potion_50.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 250,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                inv_potion_51: {
                    quality: 3,
                    description: {
                        name: '次级治疗药水',
                        category: '消耗品',
                        desc: '每秒恢复150点生命值, 持续10秒',
                        iconSrc: "./icons/potion/inv_potion_51.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 1000,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                inv_potion_52: {
                    quality: 3,
                    description: {
                        name: '次级生命药水',
                        category: '消耗品',
                        desc: '恢复1000生命值',
                        iconSrc: "./icons/potion/inv_potion_52.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 1300,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                inv_potion_53: {
                    quality: 4,
                    description: {
                        name: '治疗药水',
                        category: '消耗品',
                        desc: '每秒恢复1500点生命值, 持续10秒',
                        iconSrc: "./icons/potion/inv_potion_53.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 1300,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                inv_potion_54: {
                    quality: 4,
                    description: {
                        name: '生命药水',
                        category: '消耗品',
                        desc: '恢复10000生命值',
                        iconSrc: "./icons/potion/inv_potion_54.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                inv_potion_160: {
                    quality: 3,
                    description: {
                        name: '强效治疗药水',
                        category: '消耗品',
                        desc: '每秒恢复1%最大生命值, 持续100秒',
                        iconSrc: "./icons/potion/inv_potion_160.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                inv_potion_55: {
                    quality: 4,
                    description: {
                        name: '超级治疗药水',
                        category: '消耗品',
                        desc: '每秒恢复5%最大生命值, 持续100秒',
                        iconSrc: "./icons/potion/inv_potion_55.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                inv_potion_131: {
                    quality: 3,
                    description: {
                        name: '强效生命药水',
                        category: '消耗品',
                        desc: '恢复25%最大生命值',
                        iconSrc: "./icons/potion/inv_potion_131.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                inv_potion_142: {
                    quality: 4,
                    description: {
                        name: '超级生命药水',
                        category: '消耗品',
                        desc: '恢复50%最大生命值',
                        iconSrc: "./icons/potion/inv_potion_142.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                inv_potion_167: {
                    quality: 5,
                    description: {
                        name: '终极生命药水',
                        category: '消耗品',
                        desc: '恢复100%最大生命值',
                        iconSrc: "./icons/potion/inv_potion_167.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                inv_potion_70: {
                    quality: 2,
                    description: {
                        name: '初级魔能药水',
                        category: '消耗品',
                        desc: '每秒恢复15点魔法值, 持续10秒',
                        iconSrc: "./icons/potion/inv_potion_70.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 200,
                    maxStack: 100,
                    cdgroup: 'mpPotion',
                    cd: 15
                },
                inv_potion_71: {
                    quality: 2,
                    description: {
                        name: '初级法力药水',
                        category: '消耗品',
                        desc: '恢复100法力值',
                        iconSrc: "./icons/potion/inv_potion_71.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 250,
                    maxStack: 100,
                    cdgroup: 'mpPotion',
                    cd: 15
                },
                inv_potion_72: {
                    quality: 3,
                    description: {
                        name: '次级魔能药水',
                        category: '消耗品',
                        desc: '每秒恢复150点法力值, 持续10秒',
                        iconSrc: "./icons/potion/inv_potion_72.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 1000,
                    maxStack: 100,
                    cdgroup: 'mpPotion',
                    cd: 15
                },
                inv_potion_73: {
                    quality: 3,
                    description: {
                        name: '次级法力药水',
                        category: '消耗品',
                        desc: '恢复1000法力值',
                        iconSrc: "./icons/potion/inv_potion_73.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 1300,
                    maxStack: 100,
                    cdgroup: 'mpPotion',
                    cd: 15
                },
                inv_potion_74: {
                    quality: 4,
                    description: {
                        name: '魔能药水',
                        category: '消耗品',
                        desc: '每秒恢复1500点法力值, 持续10秒',
                        iconSrc: "./icons/potion/inv_potion_74.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'mpPotion',
                    cd: 15
                },
                inv_potion_75: {
                    quality: 4,
                    description: {
                        name: '法力药水',
                        category: '消耗品',
                        desc: '恢复10000法力值',
                        iconSrc: "./icons/potion/inv_potion_75.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'mpPotion',
                    cd: 15
                },
                inv_potion_163: {
                    quality: 3,
                    description: {
                        name: '强效魔能药水',
                        category: '消耗品',
                        desc: '每秒恢复1%最大法力值, 持续100秒',
                        iconSrc: "./icons/potion/inv_potion_163.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'mpPotion',
                    cd: 15
                },
                inv_potion_76: {
                    quality: 4,
                    description: {
                        name: '超级魔能药水',
                        category: '消耗品',
                        desc: '每秒恢复5%最大法力值, 持续100秒',
                        iconSrc: "./icons/potion/inv_potion_76.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'mpPotion',
                    cd: 15
                },
                inv_potion_137: {
                    quality: 3,
                    description: {
                        name: '强效法力药水',
                        category: '消耗品',
                        desc: '恢复25%最大法力值',
                        iconSrc: "./icons/potion/inv_potion_137.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'mpPotion',
                    cd: 15
                },
                inv_potion_148: {
                    quality: 4,
                    description: {
                        name: '超级法力药水',
                        category: '消耗品',
                        desc: '恢复50%最大法力值',
                        iconSrc: "./icons/potion/inv_potion_148.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'mpPotion',
                    cd: 15
                },
                inv_potion_168: {
                    quality: 5,
                    description: {
                        name: '终极法力药水',
                        category: '消耗品',
                        desc: '恢复100%最大法力值',
                        iconSrc: "./icons/potion/inv_potion_168.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'mpPotion',
                    cd: 15
                },
                inv_potion_42: {
                    quality: 2,
                    description: {
                        name: '初级恢复药水',
                        category: '消耗品',
                        desc: '每秒恢复15点生命值以及15点魔法值, 持续10秒',
                        iconSrc: "./icons/potion/inv_potion_42.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'hpmpPotion',
                    cd: 15
                },
                inv_potion_43: {
                    quality: 2,
                    description: {
                        name: '初级活力药水',
                        category: '消耗品',
                        desc: '恢复100生命值以及100点魔法值',
                        iconSrc: "./icons/potion/inv_potion_43.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'hpmpPotion',
                    cd: 15
                },
                inv_potion_44: {
                    quality: 3,
                    description: {
                        name: '次级恢复药水',
                        category: '消耗品',
                        desc: '每秒恢复150点生命值以及150点魔法值, 持续10秒',
                        iconSrc: "./icons/potion/inv_potion_44.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'hpmpPotion',
                    cd: 15
                },
                inv_potion_45: {
                    quality: 3,
                    description: {
                        name: '次级活力药水',
                        category: '消耗品',
                        desc: '恢复1000生命值以及1000点魔法值',
                        iconSrc: "./icons/potion/inv_potion_45.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'hpmpPotion',
                    cd: 15
                },
                inv_potion_46: {
                    quality: 4,
                    description: {
                        name: '恢复药水',
                        category: '消耗品',
                        desc: '每秒恢复1500点生命值以及1500点魔法值, 持续10秒',
                        iconSrc: "./icons/potion/inv_potion_46.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'hpmpPotion',
                    cd: 15
                },
                inv_potion_47: {
                    quality: 4,
                    description: {
                        name: '活力药水',
                        category: '消耗品',
                        desc: '恢复10000生命值以及10000点魔法值',
                        iconSrc: "./icons/potion/inv_potion_47.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'hpmpPotion',
                    cd: 15
                },
                inv_potion_164: {
                    quality: 3,
                    description: {
                        name: '强效恢复药水',
                        category: '消耗品',
                        desc: '每秒恢复1%最大生命值以及魔法值, 持续100秒',
                        iconSrc: "./icons/potion/inv_potion_164.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'hpmpPotion',
                    cd: 15
                },
                inv_potion_48: {
                    quality: 4,
                    description: {
                        name: '超级恢复药水',
                        category: '消耗品',
                        desc: '每秒恢复5%最大生命值以及魔法值, 持续100秒',
                        iconSrc: "./icons/potion/inv_potion_48.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'hpmpPotion',
                    cd: 15
                },
                inv_potion_134: {
                    quality: 4,
                    description: {
                        name: '强效活力药水',
                        category: '消耗品',
                        desc: '恢复33%最大生命值以及魔法值',
                        iconSrc: "./icons/potion/inv_potion_134.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'hpmpPotion',
                    cd: 15
                },
                inv_potion_145: {
                    quality: 5,
                    description: {
                        name: '超级活力药水',
                        category: '消耗品',
                        desc: '恢复75%最大生命值以及魔法值',
                        iconSrc: "./icons/potion/inv_potion_145.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 100,
                    cdgroup: 'hpmpPotion',
                    cd: 15
                },
            }
        }
    }
}