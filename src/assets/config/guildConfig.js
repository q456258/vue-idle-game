export const guildConfig = {
    data() {
        return {
            guildShop: {
                generalShop: [
                    [],
                    ['inv_alchemy_80_potion01red', 'inv_alchemy_80_potion01blue'],
                    ['inv_alchemy_80_potion01red', 'inv_alchemy_80_potion01blue'],
                    ['inv_alchemy_80_potion01red', 'inv_alchemy_80_potion01blue', 'inv_potion_49', 'inv_potion_70', 'inv_potion_50', 'inv_potion_71'],
                    ['inv_alchemy_80_potion01red', 'inv_alchemy_80_potion01blue', 'inv_potion_49', 'inv_potion_70', 'inv_potion_50', 'inv_potion_71', 
                    'inv_potion_51', 'inv_potion_72', 'inv_potion_52', 'inv_potion_73'],
                ],      
                reputationShop: [
                    [],
                    [['inv_misc_gem_diamond_05_bag', 3]],
                    [['inv_misc_gem_diamond_05_bag', 3], ['inv_misc_gem_diamond_04_bag', 15],],
                    [['inv_misc_gem_diamond_05_bag', 3], ['inv_misc_gem_diamond_04_bag', 15], ['inv_misc_gem_diamond_03_bag', 30]],
                ],        
            },
            guildBuildingName: {
                guild: '公会', bar: '酒馆',
                questBoard:'任务榜', shop:'商店', blackmarket:'黑市', smith:'铁匠铺', 
                // train:'练功房', train2:'中级练功房', train3:'高级练功房', 
                mine: '矿场', herb: '药园', treasury: '金库'
            },
            guildBuildingDesc: {
                guild: ['解锁其他建筑等级上限'],
                bar: [],
                questBoard: ['','解锁任务榜','解锁二级任务','解锁三级任务'],
                shop: ['','解锁杂货店','解锁名望商店','增加商品','增加商品'],
                blackmarket: ['','解锁黑市'],
                smith: ['','解锁装备强化', '解锁装备重铸', '解锁装备分解、锻造', '解锁装备洗炼', '解锁装备精炼', '解锁装备熔炼'],
                mine:  ['','增加一个矿位','增加两个矿位','增加三个矿位'],
                herb: [],
                treasury:  ['每级提升怪物等级*2%金币获取','','','','','',''],
            },
            buildingPreReq: {
                questBoard: [
                    [['guild', 1]],
                    [['guild', 2]],
                    [['guild', 3]],
                ],
                shop: [
                    [['guild', 1]],
                    [['guild', 2]],
                    [['guild', 3]],
                    [['guild', 4]],
                ],
                smith: [
                    [['guild', 1]],
                    [['guild', 1]],
                    [['guild', 2]],
                    [['guild', 3]],
                    [['guild', 4]],
                    [['guild', 5]],
                ],
                // train: [
                //     [['guild', 1]],
                //     [['guild', 1]],
                //     [['guild', 2]],
                //     [['guild', 2]],
                //     [['guild', 3]],
                // ],
                // train2: [
                //     [],
                // ],
                // train3: [
                //     [],
                // ],
                bar: [
                    [['guild', 1]],
                ],
                blackmarket: [
                    [['shop', 2]]
                ],
                treasury: [
                    [['guild', 1]],
                    [['guild', 1]],
                    [['guild', 1]],
                    [['guild', 1]],
                    [['guild', 1]],
                    [['guild', 2]],
                    [['guild', 2]],
                ],
                mine: [
                    [['guild', 2]],
                    [['guild', 3]],
                    [['guild', 4]],
                ]
            }, 
            upgradeCost: {
                questBoard: [100,10000,100000],
                shop: [100,1000,5000,20000],
                blackmarket: [10000],
                smith: [50,500,5000,500000,500000],
                bar: [100],
                train: [100, 10000],
                // train2: [10000, 1000000],
                // train3: [1000000]
                mine: [1000,100000,1000000],
                // herb: [100,1000,10000],
                treasury: [1000,10000,100000,1000000,10000000,50000000],
            }, 
            mineMaxQty: [0,1,3,6,10]
        }
    },
  }