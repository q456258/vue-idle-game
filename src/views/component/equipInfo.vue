<template>
    <div class="equip" v-if="equip.quality">
        <div class="border">
            <div class="enhance">
                <span v-for="n in equip.maxEnhanceLv" :key="n">
                    <img v-if="equip.enhanceLv>=n" src="../../assets/icons/star.png" alt="icon" style="height: 10px; width: 10px;">
                    <img v-if="equip.enhanceLv<n" src="../../assets/icons/greystar.png" alt="icon" style="height: 9px; width: 9px;">
                    <span v-if="n==15 & equip.maxEnhanceLv>15"><br>&nbsp;&nbsp;</span>
                    <span v-if="n==5 | n==10 | n==20">&nbsp;</span>
                </span>
            </div>
            <div class="name" :style="{color:equip.quality.color}">
            {{ equip.description.name }}
            </div>
            <div class="quality" :style="{color:equip.quality.color}">
            {{ equip.quality.name }}
            </div>
            <div class="title">
                <div class="largeIconContainer">
                    <del :class="[{grey:equip.quality.qualityLv==1, green:equip.quality.qualityLv==3, blue:equip.quality.qualityLv==4, purple:equip.quality.qualityLv==5, orange:equip.quality.qualityLv==6}, 'largeIcon iconBorder']"></del>
                    <img :src="equip.description.iconSrc" alt="" />
                </div>
                <!-- <div class='icon'>
                    <img :src="equip.description.iconSrc" alt="icon">
                </div> -->
                <div class="lv">
                    <span v-if="equip.lv==equip.lvReq">
                        <div :style="{color: player.lv<equip.lvReq? '#f00':''}">等级要求: {{equip.lvReq}}</div>
                    </span>
                    <span v-else>
                        物品等级: {{equip.lv}}
                        <br>
                        <div :style="{color: player.lv<equip.lvReq? '#f00':''}">等级要求: {{equip.lvReq}}</div>
                    </span>
                </div>
            </div>
            <div class="description">
                <div class="type">
                    装备分类: {{equip.description.type}}
                </div>
                <div class="baseEntry">
                    <div v-for="v in equip.baseEntry" :key="v.id">
                        <!-- <div>{{v.name}} : {{v.showVal}}</div> -->
                        <div>
                            <span :style="{color:equip.enhanceLv>0?'#ABF6F4':'#fff'}">{{v.showVal}} {{v.name}}</span> 
                            <!-- <span v-if="equip.enhanceLv>0" style="color:#FFFFFF">&nbsp;({{v.base}}&nbsp;
                                <span style="color:#ABF6F4">+{{v.value-v.base}}</span>)
                            </span> -->
                        </div>
                    </div>
                    <div v-for="v in equip.extraBaseEntry" :key="v.id">
                        <div>
                            <span style="color:#00ff00;">{{v.showVal}} {{v.name}}</span> 
                        </div>
                    </div>
                </div>
                <div class="extraEntry" v-if="equip.extraEntry.length > 0">
                    <div v-for="v in equip.extraEntry" :key="v.id">
                        <!-- <div>{{v.name}} : {{v.showVal}}</div> -->
                        <div>{{v.name}} : {{v.showVal}}</div>
                    </div>
                </div>
                <div class="potential" v-if="equip.potential.length > 0">
                    <div style="color: #bb00ff">
                        潜在属性
                    </div>
                    <div v-for="v in equip.potential" :key="v.id">
                        <!-- <div>{{v.name}} : {{v.showVal}}</div> -->
                        <div :style="{color:v.requirement>equip.enhanceLv?'#A1A1A1':''}">
                            (+{{v.requirement}}) {{v.name}} {{v.showVal}}
                            <span v-if="v.requirement>equip.enhanceLv"> (未激活)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="desc">
                {{equip.description.desc}}
            </div>
            <div class="equipRating" v-if="equip.rating">
                评分: {{equip.rating}}
            </div>
        </div>
    </div>
