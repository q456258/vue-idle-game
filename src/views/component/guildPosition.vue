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
                <countdown :tier="1" :timer="$store.state.train.train2.timer" :level="guild.train2.lv" v-if="guild.train.lv>0"></countdown>
                <!-- <countdown :tier="1" :timer="$store.state.train.train2.timer" :level="guild.train2.lv" v-if="guild.train2.lv>0"></countdown> -->
                <countdown :tier="2" :timer="$store.state.train.train3.timer" :level="guild.train3.lv" v-if="guild.train3.lv>0"></countdown>
            </div>
        </div>
    </div>
    <div class="building" v-show="displayPage=='shop'" :set="type='shop'">
        <div class="buildInfo">
            {{guild[type].lv+'级 (效率：'+totalEfficiency[type]+'/秒)'}}
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
            {{guild[type].lv+'级 (效率：'+totalEfficiency[type]+'/秒)'}}
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
                <span v-if="selectedType[type] != 'smith'">
                    主材料：<a v-if="smith_main.lv" :style="{color:smith_main.quality.color}" @mouseover="showInfo($event,smith_main.itemType,smith_main)" @mouseleave="closeInfo('equip')">{{smith_main.description.name}}</a>
                    <div class="btn btn-outline-light" @click="selectEquip('smith_main')">+</div>
                    副材料：<a v-if="smith_sub.lv" :style="{color:smith_sub.quality.color}" @mouseover="showInfo($event,smith_sub.itemType,smith_sub)" @mouseleave="closeInfo('equip')">{{smith_sub.description.name}}</a>
                    <div class="btn btn-outline-light" @click="selectEquip('smith_sub')">+</div>
                </span>
                &nbsp;<div class="btn btn-success" @click="start('smith')">开始</div>
            </div>
            <div v-else>
                &nbsp;<div class="btn btn-danger" @click="stop('smith')">停止</div>
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
import trainStat from '../component/trainStat';
export default {
    name: "guildPosition",
    mixins: [assist, guildConfig, guildMemberConfig],
    components: {cTooltip, countdown, trainStat},
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
            },
            totalEfficiency: {
                shop: 1, smith: 1, train: 1, train2: 1, train3: 1,
            },
            timerList: {
                shop: 0, smith: 0, train: 0, train2: 0, train3: 0,
            },
            progress: {
                shop: { current: 0, max: 1000 },
                smith: { current: 0, max: 1000 },
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
                train2: [{name: '元素训练', value: 'SUNDER', lv: 0}, {name: '能量盾训练', value: 'MR', lv: 0}],
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
        };
    },
    props: {
    },
    computed: {
        guild() {return this.$store.state.guildAttribute;},
        player() {return this.$store.state.playerAttribute;}
    },
    methods: {    
        init() {
            for(var mem in this.maxMember) {
                this.maxMember[mem] = Math.floor(this.guild[mem].lv/10+1);
            }
            for(let timer in this.timerList) 
                clearInterval(this.timerList[timer]);
            this.start('shop');
            this.start('smith');
            this.start('train');
            this.start('train2');
            this.start('train3');
            // this.smith_main = this.player.shoulder;
            // this.smith_sub = this.player.weapon;
            var types = ['guild','shop','smith','train','train2','train3'];
            // for(let type in types) 
            //     this.computeLv(types[type]);
        },
        // computeLv(type) {
        //     var target = this.guild[type];
        //     while(target.exp >= this.lvExp[target.lv])
        //         target.lv++;
        // },
        selectEquip(type) {
            var guild = this.findComponentUpward(this, 'guild');
            var backpack = this.findBrothersComponents(guild, 'backpack', false)[0];
            var index = this.findComponentUpward(guild, 'index');
            this.selectFor = type;
            backpack.leftClickEnabled = true;
            index.closeMenuPanel('backpack');
            index.openMenuPanel('backpack');
        },
        selectedEquip(equip) {
            var guild = this.findComponentUpward(this, 'guild');
            var backpack = this.findBrothersComponents(guild, 'backpack', false)[0];
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
            var value = e.target.value;
            this.selectedType[type] = value;
            this.computeMax(type);
        },
        computeMax(type) {
            var req = {
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
            switch(type) {
                case 'smith':
                    this.startSmith();
                    break;
                case 'shop':
                    this.startShop();
                    break;
                case 'train':
                    this.startTrain('train');
                    break;
                case 'train2':
                    this.startTrain('train2');
                    break;
                case 'train3':
                    this.startTrain('train3');
                    break;
            }
        },
        stop(type) {
            this.progress[type].current = 0;
            clearInterval(this.timerList[type]);
            this.inProgress[type] = false;
        },
        startTrain(type) {
            this.timerList[type] = setInterval(() => {
                this.progress[type].current += this.totalEfficiency[type];
                if(this.progress[type].current >= this.progress[type].max) {
                    this.progress[type].current = 0;
                    this.$refs.countdown.increaseProgress(this.selectedType[type], 200);
                }
            }, 1000);
        },
        startShop() {
            var guild = this.findComponentUpward(this, 'guild');
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
            this.timerList['smith'] = setInterval(() => {
                this.progress['smith'].current += this.totalEfficiency['smith'];
                if(this.progress['smith'].current >= this.progress['smith'].max) {
                    this.progress['smith'].current = 0;
                    clearInterval(this.timerList['smith']);
                    this.inProgress['smith'] = false;
                    switch(this.selectedType['smith']) {
                        case 'smith':
                            this.smith();
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
        smith() {
            var guild = this.findComponentUpward(this, 'guild');
            var equipInfo = this.findBrothersComponents(guild, 'equipInfo', false)[0];
            var backpack = this.findBrothersComponents(guild, 'backpack', false)[0];
            let equip = equipInfo.createEquip(-1, lv, 'random', 1);  
            equip = JSON.parse(equip);
            this.$store.commit("set_sys_info", {
                type: 'reward',
                msg: '打造完成，获得',
                equip: equip
            });
            backpack.giveEquip(equip);
        },
        refine() {
            var guild = this.findComponentUpward(this, 'guild');
            var equipInfo = this.findBrothersComponents(guild, 'equipInfo', false)[0];
            var backpack = this.findBrothersComponents(guild, 'backpack', false)[0];
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
            var guild = this.findComponentUpward(this, 'guild');
            var equipInfo = this.findBrothersComponents(guild, 'equipInfo', false)[0];
            var backpack = this.findBrothersComponents(guild, 'backpack', false)[0];
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
        showInfo($event, type, item, compare) {
            var guild = this.findComponentUpward(this, 'guild');
            var index = this.findComponentUpward(guild, 'index');
            index.showInfo($event, type, item, compare);
        },
        closeInfo() {
            var guild = this.findComponentUpward(this, 'guild');
            var index = this.findComponentUpward(guild, 'index');
            index.closeInfo('equip');
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
    max-height: 35rem;
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
        border-radius: 0.3rem;
        // margin: 0.25rem;
        // width: 50%;
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
.progress-bar {
    transition: 1s linear;
}
.w-90 {
    width: 100%;
    font-size: 0.8rem;
}
</style>