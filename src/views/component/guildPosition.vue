<template>
<div class="container scrollbar-morpheus-den">
    <div class="building" v-show="displayPage=='guild'">
        <div class="buildInfo">
            {{guild.guild.lv+"级"}}
        </div>
    </div>
    <div class="building" v-show="displayPage=='train'" :set="type='train'">
        <div class="buildInfo">
            {{guild[type].lv+"级"}}
        </div>
        <div class="training">
            <div class="trainingProgressbars">
                <countdown ref="countdown" :tier="0" :timer="$store.state.train.train1.timer" :level="guild.train.lv" v-if="guild.train.lv>0"></countdown>
                <!-- <countdown :tier="1" :timer="$store.state.train.train2.timer" :level="guild.train2.lv" v-if="guild.train.lv>0"></countdown> -->
                <!-- <countdown :tier="1" :timer="$store.state.train.train2.timer" :level="guild.train2.lv" v-if="guild.train2.lv>0"></countdown> -->
                <!-- <countdown :tier="2" :timer="$store.state.train.train3.timer" :level="guild.train3.lv" v-if="guild.train3.lv>0"></countdown> -->
            </div>
        </div>
    </div>
    <div class="building" v-show="displayPage=='shop'" :set="type='shop'">
        <div class="buildInfo">
            {{guild[type].lv+'级 (效率: '+totalEfficiency[type]+'/秒)'}}
        </div>
        <div class="member">
            成员{{building[type].length}}/{{maxMember[type]}}
            <!-- 此处setPosition参数里面用:set设置的变量(type)会随着别处:set重新赋值导致传进去值不同 -->
            <div class="btn btn-outline-success" v-if="building[type].length<maxMember[type]" @click="setPosition('shop', -1)">添加</div>
            <div class="list">
                <div class="grid" v-for="(v, k) in building[type]" :key="k">
                    <div class="info">
                        <div class="name">
                            {{v.name}}
                            <br>
                            {{race[v.race].name+' '+v.lv}}级
                        </div>
                    </div>
                    <!-- <div class="skillList">
                        <span class="statName">{{guildStat['efficiency'].name+': '+v.stat['efficiency']}}</span>
                        <span class="statName" v-if="v.skill[type]">{{v.skill[type]+"级"+guildSkill[type].name}}</span>
                        <div class="skill" v-for="(special, index) in v.special" :key="index">
                            <span class="skillName">{{guildSpecialSkill[special].name}}</span>
                            <span class="skillDesc">({{guildSpecialSkill[special].desc}})</span>
                        </div>
                    </div> -->
                    <div class="action">
                        <div class="button kick btn btn-outline-warning" @click="setPosition('shop', k)">更换</div>
                        <div class="button kick btn btn-outline-danger" @click="cancelPosition('shop', k)">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="progress" style="width:100%;">
            <div class="progress-bar progress-bar-striped" :style="{width:progress[type].current/progress[type].max*100+'%'}">
                <small class="justify-content-center d-flex position-absolute w-90" style="color:black">{{progress[type].current+'/'+progress[type].max}} </small>
            </div>
        </div>
        <div class="action">
            <div v-if="!inProgress[type]">
                <select v-model="selectedType[type]" @change="setSelectedType($event, type)" class="btn btn-light">
                    <option :value="option.value" v-for="(option, index) in selectOption[type]" :key="index" :disabled="guild[type].lv<option.lv">
                        {{option.name}}<span v-if="guild[type].lv<option.lv"> {{option.lv}}级</span>
                    </option>
                </select>
                &nbsp;<div class="btn btn-success" @click="start('shop')">开始</div>
            </div>
            <div v-else>
                &nbsp;<div class="btn btn-danger" @click="stop('shop')">停止</div>
            </div>
        </div>
    </div>
    <div class="building" v-show="displayPage=='smith'" :set="type='smith'">
        <div class="buildInfo">
            {{guild[type].lv+'级 (效率: '+totalEfficiency[type]+'/秒)'}}
        </div>
        <div class="member">
            成员{{building[type].length}}/{{maxMember[type]}}
            <div class="btn btn-outline-success" v-if="building[type].length<maxMember[type]" @click="setPosition('smith', -1)">添加</div>
            <div class="list">
                <div class="grid" v-for="(v, k) in building[type]" :key="k">
                    <div class="info">
                        <div class="name">
                            {{v.name}}
                            <br>
                            {{race[v.race].name+' '+v.lv}}级
                        </div>
                    </div>
                    <div class="action">
                        <div class="button kick btn btn-outline-warning" @click="setPosition('smith', k)">更换</div>
                        <div class="button kick btn btn-outline-danger" @click="cancelPosition('smith', k)">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="progress" style="width:100%;">
            <div class="progress-bar progress-bar-striped" :style="{width:progress[type].current/progress[type].max*100+'%'}">
                <small class="justify-content-center d-flex position-absolute w-90" style="color:black">{{progress[type].current+'/'+progress[type].max}} </small>
            </div>
        </div>
        <div class="action">
            <div style="display:flex" v-if="!inProgress[type]">
                <select v-model="selectedType[type]" @change="setSelectedType($event, type)" class="btn btn-light">
                    <option :value="option.value" v-for="(option, index) in selectOption[type]" :key="index" :disabled="guild[type].lv<option.lv">
                        {{option.name}}<span v-if="guild[type].lv<option.lv"> {{option.lv}}级</span>
                    </option>
                </select>
                <span v-if="selectedType[type] != 'smith'">
                    主材料: <a v-if="smith_main.lv" :style="{color:smith_main.quality.color}" @mouseover="showInfo($event,smith_main.itemType,smith_main)" @mouseleave="closeInfo('equip')">{{smith_main.description.name}}</a>
                    <div class="btn btn-outline-light" @click="selectEquip('smith_main')">+</div>
                    副材料: <a v-if="smith_sub.lv" :style="{color:smith_sub.quality.color}" @mouseover="showInfo($event,smith_sub.itemType,smith_sub)" @mouseleave="closeInfo('equip')">{{smith_sub.description.name}}</a>
                    <div class="btn btn-outline-light" @click="selectEquip('smith_sub')">+</div>
                </span>
                &nbsp;<div class="btn btn-success" @click="start('smith')">开始</div>
            </div>
            <div style="display:flex" v-else>
                &nbsp;<div class="btn btn-danger" @click="stop('smith')">停止</div>
            </div>
            <craftEquip></craftEquip>
        </div>
    </div>
    <div class="building" v-show="displayPage=='mine'" :set="type='mine'">
        <div class="member">
            成员{{building[type].length}}/{{maxMember[type]}}
            <div class="btn btn-outline-success" v-if="building[type].length<maxMember[type]" @click="setPosition('mine', -1)">添加</div>
            <div class="list">
                <div class="grid" v-for="(v, k) in building[type]" :key="k">
                    <div class="info">
                        <div class="name">
                            {{v.name}}
                            <br>
                            {{race[v.race].name+' '+v.lv}}级
                        </div>
                    </div>
                    <div class="action">
                        <div class="button kick btn btn-outline-warning" @click="setPosition('mine', k)">更换</div>
                        <div class="button kick btn btn-outline-danger" @click="cancelPosition('mine', k)">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="queue">
            <table class="">
                <thead>
                    <tr>
                        <th scope="col" style="width: 7%;">等级</th>
                        <th scope="col" style="width: 12%;">剩余次数</th>
                        <th scope="col">产出</th>
                        <th scope="col" style="width: 25%;"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(mine, index) in mineQueue" :key="index">
                        <td>{{mine.lv}}</td>
                        <td>
                            <span v-if="mine.count>=0">{{mine.count}}</span>
                            <span v-else>无限</span>
                            <div style="font-size: 10px">{{mine.progress[0]+'/'+mine.progress[1]}}</div>
                        </td>
                        <td class="reward" v-for="(v, k) in mine.reward" :key="k">
                            <div class="grid" v-if="v[0]" @mouseover="showInfo($event,v[0].itemType,v[0],true)" @mouseleave="closeInfo('item')">
                                <div class="mediumIconContainer">
                                    <del :class="[{grey:v[0].quality.qualityLv==1, green:v[0].quality.qualityLv==3, blue:v[0].quality.qualityLv==4, purple:v[0].quality.qualityLv==5, orange:v[0].quality.qualityLv==6}, 'mediumIcon iconBorder']"></del>
                                    <img :src="v[0].description.iconSrc" alt="" />
                                </div>
                                <div class="quantity">{{v[1]+'%'}}</div>
                             </div>
                        </td>
                        <td>
                            <select v-model="mineQueue[index].member.id" @change="setMineMember($event, index)" class="btn btn-xsm btn-secondary" aria-label="training time">
                                <option :value="v.id" v-for="(v, k) in building.mine" :key="k">{{v.name}}</option>
                            </select>
                            <span class="button kick btn btn-outline-danger" @click="removeFromQueue('mine', index)">移除</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="building" v-show="displayPage=='bar'" :set="type='bar'">
        <!-- <div class="buildInfo">
            {{guild[type].lv+'级 (效率: '+totalEfficiency[type]+'/秒)'}}
        </div> -->
        <div class="member">
            成员{{building[type].length}}/{{maxMember[type]}}
            <div class="btn btn-outline-success" v-if="building[type].length<maxMember[type]" @click="setPosition('bar', -1)">添加</div>
            <div class="list">
                <div class="grid" v-for="(v, k) in building[type]" :key="k">
                    <div class="info">
                        <div class="name">
                            {{v.name}}
                            <br>
                            {{race[v.race].name+' '+v.lv}}级
                        </div>
                    </div>
                    <div class="action">
                        <div class="button kick btn btn-outline-warning" @click="setPosition('bar', k)">更换</div>
                        <div class="button kick btn btn-outline-danger" @click="cancelPosition('bar', k)">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="action">
            
        </div>
        <div class="applicant scrollbar-morpheus-den">
            <div class="list">
                <div class="grid" v-for="(v, k) in applicantList" :key="k">
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
                            <div :class="'stat ' +type" v-for="(value, type) in v.talent" :key="type">{{guildStat[type].name}}
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
                        <div class="button specialButton accept" @click="recruit(k)">招募</div>
                        <div class="button specialButton reject" @click="reject(k)">婉拒</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    
