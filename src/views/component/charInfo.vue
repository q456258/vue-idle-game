<template>
    <div class="charInfo">
        <div id="rename" v-if="player.name=='无名'">
            <div class="container" >
                <div class="nameTitle">创建角色</div>
                <div class="nameContent">
                    <input id="name" class="nameAnime" placeholder="请输入您的角色名" type="text" @input="updateName"/>  
                    <div id="charNameAlert" class="alert"></div>
                    <button class="nameConfirm" @click="confirmName">确认
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
                            <!-- <span>转生次数: {{playerLv}}</span> -->
                        </div>
                    </div>
                </template>
                <template v-slot:tip>
                    <p class="info">* 玩家当前等级</p>
                    <!-- <p class="info">* 每通过一次试炼提升等级</p> -->
                </template>
            </cTooltip>
            <cTooltip placement="bottom">
                <template v-slot:content>
                    <div class="hpmp">
                        <hpmpBar :vpMin="0" :vpNow="attribute.CURHP.value" :vpMax="attribute.MAXHP.value" :shield="attribute.SHIELD.value" :target="'player'" :type="'hp'"></hpmpBar>
                        <hpmpBar :vpMin="0" :vpNow="attribute.CURMP.value" :vpMax="attribute.MAXMP.value" :target="'player'" :type="'mp'"></hpmpBar>
                    </div>
                </template>
                <template v-slot:tip>
                    <p class="info">
                        * 生命值
                        <br>
                        基础: {{attribute.HP.baseVal}}
                        <span v-if="attribute.HPP.value != 0">{{' +' + attribute.HPP.showValue}}</span>
                        <span v-if="attribute.HP.bonus != 0"><br>{{'附加: ' + attribute.HP.bonusShowValue}}</span>
                        <br>
                        恢复: {{attribute.STA.value}} /5秒
                    </p>
                    <p class="info">
                        * 魔法值
                        <br>
                        基础: {{attribute.MP.baseVal}}
                        <span v-if="attribute.MPP.value != 0">{{' +' + attribute.MPP.showValue}}</span>
                        <span v-if="attribute.MP.bonus != 0"><br>{{'附加: ' + attribute.MP.bonusShowValue}}</span>
                        <br>
                        恢复: {{attribute.SPI.value}} /5秒
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
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/str.jpg" alt="" />
                            </span>
                            <span>{{attribute.STR.showValue}}</span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 力量
                            <br>
                            基础: {{attribute.STR.baseVal }}
                            <span v-if="attribute.STRP.value != 0">{{' +' + attribute.STRP.showValue}}</span>
                            <span class="info" v-if="attribute.ALL.value>0">
                                <br>
                                全属性: {{attribute.ALL.value}}
                            </span>
                            <span v-if="attribute.STR.bonus != 0"><br>{{'附加: ' + attribute.STR.bonusShowValue}}</span>
                        </p>
                        <p class="info">* 每点提升属性
                            <br>
                            +8护甲
                            <br>
                            +1格挡
                        </p>
                        </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/agi.jpg" alt="" />
                            </span>
                            <span>{{attribute.AGI.showValue}}</span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 敏捷
                            <br>
                            基础: {{attribute.AGI.baseVal }}
                            <span v-if="attribute.AGIP.value != 0">{{' +' + attribute.AGIP.showValue}}</span>
                            <span class="info" v-if="attribute.ALL.value>0">
                                <br>
                                全属性: {{attribute.ALL.value}}
                            </span>
                            <span v-if="attribute.AGI.bonus != 0"><br>{{'附加: ' + attribute.AGI.bonusShowValue}}</span>
                        </p>
                        <p class="info">* 每点提升属性
                            <br>
                            +5攻击
                            <br>
                            +0.01%暴击率
                        </p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/sta.jpg" alt="" />
                            </span>
                            <span>{{attribute.STA.showValue}}</span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 耐力
                            <br>
                            基础: {{attribute.STA.baseVal }}
                            <span v-if="attribute.STAP.value != 0">{{' +' + attribute.STAP.showValue}}</span>
                            <span class="info" v-if="attribute.ALL.value>0">
                                <br>
                                全属性: {{attribute.ALL.value}}
                            </span>
                            <span v-if="attribute.STA.bonus != 0"><br>{{'附加: ' + attribute.STA.bonusShowValue}}</span>
                        </p>
                        <p class="info">* 每点提升属性
                            <br>
                            +40生命值
                            <br>
                            +5每五秒非战时回血
                        </p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/int.jpg" alt="" />
                            </span>
                            <span>{{attribute.INT.showValue}}</span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 智力
                            <br>
                            基础: {{attribute.INT.baseVal }}
                            <span v-if="attribute.INTP.value != 0">{{' +' + attribute.INTP.showValue}}</span>
                            <span class="info" v-if="attribute.ALL.value>0">
                                <br>
                                全属性: {{attribute.ALL.value}}
                            </span>
                            <span v-if="attribute.INT.bonus != 0"><br>{{'附加: ' + attribute.INT.bonusShowValue}}</span>
                        </p>
                        <p class="info">* 每点提升属性
                            <br>
                            +5法术强度
                            <br>
                            +0.01%法术暴击率
                        </p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/spi.jpg" alt="" />
                            </span>
                            <span>{{attribute.SPI.showValue}}</span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 精神
                            <br>
                            基础: {{attribute.SPI.baseVal }}
                            <span v-if="attribute.SPIP.value != 0">{{' +' + attribute.SPIP.showValue}}</span>
                            <span class="info" v-if="attribute.ALL.value>0">
                                <br>
                                全属性: {{attribute.ALL.value}}
                            </span>
                            <span v-if="attribute.SPI.bonus != 0"><br>{{'附加: ' + attribute.SPI.bonusShowValue}}</span>
                        </p>
                        <p class="info">* 每点提升属性
                            <br>
                            +1每五秒回蓝
                            <br>
                            +5每五秒非战时回蓝
                        </p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/all.png" alt="" />
                            </span>
                            <span>{{attribute.ALL.showValue}}</span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 全属性
                            <br>
                            全属性: {{attribute.ALL.baseVal}}
                            <span v-if="attribute.ALLP.value>0">{{' +'+attribute.ALLP.showValue}}</span>
                            <br>
                            附加: {{attribute.ALL.bonusShowValue}}
                        </p>
                        <p class="info">* 每点提升属性
                            <br>
                            +1力量 <br>
                            +1敏捷 <br>
                            +1耐力 <br>
                            +1智力 <br>
                            +1精神 <br>
                            +1全能
                        </p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/atk.jpg" alt="" />
                            </span>
                            <span>{{attribute.ATK.showValue}}</span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 攻击力
                            <br>
                            基础: {{attribute.ATK.baseVal }}
                            <span v-if="attribute.ATKP.value != 0">{{' +' + attribute.ATKP.showValue}}</span>
                            <span v-if="attribute.ATK.bonus != 0"><br>{{'附加: ' + attribute.ATK.bonusShowValue}}</span>
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
                <!-- <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/sunder.jpg" alt="" />
                            </span>
                            <span class="value">
                                {{attribute.SUNDER.showValue}}<div class="percent">({{attribute.SUNDERRED.showValue+")"}}</div>
                            </span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 破甲
                            <br>
                            基础: {{attribute.SUNDER.showValue }}
                            <br>
                            破甲: {{attribute.SUNDERRED.showValue}}
                        </p>
                        <p class="info">无视部分护甲</p>
                    </template>
                </cTooltip> -->
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/arm.jpg" alt="" />
                            </span>
                            <span>{{attribute.DEF.showValue}}
                                <div class="percent">({{attribute.DEFRED.showValue}})</div>
                            </span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 护甲
                            <br>
                            基础: {{attribute.DEF.baseVal }}
                            <span v-if="attribute.DEFP.value != 0">{{' +' + attribute.DEFP.showValue}}</span>
                            <span v-if="attribute.DEF.bonus != 0"><br>{{'附加: ' + attribute.DEF.bonusShowValue}}</span>
                            <br>
                            减伤: {{attribute.DEFRED.showValue}}
                        </p>
                        <p class="info">降低受到的物理伤害</p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/block.jpg" alt="" />
                            </span>
                            <span>{{attribute.BLOCK.showValue}}</span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 格挡
                            <br>
                            基础: {{attribute.BLOCK.baseVal }}
                            <span v-if="attribute.BLOCKP.value != 0">{{' +' + attribute.BLOCKP.showValue}}</span>
                            <span v-if="attribute.BLOCK.bonus != 0"><br>{{'附加: ' + attribute.BLOCK.bonusShowValue}}</span>
                        </p>
                        <p class="info">减少受到的物理伤害（结算于护甲之后）</p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/ap.jpg" alt="" />
                            </span>
                            <span>{{attribute.AP.showValue}}</span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 法术强度
                            <br>
                            基础: {{attribute.AP.baseVal }}
                            <span v-if="attribute.APP.value != 0">{{' +' + attribute.APP.showValue}}</span>
                            <span v-if="attribute.AP.bonus != 0"><br>{{'附加: ' + attribute.AP.bonusShowValue}}</span>
                        </p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/apcrit.jpg" alt="" />
                            </span>
                            <span>{{attribute.APCRIT.showValue}}</span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 法术暴击
                            <br>
                            基础: {{attribute.APCRIT.baseVal+'%'}}
                            <span v-if="attribute.APCRIT.bonus != 0"><br>{{'附加: ' + attribute.APCRIT.bonusShowValue}}</span>
                            <br>
                            法术暴击伤害: {{attribute.APCRITDMG.baseVal+'%'}}
                        </p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/vers.jpg" alt="" />
                            </span>
                            <span>{{attribute.VERS.showValue}}
                                <div class="percent">({{attribute.VERSBONUS.showValue}})</div>
                            </span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 全能
                            <br>
                            基础: {{attribute.VERS.baseVal }}
                            <span v-if="attribute.VERS.bonus != 0"><br>{{'附加: ' + attribute.VERS.bonusShowValue}}</span>
                            <br>
                            增伤/减伤: {{attribute.VERSBONUS.showValue}}
                        </p>
                        <p class="info">提升造成的伤害, 降低受到的伤害, 减伤上限为60%</p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/crit.jpg" alt="" />
                            </span>
                            <span>{{attribute.CRIT.showValue}}</span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 暴击率
                            <br>
                            基础: {{attribute.CRIT.baseVal}}%
                            <span v-if="attribute.CRIT.bonus != 0"><br>{{'附加: ' + attribute.CRIT.bonusShowValue}}</span>
                        </p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/critdmg.jpg" alt="" />
                            </span>
                            <span>{{attribute.CRITDMG.showValue}}</span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 暴击伤害
                            <br>
                            基础: {{attribute.CRITDMG.baseVal }}
                            <span v-if="attribute.CRITDMG.bonus != 0"><br>{{'附加: ' + attribute.CRITDMG.bonusShowValue}}</span>
                        </p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/hpreg.jpg" alt="" />
                            </span>
                            <span>{{attribute.HEAL.showValue}}</span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 治疗效果
                            <br>
                            基础: {{attribute.HEAL.baseVal }}
                            <span v-if="attribute.HEAL.bonus != 0"><br>{{'附加: ' + attribute.HEAL.bonusShowValue}}</span>
                        </p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/appen.jpg" alt="" />
                            </span>
                            <span>{{attribute.APPEN.showValue}}</span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 法术穿透
                            <br>
                            基础: {{attribute.APPEN.baseVal }}
                            <span v-if="attribute.APPENP.value != 0">{{' +' + attribute.APPENP.showValue}}</span>
                            <span v-if="attribute.APPEN.bonus != 0"><br>{{'附加: ' + attribute.APPEN.bonusShowValue}}</span>
                        </p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/mr.jpg" alt="" />
                            </span>
                            <span>{{attribute.MR.showValue}}</span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 法术抗性
                            <br>
                            基础: {{attribute.MR.baseVal }}
                            <span v-if="attribute.MRP.value != 0">{{' +' + attribute.MRP.showValue}}</span>
                            <span v-if="attribute.MR.bonus != 0"><br>{{'附加: ' + attribute.MR.bonusShowValue}}</span>
                        </p>
                        <p class="info">降低受到的魔法伤害</p>
                    </template>
                </cTooltip>
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <div class="item">
                            <span class="smallIconContainer">
                                <del class="grey smallIcon iconBorder"></del>
                                <img src="/icons/stat/haste.jpg" alt="" />
                            </span>
                            <span>{{attribute.HASTE.showValue}}</span>
                        </div>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 急速
                            <br>
                            基础: {{attribute.HASTE.baseVal }}
                            <span v-if="attribute.HASTE.bonus != 0"><br>{{'附加: ' + attribute.HASTE.bonusShowValue}}</span>
                        </p>
                        <p class="info">提升行动后获得的技能充能</p>
                    </template>
                </cTooltip>
            </div>
        </div>

        <div class="user-item">
            <div class="uii">
                <cTooltip placement="bottom">
                    <template v-slot:content>
                        <currency :amount="userGold"></currency>
                    </template>
                    <template v-slot:tip>
                        <p class="info">* 你拥有的金币数量</p>
                        <p class="info">* 钱不是万能的, 但是没钱是万万不能的</p>
                    </template>
                </cTooltip>
            </div>
            
            <div class="equips">
                <div class="equip" v-for="(stat, name) in playerEquips" :key="name" @mouseover="showInfo($event, name,stat,false)" @contextmenu.prevent="openMenu(stat,$event)" @touchstart.stop.prevent="openMenu(stat,$event)" @mouseleave="closeInfo('equip')">
                    <div class="title" v-if="stat.quality">
                        <div class="mediumIconContainer">
                            <del :class="[{grey:stat.quality.qualityLv==1, green:stat.quality.qualityLv==3, blue:stat.quality.qualityLv==4, purple:stat.quality.qualityLv==5, orange:stat.quality.qualityLv==6}, 'mediumIcon iconBorder']"></del>
                            <img :src="stat.description.iconSrc" alt="">
                        </div>
                        <div class="name" :class="{'red-flash':stat.enhanceLv>=20}" :style="{color:stat.quality.color}">
                            {{stat.description.name}} {{stat.enhanceLv?'(+'+stat.enhanceLv+')':''}}
                        </div>
                    </div>
                    <div class="title" v-else>
                        <div class="icon" :style="{'box-shadow':'inset 0 0 7px 2px #ccc'}">
                        </div>
                        <div class="name">
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="user-spell" v-show="playerLv >= 10">
            <ul class="nav nav-tabs">
                <li class="nav-item" v-for="(v, k) in dmgFilter" :key=k>
                    <a class="nav-link" :class="{active: dmgFilterSelected==v}" id="charInfo" @click="switchFilter(v)">{{v}}</a>
                </li>
            </ul>
            过滤: <select v-model="activeFilterSelected">
                <option v-for="(item, key) in activeFilter" :key="key">
                {{item}}
                </option>
            </select>
            <div class="container scrollbar-morpheus-den">
                <!-- 技能移除再添加后，进度条无法正常显示进度，添加一个强制刷新 -->
                <span v-show="false">{{forceRender}} </span>
                <div class="spell" v-for="(v, k) in filteredSpell" :key="k" :set="curLv=spell[v].level[spells[v].lv-1]">
                    <span class="largeIconContainer spellIcon">
                        <del :class="[{grey:spell[v].quality==1, green:spell[v].quality==3, blue:spell[v].quality==4, purple:spell[v].quality==5, orange:spell[v].quality==6}, 'largeIcon iconBorder']"></del>
                        <img :src="spell[v].iconSrc" alt="">
                    </span>
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
                        {{"消耗: "+curLv.cost['HP']+entryInfo['HP'].name}}
                    </span>
                    <span class="spellCost" v-if="curLv.cost['MP']">
                        {{"消耗: "+curLv.cost['MP']+entryInfo['MP'].name}}
                    </span>
                    <span class="spellCost" v-if="curLv.cost['MAXMP']">
                        {{"消耗: "+curLv.cost['MAXMP']*100+'%最大魔法值'}}
                    </span>
                    <span class="spellCost" v-if="curLv.cost['MAXHP']">
                        {{"消耗: "+curLv.cost['MAXHP']*100+'%最大生命值'}}
                    </span>
                    <span class="spellCost" v-if="curLv.cost['CURMP']">
                        {{"消耗: "+curLv.cost['CURMP']*100+'%当前魔法值'}}
                    </span>
                    <span class="spellCost" v-if="curLv.cost['CURHP']">
                        {{"消耗: "+curLv.cost['CURHP']*100+'%当前生命值'}}
                    </span>
                </div>
            </div>
        </div>
        <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
            <li @click="unEquip()">卸下</li>
            <li @click="equipEnhance()" v-if="(guild.smith.lv>=1)">强化</li>
            <li @click="equipForge()" v-if="(guild.smith.lv>=2)">重铸</li>
            <li @click="equipPotential()" v-if="(guild.smith.lv>=4)">洗炼</li>
            <!-- <li @click="equipLevelUp()" v-if="guild.smith.lv>=30 && currentEquip.lv < playerLv && currentEquip.quality.qualityLv>1">升级</li> -->
        </ul>
    </div>
</template>
<script>
import cTooltip from '../uiComponent/tooltip';
import hpmpBar from '../uiComponent/hpmpBar';
import currency from '../uiComponent/currency';

import {itemConfig} from '@/assets/config/itemConfig';
import {spellConfig} from '@/assets/config/spellConfig';
import {equipConfig} from '@/assets/config/equipConfig';
import {buffConfig} from '@/assets/config/buffConfig';
import Saveload from './saveload.vue';

export default {
    name: "charInfo",
    mixins: [itemConfig, spellConfig, equipConfig, buffConfig],
    components: {cTooltip, hpmpBar, Saveload, currency},
    data() {
        return {
            forceRender: 0,
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
    mounted() {
        this.$store.globalComponent.charInfo = this;
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
        playerEquips() {
            return {
                'helmet': this.$store.state.playerAttribute.helmet,
                'shoulder': this.$store.state.playerAttribute.shoulder,
                'necklace': this.$store.state.playerAttribute.necklace,
                'cape': this.$store.state.playerAttribute.cape,
                'weapon': this.$store.state.playerAttribute.weapon,
                'armor': this.$store.state.playerAttribute.armor,
                'bracer': this.$store.state.playerAttribute.bracer,
                'belt': this.$store.state.playerAttribute.belt,
                'glove': this.$store.state.playerAttribute.glove,
                'legging': this.$store.state.playerAttribute.legging,
                'ring': this.$store.state.playerAttribute.ring,
                'shoe': this.$store.state.playerAttribute.shoe,
            };
        },
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
            let name = document.getElementById("name").value;
            if(this.checkValidity(name)) {
                this.player.name = name;
                let quest = this.$store.globalComponent["quest"];
                quest.assignQuest(1);
                quest.$forceUpdate();
            }
        },
        checkValidity(name) {
            let alert = document.getElementById("charNameAlert");
            if(name.length < 1 || name.length > 8) {
                alert.innerHTML = "名字限定在1-8个字符之间, 别一天到晚整点阴间活";
                return false;
            }
            alert.innerHTML = "";
            return true;
        },
        unEquip() {
            let backpack = this.$store.globalComponent["backpack"];
            for (let i = 0; i < backpack.grid.length; i++) {
                if (Object.keys(backpack.grid[i]).length < 3) {
                    this.$set(backpack.grid, i, this.currentEquip);
                    switch (this.currentEquip.itemType) {
                        case 'helmet':
                            this.$store.commit('set_player_helmet', {});
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
                        case 'glove':
                            this.$store.commit('set_player_glove', {});
                            break;
                        case 'ring':
                            this.$store.commit('set_player_ring', {});
                            break;
                        case 'cape':
                            this.$store.commit('set_player_cape', {});
                            break;
                        case 'bracer':
                            this.$store.commit('set_player_bracer', {});
                            break;
                        case 'belt':
                            this.$store.commit('set_player_belt', {});
                            break;
                        case 'legging':
                            this.$store.commit('set_player_legging', {});
                            break;
                        case 'necklace':
                            this.$store.commit('set_player_necklace', {});
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
            let index = this.$store.globalComponent["index"];
            index.closeInfo();
            index.enhanceEquip = this.currentEquip;
            index.equipEnhancePanel = true;
        },
        equipForge() {
            let index = this.$store.globalComponent["index"];
            index.closeInfo();
            index.enhanceEquip = this.currentEquip;
            index.equipForgePanel = true;
        },
        equipPotential() {
            let index = this.$store.globalComponent["index"];
            index.closeInfo();
            index.enhanceEquip = this.currentEquip;
            index.equipPotentialPanel = true;
        },
        equipLevelUp() {
            let dust = ['dust2', 'dust3', 'dust4', 'dust5', 'dust6'];
            let itemInfo = this.$store.globalComponent["itemInfo"];
            let equipInfo = this.$store.globalComponent["equipInfo"];
            let quantity = Math.ceil(this.currentEquip.lv/10);
            let itemCode = dust[this.currentEquip.quality.qualityLv-2];
            let itemName = this.itemType[itemCode].description.name;
            let has = itemInfo.getItemQty(itemCode);
            this.$message({
                message: '消耗材料'+itemName+"*"+quantity+",目前拥有数量: "+has,
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
            let index = this.$store.globalComponent["index"];
            index.showInfo($event, type, item, compare);
        },
        closeInfo() {
            let index = this.$store.globalComponent["index"];
            index.closeInfo('equip');
        },
        openMenu(equip, e) {
            this.currentEquip = equip;
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
            box-shadow:  0 0 5px 1px rgba(255, 255, 255, 0.3);
    }
}
.user-status {
    position: absolute;
    top: 4rem;
    left: 0.5rem;
    padding: 0.5rem;
    border: 2px solid #ccc;
    border-image: url("/icons/ui/border2.png") 81 40/60px 50px/0.5rem round;
    height: 25rem;
    width: 25rem;
    display: flex;
    flex-direction: column;
    .lv {
        cursor: pointer;
        height: 2rem;
        width: 100%;
        margin: 0.7rem 0rem 0.1rem 0rem;
        padding-left: 0.2rem;
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
        height: 4rem;
        width: 100%;
        padding-left: 2rem;
        padding-right: 2rem;
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
                text-align: right;
                font-size: 11px;
                top: 10px;
                right: 0px;
                text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
            }
        }
    }
    .other {
        width: 100%;
        flex: 1;
        padding: 0.1rem;
        margin-top: -0.06rem;
        padding-left: 30px;
        padding-right: 30px;
        flex-wrap: wrap;
        display: flex;
        & > div,
        .item {
            cursor: pointer;
            width: 16.6%;
            padding-top: 0.1rem;
            padding-bottom: 0rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: column;
            .smallIconContainer {
                margin: initial;
            }
            .percent {
                margin-top: -5px;
                font-size: 10px;
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
    border-image: url("/icons/ui/border2.png") 81 40/60px 50px/0.5rem round;
    height: 25rem;
    width: 25rem;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    .uii {
        display: flex;
        width: calc(100% - 0.4rem);
    }
    .equips {
        padding: 0px 25px;
        width: 100%;
        height: 100%;
        flex: 1;
        flex-wrap: wrap;
        display: flex;
        cursor: pointer;
        .equip {
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: row;
            .title {
                display: flex;
                align-items: center;
                width: 100%;
                .mediumIconContainer {
                    margin: initial;
                }
                .icon {
                    position: relative;
                    width: 44px;
                    height: 44px;
                    background-color: #000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 5px;
                    img {
                        width: 90%;
                        height: 90%;
                    }
                }
                .name {
                    font-size: 0.85rem;
                    line-height: 1rem;
                    text-align: left;
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
    border-image: url("/icons/ui/border2.png") 81 40/60px 50px/0.5rem round;
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
            border-radius: 1rem;
            margin: 0.1rem;
            .spellIcon {
                position: absolute;
                left: 2px;
                top: 2px;
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
                font-size: 10.5px;
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
            border-radius: 100%;
            opacity: 0.7;
            background-image: linear-gradient(-270deg, rgba(167, 160, 160, 0) 0%, #ffffff93 40%, #ffffff93 60%, rgba(255,255,255,0.00) 100%);
        }
}
.nav {
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
    border-bottom: 1px solid #e6e5de;
}
</style>