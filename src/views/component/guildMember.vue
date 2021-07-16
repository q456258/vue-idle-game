
<template>
 <div class="container">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <nav>
        <button class="btn btn-secondary" :class="{active:viewType=='list'}" style="margin-right: 1rem;" @click="setViewType('list')"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
        <button class="btn btn-secondary" :class="{active:viewType=='detail'}" @click="setViewType('detail')"><i class="fa fa-th-large" aria-hidden="true"></i></button>
    </nav>
    <div class="btn btn-danger" style="margin-left: 2rem;" @click="autoAssign()">一键分配</div>
    <div class="btn btn-danger" style="margin-left: 1rem;" @click="allCancel()">一键取消</div>
    <input class="switch" v-model="kickEnabled" type="checkbox" />
    <label for="login" style="margin-top: 0.25rem;">踢人</label>
    <div class="member scrollbar-morpheus-den" v-if="viewType=='list'">
        公会成员&nbsp;<span :style="{color: guild.member.length>=maxMember?'#F00':''}">{{guild.member.length+'/'+maxMember}}</span>
        <button class="btn btn-secondary" v-if="size=='maximize'" style="margin-left: 1rem;" @click="changeSize('minimize')"><i class="fa fa-window-minimize" aria-hidden="true"></i></button>
        <button class="btn btn-secondary" v-if="size=='minimize'" style="margin-left: 1rem;" @click="changeSize('maximize')"><i class="fa fa-window-maximize" aria-hidden="true"></i></button>

        <table class="table" v-if="size=='maximize'">
            <thead>
                <tr>
                    <th scope="col">名字</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('lv')">等级</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('career')">职业</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('focus')">专注</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('intellect')">悟性</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('luck')">运势</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('potential')">潜力</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('efficiency')">效率</th>
                    <th scope="col" style="cursor:pointer" @click="sortBy('job')">职位</th>
                    <th scope="col">技能</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(v, k) in guild.member" :key="k">
                    <td>{{v.name}}</td>
                    <td>{{v.lv}}</td>
                    <td>{{guildSkill[v.career].name}}</td>
                    <td>{{v.stat.focus}}</td>
                    <td>{{v.stat.intellect}}</td>
                    <td>{{v.stat.luck}}</td>
                    <td>{{v.stat.potential}}</td>
                    <td>{{v.stat.efficiency}}</td>
                    <td>
                        <span v-if="v.job=='None'">空闲</span>
                        <span v-else>{{typeName[v.job]}}</span>
                    </td>
                    <td style="width: 8em;">
                        <div @click="show($event)" > 显示/隐藏
                            <div class="skillList hidden">
                                <div class="skill" v-for="(level, index) in v.skill" :key="index">
                                    <span class="skillName">{{level+'级'+guildSkill[index].name}}</span>
                                </div>
                                <div class="skill" v-for="(special, index) in v.special" :key="index">
                                    <span class="skillName">{{guildSpecialSkill[special].name}}</span>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td style="width: 6em;">
                        <span class="button accept" v-if="positionType!='None'" @click="assignPosition(k)">任命</span>
                        <br>
                        <span class="button kick" v-if="kickEnabled" @click="kick(k)">踢出</span>
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
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col" style="cursor:pointer" @click="sortBy('lv')">等级</th>
                        <th scope="col" style="cursor:pointer" @click="sortBy('career')">职业</th>
                        <th scope="col" style="cursor:pointer" @click="sortBy('focus')">专注</th>
                        <th scope="col" style="cursor:pointer" @click="sortBy('intellect')">悟性</th>
                        <th scope="col" style="cursor:pointer" @click="sortBy('luck')">运势</th>
                        <th scope="col" style="cursor:pointer" @click="sortBy('potential')">潜力</th>
                        <th scope="col" style="cursor:pointer" @click="sortBy('efficiency')">效率</th>
                        <th scope="col" style="cursor:pointer" @click="sortBy('job')">职位</th>
                    </tr>
                </thead>
            </table>
            <div class="grid" v-for="(v, k) in guild.member" :key="k">
                <div class="info">
                    <div class="icon"><img :src="v.iconSrc"></div>
                    <div class="name">
                        {{v.name}}
                        <br>
                        {{race[v.race].name+' '+v.lv}}级
                        <br>
                        {{guildSkill[v.career].name}}
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
                    <div class="skill" v-for="(level, index) in v.skill" :key="index">
                        <span class="skillName">{{level+'级'+guildSkill[index].name}}</span>
                        <span class="skillDesc">({{guildSkill[index].desc}})</span>
                    </div>
                    <div class="skill" v-for="(special, index) in v.special" :key="index">
                        <span class="skillName">{{guildSpecialSkill[special].name}}</span>
                        <span class="skillDesc">({{guildSpecialSkill[special].desc}})</span>
                    </div>
                </div>
                <div class="action">
                    <span v-if="v.job=='None'">空闲</span>
                    <span v-else>{{typeName[v.job]}}</span>
                    <div class="button accept" v-if="positionType!='None'" @click="assignPosition(k)">任命</div>
                    <div class="button kick"  v-if="kickEnabled" @click="kick(k)">踢出公会</div>
                </div>
            </div>
        </div>
    </div>
    <div class="member scrollbar-morpheus-den" v-if="viewType=='list'">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">名字</th>
                    <th scope="col" style="cursor:pointer" @click="sortAppBy('lv')">等级</th>
                    <th scope="col" style="cursor:pointer" @click="sortAppBy('career')">职业</th>
                    <th scope="col" style="cursor:pointer" @click="sortAppBy('focus')">专注</th>
                    <th scope="col" style="cursor:pointer" @click="sortAppBy('intellect')">悟性</th>
                    <th scope="col" style="cursor:pointer" @click="sortAppBy('luck')">运势</th>
                    <th scope="col" style="cursor:pointer" @click="sortAppBy('potential')">潜力</th>
                    <th scope="col" style="cursor:pointer" @click="sortAppBy('efficiency')">效率</th>
                    <th scope="col">技能</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(v, k) in applicantList" :key="k">
                    <td>{{v.name}}</td>
                    <td>{{v.lv}}</td>
                    <td>{{guildSkill[v.career].name}}</td>
                    <td>{{v.stat.focus}}</td>
                    <td>{{v.stat.intellect}}</td>
                    <td>{{v.stat.luck}}</td>
                    <td>{{v.stat.potential}}</td>
                    <td>{{v.stat.efficiency}}</td>
                    <td style="width: 8em;">
                        <div @click="show($event)" > 显示/隐藏
                            <div class="skillList hidden">
                                <div class="skill" v-for="(level, index) in v.skill" :key="index">
                                    <span class="skillName">{{level+'级'+guildSkill[index].name}}</span>
                                </div>
                                <div class="skill" v-for="(special, index) in v.special" :key="index">
                                    <span class="skillName">{{guildSpecialSkill[special].name}}</span>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td style="width: 6em;">
                        <span class="button accept" @click="recruit(k)">招募</span>
                        <br>
                        <span class="button reject" @click="reject(k)">婉拒</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="applicant scrollbar-morpheus-den" v-if="viewType=='detail'">
        申请列表
        <table class="table">
            <thead>
                <tr>
                    <th scope="col" style="cursor:pointer" @click="sortAppBy('lv')">等级</th>
                    <th scope="col" style="cursor:pointer" @click="sortAppBy('career')">职业</th>
                    <th scope="col" style="cursor:pointer" @click="sortAppBy('focus')">专注</th>
                    <th scope="col" style="cursor:pointer" @click="sortAppBy('intellect')">悟性</th>
                    <th scope="col" style="cursor:pointer" @click="sortAppBy('luck')">运势</th>
                    <th scope="col" style="cursor:pointer" @click="sortAppBy('potential')">潜力</th>
                    <th scope="col" style="cursor:pointer" @click="sortAppBy('efficiency')">效率</th>
                </tr>
            </thead>
        </table>
        <div class="list">
            <div class="grid" v-for="(v, k) in applicantList" :key="k">
                <div class="info">
                    <div class="icon"><img :src="v.iconSrc"></div>
                    <div class="name">
                        {{v.name}}
                        <br>
                        {{race[v.race].name+' '+v.lv}}级
                        <br>
                        {{guildSkill[v.career].name}}
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
                    <div class="skill" v-for="(level, index) in v.skill" :key="index">
                        <span class="skillName">{{level+'级'+guildSkill[index].name}}</span>
                        <span class="skillDesc">({{guildSkill[index].desc}})</span>
                    </div>
                    <div class="skill" v-for="(special, index) in v.special" :key="index">
                        <span class="skillName">{{guildSpecialSkill[special].name}}</span>
                        <span class="skillDesc">({{guildSpecialSkill[special].desc}})</span>
                    </div>
                </div>
                <div class="action">
                    <div class="button accept" @click="recruit(k)">招募</div>
                    <div class="button reject" @click="reject(k)">婉拒</div>
                </div>
            </div>
        </div>
    </div>
 </div>
