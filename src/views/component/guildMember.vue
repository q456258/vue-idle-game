
<template>
 <div class="container">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <nav>
        <button class="btn btn-secondary" :class="{active:viewType=='list'}" style="margin-right: 1rem;" @click="setViewType('list')"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
        <button class="btn btn-secondary" :class="{active:viewType=='detail'}" @click="setViewType('detail')"><i class="fa fa-th-large" aria-hidden="true"></i></button>
    </nav>
    <input class="switch" v-model="kickEnabled" type="checkbox" />
    <label for="login" style="margin-top: 0.25rem;">踢人</label>
    <div class="member scrollbar-morpheus-den" v-if="viewType=='list'">
        公会成员&nbsp;<span :style="{color: guild.member.length>=maxMember?'#F00':''}">{{guild.member.length+'/'+maxMember}}</span>
        <button class="btn btn-secondary" v-if="size=='maximize'" style="margin-left: 1rem;" @click="changeSize('minimize')"><i class="fa fa-window-minimize" aria-hidden="true"></i></button>
        <button class="btn btn-secondary" v-if="size=='minimize'" style="margin-left: 1rem;" @click="changeSize('maximize')"><i class="fa fa-window-maximize" aria-hidden="true"></i></button>

        <table v-if="size=='maximize'">
            <thead>
                <tr>
                    <th scope="col">名称</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('lv')">等级</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('STR', 'stat')">力量</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('AGI', 'stat')">敏捷</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('STA', 'stat')">耐力</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('INT', 'stat')">智力</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('SPI', 'stat')">精神</th>
                    <th scope="col">技能</th>
                    <th scope="col">职位</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(v, k) in guild.member" :key="k">
                    <td>{{v.name}}</td>
                    <td>{{v.lv}}</td>
                    <td>{{v.stat.STR}}
                        <!-- <br>
                        <span class="mini-talent">({{v.talent.STR}})</span> -->
                    </td>
                    <td>{{v.stat.AGI}}
                        <!-- <br>
                        <span class="mini-talent">({{v.talent.AGI}})</span> -->
                    </td>
                    <td>{{v.stat.STA}}
                        <!-- <br>
                        <span class="mini-talent">({{v.talent.STA}})</span> -->
                    </td>
                    <td>{{v.stat.INT}}
                        <!-- <br>
                        <span class="mini-talent">({{v.talent.INT}})</span> -->
                    </td>
                    <td>{{v.stat.SPI}}
                        <!-- <br>
                        <span class="mini-talent">({{v.talent.SPI}})</span> -->
                    </td>
                    <td style="width: 8em;">
                        <div class="skill" v-for="(id, index) in v.skill" :key="index">
                            <span class="skillName">{{guildSkill[id].name}}</span>
                        </div>
                    </td>
                    <td style="width: 6em;">
                        <span v-if="v.job=='None'">空闲</span>
                        <span v-else>{{typeName[v.job]}}</span>
                        <div class="button specialButton accept" v-if="positionType!='None'" @click="assignPosition(k)">任命</div>
                        <span class="button specialButton kick" v-if="kickEnabled" @click="kick(k)">踢出</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="member scrollbar-morpheus-den" v-if="viewType=='detail'">
        公会成员&nbsp;<span :style="{color: guild.member.length>=maxMember?'#F00':''}">{{guild.member.length+'/'+maxMember}}</span>
        <button class="btn btn-secondary" v-if="size=='maximize'" style="margin-left: 1rem;" @click="changeSize('minimize')"><i class="fa fa-window-minimize" aria-hidden="true"></i></button>
        <button class="btn btn-secondary" v-if="size=='minimize'" style="margin-left: 1rem;" @click="changeSize('maximize')"><i class="fa fa-window-maximize" aria-hidden="true"></i></button>

        <div class="list" v-if="size=='maximize'">        
            <table>
                <thead>
                    <tr>
                        <th scope="col" style="cursor:pointer" @click="sortBy('lv')">等级</th>
                        <th scope="col" style="cursor:pointer" @click="sortBy('STR', 'stat')">力量</th>
                        <th scope="col" style="cursor:pointer" @click="sortBy('AGI', 'stat')">敏捷</th>
                        <th scope="col" style="cursor:pointer" @click="sortBy('STA', 'stat')">耐力</th>
                        <th scope="col" style="cursor:pointer" @click="sortBy('INT', 'stat')">智力</th>
                        <th scope="col" style="cursor:pointer" @click="sortBy('SPI', 'stat')">精神</th>
                    </tr>
                </thead>
            </table>
            <div class="memberGrid" v-for="(v, k) in guild.member" :key="k">
                <div class="info">
                    <div class="icon"><img :src="v.iconSrc"></div>
                    <div class="name">
                        {{v.name}}
                        <br>
                        {{race[v.race].name+' '+v.lv}}级
                    </div>
                </div>
                <div class="svg-pentagon">
                    <div class="statList">
                        <div :class="'stat ' +type" v-for="(value, type) in v.talent" :key="type">
                            <span class="statName">{{guildStat[type].name}}</span>
                            <span class="statDesc">{{'('+value+')'+guildStat[type].desc}}</span>
                        </div>
                    </div>
                    <svg id="J-svg-pentagon"  width="120" height="120">
                        <g transform="translate(10, 15)">
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
                    <div class="skill" v-for="(id, index) in v.skill" :key="index">
                        <span class="skillName">{{guildSkill[id].name}}</span>
                        <span class="skillDesc">({{guildSkill[id].desc}})</span>
                    </div>
                </div>
                <div class="action">
                    <span v-if="v.job=='None'">空闲</span>
                    <span v-else>{{typeName[v.job]}}</span>
                    <div class="button accept" v-if="positionType!='None'" @click="assignPosition(k)">任命</div>
                    <div class="button kick" v-if="kickEnabled" @click="kick(k)">踢出公会</div>
                </div>
            </div>
        </div>
    </div>
 </div>
