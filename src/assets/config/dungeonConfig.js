export const dungeonConfig = {
    data() {
        return {
            dungeons: {
                Ragefire_Chasm: {
                    name: '怒焰裂谷',
                    map: [
                        [
                            { id: 2001, position: -1, reveal: false, count: 1 },
                            { id: 5, position: -1, reveal: false, count: 5 },
                            { id: 6, position: -1, reveal: false, count: 5 },
                            { id: 2, position: -1, reveal: false, count: 3 },
                        ], [
                            { id: 2000, position: 24, reveal: true, count: 1 },
                            { id: 2001, position: -1, reveal: false, count: 1 },
                            { id: 7, position: -1, reveal: false, count: 5 },
                            { id: 8, position: -1, reveal: false, count: 5 },
                            { id: 3, position: -1, reveal: false, count: 3 },
                        ], [
                            { id: 2000, position: 24, reveal: true, count: 1 },
                            { id: 2001, position: -1, reveal: false, count: 1 },
                            { id: 9, position: -1, reveal: false, count: 8 },
                            { id: 4, position: -1, reveal: false, count: 3 },
                        ], [
                            { id: 1, position: 24, reveal: true, count: 1 },
                        ]
                    ]
                }
            },
            dungeonSpecialty: {
                prevLevel: {name:'', desc:'回到上一层'},
                nextLevel: {name:'', desc:'进入下一层'},
                hunger: {name:'贪食', desc:'造成伤害时会夺取1点攻击力以及护甲, 死亡时归还'},
                corrosion: {name:'腐蚀', desc:'死亡时破坏玩家2点护甲'},
                reckless: {name:'莽撞', desc:'攻击时随机使目标失去0-10点生命值, 自身失去等值的双倍'},
            },
            dungeonMonster: {
                1: {
                    type:'boss', name:'熔岩守卫戈多斯', stat: { hp:2000, atk: 60, block: 30 }, 
                    iconSrc:'/icons/dungeon/ui-ej-boss-lava-guard-gordoth.png',
                    specialty: []
                },
                2: {
                    type:'elite', name:'阿达罗格', stat: { hp:150, atk: 20, block: 0 }, 
                    iconSrc:'/icons/dungeon/ui-ej-boss-adarogg.png',
                    specialty: ['hunger']
                },
                3: {
                    type:'elite', name:'黑暗萨满柯兰萨', stat: { hp:300, atk: 50, block: 25 }, 
                    iconSrc:'/icons/dungeon/ui-ej-boss-dark-shaman-koranthal.png',
                    specialty: ['corrosion']
                },
                4: {
                    type:'elite', name:'焰喉', stat: { hp:1000, atk: 30, block: 0 }, 
                    iconSrc:'/icons/dungeon/ui-ej-boss-magmaw.png',
                    specialty: ['reckless']
                },
                5: {
                    type:'normal', name:'怒焰穴居人', stat: { hp:50, atk: 15, block: 5 }, 
                    iconSrc:'/icons/dungeon/Ragefire-Trogg.png',
                    specialty: []
                },
                6: {
                    type:'normal', name:'怒焰萨满祭司', stat: { hp:50, atk: 20, block: 0 }, 
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
                9: {
                    type:'normal', name:'熔岩元素', stat: { hp:200, atk: 50, block: 10 }, 
                    iconSrc:'/icons/character/magmaEle.png',
                    specialty: []
                },
                
                2000: {
                    type:'upDoor', name:'传送门', 
                    iconSrc:'/icons/dungeon/upDoor.png', stat: { hp:0, atk: 0, block: 0 },
                    specialty: ['prevLevel']
                },
                2001: {
                    type:'downDoor', name:'传送门', 
                    iconSrc:'/icons/dungeon/downDoor.png', stat: { hp:0, atk: 0, block: 0 },
                    specialty: ['nextLevel']
                },
            }
        }
    }
}