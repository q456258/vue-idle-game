export const guildMemberConfig = {
    data() {
        return{        
            race: {
                Human: {
                    name: '人类',
                    talent: {
                        HP: 100,
                        ATK: 0,
                        BLOCK: 0,
                        GROWTH: 0.5
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
                HP: {
                    name: '生命值',
                    desc: '',
                    max: 1000,
                    decimal: 0
                },
                ATK: {
                    name: '攻击力',
                    desc: '',
                    max: 50,
                    decimal: 0
                },
                BLOCK: {
                    name: '防御值',
                    desc: '',
                    max: 50,
                    decimal: 0
                },
                GROWTH: {
                    name: '成长',
                    desc: '',
                    max: 1,
                    decimal: 2
                }
            }, 
            guildSkill: {
                train: {
                    name: '导师I', type: 'train', value: 1, desc: '练功房等级+1',
                },
            },
        }
    }
}