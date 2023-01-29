export const dungeonConfig = {
    data() {
        return {
            dungeons: {
                RagefireChasm: {
                    name: '怒焰裂谷',
                    map: [
                        5,5,6,6,2,7,7,8,8,3,9,9,9,9,4,1
                    ],
                    suggestStat: [100, 10, 10],
                    rewardList: [
                        'inv_misc_gem_diamond_05', 'inv_misc_gem_diamond_04'
                    ],
                    desc: [
                        "怒焰裂谷由深入兽人们新首都地下的火山洞穴网构成。在雷克萨访问奥格瑞玛时，这处裂谷被首席地精工程师加兹鲁维首次发现。 ",
                    "\n野蛮的怒焰石鄂怪和狡诈的燃刃信徒都曾在这些熔岩洞穴中肆虐一时，并均对杜隆塔尔的统治成威胁。",
                    "\n牛头人先知玛加莎曾试图与这些石鄂怪们和平相处，不过她所获得的仅是这些生物的敌意，显然这些石鄂怪对外交毫无兴趣。但如果不去解决它们，这将会对整个部落构成一个潜在的危机。",
                    "\n燃刃氏族曾是在裂谷中躲避的暗影议会分支，曾被名为饥饿者塔拉加曼的恶魔卫士、名为祈求者耶戈什的强大术士，与名为巴扎兰的萨特三人所领导。",
                    "\n许多人相信，前任部落大酋长萨尔在意识到燃刃的存在后，曾选择不去摧毁它，并试图以该组织的教徒们为线索直接追寻暗影议会。不管怎样，怒焰裂谷中曾经涌动的黑暗力量，或许能将那时部落在这片土地上建立的一切成果彻底抹煞。",
                    "\n在解除了上述危机多年以后, 怒焰裂谷中又出现了新的威胁：黑暗萨满。虽然加尔鲁什·地狱咆哮酋长最近召集了一批萨满，准备以元素为武器对付联盟，但洞中的这些新居民似乎都是变节者。",
                    "\n报告表明，这些阴暗的家伙正在集结一支足以毁灭奥格瑞玛的灼热大军。"
                    ]
                },
                AhnkahetTheOldKingdom: {
                    name: '怒焰裂谷2',
                    map: [
                        5,5,6,6,2,7,7,8,8,3,9,9,9,9,4,1
                    ],
                    suggestStat: [100, 10, 10],
                    rewardList: [
                        'inv_misc_gem_diamond_05', 'inv_misc_gem_diamond_04'
                    ]
                }
            },
            dungeonMonster: {
                1: {
                    type:'boss', name:'熔岩守卫戈多斯', stat: { HP:2000, ATK: 60, BLOCK: 30 }, 
                    reward: [['inv_misc_gem_diamond_03', 100, 1]]
                },
                2: {
                    type:'elite', name:'阿达罗格', stat: { HP:150, ATK: 20, BLOCK: 0 }, 
                    reward: [['inv_misc_gem_diamond_04', 100, 1]]
                },
                3: {
                    type:'elite', name:'黑暗萨满柯兰萨', stat: { HP:300, ATK: 50, BLOCK: 25 }, 
                    reward: [['inv_misc_gem_diamond_04', 100, 1]]
                },
                4: {
                    type:'elite', name:'焰喉', stat: { HP:1000, ATK: 30, BLOCK: 0 }, 
                    reward: [['inv_misc_gem_diamond_04', 100, 1]]
                },
                5: {
                    type:'normal', name:'怒焰穴居人', stat: { HP:50, ATK: 15, BLOCK: 5 }, 
                    reward: [['inv_misc_gem_diamond_05', 20, 1]]
                },
                6: {
                    type:'normal', name:'怒焰萨满祭司', stat: { HP:50, ATK: 20, BLOCK: 0 }, 
                    reward: [['inv_misc_gem_diamond_05', 30, 1]]
                },
                7: {
                    type:'normal', name:'黑暗萨满助手', stat: { HP:100, ATK: 20, BLOCK: 20 }, 
                    iconSrc:'/icons/dungeon/Dark-Acolyte.png',
                    reward: [['inv_misc_gem_diamond_05', 40, 1]]
                },
                8: {
                    type:'normal', name:'黑暗萨满研究者', stat: { HP:90, ATK: 30, BLOCK: 10 }, 
                    reward: [['inv_misc_gem_diamond_05', 50, 1]]
                },
                9: {
                    type:'normal', name:'熔岩元素', stat: { HP:200, ATK: 50, BLOCK: 10 }, 
                    reward: [['inv_misc_gem_diamond_05', 60, 1]]
                },
                
                2000: {
                    type:'upDoor', name:'传送门', 
                    iconSrc:'/icons/dungeon/upDoor.png', stat: { HP:0, ATK: 0, BLOCK: 0 },
                    reward: []
                },
                2001: {
                    type:'downDoor', name:'传送门', 
                    iconSrc:'/icons/dungeon/downDoor.png', stat: { HP:0, ATK: 0, BLOCK: 0 },
                    reward: []
                },
            }
        }
    }
}