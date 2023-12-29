
<template>
 <div class="container">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <nav>
        <button class="btn btn-secondary" :class="{active:viewType=='list'}" style="margin-right: 1rem;" @click="setViewType('list')"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
        <button class="btn btn-secondary" :class="{active:viewType=='detail'}" @click="setViewType('detail')"><i class="fa fa-th-large" aria-hidden="true"></i></button>
    </nav>
    <input class="switch" v-model="kickEnabled" type="checkbox" />
    <label for="login" style="margin-top: 0.25rem;">踢人</label>
    <div class="member scrollbar-morpheus-den">
        公会成员&nbsp;<span :style="{color: guild.member.length>=maxMember?'#F00':''}">{{guild.member.length+'/'+maxMember}}</span>
        <table>
            <thead>
                <tr>
                    <th scope="col">名称</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('lv')">等级</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('HP', 'stat')">生命</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('ATK', 'stat')">攻击</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('BLOCK', 'stat')">防御</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('GROWTH', 'stat')">成长</th>
                    <!-- <th scope="col">技能</th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="(v, k) in guild.member" :key="k">
                    <td>{{v.name}}</td>
                    <td>{{v.lv}}</td>
                    <td>{{v.stat.HP}}</td>
                    <td>{{v.stat.ATK}}</td>
                    <td>{{v.stat.BLOCK}}</td>
                    <td>{{v.stat.GROWTH}}</td>
                    <!-- <td style="width: 8em;">
                        <div class="skill" v-for="(id, index) in v.skill" :key="index">
                            <span class="skillName">{{guildSkill[id].name}}</span>
                        </div>
                    </td> -->
                    <td style="width: 4em;" v-if="kickEnabled">
                        <span class="button specialButton reject" @click="kick(k)">移除</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
 </div>
</template>
<script>

