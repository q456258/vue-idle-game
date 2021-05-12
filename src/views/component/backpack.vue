<template>
<draggable class="backpack">
    <template slot="header">
    </template>
    <template slot="main" >
        <a href="#" class="close" @click="closeBackpack()"></a>
        <div class="title">
            背包
        </div>
        <div class="item">
            <div class="grid" v-on:drop="drop($event, k)" v-on:dragover="allowDrop($event)" v-for="(v, k) in grid" :key="k">
                <div v-if="v.lv" draggable="true" v-on:dragstart="dragStart($event,k)" v-on:dragend="dragEnd" @contextmenu.prevent="openMenu(k,$event)" @touchstart.stop.prevent="openMenu(k,$event)"  @mouseover="showInfo($event,v.itemType,v,true)" @mouseleave="closeInfo">
                    <div class="icon" :style="{'box-shadow': 'inset 0 0 7px 2px ' + v.quality.color }">
                        <img :src="v.description.iconSrc" alt="" />
                    </div>
                    <div class="lock" v-if="v.locked">
                        <img src="../../assets/icons/lock.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
            <li @click="equip()">装备</li>
            <li @click="equipEnhance()">强化</li>
            <li @click="equipForge()">重铸</li>
            <li @click="lockEquipment(true)" v-if="!currentItem.locked">锁定</li>
            <li @click="lockEquipment(false)" v-if="currentItem.locked">解锁</li>
            <li @click="sellEquipment()" v-if="!currentItem.locked">出售</li>
        </ul>
        <div class="footer">
            <a class="function" @click="sellAll()">一键出售</a>
            <a class="function" @click="sort()">整理背包</a>
        </div>
    </template>
</draggable>
</template>
<script>
import { assist } from '../../assets/js/assist';
import draggable from '../uiComponent/draggable'
export default {
    name: 'backpack',
    mixins: [assist],
    components: {draggable},
    data() {
        return {
            currentItemIndex: 0,
            currentItem: {},
            type: 'equip',
            grid: [],
            visible: false,
            dragging: false,
            top: '',
            left: '',
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
    },
    methods: {
        equip() {
            switch (this.currentItem.itemType) {
                case 'helmet':
                    this.grid[this.currentItemIndex] = this.$store.state.playerAttribute.helmet;
                    this.$store.commit('set_player_helmet', this.currentItem);
                    break;
                case 'necklace':
                    this.grid[this.currentItemIndex] = this.$store.state.playerAttribute.necklace;
                    this.$store.commit('set_player_necklace', this.currentItem);
                    break;
                case 'weapon':
                    this.grid[this.currentItemIndex] = this.$store.state.playerAttribute.weapon;
                    this.$store.commit('set_player_weapon', this.currentItem);
                    break;
                case 'armor':
                    this.grid[this.currentItemIndex] = this.$store.state.playerAttribute.armor;
                    this.$store.commit('set_player_armor', this.currentItem);
                    break;
                case 'ring':
                    this.grid[this.currentItemIndex] = this.$store.state.playerAttribute.ring;
                    this.$store.commit('set_player_ring', this.currentItem);
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
        lockEquipment(lock) {
            var equip = this.grid[this.currentItemIndex];
            equip.locked = lock;
        },
        sellEquipment(index) {
            if(index == undefined)
                index = this.currentItemIndex;
            var equip = this.grid[index];
            var cost = 8+4*Math.random();
            cost *= (1+equip.lv/10)*(1+equip.enhanceLv*equip.quality.qualityCoefficient+equip.quality.extraEntryNum*2);
            cost = Math.round(cost);
            this.grid[index] = {};
            this.$store.state.playerAttribute.GOLD += cost;
            this.$store.commit("set_sys_info", {
                type: 'reward',
                msg: '出售装备获得金币: '+cost
            });
        },
        sellAll() {
            for(var i=0; i<this.grid.length; i++) {
                if(Object.keys(this.grid[i]).length > 1 && !this.grid[i].locked) {
                    this.sellEquipment(i);
                }
            }
            this.$forceUpdate();
        },
        sort() {
            // var current = 0;
            // for(var i=0; i<this.grid.length; i++) {
            //     if(Object.keys(this.grid[current]).length > 1) {
            //         current++;
            //     } 
            //     else if(Object.keys(this.grid[i]).length > 1) {
            //         this.grid[current] = this.grid[i];
            //         this.grid[i] = {};
            //         current++;
            //     }
            // }
            this.grid.sort((a, b) => {
                if(a == b)
                    return 0;
                if(Object.keys(a).length == 0)
                    return 1;
                if(Object.keys(b).length == 0)
                    return -1;
                if(a.quality.qualityLv != b.quality.qualityLv)
                    return a.quality.qualityLv - b.quality.qualityLv;
                if(a.enhanceLv != b.enhanceLv)
                    return a.enhanceLv - b.enhanceLv;
                if(a.lv != b.lv)
                    return a.lv - b.lv;
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
            index.closeInfo('equip');
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

            this.top = e.offsetY+90;
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
                var temp = this.grid[gridId];
                this.$set(this.grid, gridId, this.grid[k]);
                this.$set(this.grid, k, temp);
            }
        }
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
    // border: 4px solid rgb(37, 32, 32);
    // padding: 1rem;
    margin: auto;
    border-radius: 15px;
    // box-shadow: 0 0 2px 2px rgba(43, 38, 38, 0.8);
    // background: rgb(43, 41, 41);
    // background: linear-gradient(90deg, rgba(43, 41, 41,1) 0%, rgba(0,0,0,1) 50%, rgba(43, 41, 41,1) 100%);
    // background: linear-gradient(90deg, rgba(40,40,40,1) 0%, rgba(60,60,60,1) 50%, rgba(40,40,40,1) 100%);
    background: linear-gradient(130deg, rgba(0, 0, 0, 0.7) 0%, rgb(44, 37, 24) 40%, rgb(14, 10, 6) 100%);
    // border-image: url("/icons/border2.png") 81 40/60px 50px/0.5rem round;
    width: 33rem;
    height: 30rem;
    .title {
        position: absolute;
        top: 1.4rem;
        left: 0;
        right: 0;
        font-weight: bold;
        font-size: 1.5rem;
    }
    .item {
        display: flex;
        flex-wrap: wrap;
        padding: 6rem 1.5rem 1.5rem 1.7rem;
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
                // right: 0;
                // bottom: 0;
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
                    // top: 30%;
                    // left: 50%;
                }
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
        background: #000;
        border: 1px solid #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #fff;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        li {
            margin: 0;
            padding: 9px 16px;
            cursor: pointer;
            border-top: 1px solid #ccc;
            margin-top: -1px;
            font-size: 14px;
            letter-spacing: 6px;
            &:hover {
                color: #ccc;
            }
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


    
}
</style>