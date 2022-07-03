<template>
    <span class="currency" :style="{color:!isCost||playerGold>=amount?'#fff':'#f00'}">
        <span v-if="gold>0">
            {{gold}}<img class="currencyIcon" src="../../../public/icons/other/gold2.png">
        </span>
        <span v-if="silver>0">
            {{silver}}<img class="currencyIcon" src="../../../public/icons/other/silver.png">
        </span>
        <span v-if="copper>0 | (gold==0 && silver==0)">
            {{copper}}<img class="currencyIcon" src="../../../public/icons/other/copper.png">
        </span>
    </span>
</template>
<script>
export default {
    name: "currency",
    props: {
        isCost: {
            type: Boolean,
            default: true,
        },
        amount: {
            type: Number
        }
    },
    computed: {
        playerGold() { return this.$store.state.guildAttribute.gold; },
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
.currency {
    font-size: 12px;
}
.currencyIcon {
    margin-top: -4px;
}
</style>