</template>
<script>
import { assist } from '../../assets/js/assist';
import { nameGenerator } from '../../assets/js/nameGenerator';
import {guildMemberConfig} from '@/assets/config/guildMemberConfig'
export default {
    name:"guildMember",
    mixins: [assist, nameGenerator, guildMemberConfig],
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
            basicSkill: ['train', 'train2', 'train3', 'shop', 'smith'],
            applicantList: [],
            positionList: [['None','空闲'], ['trainManager','练功房管理'], ['train2Manager','中级练功房管理'], ['train3Manager','高级练功房管理']],
            typeName: {shop:'商店', smith:'铁匠铺', train:'练功房', train2:'中级练功房', train3:'高级练功房'},
            positionType: 'None',
            positionIndex: 0,
            viewType: 'list',
            size: 'maximize',
            sortKey: 'name',
            reverseSort: 1,
            kickEnabled: false
        }
    },
    mounted () {
    },
    watch: {
    },
    computed: {
        guild() { return this.$store.state.guildAttribute; },
        player() { return this.$store.state.playerAttribute; },
        maxMember() { 
            var max = 2;
            for(let build in this.guild) {
                if(build != 'guild' && this.guild[build].lv != null && this.guild[build].lv > 0)
                    max += Math.floor(this.guild[build].lv/10+2);
            }
            return max;
        }
    },
    methods: {
        // 每10级随机升级一级技能
        // 每10级技能随机获得一个对应管理技能
        // 专注(技能升级的随机性）、悟性（技能升级概率）、机缘（管理技能获得概率）、潜力（升级概率）、效率（工作效率）
        generateApplicant(lv, race, name) {
            var applicant = {};
            applicant.lv = lv || 1;
            applicant.race = race || this.createRace();
            applicant.name = name || this.generateName(applicant.race);
            applicant.stat = this.createStat(applicant.race);
            applicant.points = this.createPoints(applicant.stat);
            applicant.career = this.createCareer();
            applicant.skill = this.createSkill(applicant);
            applicant.special = [];
            applicant.id = Math.round(Math.random()*90071992547);

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
        createCareer() {
            var careers = ['train', 'smith', 'shop'];
            if(guild.train1 >= 15)
                careers.push('train2')
            if(guild.train2 >= 15)
                careers.push('train3')
            return careers[Math.floor(Math.random()*careers.length)];
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
            var career = applicant.career;
            var intellect = applicant.stat.intellect;
            var focus = applicant.stat.focus;
            var skill = '';
            if(Math.random()*100 > intellect)
                return;
            if(Math.random()*100 <= focus)
                skill = career;
            else
                skill = this.basicSkill[Math.floor(Math.random()*this.basicSkill.length)];
            // if(applicant.skill != undefined && applicant.skill[skill] > 5 && applicant.skill[skill]%5 == 4)
            if(applicant.skill != undefined && applicant.skill[skill] >= 4 && applicant.skill[skill]%5 == 4)
                applicant.special.push(this.generateSpecialSkill(applicant));
            return skill;
        },
        generateSpecialSkill(applicant) {
            return '';
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
        },
        levelupAll() {
            for(var index in this.guild.member) {
                this.levelUp(this.guild.member[index]);
            }
        },
        recruit(k) {
            if(this.guild.member.length >= this.maxMember)
                return;
            this.applicantList[k].job = 'None';
            this.guild.member.push(this.applicantList[k]);
            this.applicantList.splice(k, 1);
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
            var guild = this.findBrothersComponents(this, 'guild', false)[0];
            var guildPosition = this.findComponentDownward(guild, 'guildPosition');
            guildPosition.cancelPosition(this.guild.member[k].job, guildPosition.findTarget(this.guild.member[k]));
            this.guild.member.splice(k, 1);
        },
        sortBy(type) {
            this.reverseSort = type==this.sortKey ? -1*this.reverseSort : -1;
            this.sortKey = type;
            if(type == 'lv') {
                this.guild.member.sort((a, b) => {
                    return this.reverseSort*(a[type]-b[type]);
                })
            }
            else if(type == 'job' || type=='career') {
                this.guild.member.sort((a, b) => {
                    return this.reverseSort*(a[type].localeCompare(b[type]));
                })
            }
            else {
                this.guild.member.sort((a, b) => {
                    return this.reverseSort*(a.stat[type]-b.stat[type]);
                })
            }
        },
        sortAppBy(type) {
            this.reverseSort = type==this.sortKey ? -1*this.reverseSort : -1;
            this.sortKey = type;
            if(type == 'lv') {
                this.applicantList.sort((a, b) => {
                    return this.reverseSort*(a[type]-b[type]);
                })
            }
            else if(type == 'job' || type=='career') {
                this.applicantList.sort((a, b) => {
                    return this.reverseSort*(a[type].localeCompare(b[type]));
                })
            }
            else {
                this.applicantList.sort((a, b) => {
                    return this.reverseSort*(a.stat[type]-b.stat[type]);
                })
            }
        },
        show(e) {
            if(e.target.children.length != 0 && e.target.children[0].classList.contains('skillList'))
                e.target.children[0].classList.toggle('hidden');
        },
        setViewType(type) {
            // var value = e.target.value;
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
            top: 0.2rem;
            left: 4.3rem;
        }
        .intellect {
            position: absolute;
            top: 3.6rem;
            left: 0.4rem;
        }
        .luck {
            position: absolute;
            top: 7.3rem;
            left: 1.8rem;
            width: 4.5rem;
            text-align: left;
        }
        .potential {
            position: absolute;
            top: 7.3rem;
            left: 6.3rem;
        }
        .efficiency {
            position: absolute;
            top: 3.6rem;
            left: 8.2rem;
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
.svg-pentagon {
    text-align: center;
}
.pentagon {
    stroke-width:0.5px;
    transform: rotate(180deg);
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
.btn {
    margin-left: -1rem;
    padding: .375rem 0rem;
    min-width: 2rem;
}
.hidden {
    display: none;
}
.table {
    color: #fff;
}
.table td, .table th {
    padding: 0.2rem 0.375rem;
}
tr:nth-of-type(odd) td{
    background-color: lighten(#000000, 25%);
}
tr:nth-of-type(even) td{
    background-color: lighten(#000000, 10%);
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
