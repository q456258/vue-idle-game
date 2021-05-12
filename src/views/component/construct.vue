<template>
<!--
材料：
    金币
    木材
    石材
    铁矿
建筑：
    村庄
    练功房
    商店
    铁匠铺

    钱庄
    金矿
    林地
    采石场
    矿场
    招募所
-->
<div class="construct">
    <div id="resource">
    木材：{{village.wood}}
    </div>
    <div id="building">     
        <cTooltip :placement="'bottom'">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build">村庄</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 背包</p>
            </template>
        </cTooltip>   
        <cTooltip :placement="'bottom'">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build">练功房</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 背包</p>
            </template>
        </cTooltip>
        <cTooltip :placement="'bottom'">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build">商店</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 背包</p>
            </template>
        </cTooltip>
        <cTooltip :placement="'bottom'">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build">铁匠铺</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 背包</p>
            </template>
        </cTooltip>
    </div>
</div>
    
</template>
<script>
import cTooltip from '../uiComponent/tooltip';
export default {
    name: "construct",
    components: {cTooltip},
    data() {
        return {
        };
    },
    props: {
    },
    computed: {
        village() {return this.$store.state.villageAttribute;}
    },
    methods: {      

    }
}
</script>
<style lang="scss">
#resource {
    padding: 0.5rem;
    margin: 0.5rem;
    border: 2px solid #ccc;
    height: 5rem;
    width: 50rem;
}
#building {
    padding: 0.5rem;
    margin: 0.5rem;
    border: 2px solid #ccc;
    height: 5rem;
    width: 50rem;
    display: flex;
    flex-direction: row;

}
.build {
    height: 3rem;
    width: 10rem;
    font-size: 1rem;
    margin: 0.5rem;
}
</style>