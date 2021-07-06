export const guildMemberConfig = {
    data() {
        return{        
            race: {
                Human: {
                    name: '人类',
                    stat: {
                        focus: 0,
                        intellect: 50,
                        luck: 50,
                        potential: 50,
                        efficiency: 10,
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
                focus: {
                    name: '专注',
                    desc: '影响获得的技能类型'
                },
                intellect: {
                    name: '悟性',
                    desc: '影响获得技能的概率'
                },
                luck: {
                    name: '运势',
                    desc: '影响获得管理技能的概率'
                },
                potential: {
                    name: '潜力',
                    desc: '影响升级的概率'
                },
                efficiency: {
                    name: '效率',
                    desc: '影响工作效率'
                },
            }, 
            guildSkill: {
                train: {
                    name: '初阶导师',
                    type: 'train',
                    desc: '提升练功房等级',
                    effect: {
                        level: 1
                    }
                },
                train2: {
                    name: '中阶导师',
                    type: 'train2',
                    desc: '提升中级练功房等级',
                    effect: {
                        level: 1
                    }
                },
                train3: {
                    name: '高阶导师',
                    type: 'train3',
                    desc: '提升高级练功房等级',
                    effect: {
                        level: 1
                    }
                },
                shop: {
                    name: '商人',
                    type: 'shop',
                    desc: '提升商店等级',
                    effect: {
                        level: 1
                    }
                },
                smith: {
                    name: '铁匠',
                    type: 'smith',
                    desc: '提升铁匠铺等级',
                    effect: {
                        level: 1
                    }
                },
            },
            guildSpecialSkill: {
                trainManagement: {
                    name: '练功房管理学',
                    type: 'train',
                    desc: '提升练功房入驻人数',
                    effect: {
                        position: 1
                    }
                },
                train2Management: {
                    name: '中级练功房管理学',
                    type: 'train2',
                    desc: '提升中级练功房入驻人数',
                    effect: {
                        position: 1
                    }
                },
                train3Management: {
                    name: '高级练功房管理学',
                    type: 'train3',
                    desc: '提升高级练功房入驻人数',
                    effect: {
                        position: 1
                    }
                },
                shopManagement: {
                    name: '商店管理学',
                    type: 'shop',
                    desc: '提升商店入驻人数',
                    effect: {
                        position: 1
                    }
                },
                smithManagement: {
                    name: '铁匠铺管理学',
                    type: 'smith',
                    desc: '提升铁匠铺入驻人数',
                    effect: {
                        position: 1
                    }
                },
            }
        }
    }
}