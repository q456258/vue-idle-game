<template>
    <div id="lottery">
        <div v-if="status=='wait' | status=='picking' | status=='picked' | status=='donePick'">
            <div class="rewards">
                <div class="grid" @click="takeAction($event, k)" v-for="(v, k) in rewardList" :key="k">
                    <div class="rewardIcon flipped" >
                        <div class="frontIcon" >
                            <img draggable="false" src="/icons/item/inv_box_01.jpg" alt="" />
                        </div>
                        <div v-if="!hide[k]" @mouseover="showInfo($event,v.itemType,v)" @mouseleave="closeInfo(v.itemType)" class="backIcon mediumIconContainer" :style="{'box-shadow': 'inset 0 0 7px 2px ' + v.quality.color }">
                            <del :class="[{grey:v.quality.qualityLv==1, green:v.quality.qualityLv==3, blue:v.quality.qualityLv==4, purple:v.quality.qualityLv==5, orange:v.quality.qualityLv==6}, 'mediumIcon iconBorder']"></del>
                            <img draggable="false" :src=v.description.iconSrc alt="" />
                            <!-- <span class="addonCount">
                                <img src="../../assets/icons/star.png" alt="icon" style="height: 10px; width: 10px;"  v-for="n in v.addon.length" :key="n">
                            </span> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="addonGrid"  v-if="status=='wait'">
            <div class="icon" style="cursor:pointer" @click="applyAddon($event, k)" v-for="(v, k) in addonType" :key="k">
                <img :src="v.icon" alt="" />
                <a class="clickBorder"></a>
                <div class="quantity">
                    {{itemQtys[k]}}
                </div>
                <div class="addonTips">
                    <h5>{{v.name}}</h5>
                    <div class="desc">当前:{{v.desc}}</div>
                    <div class="desc" v-if="addonType[k].max!=-1">上限:{{addons[k]+'/'+addonType[k].max}}</div>
                    <div class="desc" v-else>上限:{{'∞'}}</div>
                    <div class="footnote">
                        按住shift点击一次使用最大可使用次数
                    </div>
                </div>
            </div>
        </div> -->
        <div v-if="status=='picking' || status=='picked'">
        下一次翻奖价格: <currency :amount="cost[flipCount]"></currency>
        </div>
        <button class="btn btn-success" @click="nextStep" v-if="status!='picked' && status!='donePick'">
            <span v-if="status=='wait'">打乱</span>
            <span v-if="status=='picking'">下一步</span>
        </button>
        <button class="btn btn-success" @click="claimReward" v-if="status=='picked' || status=='donePick'">领取奖励</button>
    </div>
</template>
<script>

