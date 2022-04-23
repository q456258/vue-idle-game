<template>
    <div class="craftEquip" v-if="status!='none'">
        <div class="progress_container">
            <div id="craft_progress" class="progress-bar"></div>
            <div class="craft_progress_circle craft_active">选择<br>材料</div>
            <div class="craft_progress_circle">抽取<br>属性</div>
            <div class="craft_progress_circle">选择<br>属性</div>
            <div class="craft_progress_circle">开始<br>打造</div>
        </div>
        <button class="btn btn-success" :disabled="status=='picked'" @click="nextStep" v-if="status!='crafting' & status!='done'">下一步</button>
        <button class="btn btn-success" @click="craftEquip" v-if="status=='done'">提取装备</button>
        <div class="addonGrid"  v-if="status=='wait'">
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
        </div>
        <div v-if="status=='wait' | status=='picking' | status=='picked' | status=='donePick'">
            <div>
                <div>
                    <span :style="{'color':quality[index].color}" v-for="(value, index) in baseQuality" :key="index">
                        {{value+'%'}}&nbsp;
                    </span>
                </div>
                等级: {{this.finalEquip.lv}}&nbsp;
                剩余次数: {{remain}}
            </div>
            <div class="rewards">
                <div class="grid" @click="takeAction($event, k)" v-for="(v, k) in rewardList" :key="k">
                    <div class="craftRewardIcon flipped" >
                        <div class="frontIcon" >
                            <img draggable="false" src="/icons/other/Trade_blacksmithing.png" alt="" />
                        </div>
                        <div :class="[{purpleGlow: v.quality==1,goldGlow: v.quality==2},'backIcon']">
                            <img draggable="false" :src=v.icon alt="" />
                            <span class="addonCount">
                                <img src="../../assets/icons/star.png" alt="icon" style="height: 10px; width: 10px;"  v-for="n in v.addon.length" :key="n">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="status=='order'">
            <div class="rewardSelect">
                <div class="selectedReward" v-on:drop="drop($event,'add')" v-on:dragover="allowDrop($event)">
                    <div>保留</div>
                    <div class="hideScroll">
                        <div class="rewardContainer">
                            <div :class="[{greyQuality:v.quality==0,purpleQuality:v.quality==1,goldQuality:v.quality==2},'reward']" draggable="true" v-on:click="move($event,k,'add')" v-on:dragstart="dragStart($event,k,'add')" @drop.stop.prevent v-on:drop="swap($event,k,'add')" v-on:dragover="allowDrop($event)" v-for="(v, k) in rewards" :key="k">
                                <img class="smallIcon" :src="v.icon" alt="" /> 
                                <div class="rewardDesc">{{v.desc}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="forfeitReward" v-on:drop="drop($event,'forfeit')" v-on:dragover="allowDrop($event)">
                    <div>移除</div>
                    <div class="hideScroll">
                        <div class="rewardContainer">
                            <div :class="[{greyQuality:v.quality==0,purpleQuality:v.quality==1,goldQuality:v.quality==2},'reward']" draggable="true" v-on:click="move($event,i,'forfeit')" v-on:dragstart="dragStart($event,i,'forfeit')" @drop.stop.prevent v-on:drop="swap($event,i,'forfeit')" v-on:dragover="allowDrop($event)" v-for="(v, i) in forfeitRewards" :key="i">
                                <img class="smallIcon" :src="v.icon" alt="" /> 
                                <div class="rewardDesc">{{v.desc}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="status=='crafting' | status=='done'">
            <div class="rewardSelect">
                <div class="selectedReward">
                    <div class="hideScroll">
                        <div class="rewardContainer">
                            <div :class="[{greyQuality:v.quality==0,purpleQuality:v.quality==1,goldQuality:v.quality==2},'reward']"  v-for="(v, k) in rewards" :key="k">
                                <img class="smallIcon" :src="v.icon" alt="" /> 
                                <div class="rewardDesc">{{v.desc}}</div>
                                <div :class="[{'fail':!v.success},'progress craftProgress']" :style="{width:v.cur/v.max*100+'%'}">{{forceupdate}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import {equipConfig} from '@/assets/config/equipConfig'
export default {    
    name: 'craftEquip',
    props: {
    },
    mixins: [equipConfig],
    data() {
        return {
            addons: [],
            addonType: [
                {type: 0, name: "铜锭", desc: "提升最终装备10级", icon: "/icons/material/inv_ingot_02.jpg", itemCode: 'inv_ingot_02', max: 10},
                {type: 1, name: "锡锭", desc: "随机重置所有选项类型", icon: "/icons/material/inv_ingot_05.jpg", itemCode: 'inv_ingot_05', max: -1},
                {type: 2, name: "银锭", desc: "提升最终装备品质", icon: "/icons/material/inv_ingot_01.jpg", itemCode: 'inv_ingot_01', max: 10},
                {type: 3, name: "铁锭", desc: "赋予随机3个选项额外'降低装备等级'奖励", icon: "/icons/material/inv_ingot_iron.jpg", itemCode: 'inv_ingot_iron', max: 10},
                {type: 4, name: "钢锭", desc: "赋予随机3个选项额外'提升装备等级'奖励", icon: "/icons/material/inv_ingot_steel.jpg", itemCode: 'inv_ingot_steel', max: -1},
                {type: 5, name: "金锭", desc: "赋予随机3个选项额外'降低装备品质'奖励", icon: "/icons/material/inv_ingot_03.jpg", itemCode: 'inv_ingot_03', max: 10},
                {type: 6, name: "秘银锭", desc: "随机提升3个选项的品质", icon: "/icons/material/inv_ingot_06.jpg", itemCode: 'inv_ingot_06', max: 10},
                // {type: 7, name: "真银锭", desc: "待定", icon: "/icons/material/inv_ingot_08.jpg", itemCode: 'inv_ingot_08', max: 10},
                {type: 8, name: "瑟银锭", desc: "赋予随机3个选项额外'降低装备品质'奖励", icon: "/icons/material/inv_ingot_07.jpg", itemCode: 'inv_ingot_07', max: 10},
                // {type: 9, name: "黑铁锭", desc: "赋予随机3个选项额外'附加技能'奖励", icon: "/icons/material/inv_ingot_mithril.jpg", itemCode: 'inv_ingot_mithril', max: 10},
            ],
            rewardType: [
                // // 装备属性随机1-3条带以下属性
                // {type: 'HP', icon: "./icons/stat/hp.jpg", desc: "潜能: 生命"},
                // {type: 'MP', icon: "./icons/stat/mp.jpg", desc: "潜能: 魔法"},
                {type: 'STR', icon: "./icons/stat/str.jpg", desc: "潜能: 力量"},
                {type: 'AGI', icon: "./icons/stat/agi.jpg", desc: "潜能: 敏捷"},
                {type: 'INT', icon: "./icons/stat/int.jpg", desc: "潜能: 智力"},
                {type: 'STA', icon: "./icons/stat/sta.jpg", desc: "潜能: 耐力"},
                {type: 'SPI', icon: "./icons/stat/spi.jpg", desc: "潜能: 精神"},
                {type: 'ALL', icon: "./icons/stat/all.png", desc: "潜能: 全属性"},
                // {type: 'CRIT', icon: "./icons/stat/crit.jpg", desc: "潜能: 暴击率"},
                // {type: 'CRITDMG', icon: "./icons/stat/critdmg.jpg", desc: "潜能: 暴击伤害"},
                // {type: 'ATK', icon: "./icons/stat/atk.jpg", desc: "潜能: 攻击"},
                // {type: 'DEF', icon: "./icons/stat/arm.jpg", desc: "潜能: 护甲"},
                // {type: 'SUNDER', icon: "./icons/stat/sunder.jpg", desc: "潜能: 破甲"},
                // {type: 'BLOCK', icon: "./icons/stat/block.jpg", desc: "潜能:格挡"},
                // 装备品质提升1-3
                {type: 'quality', icon: "./icons/craft/Inv_stone_01.png", desc: "提升品质"},
                // 装备等级提升
                {type: 'lv', icon: "./icons/craft/inv_jewelry_necklace_11.png", desc: "提升等级"},
                // 装备等级需求降低
                {type: 'lvReq', icon: "./icons/craft/inv_misc_book_08.png", desc: "降低等级需求"},
                // 基础属性上限提升
                {type: 'extraStat', icon: "./icons/craft/inv_misc_gem_sapphire_01.png", desc: "提升主潜属性上限"},
                // 基础属性提升
                {type: 'baseStat', icon: "./icons/craft/Inv_stone_03.png", desc: "提升主潜属性"},
            ],
            rewardList: [],
            rewards: [],
            forfeitRewards: [],
            finalEquip: {
                mainPotCount: 0,
                mainPotSuccess: 0,
                mainPot: [],
                subPot: [],
                lv: 0,
                lvReq: 0,
                quality: 0,
                baseStatBoost: 0,
                extraStatBoost: 0
            },
            baseQuality: [100,0,0,0,0,0],
            // none, wait, picking, picked, donePick, order, crafting, done
            status: 'none',
            remain: 0,
            forceupdate: 1
        };
    },
    mounted() {
        this.$store.globalComponent.craftEquip = this;
        this.initReward();
    },
    watch: {
    },
    computed: {
        itemQtys() {
            let guild = this.$store.globalComponent["guild"];
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let itemQtys = [];
            for(let i=0; i<this.addonType.length; i++) {
                itemQtys[i] = itemInfo.getItemQty(this.addonType[i].itemCode);
            }
            return itemQtys;
        }
    },
    methods: {
        applyAddon(event, index) {
            let count = 1;
            let guild = this.$store.globalComponent["guild"];
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
                        this.addLv(10);
                        break;
                    case 1:
                        this.resetTypes();
                        break;
                    case 2:
                        this.increaseBaseQuality();
                        break;
                    case 3:
                        this.addAdditional('lvReq');
                        break;
                    case 4:
                        this.addAdditional('lv');
                        break;
                    case 5:
                        this.addAdditional('quality');
                        break;
                    case 6:
                        this.resetQuality();
                        break;
                    case 7:
                        // 待定
                        break;
                    case 8:
                        this.increaseQuality();
                        break;
                    case 9:
                        // 附加技能, 待定
                        break;
                }
            }
        },
        resetTypes(){
            for(let k in this.rewardList) {
                let reward = this.rewardList[k];
                let ran = Math.floor(Math.random()*this.rewardType.length);
                for(let i in this.rewardType[ran]) {
                    reward[i] = this.rewardType[ran][i];
                }
            }
        },
        resetQuality(){
            for(let k in this.rewardList) {
                let reward = this.rewardList[k];
                let ran = Math.random()*100;
                reward.quality = 0;
                if(ran>99)
                    reward.quality = 2;
                else if(ran>75)
                    reward.quality = 1;
            }
        },
        increaseQuality(){
            let len = this.rewardList.length;
            for(let i in [1,2,3]) {
                let ran = Math.floor(Math.random()*len);
                if(this.rewardList[ran].quality < 3)
                    this.rewardList[ran].quality++;
            }
        },
        increaseBaseQuality() {
            for(let i=this.baseQuality.length-2; i>=0; i--) {
                let ran = Math.floor(Math.random()*(13.2-i*3));
                ran = Math.min(ran, this.baseQuality[i]);
                this.baseQuality[i] -= ran;
                // 刷新一下ui
                this.$set(this.baseQuality, i+1, this.baseQuality[i+1]+ran);
            }
        },
        addAdditional(type) {
            let len = this.rewardList.length;
            for(let i in [1,2,3]) {
                let ran = Math.floor(Math.random()*len);
                this.rewardList[ran].addon.push(type);
            }
        },
        nextStep() {
            let guildPosition = this.$store.globalComponent["guildPosition"];
            // none, wait, picking, picked, donePick, order, crafting
            switch(this.status) {
                case 'wait':
                    this.craft();
                    let elements = document.getElementsByClassName("backIcon");
                    for(let i=0; i<elements.length; i++) {
                        elements[i].classList.remove("purpleGlow");
                        elements[i].classList.remove("goldGlow");
                    }
                    break;
                case 'picking':
                    let list = document.getElementsByClassName('craftRewardIcon');
                    let group = Array.from({length: list.length}, (_, i) => i + 1);
                    for(let i=0; this.remain>0; i++) {
                        let ran = Math.floor(Math.random()*group.length);
                        this.displayHidden(list[ran], ran);
                        group[ran] = group[group.length-1];
                        group.pop();
                    }
                    break;
                case 'order':
                    this.statusChange('crafting');
                    let total = 0;
                    let ran = Math.random()*100;
                    for(let i=0; i<this.rewards.length; i++) {
                        total += this.rewards[i].max;
                    }
                    guildPosition.progress['smith'].max = total;
                    total = 0;
                    for(let i=0; i<this.baseQuality.length; i++) {
                        total += this.baseQuality[i];
                        if(ran > total)
                            this.finalEquip.quality++;
                    }
                    guildPosition.startSmith();
                    break;
            }
        },
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        },
        craft() {
            this.remain = 10;
            this.statusChange('picking');
            let elements = document.getElementsByClassName("craftRewardIcon");
            for(let i=0; i<elements.length; i++) {
                elements[i].classList.remove("flipped")
            }
            setTimeout(() => {
                this.shuffleArray(this.rewardList);
            }, 1000);
        },
        forfeit() {
            this.statusChange('none');
            this.baseQuality = [100,0,0,0,0,0];
            this.finalEquip = {
                mainPotCount: 0,
                mainPotSuccess: 0,
                mainPot: [],
                subPot: [],
                lv: 0,
                lvReq: 0,
                quality: 0,
                baseStatBoost: 0,
                extraStatBoost: 0
            };
            this.remain = 0;
            this.rewards = [];
        },
        reset() {
            this.forfeit();
            this.statusChange('wait');
            let elements = document.getElementsByClassName("craftRewardIcon");
            for(let i=0; i<elements.length; i++) {
                elements[i].classList.add("flipped")
            }
        },
        initReward() {
            let rewardList = [];
            this.addons = new Array(this.addonType.length).fill(0);
            for(let i=0; i<50; i++) {
                let ran = Math.floor(Math.random()*this.rewardType.length);
                let reward = Object.assign({}, this.rewardType[ran], {});
                ran = Math.random()*100;
                reward.quality = 0;
                if(ran>99)
                    reward.quality = 2;
                else if(ran>75)
                    reward.quality = 1;
                reward.addon = [];
                rewardList[i] = reward;
            }
            this.rewardList = rewardList;
        },
        takeAction(e, index) {
            if((this.status != 'picking' && this.status != 'picked') || this.remain <= 0)
                return;
            let element = e.target.closest(".craftRewardIcon");
            this.displayHidden(element, index);
        },
        displayHidden(element, index) {
            if(element == null || element.classList.contains("flipped"))
                return;
            let reward = this.rewardList[index];
            element.classList.add('flipped');
            setTimeout(() => {
                let classes = ['greyGlow', 'purpleGlow', 'goldGlow']
                // 图片点左边会触发front, 点右边会触发back
                element.childNodes[1].classList.add(classes[reward.quality]);
            }, 500);
        
            this.addReward(reward);
            for(let i in reward.addon) {
                this.addRewardByType(reward.addon[i]);
            }
            this.remain -= 1;
            this.statusChange('picked');
            if(this.remain <= 0) {
                this.statusChange('donePick');
                setTimeout(() => {
                    this.statusChange('order');
                }, 1000);
            }
        },
        statusChange(newStatus) {
            // none, wait, picking, picked, donePick, order, crafting
            let list = document.getElementsByClassName('craft_progress_circle');
            let craftDones = document.getElementsByClassName('craft_done');
            let progressBar = document.getElementById("craft_progress");
            let length = (craftDones.length+1)/(list.length-1)*100+'%';
            switch(newStatus) {
                case 'wait':
                    this.initReward();
                    break;
                case 'picking':
                    progressBar.style.width = length;
                    list[0].classList.replace('craft_active', 'craft_done');
                    list[1].classList.add('craft_active');
                    break;
                case 'order':
                    progressBar.style.width = length;
                    list[1].classList.replace('craft_active', 'craft_done');
                    list[2].classList.add('craft_active');
                    break;
                case 'crafting':
                    progressBar.style.width = length;
                    list[2].classList.replace('craft_active', 'craft_done');
                    list[3].classList.add('craft_active');
                    break;
                case 'done':
                    progressBar.style.width = length;
                    list[3].classList.replace('craft_active', 'craft_done');
                    break;
                case 'none':
                    progressBar.style.width = '0%';
                    for(let i=0; i<list.length; i++) {
                        list[i].classList.remove('craft_active');
                        list[i].classList.remove('craft_done');
                    }
                    list[0].classList.add('craft_active');
                    break;
            }
            this.status = newStatus;
        },
        addRewardByType(type, quality=0) {
            for(let i in this.rewardType) {
                if(type == this.rewardType[i].type) {
                    let reward = Object.assign({}, this.rewardType[i], {});
                    reward.quality = quality;
                    this.addReward(reward);
                    return;
                }
            }
        },
        addReward(reward) {
            reward['max'] = 100+100*reward.quality;
            reward['cur'] = 0;
            this.rewards.push(reward);
        },
        dragStart(e, k, source) {
            e.dataTransfer.setData("rewardID", k);
            e.dataTransfer.setData("source", source);
        },
        drop(e, type) {
            e.preventDefault();
            let rewardID = e.dataTransfer.getData("rewardID");
            let temp;
            if(type == 'add') {
                temp = this.forfeitRewards[rewardID];
                this.$set(this.rewards, this.rewards.length, temp);
                this.$delete(this.forfeitRewards, rewardID);
            } else {
                temp = this.rewards[rewardID];
                this.$set(this.forfeitRewards, this.forfeitRewards.length, temp);
                this.$delete(this.rewards, rewardID);
            }

        },
        swap(e, k, target) {
            e.preventDefault();
            let rewardID = e.dataTransfer.getData("rewardID");
            let source = e.dataTransfer.getData("source");
            let temp;
            if(source == 'add') {
                temp = this.rewards[rewardID];
                if(target == 'add') {
                    this.$set(this.rewards, rewardID, this.rewards[k]);
                    this.$set(this.rewards, k, temp);
                } else {
                    this.$set(this.rewards, rewardID, this.forfeitRewards[k]);
                    this.$set(this.forfeitRewards, k, temp);
                }
            } else {
                temp = this.forfeitRewards[rewardID];
                if(target == 'add') {
                    this.$set(this.forfeitRewards, rewardID, this.rewards[k]);
                    this.$set(this.rewards, k, temp);
                } else {
                    this.$set(this.forfeitRewards, rewardID, this.forfeitRewards[k]);
                    this.$set(this.forfeitRewards, k, temp);
                }
            }

        },
        allowDrop(e) {
            e.preventDefault();
        },
        move(e, k, source) {
            let rewardID = k;
            let temp;
            if(source == 'forfeit') {
                temp = this.forfeitRewards[rewardID];
                this.$set(this.rewards, this.rewards.length, temp);
                this.$delete(this.forfeitRewards, rewardID);
            } else {
                temp = this.rewards[rewardID];
                this.$set(this.forfeitRewards, this.forfeitRewards.length, temp);
                this.$delete(this.rewards, rewardID);
            }
        },
        increaseProgress(amount) {
            for(let index in this.rewards) {
                let reward = this.rewards[index];
                if(reward.cur < reward.max) {
                    let diff = reward.max-reward.cur;
                    if(diff>=amount) {
                        if(diff==amount)
                            this.craftReward(reward);
                        reward.cur += amount;
                        this.forceupdate += 1;
                        break;
                    }
                    else {
                        this.craftReward(reward);
                        this.forceupdate = 0;
                        reward.cur += diff;
                        this.increaseProgress(amount-diff);
                    }
                }
            }
        },
        craftReward(reward) {
            switch(reward.type) {
                // 潜能
                // case 'HP':
                // case 'MP':
                case 'STR':
                case 'AGI':
                case 'INT':
                case 'STA':
                case 'SPI':
                case 'ALL':
                // case 'CRIT':
                // case 'CRITDMG':
                // case 'ATK':
                // case 'DEF':
                // case 'SUNDER':
                // case 'BLOCK':
                    reward.success = this.addPotential(reward.type, reward.quality+1);
                    break;
                // 装备品质提升1-3
                case 'quality':
                    reward.success = this.addQuality(reward.quality+1);
                    break;
                // 装备等级提升
                case 'lv':
                    reward.success = this.addLv(reward.quality+1);
                    break;
                // 装备等级需求降低
                case 'lvReq':
                    reward.success = this.redLvReq(reward.quality+1);
                    break;
                // 基础属性上限提升
                case 'extraStat':
                    reward.success = this.addExtra((reward.quality+1)*5);
                    break;
                // 基础属性提升
                case 'baseStat':
                    reward.success = this.addBase(reward.quality+1);
                    break;
            }
        },
        addPotential(type, count=1) {
            let percent = [25, 10];
            let mainPotCount = this.finalEquip.mainPotCount;
            let pot = {type: type};
            if(mainPotCount < 2) {
                this.finalEquip.mainPot.push(pot);
                this.finalEquip.mainPotCount += 1;
                return true;
            } else if(mainPotCount < 4 && this.finalEquip.mainPot.length == mainPotCount) {
                this.finalEquip.mainPotCount += 1;
                if(Math.random()*100 <= percent[mainPotCount-2]*count) {
                    this.finalEquip.mainPot.push(pot);
                    return true;
                }
                return false;
            } else {
                this.finalEquip.subPot.push(pot);
                return true;
            }
        },
        addQuality(count=1) {
            let percent = [100, 50, 25, 10, 5];
            let quality = this.finalEquip.quality;
            if(Math.random()*100 <= percent[quality]*count) {
                this.finalEquip.quality += 1;
                return true;
            }
            return false;
        },
        addLv(count=1) {
            this.finalEquip.lv += count;
            this.finalEquip.lvReq += count;
            return true;
        },
        redLvReq(count=1) {
            this.finalEquip.lvReq -= count;
            if(this.finalEquip.lvReq < 0)
                this.finalEquip.lvReq = 0;
            return true;
        },
        addExtra(count=1) {
            this.finalEquip.extraStatBoost += count;
            return true;
        },
        addBase(count=1) {
            this.finalEquip.baseStatBoost += count;
            return true;
        },
        craftEquip() {
            let guild = this.$store.globalComponent["guild"];
            let equipInfo = this.$store.globalComponent["equipInfo"];
            let backpack = this.$store.globalComponent["backpack"];
             
            let fixEntry = [];
            let baseEntry = [];
            let extraBaseEntry = [];
            let extraEntry = [];
            let newEquip = {};
            let extraEntries = {STR:'CRITDMG',AGI:'HASTE',INT:'APPEN',STA:'HEAL',SPI:'APCRITDMG',ALL:'VERS'};
            // 设置装备类型、等级、质量信息
            newEquip.itemType = equipInfo.createType();
            newEquip.lvReq = this.finalEquip.lvReq || 1;
            newEquip.lv = this.finalEquip.lv || 1;
            newEquip.quality =  this.quality[this.finalEquip.quality];
            newEquip.maxEnhanceLv = (newEquip.quality.qualityLv-1)*5;
            newEquip.enhanceLv = Math.min(0, newEquip.maxEnhanceLv);

            // 添加装备基础属性类型
            while(this.finalEquip.mainPot.length < 2) {
                let entries = ['STR','AGI','INT','STA','SPI','ALL'];
                let type = entries[Math.floor(Math.random()*entries.length)];
                this.finalEquip.mainPot.push({type: type});
            }
            let mainPots = this.finalEquip.mainPot;
            if(mainPots[0].type == mainPots[1].type)
                baseEntry.push({type: mainPots[0].type});
            else {
                baseEntry.push({type: mainPots[0].type});
                baseEntry.push({type: mainPots[1].type});
            }
            if(mainPots[2] != undefined)
                extraBaseEntry.push({type: extraEntries[mainPots[2].type]});
            if(mainPots[3] != undefined)
                extraBaseEntry.push({type: extraEntries[mainPots[3].type]});

            // 添加装备额外属性, 如果数量不足, 用装备类型允许的额外属性随机补充
            let type = newEquip.itemType;
            let mod = this.equipMod[type];
            let index = 0;
            let extraEntryTypes = this[type].extraEntry;
            for(let i=0; i<newEquip.quality.extraEntryNum; i++) {
                if(this.finalEquip.subPot.length <= i) {
                    index = Math.floor(Math.random()*extraEntryTypes.length);
                    extraEntry.push({type: extraEntryTypes[index]});
                }
                else
                    extraEntry.push({type: this.finalEquip.subPot[i].type});
            }

            // 随机隐藏潜能
            newEquip.potential = newEquip.lv >= 30 ? equipInfo.createPotential(newEquip) : [];

            // 应用属性上限
            newEquip.quality.qualityCoefficient += (this.finalEquip.baseStatBoost/20);

            // 设置基础潜能、额外潜能数值
            equipInfo.createBaseEntryValue(newEquip.quality.qualityCoefficient, baseEntry, 1, newEquip.lv, newEquip.enhanceLv, mod);

            // 读取装备描述信息
            if(baseEntry[0].type == 'ALL') {
                let types = Object.keys(this[type].type);
                let key = types[Math.floor(Math.random()*types.length)];
                newEquip.description = this[type].type[key][newEquip.quality.qualityLv-1];
            } else {
                newEquip.description = this[type].type[baseEntry[0].type][newEquip.quality.qualityLv-1];
            }
            newEquip.description.type = this.type[type];

            // 装备类型自带主潜能
            if(this[type].baseEntry.length > 0) {
                if(type == 'weapon' && (baseEntry[0].type == 'INT' || baseEntry[0].type == 'SPI'))
                    fixEntry.push({type:'AP'});
                else
                    fixEntry.push({type:this[type].baseEntry[0]});
                equipInfo.createBaseEntryValue(newEquip.quality.qualityCoefficient, fixEntry, 0, newEquip.lv, newEquip.enhanceLv, mod);
                baseEntry = fixEntry.concat(baseEntry);
            }
            // 额外主潜能
            extraBaseEntry.forEach(entry => {
                let random = Math.random()*100+this.finalEquip.extraStatBoost;
                equipInfo.createExtraEntryValue(entry, random/100, newEquip.lv, mod);
            });

            extraEntry.forEach(entry => {
                let random = Math.random()*100+this.finalEquip.extraStatBoost;
                equipInfo.createExtraEntryValue(entry, random/100, newEquip.lv, mod);
            });
            
            newEquip.baseEntry = baseEntry;
            newEquip.extraBaseEntry = extraBaseEntry;
            newEquip.extraEntry = extraEntry;

            backpack.giveEquip(newEquip);
            this.forfeit();
        }
    }
}
</script>
<style lang="scss" scoped>
.craftEquip {
    // position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 15px;
    // background: linear-gradient(130deg, rgba(0, 0, 0, 0.7) 0%, rgb(44, 37, 24) 40%, rgb(14, 10, 6) 70%);
    // width: 60rem;
    width: 48rem;
    height: 40rem;
    z-index: 9;
    
    .rewards {
        display: flex;
        flex-wrap: wrap;
        width: 90%;
        left: 0;
        right: 0;
        margin: auto;
        .grid {
            height: 60px;
            width: 60px;
            border: none;
        }
    }
    .craftRewardIcon {
        position: relative;
        transform-style: preserve-3d;
        width: 60px;
        height: 60px;
        transition: 1s;
        &:hover .frontIcon{
	        filter: drop-shadow(0px 0px 8px rgba(252, 252, 252, 0.8));
        }
        .frontIcon {
            position: absolute;
            width: 100%;
            height: 100%;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto;
            border-radius: 0.3rem;
            backface-visibility: hidden;
            z-index: 1;
            filter: grayscale(100%);
            img {
                width:100%;
                height:100%;
                border-radius: 1rem;
            }
        }
        .backIcon {
            position: relative;
            width: 4rem;
            height: 4rem;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto;
            border-radius: 0.3rem;
            transform: rotateY(180deg);
            transition: 1s;
            img {
                width:75%;
                height:75%;
                border-radius: 1rem;
            }
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
$primary: #413c2e;
$secondary: #bf8300;
$craft_done: #00bfa6;
$outer: #000000;
$tertiary: #ced6d5; 
.progress_container {
    width: 55rem;
    max-width: 100%;
    position: relative;
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    &::before {
      content: "";
      width: 100%;
      height: 0.2rem;
      background-color: $tertiary;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
}
.progress_bar {
    width: 0%;
    height: 0.2rem;
    background-color: $secondary;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: -1;
    transition: 0.4s ease;
    z-index: 1;
}
.craft_progress_circle {
    width: 4rem;
    height: 4rem;
    color: $primary;
    background-color: $tertiary;
    border: 0.2rem solid $tertiary;
    border-radius: 50%;
    font-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s ease;
    z-index: 1;
    &.craft_active {
      color: $secondary;
      border: 0.2rem solid $secondary;
      background-color: $primary;
      box-shadow: $outer 0px 0px 0px 10px,
        $secondary 0px 0px 10px 12px;
    }
    &.craft_done {
      color: $craft_done;
      border: 0.2rem solid $craft_done;
      background-color: $primary;
      box-shadow: $outer 0px 0px 0px 10px,
        $craft_done 0px 0px 10px 12px;
    }
}
#craft_progress {
    height: 0.2rem;
    background-color: #00bfa6;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    transition: 0.4s ease;
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
.greyGlow {
	filter: drop-shadow(0px 0px 8px rgba(107, 107, 107, 0.8));
}
.purpleGlow {
	filter: drop-shadow(0px 0px 8px rgba(230, 37, 255, 0.8));
}
.goldGlow {
	filter: drop-shadow(0px 0px 10px rgba(255, 255, 0, 1));
}
.greyQuality {
    box-shadow: inset 0 0 20px rgba(107, 107, 107, 0.8);
}
.purpleQuality {
    box-shadow: inset 0 0 20px rgba(230, 37, 255, 0.8);
}
.goldQuality {
    box-shadow: inset 0 0 20px rgba(255, 255, 0, 1);
}
.rewardTable {
    color: #fff;
}
.rewardSelect {
    display: flex;
    flex-direction: row;
    margin: auto;
    left: 0;
    right: 0;
    width: 70%;
    height: 30rem;
}
.hideScroll {
    overflow: hidden;
    height: 26rem;
}
.rewardContainer {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    // margin-right: 14px;
    padding-right: 233px;
    // padding-bottom: 15px;
}
.selectedReward {
    margin: auto;
    padding: 1rem;
    width: 17rem;
    min-width: 17rem;
    min-height: 30rem;
    box-shadow: inset 0 0 10px rgb(79, 185, 255);
}
.forfeitReward {
    margin: auto;
    padding: 1rem;
    min-width: 17rem;
    min-height: 30rem;
    box-shadow: inset 0 0 10px rgb(255, 79, 79);
}
.reward {
    position: relative;
    display: flex;
    height: 2.75rem;
    width: 15rem;
    align-items: center;
    &:hover {
        cursor: grab;
    }
}
.craftProgress {
    position: absolute;
    height: 100%;
    opacity: 20%;
    background-color: #00ff00;
}
.fail {
    background-color: #ff0000;
}
.smallIcon {
    margin-left: 5px;
    width: 30px;
    height: 30px;
}
.rewardDesc {
    text-align: left;
}


</style>