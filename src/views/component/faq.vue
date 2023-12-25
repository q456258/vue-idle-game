<template>

<div class="container scrollbar-morpheus-den">
    <ul id="nav">
        <li><a @click="scrollTo('battle')" class="js-anchor-link">战斗</a></li>
        <li><a @click="scrollTo('equip')" class="js-anchor-link">装备</a></li>
        <li><a @click="scrollTo('spell')" class="js-anchor-link">技能</a></li>
        <li><a @click="scrollTo('guild')" class="js-anchor-link">公会</a></li>
    </ul>

    <div ref="battle" class="tab-wrap">
      <!-- active tab on page load gets checked attribute -->

        <input type="radio" id="battle1" name="battle" class="tab" checked>
        <label for="battle1">玩家相关</label>

        <input type="radio" id="battle2" name="battle" class="tab">
        <label for="battle2">怪物相关</label>

        <div class="tab__content">
            <h3>属性分别都有什么作用? </h3>
            <p>
                ✵鼠标悬停在玩家属性图标上可查看属性的作用
            </p>
            <h3>法术抗性怎么不明不白的? </h3>
            <p>
                ✵法术抗性根据法术抗性数值降低魔法伤害0%、25%、50%、75%、100%，同法术抗性每次遭受魔法伤害后受到的伤害不同
            </p>
        </div>

        <div class="tab__content">
            <h3>怪物拥有哪些属性? </h3>
            <p>
                ✵生命值、攻击、护甲、格挡、法伤、法术暴击、暴击率、暴击伤害、治疗效果、法术穿透、法术抗性
            </p>
            <h3>怪物攻击频率是多久一次? </h3>
            <p>✵同玩家一致, 每秒一次, 玩家先攻</p>
            <h3>普通、精英、BOSS的区别? </h3>
            <p>
                ✵普通怪物最弱，击败他们后可提升等级<br>
                ✵精英怪物属性较高，拥有技能，击败他们后可获得一些不错的奖励<br>
                ✵BOSS拥有多倍的生命值，拥有多个技能，击败他们后可进行抽奖，消耗金币获得额外奖励数量
            </p>
        </div>
    </div>

    <div ref="equip" class="tab-wrap">
        <input type="radio" id="equip1" name="equip" class="tab" checked>
        <label for="equip1">品质</label>

        <input type="radio" id="equip2" name="equip" class="tab">
        <label for="equip2">属性</label>

        <input type="radio" id="equip3" name="equip" class="tab">
        <label for="equip3">打造</label>

        <!-- <input type="radio" id="equip4" name="equip" class="tab">
        <label for="equip4">图鉴</label> -->

        <div class="tab__content">
            <h3>装备品质哪个最好? </h3>
            <p style="background-color: #000;">            
                <span :style="{color:data.color}" v-for="(data, key) in quality" :key="key"><span v-if="data.name!='贫乏'"> &lt; </span>{{data.name}}</span>
            </p>
            <p>
                ✵罕见装备有拥有额外的基础属性
                <br>
                ✵稀有装备可获得最多3条额外的附加词条数
                <br>
                ✵史诗、传奇装备额外获得两条特殊基础词条
            </p>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">强化上限</th>
                        <th scope="col">附加词条数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, key) in quality" :key="key">
                        <th scope="row"><span :style="{color:data.color}">{{data.name}}</span></th>
                        <td>{{(data.qualityLv-1)*5}}</td>
                        <td>{{data.qualityLv==4?'3-6':data.qualityLv-1}}</td>
                    </tr>
                </tbody>
            </table>
            <h3>强化装备有什么用? </h3>
            <p>✵每一级强化提升20%基础属性, 达到对应等级后会激活装备的潜在属性</p>
        </div>

        <div class="tab__content">
            <h3>基础属性是什么? </h3>
            <p>
                ✵装备必带的两条属性（初始装备除外）, 初始显示为白色文字, 可以通过强化提升
                <br>
                ✵第一条属性受装备类型影响, 第二条属性随机生成
            </p>
            <h3>附加属性是什么? </h3>
            <p>
                ✵装备根据品质拥有1-6条附加属性, 显示在基础属性下方的蓝色文字, 可以通过重铸修改词条
                <br>
                ✵根据浮动范围有不同评级<!--高阶装备根据附加词条中最低的评级拥有不同效果-->
            </p>
            <h3>潜在属性是什么? </h3>
            <p>
                ✵200级或以上的装备根据品质拥有1-3条潜在属性, 潜在属性可百分比提升某一项属性, 分别在+3、+6、+9时激活，也可以通过洗炼强制激活
            </p>
            <!-- <h3>额外潜在属性是什么? </h3>
            <p>
                ✵装备根据品质拥有1-3额外条潜在属性, 分别在+15、+20、+25时激活
            </p> -->
            <h3>为什么同品质装备属性不同? </h3>
            <p>
                ✵品质、装备类型影响装备基础属性数值
                <br>
                ✵基础属性、附加词条、潜在属性有一定的浮动范围, 同品质装备属性也有一定差异, 潜在属性浮动范围固定为上限或者下限, 不存在中间值
            </p>
        </div>

        <div class="tab__content">
            <h3>怎么打开装备界面? </h3>
            <p>✵右键已装备的或者背包中的装备图标</p>
            <h3>强化是什么? </h3>
            <p>✵提升装备的基础属性, 根据装备品质可强化0-25次, 每次强化提升基础属性20%
                <br>
                ✵解锁条件: 1级公会铁匠铺
            </p>
            <h3>重铸是什么? </h3>
            <p>✵重置装备的附加词条, 可重置单条或者全部，蓝色装备重铸全部词条时有概率增加/减少词条数量
                <br>
                ✵解锁条件: 2级公会铁匠铺
            </p>
            <h3>锻造是什么? </h3>
            <p>✵消耗材料打造装备
                <br>
                ✵解锁条件: 3级公会铁匠铺
            </p>
            <h3>洗炼是什么? </h3>
            <p>✵激活/重置装备的潜在属性, 需要消耗一个神秘宝珠
                <br>
                ✵解锁条件: 4级公会铁匠铺
            </p>
            <!-- <h3>升级是什么? </h3>
            <p>✵提升装备的等级, 提升基础属性以及附加属性数值, 保留强化以及词条属性类别
                <br>
                ✵右键身上的装备点升级, 装备等级上限为人物等级
                <br>
                ✵解锁条件: 30级公会铁匠铺
            </p> -->
            <!-- <h3>精炼是什么? </h3>
            <p>✵消耗一个装备, 将主装备基础属性提升至两者之间较好的属性（暴击伤害、暴击率无效）
                <br>
                ✵解锁条件: 4级公会铁匠铺
            </p>
            <h3>熔炼是什么? </h3>
            <p>✵消耗一个装备, 将消耗的装备的潜在属性转移至主装备的潜在属性
                <br>
                ✵解锁条件: 5级公会铁匠铺
            </p> -->
        </div>

        <!-- <div class="tab__content">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">属性类型</th>
                    <th v-for="(v, k) in type" :key="k">
                        {{v}}
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="index in 12" :key="index">
                        <th>{{entryInfo[weapon.type[index-1].entry].name}}</th>
                        <td>
                            <span><img :src="helmet.type[index-1].description.iconSrc" alt="helmet" /><br>{{helmet.type[index-1].description.name}}</span>
                        </td>
                        <td>
                            <span><img :src="shoulder.type[index-1].description.iconSrc" alt="shoulder" /><br>{{shoulder.type[index-1].description.name}}</span>
                        </td>
                        <td>
                            <span><img :src="weapon.type[index-1].description.iconSrc" alt="weapon" /><br>{{weapon.type[index-1].description.name}}</span>
                        </td>
                        <td>
                            <span><img :src="armor.type[index-1].description.iconSrc" alt="armor" /><br>{{armor.type[index-1].description.name}}</span>
                        </td>
                        <td>
                            <span><img :src="shoe.type[index-1].description.iconSrc" alt="shoe" /><br>{{shoe.type[index-1].description.name}}</span>
                        </td>
                        <td>
                            <span><img :src="accessory.type[index-1].description.iconSrc" alt="accessory" /><br>{{accessory.type[index-1].description.name}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> -->
    </div>


    <div ref="spell" class="tab-wrap">
        <input type="radio" id="spell1" name="spell" class="tab" checked>
        <label for="spell1">效果</label>

        <input type="radio" id="spell2" name="spell" class="tab">
        <label for="spell2">来源</label>

        <input type="radio" id="spell3" name="spell" class="tab">
        <label for="spell3">BUFF图鉴</label>

        <div class="tab__content">
            <h3>技能伤害怎么算的? </h3>
            <p>
                ✵物理：(攻击伤害*暴击伤害*(1-目标护甲减免)-格挡)*全能增伤差距
                ✵法术：(魔法伤害*法术暴击伤害*(目标法抗-法术穿透))*全能增伤差距
                ✵神圣: 伤害恒定
                <br>
                ✵技能描述没写造成xx点伤害时, 基础伤害为0
            </p>
            <!-- <h3>不想要的技能怎么处理? </h3>
            <p>
                ✵点击技能激活、取消激活技能, 只有激活的技能会被释放, 技能右上角绿点为激活, 红点为未激活
                ✵未激活改为手动释放？
            </p> -->
            <h3>蓝量不足以释放技能会怎样? </h3>
            <p>
                ✵释放技能时, 属性不足以支撑技能的释放, 则会变为释放普通攻击
            </p>
        </div>

        <div class="tab__content">
            <h3>技能从哪学? </h3>
            <p>
                ✵天赋树提升有包含【技能】的天赋后激活技能
            </p>
            <h3>哪个技能强? </h3>
            <p>
                ✵不知道
            </p>
        </div>

        <div class="tab__content">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">状态BUFF</th>
                    <th scope="col">描述</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(v, k) in buffType.statusBuff" :key="k">
                        <!-- <th>{{entryInfo[weapon.type[index-1].entry].name}}</th> -->
                        <td>
                            <span><img style="width:30px; height:30px" :src="buffType.statusBuff[k].iconSrc" alt="" /></span>
                        </td>
                        <td>
                            <span>{{buffType.statusBuff[k].desc}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>

    <div ref="guild" class="tab-wrap">
        <input type="radio" id="guild1" name="guild" class="tab" checked>
        <label for="guild1">建筑</label>

        <input type="radio" id="guild2" name="guild" class="tab">
        <label for="guild2">成员</label>

        <div class="tab__content">
            <h3>公会建筑的作用是什么? </h3>
            <p>            
                ✵鼠标悬浮在对应的建筑按键上可查看建筑功能
            </p>
            <h3>公会怎么升级? </h3>
            <p>            
                ✵每个BOSS拥有一个对应【实力的证明】任务，完成后提升公会等级一级
            </p>
            <!-- <h3>练功房的作用是什么? </h3>
            <p>            
                ✵激活练功房功能, 初始训练效率为10, 每一级提升1点训练效率, 每200点提升一级对应属性
                <br>
                ✵可选择生命、魔法、攻击、护甲训练, 完成后提升对应训练等级一级
                <br>
                ✵15级 - 激活中级练功房
            </p>
            <h3>中级练功房的作用是什么? </h3>
            <p>            
                ✵激活练功房功能, 初始训练效率为10, 每一级提升1点训练效率, 每200点提升一级对应属性
                <br>
                ✵可选择元素伤害、能量盾训练, 完成后提升对应训练等级一级
                <br>
                ✵15级 - 激活高级练功房
            </p>
            <h3>高级练功房的作用是什么? </h3>
            <p>            
                ✵激活练功房功能, 初始训练效率为10, 每一级提升1点训练效率, 每200点提升一级对应属性
                <br>
                ✵可选择力量、敏捷、智力训练, 完成后提升对应训练等级一级
            </p>
            <h3>练功房的加速模式有什么用? </h3>
            <p>            
                ✵训练消耗的时间减半, 花费*4, 20级练功房激活
            </p> -->
        </div>
        
        <div class="tab__content">
            <h3>公会成员怎么升级? </h3>
            <p>            
                ✵完成副本后，根据副本完成度升级
            </p>
            <h3>公会成员的属性有什么用? </h3>
            <p>           
                ✵生命值: 每点生命值可承受一点伤害
                <br>
                ✵攻击力: 每点攻击力造成一点伤害
                <br>
                ✵防御: 每点防御可抵消一点伤害
                <br>
                ✵成长: 每次升级属性为提升基础值*成长
            </p>
        </div>
    </div>
</div>
    
</template>
<script>

import {equipConfig} from '@/assets/config/equipConfig'
import {buffConfig} from '@/assets/config/buffConfig'
export default {
    name: "faq",
    mixins: [equipConfig, buffConfig],
    components: {},
    props: {
    },
    data() {
        return {
        };
    },
    mounted() {
        this.$store.globalComponent.faq = this;
    },
    watch: {
    },
    computed: {
    },
    methods: {      
        scrollTo(refName) {
            let element = this.$refs[refName];
            element.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }
}
</script>
<style lang="scss" scoped>

$max-tab-count: 5;
$tab-wrap-border-radius: 6px;
.tab-wrap {
    transition: 0.3s box-shadow ease;
    border-radius: $tab-wrap-border-radius;
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    list-style: none;
    background-color: #fff;
    margin: 40px 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    // &:hover {
    //     box-shadow: 0 12px 23px rgba(0, 0, 0, 0.23), 0 10px 10px rgba(0, 0, 0, 0.19);
    // }
}
.tab {
    display: none;
    @for $i from 1 through $max-tab-count {
        &:checked:nth-of-type(#{$i}) ~ .tab__content:nth-of-type(#{$i}) {
            opacity: 1;
            transition: 0.5s opacity ease-in, 0.8s transform ease;
            position: relative;
            top: 0;
            z-index: 1;
            transform: translateY(0px);
            text-shadow: 0 0 0;
        }
    }
    &:first-of-type:not(:last-of-type) + label {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    &:not(:first-of-type):not(:last-of-type) + label {
        border-radius: 0;
    }
    &:last-of-type:not(:first-of-type) + label {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    &:checked + label {
        background-color: #fff;
        box-shadow: 0 -1px 0 #fff inset;
        cursor: default;
        &:hover {
            box-shadow: 0 -1px 0 #fff inset;
            background-color: #fff;
        }
    }
    + label {
        box-shadow: 0 -1px 0 #eee inset;
        border-radius: $tab-wrap-border-radius $tab-wrap-border-radius 0 0;
        cursor: pointer;
        display: block;
        text-decoration: none;
        color: #333;
        flex-grow: 3;
        text-align: center;
        background-color: #f2f2f2;
        user-select: none;
        text-align: center;
        transition: 0.3s background-color ease, 0.3s box-shadow ease;
        height: 50px;
        box-sizing: border-box;
        padding: 15px;
        &:hover {
            background-color: #f9f9f9;
            box-shadow: 0 1px 0 #f4f4f4 inset;
        }
    }
    &__content {
        padding: 10px 25px;
        background-color: transparent;
        position: absolute;
        width: 100%;
        z-index: -1;
        opacity: 0;
        left: 0;
        transform: translateY(-3px);
        border-radius: $tab-wrap-border-radius;
    }
}

body {
    // font-family: 'Helvetica', sans-serif;
    background-color: #e7e7e7;
    color: #777;
    padding: 30px 0;
    font-weight: 300;
}

.container {
    display: block;
    width: 43rem;
    height: 85%;
    margin: 0.5rem 8.5rem;
    padding: 0.5rem 0.5rem;
    // max-width: 43rem;
    overflow-y: auto;
    > *:not(.tab-wrap) {
        padding: 0 80px;
    }
    p {    
        font-family: 'NotoSansSC','Noto Sans','Source Sans Pro','Avenir', Helvetica, Arial, sans-serif !important;
        line-height: 1.6;
        margin-bottom: 20px;
        color: #000;
    }
}

h3 {
    font-weight: 400;
    color: #000;
}

#nav {
    position: fixed;
    top: 2.8rem;
    left: 0;
    width: 8rem;
    background: #333;
    margin: 0;
    padding: 15px;
    list-style: none;
    border-radius: 0 0 10px 0;
    box-shadow: 0 0 8px rgba(0,0,0,0.6);
}

#nav a {
    cursor: pointer;
    display: block;
    padding: 10px 10px;
    color: #fff;
}

#nav a:hover {
    color: #ff0;
}
.box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    .dungeon {
        position: relative;
            margin-top: 10px;
    }
    .description {
        width: 6rem;
    }
}
img {
    width: 50px;
    height: 50px;
}
</style>