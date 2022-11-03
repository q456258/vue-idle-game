export const craftConfig = {
    data() {
        return {
            craftCateg: {
                tailor: '裁缝',
                craft: '打造',
                alchemy: '炼金',
            },
            mergeCateg: {
                herb: '草药',
                mine: '矿物',
                leather: '皮',
                misc: '杂项'
            },
            categList: {
                tailor: [],
                craft: [
                    'inv_sword_05'
                ],
                alchemy: [],
                herb: [],
                mine: [
                    'inv_ingot_02', 'inv_ingot_05', 'inv_ingot_01', 'inv_ingot_iron', 'inv_ingot_steel', 'inv_ingot_03', 'inv_ingot_06', 'inv_ingot_08', 'inv_ingot_07', 'inv_ingot_mithril',
                ],
                leather: [],
                misc: [],
            },
            materialList: {
                inv_sword_05: { inv_ore_copper_01:3, inv_ore_tin_01:10 },
                inv_ingot_02: { inv_ore_copper_01: 3 },
                inv_ingot_05: {inv_ore_tin_01: 3},
                inv_ingot_01: {inv_stone_16: 3},
                inv_ingot_iron: {inv_ore_iron_01: 3, inv_ore_tin_01: 2},
                inv_ingot_steel: {inv_ore_iron_01: 10},
                inv_ingot_03: {inv_ore_gold_01: 3},
                inv_ingot_06: {inv_ore_mithril_02: 3},
                inv_ingot_08: {inv_ore_truesilver_01: 3},
                inv_ingot_07: {inv_ore_thorium_02: 3},
                inv_ingot_mithril: {inv_ore_mithril_01: 3},
            }
        }
    }
}