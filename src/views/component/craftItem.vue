<template>
    <draggable class="equipPanel">
        <template slot="header">
        </template>
        <template slot="main" >
            <div>
                <span class="title">· 锻造 ·</span>
                <div class="info" v-if="itemTemplate">
                    <div class="name" :style="{color:itemQuality[targetQuality].color}">
                        <span v-if="targetType=='equip'">{{ itemTemplate.description.name }}</span>
                        <span v-else>{{ itemTemplate.description.name }}</span>
                    </div>
                    <div class="largeIconContainer"  @mouseover="showInfo($event)" @mouseleave="closeInfo(targetItem)">
                        <del :class="[{grey:targetQuality==0, green:targetQuality==2, blue:targetQuality==3, purple:targetQuality==4, orange:targetQuality==5}, 'largeIcon iconBorder']"></del>
                        <img v-if="targetType=='equip'" :src="itemTemplate.description.iconSrc" alt="icon" />
                        <img v-else :src="itemTemplate.description.iconSrc" alt="icon" />
                    </div>
                </div>
                <div class="addonGrid" v-if="targetItem">
                    <div class="icon" style="cursor:pointer" @mouseover="showInfo($event, k)" @mouseleave="closeInfo(k)" @click="addMaterial($event, k)" @contextmenu="redMaterial($event, k)" v-for="(v, k) in materialList[targetItem]" :key="k">
                        <div class="mediumIconContainer" :style="{'box-shadow': 'inset 0 0 7px 2px ' + itemQuality[itemType[k].quality].color }">
                            <del :class="[{grey:itemType[k].quality==1, green:itemType[k].quality==3, blue:itemType[k].quality==4, purple:itemType[k].quality==5, orange:itemType[k].quality==6}, 'mediumIcon iconBorder']"></del>
                            <img :src="'./icons/material/'+k+'.jpg'" alt="" />
                        </div>
                        <div class="quantity" :class="{'warning':itemQty[k]<v}">
                            {{itemQty[k]+'/'+v}}
                        </div>
                    </div>
                </div>
                <div class="craftSelect">
                    <ul class="craftCateg nav">
                        <li class="vertical-nav-item nav-item" v-for="(v, k) in categFilter" :key=k>
                            <a class="vertical-nav-link nav-link" :class="{active: categFilterSelected==v}" id="charInfo" @click="switchFilter(v)">{{v}}</a>
                        </li>
                    </ul>
                    <div class="craftList scrollbar-morpheus-den">
                        <div class="spell" v-for="(v, k) in filteredOptions" :key="k">
                            <a v-if="targetType=='equip'" class='glowBtn' :class="{btnActive:v==targetItem}" :style="{color: itemQuality[unique[v].quality].color}" @click="selectTarget(v)">{{unique[v].description.name}}</a>
                            <a v-else class='glowBtn' :class="{btnActive:v==targetItem}" :style="{color: itemQuality[itemType[v].quality].color}" @click="selectTarget(v)">{{itemType[v].description.name}}</a>
                        </div>
                    </div>
                </div>
                <div class="confirm" @click="craft()">
                    锻造
                </div>
                <div class="cancel" @click="closePanel()">
                    取消
                </div>
            </div>
        </template>
    </draggable>
</template>
<script>


