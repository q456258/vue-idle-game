
<template>
 <div class="container">
        <div class="member scrollbar-morpheus-den">
            公会成员
            <div class="list">
                <div class="grid" v-for="(v, k) in guild.member" :key="k">
                    <div class="info">
                        <div class="icon"><img :src="v.iconSrc"></div>
                        <div class="name">
                            {{v.name}}
                            <br>
                            {{race[v.race].name+' '+v.lv}}级
                            <br>
                            {{guildSkill[v.job].name}}
                        </div>
                    </div>
                    <div class="svg-pentagon">
                        <div class="statList">
                            <div :class="'stat ' +type" v-for="(value, type) in v.stat" :key="type">
                                <span class="statName">{{guildStat[type].name}}</span>
                                <span class="statDesc">{{'('+value+')'+guildStat[type].desc}}</span>
                            </div>
                        </div>
                        <svg id="J-svg-pentagon"  width="120" height="120">
                            <g transform="translate(130, 75)">
                                <polygon class="pentagon pentagon-5" points="-50 0.00 -2.45 -34.55 -20.61 -90.45 -79.39 -90.45 -97.55 -34.55"/>
                                <polygon class="pentagon pentagon-4" points="-50 -10.00 -11.96 -37.64 -26.49 -82.36 -73.51 -82.36 -88.04 -37.64"/>
                                <polygon class="pentagon pentagon-3" points="-50 -20.00 -21.47 -40.73 -32.37 -74.27 -67.63 -74.27 -78.53 -40.73"/>
                                <polygon class="pentagon pentagon-2" points="-50 -30.00 -30.98 -43.82 -38.24 -66.18 -61.76 -66.18 -69.02 -43.82"/>
                                <polygon class="pentagon pentagon-1" points="-50 -40.00 -40.49 -46.91 -44.12 -58.09 -55.88 -58.09 -59.51 -46.91"/>
                                <polygon class="pentagon pentagonAbility" :points="v.points" />
                            </g>
                        </svg>
                    </div>
                    <div class="skillList">
                        <div class="skill" v-for="(level, index) in v.skill" :key="index">
                            <span class="skillName">{{level+'级'+guildSkill[index].name}}</span>
                            <span class="skillDesc">({{guildSkill[index].desc}})</span>
                        </div>
                    </div>
                    <div class="special" v-for="(special, index) in v.special" :key="index">
                        {{special}}
                    </div>
                    <div class="action">
                        <div class="button kick">踢出公会</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="applicant scrollbar-morpheus-den">
            申请列表
            <div class="list">
                <div class="grid" v-for="(v, k) in applicantList" :key="k">
                    <div class="info">
                        <div class="icon"><img :src="v.iconSrc"></div>
                        <div class="name">
                            {{v.name}}
                            <br>
                            {{race[v.race].name+' '+v.lv}}级
                            <br>
                            {{guildSkill[v.job].name}}
                        </div>
                    </div>
                    <div class="svg-pentagon">
                        <div class="statList">
                            <div :class="'stat ' +type" v-for="(value, type) in v.stat" :key="type">
                                <span class="statName">{{guildStat[type].name}}</span>
                                <span class="statDesc">{{'('+value+')'+guildStat[type].desc}}</span>
                            </div>
                        </div>
                        <svg id="J-svg-pentagon"  width="120" height="120">
                            <g transform="translate(130, 75)">
                                <polygon class="pentagon pentagon-5" points="-50 0.00 -2.45 -34.55 -20.61 -90.45 -79.39 -90.45 -97.55 -34.55"/>
                                <polygon class="pentagon pentagon-4" points="-50 -10.00 -11.96 -37.64 -26.49 -82.36 -73.51 -82.36 -88.04 -37.64"/>
                                <polygon class="pentagon pentagon-3" points="-50 -20.00 -21.47 -40.73 -32.37 -74.27 -67.63 -74.27 -78.53 -40.73"/>
                                <polygon class="pentagon pentagon-2" points="-50 -30.00 -30.98 -43.82 -38.24 -66.18 -61.76 -66.18 -69.02 -43.82"/>
                                <polygon class="pentagon pentagon-1" points="-50 -40.00 -40.49 -46.91 -44.12 -58.09 -55.88 -58.09 -59.51 -46.91"/>
                                <polygon class="pentagon pentagonAbility" :points="v.points" />
                            </g>
                        </svg>
                    </div>
                    <div class="skillList">
                        <div class="skill" v-for="(level, index) in v.skill" :key="index">
                            <span class="skillName">{{level+'级'+guildSkill[index].name}}</span>
                            <span class="skillDesc">({{guildSkill[index].desc}})</span>
                        </div>
                    </div>
                    <div class="special" v-for="(special, index) in v.special" :key="index">
                        {{special}}
                    </div>
                    <div class="action">
                        <!-- <div class="button accept" @click="recruit(k)">招募</div> -->
                        <div class="button reject" @click="reject(k)">婉拒</div>
                    </div>
                </div>
            </div>
        </div>
 </div>
