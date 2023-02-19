<template>
<draggable class="equip">
    <template slot="header">
    </template>
    <template slot="main" >
        <div v-if="equip.quality">
            <span class="title">· 洗炼 ·</span>
            <div class="info">
                <div class="name" :style="{color:equip.quality.color}">
                    {{ equip.description.name }}
                </div>
                <div class='icon'>
                    <img :src="equip.description.iconSrc" alt="icon">
                </div>
            </div>
            <div class="potential">
                <div v-for="v in equip.potential" :key="v.id">
                    <!-- <button class="tag" :data-content-default="v.name+':'+v.showVal" data-content-spinning="WEEEEEEEE"> -->
                    <button class="tag">
                        <div class="value" :style="{color: v.quality==0? '#D9D9D9A2':''}">{{v.name}} : {{v.showVal}}</div>
                    </button>
                </div>
            </div>
            <span class="cost">
                消耗<img src="/icons/item/inv_misc_enchantedpearla.jpg">*1
            </span>
            <span class="has">
                目前持有数: {{itemQty}}
            </span>
            <div class="confirm" @click="washPotential()" v-show="item.quantity>0">
            <!-- <div class="confirm" @click="washPotential()"> -->
                洗炼
            </div>
            <div class="cancel" @click="closeInfo()" >
                取消
            </div>
        </div>
    </template>
</draggable>
</template>
<script>

import draggable from '../uiComponent/draggable'
export default {
    name: "equipPotential",
    mixins: [],
    components: {draggable},
    data() {
        return {
            has: 0
        };
    },
    mounted() {
        this.$store.globalComponent.equipPotential = this;
    },
    props: {
        equip: {
            type:Object
        }
    },
    watch: {
    },
    computed: {
        smith() {
            return this.$store.state.guildAttribute.smith;
        },
        warning() {
            return this.has < 1;
        },
        item() {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let backpack = this.$store.globalComponent["backpack"];
            // 神秘宝珠
            let item = itemInfo.findItemIndex('inv_misc_enchantedpearla');
            if(item == -1)
                return {quantity: 0};
            else
                return item.use ? backpack.useGrid[item] : backpack.etcGrid[item];
        },
        itemQty() {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            // 神秘宝珠
            let qty = itemInfo.getItemQty('inv_misc_enchantedpearla');
            return qty;
        }
    },
    methods: {
        washPotential() {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            itemInfo.removeItemByItem(this.item, 1);

            let tags = document.getElementsByClassName('tag');
            let equipInfo = this.$store.globalComponent["equipInfo"];
            this.equip.potential = equipInfo.createPotential(this.equip);
            for(let i=0; i<tags.length; i++) {
                setTimeout(()=>{
                    tags[i].animate([{
                        boxShadow: '0 10px 20px rgba( 0,0,0, 0.2 )',
	                    transform: 'rotateX( 0 ) rotateY( -360deg )',
                    }, {
                        boxShadow: '0 10px 20px rgba( 0,0,0, 0.2 )',
	                    transform: 'rotateX( 360deg ) rotateY( -360deg )',
                    },
                    ], { duration: 100, ease:'ease-in', iterations: 6});

                    setTimeout(()=>{
                        if(this.equip.potential[i].quality == 1)
                            tags[i].innerHTML = "<div class='value'>"+this.equip.potential[i].name+" : "+ this.equip.potential[i].showVal+"</div>";
                        else
                            tags[i].innerHTML = "<div class='value' style='color:#D9D9D9A2'>"+this.equip.potential[i].name+" : "+ this.equip.potential[i].showVal+"</div>";
                    },600);
                }, 200*i);
            }
        },
        closeInfo() {
            let index = this.$store.globalComponent["index"];
            index.closeInfo('potential');
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
    background-image: url("/icons/ui/enhancePanel2.png");
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
    .potential {
        position: absolute;
        margin-left: 70%;
        margin-top: 15%;
        width: 50%;
        height: 55%;
        &>div {
            margin: 0.2rem;
        }
    }
    .warning {
        color: #D8000C;
    }
    .cost {
        position: absolute;
        top: 10rem;
        left: 36rem;
        bottom: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        img {
            height: 2rem;
            width: 2rem;
        }
    }
    .has {
        position: absolute;
        top: 13rem;
        left: 36rem;
        bottom: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
    }
    .confirm {
        position: absolute;
        top: 21rem;
        left: 35rem;
        height: 2.5rem;
        width: 8rem;
        background-image: url("/icons/ui/button.png");
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
        background-image: url("/icons/ui/button.png");
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

.tag {
    position: relative;
    display: block;
    background-color: transparent;
    font-size: 1rem;
    border: none;
    outline: none;
    text-align: center;
    box-sizing: border-box;
    text-decoration: none;
    color: #fff;
    height: 2rem;
    letter-spacing: 2px;
    // &:before {
    //     content: attr( data-content-default );	
    //     }
    // &:active {
    //     animation: spinner 200ms infinite linear;
        
    //     &:before {
    //     content: attr( data-content-spinning );	}
    // }
}


// @keyframes spinner {
// 	from {
// 	box-shadow: 0 10px 20px rgba( 0,0,0, 0.2 );
// 	transform: rotateX( 0 ) rotateY( -360deg );	}
	
// 	to {
// 	box-shadow: 0 10px 20px rgba( 0,0,0, 0.2 );
// 	transform: rotateX( 360deg ) rotateY( -360deg ); }
// }

</style>