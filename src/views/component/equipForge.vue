<template>
<draggable class="equipPanel">
    <template slot="header">
    </template>
    <template slot="main" >
    <div v-if="equip.quality">
        <span class="title">· 锻造 ·</span>
        <div class="info">
            <div class="name" :style="{color:equip.quality.color}">
                {{ equip.description.name }}
            </div>
            <div class="largeIconContainer">
                <del :class="[{grey:equip.quality.qualityLv==1, green:equip.quality.qualityLv==3, blue:equip.quality.qualityLv==4, purple:equip.quality.qualityLv==5, orange:equip.quality.qualityLv==6}, 'largeIcon iconBorder']"></del>
                <img :src="equip.description.iconSrc" alt="icon" />
            </div>
        </div>
        <div class="forge">
            <div class="extraEntry" v-if="equip.extraEntry">
                <!-- <div v-for="(v, k) in equip.extraEntry" :key="v.id" @click="forge(v, k)"> -->
                <div v-for="(v, k) in equip.extraEntry" :key="v.id" @click="forge(v, k)">
                    <!-- <div>{{v.name}} : {{v.showVal}}</div> -->
                    <button class="btn btn-snake-border"  :class="v.qualityLv">
                        <span class="locked" v-show="v.locked"><img src="../../assets/icons/lock.png" alt=""></span>
                        <div class="btn-borders">
                            <div class="border-top"></div>
                            <div class="border-right"></div>
                            <div class="border-bottom"></div>
                            <div class="border-left"></div>
                        </div>
                        <div :class="'value ' + v.qualityLv+'text'">{{v.name}} : {{v.showVal}}<span style="font-size: 0.7rem;">&nbsp;({{v.quality+'%'}})</span></div>
                        
                    </button>
                </div>
            </div>

        </div>
        <!-- <span class="cost" :class="{'warning':warning}">消耗金币: {{cost}}</span> -->
        <span class="cost" :class="{'warning':warning}">
            <!-- 消耗<img src="/icons/item/inv_enchant_voidsphere.jpg">&nbsp;{{cost}}/{{itemQty}} -->
            消耗<currency :amount="cost"></currency>
        </span>
        <div class="confirm actions image_button" @click="forgeAll()">
            重铸
            <span ref="info"></span>
        </div>
        <div class="cancel actions image_button" @click="closeInfo()">
            取消
        </div>
    </div>
    </template>
</draggable>
</template>
<script>

import draggable from '../uiComponent/draggable'
import currency from '../uiComponent/currency';
export default {
    name: "equipForge",
    mixins: [],
    components: {draggable, currency},
    data() {
        return {
            cost: 1,
            has: 0
        };
    },
    props: {
        equip: {
            type:Object
        }
    },
    mounted() {
        this.$store.globalComponent.equipForge = this;
    },
    watch: {
        equip() {
            this.computeCost();
        }
    },
    computed: {     
        warning() {
            return this.$store.state.guildAttribute.gold < this.cost;
            // return this.itemQty < this.cost;
        },
        item() {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let backpack = this.$store.globalComponent["backpack"];
            // 虚空宝珠
            let item = itemInfo.findItemIndex('inv_enchant_voidsphere');
            if(item == -1)
                return {quantity: 0};
            else
                return item.use ? backpack.useGrid[item] : backpack.etcGrid[item];
        },
        itemQty() {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            // 虚空宝珠
            let qty = itemInfo.getItemQty('inv_enchant_voidsphere');
            return qty;
        }
    },
    methods: {
        forgeAll() {
            if(this.warning || this.equip.extraEntry.length == 0) {
                return;
            }
            this.$store.state.guildAttribute.gold -= this.cost;
            // let itemInfo = this.$store.globalComponent["itemInfo"];
            let equipInfo = this.$store.globalComponent["equipInfo"];
            // itemInfo.removeItemByItem(this.item, this.cost);
            // equipInfo.forgeAll(this.equip);
            let allLocked = true;
            let anyLocked = false;
            for(let entry in this.equip.extraEntry) {
                if(this.equip.extraEntry[entry].locked)
                    anyLocked = true;
                if(!this.equip.extraEntry[entry].locked)
                    allLocked = false;
            }
            if(!anyLocked && this.equip.quality.qualityLv == 4) {
                // 无锁定并且目标是蓝装的情况下，重置装备的词条数量
                this.equip.extraEntry = equipInfo.createExtraEntry(this.equip);
            }
            if(allLocked) {
                this.forgeInfo("全锁上了你重铸个锤子? ", '')
            }
            for(let entry in this.equip.extraEntry) {
                if(!this.equip.extraEntry[entry].locked)
                    equipInfo.forgeEntry(this.equip, entry);
            }
            this.$store.commit('set_player_attribute');
            let quest = this.$store.globalComponent["quest"];
            quest.trackProgress('event', 6, 1);
        },
        // 重铸单个词条
        forge(entry, key) {       
            if(entry.locked || this.warning) {
                return;
            }
            this.$store.state.guildAttribute.gold -= this.cost;
            let equipInfo = this.$store.globalComponent["equipInfo"];
            equipInfo.forgeEntry(this.equip, key);
            this.$store.commit('set_player_attribute');
            let quest = this.$store.globalComponent["quest"];
            quest.trackProgress('event', 6, 1);
        },
        // 锁定词条, 未被使用
        lock(entry, key) {
            if(entry.locked == undefined)
                entry.locked = true;
            else
                entry.locked = !entry.locked;
            this.computeCost();
        },
        computeCost() {
            let cost = 15+this.equip.lv**2/7;
            cost = cost*1.2**this.equip.quality.qualityLv;
            for(let entry in this.equip.extraEntry) {
                if(this.equip.extraEntry[entry].locked)
                    cost *= 1.5;
            }
            this.cost = Math.round(cost);
        },
        forgeInfo(info, type) {
            let element = this.$refs['info'];
            let node = document.createElement("DIV");
            let textnode = document.createTextNode(info);
            node.appendChild(textnode);
            element.appendChild(node); 
            node.style.position = 'absolute';
            node.style.width = '10rem';
            node.style.color = type=='success'?'#0f0' : '#f00';
            node.style.top = '-0.5rem';
            node.style.left = '-1rem';
            node.animate([{transform: 'translate(0px)', opacity: 1},
                {transform: 'translate(' + (0) + 'px, '+ (-50) + 'px)', opacity: 0.5}], { duration: 1000, ease:'ease-in', iterations: 1});
            setTimeout(()=>{
                element.removeChild(node);
            },900);
        },
        closeInfo() {
            let index = this.$store.globalComponent["index"];
            index.closeInfo('forge');
        },
    }
}
</script>
<style lang="scss" scoped>
$blue: #ccc;
.Etext {
    color: #D9D9D9A2;
}
.Dtext {
    color: #ccc;
}
.Ctext {
    color: #00bbffc5;
}
.Btext {
    color: #bb00ff;
}
.Atext {
    color: #ff9900b7;
}
.Stext {
    color: #ff0000d3;
}
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
        // .btn-borders {
            // 会导致其他文字模糊
            // display: flex !important;
        // }
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

</style>