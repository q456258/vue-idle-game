
import { monsterConfig } from '@/assets/config/monsterConfig';
export const dungeon = {
    mixins: [monsterConfig],
    data() {
        return {
            typeColor: {
                normal: '#6d3', gold: '#6d3', 
                elite: '#dc3', 
                boss: '#d63',
                chest: '#c0f'
            },
            monsterName: {},
            arrList: []
        }
    },
    methods: {
        generateDungeonByZone(count, zoneInfo) {
            let map = [];
            this.arrList = Array.from(Array(24).keys());
            for(let i=0; i<count; i++) {
                let choice = {};
                let monsterID = this.getMonsterID(zoneInfo.monsterList, zoneInfo.probability);
                let monsterInfo = this.monster[monsterID];
                let ran = Math.floor(Math.random()*this.arrList.length);
                let eventType = monsterInfo.type;
                let monsterName = this.getName(eventType, monsterID);
                let lv = this.getLv(eventType, zoneInfo, monsterInfo);
                choice = {
                    type: eventType, 
                    color: this.typeColor[eventType],
                    rewardType: this.getReward(eventType, monsterID), 
                    img: './icons/other/'+eventType+'.png',
                    lv: lv,
                    monsterID: monsterID,
                    monsterName: monsterName,
                    count: this.getCount(eventType),
                    left: Math.floor(this.arrList[ran]%6)*15+Math.random()*10+5,
                    top: this.arrList[ran]/6*20+Math.random()*10+5,
                };
                [this.arrList[ran], this.arrList[this.arrList.length-1]] = [this.arrList[this.arrList.length-1], this.arrList[ran]];
                this.arrList.pop();
                map.push(choice);
            }
            return map;
        },
        generateDungeonByID(count, zoneInfo, monsterID) {
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
                    img: './icons/other/'+eventType+'.png',
                    lv: lv,
                    monsterID: monsterID,
                    monsterName: monsterName,
                    count: this.getCount(eventType),
                    left: Math.floor(this.arrList[ran]%6)*15+Math.random()*10+5,
                    top: this.arrList[ran]/6*20+Math.random()*10+5,
                };
                [this.arrList[ran], this.arrList[this.arrList.length-1]] = [this.arrList[this.arrList.length-1], this.arrList[ran]];
                this.arrList.pop();
                map.push(choice);
            }
            return map;
        },
        getMonsterID(monsters, probabilities) {
            let probability = [];
            let total = 0;
            for(let type in probabilities) {
                total += probabilities[type];
                probability.push(total);
            }
            let random = Math.random()*total;
            for(let k=0; k<probabilities.length; k++) {
                if(random <= probability[k]) {
                    return monsters[k];
                }
            }
        },
        getLv(type, zoneInfo, monsterInfo) {
            if(['chest','gold','mine','herb'].indexOf(type) != -1)
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
                // case 'gold':
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
                case 'gold':
                    count = Math.floor(Math.random()*100);
                    break;
                case 'mine':
                case 'herb':
                    count = Math.floor(Math.random()*30);
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
        getReward(type, monsterID) {
            let reward = this.$deepCopy(this.monsterReward[monsterID]);
            switch(type) {
                case 'gold':
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
        }
    }
}