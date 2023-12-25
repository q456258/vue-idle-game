<template>
  <div class="main" @contextmenu.prevent="contextmenu($event)">
    <svg style="display: none">
        <filter id="greyBorder">
            <feColorMatrix type="matrix" values="0.4 0 0 0 0 0 0.4 0 0 0 0 0 0.4 0 0 0 0 0 1 0"></feColorMatrix>
        </filter>
        <filter id="greenBorder">
            <feColorMatrix type="matrix" values="0.1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"></feColorMatrix>
        </filter>
        <filter id="blueBorder">
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0.44 0 0 0 0 0 0.87 0.4 0 0 0 0 1 0"></feColorMatrix>
        </filter>
        <filter id="purpleBorder">
            <feColorMatrix type="matrix" values="0.4 0 0 0 0.25 0 0 0 0 0 0 0 1 0.25 0 0 0 0 1 0"></feColorMatrix>
        </filter>
        <filter id="orangeBorder">
            <feColorMatrix type="matrix" values="1 0 0 0 0.25 0 0.4 0 0 0 0 0 0 0 0 0 0 0 1 0"></feColorMatrix>
        </filter>
    </svg>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" id="charInfo" @click="switchTab('charInfo')">角色信息</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: displayPage=='guild' }" id="guild" @click="switchTab('guild')" v-show="playerLv >= 10">公会</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: displayPage=='guildMember' }" id="guildMember" @click="switchTab('guildMember')" v-show="guild.bar.lv > 0">公会成员</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: displayPage=='shop' }" id="shop" @click="switchTab('shop')" v-show="guild.shop.lv > 0">商店</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: displayPage=='talentTree' }" id="talentTree" @click="switchTab('talentTree')" v-show="playerLv >= 10">天赋</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="faq" @click="switchTab('faq')">FA♂Q</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="statistic" @click="switchTab('statistic')">统计</a>
      </li>
    </ul>

    <div class="sysInfo">
      <div class="battleInfo">
        <div class="clear" @click="clearBattleInfo">清除信息</div>
        <div id="battleInfo" class="scrollbar-morpheus-den">
          <div class="info" :class="{danger:v.type=='danger',dmg:v.type=='dmg',win:v.type=='win',lose:v.type=='lose'}" v-for="(v,k) in battleInfo" :key="k">
            <span v-if="v.source=='player'" style="color:#00ff00">【友】</span>
            <span v-else-if="v.source==undefined"></span>
            <span v-else style="color:#ff0000">【敌】</span>
            <span v-if="v.msg">{{v.msg}}</span>
            <span v-if="v.html" v-html="v.html"></span>
          </div>
        </div>
      </div>
      <div class="generalInfo">
        <div class="clear" @click="clearSysInfo">清除信息</div>
        <div id="sysInfo" class="scrollbar-morpheus-den">
          <div class="info warning" :class="{danger:v.type=='danger',battle:v.type=='battle',win:v.type=='win',reward:v.type=='reward',}" v-for="(v,k) in sysInfo" :key="k">
            <span>{{v.msg}}</span>
            <a v-if="v.equip" :style="{color:v.equip.quality.color}" @mouseover="showInfo($event,v.equip.itemType,v.equip)" @mouseleave="closeInfo('equip')">{{v.equip.description.name}}</a>
            <a v-if="v.item" :style="{color:v.item.quality.color}" @mouseover="showInfo($event,'',v.item)" @mouseleave="closeInfo('item')">{{v.item.description.name}}*{{v.quantity}}</a>
            <a v-if="v.gold"><currency :isCost="false" :amount="v.gold"></currency> </a>
          </div>
        </div>
      </div>
    </div>
    
    <div class="map">
      <enemyInfo :enemy="enemyInfo"></enemyInfo>
      <div class="zoneSelect">    
        <div class="zoneAction">    
          <button id="normal" class="btn btn-light btn-sm lvZone" @click="switchZone('normal')">
            普通
          </button>    
          <button id="elite" class="btn btn-outline-light btn-sm lvZone" @click="switchZone('elite')">
            精英
          </button>    
          <button id="boss" class="btn btn-outline-light btn-sm lvZone" @click="switchZone('boss')">
            BOSS
          </button>    
          <div class="refresh btn btn-secondary" @click="changeEnemy(dungeonInfo.current)" v-if="dungeonInfo.current != 'boss'"></div>
          <br>
          <button class="btn btn-secondary " @click="modLvAndSetEnemy(dungeonInfo.current, -1)">降低等级</button>
          <button class="btn btn-secondary " @click="modLvAndSetEnemy(dungeonInfo.current, 1)">提升等级</button>
        </div>    
        <mapEvent :type="dungeonInfo.current"></mapEvent>
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
          <p class="info">* 背包 (B)</p>
        </template>
      </cTooltip>
      <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="menu" @click="openMenuPanel('quest')">
            <img src="../assets/icons/menu/quest.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 任务 (Q)</p>
        </template>
      </cTooltip>
      <cTooltip :placement="'top'" v-if="(guild.bar.lv>=1)">
        <template v-slot:content>
          <div class="menu" @click="openMenuPanel('dungeon')">
            <img src="../assets/icons/menu/dungeon.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 副本 (D)</p>
        </template>
      </cTooltip>
      <cTooltip :placement="'top'" v-if="guild['smith'].lv>=3">
        <template v-slot:content>
          <div class="menu" @click="openMenuPanel('craft')">
            <img src="../assets/icons/menu/craft.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 锻造 (C)</p>
        </template>
      </cTooltip>
      <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="menu" @click="openMenuPanel('save')">
            <img src="../assets/icons/menu/save1.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 保存/加载游戏 (S)</p>
        </template>
      </cTooltip>
      <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="menu" @click="openMenuPanel('setting')">
            <img src="../assets/icons/menu/setting1.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 设置 (X)</p>
        </template>
      </cTooltip>
    </div>
    <div class="displayEquip" :style='itemDialogStyle'>
      <equipInfo :equip="equip" v-show="showEquipInfo"></equipInfo>
      <equipInfo :equip="compareEquip" v-show="showEquipInfo&&compare"></equipInfo>
      <!-- <compareEquip :equip="equip" :equip2="compareEquip" v-show="showEquipInfo&&compare"></compareEquip> -->
      <itemInfo :item="item" v-show="showItemInfo"></itemInfo>
    </div>
    <equipEnhance :equip="enhanceEquip" v-show="equipEnhancePanel"></equipEnhance>
    <equipForge :equip="enhanceEquip" v-show="equipForgePanel"></equipForge>    
    <equipPotential :equip="enhanceEquip" v-show="equipPotentialPanel"></equipPotential> 
    <lottery v-show="lotteryPanel"></lottery>
    <quest v-show="questPanel"></quest>   
    <dungeon v-show="dungeonPanel"></dungeon>
    <craftItem v-show="craftPanel"></craftItem>
    <saveload v-show="savePanel"></saveload>
    <setting v-show="settingPanel"></setting>

    <charInfo id="charInfo" v-show="displayPage=='charInfo'"></charInfo>
    <guild id="guild" v-show="displayPage=='guild'"></guild>
    <guildMember id="guildMember" v-show="displayPage=='guildMember'"></guildMember>
    <shop id="shop" v-show="displayPage=='shop'"></shop>
    <talentTree id="talentTree" v-show="displayPage=='talentTree'"></talentTree>
    <faq id="faq" v-show="displayPage=='faq'"></faq>
    <statistic id="statistic" v-show="displayPage=='statistic'"></statistic>
    <achievement id="achievement" v-show="displayPage=='achievement'"></achievement>
    <backpack v-show="showBackpack"></backpack>
  </div>