</template>
<script>
import {equipConfig} from '@/assets/config/equipConfig'
import { assist } from '../../assets/js/assist';
import {itemConfig} from '@/assets/config/itemConfig'
export default {
    name: "equipInfo",
    mixins: [equipConfig, itemConfig, assist],
    data() {
        return {
            newEquip: {},
            qualityProbability: [
                [0.75, 1, 1, 1, 1, 1], //0(1-10)
                [0.55, 0.85, 1, 1, 1, 1], //1普通(11-30)，精英（1-10）
                [0.45, 0.78, 0.98, 1, 1, 1], //2普通(30+)
                [0.25, 0.65, 0.95, 1, 1, 1], //3精英(11-30)
                [0.19, 0.49, 0.84, 0.99, 1, 1], //4精英(30+)，boss（10）
                [0.25, 0.6, 0.94, 0.99, 0.9995, 1], //5宝箱
                [0.1, 0.25, 0.57, 0.92, 0.995, 1], //6BOSS（20+）
                [0.1, 0.25, 0.55, 0.85, 0.99, 1], //7
                [0.05, 0.15, 0.35, 0.75, 0.95, 1], //8
                [0, 0, 0.15, 0.55, 0.9, 1], //9
                [1, 1, 1, 1, 1, 1], //10小鸡
            ],
            typeName: ['helmet', 'weapon', 'armor', 'shoe', 'shoulder', 'glove', 'ring', 'cape', 'bracer', 'belt', 'legging', 'necklace'],
            percent: [
                'STRP','AGIP','INTP','ALLP','CRIT','CRITDMG','ATKP','DEFP','MRP','HPP','MPP'
            ],
        };
    },
    props: {
        equip: {
            type:Object
        }
    },
    computed: {
        player() { return this.$store.state.playerAttribute },
    },
    methods: {
        createEquip(qualityIndex, lv, type, qualitySet) {
            let newEquip = {};
            newEquip.itemType = type != 'random' ? type : this.createType();
            newEquip.lvReq = lv || 1;
            newEquip.lv = lv || 1;
            newEquip.quality = qualityIndex > -1 ? this.quality[qualityIndex] : this.createQuality(qualitySet);
            newEquip.maxEnhanceLv = (newEquip.quality.qualityLv-1)*5;
            newEquip.enhanceLv = Math.min(0, newEquip.maxEnhanceLv);
            newEquip.baseEntry = this.createBaseEntry(newEquip);
            newEquip.extraBaseEntry = [];
            newEquip.extraEntry = this.createExtraEntry(newEquip);
            newEquip.potential = newEquip.lv >= 30 ? this.createPotential(newEquip) : [];
            newEquip.rating = this.rating(newEquip);
            return JSON.stringify(newEquip);
        },
        createUniqueEquipTemplate(name) {
            let template = this.unique[name];
            let newEquip = {};
            let baseEntry = [];
            newEquip.itemType = template.itemType;
            newEquip.lvReq = template.lvReq || template.lv || 1;
            newEquip.lv = template.lv || 1;
            newEquip.quality = template.qualityIndex > -1 ? this.quality[template.qualityIndex] : this.createQuality(qualitySet);
            newEquip.maxEnhanceLv = (newEquip.quality.qualityLv-1)*5;
            newEquip.enhanceLv = Math.min(template.enhanceLv || 0, newEquip.maxEnhanceLv);
            for(let i=0; i<template.baseEntry.length; i++)
                baseEntry.push({type:template.baseEntry[i]});
            newEquip.baseEntry = this.createBaseEntry(newEquip, baseEntry);
            newEquip.extraBaseEntry = [];
            newEquip.extraEntry = [];
            newEquip.potential = [];
            newEquip.description = this.$deepCopy(this.unique[name].description);
            newEquip.description.type = this.type[newEquip.itemType];
            return JSON.stringify(newEquip);
        },
        finishUniqueEquip(equip) {
            equip.extraBaseEntry = [];
            equip.extraEntry = this.createExtraEntry(equip);
            equip.potential = equip.lv >= 30 ? this.createPotential(equip) : [];
            equip.rating = this.rating(equip);
            return JSON.stringify(equip);
        },
        // createLv(Max) {
        //     return parseInt(Math.random() * (Max || 39)) + 1;
        // },
        createType() {
            let random = Math.floor(Math.random()*this.typeName.length)
            return this.typeName[random];
        },
        createQuality(qualitySet) {
            let random = Math.round(Math.random()*1000)/1000;
            let quality = 0;
            for(let i=0; i<this.qualityProbability[qualitySet].length; i++) {
                if(random <= this.qualityProbability[qualitySet][i]) {
                    quality = i;
                    break;
                }
            }
            return this.quality[quality];
        },
        createBaseEntry(newEquip, baseEntry=[]) {
            let fixEntry = [];
            let type = newEquip.itemType;
            let mod = this.equipMod[type];
            let index = 0;
            if(baseEntry.length == 0) {
                let options = ['STR','AGI','INT','STA','SPI'];
                let count = Math.random()>0.5 ? 1 : 2;
                let ran = Math.floor(Math.random()*options.length);
                baseEntry.push({type:options[ran]});
                if(count == 2) {
                    options[ran] = options[options.length-1];
                    options.pop();
                    ran = Math.floor(Math.random()*options.length);
                    baseEntry.push({type:options[ran]});
                }
            }
            for(let i in this[type].fixEntry) {
                if(type == 'weapon' && (baseEntry[0].type == 'INT' || baseEntry[0].type == 'SPI'))
                    fixEntry.push({type:'AP'});
                else
                    fixEntry.push({type: this[type].fixEntry[i]});
            }

            this.createBaseEntryValue(newEquip.quality.qualityCoefficient, fixEntry, 0, newEquip.lv, newEquip.enhanceLv, mod);
            let bonus = newEquip.quality.qualityLv != 3 ? 1 : Math.round(1+(newEquip.quality.qualityCoefficient * mod * (1.6+newEquip.lv*0.08)));
            this.createBaseEntryValue(newEquip.quality.qualityCoefficient, baseEntry, bonus, newEquip.lv, newEquip.enhanceLv, mod);

            index = Math.min(newEquip.quality.qualityLv-1, this[type].type[baseEntry[0].type].length-1);
            newEquip.description = this.$deepCopy(this[type].type[baseEntry[0].type][index]);
            newEquip.description.type = this.type[newEquip.itemType];
            
            return fixEntry.concat(baseEntry);
        },
        createBaseEntryValue(qualityCoefficient, entry, bonus, lv, enhanceLv, mod=1) {
            for(let i=0; i<entry.length; i++) {
                let type = entry[i].type;
                let ran = Math.round(Math.random()*bonus);
                let base = qualityCoefficient * this.entryInfo[type].base * mod * (1.6+lv*0.08);
                if(entry.length > 1)
                    entry[i].base = Math.round(Math.pow(Math.pow(base, 1.5)/2, 0.66))+ran;
                else
                    entry[i].base = Math.ceil(base)+ran;
                entry[i].value = Math.ceil(entry[i].base * (1+enhanceLv*0.1));
                entry[i].showVal = '+' + entry[i].value;
                entry[i].name = this.entryInfo[type].name;
            }
        },
        createExtraEntry(newEquip) {
            let extraEntry = [];
            let extraEntryTypes = [];
            let type = newEquip.itemType;
            let mod = this.equipMod[type];
            extraEntryTypes = this[type].extraEntry;
            for(let i=0; i<newEquip.quality.extraEntryNum; i++) {
                let index = Math.floor(Math.random()*extraEntryTypes.length);
                extraEntry.push({type: extraEntryTypes[index]});
            }
            extraEntry.forEach(entry => {
                let random = Math.random();
                this.createExtraEntryValue(entry, random, newEquip.lv, mod);
            });
            return extraEntry;
        },
        createExtraEntryValue(entry, random, lv, mod=1) {
            if(entry.type == 'CRITDMG' || entry.type == 'APCRITDMG') {
                entry.value = Math.round((0.5+0.5*random) * this.entryInfo[entry.type].base);
                entry.showVal = '+' + entry.value + '%';
            } else {
                entry.value = Math.round((0.5+0.5*random) * this.entryInfo[entry.type].base * mod * (1.6+lv*0.08));
                entry.showVal = '+' + entry.value;
            }
            entry.quality = Math.round(random*100);
            this.determineQuality(entry);
            entry.name = this.entryInfo[entry.type].name;
        },
        createPotential(newEquip) {
            let extraEntry = [
                'STR','AGI','INT', 'ALL', 'CRIT','CRITDMG','ATK', 'DEF', 'BLOCK', 'HP', 'MP', 
                'STRP','AGIP','INTP','ALLP','ATKP', 'BLOCKP','DEFP','HPP','MPP',
                // 'STR','AGI','INT','STA','SPI','ALL','CRIT','CRITDMG','ATK','DEF','DEFRED','BLOCK','AP','APCRIT','APPEN','MR','HASTE','HEAL','VERS','VERSBONUS','HP','MP',
                // 'STRP','AGIP','INTP','STAP','SPIP','ALLP','ATKP','DEFP','BLOCKP','APP','APPENP','MRP','HPP','MPP',
            ];
            let percent = [
                'STRP','AGIP','INTP','ALLP','CRIT','CRITDMG','ATKP','DEFP','BLOCKP','HPP','MPP'
            ];
            let potentials = [];
            for(let i=0; i<3; i++) {
                if(newEquip.maxEnhanceLv < (i+1)*3)
                    break;
                let index = Math.floor(Math.random()*extraEntry.length);
                let entry = this.entryInfo[extraEntry[index]];
                let ran = Math.random();
                let value = ran>0.5 ? entry.base*1 : entry.base*1.5;
                
                if(extraEntry[index] == 'CRITDMG') {
                    value = Math.floor(entry.base+newEquip.lv*newEquip.lv/200);
                    value = ran>0.5 ? value*1 : value*1.5;
                }
                if(percent.indexOf(extraEntry[index]) == -1)
                    value = value * (0.6+newEquip.lv*0.4);
                value = Math.round(value);

                potentials.push({
                    type: extraEntry[index],
                    value: value,
                    showVal: percent.indexOf(extraEntry[index]) > -1 ? "+"+value+"%": "+"+value,
                    name: entry.name,
                    requirement: (i+1)*3,
                    quality: ran>0.5 ? 0 : 1,
                    active: newEquip.enhanceLv>=(i+1)*3 ? true : false
                });
            }
            return potentials;
        },
        enhanceBaseEntryValue(equip) {
            let baseEntry = equip.baseEntry;
            let percent = [
                'STRP','AGIP','INTP','ALLP','CRIT','CRITDMG','ATKP','DEFP','MRP','HPP','MPP'
            ];

            baseEntry.forEach(entry => {
                if(percent.indexOf(entry.type) > -1) {
                    entry.value = Math.floor(entry.base * (1+equip.enhanceLv*0.1));
                    entry.showVal = '+' + entry.value + '%';
                }
                else {
                    entry.value = Math.floor(entry.base * (1+equip.enhanceLv*0.1));
                    entry.showVal = '+' + entry.value;
                }
            });
            equip.rating = this.rating(equip);
        },
        activePotential(equip) {
            let potentials = equip.potential;
            potentials.forEach(potential => {
                potential.active = equip.enhanceLv>=potential.requirement ? true : false
            });
            equip.rating = this.rating(equip);
        },
        forgeEntry(equip, key) {
            let extraEntry = [];
            let extraEntryTypes = [];
            let type = equip.itemType;
            let percent = [
                'STRP','AGIP','INTP','ALLP','CRIT','CRITDMG','ATKP','DEFP','MRP','HPP','MPP'
            ];
            extraEntryTypes = this[type].extraEntry;
            let index = Math.floor(Math.random()*extraEntryTypes.length);
            extraEntry.push({type: extraEntryTypes[index]});
            extraEntry.forEach(entry => {
                let random = Math.random();
                if(entry.type == 'CRITDMG') {
                    entry.value = Math.round((0.5+0.5*random) * Math.floor(this.entryInfo[entry.type].base+equip.lv*equip.lv/200));
                    entry.showVal = '+' + entry.value + '%';
                }
                else if(percent.indexOf(entry.type) > -1) {
                    entry.value = Math.round((0.5+0.5*random) * this.entryInfo[entry.type].base);
                    entry.showVal = '+' + entry.value + '%';
                }
                else {
                    entry.value = Math.round((0.5+0.5*random) * this.entryInfo[entry.type].base * (0.6+equip.lv*0.4));
                    entry.showVal = '+' + entry.value;
                }
                entry.quality = Math.round(random*100);
                this.determineQuality(entry);
                entry.name = this.entryInfo[entry.type].name;
            })

            equip.rating = this.rating(equip);
            this.$set(equip.extraEntry, key, extraEntry[0]);
        },
        forgeAll(equip) {
            equip.extraEntry = this.createExtraEntry(equip);
        },
        determineQuality(entry) {
            if(entry.quality<=25)
                entry.qualityLv = 'E'
            else if(entry.quality>25&entry.quality<=50)
                entry.qualityLv = 'D'
            else if(entry.quality>50&entry.quality<=75)
                entry.qualityLv = 'C'
            else if(entry.quality>75&entry.quality<=90)
                entry.qualityLv = 'B'
            else if(entry.quality>90&entry.quality<=98)
                entry.qualityLv = 'A'
            else if(entry.quality>98&entry.quality<=100)
                entry.qualityLv = 'S'
        },
        levelUpEquip(equip) {
            let dust = ['dust2', 'dust3', 'dust4', 'dust5', 'dust6'];
            let itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            let quantity = Math.ceil(equip.lv/10);
            let itemCode = dust[equip.quality.qualityLv-2];
            let item = itemInfo.findItem(itemCode);  
            let has = itemInfo.getItemQty(itemCode);
            let mod = this.equipMod[newEquip.itemType];
            if(has < quantity) {
                this.$store.commit("set_sys_info", {
                    type: 'dmged',
                    msg: '材料不足, 无法升级装备! '
                });
                return;
            }
            itemInfo.removeItemByItem(item, quantity);
            equip.lv = parseInt(equip.lv)+1;
            equip.baseEntry.forEach(entry => {
                // let percent = (entry.base/(this.entryInfo[entry.type].base*(1+(equip.lv-1)**2*0.05))-1)*5;
                // 主属性部分好像需要调整一下, fix不应该加, 正常的需要加
                this.createBaseEntryValue(equip.quality.qualityCoefficient, entry, 0, equip.lv, equip.enhanceLv, mod);
            });
            equip.extraEntry.forEach(entry => {
                this.createExtraEntryValue(entry, entry.quality/100, equip.lv, mod);
            });
            equip.rating = this.rating(equip);
            this.$store.commit('set_player_attribute');
        },
        // 主属性固定了, 没百分比浮动
        // refine(equip, equip2) {
        //     let mod = this.equipMod[newEquip.itemType];
        //     for(let i=0; i<equip.baseEntry.length; i++) {
        //         let percent = (equip.baseEntry[i].base/(this.entryInfo[equip.baseEntry[i].type].base*(1+(equip.lv)**2*0.05))-1)*5;
        //         let percent2 = (equip2.baseEntry[i].base/(this.entryInfo[equip2.baseEntry[i].type].base*(1+(equip2.lv)**2*0.05))-1)*5;
        //         percent = percent>percent2 ? percent : percent2;
        //         this.createBaseEntryValue(equip.quality.qualityCoefficient, equip.baseEntry[i], percent, equip.lv, equip.enhanceLv, mod);
        //     }
        // },
        melt(equip, equip2) {
            this.$set(equip.potential, 0, equip2.potential[0]);
            this.$set(equip.potential, 1, equip2.potential[1]);
            this.$set(equip.potential, 2, equip2.potential[2]);
        },
        rating(equip) {
            let rating = 0;
            let lines = [].concat(equip.baseEntry, equip.extraBaseEntry, equip.extraEntry);
            // 基础属性、额外基础属性、额外属性
            for(let i=0; i<lines.length; i++) {
                rating += (1/this.entryInfo[lines[i].type].base) * lines[i].value;
            }
            // 潜能
            for(let i=0; i<equip.potential.length; i++) {
                if((i<3 && equip.enhanceLv >= (i+1)*3) || (i>=3 && equip.enhanceLv >= i*5)) {
                    rating += (1/this.entryInfo[equip.potential[i].type].base) * equip.potential[i].value;
                }
            }
            return Math.round(rating*10);
        }
    },

};