import { nameGenerator } from '../../assets/js/nameGenerator';
import { guildMemberConfig } from '@/assets/config/guildMemberConfig'
import { equipConfig } from '@/assets/config/equipConfig'
import { v4 as uuidv4 } from 'uuid';
export default {
    name:"guildMember",
    mixins: [nameGenerator, guildMemberConfig, equipConfig],
    components: {uuidv4},
    props: {
    },
    data () {
        return {
            //人类、矮人、暗夜精灵、侏儒、德莱尼、狼人、兽人、亡灵、牛头人、巨魔、血精灵、地精、熊猫人
            //Human、Dwarf、Night Elf、Gnome、Draenei、Worgen、Orc、Undead、Tauren、Troll、Blood Elf、Goblin、Pandaren、
            
            //虚空精灵、光铸德莱尼、黑铁矮人、库尔提拉斯人、机械侏儒、夜之子、至高岭牛头人、玛格汉兽人、赞达拉巨魔、狐人
            //Void Elf、Lightforged Draenei、Dark Iron Dwarf、Kul Tiran、Mechagnome、Nightborne、Highmountain Tauren、Maghar Orc、Zandalari Troll、Vulpera
            normalRace: ["Human", "Dwarf", "Night_Elf", "Gnome", "Draenei", "Worgen", "Orc", "Undead", "Tauren", "Troll", "Blood_Elf", "Goblin", "Pandaren"],
            advancedRace: ["Void_Elf", "Lightforged_Draenei", "Dark_Iron_Dwarf", "Kul_Tiran", "Mechagnome", "Nightborne", "Highmountain_Tauren", "Maghar_Orc", "Zandalari_Troll", "Vulpera"],
            skillPool: [
                ['train', 'shop', 'smith'],
                ['train2', 'shop2', 'smith2'],
                ['train3', 'shop3', 'smith3'],
                ['train4', 'shop4', 'smith4'],
                ['train5', 'shop5', 'smith5'],
                ['train6', 'shop6', 'smith6'],
            ],
            applicantList: [],
            typeName: {shop:'商店', smith:'铁匠铺', train:'练功房', train2:'中级练功房', train3:'高级练功房', mine: '矿场', herb: '药园'},
            viewType: 'list',
            sortKey: 'name',
            reverseSort: 1,
            kickEnabled: false
        }
    },
    mounted () {
        this.$store.globalComponent.guildMember = this;
        this.resetPlayerStat();
    },
    watch: {
    },
    computed: {
        guild() { return this.$store.state.guildAttribute; },
        player() { return this.$store.state.playerAttribute; },
        maxMember() { 
            let max = this.guild.guild.lv*5+5;
            // for(let build in this.guild) {
            //     if(build != 'guild' && this.guild[build].lv != null && this.guild[build].lv > 0)
            //         max += Math.floor(this.guild[build].lv/10+1);
            // }
            return max;
        },
    },
    methods: {
        generateApplicant(lv, race, name) {
            let applicant = {};
            applicant.lv = lv || 1;
            applicant.race = race || this.createRace();
            applicant.name = name || this.generateName(applicant.race);
            // 天赋：基础值
            applicant.talent = this.createTalent(applicant.race);
            // 属性：最终值
            applicant.stat = this.createStat(applicant);
            // applicant.skill = this.createSkill(applicant);
            applicant.special = [];
            applicant.id = this.generateMemberId();
            return applicant;
        },
        generateMemberId() {
            let id = uuidv4();
            return id;
        },
        createRace() {
            return 'Human';
        },
        createStat(applicant) {
            let stat = {
                HP: 0,
                ATK: 0,
                BLOCK: 0,
                GROWTH: 0
            };
            for(let s in stat) {
                stat[s] = applicant.talent[s];
            }
            return stat;
        },
        createTalent(race) {
            let talent = {};
            let initTalent = this.race[race].talent;
            for(let type in this.guildStat) {
                let ran = Math.random();
                let max = this.guildStat[type].max;
                let decimal = Math.pow(10, this.guildStat[type].decimal);
                if(ran>0.75)
                    talent[type] = Math.random()*90;
                else if(ran>0.9)
                    talent[type] = Math.random()*100;
                else
                    talent[type] = Math.random()*80;
                talent[type] = Math.round((max*talent[type]/100+initTalent[type])*decimal) / decimal;
            }
            return talent;
        },
        // 五边形属性图
        // createPoints(talent) {
        //     let points = "";
        //     let radius = 60;
        //     let count = 0;
        //     // 提前算好cos、sin函数
        //     let xy = [0, 1, 0.951056516, 0.309016994, 0.587785252, -0.809016994, -0.587785252, -0.809016994, -0.951056516, 0.309016994];
        //     let offsetx = 50;        
        //     let offsety = 50;  
        //     for(let num in talent) {
        //         radius = talent[num];
        //         points += Math.round(radius * xy[count++]*50/100)-offsetx + " ";
        //         points += Math.round(radius * xy[count++]*50/100)-offsety + " ";
        //     }
        //     points.trimEnd();
        //     return points;
        // },
        createSkill(applicant) {
            let skillList = [];
            for(let i=0; i<2+Math.floor(applicant.lv/10); i++) {
                let temp = this.generateSkill(applicant);
                if(temp == undefined)
                    continue;   
                if(skillList.length < 7)
                    skillList.push(temp);
                else
                    skillList[5] = temp;
            }
            return skillList;
        },
        generateSkill(applicant) {
            // let potential = applicant.stat.potential;
            let potential = 0;
            let skill = '';
            let ran = Math.random()*potential;
            let pool = this.skillPool[0];
            if(ran > 99) {
                pool = this.skillPool[5]
            } else if(ran > 95) {
                pool = this.skillPool[4]
            } else if(ran > 85) {
                pool = this.skillPool[3]
            } else if(ran > 65) {
                pool = this.skillPool[2]
            } else if(ran > 35) {
                pool = this.skillPool[1]
            }
            skill = pool[Math.floor(Math.random()*pool.length)];
            return skill;
        },
        levelUp(member) {
            if(member.lv >= this.player.lv)
                return;
            member.lv += 1;
            member.stat.HP += Math.round(member.talent.HP*member.stat.GROWTH);
            member.stat.ATK += Math.round(member.talent.ATK*member.stat.GROWTH);
            member.stat.BLOCK += Math.round(member.talent.BLOCK*member.stat.GROWTH);
        },
        levelupAll() {
            for(let index in this.guild.member) {
                this.levelUp(this.guild.member[index]);
            }
        },
        gainStat(member, type, value) {
            member.stat[type] += value;
        },
        resetPlayerStat() {
            for(let type in this.$store.state.memberAttribute) {
                this.$store.state.memberAttribute[type] = 0;
            }
            for(let index in this.guild.member) {
                let member = this.guild.member[index];
                for(let type in member.stat) {
                    this.$store.state.memberAttribute[type] += Math.round(member.stat[type]*0.1);
                }
            }
            this.$store.commit('set_player_attribute');
        },
        allCancel() {
            var guildPosition = this.$store.globalComponent["guildPosition"];
            var members = this.guild.member;
            for(let index in members) {
                let member = members[index];
                if(member.job == 'None')
                    continue;
                guildPosition.cancelPosition(member.job, guildPosition.findTarget(member));
            }
        },
        kick(k) {
            let member = this.guild.member[k];
            this.guild.member.splice(k, 1);
        },
        sortBy(type, type2='talent') {
            this.reverseSort = type==this.sortKey ? -1*this.reverseSort : -1;
            this.sortKey = type;
            if(type == 'lv') {
                this.guild.member.sort((a, b) => {
                    return this.reverseSort*(a[type]-b[type]);
                })
            } else {
                this.guild.member.sort((a, b) => {
                    return this.reverseSort*(a[type2][type]-b[type2][type]);
                })
            }
        },
        findTargetByID(id) {
            let list = this.guild.member;
            for(let i in list) {
                if(list[i].id == id)
                    return list[i];
            }
            return {};
        },
        setViewType(type) {
            // let value = e.target.value;
            this.viewType = type;
        },
    }
}
</script>
<style lang="scss" scoped>

