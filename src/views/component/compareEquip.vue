<template>
    <div class="equip">
        <div class="border">
            <div class="name">属性对比</div>
            <div v-for="(v, k) in diff" :key="k">
                <span v-if="v.change!=0">
                    <span style="width:4.5rem; display:inline-block;">{{v.name}}</span>
                    <span :style="{color:v.change>0?'#f33':'#0f0'}">
                        <span v-if="v.change>0">+</span>{{v.change}}<span v-if="v.isPercent">%</span>
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>
<script>

import {equipConfig} from '@/assets/config/equipConfig'
export default {
    name: "compareEquip",
    mixins: [equipConfig],
    data() {
        return {
            diff: {},
            comparedAttributes: ['HP','MP','ATK','DEF','SUNDER','BLOCK','CRIT','CRITDMG',],
            percent: ['CRIT','CRITDMG']
        };
    },
    mounted() {
        this.$store.globalComponent.compareEquip = this;
    },
    props: {
        equip: {
            type:Object
        },
        equip2: {
            type:Object
        },
    },
    watch: {
        equip() {
            this.compareAttribute();
        },
    },
    methods: {
        compareAttribute() {
            let diff = {};
            this.$store.commit('set_player_attribute', {simulate: true, equip: this.equip});
            let simulate = this.$store.state.playerAttribute.simulatedAttribute;
            let actual = this.$store.state.playerAttribute.attribute;
            for(let index in this.comparedAttributes) {
                let type = this.comparedAttributes[index];
                diff[type] = {
                    name: this.entryInfo[type].name, 
                    value: simulate[type].value,
                    change: simulate[type].value-actual[type].value,
                    isPercent: this.percent.indexOf(type) != -1
                };
            }
            this.diff = diff;
        }
    },

};

</script>
<style lang="scss" scoped>
.equip {
    color: #f1f1f1;
    width: 13rem;
    height: auto;
    padding: 0.16rem;
    box-sizing: border-box;
    text-align: left;
    font-size: 13px;
}           
.border {
    border: 1px solid #ccc;
    background: rgba(31, 31, 31, 0.9);
    border-radius: 0.5rem;
    padding: 1rem;
}
.name {
    text-align: center;
    font-size: 15px;
    padding: 0.25rem 0rem;
}           

</style>   