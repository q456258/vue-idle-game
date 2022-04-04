export const questConfig = {
    data() {
        return {
            questList: {
                0: {
                    name: '【新手指引】杀鸡',
                    desc: '测试测试',
                    target: '在晴风村杀1只0级的小鸡',
                    lv: 1,
                    reqs: [['slain', 0, 1]],
                    rewardType: [['random_equip_normal_10', 100]],
                },
                1: {
                    name: '【新手指引】击败训练假人',
                    desc: '吾问无为谓无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无',
                    target: '在晴风村杀1只1-5级的训练假人和1只6-10级的高级训练假人',
                    lv: 5,
                    reqs: [['slain', 1, 1], ['slain', 2, 1]],
                    rewardType: [['random_equip_normal_10', 100]],
                },
                2: {
                    name: '【新手指引】收集',
                    desc: '吾问无为谓无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无',
                    target: '在晴风村杀1只1-5级的训练假人和1只6-10级的高级训练假人',
                    lv: 5,
                    reqs: [['collect', 'inv_ore_copper_01', 1]],
                    rewardType: [['inv_ingot_02', 100]],
                }
            }
        }
    }
}