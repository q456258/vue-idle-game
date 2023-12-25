<template>
    <span>
        {{ timer }}
    </span>
</template>
<script>
export default {
    name: "timer",
    props: {
        time: {
            type: Number
        }
    },
    computed: {
        timer() { 
            let s = this.time < 60 ? '00:' : '0'+Math.floor(this.time/60)+':';
            s += this.time%60  < 10 ? '0'+this.time%60 : this.time%60;
            return s;
        },
    },
    data() {
      return {
      };
    },
    mounted() {
    },
    methods: {
    },

};


</script>
<style lang="scss" scoped>
.currency {
    font-size: 12px;
}
.currencyIcon {
    margin-top: -4px;
}
</style>
