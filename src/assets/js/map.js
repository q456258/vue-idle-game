
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
            monsterName: {},
            arrList: []
        }
    },
    methods: {
        actualReward(mapArr) {
            let equipInfo = this.$store.globalComponent["equipInfo"];;   
            let itemInfo = this.$store.globalComponent["itemInfo"];;
            // 抽奖类型，不立即生成奖励
            if(mapArr.isLottery) {
                mapArr.lotReward = mapArr.rewardType;
            }
            let reward = [];
            for(let type in mapArr) {
                let rewardInfo = mapArr[type];
                if(rewardInfo[0] == 'unique_equip') {
                    let newEquip = JSON.parse(equipInfo.createUniqueEquipTemplate(rewardInfo[1]));
                    reward.push([newEquip,rewardInfo[2]]);
                }
                else {
                    let minQty = rewardInfo[2]==undefined ? 1 : rewardInfo[2];
                    reward.push([JSON.parse(itemInfo.createItem(rewardInfo[0], minQty, mapArr.lv)), rewardInfo[1], rewardInfo[2], rewardInfo[3]]);
                }
            }
            return reward;
        },
        generateenemy(type, level, monsterID) {
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
                attr.value = Math.round(attr.value*(1+flexLv*(flexLv/75))*(0.95+Math.random()*0.1));
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
            
            let enemyPos = document.getElementById("enemyAnime");
            enemyPos.style.backgroundImage = "url(/icons/character/"+this.monster[monsterID].anime+")";
            this.$store.commit('set_enemy_attribute', {'type': type, 'attr': enemyAttribute});
        },
        getMonsterID(lv, type) {
            let monsterID = 0;
            if(lv <= 10 && type == 'normal')
                return monsterID;
            monsterID = Math.floor(lv/100)*10;
            if(type == 'normal')
                monsterID += Math.floor(lv%100/50)+1;
            else if(type == 'elite')
                monsterID += Math.floor(lv%100/50)+3;
            else if(type == 'boss')
                monsterID += 5;
            return monsterID;
        },
        getLv(type) {
            let level = this.dungeonInfo[type].level;
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