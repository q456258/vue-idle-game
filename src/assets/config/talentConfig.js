export const talentConfig = {
    data() {
        return {
            preReqList: {
                // general
                STR: [['generalBranch', 5]],
                AGI: [['generalBranch', 5]],
                INT: [['generalBranch', 5]],
                spell_deathknight_bloodpresence: [['generalBranch', 10]],
                spell_deathknight_frostpresence: [['generalBranch', 10]],
                CRIT: [['generalBranch', 15]],
                CRITDMG: [['generalBranch', 15]],
                spell_shadow_bloodboil: [['generalBranch', 15]],
                inv_elemental_mote_mana: [['generalBranch', 15]],
                spell_shadow_summonimp: [['generalBranch', 20]],
                ability_revendreth_druid: [['generalBranch', 30]],
                inv_misc_shadowegg: [['generalBranch', 35]],
                spell_holy_sealofsalvation: [['generalBranch', 45]],
                // warrior
                ability_hunter_harass: [['generalBranch', 5]],
                ability_warrior_punishingblow: [['generalBranch', 5]],
                spell_nature_thunderclap: [['generalBranch', 5], ['warriorBranch', 5]],
                spell_holy_crusaderstrike: [['generalBranch', 5], ['warriorBranch', 5], ['spell_nature_thunderclap', 3]],
                ability_paladin_swiftretribution: [['generalBranch', 5], ['warriorBranch', 5], ['spell_nature_thunderclap', 1], ['spell_holy_crusaderstrike', 1]],
                ability_warrior_intensifyrage: [['generalBranch', 5], ['warriorBranch', 5]],
                ability_warrior_shieldbash: [['generalBranch', 10], ['warriorBranch', 10]],
                inv_shield_05: [['generalBranch', 10], ['warriorBranch', 10], ['ability_warrior_shieldbash', 1]],
                ability_defend: [['generalBranch', 10], ['warriorBranch', 10]],
                ability_rogue_preparation: [['generalBranch', 10], ['warriorBranch', 10]],
                warrior_talent_icon_stormbolt: [['generalBranch', 15], ['warriorBranch', 15], ['spell_nature_thunderclap', 1]],
                inv_sword_48: [['generalBranch', 15], ['warriorBranch', 15]],
                ability_deathknight_sanguinfortitude: [['generalBranch', 15], ['warriorBranch', 15], ['ability_warrior_shieldbash', 4]],
                warrior_talent_icon_furyintheblood: [['generalBranch', 15], ['warriorBranch', 15]],
                ability_blackhand_marked4death: [['generalBranch', 20], ['warriorBranch', 20], ['inv_sword_48', 1]],
                ability_warrior_bloodfrenzy: [['generalBranch', 20], ['warriorBranch', 20]],
                ability_warrior_revenge: [['generalBranch', 25], ['warriorBranch', 25]],
                ability_warrior_shatteringthrow: [['generalBranch', 25], ['warriorBranch', 25]],
                ability_deathknight_deathchain: [['generalBranch', 30], ['warriorBranch', 30], ['inv_sword_48', 1], ['ability_blackhand_marked4death', 4]],
                ability_warrior_decisivestrike: [['generalBranch', 30], ['warriorBranch', 30]],
                ability_warrior_colossussmash: [['generalBranch', 30], ['warriorBranch', 30], ['ability_warrior_shatteringthrow', 1]],
                classicon_warrior: [['generalBranch', 35], ['warriorBranch', 35]],
                warrior_talent_icon_thunderstruck: [['generalBranch', 35], ['warriorBranch', 35], ['spell_nature_thunderclap', 1], ['warrior_talent_icon_stormbolt', 1]],
                ability_whirlwind: [['generalBranch', 40], ['warriorBranch', 40]],
                sunder_buff: [['generalBranch', 40], ['warriorBranch', 40]],
                ability_racial_avatar: [['generalBranch', 45], ['warriorBranch', 45]],
                ability_revendreth_paladin: [['generalBranch', 45], ['warriorBranch', 45]],
                penetrate_buff: [['generalBranch', 45], ['warriorBranch', 45]],
                spell_shadow_deathscream: [['generalBranch', 50], ['warriorBranch', 50]],
                // priest
                ability_hunter_harass: [['generalBranch', 5]],
                // // mage
                spell_frost_frostbolt02: [['generalBranch', 5]],
                // spell_fire_flamebolt: [['warriorBranch', 5]],
                // spell_nature_starfall: [['generalBranch', 30], ['warriorBranch', 30]],
                // spell_arcane_starfire: [['generalBranch', 35], ['warriorBranch', 35], ['spell_arcane_starfire', 3]],
                // ability_druid_starfall: [['generalBranch', 40], ['warriorBranch', 40], ['spell_nature_starfall', 3]],
                // // warlock
                // spell_warlock_soulburn: [['warriorBranch', 20]],
                // ability_warlock_jinx: [['warriorBranch', 25], ['spell_warlock_soulburn', 1]],
            },
            generalBranch: {
                generalBranch: {
                    name: '通用系',
                    desc: [''],
                    type: 'generalBranch',
                    iconSrc: "./icons/accessory/inv_jewelry_necklace_17.jpg",
                    maxLv: 100,
                    position: [-1, -1]
                },
                ATK: {
                    name: '攻击',
                    desc: ['',
                        '提升2%攻击力',
                        '提升4%攻击力',
                        '提升6%攻击力',
                        '提升8%攻击力',
                        '提升10%攻击力',
                        '提升12%攻击力',
                        '提升14%攻击力',
                        '提升16%攻击力',
                        '提升18%攻击力',
                    ],
                    type: 'ATK',
                    iconSrc: "./icons/stat/atk.jpg",
                    maxLv: 9,
                    position: [0, 0],
                },
                SUNDER: {
                    name: '破甲',
                    desc: ['',
                        '提升2点破甲',
                        '提升4点破甲',
                        '提升6点破甲',
                        '提升8点破甲',
                        '提升10点破甲',
                        '提升12点破甲',
                        '提升14点破甲',
                        '提升16点破甲',
                        '提升18点破甲',
                    ],
                    type: 'SUNDER',
                    iconSrc: "./icons/stat/sunder.jpg",
                    maxLv: 9,
                    position: [1, 0],
                },
                DEF: {
                    name: '护甲',
                    desc: ['',
                        '提升2%护甲',
                        '提升4%护甲',
                        '提升6%护甲',
                        '提升8%护甲',
                        '提升10%护甲',
                        '提升12%护甲',
                        '提升14%护甲',
                        '提升16%护甲',
                        '提升18%护甲',
                    ],
                    type: 'DEF',
                    iconSrc: "./icons/stat/arm.jpg",
                    maxLv: 9,
                    position: [2, 0],
                },
                MR: {
                    name: '格挡',
                    desc: ['',
                        '提升2%格挡',
                        '提升4%格挡',
                        '提升6%格挡',
                        '提升8%格挡',
                        '提升10%格挡',
                        '提升12%格挡',
                        '提升14%格挡',
                        '提升16%格挡',
                        '提升18%格挡',
                    ],
                    type: 'BLOCK',
                    iconSrc: "./icons/stat/block.jpg",
                    maxLv: 9,
                    position: [3, 0],
                },
                STR: {
                    name: '力量',
                    desc: ['',
                        '提升2%力量',
                        '提升4%力量',
                        '提升6%力量',
                        '提升8%力量',
                        '提升10%力量',
                        '提升12%力量',
                        '提升14%力量',
                        '提升16%力量',
                        '提升18%力量',
                    ],
                    type: 'STR',
                    iconSrc: "./icons/stat/str.jpg",
                    maxLv: 9,
                    position: [0, 1]
                },
                AGI: {
                    name: '敏捷',
                    desc: ['',
                        '提升2%敏捷',
                        '提升4%敏捷',
                        '提升6%敏捷',
                        '提升8%敏捷',
                        '提升10%敏捷',
                        '提升12%敏捷',
                        '提升14%敏捷',
                        '提升16%敏捷',
                        '提升18%敏捷',
                    ],
                    type: 'AGI',
                    iconSrc: "./icons/stat/agi.jpg",
                    maxLv: 9,
                    position: [1, 1]
                },
                INT: {
                    name: '智力',
                    desc: ['',
                        '提升2%智力',
                        '提升4%智力',
                        '提升6%智力',
                        '提升8%智力',
                        '提升10%智力',
                        '提升12%智力',
                        '提升14%智力',
                        '提升16%智力',
                        '提升18%智力',
                    ],
                    type: 'INT',
                    iconSrc: "./icons/stat/int.jpg",
                    maxLv: 9,
                    position: [2, 1]
                },
                spell_deathknight_bloodpresence: {
                    name: '生命摄取',
                    desc: [
                        '',
                        '战斗胜利后恢复5%失去的生命值',
                        '战斗胜利后恢复10%失去的生命值',
                        '战斗胜利后恢复15%失去的生命值',
                        '战斗胜利后恢复20%失去的生命值',
                        '战斗胜利后恢复25%失去的生命值',
                    ],
                    type: 'spell_deathknight_bloodpresence',
                    iconSrc: "./icons/spell/spell_deathknight_bloodpresence.jpg",
                    maxLv: 5,
                    position: [2, 2]
                },
                spell_deathknight_frostpresence: {
                    name: '能量摄取',
                    desc: [
                        '',
                        '战斗胜利后恢复5%失去的魔法值',
                        '战斗胜利后恢复10%失去的魔法值',
                        '战斗胜利后恢复15%失去的魔法值',
                        '战斗胜利后恢复20%失去的魔法值',
                        '战斗胜利后恢复25%失去的魔法值',
                    ],
                    type: 'spell_deathknight_frostpresence',
                    iconSrc: "./icons/spell/spell_deathknight_frostpresence.jpg",
                    maxLv: 5,
                    position: [3, 2]
                },
                CRIT: {
                    name: '暴击率',
                    desc: ['',
                        '提升1%暴击率',
                        '提升2%暴击率',
                        '提升3%暴击率',
                        '提升4%暴击率',
                        '提升5%暴击率',
                        '提升6%暴击率',
                        '提升7%暴击率',
                        '提升8%暴击率',
                        '提升9%暴击率',
                    ],
                    type: 'CRIT',
                    iconSrc: "./icons/stat/crit.jpg",
                    maxLv: 9,
                    position: [0, 3],
                },
                CRITDMG: {
                    name: '暴击伤害',
                    desc: ['',
                        '提升1%暴击伤害',
                        '提升2%暴击伤害',
                        '提升3%暴击伤害',
                        '提升4%暴击伤害',
                        '提升5%暴击伤害',
                        '提升6%暴击伤害',
                        '提升7%暴击伤害',
                        '提升8%暴击伤害',
                        '提升9%暴击伤害',
                    ],
                    type: 'CRITDMG',
                    iconSrc: "./icons/stat/critdmg.jpg",
                    maxLv: 9,
                    position: [1, 3],
                },
                spell_shadow_bloodboil: {
                    name: '生命残留',
                    desc: ['',
                        '击杀目标后恢复目标最大生命值1%的生命值, 上限为你的最大生命值的1%',
                        '击杀目标后恢复目标最大生命值1%的生命值, 上限为你的最大生命值的2%',
                        '击杀目标后恢复目标最大生命值1%的生命值, 上限为你的最大生命值的3%',
                        '击杀目标后恢复目标最大生命值1%的生命值, 上限为你的最大生命值的4%',
                        '击杀目标后恢复目标最大生命值1%的生命值, 上限为你的最大生命值的5%',
                        '击杀目标后恢复目标最大生命值1%的生命值, 上限为你的最大生命值的6%',
                        '击杀目标后恢复目标最大生命值1%的生命值, 上限为你的最大生命值的7%',
                        '击杀目标后恢复目标最大生命值1%的生命值, 上限为你的最大生命值的8%',
                        '击杀目标后恢复目标最大生命值1%的生命值, 上限为你的最大生命值的9%',
                    ],
                    type: 'spell_shadow_bloodboil',
                    iconSrc: "./icons/spell/spell_shadow_bloodboil.jpg",
                    maxLv: 9,
                    position: [2, 3],
                },
                inv_elemental_mote_mana: {
                    name: '法力残留',
                    desc: ['',
                        '击杀目标后恢复目标最大生命值0.25%的魔法值, 上限为你的最大魔法值的1%',
                        '击杀目标后恢复目标最大生命值0.25%的魔法值, 上限为你的最大魔法值的2%',
                        '击杀目标后恢复目标最大生命值0.25%的魔法值, 上限为你的最大魔法值的3%',
                        '击杀目标后恢复目标最大生命值0.25%的魔法值, 上限为你的最大魔法值的4%',
                        '击杀目标后恢复目标最大生命值0.25%的魔法值, 上限为你的最大魔法值的5%',
                        '击杀目标后恢复目标最大生命值0.25%的魔法值, 上限为你的最大魔法值的6%',
                        '击杀目标后恢复目标最大生命值0.25%的魔法值, 上限为你的最大魔法值的7%',
                        '击杀目标后恢复目标最大生命值0.25%的魔法值, 上限为你的最大魔法值的8%',
                        '击杀目标后恢复目标最大生命值0.25%的魔法值, 上限为你的最大魔法值的9%',
                    ],
                    type: 'inv_elemental_mote_mana',
                    iconSrc: "./icons/spell/inv_elemental_mote_mana.jpg",
                    maxLv: 9,
                    position: [3, 3],
                },
                spell_shadow_summonimp: {
                    name: '血之狂热',
                    desc: [
                        '',
                        '暴击后恢复0.25%最大生命值',
                        '暴击后恢复0.5%最大生命值',
                        '暴击后恢复0.75%最大生命值',
                        '暴击后恢复1%最大生命值',
                    ],
                    type: 'spell_shadow_summonimp',
                    iconSrc: "./icons/spell/spell_shadow_summonimp.jpg",
                    maxLv: 4,
                    position: [2, 4]
                },
                ability_revendreth_druid: {
                    name: '吸血',
                    desc: ['',
                        '恢复攻击/技能造成伤害的0.4%',
                        '恢复攻击/技能造成伤害的0.8%',
                        '恢复攻击/技能造成伤害的1.2%',
                        '恢复攻击/技能造成伤害的1.6%',
                        '恢复攻击/技能造成伤害的2%',
                    ],
                    type: 'ability_revendreth_druid',
                    iconSrc: "./icons/spell/ability_revendreth_druid.jpg",
                    maxLv: 5,
                    position: [3, 6]
                },
                inv_misc_shadowegg: {
                    name: '炼狱',
                    desc: ['',
                        '免疫一次死亡, 获得两层死亡免疫, 获得三层炼狱, 每次攻击减少一层, 消失时生命值低于50%直接死亡, 冷却10分钟',
                    ],
                    type: 'inv_misc_shadowegg',
                    iconSrc: "./icons/spell/inv_misc_shadowegg.jpg",
                    maxLv: 1,
                    position: [2, 7]
                },
                spell_holy_sealofsalvation: {
                    name: '希望人没事',
                    desc: ['',
                        '受到致命伤害时有0.25%恢复所有生命值, 然后再承受伤害',
                        '受到致命伤害时有0.5%恢复所有生命值, 然后再承受伤害',
                        '受到致命伤害时有0.75%恢复所有生命值, 然后再承受伤害',
                        '受到致命伤害时有1%恢复所有生命值, 然后再承受伤害',
                    ],
                    type: 'spell_holy_sealofsalvation',
                    iconSrc: "./icons/spell/spell_holy_sealofsalvation.jpg",
                    maxLv: 4,
                    position: [0, 9]
                },
            },
            warriorBranch: {
                warriorBranch: {
                    name: '战士系',
                    desc: [''],
                    type: 'warriorBranch',
                    iconSrc: "./icons/accessory/inv_jewelry_necklace_17.jpg",
                    maxLv: 100,
                    position: [-1, -1]
                },
                ability_hunter_harass: {
                    name: '复苏之风',
                    desc: ['',
                        '非战斗状态每五秒恢复11%最大生命值(初始10%)',
                        '非战斗状态每五秒恢复12%最大生命值(初始10%)',
                        '非战斗状态每五秒恢复13%最大生命值(初始10%)',
                        '非战斗状态每五秒恢复14%最大生命值(初始10%)',
                        '非战斗状态每五秒恢复15%最大生命值(初始10%)',
                    ],
                    type: 'ability_hunter_harass',
                    iconSrc: "./icons/spell/ability_hunter_harass.jpg",
                    maxLv: 5,
                    position: [2, 0]
                },
                ability_warrior_punishingblow: {
                    name: '压制',
                    desc: ['',
                        '对等级低于自己的目标额外造成10点物理伤害',
                        '对等级低于自己的目标额外造成20点物理伤害',
                        '对等级低于自己的目标额外造成30点物理伤害',
                        '对等级低于自己的目标额外造成40点物理伤害',
                        '对等级低于自己的目标额外造成50点物理伤害',
                    ],
                    type: 'ability_warrior_punishingblow',
                    iconSrc: "./icons/spell/ability_warrior_punishingblow.jpg",
                    maxLv: 5,
                    position: [4, 0]
                },
                spell_nature_thunderclap: {
                    name: '【技能】雷霆一击',
                    desc: [
                        '',
                        '造成攻击力*1.1点伤害',
                        '造成攻击力*1.2点伤害',
                        '造成攻击力*1.3点伤害',
                        '造成攻击力*1.4点伤害'
                    ],
                    type: 'spell_nature_thunderclap',
                    iconSrc: "./icons/spell/spell_nature_thunderclap.jpg",
                    maxLv: 4,
                    position: [0, 1]
                },
                spell_holy_crusaderstrike: {
                    name: '【技能】十字军打击',
                    desc: ['',
                        '造成攻击力*2点伤害',
                        '造成攻击力*2.5点伤害',
                    ],
                    type: 'spell_holy_crusaderstrike',
                    iconSrc: "./icons/spell/spell_holy_crusaderstrike.jpg",
                    maxLv: 2,
                    position: [1, 1],
                    right: true
                },
                ability_paladin_swiftretribution: {
                    name: '十字军之力',
                    desc: ['',
                        '使用雷霆一击后, 十字军打击获得1点充能',
                        '使用雷霆一击后, 十字军打击获得2点充能',
                        '使用雷霆一击后, 十字军打击获得3点充能',
                        '使用雷霆一击后, 十字军打击获得4点充能',
                        '使用雷霆一击后, 十字军打击获得5点充能',
                    ],
                    type: 'ability_paladin_swiftretribution',
                    iconSrc: "./icons/spell/ability_paladin_swiftretribution.jpg",
                    maxLv: 5,
                    position: [2, 1],
                    right: true
                },
                ability_defend: {
                    name: '格挡',
                    desc: ['',
                        '减少5点受到的物理伤害',
                        '减少10点受到的物理伤害',
                        '减少15点受到的物理伤害',
                        '减少20点受到的物理伤害',
                        '减少25点受到的物理伤害',
                    ],
                    type: 'ability_defend',
                    iconSrc: "./icons/spell/ability_defend.jpg",
                    maxLv: 5,
                    position: [4, 1],
                },
                ability_rogue_preparation: {
                    name: '战争印记',
                    desc: ['',
                        '每次攻击恢复10点生命值和魔法值',
                        '每次攻击恢复20点生命值和魔法值',
                        '每次攻击恢复30点生命值和魔法值',
                        '每次攻击恢复40点生命值和魔法值',
                        '每次攻击恢复50点生命值和魔法值',
                    ],
                    type: 'ability_rogue_preparation',
                    iconSrc: "./icons/spell/ability_rogue_preparation.jpg",
                    maxLv: 5,
                    position: [4, 2],
                },
                ability_warrior_intensifyrage: {
                    name: '代偿',
                    desc: ['',
                        '使用生命值代替所有技能的魔法值消耗',
                    ],
                    type: 'ability_warrior_intensifyrage',
                    iconSrc: "./icons/spell/ability_warrior_intensifyrage.jpg",
                    maxLv: 1,
                    position: [1, 2],
                },
                ability_warrior_shieldbash: {
                    name: '盾击',
                    desc: ['',
                        '造成攻击力*0.5+护甲*4点伤害',
                        '造成攻击力*0.5+护甲*5点伤害',
                        '造成攻击力*0.5+护甲*6点伤害',
                        '造成攻击力*0.5+护甲*7点伤害'
                    ],
                    type: 'ability_warrior_shieldbash',
                    iconSrc: "./icons/spell/ability_warrior_shieldbash.jpg",
                    maxLv: 4,
                    position: [2, 2],
                },
                inv_shield_05: {
                    name: '盾牌猛击',
                    desc: ['',
                        '盾击有10%眩晕目标',
                        '盾击有20%眩晕目标',
                        '盾击有30%眩晕目标',
                        '盾击有40%眩晕目标'
                    ],
                    type: 'inv_shield_05',
                    iconSrc: "./icons/spell/inv_shield_05.jpg",
                    maxLv: 4,
                    position: [3, 2],
                    right: true
                },
                warrior_talent_icon_stormbolt: {
                    name: '风暴之锤',
                    desc: ['',
                        '雷霆一击有10%眩晕目标',
                        '雷霆一击有20%眩晕目标',
                        '雷霆一击有30%眩晕目标',
                        '雷霆一击有40%眩晕目标'
                    ],
                    type: 'warrior_talent_icon_stormbolt',
                    iconSrc: "./icons/spell/warrior_talent_icon_stormbolt.jpg",
                    maxLv: 4,
                    position: [0, 3],
                    down2: true
                },
                inv_sword_48: {
                    name: '屠杀',
                    desc: ['',
                        '造成攻击力*0.5点伤害, 对低于80%的目标造成额外攻击力*0.75点伤害',
                    ],
                    type: 'inv_sword_48',
                    iconSrc: "./icons/spell/inv_sword_48.jpg",
                    maxLv: 1,
                    position: [1, 3],
                },
                ability_deathknight_sanguinfortitude: {
                    name: '惩罚',
                    desc: ['',
                        '盾牌猛击造成的伤害提升5%, 并附加一层虚弱',
                        '盾牌猛击造成的伤害提升10%, 并附加两层虚弱',
                        '盾牌猛击造成的伤害提升15%, 并附加三层虚弱',
                        '盾牌猛击造成的伤害提升20%, 并附加四层虚弱',
                    ],
                    type: 'ability_deathknight_sanguinfortitude',
                    iconSrc: "./icons/spell/ability_deathknight_sanguinfortitude.jpg",
                    maxLv: 4,
                    position: [2, 3],
                    down: true
                },
                warrior_talent_icon_furyintheblood: {
                    name: '暴乱狂战士',
                    desc: ['',
                        '最终伤害提升1%, 受到的伤害提升0.5%',
                        '最终伤害提升2%, 受到的伤害提升1%',
                        '最终伤害提升3%, 受到的伤害提升1.5%',
                        '最终伤害提升4%, 受到的伤害提升2%',
                    ],
                    type: 'warrior_talent_icon_furyintheblood',
                    iconSrc: "./icons/spell/warrior_talent_icon_furyintheblood.jpg",
                    maxLv: 4,
                    position: [3, 3],
                },
                ability_blackhand_marked4death: {
                    name: '斩杀',
                    desc: ['',
                        '屠杀对低于50%的目标造成额外攻击力*1点伤害',
                        '屠杀对低于50%的目标造成额外攻击力*1.1点伤害',
                        '屠杀对低于50%的目标造成额外攻击力*1.2点伤害',
                        '屠杀对低于50%的目标造成额外攻击力*1.3点伤害',
                    ],
                    type: 'ability_blackhand_marked4death',
                    iconSrc: "./icons/spell/ability_blackhand_marked4death.jpg",
                    maxLv: 4,
                    position: [1, 4],
                    down: true
                },
                ability_warrior_bloodfrenzy: {
                    name: '浴血',
                    desc: ['',
                        '每失去25%生命值, 最终伤害提升0.5%',
                        '每失去20%生命值, 最终伤害提升0.5%',
                        '每失去15%生命值, 最终伤害提升0.5%',
                        '每失去10%生命值, 最终伤害提升0.5%',
                    ],
                    type: 'ability_warrior_bloodfrenzy',
                    iconSrc: "./icons/spell/ability_warrior_bloodfrenzy.jpg",
                    maxLv: 4,
                    position: [3, 4],
                },
                ability_warrior_revenge: {
                    name: '复仇',
                    desc: ['',
                        '如果目标类型击杀过你, 对其造成的最终伤害提升2%',
                        '如果目标类型击杀过你, 对其造成的最终伤害提升4%',
                        '如果目标类型击杀过你, 对其造成的最终伤害提升6%',
                        '如果目标类型击杀过你, 对其造成的最终伤害提升8%',
                        '如果目标类型击杀过你, 对其造成的最终伤害提升10%',
                    ],
                    type: 'ability_warrior_revenge',
                    iconSrc: "./icons/spell/ability_warrior_revenge.jpg",
                    maxLv: 5,
                    position: [2, 5],
                },
                ability_warrior_shatteringthrow: {
                    name: '【技能】碎裂投掷',
                    desc: ['',
                        '造成攻击力*1点伤害, 30%获得一层穿透效果',
                        '造成攻击力*1.2点伤害, 30%获得一层穿透效果',
                    ],
                    type: 'ability_warrior_shatteringthrow',
                    iconSrc: "./icons/spell/ability_warrior_shatteringthrow.jpg",
                    maxLv: 2,
                    position: [4, 5],
                },
                ability_deathknight_deathchain: {
                    name: '处刑',
                    desc: ['',
                        '对低于5%生命值的非BOSS型怪物使用屠杀时, 目标直接死亡',
                        '对低于10%生命值的非BOSS型怪物使用屠杀时, 目标直接死亡',
                    ],
                    type: 'ability_deathknight_deathchain',
                    iconSrc: "./icons/spell/ability_deathknight_deathchain.jpg",
                    maxLv: 2,
                    position: [1, 6],
                    down2: true
                },
                ability_warrior_decisivestrike: {
                    name: '重击',
                    desc: ['',
                        '普通攻击有1%对敌人附加一层眩晕效果',
                        '普通攻击有2%对敌人附加一层眩晕效果',
                        '普通攻击有3%对敌人附加一层眩晕效果',
                        '普通攻击有4%对敌人附加一层眩晕效果',
                        '普通攻击有5%对敌人附加一层眩晕效果',
                    ],
                    type: 'ability_warrior_decisivestrike',
                    iconSrc: "./icons/spell/ability_warrior_decisivestrike.jpg",
                    maxLv: 5,
                    position: [2, 6],
                },
                ability_warrior_colossussmash: {
                    name: '粉碎投掷',
                    desc: ['',
                        '使用碎裂投掷有40%获得一层穿甲',
                        '使用碎裂投掷有50%获得一层穿甲'
                    ],
                    type: 'ability_warrior_colossussmash',
                    iconSrc: "./icons/spell/ability_warrior_colossussmash.jpg",
                    maxLv: 2,
                    position: [4, 6],
                    down: true
                },
                warrior_talent_icon_thunderstruck: {
                    name: '无坚不摧之力',
                    desc: ['',
                        '雷霆一击伤害提升30%, 使用完后立刻获得3点充能'
                    ],
                    type: 'warrior_talent_icon_thunderstruck',
                    iconSrc: "./icons/spell/warrior_talent_icon_thunderstruck.jpg",
                    maxLv: 1,
                    position: [0, 7],
                    down4: true
                },
                classicon_warrior: {
                    name: '强化攻击',
                    desc: ['',
                        '普通攻击造成攻击力*1.05点伤害',
                        '普通攻击造成攻击力*1.1点伤害',
                        '普通攻击造成攻击力*1.15点伤害',
                        '普通攻击造成攻击力*1.2点伤害',
                        '普通攻击造成攻击力*1.25点伤害',
                    ],
                    type: 'classicon_warrior',
                    iconSrc: "./icons/spell/classicon_warrior.jpg",
                    maxLv: 5,
                    position: [2, 7],
                },
                ability_whirlwind: {
                    name: '剑刃风暴',
                    desc: [''],
                    type: 'ability_whirlwind',
                    iconSrc: "./icons/spell/ability_whirlwind.jpg",
                    maxLv: 1,
                    position: [3, 8],
                },
                sunder_buff: {
                    name: '破甲增幅',
                    desc: ['',
                        '破甲使攻击无视目标27%护甲',
                        '破甲使攻击无视目标29%护甲',
                        '破甲使攻击无视目标31%护甲',
                        '破甲使攻击无视目标33%护甲',
                        '破甲使攻击无视目标35%护甲',
                    ],
                    type: 'sunder_buff',
                    iconSrc: "./icons/stat/sunder.jpg",
                    maxLv: 5,
                    position: [4, 8],
                },
                penetrate_buff: {
                    name: '穿透增幅',
                    desc: ['',
                        '穿透使攻击伤害的11%无视护甲',
                        '穿透使攻击伤害的12%无视护甲',
                        '穿透使攻击伤害的13%无视护甲',
                        '穿透使攻击伤害的14%无视护甲',
                        '穿透使攻击伤害的15%无视护甲',
                    ],
                    type: 'penetrate_buff',
                    iconSrc: "./icons/buff/penetrate.jpg",
                    maxLv: 5,
                    position: [4, 9],
                },
                ability_revendreth_paladin: {
                    name: '【技能】血祭',
                    desc: ['',
                        '造成当前生命值*3点伤害, 获得一层吸收效果',
                        '造成当前生命值*4点伤害, 获得一层吸收效果',
                        '造成当前生命值*5点伤害, 获得一层吸收效果',
                    ],
                    type: 'ability_revendreth_paladin',
                    iconSrc: "./icons/spell/ability_revendreth_paladin.jpg",
                    maxLv: 3,
                    position: [0, 9]
                },
                spell_shadow_deathscream: {
                    name: '【技能】死亡嚎叫',
                    desc: ['',
                        '造成攻击力*1点伤害, 50%对敌人附加一层眩晕效果, 并获得一层吸血效果',
                    ],
                    type: 'spell_shadow_deathscream',
                    iconSrc: "./icons/spell/spell_shadow_deathscream.jpg",
                    maxLv: 1,
                    position: [2, 9]
                },
                ability_racial_avatar: {
                    name: '【技能】天神下凡',
                    desc: ['',
                        '最终伤害提升20%, 移除并免疫所有负面效果, 持续一分钟',
                    ],
                    type: 'ability_racial_avatar',
                    iconSrc: "./icons/spell/ability_racial_avatar.jpg",
                    maxLv: 1,
                    position: [1, 10]
                },
                // warrior_talent_icon_innerrage: {
                //     name: '【技能】鲁莽',
                //     desc: [''],
                //     type: 'warrior_talent_icon_innerrage',
                //     iconSrc: "./icons/spell/warrior_talent_icon_innerrage.jpg",
                //     maxLv: 3,
                //     position: [2, 9]
                // }
            },
            mageBranch: {
                mageBranch: {
                    name: '法师系',
                    desc: [''],
                    type: 'mageBranch',
                    iconSrc: "./icons/accessory/inv_jewelry_necklace_17.jpg",
                    maxLv: 100,
                    position: [-1, -1]
                },
                spell_frost_frostbolt02: {
                    name: '【技能】寒冰箭',
                    desc: ['',
                        '代替普通攻击, 造成法伤*1点魔法伤害, 消耗20点魔法值'
                    ],
                    type: 'spell_frost_frostbolt02',
                    iconSrc: "./icons/spell/spell_frost_frostbolt02.jpg",
                    maxLv: 1,
                    position: [0, 0]
                },
            },
            // archived:{
            //     //mage
            //     spell_fire_flamebolt: {
            //         name: '火球术',
            //         desc: ['',
            //             '造成5000+智力*5点伤害',
            //             '造成30000+智力*5点伤害',
            //             '造成100000+智力*5点伤害',
            //             '造成300000+智力*5点伤害',
            //         ],
            //         type: 'spell_fire_flamebolt',
            //         iconSrc: "./icons/spell/spell_fire_flamebolt.jpg",
            //         maxLv: 4,
            //         position: [4, 1],
            //     },
                // spell_nature_starfall: {
                //     name: '【技能】月火术',
                //     desc: [''],
                //     type: 'spell_nature_starfall',
                //     iconSrc: "./icons/spell/spell_nature_starfall.jpg",
                //     maxLv: 3,
                //     position: [1, 6]
                // },
                // spell_arcane_starfire: {
                //     name: '【技能】星火术',
                //     desc: [''],
                //     type: 'spell_arcane_starfire',
                //     iconSrc: "./icons/spell/spell_arcane_starfire.jpg",
                //     maxLv: 3,
                //     position: [1, 7],
                //     down: true
                // },
                // ability_druid_starfall: {
                //     name: '【技能】无尽之星',
                //     desc: [''],
                //     type: 'ability_druid_starfall',
                //     iconSrc: "./icons/spell/ability_druid_starfall.jpg",
                //     maxLv: 1,
                //     position: [1, 8],
                //     down: true
                // },
            //     //warlock
            //     spell_warlock_soulburn: {
            //         name: '【技能】勾魂',
            //         desc: ['',
            //             '造成最大生命值*0.8点伤害',
            //             '造成最大生命值*0.9点伤害'
            //         ],
            //         type: 'spell_warlock_soulburn',
            //         iconSrc: "./icons/spell/spell_warlock_soulburn.jpg",
            //         maxLv: 2,
            //         position: [2, 4]
            //     },
            //     ability_warlock_jinx: {
            //         name: '夺魄',
            //         desc: ['',
            //             '使用勾魂后10%获得一层死亡免疫'
            //         ],
            //         type: 'ability_warlock_jinx',
            //         iconSrc: "./icons/spell/ability_warlock_jinx.jpg",
            //         maxLv: 1,
            //         position: [2, 5],
            //         down: true
            //     },
            // }
        }
    },
  }