.container {
    display: flex;
    flex-wrap: wrap;
    width: 50rem;
    margin: 0.5rem 0.5rem;
    padding: 0.5rem 0.5rem;
}

.member {
    padding: 0.5rem;
    margin: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 1rem;
    max-height: 35rem;
    width: 50rem;
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .mini-talent {
        font-size: 12px;
    }
    .list {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        padding: 0rem 0.5rem 1rem 0.5rem;
        width: 100%;
        .memberGrid {
            .action {
                width: 8rem;
                margin: auto 0rem;
            }
        }
    }
}
.applicant {
    padding: 0.5rem;
    margin: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 1rem;
    max-height: 35rem;
    width: 50rem;
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .list {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        padding: 0rem 0rem 1rem 0rem;
        width: 100%;
        // height: 12rem;
        .memberGrid {
            .action {
                display: flex;
                height: 3.5rem;
                width: 100%;
                margin: auto 0rem;
            }
        }
    }
    .equipTimer {
        position:absolute;
        bottom:0;
        right:0;
    }
}
.memberGrid {
    border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 0.3rem;
    margin: 0.25rem;
    width: 48%;
    display: flex;
    flex-wrap: wrap;
    .info {
        margin: auto 0rem;
        width: 7rem;
        .icon {
            width: 2.9rem;
            height: 2.9rem;
            background-color: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto;
            border-radius: 0.3rem;
            img {
                width:2.9rem;
                height:2.9rem;
                border-radius: 1rem;
            }
        }
        .name {
            text-align: center;
            margin: auto 0rem;
            overflow: auto;
        }
    }
    .skillList {
        display: flex;
        flex-direction: column;
        margin: auto;
        width: 15rem;
        .skill {
            .skillDesc {
                display: none;
            }
        }
        .skill:hover .skillName{
            display: none;
        }
        .skill:hover .skillDesc{
            display: inline;
        }
    }
}
.button:active {
    background: linear-gradient(#1f8258, #114435);
    text-shadow: 0 0 20px rgba(255,255,255,0.5);
    transform: scale(1);
    box-shadow: 0 0 75px rgba(43,137,68,0.5);
}
.btn {
    margin-left: -1rem;
    padding: .375rem 0rem;
    min-width: 2rem;
}
.hidden {
    display: none;
}
.switch {
    appearance: none;
    height: 2em;
    width: 4em;
    background-color: var(--secondary);
    cursor: pointer;
    border-radius: 1em;
    position: relative;
    transition: background-color 0.3s ease;
}
.switch::before {
    content: "";
    height: 100%;
    width: 50%;
    background-color: white;
    position: absolute;
    border-radius: 50%;
    border: var(--secondary) solid 0.2em;
    transition: transform 0.3s ease, border-color 0.3s ease;
}
.switch:checked {
    background-color: var(--primary);
}
.switch:checked::before {
    border-color: var(--primary);
    transform: translateX(100%);
}
</style>
