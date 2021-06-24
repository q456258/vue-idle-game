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
                weight: 200,
                iconSrc: "./icons/spell/atk.png",
                quality: 0,
                level: [{
                        des: '造成攻击力*1点伤害',
                        dmg: { ATK: 1, },
                        // ap: { AP: 1, },
                        // heal: {AP: 1},
                        cost: { },
                    }
                ],
                tag: ['攻击']
            },
            spell_nature_thunderclap: {
                name: '雷霆一击',
                weight: 75,
                // weight: 7500,
                iconSrc: "./icons/spell/Spell_nature_thunderclap.png",
                quality: 1,
                level: [{
                        des: '造成攻击力*1.1点伤害',
                        dmg: { ATK: 1.1, },
                        cost: { MP: 500, },
                    }
                ],
                proficient: {
                    // 0: {
                    //     effect: { lifesteal: {stack: 2, chance: 100, target: 'self'},
                    //     sunder: {stack: 2, chance: 100, target: 'self'} ,
                    //     penetrate: {stack: 2, chance: 100, target: 'self'} ,
                    //     manasteal: {stack: 2, chance: 100, target: 'self'} ,
                    //     charge: {stack: 2, chance: 100, target: 'self'} ,
                    //     deathImmune: {stack: 2, chance: 100, target: 'self'} ,
                    //     void: {stack: 2, chance: 100, target: 'self'} ,
                    //     absorb: {stack: 2, chance: 100, target: 'self'} ,
                    //     stun: {stack: 2, chance: 100, target: 'enermy'} ,
                    //     bleed: {stack: 2, chance: 100, target: 'enermy'} ,
                    //     poison: {stack: 2, chance: 100, target: 'enermy'} ,
                    //     weak: {stack: 2, chance: 100, target: 'enermy'}
                    //     },
                    //     desc: '20%对敌人附加一层眩晕效果'
                    // },
                    10: {
                        effect: { stun: {stack: 1, chance: 10, target: 'enermy'} },
                        desc: '10%对敌人附加一层眩晕效果'
                    },
                    100: {
                        effect: { stun: {stack: 1, chance: 20, target: 'enermy'} },
                        desc: '20%对敌人附加一层眩晕效果'
                    }
                },
                tag: ['攻击']
            },
            spell_holy_crusaderstrike: {
                name: '十字军打击',
                weight: 5,
                iconSrc: "./icons/spell/Spell_holy_crusaderstrike.png",
                quality: 3,
                level: [{
                        des: '造成攻击力*2点伤害',
                        dmg: { ATK: 2, },
                        cost: { MP: 5000, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { sunder: {stack: 1, chance: 10, target: 'self'} },
                        desc: '10%获得一层破甲效果'
                    },
                    100: {
                        effect: { sunder: {stack: 1, chance: 20, target: 'self'} },
                        desc: '20%获得一层破甲效果'
                    }
                },
                tag: ['攻击']
            },
            spell_nature_lightning: {
                name: '闪电箭',
                weight: 10,
                iconSrc: "./icons/spell/Spell_nature_lightning.png",
                quality: 2,
                level: [{
                        des: '造成50000+智力*15点伤害。',
                        dmg: { FIX: 50000, INT: 15, },
                        cost: { MP: 5000, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { stun: {stack: 1, chance: 10, target: 'enermy'} },
                        desc: '10%对敌人附加一层眩晕效果'
                    },
                    100: {
                        effect: { stun: {stack: 1, chance: 20, target: 'enermy'} },
                        desc: '20%对敌人附加一层眩晕效果'
                    }
                },
                tag: ['智力']
            },
            spell_shadow_ritualofsacrifice: {
                name: '影袭',
                weight: 10,
                iconSrc: "./icons/spell/spell_shadow_ritualofsacrifice.png",
                quality: 1,
                level: [{
                        des: '造成攻击力*0.8+敏捷*10点伤害',
                        dmg: { ATK:0.8, AGI: 10, },
                        cost: { MP: 1750, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { penetrate: {stack: 1, chance: 10, target: 'self'} },
                        desc: '10%获得一层破甲效果'
                    },
                    100: {
                        effect: { penetrate: {stack: 1, chance: 20, target: 'self'} },
                        desc: '20%获得一层破甲效果'
                    }
                },
                tag: ['敏捷']
            },
            spell_holy_layonhands: {
                name: '圣疗术',
                weight: 2,
                iconSrc: "./icons/spell/Spell_holy_layonhands.png",
                quality: 4,
                level: [{
                        des: '消耗所有魔法值，恢复自身所有生命值',
                        dmg: {},
                        ap: {},
                        heal: { MAXHP: 1 },
                        cost: { CURMP: 1, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { deathImmune: {stack: 1, chance: 10, target: 'self'} },
                        desc: '10%获得一层死亡免疫效果'
                    },
                    100: {
                        effect: { deathImmune: {stack: 1, chance: 20, target: 'self'} },
                        desc: '20%获得一层死亡免疫效果'
                    }
                },
                tag: ['恢复']
            },
            spell_holy_holybolt: {
                name: '圣光术',
                weight: 10,
                iconSrc: "./icons/spell/spell_holy_holybolt.png",
                quality: 2,
                level: [{
                        des: '恢复自身20%最大生命值',
                        dmg: {},
                        ap: {},
                        heal: { MAXHP: 0.2 },
                        cost: { MP: 4000, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { absorb: {stack: 1, chance: 10, target: 'self'} },
                        desc: '10%获得一层吸收效果'
                    },
                    100: {
                        effect: { absorb: {stack: 1, chance: 20, target: 'self'} },
                        desc: '20%获得一层吸收效果'
                    }
                },
                tag: ['恢复']
            },
            spell_arcane_starfire: {
                name: '星火术',
                weight: 10,
                iconSrc: "./icons/spell/spell_arcane_starfire.png",
                quality: 3,
                level: [{
                        des: '造成元素*5点伤害',
                        dmg: { AP: 5},
                        cost: { MP: 10000, },
                    }
                ],
                tag: ['元素']
            },
            spell_nature_starfall: {
                name: '月火术',
                weight: 25,
                iconSrc: "./icons/spell/spell_nature_starfall.png",
                quality: 2,
                level: [{
                        des: '元素伤害效果*2.5',
                        dmg: {},
                        ap: { AP: 2.5 },
                        cost: { MP: 5000, },
                    }
                ],
                tag: ['元素']
            },
            ability_warrior_shieldbash: {
                name: '盾击',
                weight: 20,
                iconSrc: "./icons/spell/ability_warrior_shieldbash.png",
                quality: 1,
                level: [{
                        des: '造成攻击力*0.5+护甲*5点伤害',
                        dmg: { ATK: 0.5, DEF: 5 },
                        cost: { MP: 1000, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { stun: {stack: 1, chance: 20, target: 'enermy'} },
                        desc: '20%对敌人附加一层眩晕效果'
                    },
                    100: {
                        effect: { stun: {stack: 1, chance: 40, target: 'enermy'} },
                        desc: '40%对敌人附加一层眩晕效果'
                    }
                },
                tag: ['攻击', '护甲']
            },
            ability_druid_maul: {
                name: '槌击',
                weight: 30,
                iconSrc: "./icons/spell/ability_druid_maul.png",
                quality: 1,
                level: [{
                        des: '造成攻击*1+力量*7点伤害',
                        dmg: { ATK:1, STR: 7 },
                        cost: { MP: 1500, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { sunder: {stack: 1, chance: 20, target: 'self'} },
                        desc: '20%获得一层破甲效果'
                    },
                    100: {
                        effect: { sunder: {stack: 1, chance: 40, target: 'self'} },
                        desc: '40%获得一层破甲效果'
                    }
                },
                tag: ['力量']
            },
            spell_fire_flamebolt: {
                name: '火球术',
                weight: 100,
                iconSrc: "./icons/spell/spell_fire_flamebolt.png",
                quality: 1,
                level: [{
                        des: '造成10000+元素*2+智力*5点伤害',
                        dmg: { FIX: 10000, AP:2, INT: 5, },
                        cost: { MP: 3000, },
                    }
                ],
                tag: ['智力']
            },
        },
    }
},
}