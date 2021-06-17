
<template>
    <div class="progressbar">
        <svg class="progressbar_svg">
            <!-- <circle cx="80" cy="80" r="70" :stroke-dashoffset="timeRemain/totalTime*440" :class="'progressbar_svg-circle circle shadow-'+type"> </circle> -->
            <circle cx="80" cy="80" r="70" :stroke-dashoffset="timeRemain/totalTime*440" class="progressbar_svg-circle circle shadow-html"> </circle>
            <circle cx="80" cy="80" r="70" :stroke-dashoffset="timeRemain/totalTime*440-440" class="progressbar_svg-dark circle shadow-html"> </circle>
        </svg>
        <span class="progressbar_text" v-show="training">
            <span class="time"><span v-if="Math.floor(timeRemain/3600)<10">0</span>{{Math.floor(timeRemain/3600)}}:</span>
            <span class="time"><span v-if="Math.floor(timeRemain%3600/60)<10">0</span>{{Math.floor(timeRemain%3600/60)}}:</span>
            <span class="time"><span v-if="timeRemain%60<10">0</span>{{timeRemain%60}}</span>
            <button class="btn btn-sm btn-secondary" @click="cancel">
                取消
            </button>
        </span>
        <span class="progressbar_text" v-show="timeRemain == 0">
            <button class="btn btn-danger" @click="collect">
                结束
            </button>
        </span>
        <div class="progressbar_text" v-show="!training && timeRemain != 0  && !collecting">
            <!-- <select @change="setTrainType" class="btn btn-secondary btn-xsm " aria-label="training type">
                <option value="HP" v-if="tier>=0">生命值</option>
                <option value="MP" v-if="tier>=0">魔法值</option>
                <option value="STR" v-if="tier>=2">力量</option> 
                <option value="AGI" v-if="tier>=2">敏捷</option>
                <option value="INT" v-if="tier>=2">智力</option>
                <option value="ATK" v-if="tier>=0">攻击</option>
                <option value="DEF" v-if="tier>=0">护甲</option>
                <option value="AP" v-if="tier>=1">元素伤害</option> 
                <option value="MR" v-if="tier>=1">魔法盾</option>
            </select> -->
            <select @change="setTrainTier" class="btn btn-xsm btn-secondary" aria-label="training time">
                <option value="1">1x</option>
                <option value="2">5x</option>
                <option value="3">25x</option>
                <option value="4">125x</option>
                <option value="5">625x</option>
                <!-- <option value="6">3125x</option> -->
            </select>
            <!-- <div :style="{'font-size':gain>10000?'0.8rem':'1rem'}">+{{gain}}{{entryInfo[this.type].name}}</div> -->
            <span class="time"><span v-if="Math.floor(trainTime/3600)<10">0</span>{{Math.floor(trainTime/3600)}}:</span>
            <span class="time"><span v-if="Math.floor(trainTime%3600/60)<10">0</span>{{Math.floor(trainTime%3600/60)}}:</span>
            <span class="time"><span v-if="trainTime%60<10">0</span>{{trainTime%60}}</span>
            <button class="btn btn-sm btn-danger" @click="startTrain">训练<span>({{cost}})</span></button>
            
            <br>
            <!-- <input type="checkbox" v-model="loop">
            <span class="checkmark">循环</span> -->
        </div>
        <span class="progressbar_text">
            <div ref="text"></div>
        </span>
    </div>
