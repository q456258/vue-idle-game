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
                <div class='icon'>
                    <img :src="equip.description.iconSrc" alt="icon">
                </div>
                <div class="lv">
                    装备等级：{{equip.lv}}
                </div>
            </div>
            <div class="description">
                <div class="type">
                    装备分类：{{equip.description.type}}
                </div>
                <div class="baseEntry">
                    <div v-for="v in equip.baseEntry" :key="v.id">
                        <!-- <div>{{v.name}} : {{v.showVal}}</div> -->
                        <div>
                            <span :style="{color:equip.enhanceLv>0?'#ABF6F4':'#fff'}">{{v.name}} : {{v.showVal}}</span> 
                            <span v-if="equip.enhanceLv>0">&nbsp;({{v.base}}&nbsp;
                                <span style="color:#ABF6F4">+{{v.value-v.base}}</span>)
                            </span>
                        </div>
                    </div>
                </div>
                <div class="extraEntry" v-if="equip.extraEntry">
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
                            (+{{v.requirement}}) {{v.name}} : {{v.showVal}}
                            <span v-if="v.requirement>equip.enhanceLv"> (未激活)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="desc">
                {{equip.description.desc}}
            </div>
        </div>
    </div>
</template>
<script>
import {equipConfig} from '@/assets/config/equipConfig'
export default {
    name: "equipInfo",
    mixins: [equipConfig],
    data() {
        return {
            newEquip: {},
            qualityProbability: [0.25, 0.65, 0.9, 0.99, 0.999, 1],
            typeName: ['helmet', 'necklace', 'weapon', 'armor', 'shoe', 'ring']
        };
    },
    props: {
        equip: {
            type:Object
        }
    },
    methods: {
        createEquip(qualityIndex, lv, type, bonus) {
            var newEquip = {};
            newEquip.itemType = type != 'random' ? type : this.createType();
            newEquip.lv = lv || 1;
            newEquip.quality = qualityIndex > -1 ? this.quality[qualityIndex] : this.createQuality(bonus);
            newEquip.maxEnhanceLv = (newEquip.quality.extraEntryNum-1)*5;
            newEquip.enhanceLv = Math.min(0, newEquip.maxEnhanceLv);
            newEquip.baseEntry = this.createBaseEntry(newEquip);
            newEquip.extraEntry = this.createExtraEntry(newEquip);
            newEquip.potential = this.createPotential(newEquip);
            return JSON.stringify(newEquip);
        },
        createLv(Max) {
            return parseInt(Math.random() * (Max || 39)) + 1;
        },
        createType() {
            var random = Math.floor(Math.random()*6)
            return this.typeName[random];
        },
        createQuality(bonus) {
            var random = Math.round(Math.random()*1000)/1000;
            var quality = 0;
            for(var i=0; i<this.qualityProbability.length; i++) {
                if(random <= this.qualityProbability[i]) {
                    quality = i;
                    break;
                }
            }
            quality += bonus;
            if(quality > 5)
                return this.quality[5];
            return this.quality[quality];
        },
        createBaseEntry(newEquip) {
            var baseEntry = [];
            var type = newEquip.itemType;
            var index = Math.floor(Math.random()*this[type].type.length);
            var percent = [
                'CRIT','CRITDMG','ATKP','DEFP','APP','MRP','HPP','MPP'
            ];
            newEquip.description = this[type].type[index].description;
            newEquip.description.type = this.type[newEquip.itemType];

            this[type].baseEntry.forEach(entry => {
                baseEntry.push({type: entry});
            });
            this[type].type[index].entry.forEach(entry => {
                baseEntry.push({type: entry});
            });

            index = Math.floor(Math.random()*this.entries.length);
            baseEntry.push({type: this.entries[index]});
            baseEntry.forEach(entry => {
                entry.name = this.entryInfo[entry.type].name;
                if(percent.indexOf(entry.type) > -1) {
                    entry.base = Math.floor(newEquip.quality.qualityCoefficient * this.entryInfo[entry.type].base);
                    entry.value = Math.floor(entry.base * (1+newEquip.enhanceLv*0.1));
                    entry.showVal = '+' + entry.value + '%';
                }
                else {
                    entry.base = Math.floor(newEquip.quality.qualityCoefficient * this.entryInfo[entry.type].base * (1+newEquip.lv**2*0.10) * (1+Math.random()/5));
                    entry.value = Math.floor(entry.base * (1+newEquip.enhanceLv*0.1));
                    entry.showVal = '+' + entry.value;
                }
            });
            return baseEntry;
        },
        createExtraEntry(newEquip) {
            var extraEntry = [];
            var extraEntryTypes = [];
            var type = newEquip.itemType;
            var percent = [
                'STRP','AGIP','INTP','ALLP','CRIT','CRITDMG','ATKP','DEFP','APP','MRP','HPP','MPP'
            ];
            extraEntryTypes = this[type].extraEntry;
            for(var i=0; i<newEquip.quality.extraEntryNum; i++) {
                var index = Math.floor(Math.random()*extraEntryTypes.length);
                extraEntry.push({type: extraEntryTypes[index]});
            }
            extraEntry.forEach(entry => {
                let random = Math.random();
                if(percent.indexOf(entry.type) > -1) {
                    entry.value = Math.round((0.5+random) * this.entryInfo[entry.type].base);
                    entry.showVal = '+' + entry.value + '%';
                }
                else {
                    entry.value = Math.round((0.5+random) * this.entryInfo[entry.type].base * (1+newEquip.lv**2*0.10));
                    entry.showVal = '+' + entry.value;
                }
                entry.quality = Math.round(random*100);
                this.determineQuality(entry);
                entry.name = this.entryInfo[entry.type].name;
            })
            return extraEntry;
        },
        createPotential(newEquip) {
            var extraEntry = [
                'STR','AGI','INT', 'ALL', 'CRIT','CRITDMG','ATK', 'DEF', 'AP', 'MR', 'HP', 'MP', 
                'STRP','AGIP','INTP','ALLP','ATKP','APP', 'MRP','DEFP','HPP','MPP',
            ];
            var percent = [
                'STRP','AGIP','INTP','ALLP','CRIT','CRITDMG','ATKP','DEFP','APP','MRP','HPP','MPP'
            ];
            var potentials = [];
            for(var i=0; i<3; i++) {
                if(newEquip.maxEnhanceLv < (i+1)*3)
                    break;
                var index = Math.floor(Math.random()*extraEntry.length);
                let entry = this.entryInfo[extraEntry[index]];
                let value = Math.random()>0.5 ? entry.base*1 : entry.base*1.5;
                
                if(percent.indexOf(extraEntry[index]) == -1)
                    value = value * (1+newEquip.lv**2*0.10);
                value = Math.round(value);

                potentials.push({
                    type: extraEntry[index],
                    value: value,
                    showVal: percent.indexOf(extraEntry[index]) > -1 ? "+"+value+"%": "+"+value,
                    name: entry.name,
                    requirement: (i+1)*3,
                    active: newEquip.enhanceLv>=(i+1)*3 ? true : false
                });
            }
            return potentials;
        },
        recomputeBaseEntryValue(equip) {
            var baseEntry = equip.baseEntry;
            var percent = [
                'STRP','AGIP','INTP','ALLP','CRIT','CRITDMG','ATKP','DEFP','APP','MRP','HPP','MPP'
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
        },
        activePotential(equip) {
            var potentials = equip.potential;
            potentials.forEach(potential => {
                potential.active = equip.enhanceLv>=potential.requirement ? true : false
            });
        },
        forgeEntry(equip, key) {
            var extraEntry = [];
            var extraEntryTypes = [];
            var type = equip.itemType;
            var percent = [
                'STRP','AGIP','INTP','ALLP','CRIT','CRITDMG','ATKP','DEFP','APP','MRP','HPP','MPP'
            ];
            extraEntryTypes = this[type].extraEntry;
            var index = Math.floor(Math.random()*extraEntryTypes.length);
            extraEntry.push({type: extraEntryTypes[index]});
            extraEntry.forEach(entry => {
                let random = Math.random();
                if(percent.indexOf(entry.type) > -1) {
                    entry.value = Math.round((0.5+random) * this.entryInfo[entry.type].base);
                    entry.showVal = '+' + entry.value + '%';
                }
                else {
                    entry.value = Math.round((0.5+random) * this.entryInfo[entry.type].base * (1+equip.lv**2*0.10));
                    entry.showVal = '+' + entry.value;
                }
                entry.quality = Math.round(random*100);
                this.determineQuality(entry);
                entry.name = this.entryInfo[entry.type].name;
            })
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
}

</style>   