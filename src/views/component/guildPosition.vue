<template>
<div class="container scrollbar-morpheus-den">
    <div class="building" v-for="(type, typeIndex) in types" :key="typeIndex">
        {{typeName[type]+' (效率：'+totalEfficiency[type]+'/秒)'}}
        <div class="progress" style="width:50%;">
                <div class="progress-bar progress-bar-striped" :style="{width:progress[type].current/progress[type].max*100+'%'}">
                    <small class="justify-content-center d-flex position-absolute w-90" style="color:black">{{progress[type].current+'/'+progress[type].max}} </small>
                </div>
        </div>
        <div class="manager">
            管理{{building[type].manager.length}}/{{maxMember[type].manager}}
            <div class="btn btn-outline-success" v-if="building[type].manager.length<maxMember[type].manager" @click="setPosition(type, 'manager', -1)">添加</div>
            <div class="list">
                <div class="grid" v-for="(v, k) in building[type].manager" :key="k">
                    <div class="info">
                        <div class="name">
                            {{v.name}}
                            <br>
                            {{race[v.race].name+' '+v.lv}}级
                            <br>
                            {{guildSkill[v.job].name}}
                        </div>
                    </div>
                    <div class="skillList">
                        <span class="statName">{{guildStat['efficiency'].name+': '+v.stat['efficiency']}}</span>
                        <div class="skill" v-for="(special, index) in v.special" :key="index">
                            <span class="skillName">{{guildSpecialSkill[special].name}}</span>
                            <span class="skillDesc">({{guildSpecialSkill[special].desc}})</span>
                        </div>
                    </div>
                    <div class="action">
                        <div class="button kick btn btn-outline-warning" @click="setPosition(type, 'manager', k)">更换</div>
                        <div class="button kick btn btn-outline-danger" @click="cancelPosition(type, 'manager', k)">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="member">
            成员{{building[type].member.length}}/{{maxMember[type].member}}
            <div class="btn btn-outline-success" v-if="building[type].member.length<maxMember[type].member" @click="setPosition(type, 'member', -1)">添加</div>
            <div class="list">
                <div class="grid" v-for="(v, k) in building[type].member" :key="k">
                    <div class="info">
                        <div class="name">
                            {{v.name}}
                            <br>
                            {{race[v.race].name+' '+v.lv}}级
                            <br>
                            <span class="statName">{{guildStat['efficiency'].name+': '+v.stat['efficiency']}}</span>
                        </div>
                    </div>
                    <div class="action">
                        <div class="button kick btn btn-outline-warning" @click="setPosition(type, 'member', k)">更换</div>
                        <div class="button kick btn btn-outline-danger" @click="cancelPosition(type, 'member', k)">取消</div>
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
export default {
    name: "guildPosition",
    mixins: [assist, guildConfig, guildMemberConfig],
    components: {cTooltip,},
    mounted() {
    },
    data() {
        return {
            types: ['shop','smith','train','train2','train3'],
            typeName: {shop:'商店', smith:'铁匠铺', train:'练功房', train2:'中级练功房', train3:'高级练功房'},
            building: {
                shop: { manager: [], member: [] },
                smith: { manager: [], member: [] },
                train: { manager: [], member: [] },
                train2: { manager: [], member: [] },
                train3: { manager: [], member: [] },
            },
            maxMember: {
                shop: { manager: 2, member: 0 },
                smith: { manager: 2, member: 0 },
                train: { manager: 2, member: 0 },
                train2: { manager: 2, member: 0 },
                train3: { manager: 2, member: 0 },
            },
            totalEfficiency: {
                shop: 0,
                smith: 0,
                train: 0,
                train2: 0,
                train3: 0,
            },
            timerList: {
                shop: 0,
                smith: 0,
                train: 0,
                train2: 0,
                train3: 0,
            },
            progress: {
                shop: { current: 0, max: 1000 },
                smith: { current: 0, max: 1000 },
                train: { current: 0, max: 1000 },
                train2: { current: 0, max: 1000 },
                train3: { current: 0, max: 1000 },
            },
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
            for(var type in this.types) {
                this.maxMember[this.types[type]].member = this.guild[this.types[type]];
            }
            for(var mem in this.guild.member) {
                if(this.guild.member[mem].job != 'None')
                    this.assignPosition(this.guild.member[mem].job, this.guild.member[mem].position, -1, this.guild.member[mem], true);
            }
            this.timerList['shop'] = setInterval(() => {
                this.progress['shop'].current += this.totalEfficiency['shop'];
                if(this.progress['shop'].current >= this.progress['shop'].max) {
                    this.progress['shop'].current = 0;
                }
            }, 1000);
        },
        findTarget(target) {
            if(target.job == 'None')
                return -1;
            var list = this.building[target.job][target.position];
            for(var i in list) {
                if(list[i].id == target.id)
                    return i;
            }
            return -1;
        },
        assignPosition(type, position="member", index, target, force=false) {
            if(!force && type == target.job && position == target.position)
                return;
            if(target.job != 'None') {
                let targetIndex = this.findTarget(target);
                if(targetIndex != -1)
                    this.cancelPosition(target.job, target.position, targetIndex);
            }
            if(index == -1)
                this.building[type][position].push(target);
            else {
                this.cancelPosition(type, position, index);
                this.building[type][position][index] = target;
            }
            this.totalEfficiency[type] += target.stat.efficiency;
            target.job = type;
            target.position = position;
        },
        setPosition(type, position="member", index) {
            var guildMember = this.findBrothersComponents(this, 'guildMember', false)[0];
            var guild = this.findComponentUpward(this, 'guild');
            guild.displayPage = 'member';
            guildMember.positionType = type;
            guildMember.positionPosition = position;
            guildMember.positionIndex = index;
        },
        cancelPosition(type, position="member", index) {
            this.totalEfficiency[type] -= this.building[type][position][index].stat.efficiency;
            this.building[type][position][index].job = 'None';
            this.building[type][position].splice(index, 1);
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    width: 55rem;
    max-height: 50rem;
    margin: 0.5rem 0.5rem;
    padding: 0.5rem 0.5rem;
    overflow-y: auto;
    overflow-x: hidden;
}
.building {
    padding: 0.5rem;
    margin: 0.25rem;
    border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 1rem;
    max-height: 35rem;
    width: 50rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.manager {
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
    width: 40%;
    font-size: 0.8rem;
}
</style>