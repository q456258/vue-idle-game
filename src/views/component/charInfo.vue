<template>
    <div class="charInfo">
        <div class="user-status">
            <cTooltip placement="bottom">
                <template v-slot:content>
                    <div class="lv">
                        <div class="value">
                            <span>lv {{playerLv}}</span>
                            <span>转生次数：{{playerLv}}</span>
                        </div>
                    </div>
                </template>
                <template v-slot:tip>
                    <p class="info">* 玩家当前等级与转生次数</p>
                    <p class="info">* 成功挑战首领时会提升等级</p>
                    <p class="info">* 超过30级时可以转生获取更强力的初始属性</p>
                </template>
            </cTooltip>
            <cTooltip placement="bottom">
                <template v-slot:content>
                    <div class="hpmp">
                        <hpmpBar :vpMin="0" :vpNow="attribute.CURHP.value" :vpMax="attribute.MAXHP.value" :target="'player'" :type="'hp'"></hpmpBar>
                        <hpmpBar :vpMin="0" :vpNow="attribute.CURMP.value" :vpMax="attribute.MAXMP.value" :target="'player'" :type="'mp'"></hpmpBar>
                        <!-- <div class="progress" style="width:100%;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" :style="{width:attribute.CURHP.value/attribute.MAXHP.value*100+'%'}">
                                <small class="justify-content-center d-flex position-absolute w-80" style="color:black">{{attribute.CURHP.showValue}} / {{attribute.MAXHP.showValue}} </small>
                            </div>
                        </div>
                        <div class="progress" style="width:100%;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{width:attribute.CURMP.value/attribute.MAXMP.value*100+'%'}">
                                <small class="justify-content-center d-flex position-absolute w-80" style="color:black">{{attribute.CURMP.showValue}} / {{attribute.MAXMP.showValue}} </small>
                            </div>
                        </div> -->
                    </div>
                </template>
                <template v-slot:tip>
                        <p class="info">
                            * 生命值
                            <br>
                            基础：{{attribute.HP.baseVal}}
                            <span v-if="attribute.HPP.value != 0">{{' +' + attribute.HPP.showValue}}</span>
                            <br>
                            基础恢复：1%/秒
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
                            +0.5生命恢复
                            <br>
                            +0.25格挡
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
                            +1攻击
                            <br>
                            +0.5护甲
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
                            +1元素伤害
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
                                <span>{{attribute.ATK.showValue}}</span>
                            </div>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 攻击力
                            <br>
                            基础：{{attribute.ATK.baseVal }}
                            <span v-if="attribute.ATKP.value != 0">{{' +' + attribute.ATKP.showValue}}</span>
                        </p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <img src="../../assets/icons/stat/ap.png" alt="">
                            <div class="value">
                                <span>{{attribute.AP.showValue}}</span>
                            </div>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 元素伤害
                            <br>
                            基础：{{attribute.AP.baseVal }}
                            <span v-if="attribute.APP.value != 0">{{' +' + attribute.APP.showValue}}</span>
                        </p>
                        <p class="info">额外造成无视护甲、格挡的伤害</p>
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
                            <img src="../../assets/icons/stat/mr2.png" alt="">
                            <div class="value">
                                <span>
                                    {{attribute.MR.showValue}}
                                </span>
                            </div>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 格挡
                            <br>
                            基础：{{attribute.MR.baseVal }}
                            <span v-if="attribute.MRP.value != 0">{{' +' + attribute.MRP.showValue}}</span>
                        </p>
                        <p class="info">减少计算完护甲后的伤害</p>
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
                            <p class="info">* 在这里，钱就是万能的</p>
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
                <div class="equip necklace" @mouseover="showInfo($event,'necklace',playerNecklace,false)" @contextmenu.prevent="openMenu(playerNecklace,$event)" @touchstart.stop.prevent="openMenu(playerNecklace,$event)" @mouseleave="closeInfo('equip')">
                    <div class="title" v-if="playerNecklace.quality">
                        <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px '+playerNecklace.quality.color}">
                            <img :src="playerNecklace.description.iconSrc" alt="">
                        </div>
                        <div class='name' :class="{'red-flash':playerNecklace.enhanceLv>=20}" :style="{color:playerNecklace.quality.color}">
                            {{playerNecklace.description.name}} {{playerNecklace.enhanceLv?'(+'+playerNecklace.enhanceLv+')':''}}
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
                <div class="equip ring" @mouseover="showInfo($event,'ring',playerRing,false)" @contextmenu.prevent="openMenu(playerRing,$event)" @touchstart.stop.prevent="openMenu(playerRing,$event)" @mouseleave="closeInfo('equip')">
                    <div class="title" v-if="playerRing.quality">
                        <div class='icon' :class="{'red-flash':playerRing.enhanceLv>=20}" :style="{'box-shadow':'inset 0 0 7px 2px'+playerRing.quality.color}">
                            <img :src="playerRing.description.iconSrc" alt="">
                        </div>
                        <div class='name' :style="{color:playerRing.quality.color}">
                            {{playerRing.description.name}} {{playerRing.enhanceLv?'(+'+playerRing.enhanceLv+')':''}}
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
        <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
            <li @click="unEquip()">卸下</li>
        </ul>
    </div>
