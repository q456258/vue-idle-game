<template>
<draggable class="equip">
    <template slot="header">
    </template>
    <template slot="main" >
    <div v-if="equip.quality">
        <span class="title">· 锻造 ·</span>
        <div class="info">
            <div class="name" :style="{color:equip.quality.color}">
                {{ equip.description.name }}
            </div>
            <div class='icon'>
                <img :src="equip.description.iconSrc" alt="icon">
            </div>
        </div>
        <div class="forge">
            <div class="extraEntry" v-if="equip.extraEntry">
                <div v-for="(v, k) in equip.extraEntry" :key="v.id" @click="forge(v, k)">
                    <!-- <div>{{v.name}} : {{v.showVal}}</div> -->
                    
                    <button class="btn btn-snake-border"  :class="v.qualityLv">
                        <div class="btn-borders">
                            <div class="border-top"></div>
                            <div class="border-right"></div>
                            <div class="border-bottom"></div>
                            <div class="border-left"></div>
                        </div>
                        <div class="value">{{v.name}} : {{v.showVal}}<span style="font-size: 0.7rem;">&nbsp;({{v.quality+'%'}})</span></div>
                        
                    </button>
                    <!-- <button class="btn-5">
                        <div class="value">{{v.name}} : {{v.showVal}}</div>
                    </button> -->
                    <!-- <button class="tag" data-content-default="TOUCH ME PLEASE" data-content-spinning="WEEEEEEEE">
                        <div class="value">{{v.name}} : {{v.showVal}}</div>
                    </button> -->
                </div>
            </div>

        </div>
        <div class="confirm" @click="forgeAll()">
            重铸
        </div>
        <div class="cancel" @click="closeInfo()">
            取消
        </div>
    </div>
    </template>
</draggable>
</template>
<script>
import { assist } from '../../assets/js/assist';
import draggable from '../uiComponent/draggable'
export default {
    name: "equipForge",
    mixins: [assist, ],
    components: {draggable},
    data() {
        return {
        };
    },
    props: {
        equip: {
            type:Object
        }
    },
    methods: {
        forgeAll() {
            var equipInfo = this.findBrothersComponents(this, 'equipInfo', false)[0];
            equipInfo.forgeAll(this.equip);
        },
        forge(entry, key) {       
            var equipInfo = this.findBrothersComponents(this, 'equipInfo', false)[0];
            equipInfo.forgeEntry(this.equip, key);
        },
        closeInfo() {
            var index = this.findComponentUpward(this, 'index');
            index.closeInfo('forge');
        }
    }
}
</script>
<style lang="scss" scoped>
.equip {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 28rem;
    width: 48rem;
    background-image: url("/icons/enhancePanel2.png");
    background-repeat: no-repeat;
    background-size: 49rem 28rem;
    z-index: 10;
    .title {
        position: absolute;
        top: 1.4rem;
        left: 0;
        right: 0;
        font-weight: bold;
        font-size: 1.5rem;
    }
    .info {
        position: absolute;
        width: 50%;
        .name {
            position: relative;
            top: 11rem;
            left: 2.5rem;
        }
        .icon {
            position: relative;
            top: 12rem;
            left: 2.5rem;
        }
    }
    .forge {
        position: absolute;
        margin-left: 55%;
        margin-top: 10%;
        width: 53%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        .extraEntry {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 60%;
            color: #68d5ed;
            .value {
                color: #ccc;
                &:hover {
                    box-shadow: inset 0 0 7px 7px #a1a1a1a2;
                }
            }
        }
    }
    .confirm {
        position: absolute;
        top: 21rem;
        left: 35rem;
        height: 2.5rem;
        width: 8rem;
        background-image: url("/icons/button.png");
        background-repeat: no-repeat;
        background-size: 8rem 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        opacity: 0.8; 
        &:hover {
            opacity: 1; 
        }
    }
    .cancel {
        position: absolute;
        top: 24rem;
        left: 35rem;
        height: 2.5rem;
        width: 8rem;
        background-image: url("/icons/button.png");
        background-repeat: no-repeat;
        background-size: 8rem 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        opacity: 0.8; 
        &:hover {
            opacity: 1; 
        }
    }
    
}
$blue: #ccc;
button:focus {
    outline: none !important;
    box-shadow: none;
}
.btn {
    width: 100%;
    position: relative;
    padding: 0.1rem 0.3rem;
    font-family: Lato, sans-serif;
    font-size: 1rem;
    margin-top: 0.2rem;
    line-height: 1.3rem;
    color: #d8e8e8;
    text-decoration: none;
    border: transparent;
    outline: transparent;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    border-radius: 4px;
    transition: 0.2s;
    &:hover {
        box-shadow: inset 0 0 7px 7px #53a28ec9;
        .btn-borders {
        display: flex !important;
        }
    }
    &.E:hover {
        box-shadow: inset 0 0 7px 7px #696969a2;
    }
    &.D:hover {
        box-shadow: inset 0 0 7px 7px #D9D9D9A2;
    }
    &.C:hover {
        box-shadow: inset 0 0 7px 7px #00BBFFA2;
    }
    &.B:hover {
        box-shadow: inset 0 0 7px 7px #bb00ff9d;
    }
    &.A:hover {
        box-shadow: inset 0 0 7px 7px #ff9900b7;
    }
    &.S:hover {
        box-shadow: inset 0 0 7px 7px #FF0000A2;
    }
    .btn-text {
        color: $blue;
    }
    &-snake-border {
        .btn-borders {
            display: none !important;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            .border-top {
                position: absolute;
                top: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(to right, transparent, $blue);
                animation: moveHorizontally 2s linear infinite;
            }
            .border-right {
                position: absolute;
                right: 0;
                width: 2px;
                height: 100%;
                background: linear-gradient(to bottom, transparent, $blue);
                animation: moveVertically 2s 1s linear infinite;
            }

            .border-bottom {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(to left, transparent, $blue);
                animation: moveHorizontally 2s linear reverse infinite;
            }

            .border-left {
                position: absolute;
                left: 0;
                width: 2px;
                height: 100%;
                background: linear-gradient(to top, transparent, $blue);
                animation: moveVertically 2s 1s linear reverse infinite;
            }
        }
    }
}

@keyframes moveHorizontally {
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(100%);
    }
}

@keyframes moveVertically {
    from {
        transform: translateY(-100%);
    }

    to {
        transform: translateY(100%);
    }
}

.tag {
    position: relative;
    display: block;
    background-color: #FFF;
    font-weight: 700; 
    font-size: 1rem;
    border: none;
    outline: none;
    min-width: 150px;
    text-align: center;
    box-sizing: border-box;
    padding: 4vh 8vw;
    text-decoration: none;
    color: #000;
    letter-spacing: 2px;
    cursor: -webkit-grab;
    cursor: -moz-grab;
    &:before {
    content: attr( data-content-default );	}
    &:active {
    cursor: -webkit-grabbing;
    cursor: -moz-grabbing;
    animation: spinner 200ms infinite linear;
        
        &:before {
        content: attr( data-content-spinning );	}
    }
}


@keyframes spinner {
	from {
	box-shadow: 0 10px 20px rgba( 0,0,0, 0.2 );
	transform: rotateX( 0 ) rotateY( -360deg );	}
	
	to {
	box-shadow: 0 10px 20px rgba( 0,0,0, 0.2 );
	transform: rotateX( 360deg ) rotateY( -360deg ); }
}

</style>