<template>
    <span class="currency">
        <span v-if="gold>0">
            {{gold}}<img src="../../../public/icons/other/gold2.png">
        </span>
        <span v-if="silver>0">
            {{silver}}<img src="../../../public/icons/other/silver.png">
        </span>
        <span v-if="copper>0 | (gold==0 && silver==0)">
            {{copper}}<img src="../../../public/icons/other/copper.png">
        </span>
    </span>
</template>
<script>
export default {
    name: "currency",
    props: {
        amount: {
            type: Number
        }
    },
    computed: {
        gold() { return Math.floor(this.amount/10000);},
        silver() { return Math.floor(this.amount%10000/100);},
        copper() { return Math.floor(this.amount%100);},
    },
    data() {
      return {
        tipsShow: false,
        tipsStyle: {}
      };
    },
    mounted() {

    },
    methods: {
    },

};


</script>
<style lang="scss" scoped>
.currency{
    font-size: 12px;
}
</style>
