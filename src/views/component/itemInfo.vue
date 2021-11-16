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
                <div class="lv" v-if="item.lvReq > 0">
                    <span :style="{color: player.lv<item.lvReq? '#f00':''}">等级：{{item.lvReq}}</span>
                </div>
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
    computed: {
        player() { return this.$store.state.playerAttribute },
    },
    methods: {
        createItem(type, quantity, lv) {
            let newItem = {};
            newItem.description = this.itemType[type].description;
            newItem.lv = lv || 1;
            newItem.quality = this.itemQuality[this.itemType[type].quality-1];
            newItem.quantity = quantity;
            newItem.type = type;
            newItem.stack = this.itemType[type].stack;
            newItem.lvReq = this.itemType[type].lvReq==undefined ? 0 : this.itemType[type].lvReq;
            return JSON.stringify(newItem);
        },
        createQuality(bonus) {
            let random = Math.round(Math.random()*1000)/1000;
            let quality = 0;
            for(let i=0; i<this.qualityProbability.length; i++) {
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
        findItem(name, checkStack=false) {            
            let backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            for (let i = 0; i < backpack.itemGrid.length; i++) {
                let item = backpack.itemGrid[i];
                if(Object.keys(item).length > 2 && item.description.name == name) {
                    if(!checkStack)
                        return i;
                    else if(item.quantity < this.itemType[item.type].maxStack)
                        return i;
                }
            }
            return -1;
        },
        getItemQty(name) {            
            let backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            let total = 0;
            for (let i = 0; i < backpack.itemGrid.length; i++) {
                let item = backpack.itemGrid[i];
                if(Object.keys(item).length > 2 && item.description.name == name) {
                    total += item.quantity;
                }
            }
            return total;
        },
        addItem(item) {
            let backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            let name = item.description.name;
            // let stack = item.stack ? this.findItem(name) : -1;
            let stack = this.findItem(name, true);
            if(this.itemType[item.type].autoUse) {
                let used = backpack.useItem(item);
                if(used)
                    return;
            }
            if(stack == -1) {
                for (let i = 0; i < backpack.itemGrid.length; i++) {
                    if (Object.keys(backpack.itemGrid[i]).length < 3) {
                        this.$set(backpack.itemGrid, i, this.$deepCopy(item));
                        return;
                    }
                }
            }
            else {
                let remain = this.stackItem(backpack.itemGrid[stack], item);
                if(remain > 0)
                    this.addItem(item);
            }
        },
        stackItem(item, item2) {
            let max = this.itemType[item.type].maxStack;
            let sum = item.quantity + item2.quantity;
            if(sum > max) {
                item.quantity = max;
                item2.quantity = sum-max;
                return sum-max;
            }
            else {
                item.quantity = sum;
                return 0;
            }
        },
        removeItemByIndex(index, quantity) {
            let backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            let temp = backpack.itemGrid[index];
            if(backpack.itemGrid[index].quantity <= quantity) {
                this.$set(backpack.itemGrid, index, {});
                this.removeItemByItem(temp, quantity-temp.quantity);
            }
            else
                backpack.itemGrid[index].quantity -= quantity;
        },
        removeItemByItem(item, quantity) {
            let backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            let name = item.description.name;
            let stack = this.findItem(name);
            if(stack != -1) {
                if(backpack.itemGrid[stack].quantity <= quantity) {
                    // backpack.itemGrid[index] = {};
                    this.$set(backpack.itemGrid, stack, {});
                    this.removeItemByItem(item, quantity-item.quantity);
                }
                else
                    backpack.itemGrid[stack].quantity -= quantity;
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
        font-size: 0.85rem;
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