import {equipConfig} from '@/assets/config/equipConfig';
import currency from '../uiComponent/currency';
export default {    
    name: 'lottery',
    props: { },
    mixins: [equipConfig],
    components: {currency},
    data() {
        return {
            addons: [],
            addonType: [
                {type: 0, name: "铜锭", desc: "提升最终装备10级", icon: "/icons/material/inv_ingot_02.jpg", itemCode: 'inv_ingot_02', max: 10},
                {type: 1, name: "锡锭", desc: "随机重置所有选项类型", icon: "/icons/material/inv_ingot_05.jpg", itemCode: 'inv_ingot_05', max: -1},
                {type: 2, name: "银锭", desc: "提升最终装备品质", icon: "/icons/material/inv_ingot_01.jpg", itemCode: 'inv_ingot_01', max: 10},
                {type: 3, name: "铁锭", desc: "赋予随机3个选项额外'降低装备等级'奖励", icon: "/icons/material/inv_ingot_iron.jpg", itemCode: 'inv_ingot_iron', max: 10},
                {type: 4, name: "钢锭", desc: "赋予随机3个选项额外'提升物品等级'奖励", icon: "/icons/material/inv_ingot_steel.jpg", itemCode: 'inv_ingot_steel', max: -1},
                {type: 5, name: "金锭", desc: "随机提升3个选项的品质", icon: "/icons/material/inv_ingot_03.jpg", itemCode: 'inv_ingot_03', max: 10},
                {type: 6, name: "秘银锭", desc: "重置所有选项品质", icon: "/icons/material/inv_ingot_06.jpg", itemCode: 'inv_ingot_06', max: 10},
                // {type: 7, name: "真银锭", desc: "待定", icon: "/icons/material/inv_ingot_08.jpg", itemCode: 'inv_ingot_08', max: 10},
                {type: 8, name: "瑟银锭", desc: "随机提升3个选项的品质", icon: "/icons/material/inv_ingot_07.jpg", itemCode: 'inv_ingot_07', max: 10},
                // {type: 9, name: "黑铁锭", desc: "赋予随机3个选项额外'附加技能'奖励", icon: "/icons/material/inv_ingot_mithril.jpg", itemCode: 'inv_ingot_mithril', max: 10},
            ],
            rewardOptions: [],
            rewardList: [],
            rewards: [],
            // none, wait, picking, picked, donePick
            status: 'wait',
            flipCount: 0,
            cost: [0,0,100,500,2500,10000,40000,200000,1000000],
            hide: [],
            lv: 0,
        };
    },
    mounted() {
        this.$store.globalComponent.lottery = this;
    },
    watch: {
    },
    computed: {
        playerGold() { return this.$store.state.guildAttribute.gold; },
        itemQtys() {
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let itemQtys = [];
            for(let i=0; i<this.addonType.length; i++) {
                itemQtys[i] = itemInfo.getItemQty(this.addonType[i].itemCode);
            }
            return itemQtys;
        }
    },
    methods: {
        initLottery(rewardOptions, lv) {
            this.statusChange('wait');
            this.rewardOptions = rewardOptions;
            this.lv = lv || 0;
            let index = this.$store.globalComponent["index"];
            index.lotteryPanel = true;
            this.generateReward();
        },
        generateReward() {
            let equipInfo = this.$store.globalComponent["equipInfo"];;   
            let itemInfo = this.$store.globalComponent["itemInfo"];;
            let backpack = this.$store.globalComponent["backpack"];
            let rewardCount = 40;
            this.rewardList = [];
            this.hide = Array.from({length: rewardCount}, (_) => false);
            while(rewardCount > 0) {
                for(let i in this.rewardOptions) {
                    let ran = Math.random()*100;
                    let reward = this.rewardOptions[i];
                    if(reward[0] == 'unique_equip') {
                        if(ran <= reward[2]) {
                            let newEquip = JSON.parse(equipInfo.createUniqueEquipTemplate(reward[1]));
                            this.rewardList.push(newEquip);
                            rewardCount--;
                        }
                    }
                    else if(ran <= reward[1]) {
                        if(reward[0].indexOf('random_equip') != -1) {
                            this.rewardList.push(backpack.callItemEffect(reward[0], this.lv, {toBackpack: false}));
                        } else {
                            let qty = reward[2]==undefined ? 1 : reward[2];
                            qty = reward[3]==undefined ? qty : qty+Math.ceil(Math.random()*(reward[3]-qty));
                            let newItem = JSON.parse(itemInfo.createItem(reward[0], qty, this.lv))
                            this.rewardList.push(newItem);
                        }
                        rewardCount--;
                    }
                    if(rewardCount <= 0)
                        break;
                }
            }
        },
        applyAddon(event, index) {
            let count = 1;
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let itemQty = itemInfo.getItemQty(this.addonType[index].itemCode);
            let max = this.addonType[index].max;
            if(this.addons[index] == undefined)
                this.addons[index] = 0;
            if(max != -1 && event.shiftKey)
                count = Math.min(max-this.addons[index], itemQty);
            if(itemQty >= count) {
                if(max != -1 && this.addons[index]+count > this.addonType.max)
                    return false;
                else
                    this.addons[index] += count;
            }
            else
                return false;
            itemInfo.removeItemByIndex(itemInfo.findItemIndex(this.addonType[index].itemCode), count, 'etc');
            for(let i=0; i<count; i++) {
                switch(this.addonType[index].type) { 
                    case 0:
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                }
            }
        },
        nextStep() {
            // none, wait, picking, picked, donePick
            switch(this.status) {
                case 'wait':
                    this.startPicking();
                    this.hide.fill(true,0,this.hide.length);
                    break;
                case 'picking':
                    let list = document.getElementsByClassName('rewardIcon');
                    let group = Array.from({length: list.length}, (_, i) => i + 1);
                    for(let i=0; this.flipCount<2; i++) {
                        let ran = Math.floor(Math.random()*group.length);
                        this.displayHidden(list[ran], ran);
                        group[ran] = group[group.length-1];
                        group.pop();
                    }
                    break;
                case 'donePick':
                    break;
            }
        },
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        },
        reset() {
            this.statusChange('wait');
            let elements = document.getElementsByClassName("rewardIcon");
            for(let i=0; i<elements.length; i++) {
                elements[i].classList.add("flipped")
            }
        },
        takeAction(e, index) {
            if((this.status != 'picking' && this.status != 'picked') || this.playerGold < this.cost[this.flipCount])
                return;
            let guild = this.$store.globalComponent["guild"];
            guild.useGold(this.cost[this.flipCount]);
            let element = e.target.closest(".rewardIcon");
            this.displayHidden(element, index);
        },
        displayHidden(element, index) {
            if(element == null || element.classList.contains("flipped"))
                return;
            this.$set(this.hide, index, false)
            let reward = this.rewardList[index];
            element.classList.add('flipped');
        
            this.rewards.push(reward);
            this.flipCount += 1;
            this.statusChange('picked');
            if(this.flipCount >= this.cost.length) {
                this.statusChange('donePick');
            }
        },
        statusChange(newStatus) {
            switch(newStatus) {
                case 'wait':
                    break;
                case 'picking':
                    break;
                case 'donePick':
                    break;
                case 'none':
                    this.rewards = [];
                    this.closePanel();
                    break;
            }
            this.status = newStatus;
        },
        startPicking() {
            this.flipCount = 0;
            this.statusChange('picking');
            let elements = document.getElementsByClassName("rewardIcon");
            for(let i=0; i<elements.length; i++) {
                elements[i].classList.remove("flipped")
            }
            this.shuffleArray(this.rewardList);
        },
        claimReward() {
            let equip = ['helmet', 'weapon', 'armor', 'shoe', 'shoulder', 'glove', 'ring', 'cape', 'bracer', 'belt', 'legging', 'necklace'];
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let equipInfo = this.$store.globalComponent["equipInfo"];   
            let backpack = this.$store.globalComponent["backpack"];  
            for(let i in this.rewards) {
                let reward = this.rewards[i];
                let type = reward.itemType;
                if(equip.indexOf(type) != -1) {
                    if(reward.rating)
                        backpack.giveEquip(reward, false, true);
                    else
                        backpack.giveEquip(JSON.parse(equipInfo.finishUniqueEquip(reward)), false, true);
                }
                else
                    itemInfo.addItem(reward, true);
            }
            this.statusChange('none');
        },
        showInfo($event, type, item) {
            let index = this.$store.globalComponent["index"];
            index.showInfo($event, type, item, false);
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
            index.closeInfo('lottery');
        }
    }
}
</script>
<style lang="scss" scoped>
#lottery {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 15px;
    background: linear-gradient(130deg, rgba(0, 0, 0, 0.7) 0%, rgb(44, 37, 24) 40%, rgb(14, 10, 6) 70%);
    // width: 60rem;
    width: 48rem;
    height: 40rem;
    z-index: 9;
    
    .rewards {
        display: flex;
        flex-wrap: wrap;
        width: 520px;
        left: 0;
        right: 0;
        padding: 25px 0;
        margin: auto;
        .grid {
            height: 60px;
            width: 60px;
            border: none;
        }
    }
    .rewardIcon {
        position: relative;
        transform-style: preserve-3d;
        width: 60px;
        height: 60px;
        transition: 1s;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover .frontIcon{
	        filter: drop-shadow(0px 0px 8px rgba(252, 252, 252, 0.8));
        }
        .frontIcon {
            position: absolute;
            width: 80%;
            height: 80%;
            background: transparent;
            backface-visibility: hidden;
            z-index: 1;
            filter: grayscale(100%);
            img {
                width:100%;
                height:100%;
                border-radius: 0.4rem;
            }
        }
        .backIcon {
            position: relative;
            margin: auto;
            border-radius: 0.3rem;
            transform: rotateY(180deg);
            transition: 1s;
            .addonCount {
                position: absolute;
                width: 40px;
                height: 0px;
                top: 7px;
                left: 5px;
                display: flex;
                flex-wrap: wrap;
            }
        }
    }
}
.flipped {
    transform: rotateY(180deg);
}
.clickBorder {
    width: 40px;
    height: 40px;
    display: block;
    left: 0px;
    position: absolute;
    top: 0px;
    z-index: 20;
    &:hover{
        box-shadow: inset 0 0 10px rgb(0, 102, 255);
    }
}


</style>