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
                max: 0,
                iconSrc: "./icons/spell/atk.png",
                quality: 1,
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
                max: 5,
                iconSrc: "./icons/spell/Spell_nature_thunderclap.png",
                quality: 1,
                level: [{
                        des: '造成攻击力*1.1点伤害',
                        dmg: { ATK: 1.1, },
                        cost: { MP: 500, },
                    }, {
                        des: '造成攻击力*1.2点伤害',
                        dmg: { ATK: 1.2, },
                        cost: { MP: 1500, },
                    }, {
                        des: '造成攻击力*1.3点伤害',
                        dmg: { ATK: 1.3, },
                        cost: { MP: 4500, },
                    }, {
                        des: '造成攻击力*1.4点伤害',
                        dmg: { ATK: 1.4, },
                        cost: { MP: 13500, },
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
            spell_fire_flamebolt: {
                name: '火球术',
                max: 10,
                iconSrc: "./icons/spell/Spell_fire_flamebolt.png",
                quality: 1,
                level: [{
                        des: '造成5000+智力*5点伤害',
                        dmg: { FIX: 5000, INT: 5, },
                        cost: { MP: 600, },
                    }, {
                        des: '造成30000+智力*5点伤害',
                        dmg: { FIX: 30000, INT: 5, },
                        cost: { MP: 3000, },
                    }, {
                        des: '造成100000+智力*5点伤害',
                        dmg: { FIX: 100000, INT: 5, },
                        cost: { MP: 10000, },
                    }, {
                        des: '造成300000+智力*5点伤害',
                        dmg: { FIX: 300000, INT: 5, },
                        cost: { MP: 30000, },
                    }
                ],
                tag: ['智力']
            },
            ability_warrior_shieldbash: {
                name: '盾击',
                max: 15,
                iconSrc: "./icons/spell/Ability_warrior_shieldbash.png",
                quality: 1,
                level: [{
                        des: '造成攻击力*0.5+护甲*4点伤害',
                        dmg: { ATK: 0.5, DEF: 4 },
                        cost: { MP: 500, },
                    }, {
                        des: '造成攻击力*0.5+护甲*5点伤害',
                        dmg: { ATK: 0.5, DEF: 5 },
                        cost: { MP: 1200, },
                    }, {
                        des: '造成攻击力*0.5+护甲*6点伤害',
                        dmg: { ATK: 0.5, DEF: 6 },
                        cost: { MP: 2500, },
                    }, {
                        des: '造成攻击力*0.5+护甲*7点伤害',
                        dmg: { ATK: 0.5, DEF: 7 },
                        cost: { MP: 5000, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { stun: {stack: 1, chance: 20, target: 'enermy'} },
                        desc: '20%对敌人附加一层眩晕效果'
                    },
                    50: {
                        effect: { block: {stack: 1, chance: 20, target: 'self'} },
                        desc: '20%获得一层格挡效果'
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
                max: 10,
                iconSrc: "./icons/spell/Ability_druid_maul.png",
                quality: 1,
                level: [{
                        des: '造成攻击*1+力量*3点伤害',
                        dmg: { ATK:1, STR: 3 },
                        cost: { MP: 500, },
                    }, {
                        des: '造成攻击*1+力量*6点伤害',
                        dmg: { ATK:1, STR: 6 },
                        cost: { MP: 1500, },
                    }, {
                        des: '造成攻击*1+力量*9点伤害',
                        dmg: { ATK:1, STR: 9 },
                        cost: { MP: 5000, },
                    }, {
                        des: '造成攻击*1+力量*12点伤害',
                        dmg: { ATK:1, STR: 12 },
                        cost: { MP: 10000, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { sunder: {stack: 1, chance: 33, target: 'self'} },
                        desc: '33%获得一层破甲效果'
                    },
                    100: {
                        effect: { sunder: {stack: 1, chance: 66, target: 'self'} },
                        desc: '66%获得一层破甲效果'
                    }
                },
                tag: ['攻击', '力量']
            },
            spell_shadow_ritualofsacrifice: {
                name: '影袭',
                max: 30,
                iconSrc: "./icons/spell/Spell_shadow_ritualofsacrifice.png",
                quality: 1,
                level: [{
                        des: '造成攻击力*0.8+敏捷*10点伤害',
                        dmg: { ATK:0.8, AGI: 10, },
                        cost: { MP: 1750, },
                    }, {
                        des: '造成攻击力*0.9+敏捷*12点伤害',
                        dmg: { ATK:0.9, AGI: 12, },
                        cost: { MP: 5000, },
                    }, {
                        des: '造成攻击力*1+敏捷*15点伤害',
                        dmg: { ATK:1, AGI: 15, },
                        cost: { MP: 17500, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { penetrate: {stack: 1, chance: 10, target: 'self'} },
                        desc: '10%获得一层穿透效果'
                    },
                    100: {
                        effect: { penetrate: {stack: 1, chance: 20, target: 'self'} },
                        desc: '20%获得一层穿透效果'
                    }
                },
                tag: ['攻击', '敏捷']
            },
            spell_holy_renew: {
                name: '恢复',
                max: 8,
                iconSrc: "./icons/spell/Spell_holy_renew.png",
                quality: 1,
                level: [{
                        des: '恢复100000点生命值',
                        dmg: {},
                        ap: {},
                        heal: { FIX: 100000 },
                        cost: { MP: 1500, },
                    }, {
                        des: '恢复300000点生命值',
                        dmg: {},
                        ap: {},
                        heal: { FIX: 300000 },
                        cost: { MP: 4000, },
                    }, {
                        des: '恢复600000点生命值',
                        dmg: {},
                        ap: {},
                        heal: { FIX: 600000 },
                        cost: { MP: 9000, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { void: {stack: 1, chance: 10, target: 'self'} },
                        desc: '10%获得一层虚无效果'
                    },
                    100: {
                        effect: { void: {stack: 1, chance: 20, target: 'self'} },
                        desc: '20%获得一层虚无效果'
                    }
                },
                tag: ['恢复']
            },
            spell_warlock_soulburn: {
                name: '夺魂',
                max: 50,
                iconSrc: "./icons/spell/Spell_warlock_soulburn.png",
                quality: 1,
                level: [{
                        des: '造成最大生命值*0.8点伤害',
                        dmg: { MAXHP: 0.8 },
                        cost: { MAXHP: 0.1, },
                    }, {
                        des: '造成最大生命值*0.9点伤害',
                        dmg: { MAXHP: 0.9 },
                        cost: { MAXHP: 0.1, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { deathImmune: {stack: 1, chance: 25, target: 'self'} },
                        desc: '25%获得一层死亡免疫效果'
                    },
                    100: {
                        effect: { deathImmune: {stack: 1, chance: 50, target: 'self'} },
                        desc: '50%获得一层死亡免疫效果'
                    }
                },
                tag: ['生命']
            },
            ability_warrior_shatteringthrow: {
                name: '碎裂投掷',
                max: 30,
                iconSrc: "./icons/spell/Ability_warrior_shatteringthrow.png",
                quality: 1,
                level: [{
                        des: '造成攻击力*1点伤害, 30%获得一层穿透效果',
                        dmg: { ATK: 1 },
                        cost: { MP: 1000, },
                        effect: { penetrate: {stack: 1, chance: 30, target: 'self'} },
                    }, {
                        des: '造成攻击力*1.2点伤害, 30%获得一层穿透效果',
                        dmg: { ATK: 1.2 },
                        effect: { penetrate: {stack: 1, chance: 30, target: 'self'} },
                        cost: { MP: 3000, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { penetrate: {stack: 1, chance: 40, target: 'self'} },
                        desc: '40%获得一层穿透效果'
                    },
                    100: {
                        effect: { penetrate: {stack: 1, chance: 50, target: 'self'} },
                        desc: '50%获得一层穿透效果'
                    }
                },
                tag: ['攻击', 'BUFF']
            },
            spell_holy_holybolt: {
                name: '圣光术',
                max: 30,
                iconSrc: "./icons/spell/Spell_holy_holybolt.png",
                quality: 2,
                level: [{
                        des: '恢复自身10000+10%最大生命值',
                        dmg: {},
                        ap: {},
                        heal: { FIX: 10000, MAXHP: 0.1 },
                        cost: { MP: 800, },
                    }, {
                        des: '恢复自身40000+12%最大生命值',
                        dmg: {},
                        ap: {},
                        heal: { FIX: 50000, MAXHP: 0.12 },
                        cost: { MP: 2500, },
                    }, {
                        des: '恢复自身80000+15%最大生命值',
                        dmg: {},
                        ap: {},
                        heal: { FIX: 80000, MAXHP: 0.15 },
                        cost: { MP: 7000, },
                    }, {
                        des: '恢复自身200000+17%最大生命值',
                        dmg: {},
                        ap: {},
                        heal: { FIX: 200000, MAXHP: 0.17 },
                        cost: { MP: 10000, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { absorb: {stack: 1, chance: 5, target: 'self'} },
                        desc: '5%获得一层吸收效果'
                    },
                    100: {
                        effect: { absorb: {stack: 1, chance: 10, target: 'self'} },
                        desc: '10%获得一层吸收效果'
                    }
                },
                tag: ['生命', '恢复']
            },
            spell_nature_lightning: {
                name: '闪电箭',
                max: 25,
                iconSrc: "./icons/spell/Spell_nature_lightning.png",
                quality: 2,
                level: [{
                        des: '造成5000+智力*10点伤害。',
                        dmg: { FIX: 5000, INT: 10, },
                        cost: { MP: 5000, },
                    }, {
                        des: '造成30000+智力*12点伤害。',
                        dmg: { FIX: 30000, INT: 12, },
                        cost: { MP: 15000, },
                    }, {
                        des: '造成100000+智力*15点伤害。',
                        dmg: { FIX: 100000, INT: 15, },
                        cost: { MP: 45000, },
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
            // spell_nature_starfall: {
            //     name: '月火术',
            //     max: 15,
            //     iconSrc: "./icons/spell/Spell_nature_starfall.png",
            //     quality: 2,
            //     level: [{
            //             des: '造成元素伤害*2点元素伤害',
            //             dmg: {},
            //             ap: { AP: 2 },
            //             cost: { MP: 4000, },
            //         }, {
            //             des: '造成元素伤害*2.5点元素伤害',
            //             dmg: {},
            //             ap: { AP: 2.5 },
            //             cost: { MP: 10000, },
            //         }, {
            //             des: '造成元素伤害*3点元素伤害',
            //             dmg: {},
            //             ap: { AP: 3 },
            //             cost: { MP: 30000, },
            //         }
            //     ],
            //     proficient: {
            //         10: {
            //             effect: { forceOfNature: {stack: 1, chance: 10, target: 'self'} },
            //             desc: '10%获得一层自然之力效果'
            //         },
            //         100: {
            //             effect: { forceOfNature: {stack: 1, chance: 20, target: 'self'} },
            //             desc: '20%获得一层自然之力效果'
            //         }
            //     },
            //     tag: ['元素']
            // },
            spell_holy_powerwordshield: {
                name: '圣佑术',
                max: 40,
                iconSrc: "./icons/spell/Spell_holy_powerwordshield.png",
                quality: 2,
                level: [{
                        des: '获得两层虚无效果',
                        dmg: {},
                        ap: {},
                        effect: { void: {stack: 2, chance: 100, target: 'self'} },
                        cost: { MP: 1000, },
                    }, {
                        des: '获得三层虚无效果',
                        dmg: {},
                        ap: {},
                        effect: { void: {stack: 3, chance: 100, target: 'self'} },
                        cost: { MP: 10000, },
                    }
                ],
                proficient: {
                },
                tag: ['BUFF']
            },
            spell_animabastion_buff: {
                name: '灵感',
                max: 30,
                iconSrc: "./icons/spell/Spell_animabastion_buff.png",
                quality: 2,
                level: [{
                        des: '恢复最大魔法值*0.5点生命值, 100%获得一层蓄力效果',
                        dmg: {},
                        ap: {},
                        heal: { MAXMP: 0.5 },
                        cost: { MP: 0, },
                    }, {
                        des: '恢复最大魔法值*0.7点生命值, 100%获得一层蓄力效果',
                        dmg: {},
                        ap: {},
                        heal: { MAXMP: 0.7 },
                        cost: { MP: 0, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { manasteal: {stack: 1, chance: 20, target: 'self'} },
                        desc: '20%获得一层吸蓝效果'
                    },
                    100: {
                        effect: { manasteal: {stack: 1, chance: 40, target: 'self'} },
                        desc: '40%获得一层吸蓝效果'
                    }
                },
                tag: ['魔法', '恢复', 'BUFF']
            },
            spell_animaardenweald_orb: {
                name: '法夜祝福',
                max: 20,
                iconSrc: "./icons/spell/Spell_animaardenweald_orb.png",
                quality: 2,
                level: [{
                        des: '获得两层吸蓝效果',
                        dmg: {},
                        ap: {},
                        effect: { manasteal: {stack: 2, chance: 100, target: 'self'} },
                        cost: { MP: 500, },
                    }, {
                        des: '获得三层吸蓝效果',
                        dmg: {},
                        ap: {},
                        effect: { manasteal: {stack: 3, chance: 100, target: 'self'} },
                        cost: { MP: 1000, },
                    }
                ],
                proficient: {
                },
                tag: ['BUFF']
            },
            spell_shadow_curseofmannoroth: {
                name: '残废术',
                max: 25,
                iconSrc: "./icons/spell/Spell_shadow_curseofmannoroth.png",
                quality: 3,
                level: [{
                        des: '造成攻击力*0.8点伤害，50%对敌人附加一层虚弱效果',
                        dmg: { ATK: 0.8},
                        ap: {},
                        effect: { weak: {stack: 1, chance: 50, target: 'enermy'} },
                        cost: { MP: 1000, },
                    }, {
                        des: '造成攻击力*0.9点伤害，50%对敌人附加一层虚弱效果',
                        dmg: { ATK: 0.9},
                        ap: {},
                        effect: { weak: {stack: 1, chance: 50, target: 'enermy'} },
                        cost: { MP: 2000, },
                    }, {
                        des: '造成攻击力*1点伤害，50%对敌人附加一层虚弱效果',
                        dmg: { ATK: 1},
                        ap: {},
                        effect: { weak: {stack: 1, chance: 50, target: 'enermy'} },
                        cost: { MP: 3000, },
                    }, {
                        des: '造成攻击力*1.1点伤害，50%对敌人附加一层虚弱效果',
                        dmg: { ATK: 1.1},
                        ap: {},
                        effect: { weak: {stack: 1, chance: 50, target: 'enermy'} },
                        cost: { MP: 4000, },
                    }
                ],
                proficient: {
                },
                tag: ['攻击力', 'DEBUFF']
            },
            spell_animaardenweald_groundstate: {
                name: '冥想',
                max: 20,
                iconSrc: "./icons/spell/Spell_animaardenweald_groundstate.png",
                quality: 2,
                level: [{
                        des: '获得一层吸蓝效果和一层蓄力效果',
                        dmg: {},
                        ap: {},
                        effect: { manasteal: {stack: 1, chance: 100, target: 'self'},
                                charge: {stack: 1, chance: 100, target: 'self'} },
                        cost: { MP: 0, },
                    }, {
                        des: '获得两层吸蓝效果和一层蓄力效果',
                        dmg: {},
                        ap: {},
                        effect: { manasteal: {stack: 2, chance: 100, target: 'self'},
                                charge: {stack: 1, chance: 100, target: 'self'} },
                        cost: { MP: 0, },
                    }, {
                        des: '获得两层吸蓝效果和两层蓄力效果',
                        dmg: {},
                        ap: {},
                        effect: { manasteal: {stack: 2, chance: 100, target: 'self'},
                                charge: {stack: 2, chance: 100, target: 'self'} },
                        cost: { MP: 0, },
                    }
                ],
                proficient: {
                },
                tag: ['BUFF']
            },
            // spell_arcane_starfire: {
            //     name: '星火术',
            //     max: 25,
            //     iconSrc: "./icons/spell/Spell_arcane_starfire.png",
            //     quality: 3,
            //     level: [{
            //             des: '造成元素*5点伤害',
            //             dmg: { AP: 5},
            //             cost: { MP: 10000, },
            //         }, {
            //             des: '造成元素*7点伤害',
            //             dmg: { AP: 7},
            //             cost: { MP: 30000, },
            //         }, {
            //             des: '造成元素*7点伤害',
            //             dmg: { AP: 7},
            //             cost: { MP: 30000, },
            //         },
            //     ],
            //     proficient: {
            //         10: {
            //             effect: { forceOfNature: {stack: 1, chance: 20, target: 'self'} },
            //             desc: '20%获得一层自然之力效果'
            //         },
            //         100: {
            //             effect: { forceOfNature: {stack: 1, chance: 40, target: 'self'} },
            //             desc: '40%获得一层自然之力效果'
            //         }
            //     },
            //     tag: ['元素']
            // },
            spell_holy_crusaderstrike: {
                name: '十字军打击',
                max: 40,
                iconSrc: "./icons/spell/Spell_holy_crusaderstrike.png",
                quality: 3,
                level: [{
                        des: '造成攻击力*2点伤害',
                        dmg: { ATK: 2, },
                        cost: { MP: 15000, },
                    }, {
                        des: '造成攻击力*2.5点伤害',
                        dmg: { ATK: 2.5, },
                        cost: { MP: 50000, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { sunder: {stack: 1, chance: 50, target: 'self'} },
                        desc: '50%获得一层破甲效果'
                    },
                    100: {
                        effect: { sunder: {stack: 2, chance: 50, target: 'self'} },
                        desc: '50%获得两层破甲效果'
                    }
                },
                tag: ['攻击']
            },
            // spell_nature_wispsplode: {
            //     name: '元素爆破',
            //     max: 30,
            //     iconSrc: "./icons/spell/Spell_nature_wispsplode.png",
            //     quality: 3,
            //     level: [{
            //             des: '造成10*元素伤害点元素伤害',
            //             dmg: {},
            //             ap: {AP: 10},
            //             cost: { MAXHP: 1, },
            //         }
            //     ],
            //     proficient: {
            //         10: {
            //             effect: { elementAffinity: {stack: 1, chance: 100, target: 'self'} },
            //             desc: '获得一层元素亲和效果'
            //         },
            //         100: {
            //             effect: { elementAffinity: {stack: 2, chance: 100, target: 'self'} },
            //             desc: '获得两层元素亲和效果'
            //         }
            //     },
            //     tag: ['元素']
            // },
            spell_shadow_deathcoil: {
                name: '凋零缠绕',
                max: 60,
                iconSrc: "./icons/spell/Spell_shadow_deathcoil.png",
                quality: 3,
                level: [{
                        des: '造成当前生命值*10点伤害，50%获得一层吸收效果',
                        dmg: {CURHP: 10},
                        effect: { absorb: {stack: 1, chance: 50, target: 'self'}},
                        cost: { MP: 10000, },
                    }, {
                        des: '造成当前生命值*10点伤害，50%获得一层吸收效果',
                        dmg: {CURHP: 10},
                        effect: { absorb: {stack: 1, chance: 50, target: 'self'}},
                        cost: { MP: 100000, },
                    }
                ],
                proficient: {
                },
                tag: ['生命', 'BUFF']
            },
            ability_rogue_shadowstrike: {
                name: '裂缝打击',
                max: 75,
                iconSrc: "./icons/spell/Ability_rogue_shadowstrike.png",
                quality: 4,
                level: [{
                        des: '造成攻击力*1+敏捷*3点伤害，50%获得一层穿透效果',
                        dmg: { ATK: 1, AGI: 3},
                        effect: { penetrate: {stack: 1, chance: 50, target: 'self'}},
                        cost: { MP: 1000, },
                    }, {
                        des: '造成攻击力*1.1+敏捷*5点伤害，50%获得一层穿透效果',
                        dmg: { ATK: 1.1, AGI: 5},
                        effect: { penetrate: {stack: 1, chance: 50, target: 'self'}},
                        cost: { MP: 2500, },
                    }, {
                        des: '造成攻击力*1.2+敏捷*7点伤害，50%获得一层穿透效果',
                        dmg: { ATK: 1.2, AGI: 7},
                        effect: { penetrate: {stack: 1, chance: 50, target: 'self'}},
                        cost: { MP: 5000, },
                    }, {
                        des: '造成攻击力*1.3+敏捷*9点伤害，50%获得一层穿透效果',
                        dmg: { ATK: 1.3, AGI: 9},
                        effect: { penetrate: {stack: 1, chance: 50, target: 'self'}},
                        cost: { MP: 8000, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { penetrate: {stack: 1, chance: 70, target: 'self'} },
                        desc: '70%获得一层穿透效果'
                    },
                    100: {
                        effect: { lifesteal: {stack: 2, chance: 50, target: 'self'} },
                        desc: '50%获得两层穿透效果'
                    }
                },
                tag: ['攻击力', '敏捷', 'BUFF']
            },
            spell_holy_innerfire: {
                name: '心灵之火',
                max: 35,
                iconSrc: "./icons/spell/Spell_holy_innerfire.png",
                quality: 4,
                level: [{
                        des: '获得一层虚无效果和一层蓄力效果',
                        dmg: {},
                        ap: {},
                        effect: { void: {stack: 1, chance: 100, target: 'self'},
                                charge: {stack: 1, chance: 100, target: 'self'} },
                        cost: { MP: 5000, },
                    }, {
                        des: '获得两层虚无效果和一层蓄力效果',
                        dmg: {},
                        ap: {},
                        effect: { void: {stack: 2, chance: 100, target: 'self'},
                                charge: {stack: 1, chance: 100, target: 'self'} },
                        cost: { MP: 10000, },
                    }, {
                        des: '获得三层虚无效果和一层蓄力效果',
                        dmg: {},
                        ap: {},
                        effect: { void: {stack: 3, chance: 100, target: 'self'},
                                charge: {stack: 1, chance: 100, target: 'self'} },
                        cost: { MP: 15000, },
                    }
                ],
                proficient: {
                },
                tag: ['BUFF']
            },
            spell_holy_layonhands: {
                name: '圣疗术',
                max: 85,
                iconSrc: "./icons/spell/Spell_holy_layonhands.png",
                quality: 4,
                level: [{
                        des: '恢复自身所有生命值',
                        dmg: {},
                        ap: {},
                        heal: { MAXHP: 1 },
                        cost: { CURMP: 1, },
                    }, {
                        des: '恢复自身所有生命值',
                        dmg: {},
                        ap: {},
                        heal: { MAXHP: 1 },
                        cost: { CURMP: 0.9, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { deathImmune: {stack: 1, chance: 40, target: 'self'} },
                        desc: '40%获得一层死亡免疫效果'
                    },
                    100: {
                        effect: { deathImmune: {stack: 2, chance: 40, target: 'self'} },
                        desc: '40%获得两层死亡免疫效果'
                    }
                },
                tag: ['恢复']
            },
            spell_shadow_deathscream: {
                name: '死亡嚎叫',
                max: 35,
                iconSrc: "./icons/spell/Spell_shadow_deathscream.png",
                quality: 4,
                level: [{
                        des: '造成攻击力*1点伤害，50%对敌人附加一层眩晕效果，并获得一层吸血效果',
                        dmg: {ATK: 1},
                        effect: { stun: {stack: 1, chance: 50, target: 'enermy'},
                                lifesteal: {stack: 1, chance: 100, target: 'self'} },
                        cost: { MP: 2000, },
                    }, {
                        des: '造成攻击力*1.5点伤害，50%对敌人附加一层眩晕效果，并获得一层吸血效果',
                        dmg: {ATK: 1.5},
                        effect: { stun: {stack: 1, chance: 50, target: 'enermy'},
                                lifesteal: {stack: 1, chance: 100, target: 'self'} },
                        cost: { MP: 5000, },
                    }
                ],
                proficient: {
                },
                tag: ['攻击力', 'BUFF', 'DEBUFF']
            },
            ability_druid_starfall: {
                name: '无尽之星',
                max: 20,
                iconSrc: "./icons/spell/Ability_druid_starfall.png",
                quality: 5,
                level: [{
                        des: '造成当前魔法值*6点伤害',
                        dmg: { CURMP: 6 },
                        cost: { MAXMP: 1, },
                    }, {
                        des: '造成当前魔法值*8点伤害',
                        dmg: { CURMP: 8 },
                        cost: { MAXMP: 1, },
                    }, {
                        des: '造成当前魔法值*10点伤害',
                        dmg: { CURMP: 10 },
                        cost: { MAXMP: 1, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { forceOfNature: {stack: 1, chance: 100, target: 'self'} },
                        desc: '获得一层自然之力效果'
                    },
                    100: {
                        effect: { forceOfNature: {stack: 2, chance: 100, target: 'self'} },
                        desc: '获得两层自然之力效果'
                    }
                },
                tag: ['魔法']
            },
            warrior_talent_icon_innerrage: {
                name: '鲁莽',
                max: 90,
                iconSrc: "./icons/spell/warrior_talent_icon_innerrage.png",
                quality: 5,
                level: [{
                        des: '获得一层破甲、穿透、吸血、蓄力',
                        dmg: {},
                        ap: {},
                        effect: {sunder: {stack: 1, chance: 100, target: 'self'},
                                penetrate: {stack: 1, chance: 100, target: 'self'} ,
                                lifesteal: {stack: 1, chance: 100, target: 'self'} ,
                                charge: {stack: 1, chance: 100, target: 'self'} },
                        cost: { MAXHP: 0.1, },
                    }, {
                        des: '获得两层破甲、穿透、吸血、蓄力',
                        dmg: {},
                        ap: {},
                        effect: {sunder: {stack: 2, chance: 100, target: 'self'},
                                penetrate: {stack: 2, chance: 100, target: 'self'} ,
                                lifesteal: {stack: 2, chance: 100, target: 'self'} ,
                                charge: {stack: 2, chance: 100, target: 'self'} },
                        cost: { MAXHP: 0.2, },
                    }
                ],
                proficient: {
                },
                tag: ['BUFF']
            },
            ability_revendreth_paladin: {
                name: '血祭',
                max: 100,
                iconSrc: "./icons/spell/Ability_revendreth_paladin.png",
                quality: 6,
                level: [{
                        des: '造成当前生命值*3点伤害, 100%获得一层吸收效果',
                        dmg: { CURHP: 3 },
                        effect: { absorb: {stack: 1, chance: 100, target: 'self'} },
                        cost: { CURHP: 0.5, },
                    }, {
                        des: '造成当前生命值*4点伤害, 100%获得一层吸收效果',
                        dmg: { CURHP: 4 },
                        effect: { absorb: {stack: 1, chance: 100, target: 'self'} },
                        cost: { CURHP: 0.5, },
                    }, {
                        des: '造成当前生命值*5点伤害, 100%获得一层吸收效果',
                        dmg: { CURHP: 5 },
                        effect: { absorb: {stack: 1, chance: 100, target: 'self'} },
                        cost: { CURHP: 0.5, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { lifesteal: {stack: 1, chance: 50, target: 'self'} },
                        desc: '50%获得一层吸血效果'
                    },
                    100: {
                        effect: { lifesteal: {stack: 2, chance: 50, target: 'self'} },
                        desc: '50%获得两层吸血效果'
                    }
                },
                tag: ['生命', 'BUFF']
            },
            ability_ardenweald_paladin_summer: {
                name: '仲夏祝福',
                max: 100,
                iconSrc: "./icons/spell/Ability_ardenweald_paladin_summer.png",
                quality: 6,
                level: [{
                        des: '获得一层吸血、吸蓝、蓄力、死亡免疫、虚无、吸收',
                        dmg: {},
                        ap: {},
                        effect: {lifesteal: {stack: 1, chance: 100, target: 'self'},
                                manasteal: {stack: 1, chance: 100, target: 'self'} ,
                                charge: {stack: 1, chance: 100, target: 'self'} ,
                                deathImmune: {stack: 1, chance: 100, target: 'self'},
                                void: {stack: 1, chance: 100, target: 'self'} ,
                                absorb: {stack: 1, chance: 100, target: 'self'},  },
                        cost: { },
                    }, {
                        des: '获得一层吸血、吸蓝、蓄力、死亡免疫、虚无、吸收',
                        dmg: {},
                        ap: {},
                        effect: {lifesteal: {stack: 1, chance: 100, target: 'self'},
                                manasteal: {stack: 1, chance: 100, target: 'self'} ,
                                charge: {stack: 1, chance: 100, target: 'self'} ,
                                deathImmune: {stack: 1, chance: 100, target: 'self'},
                                void: {stack: 1, chance: 100, target: 'self'} ,
                                absorb: {stack: 1, chance: 100, target: 'self'}, },
                        cost: { },
                    }
                ],
                proficient: {
                },
                tag: ['BUFF']
            },
        },
    }
},
}