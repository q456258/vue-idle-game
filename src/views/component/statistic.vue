
<template>
	<div class="container">
        <div class="resource">
            <div class="title">
                资源
            </div>
            <div class="content">
                <div>
                    累积获得金币: <currency :isCost="false" :amount=statistic.cumulatedGold></currency>
                </div>
            </div>
        </div>
        <div class="time">
            <div class="title">
            游戏时间
            </div>
            <div class="content">
                <div>
                开始时间: {{new Date(statistic.gameStartDate)}}
                </div>
                <div>
                活跃时长: {{gameTime}}
                </div>
                <div>
                离线时长: {{awayTime}}
                </div>
            </div>
        </div>
        <div class="slain">
            <div class="title">
            怪物击杀
            </div>
            <div class="content">
                <span v-for="(v, k) in statistic.slain" :key="k" :set="prev = k">
                    {{monsterName[k]+":  "+v}}
                    <br>
                </span>
            </div>
        </div>
        <div class="slainBy">
            <div class="title">
            死亡
            </div>
            <div class="content">
                次数: {{statistic.death}}
                <br>
                <span v-for="(v, k) in statistic.slainBy" :key="k">
                    {{k+":  "+v}}
                </span>
            </div>
        </div>
	</div>
</template>
<script>

import { monsterConfig } from '@/assets/config/monsterConfig'
import currency from '../uiComponent/currency';
export default {
    name:"statistic",
    mixins: [monsterConfig],
    components: {currency},
    props: {
    },
    data () {
        return {
        }
    },
    mounted () {
        this.$store.globalComponent.statistic = this;
    },
    watch: {
    },
    computed: {
        statistic() { return this.$store.state.statistic; },
        gameTime() {
            let time = Math.floor(this.statistic.gameTime/1000);
            let day = Math.floor(time/86400);
            time %= 86400;
            let hour = Math.floor(time/3600);
            time %= 3600;
            let min = Math.floor(time/60);
            time %= 60;
            let sec = time%60;
            let timeStr = day+"天 "+hour+"小时 "+min+"分钟 "+sec+"秒";
            return timeStr;
        },
        awayTime() {
            let time = Math.floor(this.statistic.awayTime/1000);
            let day = Math.floor(time/86400);
            time %= 86400;
            let hour = Math.floor(time/3600);
            time %= 3600;
            let min = Math.floor(time/60);
            time %= 60;
            let sec = time%60;
            let timeStr = day+"天 "+hour+"小时 "+min+"分钟 "+sec+"秒";
            return timeStr;
        },
        monsterName() {
            let monsterName = {};
            for(let id in this.monsterId) {
                monsterName[this.monsterId[id]] = id;
            }
            return monsterName;
        }
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>

.container {
    display: flex;
	flex-wrap: wrap;
    width: 50rem;
    margin: 0.5rem 0.5rem;
    padding: 0.5rem 0.5rem;
}
.resource {
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 1rem;
    height: 100%;
    width: 50rem;
    text-align: left;
}
.time {
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 1rem;
    height: 100%;
    width: 50rem;
    text-align: left;
}
.slain {
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 1rem;
    height: 100%;
    width: 50rem;
    text-align: left;
}
.slainBy {
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 1rem;
    height: 100%;
    width: 50rem;
    text-align: left;
}
.content {
    margin-left: 2rem;
}
</style>
