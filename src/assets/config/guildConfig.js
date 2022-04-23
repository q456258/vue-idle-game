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
            guildBuildingName: {questBoard:'任务榜', shop:'商店', smith:'铁匠铺', train:'练功房', train2:'中级练功房', train3:'高级练功房', mine: '矿场', herb: '药园'},
            upgradeCost: {
                questBoard: [100,1000,10000],
                shop: [100,1000,10000],
                smith: [100,1000,10000],
                mine: [100,1000,10000],
                herb: [100,1000,10000],
            }, 
        }
    },
  }