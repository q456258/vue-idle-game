export const dungeonConfig = {
    data() {
        return {
            dungeons: {
                RagefireChasm: {
                    name: '怒焰裂谷',
                    lv: 15,
                    limit: 5,
                    map: [
                        5,5,6,6,2,7,7,8,8,3,9,9,9,9,4,1
                    ],
                    suggestStat: [30000, 1500, 1500],
                    rewardList: [
                        'inv_misc_gem_diamond_05', 'inv_misc_gem_diamond_04', 'inv_misc_gem_diamond_03'
                    ],
                    desc: [
                        "怒焰裂谷由深入兽人们新首都地下的火山洞穴网构成。在雷克萨访问奥格瑞玛时，这处裂谷被首席地精工程师加兹鲁维首次发现。 ",
                    "野蛮的怒焰石鄂怪和狡诈的燃刃信徒都曾在这些熔岩洞穴中肆虐一时，并均对杜隆塔尔的统治成威胁。",
                    "牛头人先知玛加莎曾试图与这些石鄂怪们和平相处，不过她所获得的仅是这些生物的敌意，显然这些石鄂怪对外交毫无兴趣。但如果不去解决它们，这将会对整个部落构成一个潜在的危机。",
                    "燃刃氏族曾是在裂谷中躲避的暗影议会分支，曾被名为饥饿者塔拉加曼的恶魔卫士、名为祈求者耶戈什的强大术士，与名为巴扎兰的萨特三人所领导。",
                    "许多人相信，前任部落大酋长萨尔在意识到燃刃的存在后，曾选择不去摧毁它，并试图以该组织的教徒们为线索直接追寻暗影议会。不管怎样，怒焰裂谷中曾经涌动的黑暗力量，或许能将那时部落在这片土地上建立的一切成果彻底抹煞。",
                    "在解除了上述危机多年以后, 怒焰裂谷中又出现了新的威胁：黑暗萨满。虽然加尔鲁什·地狱咆哮酋长最近召集了一批萨满，准备以元素为武器对付联盟，但洞中的这些新居民似乎都是变节者。",
                    "报告表明，这些阴暗的家伙正在集结一支足以毁灭奥格瑞玛的灼热大军。"
                    ]
                },
                ScarletMonastery: {
                    name: '血色修道院',
                    lv: 30,
                    limit: 5,
                    map: [
                        62,62,62,57,61,61,61,56,60,60,60,55,59,59,59,54,58,58,58,53,52,51
                    ],
                    suggestStat: [81000, 3900, 3900],
                    rewardList: [
                        'inv_misc_gem_diamond_04', 'inv_misc_gem_diamond_03', 'inv_misc_gem_diamond_02', 'inv_misc_enchantedpearla'
                    ],
                    desc: [
                        "血色修道院位于提瑞斯法林地的东北面，它的南面便是法奥之墓，圣骑士的创始人----阿隆苏斯-法奥葬在这里。",
                    "血色修道院是一座由四个区域组成的大型建筑。该修道院原本是洛丹伦王国的骄傲，宗教的朝圣之地，然而在战后成为了狂热的血色十字军在该地区的一座重要要塞。提瑞斯法的幸存者和来自远方的冒险者通常前往这里寻求庇护，每当他们经过法奥之墓时，都要在这里顶礼膜拜一番，以示对这位先辈的尊敬。",
                    "血色修道院的指挥官雷诺-莫格莱尼是个非常有趣的人物，个人感觉他的经历有点像阿尔萨斯。雷诺-莫格莱尼的父亲老莫格莱尼是十字军的领袖和创始者之一，他与大将军阿比迪斯，大审判官伊森利恩同列十字军三鼻祖。老莫格莱尼和他的两个儿子被人们称为“灰烬使者”，只要有他的地方就有圣光和正义，他经常可以毫发无损的打败一支亡灵部队。俗话说好马配好鞍，十字军的武器供应师Arcmage趁热打铁，他为莫格莱尼父子分别打造了3把灰烬之剑，依靠他们，灰烬使者所到之处无不披靡。",
                    "但讽刺的是老莫格莱尼的悲惨命运和泰纳瑞斯国王一样，他们都不是死在敌人手里，而是死在自己最相信和最爱的人的刀下。",
                    "故事还要从海加尔圣山之战几个月后说起，此时的阿尔萨斯正在寒冰皇冠同伊利丹同学PK，克尔苏加德接管了东瘟疫之地的军政要务。在与克尔苏加德的战斗中，老莫格莱尼的十字军一度占据战势主动，然而在一次会战中，十字军陷入了克尔苏加德的埋伏圈，数千骷髅战士蜂拥而上，带着前所未有的杀气----因为克尔苏加德明白：站在他前面的不是普通的圣骑士，而是灰烬使者。但是灰烬使者的力量是克尔苏加德无法想象的，据当时十字军唯一的幸存者莫格莱尼的副官回忆，老莫格莱尼凭借灰烬使者中圣光之火烧尽了亡灵的大部分军队，小莫格莱尼却在旁按兵不动。随着亡灵逐渐退却，战争似乎要胜利了，然而戏剧性的一幕上演：老莫格莱尼的儿子雷诺-莫格莱尼突然举起了手中的灰烬之剑刺向自己的父亲......接着，他便像个疯子一样逃跑了。而可怜的老莫格莱尼尸身不保，成了天灾的一员，他那把传奇的灰烬之剑也跟随主人一起堕落了，充满了痛苦和诅咒，曾经的灰烬使者转变成克尔苏加德手下的一员重将，驻扎在纳克萨玛斯墓地，他已经彻底被仇恨吞噬，整天想着报仇。另一边，小莫格莱尼成了血色十字军的领袖，而老莫格莱尼的另一个儿子却不知去向，有传言说他在外域，也有传言说他已经战死，这个不得而知。",
                    "大莫格莱尼的死无疑是悲惨的，却又是有价值的。在聆听了莫格莱尼副官的凄惨描述后，尽管大部分人嗤之以鼻并警告其散播谣言，但是一部分十字军成员觉察到小莫格莱尼的病态思想，他们意识到自己错误的信仰和愚蠢的举动并理智的脱离了这个组织。经过商酌，这群恢复理智与善良的原十字军成员成立了一个新的类似于白银之手的组织----银色黎明，他们的总部便是屹立在东瘟疫之地东部的圣光之愿礼拜堂。",
                    "关于莫格莱尼弑父的原因有很多种说法，其中一种是因为小莫格莱尼认为父亲在战斗中负伤并感染了瘟疫所以才痛下杀手，敏感而多疑的他杀死了父亲并疯狂地逃离斯坦索姆，同时他把父亲的死全部归咎到克尔苏加德的头上。最终，雷诺-莫格莱尼取代了父亲成为血色十字军的领袖之一，他的仇恨弥漫在血色修道院深处......"
                    ]
                },
            },
            dungeonMonster: {
                1: {
                    type:'boss', name:'熔岩守卫戈多斯', stat: { HP: 20000, ATK: 2000, BLOCK: 1000 },
                    reward: [['inv_misc_gem_diamond_03', 100, 1]]
                },
                2: {
                    type:'elite', name:'阿达罗格', stat: { HP:5000, ATK: 500, BLOCK: 500 }, 
                    reward: [['inv_misc_gem_diamond_04', 100, 1]]
                },
                3: {
                    type:'elite', name:'黑暗萨满柯兰萨', stat: { HP:10000, ATK: 1200, BLOCK: 700 }, 
                    reward: [['inv_misc_gem_diamond_04', 100, 1]]
                },
                4: {
                    type:'elite', name:'焰喉', stat: { HP: 10000, ATK: 2500, BLOCK: 500 },
                    reward: [['inv_misc_gem_diamond_04', 100, 1]]
                },
                5: {
                    type:'normal', name:'怒焰穴居人', stat: { HP:750, ATK: 200, BLOCK: 75 }, 
                    reward: [['inv_misc_gem_diamond_05', 20, 1]]
                },
                6: {
                    type:'normal', name:'怒焰萨满祭司', stat: { HP:1000, ATK: 500, BLOCK: 0 }, 
                    reward: [['inv_misc_gem_diamond_05', 30, 1]]
                },
                7: {
                    type:'normal', name:'黑暗萨满助手', stat: { HP: 3000, ATK: 1000, BLOCK: 800 },
                    reward: [['inv_misc_gem_diamond_05', 40, 1]]
                },
                8: {
                    type:'normal', name:'黑暗萨满研究者', stat: { HP: 4500, ATK: 1200, BLOCK: 500 },
                    reward: [['inv_misc_gem_diamond_05', 50, 1]]
                },
                9: {
                    type:'normal', name:'熔岩元素', stat: { HP:5000, ATK: 1500, BLOCK: 100 }, 
                    reward: [['inv_misc_gem_diamond_05', 60, 1]]
                },
                
     
                51: {
                    type:'boss', name:'大检察官怀特迈恩', stat: { HP: 50000, ATK: 5500, BLOCK: 2000 },
                    reward: [['inv_misc_enchantedpearla', 100, 2]]
                },
                52: {
                    type:'elite', name:'血色十字军指挥官莫格莱尼', stat: { HP: 40000, ATK: 4800, BLOCK: 1500 },
                    reward: [['inv_misc_enchantedpearla', 100, 1]]
                },
                53: {
                    type:'elite', name:'大检察官法尔班克斯', stat: { HP: 30000, ATK: 4500, BLOCK: 1500 },
                    reward: [['inv_misc_gem_diamond_02', 100, 3]]
                },
                54: {
                    type:'elite', name:'赫洛德', stat: { HP: 25000, ATK: 4000, BLOCK: 1000 },
                    reward: [['inv_misc_gem_diamond_02', 100, 2]]
                },
                55: {
                    type:'elite', name:'奥法师杜安', stat: { HP: 20000, ATK: 3000, BLOCK: 1000 },
                    reward: [['inv_misc_gem_diamond_02', 100, 1]]
                },
                56: {
                    type:'elite', name:'驯狗者洛克希', stat: { HP: 20000, ATK: 2500, BLOCK: 800 },
                    reward: [['inv_misc_gem_diamond_03', 100, 5]]
                },
                57: {
                    type:'elite', name:'血法师萨尔诺斯', stat: { HP: 20000, ATK: 2000, BLOCK: 1000 },
                    reward: [['inv_misc_gem_diamond_03', 100, 3]]
                },
                58: {
                    type:'normal', name:'血色巫师', stat: { HP: 8000, ATK: 6000, BLOCK: 500 },
                    reward: [['inv_misc_gem_diamond_03', 100, 1]]
                },
                59: {
                    type:'normal', name:'血色咒术师 ', stat: { HP: 6000, ATK: 5000, BLOCK: 500 },
                    reward: [['inv_misc_gem_diamond_03', 75, 1]]
                },
                60: {
                    type:'normal', name:'血色教士 ', stat: { HP: 5000, ATK: 4000, BLOCK: 500 },
                    reward: [['inv_misc_gem_diamond_04', 100, 1]]
                },
                61: {
                    type:'normal', name:'血色捕猎犬', stat: { HP: 4000, ATK: 4000, BLOCK: 500 },
                    reward: [['inv_misc_gem_diamond_04', 70, 1]]
                },
                62: {
                    type:'normal', name:'死灵勇士', stat: { HP: 2000, ATK: 1500, BLOCK: 500 },
                    reward: [['inv_misc_gem_diamond_04', 40, 1]]
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