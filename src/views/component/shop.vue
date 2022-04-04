
<template>
	<div class="container">
        <div class="resource">
            金币: <currency :amount="playerGold"></currency> <br>
            水晶: {{playerCrystal}} <br>
        </div>
        <div class="shops">
                水晶商城
            <div class="crystal">
                <div class="buyCrystal">
                    <input class="target" type="number" v-model="buyCrystalAmt"  @input="checkBuyRange" :max="Math.floor(playerGold/2000)" :min="0" />  
                    <button type="button" class="btn btn-outline-success" :disabled="playerGold<buyCrystalGold" @click="buyCrystal">购买水晶</button>
                    <br>
                    <span v-if="buyCrystalGold<100000">{{buyCrystalGold}}</span>
                    <span v-if="buyCrystalGold>=100000">{{buyCrystalGold/10000}}w</span>金 (1:2000)
                </div>
                <div class="sellCrystal">
                    <input class="target" type="number" v-model="sellCrystalAmt" @input="checkSellRange" :max="playerCrystal" min="0" />    
                    <button type="button" class="btn btn-outline-danger" :disabled="playerCrystal<sellCrystalAmt" @click="sellCrystal">出售水晶</button>                    
                    <br>
                    <span v-if="sellCrystalGold<100000">{{sellCrystalGold}}</span>
                    <span v-if="sellCrystalGold>=100000">{{sellCrystalGold/10000}}w</span>金 (1:500)
                </div>
            </div>
        </div>
        <div class="shops">
                杂货店
            <div class="wrapper">
                <div class="grid" v-for="(v, k) in generalShop" :key="k">
                    <div @mouseover="showInfo($event,itemType[v].itemType,itemType[v],true)" @mouseleave="closeInfo('item')">
                        <div class="mediumIconContainer">
                            <del :class="[{grey:itemType[v].quality==1, green:itemType[v].quality==3, blue:itemType[v].quality==4, purple:itemType[v].quality==5, orange:itemType[v].quality==5}, 'mediumIcon iconBorder']"></del>
                            <img :src="itemType[v].description.iconSrc" alt="" />
                        </div>
                    </div>       
                    <button type="button" class="btn btn-outline-warning buy" :disabled="playerGold<itemType[v].cost" @click="buyItem(k)">购买</button>
                    <span class="itemName">
                        {{itemType[v].description.name}}
                    </span>      
                    <span :style="{color:playerGold<itemType[v].cost?'#f00':''}"><currency :amount="itemType[v].cost"></currency></span>
                </div>
            </div>
        </div>
        <div class="shops">
                奸商
            <div class="wrapper">
                <div class="grid" v-for="(v, k) in equipShop" :key="k">
                    <div @mouseover="showInfo($event,v.itemType,v,true)" @mouseleave="closeInfo('equip')">
                        <div class="mediumIconContainer" :style="{'box-shadow': 'inset 0 0 7px 2px ' + v.quality.color }">
                            <del :class="[{grey:v.quality.qualityLv==1, green:v.quality.qualityLv==3, blue:v.quality.qualityLv==4, purple:v.quality.qualityLv==5, orange:v.quality.qualityLv==5}, 'mediumIcon iconBorder']"></del>
                            <img :src="v.description.iconSrc" alt="" />
                        </div>
                    </div>
                    <button type="button" class="btn btn-outline-warning buy" :disabled="playerGold<equipCost[k]" @click="buyEquip(k)">购买</button>
                    <span class="itemName" :style="{color:v.quality.color}">
                        {{v.description.name}}
                    </span>          
                    <span :style="{color:playerGold<equipCost[k]?'#f00':''}"><currency :amount="equipCost[k]"></currency></span>
                </div>
                <span class="equipTimer">
                    <button type="button" class="btn btn-outline-warning"  v-if="freeRefreshCount>0" @click="freeRefresh()">免费刷新({{freeRefreshCount}})</button>
                    <button type="button" class="btn btn-outline-warning" v-else disabled @click="freeRefresh()">
                        <span class="time"><span v-if="Math.floor(equipTimerRemain%3600/60)<10">0</span>{{Math.floor(equipTimerRemain%3600/60)}}:</span>
                        <span class="time"><span v-if="equipTimerRemain%60<10">0</span>{{equipTimerRemain%60}}</span>
                    </button>
                    &nbsp;
                    <button type="button" class="btn btn-outline-warning"  :disabled="playerGold<100000" @click="forceRefresh(100000)">刷新(10w金)</button>
                </span>
            </div>
        </div>
	</div>
</template>
<script>

