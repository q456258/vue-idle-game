<template>
    <div class="charInfo">
        <div id="rename" v-if="player.name=='无名'">
            <div class="container" >
                <div class="title">创建角色</div>
                <div class="content">
                    <input id="name" placeholder="请输入您的角色名" type="text" @input="updateName"/>  
                    <div id="nameAlert"></div>
                    <button class="confirm" @click="confirmName">确认
                    </button>
                </div>
            </div>
        </div>
        <div class="user-status">
            <cTooltip placement="bottom">
                <template v-slot:content>
                    <div class="lv">
                        <div class="value">
                            <span>{{player.name}}&nbsp; {{playerLv+'级'}}</span>
                            <!-- <span>转生次数：{{playerLv}}</span> -->
                        </div>
                    </div>
                </template>
                <template v-slot:tip>
                    <p class="info">* 玩家当前等级</p>
                    <p class="info">* 每通过一次试炼提升等级</p>
                </template>
            </cTooltip>
            <div class="exp">
                <div class="progress" style="width:80%;">
                    <div class="progress-bar" :style="{width:player.exp.cur/player.exp.req*100+'%'}">
                    </div>
                </div>
                <div class="value">
                    <span id="expInfo"></span>
                    <span>{{player.exp.cur+'/'+player.exp.req}}</span>
                </div>
            </div>
            <cTooltip placement="bottom">
                <template v-slot:content>
                    <div class="hpmp">
                        <hpmpBar :vpMin="0" :vpNow="attribute.CURHP.value" :vpMax="attribute.MAXHP.value" :target="'player'" :type="'hp'"></hpmpBar>
                        <hpmpBar :vpMin="0" :vpNow="attribute.CURMP.value" :vpMax="attribute.MAXMP.value" :target="'player'" :type="'mp'"></hpmpBar>
                    </div>
                </template>
                <template v-slot:tip>
                    <p class="info">
                        * 生命值
                        <br>
                        基础：{{attribute.HP.baseVal}}
                        <span v-if="attribute.HPP.value != 0">{{' +' + attribute.HPP.showValue}}</span>
                        <br>
                        基础恢复：{{1+player.talent['ability_hunter_harass']*0.2}}%/秒
                    </p>
                    <p class="info">
                        * 魔法值
                        <br>
                        基础：{{attribute.MP.baseVal}}
                        <span v-if="attribute.MPP.value != 0">{{' +' + attribute.MPP.showValue}}</span>
                        <br>
                        基础恢复：1%/秒
                    </p>
                </template>
            </cTooltip>
            <span class="buffList">
                <div class="buff">
                    <span class="buffHolder" v-for="(v, k) in player.buff" :key="k">
                        <span v-if="v>0 && buffType.statusBuff[k]!=undefined">
                            <img :title="buffType.statusBuff[k].desc" :src="buffType.statusBuff[k].iconSrc" alt="">
                            <span class="buffText">{{v}}</span>
                        </span>
                    </span>
                </div>
                <div class="debuff">
                    <span class="buffHolder" v-for="(v, k) in player.buff" :key="k">
                        <span v-if="v>0 && buffType.statusDebuff[k]!=undefined">
                            <img :title="buffType.statusDebuff[k].desc" :src="buffType.statusDebuff[k].iconSrc" alt="">
                            <span class="buffText">{{v}}</span>
                        </span>
                    </span>
                </div>
            </span>
            <div class="other">
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <img src="../../assets/icons/stat/str.png" alt="">
                            <div class="value">
                                <span>{{attribute.STR.showValue}}</span>
                            </div>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 力量
                            <br>
                            基础：{{attribute.STR.baseVal }}
                            <span v-if="attribute.STRP.value != 0">{{' +' + attribute.STRP.showValue}}</span>
                            <span class="info" v-if="attribute.ALL.value>0">
                                <br>
                                全属性：{{attribute.ALL.baseVal}}
                                <span v-if="attribute.ALLP.value>0">{{' +'+attribute.ALLP.showValue}}</span>
                            </span>
                        </p>
                        <p class="info">* 每点提升属性
                            <br>
                            +10生命值
                            <br>
                            +1生命恢复
                        </p>
                        </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <img src="../../assets/icons/stat/agi.png" alt="">
                            <div class="value">
                                <span>{{attribute.AGI.showValue}}</span>
                            </div>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 敏捷
                            <br>
                            基础：{{attribute.AGI.baseVal }}
                            <span v-if="attribute.AGIP.value != 0">{{' +' + attribute.AGIP.showValue}}</span>
                            <span class="info" v-if="attribute.ALL.value>0">
                                <br>
                                全属性：{{attribute.ALL.baseVal}}
                                <span v-if="attribute.ALLP.value>0">{{' +'+attribute.ALLP.showValue}}</span>
                            </span>
                        </p>
                        <p class="info">* 每点提升属性
                            <br>
                            +4攻击
                            <br>
                            +1护甲
                        </p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <img src="../../assets/icons/stat/int.png" alt="">
                            <div class="value">
                                <span>{{attribute.INT.showValue}}</span>
                            </div>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 智力
                            <br>
                            基础：{{attribute.INT.baseVal }}
                            <span v-if="attribute.INTP.value != 0">{{' +' + attribute.INTP.showValue}}</span>
                            <span class="info" v-if="attribute.ALL.value>0">
                                <br>
                                全属性：{{attribute.ALL.baseVal}}
                                <span v-if="attribute.ALLP.value>0">{{' +'+attribute.ALLP.showValue}}</span>
                            </span>
                        </p>
                        <p class="info">* 每点提升属性
                            <br>
                            +3能量护盾
                            <br>
                            +3魔法值
                            <br>
                            +0.25魔法恢复
                        </p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <img src="../../assets/icons/stat/atk.png" alt="">
                            <div class="value">
                                <span>
                                    {{attribute.ATK.showValue}}
                                </span>
                            </div>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 攻击力
                            <br>
                            基础：{{attribute.ATK.baseVal }}
                            <span v-if="attribute.ATKP.value != 0">{{' +' + attribute.ATKP.showValue}}</span>
                            <br>
                            <span v-if="attribute.CRIT.value <= 100">
                                DPS:{{Math.round(attribute.ATK.value*(1+attribute.CRIT.value/100*(attribute.CRITDMG.value-100)/100)) }}
                            </span>
                            <span v-else>
                                DPS:{{Math.round(attribute.ATK.value*(1+(attribute.CRITDMG.value-100)/100)) }}
                            </span>
                        </p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <img src="../../assets/icons/stat/sunder.png" alt="">
                            <div class="value">
                                <span>
                                    {{attribute.SUNDER.showValue}}
                                    <div class="reducePercent">
                                        ({{attribute.SUNDERRED.showValue}})
                                    </div>
                                </span>
                            </div>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 破甲
                            <br>
                            基础：{{attribute.SUNDER.showValue }}
                            <br>
                            破甲：{{attribute.SUNDERRED.showValue}}
                        </p>
                        <p class="info">无视部分护甲</p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <img src="../../assets/icons/stat/crit.png" alt="">
                            <div class="value">
                                <span>{{attribute.CRIT.showValue}}</span>
                            </div>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 暴击率</p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <img src="../../assets/icons/stat/arm.png" alt="">
                            <div class="value">
                                <span>
                                    {{attribute.DEF.showValue}}
                                    <div class="reducePercent">
                                        ({{attribute.DEFRED.showValue}})
                                    </div>
                                </span>
                            </div>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 护甲
                            <br>
                            基础：{{attribute.DEF.baseVal }}
                            <span v-if="attribute.DEFP.value != 0">{{' +' + attribute.DEFP.showValue}}</span>
                            <br>
                            减伤：{{attribute.DEFRED.showValue}}
                        </p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <img src="../../assets/icons/stat/mr.png" alt="">
                            <div class="value">
                                <span>
                                    {{attribute.MR.showValue}}
                                </span>
                            </div>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 能量盾
                            <br>
                            基础：{{attribute.MR.baseVal }}
                            <span v-if="attribute.MRP.value != 0">{{' +' + attribute.MRP.showValue}}</span>
                        </p>
                        <p class="info">使用魔法值抵消伤害，每抵消一点消耗0.25魔法值，低于20%最大魔法值时无效</p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <img src="../../assets/icons/stat/critDmg2.png" alt="">
                            <div class="value">
                                <span>{{attribute.CRITDMG.showValue}}</span>
                            </div>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 暴击伤害
                            <br>
                            基础：{{attribute.CRITDMG.baseVal }}
                        </p>
                    </template>
                </cTooltip>
            </div>
        </div>

        <div class="user-item">
            <div class="uii">
                <cTooltip placement="bottom">
                    <template v-slot:content>
                            <div class="gold" :style="{fontSize:userGold>=1000000?'1em':'1em'}">金币: <span :style="{fontSize:userGold>=1000000?'1em':'1em'}">{{(userGold || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}}</span></div>
                    </template>
                    <template v-slot:tip>
                            <p class="info">* 你拥有的金币数量</p>
                            <p class="info">* 钱不是万能的，但是没钱是万万不能的</p>
                    </template>
                </cTooltip>
            </div>
            
            <div class="equips">
                <div class="equip helmet" @mouseover="showInfo($event,'helmet',playerHelmet,false)" @contextmenu.prevent="openMenu(playerHelmet,$event)" @touchstart.stop.prevent="openMenu(playerHelmet,$event)" @mouseleave="closeInfo('equip')">
                    <div class="title" v-if="playerHelmet.quality">
                        <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px '+playerHelmet.quality.color}">
                            <img :src="playerHelmet.description.iconSrc" alt="">
                        </div>
                        <div class='name' :class="{'red-flash':playerHelmet.enhanceLv>=20}" :style="{color:playerHelmet.quality.color}">
                            {{playerHelmet.description.name}} {{playerHelmet.enhanceLv?'(+'+playerHelmet.enhanceLv+')':''}}
                        </div>
                    </div>
                    <div class="title" v-else>
                        <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px #ccc'}">
                        </div>
                        <div class='name'>
                        </div>
                    </div>
                </div>
                <div class="equip shoulder" @mouseover="showInfo($event,'shoulder',playerShoulder,false)" @contextmenu.prevent="openMenu(playerShoulder,$event)" @touchstart.stop.prevent="openMenu(playerShoulder,$event)" @mouseleave="closeInfo('equip')">
                    <div class="title" v-if="playerShoulder.quality">
                        <div class='icon' :class="{'red-flash':playerShoulder.enhanceLv>=20}" :style="{'box-shadow':'inset 0 0 7px 2px'+playerShoulder.quality.color}">
                            <img :src="playerShoulder.description.iconSrc" alt="">
                        </div>
                        <div class='name' :style="{color:playerShoulder.quality.color}">
                            {{playerShoulder.description.name}} {{playerShoulder.enhanceLv?'(+'+playerShoulder.enhanceLv+')':''}}
                        </div>                
                    </div>
                    <div class="title" v-else>
                        <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px #ccc'}">
                        </div>
                        <div class='name'>
                        </div>
                    </div>
                </div>
                <div class="equip weapon" @mouseover="showInfo($event,'weapon',playerWeapon,false)" @contextmenu.prevent="openMenu(playerWeapon,$event)" @touchstart.stop.prevent="openMenu(playerWeapon,$event)" @mouseleave="closeInfo('equip')">
                    <div class="title" v-if="playerWeapon.quality">
                        <div class='icon' :class="{'red-flash':playerWeapon.enhanceLv>=20}" :style="{'box-shadow':'inset 0 0 7px 2px '+playerWeapon.quality.color}">
                            <img :src="playerWeapon.description.iconSrc" alt="">
                        </div>
                        <div class='name' :style="{color:playerWeapon.quality.color}">
                            {{playerWeapon.description.name}} {{playerWeapon.enhanceLv?'(+'+playerWeapon.enhanceLv+')':''}}
                        </div>                    
                    </div>
                    <div class="title" v-else>
                        <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px #ccc'}">
                        </div>
                        <div class='name'>
                        </div>
                    </div>
                </div>
                <div class="equip armor" @mouseover="showInfo($event,'armor',playerArmor,false)" @contextmenu.prevent="openMenu(playerArmor,$event)" @touchstart.stop.prevent="openMenu(playerArmor,$event)" @mouseleave="closeInfo('equip')">
                    <div class="title" v-if="playerArmor.quality">
                        <div class='icon' :class="{'red-flash':playerArmor.enhanceLv>=20}" :style="{'box-shadow':'inset 0 0 7px 2px'+playerArmor.quality.color}">
                            <img :src="playerArmor.description.iconSrc" alt="">
                        </div>
                        <div class='name' :style="{color:playerArmor.quality.color}">
                            {{playerArmor.description.name}} {{playerArmor.enhanceLv?'(+'+playerArmor.enhanceLv+')':''}}
                        </div>                
                    </div>
                    <div class="title" v-else>
                        <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px #ccc'}">
                        </div>
                        <div class='name'>
                        </div>
                    </div>
                </div>
                <div class="equip shoe" @mouseover="showInfo($event,'shoe',playerShoe,false)" @contextmenu.prevent="openMenu(playerShoe,$event)" @touchstart.stop.prevent="openMenu(playerShoe,$event)" @mouseleave="closeInfo('equip')">
                    <div class="title" v-if="playerShoe.quality">
                        <div class='icon' :class="{'red-flash':playerShoe.enhanceLv>=20}" :style="{'box-shadow':'inset 0 0 7px 2px'+playerShoe.quality.color}">
                            <img :src="playerShoe.description.iconSrc" alt="">
                        </div>
                        <div class='name' :style="{color:playerShoe.quality.color}">
                            {{playerShoe.description.name}} {{playerShoe.enhanceLv?'(+'+playerShoe.enhanceLv+')':''}}
                        </div>
                    </div>
                    <div class="title" v-else>
                        <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px #ccc'}">
                        </div>
                        <div class='name'>
                        </div>
                    </div>
                </div>
                <div class="equip accessory" @mouseover="showInfo($event,'accessory',playerAccessory,false)" @contextmenu.prevent="openMenu(playerAccessory,$event)" @touchstart.stop.prevent="openMenu(playerAccessory,$event)" @mouseleave="closeInfo('equip')">
                    <div class="title" v-if="playerAccessory.quality">
                        <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px '+playerAccessory.quality.color}">
                            <img :src="playerAccessory.description.iconSrc" alt="">
                        </div>
                        <div class='name' :class="{'red-flash':playerAccessory.enhanceLv>=20}" :style="{color:playerAccessory.quality.color}">
                            {{playerAccessory.description.name}} {{playerAccessory.enhanceLv?'(+'+playerAccessory.enhanceLv+')':''}}
                        </div>
                    </div>
                    <div class="title" v-else>
                        <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px #ccc'}">
                        </div>
                        <div class='name'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="user-spell" v-show="playerLv >= 20">
            <ul class="nav nav-tabs">
                <li class="nav-item" v-for="(v, k) in dmgFilter" :key=k>
                    <a class="nav-link" :class="{active: dmgFilterSelected==v}" id="charInfo" @click="switchFilter(v)">{{v}}</a>
                </li>
            </ul>
            过滤：<select v-model="activeFilterSelected">
                <option v-for="(item, key) in activeFilter" :key="key">
                {{item}}
                </option>
            </select>
            <div class="container scrollbar-morpheus-den">
                <div class="spell" v-for="(v, k) in filteredSpell" :key="k" :set="curLv=spell[v].level[spells[v].lv-1]">
                    <span class="spellIcon"><img class="icon" :src="spell[v].iconSrc"></span>
                    <span class="spellName" :style="spellQuality[spell[v].quality-1]">{{(spells[v].lv)+'级'+spell[v].name}}</span>
                    <span class="spellDesc">{{curLv.des}}</span>
                    <span class="spellProgress" v-if="v!='attack'">
                        <div class="progress" style="width:100%;">
                            <div class="progress-value" :style="{width:spells[v].progress/spell[v].max*100+'%'}">
                                <small class="justify-content-center d-flex position-absolute w-100">
                                    {{spells[v].progress}} / {{spell[v].max}}
                                </small>
                            </div>
                        </div>
                    </span>
                    <span class="spellCost" v-if="curLv.cost['HP']">
                        {{"消耗："+curLv.cost['HP']+entryInfo['HP'].name}}
                    </span>
                    <span class="spellCost" v-if="curLv.cost['MP']">
                        {{"消耗："+curLv.cost['MP']+entryInfo['MP'].name}}
                    </span>
                    <span class="spellCost" v-if="curLv.cost['MAXMP']">
                        {{"消耗："+curLv.cost['MAXMP']*100+'%最大魔法值'}}
                    </span>
                    <span class="spellCost" v-if="curLv.cost['MAXHP']">
                        {{"消耗："+curLv.cost['MAXHP']*100+'%最大生命值'}}
                    </span>
                    <span class="spellCost" v-if="curLv.cost['CURMP']">
                        {{"消耗："+curLv.cost['CURMP']*100+'%当前魔法值'}}
                    </span>
                    <span class="spellCost" v-if="curLv.cost['CURHP']">
                        {{"消耗："+curLv.cost['CURHP']*100+'%当前生命值'}}
                    </span>
                </div>
            </div>
        </div>
        <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
            <li @click="unEquip()">卸下</li>
            <li @click="equipEnhance()" v-if="guild.smith.lv>0">强化</li>
            <li @click="equipForge()" v-if="guild.smith.lv>=0">重铸</li>
            <li @click="equipLevelUp()" v-if="guild.smith.lv>=30 && currentEquip.lv < playerLv && currentEquip.quality.qualityLv>1">升级</li>
        </ul>
    </div>
</template>
<script>
import cTooltip from '../uiComponent/tooltip';
import hpmpBar from '../uiComponent/hpmpBar';
import { assist } from '../../assets/js/assist';
import { buffSystem } from '../../assets/js/buffSystem';
import {itemConfig} from '@/assets/config/itemConfig';
import {spellConfig} from '@/assets/config/spellConfig';
import {equipConfig} from '@/assets/config/equipConfig';
import {buffConfig} from '@/assets/config/buffConfig';
import Saveload from './saveload.vue';
export default {
    name: "charInfo",
    mixins: [assist, buffSystem, itemConfig, spellConfig, equipConfig, buffConfig],
    components: {cTooltip, hpmpBar, Saveload, },
    data() {
        return {
            visible: false,
            currentEquip: {},
            top: 0,
            left: 0,
            activeFilter: ['所有', '已激活', '未激活'],
            activeFilterSelected: '所有',
            dmgFilter: ['所有', '力量', '敏捷', '智力', '生命', '魔法', '攻击', '护甲', '恢复', 'BUFF', 'DEBUFF'],
            dmgFilterSelected: '所有'
        };
    },
    props: {
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
    computed: {
        player() { return this.$store.state.playerAttribute; },
        guild() { return this.$store.state.guildAttribute},
        baseAttribute() { return this.$store.state.baseAttribute },
        attribute() { return this.$store.state.playerAttribute.attribute },
        userGold() { return this.$store.state.guildAttribute.gold },
        playerWeapon() { return this.$store.state.playerAttribute.weapon },
        playerArmor() { return this.$store.state.playerAttribute.armor },
        playerAccessory() { return this.$store.state.playerAttribute.accessory },
        playerHelmet() { return this.$store.state.playerAttribute.helmet },
        playerShoe() { return this.$store.state.playerAttribute.shoe },
        playerShoulder() { return this.$store.state.playerAttribute.shoulder },
        playerLv() { return this.$store.state.playerAttribute.lv },
        spells() { return this.$store.state.playerAttribute.spells},
        filteredSpell() { 
            let spells = this.$store.state.playerAttribute.spells;
            let filtered = Object.keys(spells);
            if(this.dmgFilterSelected != '所有') {
                filtered = Object.keys(spells).filter(s => {
                    return this.spell[s].tag != undefined && this.spell[s].tag.indexOf(this.dmgFilterSelected) != -1;
                });
            }
            if(this.activeFilterSelected != '所有') {
                let active = this.activeFilterSelected == '已激活' ? true : false;
                filtered = Object.keys(spells).filter(s => {
                    return spells[s].active == active;
                });
            }
            return filtered;
        },

    },
    methods: {       
        updateName(e) {
            let name = e.target.value;
            this.checkValidity(name);
        },
        confirmName() {
            let alert = document.getElementById("nameAlert");
            let name = document.getElementById("name").value;
            if(this.checkValidity(name))
                this.player.name = name;
        },
        checkValidity(name) {
            let alert = document.getElementById("nameAlert");
            if(name.length < 1 || name.length > 8) {
                alert.innerHTML = "名字限定在1-8个字符之间，别一天到晚整点阴间活";
                return false;
            }
            alert.innerHTML = "";
            return true;
        },
        unEquip() {
            let backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            for (let i = 0; i < backpack.grid.length; i++) {
                if (Object.keys(backpack.grid[i]).length < 3) {
                    this.$set(backpack.grid, i, this.currentEquip);
                    switch (this.currentEquip.itemType) {
                        case 'helmet':
                            this.$store.commit('set_player_helmet', {});
                            break;
                        case 'accessory':
                            this.$store.commit('set_player_accessory', {});
                            break;
                        case 'weapon':
                            this.$store.commit('set_player_weapon', {});
                            break;
                        case 'armor':
                            this.$store.commit('set_player_armor', {});
                            break;
                        case 'shoe':
                            this.$store.commit('set_player_shoe', {});
                            break;
                        case 'shoulder':
                            this.$store.commit('set_player_shoulder', {});
                            break;
                        default:
                            break;
                    }
                    break;
                }
                if(i==backpack.grid.length-1){
                    this.$store.commit("set_sys_info", {
                        type: 'warning',
                        msg: '背包已满',
                    });
                }
            }
        },
        equipEnhance() {
            let index = this.findComponentUpward(this, 'index');
            index.closeInfo();
            index.enhanceEquip = this.currentEquip;
            index.equipEnhancePanel = true;
        },
        equipForge() {
            let index = this.findComponentUpward(this, 'index');
            index.closeInfo();
            index.enhanceEquip = this.currentEquip;
            index.equipForgePanel = true;
        },
        equipLevelUp() {
            let dust = ['dust2', 'dust3', 'dust4', 'dust5', 'dust6'];
            let itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
            let equipInfo = this.findBrothersComponents(this, 'equipInfo', false)[0];
            let quantity = Math.ceil(this.currentEquip.lv/10);
            let itemName = this.itemType[dust[this.currentEquip.quality.qualityLv-2]].description.name;
            let has = itemInfo.getItemQty(itemName);
            this.$message({
                message: '消耗材料'+itemName+"*"+quantity+",目前拥有数量："+has,
                title: '升级装备',
                confirmBtnText: '升级',
                onClose: () => {
                    equipInfo.levelUpEquip(this.currentEquip);
                }
            });
        },
        switchFilter(filter) {
            this.dmgFilterSelected = filter;
        },
        showInfo($event, type, item, compare) {
            let index = this.findComponentUpward(this, 'index');
            index.showInfo($event, type, item, compare);
        },
        closeInfo() {
            let index = this.findComponentUpward(this, 'index');
            index.closeInfo('equip');
        },
        openMenu(equip, e) {
            this.currentEquip = equip;
            // this.$store.commit('set_need_strengthen_equipment', this.currentItem)
            const menuMinWidth = 105;
            const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
            const offsetWidth = this.$el.offsetWidth; // container width
            const maxLeft = offsetWidth - menuMinWidth; // left boundary
            let left = e.clientX - offsetLeft + 10; // 15: margin right

            if (left > maxLeft) {
                this.left = maxLeft;
            } else {
                this.left = left;
            }
            this.top = e.clientY;
            this.visible = true;
        },
        closeMenu() {
            this.visible = false;
        },
    }
}
</script>
<style lang="scss" scoped>
#rename {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 8;
    background-color: rgba(0, 0, 0, 0.774);
    .container {
            position: absolute;
            top: 30%;
            left: 0;
            right: 0;
            padding: 0;
            margin: auto;
            overflow: hidden;
            height: 15rem;
            width: 30rem;
            background-color: rgba(15, 15, 15, 0.822);
            // border-radius: 2rem;
            box-shadow:  0 0 5px 1px rgba(255, 255, 255, 0.3);

        .title {
            font-family: "Times New Roman", Times, serif;
            width: 100%;
            text-align: center;
            font-size: 1.5rem;;
            background: linear-gradient(90deg, rgb(20, 20, 20) 0%, rgb(70, 70, 70) 50%, rgb(20, 20, 20) 100%);
        }
        .content {
            margin-top: 2rem;
            #nameAlert {
                color: red;
            }
        }
        #name {
            width: 70%;
            padding: 10px 5px;
            margin: 10px 0;
            border-top: 0;
            border-left: 2px solid #57AAB4;
            border-right:0;
            border-bottom: 2px solid #57AAB4;
            outline: none;
            background: transparent; 
            color: rgb(234, 234, 235);
            font-size: 15px;
            transition: 0.5s;
        }
        #name:focus{
            border-left: 2px solid transparent;

            border-bottom: 2px solid transparent;
            animation: animINP 5s linear infinite,animBTN 5s linear infinite;;
        }
        .confirm {
            position: relative;
            display: block;
            padding: auto;
            margin: auto;
            margin-top: 1rem;
            color: #62BBC1;
            height: 3rem;
            width: 6rem;
            background-color:#333;
            font-size: 1.5rem;
            text-align: center;
            text-decoration: none;
            border: 1px solid #868686;
            overflow: hidden;
            transition: color 150ms ease-in-out 150ms, border-color 300ms ease-out, box-shadow 300ms ease-in-out;
            z-index: 1;
            
            &:after {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: darken(#868686, 45%);
                z-index: -1;
                transform: scaleX(0);
                transition: transform 300ms ease-out 200ms;
            }
            
            &:hover {
                color: rgb(160, 160, 160);
                border-color: lighten(#868686, 20%);
                box-shadow: 0 0 16px rgba(255, 255, 255, 0.1);
                
                &:after {
                    transform: scaleX(1);
                    transform-origin: 50% 50%;
                    transition: transform 300ms ease-out;
                }
            }
        }
        @keyframes animBTN {
            0%{
                box-shadow:  0 0 10px 9px rgba(3,169,244,0.3);
            }
            33%{
                box-shadow:  0 0 10px 9px rgba(244,65,165,0.3);
                
            }
            66.9%{
                box-shadow:  0 0 10px 9px rgba(255,235,59,0.3);
                
            }
            100%{
                box-shadow:  0 0 10px 9px rgba(3,169,244,0.3);
            }
        }
    }
}
.user-status {
    position: absolute;
    top: 4rem;
    left: 0.5rem;
    padding: 0.5rem;
    border: 2px solid #ccc;
    border-image: url("/icons/border2.png") 81 40/60px 50px/0.5rem round;
    height: 25rem;
    width: 25rem;
    display: flex;
    flex-direction: column;
    .lv {
        cursor: pointer;
        // border: 2px solid #ccc;
        height: 2rem;
        width: 100%;
        margin: 0.7rem 0rem 0.1rem 0rem;
        padding-left: 0.2rem;
        // margin-bottom: 0.5rem;
        display: flex;
        .value {
          display: flex;
          justify-content: space-around;
          font-weight: bold;
          text-align: center;
          align-items: center;
          flex: 1;
        }
    }
    .exp {
        .progress {
            width: 80%;
            margin: auto;
            height: 1px;
            .progress-bar {
                background-color: orange;  
            }
        }
        .value {
            text-align: right;
            font-size: 0.75rem;
            margin-right: 2.3rem;
        }
    }
    .hpmp {
        cursor: pointer;
        // border: 2px solid #ccc;
        height: 4rem;
        width: 100%;
        padding-left: 2rem;
        padding-right: 2rem;
        // margin-bottom: 0.5rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .buffList {
        margin: -0.4rem 2rem 0 2rem;
        width: 19.7rem;
        height: 2rem;
        display: flex;
        flex-direction: row;
        .buff {
            position: relative;
            display: flex;
            flex-direction: row;
            width: 10rem;
        }
        .debuff {
            position: relative;
            display: flex;
            flex-direction: row-reverse;
            width: 9.7rem;
        }
        .buffHolder {
            position: relative;
            img {
                height: 1.7rem;
            }
            .buffText {
                position: absolute;
                font-size: 0.9rem;
                top: 0.6rem;
                left: 1rem; 
                text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
            }
        }
    }
    .other {
        width: 100%;
        flex: 1;
        padding: 0.1rem;
        // border: 2px solid #ccc;
        margin-top: -0.06rem;
        flex-wrap: wrap;
        display: flex;
        img {
            width: 2.5rem;
            height: 2.5rem;
        }
        & > div,
        .item {
            cursor: pointer;
            width: 33.3%;
            padding-top: 0.1rem;
            padding-bottom: 0rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: column;
            .value {
                // margin-top: 0.3rem;
                font-size: 1rem;
                flex: 1;
                display: flex;
                align-items: center;
                text-align: center;
                .reducePercent {
                    margin-top: -0.3rem;
                    font-size: 0.75rem;
                }
            }
        }
        .item {
            width: 100%;
        }
    }
}
.user-item {
    position: absolute;
    top: 4rem;
    left: 26rem;
    border: 2px solid #ccc;
    border-image: url("/icons/border2.png") 81 40/60px 50px/0.5rem round;
    height: 25rem;
    width: 25rem;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    .uii {
        display: flex;
        width: calc(100% -0.4rem);
    }
    .equips {
        margin: 0rem 1rem;
        width: 100%;
        height: 100%;
        flex: 1;
        flex-wrap: wrap;
        display: flex;
        cursor: pointer;
        .equip {
            width: 45%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: row;
            .title {
                padding: 0.05rem;
                width: 100%;
                height: 5rem;
                .icon {
                    width: 4rem;
                    height: 4rem;
                    background-color: #000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: auto;
                    border-radius: 0.3rem;
                    img {
                        width:4rem;
                        height:4rem;
                        border-radius: 1rem;
                    }
                }
                .name {
                    font-size: 0.85rem;
                    height: 1rem;
                    margin-top: 0.5rem;
                    line-height: 1rem;
                }
            }
        }
    }
}
.user-spell {
    position: absolute;
    top: 30rem;
    left: 0.5rem;
    border: 2px solid #ccc;
    border-image: url("/icons/border2.png") 81 40/60px 50px/0.5rem round;
    height: calc(100% - 31rem);
    width: 50.5rem;
    padding: 0.5rem;
    padding: 2rem 2rem;
    .container{
        height: 90%;
        overflow-y: auto;
        .spell {
            position: relative;
            cursor: pointer;
            height: 5.3rem;
            border: 1px solid rgba(255, 255, 255, 0.404);
            // border-image: linear-gradient(to right, darkorchid, rgb(0, 129, 123)) 1;
            border-radius: 1rem;
            margin: 0.1rem;
            .spellIcon {
                position: absolute;
                left: 1rem;
                top: 0.5rem;
                height: 4rem;
                width: 4rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .spellName {
                position: absolute;
                left: 5rem;
                top: 0.5rem;
            }
            .spellDesc {
                position: absolute;
                left: 5rem;
                top: 2rem;
                width: 30rem;
                text-align: left;
            }
            .spellProgress {
                position: absolute;
                right: 1rem;
                top: 0.5rem;
                width: 10rem;
                .progress {
                    background: rgba(255,255,255,0.1);
                    justify-content: flex-start;
                    border-radius: 100px;
                    align-items: center;
                    position: relative;
                    padding: 0 5px;
                    display: flex;
                    height: 17px;
                    width: 500px;
                    .progress-value {
                        transition: width 0.5s;
                        box-shadow: 0 10px 40px -10px #fff;
                        border-radius: 100px;
                        background: rgb(67, 64, 255);
                        height: 10px;
                        width: 0;
                    }
                }
                .w-100 {
                    width: 100%;
                    font-size: 0.75rem;
                    top: 8px;
                    color: #fff;
                }
            }
            .spellCost {
                position: absolute;
                right: 1rem;
                top: 1.75rem;
            }
            .proficient-text {
                font-family: Open Sans;   
                font-weight: 400;
                width:95%;
                margin-top:2rem;
            }
            label {
                display: block;
                position: relative;
                overflow: hidden;
                cursor: pointer;
                height: 2rem;
                width: 3rem;
                margin: auto;
                margin-top: -0.15rem;
            }
            .faq-arrow {
                width: 12px;
                height: 12px;
                display: block;
                transition: -webkit-transform 0.8s;
                transition: transform 0.8s;
                transition: transform 0.8s, -webkit-transform 0.8s;
                transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
                border-bottom: 3px solid rgba(158, 158, 158, 0.70);
                border-right: 3px solid rgba(158, 158, 158, 0.70);
                float: right;
                position: relative;
                top: 0.1rem;
                left: -1rem;
                opacity: 0.7;
                -webkit-transform: rotate(45deg);
                    transform: rotate(45deg);
                z-index: 1;
            }
            .proficient {
                display: block;
                position: relative;
                overflow: hidden;
                cursor: pointer;
                height: 1.3rem;
                width: 3rem;
                margin: auto;
                margin-top: 3.3rem;
            }
            .proficient:hover {
                opacity: 0;
            }
            .proficient:hover + label{
                display: block;
                background: rgba(0,0,0,200) !important;
                height: 225px;
                width: calc(100% + 2px);
                transition: height 0.8s;
                z-index: 2;
                transition-timing-function: cubic-bezier(0.68, -0.25, 0.265, 1.55);
                border-left: 1px solid rgba(255, 255, 255, 0.404);
                border-right: 1px solid rgba(255, 255, 255, 0.404);
                border-bottom: 1px solid rgba(255, 255, 255, 0.404);
                border-bottom-left-radius: 1rem;
                border-bottom-right-radius: 1rem;
                margin-left: -1px;
            }
            label:hover {
                display: block;
                background: rgba(0,0,0,200) !important;
                height: 225px;
                width: calc(100% + 2px);
                transition: height 0.8s;
                z-index: 2;
                transition-timing-function: cubic-bezier(0.68, -0.25, 0.265, 1.55);
                border-left: 1px solid rgba(255, 255, 255, 0.404);
                border-right: 1px solid rgba(255, 255, 255, 0.404);
                border-bottom: 1px solid rgba(255, 255, 255, 0.404);
                border-bottom-left-radius: 1rem;
                border-bottom-right-radius: 1rem;
                margin-left: -1px;
            }
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
            border-color: #111;
            color: rgb(185, 185, 185);
            background: linear-gradient(180deg,#555 0%,#222 49%, rgb(31, 21, 21) 51%,rgb(34, 24, 24) 100%);
            border-radius: 5px;
            box-shadow: inset 0px 1px 0px rgba(255,255,255,.5),0px 1px 3px rgba(0,0,0,0.3);
            margin: 0;
            padding: 6px 12px;
            cursor: pointer;
            font-size: 14px;
            letter-spacing: 2px;
            border-radius: 0.4rem;
            min-width: 6rem;
            height: 2.5rem; 
            margin-top: 0.05rem;
            &:hover {
                color: #eee;
                background: linear-gradient(180deg,rgb(116, 116, 116) 0%,#222 49%, rgb(34, 23, 23) 51%,rgb(37, 26, 26) 100%);
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
.nav {
    // background-color: #ccc;
    width: 45rem;
    .nav-item {
        .nav-link {
            cursor: pointer;
            margin-bottom: -1px;
            border: 1px solid transparent;
            border-top-left-radius: .25rem;
            border-top-right-radius: .25rem;
            color: rgba(255, 255, 255, 0.795);
            font-size: 1rem;
            padding: 5px;
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
</style>