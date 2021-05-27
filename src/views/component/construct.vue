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
    食堂
    金矿
    林地
    采石场
    矿场
    招募所
-->
<div class="construct">
    <div id="resource">
        金币：{{village.gold}} <br>
        木材：{{village.wood}} <br>
        水晶：{{village.crystal}} <br>
    </div>
    <div id="building">     
        <cTooltip :placement="'bottom'">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build" @click="levelUp('village')">村庄 {{village.village}}</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 提升其他建筑等级上限</p>
                <p class="info">
                    ————消耗————
                    <br>
                    <span :style="{color:village.gold<cost.village.cost.gold?'#f00':''}">金币:{{cost.village.cost.gold}}</span>
                    <br>
                    <span :style="{color:village.wood<cost.village.cost.wood?'#f00':''}">木材:{{cost.village.cost.wood}}</span>
                </p>
            </template>
        </cTooltip>   
        <cTooltip :placement="'bottom'" v-if="village.village>0">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build" @click="levelUp('train')">练功房 {{village.train}}</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 消耗水晶提升能力的场所</p>
                <p class="info">
                    ————消耗————
                    <br>
                    <span :style="{color:village.gold<cost.train.cost.gold?'#f00':''}">金币:{{cost.train.cost.gold}}</span>
                    <br>
                    <span :style="{color:village.wood<cost.train.cost.wood?'#f00':''}">木材:{{cost.train.cost.wood}}</span>
                    <br>
                    <span :style="{color:village.crystal<cost.train.cost.crystal?'#f00':''}">水晶:{{cost.train.cost.crystal}}</span>
                </p>
            </template>
        </cTooltip>
        <cTooltip :placement="'bottom'" v-if="village.train>10">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build" @click="levelUp('train2')">中级练功房 {{village.train2}}</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 消耗水晶提升能力的场所</p>
                <p class="info">
                    ————消耗————
                    <br>
                    <span :style="{color:village.gold<cost.train2.cost.gold?'#f00':''}">金币:{{cost.train2.cost.gold}}</span>
                    <br>
                    <span :style="{color:village.wood<cost.train2.cost.wood?'#f00':''}">木材:{{cost.train2.cost.wood}}</span>
                    <br>
                    <span :style="{color:village.crystal<cost.train2.cost.crystal?'#f00':''}">水晶:{{cost.train2.cost.crystal}}</span>
                </p>
            </template>
        </cTooltip>
        <cTooltip :placement="'bottom'" v-if="village.train2>10">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build" @click="levelUp('train3')">高级练功房 {{village.train3}}</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 消耗水晶提升能力的场所</p>
                <p class="info">
                    ————消耗————
                    <br>
                    <span :style="{color:village.gold<cost.train3.cost.gold?'#f00':''}">金币:{{cost.train3.cost.gold}}</span>
                    <br>
                    <span :style="{color:village.wood<cost.train3.cost.wood?'#f00':''}">木材:{{cost.train3.cost.wood}}</span>
                    <br>
                    <span :style="{color:village.crystal<cost.train3.cost.crystal?'#f00':''}">水晶:{{cost.train3.cost.crystal}}</span>
                </p>
            </template>
        </cTooltip>
        <cTooltip :placement="'bottom'" v-if="village.village>0">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build" @click="levelUp('shop')">商店 {{village.shop}}</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 出售日常用品</p>
                <p class="info">
                    ————消耗————
                    <br>
                    <span :style="{color:village.gold<cost.shop.cost.gold?'#f00':''}">金币:{{cost.shop.cost.gold}}</span>
                    <br>
                    <span :style="{color:village.wood<cost.shop.cost.wood?'#f00':''}">木材:{{cost.shop.cost.wood}}</span>
                </p>
            </template>
        </cTooltip>
        <cTooltip :placement="'bottom'" v-if="village.village>0">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build" @click="levelUp('smith')">铁匠铺 {{village.smith}}</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 提供强化、锻造等服务</p>
                <p class="info">
                    ————消耗————
                    <br>
                    <span :style="{color:village.gold<cost.smith.cost.gold?'#f00':''}">金币:{{cost.smith.cost.gold}}</span>
                    <br>
                    <span :style="{color:village.wood<cost.smith.cost.wood?'#f00':''}">木材:{{cost.smith.cost.wood}}</span>
                </p>
            </template>
        </cTooltip>
    </div>
    <div class="training">
        <div class="trainingProgressbars">
            <countdown :tier="0" :timer="$store.state.timer.trainTimer1" :level="village.train" v-if="village.train>0"></countdown>
            <countdown :tier="1" :timer="$store.state.timer.trainTimer2" :level="village.train2" v-if="village.train2>0"></countdown>
            <countdown :tier="2" :timer="$store.state.timer.trainTimer3" :level="village.train3" v-if="village.train3>0"></countdown>
        </div>
    </div>
</div>
    
</template>
<script>
import {constructConfig} from '@/assets/config/constructConfig'
import cTooltip from '../uiComponent/tooltip';
import countdown from '../uiComponent/countdown';
export default {
    name: "construct",
    mixins: [constructConfig],
    components: {cTooltip, countdown},
    mounted() {
    },
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
        levelUp(type) {
            for(let cost in this.cost[type].cost) {
                if(this.village[cost] < this.cost[type].cost[cost])
                    return;
            }
            if(type != 'village' && this.village['village'] <= this.village[type])
                return;
            for(let cost in this.cost[type].cost) {
                this.village[cost] -= this.cost[type].cost[cost];
            }
            this.village[type] += 1;
            this.getCost(type, this.village[type]+1);

        },
        getCost(type, level) {
            let fib0 = 1, fib1 = 1;
            for(var a=1; a<level; a++) {
                let temp = fib0 + fib1;
                fib0 = fib1;
                fib1 = temp;
            }
            for(let cost in this.cost[type].cost) {
                this.cost[type].cost[cost] = Math.round(this.cost[type].base[cost] * (1+fib1*0.1));
            }
        }
    }
}
</script>
<style lang="scss">
#resource {
    padding: 0.5rem;
    margin: 0.5rem;
    border: 2px solid #ccc;
    height: 100%;
    width: 50rem;
}
#building {
    padding: 0.5rem;
    margin: 0.5rem;
    border: 2px solid #ccc;
    height: 100%;
    width: 50rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    & > div {
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
    }
}
.build {
    height: 3rem;
    width: 10rem;
    font-size: 1rem;
    margin: 0.5rem;
}

.training {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 10rem;
    width: 50rem;
    padding: 0.5rem;
    margin: 0.5rem;
	background-color: #000;
}

.trainingProgressbars {
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	min-width: 270px;
	width: 100%;
	min-height: 100%;
}

</style>