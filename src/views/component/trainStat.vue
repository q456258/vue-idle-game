<template>
	<div class="container">
		<div class="progress">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#dc3545', width: (stat.HP/((talent.HP+50)*entryInfo.HP.base*lv)*100)+'%'}">
                <small id="HPtrain" class="justify-content-center d-flex position-absolute center">生命{{stat.HP}} / {{(talent.HP+50)*entryInfo.HP.base*lv}}</small>
			</div>
		</div>
		<div class="progress">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#0275d8', width: (stat.MP/((talent.MP+50)*entryInfo.MP.base*lv)*100)+'%'}">
                <small id="MPtrain" class="justify-content-center d-flex position-absolute center">魔法{{stat.MP}} / {{(talent.MP+50)*entryInfo.MP.base*lv}}</small>
			</div>
		</div>
		<div class="progress">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#8D8E8E', width: (stat.ATK/((talent.ATK+50)*entryInfo.ATK.base*lv)*100)+'%'}">
                <small id="ATKtrain" class="justify-content-center d-flex position-absolute center">攻击{{stat.ATK}} / {{(talent.ATK+50)*entryInfo.ATK.base*lv}} </small>
			</div>
		</div>
		<div class="progress">
			<div class="progress-bar progress-bar-striped" :style="{backgroundColor:'#f0ad4e', width: (stat.DEF/((talent.DEF+50)*entryInfo.DEF.base*lv)*100)+'%'}">
                <small id="DEFtrain" class="justify-content-center d-flex position-absolute center">护甲{{stat.DEF}} / {{(talent.DEF+50)*entryInfo.DEF.base*lv}}</small>
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
		member: {
			type: Object
		}
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
        stat() {
			return this.member.stat ? this.member.stat : { HP: 0, MP: 0, ATK: 0, DEF: 0 };
		},
        talent() {
			return this.member.talent ? this.member.talent : { HP: 0, MP: 0, ATK: 0, DEF: 0 };
		},
        lv() {
			return this.member.lv ? this.member.lv : 0;
		},
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
