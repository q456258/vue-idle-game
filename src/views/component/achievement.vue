<template>
</template>
<script>

export default {    
    name: 'achievement',
    props: {
    },
    components: {},
    data() {
        return {
        };
    },
    mounted() {
        this.$store.globalComponent.achievement = this;
    },
    watch: {
    },
    computed: {
    },
    methods: {
        set_statistic(data) {
            // if(data.gameTime != undefined) {
            //     let time = this.$store.state.statistic.gameTime;
            //     let hourGap = this.timeGap('hour', time, time+data.gameTime);
            //     if(hourGap == 1) {
            //         let guildMember = this.$store.globalComponent["guildMember"];
            //         guildMember.levelupAll();
            //     }

            // }
            this.$store.commit("set_statistic", data);
        },
        timeGap(type, time, time2) {
            let diff = 0;
            time /= 1000;
            time2 /= 1000;
            switch(type) {
                case 'day':
                    diff = Math.floor(time2/86400)-Math.floor(time/86400);
                    break;
                case 'hour':
                    diff = Math.floor(time2%86400/3600)-Math.floor(time%86400/3600);
                    break;
                case 'min':
                    diff = Math.floor(time2%3600/60)-Math.floor(time%3600/60);
                    break;
                case 'sec':
                    diff = Math.floor(time2%60)-Math.floor(time%60);
                    break;
            }
            return diff;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>