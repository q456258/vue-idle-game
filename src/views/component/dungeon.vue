<template>
    <div id="dungeon">
        <div class="dungeonStatInfo">
            <div class="dungeonStat"> 
                <div class="dungeonPortrait">
                    <img src="/icons/character/player1.png" alt="" />
                </div>
                <div>{{this.$store.state.playerAttribute.name}}</div>
                <div id="dungeonPlayerHp" class="dungeonIcon"><img src="/icons/dungeon/HP.png" alt="HP">{{playerStat.hp}}</div>
                <div id="dungeonPlayerAtk" class="dungeonIcon"><img src="/icons/dungeon/ATK.png" alt="ATK">{{playerStat.atk}}</div>
                <div id="dungeonPlayerBlock" class="dungeonIcon"><img src="/icons/dungeon/BLOCK.png" alt="BLOCK">{{playerStat.block}}</div>
            </div>
        </div>
        <div id="dungeonZone" :style="{background: 'url(/icons/maps/'+curDungeon+'.jpg)', backgroundSize: 'cover'}">
            <div class="grid" v-for="(v, k) in map" :key="k" @mouseover="takeAction($event, k, true)" @click="takeAction($event, k, false)" @contextmenu.prevent="showInfo($event, k)">
                <div class="frontIcon" v-show="v.reveal <= 0">
                    <img v-if="v.reveal<0" src="/icons/dungeon/restrict.png" style="width: 100px;" alt="" />
                </div>
                <div :class="['backIcon',{grayscale:v.stat.hp==0&&(v.type=='normal'||v.type=='elite'||v.type=='boss')}]" v-if="v.type" :style="{backgroundImage: 'url(/icons/dungeon/'+v.type+'Border.png)'}">
                    <img :src=v.iconSrc alt="" />
                    <!-- <span class="addonCount">
                        <img src="../../assets/icons/star.png" alt="icon" style="height: 10px; width: 10px;"  v-for="n in v.addon.length" :key="n">
                    </span> -->
                </div>
                <span class="dungeonStat" v-if="(v.stat && v.stat.hp>0)"> 
                    <span class="dungeonIcon"><img src="/icons/dungeon/HP.png" alt="HP">{{v.stat.hp}}</span>
                    <span class="dungeonIcon"><img src="/icons/dungeon/ATK.png" alt="ATK">{{v.stat.atk}}</span>
                    <span class="dungeonIcon"><img src="/icons/dungeon/BLOCK.png" alt="BLOCK">{{v.stat.block}}</span>
                </span>
            </div>
        </div>
        <div class="dungeonStatInfo">
            <div class="dungeonStat" v-if="target"> 
                <div class="dungeonPortrait">
                    <img :src=target.iconSrc alt="" />
                </div>
                <div>{{target.name}}</div>
                <div class="dungeonIcon"><img src="/icons/dungeon/HP.png" alt="HP">{{target.stat.hp}}</div>
                <div class="dungeonIcon"><img src="/icons/dungeon/ATK.png" alt="ATK">{{target.stat.atk}}</div>
                <div class="dungeonIcon"><img src="/icons/dungeon/BLOCK.png" alt="BLOCK">{{target.stat.block}}</div>
                <div class="dungeonSpecialty">
                    <div v-for="(v, k) in target.specialty">
                        <span style="color:yellow">{{dungeonSpecialty[v].name}} </span> 
                        <span style="color:gray">{{dungeonSpecialty[v].desc}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { dungeonConfig } from '@/assets/config/dungeonConfig';
export default {    
    name: 'dungeon',
    props: { },
    mixins: [dungeonConfig],
    components: {},
    data() {
        return {
            row: 7,
            col: 7,
            playerStat: {hp: 100, atk: 100, block: 10},
            target: null,
            curDungeon: 'Ragefire_Chasm',
            mapName: '',
            level: 0,
            map: [
                // {type:'normal', stat:{hp:100, atk: 20, block: 20}, description:{iconSrc:'/icons/dungeon/ui-ej-boss-adarogg.png'}},
                // {type:'normal', stat:{hp:100, atk: 20, block: 20}, description:{iconSrc:'/icons/dungeon/ui-ej-boss-adarogg.png'}}
            ],
        };
    },
    mounted() {
        this.$store.globalComponent.dungeon = this;
        this.generateDungeon('Ragefire_Chasm', 0);
    },
    watch: {
    },
    computed: {
    },
    methods: {
        generateDungeon(name, level) {
            let dungeon = this.dungeons[name];
            this.mapName = dungeon.name;
            this.curDungeon = name;
            this.map = this.generateMap(dungeon.map[level]);
        },
        generateMap(mapArr) {
            let map = Array(this.row*this.col).fill();
            let ranArr = Array.from(map.keys());
            let len = ranArr.length;
            // 直接fill({reveal: 0})会让所有指针指向同一个地址
            for(let i in map) {
                map[i] = {reveal: 0};
            }
            for(let j in mapArr) {
                let info = mapArr[j];
                for(let k=0; k<info.count; k++) {
                    let ran = info.position != -1 ? info.position : Math.floor(Math.random()*len);
                    map[ranArr[ran]] = this.$deepCopy(this.dungeonMonster[info.id]);
                    map[ranArr[ran]].reveal = info.reveal ? 1 : 0;
                    map[ranArr[ran]].index = ranArr[ran];
                    if(map[ranArr[ran]].stat) 
                        map[ranArr[ran]].stat.maxHp = map[ranArr[ran]].stat.hp;
                    ranArr[ran] = ranArr[--len];
                }
            }
            return map;
        },
        takeAction(e, index, fogOnly) {
            let target = this.map[index];
            if(target.reveal < 0) {
                return;
            } else if(target.reveal == 0) {
                this.fogRemoved(index);
                return;
            } else if(fogOnly)
                return;
            this.showInfo(e, index);
            let type = target.type;
            if(['normal', 'elite', 'boss'].indexOf(type) != -1 && target.stat.hp > 0) {
                this.triggerBattle(index);
                if(target.stat.hp <= 0)
                    this.enemyDead(e, index);
            } else if(type == 'door') {
                this.generateDungeon(this.curDungeon, ++this.level);
                this.target = null;
            }
        },
        showInfo(e, index) {
            this.target = this.map[index];
        },
        fogRemoved(index) {
            this.map[index].reveal++;
            if(['normal', 'elite'].indexOf(this.map[index].type) != -1) {
                this.lockSurrounding(index);
            }
        },
        triggerBattle(index) {
            this.playerAttack(index);
            this.enemyAttack(index);
        },
        enemyAttack(index) {
            let enemySpecialty = this.map[index].specialty;
            let enemyStat = this.map[index].stat;
            if(enemyStat.hp <= 0 || this.playerStat.hp <= 0)
                return false;
            let dmg = enemyStat.atk-this.playerStat.block;
            this.playerStat.hp -= Math.max(dmg, 0);
            if(enemySpecialty.indexOf('hunger') != -1 && dmg > 0) {
                this.enemyGainStat(index, 'atk', 1);
                this.enemyGainStat(index, 'block', 1);
                this.gainStat('atk', -1);
                this.gainStat('block', -1);
            }
        },
        playerAttack(index) {
            let enemyStat = this.map[index].stat;
            if(enemyStat.hp <= 0 || this.playerStat.hp <= 0)
                return false;
            enemyStat.hp -= Math.max(this.playerStat.atk-enemyStat.block, 0);
        },
        unlockSurrounding(index) {
            let col = this.col;
            let row = this.row;
            if(index%col > 0) {
                this.map[index-1].reveal++;
                if(index-col >= 0)
                    this.map[index-col-1].reveal++;
                if(index < col*(row-1))
                    this.map[index+col-1].reveal++;
            }
            if(index%col != col-1) {
                this.map[index+1].reveal++;
                if(index-col >= 0)
                    this.map[index-col+1].reveal++;
                if(index < col*(row-1))
                    this.map[index+col+1].reveal++;
            }
            if(index-col >= 0)
                this.map[index-col].reveal++;
            if(index < col*(row-1))
                this.map[index+col].reveal++;
        },
        lockSurrounding(index) {
            let col = this.col;
            let row = this.row;
            if(index%col > 0) {
                if(this.map[index-1].reveal <= 0)
                    this.map[index-1].reveal--;
                if(index-col >= 0 && this.map[index-col-1].reveal <= 0)
                    this.map[index-col-1].reveal--;
                if(index < col*(row-1) && this.map[index+col-1].reveal <= 0)
                    this.map[index+col-1].reveal--;
            }
            if(index%col != col-1) {
                if(this.map[index+1].reveal <= 0)
                    this.map[index+1].reveal--;
                if(index-col >= 0 && this.map[index-col+1].reveal <= 0)
                    this.map[index-col+1].reveal--;
                if(index < col*(row-1) && this.map[index+col+1].reveal <= 0)
                    this.map[index+col+1].reveal--;
            }
            if(index-col >= 0 && this.map[index-col].reveal <= 0)
                this.map[index-col].reveal--;
            if(index < col*(row-1) && this.map[index+col].reveal <= 0)
                this.map[index+col].reveal--;
        },
        enemyDead(e, index) {
            this.unlockSurrounding(index);
            let enemyStat = this.map[index].stat;
            this.gainStat('hp', Math.max(Math.ceil(enemyStat.maxHp/10), 0));
            this.gainStat('atk', Math.max(Math.ceil(enemyStat.atk/10), 0));
            this.gainStat('block', Math.max(Math.ceil(enemyStat.block/10), 0));
            if(this.target == this.map[index])
                this.target = null;
        },
        enemyGainStat(index, type, amount) {
            amount = parseInt(amount);
            if(isNaN(amount)) {
                console.log("增加属性数据传入非数字字符: 类型" +type+' 数额 '+amount);
                return false;
            } else if(amount == 0)
                return false;

            this.map[index].stat[type] += amount;
        },
        gainStat(type, amount) {
            amount = parseInt(amount);
            if(isNaN(amount)) {
                console.log("增加属性数据传入非数字字符: 类型" +type+' 数额 '+amount);
                return false;
            } else if(amount == 0)
                return false;

            this.playerStat[type] += amount;
            this.showGainStat(type, amount);
        },
        showGainStat(type, amount) {
            let duration = 1000;
            let parentNode;
            let node = document.createElement("DIV");
            node.innerHTML = amount>0 ? '+'+amount : amount;
            switch(type) {
                case 'hp':
                    parentNode = document.getElementById("dungeonPlayerHp");
                    break;
                case 'atk':
                    parentNode = document.getElementById("dungeonPlayerAtk");
                    break;
                case 'block':
                    parentNode = document.getElementById("dungeonPlayerBlock");
                    break;
            }
            node.classList.add("dungeonGainStat");
            node.style.color = amount > 0 ? 'greenyellow' : 'red';
            parentNode.appendChild(node);
            setTimeout(() => {
                parentNode.removeChild(node);
            }, duration);
        }
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
    margin: auto;
    border-radius: 15px;
    background: linear-gradient(130deg, rgba(0, 0, 0, 1) 0%, rgb(44, 37, 24) 40%, rgb(14, 10, 6) 70%);
    width: 1000px;
    height: 700px;
    z-index: 9;
    display: flex;
    
}
.dungeonStatInfo {
    width: 145px;
    height: 700px;
}
.dungeonStat {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
    .dungeonPortrait {
        display: flex;
        width: 100px;
        height: 100px;
        img {
            width: auto;
            height: auto;
            max-width: 100px;
            max-height: 100px;
            margin-top: auto;
            margin-bottom: 10px;
        }
    }
    .dungeonIcon {
        position: relative;
    }
    img {
        width: 40px;
        height: 40px;
    }
}
#dungeonZone {
    width: 700px;
    height: 700px;
    display: flex;
    flex-wrap: wrap;
    left: 0;
    right: 0;
    padding: 0;
    margin: auto;
    .grid {
        position: relative;
        height: 100px;
        width: 100px;
        border: none;
        margin: 0;
        &:hover .frontIcon{
            background-color: #282424;
        }
        .frontIcon {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #1d1a1a;
            backface-visibility: hidden;
            z-index: 1;
        }
        .backIcon {
            position: relative;
            display: flex;
            background-size: contain;
            height: 100px;
            width: 100px;
            img {
                max-height: 100%;
                max-width: 100%;
                margin-top: auto;
                margin-bottom: 10px;
            }
        }
        .dungeonStat {
            position: absolute;
            top: 5px;
            left: 7px;
            pointer-events: none;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
            img {
                width: 10px;
                height: 10px;
            }
        }
    }
}

</style>