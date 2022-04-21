export const questConfig = {
    data() {
        return {
            eventId: {
                1: '重置地图'
            },
            rewardType: {gold: '金币', guildReputation: '公会名望'},
            questCategory: {
                undefined: '其他',
                newbie: '新手指引',
                guild: '公会任务'
            },
            questBoardList: [
                [[1000, 1002, 1010, 1012], [1001, 1003, 1011, 1013], [1019]],
                [[1020, 1022, 1030, 1032], [1021, 1023, 1031, 1033], [1039]],
                [[1040, 1043, 1050, 1053], [1041, 1044, 1051, 1054], [1042, 1052, 1059]],
                [[1060, 1063, 1070, 1073], [1061, 1064, 1071, 1074], [1062, 1072, 1079]],
                [[1080, 1083, 1090, 1093], [1081, 1084, 1091, 1094], [1082, 1092, 1099]],
            ],
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
                    target: '击败训练假人',
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
                1000: {
                    name: '魔物扫荡：杂斑野猪',
                    category: 'guild',
                    desc: '清理克罗莫丹周边的魔物',
                    target: '击败10只杂斑野猪',
                    lv: 15,
                    reqs: [['slain', 11, 10]],
                    reward: [['gold', 100], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_2', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                1001: {
                    name: '魔物扫荡：杂斑野猪',
                    category: 'guild',
                    desc: '清理克罗莫丹周边的魔物',
                    target: '击败25只杂斑野猪',
                    lv: 15,
                    reqs: [['slain', 11, 25]],
                    reward: [['gold', 200], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_2', 1, 100, {lv: 17}]],
                    successor: [],
                    forfeit: false
                },
                1002: {
                    name: '魔物扫荡：杂斑野猪精英',
                    category: 'guild',
                    desc: '清理克罗莫丹周边的魔物',
                    target: '击败10只杂斑野猪精英',
                    lv: 15,
                    reqs: [['slain', 13, 10]],
                    reward: [['gold', 150], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 17}]],
                    successor: [],
                    forfeit: false
                },
                1003: {
                    name: '魔物扫荡：杂斑野猪精英',
                    category: 'guild',
                    desc: '清理克罗莫丹周边的魔物',
                    target: '击败25只杂斑野猪精英',
                    lv: 15,
                    reqs: [['slain', 13, 25]],
                    reward: [['gold', 350], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 20}]],
                    successor: [],
                    forfeit: false
                },
                1010: {
                    name: '魔物扫荡：癞皮山猪',
                    category: 'guild', 
                    desc: '清理克罗莫丹周边的魔物',
                    target: '击败10只癞皮山猪',
                    lv: 20,
                    reqs: [['slain', 12, 10]],
                    reward: [['gold', 120], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_2', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                1011: {
                    name: '魔物扫荡：癞皮山猪',
                    category: 'guild', 
                    desc: '清理克罗莫丹周边的魔物',
                    target: '击败25只癞皮山猪',
                    lv: 20,
                    reqs: [['slain', 12, 25]],
                    reward: [['gold', 280], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_2', 1, 100, {lv: 22}]],
                    successor: [],
                    forfeit: false
                },
                1012: {
                    name: '魔物扫荡：癞皮山猪精英',
                    category: 'guild', 
                    desc: '清理克罗莫丹周边的魔物',
                    target: '击败10只癞皮山猪精英',
                    lv: 20,
                    reqs: [['slain', 14, 10]],
                    reward: [['gold', 180], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 22}]],
                    successor: [],
                    forfeit: false
                },
                1013: {
                    name: '魔物扫荡：癞皮山猪精英',
                    category: 'guild', 
                    desc: '清理克罗莫丹周边的魔物',
                    target: '击败25只癞皮山猪精英',
                    lv: 20,
                    reqs: [['slain', 14, 25]],
                    reward: [['gold', 420], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 25}]],
                    successor: [],
                    forfeit: false
                },
                1019: {
                    name: '魔物扫荡：阿迦玛',
                    category: 'guild', 
                    desc: '击败克罗莫丹地区首领',
                    target: '击败阿迦玛',
                    lv: 20,
                    reqs: [['slain', 15, 1]],
                    reward: [['gold', 1000], ['guildReputation', 100]],
                    rewardItem: [['random_equip_6', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                1020: {
                    name: '魔物扫荡：狗头人矿工',
                    category: 'guild',
                    desc: '清理艾尔文森林周边的魔物',
                    target: '击败10只狗头人矿工',
                    lv: 25,
                    reqs: [['slain', 21, 10]],
                    reward: [['gold', 200], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_2', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                1021: {
                    name: '魔物扫荡：狗头人矿工',
                    category: 'guild',
                    desc: '清理艾尔文森林周边的魔物',
                    target: '击败25只狗头人矿工',
                    lv: 25,
                    reqs: [['slain', 21, 25]],
                    reward: [['gold', 400], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_2', 1, 100, {lv: 17}]],
                    successor: [],
                    forfeit: false
                },
                1022: {
                    name: '魔物扫荡：狗头人矿工精英',
                    category: 'guild',
                    desc: '清理艾尔文森林周边的魔物',
                    target: '击败10只狗头人矿工精英',
                    lv: 25,
                    reqs: [['slain', 23, 10]],
                    reward: [['gold', 300], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 17}]],
                    successor: [],
                    forfeit: false
                },
                1023: {
                    name: '魔物扫荡：狗头人矿工精英',
                    category: 'guild',
                    desc: '清理艾尔文森林周边的魔物',
                    target: '击败25只狗头人矿工精英',
                    lv: 25,
                    reqs: [['slain', 23, 25]],
                    reward: [['gold', 700], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 20}]],
                    successor: [],
                    forfeit: false
                },
                1030: {
                    name: '魔物扫荡：狗头人地卜师',
                    category: 'guild', 
                    desc: '清理艾尔文森林周边的魔物',
                    target: '击败10只狗头人地卜师',
                    lv: 30,
                    reqs: [['slain', 22, 10]],
                    reward: [['gold', 240], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_2', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                1031: {
                    name: '魔物扫荡：狗头人地卜师',
                    category: 'guild', 
                    desc: '清理艾尔文森林周边的魔物',
                    target: '击败25只狗头人地卜师',
                    lv: 30,
                    reqs: [['slain', 22, 25]],
                    reward: [['gold', 560], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_2', 1, 100, {lv: 32}]],
                    successor: [],
                    forfeit: false
                },
                1032: {
                    name: '魔物扫荡：狗头人地卜师精英',
                    category: 'guild', 
                    desc: '清理艾尔文森林周边的魔物',
                    target: '击败10只狗头人地卜师精英',
                    lv: 30,
                    reqs: [['slain', 24, 10]],
                    reward: [['gold', 360], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 32}]],
                    successor: [],
                    forfeit: false
                },
                1033: {
                    name: '魔物扫荡：狗头人地卜师精英',
                    category: 'guild', 
                    desc: '清理艾尔文森林周边的魔物',
                    target: '击败25只狗头人地卜师精英',
                    lv: 30,
                    reqs: [['slain', 24, 25]],
                    reward: [['gold', 840], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 35}]],
                    successor: [],
                    forfeit: false
                },
                1039: {
                    name: '魔物扫荡：金牙',
                    category: 'guild', 
                    desc: '击败艾尔文森林地区首领',
                    target: '击败金牙',
                    lv: 30,
                    reqs: [['slain', 25, 1]],
                    reward: [['gold', 2000], ['guildReputation', 100]],
                    rewardItem: [['random_equip_6', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                1040: {
                    name: '魔物扫荡：河爪豺狼人',
                    category: 'guild',
                    desc: '清理西部荒野周边的魔物',
                    target: '击败10只河爪豺狼人',
                    lv: 35,
                    reqs: [['slain', 31, 10]],
                    reward: [['gold', 300], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_2', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                1041: {
                    name: '魔物扫荡：河爪豺狼人',
                    category: 'guild',
                    desc: '清理西部荒野周边的魔物',
                    target: '击败25只河爪豺狼人',
                    lv: 35,
                    reqs: [['slain', 31, 25]],
                    reward: [['gold', 600], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_2', 1, 100, {lv: 37}]],
                    successor: [],
                    forfeit: false
                },
                1042: {
                    name: '魔物扫荡：河爪豺狼人',
                    category: 'guild',
                    desc: '清理西部荒野周边的魔物',
                    target: '击败100只河爪豺狼人',
                    lv: 35,
                    reqs: [['slain', 31, 100]],
                    reward: [['gold', 1200], ['guildReputation', 100]],
                    rewardItem: [['random_equip_normal_3', 1, 100, {lv: 40}]],
                    successor: [],
                    forfeit: false
                },
                1043: {
                    name: '魔物扫荡：河爪豺狼人精英',
                    category: 'guild',
                    desc: '清理西部荒野周边的魔物',
                    target: '击败10只河爪豺狼人精英',
                    lv: 35,
                    reqs: [['slain', 33, 10]],
                    reward: [['gold', 450], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 37}]],
                    successor: [],
                    forfeit: false
                },
                1044: {
                    name: '魔物扫荡：河爪豺狼人精英',
                    category: 'guild',
                    desc: '清理西部荒野周边的魔物',
                    target: '击败25只河爪豺狼人精英',
                    lv: 35,
                    reqs: [['slain', 33, 25]],
                    reward: [['gold', 1050], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 40}]],
                    successor: [],
                    forfeit: false
                },
                1050: {
                    name: '魔物扫荡：黑爪豺狼人',
                    category: 'guild', 
                    desc: '清理西部荒野周边的魔物',
                    target: '击败10只黑爪豺狼人',
                    lv: 40,
                    reqs: [['slain', 32, 10]],
                    reward: [['gold', 360], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_2', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                1051: {
                    name: '魔物扫荡：黑爪豺狼人',
                    category: 'guild', 
                    desc: '清理西部荒野周边的魔物',
                    target: '击败25只黑爪豺狼人',
                    lv: 40,
                    reqs: [['slain', 32, 25]],
                    reward: [['gold', 840], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_2', 1, 100, {lv: 42}]],
                    successor: [],
                    forfeit: false
                },
                1052: {
                    name: '魔物扫荡：黑爪豺狼人',
                    category: 'guild', 
                    desc: '清理西部荒野周边的魔物',
                    target: '击败100只黑爪豺狼人',
                    lv: 40,
                    reqs: [['slain', 32, 100]],
                    reward: [['gold', 1680], ['guildReputation', 100]],
                    rewardItem: [['random_equip_normal_3', 1, 100, {lv: 45}]],
                    successor: [],
                    forfeit: false
                },
                1053: {
                    name: '魔物扫荡：黑爪豺狼人精英',
                    category: 'guild', 
                    desc: '清理西部荒野周边的魔物',
                    target: '击败10只黑爪豺狼人精英',
                    lv: 40,
                    reqs: [['slain', 34, 10]],
                    reward: [['gold', 540], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 42}]],
                    successor: [],
                    forfeit: false
                },
                1054: {
                    name: '魔物扫荡：黑爪豺狼人精英',
                    category: 'guild', 
                    desc: '清理西部荒野周边的魔物',
                    target: '击败25只黑爪豺狼人精英',
                    lv: 40,
                    reqs: [['slain', 34, 25]],
                    reward: [['gold', 1260], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 45}]],
                    successor: [],
                    forfeit: false
                },
                1059: {
                    name: '魔物扫荡：霍格',
                    category: 'guild', 
                    desc: '击败西部荒野地区首领',
                    target: '击败霍格',
                    lv: 40,
                    reqs: [['slain', 35, 1]],
                    reward: [['gold', 3000], ['guildReputation', 100]],
                    rewardItem: [['random_equip_6', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                1060: {
                    name: '魔物扫荡：盐壳龟',
                    category: 'guild',
                    desc: '清理千针石林周边的魔物',
                    target: '击败10只盐壳龟',
                    lv: 45,
                    reqs: [['slain', 41, 10]],
                    reward: [['gold', 450], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_3', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                1061: {
                    name: '魔物扫荡：盐壳龟',
                    category: 'guild',
                    desc: '清理千针石林周边的魔物',
                    target: '击败25只盐壳龟',
                    lv: 45,
                    reqs: [['slain', 41, 25]],
                    reward: [['gold', 900], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_3', 1, 100, {lv: 47,}]],
                    successor: [],
                    forfeit: false
                },
                1062: {
                    name: '魔物扫荡：盐壳龟',
                    category: 'guild',
                    desc: '清理千针石林周边的魔物',
                    target: '击败100只盐壳龟',
                    lv: 45,
                    reqs: [['slain', 41, 100]],
                    reward: [['gold', 1800], ['guildReputation', 100]],
                    rewardItem: [['random_equip_normal_4', 1, 100, {lv: 50}]],
                    successor: [],
                    forfeit: false
                },
                1063: {
                    name: '魔物扫荡：盐壳龟精英',
                    category: 'guild',
                    desc: '清理千针石林周边的魔物',
                    target: '击败10只盐壳龟精英',
                    lv: 45,
                    reqs: [['slain', 43, 10]],
                    reward: [['gold', 675], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 47,}]],
                    successor: [],
                    forfeit: false
                },
                1064: {
                    name: '魔物扫荡：盐壳龟精英',
                    category: 'guild',
                    desc: '清理千针石林周边的魔物',
                    target: '击败25只盐壳龟精英',
                    lv: 45,
                    reqs: [['slain', 43, 25]],
                    reward: [['gold', 1575], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 50}]],
                    successor: [],
                    forfeit: false
                },
                1070: {
                    name: '魔物扫荡：钳嘴龟',
                    category: 'guild', 
                    desc: '清理千针石林周边的魔物',
                    target: '击败10只钳嘴龟',
                    lv: 50,
                    reqs: [['slain', 42, 10]],
                    reward: [['gold', 540], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_3', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                1071: {
                    name: '魔物扫荡：钳嘴龟',
                    category: 'guild', 
                    desc: '清理千针石林周边的魔物',
                    target: '击败25只钳嘴龟',
                    lv: 50,
                    reqs: [['slain', 42, 25]],
                    reward: [['gold', 1260], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_3', 1, 100, {lv: 52}]],
                    successor: [],
                    forfeit: false
                },
                1072: {
                    name: '魔物扫荡：钳嘴龟',
                    category: 'guild', 
                    desc: '清理千针石林周边的魔物',
                    target: '击败100只钳嘴龟',
                    lv: 50,
                    reqs: [['slain', 42, 100]],
                    reward: [['gold', 2520], ['guildReputation', 100]],
                    rewardItem: [['random_equip_normal_4', 1, 100, {lv: 55}]],
                    successor: [],
                    forfeit: false
                },
                1073: {
                    name: '魔物扫荡：钳嘴龟精英',
                    category: 'guild', 
                    desc: '清理千针石林周边的魔物',
                    target: '击败10只钳嘴龟精英',
                    lv: 50,
                    reqs: [['slain', 44, 10]],
                    reward: [['gold', 810], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 52}]],
                    successor: [],
                    forfeit: false
                },
                1074: {
                    name: '魔物扫荡：钳嘴龟精英',
                    category: 'guild', 
                    desc: '清理千针石林周边的魔物',
                    target: '击败25只钳嘴龟精英',
                    lv: 50,
                    reqs: [['slain', 44, 25]],
                    reward: [['gold', 1890], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 55}]],
                    successor: [],
                    forfeit: false
                },
                1079: {
                    name: '魔物扫荡：铁背龟',
                    category: 'guild', 
                    desc: '击败千针石林地区首领',
                    target: '击败铁背龟',
                    lv: 50,
                    reqs: [['slain', 45, 1]],
                    reward: [['gold', 4500], ['guildReputation', 100]],
                    rewardItem: [['random_equip_6', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                1080: {
                    name: '魔物扫荡：灼热元素',
                    category: 'guild',
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败10只灼热元素',
                    lv: 55,
                    reqs: [['slain', 41, 10]],
                    reward: [['gold', 675], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_3', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                1081: {
                    name: '魔物扫荡：灼热元素',
                    category: 'guild',
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败25只灼热元素',
                    lv: 55,
                    reqs: [['slain', 41, 25]],
                    reward: [['gold', 1350], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_3', 1, 100, {lv: 57,}]],
                    successor: [],
                    forfeit: false
                },
                1082: {
                    name: '魔物扫荡：灼热元素',
                    category: 'guild',
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败100只灼热元素',
                    lv: 55,
                    reqs: [['slain', 41, 100]],
                    reward: [['gold', 2700], ['guildReputation', 100]],
                    rewardItem: [['random_equip_normal_4', 1, 100, {lv: 60}]],
                    successor: [],
                    forfeit: false
                },
                1083: {
                    name: '魔物扫荡：灼热元素精英',
                    category: 'guild',
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败10只灼热元素精英',
                    lv: 55,
                    reqs: [['slain', 43, 10]],
                    reward: [['gold', 1010], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 57,}]],
                    successor: [],
                    forfeit: false
                },
                1084: {
                    name: '魔物扫荡：灼热元素精英',
                    category: 'guild',
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败25只灼热元素精英',
                    lv: 55,
                    reqs: [['slain', 43, 25]],
                    reward: [['gold', 2360], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 60}]],
                    successor: [],
                    forfeit: false
                },
                1090: {
                    name: '魔物扫荡：熔岩元素',
                    category: 'guild', 
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败10只熔岩元素',
                    lv: 60,
                    reqs: [['slain', 42, 10]],
                    reward: [['gold', 810], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_3', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                1091: {
                    name: '魔物扫荡：熔岩元素',
                    category: 'guild', 
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败25只熔岩元素',
                    lv: 60,
                    reqs: [['slain', 42, 25]],
                    reward: [['gold', 1890], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_3', 1, 100, {lv: 62}]],
                    successor: [],
                    forfeit: false
                },
                1092: {
                    name: '魔物扫荡：熔岩元素',
                    category: 'guild', 
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败100只熔岩元素',
                    lv: 60,
                    reqs: [['slain', 42, 100]],
                    reward: [['gold', 3780], ['guildReputation', 100]],
                    rewardItem: [['random_equip_normal_4', 1, 100, {lv: 65}]],
                    successor: [],
                    forfeit: false
                },
                1093: {
                    name: '魔物扫荡：熔岩元素精英',
                    category: 'guild', 
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败10只熔岩元素精英',
                    lv: 60,
                    reqs: [['slain', 44, 10]],
                    reward: [['gold', 1215], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 62}]],
                    successor: [],
                    forfeit: false
                },
                1094: {
                    name: '魔物扫荡：熔岩元素精英',
                    category: 'guild', 
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败25只熔岩元素精英',
                    lv: 60,
                    reqs: [['slain', 44, 25]],
                    reward: [['gold', 2835], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 65}]],
                    successor: [],
                    forfeit: false
                },
                1099: {
                    name: '魔物扫荡：地狱元素',
                    category: 'guild', 
                    desc: '击败灼热峡谷地区首领',
                    target: '击败地狱元素',
                    lv: 60,
                    reqs: [['slain', 45, 1]],
                    reward: [['gold', 6750], ['guildReputation', 100]],
                    rewardItem: [['random_equip_6', 1, 100]],
                    successor: [],
                    forfeit: false
                },
            }
        }
    }
}