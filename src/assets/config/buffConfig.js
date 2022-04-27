export const buffConfig = {
data() {
    return {
        buffCateg: {
            buffer: ['sunder', 'penetrate', 'lifesteal', 'manasteal','charge','deathImmune','void','absorb','hell','focus'],
            timed: ['minionSlayer'],
            onTick: ['burn']
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
                    desc: "破甲: 下一次攻击无视目标25%护甲"
                },
                penetrate: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/penetrate.jpg",
                    desc: "穿透: 下一次攻击伤害的10%无视护甲"
                },
                lifesteal: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/lifesteal.jpg",
                    desc: "吸血: 下一次攻击恢复攻击造成的伤害的50%点生命值"
                },
                manasteal: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/manasteal.jpg",
                    desc: "吸蓝: 下一次攻击恢复攻击造成的伤害的10%点魔法值"
                },
                charge: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/charge.jpg",
                    desc: "蓄力: 下一次攻击的伤害提升50%"
                },
                deathImmune: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/deathImmune.jpg",
                    desc: "死亡免疫: 免疫一次会造成角色死亡的伤害"
                },
                focus: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/mage/spell_shadow_manaburn.jpg",
                    desc: "专注: 下一个技能不消耗任何魔法值"
                },
                void: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/void.jpg",
                    desc: "虚无: 免疫一次伤害"
                },
                absorb: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/absorb.jpg",
                    desc: "吸收: 将下一次受到的伤害转为等量生命值"
                },
                block: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/absorb.jpg",
                    desc: "格挡: 免疫下一次受到的攻击伤害"
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
                    desc: "野怪杀手【分钟】: 对冒险区非精英、BOSS类怪物额外造成50%伤害"
                },
                avatar: {
                    timed: true,
                    iconSrc: "./icons/spell/ability_racial_avatar.jpg",
                    desc: "天神下凡【分钟】: 对冒险区非精英、BOSS类怪物额外造成50%伤害"
                }
            },
            statusDebuff: {
                stun: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/stun.jpg",
                    desc: "眩晕: 跳过一次攻击回合"
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
                    desc: "灼伤: 每秒受到0.5%最大生命值点魔法伤害"
                },
                bleed: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/bleed.jpg",
                    desc: "流血: "
                },
                poison: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/poison.jpg",
                    desc: "中毒: "
                },
                weak: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/buff/weak.jpg",
                    desc: "虚弱: 每一层使造成的伤害降低3%, 上限30%"
                },
                // 需要图标
                // vulnerable: {
                //     cleanse: true,
                //     stacked: true,
                //     iconSrc: "./icons/spell/weak.jpg",
                //     desc: "易伤: 受到的伤害提升20%"
                // }
            },
        },
    }
},
}