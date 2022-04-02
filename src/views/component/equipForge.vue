<template>
<draggable class="equip">
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
                <del :class="[{grey:equip.quality.qualityLv==1, green:equip.quality.qualityLv==3, blue:equip.quality.qualityLv==4, purple:equip.quality.qualityLv==5, orange:equip.quality.qualityLv==5}, 'largeIcon iconBorder']"></del>
                <img :src="equip.description.iconSrc" alt="icon" />
            </div>
        </div>
        <div class="forge">
            <div class="extraEntry" v-if="equip.extraEntry">
                <!-- <div v-for="(v, k) in equip.extraEntry" :key="v.id" @click="forge(v, k)"> -->
                <div v-for="(v, k) in equip.extraEntry" :key="v.id" @click="lock(v, k)">
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
            消耗<img src="/icons/item/inv_enchant_voidsphere.jpg">&nbsp;{{cost}}/{{itemQty}}
        </span>
        <div class="confirm" @click="forgeAll()">
            重铸
            <span ref="info"></span>
        </div>
        <div class="cancel" @click="closeInfo()">
            取消
        </div>
    </div>
    </template>
</draggable>
</template>
<script>

import draggable from '../uiComponent/draggable'
export default {
    name: "equipForge",
    mixins: [],
    components: {draggable},
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
            return this.itemQty < this.cost;
        },
        item() {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let backpack = this.$store.globalComponent["backpack"];
            // 虚空宝珠
            let item = itemInfo.findItem('inv_enchant_voidsphere');
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
            if(this.warning) {
                return;
            }
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let equipInfo = this.$store.globalComponent["equipInfo"];
            itemInfo.removeItemByItem(this.item, this.cost);
            // equipInfo.forgeAll(this.equip);
            let allLocked = true;
            for(let entry in this.equip.extraEntry) {
                if(!this.equip.extraEntry[entry].locked)
                    allLocked = false;
            }
            if(allLocked) {
                this.forgeInfo("全锁上了你重铸个锤子? ", '')
            }
            for(let entry in this.equip.extraEntry) {
                if(!this.equip.extraEntry[entry].locked)
                    equipInfo.forgeEntry(this.equip, entry);
            }
            this.$store.commit('set_player_attribute');
        },
        forge(entry, key) {       
            if(entry.locked) {
                return;
            }
            let equipInfo = this.$store.globalComponent["equipInfo"];
            equipInfo.forgeEntry(this.equip, key);
            this.$store.commit('set_player_attribute');
        },
        lock(entry, key) {
            if(entry.locked == undefined)
                entry.locked = true;
            else
                entry.locked = !entry.locked;
            this.computeCost();
        },
        computeCost() {
            let cost = 0;
            for(let entry in this.equip.extraEntry) {
                cost += 1;
                if(this.equip.extraEntry[entry].locked)
                    cost += 1;
            }
            this.cost = cost;
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
        .largeIconContainer {
            position: relative;
            top: 12rem;
            left: 2.5rem;
        }
    }
    .forge {
        position: absolute;
        margin-left: 55%;
        margin-top: 10%;
        width: 53%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        .extraEntry {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 60%;
            color: #68d5ed;
            .locked {
                float:right;
            }
            // .value {
                // color: #ccc;
                // &:hover {
                //     box-shadow: inset 0 0 7px 7px #a1a1a1a2;
                // }
            // }
        }
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
    .warning {
        color: #D8000C;
    }
    .cost {
        position: absolute;
        top: 19rem;
        left: 35rem;
        bottom: 1.2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        img {
            height: 2rem;
            width: 2rem;
        }
    }    
}
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