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
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0.44 0 0 0 0 0 0.87 0 0 0 0 0 1 0"></feColorMatrix>
        </filter>
        <filter id="purpleBorder">
            <feColorMatrix type="matrix" values="0.4 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix>
        </filter>
        <filter id="orangeBorder">
            <feColorMatrix type="matrix" values="1 0 0 0 0 0 0.4 0 0 0 0 0 0 0 0 0 0 0 1 0"></feColorMatrix>
        </filter>
    </svg>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" id="charInfo" @click="switchTab('charInfo')">角色信息</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: displayPage=='guild' }" id="guild" @click="switchTab('guild')" v-show="playerLv >= 20">公会</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: displayPage=='guildMember' }" id="guildMember" @click="switchTab('guildMember')" v-show="playerLv >= 20">公会成员</a>
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
          <div class="info" :class="{dmged:v.type=='dmged',dmg:v.type=='dmg',win:v.type=='win',lose:v.type=='lose'}" v-for="(v,k) in battleInfo" :key="k">
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
          <div class="info warning" :class="{warning:v.type=='dmged',battle:v.type=='battle',win:v.type=='win',reward:v.type=='reward',}" v-for="(v,k) in sysInfo" :key="k">
            <span>{{v.msg}}</span>
            <a v-if="v.equip" :style="{color:v.equip.quality.color}" @mouseover="showInfo($event,v.equip.itemType,v.equip)" @mouseleave="closeInfo('equip')">{{v.equip.description.name}}</a>
            <a v-if="v.item" :style="{color:v.item.quality.color}" @mouseover="showInfo($event,'',v.item)" @mouseleave="closeInfo('item')">{{v.item.description.name}}*{{v.quantity}}</a>
            <a v-if="v.gold"><currency :amount="v.gold"></currency> </a>
          </div>
        </div>
      </div>
    </div>
    
    <div class="map">
      <enemyInfo :enemy="enemyInfo"></enemyInfo>
      <div class="zoneSelect">    
        <div class="zoneAction">    
          <button id="advanture" class="btn btn-light btn-sm lvZone" @click="switchZone('advanture')">
            冒险区
          </button>    
          <button class="btn btn-outline-light btn-sm" id="resetMap" v-show="dungeonInfo.current=='advanture'" @click="resetMap()">
            重置地图<span v-if="resetTime>0">({{resetTime}})</span>
          </button>   
          <select v-model="selectedZone" @change="setSelectedZone($event)" class="btn btn-light">
            <option :value="index" v-for="(zone, index) in filteredMonsterZone" :key="index">
              {{zone.name+'('+zone.minLv+'-'+zone.maxLv+'级)'}}
            </option>
          </select>
        </div>    
        <div class="zone">
          <div v-if="dungeonInfo.current=='advanture'">
            <div v-for="(dungeon, key) in mapArr" :key="key" @click="choseDungeon($event, key)">
              <span class="dungeon" v-if="dungeon.count!=0" :style="{backgroundImage:'url('+dungeon.img+')',top:dungeon.top+'%', left:dungeon.left+'%', backgroundColor:dungeon.selected?dungeon.color+'7':'#0008', boxShadow: '0 0 4px 4px'+dungeon.color}">
                <span class="lv">lv{{dungeon.lv}}</span>
              </span>
            </div>
          </div>
        </div>
        <mapEvent :dungeon="dungeon"></mapEvent>
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
      <!-- <compareEquip :equip="equip" :equip2="compareEquip" v-show="showEquipInfo&&compare"></compareEquip> -->
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
import enemyInfo from './component/enemyInfo';
import { assist } from '../assets/js/assist';
import { dungeon } from '../assets/js/dungeon';
import { buffAndTrigger } from '../assets/js/buffAndTrigger';
export default {
  name: 'index',
  mixins: [assist, dungeon, buffAndTrigger],
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
      dungeon: {},
      enemyInfo: 'advanture',
      equipEnhancePanel: false,
      equipForgePanel: false,
      equipPotentialPanel: false,
      savePanel: false,
      settingPanel: false,
      displayPage: 'charInfo',
      saveDateString: '',
      resetTimer: 0,
      resetTime: 0,
      selectedZone: 0
    }
  },
  components: {cTooltip, equipInfo, compareEquip, itemInfo, mapEvent, assist, backpack, equipEnhance, equipForge, equipPotential, 
              charInfo, guild, guildMember, shop, talentTree, faq, achievement, statistic, saveload, setting, enemyInfo, currency},
  mounted() {    
    //读取本地存档
    let saveload = this.findComponentDownward(this, 'saveload');  
    let sd = localStorage.getItem('_sd');
    saveload.loadGame(sd);
    // 启用buff中心计时器
    this.buffTimer();
    
    let achievement = this.findComponentDownward(this, 'achievement');  
    achievement.set_statistic({gameStartDate: Date.now()});

    let guild = this.findComponentDownward(this, 'guild');  
    let guildPosition = this.findComponentDownward(guild, 'guildPosition');   
    guildPosition.init();

    let talentTree = this.findComponentDownward(this, 'talentTree');  
    talentTree.init();
    
    // this.$store.commit("set_statistic", {gameStartDate: Date.now()});
    //初始系统、战斗信息
    this.sysInfo = this.$store.state.sysInfo;
    this.battleInfo = this.$store.state.battleInfo;
    this.dungeonInfo = this.$store.state.dungeonInfo;
    // 自动恢复
    this.slowTick(); 


    // 自动保存
    setInterval(() => {
      let saveload = this.findComponentDownward(this, 'saveload');  
      saveload.saveGame(true);
    }, 5 * 60 * 1000)

    //初始生成地图
    this.createMaps();
    //测试·随机装备
    // let equipLv = 40;
    // let equipQuality = 3;
    // let equipInfo = this.findComponentDownward(this, 'equipInfo');   
    // let newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'helmet'));
    // this.$store.commit('set_player_helmet', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'weapon'));
    // this.$store.commit('set_player_weapon', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'armor'));
    // this.$store.commit('set_player_armor', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'shoe'));
    // this.$store.commit('set_player_shoe', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'shoulder'));
    // this.$store.commit('set_player_shoulder', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'glove'));
    // this.$store.commit('set_player_glove', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'ring'));
    // this.$store.commit('set_player_ring', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'cape'));
    // this.$store.commit('set_player_cape', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'bracer')); 
    // this.$store.commit('set_player_bracer', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'belt'));
    // this.$store.commit('set_player_belt', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'legging'));
    // this.$store.commit('set_player_legging', this.$deepCopy(newEquip));
    // newEquip = JSON.parse(equipInfo.createEquip(equipQuality,equipLv,'necklace'));
    // this.$store.commit('set_player_necklace', this.$deepCopy(newEquip));

//     let itemInfo = this.findComponentDownward(this, 'itemInfo');
//     let item ;
//     let items = ['inv_misc_note_06',
//      'inv_potion_49',
// 'inv_potion_50',
// 'inv_potion_51',
// 'inv_potion_52',
// 'inv_potion_53',
// 'inv_potion_54',
// 'inv_potion_160',
// 'inv_potion_55',
// 'inv_potion_131',
// 'inv_potion_142',
// 'inv_potion_167',
// 'inv_potion_70',
// 'inv_potion_71',
// 'inv_potion_72',
// 'inv_potion_73',
// 'inv_potion_74',
// 'inv_potion_75',
// 'inv_potion_163',
// 'inv_potion_76',
// 'inv_potion_137',
// 'inv_potion_148',
// 'inv_potion_168',
// 'inv_potion_42',
// 'inv_potion_43',
// 'inv_potion_44',
// 'inv_potion_45',
// 'inv_potion_46',
// 'inv_potion_47',
// 'inv_potion_164',
// 'inv_potion_48',
// 'inv_potion_134',
// 'inv_potion_145',];
//     for(let i in items) {
//       item = itemInfo.createItem(items[i], 20);  
//       itemInfo.addItem(JSON.parse(item));
//     }

    this.$store.commit('set_player_attribute');
    let shop = this.findComponentDownward(this, 'shop');  
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
          this.dungeon = {};
        }
        let mapEvent = this.findComponentDownward(this, 'mapEvent'); 
        if(this.$store.state.dungeonInfo.inBattle) {
            mapEvent.toggleBattle();
        }
        mapEvent.autoBattle(false);
        let element = document.getElementById(this.dungeonInfo.current);
        element.classList.replace('btn-light', 'btn-outline-light');
        element = document.getElementById(type);
        element.classList.replace('btn-outline-light', 'btn-light');
        // this.$store.commit('set_enemy_hp', 0);
        this.dungeonInfo.current = type;
      }
    },
    toggleBattle(type) {
      let mapEvent = this.findComponentDownward(this, 'mapEvent'); 
      mapEvent.toggleBattle(type);
    },
    createMaps() {    
      let itemInfo = this.findComponentDownward(this, 'itemInfo');
      let count = 5;
      let type = 'advanture';
      this.mapArr = this.generateDungeonByZone(count, this.monsterZone[this.selectedZone]);
      this.actualReward(this.mapArr);

      this.dungeonInfo[type].level = -1;
      this.dungeonInfo[type].reward = 'None';
      this.dungeonInfo[type].type = 'normal';
      this.dungeonInfo[type].monsterID = 0;
      this.dungeonInfo[type].monsterName = '';
      this.dungeonInfo.current = type;
    },
    addToMap(type='advanture', lv, count=1, monsterID) {
      let newMaps = this.generateDungeonByID(count, this.monsterZone[this.selectedZone], monsterID);
      this.actualReward(newMaps);
      this.mapArr = this.mapArr.concat(newMaps);

    },
    actualReward(mapArr) {
      let equipInfo = this.findComponentDownward(this, 'equipInfo');   
      let itemInfo = this.findComponentDownward(this, 'itemInfo');
      for(let map in mapArr) {
        mapArr[map].reward = [];
        for(let type in mapArr[map].rewardType) {
          let rewardInfo = mapArr[map].rewardType[type];
          if(rewardInfo[0] == 'unique_equip') {
            let newEquip = JSON.parse(equipInfo.createUniqueEquipTemplate(rewardInfo[1]));
            mapArr[map].reward.push([newEquip,rewardInfo[2]]);
          }
          else
            mapArr[map].reward.push([JSON.parse(itemInfo.createItem(rewardInfo[0], 1, mapArr[map].lv)), rewardInfo[1]]);
        }
      }
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
        if(this.mapArr[k] && !this.mapArr[k].selected && this.$store.state.enemyAttribute.attribute.CURHP.value != 0) {
          this.$message({
            message: '是否放弃当前正在挑战的副本? ',
            title: '更换副本',
            confirmBtnText: '更换',
            onClose: () => {
              this.set_enemy_hp('dead');
              this.confirmDungeon(k);
            }
          });
        }
        else
          this.confirmDungeon(k);
      }
    },
    confirmDungeon(k) {
      let mapEvent = this.findComponentDownward(this, 'mapEvent'); 
      mapEvent.displayDungeon = true;
      if(this.dungeon)
        this.dungeon.selected = false;
      this.dungeon = this.mapArr[k];
      this.dungeon.selected = true;
      let dungeon = this.dungeonInfo[this.dungeonInfo.current];
      dungeon.level = this.dungeon.lv;
      dungeon.reward = this.dungeon.reward;
      dungeon.type = this.dungeon.type;
      dungeon.monsterID = this.dungeon.monsterID;
      dungeon.monsterName = this.dungeon.monsterName;
    },
    resetMap(forceReset=false) {
      let element = document.getElementById('resetMap');
      let mapEvent = this.findComponentDownward(this, 'mapEvent'); 
      if(!forceReset && this.resetTime > 0) {
        return;
      }
      this.dungeon = {};
      if(this.$store.state.dungeonInfo.inBattle)
        mapEvent.toggleBattle();
      this.set_enemy_hp('dead');
      this.createMaps();
      this.resetTime = 1;
      element.disabled = true;
      clearInterval(this.resetTimer);
      this.resetTimer = setInterval(() => {
        this.resetTime -= 1;
        if(this.resetTime == 0) {
          clearInterval(this.resetTimer);
          element.disabled = false;
        }
      }, 1000);
    },
    setSelectedZone(e) {
      this.switchZone('advanture');
      let zone = document.getElementsByClassName('zone')[0];
      let value = e.target.value;
      this.selectedZone = value;
      zone.style.backgroundImage = 'url('+this.monsterZone[value].imgSrc+')';
      this.resetMap(true);
    },
    slowTick() {
      clearInterval(this.autoHealthRecovery);
      clearInterval(this.autoManRecovery);
      this.autoHealthRecovery = setInterval(() => {
        let mapEvent = this.findComponentDownward(this, 'mapEvent');  
        let player = this.$store.state.playerAttribute;
        let recover = 0.10;
        let talent = 'ability_hunter_harass';
        if(this.playerTalent[talent] > 0) {
          recover += this.playerTalent[talent]*0.01;
        }
        let amount = this.attribute.MAXHP.value*recover+this.attribute.STA.value;
        if(this.dungeonInfo.inBattle) {
          amount = this.attribute.STA.value;
          this.set_player_hp(Math.ceil(amount), player);
          return;
        }
        else {
          this.set_player_hp(Math.ceil(amount), player);
        }
        if(this.attribute.CURHP.value == this.attribute.MAXHP.value && this.dungeonInfo.auto) {
          setTimeout(() => {
            if(!this.dungeonInfo.inBattle)
              mapEvent.startBattle(this.dungeonInfo[this.dungeonInfo.current].option);
          }, 200);
        }
      }, 5000);
      this.autoManRecovery = setInterval(() => {
        let player = this.$store.state.playerAttribute;
        let amount = this.attribute.MAXMP.value*0.10+this.attribute.SPI.value;
        if(this.dungeonInfo.inBattle) {
          amount = this.attribute.SPI.value;
          this.mpChange(player, player, Math.ceil(amount));
          return;
        }
        else
          this.mpChange(player, player, Math.ceil(amount));
      }, 5000);
    },
    openMenuPanel(type) {
      let saveload = this.findComponentDownward(this, 'saveload');  
      switch(type) {
        case 'backpack':
          this.showBackpack = !this.showBackpack;
          break;
        case 'save':
          this.savePanel = !this.savePanel;
          saveload.saveGame();
          break;
        case 'setting':
          this.settingPanel = !this.settingPanel;
          break;
      }
    },
    closeMenuPanel(type) {
      let saveload = this.findComponentDownward(this, 'saveload');  
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