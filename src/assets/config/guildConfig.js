export const guildConfig = {
    data() {
        return {
            guildShop: {
                generalShop: [
                    [],
                    ['inv_alchemy_80_potion01red', 'inv_alchemy_80_potion01blue'],
                    ['inv_alchemy_80_potion01red', 'inv_alchemy_80_potion01blue', 'inv_potion_49', 'inv_potion_70', 'inv_potion_50', 'inv_potion_71'],
                    ['inv_alchemy_80_potion01red', 'inv_alchemy_80_potion01blue', 'inv_potion_49', 'inv_potion_70', 'inv_potion_50', 'inv_potion_71', 
                    'inv_potion_51', 'inv_potion_72', 'inv_potion_52', 'inv_potion_73'],
                ],      
                reputationShop: [
                    [],
                    [['inv_misc_gem_diamond_05', 3]],
                    [['inv_misc_gem_diamond_05', 3], ['inv_misc_gem_diamond_04', 15],],
                    [['inv_misc_gem_diamond_05', 3], ['inv_misc_gem_diamond_04', 15], ['inv_misc_gem_diamond_03', 30]],
                ],        
            },
            guildBuildingName: {
                guild: '公会',
                questBoard:'任务榜', shop:'商店', smith:'铁匠铺', 
                train:'练功房', train2:'中级练功房', train3:'高级练功房', 
                mine: '矿场', herb: '药园'
            },
            guildBuildingDesc: {
                guild: [],
                questBoard: ['','解锁任务榜','解锁二级任务','解锁三级任务'],
                shop: ['','解锁杂货店/名望商店','解锁黑市,增加商品','增加商品'],
                smith: ['','解锁装备强化', '解锁装备重铸', '解锁装备打造'],
                train: [],
                train2: [],
                train3: [],
                mine:  ['','增加一个矿位','增加两个矿位','增加三个矿位'],
                herb: []
            },
            upgradeCost: {
                questBoard: [1000,10000,100000],
                shop: [1000,10000,50000],
                smith: [10,100,10000,100000,1000000],
                mine: [1000,100000,1000000],
                // herb: [100,1000,10000],
            }, 
            mineMaxQty: [0,1,3,6,10]
        }
    },
  }