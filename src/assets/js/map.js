
import { monsterConfig } from '@/assets/config/monsterConfig';
import { spellEffect } from '@/assets/js/spellEffect';
export const map = {
    mixins: [monsterConfig, spellEffect],
    data() {
        return {
            typeColor: {
                normal: '#6d3', mine: '#b60', herb: '#bd7', 
                elite: '#dc3', 
                boss: '#d63',
                chest: '#c0f'
            },
            levels: {normal: -1, elite: -1, boss: -1},
            enemyType: 0
        }
    },
    methods: {
        actualReward(mapArr, lv) {
            let equipInfo = this.$store.globalComponent["equipInfo"];;   
            let itemInfo = this.$store.globalComponent["itemInfo"];;
            let reward = [];
            for(let type in mapArr) {
                let rewardInfo = mapArr[type];
                if(rewardInfo[0] == 'unique_equip') {
                    let newEquip = JSON.parse(equipInfo.createUniqueEquipTemplate(rewardInfo[1]));
                    reward.push([newEquip,rewardInfo[2]]);
                }
                else {
                    let minQty = rewardInfo[2]==undefined ? 1 : rewardInfo[2];
                    reward.push([JSON.parse(itemInfo.createItem(rewardInfo[0], minQty, lv)), rewardInfo[1], rewardInfo[2], rewardInfo[3]]);
                }
            }
            return reward;
        },
        generateEnemyWithDelay(type, level, monsterID) {
            setTimeout(() => {
                this.generateEnemy(type, level, monsterID);
            }, 1000);
        },
        generateEnemy(type, level, monsterID) {
            let enemyAttribute = {};
            
            if(!type)
                type = this.dungeonInfo[this.dungeonInfo.current].type;
            if(!level)
                level = this.getLv(type);
            if(!monsterID)
                monsterID = this.getMonsterID(level, type);
            enemyAttribute.attribute = {};
            enemyAttribute.buff = {};
            enemyAttribute.buffCounter = {};
            enemyAttribute.tempStat = [];
            enemyAttribute.timedBuff = {};
            enemyAttribute.spellCycle = this.$deepCopy(this.monster[monsterID].spellCycle);
            enemyAttribute.talent = this.$deepCopy(this.monster[monsterID].talent);
            enemyAttribute.curSpell = 0;
            for(let stat in this.monster[monsterID].template) {
                enemyAttribute.attribute[stat] = { value: this.monster[monsterID].template[stat] };
            }
            let attribute = enemyAttribute.attribute,
            val = 0.0,
            flexStats = ['MAXHP', 'ATK', 'AP', 'DEF', 'MR'],
            lvStats = ['BLOCK', 'HEAL', 'APPEN'],
            percentStats = ['CRIT', 'CRITDMG', 'APCRIT', 'APCRITDMG']; 
            enemyAttribute.lv = level;
            let flexLv = level - this.monster[monsterID].minLv;
            enemyAttribute.type = type;
            enemyAttribute.name = this.getName(type, monsterID);;
            // enemyAttribute.spell = {};
            flexStats.forEach(stat => {
                let attr = enemyAttribute.attribute[stat];
                // attribute.value = Math.round(attribute.value*(1+enemyAttribute.lv*0.15)*(1+Math.random()/10));
                // attribute.value = Math.round(attribute.value*(1+enemyAttribute.lv*0.15));
                // attribute.value = Math.round(attribute.value*(1.5+enemyAttribute.lv*(enemyAttribute.lv-1)*(enemyAttribute.lv/50)));
                // attr.value = Math.round(attr.value*(2+enemyAttribute.lv*(enemyAttribute.lv/35)*(0.9+Math.random()*0.2)));
                // attr.value = Math.round(attr.value*(1+flexLv*(flexLv/75))*(0.95+Math.random()*0.1));
                // attr.value = Math.round(attr.value*(1+(20+flexLv)*(flexLv/500))*(0.95+Math.random()*0.1));
                attr.value = Math.round(attr.value*(1+(10+flexLv)*(flexLv/125))*(0.95+Math.random()*0.1));
                attr.showValue = attr.value;
                enemyAttribute.attribute[stat] = attr;
            });
            lvStats.forEach(stat => {
                let attr = enemyAttribute.attribute[stat];
                attr.value = Math.round(attr.value*(1+flexLv/10));
                attr.showValue = attr.value;
                enemyAttribute.attribute[stat] = attr;
            });
            percentStats.forEach(stat => {
                let attr = enemyAttribute.attribute[stat];
                // attribute.value = Math.round(attribute.value*(enemyAttribute.lv));
                attr.showValue = attr.value + '%';
                enemyAttribute.attribute[stat] = attr;
            });
            attribute['CURHP'] = {
                value: attribute['MAXHP'].value,
                showValue: attribute['MAXHP'].value
            }
            attribute['SHIELD'] = {
                value: 0,
                showValue: 0
            }
            // if(type=='elite') {
            //     attribute = this.eliteStat(attribute);
            // }
            // else if(type=='boss') {
            //     attribute = this.bossStat(attribute);
            // }
            val = this.getDefRed(attribute['DEF'].value);
            attribute['DEFRED'] = {
                value: val,
                showValue: val+'%'
            }
            
            this.$store.commit('set_enemy_attribute', {'type': type, 'attr': enemyAttribute});
        },
        getMonsterID(lv, type) {
            let monsterID = 0;
            // 新手教程
            if(lv <= 10) {
                if(type == 'normal')
                    monsterID = this.enemyType;
                else if(type == 'elite')
                    monsterID = 3+this.enemyType;
                else if(type == 'boss')
                    monsterID = 5;
            } else {
                monsterID = Math.ceil(lv/50)*10;
                // 两种怪物根据等级/10后的奇数偶数轮换
                if(type == 'normal')
                    monsterID += 1+this.enemyType;
                else if(type == 'elite')
                    monsterID += 3+this.enemyType;
                else if(type == 'boss')
                    monsterID += 5;
            }
            this.$store.state.dungeonInfo[type].monsterID = monsterID;
            return monsterID;
        },
        initLvs() {
            let dungeonInfo = this.$store.state.dungeonInfo;
            for(let type in this.levels) {
                this.levels[type] = dungeonInfo[type].level;
            }
        },
        addMaxLv(type) {
            let dungeonInfo = this.$store.state.dungeonInfo;
            if(this.levels[type] == dungeonInfo[type].level){
                this.dungeonInfo[type].level++;
                this.levels[type]++;
                return this.levels[type];
            }
            return -1;
        },
        modLv(type, lv) {
            let dungeonInfo = this.$store.state.dungeonInfo;
            let newLv = this.levels[type]+lv;
            if(newLv > dungeonInfo[type].level) {
                newLv = dungeonInfo[type].level;
                if(this.levels[type] == dungeonInfo[type].level)
                    return false;
            } else if(newLv <= 0) {
                newLv = 1;
                if(this.levels[type] == 1)
                    return false;
            }
            this.levels[type] = newLv;
            return true;
        },
        getLv(type) {
            if(this.levels[type] == -1)
                this.initLvs();
            let level = this.levels[type];
            if(type == 'normal')
                return level;
            else if(type == 'elite')
                return level*5;
            else if(type == 'boss')
                return level*10;
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