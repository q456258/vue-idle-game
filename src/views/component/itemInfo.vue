<template>
    <div class="item" v-if="item.description">
        <div class="border">
            <div class="name" :style="{color:item.quality.color}">
            {{ item.description.name }}
            </div>
            <!-- <div class="quality" :style="{color:equip.quality.color}">
            {{ equip.quality.name }}
            </div> -->
            <div class="title">
                <div class='icon'>
                    <img :src="item.description.iconSrc" alt="icon">
                </div>
                <!-- <div class="lv">
                    装备等级：{{equip.lv}}
                </div> -->
            </div>
            <div class="description">
                <div class="type">
                    物品分类：{{item.description.category}}
                </div>
                <div class="baseEntry">
                    {{item.description.desc}}
                </div>
                <div class="extraEntry">
                    数量：{{item.quantity}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {itemConfig} from '@/assets/config/itemConfig'
import { assist } from '../../assets/js/assist';
export default {
    name: "itemInfo",
    mixins: [itemConfig, assist],
    data() {
        return {
            newItem: {},
        };
    },
    props: {
        item: {
            type:Object
        }
    },
    methods: {
        createItem(type, quantity) {
            var newItem = {};
            newItem.description = this.itemType[type].description;
            // newEquip.lv = lv || 1;
            newItem.quality = this.itemQuality[this.itemType[type].quality-1];
            newItem.quantity = quantity;
            newItem.type = type;
            newItem.stack = this.itemType[type].stack;
            // newEquip.maxEnhanceLv = (newEquip.quality.extraEntryNum-1)*5;
            // newEquip.enhanceLv = Math.min(0, newEquip.maxEnhanceLv);
            // newEquip.baseEntry = this.createBaseEntry(newEquip);
            // newEquip.extraEntry = this.createExtraEntry(newEquip);
            // newEquip.potential = newEquip.lv >= 30 ? this.createPotential(newEquip) : [];
            return JSON.stringify(newItem);
        },
        createQuality(bonus) {
            var random = Math.round(Math.random()*1000)/1000;
            var quality = 0;
            for(var i=0; i<this.qualityProbability.length; i++) {
                if(random <= this.qualityProbability[i]) {
                    quality = i;
                    break;
                }
            }
            quality += bonus;
            if(quality > 5)
                return this.quality[5];
            return this.quality[quality];
        },
        findItem(name) {            
            var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            for (let i = 0; i < backpack.itemGrid.length; i++) {
                if (Object.keys(backpack.itemGrid[i]).length > 2 && backpack.itemGrid[i].description.name == name) {
                    return i;
                }
            }
            return -1;
        },
        addItem(item) {
            var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            var name = item.description.name;
            var stack = item.stack ? this.findItem(name) : -1;
            if(stack == -1) {
                for (let i = 0; i < backpack.itemGrid.length; i++) {
                    if (Object.keys(backpack.itemGrid[i]).length < 3) {
                        this.$set(backpack.itemGrid, i, item);
                        return;
                    }
                }
            }
            else {
                backpack.itemGrid[stack].quantity += item.quantity;
            }
        },
        removeItemByIndex(index, quantity) {
            var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            backpack.itemGrid[index].quantity -= quantity;
            if(backpack.itemGrid[index].quantity <= 0) {
                // backpack.itemGrid[index] = {};
                this.$set(backpack.itemGrid, index, {});
            }
        },
        removeItemByItem(item) {
            var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            var name = item.description.name;
            var stack = this.findItem(name);
            if(stack != -1) {
                backpack.itemGrid[stack].quantity -= item.quantity;
                if(backpack.itemGrid[stack].quantity <= 0) {
                    // backpack.itemGrid[index] = {};
                    this.$set(backpack.itemGrid, stack, {});
                }
            }
        }
    },

};

</script>
<style lang="scss" scoped>
.item {
    color: #f1f1f1;
    width: 17rem;
    height: auto;
    padding: 0.16rem;
    box-sizing: border-box;
}           
.border {
    border: 1px solid #ccc;
    background: rgba(31, 31, 31, 0.8);
    border-radius: 0.5rem;
}
.name {
    font-size: 15px;
    padding: 0.25rem 0rem;
}           
.quality {
    font-size: 10px;
}         
.title {
    padding: 0.05rem;
    width: 100%;
    height: 4rem;
    display: flex;
    .icon {
        width: 4rem;
        height: 4rem;
        background-color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 1rem;
        border-radius: 0.3rem;
    }
    .lv {
        margin-left: 0.5rem;
        display: flex;
        align-self: flex-end;
        font-size: 0.75rem;
    }
}
.description {
    font-size: 12px;
    margin: 0.5rem 1rem;
    padding: 0.5rem 0rem;
    border-top: 1px solid #777;
    text-align: left;
    .type {
        padding-bottom: 0.5rem;
    }
    .baseEntry {
        padding-bottom: 0.5rem;
        text-align: left;
    }
    .extraEntry {
        color: #ABF6F4;
        border-top: 1px dotted #777;
        padding: 0.5rem 0rem;
        text-align: left;
    }
    .potential {
        padding: 0.5rem 0rem;
        border-top: 1px dotted #777;
    }
}
.desc {
    color: #777;
    padding-bottom: 0.5rem;
    margin: 0rem 1rem;
    text-align: left;
}

</style>   