export const spellConfig = {
data() {
    return{            
        spellQuality: [{
            name: '破旧',
            qualityLv: 1,
            color: '#9D9D9D',
        }, {
            name: '普通',
            qualityLv: 2,
            color: '#D9D9D9', 
        }, {
            name: '精良',
            qualityLv: 3,
            color: '#1EFF00', 
        }, {
            name: '完美',
            qualityLv: 4,
            color: '#0070DD', 
        }, {
            name: '史诗',
            qualityLv: 5,
            color: '#9345FF', 
        }, {
            name: '传说',
            qualityLv: 6,
            color: '#FF8000', 
        }],
        spell: {
            attack: {
                name: '普通攻击',
                max: 0,
                iconSrc: "./icons/stat/atk.jpg",
                quality: 1,
                level: [{
                        des: '造成攻击力*1点伤害',
                        adDmg: { ATK: 1, },
                        cost: { },
                    }
                ],
                tag: ['攻击']
            },
            spell_frost_frostbolt02: {
                name: '寒冰箭',
                max: 0,
                iconSrc: "./icons/spell/mage/spell_frost_frostbolt02.jpg",
                quality: 1,
                level: [{
                        des: '造成法伤*1点伤害',
                        apDmg: { AP: 1, },
                        cost: { MP: 10 },
                    }
                ],
                tag: ['法伤']
            },
            spell_nature_thunderclapDmg: {
                name: '雷霆一击',
                max: 10,
                iconSrc: "./icons/spell/spell_nature_thunderclap.jpg",
                quality: 1,
                level: [{
                        des: '造成攻击力*1.1点伤害',
                        adDmg: { ATK: 1.1, },
                        cost: { MP: 10, },
                    }, {
                        des: '造成攻击力*1.2点伤害',
                        adDmg: { ATK: 1.2, },
                        cost: { MP: 25, },
                    }, {
                        des: '造成攻击力*1.3点伤害',
                        adDmg: { ATK: 1.3, },
                        cost: { MP: 50, },
                    }, {
                        des: '造成攻击力*1.4点伤害',
                        adDmg: { ATK: 1.4, },
                        cost: { MP: 100, },
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
                    //     stun: {stack: 2, chance: 100, target: 'enemy'} ,
                    //     bleed: {stack: 2, chance: 100, target: 'enemy'} ,
                    //     poison: {stack: 2, chance: 100, target: 'enemy'} ,
                    //     weak: {stack: 2, chance: 100, target: 'enemy'}
                    //     },
                    //     desc: '20%对敌人附加一层眩晕效果'
                    // },
                    10: {
                        effect: { stun: {stack: 1, chance: 10, target: 'enemy'} },
                        desc: '10%对敌人附加一层眩晕效果'
                    },
                    100: {
                        effect: { stun: {stack: 1, chance: 20, target: 'enemy'} },
                        desc: '20%对敌人附加一层眩晕效果'
                    }
                },
                tag: ['攻击']
            },
            inv_sword_48: {
                name: '屠杀',
                max: 10,
                iconSrc: "./icons/spell/inv_sword_48.jpg",
                quality: 1,
                level: [{
                        des: '造成攻击力*0.5点伤害, 对低于80%的目标造成额外攻击力*0.75点伤害',
                        adDmg: { ATK: 0.5},
                        cost: { MP: 200, },
                    },
                ],
                tag: []
            },
            ability_whirlwind: {
                name: '剑刃风暴',
                max: 100,
                iconSrc: "./icons/spell/ability_whirlwind.jpg",
                quality: 1,
                level: [{
                        des: '造成8次100+攻击力*0.5点伤害, 移除所有负面状态效果',
                        adDmg: { FIX: 100, ATK: 0.5},
                        cost: { MP: 500, },
                    },
                ],
                tag: []
            },
            ability_racial_avatar: {
                name: '天神下凡',
                max: 10,
                iconSrc: "./icons/spell/ability_racial_avatar.jpg",
                quality: 1,
                level: [{
                        des: '伤害提升20%, 移除并免疫所有负面效果, 持续一分钟',
                        adDmg: { FIX: 0},
                        cost: { MP: 600, },
                    },
                ],
                tag: []
            },
            ability_warrior_shieldbash: {
                name: '盾击',
                max: 15,
                iconSrc: "./icons/spell/ability_warrior_shieldbash.jpg",
                quality: 1,
                level: [{
                        des: '造成攻击力*0.5+护甲*1点伤害',
                        adDmg: { ATK: 0.5, DEF: 1 },
                        cost: { MP: 50, },
                    }, {
                        des: '造成攻击力*0.5+护甲*1.5点伤害',
                        adDmg: { ATK: 0.5, DEF: 1.5 },
                        cost: { MP: 100, },
                    }, {
                        des: '造成攻击力*0.5+护甲*2点伤害',
                        adDmg: { ATK: 0.5, DEF: 2 },
                        cost: { MP: 150, },
                    }, {
                        des: '造成攻击力*0.5+护甲*2.5点伤害',
                        adDmg: { ATK: 0.5, DEF: 2.5 },
                        cost: { MP: 200, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { stun: {stack: 1, chance: 20, target: 'enemy'} },
                        desc: '20%对敌人附加一层眩晕效果'
                    },
                    50: {
                        effect: { block: {stack: 1, chance: 20, target: 'self'} },
                        desc: '20%获得一层格挡效果'
                    },
                    100: {
                        effect: { stun: {stack: 1, chance: 40, target: 'enemy'} },
                        desc: '40%对敌人附加一层眩晕效果'
                    }
                },
                tag: ['攻击', '护甲']
            },
            ability_druid_maul: {
                name: '槌击',
                max: 10,
                iconSrc: "./icons/spell/ability_druid_maul.jpg",
                quality: 1,
                level: [{
                        des: '造成攻击*1+力量*3点伤害',
                        adDmg: { ATK:1, STR: 3 },
                        cost: { MP: 100, },
                    }, {
                        des: '造成攻击*1+力量*6点伤害',
                        adDmg: { ATK:1, STR: 6 },
                        cost: { MP: 150, },
                    }, {
                        des: '造成攻击*1+力量*9点伤害',
                        adDmg: { ATK:1, STR: 9 },
                        cost: { MP: 200, },
                    }, {
                        des: '造成攻击*1+力量*12点伤害',
                        adDmg: { ATK:1, STR: 12 },
                        cost: { MP: 250, },
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
                iconSrc: "./icons/spell/spell_shadow_ritualofsacrifice.jpg",
                quality: 1,
                level: [{
                        des: '造成攻击力*0.8+敏捷*10点伤害',
                        adDmg: { ATK:0.8, AGI: 10, },
                        cost: { MP: 175, },
                    }, {
                        des: '造成攻击力*0.9+敏捷*12点伤害',
                        adDmg: { ATK:0.9, AGI: 12, },
                        cost: { MP: 250, },
                    }, {
                        des: '造成攻击力*1+敏捷*15点伤害',
                        adDmg: { ATK:1, AGI: 15, },
                        cost: { MP: 350, },
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
                iconSrc: "./icons/spell/spell_holy_renew.jpg",
                quality: 1,
                level: [{
                        des: '恢复1000点生命值',
                        adDmg: {},
                        apDmg: {},
                        heal: { FIX: 1000 },
                        cost: { MP: 50, },
                    }, {
                        des: '恢复3000点生命值',
                        adDmg: {},
                        apDmg: {},
                        heal: { FIX: 3000 },
                        cost: { MP: 75, },
                    }, {
                        des: '恢复6000点生命值',
                        adDmg: {},
                        apDmg: {},
                        heal: { FIX: 6000 },
                        cost: { MP: 100, },
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
                name: '勾魂',
                max: 50,
                iconSrc: "./icons/spell/spell_warlock_soulburn.jpg",
                quality: 1,
                level: [{
                        des: '造成最大生命值*0.8点伤害',
                        adDmg: { MAXHP: 0.8 },
                        cost: { MAXHP: 0.1, },
                    }, {
                        des: '造成最大生命值*0.9点伤害',
                        adDmg: { MAXHP: 0.9 },
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
                iconSrc: "./icons/spell/ability_warrior_shatteringthrow.jpg",
                quality: 1,
                level: [{
                        des: '造成攻击力*1点伤害, 30%获得一层穿透效果',
                        adDmg: { ATK: 1 },
                        cost: { MP: 100, },
                        effect: { penetrate: {stack: 1, chance: 30, target: 'self'} },
                    }, {
                        des: '造成攻击力*1.2点伤害, 30%获得一层穿透效果',
                        adDmg: { ATK: 1.2 },
                        effect: { penetrate: {stack: 1, chance: 30, target: 'self'} },
                        cost: { MP: 300, },
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
                iconSrc: "./icons/spell/spell_holy_holybolt.jpg",
                quality: 2,
                level: [{
                        des: '恢复自身1000+10%最大生命值',
                        adDmg: {},
                        apDmg: {},
                        heal: { FIX: 1000, MAXHP: 0.1 },
                        cost: { MP: 100, },
                    }, {
                        des: '恢复自身2000+12%最大生命值',
                        adDmg: {},
                        apDmg: {},
                        heal: { FIX: 2000, MAXHP: 0.12 },
                        cost: { MP: 200, },
                    }, {
                        des: '恢复自身3000+15%最大生命值',
                        adDmg: {},
                        apDmg: {},
                        heal: { FIX: 3000, MAXHP: 0.15 },
                        cost: { MP: 300, },
                    }, {
                        des: '恢复自身4000+17%最大生命值',
                        adDmg: {},
                        apDmg: {},
                        heal: { FIX: 4000, MAXHP: 0.17 },
                        cost: { MP: 400, },
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
                iconSrc: "./icons/spell/spell_nature_lightning.jpg",
                quality: 2,
                level: [{
                        des: '造成50+智力*10点伤害。',
                        adDmg: { FIX: 5000, INT: 10, },
                        cost: { MP: 50, },
                    }, {
                        des: '造成300+智力*12点伤害。',
                        adDmg: { FIX: 30000, INT: 12, },
                        cost: { MP: 150, },
                    }, {
                        des: '造成1000+智力*15点伤害。',
                        adDmg: { FIX: 1000, INT: 15, },
                        cost: { MP: 450, },
                    }
                ],
                proficient: {
                    10: {
                        effect: { stun: {stack: 1, chance: 10, target: 'enemy'} },
                        desc: '10%对敌人附加一层眩晕效果'
                    },
                    100: {
                        effect: { stun: {stack: 1, chance: 20, target: 'enemy'} },
                        desc: '20%对敌人附加一层眩晕效果'
                    }
                },
                tag: ['智力']
            },
            // spell_nature_starfall: {
            //     name: '月火术',
            //     max: 15,
            //     iconSrc: "./icons/spell/spell_nature_starfall.jpg",
            //     quality: 2,
            //     level: [{
            //             des: '造成元素伤害*2点元素伤害',
            //             adDmg: {},
            //             apDmg: { AP: 2 },
            //             cost: { MP: 4000, },
            //         }, {
            //             des: '造成元素伤害*2.5点元素伤害',
            //             adDmg: {},
            //             apDmg: { AP: 2.5 },
            //             cost: { MP: 10000, },
            //         }, {
            //             des: '造成元素伤害*3点元素伤害',
            //             adDmg: {},
            //             apDmg: { AP: 3 },
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
                iconSrc: "./icons/spell/spell_holy_powerwordshield.jpg",
                quality: 2,
                level: [{
                        des: '获得两层虚无效果',
                        adDmg: {},
                        apDmg: {},
                        effect: { void: {stack: 2, chance: 100, target: 'self'} },
                        cost: { MP: 400, },
                    }, {
                        des: '获得三层虚无效果',
                        adDmg: {},
                        apDmg: {},
                        effect: { void: {stack: 3, chance: 100, target: 'self'} },
                        cost: { MP: 1000, },
                    }
                ],
                proficient: {
                },
                tag: ['BUFF']
            },
            spell_animabastion_buff: {
                name: '灵感',
                max: 30,
                iconSrc: "./icons/spell/spell_animabastion_buff.jpg",
                quality: 2,
                level: [{
                        des: '恢复最大魔法值*0.5点生命值, 100%获得一层蓄力效果',
                        adDmg: {},
                        apDmg: {},
                        heal: { MAXMP: 0.5 },
                        cost: { MP: 0, },
                    }, {
                        des: '恢复最大魔法值*0.7点生命值, 100%获得一层蓄力效果',
                        adDmg: {},
                        apDmg: {},
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
                iconSrc: "./icons/spell/spell_animaardenweald_orb.jpg",
                quality: 2,
                level: [{
                        des: '获得两层吸蓝效果',
                        adDmg: {},
                        apDmg: {},
                        effect: { manasteal: {stack: 2, chance: 100, target: 'self'} },
                        cost: { MP: 50, },
                    }, {
                        des: '获得三层吸蓝效果',
                        adDmg: {},
                        apDmg: {},
                        effect: { manasteal: {stack: 3, chance: 100, target: 'self'} },
                        cost: { MP: 100, },
                    }
                ],
                proficient: {
                },
                tag: ['BUFF']
            },
            spell_shadow_curseofmannoroth: {
                name: '残废术',
                max: 25,
                iconSrc: "./icons/spell/spell_shadow_curseofmannoroth.jpg",
                quality: 3,
                level: [{
                        des: '造成攻击力*0.8点伤害, 50%对敌人附加一层虚弱效果',
                        adDmg: { ATK: 0.8},
                        apDmg: {},
                        effect: { weak: {stack: 1, chance: 50, target: 'enemy'} },
                        cost: { MP: 100, },
                    }, {
                        des: '造成攻击力*0.9点伤害, 50%对敌人附加一层虚弱效果',
                        adDmg: { ATK: 0.9},
                        apDmg: {},
                        effect: { weak: {stack: 1, chance: 50, target: 'enemy'} },
                        cost: { MP: 200, },
                    }, {
                        des: '造成攻击力*1点伤害, 50%对敌人附加一层虚弱效果',
                        adDmg: { ATK: 1},
                        apDmg: {},
                        effect: { weak: {stack: 1, chance: 50, target: 'enemy'} },
                        cost: { MP: 300, },
                    }, {
                        des: '造成攻击力*1.1点伤害, 50%对敌人附加一层虚弱效果',
                        adDmg: { ATK: 1.1},
                        apDmg: {},
                        effect: { weak: {stack: 1, chance: 50, target: 'enemy'} },
                        cost: { MP: 400, },
                    }
                ],
                proficient: {
                },
                tag: ['攻击力', 'DEBUFF']
            },
            spell_animaardenweald_groundstate: {
                name: '冥想',
                max: 20,
                iconSrc: "./icons/spell/spell_animaardenweald_groundstate.jpg",
                quality: 2,
                level: [{
                        des: '获得一层吸蓝效果和一层蓄力效果',
                        adDmg: {},
                        apDmg: {},
                        effect: { manasteal: {stack: 1, chance: 100, target: 'self'},
                                charge: {stack: 1, chance: 100, target: 'self'} },
                        cost: { MP: 0, },
                    }, {
                        des: '获得两层吸蓝效果和一层蓄力效果',
                        adDmg: {},
                        apDmg: {},
                        effect: { manasteal: {stack: 2, chance: 100, target: 'self'},
                                charge: {stack: 1, chance: 100, target: 'self'} },
                        cost: { MP: 0, },
                    }, {
                        des: '获得两层吸蓝效果和两层蓄力效果',
                        adDmg: {},
                        apDmg: {},
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
            //     iconSrc: "./icons/spell/spell_arcane_starfire.jpg",
            //     quality: 3,
            //     level: [{
            //             des: '造成元素*5点伤害',
            //             adDmg: { AP: 5},
            //             cost: { MP: 10000, },
            //         }, {
            //             des: '造成元素*7点伤害',
            //             adDmg: { AP: 7},
            //             cost: { MP: 30000, },
            //         }, {
            //             des: '造成元素*7点伤害',
            //             adDmg: { AP: 7},
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
                iconSrc: "./icons/spell/spell_holy_crusaderstrike.jpg",
                quality: 3,
                level: [{
                        des: '造成攻击力*2点伤害',
                        adDmg: { ATK: 2, },
                        cost: { MP: 200, },
                    }, {
                        des: '造成攻击力*2.5点伤害',
                        adDmg: { ATK: 2.5, },
                        cost: { MP: 400, },
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
            //     iconSrc: "./icons/spell/spell_nature_wispsplode.jpg",
            //     quality: 3,
            //     level: [{
            //             des: '造成10*元素伤害点元素伤害',
            //             adDmg: {},
            //             apDmg: {AP: 10},
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
                iconSrc: "./icons/spell/spell_shadow_deathcoil.jpg",
                quality: 3,
                level: [{
                        des: '造成当前生命值*10点伤害, 50%获得一层吸收效果',
                        adDmg: {CURHP: 10},
                        effect: { absorb: {stack: 1, chance: 50, target: 'self'}},
                        cost: { MP: 500, },
                    }, {
                        des: '造成当前生命值*10点伤害, 50%获得一层吸收效果',
                        adDmg: {CURHP: 10},
                        effect: { absorb: {stack: 1, chance: 50, target: 'self'}},
                        cost: { MP: 1000, },
                    }
                ],
                proficient: {
                },
                tag: ['生命', 'BUFF']
            },
            ability_rogue_shadowstrike: {
                name: '裂缝打击',
                max: 75,
                iconSrc: "./icons/spell/ability_rogue_shadowstrike.jpg",
                quality: 4,
                level: [{
                        des: '造成攻击力*1+敏捷*3点伤害, 50%获得一层穿透效果',
                        adDmg: { ATK: 1, AGI: 3},
                        effect: { penetrate: {stack: 1, chance: 50, target: 'self'}},
                        cost: { MP: 100, },
                    }, {
                        des: '造成攻击力*1.1+敏捷*5点伤害, 50%获得一层穿透效果',
                        adDmg: { ATK: 1.1, AGI: 5},
                        effect: { penetrate: {stack: 1, chance: 50, target: 'self'}},
                        cost: { MP: 200, },
                    }, {
                        des: '造成攻击力*1.2+敏捷*7点伤害, 50%获得一层穿透效果',
                        adDmg: { ATK: 1.2, AGI: 7},
                        effect: { penetrate: {stack: 1, chance: 50, target: 'self'}},
                        cost: { MP: 300, },
                    }, {
                        des: '造成攻击力*1.3+敏捷*9点伤害, 50%获得一层穿透效果',
                        adDmg: { ATK: 1.3, AGI: 9},
                        effect: { penetrate: {stack: 1, chance: 50, target: 'self'}},
                        cost: { MP: 400, },
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
                iconSrc: "./icons/spell/spell_holy_innerfire.jpg",
                quality: 4,
                level: [{
                        des: '获得一层虚无效果和一层蓄力效果',
                        adDmg: {},
                        apDmg: {},
                        effect: { void: {stack: 1, chance: 100, target: 'self'},
                                charge: {stack: 1, chance: 100, target: 'self'} },
                        cost: { MP: 50, },
                    }, {
                        des: '获得两层虚无效果和一层蓄力效果',
                        adDmg: {},
                        apDmg: {},
                        effect: { void: {stack: 2, chance: 100, target: 'self'},
                                charge: {stack: 1, chance: 100, target: 'self'} },
                        cost: { MP: 100, },
                    }, {
                        des: '获得三层虚无效果和一层蓄力效果',
                        adDmg: {},
                        apDmg: {},
                        effect: { void: {stack: 3, chance: 100, target: 'self'},
                                charge: {stack: 1, chance: 100, target: 'self'} },
                        cost: { MP: 150, },
                    }
                ],
                proficient: {
                },
                tag: ['BUFF']
            },
            spell_holy_layonhands: {
                name: '圣疗术',
                max: 85,
                iconSrc: "./icons/spell/spell_holy_layonhands.jpg",
                quality: 4,
                level: [{
                        des: '恢复自身所有生命值',
                        adDmg: {},
                        apDmg: {},
                        heal: { MAXHP: 1 },
                        cost: { CURMP: 1, },
                    }, {
                        des: '恢复自身所有生命值',
                        adDmg: {},
                        apDmg: {},
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
                iconSrc: "./icons/spell/spell_shadow_deathscream.jpg",
                quality: 4,
                level: [{
                        des: '造成攻击力*1点伤害, 50%对敌人附加一层眩晕效果, 并获得一层吸血效果',
                        adDmg: {ATK: 1},
                        effect: { stun: {stack: 1, chance: 50, target: 'enemy'},
                                lifesteal: {stack: 1, chance: 100, target: 'self'} },
                        cost: { MP: 200, },
                    }, {
                        des: '造成攻击力*1.5点伤害, 50%对敌人附加一层眩晕效果, 并获得一层吸血效果',
                        adDmg: {ATK: 1.5},
                        effect: { stun: {stack: 1, chance: 50, target: 'enemy'},
                                lifesteal: {stack: 1, chance: 100, target: 'self'} },
                        cost: { MP: 500, },
                    }
                ],
                proficient: {
                },
                tag: ['攻击力', 'BUFF', 'DEBUFF']
            },
            ability_druid_starfall: {
                name: '无尽之星',
                max: 20,
                iconSrc: "./icons/spell/ability_druid_starfall.jpg",
                quality: 5,
                level: [{
                        des: '造成当前魔法值*6点伤害',
                        adDmg: { CURMP: 6 },
                        cost: { MAXMP: 1, },
                    }, {
                        des: '造成当前魔法值*8点伤害',
                        adDmg: { CURMP: 8 },
                        cost: { MAXMP: 1, },
                    }, {
                        des: '造成当前魔法值*10点伤害',
                        adDmg: { CURMP: 10 },
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
                iconSrc: "./icons/spell/warrior_talent_icon_innerrage.jpg",
                quality: 5,
                level: [{
                        des: '获得一层破甲、穿透、吸血、蓄力',
                        adDmg: {},
                        apDmg: {},
                        effect: {sunder: {stack: 1, chance: 100, target: 'self'},
                                penetrate: {stack: 1, chance: 100, target: 'self'} ,
                                lifesteal: {stack: 1, chance: 100, target: 'self'} ,
                                charge: {stack: 1, chance: 100, target: 'self'} },
                        cost: { MAXHP: 0.1, },
                    }, {
                        des: '获得两层破甲、穿透、吸血、蓄力',
                        adDmg: {},
                        apDmg: {},
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
                iconSrc: "./icons/spell/ability_revendreth_paladin.jpg",
                quality: 6,
                level: [{
                        des: '造成当前生命值*3点伤害, 获得一层吸收效果',
                        adDmg: { CURHP: 3 },
                        effect: { absorb: {stack: 1, chance: 100, target: 'self'} },
                        cost: { CURHP: 0.5, },
                    }, {
                        des: '造成当前生命值*4点伤害, 获得一层吸收效果',
                        adDmg: { CURHP: 4 },
                        effect: { absorb: {stack: 1, chance: 100, target: 'self'} },
                        cost: { CURHP: 0.5, },
                    }, {
                        des: '造成当前生命值*5点伤害, 获得一层吸收效果',
                        adDmg: { CURHP: 5 },
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
                iconSrc: "./icons/spell/ability_ardenweald_paladin_summer.jpg",
                quality: 6,
                level: [{
                        des: '获得一层吸血、吸蓝、蓄力、死亡免疫、虚无、吸收',
                        adDmg: {},
                        apDmg: {},
                        effect: {lifesteal: {stack: 1, chance: 100, target: 'self'},
                                manasteal: {stack: 1, chance: 100, target: 'self'} ,
                                charge: {stack: 1, chance: 100, target: 'self'} ,
                                deathImmune: {stack: 1, chance: 100, target: 'self'},
                                void: {stack: 1, chance: 100, target: 'self'} ,
                                absorb: {stack: 1, chance: 100, target: 'self'},  },
                        cost: { },
                    }, {
                        des: '获得一层吸血、吸蓝、蓄力、死亡免疫、虚无、吸收',
                        adDmg: {},
                        apDmg: {},
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
            inv_misc_food_73cinnamonroll: {
                name: '造餐术',
                max: 20,
                iconSrc: "./icons/spell/mage/inv_misc_food_73cinnamonroll.jpg",
                quality: 1,
                level: [{
                        des: '制造三个面包，用来立即回复100%的生命值，战斗期间无法使用',
                        cost: { MP: 20, },
                    },
                ],
                tag: []
            },
            inv_misc_gem_sapphire_02: {
                name: '制造法力宝石',
                max: 20,
                iconSrc: "./icons/spell/mage/inv_misc_gem_sapphire_02.jpg",
                quality: 1,
                level: [{
                        des: '制造三颗法力宝石，用来立即回复100%的魔法值，战斗期间无法使用',
                        cost: { MP: 20, },
                    },
                ],
                tag: []
            },
            spell_fire_flamebolt: {
                name: '火球术',
                max: 10,
                iconSrc: "./icons/spell/mage/spell_fire_flamebolt.jpg",
                quality: 1,
                level: [{
                        des: '投出一枚火球，造成法术强度*1.1点魔法伤害',
                        apDmg: { AP: 1.1, },
                        cost: { MP: 40, },
                    }, {
                        des: '投出一枚火球，造成法术强度*1.15点魔法伤害',
                        apDmg: { AP: 1.15, },
                        cost: { MP: 60, },
                    }, {
                        des: '投出一枚火球，造成法术强度*1.2点魔法伤害',
                        apDmg: { AP: 1.2, },
                        cost: { MP: 80, },
                    }, {
                        des: '投出一枚火球，造成法术强度*1.25点魔法伤害',
                        apDmg: { AP: 1.25, },
                        cost: { MP: 100, },
                    }
                ],
                tag: ['法术强度']
            },
            spell_frost_icestorm: {
                name: '暴风雪',
                max: 25,
                iconSrc: "./icons/spell/mage/spell_frost_icestorm.jpg",
                quality: 1,
                level: [{
                        des: '目标区域骤然落下寒冰碎片，每秒对目标造成法术强度*0.15点魔法伤害，持续8秒',
                        apDmg: { AP: 0.15, },
                        cost: { MP: 50, },
                    }, {
                        des: '目标区域骤然落下寒冰碎片，每秒对目标造成法术强度*0.17点魔法伤害，持续8秒',
                        apDmg: { AP: 0.17, },
                        cost: { MP: 75, },
                    }, {
                        des: '目标区域骤然落下寒冰碎片，每秒对目标造成法术强度*0.19点魔法伤害，持续8秒',
                        apDmg: { AP: 0.19, },
                        cost: { MP: 100, },
                    }, {
                        des: '目标区域骤然落下寒冰碎片，每秒对目标造成法术强度*0.21点魔法伤害，持续8秒',
                        apDmg: { AP: 0.21, },
                        cost: { MP: 125, },
                    }
                ],
                tag: ['法术强度']
            },
            spell_fire_soulburn: {
                name: '灼伤',
                max: 20,
                iconSrc: "./icons/spell/mage/spell_fire_soulburn.jpg",
                quality: 1,
                level: [{
                        des: '造成法术强度*0.25点魔法伤害，并附加3层灼伤效果',
                        apDmg: { AP: 0.25 },
                        effect: {burn: {stack: 3, chance: 100, target: 'enemy'},},
                        cost: { MP: 25, },
                    }, {
                        des: '造成法术强度*0.25点魔法伤害，并附加6层灼伤效果',
                        apDmg: { AP: 0.25 },
                        effect: {burn: {stack: 6, chance: 100, target: 'enemy'},},
                        cost: { MP: 25, },
                    }, {
                        des: '造成法术强度*0.25点魔法伤害，并附加9层灼伤效果',
                        apDmg: { AP: 0.25 },
                        effect: {burn: {stack: 9, chance: 100, target: 'enemy'},},
                        cost: { MP: 25, },
                    }
                ],
                proficient: {
                },
                tag: ['DEBUFF']
            },
            ability_warlock_burningembersblue: {
                name: '冰风暴',
                max: 50,
                iconSrc: "./icons/spell/mage/ability_warlock_burningembersblue.jpg",
                quality: 1,
                level: [{
                        des: '释放寒冰风暴，每0.33秒对目标造成法术强度*0.08点魔法伤害，持续5秒',
                        apDmg: { AP: 0.08, },
                        cost: { MP: 50, },
                    }, {
                        des: '释放寒冰风暴，每0.33秒对目标造成法术强度*0.09点魔法伤害，持续5秒',
                        apDmg: { AP: 0.09, },
                        cost: { MP: 75, },
                    }, {
                        des: '释放寒冰风暴，每0.33秒对目标造成法术强度*0.10点魔法伤害，持续5秒',
                        apDmg: { AP: 0.10, },
                        cost: { MP: 100, },
                    }
                ],
                tag: ['法术强度']
            },
            spell_fire_fireball02: {
                name: '炎爆术',
                max: 50,
                iconSrc: "./icons/spell/mage/spell_fire_fireball02.jpg",
                quality: 1,
                level: [{
                        des: '发射一颗巨大的烈焰巨石，造成法术强度*2点魔法伤害',
                        apDmg: { AP: 2, },
                        cost: { MP: 200, },
                    }, {
                        des: '发射一颗巨大的烈焰巨石，造成法术强度*2.5点魔法伤害',
                        apDmg: { AP: 2.5, },
                        cost: { MP: 300, },
                    }, {
                        des: '发射一颗巨大的烈焰巨石，造成法术强度*3点魔法伤害',
                        apDmg: { AP: 3, },
                        cost: { MP: 400, },
                    }
                ],
                tag: ['法术强度']
            },
            ability_mage_arcanebarrage: {
                name: '奥术弹幕',
                max: 50,
                iconSrc: "./icons/spell/mage/ability_mage_arcanebarrage.jpg",
                quality: 1,
                level: [{
                        des: '向敌方目标发射1-5发奥术能量箭矢，每发造成法术强度*0.4点魔法伤害。每层奥术充能使伤害提高25%',
                        apDmg: { AP: 0.4, },
                        cost: { MP: 50, },
                    }, {
                        des: '向敌方目标发射1-5发奥术能量箭矢，每发造成法术强度*0.43点魔法伤害。每层奥术充能使伤害提高25%',
                        apDmg: { AP: 0.43, },
                        cost: { MP: 75, },
                    }, {
                        des: '向敌方目标发射1-5发奥术能量箭矢，每发造成法术强度*0.46点魔法伤害。每层奥术充能使伤害提高25%',
                        apDmg: { AP: 0.46, },
                        cost: { MP: 100, },
                    }
                ],
                tag: ['法术强度']
            },
            ability_mage_arcanebarrage: {
                name: '奥术弹幕',
                max: 50,
                iconSrc: "./icons/spell/mage/ability_mage_arcanebarrage.jpg",
                quality: 1,
                level: [{
                        des: '向敌方目标发射1-5发奥术能量箭矢，每发造成法术强度*0.4点魔法伤害。每层奥术充能使伤害提高25%',
                        apDmg: { AP: 0.4, },
                        cost: { MP: 50, },
                    }, {
                        des: '向敌方目标发射1-5发奥术能量箭矢，每发造成法术强度*0.43点魔法伤害。每层奥术充能使伤害提高25%',
                        apDmg: { AP: 0.43, },
                        cost: { MP: 75, },
                    }, {
                        des: '向敌方目标发射1-5发奥术能量箭矢，每发造成法术强度*0.46点魔法伤害。每层奥术充能使伤害提高25%',
                        apDmg: { AP: 0.46, },
                        cost: { MP: 100, },
                    }
                ],
                tag: ['法术强度']
            },
            spell_ice_lament: {
                name: '寒冰护体',
                max: 50,
                iconSrc: "./icons/spell/mage/spell_ice_lament.jpg",
                quality: 1,
                level: [{
                        des: '为你施加寒冰护盾，吸收0.2*最大生命值*(1+全能*0.1)点伤害',
                        cost: { MP: 40, },
                    }, {
                        des: '为你施加寒冰护盾，吸收0.25*最大生命值*(1+全能*0.1)点伤害',
                        cost: { MP: 60, },
                    }, {
                        des: '为你施加寒冰护盾，吸收0.3*最大生命值*(1+全能*0.1)点伤害',
                        cost: { MP: 80, },
                    }
                ],
                tag: []
            },
            spell_arcane_blast: {
                name: '奥术冲击',
                max: 50,
                iconSrc: "./icons/spell/mage/spell_arcane_blast.jpg",
                quality: 1,
                level: [{
                        des: '用能量冲击目标，造成法术强度*0.75点魔法伤害。每层奥术充能使伤害提高60%，消耗的法力提高100%，增加3点充能',
                        apDmg: { AP: 0.75, },
                        cost: { MP: 40, },
                    }, {
                        des: '用能量冲击目标，造成法术强度*0.8点魔法伤害。每层奥术充能使伤害提高60%，消耗的法力提高100%，增加3点充能',
                        apDmg: { AP: 0.8, },
                        cost: { MP: 50, },
                    }, {
                        des: '用能量冲击目标，造成法术强度*0.85点魔法伤害。每层奥术充能使伤害提高60%，消耗的法力提高100%，增加3点充能',
                        apDmg: { AP: 0.85, },
                        cost: { MP: 60, },
                    }
                ],
                tag: ['法术强度']
            },
            spell_fire_selfdestruct: {
                name: '烈焰风暴',
                max: 50,
                iconSrc: "./icons/spell/mage/spell_fire_selfdestruct.jpg",
                quality: 1,
                level: [{
                        des: '对目标造成目标当前生命值*0.1点魔法伤害，并附加2层灼伤效果',
                        apDmg: { CURHP: 0.1, },
                        effect: {burn: {stack: 2, chance: 100, target: 'enemy'},},
                        cost: { MP: 40, },
                    }, {
                        des: '对目标造成目标当前生命值*0.12点魔法伤害，并附加2层灼伤效果',
                        apDmg: { CURHP: 0.12, },
                        effect: {burn: {stack: 2, chance: 100, target: 'enemy'},},
                        cost: { MP: 50, },
                    }, {
                        des: '对目标造成目标当前生命值*0.15点魔法伤害，并附加2层灼伤效果',
                        apDmg: { CURHP: 0.15, },
                        effect: {burn: {stack: 2, chance: 100, target: 'enemy'},},
                        cost: { MP: 60, },
                    }
                ],
                tag: ['法术强度']
            },
            spell_nature_starfall: {
                name: '奥术飞弹',
                max: 50,
                iconSrc: "./icons/spell/mage/spell_nature_starfall.jpg",
                quality: 1,
                level: [{
                        des: '向敌人射出五波奥术飞弹，每发造成法术强度*0.2点魔法伤害。每层奥术充能额外发射一波奥术飞弹',
                        apDmg: { AP: 0.2, },
                        cost: { MP: 40, },
                    }, {
                        des: '向敌人射出五波奥术飞弹，每发造成法术强度*0.21点魔法伤害。每层奥术充能额外发射一波奥术飞弹',
                        apDmg: { AP: 0.21, },
                        cost: { MP: 50, },
                    }, {
                        des: '向敌人射出五波奥术飞弹，每发造成法术强度*0.22点魔法伤害。每层奥术充能额外发射一波奥术飞弹',
                        apDmg: { AP: 0.22, },
                        cost: { MP: 60, },
                    }
                ],
                tag: ['法术强度']
            },
            spell_frost_coldhearted: {
                name: '冰冷血脉',
                max: 50,
                iconSrc: "./icons/spell/mage/spell_frost_coldhearted.jpg",
                quality: 1,
                level: [{
                        des: '加快你的施法速度，使你的急速提高30，持续20秒',
                        cost: { MP: 100, },
                    }
                ],
                tag: []
            },
            spell_frost_wizardmark: {
                name: '急速冷却',
                max: 75,
                iconSrc: "./icons/spell/mage/spell_frost_wizardmark.jpg",
                quality: 1,
                level: [{
                        des: '将暴风雪、寒冰护体、冰霜新星、冰锥术和寒冰屏障完全充能',
                        cost: { MP: 100, },
                    }
                ],
                tag: []
            },
            spell_frost_iceshock: {
                name: '法术反制',
                max: 30,
                iconSrc: "./icons/spell/mage/spell_frost_iceshock.jpg",
                quality: 1,
                level: [{
                        des: '为目标附加三层沉默，使其无法释放技能',
                        cost: { MP: 50, },
                    }
                ],
                tag: []
            },
            spell_mage_icenova: {
                name: '大法师之触',
                max: 100,
                iconSrc: "./icons/spell/mage/spell_mage_icenova.jpg",
                quality: 1,
                level: [{
                        des: '对你当前的目标施加大法师之触，在8秒后目标将受到期间受到的伤害总量*0.25点魔法伤害',
                        cost: { MP: 200, },
                    }
                ],
                tag: []
            },
            spell_nature_purge: {
                name: '唤醒',
                max: 30,
                iconSrc: "./icons/spell/mage/spell_nature_purge.jpg",
                quality: 1,
                level: [{
                        des: '恢复法力回复速度*30点魔法值',
                        cost: { },
                    },{
                        des: '恢复法力回复速度*40点魔法值',
                        cost: {  },
                    },{
                        des: '恢复法力回复速度*50点魔法值',
                        cost: {  },
                    }
                ],
                tag: []
            },
            spell_fire_sealoffire: {
                name: '燃烧',
                max: 120,
                iconSrc: "./icons/spell/mage/spell_fire_sealoffire.jpg",
                quality: 1,
                level: [{
                        des: '将自身包裹在烈焰之中，短时间内使你的法术爆击几率提高100%，持续10秒',
                        cost: { MP: 200, },
                    }
                ],
                tag: []
            },
            ability_mage_timewarp: {
                name: '时间扭曲',
                max: 150,
                iconSrc: "./icons/spell/mage/ability_mage_timewarp.jpg",
                quality: 1,
                level: [{
                        des: '将所有其他技能完全充能',
                        cost: { MP: 500, },
                    }
                ],
                tag: []
            },              
        }
    }
},
}