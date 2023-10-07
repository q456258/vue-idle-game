<template>
	<div class="container">
		<div class="progress" v-if="guild.train.lv>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#dc3545', width: (progress.HP.progress)+'%'}">
                <small id="HPtrain" class="justify-content-center d-flex position-absolute center">生命训练({{progress.HP.level}}级) {{progress.HP.progress}} / 100 </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train.lv>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#0275d8', width: (progress.MP.progress)+'%'}">
                <small id="MPtrain" class="justify-content-center d-flex position-absolute center">魔法训练({{progress.MP.level}}级) {{progress.MP.progress}} / 100 </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train.lv>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#8D8E8E', width: (progress.ATK.progress)+'%'}">
                <small id="ATKtrain" class="justify-content-center d-flex position-absolute center">攻击训练({{progress.ATK.level}}级) {{progress.ATK.progress}} / 100 </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train.lv>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#f0ad4e', width: (progress.DEF.progress)+'%'}">
                <small id="DEFtrain" class="justify-content-center d-flex position-absolute center">护甲训练({{progress.DEF.level}}级) {{progress.DEF.progress}} / 100 </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train.lv2>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#ff9900', width: (progress.AP.progress)+'%'}">
                <small id="APtrain" class="justify-content-center d-flex position-absolute center">元素训练({{progress.AP.level}}级) {{progress.AP.progress}} / 100 </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train.lv2>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#61CBFF', width: (progress.MR.progress)+'%'}">
                <small id="MRtrain" class="justify-content-center d-flex position-absolute center">魔法盾训练({{progress.MR.level}}级) {{progress.MR.progress}} / 100 </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train.lv3>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#DB3A3A', width: (progress.STR.progress)+'%'}">
                <small id="STRtrain" class="justify-content-center d-flex position-absolute center">力量训练({{progress.STR.level}}级) {{progress.STR.progress}} / 100 </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train.lv3>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#06B300', width: (progress.AGI.progress)+'%'}">
                <small id="AGItrain" class="justify-content-center d-flex position-absolute center">敏捷训练({{progress.AGI.level}}级) {{progress.AGI.progress}} / 100 </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train.lv3>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#5757FF', width: (progress.INT.progress)+'%'}">
                <small id="INTtrain" class="justify-content-center d-flex position-absolute center">智力训练({{progress.INT.level}}级) {{progress.INT.progress}} / 100 </small>
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
        this.$store.globalComponent.trainStat = this;
    },
    watch: {
    },
    computed: {
        guild() {return this.$store.state.guildAttribute;},
        attribute() {return this.$store.state.trainAttribute;},
        progress() {return this.$store.state.trainProgress;}
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>

.container {
    display: flex;
	flex-wrap: wrap;
    // width: 22rem;
    margin: 0.5rem 0.5rem;
    padding: 0.5rem 0.5rem;
}
.progress {
	position: relative;
	margin: 0.2rem 1rem;
	width: 80%;
}
.center {
	color:#000;
	width: 100%;
    font-size: 0.8rem;
}

</style>
