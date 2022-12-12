export const dungeonConfig = {
    data() {
        return {
            dungeons: {
                Ragefire_Chasm: {
                    name: '怒焰裂谷',
                    map: [
                        [
                            { id: 2000, position: -1, reveal: false, count: 1 },
                            { id: 5, position: -1, reveal: false, count: 5 },
                            { id: 6, position: -1, reveal: false, count: 5 },
                            { id: 2, position: -1, reveal: false, count: 1 },
                        ],
                        [
                            { id: 7, position: -1, reveal: false, count: 5 },
                            { id: 8, position: -1, reveal: false, count: 5 },
                            { id: 3, position: -1, reveal: false, count: 1 },
                        ]
                    ]
                }
            },
            dungeonSpecialty: {
                hunger: {name:'贪食', desc:'造成伤害时会夺取1点攻击力以及护甲'},
                nextLevel: {name:'', desc:'进入下一层'},
            },
            dungeonMonster: {
                1: {
                    type:'boss', name:'熔岩守卫戈多斯', stat: { hp:1000, atk: 50, block: 25 }, 
                    iconSrc:'/icons/dungeon/ui-ej-boss-lava-guard-gordoth.png',
                    specialty: []
                },
                2: {
                    type:'elite', name:'阿达罗格', stat: { hp:100, atk: 20, block: 20 }, 
                    iconSrc:'/icons/dungeon/ui-ej-boss-adarogg.png',
                    specialty: ['hunger']
                },
                3: {
                    type:'elite', name:'黑暗萨满柯兰萨', stat: { hp:1000, atk: 50, block: 25 }, 
                    iconSrc:'/icons/dungeon/ui-ej-boss-dark-shaman-koranthal.png',
                    specialty: []
                },
                4: {
                    type:'elite', name:'焰喉', stat: { hp:1000, atk: 50, block: 25 }, 
                    iconSrc:'/icons/dungeon/ui-ej-boss-magmaw.png',
                    specialty: []
                },
                5: {
                    type:'normal', name:'怒焰穴居人', stat: { hp:100, atk: 20, block: 20 }, 
                    iconSrc:'/icons/dungeon/Ragefire-Trogg.png',
                    specialty: []
                },
                6: {
                    type:'normal', name:'怒焰萨满祭司', stat: { hp:90, atk: 30, block: 10 }, 
                    iconSrc:'/icons/dungeon/Ragefire-Trogg.png',
                    specialty: []
                },
                7: {
                    type:'normal', name:'黑暗萨满助手', stat: { hp:100, atk: 20, block: 20 }, 
                    iconSrc:'/icons/dungeon/Dark-Acolyte.png',
                    specialty: []
                },
                8: {
                    type:'normal', name:'黑暗萨满研究者', stat: { hp:90, atk: 30, block: 10 }, 
                    iconSrc:'/icons/dungeon/Dark-Shaman-Researcher.png',
                    specialty: []
                },
                
                2000: {
                    type:'door', name:'大门', 
                    iconSrc:'/icons/dungeon/door.jpg', stat: { hp:0, atk: 0, block: 0 },
                    specialty: ['nextLevel']
                },
            }
        }
    }
}