</template>
<script>
import cTooltip from './uiComponent/tooltip';
import currency from './uiComponent/currency';
import equipInfo from './component/equipInfo';
import compareEquip from './component/compareEquip';
import itemInfo from './component/itemInfo';
import equipEnhance from './component/equipEnhance';
import equipForge from './component/equipForge';
import equipPotential from './component/equipPotential';
import mapEvent from './component/mapEvent';
import lottery from './component/lottery';
import dungeon from './component/dungeon';
import backpack from './component/backpack';
import charInfo from './component/charInfo';
import guild from './component/guild';
import guildMember from './component/guildMember';
import shop from './component/shop';
import talentTree from './component/talentTree';
import faq from './component/faq';
import achievement from './component/achievement';
import statistic from './component/statistic';
import saveload from './component/saveload';
import setting from './component/setting';
import quest from './component/quest';
import craftItem from './component/craftItem';
import enemyInfo from './component/enemyInfo';
import { map } from '../assets/js/map';
import { buffAndTrigger } from '../assets/js/buffAndTrigger';
export default {
  name: 'index',
  mixins: [map, buffAndTrigger],
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
      enemyInfo: 'normal',
      equipEnhancePanel: false,
      equipForgePanel: false,
      equipPotentialPanel: false,
      dungeonPanel: false,
      lotteryPanel: false,
      savePanel: false,
      settingPanel: false,
      questPanel: false,
      craftPanel: false,
      displayPage: 'charInfo',
      saveDateString: '',
      resetTimer: 0,
      resetTime: 0,
      selectedZone: 0
    }
  },
  components: {cTooltip, equipInfo, compareEquip, itemInfo, mapEvent, lottery, dungeon, backpack, equipEnhance, equipForge, equipPotential, craftItem,
              charInfo, guild, guildMember, shop, talentTree, faq, achievement, statistic, saveload, setting, quest, enemyInfo, currency},
  created() {
    this.$store.globalComponent = {};
  },
  mounted() {    
    this.$store.globalComponent.index = this;
    //读取本地存档
    let saveload =  this.$store.globalComponent['saveload'];  
    let sd = localStorage.getItem('_sd');
    saveload.loadGame(sd);
    // 启用buff中心计时器
    this.buffTimer();
    
    let achievement =  this.$store.globalComponent['achievement'];  
    achievement.set_statistic({gameStartDate: Date.now()});

    let talentTree =  this.$store.globalComponent['talentTree'];  
    talentTree.init();

    let quest =  this.$store.globalComponent['quest'];  
    quest.init();

    let guildPosition =  this.$store.globalComponent['guildPosition'];   
    guildPosition.init();

    let dungeon =  this.$store.globalComponent['dungeon'];   
    dungeon.init();

    let battleAnime =  this.$store.globalComponent['battleAnime'];   
    battleAnime.init();

    let mapEvent =  this.$store.globalComponent['mapEvent'];   
    mapEvent.init();
    
    // this.$store.commit("set_statistic", {gameStartDate: Date.now()});
    //初始系统、战斗信息
    this.sysInfo = this.$store.state.sysInfo;
    this.battleInfo = this.$store.state.battleInfo;
    this.dungeonInfo = this.$store.state.dungeonInfo;
    // 自动恢复
    this.slowTick(); 

    // 自动保存
    setInterval(() => {
      let saveload = this.$store.globalComponent["saveload"];  
      saveload.saveGame(true);
    }, 5 * 60 * 1000)

    //初始生成怪物数据
    this.generateEnemy('normal');
    this.generateEnemy('elite');
    this.generateEnemy('boss');
    //测试·随机装备
    // let equipLv = 100;
    // let equipQuality = 5;
    // // let optional = {baseOption: ['STR', 'AGI', 'STA']};
    // let optional = {};
    // let qualitySet = 0;
    // let equipInfo = this.$store.globalComponent["equipInfo"];;   
    // let newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'helmet', qualitySet, optional));
    // this.$store.commit('set_player_helmet', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'weapon', qualitySet, optional));
    // this.$store.commit('set_player_weapon', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'armor', qualitySet, optional));
    // this.$store.commit('set_player_armor', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'shoe', qualitySet, optional));
    // this.$store.commit('set_player_shoe', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'shoulder', qualitySet, optional));
    // this.$store.commit('set_player_shoulder', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'glove', qualitySet, optional));
    // this.$store.commit('set_player_glove', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'ring', qualitySet, optional));
    // this.$store.commit('set_player_ring', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'cape', qualitySet, optional));
    // this.$store.commit('set_player_cape', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'bracer', qualitySet, optional)); 
    // this.$store.commit('set_player_bracer', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'belt', qualitySet, optional));
    // this.$store.commit('set_player_belt', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'legging', qualitySet, optional));
    // this.$store.commit('set_player_legging', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'necklace', qualitySet, optional));
    // this.$store.commit('set_player_necklace', this.$deepCopy(newEquip));

            // this.$store.state.playerAttribute.lv = 50;
//     let itemInfo = this.$store.globalComponent["itemInfo"];;
//     let item ;
//     let items = [
// 'bossTicket0',
// 'bossTicket1',
// 'bossTicket2',
// 'bossTicket3',
// 'bossTicket4',
// 'bossTicket5',
// 'bossTicket6',
// ];
//     for(let i in items) {
//       item = itemInfo.createItem(items[i], 60);  
//       itemInfo.addItem(JSON.parse(item));
//     }
    // for(let i in quest.questList) {
    //   quest.assignQuest(i);
    // }

    this.$store.commit('set_player_attribute');
    let shop = this.$store.globalComponent["shop"];  
    shop.setEquipShopItem();
  },
  computed: {
    baseAttribute() { return this.$store.state.baseAttribute },
    attribute() { return this.$store.state.playerAttribute.attribute },
    userGold() { return this.$store.state.guildAttribute.gold },
    playerWeapon() { return this.$store.state.playerAttribute.weapon },
    playerArmor() { return this.$store.state.playerAttribute.armor },
    playerHelmet() { return this.$store.state.playerAttribute.helmet },
    playerShoe() { return this.$store.state.playerAttribute.shoe },
    playerShoulder() { return this.$store.state.playerAttribute.shoulder },
    playerGlove() { return this.$store.state.playerAttribute.glove },
    playerRing() { return this.$store.state.playerAttribute.ring },
    playerCape() { return this.$store.state.playerAttribute.cape },
    playerBracer() { return this.$store.state.playerAttribute.bracer },
    playerBelt() { return this.$store.state.playerAttribute.belt },
    playerLegging() { return this.$store.state.playerAttribute.legging },
    playerNecklace() { return this.$store.state.playerAttribute.necklace },

    playerLv() { return this.$store.state.playerAttribute.lv },
    playerTalent() { return this.$store.state.playerAttribute.talent },
    inBattle() { return this.$store.state.dungeonInfo.inBattle;},
    harvesting() { 
      let mapEvent = this.$store.globalComponent["mapEvent"];
      return mapEvent.harvesting;
    },
    guild() { return this.$store.state.guildAttribute;},
    filteredMonsterZone() {
      return this.monsterZone.filter((zone)=>{return (this.playerLv+20)>=zone.maxLv});
      // return this.monsterZone.filter((zone)=>{return (this.playerLv+120)>=zone.maxLv});
    }
    // operatorSchemaIsMobile() { return this.$store.state.operatorSchemaIsMobile }
    // healthRecoverySpeed() { return this.$store.state.playerAttribute.healthRecoverySpeed },

  },  
  watch: {
    sysInfo() {
      let element = document.getElementById('sysInfo')
      //渲染完成后滚至最下端
      this.$nextTick(() => {
        element.scrollTop = element.scrollHeight + 20;
      })
    },
    battleInfo() {
      let element = document.getElementById('battleInfo')
      //渲染完成后滚至最下端
      this.$nextTick(() => {
        element.scrollTop = element.scrollHeight + 20;
      })
    },
  },
  methods: {
    switchTab(type){
      if(this.displayPage != type) {
        let element = document.getElementById(this.displayPage);
        element.classList.remove('active');

        element = document.getElementById(type);
        element.classList.add('active');
        element.classList.remove('glow');
        this.displayPage = type;
      }
    },
    switchZone(type){
      if(this.dungeonInfo.current != type) {
        if(this.dungeon) {
          this.dungeon.selected = false;
        }
        let mapEvent = this.$store.globalComponent["mapEvent"];
        if(this.inBattle) {
            mapEvent.toggleBattle();
        }
        if(this.harvesting) {
            mapEvent.toggleHarvest();
        }
        mapEvent.autoBattle(false);
        let element = document.getElementById(this.dungeonInfo.current);
        element.classList.replace('btn-light', 'btn-outline-light');
        element = document.getElementById(type);
        element.classList.replace('btn-outline-light', 'btn-light');
        // this.$store.commit('set_enemy_hp', 0);
        this.enemyInfo = type;
        this.dungeonInfo.current = type;
      }
    },
    modLvAndSetEnemy(type, multi) {
      let mapEvent = this.$store.globalComponent["mapEvent"];
      let lv = 5;
      if(type == 'elite' || type == 'boss')
        lv = 1;
      lv *= multi;
      if(this.modLv(type, lv)) {
        mapEvent.toggleBattle();
        this.generateEnemy(type);
        mapEvent.setReward(type);
      }
    },
    changeEnemy(type) {
      let mapEvent = this.$store.globalComponent["mapEvent"];
      if(type == 'normal')
        this.normalEnemyType = this.normalEnemyType==0 ? 1 : 0;
      else if(type == 'elite')
        this.eliteEnemyType = this.eliteEnemyType==0 ? 1 : 0;
      mapEvent.toggleBattle();
      this.generateEnemy(type);
    },
    toggleBattle(type) {
      let mapEvent = this.$store.globalComponent["mapEvent"];
      mapEvent.toggleBattle(type);
    },
    showInfo(e, type, item, compare) {
      this.compare = compare;
      let equip = ['helmet', 'weapon', 'armor', 'shoe', 'shoulder', 'glove', 'ring', 'cape', 'bracer', 'belt', 'legging', 'necklace'];

      if(equip.indexOf(type) != -1) {
        this.showEquipInfo = true;
        this.equip = item;    
        if(compare) {
          let type = item.itemType;
          switch(type){
            case 'helmet':
              this.compareEquip = this.playerHelmet;
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
            case 'glove':
              this.compareEquip = this.playerGlove;
              break;
            case 'ring':
              this.compareEquip = this.playerRing;
              break;
            case 'cape':
              this.compareEquip = this.playerCape;
              break;
            case 'bracer':
              this.compareEquip = this.playerBracer;
              break;
            case 'belt':
              this.compareEquip = this.playerBelt;
              break;
            case 'legging':
              this.compareEquip = this.playerLegging;
              break;
            case 'necklace':
              this.compareEquip = this.playerNecklace;
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
        case 'craft':
          this.craftPanel = false;
          break;
        case 'potential':
          this.equipPotentialPanel = false;
          break;
        // 不受‘关闭全部’影响
        case 'lottery':
          this.lotteryPanel = false;
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
    slowTick() {
      clearInterval(this.autoHealthRecovery);
      clearInterval(this.autoManRecovery);
      this.autoHealthRecovery = setInterval(() => {
        let mapEvent = this.$store.globalComponent["mapEvent"];
        let player = this.$store.state.playerAttribute;
        let recover = 0.10;
        let bonus = 1;
        let talent = 'ability_hunter_harass';
        if(this.playerTalent[talent] > 0) {
          bonus += this.playerTalent[talent]*0.05;
        }
        let amount = this.attribute.MAXHP.value*recover+5*this.attribute.STA.value;
        amount *= bonus;
        if(this.inBattle) {
          return;
        } 
        else {
          this.set_player_hp(Math.ceil(amount), player);
        }
        if(this.attribute.CURHP.value == this.attribute.MAXHP.value && this.dungeonInfo.auto) {
          setTimeout(() => {
            if(!this.inBattle)
              mapEvent.startBattle(this.dungeonInfo.current);
          }, 200);
        }
      }, 5000);
      this.autoManRecovery = setInterval(() => {
        let player = this.$store.state.playerAttribute;
        let recover = 0.10;
        let bonus = 1;
        let talent = 'spell_arcane_studentofmagic';
        let amount = 5*this.attribute.SPI.value;
        if(this.playerTalent[talent] > 0) {
          bonus += this.playerTalent[talent]*0.05;
        }
        if(!this.inBattle) {
          amount += this.attribute.MAXMP.value*recover;
          talent = 'spell_arcane_mindmastery';
          if(this.playerTalent[talent] > 0) {
            amount *= (1+this.playerTalent[talent]*0.1);
          }
          amount *= bonus;
        }
        else {
          amount = this.attribute.SPI.value;
          amount *= bonus;
        }
        this.mpChange(player, player, Math.ceil(amount));
      }, 5000);
    },
    openMenuPanel(type) {
      let saveload = this.$store.globalComponent["saveload"];  
      let quest = this.$store.globalComponent["quest"];
      switch(type) {
        case 'backpack':
          this.showBackpack = !this.showBackpack;
          break;
        case 'save':
          this.savePanel = !this.savePanel;
          quest.trackProgress('event', 3, 1);
          saveload.saveGame();
          break;
        case 'setting':
          this.settingPanel = !this.settingPanel;
          break;
        case 'quest':
          this.questPanel = !this.questPanel;
          break;
        case 'dungeon':
          this.dungeonPanel = !this.dungeonPanel;
          break;
        case 'craft':
          this.craftPanel = !this.craftPanel;
          break;
      }
    },
    closeMenuPanel(type) {
      let saveload = this.$store.globalComponent["saveload"];  
      switch(type) {
        case 'backpack':
          this.showBackpack = false;
          break;
        case 'save':
          this.savePanel = false;
          saveload.saveGame();
          break;
        case 'setting':
          this.settingPanel = false;
          break;
        case 'quest':
          this.questPanel = false;
          break;
        case 'dungeon':
          this.dungeonPanel = false;
          break;
        case 'craft':
          this.craftPanel = false;
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