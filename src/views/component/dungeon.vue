<template>
    <div id="dungeon">
    </div>
</template>
<script>

export default {    
    name: 'dungeon',
    props: { },
    mixins: [],
    components: {},
    data() {
        return {
        };
    },
    mounted() {
        this.$store.globalComponent.dungeon = this;
    },
    watch: {
    },
    computed: {
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
#dungeon {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 15px;
    background: linear-gradient(130deg, rgba(0, 0, 0, 0.7) 0%, rgb(44, 37, 24) 40%, rgb(14, 10, 6) 70%);
    width: 48rem;
    height: 40rem;
    z-index: 9;
    
}
</style>