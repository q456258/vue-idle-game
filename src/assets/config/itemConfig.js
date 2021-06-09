
export const itemConfig = {
    data() {
        return {
            quality: [{
              name: '破旧',
              qualityLv: 1,
              color: '#a1a1a1',
            }, {
              name: '普通',
              qualityLv: 2,
              color: '#D9D9D9', 
            }, {
              name: '精良',
              qualityLv: 3,
              color: '#00BBFF', 
            }, {
              name: '完美',
              qualityLv: 4,
              color: '#BB00FF', 
            }, {
              name: '史诗',
              qualityLv: 5,
              color: '#FFBB00', 
            }, {
              name: '传说',
              qualityLv: 6,
              color: '#FF0000', 
            }],
            type:
            {
                dust2: {
                    quality: 2,
                    description: {
                        name: '普通装备精华',
                        category: '材料',
                        desc: '分解普通装备获得，可用于升级普通品质的装备',
                        iconSrc: "./icons/item/Inv_enchanting_dust.png",
                    },
                },
                dust3: {
                    quality: 3,
                    description: {
                        name: '精良装备精华',
                        category: '材料',
                        desc: '分解精良装备获得，可用于升级精良品质的装备',
                        iconSrc: "./icons/item/Inv_enchanting_70_arkhana.png",
                    },
                },
                dust4: {
                    quality: 4,
                    description: {
                        name: '完美装备精华',
                        category: '材料',
                        desc: '分解完美装备获得，可用于升级完美品质的装备',
                        iconSrc: "./icons/item/Inv_misc_dust_infinite.png",
                    },
                },
                dust5: {
                    quality: 5,
                    description: {
                        name: '史诗装备精华',
                        category: '材料',
                        desc: '分解史诗装备获得，可用于升级史诗品质的装备',
                        iconSrc: "./icons/item/Inv_enchanting_wod_dust3.png",
                    },
                },
                dust: {
                    quality: 6,
                    description: {
                        name: '传奇装备精华',
                        category: '材料',
                        desc: '分解传奇装备获得，可用于升级传奇品质的装备',
                        iconSrc: "./icons/item/Inv_enchant_dustillusion.png",
                    },
                }
            }
        }
    }
}