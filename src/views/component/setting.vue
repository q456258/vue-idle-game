<template>
<draggable class="setting">
    <template slot="header">
        <a href="#" class="close" @click="closeSetting()"></a>
    </template>
    <template slot="main" >
        <div class="wrapper">
            <div class="window">
                <div class="nav-bar">
                    <div class="title">
                        设置
                    </div>
                </div>
                <div class="settings">
                    <div class="item">
                        <!-- <div class="label">
                            后台模式
                        </div>
                        <label class="switch"><input v-model="slowTick" type="checkbox">
                        <div class="slider"></div>
                        </label> -->
                    </div>
                </div>
            </div>
        </div>
    </template>
</draggable>
</template>
<script>
import draggable from '../uiComponent/draggable';
import cTooltip from '../uiComponent/tooltip';
import { assist } from '../../assets/js/assist';
export default {    
    name: 'setting',
    props: {
    },
    mixins: [assist],
    components: {draggable, cTooltip},
    data() {
        return {
            dragging: false,
        };
    },
    mounted() {
    },
    watch: {
    },
    computed: {
    },
    methods: {
        readSetting() {
        },
        closeSetting() {
            let index = this.findComponentUpward(this, 'index');
            index.closeMenuPanel('setting');
        }
    }
}
</script>
<style lang="scss" scoped>
#draggable-header {
    left: 0px;
    top: 0px;
    height: 2.5rem;
}
.setting {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20rem;
    width: 400px;
    margin: auto;
    z-index: 9;
}

$navBarColor: #332625;

.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.window {
    border-radius: 8px;
    overflow: hidden;
    width: 400px;
    .nav-bar {
        z-index: 5;
        background: $navBarColor;
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        .title {
            color: white;
            font-weight: 500;
            font-size: 20px;
        }
    }
    .settings {
        background: lighten($navBarColor, 5);
        height: 100%;
        padding: 8px 0;
        .item {
            padding: 0 16px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .label {
                color: #fff;
                font-size: 16px;
            }
        }
    }
}

.switch {
    width: 60px;
    height: 30px;
    display: inline-block;
    & input {
        display: none;
    }

    .slider {
        position: absolute;
        background-color: #F38181;
        width: inherit;
        height: inherit;
        border-radius: 34px;
        cursor: pointer;
        transition: background-color 1s linear;
        &:before {
            position: absolute;
            right: 30px;
            content: "";
            height: 30px;
            width: 30px;
            border-radius: 50px;
            background-color: #fff;
            transition: .4s, background-color 1s linear;
        }
    }
    
    input:checked + .slider {
        background-color: darken(#A9EEE6, 10);
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(30px);
        -ms-transform: translateX(30px);
        transform: translateX(30px);
    }
}

.close {
    position: absolute;
    right: 10px;
    top: 5px;
    width: 32px;
    height: 32px;
    opacity: 0.7;
    z-index: 6;
}
.close:hover {
    opacity: 1;
}
.close:before, .close:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: rgb(255, 255, 255);
}
.close:before {
    transform: rotate(45deg);
}
.close:after {
    transform: rotate(-45deg);
}
</style>