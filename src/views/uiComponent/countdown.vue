
<template>
    <div class="progressbar">
        <svg class="progressbar_svg">
            <!-- <circle cx="80" cy="80" r="70" :stroke-dashoffset="timeRemain/totalTime*440" :class="'progressbar_svg-circle circle shadow-'+type"> </circle> -->
            <circle cx="80" cy="80" r="70" :stroke-dashoffset="timeRemain/totalTime*440" class="progressbar_svg-circle circle shadow-html"> </circle>
            <circle cx="80" cy="80" r="70" :stroke-dashoffset="timeRemain/totalTime*440-440" class="progressbar_svg-dark circle shadow-html"> </circle>
        </svg>
        <span class="progressbar_text" v-show="timeRemain>0">
            <span class="hour"><span v-if="Math.floor(timeRemain/3600)<10">0</span>{{Math.floor(timeRemain/3600)}}:</span>
            <span class="hour"><span v-if="Math.floor(timeRemain%3600/60)<10">0</span>{{Math.floor(timeRemain%3600/60)}}:</span>
            <span class="hour"><span v-if="timeRemain%60<10">0</span>{{timeRemain%60}}</span>
            <button class="btn btn-sm btn-secondary" @click="cancel">
                取消
            </button>
        </span>
        <div class="progressbar_text" v-show="timeRemain==0">
            <select @change="setTrainType" class="btn btn-secondary btn-sm " aria-label="training type">
                <option value="HP" v-if="tier>=0">生命值</option>
                <option value="MP" v-if="tier>=0">魔法值</option>
                <option value="STR" v-if="tier>=1">力量</option> 
                <option value="AGI" v-if="tier>=1">敏捷</option>
                <option value="INT" v-if="tier>=1">智力</option>
                <option value="ATK" v-if="tier>=0">攻击</option>
                <option value="DEF" v-if="tier>=0">护甲</option>
                <option value="AP" v-if="tier>=0">元素伤害</option> 
                <option value="MR" v-if="tier>=2">格挡</option>
                <!-- <option value="CRIT" v-if="tier>=2">暴击</option> -->
                <option value="CRITDMG" v-if="tier>=2">暴击伤害</option> 
            </select>
            <select @change="setTrainTime" class="btn btn-sm btn-secondary" aria-label="training time">
                <option value="10">10秒</option>
                <option value="60">1分钟</option>
                <option value="3600">1小时</option>
                <option value="36000">10小时</option>
            </select>
            <button class="btn btn-sm btn-danger" @click="startTrain">训练</button>
        </div>
    </div>
</template>
<script>
export default {
    name:"countdown",
    props: {
        tier: {
            type: Number
        },
        timer: {
            type: Number
        }
    },
    data () {
        return {
            trainTime: 10,
            totalTime: 0,
            timeRemain: 0,
            countdownTimer: 0,
            type: 'ATK',
        }
    },
    mounted () {
        this.countdownTimer = this.timer;
    },
    watch: {
    },
    computed: {
    },
    methods: {
        startTrain() {
            this.startTimer(this.trainTime);
        },
        startTimer(time) {
            this.totalTime = time;
            this.timeRemain = time;
            this.countdownTimer = setInterval(() => {
                this.timeRemain -= 1;
                if(this.timeRemain == 0) {
                    clearInterval(this.countdownTimer);
                    this.$store.state.trainAttribute[this.type] += 1;
                    this.$store.commit('set_player_attribute');
                }
            }, 1000);
        },
        cancel() {
            this.timeRemain = 0;
            clearInterval(this.countdownTimer);
        },
        setTrainType(e) {
            this.type = e.target.value;
        },
        setTrainTime(e) {
            this.trainTime = e.target.value;
        }

    }
}
</script>
<style lang="scss" scoped>
.btn-xsm {
    padding: 0.15rem 0.1rem;
    font-size: 0.875rem;
    line-height: 1;
    border-radius: 0.2rem;
}

$color-html: hsl(15, 100%, 60%);
$color-ATK: hsl(0, 100%, 50%);
$color-DEF: hsl(244, 71%, 43%);

.progressbar {
	position: relative;
	width: 170px;
	height: 170px;
	margin: 1em;
	transform: rotate(-90deg);
}

.progressbar_svg {
	position: relative;
	width: 100%;
	height: 100%;
}

.progressbar_svg-circle {
	width: 100%;
	height: 100%;
	fill: none;
	stroke-width: 10;
	stroke-dasharray: 440;
	// stroke-dashoffset: 440;
	stroke: hsla(0, 0%, 100%, 0.75);
	stroke-linecap: round;
	transform: translate(5px, 5px); // stroke-width / 2
}
.progressbar_svg-dark {
	width: 100%;
	height: 100%;
	fill: none;
	stroke-width: 10;
	stroke-dasharray: 440;
	// stroke-dashoffset: 440;
	stroke: hsla(0, 0%, 100%, 0.2);
	stroke-linecap: round;
	transform: translate(5px, 5px); // stroke-width / 2
}

.shadow {
	&-html {
		filter: drop-shadow(0 0 5px $color-html);
	}
	&-ATK {
		filter: drop-shadow(0 0 5px $color-ATK);
	}
	&-DEF {
		filter: drop-shadow(0 0 5px $color-DEF);
	}
}

.circle {
    // animation: anim_circle-html 1s ease-in-out forwards;
    transition: 1s linear;
}

.progressbar_text {
	position: absolute;
	top: 50%;
	left: 50%;
	padding: 0.25em 0.5em;
	color: hsl(0, 0%, 100%);
	font-family: Arial, Helvetica, sans-serif;
	border-radius: 0.25em;
	transform: translate(-50%, -50%) rotate(90deg);
}
</style>