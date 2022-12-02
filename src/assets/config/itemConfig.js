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
                        desc: '锻造附加材料, 提升5级锻造装备的等级要求和物品等级',
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
                        desc: '锻造附加材料, 降低1级锻造装备的等级要求',
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
                        desc: '锻造附加材料, 降低2级锻造装备的等级要求',
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
                        desc: '锻造附加材料, 1%提升锻造装备的品质',
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
                    quantity: 1,
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
                    quantity: 1,
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
                    quantity: 1,
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
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 9999
                },
                inv_misc_enchantedpearla_bag: {
                    quality: 2,
                    description: {
                        name: '一袋神秘宝珠',
                        category: '消耗品',
                        desc: '获得10颗神秘宝珠(具有神秘力量的宝珠, 能够重置装备的潜在属性)',
                        iconSrc: "./icons/item/inv_misc_enchantedpearla_bag.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                inv_misc_gem_diamond_05_bag: {
                    quality: 1,
                    description: {
                        name: '一袋杂色强化石碎片',
                        category: '消耗品',
                        desc: '获得10颗杂色强化石碎片(强化装备的材料, 能够提升装备基础属性, 提升1点强化进度)',
                        iconSrc: "./icons/item/inv_misc_gem_diamond_05_bag.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                inv_misc_gem_diamond_04_bag: {
                    quality: 2,
                    description: {
                        name: '一袋杂色强化石',
                        category: '消耗品',
                        desc: '获得10颗杂色强化石(强化装备的材料, 能够提升装备基础属性, 提升5点强化进度)',
                        iconSrc: "./icons/item/inv_misc_gem_diamond_04_bag.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                inv_misc_gem_diamond_03_bag: {
                    quality: 3,
                    description: {
                        name: '一袋纯净强化石碎片',
                        category: '消耗品',
                        desc: '获得10颗强化纯净强化石碎片(装备的材料, 能够提升装备基础属性, 提升10点强化进度)',
                        iconSrc: "./icons/item/inv_misc_gem_diamond_03_bag.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                inv_misc_gem_diamond_02_bag: {
                    quality: 4,
                    description: {
                        name: '一袋纯净强化石',
                        category: '消耗品',
                        desc: '获得10颗纯净强化石(强化装备的材料, 能够提升装备基础属性, 提升25点强化进度)',
                        iconSrc: "./icons/item/inv_misc_gem_diamond_02_bag.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                inv_misc_gem_diamond_01_bag: {
                    quality: 5,
                    description: {
                        name: '一袋无暇强化石',
                        category: '消耗品',
                        desc: '获得10颗无暇强化石(强化装备的材料, 能够提升装备基础属性, 提升100点强化进度)',
                        iconSrc: "./icons/item/inv_misc_gem_diamond_01_bag.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                dust2: {
                    quality: 2,
                    description: {
                        name: '普通装备精华',
                        category: '材料',
                        desc: '分解普通装备获得, 可用于打造普通品质的装备',
                        iconSrc: "./icons/item/inv_enchanting_dust.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 1000
                },
                dust3: {
                    quality: 3,
                    description: {
                        name: '罕见装备精华',
                        category: '材料',
                        desc: '分解罕见装备获得, 可用于打造罕见品质的装备',
                        iconSrc: "./icons/item/inv_enchanting_70_arkhana.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 1000
                },
                dust4: {
                    quality: 4,
                    description: {
                        name: '稀有装备精华',
                        category: '材料',
                        desc: '分解稀有装备获得, 可用于打造稀有品质的装备',
                        iconSrc: "./icons/item/inv_misc_dust_infinite.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 1000
                },
                dust5: {
                    quality: 5,
                    description: {
                        name: '史诗装备精华',
                        category: '材料',
                        desc: '分解史诗装备获得, 可用于打造史诗品质的装备',
                        iconSrc: "./icons/item/inv_enchanting_wod_dust3.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 1000
                },
                dust6: {
                    quality: 6,
                    description: {
                        name: '传奇装备精华',
                        category: '材料',
                        desc: '分解传奇装备获得, 可用于打造传奇品质的装备',
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
                        desc: '使用: 获得【野怪杀手】buff, 对等级低于自身的非精英、BOSS类怪物额外造成50%伤害, 持续10分钟',
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
                        desc: '使用: 发布招募声明, 吸引路人来申请公会',
                        iconSrc: "./icons/item/inv_misc_note_06.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                inv_misc_bone_06: {
                    quality: 1,
                    description: {
                        name: '阿迦玛的牙',
                        category: '材料',
                        desc: '击败阿迦玛的证明，创建公会时会消耗。随着更多公会被创建，阿迦玛数量也逐渐稀少。',
                        iconSrc: "./icons/item/inv_misc_bone_06.jpg",
                    },
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                racial_dwarf_findtreasure: {
                    quality: 3,
                    description: {
                        name: '一颗金牙',
                        category: '消耗品',
                        desc: '使用: 获得1金<br>"别问他是怎么弄到的"',
                        iconSrc: "./icons/item/trade_archaeology_trolltooth-w-goldfilling.jpg",
                    },
                    autoUse: true, batch: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                inv_misc_coin_05: {
                    quality: 1,
                    description: {
                        name: '少量铜币',
                        category: '消耗品',
                        desc: '使用: 获得少量铜币',
                        iconSrc: "./icons/item/inv_misc_coin_05.jpg",
                    },
                    autoUse: true, batch: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                inv_misc_coin_05_2: {
                    quality: 1,
                    description: {
                        name: '中量铜币',
                        category: '消耗品',
                        desc: '获得中量铜币',
                        iconSrc: "./icons/item/inv_misc_coin_05.jpg",
                    },
                    autoUse: true, batch: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                inv_misc_coin_06: {
                    quality: 1,
                    description: {
                        name: '大量铜币',
                        category: '消耗品',
                        desc: '获得大量铜币',
                        iconSrc: "./icons/item/inv_misc_coin_06.jpg",
                    },
                    autoUse: true, batch: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                inv_misc_coin_03: {
                    quality: 2,
                    description: {
                        name: '少量银币',
                        category: '消耗品',
                        desc: '获得少量银币',
                        iconSrc: "./icons/item/inv_misc_coin_03.jpg",
                    },
                    autoUse: true, batch: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                inv_misc_coin_03_2: {
                    quality: 2,
                    description: {
                        name: '中量银币',
                        category: '消耗品',
                        desc: '获得中量银币',
                        iconSrc: "./icons/item/inv_misc_coin_03.jpg",
                    },
                    autoUse: true, batch: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                inv_misc_coin_04: {
                    quality: 2,
                    description: {
                        name: '大量银币',
                        category: '消耗品',
                        desc: '获得大量银币',
                        iconSrc: "./icons/item/inv_misc_coin_04.jpg",
                    },
                    autoUse: true, batch: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                inv_misc_coin_01: {
                    quality: 3,
                    description: {
                        name: '少量金币',
                        category: '消耗品',
                        desc: '获得少量金币',
                        iconSrc: "./icons/item/inv_misc_coin_01.jpg",
                    },
                    autoUse: true, batch: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                inv_misc_coin_01_2: {
                    quality: 3,
                    description: {
                        name: '中量金币',
                        category: '消耗品',
                        desc: '获得中量金币',
                        iconSrc: "./icons/item/inv_misc_coin_01.jpg",
                    },
                    autoUse: true, batch: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                inv_misc_coin_02: {
                    quality: 4,
                    description: {
                        name: '大量金币',
                        category: '消耗品',
                        desc: '获得大量金币',
                        iconSrc: "./icons/item/inv_misc_coin_02.jpg",
                    },
                    autoUse: true, batch: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                ability_racial_packhobgoblin: {
                    quality: 5,
                    description: {
                        name: '巨额金币',
                        category: '消耗品',
                        desc: '获得巨额金币',
                        iconSrc: "./icons/item/ability_racial_packhobgoblin.jpg",
                    },
                    autoUse: true, batch: true,
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
                        desc: '随机获得一件【力量、敏捷、耐力】装备<br>贫乏: 75%<br>普通: 25%',
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
                        desc: '随机获得一件装备<br>贫乏: 55%<br>普通: 30%<br>罕见: 15%',
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
                        desc: '随机获得一件装备<br>贫乏: 45%<br>普通: 33%<br>罕见: 21%<br>稀有: 1%',
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
                        desc: '随机获得一件装备<br>贫乏: 25%<br>普通: 40%<br>罕见: 32%<br>稀有: 3%',
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
                        desc: '随机获得一件装备<br>贫乏: 19%<br>普通: 30%<br>罕见: 35%<br>稀有: 15%<br>史诗: 1%',
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
                        desc: '随机获得一件【力量、敏捷、耐力】类型的贫乏装备',
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
                        desc: '随机获得一件装备<br>贫乏: 55%<br>普通: 30%<br>罕见: 15%',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_equip_elite_2: {
                    quality: 1,
                    description: {
                        name: '随机装备',
                        category: '消耗品',
                        desc: '随机获得一件装备<br>贫乏: 45%<br>普通: 33%<br>罕见: 21%<br>稀有: 1%',
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
                        desc: '随机获得一件装备<br>贫乏: 25%<br>普通: 40%<br>罕见: 32%<br>稀有: 3%',
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
                        desc: '随机获得一件装备<br>贫乏: 19%<br>普通: 30%<br>罕见: 35%<br>稀有: 15%<br>史诗: 1%',
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
                        desc: '随机获得一件装备<br>贫乏: 19%<br>普通: 30%<br>罕见: 35%<br>稀有: 15%<br>史诗: 1%',
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
                        desc: '随机获得一件装备<br>贫乏: 25%<br>普通: 35%<br>罕见: 34%<br>稀有: 5%<br>史诗: 0.95%<br>传奇: 0.05%',
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
                        desc: '随机获得一件装备<br>贫乏: 10%<br>普通: 15%<br>罕见: 32%<br>稀有: 35%<br>史诗: 7.5%<br>传奇: 0.5%',
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
                        desc: '随机获得一件装备<br>贫乏: 10%<br>普通: 15%<br>罕见: 30%<br>稀有: 30%<br>史诗: 14%<br>传奇: 1%',
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
                        desc: '随机获得一件装备<br>贫乏: 5%<br>普通: 10%<br>罕见: 20%<br>稀有: 40%<br>史诗: 20%<br>传奇: 5%',
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
                        desc: '随机获得一件装备<br>罕见: 15%<br>稀有: 40<br>史诗: 35%<br>传奇: 10%',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_poor_equip: {
                    quality: 1,
                    description: {
                        name: '随机贫乏装备',
                        category: '消耗品',
                        desc: '随机获得一件贫乏装备',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_common_equip: {
                    quality: 2,
                    description: {
                        name: '随机普通装备',
                        category: '消耗品',
                        desc: '随机获得一件普通装备',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_uncommon_equip: {
                    quality: 3,
                    description: {
                        name: '随机罕见装备',
                        category: '消耗品',
                        desc: '随机获得一件罕见装备',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_rare_equip: {
                    quality: 4,
                    description: {
                        name: '随机稀有装备',
                        category: '消耗品',
                        desc: '随机获得一件稀有装备',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_epic_equip: {
                    quality: 5,
                    description: {
                        name: '随机史诗装备',
                        category: '消耗品',
                        desc: '随机获得一件史诗装备',
                        iconSrc: "./icons/item/inv_misc_questionmark.jpg",
                    },
                    autoUse: true,
                    use: true,
                    stack: true,
                    quantity: 1,
                    cost: 99990000,
                    maxStack: 20
                },
                random_legendary_equip: {
                    quality: 6,
                    description: {
                        name: '随机传奇装备',
                        category: '消耗品',
                        desc: '随机获得一件传奇装备',
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
                        desc: '使用: 召唤【导师】',
                        iconSrc: "./icons/item/inv_scroll_11.jpg",
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
                        desc: '使用: 召唤野猪王【阿迦玛】',
                        iconSrc: "./icons/item/inv_scroll_11.jpg",
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
                        desc: '使用: 召唤狗头人头目【金牙】',
                        iconSrc: "./icons/item/inv_scroll_11.jpg",
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
                        desc: '使用: 召唤豺狼人首领【霍格】',
                        iconSrc: "./icons/item/inv_scroll_11.jpg",
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
                        desc: '使用: 召唤乌龟BOSS【铁背龟】',
                        iconSrc: "./icons/item/inv_scroll_11.jpg",
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
                        desc: '使用: 召唤元素BOSS【熔岩元素',
                        iconSrc: "./icons/item/inv_scroll_11.jpg",
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
                        desc: '使用: 召唤鱼人首领【咕噜咕拉】',
                        iconSrc: "./icons/item/inv_scroll_11.jpg",
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
                        desc: '使用: 召唤鸟人头目【塞瑞娜·血羽】',
                        iconSrc: "./icons/item/inv_scroll_11.jpg",
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
                        desc: '使用: 召唤蜥蜴头目【科多兽】',
                        iconSrc: "./icons/item/inv_scroll_11.jpg",
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
                        desc: '使用: 召唤熊怪首领【维斯迦尔】',
                        iconSrc: "./icons/item/inv_scroll_11.jpg",
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
                        desc: '使用: 召唤美味的龙虾【安戈雷尔】',
                        iconSrc: "./icons/item/inv_scroll_11.jpg",
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
                        desc: '使用: 恢复100%生命值, 战斗期间无法使用',
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
                        desc: '使用: 恢复100%法力值, 战斗期间无法使用',
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
                        desc: '使用: 恢复100%生命值, 战斗期间无法使用',
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
                        desc: '使用: 恢复100%法力值, 战斗期间无法使用',
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
                        desc: '使用: 每秒恢复25点生命值, 持续10秒',
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
                        desc: '使用: 恢复200生命值',
                        iconSrc: "./icons/potion/inv_potion_50.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 200,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                inv_potion_51: {
                    quality: 3,
                    description: {
                        name: '次级治疗药水',
                        category: '消耗品',
                        desc: '使用: 每秒恢复100点生命值, 持续10秒',
                        iconSrc: "./icons/potion/inv_potion_51.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 10000,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                inv_potion_52: {
                    quality: 3,
                    description: {
                        name: '次级生命药水',
                        category: '消耗品',
                        desc: '使用: 恢复800生命值',
                        iconSrc: "./icons/potion/inv_potion_52.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 10000,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                inv_potion_53: {
                    quality: 4,
                    description: {
                        name: '治疗药水',
                        category: '消耗品',
                        desc: '使用: 每秒恢复500点生命值, 持续10秒',
                        iconSrc: "./icons/potion/inv_potion_53.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 1000000,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                inv_potion_54: {
                    quality: 4,
                    description: {
                        name: '生命药水',
                        category: '消耗品',
                        desc: '使用: 恢复4500生命值',
                        iconSrc: "./icons/potion/inv_potion_54.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 1000000,
                    maxStack: 100,
                    cdgroup: 'hpPotion',
                    cd: 15
                },
                inv_potion_160: {
                    quality: 3,
                    description: {
                        name: '强效治疗药水',
                        category: '消耗品',
                        desc: '使用: 每秒恢复1%最大生命值, 持续100秒',
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
                        desc: '使用: 每秒恢复5%最大生命值, 持续100秒',
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
                        desc: '使用: 恢复25%最大生命值',
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
                        desc: '使用: 恢复50%最大生命值',
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
                        desc: '使用: 恢复100%最大生命值',
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
                        desc: '使用: 每秒恢复15点魔法值, 持续10秒',
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
                        desc: '使用: 恢复125法力值',
                        iconSrc: "./icons/potion/inv_potion_71.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 200,
                    maxStack: 100,
                    cdgroup: 'mpPotion',
                    cd: 15
                },
                inv_potion_72: {
                    quality: 3,
                    description: {
                        name: '次级魔能药水',
                        category: '消耗品',
                        desc: '使用: 每秒恢复50点法力值, 持续10秒',
                        iconSrc: "./icons/potion/inv_potion_72.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 8000,
                    maxStack: 100,
                    cdgroup: 'mpPotion',
                    cd: 15
                },
                inv_potion_73: {
                    quality: 3,
                    description: {
                        name: '次级法力药水',
                        category: '消耗品',
                        desc: '使用: 恢复400法力值',
                        iconSrc: "./icons/potion/inv_potion_73.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 8000,
                    maxStack: 100,
                    cdgroup: 'mpPotion',
                    cd: 15
                },
                inv_potion_74: {
                    quality: 4,
                    description: {
                        name: '魔能药水',
                        category: '消耗品',
                        desc: '使用: 每秒恢复200点法力值, 持续10秒',
                        iconSrc: "./icons/potion/inv_potion_74.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 500000,
                    maxStack: 100,
                    cdgroup: 'mpPotion',
                    cd: 15
                },
                inv_potion_75: {
                    quality: 4,
                    description: {
                        name: '法力药水',
                        category: '消耗品',
                        desc: '使用: 恢复1750法力值',
                        iconSrc: "./icons/potion/inv_potion_75.jpg",
                    },
                    use: true,
                    stack: true,
                    quantity: 5,
                    cost: 500000,
                    maxStack: 100,
                    cdgroup: 'mpPotion',
                    cd: 15
                },
                inv_potion_163: {
                    quality: 3,
                    description: {
                        name: '强效魔能药水',
                        category: '消耗品',
                        desc: '使用: 每秒恢复1%最大法力值, 持续100秒',
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
                        desc: '使用: 每秒恢复5%最大法力值, 持续100秒',
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
                        desc: '使用: 恢复25%最大法力值',
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
                        desc: '使用: 恢复50%最大法力值',
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
                        desc: '使用: 恢复100%最大法力值',
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
                        desc: '使用: 每秒恢复15点生命值以及15点魔法值, 持续10秒',
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
                        desc: '使用: 恢复100生命值以及100点魔法值',
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
                        desc: '使用: 每秒恢复150点生命值以及150点魔法值, 持续10秒',
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
                        desc: '使用: 恢复1000生命值以及1000点魔法值',
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
                        desc: '使用: 每秒恢复1500点生命值以及1500点魔法值, 持续10秒',
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
                        desc: '使用: 恢复10000生命值以及10000点魔法值',
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
                        desc: '使用: 每秒恢复1%最大生命值以及魔法值, 持续100秒',
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
                        desc: '使用: 每秒恢复5%最大生命值以及魔法值, 持续100秒',
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
                        desc: '使用: 恢复33%最大生命值以及魔法值',
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
                        desc: '使用: 恢复75%最大生命值以及魔法值',
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