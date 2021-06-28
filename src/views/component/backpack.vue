<template>
<draggable class="backpack">
    <template slot="header">
    </template>
    <template slot="main" >
        <a href="#" class="close" @click="closeBackpack()"></a>
        <div class="title">
            背包
        </div>    
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link active" id="equip" @click="switchTab('equip')">装备</a>
            </li>
            <li class="nav-item" v-show="playerLv >= 20">
                <a class="nav-link" id="item" @click="switchTab('item')">物品</a>
            </li>
        </ul>
        <div class="equip" v-show="displayPage=='equip'">
            <div class="grid" v-on:drop="drop($event, k)" v-on:dragover="allowDrop($event)" v-for="(v, k) in grid" :key="k">
                <div v-if="v.lv" draggable="true" v-on:dblclick="equip($event, k)" v-on:dragstart="dragStart($event,k)" v-on:dragend="dragEnd" @contextmenu.prevent="openMenu(k,$event)" @touchstart.stop.prevent="openMenu(k,$event)"  @mouseover="showInfo($event,v.itemType,v,true)" @mouseleave="closeInfo">
                    <div class="icon" :style="{'box-shadow': 'inset 0 0 7px 2px ' + v.quality.color }">
                        <img :src="v.description.iconSrc" alt="" />
                    </div>
                    <div class="lock" v-if="v.locked">
                        <img src="../../assets/icons/lock.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="item" v-show="displayPage=='item'">
            <div class="grid" v-on:drop="drop($event, k)" v-on:dragover="allowDrop($event)" v-for="(v, k) in itemGrid" :key="k">
                <div v-if="v.description" draggable="true" v-on:dblclick="useItem($event, k)" v-on:dragstart="dragStart($event,k)" v-on:dragend="dragEnd" @contextmenu.prevent="openMenu(k,$event)" @touchstart.stop.prevent="openMenu(k,$event)"  @mouseover="showInfo($event,v.itemType,v,true)" @mouseleave="closeInfo">
                    <div class="icon" :style="{'box-shadow': 'inset 0 0 7px 2px ' + v.quality.color }">
                        <img :src="v.description.iconSrc" alt="" />
                    </div>
                    <div class="quantity" v-if="v.stack">
                        {{v.quantity}}
                    </div>
                </div>
            </div>
        </div>
        <ul v-show="visible && displayPage=='equip'" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
            <li @click="equip()">装备</li>
            <li @click="equipEnhance()" v-if="guild.smith>0">强化</li>
            <li @click="equipForge()" v-if="guild.smith>=10">重铸</li>
            <li @click="equipPotential()" v-if="guild.smith>=20">洗炼</li>
            <li @click="lockEquipment(true)" v-if="!currentItem.locked">锁定</li>
            <li @click="lockEquipment(false)" v-if="currentItem.locked">解锁</li>
            <li @click="disintegrate()" v-if="guild.smith>=30 && !currentItem.locked">分解</li>
            <li @click="sellEquipment()" v-if="!currentItem.locked">出售</li>
        </ul>
        <ul v-show="visible && displayPage=='item'" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
            <li @click="useItem()">使用</li>
            <li @click="useAllItem()" v-if="itemGrid[currentItemIndex].quantity > 1">全部使用</li>
            <li @click="throwItem()">丢弃</li>
        </ul>
        <div class="footer">
            <div class="autoSellSetting" v-if="autoSellPanel">
                <div>
                    整理锁定装备
                    <span @click="setSortLocked()"><input type="checkbox" name="" v-model="sortLocked"></span>
                    ————————
                </div>
                <div v-if="guild.smith>=30">
                    自动出售优先级
                    <br>
                    <span @click="setAutoPrio('sell')"><input type="checkbox" name="" v-model="sellPrio">出售</span>
                    <span @click="setAutoPrio('dis')"><input type="checkbox" name="" v-model="disPrio">分解</span>
                    ————————
                </div>
                <!-- 若勾选会在副本获得该品质装备时自动出售 -->
                <div>
                    <span style="color:#a1a1a1;" @click="setAutoSell(0)"><input type="checkbox" name="" v-model="autoSell[0]">破旧</span>
                    <span style="color:#D9D9D9;" @click="setAutoSell(1)"><input type="checkbox" name="" v-model="autoSell[1]">普通</span>
                </div>
                <div>
                    <span style="color:#00BBFF;" @click="setAutoSell(2)"><input type="checkbox" name="" v-model="autoSell[2]">精良</span>
                    <span style="color:#BB00FF;" @click="setAutoSell(3)"><input type="checkbox" name="" v-model="autoSell[3]">完美</span>
                </div>
                <div>
                    <span style="color:#FFBB00;" @click="setAutoSell(4)"><input type="checkbox" name="" v-model="autoSell[4]">史诗</span>
                    <span style="color:#FF0000;" @click="setAutoSell(5)"><input type="checkbox" name="" v-model="autoSell[5]">传说</span>
                </div>

            </div>
            <a class="function" @click.stop="autoSellPanel = !autoSellPanel" v-show="displayPage=='equip'">
                <span>
                自动出售设置
                <!-- <i class="icon icon-setting"></i> -->
                </span>
            </a>
            <a class="function" v-show="guild.smith>=30 && displayPage=='equip'" @click="disintegrateAll()">一键分解</a>
            <a class="function" v-show="displayPage=='equip'" @click="sellAll()">一键出售</a>
            <a class="function" @click="sort()">整理背包</a>
        </div>
    </template>
