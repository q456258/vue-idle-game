export const questConfig = {
    data() {
        return {
            eventId: {
                1: '重置地图'
            },
            questCategory: {
                undefined: '其他',
                newbie: '新手指引',
                guild: '公会'
            },
            questList: {
                0: {
                    name: '杀鸡',
                    category: 'newbie',
                    desc: '我也不知道为什么要你去杀鸡, 但是你去杀只鸡……吧, 就是中间地图上写着lv0，有个棕色骷髅头的图标（没错其实那个是骷髅头），点一下，然后点下面的开始战斗。找不到写着lv0的？那就参考任务【重置地图】',
                    target: '在晴风村杀1只0级的小鸡',
                    lv: 1,
                    reqs: [['slain', 0, 1]],
                    reward: [],
                    rewardItem: [['random_equip_normal_0', 1, 100]],
                    successor: [2],
                    forfeit: false
                },
                1: {
                    name: '重置地图',
                    category: 'newbie',
                    desc: '如果找不到想要打的怪，可以点击屏幕中间，地图上方，"重置地图"刷新地图上的内容',
                    target: '点击重置地图',
                    lv: 1,
                    reqs: [['event', 1, 1]],
                    reward: [],
                    rewardItem: [['inv_alchemy_80_potion01red', 20, 100]],
                    successor: [],
                    forfeit: false
                },
                2: {
                    name: '击败训练假人',
                    category: 'newbie',
                    desc: '试着击败一只训练假人吧，晴风村1-5级，图标为棕色骷髅头的怪物为训练假人。普通怪物会掉落武器、头盔、盔甲、鞋子、护腿、手套部件的装备。击败等级高于自身的怪物后即可升到目标等级',
                    target: '在晴风村杀1只训练假人和1只6-10级的高级训练假人',
                    lv: 2,
                    reqs: [['slain', 1, 1]],
                    reward: [],
                    rewardItem: [['random_equip_normal_0', 1, 100]],
                    successor: [3, 4],
                    forfeit: false
                },
                3: {
                    name: '击败训练假人精英',
                    category: 'newbie',
                    desc: '接下来击败一只训练假人精英吧，晴风村1-5级，图标为银色骷髅头的怪物为训练假人精英。精英怪物会掉落项链和戒指以外的所有装备部件。击败等级高于自身的精英怪物后即可升到目标等级，并且获得天赋点数（10级解锁）',
                    target: '击败训练假人精英',
                    lv: 5,
                    reqs: [['slain', 3, 1]],
                    reward: [],
                    rewardItem: [['random_equip_elite_1', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                4: {
                    name: '击败高级训练假人',
                    category: 'newbie',
                    desc: '试着击败一只高级训练假人吧，晴风村6-10级，图标为棕色骷髅头的怪物为高级训练假人。普通怪物会掉落武器、头盔、盔甲、鞋子、护腿、手套部件的装备。击败等级高于自身的怪物后即可升到目标等级',
                    target: '击败高级训练假人',
                    lv: 5,
                    reqs: [['slain', 2, 1]],
                    reward: [],
                    rewardItem: [['random_equip_normal_0', 1, 100]],
                    successor: [5],
                    forfeit: false
                },
                5: {
                    name: '击败高级训练假人精英',
                    category: 'newbie',
                    desc: '接下来击败一只高级训练假人精英吧，晴风村6-10级，图标为银色骷髅头的怪物为训练假人精英。精英怪物会掉落项链和戒指以外的所有装备部件。击败等级高于自身的精英怪物后即可升到目标等级，并且获得天赋点数（10级解锁）',
                    target: '击败高级训练假人精英',
                    lv: 10,
                    reqs: [['slain', 4, 1]],
                    reward: [],
                    rewardItem: [['random_equip_elite_1', 1, 100]],
                    successor: [6],
                    forfeit: false
                },
                6: {
                    name: '毕业',
                    category: 'newbie',
                    desc: '击败精英怪后有概率获得BOSS挑战券，通过击败晴风村精英获得导师挑战券来挑战他吧！',
                    target: '击败导师',
                    lv: 10,
                    reqs: [['slain', 5, 1]],
                    reward: [],
                    rewardItem: [['unique_equip', 'inv_sword_05', 1, 100], ['unique_equip', 'inv_wand_06', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                // 2: {
                //     name: '收集',
                //     desc: '吾问无为谓无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无',
                //     target: '在晴风村杀1只1-5级的训练假人和1只6-10级的高级训练假人',
                //     lv: 5,
                //     reqs: [['collect', 'inv_ore_copper_01', 1]],
                    // reward: [['gold', 1234], ['guild_reputation', 123]],
                //     rewardItem: [['inv_ingot_02', 1, 100]],
                // }
            }
        }
    }
}