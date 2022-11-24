export const questConfig = {
    data() {
        return {
            eventId: {
                1: '重置地图',
                2: '穿戴装备',
                3: '存档',
                4: '升级天赋',
                5: '强化装备',
                6: '锻造装备',
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
                    reward: [['exp', 100]],
                    rewardItem: [['random_equip_normal_0', 1, 100, {types: ['helmet']}]],
                    successor: [2, 7],
                    forfeit: false
                },
                1: {
                    name: '重置地图',
                    category: 'newbie',
                    desc: '如果找不到想要打的怪，可以点击屏幕中间，地图上方，"重置地图"刷新地图上的内容',
                    target: '点击重置地图',
                    lv: 1,
                    reqs: [['event', 1, 1]],
                    reward: [['exp', 50]],
                    rewardItem: [['inv_alchemy_80_potion01red', 20, 100]],
                    successor: [],
                    forfeit: false
                },
                2: {
                    name: '击败训练假人',
                    category: 'newbie',
                    desc: '试着击败一只训练假人吧，晴风村1-5级，图标为棕色骷髅头的怪物为训练假人。获取足够的装备，变得强大后继续挑战更高级的怪物吧！',
                    target: '击败训练假人',
                    lv: 2,
                    reqs: [['slain', 1, 1]],
                    reward: [['exp', 200]],
                    rewardItem: [['random_equip_normal_0', 1, 100, {types: ['necklace']}]],
                    successor: [3, 4],
                    forfeit: false
                },
                3: {
                    name: '击败训练假人精英',
                    category: 'newbie',
                    desc: '接下来击败一只训练假人精英吧，晴风村1-5级，图标为银色骷髅头的怪物为训练假人精英。失败了一次不要紧，精英可以挑战两次！',
                    target: '击败训练假人精英',
                    lv: 5,
                    reqs: [['slain', 3, 1]],
                    reward: [['exp', 600]],
                    rewardItem: [['random_equip_elite_1', 1, 100, {types: ['shoulder']}]],
                    successor: [],
                    forfeit: false
                },
                4: {
                    name: '击败高级训练假人',
                    category: 'newbie',
                    desc: '试着击败一只高级训练假人吧，晴风村6-10级，图标为棕色骷髅头的怪物为高级训练假人。',
                    target: '击败高级训练假人',
                    lv: 5,
                    reqs: [['slain', 2, 1]],
                    reward: [['exp', 300]],
                    rewardItem: [['random_equip_normal_0', 1, 100, {types: ['ring']}]],
                    successor: [5],
                    forfeit: false
                },
                5: {
                    name: '击败高级训练假人精英',
                    category: 'newbie',
                    desc: '接下来击败一只高级训练假人精英吧，晴风村6-10级，图标为银色骷髅头的怪物为训练假人精英。',
                    target: '击败高级训练假人精英',
                    lv: 10,
                    reqs: [['slain', 4, 1]],
                    reward: [['exp', 800]],
                    rewardItem: [['random_equip_elite_1', 1, 100, {types: ['glove']}]],
                    successor: [6, 11],
                    forfeit: false
                },
                6: {
                    name: '毕业',
                    category: 'newbie',
                    desc: '击败精英怪后有概率获得BOSS挑战券，通过击败晴风村精英获得导师挑战券来挑战他吧！如同精英怪物，BOSS类怪物可以挑战5次才算失败，并且奖励非常丰富！',
                    target: '击败导师',
                    lv: 10,
                    reqs: [['slain', 5, 1]],
                    reward: [['exp', 2000]],
                    rewardItem: [['unique_equip', 'inv_sword_05', 1, 100], ['unique_equip', 'inv_wand_06', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                7: {
                    name: '穿戴装备',
                    category: 'newbie',
                    desc: '打开左下角的背包，在"装备"分类下双击或者右键装备单击装备，即可穿戴或更换装备',
                    target: '穿戴一件装备',
                    lv: 1,
                    reqs: [['event', 2, 1]],
                    reward: [['exp', 200]],
                    rewardItem: [['inv_alchemy_80_potion01red', 20, 100]],
                    successor: [8],
                    forfeit: false
                },
                8: {
                    name: '存档',
                    category: 'newbie',
                    desc: '点击左下角的【保存/加载游戏】, 点击后自动进行一次存档, 平时每5分钟自动存档一次',
                    target: '保存一次游戏进度',
                    lv: 1,
                    reqs: [['event', 3, 1]],
                    reward: [['exp', 300]],
                    rewardItem: [['inv_alchemy_80_potion01red', 20, 100]],
                    successor: [],
                    forfeit: false
                },
                11: {
                    name: '击败杂斑野猪',
                    category: 'newbie',
                    desc: '试着击败一只杂斑野猪吧，克罗莫丹11-15级，图标为棕色骷髅头的怪物为杂斑野猪。',
                    target: '击败杂斑野猪',
                    lv: 10,
                    reqs: [['slain', 11, 1]],
                    reward: [['exp', 500]],
                    rewardItem: [['random_equip_normal_0', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                15: {
                    name: '升级天赋',
                    category: 'newbie',
                    desc: '10级开始每次升级可以获得一点天赋点，点击左上角的‘天赋’切换到天赋界面。左键点击天赋可提升一级，右键降低一级，按住shift一次5级。',
                    target: '升级一次天赋',
                    lv: 10,
                    reqs: [['event', 4, 1]],
                    reward: [['exp', 300]],
                    rewardItem: [['random_equip_normal_0', 1, 100]],
                    successor: [],
                    forfeit: false
                },
                16: {
                    name: '强化装备',
                    category: 'newbie',
                    desc: '10级后可强化装备，右键身上的或者背包的装备点击强化。每强化一级提升5%基础属性(向下取整)。',
                    target: '提升一次装备强化等级',
                    lv: 10,
                    reqs: [['event', 5, 1]],
                    reward: [['exp', 300]],
                    rewardItem: [['inv_misc_gem_diamond_04', 5, 100]],
                    successor: [],
                    forfeit: false
                },
                26: {
                    name: '锻造装备',
                    category: 'newbie',
                    desc: '公会铁匠铺1级解锁锻造功能，可花钱重置装备的额外词条。',
                    target: '锻造一次装备',
                    lv: 20,
                    reqs: [['event', 6, 1]],
                    reward: [['gold', 2000], ['exp', 400]],
                    rewardItem: [],
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
                    reward: [['gold', 200], ['exp', 400], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_2', 1, 100]],
                    successor: [],
                    forfeit: true
                },
                1001: {
                    name: '魔物扫荡：杂斑野猪',
                    category: 'guild',
                    desc: '清理克罗莫丹周边的魔物',
                    target: '击败25只杂斑野猪',
                    lv: 15,
                    reqs: [['slain', 11, 25]],
                    reward: [['gold', 400], ['exp', 800], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_2', 1, 100, {lv: 17}]],
                    successor: [],
                    forfeit: true
                },
                1002: {
                    name: '魔物扫荡：杂斑野猪精英',
                    category: 'guild',
                    desc: '清理克罗莫丹周边的魔物',
                    target: '击败10只杂斑野猪精英',
                    lv: 15,
                    reqs: [['slain', 13, 10]],
                    reward: [['gold', 300], ['exp', 600], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 17}]],
                    successor: [],
                    forfeit: true
                },
                1003: {
                    name: '魔物扫荡：杂斑野猪精英',
                    category: 'guild',
                    desc: '清理克罗莫丹周边的魔物',
                    target: '击败25只杂斑野猪精英',
                    lv: 15,
                    reqs: [['slain', 13, 25]],
                    reward: [['gold', 700], ['exp', 1400], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 20}]],
                    successor: [],
                    forfeit: true
                },
                1010: {
                    name: '魔物扫荡：癞皮山猪',
                    category: 'guild', 
                    desc: '清理克罗莫丹周边的魔物',
                    target: '击败10只癞皮山猪',
                    lv: 20,
                    reqs: [['slain', 12, 10]],
                    reward: [['gold', 300], ['exp', 600], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_2', 1, 100]],
                    successor: [],
                    forfeit: true
                },
                1011: {
                    name: '魔物扫荡：癞皮山猪',
                    category: 'guild', 
                    desc: '清理克罗莫丹周边的魔物',
                    target: '击败25只癞皮山猪',
                    lv: 20,
                    reqs: [['slain', 12, 25]],
                    reward: [['gold', 450], ['exp', 900], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_2', 1, 100, {lv: 22}]],
                    successor: [],
                    forfeit: true
                },
                1012: {
                    name: '魔物扫荡：癞皮山猪精英',
                    category: 'guild', 
                    desc: '清理克罗莫丹周边的魔物',
                    target: '击败10只癞皮山猪精英',
                    lv: 20,
                    reqs: [['slain', 14, 10]],
                    reward: [['gold', 600], ['exp', 1200], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 22}]],
                    successor: [],
                    forfeit: true
                },
                1013: {
                    name: '魔物扫荡：癞皮山猪精英',
                    category: 'guild', 
                    desc: '清理克罗莫丹周边的魔物',
                    target: '击败25只癞皮山猪精英',
                    lv: 20,
                    reqs: [['slain', 14, 25]],
                    reward: [['gold', 1000], ['exp', 2000], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 25}]],
                    successor: [],
                    forfeit: true
                },
                1019: {
                    name: '魔物扫荡：阿迦玛',
                    category: 'guild', 
                    desc: '击败克罗莫丹地区首领',
                    target: '击败阿迦玛',
                    lv: 20,
                    reqs: [['slain', 15, 1]],
                    reward: [['gold', 2000], ['exp', 4000], ['guildReputation', 100]],
                    rewardItem: [['random_equip_6', 1, 100]],
                    successor: [],
                    forfeit: true
                },
                1020: {
                    name: '魔物扫荡：狗头人矿工',
                    category: 'guild',
                    desc: '清理艾尔文森林周边的魔物',
                    target: '击败10只狗头人矿工',
                    lv: 25,
                    reqs: [['slain', 21, 10]],
                    reward: [['gold', 600], ['exp', 1200], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_2', 1, 100]],
                    successor: [],
                    forfeit: true
                },
                1021: {
                    name: '魔物扫荡：狗头人矿工',
                    category: 'guild',
                    desc: '清理艾尔文森林周边的魔物',
                    target: '击败25只狗头人矿工',
                    lv: 25,
                    reqs: [['slain', 21, 25]],
                    reward: [['gold', 1200], ['exp', 2400], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_2', 1, 100, {lv: 27}]],
                    successor: [],
                    forfeit: true
                },
                1022: {
                    name: '魔物扫荡：狗头人矿工精英',
                    category: 'guild',
                    desc: '清理艾尔文森林周边的魔物',
                    target: '击败10只狗头人矿工精英',
                    lv: 25,
                    reqs: [['slain', 23, 10]],
                    reward: [['gold', 900], ['exp', 1800], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 27}]],
                    successor: [],
                    forfeit: true
                },
                1023: {
                    name: '魔物扫荡：狗头人矿工精英',
                    category: 'guild',
                    desc: '清理艾尔文森林周边的魔物',
                    target: '击败25只狗头人矿工精英',
                    lv: 25,
                    reqs: [['slain', 23, 25]],
                    reward: [['gold', 2100], ['exp', 4200], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 30}]],
                    successor: [],
                    forfeit: true
                },
                1030: {
                    name: '魔物扫荡：狗头人地卜师',
                    category: 'guild', 
                    desc: '清理艾尔文森林周边的魔物',
                    target: '击败10只狗头人地卜师',
                    lv: 30,
                    reqs: [['slain', 22, 10]],
                    reward: [['gold', 720], ['exp', 1440], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_2', 1, 100]],
                    successor: [],
                    forfeit: true
                },
                1031: {
                    name: '魔物扫荡：狗头人地卜师',
                    category: 'guild', 
                    desc: '清理艾尔文森林周边的魔物',
                    target: '击败25只狗头人地卜师',
                    lv: 30,
                    reqs: [['slain', 22, 25]],
                    reward: [['gold', 1680], ['exp', 3360], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_2', 1, 100, {lv: 32}]],
                    successor: [],
                    forfeit: true
                },
                1032: {
                    name: '魔物扫荡：狗头人地卜师精英',
                    category: 'guild', 
                    desc: '清理艾尔文森林周边的魔物',
                    target: '击败10只狗头人地卜师精英',
                    lv: 30,
                    reqs: [['slain', 24, 10]],
                    reward: [['gold', 1080], ['exp', 2160], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 32}]],
                    successor: [],
                    forfeit: true
                },
                1033: {
                    name: '魔物扫荡：狗头人地卜师精英',
                    category: 'guild', 
                    desc: '清理艾尔文森林周边的魔物',
                    target: '击败25只狗头人地卜师精英',
                    lv: 30,
                    reqs: [['slain', 24, 25]],
                    reward: [['gold', 2400], ['exp', 4800], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 35}]],
                    successor: [],
                    forfeit: true
                },
                1039: {
                    name: '魔物扫荡：金牙',
                    category: 'guild', 
                    desc: '击败艾尔文森林地区首领',
                    target: '击败金牙',
                    lv: 30,
                    reqs: [['slain', 25, 1]],
                    reward: [['gold', 4000], ['exp', 8000], ['guildReputation', 100]],
                    rewardItem: [['random_equip_6', 1, 100]],
                    successor: [],
                    forfeit: true
                },
                1040: {
                    name: '魔物扫荡：河爪豺狼人',
                    category: 'guild',
                    desc: '清理西部荒野周边的魔物',
                    target: '击败10只河爪豺狼人',
                    lv: 35,
                    reqs: [['slain', 31, 10]],
                    reward: [['gold', 900], ['exp', 1800], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_2', 1, 100]],
                    successor: [],
                    forfeit: true
                },
                1041: {
                    name: '魔物扫荡：河爪豺狼人',
                    category: 'guild',
                    desc: '清理西部荒野周边的魔物',
                    target: '击败25只河爪豺狼人',
                    lv: 35,
                    reqs: [['slain', 31, 25]],
                    reward: [['gold', 1800], ['exp', 3600], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_2', 1, 100, {lv: 37}]],
                    successor: [],
                    forfeit: true
                },
                1042: {
                    name: '魔物扫荡：河爪豺狼人',
                    category: 'guild',
                    desc: '清理西部荒野周边的魔物',
                    target: '击败100只河爪豺狼人',
                    lv: 35,
                    reqs: [['slain', 31, 100]],
                    reward: [['gold', 3600], ['exp', 7200], ['guildReputation', 100]],
                    rewardItem: [['random_equip_normal_3', 1, 100, {lv: 40}]],
                    successor: [],
                    forfeit: true
                },
                1043: {
                    name: '魔物扫荡：河爪豺狼人精英',
                    category: 'guild',
                    desc: '清理西部荒野周边的魔物',
                    target: '击败10只河爪豺狼人精英',
                    lv: 35,
                    reqs: [['slain', 33, 10]],
                    reward: [['gold', 1350], ['exp', 2700], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 37}]],
                    successor: [],
                    forfeit: true
                },
                1044: {
                    name: '魔物扫荡：河爪豺狼人精英',
                    category: 'guild',
                    desc: '清理西部荒野周边的魔物',
                    target: '击败25只河爪豺狼人精英',
                    lv: 35,
                    reqs: [['slain', 33, 25]],
                    reward: [['gold', 3150], ['exp', 6300], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 40}]],
                    successor: [],
                    forfeit: true
                },
                1050: {
                    name: '魔物扫荡：黑爪豺狼人',
                    category: 'guild', 
                    desc: '清理西部荒野周边的魔物',
                    target: '击败10只黑爪豺狼人',
                    lv: 40,
                    reqs: [['slain', 32, 10]],
                    reward: [['gold', 360], ['exp', 720], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_2', 1, 100]],
                    successor: [],
                    forfeit: true
                },
                1051: {
                    name: '魔物扫荡：黑爪豺狼人',
                    category: 'guild', 
                    desc: '清理西部荒野周边的魔物',
                    target: '击败25只黑爪豺狼人',
                    lv: 40,
                    reqs: [['slain', 32, 25]],
                    reward: [['gold', 840], ['exp', 1680], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_2', 1, 100, {lv: 42}]],
                    successor: [],
                    forfeit: true
                },
                1052: {
                    name: '魔物扫荡：黑爪豺狼人',
                    category: 'guild', 
                    desc: '清理西部荒野周边的魔物',
                    target: '击败100只黑爪豺狼人',
                    lv: 40,
                    reqs: [['slain', 32, 100]],
                    reward: [['gold', 1680], ['exp', 3360], ['guildReputation', 100]],
                    rewardItem: [['random_equip_normal_3', 1, 100, {lv: 45}]],
                    successor: [],
                    forfeit: true
                },
                1053: {
                    name: '魔物扫荡：黑爪豺狼人精英',
                    category: 'guild', 
                    desc: '清理西部荒野周边的魔物',
                    target: '击败10只黑爪豺狼人精英',
                    lv: 40,
                    reqs: [['slain', 34, 10]],
                    reward: [['gold', 540], ['exp', 1080], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 42}]],
                    successor: [],
                    forfeit: true
                },
                1054: {
                    name: '魔物扫荡：黑爪豺狼人精英',
                    category: 'guild', 
                    desc: '清理西部荒野周边的魔物',
                    target: '击败25只黑爪豺狼人精英',
                    lv: 40,
                    reqs: [['slain', 34, 25]],
                    reward: [['gold', 1260], ['exp', 2520], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 45}]],
                    successor: [],
                    forfeit: true
                },
                1059: {
                    name: '魔物扫荡：霍格',
                    category: 'guild', 
                    desc: '击败西部荒野地区首领',
                    target: '击败霍格',
                    lv: 40,
                    reqs: [['slain', 35, 1]],
                    reward: [['gold', 3000], ['exp', 6000], ['guildReputation', 100]],
                    rewardItem: [['random_equip_6', 1, 100]],
                    successor: [],
                    forfeit: true
                },
                1060: {
                    name: '魔物扫荡：盐壳龟',
                    category: 'guild',
                    desc: '清理千针石林周边的魔物',
                    target: '击败10只盐壳龟',
                    lv: 45,
                    reqs: [['slain', 41, 10]],
                    reward: [['gold', 1350], ['exp', 2700], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_3', 1, 100]],
                    successor: [],
                    forfeit: true
                },
                1061: {
                    name: '魔物扫荡：盐壳龟',
                    category: 'guild',
                    desc: '清理千针石林周边的魔物',
                    target: '击败25只盐壳龟',
                    lv: 45,
                    reqs: [['slain', 41, 25]],
                    reward: [['gold', 2700], ['exp', 5400], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_3', 1, 100, {lv: 47,}]],
                    successor: [],
                    forfeit: true
                },
                1062: {
                    name: '魔物扫荡：盐壳龟',
                    category: 'guild',
                    desc: '清理千针石林周边的魔物',
                    target: '击败100只盐壳龟',
                    lv: 45,
                    reqs: [['slain', 41, 100]],
                    reward: [['gold', 5400], ['exp', 10800], ['guildReputation', 100]],
                    rewardItem: [['random_equip_normal_4', 1, 100, {lv: 50}]],
                    successor: [],
                    forfeit: true
                },
                1063: {
                    name: '魔物扫荡：盐壳龟精英',
                    category: 'guild',
                    desc: '清理千针石林周边的魔物',
                    target: '击败10只盐壳龟精英',
                    lv: 45,
                    reqs: [['slain', 43, 10]],
                    reward: [['gold', 2025], ['exp', 4050], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 47,}]],
                    successor: [],
                    forfeit: true
                },
                1064: {
                    name: '魔物扫荡：盐壳龟精英',
                    category: 'guild',
                    desc: '清理千针石林周边的魔物',
                    target: '击败25只盐壳龟精英',
                    lv: 45,
                    reqs: [['slain', 43, 25]],
                    reward: [['gold', 4725], ['exp', 9450], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 50}]],
                    successor: [],
                    forfeit: true
                },
                1070: {
                    name: '魔物扫荡：钳嘴龟',
                    category: 'guild', 
                    desc: '清理千针石林周边的魔物',
                    target: '击败10只钳嘴龟',
                    lv: 50,
                    reqs: [['slain', 42, 10]],
                    reward: [['gold', 1620], ['exp', 3240], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_3', 1, 100]],
                    successor: [],
                    forfeit: true
                },
                1071: {
                    name: '魔物扫荡：钳嘴龟',
                    category: 'guild', 
                    desc: '清理千针石林周边的魔物',
                    target: '击败25只钳嘴龟',
                    lv: 50,
                    reqs: [['slain', 42, 25]],
                    reward: [['gold', 3780], ['exp', 7560], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_3', 1, 100, {lv: 52}]],
                    successor: [],
                    forfeit: true
                },
                1072: {
                    name: '魔物扫荡：钳嘴龟',
                    category: 'guild', 
                    desc: '清理千针石林周边的魔物',
                    target: '击败100只钳嘴龟',
                    lv: 50,
                    reqs: [['slain', 42, 100]],
                    reward: [['gold', 7560], ['exp', 15120], ['guildReputation', 100]],
                    rewardItem: [['random_equip_normal_4', 1, 100, {lv: 55}]],
                    successor: [],
                    forfeit: true
                },
                1073: {
                    name: '魔物扫荡：钳嘴龟精英',
                    category: 'guild', 
                    desc: '清理千针石林周边的魔物',
                    target: '击败10只钳嘴龟精英',
                    lv: 50,
                    reqs: [['slain', 44, 10]],
                    reward: [['gold', 2430], ['exp', 4860], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 52}]],
                    successor: [],
                    forfeit: true
                },
                1074: {
                    name: '魔物扫荡：钳嘴龟精英',
                    category: 'guild', 
                    desc: '清理千针石林周边的魔物',
                    target: '击败25只钳嘴龟精英',
                    lv: 50,
                    reqs: [['slain', 44, 25]],
                    reward: [['gold', 5670], ['exp', 11340], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 55}]],
                    successor: [],
                    forfeit: true
                },
                1079: {
                    name: '魔物扫荡：铁背龟',
                    category: 'guild', 
                    desc: '击败千针石林地区首领',
                    target: '击败铁背龟',
                    lv: 50,
                    reqs: [['slain', 45, 1]],
                    reward: [['gold', 9000], ['exp', 18000], ['guildReputation', 100]],
                    rewardItem: [['random_equip_6', 1, 100]],
                    successor: [],
                    forfeit: true
                },
                1080: {
                    name: '魔物扫荡：灼热元素',
                    category: 'guild',
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败10只灼热元素',
                    lv: 55,
                    reqs: [['slain', 41, 10]],
                    reward: [['gold', 2020], ['exp', 4040], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_3', 1, 100]],
                    successor: [],
                    forfeit: true
                },
                1081: {
                    name: '魔物扫荡：灼热元素',
                    category: 'guild',
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败25只灼热元素',
                    lv: 55,
                    reqs: [['slain', 41, 25]],
                    reward: [['gold', 4050], ['exp', 8100], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_3', 1, 100, {lv: 57,}]],
                    successor: [],
                    forfeit: true
                },
                1082: {
                    name: '魔物扫荡：灼热元素',
                    category: 'guild',
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败100只灼热元素',
                    lv: 55,
                    reqs: [['slain', 41, 100]],
                    reward: [['gold', 8100], ['exp', 16200], ['guildReputation', 100]],
                    rewardItem: [['random_equip_normal_4', 1, 100, {lv: 60}]],
                    successor: [],
                    forfeit: true
                },
                1083: {
                    name: '魔物扫荡：灼热元素精英',
                    category: 'guild',
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败10只灼热元素精英',
                    lv: 55,
                    reqs: [['slain', 43, 10]],
                    reward: [['gold', 3030], ['exp', 6060], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 57,}]],
                    successor: [],
                    forfeit: true
                },
                1084: {
                    name: '魔物扫荡：灼热元素精英',
                    category: 'guild',
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败25只灼热元素精英',
                    lv: 55,
                    reqs: [['slain', 43, 25]],
                    reward: [['gold', 7080], ['exp', 14160], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 60}]],
                    successor: [],
                    forfeit: true
                },
                1090: {
                    name: '魔物扫荡：熔岩元素',
                    category: 'guild', 
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败10只熔岩元素',
                    lv: 60,
                    reqs: [['slain', 42, 10]],
                    reward: [['gold', 2430], ['exp', 4860], ['guildReputation', 10]],
                    rewardItem: [['random_equip_normal_3', 1, 100]],
                    successor: [],
                    forfeit: true
                },
                1091: {
                    name: '魔物扫荡：熔岩元素',
                    category: 'guild', 
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败25只熔岩元素',
                    lv: 60,
                    reqs: [['slain', 42, 25]],
                    reward: [['gold', 5670], ['exp', 11340], ['guildReputation', 25]],
                    rewardItem: [['random_equip_normal_3', 1, 100, {lv: 62}]],
                    successor: [],
                    forfeit: true
                },
                1092: {
                    name: '魔物扫荡：熔岩元素',
                    category: 'guild', 
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败100只熔岩元素',
                    lv: 60,
                    reqs: [['slain', 42, 100]],
                    reward: [['gold', 11340], ['exp', 22680], ['guildReputation', 100]],
                    rewardItem: [['random_equip_normal_4', 1, 100, {lv: 65}]],
                    successor: [],
                    forfeit: true
                },
                1093: {
                    name: '魔物扫荡：熔岩元素精英',
                    category: 'guild', 
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败10只熔岩元素精英',
                    lv: 60,
                    reqs: [['slain', 44, 10]],
                    reward: [['gold', 3645], ['exp', 7290], ['guildReputation', 20]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 62}]],
                    successor: [],
                    forfeit: true
                },
                1094: {
                    name: '魔物扫荡：熔岩元素精英',
                    category: 'guild', 
                    desc: '清理灼热峡谷周边的魔物',
                    target: '击败25只熔岩元素精英',
                    lv: 60,
                    reqs: [['slain', 44, 25]],
                    reward: [['gold', 8500], ['exp', 17000], ['guildReputation', 50]],
                    rewardItem: [['random_equip_elite_4', 1, 100, {lv: 65}]],
                    successor: [],
                    forfeit: true
                },
                1099: {
                    name: '魔物扫荡：地狱元素',
                    category: 'guild', 
                    desc: '击败灼热峡谷地区首领',
                    target: '击败地狱元素',
                    lv: 60,
                    reqs: [['slain', 45, 1]],
                    reward: [['gold', 15000], ['exp', 30000], ['guildReputation', 100]],
                    rewardItem: [['random_equip_6', 1, 100]],
                    successor: [],
                    forfeit: true
                },
            }
        }
    }
}