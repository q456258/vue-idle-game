<template>
<draggable class="equipPanel">
    <template slot="header">
    </template>
    <template slot="main" >
        <div v-if="equip.quality">
            <span class="title">· 洗炼 ·</span>
            <div class="info">
                <div class="name" :style="{color:equip.quality.color}">
                    {{ equip.description.name }}
                </div>
                <div class='largeIconContainer'>
                    <del :class="[{grey:equip.quality.qualityLv==1, green:equip.quality.qualityLv==3, blue:equip.quality.qualityLv==4, purple:equip.quality.qualityLv==5, orange:equip.quality.qualityLv==6}, 'largeIcon iconBorder']"></del>
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
            <div class="confirm actions image_button" @click="washPotential()" v-show="item.quantity>0">
            <!-- <div class="confirm" @click="washPotential()"> -->
                洗炼
            </div>
            <div class="cancel actions image_button" @click="closeInfo()" >
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
.equipPanel {
    .cost {
        top: -2rem;
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
}

</style>