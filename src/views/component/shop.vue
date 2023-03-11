
<template>
	<div class="container">
        <div class="resource">
            金币: <currency :amount="playerGold"></currency> <br>
            公会名望：{{guildReputation}}<img class="guildReputationIcon">
        </div>
        <div class="shops scrollbar-morpheus-den">
            杂货店
            <div class="wrapper">
                <div class="grid" v-for="(v, k) in guildShop.generalShop[guild.shop.lv]" :key="k">
                    <div @mouseover="showInfo($event,itemType[v].itemType,itemType[v],true)" @mouseleave="closeInfo('item')">
                        <div class="mediumIconContainer">
                            <del :class="[{grey:itemType[v].quality==1, green:itemType[v].quality==3, blue:itemType[v].quality==4, purple:itemType[v].quality==5, orange:itemType[v].quality==6}, 'mediumIcon iconBorder']"></del>
                            <img :src="itemType[v].description.iconSrc" alt="" />
                        </div>
                        <div class="quantity">{{itemType[v].quantity}}</div>
                    </div>       
                    <button type="button" class="btn btn-outline-warning buy" :disabled="playerGold<itemType[v].cost" @click="buyItem(v)">购买</button>
                    <span class="itemName">
                        {{itemType[v].description.name}}
                    </span>      
                    <span :style="{color:playerGold<itemType[v].cost?'#f00':''}"><currency :amount="itemType[v].cost"></currency></span>
                </div>
            </div>
        </div>
        <div class="shops scrollbar-morpheus-den" v-if="guild['shop'].lv>1">
            名望商店
            <div class="wrapper">
                <div class="grid" v-for="(v, k) in guildShop.reputationShop[guild.shop.lv]" :key="k">
                    <div @mouseover="showInfo($event,itemType[v[0]].itemType,itemType[v[0]],true)" @mouseleave="closeInfo('item')">
                        <div class="mediumIconContainer">
                            <del :class="[{grey:itemType[v[0]].quality==1, green:itemType[v[0]].quality==3, blue:itemType[v[0]].quality==4, purple:itemType[v[0]].quality==5, orange:itemType[v[0]].quality==6}, 'mediumIcon iconBorder']"></del>
                            <img :src="itemType[v[0]].description.iconSrc" alt="" />
                        </div>
                        <div class="quantity">{{itemType[v[0]].quantity}}</div>
                    </div>       
                    <button type="button" class="btn btn-outline-warning buy" :disabled="guildReputation<v[1]" @click="buyReputationItem(v[0], v[1], 'guildReputation')">购买</button>
                    <span class="itemName">
                        {{itemType[v[0]].description.name}}
                    </span>      
                    <span :style="{color:guildReputation<v[1].cost?'#f00':''}">{{v[1]}}<img class="guildReputationIcon"></span>
                </div>
            </div>
        </div>
        <div class="shops" v-if="guild['blackmarket'].lv>0">
            黑市
            <div class="wrapper">
                <div v-for="(v, k) in equipShop" :key="k">
                    <span class="grid" v-if="v.itemType!=undefined">
                        <div @mouseover="showInfo($event,v.itemType,v,true)" @mouseleave="closeInfo('equip')">
                            <div class="mediumIconContainer" :style="{'box-shadow': 'inset 0 0 7px 2px ' + v.quality.color }">
                                <del :class="[{grey:v.quality.qualityLv==1, green:v.quality.qualityLv==3, blue:v.quality.qualityLv==4, purple:v.quality.qualityLv==5, orange:v.quality.qualityLv==6}, 'mediumIcon iconBorder']"></del>
                                <img :src="v.description.iconSrc" alt="" />
                            </div>
                        </div>
                        <button type="button" class="btn btn-outline-warning buy" :disabled="playerGold<equipCost[k]" @click="buyEquip(k)">购买</button>
                        <span class="itemName" :style="{color:v.quality.color}">
                            {{v.description.name}}
                        </span>          
                        <span :style="{color:playerGold<equipCost[k]?'#f00':''}"><currency :amount="equipCost[k]"></currency></span>
                    </span>
                </div>
                <span class="equipTimer">
                    <button type="button" class="btn btn-outline-warning"  v-if="freeRefreshCount>0" @click="freeRefresh()">免费刷新({{freeRefreshCount}})</button>
                    <button type="button" class="btn btn-outline-warning" v-else disabled @click="freeRefresh()">
                        <span class="time"><span v-if="Math.floor(equipTimerRemain%3600/60)<10">0</span>{{Math.floor(equipTimerRemain%3600/60)}}:</span>
                        <span class="time"><span v-if="equipTimerRemain%60<10">0</span>{{equipTimerRemain%60}}</span>
                    </button>
                    &nbsp;
                    <button type="button" class="btn btn-outline-warning"  :disabled="playerGold<bmRefreshCost" @click="forceRefresh(bmRefreshCost)">
                        刷新 <currency :amount="bmRefreshCost"></currency>
                    </button>
                </span>
            </div>
        </div>
	</div>