</script>
<style lang="scss" scoped>
.equip {
    color: #f1f1f1;
    width: 17rem;
    height: auto;
    padding: 0.16rem;
    box-sizing: border-box;
}           
.border {
    border: 1px solid #ccc;
    background: rgba(31, 31, 31, 0.8);
    border-radius: 0.5rem;
}
.name {
    font-size: 15px;
    padding: 0.25rem 0rem;
}           
.quality {
    font-size: 10px;
}         
.title {
    padding: 0.05rem;
    width: 100%;
    height: 4rem;
    display: flex;
    .icon {
        width: 4rem;
        height: 4rem;
        background-color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 1rem;
        border-radius: 0.3rem;
    }
    .lv {
        margin-left: 0.5rem;
        display: flex;
        flex-direction: column;
        align-self: flex-end;
        font-size: 0.75rem;
    }
}
.description {
    font-size: 12px;
    margin: 0.5rem 1rem;
    padding: 0.5rem 0rem;
    border-top: 1px solid #777;
    text-align: left;
    .type {
        padding-bottom: 0.5rem;
    }
    .baseEntry {
        padding-bottom: 0.5rem;
        text-align: left;
    }
    .extraEntry {
        color: #ABF6F4;
        border-top: 1px dotted #777;
        padding: 0.5rem 0rem;
        text-align: left;
    }
    .potential {
        padding: 0.5rem 0rem;
        border-top: 1px dotted #777;
    }
}
.desc {
    color: #777;
    padding-bottom: 0.5rem;
    margin: 0rem 1rem;
    text-align: left;
    font-size: 12px;
}
.equipRating {
    color: rgb(255, 255, 255);
    padding-bottom: 0.5rem;
    margin: 0rem 1rem;
    text-align: right;
    font-size: 10px;
}
.largeIconContainer {
    left: 7px;
    top: -7px;
    margin: initial;
}
</style>   