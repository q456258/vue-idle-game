export const spellConfig = {
data() {
    return{            
        spellQuality: [{
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
        spell: {
            attack: {
                name: '普通攻击',
                // type: '物理',
                weight: 100,
                des: '造成攻击力*1点伤害',
                iconSrc: "./icons/spell/atk.png",
                quality: 0,
                dmg: {
                    ATK: 1,
                },
                // ap: {
                //     AP: 1,
                // },
                // heal: {
                //     AP: 1,
                // },
                cost: {
                },
                tag: ['攻击']
            },
            spell_nature_thunderclap: {
                name: '雷霆一击',
                weight: 50,
                des: '造成攻击力*1.1点伤害',
                iconSrc: "./icons/spell/Spell_nature_thunderclap.png",
                quality: 1,
                dmg: {
                    ATK: 1.1,
                },
                cost: {
                    MP: 100,
                },
                tag: ['攻击']
            },
            spell_holy_crusaderstrike: {
                name: '十字军打击',
                weight: 1,
                des: '造成攻击力*2点伤害',
                iconSrc: "./icons/spell/Spell_holy_crusaderstrike.png",
                quality: 3,
                dmg: {
                    ATK: 2,
                },
                cost: {
                    MP: 5000,
                },
                tag: ['攻击']
            },
            spell_nature_lightning: {
                name: '闪电箭',
                weight: 20,
                des: '向目标投掷一发闪电箭，造成智力*15点伤害。',
                iconSrc: "./icons/spell/Spell_nature_lightning.png",
                quality: 2,
                dmg: {
                    INT: 15,
                },
                cost: {
                    MP: 2000,
                },
                tag: ['智力']
            },
            spell_shadow_ritualofsacrifice: {
                name: '影袭',
                weight: 10,
                des: '造成敏捷*10点伤害',
                iconSrc: "./icons/spell/spell_shadow_ritualofsacrifice.png",
                quality: 1,
                dmg: {
                    AGI: 10,
                },
                cost: {
                    MP: 300,
                },
                tag: ['敏捷']
            },
            spell_holy_layonhands: {
                name: '圣疗术',
                weight: 1,
                des: '消耗所有魔法值，恢复自身所有生命值',
                iconSrc: "./icons/spell/Spell_holy_layonhands.png",
                quality: 4,
                dmg: {
                },
                heal: {
                    MAXHP: 1
                },
                cost: {
                    CURMP: 1,
                },
                tag: ['恢复']
            },
            spell_holy_holybolt: {
                name: '圣光术',
                weight: 10,
                des: '恢复自身20%最大生命值',
                iconSrc: "./icons/spell/spell_holy_holybolt.png",
                quality: 2,
                dmg: {
                },
                heal: {
                    MAXHP: 0.2
                },
                cost: {
                    MP: 300,
                },
                tag: ['恢复']
            },
            spell_arcane_starfire: {
                name: '星火术',
                weight: 10,
                des: '造成元素*5点伤害',
                iconSrc: "./icons/spell/spell_arcane_starfire.png",
                quality: 4,
                dmg: {
                    AP: 5
                },
                cost: {
                    MP: 6000,
                },
                tag: ['元素']
            },
            spell_nature_starfall: {
                name: '月火术',
                weight: 25,
                des: '元素伤害效果翻倍',
                iconSrc: "./icons/spell/spell_nature_starfall.png",
                quality: 2,
                dmg: {
                },
                ap: {
                    AP: 2
                },
                cost: {
                    MP: 600,
                },
                tag: ['元素']
            },
            ability_warrior_shieldbash: {
                name: '盾击',
                weight: 50,
                des: '造成攻击力*0.5+护甲*5点伤害',
                iconSrc: "./icons/spell/ability_warrior_shieldbash.png",
                quality: 2,
                dmg: {
                    ATK: 0.5,
                    DEF: 5
                },
                cost: {
                    MP: 300,
                },
                tag: ['攻击', '护甲']
            },
            ability_druid_maul: {
                name: '槌击',
                weight: 50,
                des: '造成力量*10点伤害',
                iconSrc: "./icons/spell/ability_druid_maul.png",
                quality: 2,
                dmg: {
                    STR: 10
                },
                cost: {
                    MP: 300,
                },
                tag: ['力量']
            },
            spell_fire_flamebolt: {
                name: '火球术',
                weight: 100,
                des: '造成智力*10点伤害',
                iconSrc: "./icons/spell/spell_fire_flamebolt.png",
                quality: 1,
                dmg: {
                    INT: 10
                },
                cost: {
                    MP: 300,
                },
                tag: ['智力']
            },
        },
    }
},
}