</template>
<script>
import cTooltip from '../uiComponent/tooltip';
import hpmpBar from '../uiComponent/hpmpBar';
import { assist } from '../../assets/js/assist';
export default {
    name: "charInfo",
    mixins: [assist],
    components: {cTooltip, hpmpBar},
    data() {
        return {
            visible: false,
            currentEquip: {},
            top: 0,
            left: 0,
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
        baseAttribute() { return this.$store.state.baseAttribute },
        attribute() { return this.$store.state.playerAttribute.attribute },
        userGold() { return this.$store.state.playerAttribute.GOLD },
        playerWeapon() { return this.$store.state.playerAttribute.weapon },
        playerArmor() { return this.$store.state.playerAttribute.armor },
        playerRing() { return this.$store.state.playerAttribute.ring },
        playerNecklace() { return this.$store.state.playerAttribute.necklace },
        playerHelmet() { return this.$store.state.playerAttribute.helmet },
        playerShoe() { return this.$store.state.playerAttribute.shoe },
        playerLv() { return this.$store.state.playerAttribute.lv },
    },
    methods: {        
        unEquip() {
            var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            for (let i = 0; i < backpack.grid.length; i++) {
                if (JSON.stringify(backpack.grid[i]).length < 3) {
                    this.$set(backpack.grid, i, this.currentEquip);
                    switch (this.currentEquip.itemType) {
                        case 'helmet':
                            this.$store.commit('set_player_helmet', {});
                            break;
                        case 'necklace':
                            this.$store.commit('set_player_necklace', {});
                            break;
                        case 'weapon':
                            this.$store.commit('set_player_weapon', {});
                            break;
                        case 'armor':
                            this.$store.commit('set_player_armor', {});
                            break;
                        case 'ring':
                            this.$store.commit('set_player_ring', {});
                            break;
                        case 'shoe':
                            this.$store.commit('set_player_shoe', {});
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
        showInfo($event, type, item, compare) {
            var index = this.findComponentUpward(this, 'index');
            index.showInfo($event, type, item, compare);
        },
        closeInfo() {
            var index = this.findComponentUpward(this, 'index');
            index.closeInfo('equip');
        },
        openMenu(equip, e) {
            this.currentEquip = equip;
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
        height: 4rem;
        width: 100%;
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
    .hpmp {
        cursor: pointer;
        // border: 2px solid #ccc;
        height: 4rem;
        width: 100%;
        padding-left: 2rem;
        padding-right: 2rem;
        margin-bottom: 0.5rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .other {
        width: 100%;
        flex: 1;
        padding: 0.1rem;
        // border: 2px solid #ccc;
        margin-top: 0.06rem;
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
            padding-top: 0.3rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: column;
            .value {
                margin-top: 0.3rem;
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
    cursor: pointer;
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
</style>