</draggable>
</template>
<script>
import { assist } from '../../assets/js/assist';
import { itemEffect } from '../../assets/js/itemEffect';
import draggable from '../uiComponent/draggable';
export default {
    name: 'backpack',
    mixins: [assist, itemEffect],
    components: {draggable},
    data() {
        return {
            currentItemIndex: 0,
            currentItem: {},
            type: 'equip',
            grid: [],
            itemGrid: [],
            visible: false,
            dragging: false,
            sortLocked: false,
            autoSellPanel: false,
            autoSell: [false,false,false,false,false,false],
            sellPrio: true,
            disPrio: false,
            top: '',
            left: '',
            displayPage: 'equip'
        }
    },  
    watch: {
        visible(value) {
            if (value) {
                document.body.addEventListener("click", this.closeMenu);
            } else {
                document.body.removeEventListener("click", this.closeMenu);
            }
        },
    },
    created() {
        this.grid = new Array(54).fill({});
        this.itemGrid = new Array(54).fill({});
    },
    computed: {
        guild() { return this.$store.state.guildAttribute; },
        playerLv() { return this.$store.state.playerAttribute.lv; }
    },
    methods: {
        equip(e, k) {
            if(k != undefined) {
                this.currentItemIndex = k; 
                this.currentItem = this.grid[k];
            }
            switch (this.currentItem.itemType) {
                case 'helmet':
                    this.grid[this.currentItemIndex] = this.$store.state.playerAttribute.helmet;
                    this.$store.commit('set_player_helmet', this.currentItem);
                    break;
                case 'accessory':
                    this.grid[this.currentItemIndex] = this.$store.state.playerAttribute.accessory;
                    this.$store.commit('set_player_accessory', this.currentItem);
                    break;
                case 'weapon':
                    this.grid[this.currentItemIndex] = this.$store.state.playerAttribute.weapon;
                    this.$store.commit('set_player_weapon', this.currentItem);
                    break;
                case 'armor':
                    this.grid[this.currentItemIndex] = this.$store.state.playerAttribute.armor;
                    this.$store.commit('set_player_armor', this.currentItem);
                    break;
                case 'shoulder':
                    this.grid[this.currentItemIndex] = this.$store.state.playerAttribute.shoulder;
                    this.$store.commit('set_player_shoulder', this.currentItem);
                    break;
                case 'shoe':
                    this.grid[this.currentItemIndex] = this.$store.state.playerAttribute.shoe;
                    this.$store.commit('set_player_shoe', this.currentItem);
                    break;
                default:
                    break;
            }
        },    
        equipEnhance() {
            var index = this.findComponentUpward(this, 'index');
            index.closeInfo();
            index.enhanceEquip = this.grid[this.currentItemIndex];
            index.equipEnhancePanel = true;
        },
        equipForge() {
            var index = this.findComponentUpward(this, 'index');
            index.closeInfo();
            index.enhanceEquip = this.grid[this.currentItemIndex];
            index.equipForgePanel = true;
        },
        equipPotential() {
            var index = this.findComponentUpward(this, 'index');
            index.closeInfo();
            index.enhanceEquip = this.grid[this.currentItemIndex];
            index.equipPotentialPanel = true;
        },
        lockEquipment(lock) {
            var equip = this.grid[this.currentItemIndex];
            equip.locked = lock;
        },
        sellEquipment(index) {
            if(index == undefined)
                index = this.currentItemIndex;
            var equip = this.grid[index];
            var cost = 8+4*Math.random();
            cost *= (1+equip.lv/2)*(1+equip.enhanceLv*equip.quality.qualityCoefficient+equip.quality.extraEntryNum*2);
            cost = Math.round(cost);
            this.grid[index] = {};
            var guild = this.findBrothersComponents(this, 'guild', false)[0];
            guild.getGold('出售装备', cost);
        },
        sellEquipmentByEquip(equip) {
            var cost = 8+4*Math.random();
            cost *= (1+equip.lv/2)*(1+equip.enhanceLv*equip.quality.qualityCoefficient+equip.quality.extraEntryNum*2);
            cost = Math.round(cost);
            var guild = this.findBrothersComponents(this, 'guild', false)[0];
            guild.getGold('出售装备', cost);
        },
        disintegrate(index) {
            if(index == undefined)
                index = this.currentItemIndex;
            var equip = this.grid[index];
            var dust = ['dust2', 'dust3', 'dust4', 'dust5', 'dust6'];

            var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            var quantity = Math.ceil(equip.lv/10);
            var item = itemInfo.createItem(dust[equip.quality.qualityLv-2], quantity);  
            itemInfo.addItem(JSON.parse(item));  
            this.grid[index] = {};
            this.$store.commit("set_sys_info", {
                type: 'reward',
                msg: '分解装备获得物品: ',
                item: JSON.parse(item),
                quantity: quantity
            });
        },
        disintegrateByEquip(equip) {
            if(equip.quality.qualityLv < 2)
                return false;
            var dust = ['dust2', 'dust3', 'dust4', 'dust5', 'dust6'];

            var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            var quantity = Math.ceil(equip.lv/10);
            var item = itemInfo.createItem(dust[equip.quality.qualityLv-2], quantity);  
            itemInfo.addItem(JSON.parse(item));  
            this.$store.commit("set_sys_info", {
                type: 'reward',
                msg: '分解装备获得物品: ',
                item: JSON.parse(item),
                quantity: quantity
            });
            return true;
        },
        useItem(e, k) {
            this.closeInfo();
            if(k != undefined)
                this.currentItemIndex = k; 
            if(this.itemGrid[this.currentItemIndex].lvReq > this.playerLv) {
                this.$store.commit("set_sys_info", {
                    type: 'warning',
                    msg: '等级不足，无法使用！',
                });
                return false;
            }
            var itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            var success = this.callItemEffect(this.itemGrid[this.currentItemIndex].type);
            if(success)
                itemInfo.removeItemByIndex(this.currentItemIndex, 1);
            this.$forceUpdate();
            return success;
        },
        useAllItem(e, k){
            var autoUse = setInterval(() => {
                let used = this.useItem(e, k);
                if(!used || this.itemGrid[k] == {})
                    clearInterval(autoUse);
            }, 50);
        },
        throwItem() {
            // this.itemGrid[this.currentItemIndex] = {};
            this.$set(this.itemGrid, this.currentItemIndex, {});
        },
        giveEquip(equip, auto=true) {
            if(auto && this.autoSell[equip.quality.qualityLv-1]) {
                if(this.sellPrio || !this.disintegrateByEquip(equip))
                    this.sellEquipmentByEquip(equip);
            }
            else {
                for (let i = 0; i < this.grid.length; i++) {
                    if (Object.keys(this.grid[i]).length < 3) {
                        this.$set(this.grid, i, equip);
                        break;
                    }
                    if(i==this.grid.length-1){
                        this.sellEquipmentByEquip(equip);
                    }
                }
            }
        },
        disintegrateAll() {
            for(var i=0; i<this.grid.length; i++) {
                if(Object.keys(this.grid[i]).length > 1 && !this.grid[i].locked) {
                    if(this.grid[i].quality.qualityLv >= 2)
                        this.disintegrate(i);
                }
            }
            this.$forceUpdate();
        },    
        setAutoPrio(type) {
            switch(type) {
                case 'sell':
                    this.sellPrio = !this.sellPrio;
                    this.disPrio = !this.sellPrio;
                    break;
                case 'dis':
                    this.disPrio = !this.disPrio;
                    this.sellPrio = !this.disPrio;
            }
        },
        setAutoSell(index){
            this.$set(this.autoSell, index, !this.autoSell[index])
        },
        sellAll() {
            for(var i=0; i<this.grid.length; i++) {
                if(Object.keys(this.grid[i]).length > 1 && !this.grid[i].locked) {
                    this.sellEquipment(i);
                }
            }
            this.$forceUpdate();
        },
        setSortLocked() {
            this.sortLocked = !this.sortLocked;
        },
        sort() {
            var type = ['头盔', '肩膀', '武器', '盔甲', '鞋子', '饰品'];
            this.grid.sort((a, b) => {
                if(a == b)
                    return 0;
                if(!this.sortLocked && (a.locked || b.locked))
                    return 0;
                if(Object.keys(a).length == 0)
                    return 1;
                if(Object.keys(b).length == 0)
                    return -1;
                if(a.quality.qualityLv != b.quality.qualityLv)
                    return a.quality.qualityLv - b.quality.qualityLv;
                if(a.lv != b.lv)
                    return a.lv - b.lv;
                if(a.enhanceLv != b.enhanceLv)
                    return a.enhanceLv - b.enhanceLv;
                if(type.indexOf(a.description.type) != type.indexOf(b.description.type))
                    return type.indexOf(a.description.type) - type.indexOf(b.description.type);
            });
            this.$forceUpdate();
        },
        showInfo($event, type, item, compare) {
            if(this.dragging)
                return;
            var index = this.findComponentUpward(this, 'index');
            index.showInfo($event, type, item, compare);
        },
        closeInfo() {
            var index = this.findComponentUpward(this, 'index');
            index.closeInfo(this.displayPage);
        },
        closeBackpack() {
            var index = this.findComponentUpward(this, 'index');
            index.openMenuPanel('backpack');
        },
        openMenu(k, e) {
            this.currentItemIndex = k;
            this.currentItem = this.grid[k];
            // this.$store.commit('set_need_strengthen_equipment', this.currentItem)
            const menuMinWidth = 105;
            const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
            const offsetWidth = this.$el.offsetWidth; // container width
            const maxLeft = offsetWidth - menuMinWidth; // left boundary
            var left = e.clientX - offsetLeft + 10; // 15: margin right

            if (left > maxLeft) {
                this.left = maxLeft;
            } else {
                this.left = left;
            }

            this.top = e.clientY-this.$el.getBoundingClientRect().top;
            this.visible = true;
        },
        closeMenu() {
            this.visible = false;
        },
        dragStart(event, k)  {
            event.dataTransfer.setData("gridId", k);
            this.dragging = true;
            this.closeInfo();
        },
        dragEnd(event) {
            this.dragging = false;
        },
        allowDrop(event) {
            event.preventDefault();
        },
        drop(event, k) {
            event.preventDefault();
            var gridId = event.dataTransfer.getData("gridId");
            if(gridId) {
                switch(this.displayPage) {
                    case 'equip':
                        var temp = this.grid[gridId];
                        this.$set(this.grid, gridId, this.grid[k]);
                        this.$set(this.grid, k, temp);
                        break;
                    case 'item':
                        var temp = this.itemGrid[gridId];
                        this.$set(this.itemGrid, gridId, this.itemGrid[k]);
                        this.$set(this.itemGrid, k, temp);
                        break;
                }
            }
        },
        switchTab(type){
            if(this.displayPage != type) {
                var element = document.getElementById(this.displayPage);
                element.classList.remove('active');
                var element = document.getElementById(type);
                element.classList.add('active');
                this.displayPage = type;
            }
        },
    }
}
</script>
<style lang="scss" scoped>

