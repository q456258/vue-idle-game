
<template>
	<div class="container">
        <div class="crystalShop">
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
        <div class="equipShop">
                奸商
            <div class="equip">
                <div class="grid" v-for="(v, k) in equipShop" :key="k">
                    <div v-if="v.lv" @mouseover="showInfo($event,v.itemType,v,true)" @mouseleave="closeInfo">
                        <div class="icon" :style="{'box-shadow': 'inset 0 0 7px 2px ' + v.quality.color }">
                            <img :src="v.description.iconSrc" alt="" />
                        </div>
                    </div>
                    <div class='name' :style="{color:v.quality.color}">
                        {{v.description.name}}
                    </div>          
                    <span v-if="v.lv">
                        <span :style="{color:playerGold<equipCost[k]?'#f00':''}">{{equipCost[k]}}金</span>
                        <br>
                        <button type="button" class="btn btn-outline-warning" :disabled="playerGold<equipCost[k]" @click="buyEquip(k)">购买</button>
                    </span>
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
import { assist } from '../../assets/js/assist';
export default {
    name:"shop",
    mixins: [assist],
    components: {},
    props: {
    },
    data () {
        return {
            buyCrystalAmt: 0,
            sellCrystalAmt: 0,
            equipShop: [],
            equipCost: [],
            equipTimer: 0,
            equipTimerRemain: 600,
            freeRefreshCount: 1
        }
    },
    mounted () {
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
            this.$store.state.guildAttribute.gold -= this.buyCrystalGold;
            this.$store.state.guildAttribute.crystal += this.buyCrystalAmt;
        },
        sellCrystal() {
            this.$store.state.guildAttribute.gold += this.sellCrystalGold;
            this.$store.state.guildAttribute.crystal -= this.sellCrystalAmt;
        },
        checkBuyRange(e) {
            var value = e.target.value;
            var limit = Math.floor(this.playerGold/2000);
            if(value > limit) {
                this.buyCrystalAmt = limit;
            }
            if(value < 0) {
                this.buyCrystalAmt = 0;
            }
        },
        checkSellRange(e) {
            var value = e.target.value;
            var limit = this.playerCrystal;
            if(value > limit) {
                this.sellCrystalAmt = limit;
            }
            if(value < 0) {
                this.sellCrystalAmt = 0;
            }
        },
        setEquipShopItem() {
            var equipInfo = this.findBrothersComponents(this, 'equipInfo', false)[0];
            for(var i=0; i<5; i++) {
                let equip = JSON.parse(equipInfo.createEquip(-1, this.playerLv, 'random', 0));
                var cost = 400+100*Math.random();
                cost *= (1+equip.lv/2)*(1+equip.quality.extraEntryNum**3);
                this.equipShop[i] = equip;
                this.equipCost[i] = Math.round(cost);
            }
            this.$forceUpdate();
        },
        freeRefresh() {
            if(this.freeRefreshCount <= 0)
                return
            var msg = false;
            for(var index in this.equipShop) {
                if(this.equipShop[index].quality.qualityLv == 6) {
                    msg = true;
                    break;
                }
            }
            if(msg) {
                this.$message({
                    message: '有个传说装备没买，考虑考虑？',
                    title: '奸商的友善提醒',
                    confirmBtnText: '传说装备？狗都不买',
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
            var msg = false;
            for(var index in this.equipShop) {
                if(this.equipShop[index].quality.qualityLv == 6) {
                    msg = true;
                    break;
                }
            }
            if(msg) {
                this.$message({
                    message: '有个传说装备没买，考虑考虑？',
                    title: '奸商的友善提醒',
                    confirmBtnText: '传说装备？狗都不买',
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
            var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            backpack.giveEquip(this.equipShop[index]);
            this.$set(this.equipShop, index, {});
        },
        showInfo($event, type, item, compare) {
            var index = this.findComponentUpward(this, 'index');
            index.showInfo($event, type, item, compare);
        },
        closeInfo() {
            var index = this.findComponentUpward(this, 'index');
            index.closeInfo('equip');
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
.crystalShop {
    padding: 0.5rem;
    margin: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 1em;
    height: 100%;
    width: 50rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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
}
.equipShop {
    padding: 0.5rem;
    margin: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.404);
    border-radius: 1em;
    height: 100%;
    width: 50rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .equip {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        padding: 0rem 1.5rem 3rem 1.7rem;
        width: 100%;
        height: 12rem;
        .grid {
            // border: 1px solid rgba(255, 255, 255, 0.404);
            // border-radius: 0.3rem;
            margin: 0.5rem;
            height: 9rem;
            width: 7rem;
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
        }
    }
    .equipTimer {
        position:absolute;
        bottom:0;
        right:0;
    }
}
</style>
