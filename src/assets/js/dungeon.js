
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
        generateDungeon(type, count, minlv, maxLv, monster=0) {
            let map = [];
            let arrList = Array.from(Array(24).keys());
            let playerLv = this.$store.state.playerAttribute.lv;
            for(let i=0; i<count; i++) {
                let choice = {};
                let range = (maxLv-minlv)/count;
                let lv = Math.round(Math.random()*(range)+minlv+range*i);
                let eventType = type == 'advanture' ? this.getType(lv) : type;
                let monsterID = monster || this.monsterId[this.getName(eventType, lv)];
                let monsterName = this.getNameById(monsterID);
                let ran = Math.floor(Math.random()*arrList.length);
                choice = {
                    type: eventType, 
                    color: this.typeColor[eventType],
                    rewardType: this.getReward(eventType, lv), 
                    img: './icons/other/'+eventType+'.png',
                    lv: lv,
                    monsterID: monsterID,
                    monsterName: monsterName,
                    count: this.getCount(eventType),
                    left: Math.floor(arrList[ran]%6)*15+Math.random()*10+5,
                    top: arrList[ran]/6*20+Math.random()*5+5,
                };
                [arrList[ran], arrList[arrList.length-1]] = [arrList[arrList.length-1], arrList[ran]];
                arrList.pop();
                map.push(choice);
            }
            if(minlv <= playerLv && maxLv >= playerLv && type == 'advanture') {
                let eventType = 'normal';
                let monsterID = this.monsterId[this.getName(eventType, playerLv)];
                let monsterName = this.getNameById(monsterID);
                let ran = Math.floor(Math.random()*arrList.length);
                let choice = {
                    type: eventType, 
                    color: this.typeColor[eventType],
                    rewardType: this.getReward(eventType, playerLv), 
                    img: './icons/other/'+eventType+'.png',
                    lv: playerLv,
                    monsterID: monsterID,
                    monsterName: monsterName,
                    count: this.getCount(eventType),
                    left: Math.floor(arrList[ran]%6)*15+Math.random()*10+5,
                    top: arrList[ran]/6*20+Math.random()*5+5,
                };
                [arrList[ran], arrList[arrList.length-1]] = [arrList[arrList.length-1], arrList[ran]];
                arrList.pop();
                map.push(choice);
            }
            return map;
        },
        getType(level) {
            // normal, elite, boss, chest
            // gold, wood, chest, equip
            let types = {
                normal: 10000, 
                elite: 1000, 
                boss: 50, 
                chest: 10, 
                gold: 2000
            }
            let option = ['normal', 'gold', 'chest'];
            let probability = [];
            if(level >= 1) {
                option.push('elite');
                option.push('boss');
            }
            let total = 0;
            for(let type in option) {
                total += types[option[type]];
                probability.push(total);
            }
            let random = Math.random()*total;
            for(let k=0; k<probability.length; k++) {
                if(random <= probability[k]) {
                    return option[k]
                }
            }
        },
        getReward(type, level) {
            let monsterId = this.monsterId[this.getName(type, level)];
            let reward = [];
            reward = this.monsterReward[monsterId];
            return reward;
        },
        getName(type, level) {
            let name = '';
            let nameList = ['小鸡', '训练假人', '高级训练假人', '杂斑野猪', '癞皮山猪', '狗头人矿工', '狗头人地卜师', 
                '河爪豺狼人', '黑爪豺狼人', '盐壳龟', '钳嘴龟', '灼热元素', '熔岩元素', '愤怒的鱼人', '沙鳞鱼人', '巫翼鹰身人', 
                '巫翼游荡者', '火蜥蜴', '雷霆蜥蜴', '黑熊', '冰爪熊', '滑壳龙虾人', '巨壳甲壳蟹'];
            let bossName = ['导师', '阿迦玛', '金牙', '霍格', '铁背龟', '地狱元素', '咕噜咕拉', '塞瑞娜·血羽', '科多兽', '维斯迦尔', '安戈雷尔'];
            switch(type) {
                case 'normal':
                    name = level == 0 ?nameList[0] : nameList[Math.floor((level-1)/10)+1];
                    break;
                case 'elite':
                    name = nameList[Math.floor((level-1)/10)+1]+'精英';
                    break;
                case 'boss':
                    name = bossName[Math.floor((level-1)/20)];
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
        getNameById(monsterID) {
            if(Object.keys(this.monsterName).length == 0) {
                for(let id in this.monsterId) {
                    this.monsterName[this.monsterId[id]] = id;
                }
            }
            return this.monsterName[monsterID];
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