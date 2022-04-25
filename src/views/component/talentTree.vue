<template>
    <div class="container">
        <draggable :left_limit="-750" :right_limit="1" :top_bot="false">
    <template slot="header">
<!-- <div class="container"> -->
    <div>剩余天赋点: {{player.talentPoint}}
    </div>
    <div class="talentTree scrollbar-morpheus-den" >
        <div class="power" v-for="(grid, i) in talents" :key="i">
            <div class="progress">
                <div v-for="index in 11" :key="index">
                    <div class="marker" :style="{top: (index-1)*100/10+'%', color:playerTalent[i]>=(index-1)*5?'#0f0':''}">{{(index-1)*5}}</div>
                </div>
                <div class="progress-bar" :style="{height:playerTalent[i]*2+'%', width: '1px'}">
                </div>
            </div>
            <div class="talentGrid" v-for="(v, k) in talents[i]" :key="k">
                <div :class="'down '+v.status" v-if="v.down"></div>
                <div :class="'down2 '+v.status" v-if="v.down2"></div>
                <div :class="'down4 '+v.status" v-if="v.down4"></div>
                <div :class="'right '+v.status" v-if="v.right"></div>
                <div v-if="v.name" @click="clickTalent($event, k, i)" @contextmenu="rightClick($event, k, i)">
                    <div :class="[{grayIcon:v.status=='disable'}, 'icon']" :style="{background: 'url('+v.iconSrc+') no-repeat', backgroundSize: '45px'}">
                        <!-- <img :src="v.iconSrc" alt="" /> -->
                    </div>
                    <div :class="v.status+'-frame'">
                    </div>
                    <div class="skill-point" :style="{color: v.status=='disable'?'#ccc':v.status=='done'?'#fc0':'#0f0'}">
                        <span v-if="playerTalent[v.type]">{{playerTalent[v.type]}}</span><span v-else>0</span>/{{v.maxLv}}
                    </div>
                    <div class="talent-tip">
                        <h5>{{v.name}}</h5>
                        <div class="desc" v-if="playerTalent[v.type]>0">当前: {{v.desc[playerTalent[v.type]]}}</div>
                        <div class="desc" v-if="playerTalent[v.type]<v.maxLv">下一级: {{v.desc[playerTalent[v.type]+1]}}</div>
                        <div class="preReq" v-if="preReqList[v.type]">前置天赋: 
                            <br>
                            <div class="detail" v-for="(preReq, index) in preReqList[v.type]" :key="index">
                                <div :style="{color:playerTalent[preReq[0]]>=preReq[1]?'#0f0':'#ccc'}">
                                    {{branchInfo[preReq[0]].name}}
                                    <span v-if="playerTalent[preReq[0]]">{{playerTalent[preReq[0]]}}</span><span v-else>0</span>/<span>{{preReq[1]+' 级'}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="footnote">
                            按住shift点击一次5点
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </template>
    <template slot="main" >
    </template>
</draggable>
</div>
</template>
<script>

import { talentConfig } from '../../assets/config/talentConfig';
import { buffAndTrigger } from '../../assets/js/buffAndTrigger';
import draggable from '../uiComponent/draggable';
export default {    
    name: 'talentTree',
    props: {
    },
    mixins: [talentConfig, buffAndTrigger],
    components: {draggable},
    data() {
        return {
            talents: {
                generalBranch: [],
                warriorBranch: [],
                mageBranch: []
            }
        };
    },
    created() {
        for(let branch in this.talents) {
            this.talents[branch] = new Array(55).fill({});
        }
    },
    mounted() {
        this.$store.globalComponent.talentTree = this;
        this.setGrid('generalBranch');
        this.setGrid('warriorBranch');
        this.setGrid('mageBranch');
    },
    watch: {
    },
    computed: {
        playerTalent() { return this.$store.state.playerAttribute.talent },
        player() { return this.$store.state.playerAttribute },
        branchInfo() {
            let types = Object.assign(this.generalBranch, this.warriorBranch, this.mageBranch);
            return types;
         },
    },
    methods: {
        init() {
            this.setStatus('generalBranch');
            this.setStatus('warriorBranch');
            this.setStatus('mageBranch');
        },
        setGrid(branch) {
            for(let talent in this[branch]) {
                let temp = this[branch][talent];
                this.$set(this.talents[branch], temp.position[1]*5+temp.position[0], temp);
            }
        },
        setStatus(branch) {
            for(let talent in this[branch]) {
                let temp = this[branch][talent];
                temp.status = 'enable';
                if(this.playerTalent[talent] >= this[branch][talent].maxLv) {
                    temp.status = 'done';
                    continue;
                }
                if(this.preReqList[temp.type]) {
                    for(let talent in this.preReqList[temp.type]) {
                        let req = this.preReqList[temp.type][talent];
                        if(!this.playerTalent[req[0]] || this.playerTalent[req[0]] < req[1])
                            temp.status = 'disable';
                    }
                }
                if(temp.status == 'enable' &&  (!this.playerTalent[talent] || this.playerTalent[talent] == 0))
                    temp.status = 'semi-disable';
                if(!this.playerTalent[talent])
                    this.playerTalent[talent] = 0;
            }
            this.$forceUpdate();
        },
        clickTalent(e, k, branch, val=1) {
            let target = this.talents[branch][k];
            if(target.status == 'disable')
                return;
            if(e.shiftKey)
                val *= 5;
            val = Math.min(val, this.player.talentPoint);
            val = Math.min(val, target.maxLv-this.playerTalent[target.type]);
            if(val > 0) {
                this.playerTalent[branch] += val;
                this.playerTalent[target.type] += val;
                this.playerTalent['generalBranch'] = Math.max(this.playerTalent['generalBranch'], this.playerTalent[branch]);
                this.player.talentPoint -= val;
                this.setStatus(branch);
                this.setStatus('generalBranch');
                this.talentChange(target);
            }
        },
        rightClick(e, k, branch, val=-1) {
            let target = this.talents[branch][k];
            if(!this.playerTalent[target.type])
                return;
            if(e.shiftKey)
                val *= 5;
            val = Math.max(val, -1*this.playerTalent[target.type]);
            let targetLv = this.playerTalent[target.type]+val;
            let branchLv = this.playerTalent[branch]+val;
            let check = this.checkPreReq(target.type, targetLv, target.type) && this.checkPreReq(branch, branchLv, target.type);
            if(!check)
                return;
            if(val < 0) {
                let branches = Object.keys(this.playerTalent).filter(key=>(key!='generalBranch'&&key.indexOf('Branch')!=-1));
                this.playerTalent[branch] += val;
                this.playerTalent[target.type] += val;
                this.playerTalent['generalBranch'] = 0;
                for(let i in branches) {
                    this.playerTalent['generalBranch'] = Math.max(this.playerTalent['generalBranch'], this.playerTalent[branches[i]]);
                }
                this.player.talentPoint -= val;
                this.setStatus(branch);
                this.setStatus('generalBranch');
                this.talentChange(target);
            }
        },
        checkPreReq(talentName, lv, ignore) {
            let isBranch = talentName.indexOf('Branch') != -1;
            for(let name in this.preReqList) {
                if(name == ignore)
                    continue;
                if(this.playerTalent[name] > 0) {
                    for(let preReq in this.preReqList[name]) {
                        let check = this.preReqList[name][preReq];
                        if(talentName == check[0] && ((!isBranch && lv < check[1]) || (isBranch && talentName == check[0] && lv < check[1]))) {
                            return false;
                        }
                    }
                }
            }
            return true;
        },
        talentChange(talent) {
            switch(talent.type) {
                case 'ATK':
                case 'SUNDER':
                case 'DEF':
                case 'BLOCK':
                case 'STR':
                case 'AGI':
                case 'INT':
                case 'CRIT':
                case 'CRITDMG':
                    this.$store.commit('set_player_attribute');
                    break;
                // 战士
                case 'spell_nature_thunderclap':
                case 'inv_sword_48':
                case 'ability_whirlwind':
                case 'spell_holy_crusaderstrike':
                case 'spell_warlock_soulburn':
                case 'ability_warrior_shatteringthrow':
                case 'spell_arcane_starfire':
                case 'spell_nature_starfall':
                case 'ability_druid_starfall':
                case 'spell_shadow_deathscream':
                case 'ability_revendreth_paladin':
                // 法师
                case 'spell_frost_frostbolt02':
                    this.learnSpell(talent.type);
                    break;
            }
        },
        learnSpell(spellName) {
            let spellList = this.$store.state.playerAttribute.spells;
            let charInfo = this.$store.globalComponent["charInfo"];
            if(spellList[spellName] != undefined) {
                spellList[spellName].lv = this.playerTalent[spellName];
                if(this.playerTalent[spellName] == 0)
                    this.$delete(spellList, spellName);
            }
            else {
                spellList[spellName] = {lv: this.playerTalent[spellName], proficient: 0, progress: 0};
            }
            // 刷新一下过滤技能列表
            let temp = charInfo.dmgFilterSelected;
            charInfo.dmgFilterSelected = '';
            charInfo.dmgFilterSelected = temp;
        },
        talentTrigger(type) {
            let lv = this.playerTalent[type];
            let attr = this.player.attribute;
            switch(type) {
                case 'spell_deathknight_bloodpresence':
                    this.hpChange(this.player, this.player, Math.ceil((attr.MAXHP.value-attr.CURHP.value)*lv*0.05));
                    break;
                case 'spell_deathknight_frostpresence':
                    this.mpChange(this.player, this.player, Math.ceil((attr.MAXMP.value-attr.CURMP.value)*lv*0.05));
                    break;
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.container {
    position: relative;
    // display: flex;
    // flex-wrap: wrap;
    // flex-direction: column;
    width: 50rem;
    height: 100%;
    margin: 0.5rem 0.5rem;
    padding: 0;
    // overflow-x: visible;
    // overflow-y: scroll;
    overflow: hidden;
}
.talentTree {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 50rem;
    height: 90%;
}
#draggable-container {
    width: 100%;
}
#draggable-header {
    width: 50rem;
    height: 50rem;
}
$border-size: 50px;
.power {
    position: relative;
    padding: 0.5rem;
    margin: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 1em;
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 1.5rem 1.5rem 2.7rem;
    width: 26rem;
    .talentGrid {
        position: relative;
        width: 60px;
        height: 60px;
        .icon {
            box-shadow: 0 6px 11px #000000;
            overflow: hidden;
            width: $border-size;
            height: $border-size;
            border-radius: 1rem;
        }
        .grayIcon {
            filter: grayscale(100%);
        }
        .semi-disable-frame, .disable-frame {   
            position: absolute; 
            background-size: 200%;
            border: 1px solid black;
            border-image-source: url(/icons/talent/talentBorder1.png);
            border-image-slice: 50%;
            border-image-width: 100%;
            border-image-repeat: stretch;
            height: $border-size;
            width: $border-size;
            top: -1px;
            left: -2px;
        }
        .enable-frame {    
            position: absolute; 
            background-size: 200%;
            border: 1px solid black;
            border-image-source: url(/icons/talent/talentBorder2.png);
            border-image-slice: 50%;
            border-image-width: 100%;
            border-image-repeat: stretch;
            height: $border-size;
            width: $border-size;
            top: -1px;
            left: -2px;
        }
        .done-frame {   
            position: absolute;  
            background-size: 200%;
            border: 1px solid black;
            border-image-source: url(/icons/talent/talentBorder3.png);
            border-image-slice: 50%;
            border-image-width: 100%;
            border-image-repeat: stretch;
            height: $border-size;
            width: $border-size;
            top: -1px;
            left: -2px;
        }
        .skill-point {
            position: absolute;
            z-index: 1;
            bottom: 13px;
            right: 11px;
            color: white;
            font-size: 10px;
            line-height: 1em;
            width: 19px;
            text-align: center;
            text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
        }
        .talent-tip {    
            visibility: hidden;
            border-radius: 8px;
            background: #111;
            position: absolute;
            z-index: 3;
            top: 5px;
            left: 70px;
            width: 300px;
            padding: 10px;
            box-shadow: 0 6px 11px #000000;
            border: 1px solid #333;
            .desc {
                text-align: left;
            }
            .preReq {
                text-align: left;
                margin-top: 1rem;
                .detail {
                    margin-left: 2rem;
                }
            }
            .footnote {
                margin-top: 1rem;
                color: #ccc;
                font-size: 0.8rem;
            }
        }
        .down {
            position: absolute;
            top: -18px;
            right: 10px;
            left: 0;
            margin: auto;
            width: 25px;
            height: 25px;
            z-index: 1;
            background: url(/icons/talent/down.png);
            background-size: 100%;
        }
        .down2 {
            position: absolute;
            top: -75px;
            right: 10px;
            left: 0;
            margin: auto;
            width: 35px;
            height: 75px;
            z-index: 1;
            background: url(/icons/talent/down2.png);
            background-size: 100%;
        }
        .down4 {
            position: absolute;
            top: -190px;
            right: 10px;
            left: 0;
            margin: auto;
            width: 35px;
            height: 200px;
            z-index: 1;
            background: url(/icons/talent/down4.png);
            background-size: 100%;
        }
        .right {
            position: absolute;
            top: -10px;
            bottom: 0;
            left: -18px;
            margin: auto;
            width: 25px;
            height: 25px;
            z-index: 1;
            background: url(/icons/talent/right.png);
            background-size: 100%;
        }
        .disable {
            filter: grayscale(100%);
        }
    }
    .talentGrid > div:hover .talent-tip {
        visibility: visible;
    }
    .progress {
        position: absolute;
        left: -0.1rem;    
        margin-top: 2rem;
        height: calc(100% - 7.5rem);
        width: 1px;
        background: transparent;
        border-radius: 0rem;
        overflow: visible;
        .progress-bar {
            background-color: orange;
        }
        .marker {
            position: absolute;
            width: 1rem;
            height: 1rem;
            left: -0.42rem;
        }
    }
}
</style>