<template>
  <div class="main" @contextmenu.prevent="contextmenu($event)">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" id="charInfo" @click="switchTab('charInfo')">角色信息</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="construct" @click="switchTab('construct')">建设</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
    <charInfo id="charInfo" v-show="displayPage=='charInfo'"></charInfo>

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
            <a v-if="v.equip" :style="{color:v.equip.quality.color}" @mouseover="showInfo($event,v.equip.itemType,v.equip)" @mouseleave="closeInfo">{{v.equip.description.name}}</a>
          </div>
        </div>
      </div>
    </div>
    
    <div class="map">
      <mapEvent></mapEvent>
      <div class="enermy">{{enermyName+" (Lv:"+enermyLv+")"}}
        <div class="progress" style="width:100%;">
          <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" :style="{width:enermyAttribute.CURHP.value/enermyAttribute.MAXHP.value*100+'%'}">
            <small class="justify-content-center d-flex position-absolute w-90" style="color:black">{{enermyAttribute.CURHP.showValue}} / {{enermyAttribute.MAXHP.showValue}} </small>
          </div>
        </div>
        
        <div class="other">
          <div class="item">
            <img src="../assets/icons/stat/atk.png" alt="">
            <div class="value">
              <span>{{enermyAttribute.ATK.showValue}}</span>
            </div>
          </div>
          <div class="item">
            <img src="../assets/icons/stat/ap.png" alt="">
            <div class="value">
              <span>{{enermyAttribute.AP.showValue}}</span>
            </div>
          </div>
          <div class="item">
            <img src="../assets/icons/stat/crit.png" alt="">
            <div class="value">
              <span>{{enermyAttribute.CRIT.showValue}}</span>
            </div>
          </div>
          <div class="item">
            <img src="../assets/icons/stat/arm.png" alt="">
            <div class="value">
              <span>
                {{enermyAttribute.DEF.showValue}}
                <div class="reducePercent">
                  ({{enermyAttribute.DEFRED.showValue}})
                </div>
              </span>
            </div>
          </div>
          <div class="item">
            <img src="../assets/icons/stat/mr2.png" alt="">
            <div class="value">
              <span>
                {{enermyAttribute.MR.showValue}}
              </span>
            </div>
          </div>
          <div class="item">
            <img src="../assets/icons/stat/critDmg2.png" alt="">
            <div class="value">
              <span>{{enermyAttribute.CRITDMG.showValue}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="zoneSelect">    
        <div class="zoneAction">
          <button id="trial" class="btn btn-outline-light btn-sm lvZone" @click="switchZone('trial')">
            试炼区
          </button>             
          <button id="advanture" class="btn btn-light btn-sm lvZone" @click="switchZone('advanture')">
            冒险区
          </button>       
          <button class="btn btn-success btn-sm" id="auto" @click="autoBattle()">
            自动战斗
          </button>        
          <br>
          <button class="btn btn-outline-light btn-sm" id="stopBattle" v-show="enermyAttribute.CURHP.value > 0" @click="stopBattle()">
            暂停/继续战斗
          </button>        
          <button class="btn btn-outline-light btn-sm" id="forfeitBattle" @click="forfeitBattle()">
            放弃当前战斗
          </button>   
        </div>    
        <div class="zone scrollbar-morpheus-den scrollbar-square">
          <div v-if="dungeonInfo.current=='trial'">
            <div class="zoneRow " v-for="(dungeon, key) in trialArr" :key="key">
              <span class="zoneCol" :class="{chose:v.status=='chose',restrict:v.status=='restrict',option:v.status=='option'}" @click="choseOption($event, k)" v-for="(v,k) in dungeon" :key="k">
                <img :src="v.img" alt="" v-if="v.img" :class="{option:v.status=='option'}">
              </span>
            </div>
          </div>
          <div v-if="dungeonInfo.current=='advanture'">
            <div class="zoneRow" v-for="(dungeon, key) in mapArr" :key="key">
              <span class="zoneCol" :class="{chose:v.status=='chose',restrict:v.status=='restrict',option:v.status=='option'}" @click="choseOption($event, k)" v-for="(v,k) in dungeon" :key="k">
                <img :src="v.img" alt="" v-if="v.img" :class="{option:v.status=='option'}">
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <backpack v-show="showBackpack"></backpack>

    <div class="menus">
      <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="menu" @click="openMenuPanel('backpack')">
            <img src="../assets/icons/menu/quest_icon_02.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 背包</p>
        </template>
      </cTooltip>

      <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="menu" @click="openMenuPanel('shop')">
            <img src="../assets/icons/menu/quest_icon_02.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 商 店</p>
        </template>
      </cTooltip>      
      <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="menu" @click="createMaps()">
            <img src="../assets/icons/menu/quest_icon_02.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 刷新当前世界副本</p>
          <p class="info">* 刷新有30秒钟的间隔</p>
          <p class="info">* 刷新时有较低概率同时刷新出高难度副本</p>
          <p class="info">* 刷新规则[lv-5,lv+6]</p>
        </template>
      </cTooltip>
    </div>
    <div class="displayEquip" :style='itemDialogStyle'>
      <equipInfo :equip="equip" v-show="showEquipInfo"></equipInfo>
      <equipInfo :equip="compareEquip" v-show="showEquipInfo&&compare"></equipInfo>
    </div>
    <equipEnhance :equip="enhanceEquip" v-show="equipEnhancePanel"></equipEnhance>
    <equipForge :equip="enhanceEquip" v-show="equipForgePanel"></equipForge>
  </div>

</template>
<script>
import cTooltip from './uiComponent/tooltip'
import equipInfo from './component/equipInfo'
import equipEnhance from './component/equipEnhance'
import equipForge from './component/equipForge'
import mapEvent from './component/mapEvent'
import backpack from './component/backpack'
import charInfo from './component/charInfo'
import { assist } from '../assets/js/assist'
import { dungeon } from '../assets/js/dungeon'
export default {
  name: 'index',
  mixins: [assist, dungeon],
  data() {
    return {
      showEquipInfo: false,
      showBackpack: false,
      compare: false,
      sysInfo: {},
      battleInfo: {},
      itemDialogStyle: {},
      trialArr: [],
      mapArr: [],
      equip: {},
      compareEquip: {},
      enhanceEquip: {},
      dungeonInfo: {},
      enermyInfo: {},
      equipEnhancePanel: false,
      equipForgePanel: false,
      displayPage: 'charInfo'
    }
  },
  components: {cTooltip, equipInfo, mapEvent, assist, backpack, equipEnhance, equipForge, charInfo},
  mounted() {    
    //初始系统、战斗信息
    this.sysInfo = this.$store.state.sysInfo;
    this.battleInfo = this.$store.state.battleInfo;
    this.dungeonInfo = this.$store.state.dungeonInfo;
    // 自动恢复
    this.autoHealthRecovery = setInterval(() => {
      this.$store.commit('set_player_hp', Math.round(this.attribute.MAXHP.value*0.01)+this.attribute.STR.value);
      if(this.attribute.CURHP.value == this.attribute.MAXHP.value && this.dungeonInfo.auto && !this.dungeonInfo.inBattle) {
        this.startBattle(this.dungeonInfo[this.dungeonInfo.current].option);
      }
    }, 1000);
    this.autoManRecovery = setInterval(() => {
      this.$store.commit('set_player_mp', Math.round(this.attribute.MAXMP.value*0.01)+this.attribute.INT.value);
    }, 1000);
    //初始生成地图
    this.createMaps('trial');
    this.createMaps('advanture');
    //测试·随机装备
    var equipInfo = this.findComponentDownward(this, 'equipInfo');   
    // var newEquip = JSON.parse(equipInfo.createEquip(0,2,'helmet'));
    var newEquip = JSON.parse(equipInfo.createEquip(0,1,'helmet'));
    this.$store.commit('set_player_helmet', this.$deepCopy(newEquip));
    // var newEquip = JSON.parse(equipInfo.createEquip(1,2,'necklace'));
    var newEquip = JSON.parse(equipInfo.createEquip(0,1,'necklace'));
    this.$store.commit('set_player_necklace', this.$deepCopy(newEquip));
    // var newEquip = JSON.parse(equipInfo.createEquip(2,2,'weapon'));
    var newEquip = JSON.parse(equipInfo.createEquip(0,1,'weapon'));
    this.$store.commit('set_player_weapon', this.$deepCopy(newEquip));
    // var newEquip = JSON.parse(equipInfo.createEquip(3,2,'armor'));
    var newEquip = JSON.parse(equipInfo.createEquip(0,1,'armor'));
    this.$store.commit('set_player_armor', this.$deepCopy(newEquip));
    // var newEquip = JSON.parse(equipInfo.createEquip(4,10,'shoe'));
    var newEquip = JSON.parse(equipInfo.createEquip(0,1,'shoe'));
    this.$store.commit('set_player_shoe', this.$deepCopy(newEquip));
    // var newEquip = JSON.parse(equipInfo.createEquip(5,20,'ring'));
    var newEquip = JSON.parse(equipInfo.createEquip(0,1,'ring'));
    this.$store.commit('set_player_ring', this.$deepCopy(newEquip));
  },
  computed: {
    enermyAttribute() { return this.$store.state.enermyAttribute.attribute },
    enermyName() { return this.$store.state.enermyAttribute.name },
    enermyLv() { return this.$store.state.enermyAttribute.lv },
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
        this.displayPage = type;
      }
    },
    switchZone(type){
      if(this.$store.state.dungeonInfo.inBattle) {
        this.autoBattle(false);
      }
      else {
        if(this.dungeonInfo.current != type) {
          var element = document.getElementById(this.dungeonInfo.current);
          element.classList.replace('btn-light', 'btn-outline-light');
          var element = document.getElementById(type);
          element.classList.replace('btn-outline-light', 'btn-light');
          this.$store.commit('set_enermy_hp', 'dead');
        }
        this.dungeonInfo.current = type;
      }
    },
    createMaps(type, level) {    
      var count = 5;  
      switch(type) {
        case 'trial':
          count = 20; 
          this.trialArr = this.generateDungeon(type, count);
          this.trialArr[0].forEach(e => {
              e.status = 'option';
          });
          break;
        case 'advanture':
          count = 5; 
          this.mapArr = this.generateDungeon(type, count);
          this.mapArr[0].forEach(e => {
              e.status = 'option';
          });
          break;
      }
      this.dungeonInfo[type].max = count;
      this.dungeonInfo[type].current = 0;
      this.dungeonInfo.current = type;
      if(level == undefined)
        this.dungeonInfo[type].level = this.$store.state.playerAttribute.lv;
      else
        this.dungeonInfo[type].level = level;
    },
    showInfo(e, type, item, compare) {
      this.showEquipInfo = true;
      this.compare = compare;
      this.equip = item;    
      if(compare) {
        let type = item.itemType;
        switch(type){
          case 'helmet':
            this.compareEquip = this.playerHelmet;
            break;
          case 'necklace':
            this.compareEquip = this.playerNecklace;
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
          case 'ring':
            this.compareEquip = this.playerRing;
            break;
          default:
            this.compareEquip = item;
        }
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
        default:
          this.showEquipInfo = false;
          this.equipEnhancePanel = false;
          this.equipForgePanel = false;
          this.compare = false;
      }
    },
    autoBattle(auto) {
      if(auto == undefined)
        this.dungeonInfo.auto = !this.dungeonInfo.auto;
      else
        this.dungeonInfo.auto = auto;
      var element = document.getElementById('auto')
      if(this.dungeonInfo.auto) {
        element.classList.replace('btn-success', 'btn-danger');
        element.innerHTML = '停止自动战斗';
        if(!this.$store.state.dungeonInfo.inBattle)
          // this.startBattle();
          this.stopBattle();
      }
      else {
        element.classList.replace('btn-danger', 'btn-success');
        element.innerHTML = '自动战斗';
      }
    },
    forfeitBattle() {
      if(this.$store.state.dungeonInfo.inBattle)
        this.stopBattle();
      this.$message({
        message: '这将重置当前地图，确认操作吗？',
        title: '提示',
        confirmBtnText: '重置',
        onClose: () => {
          this.$store.commit('set_enermy_hp', 'dead');
          this.createMaps(this.dungeonInfo.current);
        }
      })
    },
    stopBattle() {
      // var element = document.getElementById('stopBattle')
      if(this.$store.state.dungeonInfo.inBattle) {
        // element.innerHTML = '继续战斗';
        var mapEvent = this.findComponentDownward(this, 'mapEvent'); 
        clearInterval(mapEvent.battleTimer);
        this.$store.state.dungeonInfo.inBattle = false;
        this.autoBattle(false);
      }
      else {
        this.startBattle(this.dungeonInfo[this.dungeonInfo.current].option);
        // element.innerHTML = '停止战斗';
        this.$store.state.dungeonInfo.inBattle = true;
      }
    },
    startBattle(key) {
      var dungeon = this.dungeonInfo[this.dungeonInfo.current];
      if(dungeon.current >= dungeon.max) {
        this.createMaps(this.dungeonInfo.current);
        dungeon.current = 0;
        this.startBattle();
        return;
      }
      var mapEvent = this.findComponentDownward(this, 'mapEvent'); 
      var type = "";
      switch(this.dungeonInfo.current) {
        case 'trial':
          var ran = Math.floor(Math.random() * this.trialArr[dungeon.current].length);
          if(key != undefined)
            ran = key;
          type = this.trialArr[dungeon.current][ran].type;
          break;
        case 'advanture':
          var ran = Math.floor(Math.random() * this.mapArr[dungeon.current].length);
          if(key != undefined)
            ran = key;
          type = this.mapArr[dungeon.current][ran].type;
          break;
      }
      this.dungeonInfo[this.dungeonInfo.current].option = ran;
      if(type == 'normal' || type == 'elite' || type == 'boss')
        mapEvent.battle(type);
      if(type == 'chest')
        mapEvent.chest();

      switch(this.dungeonInfo.current) {
        case 'trial':
          this.trialArr[dungeon.current].forEach(e => {
              e.status = 'restrict';
          });
          this.trialArr[dungeon.current][dungeon.option].status = 'option';
          break;
        case 'advanture':
          this.mapArr[dungeon.current].forEach(e => {
              e.status = 'restrict';
          });
          this.mapArr[dungeon.current][dungeon.option].status = 'option';
          break;
      }
    },
    nextLevel() {
      var dungeon = this.dungeonInfo[this.dungeonInfo.current];
      dungeon.current += 1;
      if(dungeon.current >= dungeon.max) {
        if(this.dungeonInfo.current == 'trial') {
          this.$store.state.playerAttribute.lv += 1;
        }
        this.createMaps(this.dungeonInfo.current);
        dungeon.current = 0;
      }
    },
    choseOption(e, k) {
      if (e.target.classList.contains('option'))
        this.startBattle(k);
    },
    enableOption(type) {
      var dungeon = this.dungeonInfo[type];
      if(dungeon.current < dungeon.max) {
        switch(type) {
          case 'trial':
              if(dungeon.current > 0) {
                this.trialArr[dungeon.current-1][dungeon.option].status = 'chose';
              }
              this.trialArr[dungeon.current].forEach(e => {
                  e.status = 'option';
              });
            break;
          case 'advanture':
              if(dungeon.current > 0) {
                this.mapArr[dungeon.current-1][dungeon.option].status = 'chose';
              }
              this.mapArr[dungeon.current].forEach(e => {
                  e.status = 'option';
              });
        }
      }
      else
        this.createMaps(type);
    },
    openMenuPanel(type) {
      switch(type) {
        case 'backpack':
          this.showBackpack = !this.showBackpack;
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