import { itemConfig } from '../../assets/config/itemConfig';
import { equipConfig } from '../../assets/config/equipConfig';
import { craftConfig } from '../../assets/config/craftConfig';
import draggable from '../uiComponent/draggable'
export default {
    name: "craftItem",
    mixins: [itemConfig, equipConfig, craftConfig],
    components: {draggable},
    data() {
        return {
            targetItem: null,
            targetType: 'equip',
            itemTemplate: null,
            itemQty: [],
            categFilter: ['裁缝','打造','炼金','草药','矿物','皮','杂项'],
            categFilterSelected: '裁缝',
            categCorres: {'裁缝': 'tailor','打造': 'craft','炼金': 'alchemy','草药': 'herb','矿物': 'mine','皮': 'leather','杂项': 'misc'},
        };
    },
    mounted() {
        this.$store.globalComponent.craftItem = this;
        // this.targetItem = 'inv_ingot_02';
    },
    props: {
    },
    watch: {
        targetItem() {
            this.getQty();
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let equipInfo = this.$store.globalComponent["equipInfo"];
            if(this.targetItem == null)
                this.itemTemplate = null;
            else if(this.targetType == 'equip')
                this.itemTemplate = JSON.parse(equipInfo.createUniqueEquipTemplate(this.targetItem));
            else
                this.itemTemplate = JSON.parse(itemInfo.createItem(this.targetItem, 1));
        }
    },
    computed: {
        targetQuality() {
            if(this.categFilterSelected=='裁缝' || this.categFilterSelected=='打造')
                return this.unique[this.targetItem].quality; 
            return this.itemType[this.targetItem].quality; 
        },
        filteredOptions() { 
            let craftList = this.categList[this.categCorres[this.categFilterSelected]];
            let filtered = craftList.filter(s => {
                // 筛选已学习、未学习
                return true;
            });
            return filtered;
        },
    },
    methods: {
        craft() {
            if(!this.checkMaterial())
                return;
            this.consumeMaterial();

            let itemInfo = this.$store.globalComponent["itemInfo"];
            let backpack = this.$store.globalComponent["backpack"];
            let equipInfo = this.$store.globalComponent["equipInfo"];
            if(this.targetType == 'equip') {
                let newEquip = JSON.parse(equipInfo.createUniqueEquipTemplate(this.targetItem)); 
                backpack.giveEquip(newEquip, true, true);
            } else {
                let newItem = JSON.parse(itemInfo.createItem(this.targetItem, 1));
                itemInfo.addItem(newItem, true);
            }

            this.getQty();
        },
        getQty() {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let qtys = [];
            for(let i in this.materialList[this.targetItem]) {
                qtys[i] = itemInfo.getItemQty(i);
            }
            this.itemQty = qtys;
        },
        checkMaterial() {
            for(let i in this.itemQty) {
                if(this.itemQty[i] < this.materialList[this.targetItem][i])
                    return false;
            }
            return true;
        },
        consumeMaterial() {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            for(let i in this.materialList[this.targetItem]) {
                itemInfo.removeItemByCode(i, this.materialList[this.targetItem][i]);
            }
        },
        switchFilter(value) {
            this.categFilterSelected = value;
            this.targetItem = this.categList[this.categCorres[this.categFilterSelected]][0];
            if(value=='裁缝' || value=='打造')
                this.targetType = 'equip';
            else
                this.targetType = 'item';
        },
        selectTarget(value) {
            this.targetItem = value;
        },
        showInfo($event, itemName, compare=true) {
            let index = this.$store.globalComponent["index"];
            if(itemName == null)
                index.showInfo($event, this.targetType, this.itemTemplate, compare);
            else {
                let item = this.itemType[itemName];
                let type = item.type;
                index.showInfo($event, type, item, compare);
            }
        },
        closeInfo(type) {
            let index = this.$store.globalComponent["index"];
            let equip = ['helmet', 'weapon', 'armor', 'shoe', 'shoulder', 'glove', 'ring', 'cape', 'bracer', 'belt', 'legging', 'necklace'];

            if(equip.indexOf(type) != -1)
                index.closeInfo('equip');
            else
                index.closeInfo('item');
        },
        closePanel() {
            let index = this.$store.globalComponent["index"];
            index.closeInfo('craft');
        }
    }
}
</script>
<style lang="scss" scoped>

.craftSelect {
    position: absolute;
    margin-left: 55%;
    margin-top: 10%;
    width: 50%;
    height: 55%;
    display: flex;
    .craftCateg {
        width: 60px;
        border-right: 1px solid #e6e5de;
    }
    .craftList {
        height: 100%;
        width: 220px;
        overflow-y: auto;
    }
}
.addonGrid {
    position: absolute;
    margin-top: 45%;
    width: 60%;
}
a.glowBtn{
	line-height: 2rem;
	text-shadow: 0 1px 0 rgba(255, 255, 255, 0.1);
}
a.glowBtn:after{
	top: -0.4rem;
	left: -6.8rem;
	width: 13.6rem;
	height: 1.8rem;
	background:rgba(40, 24, 21, 0);
}
a.glowBtn:active:after, a.btnActive:after,a.btnActive:hover:after {
	background:rgba(153, 153, 153, 0.74);
}
</style>