.backpack {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 15px;
    background: linear-gradient(130deg, rgba(0, 0, 0, 0.7) 0%, rgb(44, 37, 24) 40%, rgb(14, 10, 6) 100%);
    width: 33rem;
    height: 31rem;
    z-index: 9;
    .title {
        position: absolute;
        top: 1.4rem;
        left: 0;
        right: 0;
        font-weight: bold;
        font-size: 1.5rem;
    }
    .equip {
        display: flex;
        flex-wrap: wrap;
        padding: 1rem 1.5rem 1.5rem 1.7rem;
        width: 33rem;
        height: 20rem;
        .grid {
            border: 1px solid rgb(72, 70, 63);
            border-radius: 0.3rem;
            background: linear-gradient(180deg, rgb(99, 87, 90) 0%, rgb(41, 33, 19) 30%, rgb(14, 10, 6) 100%);
            margin: 2px;
            height: 3rem;
            width: 3rem;
            .icon {
                width: 2.9rem;
                height: 2.9rem;
                background-color: #000;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: auto;
                border-radius: 0.3rem;
                img {
                    width:2.9rem;
                    height:2.9rem;
                    border-radius: 1rem;
                }
            }
            .lock {
                position: relative;
                top: -3.1rem;
                left: 0.9rem;
                width: 0;
                height: 0;
                border-left: 1.5rem solid transparent;
                border-right: 1.5rem solid transparent;
                border-bottom: 1.5rem solid rgba(255, 0, 0, 0.658);
                border-radius: 0.3rem;
                font-size: 0;
                line-height: 0;
                transform: rotate(45deg);
                img {
                    width: 1rem;
                    height: 0.9rem;
                    transform: rotate(-45deg) translate(-50%, -0%);
                    position: absolute;
                }
            }
        }
    }
    .item {
        display: flex;
        flex-wrap: wrap;
        padding: 1rem 1.5rem 1.5rem 1.7rem;
        width: 33rem;
        height: 20rem;
        .grid {
            border: 1px solid rgb(72, 70, 63);
            border-radius: 0.3rem;
            background: linear-gradient(180deg, rgb(99, 87, 90) 0%, rgb(41, 33, 19) 30%, rgb(14, 10, 6) 100%);
            margin: 2px;
            height: 3rem;
            width: 3rem;
            .icon {
                width: 2.9rem;
                height: 2.9rem;
                background-color: #000;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: auto;
                border-radius: 0.3rem;
                img {
                    width:2.9rem;
                    height:2.9rem;
                    border-radius: 1rem;
                }
            }
            .quantity {
                position: relative;
                top: -0.6rem;
                right: -0.8rem;
                width: 2rem;
                height: 0.5rem;
                font-size: 0.8rem;
                line-height: 0;
                text-align: right;
            }
        }
    }
    .footer {
        position: absolute;
        bottom: 2rem;
        right: 2rem;

        $pink-hot: rgb(68, 55, 55);
        $blue-sky: #3498DB;
        .function{
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            // a {
                text-decoration: none;
                color: white;
                width: 2rem;
                height: 1rem;
                background: $pink-hot;
                position: relative;
                margin: 1rem;
                top: 0.3rem;
                padding: 0.4rem;
                font-size: 1rem;
                border-radius: 10px;
                box-shadow: 0px 10px 0px 0px darken($pink-hot, 5%), 0px 0px 10px 0px #bbb;

                transition: all 0.1s;
            // }
            &:active{
                top: 0.5rem;
                box-shadow: 0px 7px 0px 0px darken($pink-hot, 5%);
            }
        }
    }
    .contextmenu {
        margin: 0;
        background: rgba(0, 0, 0, 0.575);
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #ccc;
        li {
            margin: 0;
            padding: 6px 12px;
            cursor: pointer;
            font-size: 14px;
            letter-spacing: 2px;
            background: linear-gradient(to bottom, rgb(126, 126, 126) 0%, rgb(61, 50, 33) 50%, rgb(49, 38, 27) 100%);
            box-shadow: inset 0px 0px 1px 1px rgba(20, 16, 16, 0.5);
            border-radius: 0.4rem;
            min-width: 6rem;
            height: 2.5rem; 
            margin-top: 0.05rem;
            &:hover {
                color: #fff;
                background: linear-gradient(to bottom, rgb(172, 172, 172) 0%, rgb(73, 60, 39) 50%, rgb(56, 44, 32) 100%);
            }
        }
        li::after {
            content: "";
            display: block;
            height: 0.1rem;
            position: relative;
            top: 0rem;
            left: 50%;
            transform: translateX(-50%);
            width: calc(100%);
            // background: rgb(94, 58, 58);
            border-radius: 100%;
            
            opacity: 0.7;
            background-image: linear-gradient(-270deg, rgba(167, 160, 160, 0) 0%, #ffffff93 40%, #ffffff93 60%, rgba(255,255,255,0.00) 100%);
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
    .nav {
        // background-color: #ccc;
        margin-top: 3.5rem;
        width: 100%;
        .nav-item {
            .nav-link {
                cursor: pointer;
                margin-bottom: -1px;
                border: 1px solid transparent;
                border-top-left-radius: .25rem;
                border-top-right-radius: .25rem;
                color: rgba(255, 255, 255, 0.795);
            }
            .nav-link:hover {
                color: rgb(255, 255, 255);
            }
            .active {
                color: #495057;
                background-color: #fff;
            }
            .active:hover {
                color: #495057;
            }
        }
    }
    .nav-tabs {
        // border-right: 1px solid #dee2e6;
        // border-bottom-right-radius: 0.25rem;
        border-bottom: 1px solid #e6e5de;
    }
    .autoSellSetting {
        border: 2px solid #fff5;
        margin-left: 0.5rem;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.479);
        width: 8rem;
    }

    
}
</style>