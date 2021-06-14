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
                cost: {
                }
            },
            Spell_nature_thunderclap: {
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
                }
            },
            Spell_holy_crusaderstrike: {
                name: '十字军打击',
                weight: 10,
                des: '造成攻击力*2点伤害',
                iconSrc: "./icons/spell/Spell_holy_crusaderstrike.png",
                quality: 3,
                dmg: {
                    ATK: 2,
                },
                cost: {
                    MP: 5000,
                }
            },
            Spell_nature_lightning: {
                name: '闪电箭',
                weight: 20,
                des: '向目标投掷一发闪电箭，造成智力*10点伤害。',
                iconSrc: "./icons/spell/Spell_nature_lightning.png",
                quality: 2,
                dmg: {
                    INT: 10,
                },
                cost: {
                    MP: 1000,
                }
            },
            spell_shadow_ritualofsacrifice: {
                name: '影袭',
                weight: 10,
                des: '造成敏捷*10点伤害',
                iconSrc: "./icons/spell/spell_shadow_ritualofsacrifice.png",
                quality: 4,
                dmg: {
                    AGI: 10,
                },
                cost: {
                    MP: 300,
                }
            },
        },
    }
},
}