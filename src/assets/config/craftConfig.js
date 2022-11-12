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
                alchemy: [],
                herb: [],
                mine: [
                    'inv_ingot_02', 'inv_ingot_iron', 'inv_ingot_steel', 'inv_ingot_03'
                ],
                leather: [],
                misc: [],
            },
            materialList: {
                random_common_equip: { dust2:5, optional: {inv_ingot_02:16, inv_ingot_iron:10, inv_ingot_steel:5, inv_ingot_03:10 }, },
// optional: {inv_ingot_02:10, inv_ingot_05:10, inv_ingot_01:10, inv_ingot_iron:10, inv_ingot_steel:10, inv_ingot_03:10, inv_ingot_06:10, inv_ingot_08:10, inv_ingot_07:10, inv_ingot_mithril:10 },
                random_uncommon_equip: { dust3:10, optional: {inv_ingot_02:16, inv_ingot_iron:10, inv_ingot_steel:5, inv_ingot_03:10 }, },
                random_rare_equip: { dust4:15, optional: {inv_ingot_02:16, inv_ingot_iron:10, inv_ingot_steel:5, inv_ingot_03:10 }, },
                random_epic_equip: { dust5:20, optional: {inv_ingot_02:16, inv_ingot_iron:10, inv_ingot_steel:5, inv_ingot_03:10 }, },
                random_legendary_equip: { dust6:25, optional: {inv_ingot_02:16, inv_ingot_iron:10, inv_ingot_steel:5}, },
                inv_ingot_02: { inv_ore_copper_01: 3 },
                // inv_ingot_05: {inv_ore_tin_01: 3},
                // inv_ingot_01: {inv_stone_16: 3},
                inv_ingot_iron: {inv_ore_iron_01: 3},
                inv_ingot_steel: {inv_ingot_iron: 5},
                inv_ingot_03: {inv_ore_gold_01: 3},
                // inv_ingot_06: {inv_ore_mithril_02: 3},
                // inv_ingot_08: {inv_ore_truesilver_01: 3},
                // inv_ingot_07: {inv_ore_thorium_02: 3},
                // inv_ingot_mithril: {inv_ore_mithril_01: 3},
            }
        }
    }
}