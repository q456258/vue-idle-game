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
                    <span :style="{color:village.gold<cost.village.gold?'#f00':''}">金币:{{cost.village.gold}}</span>
                    <br>
                    <span :style="{color:village.wood<cost.village.wood?'#f00':''}">木材:{{cost.village.wood}}</span>
                </p>
            </template>
        </cTooltip>   
        <cTooltip :placement="'bottom'">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build" @click="levelUp('train')">练功房</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 每分钟消耗一个水晶</p>
                <p class="info">
                    ————消耗————
                    <br>
                    <span :style="{color:village.gold<cost.train.gold?'#f00':''}">金币:{{cost.train.gold}}</span>
                    <br>
                    <span :style="{color:village.wood<cost.train.wood?'#f00':''}">木材:{{cost.train.wood}}</span>
                </p>
            </template>
        </cTooltip>
        <cTooltip :placement="'bottom'">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build" @click="levelUp('shop')">商店</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 出售日常用品</p>
                <p class="info">
                    ————消耗————
                    <br>
                    <span :style="{color:village.gold<cost.shop.gold?'#f00':''}">金币:{{cost.shop.gold}}</span>
                    <br>
                    <span :style="{color:village.wood<cost.shop.wood?'#f00':''}">木材:{{cost.shop.wood}}</span>
                </p>
            </template>
        </cTooltip>
        <cTooltip :placement="'bottom'">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build" @click="levelUp('smith')">铁匠铺</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 提供强化、锻造等服务</p>
                <p class="info">
                    ————消耗————
                    <br>
                    <span :style="{color:village.gold<cost.smith.gold?'#f00':''}">金币:{{cost.smith.gold}}</span>
                    <br>
                    <span :style="{color:village.wood<cost.smith.wood?'#f00':''}">木材:{{cost.smith.wood}}</span>
                </p>
            </template>
        </cTooltip>
    </div>
    <div class="training">
        <div class="trainingProgressbars">
            <countdown :tier="0" :timer="$store.state.timer.trainTimer1"></countdown>
            <countdown :tier="1" :timer="$store.state.timer.trainTimer2"></countdown>
            <countdown :tier="2" :timer="$store.state.timer.trainTimer3"></countdown>
        </div>
    </div>
</div>
    
</template>
<script>
import cTooltip from '../uiComponent/tooltip';
import countdown from '../uiComponent/countdown';
export default {
    name: "construct",
    components: {cTooltip, countdown},
    mounted() {
    },
    data() {
        return {
            cost: {
                village: {
                    gold: 100,
                    wood: 10
                },
                train: {
                    gold: 100,
                    wood: 10
                },
                shop: {
                    gold: 100,
                    wood: 10
                },
                smith: {
                    gold: 100,
                    wood: 10
                },
            },
            require: {
                train: {
                    village: 1
                },
                shop: {
                    village: 1
                },
                smith: {
                    village: 1
                },
            }
        };
    },
    props: {
    },
    computed: {
        village() {return this.$store.state.villageAttribute;}
    },
    methods: {      
        levelUp(type) {
            for(let cost in this.cost[type]) {
                if(this.village[cost] < this.cost[type][cost])
                    return;
            }
            for(let req in this.require[type]) {
                if(this.village[req] < this.require[type][req])
                    return;
            }
            for(let cost in this.cost[type]) {
                this.village[cost] -= this.cost[type][cost];
            }
            this.village[type] += 1;

        },
        getCost(type, level) {

        },
        getReq(type, level) {

        }
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