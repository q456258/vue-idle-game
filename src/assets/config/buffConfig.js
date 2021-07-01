export const buffConfig = {
data() {
    return {
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
                    iconSrc: "./icons/spell/sunder.png",
                    desc: "破甲：下一次攻击无视目标25%护甲"
                },
                penetrate: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/penetrate.png",
                    desc: "穿透：下一次攻击伤害的10%无视护甲"
                },
                lifesteal: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/lifesteal.png",
                    desc: "吸血：下一次攻击恢复攻击造成的伤害的50%点生命值"
                },
                manasteal: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/manasteal.png",
                    desc: "吸蓝：下一次攻击恢复攻击造成的伤害的10%点魔法值"
                },
                charge: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/charge.png",
                    desc: "蓄力：下一次攻击的伤害提升50%"
                },
                deathImmune: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/deathImmune.png",
                    desc: "死亡免疫：免疫一次会造成角色死亡的伤害"
                },
                void: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/void.png",
                    desc: "虚无：免疫一次伤害"
                },
                absorb: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/absorb.png",
                    desc: "吸收：将下一次受到的伤害转为等量生命值"
                },
                block: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/absorb.png",
                    desc: "格挡：免疫下一次受到的攻击伤害"
                },
                elementAffinity: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/absorb.png",
                    desc: "元素亲和：免疫下一次受到的元素伤害"
                },
                forceOfNature: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/absorb.png",
                    desc: "自然之力：下一次造成的元素伤害翻倍"
                },
                minionSlayer: {
                    timed: true,
                    iconSrc: "./icons/item/inv_potion_27.png",
                    desc: "野怪杀手【分钟】：对冒险区非精英、BOSS类怪物额外造成50%伤害"
                }
            },
            statusDebuff: {
                stun: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/stun.png",
                    desc: "眩晕：跳过一次攻击回合"
                },
                bleed: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/bleed.png",
                    desc: "流血："
                },
                poison: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/poison.png",
                    desc: "中毒："
                },
                weak: {
                    cleanse: true,
                    stacked: true,
                    iconSrc: "./icons/spell/weak.png",
                    desc: "虚弱：造成的伤害降低50%"
                }
            },
        },
    }
},
}