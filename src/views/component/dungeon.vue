<template>
    <div id="dungeon">
        <a href="#" class="close" @click="close()"></a>
        <div class="title">
            副本
        </div>    
        <div class="dungeonList" >
            <div v-for="(val, key) in dungeons" :key="key" @click="selectDungeon(key)">
                <div :class="[{dungeonSelected: key==selectedDungeon}, 'glossy-button dungeonName']" :style="{backgroundImage: 'url(/icons/dungeon/'+key+'.png)'}">
                    {{dungeons[key].name+'('+dungeons[key].lv+')'}}
                </div>
            </div>
        </div>
        <div class="" v-if="selectedDungeon">
            <div id="dungeonInfo">
                <div id="dungeonDesc" class="scrollbar-morpheus-den">
                    <p v-for="(v, k) in curDungeon.desc" :key="k"> 
                        {{ v }}
                    </p>
                </div>
                <div >
                    奖励
                </div>
                <div class="itemList">
                    <div v-for="(v, k) in curDungeon.rewardList" :key="k"> 
                        <div class="grid" v-if="v[0]" @mouseover="showInfo($event,v[0].itemType,v[0],true)" @mouseleave="closeInfo(v[0].itemType)">
                            <div class="mediumIconContainer">
                                <del :class="[{grey:v[0].quality.qualityLv==1, green:v[0].quality.qualityLv==3, blue:v[0].quality.qualityLv==4, purple:v[0].quality.qualityLv==5, orange:v[0].quality.qualityLv==6}, 'mediumIcon iconBorder']"></del>
                                <img :src="v[0].description.iconSrc" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="dungeonMember">
                <span class="dungeonStat"> 
                    <span v-show="false">{{ forceUpdate }}</span>
                    <span class="dungeonIcon">当前</span>
                    <span class="dungeonIcon" v-if="curDungeon.status=='none' || curDungeon.status=='ready'">建议</span>
                    <span class="dungeonIcon"><img src="/icons/dungeon/HP.png" alt="HP">{{playerStat.HP}}</span>
                    <span class="dungeonIcon" v-if="curDungeon.status=='none' || curDungeon.status=='ready'"><img src="/icons/dungeon/HP.png" alt="HP">{{curDungeon.suggestStat[0]}}</span>
                    <span class="dungeonIcon"><img src="/icons/dungeon/ATK.png" alt="ATK">{{playerStat.ATK}}</span>
                    <span class="dungeonIcon" v-if="curDungeon.status=='none' || curDungeon.status=='ready'"><img src="/icons/dungeon/ATK.png" alt="ATK">{{curDungeon.suggestStat[1]}}</span>
                    <span class="dungeonIcon"><img src="/icons/dungeon/BLOCK.png" alt="BLOCK">{{playerStat.BLOCK}}</span>
                    <span class="dungeonIcon" v-if="curDungeon.status=='none' || curDungeon.status=='ready'"><img src="/icons/dungeon/BLOCK.png" alt="BLOCK">{{curDungeon.suggestStat[2]}}</span>
                </span>
                <div class="memberList scrollbar-morpheus-den" v-if="curDungeon.status=='none' || curDungeon.status=='ready'">        
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <div :class="{danger:curDungeon.members.length==curDungeon.limit}" style="cursor:pointer" @click="autofill(selectedDungeon)">{{ curDungeon.members.length + '/' +curDungeon.limit }}</div>
                                </th>
                                <th scope="col">名称</th>
                                <th scope="col" style="cursor:pointer" @click="sortBy('lv')">等级</th>
                                <th scope="col" style="cursor:pointer" @click="sortBy('HP', 'stat')">生命</th>
                                <th scope="col" style="cursor:pointer" @click="sortBy('ATK', 'stat')">攻击</th>
                                <th scope="col" style="cursor:pointer" @click="sortBy('BLOCK', 'stat')">防御</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(v, k) in guild.member" :key="k">
                                <td><input type="checkbox" v-if="v.status!='inDungeon'" v-model="selected" :value="v.id" v-on:change="updateMember($event, v.id, selectedDungeon)"></td>
                                <td>{{v.name}}</td>
                                <td>{{v.lv}}</td>
                                <td>{{v.stat.HP}}</td>
                                <td>{{v.stat.ATK}}</td>
                                <td>{{v.stat.BLOCK}}</td>
                                <!-- <td style="width: 8em;">
                                    <div class="skill" v-for="(id, index) in v.skill" :key="index">
                                        <span class="skillName">{{guildSkill[id].name}}</span>
                                    </div>
                                </td> -->
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="dungeonMsg" class="scrollbar-morpheus-den" v-show="curDungeon.status == 'inProgress' || curDungeon.status == 'done'">
                    <span v-show="false">{{ forceUpdate }}</span>
                    战斗信息：
                    <div v-for="(v, k) in curDungeon.msg" :key="k"> 
                        {{ v }}
                    </div>
                </div>
            </div>
            <div class="btn btn-success" v-if="curDungeon.status == 'ready'" @click="startDungeon(selectedDungeon)">进入副本</div>
            <div class="btn btn-danger" v-if="curDungeon.status == 'inProgress'" @click="quitDungeon(selectedDungeon)">退出副本</div>
            <div class="btn btn-success" v-if="curDungeon.status == 'done'" @click="collectReward(selectedDungeon)">领取奖励</div>
        </div>
    </div>