</template>
<script>
import { assist } from '../../assets/js/assist';
import {guildConfig} from '@/assets/config/guildConfig'
import {guildMemberConfig} from '@/assets/config/guildMemberConfig'
import cTooltip from '../uiComponent/tooltip';
import countdown from '../uiComponent/countdown';
import craftEquip from '../component/craftEquip';
export default {
    name: "guildPosition",
    mixins: [assist, guildConfig, guildMemberConfig],
    components: {cTooltip, countdown, craftEquip},
    mounted() {
    },
    data() {
        return {
            types: ['shop','smith','train','train2','train3'],
            typeName: {shop:'商店', smith:'铁匠铺', train:'练功房', train2:'中级练功房', train3:'高级练功房'},
            building: {
                shop: [],
                smith: [],
                train: [],
                train2: [],
                train3: [],
                mine: [],
                herb: [],
                bar: [],
            }, 
            maxMember: {
                shop: 1,
                smith: 1,
                train: 2,
                train2: 2,
                train3: 2,
                mine: 2,
                herb: 2,
                bar: 2,
            },
            totalEfficiency: {
                shop: 1, smith: 1, train: 1, train2: 1, train3: 1,
            },
            timerList: {
                shop: 0, smith: 0, train: 0, train2: 0, train3: 0, mine: 0, bar: 0,
            },
            progress: {
                shop: { current: 0, max: 1000 },
                smith: { current: 0, max: 30 },
                train: { current: 0, max: 1000 },
                train2: { current: 0, max: 1000 },
                train3: { current: 0, max: 1000 },
            },
            smith_main: {},
            smith_sub: {},
            train1_member: {},
            selectFor: 'None',
            selectOption: {
                shop: [{name: '1级贸易', value: 'shop1', lv: 0}, {name: '2级贸易', value: 'shop2', lv: 15}, {name: '3级贸易', value: 'shop3', lv: 30}, 
                        {name: '4级贸易', value: 'shop4', lv: 45}],
                smith: [{name: '打造', value: 'smith', lv: 0},{name: '精炼', value: 'refine', lv: 15}, {name: '熔炼', value: 'melt', lv: 30}],
                train: [{name: '生命训练', value: 'HP', lv: 0}, {name: '魔法训练', value: 'MP', lv: 0}, {name: '攻击训练', value: 'ATK', lv: 0},
                        {name: '防御训练', value: 'DEF', lv: 0}],
                train2: [{name: '元素训练', value: 'SUNDER', lv: 0}, {name: '格挡训练', value: 'BLOCK', lv: 0}],
                train3: [{name: '力量训练', value: 'STR', lv: 0}, {name: '敏捷训练', value: 'AGI', lv: 0}, {name: '智力训练', value: 'INT', lv: 0}],
            },
            selectedType: {
                shop: 'shop1',
                smith: 'smith',
                train: 'HP',
                train2: 'SUNDER',
                train3: 'STR',
            },
            inProgress: {
                shop: false, smith: false, train:  false, train2: false, train3: false,
            },
            displayPage: 'guild',
            mineQueue: [],
            memberID: 0,
            applicantList: [],
        };
    },
    props: {
    },
    computed: {
        guild() {return this.$store.state.guildAttribute;},
        player() {return this.$store.state.playerAttribute;},
    },
    methods: {    
        init() {
            // for(let mem in this.maxMember) {
            //     this.maxMember[mem] = Math.floor(this.guild[mem].lv/10+1);
            // }
            for(var mem in this.guild.member) {
                if(this.guild.member[mem].job != 'None')
                    this.assignPosition(this.guild.member[mem].job, -1, this.guild.member[mem], true);
            }
            for(let timer in this.timerList) 
                clearInterval(this.timerList[timer]);
            this.start('shop');
            this.start('mine');
            this.start('bar');
            // this.start('smith');
            // this.smith_main = this.player.shoulder;
            // this.smith_sub = this.player.weapon;
            let types = ['guild','shop','smith','train','train2','train3'];
            // for(let type in types) 
            //     this.computeLv(types[type]);
        },
        selectEquip(type) {
            let guild = this.findComponentUpward(this, 'guild');
            let backpack = this.findBrothersComponents(guild, 'backpack', false)[0];
            let index = this.findComponentUpward(guild, 'index');
            this.selectFor = type;
            backpack.leftClickEnabled = true;
            index.closeMenuPanel('backpack');
            index.openMenuPanel('backpack');
        },
        selectedEquip(equip) {
            let guild = this.findComponentUpward(this, 'guild');
            let backpack = this.findBrothersComponents(guild, 'backpack', false)[0];
            switch(this.selectFor){
                case "smith_main":
                    if(this.smith_main.lv)
                        backpack.giveEquip(this.smith_main, false);
                    this.smith_main = equip;
                    break;
                case "smith_sub":
                    if(this.smith_sub.lv)
                        backpack.giveEquip(this.smith_sub, false);
                    this.smith_sub = equip;
                    break;
            }
            this.selectFor = 'None';
        },
        setSelectedType(e, type) {
            let value = e.target.value;
            this.selectedType[type] = value;
            this.computeMax(type);
        },
        computeMax(type) {
            let req = {
                HP: 25000,
                MP: 25000,
                ATK: 25000,
                DEF: 25000,
                AP: 35000,
                MR: 35000,
                STR: 50000,
                AGI: 50000,
                INT: 50000,
                shop1: 1000, 
                shop2: 5000,
                shop3: 25000, 
                shop4: 125000, 
                smith: 10000,
                refine: 50000,
                melt: 1000000
            };
            this.progress[type].max = req[this.selectedType[type]];
        },
        start(type) {
            this.inProgress[type] = true;
            let craftEquip = this.findComponentDownward(this, 'craftEquip');
            switch(type) {
                case 'smith':
                    craftEquip.statusChange('wait');
                    // this.startSmith();
                    break;
                case 'shop':
                    this.startShop();
                    break;
                case 'mine':
                    this.startMine();
                    break;
                case 'bar':
                    this.startBar();
                    break;
            }
        },
        stop(type) {
            let craftEquip = this.findComponentDownward(this, 'craftEquip');
            this.progress[type].current = 0;
            clearInterval(this.timerList[type]);
            this.inProgress[type] = false;
            switch(this.selectedType[type]) {
                case 'smith':
                    craftEquip.forfeit();
                    break;
            }
        },
        startShop() {
            let guild = this.findComponentUpward(this, 'guild');
            this.timerList['shop'] = setInterval(() => {
                this.progress['shop'].current += this.totalEfficiency['shop'];
                if(this.progress['shop'].current >= this.progress['shop'].max) {
                    this.progress['shop'].current = 0;
                    switch(this.selectedType['shop']) {
                        case 'shop1':
                            guild.getGold('', 666, false);
                            break;
                        case 'shop2':
                            guild.getGold('', 6666, false);
                            break;
                        case 'shop3':
                            guild.getGold('', 66666, false);
                            break;
                        case 'shop4':
                            guild.getGold('', 666666, false);
                            break;
                    } 
                }
            }, 1000);
        },
        startSmith() {
            let craftEquip = this.findComponentDownward(this, 'craftEquip');
            this.timerList['smith'] = setInterval(() => {
                let amount = this.totalEfficiency['smith'];
                this.progress['smith'].current += amount;
                craftEquip.increaseProgress(amount);
                if(this.progress['smith'].current >= this.progress['smith'].max) {
                    this.progress['smith'].current = 0;
                    clearInterval(this.timerList['smith']);
                    this.inProgress['smith'] = false;
                    switch(this.selectedType['smith']) {
                        case 'smith':
                            craftEquip.statusChange('done');
                            // craftEquip.craftEquip();
                            break;
                        case 'refine':
                            this.refine();
                            break;
                        case 'melt':
                            this.melt();
                            break;
                    } 
                }
            }, 1000);
        },
        startMine() {
            this.timerList['mine'] = setInterval(() => {
                for(let i=this.mineQueue.length-1; i>=0; i--) {
                    let mine = this.mineQueue[i];
                    if(mine.member.id != undefined) {
                        if(!this.increaseMineProgress(mine, mine.member)) 
                            this.mineQueue.splice(i, 1);
                    }
                }
            }, 1*1000);
        },
        startBar() {
            var guild = this.findComponentUpward(this, 'guild');
            var guildMember = this.findBrothersComponents(guild, 'guildMember', false)[0];
            this.timerList['bar'] = setInterval(() => {
                if(this.applicantList.length > 4) {
                    guildMember.reject(Math.floor(Math.random()*this.applicantList.length));
                } 
                guildMember.generateApplicant();
            }, 30*60*1000);
        },
        smith() {
            let guild = this.findComponentUpward(this, 'guild');
            let equipInfo = this.findBrothersComponents(guild, 'equipInfo', false)[0];
            let backpack = this.findBrothersComponents(guild, 'backpack', false)[0];
            // 此处需改动qualitySet参数
            let equip = equipInfo.createEquip(-1, this.player.lv, 'random', 1);  
            equip = JSON.parse(equip);
            this.$store.commit("set_sys_info", {
                type: 'reward',
                msg: '打造完成, 获得',
                equip: equip
            });
            backpack.giveEquip(equip);
        },
        refine() {
            let guild = this.findComponentUpward(this, 'guild');
            let equipInfo = this.findBrothersComponents(guild, 'equipInfo', false)[0];
            let backpack = this.findBrothersComponents(guild, 'backpack', false)[0];
            this.$store.commit("set_sys_info", {
                type: 'reward',
                msg: '消耗装备',
                equip: this.smith_sub
            });
            equipInfo.refine(this.smith_main, this.smith_sub);
            backpack.giveEquip(this.smith_main, false);
            this.$store.commit("set_sys_info", {
                type: 'reward',
                msg: '装备精炼完成',
                equip: this.smith_main
            });
            this.smith_main = {};
            this.smith_sub = {};
        },
        melt() {
            let guild = this.findComponentUpward(this, 'guild');
            let equipInfo = this.findBrothersComponents(guild, 'equipInfo', false)[0];
            let backpack = this.findBrothersComponents(guild, 'backpack', false)[0];
            this.$store.commit("set_sys_info", {
                type: 'reward',
                msg: '消耗装备',
                equip: this.smith_sub
            });
            equipInfo.melt(this.smith_main, this.smith_sub);
            backpack.giveEquip(this.smith_main, false);
            this.$store.commit("set_sys_info", {
                type: 'reward',
                msg: '装备熔炼完成',
                equip: this.smith_main
            });
            this.smith_main = {};
            this.smith_sub = {};
        },
        increaseMineProgress(mine, member) {
            let total = Math.floor((member.stat.STR+10) * (member.stat.STA+10) / 100);
            mine.progress[0] += total;
            if(mine.progress[0] >= mine.progress[1]) {
                let count = Math.floor(mine.progress[0]/mine.progress[1]);
                mine.progress[0] -= count*mine.progress[1];
                this.mineReward(mine.reward, count);
                mine.count -= count;
                if(mine.count <= 0)
                    return false;
            }
            return true;
        },
        mineReward(rewardList, rewardCount) {
            // 清零
            for(let k=0; k<rewardList.length; k++) {
                rewardList[k][0].quantity = 0;
            }
            if(rewardCount <= 0)
                return;
            let guild = this.findComponentUpward(this, 'guild');
            let itemInfo = this.findBrothersComponents(guild, 'itemInfo', false)[0];
            // 添加数量
            while(rewardCount > 0) {
                for(let k=0; k<rewardList.length; k++) {
                    let random = Math.random()*100;
                    if(random <= rewardList[k][1]) {
                        rewardList[k][0].quantity++;
                    }
                }
                rewardCount--;
            }
            // 给予奖励
            for(let k=0; k<rewardList.length; k++) {
                itemInfo.addItem(rewardList[k][0]);
            }
        },
        findTarget(target) {
            if(target.job == 'None')
                return -1;
            var list = this.building[target.job];
            for(var i in list) {
                if(list[i].id == target.id)
                    return i;
            }
            return -1;
        },
        assignPosition(type, index, target, force=false) {
            if(!force && type == target.job)
                return;
            if(target.job != 'None') {
                let targetIndex = this.findTarget(target);
                if(targetIndex != -1)
                    this.cancelPosition(target.job, targetIndex);
            }
            if(index == -1)
                this.building[type].push(target);
            else {
                this.cancelPosition(type, index, true);
                this.building[type][index] = target;
            }
            target.job = type;
        },
        setPosition(type, k) {
            var guild = this.findComponentUpward(this, 'guild');
            var index = this.findComponentUpward(this, 'index');
            var guildMember = this.findBrothersComponents(guild, 'guildMember', false)[0];
            index.displayPage = 'guildMember';
            guildMember.positionType = type;
            guildMember.positionIndex = k;
        },
        cancelPosition(type, index, replace=false) {
            var target = this.building[type][index];
            if(target.job == 'mine') {
                for(let i=0; i<this.mineQueue.length; i++) {
                    if(this.mineQueue[i].member.id == target.id)
                        this.mineQueue[i].member = {};
                }
            }
            target.job = 'None';
            if(!replace)
                this.building[type].splice(index, 1);
        },
        recruit(k) {
            var guild = this.findComponentUpward(this, 'guild');
            var guildMember = this.findBrothersComponents(guild, 'guildMember', false)[0];
            guildMember.recruit(k);
        },
        reject(k) {
            var guild = this.findComponentUpward(this, 'guild');
            var guildMember = this.findBrothersComponents(guild, 'guildMember', false)[0];
            guildMember.reject(k);
        },
        setMineMember(e, index) {
            let value = e.target.value;
            let guild = this.findComponentUpward(this, 'guild');
            let guildMember = this.findBrothersComponents(guild, 'guildMember', false)[0];
            this.memberID = value;
            let member = guildMember.findTargetByID(value);
            for(let i=0; i<this.mineQueue.length; i++) {
                if(this.mineQueue[i].member.id == member.id)
                    this.mineQueue[i].member = {};
            }
            this.mineQueue[index].member = member;
        },
        removeFromQueue(type, index) {
            this.mineQueue.splice(index, 1);
        },
        showInfo($event, type, item, compare) {
            let guild = this.findComponentUpward(this, 'guild');
            let index = this.findComponentUpward(guild, 'index');
            index.showInfo($event, type, item, compare);
        },
        closeInfo(type='equip') {
            let guild = this.findComponentUpward(this, 'guild');
            let index = this.findComponentUpward(guild, 'index');
            index.closeInfo(type);
        },
    }
}
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    width: 52rem;
    max-height: 50rem;
    margin: 0.5rem 0.5rem;
    padding: 0.5rem 0.5rem;
    overflow-y: auto;
    overflow-x: hidden;
}
.building {
    padding: 0.5rem;
    margin: 0.25rem;
    // border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 1rem;
    // max-height: 35rem;
    width: 50rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .buildInfo {
        width: 100%;
        margin: 0.2rem 0.2rem;
    }
    .progress {
	    position: relative;
        margin: 0.2rem 0.2rem;
    }
}
.member {
    padding: 0.5rem;
    // margin: 0.5rem;
    // border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 1rem;
    max-height: 35rem;
    width: 50rem;
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 0rem 0.5rem 0.5rem 0.5rem;
    width: 100%;
    .grid {
        border: 1px solid rgba(255, 255, 255, 0.404);
        width: fit-content;
        height: fit-content;
        display: flex;
        flex-wrap: wrap;
        .info {
            margin: auto 0.5rem;
            width: 6.5rem;
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
            width: 10rem;
            .skill {
                .skillDesc {
                    display: none;
                }
            }
            .skill:hover .skillName{
                display:none;
            }
            .skill:hover .skillDesc{
                display: inline;
            }
        }
        .action {
            width: 4rem;
            margin: auto 0rem;
            .accept {
                font-size: 15px;
                line-height: 15px;
                width: 50px;
                height: 30px;
            }
            .reject {
                font-size: 15px;
                line-height: 15px;
                width: 50px;
                height: 30px;
            }
        }
    }
}
.queue {
    width: 100%;
    color: #ffffff;
}
.progress-bar {
    transition: 1s linear;
}
.w-90 {
    width: 100%;
    font-size: 0.8rem;
}
</style>
