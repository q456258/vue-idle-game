
<template>
	<div class="container">
		<div class="progress" v-if="guild.train.lv>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#dc3545', width: (progress.HP.progress/getMax('HP')*100)+'%'}">
                <small id="HPtrain" class="justify-content-center d-flex position-absolute center">生命训练({{progress.HP.level}}级) {{progress.HP.progress}} / {{getMax('HP')}} </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train.lv>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#0275d8', width: (progress.MP.progress/getMax('MP')*100)+'%'}">
                <small id="MPtrain" class="justify-content-center d-flex position-absolute center">魔法训练({{progress.MP.level}}级) {{progress.MP.progress}} / {{getMax('MP')}} </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train.lv>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#8D8E8E', width: (progress.ATK.progress/getMax('ATK')*100)+'%'}">
                <small id="ATKtrain" class="justify-content-center d-flex position-absolute center">攻击训练({{progress.ATK.level}}级) {{progress.ATK.progress}} / {{getMax('ATK')}} </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train.lv>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#f0ad4e', width: (progress.DEF.progress/getMax('DEF')*100)+'%'}">
                <small id="DEFtrain" class="justify-content-center d-flex position-absolute center">护甲训练({{progress.DEF.level}}级) {{progress.DEF.progress}} / {{getMax('DEF')}} </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train2.lv>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#ff9900', width: (progress.AP.progress/getMax('AP')*100)+'%'}">
                <small id="APtrain" class="justify-content-center d-flex position-absolute center">元素训练({{progress.AP.level}}级) {{progress.AP.progress}} / {{getMax('AP')}} </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train2.lv>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#61CBFF', width: (progress.MR.progress/getMax('MR')*100)+'%'}">
                <small id="MRtrain" class="justify-content-center d-flex position-absolute center">能量盾训练({{progress.MR.level}}级) {{progress.MR.progress}} / {{getMax('MR')}} </small>
 			</div>
		</div>
		<div class="progress" v-if="guild.train3.lv>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#DB3A3A', width: (progress.STR.progress/getMax('STR')*100)+'%'}">
                <small id="STRtrain" class="justify-content-center d-flex position-absolute center">力量训练({{progress.STR.level}}级) {{progress.STR.progress}} / {{getMax('STR')}} </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train3.lv>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#06B300', width: (progress.AGI.progress/getMax('AGI')*100)+'%'}">
                <small id="AGItrain" class="justify-content-center d-flex position-absolute center">敏捷训练({{progress.AGI.level}}级) {{progress.AGI.progress}} / {{getMax('AGI')}} </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train3.lv>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#5757FF', width: (progress.INT.progress/getMax('INT')*100)+'%'}">
                <small id="INTtrain" class="justify-content-center d-flex position-absolute center">智力训练({{progress.INT.level}}级) {{progress.INT.progress}} / {{getMax('INT')}} </small>
			</div>
		</div>
	</div>
</template>
<script>
import {equipConfig} from '@/assets/config/equipConfig'
export default {
    name:"trainStat",
    mixins: [equipConfig],
    components: {},
    props: {
    },
    data () {
        return {
        }
    },
    mounted () {
    },
    watch: {
    },
    computed: {
        guild() {return this.$store.state.guildAttribute;},
        attribute() {return this.$store.state.trainAttribute;},
        progress() {return this.$store.state.trainProgress;}

    },
    methods: {
		getMax(type) {
			return 200+this.progress[type].level*2;
		}
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
.progress {
	margin: 0.2rem 1rem;
	width: 45%;
}
.center {
	color:#000;
    width: 25%;
    font-size: 0.8rem;
}

</style>
