export const buffConfig = {
data() {
    return {
        buffCateg: {
            buffer: ['sunder', 'penetrate', 'lifesteal', 'manasteal','charge','deathImmune','void','absorb','hell','focus','arcCharge'],
            timed: ['minionSlayer','spell_holy_wordfortitude','manaShield','silence','icenova','plague','spell_holy_powerwordbarrier','spell_frost_coldhearted',
                'spell_fire_sealoffire','spell_holy_innerfire','spell_holy_innerfire2','spell_holy_innerfire3','spell_holy_testoffaith','spell_magic_polymorphpig',
                'ability_druid_berserk','spell_nature_skinofearth'
            ],
            onTick: ['burn', 'poison'],
            counter: ['icenova']
        },
        buffStatBonus: {
            spell_holy_wordfortitude: [{type: 'STAP', valType: 'FIX', value: 5, stack:3600, chance: 100, target: 'self', buffGroup: 'spell_holy_wordfortitude'}],
            spell_frost_coldhearted: [
                {type: 'HASTE', valType: 'FIX', value: 30, stack:20, chance: 100, target: 'self', buffGroup: 'spell_frost_coldhearted'},
            ],
            spell_fire_sealoffire:  [
                {type: 'APCRIT', valType: 'FIX', value: 101, stack:10, chance: 100, target: 'self', buffGroup: 'spell_fire_sealoffire'},
            ],
            spell_holy_innerfire: [
                {type: 'ATK', valType: 'ATK', value: 0.1, stack:30, chance: 100, target: 'self', buffGroup: 'spell_holy_innerfire_atk'},
                {type: 'AP', valType: 'AP', value: 0.1, stack:30, chance: 100, target: 'self', buffGroup: 'spell_holy_innerfire_ap'},
                {type: 'DEF', valType: 'FIX', value: 500, stack:30, chance: 100, target: 'self', buffGroup: 'spell_holy_innerfire_def'},
            ],
            spell_holy_innerfire2: [
                {type: 'ATK', valType: 'ATK', value: 0.12, stack:30, chance: 100, target: 'self', buffGroup: 'spell_holy_innerfire_atk'},
                {type: 'AP', valType: 'AP', value: 0.12, stack:30, chance: 100, target: 'self', buffGroup: 'spell_holy_innerfire_ap'},
                {type: 'DEF', valType: 'FIX', value: 750, stack:30, chance: 100, target: 'self', buffGroup: 'spell_holy_innerfire_def'},
            ],
            spell_holy_innerfire3: [
                {type: 'ATK', valType: 'ATK', value: 0.14, stack:30, chance: 100, target: 'self', buffGroup: 'spell_holy_innerfire_atk'},
                {type: 'AP', valType: 'AP', value: 0.14, stack:30, chance: 100, target: 'self', buffGroup: 'spell_holy_innerfire_ap'},
                {type: 'DEF', valType: 'FIX', value: 1000, stack:30, chance: 100, target: 'self', buffGroup: 'spell_holy_innerfire_def'},
            ],
            spell_holy_testoffaith: [
                {type: 'MAXHP', valType: 'MAXHP', value: 0.25, stack:30, chance: 100, target: 'self', buffGroup: 'spell_holy_testoffaith'},
            ],
            spell_magic_polymorphpig: [
                {type: 'ATK', valType: 'ATK', value: 0.2, stack:20, chance: 100, target: 'self', buffGroup: 'spell_magic_polymorphpig_atk'},
                {type: 'AP', valType: 'AP', value: 0.2, stack:20, chance: 100, target: 'self', buffGroup: 'spell_magic_polymorphpig_ap'},
                {type: 'CRIT', valType: 'FIX', value: 20, stack:20, chance: 100, target: 'self', buffGroup: 'spell_magic_polymorphpig_crit'},
            ],
            ability_druid_berserk: [
                {type: 'ATK', valType: 'ATK', value: 0.5, stack:6, chance: 100, target: 'self', buffGroup: 'ability_druid_berserk_atk'},
                {type: 'CRIT', valType: 'FIX', value: 50, stack:6, chance: 100, target: 'self', buffGroup: 'ability_druid_berserk_crit'},
            ],
        },
        buffType: {
            buff: {
                ATK: {
                    effect: { ATK: 0 },
                    cleanse: true,
                    timed: true,
                }
            },
            debuff: {
                ATK: {
                    effect: { ATK: 0 },
                    cleanse: true,
                    timed: true,
                }
            },
            // 破甲、穿透、吸血、吸蓝、蓄力、死亡免疫、虚无、吸收、格挡、元素亲和、自然之力
            // 无视部分护甲、部分伤害无视护甲、吸血、吸蓝、提升最终伤害、抵消一次死亡、免疫一次攻击伤害、将伤害转为治疗、降低受到的元素伤害、提升造成的元素伤害

            // 眩晕、流血、中毒、虚弱
            // 跳过回合、攻击掉血、每秒掉血、降低最终伤害
            statusBuff: {
                sunder: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/stat/sunder.jpg",
                    desc: "破甲: 下一次攻击无视目标25%护甲",
                    turnbased: true
                },
                penetrate: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/penetrate.jpg",
                    desc: "穿透: 下一次攻击伤害的10%无视护甲",
                    turnbased: true
                },
                lifesteal: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/lifesteal.jpg",
                    desc: "吸血: 下一次攻击恢复攻击造成的伤害的50%点生命值",
                    turnbased: true
                },
                manasteal: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/manasteal.jpg",
                    desc: "吸蓝: 下一次攻击恢复攻击造成的伤害的10%点魔法值",
                    turnbased: true
                },
                charge: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/charge.jpg",
                    desc: "蓄力: 下一次攻击的伤害提升50%",
                    turnbased: true
                },
                deathImmune: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/deathImmune.jpg",
                    desc: "死亡免疫: 免疫一次会造成角色死亡的伤害",
                    turnbased: true
                },
                focus: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/mage/spell_shadow_manaburn.jpg",
                    desc: "专注: 下一个技能不消耗任何魔法值",
                    turnbased: true
                },
                arcCharge: {
                    cleanse: false,
                    stacked: true,
                    iconSrc: "./icons/spell/mage/spell_arcane_arcane01.jpg",
                    desc: "奥术充能: 加强奥术技能",
                    turnbased: true
                },
                manaShield: {
                    cleanse: false,
                    stacked: false,
                    iconSrc: "./icons/spell/mage/spell_shadow_detectlesserinvisibility.jpg",
                    desc: "法力护盾: 使用魔法值抵消受到的伤害，每点魔法值可抵消2点伤害",
                    turnbased: true
                },
                void: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/void.jpg",
                    desc: "虚无: 免疫一次伤害",
                    turnbased: true
                },
                absorb: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/absorb.jpg",
                    desc: "吸收: 将下一次受到的伤害转为等量生命值",
                    turnbased: true
                },
                block: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/absorb.jpg",
                    desc: "格挡: 免疫下一次受到的攻击伤害",
                    turnbased: true
                },
                // elementAffinity: {
                //     cleanse: true,
                //     stacked: true,
                //     iconSrc: "./icons/buff/absorb.jpg",
                //     desc: "元素亲和: 免疫下一次受到的元素伤害"
                // },
                // forceOfNature: {
                //     cleanse: true,
                //     stacked: true,
                //     iconSrc: "./icons/buff/absorb.jpg",
                //     desc: "自然之力: 下一次造成的元素伤害翻倍"
                // },
                minionSlayer: {
                    timed: true,
                    iconSrc: "./icons/item/inv_potion_27.jpg",
                    desc: "野怪杀手【分钟】: 对等级低于自身的冒险区非精英、BOSS类怪物额外造成50%伤害"
                },
                spell_holy_wordfortitude: {
                    timed: true,
                    iconSrc: "./icons/spell/priest/spell_holy_wordfortitude.jpg",
                    desc: "真言术：韧【分钟】: 提升5%耐力"
                },
                spell_holy_powerwordbarrier: {
                    timed: true,
                    iconSrc: "./icons/spell/priest/spell_holy_powerwordbarrier.jpg",
                    desc: "真言术：障: 受到的最终伤害降低25%"
                },
                spell_nature_skinofearth: {
                    timed: true,
                    iconSrc: "./icons/buff/spell_nature_skinofearth.jpg",
                    desc: "硬化: 受到的最终伤害降低10%"
                },
                avatar: {
                    timed: true,
                    iconSrc: "./icons/spell/ability_racial_avatar.jpg",
                    desc: "天神下凡【分钟】: 最终伤害提升20%"
                },
                spell_magic_polymorphpig: {
                    timed: true,
                    iconSrc: "./icons/spell/neutral/spell_magic_polymorphpig.jpg",
                    desc: '提升20%攻击力, 20%法伤，20%暴击率，持续20秒',
                }, 
                ability_druid_berserk: {
                    timed: true,
                    iconSrc: "./icons/spell/neutral/ability_druid_berserk.jpg",
                    desc: "提升50%攻击力，50%暴击率，持续6秒"
                },
                spell_frost_coldhearted: {
                    timed: true,
                    iconSrc: "./icons/spell/mage/spell_frost_coldhearted.jpg",
                    desc: '加快你的施法速度，使你的急速提高30，持续20秒',
                },
                spell_fire_sealoffire: {
                    timed: true,
                    iconSrc: "./icons/spell/mage/spell_fire_sealoffire.jpg",
                    desc: '将自身包裹在烈焰之中，短时间内使你的法术爆击几率提高100%，持续10秒',
                },            
                spell_holy_innerfire: {
                    timed: true,
                    iconSrc: "./icons/spell/priest/spell_holy_innerfire.jpg",
                    desc: '提升10%攻击力、法术强度和500护甲，持续30秒',
                },            
                spell_holy_innerfire2: {
                    timed: true,
                    iconSrc: "./icons/spell/priest/spell_holy_innerfire.jpg",
                    desc: '提升12%攻击力、法术强度和750护甲，持续30秒',
                },            
                spell_holy_innerfire3: {
                    timed: true,
                    iconSrc: "./icons/spell/priest/spell_holy_innerfire.jpg",
                    desc: '提升14%攻击力、法术强度和1000护甲，持续30秒',
                },
                spell_holy_testoffaith: {
                    timed: true,
                    iconSrc: "./icons/spell/priest/spell_holy_testoffaith.jpg",
                    desc: '使最大生命值提高25%，持续10秒。',
                },
            },
            statusDebuff: {
                stun: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/stun.jpg",
                    desc: "眩晕: 跳过一次攻击回合",
                    turnbased: true
                },
                hell: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/inv_misc_shadowegg.jpg",
                    desc: "炼狱: 每次行动减少一层, 结束时生命值低于50%直接死亡"
                },
                burn: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: './icons/spell/mage/spell_fire_fire.jpg',
                    desc: "灼伤: 每秒受到0.5%最大生命值点神圣伤害"
                },
                // bleed: {
                //     cleanse: true,
                //     stacked: true,
                //     iconSrc: "./icons/buff/bleed.jpg",
                //     desc: "流血: "
                // },
                poison: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/poison.jpg",
                    desc: "中毒: 每秒受到中毒层数点魔法伤害"
                },
                plague: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/plague.jpg",
                    desc: "疾病：受到的治疗效果降低50%"
                },
                weak: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/weak.jpg",
                    desc: "虚弱: 造成的伤害降低50%",
                    turnbased: true
                },
                silence: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/silence.jpg",
                    desc: "沉默: 无法使用普通攻击以外的技能",
                    turnbased: true
                },
                icenova: {
                    cleanse: true,
                    stacked: false,
                    iconSrc: "./icons/spell/mage/spell_mage_icenova.jpg",
                    desc: "大法师之触: buff结束时造成buff持续期间受到伤害*0.25点魔法伤害"
                },
                vulnerable: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/vulnerable.jpg",
                    desc: "易伤: 受到的伤害提升30%"
                },
                sha_spell_fire_bluehellfire_nightmare: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/sha_spell_fire_bluehellfire_nightmare.jpg",
                    desc: "碎裂心智: 每一层使受到碎裂心智的伤害提升5%",
                    turnbased: true
                },
            },
        },
    }
},
}