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
                <!-- <div class='icon'>
                    <img :src="item.description.iconSrc" alt="icon">
                </div> -->
                <div class="largeIconContainer">
                    <del :class="[{grey:item.quality.qualityLv==1, green:item.quality.qualityLv==3, blue:item.quality.qualityLv==4, purple:item.quality.qualityLv==5, orange:item.quality.qualityLv==6}, 'largeIcon iconBorder']"></del>
                    <img :src="item.description.iconSrc" alt="item icon" />
                </div>
                <div class="lv" v-if="item.lvReq > 0">
                    <span :style="{color: player.lv<item.lvReq? '#f00':''}">等级: {{item.lvReq}}</span>
                </div>
            </div>
            <div class="description">
                <div class="type">
                    物品分类: {{item.description.category}}
                </div>
                <div class="baseEntry" v-html="item.description.desc">
                </div>
                <div class="extraEntry">
                    数量: {{item.quantity}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {itemConfig} from '@/assets/config/itemConfig'
export default {
    name: "itemInfo",
    mixins: [itemConfig],
    data() {
        return {
            newItem: {},
        };
    },
    mounted() {
        this.$store.globalComponent.itemInfo = this;
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
            newItem.use = this.itemType[type].use;
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
        findItemIndex(name, checkStack=false) {   
            let backpack = this.$store.globalComponent["backpack"];
            let grid = this.itemType[name].use ? backpack.useGrid: backpack.etcGrid;
            for (let i = 0; i < grid.length; i++) {
                let item = grid[i];
                if(Object.keys(item).length > 2 && item.type == name) {
                    if(!checkStack)
                        return i;
                    else if(item.quantity < this.itemType[item.type].maxStack)
                        return i;
                }
            }
            return -1;
        },
        findItem(name, checkStack=false) {        
            let backpack = this.$store.globalComponent["backpack"];
            let grid = this.itemType[name].use ? backpack.useGrid: backpack.etcGrid;
            for (let i = 0; i < grid.length; i++) {
                let item = grid[i];
                if(Object.keys(item).length > 2 && item.type == name) {
                    if(!checkStack)
                        return i;
                    else if(item.quantity < this.itemType[item.type].maxStack)
                        return i;
                }
            }
            return -1;
        },
        getItemQty(code) {            
            let backpack = this.$store.globalComponent["backpack"];
            let grid = this.itemType[code].use ? backpack.useGrid: backpack.etcGrid;
            let total = 0;
            for (let i = 0; i < grid.length; i++) {
                let item = grid[i];
                if(Object.keys(item).length > 2 && item.type == code) {
                    total += item.quantity;
                }
            }
            return total;
        },
        addItem(item, msg=false) {
            item = this.$deepCopy(item);
            let backpack = this.$store.globalComponent["backpack"];
            let grid = item.use ? backpack.useGrid : backpack.etcGrid;
            let name = item.type;
            let stack = this.findItemIndex(name, true);
            if(msg && !this.itemType[item.type].autoUse) {
                this.$store.commit("set_sys_info", {
                    type: 'reward',
                    msg: '获得物品 ',
                    item: item,
                    quantity: item.quantity
                });
            }
            if(this.itemType[item.type].autoUse) {
                let used = backpack.useItem(item, msg);
                while(used) {
                    item.quantity--;
                    used = backpack.useItem(item, msg);
                }
            }
            if(item.quantity <= 0)
                return;
            if(stack == -1) {
                for (let i = 0; i < grid.length; i++) {
                    if (Object.keys(grid[i]).length < 3) {
                        this.$set(grid, i, this.$deepCopy(item));
                        break;
                    }
                }
            }
            else {
                let remain = this.stackItem(grid[stack], item);
                if(remain > 0)
                    this.addItem(item);
            }
            let quest = this.$store.globalComponent["quest"];
            quest.trackProgress('collect', item.type, item.quantity);
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
        removeItemByCode(code, quantity) {
            let index = this.findItemIndex(code);
            let type = this.itemType[code].use ? 'use': 'etc';
            if(index != -1)
                this.removeItemByIndex(index, quantity, type);
        },
        removeItemByIndex(index, quantity, type='use') {
            let backpack = this.$store.globalComponent["backpack"];
            let quest = this.$store.globalComponent["quest"];
            let grid = type=='use' ? backpack.useGrid : backpack.etcGrid;
            let temp = grid[index];
            if(grid[index].quantity <= quantity) {
                this.$set(grid, index, {});
                this.removeItemByItem(temp, quantity-temp.quantity);
            }
            else {
                grid[index].quantity -= quantity;
                quest.trackProgress('collect', grid[index].type, quantity);
            }
        },
        removeItemByItem(item, quantity) {
            let backpack = this.$store.globalComponent["backpack"];
            let quest = this.$store.globalComponent["quest"];
            let grid = item.use ? backpack.useGrid : backpack.etcGrid;
            let name = item.type;
            let index = this.findItemIndex(name);
            if(index != -1) {
                if(grid[index].quantity <= quantity) {
                    this.$set(grid, index, {});
                    this.removeItemByItem(item, quantity-item.quantity);
                }
                else
                    grid[index].quantity -= quantity;
            }
            quest.trackProgress('collect', item.type, item.quantity);
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
    .largeIconContainer {
        left: 7px;
        top: -7px;
        margin: initial;
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