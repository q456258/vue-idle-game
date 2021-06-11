<template>
<!--
材料：
    金币
    木材
    石材
    铁矿
建筑：
    公会
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
<div class="guild">
    <div id="resource">
        金币：{{guild.gold}} <br>
        水晶：{{guild.crystal}} <br>
    </div>
    <div id="building">     
        <cTooltip :placement="'bottom'">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build" @click="levelUp('guild')">公会 {{guild.guild}}</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 提升其他建筑等级上限</p>
                <p class="info">
                    ————消耗————
                    <br>
                    <span :style="{color:guild.gold<cost.guild.cost.gold?'#f00':''}">金币:{{cost.guild.cost.gold}}</span>
                </p>
            </template>
        </cTooltip>   
        <cTooltip :placement="'bottom'" v-if="guild.guild>0">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build" @click="levelUp('train')">练功房 {{guild.train}}</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 消耗水晶提升能力的场所</p>
                <p class="info">
                    ————消耗————
                    <br>
                    <span :style="{color:guild.gold<cost.train.cost.gold?'#f00':''}">金币:{{cost.train.cost.gold}}</span>
                    <br>
                    <span :style="{color:guild.crystal<cost.train.cost.crystal?'#f00':''}">水晶:{{cost.train.cost.crystal}}</span>
                </p>
            </template>
        </cTooltip>
        <cTooltip :placement="'bottom'" v-if="guild.train>15">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build" @click="levelUp('train2')">中级练功房 {{guild.train2}}</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 消耗水晶提升能力的场所</p>
                <p class="info">
                    ————消耗————
                    <br>
                    <span :style="{color:guild.gold<cost.train2.cost.gold?'#f00':''}">金币:{{cost.train2.cost.gold}}</span>
                    <br>
                    <span :style="{color:guild.crystal<cost.train2.cost.crystal?'#f00':''}">水晶:{{cost.train2.cost.crystal}}</span>
                </p>
            </template>
        </cTooltip>
        <cTooltip :placement="'bottom'" v-if="guild.train2>15">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build" @click="levelUp('train3')">高级练功房 {{guild.train3}}</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 消耗水晶提升能力的场所</p>
                <p class="info">
                    ————消耗————
                    <br>
                    <span :style="{color:guild.gold<cost.train3.cost.gold?'#f00':''}">金币:{{cost.train3.cost.gold}}</span>
                    <br>
                    <span :style="{color:guild.crystal<cost.train3.cost.crystal?'#f00':''}">水晶:{{cost.train3.cost.crystal}}</span>
                </p>
            </template>
        </cTooltip>
        <cTooltip :placement="'bottom'" v-if="guild.guild>0">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build" @click="levelUp('shop')">商店 {{guild.shop}}</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 出售日常用品</p>
                <p class="info">
                    ————消耗————
                    <br>
                    <span :style="{color:guild.gold<cost.shop.cost.gold?'#f00':''}">金币:{{cost.shop.cost.gold}}</span>
                </p>
            </template>
        </cTooltip>
        <cTooltip :placement="'bottom'" v-if="guild.guild>0">
            <template v-slot:content>
                <button class="btn btn-outline-light btn-sm build" @click="levelUp('smith')">铁匠铺 {{guild.smith}}</button>
            </template>
            <template v-slot:tip>
                <p class="info">* 提供强化、锻造等服务</p>
                <p class="info">
                    ————消耗————
                    <br>
                    <span :style="{color:guild.gold<cost.smith.cost.gold?'#f00':''}">金币:{{cost.smith.cost.gold}}</span>
                </p>
            </template>
        </cTooltip>
    </div>
    <trainStat></trainStat>
    <div class="training">
        <div class="trainingProgressbars">
            <countdown :tier="0" :timer="$store.state.timer.trainTimer1" :level="guild.train" v-if="guild.train>0"></countdown>
            <!-- <countdown :tier="0" :timer="$store.state.timer.trainTimer1" :level="guild.train"></countdown> -->
            <countdown :tier="1" :timer="$store.state.timer.trainTimer2" :level="guild.train2" v-if="guild.train2>0"></countdown>
            <countdown :tier="2" :timer="$store.state.timer.trainTimer3" :level="guild.train3" v-if="guild.train3>0"></countdown>
        </div>
    </div>
</div>
    
</template>
<script>
import {guildConfig} from '@/assets/config/guildConfig'
import cTooltip from '../uiComponent/tooltip';
import countdown from '../uiComponent/countdown';
import trainStat from '../component/trainStat';
export default {
    name: "guild",
    mixins: [guildConfig],
    components: {cTooltip, countdown, trainStat},
    mounted() {
    },
    data() {
        return {
        };
    },
    props: {
    },
    computed: {
        guild() {return this.$store.state.guildAttribute;}
    },
    methods: {      
        levelUp(type) {
            for(let cost in this.cost[type].cost) {
                if(this.guild[cost] < this.cost[type].cost[cost])
                    return;
            }
            if(type != 'guild' && this.guild['guild'] <= this.guild[type])
                return;
            for(let cost in this.cost[type].cost) {
                this.guild[cost] -= this.cost[type].cost[cost];
            }
            this.guild[type] += 1;
            this.getCost(type, this.guild[type]+1);

        },
        getCost(type, level) {
            for(let cost in this.cost[type].cost) {
                this.cost[type].cost[cost] = Math.round(this.cost[type].base[cost] * (3+level**2*(1+level/10)));
            }
        },
        getAllCost() {
            var construct = ['guild', 'train', 'train2', 'train3', 'shop', 'smith']
            construct.forEach(type => {
                this.getCost(type, this.guild[type]+1);
            });
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