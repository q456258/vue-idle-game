<template>
    <div class="progress" style="width:100%;">
        <div class="progress" style="width:100%;">
            <div class="progress-bar progress-bar-striped insta" :class="{'bg-danger':type=='hp'}" :style="{width:vpNow/vpMax*100+'%'}">
                <small class="justify-content-center d-flex position-absolute w-100" style="color:black">{{vpNow}} / {{vpMax}} </small>
            </div>
            <div ref="delay" class="progress-bar progress-bar-striped" :class="{'delay':type=='hp', 'delayMp':type=='mp'}" :style="{width:(delay-vpNow)/vpMax*100+'%'}">
            </div>
        </div>
    </div>

</template>
<script>
export default {
    name: 'hpmpBar',
    props: {
        vpMin: {
            type: Number,
            required: true
        },
        vpNow: {
            type: Number,
            required: true
        },
        vpMax: {
            type: Number,
            required: true
        },
        target: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            delay: 0,
        };
    },
    mounted() {
    },
    watch: {
        vpNow() {            
            let temp = this.vpNow;
            let delay = this.$refs.delay;
            delay.style.transition= 'width 0s linear';
            setTimeout(() => {
                if(temp>this.vpNow && (this.vpNow-temp)/this.vpMax > 0.01) {
                    this.delay = temp;
                }
                else {
                    this.delay = this.vpNow;
                }
            delay.style.transition= 'width 0.5s linear';
            delay.style.width= '0';
            }, 100)
        }
    },
    computed: {
    },
    methods: {
    }
};


</script>
<style lang="scss" scoped>
.progress {
    position: relative;
}
.w-100 {
    width: 100%;
    font-size: 0.8rem;
}
.insta {
    transition: width 0s linear;
}
.delay {
    transition: width 0.5s linear;
    background-color: rgb(255, 0, 0);
}
.delayMp {
    transition: width 0.5s linear;
    background-color: rgb(50, 190, 255);
}
</style>