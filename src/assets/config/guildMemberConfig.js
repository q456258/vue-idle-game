export const guildMemberConfig = {
    data() {
        return{        
            race: {
                Human: {
                    name: '人类',
                    talent: {
                        ATK: 10,
                        DEF: 10,
                        HP: 30,
                        MP: 50,
                        potential: 50,
                    }
                }, 
                Dwarf: {
                    name: '矮人'
                }, 
                Night_Elf: {
                    name: '暗夜精灵'
                }, 
                Gnome: {
                    name: '侏儒'
                }, 
                Draenei: {
                    name: '德莱尼'
                }, 
                Worgen: {
                    name: '狼人'
                }, 
                Orc: {
                    name: '兽人'
                }, 
                Undead: {
                    name: '亡灵'
                }, 
                Tauren: {
                    name: '牛头人'
                }, 
                Troll: {
                    name: '巨魔'
                }, 
                Blood_Elf: {
                    name: '血精灵'
                }, 
                Goblin: {
                    name: '地精'
                }, 
                Pandaren: {
                    name: '熊猫人'
                }, 
                Void_Elf : {
                    name: '虚空精灵'
                }, 
                Lightforged_Draenei : {
                    name: '光铸德莱尼'
                }, 
                Dark_Iron_Dwarf : {
                    name: '黑铁矮人'
                }, 
                Kul_Tiran : {
                    name: '库尔提拉斯人'
                }, 
                Mechagnome : {
                    name: '机械侏儒'
                }, 
                Nightborne : {
                    name: '夜之子'
                }, 
                Highmountain_Tauren : {
                    name: '至高岭牛头人'
                }, 
                Maghar_Orc : {
                    name: '玛格汉兽人'
                }, 
                Zandalari_Troll : {
                    name: '赞达拉巨魔'
                }, 
                Vulpera : {
                    name: '狐人'
                }, 
            },
            guildStat: {
                ATK: {
                    name: '攻击',
                    desc: '攻击成长上限'
                },
                DEF: {
                    name: '防御',
                    desc: '防御成长上限'
                },
                HP: {
                    name: '生命',
                    desc: '生命值成长上限'
                },
                MP: {
                    name: '魔法',
                    desc: '魔法值成长上限'
                },
                potential: {
                    name: '潜力',
                    desc: '影响技能品质'
                },
            }, 
            guildSkill: {
                train: {
                    name: '初阶导师',
                    type: 'train',
                    desc: '提升练功房等级',
                },
                train2: {
                    name: '中阶导师',
                    type: 'train2',
                    desc: '提升中级练功房等级',
                },
                train3: {
                    name: '高阶导师',
                    type: 'train3',
                    desc: '提升高级练功房等级',
                },
                shop: {
                    name: '商人',
                    type: 'shop',
                    desc: '提升商店等级',
                },
                smith: {
                    name: '铁匠',
                    type: 'smith',
                    desc: '提升铁匠铺等级',
                },
            },
        }
    }
}