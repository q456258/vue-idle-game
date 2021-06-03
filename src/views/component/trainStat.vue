
<template>
	<div class="container">
		<div class="progress" v-if="guild.train>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#dc3545', width: (progress.HP.progress)+'%'}">
                <small id="HPtrain" class="justify-content-center d-flex position-absolute center">生命训练({{progress.HP.level}}级) {{progress.HP.progress}} / 100 </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#0275d8', width: (progress.MP.progress)+'%'}">
                <small id="MPtrain" class="justify-content-center d-flex position-absolute center">魔法训练({{progress.MP.level}}级) {{progress.MP.progress}} / 100 </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#5bc0de', width: (progress.ATK.progress)+'%'}">
                <small id="ATKtrain" class="justify-content-center d-flex position-absolute center">攻击训练({{progress.ATK.level}}级) {{progress.ATK.progress}} / 100 </small>
			</div>
		</div>
		<div class="progress" v-if="guild.train>0">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#f0ad4e', width: (progress.DEF.progress)+'%'}">
                <small id="DEFtrain" class="justify-content-center d-flex position-absolute center">护甲训练({{progress.DEF.level}}级) {{progress.DEF.progress}} / 100 </small>
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