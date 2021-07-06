<template>
<div class="container">
    
    <div v-for="(type, typeIndex) in types" :key="typeIndex">
        <div class="building">
            {{typeName[type]}}
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
                <div class="btn btn-outline-success" v-if="building[type].member.length<maxMember[type].member" @click="setPosition(type, 'member', building[type].member.length)">添加</div>
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
        this.initAssign();
        this.initMember();
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
            }
        };
    },
    props: {
    },
    computed: {
        guild() {return this.$store.state.guildAttribute;},
        player() {return this.$store.state.playerAttribute;}
    },
    methods: {    
        initMember() {
            for(var type in this.types) {
                this.maxMember[this.types[type]].member = this.guild[this.types[type]];
            }
        },  
        initAssign() {
            for(var mem in this.guild.member) {
                if(this.guild.member[mem].job != 'None')
                    this.assignPosition(this.guild.member[mem].job, this.guild.member[mem].position, -1, this.guild.member[mem], true);
            }
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
            else
                this.building[type][position][index] = target;
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
    width: 50rem;
    margin: 0.5rem 0.5rem;
    padding: 0.5rem 0.5rem;
}
.building {
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
    padding: 0rem 0.5rem 1rem 0.5rem;
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
</style>