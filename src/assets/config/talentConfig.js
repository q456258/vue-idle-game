export const talentConfig = {
    data() {
        return {
            preReqList: {
                AGI: [['powerBranch', 10]],
                INT: [['powerBranch', 10]],
                CRIT: [['powerBranch', 20]],
                CRITDMG: [['powerBranch', 20]],
                spell_nature_thunderclap: [['powerBranch', 20]],
                spell_holy_crusaderstrike: [['powerBranch', 30], ['spell_nature_thunderclap', 3]],
                spell_warlock_soulburn: [['powerBranch', 40]],
                ability_warrior_shatteringthrow: [['powerBranch', 50]],
                spell_nature_starfall: [['powerBranch', 60]],
                spell_arcane_starfire: [['powerBranch', 70], ['spell_arcane_starfire', 3]],
                ability_druid_starfall: [['powerBranch', 80], ['spell_nature_starfall', 3]],
                spell_shadow_deathscream: [['powerBranch', 90]],
                ability_revendreth_paladin: [['powerBranch', 100]],
                STR: [['defBranch', 10]],
                spell_deathknight_bloodpresence: [['defBranch', 20]],
                spell_deathknight_frostpresence: [['defBranch', 20]],
            },
            powerBranch: {
                powerBranch: {
                    name: '攻击系',
                    desc: [''],
                    type: 'powerBranch',
                    iconSrc: "./icons/accessory/Inv_jewelry_necklace_17.png",
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
                    iconSrc: "./icons/spell/atk_large.png",
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
                    iconSrc: "./icons/spell/sunder.png",
                    maxLv: 9,
                    position: [1, 0],
                },
                CRIT: {
                    name: '暴击率',
                    desc: ['',
                        '提升2%暴击率',
                        '提升4%暴击率',
                        '提升6%暴击率',
                        '提升8%暴击率',
                        '提升10%暴击率',
                        '提升12%暴击率',
                        '提升14%暴击率',
                        '提升16%暴击率',
                        '提升18%暴击率',
                    ],
                    type: 'CRIT',
                    iconSrc: "./icons/spell/crit_large.png",
                    maxLv: 9,
                    position: [1, 2],
                },
                CRITDMG: {
                    name: '暴击伤害',
                    desc: ['',
                        '提升2%暴击伤害',
                        '提升4%暴击伤害',
                        '提升6%暴击伤害',
                        '提升8%暴击伤害',
                        '提升10%暴击伤害',
                        '提升12%暴击伤害',
                        '提升14%暴击伤害',
                        '提升16%暴击伤害',
                        '提升18%暴击伤害',
                    ],
                    type: 'CRITDMG',
                    iconSrc: "./icons/spell/critdmg_large.png",
                    maxLv: 9,
                    position: [0, 2],
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
                    iconSrc: "./icons/spell/agi.png",
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
                    iconSrc: "./icons/spell/int_large.png",
                    maxLv: 9,
                    position: [2, 1]
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
                    iconSrc: "./icons/spell/Spell_nature_thunderclap.png",
                    maxLv: 4,
                    position: [2, 2]
                },
                spell_holy_crusaderstrike: {
                    name: '【技能】十字军打击',
                    desc: [''],
                    type: 'spell_holy_crusaderstrike',
                    iconSrc: "./icons/spell/spell_holy_crusaderstrike.png",
                    maxLv: 2,
                    position: [2, 3],
                    down: true
                },
                spell_warlock_soulburn: {
                    name: '【技能】夺魂',
                    desc: [''],
                    type: 'spell_warlock_soulburn',
                    iconSrc: "./icons/spell/spell_warlock_soulburn.png",
                    maxLv: 2,
                    position: [2, 4]
                },
                ability_warrior_shatteringthrow: {
                    name: '【技能】碎裂投掷',
                    desc: [''],
                    type: 'ability_warrior_shatteringthrow',
                    iconSrc: "./icons/spell/ability_warrior_shatteringthrow.png",
                    maxLv: 2,
                    position: [2, 5]
                },
                spell_nature_starfall: {
                    name: '【技能】月火术',
                    desc: [''],
                    type: 'spell_nature_starfall',
                    iconSrc: "./icons/spell/Spell_nature_starfall.png",
                    maxLv: 3,
                    position: [2, 6]
                },
                spell_arcane_starfire: {
                    name: '【技能】星火术',
                    desc: [''],
                    type: 'spell_arcane_starfire',
                    iconSrc: "./icons/spell/spell_arcane_starfire.png",
                    maxLv: 3,
                    position: [2, 7],
                    down: true
                },
                ability_druid_starfall: {
                    name: '【技能】无尽之星',
                    desc: [''],
                    type: 'ability_druid_starfall',
                    iconSrc: "./icons/spell/ability_druid_starfall.png",
                    maxLv: 1,
                    position: [2, 8],
                    down: true
                },
                spell_shadow_deathscream: {
                    name: '【技能】死亡嚎叫',
                    desc: [''],
                    type: 'spell_shadow_deathscream',
                    iconSrc: "./icons/spell/spell_shadow_deathscream.png",
                    maxLv: 1,
                    position: [2, 9]
                },
                ability_revendreth_paladin: {
                    name: '【技能】血祭',
                    desc: [''],
                    type: 'ability_revendreth_paladin',
                    iconSrc: "./icons/spell/ability_revendreth_paladin.png",
                    maxLv: 1,
                    position: [2, 10]
                }
            },
            defBranch: {
                defBranch: {
                    name: '防御系',
                    desc: [''],
                    type: 'powerBranch',
                    iconSrc: "./icons/accessory/Inv_jewelry_necklace_17.png",
                    maxLv: 100,
                    position: [-1, -1]
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
                    iconSrc: "./icons/spell/arm_large.png",
                    maxLv: 9,
                    position: [2, 0],
                },
                MR: {
                    name: '能量盾',
                    desc: ['',
                        '提升2%能量盾',
                        '提升4%能量盾',
                        '提升6%能量盾',
                        '提升8%能量盾',
                        '提升10%能量盾',
                        '提升12%能量盾',
                        '提升14%能量盾',
                        '提升16%能量盾',
                        '提升18%能量盾',
                    ],
                    type: 'MR',
                    iconSrc: "./icons/spell/mr_large.png",
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
                    iconSrc: "./icons/spell/str_large.png",
                    maxLv: 9,
                    position: [0, 1]
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
                    iconSrc: "./icons/spell/Spell_deathknight_bloodpresence.png",
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
                    iconSrc: "./icons/spell/Spell_deathknight_frostpresence.png",
                    maxLv: 5,
                    position: [3, 2]
                },
                // spell_holy_crusaderstrike: {
                //     name: '【技能】十字军打击',
                //     desc: [''],
                //     type: 'spell_holy_crusaderstrike',
                //     iconSrc: "./icons/spell/spell_holy_crusaderstrike.png",
                //     maxLv: 3,
                //     position: [2, 3]
                // },
                // warrior_talent_icon_innerrage: {
                //     name: '【技能】鲁莽',
                //     desc: [''],
                //     type: 'warrior_talent_icon_innerrage',
                //     iconSrc: "./icons/spell/warrior_talent_icon_innerrage.png",
                //     maxLv: 3,
                //     position: [2, 9]
                // }
            }
        }
    },
  }