import currency from '../uiComponent/currency';
import { itemConfig } from '../../assets/config/itemConfig';
export default {
    name:"shop",
    mixins: [itemConfig],
    components: {currency},
    props: {
    },
    data () {
        return {
            buyCrystalAmt: 0,
            sellCrystalAmt: 0,
            generalShop: ['inv_alchemy_80_potion01red', 'inv_alchemy_80_potion01blue'],
            equipShop: [],
            equipCost: [],
            equipTimer: 0,
            equipTimerRemain: 600,
            freeRefreshCount: 1
        }
    },
    mounted () {
        this.$store.globalComponent.shop = this;
        this.setEquipShopItem();
        this.equipTimer = setInterval(() => {
            this.equipTimerRemain -= 1;
            if(this.equipTimerRemain == 0) {
                this.equipTimerRemain = 600;
                if(this.freeRefreshCount < 5)
                    this.freeRefreshCount += 1
            }
        }, 1000);
    },
    watch: {
    },
    computed: {
        playerLv() { return this.$store.state.playerAttribute.lv; },
        playerGold() { return this.$store.state.guildAttribute.gold; },
        playerCrystal() { return this.$store.state.guildAttribute.crystal; },
        buyCrystalGold() { return this.buyCrystalAmt * 2000; },
        sellCrystalGold() { return this.sellCrystalAmt * 500; }
    },
    methods: {
        buyCrystal() {
            let guild = this.$store.globalComponent["guild"];
            this.$store.state.guildAttribute.gold -= this.buyCrystalGold;
            // this.$store.state.guildAttribute.crystal += parseInt(this.buyCrystalAmt);
            guild.getCrystal('外出游荡时累积', this.buyCrystalAmt);
        },
        sellCrystal() {
            let guild = this.$store.globalComponent["guild"];
            guild.getGold('', this.sellCrystalGold, false, false);
            // this.$store.state.guildAttribute.gold += this.sellCrystalGold;
            this.$store.state.guildAttribute.crystal -= this.sellCrystalAmt;
        },
        checkBuyRange(e) {
            let value = e.target.value;
            let limit = Math.floor(this.playerGold/2000);
            if(value > limit) {
                this.buyCrystalAmt = limit;
            }
            if(value < 0) {
                this.buyCrystalAmt = 0;
            }
        },
        checkSellRange(e) {
            let value = e.target.value;
            let limit = this.playerCrystal;
            if(value > limit) {
                this.sellCrystalAmt = limit;
            }
            if(value < 0) {
                this.sellCrystalAmt = 0;
            }
        },
        setEquipShopItem() {
            let equipInfo = this.$store.globalComponent["equipInfo"];
            for(let i=0; i<6; i++) {
                let equip = JSON.parse(equipInfo.createEquip(-1, this.playerLv, 'random', 5));
                let cost = 100+100*Math.random();
                cost *= (1+equip.lv/3)*(1+equip.quality.extraEntryNum**3);
                this.equipShop[i] = equip;
                this.equipCost[i] = Math.round(cost);
            }
            this.$forceUpdate();
        },
        freeRefresh() {
            if(this.freeRefreshCount <= 0)
                return
            let msg = false;
            for(let index in this.equipShop) {
                if(Object.keys(this.equipShop[index]).length == 0)
                    continue;
                if(this.equipShop[index].quality.qualityLv == 6) {
                    msg = true;
                    break;
                }
            }
            if(msg) {
                this.$message({
                    message: '有个传说装备没买, 考虑考虑?',
                    confirmBtnText: '传说装备? 狗都不买',
                    onClose: () => {
                        this.freeRefreshCount -= 1;
                        this.setEquipShopItem();
                    }
                });
            }
            else {
                this.freeRefreshCount -= 1;
                this.setEquipShopItem();
            }
        },
        forceRefresh(cost) {
            if(this.playerGold < cost)
                return
            let msg = false;
            for(let index in this.equipShop) {
                if(Object.keys(this.equipShop[index]).length == 0)
                    continue;
                if(this.equipShop[index].quality.qualityLv == 6) {
                    msg = true;
                    break;
                }
            }
            if(msg) {
                this.$message({
                    message: '有个传说装备没买, 考虑考虑?',
                    confirmBtnText: '传说装备? 狗都不买',
                    onClose: () => {
                        this.$store.state.guildAttribute.gold -= cost;
                        this.setEquipShopItem();
                    }
                });
            }
            else {
                this.$store.state.guildAttribute.gold -= cost;
                this.setEquipShopItem();
            }
        },
        buyEquip(index) {
            if(this.playerGold < this.equipCost[index])
                return
            this.$store.state.guildAttribute.gold -= this.equipCost[index];
            let backpack = this.$store.globalComponent["backpack"];
            backpack.giveEquip(this.equipShop[index], false);
            this.$set(this.equipShop, index, {});
        },
        buyItem(index) {
            let itemName = this.generalShop[index];
            if(this.playerGold < this.itemType[itemName].cost)
                return
            this.$store.state.guildAttribute.gold -= this.itemType[itemName].cost;
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let item = itemInfo.createItem(itemName, this.itemType[itemName].quantity);
            itemInfo.addItem(JSON.parse(item));
        },
        showInfo($event, type, item, compare) {
            let index = this.$store.globalComponent["index"];
            index.showInfo($event, type, item, compare);
        },
        closeInfo(type) {
            let index = this.$store.globalComponent["index"];
            index.closeInfo(type);
        },
    }
}
</script>
<style lang="scss" scoped>

.container {
    display: flex;
	flex-wrap: wrap;
    width: 50rem;
    margin: 0.5rem 0.5rem;
    padding: 0.5rem 0.5rem;
}
.resource {
    padding: 0.5rem;
    margin: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 1rem;
    height: 100%;
    width: 50rem;
}
.crystal {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 0rem 1.5rem 1.5rem 1.7rem;
    width: 100%;
    height: 5rem;
    margin-top: 0.5rem;
    .buyCrystal {
        margin: 0rem 2rem 0rem 3rem;
    }
    .target {
        width: 5rem;    
        height: 2rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 0.2rem;
        font-size: 1rem;
        background-color: #e0e8ea;
    }
}
.shops {
    padding: 0.5rem;
    margin: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 1rem;
    height: 100%;
    width: 50rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.wrapper {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 5px 15px 45px 15px;
    width: 100%;
}
.grid {
    display: flex;
    flex-wrap: wrap;
    margin: 1px;
    height: auto;
    width: 100px;
    border: none;
}
.itemName {
    width: 100%;
    text-align: start;
    font-size: 12px;
}
.buy {
    height: 33.5px;
}
.shopAction {
    display: flex;
    flex-direction: column;
    align-items: start;
}
.equipTimer {
    position:absolute;
    bottom:0;
    right:0;
}

</style>
