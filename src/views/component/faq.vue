<template>

<div class="container scrollbar-morpheus-den">
    <ul id="nav">
        <li><a @click="scrollTo('battle')" class="js-anchor-link">战斗</a></li>
        <li><a @click="scrollTo('equip')" class="js-anchor-link">装备</a></li>
        <li><a @click="scrollTo('guild')" class="js-anchor-link">公会</a></li>
    </ul>

    <div ref="battle" class="tab-wrap">
      <!-- active tab on page load gets checked attribute -->
      <input type="radio" id="battle1" name="battle" class="tab" checked>
      <label for="battle1">试炼</label>
      
      <input type="radio" id="battle2" name="battle" class="tab">
      <label for="battle2">冒险</label>

      <input type="radio" id="battle3" name="battle" class="tab">
      <label for="battle3">怪物</label>

      <div class="tab__content">
            <h3>试炼是什么？</h3>
            <p>
                ✵屏幕中间点击试炼区，点击"开始/暂停战斗"或者"自动战斗"后进入战斗
                <br>
                ✵击败试炼怪物后等级提升
            </p>
            <h3>试炼怪物等级是多少？</h3>
            <p>✵人物等级+1</p>
      </div>

      <div class="tab__content">
            <h3>冒险是什么？</h3>
            <p>
                ✵屏幕中间点击冒险区，点击"开始/暂停战斗"或者"自动战斗"或者任意一个边框为紫色的图标后进入战斗，根据选项获得不同奖励，奖励基于玩家等级
            </p>
            <h3>冒险怪物等级的多少？</h3>
            <p>✵同人物等级一致</p>
            <h3>冒险里面的图标分别代表什么？</h3>
            <p>
              <span class="box">
                  <span class="centerImg">
                      <img src="../../../public/icons/gold.png">
                  </span>
                  <span class="description">金币</span>
                  <span class="centerImg">
                      <img src="../../../public/icons/wood.png">
                  </span>
                  <span class="centerImg">
                      <img src="../../../public/icons/equip.png">
                  </span>
                  <span class="description">装备</span>
                  <!-- <span class="description">木材</span>
                  <span class="centerImg">
                      <img src="../../../public/icons/crystal.png">
                  </span> -->
                  <span class="description">水晶</span>
                  <span class="centerImg">
                      <img src="../../../public/icons/chest.png">
                  </span>
                  <span class="description">宝箱</span>
              </span>
            </p>
            <p>
            </p>
      </div>

        <div class="tab__content">
            <h3>怪物拥有哪些属性？</h3>
            <p>✵生命值、攻击、护甲、元素伤害、格挡、暴击率、暴击伤害</p>
            <h3>怪物攻击频率是多久一次？</h3>
            <p>✵同玩家一致，每秒一次，玩家先攻</p>
            <h3>怪物的生命值恢复是多少？</h3>
            <p>✵试炼怪物每秒恢复2%最大生命值，冒险怪不会恢复生命值</p>
        </div>
    </div>

    <div ref="equip" class="tab-wrap">
        <input type="radio" id="equip1" name="equip" class="tab" checked>
        <label for="equip1">品质</label>

        <input type="radio" id="equip2" name="equip" class="tab">
        <label for="equip2">属性</label>

        <input type="radio" id="equip3" name="equip" class="tab">
        <label for="equip3">打造</label>

        <input type="radio" id="equip4" name="equip" class="tab">
        <label for="equip4">图鉴</label>

        <div class="tab__content">
            <h3>装备品质哪个最好？</h3>
            <p style="background-color: #000;">            
                <span :style="{color:data.color}" v-for="(data, key) in quality" :key="key"><span v-if="data.name!='破旧'"> &lt; </span>{{data.name}}</span>
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
                        <td>{{data.qualityLv}}</td>
                    </tr>
                </tbody>
            </table>
            <h3>强化装备有什么用？</h3>
            <p>✵每一级强化提升10%基础属性，达到对应等级后会激活装备的潜在属性</p>
        </div>

        <div class="tab__content">
            <h3>基础属性是什么？</h3>
            <p>
                ✵装备必带的三条属性（初始装备除外），初始显示为白色文字，可以通过强化提升
                <br>
                ✵第一条属性受装备类型影响，第二条属性受属性类型影响（请查看装备图鉴），第三条属性随机生成
            </p>
            <h3>附加属性是什么？</h3>
            <p>
                ✵装备根据品质拥有1-6条附加属性，显示在基础属性下方的蓝色文字，可以通过重铸修改词条
                <br>
                ✵根据浮动范围有不同评级<!--高阶装备根据附加词条中最低的评级拥有不同效果-->
            </p>
            <h3>潜在属性是什么？</h3>
            <p>
                ✵装备根据品质拥有1-3条潜在属性，分别在+3、+6、+9时激活
            </p>
            <!-- <h3>额外潜在属性是什么？</h3>
            <p>
                ✵装备根据品质拥有1-3额外条潜在属性，分别在+15、+20、+25时激活
            </p> -->
            <h3>为什么同品质装备属性不同？</h3>
            <p>
                ✵品质只影响装备基础属性数值有影响
                <br>
                ✵基础属性、附加词条、潜在属性有一定的浮动范围，同品质装备属性也有一定差异，潜在属性浮动范围固定为上限或者下限，不存在中间值
            </p>
        </div>

        <div class="tab__content">
            <h3>怎么打开装备界面？</h3>
            <p>✵右键已装备的或者背包中的装备图标</p>
            <h3>强化是什么？</h3>
            <p>✵提升装备的基础属性，根据装备品质可强化0-25次
                <br>
                ✵解锁条件：1级公会铁匠铺
            </p>
            <h3>重铸是什么？</h3>
            <p>✵重置装备的附加词条，可重置单条或者全部
                <br>
                ✵解锁条件：10级公会铁匠铺
            </p>
        </div>

        <div class="tab__content">
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
        </div>
    </div>

    <div ref="guild" class="tab-wrap">
        <input type="radio" id="guild1" name="guild" class="tab" checked>
        <label for="guild1">公会</label>

        <div class="tab__content">
            <h3></h3>
            <p>            
            </p>
        </div>
    </div>
</div>
    
</template>
<script>

import {equipConfig} from '@/assets/config/equipConfig'
export default {
    name: "faq",
    mixins: [equipConfig],
    components: {},
    props: {
    },
    data() {
        return {
        };
    },
    mounted() {
    },
    watch: {
    },
    computed: {
    },
    methods: {      
        scrollTo(refName) {
            var element = this.$refs[refName];
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
    .centerImg {
        width: 3rem;
        height: 3rem;
        margin: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3rem;
        box-shadow: inset 0 0 10px 5px #ccc;
        img {
            width: 20px;
            height: 20px;
        }
    }
    .description {
        width: 5rem;
    }
}
img {
    width: 50px;
    height: 50px;
}
</style>