</template>
<script>

import {guildConfig} from '@/assets/config/guildConfig'
import currency from '../uiComponent/currency';
import { itemConfig } from '../../assets/config/itemConfig';
export default {
    name:"shop",
    mixins: [itemConfig, guildConfig],
    components: {currency},
    props: {
    },
    data () {
        return {
            generalShop: ['inv_alchemy_80_potion01red', 'inv_alchemy_80_potion01blue'],
            equipShop: [],
            equipCost: [],
            equipTimer: 0,
            equipTimerRemain: 600,
            freeRefreshCount: 1,
            bmRefreshCost: 10000
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
        guild() { return this.$store.state.guildAttribute; },
        playerLv() { return this.$store.state.playerAttribute.lv; },
        playerGold() { return this.$store.state.guildAttribute.gold; },
        guildReputation() { return this.$store.state.guildAttribute.reputation; },
        
    },
    methods: {
        setEquipShopItem() {
            let equipInfo = this.$store.globalComponent["equipInfo"];
            for(let i=0; i<6; i++) {
                let equip = JSON.parse(equipInfo.createEquip(-1, this.playerLv, 'random', 5));
                let cost = 100+100*Math.random();
                cost *= (1+equip.lv/15)*(1+equip.quality.extraEntryNum**3);
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
            let guild = this.$store.globalComponent["guild"];
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
                        guild.useGold(cost);
                        this.setEquipShopItem();
                    }
                });
            }
            else {
                guild.useGold(cost);
                this.setEquipShopItem();
            }
        },
        buyEquip(index) {
            if(this.playerGold < this.equipCost[index])
                return
            let guild = this.$store.globalComponent["guild"];
            guild.useGold(this.equipCost[index]);
            let backpack = this.$store.globalComponent["backpack"];
            backpack.giveEquip(this.equipShop[index], false);
            this.$set(this.equipShop, index, {});
        },
        buyItem(itemName) {
            if(this.playerGold < this.itemType[itemName].cost)
                return
            let guild = this.$store.globalComponent["guild"];
            guild.useGold(this.itemType[itemName].cost);
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let item = itemInfo.createItem(itemName, this.itemType[itemName].quantity);
            itemInfo.addItem(JSON.parse(item));
        },
        buyReputationItem(itemName, cost, reputationType) {
            let current;
            switch(reputationType) {
                case 'guildReputation':
                    current = this.guild.reputation;
                    break;
            }
            if(current < cost)
                return
            let guild = this.$store.globalComponent["guild"];
            guild.useReputation(cost, reputationType);
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
.shops {
    padding: 0.5rem;
    margin: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 1rem;
    height: 100%;
    max-height: 220px;
    overflow: auto;
    width: 50rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.wrapper {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 5px 15px 5px 15px;
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
    align-items: flex-start;
}
.equipTimer {
    width: 100%;
    text-align: right;
}

</style>
