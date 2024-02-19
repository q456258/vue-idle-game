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
        healBonusMod: {
            spell_holy_renew: 0.05
        },
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
            spell_nature_thunderclap: {
                name: '雷霆一击',
                max: 5,
                iconSrc: "./icons/spell/spell_nature_thunderclap.jpg",
                quality: 1,
                level: [{
                        des: '造成攻击力*1.1点伤害',
                        adDmg: { ATK: 1.1, },
                        cost: { MP: 20, },
                    }, {
                        des: '造成攻击力*1.2点伤害',
                        adDmg: { ATK: 1.2, },
                        cost: { MP: 30, },
                    }, {
                        des: '造成攻击力*1.3点伤害',
                        adDmg: { ATK: 1.3, },
                        cost: { MP: 40, },
                    }, {
                        des: '造成攻击力*1.4点伤害',
                        adDmg: { ATK: 1.4, },
                        cost: { MP: 50, },
                    }
                ],
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
                        cost: { MP: 50, },
                    },
                ],
                tag: []
            },
            ability_whirlwind: {
                name: '剑刃风暴',
                max: 50,
                iconSrc: "./icons/spell/ability_whirlwind.jpg",
                quality: 1,
                level: [{
                        des: '造成8次100+攻击力*0.5点伤害, 移除所有负面状态效果',
                        adDmg: { FIX: 100, ATK: 0.5},
                        cost: { MP: 1000, },
                    },
                ],
                tag: []
            },
            ability_racial_avatar: {
                name: '天神下凡',
                max: 50,
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
                        des: '造成攻击力*0.5+护甲*0.4点伤害',
                        adDmg: { ATK: 0.5, DEF: 0.4 },
                        cost: { MP: 25, },
                    }, {
                        des: '造成攻击力*0.5+护甲*0.45点伤害',
                        adDmg: { ATK: 0.5, DEF: 0.45 },
                        cost: { MP: 50, },
                    }, {
                        des: '造成攻击力*0.5+护甲*0.5点伤害',
                        adDmg: { ATK: 0.5, DEF: 0.5 },
                        cost: { MP: 75, },
                    }, {
                        des: '造成攻击力*0.5+护甲*0.55点伤害',
                        adDmg: { ATK: 0.5, DEF: 0.55 },
                        cost: { MP: 100, },
                    }
                ],
                tag: ['攻击', '护甲']
            },
            ability_warrior_shatteringthrow: {
                name: '碎裂投掷',
                max: 10,
                iconSrc: "./icons/spell/ability_warrior_shatteringthrow.jpg",
                quality: 1,
                level: [{
                        des: '造成攻击力*1.1点伤害, 30%获得一层穿透效果',
                        adDmg: { ATK: 1.1 },
                        cost: { MP: 35, },
                        effect: { penetrate: {stack: 1, chance: 30, target: 'self'} },
                    }, {
                        des: '造成攻击力*1.2点伤害, 30%获得一层穿透效果',
                        adDmg: { ATK: 1.2 },
                        effect: { penetrate: {stack: 1, chance: 30, target: 'self'} },
                        cost: { MP: 70, },
                    }
                ],
                tag: ['攻击', 'BUFF']
            },
            spell_holy_crusaderstrike: {
                name: '十字军打击',
                max: 25,
                iconSrc: "./icons/spell/spell_holy_crusaderstrike.jpg",
                quality: 3,
                level: [{
                        des: '造成攻击力*2点伤害',
                        adDmg: { ATK: 2, },
                        cost: { MP: 200, },
                    }, {
                        des: '造成攻击力*2.5点伤害',
                        adDmg: { ATK: 2.5, },
                        cost: { MP: 300, },
                    }
                ],
                tag: ['攻击']
            },
            spell_shadow_deathscream: {
                name: '死亡嚎叫',
                max: 25,
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

                tag: ['攻击力', 'BUFF', 'DEBUFF']
            },
            ability_revendreth_paladin: {
                name: '血祭',
                max: 60,
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
                tag: ['生命', 'BUFF']
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
                max: 5,
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
                max: 10,
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
                tag: ['DEBUFF']
            },
            ability_warlock_burningembersblue: {
                name: '冰风暴',
                max: 15,
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
                max: 20,
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
                max: 15,
                iconSrc: "./icons/spell/mage/ability_mage_arcanebarrage.jpg",
                quality: 1,
                level: [{
                        des: '向敌方目标发射1-5发奥术能量箭矢，每发造成智力*1.6点魔法伤害。每层奥术充能使伤害提高25%',
                        apDmg: { INT: 0.8, },
                        cost: { MP: 50, },
                    }, {
                        des: '向敌方目标发射1-5发奥术能量箭矢，每发造成智力*1.7点魔法伤害。每层奥术充能使伤害提高25%',
                        apDmg: { INT: 0.85, },
                        cost: { MP: 75, },
                    }, {
                        des: '向敌方目标发射1-5发奥术能量箭矢，每发造成智力*1.8点魔法伤害。每层奥术充能使伤害提高25%',
                        apDmg: { INT: 0.9, },
                        cost: { MP: 100, },
                    }
                ],
                tag: ['法术强度']
            },
            spell_ice_lament: {
                name: '寒冰护体',
                max: 20,
                iconSrc: "./icons/spell/mage/spell_ice_lament.jpg",
                quality: 1,
                level: [{
                        des: '为你施加寒冰护盾，吸收法术强度*0.6*(1+全能*0.005)点伤害, 持续5秒',
                        duration: { time: 5 },
                        cost: { MP: 40, },
                    }, {
                        des: '为你施加寒冰护盾，吸收法术强度*0.6*(1+全能*0.005)点伤害, 持续7秒',
                        duration: { time: 7 },
                        cost: { MP: 60, },
                    }, {
                        des: '为你施加寒冰护盾，吸收法术强度*0.6*(1+全能*0.005)点伤害, 持续9秒',
                        duration: { time: 9 },
                        cost: { MP: 80, },
                    }
                ],
                tag: []
            },
            spell_shadow_detectlesserinvisibility: {
                name: '法力护盾',
                max: 10,
                iconSrc: "./icons/spell/mage/spell_shadow_detectlesserinvisibility.jpg",
                quality: 1,
                level: [{
                        des: '制造一个护盾，使用魔法值抵消受到的伤害，每点魔法值可抵消2点伤害，持续10秒',
                        cost: { MP: 40, },
                    }
                ],
                tag: []
            },
            spell_arcane_blast: {
                name: '奥术冲击',
                max: 20,
                iconSrc: "./icons/spell/mage/spell_arcane_blast.jpg",
                quality: 1,
                level: [{
                        des: '用能量冲击目标，造成智力*1.7点魔法伤害。每层奥术充能使伤害提高60%，消耗的法力提高100%，增加3点充能',
                        apDmg: { INT: 1.7, },
                        cost: { MP: 40, },
                    }, {
                        des: '用能量冲击目标，造成智力*1.85点魔法伤害。每层奥术充能使伤害提高60%，消耗的法力提高100%，增加3点充能',
                        apDmg: { INT: 1.85, },
                        cost: { MP: 50, },
                    }, {
                        des: '用能量冲击目标，造成智力*2点魔法伤害。每层奥术充能使伤害提高60%，消耗的法力提高100%，增加3点充能',
                        apDmg: { INT: 2, },
                        cost: { MP: 60, },
                    }
                ],
                tag: ['法术强度']
            },
            spell_fire_selfdestruct: {
                name: '烈焰风暴',
                max: 20,
                iconSrc: "./icons/spell/mage/spell_fire_selfdestruct.jpg",
                quality: 1,
                level: [{
                        des: '对目标造成目标当前生命值*0.1点魔法伤害，并附加2层灼伤效果',
                        apDmg: { t_CURHP: 0.1, },
                        effect: {burn: {stack: 2, chance: 100, target: 'enemy'},},
                        cost: { MP: 10, },
                    }, {
                        des: '对目标造成目标当前生命值*0.12点魔法伤害，并附加2层灼伤效果',
                        apDmg: { t_CURHP: 0.12, },
                        effect: {burn: {stack: 2, chance: 100, target: 'enemy'},},
                        cost: { MP: 150, },
                    }, {
                        des: '对目标造成目标当前生命值*0.15点魔法伤害，并附加2层灼伤效果',
                        apDmg: { t_CURHP: 0.15, },
                        effect: {burn: {stack: 2, chance: 100, target: 'enemy'},},
                        cost: { MP: 200, },
                    }
                ],
                tag: ['法术强度']
            },
            spell_nature_starfall: {
                name: '奥术飞弹',
                max: 25,
                iconSrc: "./icons/spell/mage/spell_nature_starfall.jpg",
                quality: 1,
                level: [{
                        des: '向敌人射出五波奥术飞弹，每发造成智力*0.5点魔法伤害。每层奥术充能额外发射一波奥术飞弹',
                        apDmg: { INT: 0.5, },
                        cost: { MP: 75, },
                    }, {
                        des: '向敌人射出五波奥术飞弹，每发造成智力*0.55点魔法伤害。每层奥术充能额外发射一波奥术飞弹',
                        apDmg: { INT: 0.55, },
                        cost: { MP: 100, },
                    }, {
                        des: '向敌人射出五波奥术飞弹，每发造成智力*0.6点魔法伤害。每层奥术充能额外发射一波奥术飞弹',
                        apDmg: { INT: 0.6, },
                        cost: { MP: 125, },
                    }
                ],
                tag: ['法术强度']
            },
            spell_frost_coldhearted: {
                name: '冰冷血脉',
                max: 20,
                iconSrc: "./icons/spell/mage/spell_frost_coldhearted.jpg",
                quality: 1,
                level: [{
                        des: '加快你的施法速度，使你的急速提高30，持续20秒',
                        effect: {spell_frost_coldhearted: {stack: 20, chance: 100, target: 'self'},},
                        cost: { MP: 100, },
                    }
                ],
                tag: []
            },
            spell_frost_wizardmark: {
                name: '急速冷却',
                max: 30,
                iconSrc: "./icons/spell/mage/spell_frost_wizardmark.jpg",
                quality: 1,
                level: [{
                        des: '将暴风雪、冰风暴、寒冰护体和冰冷血脉完全充能',
                        cost: { MP: 200, },
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
                        des: '为目标附加沉默，使其五秒内无法释放技能',
                        cost: { MP: 50, },
                        effect: {silence: {stack: 5, chance: 100, target: 'enemy'},},
                    }
                ],
                tag: []
            },
            spell_mage_icenova: {
                name: '大法师之触',
                max: 50,
                iconSrc: "./icons/spell/mage/spell_mage_icenova.jpg",
                quality: 1,
                level: [{
                        des: '对你当前的目标施加大法师之触，在8秒后目标将受到期间受到的伤害总量*0.25点魔法伤害',
                        cost: { MP: 200, },
                        effect: {icenova: {stack: 8, chance: 100, target: 'enemy'},},
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
                        des: '恢复精神*30点魔法值',
                        cost: { },
                    },{
                        des: '恢复精神*40点魔法值',
                        cost: {  },
                    },{
                        des: '恢复精神*50点魔法值',
                        cost: {  },
                    }
                ],
                tag: []
            },
            spell_fire_sealoffire: {
                name: '燃烧',
                max: 70,
                iconSrc: "./icons/spell/mage/spell_fire_sealoffire.jpg",
                quality: 1,
                level: [{
                        des: '将自身包裹在烈焰之中，短时间内使你的法术爆击几率提高100%，持续10秒',
                        effect: {spell_fire_sealoffire: {stack: 10, chance: 100, target: 'self'},},
                        cost: { MP: 200, },
                    }
                ],
                tag: []
            },
            ability_mage_timewarp: {
                name: '时间扭曲',
                max: 120,
                iconSrc: "./icons/spell/mage/ability_mage_timewarp.jpg",
                quality: 1,
                level: [{
                        des: '将所有其他技能完全充能',
                        cost: { MP: 500, },
                    }
                ],
                tag: []
            },     
            spell_holy_renew: {
                name: '恢复',
                max: 25,
                iconSrc: "./icons/spell/priest/spell_holy_renew.jpg",
                quality: 1,
                level: [{
                        des: '满怀对圣光的信仰，每秒恢复法术强度*0.06点生命值，持续15秒',
                        heal: { AP: 0.06 },
                        cost: { MP: 50, },
                    }, {
                        des: '满怀对圣光的信仰，每秒恢复法术强度*0.07点生命值，持续15秒',
                        heal: { AP: 0.07 },
                        cost: { MP: 75, },
                    }, {
                        des: '满怀对圣光的信仰，每秒恢复法术强度*0.08点生命值，持续15秒',
                        heal: { AP: 0.08 },
                        cost: { MP: 100, },
                    }, {
                        des: '满怀对圣光的信仰，每秒恢复法术强度*0.09点生命值，持续15秒',
                        heal: { AP: 0.09 },
                        cost: { MP: 125, },
                    }
                ],
                tag: []
            },       
            spell_holy_flashheal: {
                name: '快速治疗',
                max: 10,
                iconSrc: "./icons/spell/priest/spell_holy_flashheal.jpg",
                quality: 1,
                level: [{
                        des: '恢复自身法术强度*0.75点生命值',
                        heal: { AP: 0.75 },
                        cost: { MP: 50, },
                    }, {
                        des: '恢复自身法术强度*0.8点生命值',
                        heal: { AP: 0.8 },
                        cost: { MP: 75, },
                    }, {
                        des: '恢复自身法术强度*0.85点生命值',
                        heal: { AP: 0.85 },
                        cost: { MP: 100, },
                    }, {
                        des: '恢复自身法术强度*0.9点生命值',
                        heal: { AP: 0.9 },
                        cost: { MP: 125, },
                    }
                ],
                tag: []
            },       
            spell_holy_innerfire: {
                name: '心灵之火',
                max: 15,
                iconSrc: "./icons/spell/priest/spell_holy_innerfire.jpg",
                quality: 1,
                level: [{
                        des: '提升10%攻击力、法术强度和500护甲，持续30秒',
                        effect: {spell_holy_innerfire: {stack: 30, chance: 100, target: 'self'},},
                        cost: { MP: 20, },
                    }, {
                        des: '提升12%攻击力、法术强度和750护甲，持续30秒',
                        effect: {spell_holy_innerfire2: {stack: 30, chance: 100, target: 'self'},},
                        cost: { MP: 30, },
                    }, {
                        des: '提升14%攻击力、法术强度和1000护甲，持续30秒',
                        effect: {spell_holy_innerfire3: {stack: 30, chance: 100, target: 'self'},},
                        cost: { MP: 40, },
                    }
                ],
                tag: []
            },           
            spell_holy_testoffaith: {
                name: '绝望祷言',
                max: 40,
                iconSrc: "./icons/spell/priest/spell_holy_testoffaith.jpg",
                quality: 1,
                level: [{
                        des: '使最大生命值提高25%，持续10秒。同时立即为你恢复同样数量的生命值',
                        heal: { MAXHP: 0.25, },
                        effect: {spell_holy_testoffaith: {stack: 30, chance: 100, target: 'self'},},
                        cost: { MP: 200, },
                    }
                ],
                tag: []
            },     
            spell_shadow_unholyfrenzy: {
                name: '心灵震爆',
                max: 20,
                iconSrc: "./icons/spell/priest/spell_shadow_unholyfrenzy.jpg",
                quality: 1,
                level: [{
                        des: '冲击目标的意识，造成智力*3点魔法伤害',
                        apDmg: { INT: 3, },
                        cost: { MP: 70, },
                    }, {
                        des: '冲击目标的意识，造成智力*3.5点魔法伤害',
                        apDmg: { INT: 3.5, },
                        cost: { MP: 80, },
                    }, {
                        des: '冲击目标的意识，造成智力*4点魔法伤害',
                        apDmg: { INT: 4, },
                        cost: { MP: 90, },
                    }, {
                        des: '冲击目标的意识，造成智力*4.5点魔法伤害',
                        apDmg: { INT: 4.5, },
                        cost: { MP: 100, },
                    }
                ],
                tag: []
            },
            spell_holy_powerwordshield: {
                name: '真言术：盾',
                max: 25,
                iconSrc: "./icons/spell/priest/spell_holy_powerwordshield.jpg",
                quality: 1,
                level: [{
                        des: '施加一个护盾，吸收最大生命值*0.1*(1+全能*0.01)点伤害, 持续5秒',
                        duration: { time: 5 },
                        effect: {spell_holy_powerwordshield: {stack: 10, chance: 100, target: 'self'},},
                        cost: { MP: 100, },
                    }, {
                        des: '施加一个护盾，吸收最大生命值*0.1*(1+全能*0.01)点伤害, 持续7秒',
                        duration: { time: 7 },
                        effect: {spell_holy_powerwordshield: {stack: 7, chance: 100, target: 'self'},},
                        cost: { MP: 150, },
                    }, {
                        des: '施加一个护盾，吸收最大生命值*0.1*(1+全能*0.01)点伤害, 持续9秒',
                        duration: { time: 9 },
                        effect: {spell_holy_powerwordshield: {stack: 9, chance: 100, target: 'self'},},
                        cost: { MP: 200, },
                    }
                ],
                tag: []
            },
            spell_shadow_shadowmend: {
                name: '暗影愈合',
                max: 30,
                iconSrc: "./icons/spell/priest/spell_shadow_shadowmend.jpg",
                quality: 1,
                level: [{
                        des: '为其恢复法术强度*3.2点生命值，此后该目标将每秒受到法术强度*0.16点伤害，直到脱离战斗为止',
                        heal: { AP: 3.2 },
                        cost: { MP: 50, },
                    }
                ],
                tag: []
            },       
            spell_shadow_shadowwordpain: {
                name: '暗言术：痛',
                max: 20,
                iconSrc: "./icons/spell/priest/spell_shadow_shadowwordpain.jpg",
                quality: 1,
                level: [{
                        des: '黑暗的咒语，造成法术强度*0.5点魔法伤害，并每秒造成法术强度*0.1点魔法伤害, 持续12秒',
                        apDmg: { AP: 0.5, },
                        cost: { MP: 70, },
                    }, {
                        des: '黑暗的咒语，造成法术强度*0.5点魔法伤害，并每秒造成法术强度*0.12点魔法伤害, 持续12秒',
                        apDmg: { AP: 0.5, },
                        cost: { MP: 80, },
                    }, {
                        des: '黑暗的咒语，造成法术强度*0.5点魔法伤害，并每秒造成法术强度*0.14点魔法伤害, 持续12秒',
                        apDmg: { AP: 0.5, },
                        cost: { MP: 90, },
                    }, {
                        des: '黑暗的咒语，造成法术强度*0.5点魔法伤害，并每秒造成法术强度*0.16点魔法伤害, 持续12秒',
                        apDmg: { AP: 0.5, },
                        cost: { MP: 100, },
                    }
                ],
                tag: []
            },
            spell_holy_dispelmagic: {
                name: '纯净术',
                max: 30,
                iconSrc: "./icons/spell/priest/spell_holy_dispelmagic.jpg",
                quality: 1,
                level: [{
                        des: '驱散敌方目标所有增益魔法效果',
                        cost: { MP: 50, },
                    }
                ],
                tag: []
            },       
            spell_holy_wordfortitude: {
                name: '真言术：韧',
                max: 10,
                iconSrc: "./icons/spell/priest/spell_holy_wordfortitude.jpg",
                quality: 1,
                level: [{
                        des: '注入活力，使耐力提高5%，持续1小时',
                        effect: {spell_holy_wordfortitude: {stack: 3600, chance: 100, target: 'self'},},
                        cost: { MP: 150, },
                    }
                ],
                tag: []
            },   
            spell_holy_holysmite: {
                name: '惩击',
                max: 15,
                iconSrc: "./icons/spell/priest/spell_holy_holysmite.jpg",
                quality: 1,
                level: [{
                        des: '惩击一个敌人，造成法术强度*0.8点神圣伤害',
                        trueDmg: { AP: 0.8 },
                        cost: { MP: 150, },
                    }
                ],
                tag: []
            },   
            spell_shadow_demonicfortitude: {
                name: '暗言术：灭',
                max: 15,
                iconSrc: "./icons/spell/priest/spell_shadow_demonicfortitude.jpg",
                quality: 1,
                level: [{
                        des: '黑暗的咒语，对目标造成法术强度*0.85点魔法伤害, 对生命值低于50%的目标所造成的伤害提高250%。如果目标没有被暗言术：灭消灭，则施法者会受到等量的伤害',
                        apDmg: { AP: 0.85 },
                        cost: { MP: 100, },
                    }
                ],
                tag: []
            },   
            spell_holy_powerwordbarrier: {
                name: '真言术：障',
                max: 30,
                iconSrc: "./icons/spell/priest/spell_holy_powerwordbarrier.jpg",
                quality: 1,
                level: [{
                        des: '召唤一道神圣的屏障，降低受到的所有伤害25%。持续10秒',
                        effect: {spell_holy_powerwordbarrier: {stack: 10, chance: 100, target: 'self'},},
                        cost: { MP: 100, },
                    }
                ],
                tag: []
            },  
            ability_priest_silence: {
                name: '沉默',
                max: 20,
                iconSrc: "./icons/spell/priest/ability_priest_silence.jpg",
                quality: 1,
                level: [{
                        des: '施加3层沉默，使目标无法使用任何技能',
                        effect: {silence: {stack: 3, chance: 100, target: 'enemy'},},
                        cost: { MP: 25, },
                    }, {
                        des: '施加4层沉默，使目标无法使用任何技能',
                        effect: {silence: {stack: 4, chance: 100, target: 'enemy'},},
                        cost: { MP: 25, },
                    }, {
                        des: '施加5层沉默，使目标无法使用任何技能',
                        effect: {silence: {stack: 5, chance: 100, target: 'enemy'},},
                        cost: { MP: 25, },
                    }
                ],
                tag: ['DEBUFF']
            }, 
            ability_priest_flashoflight: {
                name: '真言术：慰',
                max: 20,
                iconSrc: "./icons/spell/priest/ability_priest_flashoflight.jpg",
                quality: 1,
                level: [{
                        des: '以天堂之力攻击一名敌人，造成法术强度*0.8的魔法伤害，同时为你恢复5%的最大法力值',
                        apDmg: { AP: 0.8 },
                        cost: { MP: 10, },
                    }, {
                        des: '以天堂之力攻击一名敌人，造成法术强度*0.8的魔法伤害，同时为你恢复10%的最大法力值',
                        apDmg: { AP: 0.8 },
                        cost: { MP: 20, },
                    }
                ],
                tag: []
            }, 
            spell_nature_nullifydisease: {
                name: '魔法夺取',
                max: 40,
                iconSrc: "./icons/spell/priest/spell_nature_nullifydisease.jpg",
                quality: 1,
                level: [{
                        des: '夺取敌方目标身上的2个增益魔法效果',
                        cost: { MP: 150, },
                    }, {
                        des: '夺取敌方目标身上的3个增益魔法效果',
                        cost: { MP: 150, },
                    }, {
                        des: '夺取敌方目标身上的4个增益魔法效果',
                        cost: { MP: 150, },
                    }
                ],
                tag: []
            }, 
            spell_holy_persuitofjustice: {
                name: '圣言术：静',
                max: 50,
                iconSrc: "./icons/spell/priest/spell_holy_persuitofjustice.jpg",
                quality: 1,
                level: [{
                        des: '施展神迹，恢复最大生命值*0.5点生命值，溢出值将转为护盾, 持续20秒',
                        heal: { MAXHP: 0.5 },
                        duration: { time: 20 },
                        cost: { MP: 300, },
                    }
                ],
                tag: []
            }, 
            // 怪物专用技能
            spell_magic_polymorphpig: {
                name: '愤怒之气', max: 100, iconSrc: "", quality: 1,
                level: [{
                        des: '提升20%攻击力, 20%法伤，20%暴击率，持续20秒',
                        effect: {spell_magic_polymorphpig: {stack: 20, chance: 100, target: 'self'},},
                        cost: { MP: 20, },
                    }
                ],
                tag: []
            },  
            ability_hunter_pet_boar: {
                name: '头槌', max: 100, iconSrc: "", quality: 1,
                level: [{
                        des: '向一名敌人冲锋，造成攻击力*1.2点伤害，有20%眩晕目标',
                        adDmg: { ATK: 1.2 },
                        effect: {stun: {stack: 1, chance: 20, target: 'enemy'},},
                        cost: { MP: 20, },
                    }
                ],
                tag: []
            },    
            ability_druid_berserk: {
                name: '狂暴', max: 100, iconSrc: "", quality: 1,
                level: [{
                        des: '提升50%攻击力，50%暴击率，持续6秒',
                        effect: {ability_druid_berserk: {stack: 6, chance: 100, target: 'self'},},
                        cost: { MP: 20, },
                    }
                ],
                tag: []
            },  
            spell_shadow_vampiricaura: {
                name: '穿刺护甲', max: 100, iconSrc: "", quality: 1,
                level: [{
                        des: '造成攻击力*0.8点伤害，使敌人的护甲降低50%，持续10秒',
                        adDmg: { ATK: 0.8 },
                        statBuff: [
                            {type: 'DEF', valType: 'DEF', value: -0.5, stack:10, chance: 100, target: 'enemy', valSource: 'enemy', buffGroup: 'spell_shadow_vampiricaura'},
                        ],
                        cost: { MP: 20, },
                    }
                ],
                tag: []
            },  
            poison_arrow: {
                name: '毒箭', max: 20, iconSrc: "", quality: 1,
                level: [{
                        des: '附加30层中毒效果',
                        effect: {poison: {stack: 30, chance: 100, target: 'enemy'},},
                        cost: { MP: 25, },
                    }
                ],
                tag: ['DEBUFF']
            }, 
            fireflask: {
                name: '火焰瓶', max: 20, iconSrc: "", quality: 1,
                level: [{
                        des: '附加10层灼伤效果',
                        effect: {burn: {stack: 10, chance: 100, target: 'enemy'},},
                        cost: { MP: 25, },
                    }
                ],
                tag: ['DEBUFF']
            }, 
            headbutt: {
                name: '头槌', max: 100, iconSrc: "", quality: 1,
                level: [{
                        des: '打击目标头部，造成99点物理伤害，有95%眩晕目标一回合',
                        adDmg: { FIX: 99 },
                        effect: {stun: {stack: 1, chance: 95, target: 'enemy'},},
                        cost: { MP: 20, },
                    }
                ],
                tag: []
            }, 
            spell_frost_frostward: {
                name: '河爪烙印', max: 100, iconSrc: "", quality: 1,
                level: [{
                        des: '每秒对目标造成攻击力*0.2点魔法伤害，持续10秒',
                        apDmg: { ATK: 0.2 },
                        cost: { MP: 20, },
                    }
                ],
                tag: []
            }, 
            ability_ghoulfrenzy: {
                name: '痛击', max: 100, iconSrc: "", quality: 1,
                level: [{
                        des: '对目标连续造成1-4次普通攻击，每次造成攻击力*0.5到攻击力*1点物理伤害',
                        adDmg: { ATK: 1.25 },
                        cost: { MP: 20, },
                    }
                ],
                tag: []
            }, 
            inv_misc_food_meat_raw_04: {
                name: '恢复', max: 100, iconSrc: "", quality: 1,
                level: [{
                        des: '每3秒恢复2%最大生命值，持续12秒',
                        heal: { MAXHP: 0.02 },
                        cost: { MP: 20, },
                    }
                ],
                tag: []
            }, 
            ability_vehicle_shellshieldgenerator: {
                name: '防护之壳', max: 100, iconSrc: "", quality: 1,
                level: [{
                        des: '获得护甲*0.1点护盾, 持续10秒',
                        duration: { time: 10 },
                        cost: { MP: 20, },
                    }
                ],
                tag: []
            }, 
            ability_creature_disease_01: {
                name: '血盆大口', max: 100, iconSrc: "", quality: 1,
                level: [{
                        des: '造成当前生命值*0.15点物理伤害，并有50%附带四层疾病，使目标治疗效果降低50%',
                        adDmg: { CURHP: 0.15 },
                        effect: {plague: {stack: 4, chance: 50, target: 'enemy'},},
                        cost: { MP: 20, },
                    }
                ],
                tag: []
            }, 
            spell_nature_skinofearth: {
                name: '硬化', max: 100, iconSrc: "", quality: 1,
                level: [{
                        des: '受到的最终伤害降低10%，持续15秒',
                        effect: {spell_nature_skinofearth: {stack: 15, chance: 100, target: 'self'},},
                        cost: { MP: 20, },
                    }
                ],
                tag: []
            }, 
            spell_fire_flameblades: {
                name: '熔岩之弧', max: 100, iconSrc: "", quality: 1,
                level: [{
                        des: '造成1000点魔法伤害并有50%附带5层灼伤，在接下来六秒内每两秒造成200点魔法伤害',
                        apDmg: { FIX: 1000 },
                        effect: {burn: {stack: 5, chance: 50, target: 'enemy'},},
                        cost: { MP: 20, },
                    }
                ],
                tag: []
            }, 
            inv_spiritshard_01: {
                name: '石肤', max: 100, iconSrc: "", quality: 1,
                level: [{
                        des: '获得最大生命值*0.3点护盾，持续20秒, 护甲被破坏后获得5层易伤',
                        duration: { time: 20 },
                        cost: { MP: 20, },
                    }
                ],
                tag: []
            }, 
            spell_fire_immolation: {
                name: '火焰护盾', max: 100, iconSrc: "", quality: 1,
                level: [{
                        des: '获得最大生命值*0.3点护盾，持续20秒，护甲持续期间，受到物理伤害时对伤害来源造成150点魔法伤害',
                        effect: {spell_fire_immolation: {stack: 1, chance: 100, target: 'self'},},
                        duration: { time: 10 },
                        cost: { MP: 20, },
                    }
                ],
                tag: []
            }, 
            sha_spell_fire_bluehellfire_nightmare: {
                name: '碎裂心智', max: 100, iconSrc: "", quality: 1,
                level: [{
                        des: '造成1000点魔法伤害，并附加一层碎裂心智，目标每有一层碎裂心智，受到碎裂心智的伤害提升5%',
                        apDmg: { FIX: 1000 },
                        effect: {sha_spell_fire_bluehellfire_nightmare: {stack: 1, chance: 100, target: 'enemy'},},
                        cost: { MP: 20, },
                    }
                ],
                tag: []
            }, 
            // archive
            // 德鲁伊
            
            // ability_druid_maul: {
            //     name: '槌击',
            //     max: 10,
            //     iconSrc: "./icons/spell/ability_druid_maul.jpg",
            //     quality: 1,
            //     level: [{
            //             des: '造成攻击*1+力量*1点伤害',
            //             adDmg: { ATK:1, STR: 1 },
            //             cost: { MP: 100, },
            //         }, {
            //             des: '造成攻击*1+力量*2点伤害',
            //             adDmg: { ATK:1, STR: 2 },
            //             cost: { MP: 150, },
            //         }, {
            //             des: '造成攻击*1+力量*3点伤害',
            //             adDmg: { ATK:1, STR: 3 },
            //             cost: { MP: 200, },
            //         }, {
            //             des: '造成攻击*1+力量*4点伤害',
            //             adDmg: { ATK:1, STR: 4 },
            //             cost: { MP: 250, },
            //         }
            //     ],
            //     tag: ['攻击', '力量']
            // },
            // spell_holy_powerwordshield: {
            //     name: '圣佑术',
            //     max: 40,
            //     iconSrc: "./icons/spell/spell_holy_powerwordshield.jpg",
            //     quality: 2,
            //     level: [{
            //             des: '获得两层虚无效果',
            //             adDmg: {},
            //             apDmg: {},
            //             effect: { void: {stack: 2, chance: 100, target: 'self'} },
            //             cost: { MP: 400, },
            //         }, {
            //             des: '获得三层虚无效果',
            //             adDmg: {},
            //             apDmg: {},
            //             effect: { void: {stack: 3, chance: 100, target: 'self'} },
            //             cost: { MP: 1000, },
            //         }
            //     ],

            //     tag: ['BUFF']
            // },
            // spell_animabastion_buff: {
            //     name: '灵感',
            //     max: 30,
            //     iconSrc: "./icons/spell/spell_animabastion_buff.jpg",
            //     quality: 2,
            //     level: [{
            //             des: '恢复最大魔法值*0.5点生命值, 100%获得一层蓄力效果',
            //             adDmg: {},
            //             apDmg: {},
            //             heal: { MAXMP: 0.5 },
            //             cost: { MP: 0, },
            //         }, {
            //             des: '恢复最大魔法值*0.7点生命值, 100%获得一层蓄力效果',
            //             adDmg: {},
            //             apDmg: {},
            //             heal: { MAXMP: 0.7 },
            //             cost: { MP: 0, },
            //         }
            //     ],
            //     tag: ['魔法', '恢复', 'BUFF']
            // },
            // spell_animaardenweald_orb: {
            //     name: '法夜祝福',
            //     max: 20,
            //     iconSrc: "./icons/spell/spell_animaardenweald_orb.jpg",
            //     quality: 2,
            //     level: [{
            //             des: '获得两层吸蓝效果',
            //             adDmg: {},
            //             apDmg: {},
            //             effect: { manasteal: {stack: 2, chance: 100, target: 'self'} },
            //             cost: { MP: 50, },
            //         }, {
            //             des: '获得三层吸蓝效果',
            //             adDmg: {},
            //             apDmg: {},
            //             effect: { manasteal: {stack: 3, chance: 100, target: 'self'} },
            //             cost: { MP: 100, },
            //         }
            //     ],

            //     tag: ['BUFF']
            // },
            // spell_shadow_curseofmannoroth: {
            //     name: '残废术',
            //     max: 25,
            //     iconSrc: "./icons/spell/spell_shadow_curseofmannoroth.jpg",
            //     quality: 3,
            //     level: [{
            //             des: '造成攻击力*0.8点伤害, 50%对敌人附加一层虚弱效果',
            //             adDmg: { ATK: 0.8},
            //             apDmg: {},
            //             effect: { weak: {stack: 1, chance: 50, target: 'enemy'} },
            //             cost: { MP: 100, },
            //         }, {
            //             des: '造成攻击力*0.9点伤害, 50%对敌人附加一层虚弱效果',
            //             adDmg: { ATK: 0.9},
            //             apDmg: {},
            //             effect: { weak: {stack: 1, chance: 50, target: 'enemy'} },
            //             cost: { MP: 200, },
            //         }, {
            //             des: '造成攻击力*1点伤害, 50%对敌人附加一层虚弱效果',
            //             adDmg: { ATK: 1},
            //             apDmg: {},
            //             effect: { weak: {stack: 1, chance: 50, target: 'enemy'} },
            //             cost: { MP: 300, },
            //         }, {
            //             des: '造成攻击力*1.1点伤害, 50%对敌人附加一层虚弱效果',
            //             adDmg: { ATK: 1.1},
            //             apDmg: {},
            //             effect: { weak: {stack: 1, chance: 50, target: 'enemy'} },
            //             cost: { MP: 400, },
            //         }
            //     ],
            //     tag: ['攻击力', 'DEBUFF']
            // },
            // spell_animaardenweald_groundstate: {
            //     name: '冥想',
            //     max: 20,
            //     iconSrc: "./icons/spell/spell_animaardenweald_groundstate.jpg",
            //     quality: 2,
            //     level: [{
            //             des: '获得一层吸蓝效果和一层蓄力效果',
            //             adDmg: {},
            //             apDmg: {},
            //             effect: { manasteal: {stack: 1, chance: 100, target: 'self'},
            //                     charge: {stack: 1, chance: 100, target: 'self'} },
            //             cost: { MP: 0, },
            //         }, {
            //             des: '获得两层吸蓝效果和一层蓄力效果',
            //             adDmg: {},
            //             apDmg: {},
            //             effect: { manasteal: {stack: 2, chance: 100, target: 'self'},
            //                     charge: {stack: 1, chance: 100, target: 'self'} },
            //             cost: { MP: 0, },
            //         }, {
            //             des: '获得两层吸蓝效果和两层蓄力效果',
            //             adDmg: {},
            //             apDmg: {},
            //             effect: { manasteal: {stack: 2, chance: 100, target: 'self'},
            //                     charge: {stack: 2, chance: 100, target: 'self'} },
            //             cost: { MP: 0, },
            //         }
            //     ],
            //     tag: ['BUFF']
            // },
            // spell_shadow_ritualofsacrifice: {
            //     name: '影袭',
            //     max: 20,
            //     iconSrc: "./icons/spell/spell_shadow_ritualofsacrifice.jpg",
            //     quality: 1,
            //     level: [{
            //             des: '造成攻击力*0.8+敏捷*10点伤害',
            //             adDmg: { ATK:0.8, AGI: 10, },
            //             cost: { MP: 175, },
            //         }, {
            //             des: '造成攻击力*0.9+敏捷*12点伤害',
            //             adDmg: { ATK:0.9, AGI: 12, },
            //             cost: { MP: 250, },
            //         }, {
            //             des: '造成攻击力*1+敏捷*15点伤害',
            //             adDmg: { ATK:1, AGI: 15, },
            //             cost: { MP: 350, },
            //         }
            //     ],
            //     tag: ['攻击', '敏捷']
            // },
            // spell_warlock_soulburn: {
            //     name: '勾魂',
            //     max: 50,
            //     iconSrc: "./icons/spell/spell_warlock_soulburn.jpg",
            //     quality: 1,
            //     level: [{
            //             des: '造成最大生命值*0.8点伤害',
            //             adDmg: { MAXHP: 0.8 },
            //             cost: { MAXHP: 0.1, },
            //         }, {
            //             des: '造成最大生命值*0.9点伤害',
            //             adDmg: { MAXHP: 0.9 },
            //             cost: { MAXHP: 0.1, },
            //         }
            //     ],
            //     tag: ['生命']
            // },
            // spell_nature_lightning: {
            //     name: '闪电箭',
            //     max: 25,
            //     iconSrc: "./icons/spell/spell_nature_lightning.jpg",
            //     quality: 2,
            //     level: [{
            //             des: '造成50+智力*10点伤害。',
            //             adDmg: { FIX: 5000, INT: 10, },
            //             cost: { MP: 50, },
            //         }, {
            //             des: '造成300+智力*12点伤害。',
            //             adDmg: { FIX: 30000, INT: 12, },
            //             cost: { MP: 150, },
            //         }, {
            //             des: '造成1000+智力*15点伤害。',
            //             adDmg: { FIX: 1000, INT: 15, },
            //             cost: { MP: 450, },
            //         }
            //     ],
            //     tag: ['智力']
            // },
            // spell_shadow_deathcoil: {
            //     name: '凋零缠绕',
            //     max: 60,
            //     iconSrc: "./icons/spell/spell_shadow_deathcoil.jpg",
            //     quality: 3,
            //     level: [{
            //             des: '造成当前生命值*10点伤害, 50%获得一层吸收效果',
            //             adDmg: {CURHP: 10},
            //             effect: { absorb: {stack: 1, chance: 50, target: 'self'}},
            //             cost: { MP: 500, },
            //         }, {
            //             des: '造成当前生命值*10点伤害, 50%获得一层吸收效果',
            //             adDmg: {CURHP: 10},
            //             effect: { absorb: {stack: 1, chance: 50, target: 'self'}},
            //             cost: { MP: 1000, },
            //         }
            //     ],
            //     tag: ['生命', 'BUFF']
            // },
            // ability_rogue_shadowstrike: {
            //     name: '裂缝打击',
            //     max: 75,
            //     iconSrc: "./icons/spell/ability_rogue_shadowstrike.jpg",
            //     quality: 4,
            //     level: [{
            //             des: '造成攻击力*1+敏捷*3点伤害, 50%获得一层穿透效果',
            //             adDmg: { ATK: 1, AGI: 3},
            //             effect: { penetrate: {stack: 1, chance: 50, target: 'self'}},
            //             cost: { MP: 100, },
            //         }, {
            //             des: '造成攻击力*1.1+敏捷*5点伤害, 50%获得一层穿透效果',
            //             adDmg: { ATK: 1.1, AGI: 5},
            //             effect: { penetrate: {stack: 1, chance: 50, target: 'self'}},
            //             cost: { MP: 200, },
            //         }, {
            //             des: '造成攻击力*1.2+敏捷*7点伤害, 50%获得一层穿透效果',
            //             adDmg: { ATK: 1.2, AGI: 7},
            //             effect: { penetrate: {stack: 1, chance: 50, target: 'self'}},
            //             cost: { MP: 300, },
            //         }, {
            //             des: '造成攻击力*1.3+敏捷*9点伤害, 50%获得一层穿透效果',
            //             adDmg: { ATK: 1.3, AGI: 9},
            //             effect: { penetrate: {stack: 1, chance: 50, target: 'self'}},
            //             cost: { MP: 400, },
            //         }
            //     ],
            //     tag: ['攻击力', '敏捷', 'BUFF']
            // },
            // spell_holy_innerfire: {
            //     name: '心灵之火',
            //     max: 35,
            //     iconSrc: "./icons/spell/spell_holy_innerfire.jpg",
            //     quality: 4,
            //     level: [{
            //             des: '获得一层虚无效果和一层蓄力效果',
            //             adDmg: {},
            //             apDmg: {},
            //             effect: { void: {stack: 1, chance: 100, target: 'self'},
            //                     charge: {stack: 1, chance: 100, target: 'self'} },
            //             cost: { MP: 50, },
            //         }, {
            //             des: '获得两层虚无效果和一层蓄力效果',
            //             adDmg: {},
            //             apDmg: {},
            //             effect: { void: {stack: 2, chance: 100, target: 'self'},
            //                     charge: {stack: 1, chance: 100, target: 'self'} },
            //             cost: { MP: 100, },
            //         }, {
            //             des: '获得三层虚无效果和一层蓄力效果',
            //             adDmg: {},
            //             apDmg: {},
            //             effect: { void: {stack: 3, chance: 100, target: 'self'},
            //                     charge: {stack: 1, chance: 100, target: 'self'} },
            //             cost: { MP: 150, },
            //         }
            //     ],

            // //     tag: ['BUFF']
            // // },
            // spell_holy_layonhands: {
            //     name: '圣疗术',
            //     max: 85,
            //     iconSrc: "./icons/spell/spell_holy_layonhands.jpg",
            //     quality: 4,
            //     level: [{
            //             des: '恢复自身所有生命值',
            //             adDmg: {},
            //             apDmg: {},
            //             heal: { MAXHP: 1 },
            //             cost: { CURMP: 1, },
            //         }, {
            //             des: '恢复自身所有生命值',
            //             adDmg: {},
            //             apDmg: {},
            //             heal: { MAXHP: 1 },
            //             cost: { CURMP: 0.9, },
            //         }
            //     ],
            //     tag: ['恢复']
            // },
            // spell_holy_holybolt: {
            //     name: '圣光术',
            //     max: 30,
            //     iconSrc: "./icons/spell/spell_holy_holybolt.jpg",
            //     quality: 2,
            //     level: [{
            //             des: '恢复自身1000+10%最大生命值',
            //             adDmg: {},
            //             apDmg: {},
            //             heal: { FIX: 1000, MAXHP: 0.1 },
            //             cost: { MP: 100, },
            //         }, {
            //             des: '恢复自身2000+12%最大生命值',
            //             adDmg: {},
            //             apDmg: {},
            //             heal: { FIX: 2000, MAXHP: 0.12 },
            //             cost: { MP: 200, },
            //         }, {
            //             des: '恢复自身3000+15%最大生命值',
            //             adDmg: {},
            //             apDmg: {},
            //             heal: { FIX: 3000, MAXHP: 0.15 },
            //             cost: { MP: 300, },
            //         }, {
            //             des: '恢复自身4000+17%最大生命值',
            //             adDmg: {},
            //             apDmg: {},
            //             heal: { FIX: 4000, MAXHP: 0.17 },
            //             cost: { MP: 400, },
            //         }
            //     ],
            //     tag: ['生命', '恢复']
            // },
            // ability_druid_starfall: {
            //     name: '无尽之星',
            //     max: 20,
            //     iconSrc: "./icons/spell/ability_druid_starfall.jpg",
            //     quality: 5,
            //     level: [{
            //             des: '造成当前魔法值*6点伤害',
            //             adDmg: { CURMP: 6 },
            //             cost: { MAXMP: 1, },
            //         }, {
            //             des: '造成当前魔法值*8点伤害',
            //             adDmg: { CURMP: 8 },
            //             cost: { MAXMP: 1, },
            //         }, {
            //             des: '造成当前魔法值*10点伤害',
            //             adDmg: { CURMP: 10 },
            //             cost: { MAXMP: 1, },
            //         }
            //     ],
            //     tag: ['魔法']
            // },
            // warrior_talent_icon_innerrage: {
            //     name: '鲁莽',
            //     max: 90,
            //     iconSrc: "./icons/spell/warrior_talent_icon_innerrage.jpg",
            //     quality: 5,
            //     level: [{
            //             des: '获得一层破甲、穿透、吸血、蓄力',
            //             adDmg: {},
            //             apDmg: {},
            //             effect: {sunder: {stack: 1, chance: 100, target: 'self'},
            //                     penetrate: {stack: 1, chance: 100, target: 'self'} ,
            //                     lifesteal: {stack: 1, chance: 100, target: 'self'} ,
            //                     charge: {stack: 1, chance: 100, target: 'self'} },
            //             cost: { MAXHP: 0.1, },
            //         }, {
            //             des: '获得两层破甲、穿透、吸血、蓄力',
            //             adDmg: {},
            //             apDmg: {},
            //             effect: {sunder: {stack: 2, chance: 100, target: 'self'},
            //                     penetrate: {stack: 2, chance: 100, target: 'self'} ,
            //                     lifesteal: {stack: 2, chance: 100, target: 'self'} ,
            //                     charge: {stack: 2, chance: 100, target: 'self'} },
            //             cost: { MAXHP: 0.2, },
            //         }
            //     ],

            //     tag: ['BUFF']
            // },
            // ability_ardenweald_paladin_summer: {
            //     name: '仲夏祝福',
            //     max: 100,
            //     iconSrc: "./icons/spell/ability_ardenweald_paladin_summer.jpg",
            //     quality: 6,
            //     level: [{
            //             des: '获得一层吸血、吸蓝、蓄力、死亡免疫、虚无、吸收',
            //             adDmg: {},
            //             apDmg: {},
            //             effect: {lifesteal: {stack: 1, chance: 100, target: 'self'},
            //                     manasteal: {stack: 1, chance: 100, target: 'self'} ,
            //                     charge: {stack: 1, chance: 100, target: 'self'} ,
            //                     deathImmune: {stack: 1, chance: 100, target: 'self'},
            //                     void: {stack: 1, chance: 100, target: 'self'} ,
            //                     absorb: {stack: 1, chance: 100, target: 'self'},  },
            //             cost: { },
            //         }, {
            //             des: '获得一层吸血、吸蓝、蓄力、死亡免疫、虚无、吸收',
            //             adDmg: {},
            //             apDmg: {},
            //             effect: {lifesteal: {stack: 1, chance: 100, target: 'self'},
            //                     manasteal: {stack: 1, chance: 100, target: 'self'} ,
            //                     charge: {stack: 1, chance: 100, target: 'self'} ,
            //                     deathImmune: {stack: 1, chance: 100, target: 'self'},
            //                     void: {stack: 1, chance: 100, target: 'self'} ,
            //                     absorb: {stack: 1, chance: 100, target: 'self'}, },
            //             cost: { },
            //         }
            //     ],
            //     tag: ['BUFF']
            // },
        }
    }
},
}