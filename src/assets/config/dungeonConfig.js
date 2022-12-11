export const dungeonConfig = {
    data() {
        return {
            dungeons: {
                Ragefire_Chasm: {
                    name: '怒焰裂谷',
                    map: [
                        [
                            { id: 1, position: 1, reveal: true, count: 1 },
                            { id: 1, position: -1, reveal: false, count: 5 },
                            { id: 2, position: 2, reveal: true, count: 1 },
                            { id: 2, position: -1, reveal: false, count: 5 },
                            { id: 3, position: 3, reveal: true, count: 1 },
                        ]
                    ]
                }
            },
            dungeonSpecialty: {
                hunger: {name:'贪食', desc:'造成伤害时会夺取1点攻击力以及护甲'},
            },
            dungeonMonster: {
                1: {
                    type:'elite', stat: { hp:100, atk: 20, block: 20 }, 
                    iconSrc:'/icons/dungeon/ui-ej-boss-adarogg.png',
                    specialty: ['hunger']
                },
                2: {
                    type:'normal', stat: { hp:100, atk: 20, block: 20 }, 
                    iconSrc:'/icons/dungeon/Ragefire-Trogg.png',
                    specialty: []
                },
                3: {
                    type:'boss', stat: { hp:100, atk: 20, block: 20 }, 
                    iconSrc:'/icons/dungeon/ui-ej-boss-magmaw.png',
                    specialty: []
                }
            }
        }
    }
}