</template>
<script>

import { dungeonConfig } from '@/assets/config/dungeonConfig';
import { itemConfig } from '@/assets/config/itemConfig';
export default {    
    name: 'dungeon',
    props: { },
    mixins: [dungeonConfig, itemConfig],
    components: {},
    data() {
        return {
            selectedDungeon: null,
            dungeonProgress: {},
            forceUpdate: 0,   
            selected: []         
        };
    },
    mounted() {
        this.$store.globalComponent.dungeon = this;
    },
    watch: {
    },
    computed: {
        guild() { return this.$store.state.guildAttribute; },
        playerStat() {
            if(!this.selectedDungeon || !this.dungeonProgress[this.selectedDungeon])
                return null;
            return this.dungeonProgress[this.selectedDungeon].playerStat;
        },
        curDungeon() {
            if(!this.selectedDungeon || !this.dungeonProgress[this.selectedDungeon])
                return null;
            return this.dungeonProgress[this.selectedDungeon];
        }
    },
    methods: {
        selectDungeon(name) {
            this.selectedDungeon = name;
            if(this.dungeonProgress[name] == null) {
                this.generateDungeon(name);
            }
            else if( ['none', 'ready'].indexOf(this.dungeonProgress[name].status) != -1)
                this.resetMember(name);
        },
        init() {
            for(let dungeon in this.dungeons) {
                this.generateDungeon(dungeon);
            }
            for(let i in this.guild.member) {
                let member = this.guild.member[i];
                member.status = 'none';
            }
        },
        generateDungeon(name) {
            if(this.dungeonProgress[name] == null)
                this.dungeonProgress[name] = {};
            let dungeon = this.dungeons[name];
            let curDungeon = this.dungeonProgress[name];
            curDungeon.mapName = dungeon.name;
            curDungeon.desc = dungeon.desc;
            // 当前层数
            curDungeon.level = 0;
            // 副本等级
            curDungeon.lv = dungeon.lv;
            curDungeon.limit = dungeon.limit;
            if(curDungeon.playerStat)
                this.clearPlayerStat(name);
            else
                curDungeon.playerStat = {HP: 0, ATK: 0, BLOCK: 0};
            curDungeon.map = this.generateMap(dungeon.map);
            curDungeon.suggestStat = dungeon.suggestStat;
            curDungeon.rewardList = this.generateRewardList(dungeon.rewardList);
            curDungeon.msg = [];
            curDungeon.status = 'none';
            curDungeon.prizePool = {};
            curDungeon.timer = null;
            curDungeon.members = [];
        },
        generateMap(mapArr) {
            let map = [];
            for(let i in mapArr) {
                let id = mapArr[i];
                let monster = this.$deepCopy(this.dungeonMonster[id]);
                map.push(monster);
            }
            return map;
        },
        generateRewardList(list) {
            let rewardList = [];
            let itemInfo = this.$store.globalComponent.itemInfo;
            for(let i in list) {
                rewardList.push([JSON.parse(itemInfo.createItem(list[i], 1, 1))]);
            }

            return rewardList;
        },
        autofill(dungeon) {
            let curDungeon = this.dungeonProgress[dungeon];
            if(curDungeon.members.length>=curDungeon.limit || curDungeon.members.length==this.guild.member.length) {
                for(let i in this.selected) {
                    let id = this.selected[i];
                    this.updateMemberStat(false, id, dungeon);
                }
            }
            else {
                for(let i in this.guild.member) {
                    if(curDungeon.members.length>=curDungeon.limit)
                        return;
                    let member = this.guild.member[i];
                    let id = this.guild.member[i].id;
                    if(this.selected.indexOf(id) == -1) {
                        this.selected.push(id);
                        this.updateMemberStat(true, id, dungeon);
                    }
                }
            }
        },
        updateMember(e, id, dungeon) {
            let curDungeon = this.dungeonProgress[dungeon];
            if(e.target.checked && curDungeon.members.length>=curDungeon.limit) {
                this.selected.splice(this.selected.indexOf(id),1);
                e.target.checked = false;
                return;
            }
            this.updateMemberStat(e.target.checked, id, dungeon);
        },
        updateMemberStat(isAdd, id, dungeon) {
            let curDungeon = this.dungeonProgress[dungeon];
            let isAdding = isAdd ? 1 : -1;
            if(isAdd) {
                if(curDungeon.members.length<curDungeon.limit)
                    curDungeon.members.push(id);
                else
                    return;
            }
            else
                curDungeon.members.splice(curDungeon.members.indexOf(id),1);

            let guildMember = this.$store.globalComponent["guildMember"];
            let member = guildMember.findTargetByID(id);
            this.updatePlayerStat(dungeon, 'HP', isAdding*member.stat.HP);
            this.updatePlayerStat(dungeon, 'ATK', isAdding*member.stat.ATK);
            this.updatePlayerStat(dungeon, 'BLOCK', isAdding*member.stat.BLOCK);
            if(curDungeon.members.length == 0)
                this.statusChange(dungeon, 'none');
            else
                this.statusChange(dungeon, 'ready');
        },
        resetMember(dungeon) {
            let curDungeon = this.dungeonProgress[dungeon];
            curDungeon.members = [];
            this.selected = [];
            this.clearPlayerStat(dungeon);
        },
        updatePlayerStat(dungeon, type, value, fixed=false) {
            let playerStat = this.dungeonProgress[dungeon].playerStat;
            if(fixed)
                playerStat[type] = value;
            else
                playerStat[type] += value;
            this.forceUpdate += 1;
        },
        clearPlayerStat(dungeon) {
            this.updatePlayerStat(dungeon, 'HP', 0, true);
            this.updatePlayerStat(dungeon, 'ATK', 0, true);
            this.updatePlayerStat(dungeon, 'BLOCK', 0, true);
        },
        startDungeon(dungeon) {
            let curDungeon = this.dungeonProgress[dungeon];
            this.statusChange(dungeon, 'inProgress');
            curDungeon.timer = setInterval(() => {
                if(curDungeon.status != 'inProgress' || !this.battle(dungeon) || ++curDungeon.level >= curDungeon.map.length) {
                    this.statusChange(dungeon, 'done');
                    clearInterval(curDungeon.timer);
                    return;
                }
            }, 15000)
            let quest = this.$store.globalComponent["quest"];
            quest.trackProgress('event', 13, 1);
        },
        quitDungeon(dungeon) {
            let curDungeon = this.dungeonProgress[dungeon];
            clearInterval(curDungeon.timer);
            this.statusChange(dungeon, 'done');
        },
        collectReward(dungeon) {
            let curDungeon = this.dungeonProgress[dungeon];
            let itemInfo = this.$store.globalComponent["itemInfo"];
            for(let k in curDungeon.prizePool) {
                let item = itemInfo.createItem(k, curDungeon.prizePool[k]);  
                itemInfo.addItem(JSON.parse(item), true);
            }
            this.statusChange(dungeon, 'none');
        },
        battle(dungeon) {
            let curDungeon = this.dungeonProgress[dungeon];
            let player = curDungeon.playerStat;
            let enemy = curDungeon.map[curDungeon.level].stat;
            let playerDmg = Math.max(player.ATK-enemy.BLOCK, 0);
            let enemyDmg = Math.max(enemy.ATK-player.BLOCK, 0);
            let playerTurn = Math.ceil(enemy.HP/playerDmg);
            let enemyTurn = Math.ceil(player.HP/enemyDmg);
            if(enemyTurn<playerTurn || (playerDmg==0 && enemyDmg==0)) {
                this.updatePlayerStat(dungeon, 'HP', 0, true);
                let hpRemain = enemy.HP-playerDmg*enemyTurn;
                if(playerDmg==0 && enemyDmg==0)
                    hpRemain = enemy.HP;
                this.battleLost(dungeon, hpRemain)
                return false;
            } else {
                let dmg = (playerTurn-1)*enemyDmg;
                this.updatePlayerStat(dungeon, 'HP', -dmg)
                this.battleWon(dungeon, dmg)
                return true;
            }
        },
        battleWon(dungeon, dmg) {
            let curDungeon = this.dungeonProgress[dungeon];
            let msg = '击败'+ curDungeon.map[curDungeon.level].name+', 失去'+dmg+'点生命值';
            let haveReward = false;
            for(let i in curDungeon.map[curDungeon.level].reward) {
                let random = Math.random()*100;
                let reward = curDungeon.map[curDungeon.level].reward[i];
                if(random <= reward[1]) {
                    let qty = reward[2]==undefined ? 1 : reward[2];
                    qty = reward[3]==undefined ? qty : qty+Math.ceil(Math.random()*(reward[3]-qty));
                    this.addToPrizePool(dungeon, reward[0], qty);
                    if(!haveReward) {
                        msg += '，获得战利品: '
                        msg += this.itemType[reward[0]].description.name + '*' + qty;
                    }
                    else
                        msg += ', ' + this.itemType[reward[0]].description.name + '*' + qty;
                    haveReward = true;
                }
            }
            this.addMsg(dungeon, msg);
        },
        battleLost(dungeon, hpRemain) {
            let curDungeon = this.dungeonProgress[dungeon];
            let msg = '战斗失败，'+curDungeon.map[curDungeon.level].name+'剩余 ' +hpRemain+' 点生命值';
            this.addMsg(dungeon, msg);
            this.statusChange(dungeon, 'done');
        },
        addToPrizePool(dungeon, itemName, quantity) {
            let curDungeon = this.dungeonProgress[dungeon];
            if(curDungeon.prizePool[itemName])
                curDungeon.prizePool[itemName] += quantity;
            else
                curDungeon.prizePool[itemName] = quantity;
        },
        addMsg(dungeon, msg) {
            let curDungeon = this.dungeonProgress[dungeon];
            curDungeon.msg.push(msg);
            let element = document.getElementById('dungeonMsg');
            // 渲染完成后滚至最下端
            this.$nextTick(() => {
                element.scrollTop = element.scrollHeight + 20;
                this.forceUpdate += 1;
            })
        },
        statusChange(dungeon, status) {
            let guildMember = this.$store.globalComponent["guildMember"];
            let curDungeon = this.dungeonProgress[dungeon];
            curDungeon.status = status;
            switch(status) {
                case 'inProgress':
                    for(let i in curDungeon.members) {
                        let id = curDungeon.members[i];
                        let member = guildMember.findTargetByID(id);
                        member.status = 'inDungeon';
                    }
                    break;
                case 'none':
                    let chance = curDungeon.level/curDungeon.map.length;
                    for(let i in curDungeon.members) {
                        let id = curDungeon.members[i];
                        let member = guildMember.findTargetByID(id);
                        let ran = Math.random();
                        member.status = 'none';
                        if(ran <= chance) {
                            if(member.lv < curDungeon.lv)
                                guildMember.levelUp(member);
                        }
                    }
                    this.generateDungeon(dungeon);
                    this.resetMember(dungeon);
                    break;
            }
            this.forceUpdate += 1;
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
        showInfo($event, type, item, compare) {
            let index = this.$store.globalComponent["index"];
            index.showInfo($event, type, item, compare);
        },
        closeInfo(type) {
            let index = this.$store.globalComponent["index"];
            let equip = ['helmet', 'weapon', 'armor', 'shoe', 'shoulder', 'glove', 'ring', 'cape', 'bracer', 'belt', 'legging', 'necklace'];

            if(equip.indexOf(type) != -1)
                index.closeInfo('equip');
            else
                index.closeInfo('item');
        },
        close() {
            let index = this.$store.globalComponent["index"];
            index.closeMenuPanel('dungeon');
        },
    }
}
</script>
<style lang="scss" scoped>
#dungeon {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 60px;
    margin: auto;
    border-radius: 2px;
    background: linear-gradient(130deg, rgba(0, 0, 0, 1) 0%, rgb(44, 37, 24) 40%, rgb(14, 10, 6) 70%);
    width: 750px;
    height: 500px;
    z-index: 9;
    display: flex;
    background-image: url(/icons/dungeon/dungeonBG.png);
    background-size: cover;
}
#dungeonInfo {
    width: 595px;
    height: 200px;
}
#dungeonMember {
    display: flex;
    width: 595px;
    // height: 300px;
}
#dungeonMsg {
    width: 1000px;
    height: 170px;
    overflow-y: auto;
}
#dungeonDesc {
    width: 595px;
    height: 100px;
    overflow-y: auto;
    text-align: left;
    text-indent: 30px;
    margin: 10px 0 20px 0;
}
.dungeonList {
    position: relative;
    height: 650px;
    font-size: 15px;
    line-height: 25px;
    padding: 0px 10px 0px 10px;
    display: block;
}
.dungeonName {
    color: #FFCE00;
    font-size: 13px;
    font-family: sans-serif;
    font-weight: bold;
}
.glossy-button {
    position: relative;
    width: 132px;
    height: 65px;
    display: inline-block;
    background-color: #AAA;
    background-image: url(/icons/dungeon/ragefireChasm.png);
    background-size: contain;
    padding: 5px 10px;
    text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
    border-radius: 5px;
    box-shadow: inset 0 -5px 20px hsla(0, 0%, 0%, 1), /* top light */ inset 0 5px 20px hsla(0, 0%, 100%, 0.4), /* bottom shadow */ /* multiple light sources yall */ -8px 8px 5px hsla(0, 0%, 0%, 0.15), /* drop shadow 1 */ 5px 18px 10px hsla(0, 0%, 0%, 0.2);
    // transition: transform 0.1s, box-shadow 0.1s;
}
/* highlight */
.glossy-button:before {
    content: '';
    display: block;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    height: 10px;
    border-radius: 5px;
    background: linear-gradient(hsla(0, 0%, 100%, 0.4), hsla(0, 0%, 100%, 0) );
}
.glossy-button:hover {
    transform: scale(1.05);    
}
.dungeonSelected {
    box-shadow: inset 0 -5px 20px rgba(123, 255, 139, 0.6), /* top light */ inset 0 5px 20px hsla(0, 0%, 100%, 0.4), /* bottom shadow */ /* multiple light sources yall */ -8px 8px 5px hsla(0, 0%, 0%, 0.15), /* drop shadow 1 */ 5px 18px 10px hsla(0, 0%, 0%, 0.2);
}

.dungeonStat {
    display: flex;
    // flex-direction: column;
    flex-wrap: wrap;
    width: 200px;
    height: 170px;
    align-items: flex-start;
    text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
    .dungeonIcon {
        position: relative;
        // width: 50%;
        width: 99px;
        text-align: left;
    }
    img {
        width: 30px;
        height: 30px;
    }
}
.memberList {
    width: 400px;
    overflow-y: auto;
    display: block;
    height: 170px;
}
.title {
    position: absolute;
    top: 1.4rem;
    left: 0;
    right: 0;
    font-weight: bold;
    font-size: 1.5rem;
}
</style>