</template>
<script>
import {equipConfig} from '@/assets/config/equipConfig'
export default {
    name:"countdown",
    mixins: [equipConfig],
    components: {},
    props: {
        tier: {
            type: Number
        },
        timer: {
            type: Number
        },
        level: {
            type: Number
        }
    },
    data () {
        return {
            trainerTier: 1,
            trainTier: 1,
            trainLevel: 0,
            trainTime: 0,
            totalTime: 0,
            timeRemain: -1,
            countdownTimer: 0,
            gain: 0,
            cost: 0,
            training: false,
            collecting: false,
            values: [],        
        }
    },
    mounted () {
        // 不要break
        switch(this.tier) {
            case 2:
                this.values = this.values.concat(['STR', 'AGI', 'INT']);
            case 1:
                this.values = this.values.concat(['AP', 'MR']);
            case 0:
                this.values = this.values.concat(['HP', 'MP', 'ATK', 'DEF']);
        }
        this.countdownTimer = this.timer;
        this.trainLevel = this.level;
        this.computeTime();
    },
    watch: {
        level() {
            this.trainLevel = this.level;
            this.computeTime();
        }
    },
    computed: {
    },
    methods: {
        startTrain() {
            this.startTimer(this.trainTime);
        },
        startTimer(time) {
            if(this.$store.state.guildAttribute.crystal >= this.cost)
                this.$store.state.guildAttribute.crystal -= this.cost;
            else
                return;
            this.training = true;
            this.totalTime = time;
            this.timeRemain = time;
            this.countdownTimer = setInterval(() => {
                this.timeRemain -= 1;
                if(this.timeRemain == 0) {
                    this.training = false;
                    clearInterval(this.countdownTimer);
                }
            }, 1000);
        },
        cancel() {
            this.timeRemain = this.totalTime;
            this.training = false;
            this.$store.state.guildAttribute.crystal += this.cost;
            clearInterval(this.countdownTimer);
        },
        collect() {
            var element = this.$refs['text'];
            var count = 5**(this.trainTier-1);
            var gap = 200;
            var multi = 1;
            this.collecting = true;
            switch(this.trainTier) {
                case '6':
                    multi *= 5;
                    count /= 5;
                case '5':
                    multi *= 5;
                    count /= 5;
                case '4':
                    gap /= 4;
            }
            for(let i=0; i<count; i++) {
                setTimeout(()=>{
                    var type = this.values[Math.floor(Math.random()*this.values.length)];
                    var value = this.trainLevel*multi;
                    var node = document.createElement("DIV");
                    var textnode = document.createTextNode(this.entryInfo[type].name+"+"+value);
                    this.increaseProgress(type, value);
                    node.appendChild(textnode);
                    element.appendChild(node); 
                    node.style.position = 'absolute';
                    node.style.width = '10rem';
                    node.style.textAlign = 'left';
                    node.style.top = '-0.5rem';
                    node.style.left = '-1rem';
                    let x = Math.random()*200-100;
                    let y = Math.sqrt(100**2-x**2)*(Math.random()>0.5?1:-1);
                    node.animate([{transform: 'translate(0px)', opacity: 1},
                        {transform: 'translate(' + (x) + 'px, '+ (y) + 'px)', opacity: 0}], { duration: 2000, ease:'ease-in', iterations: 1});
                    this.timeRemain = this.totalTime*((i+1)/count);
                    if(i == count-1) 
                        this.collecting = false;
                    setTimeout(()=>{
                        element.removeChild(node);
                    },2000);
                }, gap*i);
            }

        },
        setTrainTier(e) {
            this.trainTier = e.target.value;
            this.computeTime();
        },
        computeTime() {
            let value = 5**(this.trainTier-1);
            // let time = 1*(1-(0.01*this.trainLevel)/(1+0.01*this.trainLevel))*(2-(this.trainTier-1)*0.2);
            // let time = 1*(2-(this.trainTier-1)*0.2);
            let time = 2.5;
            // this.trainTime = Math.round(value*time/this.entryInfo[this.type].base);
            this.trainTime = Math.round(value*time);
            this.gain = value;
            this.cost = Math.ceil(this.trainTime/10*(1+this.trainLevel/20));
            // this.trainTime = Math.round(2);
            // this.cost = Math.round(2);
        },
        increaseProgress(type, value) {
            this.$store.state.trainProgress[type].progress += value;
            if(this.$store.state.trainProgress[type].progress >= 100) {
                let lv = Math.floor(this.$store.state.trainProgress[type].progress/100);
                this.$store.state.trainProgress[type].level += lv;
                this.$store.state.trainAttribute[type] += lv*this.entryInfo[type].base;
                this.$store.state.trainProgress[type].progress -= lv*100;
                this.$store.commit('set_player_attribute');
            }
        },

    }
}
</script>
<style lang="scss" scoped>
.btn-xsm {
    padding: 0.15rem 0.1rem;
    font-size: 0.775rem;
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
}
</style>