</template>
<script>
import { assist } from '../../assets/js/assist';
import { nameGenerator } from '../../assets/js/nameGenerator';
import { guildMemberConfig } from '@/assets/config/guildMemberConfig'
import { equipConfig } from '@/assets/config/equipConfig'
export default {
    name:"guildMember",
    mixins: [assist, nameGenerator, guildMemberConfig, equipConfig],
    components: {},
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
            // applicantList: [],
            positionList: [['None','空闲'], ['trainManager','练功房管理'], ['train2Manager','中级练功房管理'], ['train3Manager','高级练功房管理']],
            positionType: 'None',
            typeName: {shop:'商店', smith:'铁匠铺', train:'练功房', train2:'中级练功房', train3:'高级练功房', mine: '矿场', herb: '药园', bar: '酒馆'},
            viewType: 'list',
            size: 'maximize',
            sortKey: 'name',
            reverseSort: 1,
            kickEnabled: false
        }
    },
    mounted () {
        this.resetPlayerStat();
    },
    watch: {
    },
    computed: {
        guild() { return this.$store.state.guildAttribute; },
        player() { return this.$store.state.playerAttribute; },
        maxMember() { 
            let max = 2;
            for(let build in this.guild) {
                if(build != 'guild' && this.guild[build].lv != null && this.guild[build].lv > 0)
                    max += Math.floor(this.guild[build].lv/10+1);
            }
            return max;
        },
        applicantList() {
            var guild = this.findBrothersComponents(this, 'guild', false)[0];
            var guildPosition = this.findComponentDownward(guild, 'guildPosition');
            return guildPosition.applicantList;
        }
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
            applicant.points = this.createPoints(applicant.talent);
            applicant.skill = this.createSkill(applicant);
            applicant.special = [];
            applicant.id = this.generateMemberId();
            this.applicantList.push(applicant);
        },
        generateMemberId() {
            let id = Math.floor(Math.random()*90071992547);
            let attemp = 0;
            while(this.findTargetByID(id).id != undefined || attemp>=10) {
                id = Math.floor(Math.random()*90071992547);
                attemp++;
            }
            if(attemp>=10)
                console.log("你这id生成有问题啊?");
            return id;
        },
        createRace() {
            return 'Human';
        },
        createStat(applicant) {
            let stat = {
                STR: 0,
                AGI: 0,
                STA: 0,
                INT: 0,
                SPI: 0
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
                if(ran>0.75)
                    talent[type] = Math.random()*90;
                else if(ran>0.9)
                    talent[type] = Math.random()*100;
                else
                    talent[type] = Math.random()*80;
            }
            for(let type in initTalent) {
                talent[type] = Math.round((100-initTalent[type])*talent[type]/100);
                talent[type] += initTalent[type];
            }
            return talent;
        },
        createPoints(talent) {
            let points = "";
            let radius = 60;
            let count = 0;
            // 提前算好cos、sin函数
            let xy = [0, 1, 0.951056516, 0.309016994, 0.587785252, -0.809016994, -0.587785252, -0.809016994, -0.951056516, 0.309016994];
            let offsetx = 50;        
            let offsety = 50;  
            for(let num in talent) {
                radius = talent[num];
                points += Math.round(radius * xy[count++]*50)/100-offsetx + " ";
                points += Math.round(radius * xy[count++]*50)/100-offsety + " ";
            }
            points.trimEnd();
            return points;
        },
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
            if(member.lv%10 == 0) {
                let temp = this.generateSkill(member);
                if(temp == undefined)
                    return;   
                if(member.skill[temp] == undefined)
                    member.skill[temp] = 1;
                else
                    member.skill[temp]++;
            }
            // 升级暂时先不加属性了
            // this.gainStat(member);
        },
        levelupAll() {
            for(let index in this.guild.member) {
                this.levelUp(this.guild.member[index]);
            }
            this.$store.commit('set_player_attribute');
        },
        gainStat(member, type, value) {
            member.stat[type] += value;
            // this.playerGainStat(type, value);
        },
        playerGainStat(type, value) {
            this.$store.state.memberAttribute[type] += Math.round(value*0.1);
            this.$store.commit('set_player_attribute');
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
        recruit(k) {
            if(this.guild.member.length >= this.maxMember)
                return;
            let member = this.applicantList[k];
            for(let type in member.stat) 
                this.playerGainStat(type, Math.round(member.stat[type]*0.1));
            this.applicantList[k].job = 'None';
            this.applicantList[k].isMember = true;
            this.guild.member.push(this.applicantList[k]);
            for(let index in this.applicantList[k].skill) {
                let skill = this.applicantList[k].skill[index];
                let type = this.guildSkill[skill].type;
                let value = this.guildSkill[skill].value;
                this.guild[type].lv = this.guild[type].lv + value;
                this.guild['guild'].lv = this.guild['guild'].lv + value;
            }
            this.applicantList.splice(k, 1);
            this.$store.commit('set_player_attribute');
        },
        reject(k) {
            this.applicantList.splice(k, 1);
        },
        
        allCancel() {
            var guild = this.findBrothersComponents(this, 'guild', false)[0];
            var guildPosition = this.findComponentDownward(guild, 'guildPosition');
            var members = this.guild.member;
            for(let index in members) {
                let member = members[index];
                if(member.job == 'None')
                    continue;
                guildPosition.cancelPosition(member.job, guildPosition.findTarget(member));
            }
        },
        autoAssign() {
            var guild = this.findBrothersComponents(this, 'guild', false)[0];
            var guildPosition = this.findComponentDownward(guild, 'guildPosition');
            var members = this.guild.member;
            members.sort((a, b) => {
                return (b.stat['efficiency']-a.stat['efficiency']);
            })
            var need = {};
            for(let type in guildPosition.building) {
                need[type] = guildPosition.maxMember[type]-guildPosition.building[type].length;
            }
            for(let index in members) {
                let member = members[index];
                if(member.job != 'None')
                    continue;
                if(need[member.career] > 0) {
                    guildPosition.assignPosition(member.career, -1, member);
                    need[member.career]--;
                }
            }
            for(let index in members) {
                let member = members[index];
                if(member.job != 'None')
                    continue;
                for(let type in guildPosition.building) {
                    if(need[type] > 0) {
                        guildPosition.assignPosition(type, -1, member);
                        need[type]--;
                        break;
                    }
                }
            }
        },
        assignPosition(k) {
            var index = this.findComponentUpward(this, 'index');
            var guild = this.findBrothersComponents(this, 'guild', false)[0];
            var guildPosition = this.findComponentDownward(guild, 'guildPosition');
            guildPosition.assignPosition(this.positionType, this.positionIndex, this.guild.member[k])
            this.positionType = 'None';
            index.displayPage = 'guild';
            guildPosition.$forceUpdate();
        },
        kick(k) {
            let member = this.guild.member[k];
            for(let type in member.stat)
                this.playerGainStat(type, -1*Math.round(member.stat[type]*0.1));
            var guild = this.findBrothersComponents(this, 'guild', false)[0];
            var guildPosition = this.findComponentDownward(guild, 'guildPosition');
            guildPosition.cancelPosition(this.guild.member[k].job, guildPosition.findTarget(this.guild.member[k]));
            for(let index in member.skill) {
                let skill = member.skill[index];
                let type = this.guildSkill[skill].type;
                let value = this.guildSkill[skill].value;
                this.guild[type].lv = this.guild[type].lv - value;
                this.guild['guild'].lv = this.guild['guild'].lv - value;
            }
            this.guild.member.splice(k, 1);
            this.$store.commit('set_player_attribute');
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
        sortAppBy(type, type2='talent') {
            this.reverseSort = type==this.sortKey ? -1*this.reverseSort : -1;
            this.sortKey = type;
            if(type == 'lv') {
                this.applicantList.sort((a, b) => {
                    return this.reverseSort*(a[type]-b[type]);
                })
            } else {
                this.applicantList.sort((a, b) => {
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
        changeSize(size) {
            this.size = size;
        }
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
    // height: 4rem;
    // width: 7rem;
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

// .button:hover {
//     text-shadow: 0 0 20px rgba(255,255,255,0.5);
//     transform: scale(1.05);
// }

.button:active {
    background: linear-gradient(#1f8258, #114435);
    text-shadow: 0 0 20px rgba(255,255,255,0.5);
    transform: scale(1);
    box-shadow: 0 0 75px rgba(43,137,68,0.5);
}

// .button:after {
//     content: "";
//     position: relative;
//     top: -120px;
//     left: -90px;
//     display: block;
//     width: 35px;
//     height: 150px;
//     background: rgba(255, 255, 255, 0.5);
//     transform: rotate(35deg);
//     filter: blur(20px);
//     transition: none;
//     overflow:hidden;
// }
// .button:hover:after {
//     left: 400px;
//     transition: .6s ease-in-out;
// }
.kick {
    font-size: 20px;
    line-height: 30px;
    margin: auto;
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
.btn {
    margin-left: -1rem;
    padding: .375rem 0rem;
    min-width: 2rem;
}
.hidden {
    display: none;
}
// .memberTable {
//     color: rgb(238, 238, 238);
//     border-collapse: separate;
//     border-spacing: 0px;
// }
// .memberTable td, .memberTable th {
//     padding: 2px 0px 1px 5px;
//     border-top: none;
//     vertical-align: middle;
//     text-align: left;
// }
// .memberTable th {
//     border-top-left-radius: 5px;
//     border-top-right-radius: 5px;
//     margin-left: 7px;
//     border: 1px solid #494745;
//     border-bottom: none;
//     background-color: #231f1b;
// }
// .memberTable tr {
//     height: 20px;
// }
// .memberTable tr:nth-of-type(odd) td{
//     background-color: #161616;
// }
// tr:nth-of-type(even) td{
    // background-color: lighten(#000000, 15%);
// }

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
