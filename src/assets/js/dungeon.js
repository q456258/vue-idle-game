
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
            monsterName: {}
        }
    },
    methods: {
        generateDungeonByZone(count, zoneInfo) {
            let map = [];
            let arrList = Array.from(Array(24).keys());
            for(let i=0; i<count; i++) {
                let choice = {};
                let monsterID = this.getMonsterID(zoneInfo.monsterList, zoneInfo.probability);
                let monsterInfo = this.monster[monsterID];
                let ran = Math.floor(Math.random()*arrList.length);
                let eventType = monsterInfo.type;
                let monsterName = this.getName(eventType, monsterID);
                let lv = this.getLv(eventType, zoneInfo, monsterInfo);
                choice = {
                    type: eventType, 
                    color: this.typeColor[eventType],
                    rewardType: this.monsterReward[monsterID], 
                    img: './icons/other/'+eventType+'.png',
                    lv: lv,
                    monsterID: monsterID,
                    monsterName: monsterName,
                    count: this.getCount(eventType),
                    left: Math.floor(arrList[ran]%6)*15+Math.random()*10+5,
                    top: arrList[ran]/6*20+Math.random()*10+5,
                };
                [arrList[ran], arrList[arrList.length-1]] = [arrList[arrList.length-1], arrList[ran]];
                arrList.pop();
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
            if(type == 'chest')
                return zoneInfo.minLv+Math.round(Math.random()*(zoneInfo.maxLv-zoneInfo.minLv));
            else
                return monsterInfo.minLv+Math.round(Math.random()*(monsterInfo.maxLv-monsterInfo.minLv));
        },
        getName(type, id) {
            let name = '';
            switch(type) {
                case 'normal':
                case 'elite':
                case 'boss':
                    name = this.monster[id].name;
                    break;
                case 'gold':
                    name = '金矿';
                    break;
                case 'chest':
                    name = '宝藏';
                    break;
            }
            return name;
        },
        getCount(type) {
            switch(type) {
                case 'gold':
                    return -1;
                case 'normal':
                    return -1;
                case 'elite':
                    return 5;
                case 'boss':
                    return 1;
                case 'chest':
                    return 1;
            }
            return -1;
        }
    }
}