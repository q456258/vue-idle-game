<template>
  <div class="main" @contextmenu.prevent="contextmenu($event)">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" id="charInfo" @click="switchTab('charInfo')">角色信息</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: displayPage=='guild' }" id="guild" @click="switchTab('guild')" v-show="playerLv >= 15">公会</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: displayPage=='guildMember' }" id="guildMember" @click="switchTab('guildMember')" v-show="playerLv >= 15">公会成员</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: displayPage=='shop' }" id="shop" @click="switchTab('shop')" v-show="guild.shop.lv > 10">商店</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="faq" @click="switchTab('faq')">FA♂Q</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="statistic" @click="switchTab('statistic')">统计</a>
      </li>
      <!-- <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li> -->
    </ul>

    <div class="sysInfo">
      <div class="battleInfo">
        <div class="clear" @click="clearBattleInfo">清除信息</div>
        <div id="battleInfo" class="scrollbar-morpheus-den">
          <div class="info" :class="{dmged:v.type=='dmged',dmg:v.type=='dmg',win:v.type=='win',lose:v.type=='lose'}" v-for="(v,k) in battleInfo" :key="k">
            <span>{{v.msg}}</span>
          </div>
        </div>
      </div>
      <div class="generalInfo">
        <div class="clear" @click="clearSysInfo">清除信息</div>
        <div id="sysInfo" class="scrollbar-morpheus-den">
          <div class="info warning" :class="{warning:v.type=='dmged',battle:v.type=='battle',win:v.type=='win',reward:v.type=='reward',}" v-for="(v,k) in sysInfo" :key="k">
            <span>{{v.msg}}</span>
            <a v-if="v.equip" :style="{color:v.equip.quality.color}" @mouseover="showInfo($event,v.equip.itemType,v.equip)" @mouseleave="closeInfo('equip')">{{v.equip.description.name}}</a>
            <a v-if="v.item" :style="{color:v.item.quality.color}" @mouseover="showInfo($event,'',v.item)" @mouseleave="closeInfo('item')">{{v.item.description.name}}*{{v.quantity}}</a>
          </div>
        </div>
      </div>
    </div>
    
    <div class="map">
      <enermyInfo :enermy="enermyInfo"></enermyInfo>
      <div class="zoneSelect">    
        <div class="zoneAction">
          <button id="trial" class="btn btn-outline-light btn-sm lvZone" @click="switchZone('trial')">
            试炼区
          </button>             
          <button id="advanture" class="btn btn-light btn-sm lvZone" @click="switchZone('advanture')">
            冒险区
          </button>    
          <!-- <button class="btn btn-success btn-sm" id="auto" @click="autoBattle()">
            自动战斗
          </button>        
          <br> -->
          <button class="btn btn-outline-light btn-sm" id="resetMap" v-show="dungeonInfo.current=='advanture'" @click="resetMap()">
            重置地图<span v-if="resetTime>0">({{resetTime}})</span>
          </button>   
          <button v-if="!inBattle&&dungeonInfo.current=='trial'" class="btn btn-success btn-sm" @click="toggleBattle('trial')">
            开始/继续战斗
          </button>
          <button v-if="inBattle" class="btn btn-danger btn-sm" @click="toggleBattle()">
            停止战斗
          </button>
        </div>    
        <div class="zone scrollbar-morpheus-den scrollbar-square">
          <mapEvent></mapEvent>
          <div v-if="dungeonInfo.current=='advanture'">
            <!-- <input class="target" type="number" :value="targetLv" @input="updateTargetLv" :max="maxLv" :min="minLv" />   -->
            <div class="dungeon" v-for="(dungeon, key) in mapArr" :key="key" @click="choseDungeon($event, key)" :style="{top:dungeon.top+'%', left:dungeon.left+'%'}">
              <!-- <img :src="dungeon.img" alt="" v-if="dungeon.img"> -->
              <span class="logo">
                <img :src="dungeon.img">
              </span>
              <span>lv{{dungeon.lv}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="menus">
      <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="menu" @click="openMenuPanel('backpack')">
            <img src="../assets/icons/menu/backpack1.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 背包</p>
        </template>
      </cTooltip>

      <!-- <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="menu" @click="openMenuPanel('shop')">
            <img src="../assets/icons/menu/shop.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 商 店</p>
        </template>
      </cTooltip>       -->
      <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="menu" @click="openMenuPanel('save')">
            <img src="../assets/icons/menu/save1.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 保存/加载游戏</p>
        </template>
      </cTooltip>
      <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="menu" @click="openMenuPanel('setting')">
            <img src="../assets/icons/menu/setting1.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 设置</p>
        </template>
      </cTooltip>
    </div>
    <div class="displayEquip" :style='itemDialogStyle'>
      <equipInfo :equip="equip" v-show="showEquipInfo"></equipInfo>
      <equipInfo :equip="compareEquip" v-show="showEquipInfo&&compare"></equipInfo>
      <compareEquip :equip="equip" :equip2="compareEquip" v-show="showEquipInfo&&compare"></compareEquip>
      <itemInfo :item="item" v-show="showItemInfo"></itemInfo>
    </div>
    <equipEnhance :equip="enhanceEquip" v-show="equipEnhancePanel"></equipEnhance>
    <equipForge :equip="enhanceEquip" v-show="equipForgePanel"></equipForge>    
    <equipPotential :equip="enhanceEquip" v-show="equipPotentialPanel"></equipPotential>    
    <saveload v-show="savePanel"></saveload>
    <setting v-show="settingPanel"></setting>

    <charInfo id="charInfo" v-show="displayPage=='charInfo'"></charInfo>
    <guild id="guild" v-show="displayPage=='guild'"></guild>
    <guildMember id="guildMember" v-show="displayPage=='guildMember'"></guildMember>
    <shop id="shop" v-show="displayPage=='shop'"></shop>
    <faq id="faq" v-show="displayPage=='faq'"></faq>
    <statistic id="statistic" v-show="displayPage=='statistic'"></statistic>
    <achievement id="achievement" v-show="displayPage=='achievement'"></achievement>
    <backpack v-show="showBackpack"></backpack>
  </div>

</template>
<script>
import cTooltip from './uiComponent/tooltip';
import equipInfo from './component/equipInfo';
import compareEquip from './component/compareEquip';
import itemInfo from './component/itemInfo';
import equipEnhance from './component/equipEnhance';
import equipForge from './component/equipForge';
import equipPotential from './component/equipPotential';
import mapEvent from './component/mapEvent';
import backpack from './component/backpack';
import charInfo from './component/charInfo';
import guild from './component/guild';
import guildMember from './component/guildMember';
import shop from './component/shop';
import faq from './component/faq';
import achievement from './component/achievement';
import statistic from './component/statistic';
import saveload from './component/saveload';
import setting from './component/setting';
import enermyInfo from './component/enermyInfo';
import { assist } from '../assets/js/assist';
import { dungeon } from '../assets/js/dungeon';
import { buffSystem } from '../assets/js/buffSystem';
export default {
  name: 'index',
  mixins: [assist, dungeon, buffSystem],
  data() {
    return {
      showEquipInfo: false,
      showItemInfo: false,
      showBackpack: false,
      compare: false,
      sysInfo: {},
      battleInfo: {},
      itemDialogStyle: {},
      mapArr: [],
      item: {},
      equip: {},
      compareEquip: {},
      enhanceEquip: {},
      dungeonInfo: {},
      dungeon: null,
      enermyInfo: 'advanture',
      equipEnhancePanel: false,
      equipForgePanel: false,
      equipPotentialPanel: false,
      savePanel: false,
      settingPanel: false,
      displayPage: 'charInfo',
      saveDateString: '',
      resetTimer: 0,
      resetTime: 0
    }
  },
  components: {cTooltip, equipInfo, compareEquip, itemInfo, mapEvent, assist, backpack, equipEnhance, equipForge, equipPotential, 
              charInfo, guild, guildMember, shop, faq, achievement, statistic, saveload, setting, enermyInfo},
  mounted() {    
    //读取本地存档
    var saveload = this.findComponentDownward(this, 'saveload');  
    var sd = localStorage.getItem('_sd');
    saveload.loadGame(sd);
    // 启用buff中心计时器
    this.buffTimer();
    
    var achievement = this.findComponentDownward(this, 'achievement');  
    achievement.set_statistic({gameStartDate: Date.now()});
    var guild = this.findComponentDownward(this, 'guild');  
    var guildPosition = this.findComponentDownward(guild, 'guildPosition');   
    guildPosition.init();
    
    // this.$store.commit("set_statistic", {gameStartDate: Date.now()});
    //初始系统、战斗信息
    this.sysInfo = this.$store.state.sysInfo;
    this.battleInfo = this.$store.state.battleInfo;
    this.dungeonInfo = this.$store.state.dungeonInfo;
    // 自动恢复
    this.fastTick(); 


    // 自动保存
    setInterval(() => {
      var saveload = this.findComponentDownward(this, 'saveload');  
      saveload.saveGame(true);
    }, 5 * 60 * 1000)

    //初始生成地图
    this.createMaps();
    //测试·随机装备
    // let equipLv = 40;
    // let equipQuality = 3;
    // var equipInfo = this.findComponentDownward(this, 'equipInfo');   
    // // var newEquip = JSON.parse(equipInfo.createEquip(0,2,'helmet'));
    // var newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'helmet'));
    // this.$store.commit('set_player_helmet', this.$deepCopy(newEquip));
    // // var newEquip = JSON.parse(equipInfo.createEquip(1,2,'accessory'));
    // var newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'accessory'));
    // this.$store.commit('set_player_accessory', this.$deepCopy(newEquip));
    // // var newEquip = JSON.parse(equipInfo.createEquip(2,2,'weapon'));
    // var newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'weapon'));
    // this.$store.commit('set_player_weapon', this.$deepCopy(newEquip));
    // // var newEquip = JSON.parse(equipInfo.createEquip(3,2,'armor'));
    // var newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'armor'));
    // this.$store.commit('set_player_armor', this.$deepCopy(newEquip));
    // // var newEquip = JSON.parse(equipInfo.createEquip(4,10,'shoe'));
    // var newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'shoe'));
    // this.$store.commit('set_player_shoe', this.$deepCopy(newEquip));
    // // var newEquip = JSON.parse(equipInfo.createEquip(5,20,'leg'));
    // var newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'shoulder'));
    // this.$store.commit('set_player_shoulder', this.$deepCopy(newEquip));
    
    // var test = ['spell_nature_thunderclap', 'spell_nature_lightning', 'spell_holy_crusaderstrike', 'spell_shadow_ritualofsacrifice', 'spell_holy_layonhands',
    //         'spell_fire_flamebolt', 'ability_druid_maul', 'ability_warrior_shieldbash', 'spell_nature_starfall', 'spell_arcane_starfire', 'spell_holy_holybolt']
    // var itemInfo = this.findComponentDownward(this, 'itemInfo');
    // test.forEach(name => {
    //   var item = itemInfo.createItem(name, 1);  
    //   itemInfo.addItem(JSON.parse(item));
    // })
    // var itemInfo = this.findComponentDownward(this, 'itemInfo');
    // var item = itemInfo.createItem('inv_box_02', 70);  
    // itemInfo.addItem(JSON.parse(item));

    this.$store.commit('set_player_attribute');
    var shop = this.findComponentDownward(this, 'shop');  
    shop.setEquipShopItem();
  },
  computed: {
    baseAttribute() { return this.$store.state.baseAttribute },
    trialAttribute() { return this.$store.state.trialAttribute.attribute },
    attribute() { return this.$store.state.playerAttribute.attribute },
    userGold() { return this.$store.state.guildAttribute.gold },
    playerWeapon() { return this.$store.state.playerAttribute.weapon },
    playerArmor() { return this.$store.state.playerAttribute.armor },
    playerAccessory() { return this.$store.state.playerAttribute.accessory },
    playerHelmet() { return this.$store.state.playerAttribute.helmet },
    playerShoe() { return this.$store.state.playerAttribute.shoe },
    playerShoulder() { return this.$store.state.playerAttribute.shoulder },
    playerLv() { return this.$store.state.playerAttribute.lv },
    inBattle() { return this.$store.state.dungeonInfo.inBattle;},
    guild() { return this.$store.state.guildAttribute;},
    // operatorSchemaIsMobile() { return this.$store.state.operatorSchemaIsMobile }
    // healthRecoverySpeed() { return this.$store.state.playerAttribute.healthRecoverySpeed },

  },  
  watch: {
    sysInfo() {
      var element = document.getElementById('sysInfo')
      //渲染完成后滚至最下端
      this.$nextTick(() => {
        element.scrollTop = element.scrollHeight + 20;
      })
    },
    battleInfo() {
      var element = document.getElementById('battleInfo')
      //渲染完成后滚至最下端
      this.$nextTick(() => {
        element.scrollTop = element.scrollHeight + 20;
      })
    },
  },
  methods: {
    switchTab(type){
      if(this.displayPage != type) {
        var element = document.getElementById(this.displayPage);
        element.classList.remove('active');
        var element = document.getElementById(type);
        element.classList.add('active');
        element.classList.remove('glow');
        this.displayPage = type;
      }
    },
    switchZone(type){
      if(this.dungeonInfo.current != type) {
        var mapEvent = this.findComponentDownward(this, 'mapEvent'); 
        if(this.$store.state.dungeonInfo.inBattle) {
            mapEvent.toggleBattle();
        }
        mapEvent.autoBattle(false);
        var element = document.getElementById(this.dungeonInfo.current);
        element.classList.replace('btn-light', 'btn-outline-light');
        var element = document.getElementById(type);
        element.classList.replace('btn-outline-light', 'btn-light');
        // this.$store.commit('set_enermy_hp', 0);
        this.dungeonInfo.current = type;
        if(type == 'trial') {
          mapEvent.startBattle('trial');
          mapEvent.toggleBattle();
          this.enermyInfo = 'trial';
        }
        else
          this.enermyInfo = 'advanture';
      }
    },
    toggleBattle(type='') {
      var mapEvent = this.findComponentDownward(this, 'mapEvent'); 
      mapEvent.toggleBattle(type);
    },
    createMaps() {    
      var count = 5;
      var type = 'advanture';
      this.mapArr = this.generateDungeon(type, count, this.playerLv);

      this.dungeonInfo[type].level = -1;
      this.dungeonInfo[type].reward = 'None';
      this.dungeonInfo[type].type = 'normal';
      this.dungeonInfo[type].templateId = 0;
      this.dungeonInfo.current = type;
    },
    showInfo(e, type, item, compare) {
      this.compare = compare;
      var equip = ['helmet', 'accessory', 'weapon', 'armor', 'shoe', 'shoulder'];
      if(equip.indexOf(type) != -1) {
        this.showEquipInfo = true;
        this.equip = item;    
        if(compare) {
          let type = item.itemType;
          switch(type){
            case 'helmet':
              this.compareEquip = this.playerHelmet;
              break;
            case 'accessory':
              this.compareEquip = this.playerAccessory;
              break;
            case 'weapon':
              this.compareEquip = this.playerWeapon;
              break;
            case 'armor':
              this.compareEquip = this.playerArmor;
              break;
            case 'shoe':
              this.compareEquip = this.playerShoe;
              break;
            case 'shoulder':
              this.compareEquip = this.playerShoulder;
              break;
            default:
              this.compareEquip = item;
          }
        }
      }
      else {
        this.showItemInfo = true;
        this.item = item;    
      }
      let x = e.pageX, y = e.pageY, maxH = window.innerHeight;
      if (y < window.innerHeight / 2) {
        this.itemDialogStyle = {
          display: 'flex',
          'top': y + 20 + 'px',
          'left': x + 20 + 'px',
        }
      } else {
        this.itemDialogStyle = {
          display: 'flex',
          'bottom': maxH - y + 20 + 'px',
          'left': x + 20 + 'px',
        }
      }
    },
    closeInfo(type='all') {
      switch(type) {
        case 'item':
          this.showItemInfo = false;
          break;
        case 'equip':
          this.showEquipInfo = false;
          this.compare = false;
          break;
        case 'enhance':
          this.equipEnhancePanel = false;
          break;
        case 'forge':
          this.equipForgePanel = false;
          break;
        case 'potential':
          this.equipPotentialPanel = false;
          break;
        default:
          this.showItemInfo = false;
          this.showEquipInfo = false;
          this.equipEnhancePanel = false;
          this.equipForgePanel = false;
          this.equipPotentialPanel = false;
          this.compare = false;
      }
    },
    choseDungeon(e, k) {
      if(!this.dungeonInfo.inBattle) {
        var mapEvent = this.findComponentDownward(this, 'mapEvent'); 
        mapEvent.curDungeon = this.$deepCopy(this.mapArr[k]);
        this.dungeon = this.mapArr[k];
        var dungeon = this.dungeonInfo[this.dungeonInfo.current];
        dungeon.level = this.dungeon.lv;
        dungeon.reward = this.dungeon.reward;
        dungeon.type = this.dungeon.type;
        dungeon.templateId = this.dungeon.templateId;
      }
    },
    resetMap() {
      var element = document.getElementById('resetMap');
      var mapEvent = this.findComponentDownward(this, 'mapEvent'); 
      if(this.resetTime > 0) {
        return;
      }
      if(this.$store.state.dungeonInfo.inBattle)
        mapEvent.toggleBattle();
      this.set_enermy_hp('dead');
      this.createMaps();
      this.resetTime = 10;
      element.disabled = true;
      this.resetTimer = setInterval(() => {
        this.resetTime -= 1;
        if(this.resetTime == 0) {
          clearInterval(this.resetTimer);
          element.disabled = false;
        }
      }, 1000);
    },
    slowTick() {
      clearInterval(this.autoHealthRecovery);
      clearInterval(this.autoManRecovery);
      clearInterval(this.trialAutoHealthRecovery);
      this.autoHealthRecovery = setInterval(() => {
        var achievement = this.findComponentDownward(this, 'achievement');  
        var mapEvent = this.findComponentDownward(this, 'mapEvent');  
        achievement.set_statistic({gameTime: 1000});
        // this.$store.commit("set_statistic", {gameTime: 1000});
        this.set_player_hp(Math.ceil(this.attribute.MAXHP.value*0.01+this.attribute.STR.value), this.$store.state.playerAttribute);
        if(this.attribute.CURHP.value == this.attribute.MAXHP.value && this.dungeonInfo.auto && !this.dungeonInfo.inBattle) {
          mapEvent.startBattle(this.dungeonInfo[this.dungeonInfo.current].option);
        }
      }, 1000);
      this.autoManRecovery = setInterval(() => {
        this.$store.commit('set_player_mp', Math.ceil(this.attribute.MAXMP.value*0.01+this.attribute.INT.value/4));
      }, 1000);
      this.trialAutoHealthRecovery = setInterval(() => {
        this.set_trial_hp(Math.ceil(this.trialAttribute.MAXHP.value*0.02));
      }, 1000);  
    },
    fastTick() {
      clearInterval(this.autoHealthRecovery);
      clearInterval(this.autoManRecovery);
      clearInterval(this.trialAutoHealthRecovery);
      this.autoHealthRecovery = setInterval(() => {
        var achievement = this.findComponentDownward(this, 'achievement');  
        var mapEvent = this.findComponentDownward(this, 'mapEvent');  
        achievement.set_statistic({gameTime: 50});
        // this.$store.commit("set_statistic", {gameTime: 50});
        this.set_player_hp(Math.ceil(this.attribute.MAXHP.value*0.0005+this.attribute.STR.value/20), this.$store.state.playerAttribute);
        if(this.attribute.CURHP.value == this.attribute.MAXHP.value && this.dungeonInfo.auto && !this.dungeonInfo.inBattle) {
          mapEvent.startBattle(this.dungeonInfo[this.dungeonInfo.current].option);
        }
      }, 50);
      this.autoManRecovery = setInterval(() => {
        this.$store.commit('set_player_mp', Math.ceil(this.attribute.MAXMP.value*0.0005+this.attribute.INT.value/80));
      }, 50);
      this.trialAutoHealthRecovery = setInterval(() => {
        this.set_trial_hp(Math.ceil(this.trialAttribute.MAXHP.value*0.001));
      }, 50);  
    },
    openMenuPanel(type) {
      switch(type) {
        case 'backpack':
          this.showBackpack = !this.showBackpack;
          break;
        case 'save':
          this.savePanel = !this.savePanel;
          var saveload = this.findComponentDownward(this, 'saveload');  
          saveload.saveGame();
          break;
        case 'setting':
          this.settingPanel = !this.settingPanel;
          break;
      }
    },
    closeMenuPanel(type) {
      switch(type) {
        case 'backpack':
          this.showBackpack = false;
          break;
        case 'save':
          this.savePanel = false;
          var saveload = this.findComponentDownward(this, 'saveload');  
          saveload.saveGame();
          break;
        case 'setting':
          this.settingPanel = false;
          break;
      }
    },
    clearSysInfo() {
      this.$store.commit('clear_sys_info')
    },
    clearBattleInfo() {
      this.$store.commit('clear_battle_info')
    },
    contextmenu(e) {
      // 鼠标右键
    },
  }
}

</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.armorPanel {
    color: #f1f1f1;
    width: 4rem;
    height: auto;
    background: rgba(0, 0, 0, 0.8);
    border: #393839;
    border-radius: 0.05rem;
    padding: 0.16rem;
    box-sizing: border-box;
  }
</style>