export const craftConfig = {
    data() {
        return {
            craftCateg: {
                craft: '打造',
                alchemy: '炼金',
                herb: '草药',
                mine: '矿物',
                leather: '皮',
                misc: '杂项'
            },
            categList: {
                craft: [
                    'random_common_equip', 'random_uncommon_equip', 'random_rare_equip', 'random_epic_equip', 'random_legendary_equip', 
                ],
                alchemy: [
                    // 生命、魔法
                    'inv_potion_51','inv_potion_52','inv_potion_53','inv_potion_54','inv_potion_160','inv_potion_55','inv_potion_131',
                    'inv_potion_72','inv_potion_73','inv_potion_74','inv_potion_75','inv_potion_163','inv_potion_76','inv_potion_137',
                    'inv_potion_42','inv_potion_43','inv_potion_44','inv_potion_45','inv_potion_46','inv_potion_47','inv_potion_164','inv_potion_48','inv_potion_134',
                    "trade_alchemy_potionc2", "trade_alchemy_potionc6", "trade_alchemy_potionc3", "trade_alchemy_potionc4", "trade_alchemy_potionc5",                 
                ],
                herb: [],
                mine: [
                    'inv_ingot_02', 'inv_ingot_01', 'inv_ingot_iron', 'inv_ingot_steel', 'inv_ingot_03'
                ],
                leather: [],
                misc: [],
            },
            materialList: {
                random_common_equip: { dust2:5, optional: {inv_ingot_02:200, inv_ingot_01:10, inv_ingot_iron:10, inv_ingot_steel:5, inv_ingot_03:10 }, },
// optional: {inv_ingot_02:10, inv_ingot_05:10, inv_ingot_01:10, inv_ingot_iron:10, inv_ingot_steel:10, inv_ingot_03:10, inv_ingot_06:10, inv_ingot_08:10, inv_ingot_07:10, inv_ingot_mithril:10 },
                random_uncommon_equip: { dust3:10, optional: {inv_ingot_02:200, inv_ingot_01:10, inv_ingot_iron:10, inv_ingot_steel:5, inv_ingot_03:10 }, },
                random_rare_equip: { dust4:15, optional: {inv_ingot_02:200, inv_ingot_01:10, inv_ingot_iron:10, inv_ingot_steel:5, inv_ingot_03:10 }, },
                random_epic_equip: { dust5:20, optional: {inv_ingot_02:200, inv_ingot_01:10, inv_ingot_iron:10, inv_ingot_steel:5, inv_ingot_03:10 }, },
                random_legendary_equip: { dust6:25, optional: {inv_ingot_02:200, inv_ingot_01:10, inv_ingot_iron:10, inv_ingot_steel:5}, },
                inv_ingot_02: { inv_ore_copper_01: 3 },
                // inv_ingot_05: {inv_ore_tin_01: 3},
                inv_ingot_01: {inv_stone_16: 3},
                inv_ingot_iron: {inv_ore_iron_01: 3},
                inv_ingot_steel: {inv_ingot_iron: 5},
                inv_ingot_03: {inv_ore_gold_01: 3},
                // inv_ingot_06: {inv_ore_mithril_02: 3},
                // inv_ingot_08: {inv_ore_truesilver_01: 3},
                // inv_ingot_07: {inv_ore_thorium_02: 3},
                // inv_ingot_mithril: {inv_ore_mithril_01: 3},



                inv_potion_51: { inv_misc_flower_02: 3, inv_misc_herb_01: 1, inv_misc_herb_03: 1 },
                inv_potion_52: { inv_misc_flower_02: 3, inv_misc_herb_03: 1  },
                inv_potion_53: { inv_misc_flower_02: 8, inv_misc_herb_01: 3, inv_misc_herb_18: 1 },
                inv_potion_54: { inv_misc_flower_02: 8, inv_misc_herb_18: 3  },
                inv_potion_160: { inv_misc_flower_02: 5, inv_misc_herb_01: 8, inv_misc_herb_18: 2 },
                inv_potion_55: { inv_misc_flower_02: 20, inv_misc_herb_01: 8, inv_misc_herb_mountainsilversage: 2 },
                inv_potion_131: { inv_misc_flower_02: 7, inv_misc_herb_18: 1 },

                inv_potion_72: { inv_jewelry_talisman_03: 3, inv_misc_herb_01: 1, inv_misc_herb_03: 1 },
                inv_potion_73: { inv_jewelry_talisman_03: 3, inv_misc_herb_03: 1  },
                inv_potion_74: { inv_jewelry_talisman_03: 8, inv_misc_herb_01: 3, inv_misc_herb_18: 1 },
                inv_potion_75: { inv_jewelry_talisman_03: 8, inv_misc_herb_18: 3  },
                inv_potion_163: { inv_jewelry_talisman_03: 5, inv_misc_herb_01: 8, inv_misc_herb_18: 2 },
                inv_potion_76: { inv_jewelry_talisman_03: 20, inv_misc_herb_01: 8, inv_misc_herb_mountainsilversage: 2 },
                inv_potion_137: { inv_jewelry_talisman_03: 7, inv_misc_herb_18: 1 },

                inv_potion_42: { inv_misc_flower_02: 1, inv_jewelry_talisman_03: 1, inv_misc_herb_01: 1, inv_misc_herb_10: 1 },
                inv_potion_43: { inv_misc_flower_02: 1, inv_jewelry_talisman_03: 1, inv_misc_herb_10: 1  },
                inv_potion_44: { inv_misc_flower_02: 3, inv_jewelry_talisman_03: 3, inv_misc_herb_01: 2, inv_misc_herb_03: 1 },
                inv_potion_45: { inv_misc_flower_02: 3, inv_jewelry_talisman_03: 3, inv_misc_herb_03: 2  },
                inv_potion_46: { inv_misc_flower_02: 8, inv_jewelry_talisman_03: 8, inv_misc_herb_01: 5, inv_misc_herb_18: 1 },
                inv_potion_47: { inv_misc_flower_02: 8, inv_jewelry_talisman_03: 8, inv_misc_herb_18: 5  },
                inv_potion_164: { inv_misc_flower_02: 5, inv_jewelry_talisman_03: 5, inv_misc_herb_01: 8, inv_misc_herb_18: 3 },
                inv_potion_48: { inv_misc_flower_02: 20, inv_jewelry_talisman_03: 20, inv_misc_herb_01: 8, inv_misc_herb_mountainsilversage: 3 },
                inv_potion_134: { inv_misc_flower_02: 10, inv_jewelry_talisman_03: 10, inv_misc_herb_mountainsilversage: 3 },

                trade_alchemy_potionc2: { inv_misc_herb_07: 5, inv_misc_herb_mountainsilversage: 2  },
                trade_alchemy_potionc3: { inv_misc_herb_whispervine: 5, inv_misc_herb_mountainsilversage: 2  },
                trade_alchemy_potionc4: { inv_misc_herb_11: 5, inv_misc_herb_mountainsilversage: 2  },
                trade_alchemy_potionc6: { inv_misc_herb_04: 5, inv_misc_herb_mountainsilversage: 2  },
                trade_alchemy_potionc5: { inv_misc_herb_dreamfoil: 5, inv_misc_herb_mountainsilversage: 2  },
                
            }
        }
    }
}