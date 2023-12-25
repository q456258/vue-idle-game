export const effectConfig = {
    data() {
        return {
            effectList: {
                effect1: {
                    src: "/effect/effect1.png",
                    delay: 35,
                    imgCount: 14,
                    col: 5,
                    row: 3,
                    posX: 0.75,
                    posY: 0,
                },
                // 寒冰箭
                // spell_frost_frostbolt02: {
                //     src: "/effect/spell_frost_frostbolt02.png",
                //     delay: 50,
                //     imgCount: 7,
                //     col: 2,
                //     row: 4,
                //     posX: 0.3,
                //     posY: 0.1,
                // },
                // spell_frost_frostbolt02: {
                //     src: "/effect/spell_frost_frostbolt03.png",
                //     delay: 50,
                //     imgCount: 5,
                //     col: 2,
                //     row: 3,
                //     posX: 0.3,
                //     posY: 0.55,
                // },
                spell_frost_frostbolt02: {
                    src: "/effect/spell_frost_frostbolt04.png",
                    delay: 40,
                    imgCount: 7,
                    col: 3,
                    row: 3,
                    posX: 0.2,
                    posY: 0.65,
                },
                // 雷霆一击
                spell_nature_thunderclap: {
                    src: "/effect/spell_nature_thunderclap.png",
                    delay: 35,
                    imgCount: 15,
                    col: 5,
                    row: 3,
                    posX: 0.6,
                    posY: 0.1,
                },
                // 屠杀
                inv_sword_48: {
                    src: "/effect/inv_sword_48.png",
                    delay: 25,
                    imgCount: 12,
                    col: 3,
                    row: 4,
                    posX: 0.25,
                    posY: 0.1,
                },
                // 剑刃风暴
                ability_whirlwind: {
                    src: "/effect/ability_whirlwind.png",
                    delay: 50,
                    imgCount: 10,
                    col: 3,
                    row: 4,
                    posX: -0.22,
                    posY: -0.22,
                },
                // 天神下凡
                ability_racial_avatar: {
                    src: "/effect/ability_racial_avatar.png",
                    delay: 44,
                    imgCount: 18,
                    col: 3,
                    row: 6,
                    posX: -0.15,
                    posY: -0.1,
                },
                // 盾击
                // 碎裂投掷
                ability_warrior_shatteringthrow: {
                    src: "/effect/ability_warrior_shatteringthrow.png",
                    delay: 50,
                    imgCount: 14,
                    col: 3,
                    row: 5,
                    posX: 0.3,
                    posY: 0.27,
                },
                // 十字军打击
                spell_holy_crusaderstrike: {
                    src: "/effect/spell_holy_crusaderstrike.png",
                    delay: 60,
                    imgCount: 11,
                    col: 4,
                    row: 3,
                    posX: 0.65,
                    posY: 0.05,
                },
                // 死亡嚎叫
                spell_shadow_deathscream: {
                    src: "/effect/spell_shadow_deathscream.png",
                    delay: 35,
                    imgCount: 17,
                    col: 3,
                    row: 6,
                    posX: -0.33,
                    posY: -0.45,
                },
                // 血祭
                ability_revendreth_paladin: {
                    src: "/effect/ability_revendreth_paladin2.png",
                    delay: 40,
                    imgCount: 20,
                    col: 3,
                    row: 7,
                    posX: -0.15,
                    posY: 0.05,
                },
                // ability_revendreth_paladin: {
                //     src: "/effect/ability_revendreth_paladin.png",
                //     delay: 50,
                //     imgCount: 11,
                //     col: 3,
                //     row: 4,
                //     posX: -0.35,
                //     posY: -0.75,
                // },
                // 造餐术
                // 制造法力宝石
                // 火球术
                spell_fire_flamebolt: {
                    src: "/effect/spell_fire_flamebolt.png",
                    delay: 50,
                    imgCount: 13,
                    col: 3,
                    row: 5,
                    posX: 0.3,
                    posY: 0.5,
                },
                // 暴风雪
                spell_frost_icestorm: {
                    src: "/effect/spell_frost_icestorm.png",
                    delay: 32,
                    imgCount: 24,
                    col: 3,
                    row: 8,
                    posX: 0.65,
                    posY: -0.1,
                },
                // 灼伤
                spell_fire_soulburn: {
                    src: "/effect/spell_fire_soulburn.png",
                    delay: 35,
                    imgCount: 8,
                    col: 3,
                    row: 3,
                    posX: 0.68,
                    posY: 0.38,
                },
                // 冰风暴
                ability_warlock_burningembersblue: {
                    src: "/effect/ability_warlock_burningembersblue.png",
                    delay: 50,
                    imgCount: 5,
                    col: 3,
                    row: 2,
                    posX: 0.63,
                    posY: 0,
                },
                // 炎爆术
                spell_fire_fireball02: {
                    src: "/effect/spell_fire_fireball02.png",
                    delay: 35,
                    imgCount: 20,
                    col: 3,
                    row: 7,
                    posX: 0.42,
                    posY: -0.18,
                },
                // 奥术弹幕
                ability_mage_arcanebarrage: {
                    src: "/effect/ability_mage_arcanebarrage.png",
                    delay: 13,
                    imgCount: 60,
                    col: 3,
                    row: 20,
                    posX: 0.63,
                    posY: 0.23,
                },
                // 寒冰护体
                spell_ice_lament: {
                    src: "/effect/spell_ice_lament.png",
                    delay: 60,
                    imgCount: 9,
                    col: 3,
                    row: 3,
                    posX: 0.05,
                    posY: 0.4,
                },
                // 法力护盾
                spell_shadow_detectlesserinvisibility: {
                    src: "/effect/spell_shadow_detectlesserinvisibility.png",
                    delay: 32,
                    imgCount: 31,
                    col: 3,
                    row: 11,
                    posX: 0.05,
                    posY: 0.3,
                },
                // 奥术冲击
                spell_arcane_blast: {
                    src: "/effect/spell_arcane_blast.png",
                    delay: 37,
                    imgCount: 21,
                    col: 3,
                    row: 7,
                    posX: 0.52,
                    posY: 0.15,
                },
                // 烈焰风暴
                // spell_fire_selfdestruct: {
                //     src: "/effect/spell_fire_selfdestruct.png",
                //     delay: 50,
                //     imgCount: 19,
                //     col: 3,
                //     row: 7,
                //     posX: 0.58,
                //     posY: 0.12,
                // },
                spell_fire_selfdestruct: {
                    src: "/effect/spell_fire_selfdestruct2.png",
                    delay: 40,
                    imgCount: 20,
                    col: 3,
                    row: 7,
                    posX: 0.25,
                    posY: -0.45,
                },
                // 奥术飞弹
                spell_nature_starfall: {
                    src: "/effect/spell_nature_starfall.png",
                    delay: 40,
                    imgCount: 22,
                    col: 3,
                    row: 7,
                    posX: 0.3,
                    posY: 0.4,
                },
                // 冰冷血脉
                spell_frost_coldhearted: {
                    src: "/effect/spell_frost_coldhearted.png",
                    delay: 40,
                    imgCount: 20,
                    col: 3,
                    row: 7,
                    posX: -0.02,
                    posY: 0.05,
                },
                // 急速冷却
                spell_frost_wizardmark: {
                    src: "/effect/spell_frost_wizardmark.png",
                    delay: 40,
                    imgCount: 20,
                    col: 3,
                    row: 7,
                    posX: 0.03,
                    posY: 0.25,
                },
                // 法术反制
                // spell_frost_iceshock
                // 大法师之触
                spell_mage_icenova: {
                    src: "/effect/spell_mage_icenova.png",
                    delay: 75,
                    imgCount: 11,
                    col: 3,
                    row: 4,
                    posX: 0.25,
                    posY: -0.3,
                },
                // 唤醒
                spell_nature_purge: {
                    src: "/effect/spell_nature_purge.png",
                    delay: 50,
                    imgCount: 15,
                    col: 3,
                    row: 5,
                    posX: -0.23,
                    posY: -0.21,
                },
                // 燃烧
                spell_fire_sealoffire: {
                    src: "/effect/spell_fire_sealoffire.png",
                    delay: 60,
                    imgCount: 11,
                    col: 3,
                    row: 4,
                    posX: 0.57,
                    posY: 0.17,
                },
                // 时间扭曲
                ability_mage_timewarp: {
                    src: "/effect/ability_mage_timewarp.png",
                    delay: 50,
                    imgCount: 11,
                    col: 3,
                    row: 4,
                    posX: 0,
                    posY: 0.2,
                },
                // 恢复
                spell_holy_renew: {
                    src: "/effect/spell_holy_renew.png",
                    delay: 29,
                    imgCount: 27,
                    col: 3,
                    row: 9,
                    posX: 0,
                    posY: 0.1,
                },
                // 快速治疗
                spell_holy_flashheal: {
                    src: "/effect/spell_holy_flashheal.png",
                    delay: 30,
                    imgCount: 30,
                    col: 3,
                    row: 10,
                    posX: 0.05,
                    posY: 0.3,
                },
                // 心灵之火
                spell_holy_innerfire: {
                    src: "/effect/spell_holy_innerfire.png",
                    delay: 75,
                    imgCount: 10,
                    col: 3,
                    row: 4,
                    posX: -0.02,
                    posY: 0,
                },
                // 绝望祷言
                spell_holy_testoffaith: {
                    src: "/effect/spell_holy_testoffaith.png",
                    delay: 35,
                    imgCount: 21,
                    col: 3,
                    row: 7,
                    posX: -0.07,
                    posY: 0.08,
                },
                // 心灵震爆
                spell_shadow_unholyfrenzy: {
                    src: "/effect/spell_shadow_unholyfrenzy.png",
                    delay: 14,
                    imgCount: 55,
                    col: 3,
                    row: 19,
                    posX: 0.56,
                    posY: 0.25,
                },
                // 真言术：盾
                spell_holy_powerwordshield: {
                    src: "/effect/spell_holy_powerwordshield.png",
                    delay: 40,
                    imgCount: 19,
                    col: 3,
                    row: 7,
                    posX: 0.15,
                    posY: 0.2,
                },
                // 暗影愈合
                spell_shadow_shadowmend: {
                    src: "/effect/spell_shadow_shadowmend.png",
                    delay: 50,
                    imgCount: 15,
                    col: 3,
                    row: 5,
                    posX: -0.02,
                    posY: 0.25,
                },
                // 暗言术：痛
                spell_shadow_shadowwordpain: {
                    src: "/effect/spell_shadow_shadowwordpain.png",
                    delay: 21,
                    imgCount: 37,
                    col: 3,
                    row: 13,
                    posX: 0.6,
                    posY: 0.55,
                },
                // 纯净术
                spell_holy_dispelmagic: {
                    src: "/effect/spell_holy_dispelmagic.png",
                    delay: 50,
                    imgCount: 15,
                    col: 3,
                    row: 5,
                    posX: 0.6,
                    posY: 0.1,
                },
                // 真言术：韧
                spell_holy_wordfortitude: {
                    src: "/effect/spell_holy_wordfortitude.png",
                    delay: 40,
                    imgCount: 12,
                    col: 3,
                    row: 4,
                    posX: -0.35,
                    posY: -0.05,
                },
                // 惩击
                spell_holy_holysmite: {
                    src: "/effect/spell_holy_holysmite.png",
                    delay: 40,
                    imgCount: 20,
                    col: 3,
                    row: 7,
                    posX: 0.5,
                    posY: -0.5,
                },
                // 暗言术：灭
                spell_shadow_demonicfortitude: {
                    src: "/effect/spell_shadow_demonicfortitude.png",
                    delay: 20,
                    imgCount: 40,
                    col: 3,
                    row: 14,
                    posX: 0.57,
                    posY: 0.02,
                },
                // 真言术：障
                spell_holy_powerwordbarrier: {
                    src: "/effect/spell_holy_powerwordbarrier.png",
                    delay: 25,
                    imgCount: 31,
                    col: 3,
                    row: 11,
                    posX: 0.05,
                    posY: 0.3,
                },
                // 沉默
                ability_priest_silence: {
                    src: "/effect/ability_priest_silence.png",
                    delay: 75,
                    imgCount: 9,
                    col: 3,
                    row: 3,
                    posX: 0.57,
                    posY: 0.3,
                },
                // 真言术：慰
                ability_priest_flashoflight: {
                    src: "/effect/ability_priest_flashoflight.png",
                    delay: 35,
                    imgCount: 21,
                    col: 3,
                    row: 7,
                    posX: 0.52,
                    posY: 0.05,
                },
                // 魔法夺取
                spell_nature_nullifydisease: {
                    src: "/effect/spell_nature_nullifydisease.png",
                    delay: 65,
                    imgCount: 12,
                    col: 3,
                    row: 4,
                    posX: 0.2,
                    posY: 0.2,
                },
                // 圣言术：静
                spell_holy_persuitofjustice: {
                    src: "/effect/spell_holy_persuitofjustice.png",
                    delay: 50,
                    imgCount: 16,
                    col: 3,
                    row: 6,
                    posX: 0,
                    posY: 0,
                },
            }
        }
    }
}