</template>
<script>
import { assist } from '../../assets/js/assist';
import {guildMemberConfig} from '@/assets/config/guildMemberConfig'
export default {
    name:"guildMember",
    mixins: [assist, guildMemberConfig],
    components: {},
    props: {
    },
    data () {
        return {
            tierProbability: [0.65, 0.85, 0.9, 0.99, 0.999, 1],
            //人类、矮人、暗夜精灵、侏儒、德莱尼、狼人、兽人、亡灵、牛头人、巨魔、血精灵、地精、熊猫人
            //Human、Dwarf、Night Elf、Gnome、Draenei、Worgen、Orc、Undead、Tauren、Troll、Blood Elf、Goblin、Pandaren、
            
            //虚空精灵、光铸德莱尼、黑铁矮人、库尔提拉斯人、机械侏儒、夜之子、至高岭牛头人、玛格汉兽人、赞达拉巨魔、狐人
            //Void Elf、Lightforged Draenei、Dark Iron Dwarf、Kul Tiran、Mechagnome、Nightborne、Highmountain Tauren、Maghar Orc、Zandalari Troll、Vulpera
            normalRace: ["Human", "Dwarf", "Night_Elf", "Gnome", "Draenei", "Worgen", "Orc", "Undead", "Tauren", "Troll", "Blood_Elf", "Goblin", "Pandaren"],
            advancedRace: ["Void_Elf", "Lightforged_Draenei", "Dark_Iron_Dwarf", "Kul_Tiran", "Mechagnome", "Nightborne", "Highmountain_Tauren", "Maghar_Orc", "Zandalari_Troll", "Vulpera"],
            basicSkill: ['train', 'train2', 'train3', 'shop', 'smith'],
            applicantList: [],
            equipCost: [],
        }
    },
    mounted () {
        this.generateApplicant(29)
        this.generateApplicant(81)
        this.generateApplicant(110)
    },
    watch: {
    },
    computed: {
        guild() { return this.$store.state.guildAttribute; },
    },
    methods: {
        // 每10级随机升级一级技能
        // 每10级技能随机获得一个对应特殊技能
        // 专注(技能升级的随机性）、悟性（技能升级概率）、机缘（特殊技能获得概率）、潜力（升级概率）、效率（工作效率）


        generateApplicant(lv, race) {
            var applicant = {};
            // applicant.tier = tierIndex > -1 ? this.tier[tierIndex] : this.createTier(bonus);
            applicant.lv = lv || 1;
            applicant.name = '阿萨德';
            applicant.race = race || this.createRace();
            applicant.stat = this.createStat(applicant.race);
            applicant.points = this.createPoints(applicant.stat);
            applicant.job = this.createJob();
            applicant.skill = this.createSkill(applicant);
            applicant.special = {};

            this.applicantList.push(applicant);
        },
        createRace() {
            return 'Human';
        },
        createStat(race) {
            var stat = {};
            var initStat = this.race[race].stat;
            for(var type in this.guildStat) {
                let ran = Math.random();
                if(ran>0.75)
                    stat[type] = Math.random()*90;
                else if(ran>0.9)
                    stat[type] = Math.random()*100;
                else
                    stat[type] = Math.random()*80;
            }
            for(var type in initStat) {
                stat[type] = Math.round((100-initStat[type])*stat[type]/100);
                stat[type] += initStat[type];
            }
            return stat;
        },
        createPoints(stat) {
            var points = "";
            var radius = 60;
            var count = 0;
            // 提前算好cos、sin函数，节省一点算力
            var xy = [0, 1, 0.951056516, 0.309016994, 0.587785252, -0.809016994, -0.587785252, -0.809016994, -0.951056516, 0.309016994];
            var offsetx = 50;        
            var offsety = 50;  
            for(var num in stat) {
                radius = stat[num];
                points += Math.round(radius * xy[count++]*50)/100-offsetx + " ";
                points += Math.round(radius * xy[count++]*50)/100-offsety + " ";
            }
            points.trimEnd();
            return points;
        },
        createJob() {
            var jobs = ['train', 'train2', 'train3', 'smith', 'shop'];
            return jobs[Math.floor(Math.random()*jobs.length)];
        },
        createSkill(applicant) {
            var skillList = {};
            for(var i=0; i<2+Math.floor(applicant.lv/10); i++) {
                let temp = this.generateSkill(applicant);
                if(temp == undefined)
                    continue;   
                if(skillList[temp] == undefined)
                    skillList[temp] = 1;
                else
                    skillList[temp]++;
            }
            return skillList;
        },
        generateSkill(applicant) {
            var job = applicant.job;
            var intellect = applicant.stat.intellect;
            var focus = applicant.stat.focus;
            var skill = '';
            if(Math.random()*100 < intellect)
                return;
            if(Math.random()*100 < focus)
                skill = job;
            else
                skill = this.basicSkill[Math.floor(Math.random()*this.basicSkill.length)];
            if(applicant.skill != undefined && applicant.skill[skill] > 5 && applicant.skill[skill]%5 == 4)
                this.generateSpecialSkill(applicant);
            return skill;
        },
        generateSpecialSkill(applicant) {
            return {};
        },
        recruit(k) {
            this.guild.member.push(this.applicantList[k]);
            this.applicantList.splice(k, 1);
            // this.draw() 
            this.computeLevel();
        },
        reject(k) {
            this.applicantList.splice(k, 1);
        },
        computeLevel() {
            var memList = this.guild.member;
            var skillList = {};
            for(let mem in memList) {
                for(let skill in memList[mem].skill) {
                    if(skillList[skill] == undefined) 
                        skillList[skill] = memList[mem].skill[skill];
                    else
                        skillList[skill] += memList[mem].skill[skill];
                }
            }
            //重新计算公会建筑等级
            // for(let skill in skillList) {
            //     this.guild[skill] = skillList[skill];
            // }
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
    .list {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        padding: 0rem 0.5rem 1rem 0.5rem;
        width: 100%;
        .grid {
            .action {
                width: 8rem;
                margin: auto 0rem;
                .kick {
                    font-size: 20px;
                    line-height: 30px;
                    margin: 0.5rem;
                    width: 100px;
                    height: 40px;
                    background: linear-gradient(#771d1d, #380e0e);
                    border: 3px #792525 solid; 
                    box-shadow: 0 0 50px rgba(117, 0, 0, 0.5);
                }
                .kick:active {
                    background: linear-gradient(#821f1f, #441111);
                    box-shadow: 0 0 75px rgba(137, 43, 43, 0.5);
                }
            }
        }
    }
}
.applicant {
    padding: 0.5rem;
    margin: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 1rem;
    height: 17rem;
    width: 50rem;
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .list {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        padding: 0rem 0.5rem 1rem 0.5rem;
        width: 100%;
        // height: 12rem;
        .grid {
            .action {
                width: 6rem;
                margin: auto 0rem;
                .accept {
                    font-size: 20px;
                    line-height: 30px;
                    margin: 0.5rem;
                    width: 70px;
                    height: 40px;
                }
                .reject {
                    font-size: 20px;
                    line-height: 30px;
                    margin: 0.5rem;
                    width: 70px;
                    height: 40px;
                    background: linear-gradient(#771d1d, #380e0e);
                    border: 3px #792525 solid; 
                    box-shadow: 0 0 50px rgba(117, 0, 0, 0.5);
                }
                .reject:active {
                    background: linear-gradient(#821f1f, #441111);
                    box-shadow: 0 0 75px rgba(137, 43, 43, 0.5);
                }
            }
        }
    }
    .equipTimer {
        position:absolute;
        bottom:0;
        right:0;
    }
}
.grid {
    border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 0.3rem;
    margin: 0.25rem;
    // height: 4rem;
    // width: 7rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .info {
        margin: auto 0.5rem;
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
    .statList {
        position: relative;
        display: flex;
        flex-direction: column;
        margin: auto 0rem;
        width: 10rem;
        font-size: 0.75rem;
        .stat {
            .statDesc {
                display: none;
            }
        }
        .stat:hover .statName{
            position: absolute;
            width: 0px;
            visibility: hidden;
        }
        .stat:hover .statDesc{
            display: inline;
        }
        .focus {
            position: absolute;
            top: 0rem;
        }
        .focus {
            position: absolute;
            top: 7.3rem;
            left: 6.3rem;
        }
        .intellect {
            position: absolute;
            top: 3.6rem;
            left: 8.2rem;
        }
        .luck {
            position: absolute;
            top: 0.2rem;
            left: 4.3rem;
        }
        .potential {
            position: absolute;
            top: 3.6rem;
            left: 0.4rem;
        }
        .effectiveness {
            position: absolute;
            top: 7.3rem;
            left: 1.8rem;
            width: 4rem;
            text-align: left;
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
            position: absolute;
            width: 0px;
            visibility: hidden;
        }
        .skill:hover .skillDesc{
            display: inline;
        }
    }
}
.button {
    font-size: 60px;
    text-align: center;
    line-height: 85px;
    color: #fff;
    margin: 0 auto;
    margin-top: 150px;
    width: 350px;
    height: 85px;
    background: linear-gradient(#1d7751, #0e382c);
    border: 3px #25793b solid; 
    border-radius: 5px;
    text-shadow: 0 0 20px rgba(255,255,255,0.3);
    transition: .1s;
    transform: scale(1);
    cursor: pointer;
    user-select: none;
    box-shadow: 0 0 50px rgba(0,117,9,0.5);
    overflow: hidden;
}

.button:hover {
    text-shadow: 0 0 20px rgba(255,255,255,0.5);
    transform: scale(1.05);
}

.button:active {
    background: linear-gradient(#1f8258, #114435);
    text-shadow: 0 0 20px rgba(255,255,255,0.5);
    transform: scale(1);
    box-shadow: 0 0 75px rgba(43,137,68,0.5);
}

.button:after {
    content: "";
    position: relative;
    top: -120px;
    left: -90px;
    display: block;
    width: 35px;
    height: 150px;
    background: rgba(255, 255, 255, 0.5);
    transform: rotate(35deg);
    filter: blur(20px);
    transition: none;
}

.button:hover:after {
    left: 400px;
    transition: .6s ease-in-out;
}
.svg-pentagon {
    text-align: center;
}
.pentagon {
    stroke-width:0.5px;
    transform: rotate(-36deg);
}
.pentagon-1 {
    fill: rgb(46, 46, 51);
    stroke-width: 0.7px;
    stroke: rgba(101, 93, 92, 0.75);
}
.pentagon-2 {
    fill: rgb(46, 46, 51);
    stroke-width: 0.7px;
    stroke: rgba(101, 93, 92, 0.75);
}
.pentagon-3 {
    fill: rgb(46, 46, 51);
    stroke-width: 0.7px;
    stroke: rgba(101, 93, 92, 0.75);
}
.pentagon-4 {
    fill: rgb(46, 46, 51);
    stroke-width: 0.7px;
    stroke: rgba(101, 93, 92, 0.75);
}
.pentagon-5 {
    fill: rgb(46, 46, 51);
    stroke-width: 0.7px;
    stroke: rgba(101, 93, 92, 0.75);
}
.pentagonAbility {
    /*fill: #F17D61;*/
    fill: rgb(204, 173, 112);
    fill-opacity: 0.1;
    stroke: rgb(204, 173, 112);
    stroke-width: 1.2px;
}
</style>
