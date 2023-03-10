
import { monsterConfig } from '@/assets/config/monsterConfig';
export const map = {
    mixins: [monsterConfig],
    data() {
        return {
            typeColor: {
                normal: '#6d3', mine: '#b60', herb: '#bd7', 
                elite: '#dc3', 
                boss: '#d63',
                chest: '#c0f'
            },
            monsterName: {},
            arrList: []
        }
    },
    methods: {
        generateMapByZone(count, zoneInfo) {
            let map = [];
            this.arrList = Array.from(Array(24).keys());
            for(let i=0; i<count; i++) {
                let choice = {};
                let monsterID = this.getMonsterID(zoneInfo.monsterList, zoneInfo.weight);
                let monsterInfo = this.monster[monsterID];
                let ran = Math.floor(Math.random()*this.arrList.length);
                let eventType = monsterInfo.type;
                let monsterName = this.getName(eventType, monsterID);
                let lv = this.getLv(eventType, zoneInfo, monsterInfo);
                choice = {
                    type: eventType, 
                    color: this.typeColor[eventType],
                    rewardType: this.getReward(eventType, monsterID), 
                    isLottery: this.getIsLottery(eventType, monsterID),
                    img: './icons/other/'+eventType+'.png',
                    lv: lv,
                    monsterID: monsterID,
                    monsterName: monsterName,
                    count: this.getCount(eventType),
                    resetCount: this.getResetCount(eventType),
                    resetMax: this.getResetCount(eventType),
                    left: Math.floor(this.arrList[ran]%6)*15+Math.random()*10+5,
                    top: this.arrList[ran]/6*20+Math.random()*10+5,
                };
                [this.arrList[ran], this.arrList[this.arrList.length-1]] = [this.arrList[this.arrList.length-1], this.arrList[ran]];
                this.arrList.pop();
                map.push(choice);
            }
            if(Math.random()<0.5 && zoneInfo.harvestList.length>0) {
                let count = (Math.random()<0.5 || zoneInfo.harvestList.length==1) ? 1 : 2;
                let harvest = this.generateMapByID(count, zoneInfo, this.getMonsterID(zoneInfo.harvestList, zoneInfo.harvestWeight));
                map = map.concat(harvest)
            }
            return map;
        },
        generateMapByID(count, zoneInfo, monsterID) {
            let map = [];
            for(let i=0; i<count; i++) {
                let choice = {};
                let monsterInfo = this.monster[monsterID];
                let ran = Math.floor(Math.random()*this.arrList.length);
                let eventType = monsterInfo.type;
                let monsterName = this.getName(eventType, monsterID);
                let lv = this.getLv(eventType, zoneInfo, monsterInfo);
                choice = {
                    type: eventType, 
                    color: this.typeColor[eventType],
                    rewardType: this.getReward(eventType, monsterID), 
                    isLottery: this.getIsLottery(eventType, monsterID),
                    img: './icons/other/'+eventType+'.png',
                    lv: lv,
                    monsterID: monsterID,
                    monsterName: monsterName,
                    count: this.getCount(eventType),
                    resetCount: this.getResetCount(eventType),
                    resetMax: this.getResetCount(eventType),
                    left: Math.floor(this.arrList[ran]%6)*15+Math.random()*10+5,
                    top: this.arrList[ran]/6*20+Math.random()*10+5,
                };
                [this.arrList[ran], this.arrList[this.arrList.length-1]] = [this.arrList[this.arrList.length-1], this.arrList[ran]];
                this.arrList.pop();
                map.push(choice);
            }
            return map;
        },
        getMonsterID(monsters, weights) {
            let probability = [];
            let total = 0;
            for(let type in weights) {
                total += weights[type];
                probability.push(total);
            }
            let random = Math.random()*total;
            for(let k=0; k<weights.length; k++) {
                if(random <= probability[k]) {
                    return monsters[k];
                }
            }
        },
        getLv(type, zoneInfo, monsterInfo) {
            if(['chest','mine','herb'].indexOf(type) != -1)
                return zoneInfo.minLv+Math.round(Math.random()*(zoneInfo.maxLv-zoneInfo.minLv));
            else
                return monsterInfo.minLv+Math.round(Math.random()*(monsterInfo.maxLv-monsterInfo.minLv));
        },
        getName(type, id) {
            let name = '';
            switch(type) {
                case 'chest':
                    name = '宝藏';
                    break;
                // case 'normal':
                // case 'elite':
                // case 'boss':
                // case 'mine':
                // case 'herb':
                default:
                    name = this.monster[id].name;
            }
            return name;
        },
        getCount(type) {
            let count = 1;
            switch(type) {
                case 'mine':
                case 'herb':
                    count = Math.ceil(Math.random()*9);
                    break;
                case 'normal':
                    count = -1;
                    break;
                case 'elite':
                    count = 5;
                    break;
                case 'boss':
                    count = 1;
                    break;
                case 'chest':
                    count = 1;
                    break;
                default:
                    count = 1;
            }
            return count;
        },
        getResetCount(type) {
            let count = 1;
            switch(type) {
                case 'mine':
                case 'herb':
                case 'chest':
                case 'normal':
                    count = 1;
                    break;
                case 'elite':
                    // count = 2;
                    count = 1;
                    break;
                case 'boss':
                    // count = 5;
                    count = 1;
                    break;
                default:
                    count = 1;
            }
            return count;
        },
        getReward(type, monsterID) {
            let reward = this.$deepCopy(this.monsterReward[monsterID]);
            switch(type) {
                case 'mine':
                case 'herb':
                    reward[0][1] = Math.floor(Math.random()*100);
                    break;
                // case 'normal':
                // case 'elite':
                // case 'boss':
                // case 'chest':
                //     return this.monsterReward[monsterID];
            }
            return reward;
        },
        getIsLottery(type, monsterID) {
            switch(type) {
                // case 'normal':
                case 'boss':
                case 'chest':
                    return true;
            }
            return false;
        }
    }
}