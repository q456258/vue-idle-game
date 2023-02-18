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
                    <div class="largeIconContainer"  @mouseover="showInfo($event)" @mouseleave="closeInfo(itemTemplate.itemType)">
                        <del :class="[{grey:targetQuality==0, green:targetQuality==2, blue:targetQuality==3, purple:targetQuality==4, orange:targetQuality==5}, 'largeIcon iconBorder']"></del>
                        <img v-if="targetType=='equip'" :src="itemTemplate.description.iconSrc" alt="icon" />
                        <img v-else :src="itemTemplate.description.iconSrc" alt="icon" />
                    </div>
                </div>
                <div class="craftQty" v-if="targetItem">
                    <button class="btn btn-sm btn-light" @click="minQty">&lt;&lt;&nbsp;</button>
                    <input type="number" v-model="craftQty" min="1" class="qty" />
                    <button class="btn btn-sm btn-light" @click="maxQty">&nbsp;>></button>
                </div>
                <div class="addonGrid" v-if="targetItem">
                    <div class="icon" style="cursor:pointer" @mouseover="showInfo($event, k)" @mouseleave="closeInfo()" @click="addMaterial($event, k)" @contextmenu="redMaterial($event, k)" v-for="(v, k) in reqItem" :key="k">
                        <div class="mediumIconContainer">
                            <del :class="[{grey:itemType[k].quality==1, green:itemType[k].quality==3, blue:itemType[k].quality==4, purple:itemType[k].quality==5, orange:itemType[k].quality==6}, 'mediumIcon iconBorder']"></del>
                            <img :src="itemType[k].description.iconSrc" alt="" />
                        </div>
                        <div class="quantity" :class="{'warning':itemQty[k]<reqQty[k]}">
                            {{itemQty[k]+'/'+reqQty[k]}}
                        </div>
                    </div>
                </div>
                <div class="addonGrid optional" v-if="targetItem && addons.length>0">附加：
                    <div class="icon" style="cursor:pointer" @mouseover="showInfo($event, v.name)" @mouseleave="closeInfo()" @click="applyAddon($event, k)" @contextmenu="reduceAddon($event, k)" v-for="(v, k) in addons" :key="k">
                        <div class="mediumIconContainer">
                            <del :class="[{grey:itemType[v.name].quality==1, green:itemType[v.name].quality==3, blue:itemType[v.name].quality==4, purple:itemType[v.name].quality==5, orange:itemType[v.name].quality==6}, 'mediumIcon iconBorder']"></del>
                            <img :src="itemType[v.name].description.iconSrc" alt="" />
                        </div>
                        <div class="quantity">
                            {{v.cur+'/'+v.max}}
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
                            <select v-model="craftEquipType" class="btn btn-light">
                                <option :value="k" v-for="(v, k) in craftEquipTypes" :key="k">
                                    {{v}}
                                </option>
                            </select>
                        <div class="spell" v-for="(v, k) in filteredOptions" :key="k">
                            <a v-if="targetType=='equip'" class='glowBtn' :class="{btnActive:v==targetItem}" :style="{color: itemQuality[unique[v].quality].color}" @click="selectTarget(v)">{{unique[v].description.name}}</a>
                            <a v-else class='glowBtn' :class="{btnActive:v==targetItem}" :style="{color: itemQuality[itemType[v].quality-1].color}" @click="selectTarget(v)">{{itemType[v].description.name}}</a>
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
            targetType: '',
            craftQty: 1,
            itemTemplate: null,
            addons: [],
            reqItem: {},
            itemQty: [],
            reqQty: [],
            // categFilter: ['打造','炼金','草药','矿物','皮','杂项'],
            categFilter: ['打造','矿物'],
            categFilterSelected: '打造',
            categCorres: {'打造': 'craft','炼金': 'alchemy','草药': 'herb','矿物': 'mine','皮': 'leather','杂项': 'misc'},
            craftEquipType: 'weapon',
            craftEquipTypes: {
                helmet: '头盔', shoulder: '肩膀', weapon: '武器',
                armor: '盔甲', shoe: '鞋子', glove: '手部', ring: '戒指',
                cape: '背部', bracer: '手腕', belt: '腰带', legging: '腿部',
                necklace: '项链'
            }
        };
    },
    mounted() {
        this.$store.globalComponent.craftItem = this;
        this.switchFilter("打造");
    },
    props: {
    },
    watch: {
        craftQty() {
            this.setReqQty();
        },
        targetItem() {
            this.reqItem = {};
            this.addons = [];
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let equipInfo = this.$store.globalComponent["equipInfo"];
            if(this.targetItem == null)
                this.itemTemplate = null;
            else {
                let materialList = this.materialList[this.targetItem];
                for(let i in materialList) {
                    if(i == 'optional') {
                        for(let j in materialList['optional']) {
                            let addon = {name: j};
                            addon['cur'] = 0;
                            if(materialList['optional'][j] == -1)
                                addon['max'] = '∞';
                            else
                                addon['max'] = materialList['optional'][j];
                            this.addons.push(addon);
                        }
                    }
                    else
                        this.reqItem[i] = materialList[i];
                }
                if(this.targetType == 'equip')
                    this.itemTemplate = JSON.parse(equipInfo.createUniqueEquipTemplate(this.targetItem));
                else
                    this.itemTemplate = JSON.parse(itemInfo.createItem(this.targetItem, 1));
            }
            this.getQty();
        }
    },
    computed: {
        player() {return this.$store.state.playerAttribute; },
        targetQuality() {
            if(this.targetType == 'equip')
                return this.unique[this.targetItem].quality; 
            return this.itemType[this.targetItem].quality-1; 
        },
        filteredOptions() { 
            let craftList = this.categList[this.categCorres[this.categFilterSelected]];
            let filtered = craftList.filter(item => {
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
            let quest = this.$store.globalComponent["quest"];
            // let backpack = this.$store.globalComponent["backpack"];
            // let equipInfo = this.$store.globalComponent["equipInfo"];
            // if(this.targetType == 'equip') {
            //     for(let i=0; i<this.craftQty; i++) {
            //         let newEquip = JSON.parse(equipInfo.createUniqueEquipTemplate(this.targetItem)); 
            //         backpack.giveEquip(JSON.parse(equipInfo.finishUniqueEquip(newEquip)), true, true);
            //     }
            let equipItem = ['random_common_equip','random_uncommon_equip','random_rare_equip','random_epic_equip','random_legendary_equip']
            if(equipItem.indexOf(this.targetItem) != -1) {
                this.craftEquip(equipItem.indexOf(this.targetItem)+1, this.craftEquipType);
                quest.trackProgress('event', 12, 1);
            } else {
                if(this.targetItem == 'inv_ingot_02')
                    quest.trackProgress('event', 11, this.craftQty);
                let newItem = JSON.parse(itemInfo.createItem(this.targetItem, this.craftQty));
                itemInfo.addItem(newItem, true);
            }

            this.getQty();
        },
        craftEquip(quality, type) {
            let equipInfo = this.$store.globalComponent["equipInfo"];
            let backpack = this.$store.globalComponent["backpack"];
            let lvReq = 0;
            let optional = {lv: 0};
            for(let i in this.addons) {
                let addon = this.addons[i];
                switch(addon.name) {
                    // 铜矿， 每个+5等级
                    case 'inv_ingot_02':
                        lvReq += addon.cur * 5;
                        optional.lv += addon.cur * 5;
                        break;
                    // 铁矿， 每个-1等级要求
                    case 'inv_ingot_iron':
                        lvReq -= addon.cur * 1;
                        break;
                    // 钢矿， 每个-2等级要求
                    case 'inv_ingot_steel':
                        lvReq -= addon.cur * 2;
                        break;
                    // 金矿， 每个1%提升品质
                    case 'inv_ingot_03':
                        let random = Math.random()*100;
                        if(random < addon.cur*2)
                            quality++;
                        break;
                }
            }
            let newEquip = equipInfo.createEquip(quality, lvReq, type, -1, optional);
            backpack.giveEquip(JSON.parse(newEquip), true, true);
        },
        setReqQty() {
            let qtys = [];
            for(let i in this.materialList[this.targetItem]) {
                qtys[i] = this.materialList[this.targetItem][i]*this.craftQty;
            }
            this.reqQty = qtys;
        },
        getQty() {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let qtys = [];
            for(let i in this.reqItem) {
                qtys[i] = itemInfo.getItemQty(i);
            }
            this.itemQty = qtys;
        },
        applyAddon(event, index) {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let itemQty = itemInfo.getItemQty(this.addons[index].name);
            let count = 1;
            let max = this.addons[index].max;
            if(event.shiftKey)
                count = 10;
            let target = this.addons[index].cur+count;
            target = Math.min(target, itemQty);
            if(max != '∞')
                target = Math.min(target, max);
            this.addons[index].cur = target;
        },
        reduceAddon(event, index) {
            if(event.shiftKey)
                this.addons[index].cur = 0;
            else if(this.addons[index].cur > 0)
                this.addons[index].cur -= 1;
            else
                return false;
        },
        minQty() {
            this.craftQty = 1;
        },
        maxQty() {
            let max = 9999;
            for(let i in this.materialList[this.targetItem]) {
                if(i != 'optional')
                    max = Math.min(max, this.itemQty[i]/this.materialList[this.targetItem][i]);
            }
            if(isNaN(max))
                max = 1;
            this.craftQty = max < 1 ? 1 : Math.floor(max);
        },
        checkMaterial() {
            for(let i in this.itemQty) {
                if(this.itemQty[i] < this.reqQty[i])
                    return false;
            }
            return true;
        },
        consumeMaterial() {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            for(let i in this.reqItem) {
                itemInfo.removeItemByCode(i, this.reqQty[i]);
            }
            for(let i in this.addons) {
                itemInfo.removeItemByCode(this.addons[i].name, this.addons[i].cur);
            }
        },
        switchFilter(value) {
            this.categFilterSelected = value;
            this.craftQty = 1;
            this.targetItem = this.filteredOptions[0];
            this.setReqQty();
            // 暂时移除装备打造, 留着避免后面需要
            if(false)
                this.targetType = 'equip';
            else
                this.targetType = 'item';
        },
        selectTarget(value) {
            this.targetItem = value;
            this.setReqQty();
        },
        showInfo($event, itemName, compare=true) {
            let index = this.$store.globalComponent["index"];
            if(!itemName)
                index.showInfo($event, this.itemTemplate.itemType, this.itemTemplate, compare);
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
.craftQty {
    position: absolute;
    display: flex;
    margin-top: 40%;
    width: 61%;
    justify-content: center;
    align-items: center;
    .qty {    
        display: block;
        width: 60px;
        height: 27.5px;
        padding: 0.375rem 0.5rem;
        color: #495057;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    }
}
.addonGrid {
    position: absolute;
    margin-top: 44.5%;
    width: 60%;
}
.optional {
    margin-top: 51%;
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