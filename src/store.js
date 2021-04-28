import Vue from 'vue'
import Vuex from 'vuex'
import vueInstance from './main'
Vue.use(Vuex)
//灰、白、蓝、紫、橙、红
//破旧，普通，精良，完美，史诗，传说
//a1a1a1,D9D9D9,00BBFF,BB00FF,FFBB00,FF0000
var initial_helmet = {
    lv: 1,
    itemType: 'helmet',
    maxEnhanceLv: 25,
    enhanceLv: 7,
    quality: {
      name: '精良',
      color: '#00BBFF',
      extraEntryNum: 1,
    },
    description: {
      name: "村里最好的头盔",
      desc: "新手菜鸡使用的短剑",
      type: "鞋子",
      iconSrc: "./icons/A_A1.png",
    },
    baseEntry: [{
      value: 10,
      showVal: "+15",
      type: "STR",
      name: "力量"
    }],
    extraEntry: [{
      value: 6,
      showVal: "+6",
      type: "ATK",
      name: "攻击力"
    }]
  },
  initial_shoe = {
    lv: 1,
    itemType: 'shoe',
    maxEnhanceLv: 25,
    enhanceLv: 7,
    quality: {
      name: '完美',
      color: '#FF0000',
      extraEntryNum: 1,
    },
    description: {
      name: "村里最好的鞋子",
      desc: "新手菜鸡使用的短剑",
      type: "鞋子",
      iconSrc: "./icons/A_A1.png",
    },
    baseEntry: [{
      value: 10,
      showVal: "+15",
      type: "STR",
      name: "力量"
    }],
    extraEntry: [{
      value: 6,
      showVal: "+6",
      type: "ATK",
      name: "攻击力"
    }]
  },
  initial_weapon = {
    lv: 1,
    itemType: 'weapon',
    maxEnhanceLv: 25,
    enhanceLv: 7,
    quality: {
      name: '精良',
      color: '#00BBFF',
      extraEntryNum: 1,
    },
    description: {
      name: "村里最好的头盔",
      desc: "新手菜鸡使用的短剑",
      type: "鞋子",
      iconSrc: "./icons/A_A1.png",
    },
    baseEntry: [{
      value: 10,
      showVal: "+15",
      type: "STR",
      name: "力量"
    }],
    extraEntry: [{
      value: 6,
      showVal: "+6",
      type: "ATK",
      name: "攻击力"
    }]
  },
  initial_armor = {
    lv: 1,
    itemType: 'armor',
    maxEnhanceLv: 25,
    enhanceLv: 7,
    quality: {
      name: '精良',
      color: '#00BBFF',
      extraEntryNum: 1,
    },
    description: {
      name: "村里最好的头盔",
      desc: "新手菜鸡使用的短剑",
      type: "鞋子",
      iconSrc: "./icons/A_A1.png",
    },
    baseEntry: [{
      value: 10,
      showVal: "+15",
      type: "STR",
      name: "力量"
    }],
    extraEntry: [{
      value: 6,
      showVal: "+6",
      type: "ATK",
      name: "攻击力"
    }]
  },
  initial_necklace = {
    lv: 1,
    itemType: 'necklace',
    maxEnhanceLv: 25,
    enhanceLv: 7,
    quality: {
      name: '精良',
      color: '#00BBFF',
      extraEntryNum: 1,
    },
    description: {
      name: "村里最好的头盔",
      desc: "新手菜鸡使用的短剑",
      type: "鞋子",
      iconSrc: "./icons/A_A1.png",
    },
    baseEntry: [{
      value: 10,
      showVal: "+15",
      type: "STR",
      name: "力量"
    }],
    extraEntry: [{
      value: 6,
      showVal: "+6",
      type: "ATK",
      name: "攻击力"
    }]
  },
  initial_ring = {
    lv: 1,
    itemType: 'ring',
    maxEnhanceLv: 25,
    enhanceLv: 7,
    quality: {
      name: '精良',
      color: '#00BBFF',
      extraEntryNum: 1,
    },
    description: {
      name: "村里最好的头盔",
      desc: "新手菜鸡使用的短剑",
      type: "鞋子",
      iconSrc: "./icons/A_A1.png",
    },
    baseEntry: [{
      value: 10,
      showVal: "+15",
      type: "STR",
      name: "力量"
    }],
    extraEntry: [{
      value: 6,
      showVal: "+6",
      type: "ATK",
      name: "攻击力"
    }]
  };

export default new Vuex.Store({
  state: {
    needStrengthenEquipment: {}, //设定当前需要强化的装备
    sysInfo: [{
      type: '',
      msg: "欢迎你勇士，点击地图上的副本开始战斗。"
    }, {
      type: '',
      msg: "菜单栏可以刷新当前世界副本。"
    }],
    battleInfo: [{
      type: '',
      msg: "伤害"
    }, {
      type: '',
      msg: "菜单栏可以刷新当前世界副本。"
    }, {
      type: '',
      msg: "菜单栏可以刷新当前世界副"
    }],
    dungeonInfo: {
      auto: false,
      inBattle: false,
      current: 'advanture',
      advanture: {
        level: 0,
        current: 0,
        option: 1,
        max:3
      },
      trial: {
        level: 0,
        current: 0,
        option: 1,
        max:20
      }
    },
    playerAttribute: {
      name: '无名',
      lv: 1,
      GOLD: 0,
      healthRecoverySpeed: 1,
      attribute: {
        CURHP: { baseVal: 0, value: 300, showbaseVal: 0},
        MAXHP: { baseVal: 0, value: 300, showbaseVal: 0},
        CURMP: { baseVal: 0, value: 50, showbaseVal: 0},
        MAXMP: { baseVal: 0, value: 50, showbaseVal: 0},
        HP: { baseVal: 0, value: 0, showbaseVal: 0},
        MP: { baseVal: 0, value: 0, showbaseVal: 0},
        STR: { baseVal: 0, value: 0, showbaseVal: 0},
        AGI: { baseVal: 0, value: 0, showbaseVal: 0},
        INT: { baseVal: 0, value: 0, showbaseVal: 0},
        ALL: { baseVal: 0, value: 0, showbaseVal: 0},
        ATK: { baseVal: 0, value: 5, showbaseVal: 0},
        DEF: { baseVal: 0, value: 0, showbaseVal: 0},
        DEFRED: { baseVal: 0, value: 0, showbaseVal: 0},
        AP: { baseVal: 0, value: 0, showbaseVal: 0},
        MR: { baseVal: 0, value: 0, showbaseVal: 0},
        CRIT: { baseVal: 0, value: 0, showbaseVal: 0},
        CRITDMG: { baseVal: 0, value: 200, showbaseVal: 0},
        STRP: { baseVal: 0, value: 0, showbaseVal: 0},
        AGIP: { baseVal: 0, value: 0, showbaseVal: 0},
        INTP: { baseVal: 0, value: 0, showbaseVal: 0},
        ALLP: { baseVal: 0, value: 0, showbaseVal: 0},
        HPP: { baseVal: 0, value: 0, showbaseVal: 0},
        MPP: { baseVal: 0, value: 0, showbaseVal: 0},
        ATKP: { baseVal: 0, value: 0, showbaseVal: 0},
        DEFP: { baseVal: 0, value: 0, showbaseVal: 0},
        APP: { baseVal: 0, value: 0, showbaseVal: 0},
        MRP: { baseVal: 0, value: 0, showbaseVal: 0},
      },
      spells: {
        total: 110,
        spell: {
          attack: {
            name: "普通攻击",
            weight: 100
          },
          thunder: {
            name: "雷霆一击",
            weight: 10
          },
        }
      },
      tempSpells: {},
      helmet: initial_helmet,
      weapon: initial_weapon,
      armor: initial_armor,
      ring: initial_ring,
      necklace: initial_necklace,
      shoe: initial_shoe,
    },
    enermyAttribute: {
      name: "海的那边",
      lv: 1,
      attribute: {
        CURHP: { value: 0, showValue: 0, },
        MAXHP: { value: 0, showValue: 0, },        
        ATK: { value: 0, showValue: 0, },
        DEF: { value: 0, showValue: 0, },
        DEFRED: { value: 0, showValue: 0, },
        AP: { value: 0, showValue: 0, },
        MR: { value: 0, showValue: 0, },
        CRIT: { value: 0, showValue: 0, },
        CRITDMG: { value: 200, showValue: 200, },
      },
      spells: {
        total: 200,
        spell: {
          attack: {
            name: "普通攻击",
            weight: 100
          },
          thunder: {
            name: "雷霆一击",
            weight: 100
          },
        }
      },
      tempSpells: {},
    },      
    baseAttribute: {
      CURHP: 0,
      MAXHP: 0,
      CURMP: 0,
      MAXMP: 0,
      HP: 300,
      MP: 100,
      STR: 0,
      AGI: 0,
      INT: 0,
      ALL: 0,
      ATK: 5,
      DEF: 0,
      DEFRED: 0,
      AP: 0,
      MR: 0,
      CRIT: 0,
      CRITDMG: 200,
      STRP: 0,
      AGIP: 0,
      INTP: 0,
      ALLP: 0,
      HPP: 0,
      MPP: 0,
      ATKP: 0,
      DEFP: 0,
      APP: 0,
      MRP: 0,
    },
  },
  mutations: {
    set_player_helmet(state, data) {
      this.state.playerAttribute.helmet = data || initial_helmet;
      vueInstance.$store.commit('set_player_attribute');
    },
    set_player_necklace(state, data) {
      this.state.playerAttribute.necklace = data || initial_necklace;
      vueInstance.$store.commit('set_player_attribute');
    },
    set_player_weapon(state, data) {
      this.state.playerAttribute.weapon = data || initial_weapon;
      vueInstance.$store.commit('set_player_attribute');
    },
    set_player_armor(state, data) {
      this.state.playerAttribute.armor = data || initial_armor;
      vueInstance.$store.commit('set_player_attribute');
    },
    set_player_ring(state, data) {
      this.state.playerAttribute.ring = data || initial_ring;
      vueInstance.$store.commit('set_player_attribute');
    },
    set_player_shoe(state, data) {
      this.state.playerAttribute.shoe = data || initial_shoe;
      vueInstance.$store.commit('set_player_attribute');
    },
    set_player_attribute(state, data) {
      var playerAttribute = this.state.playerAttribute,
        helmet = playerAttribute.helmet,
        necklace = playerAttribute.necklace,
        weapon = playerAttribute.weapon,
        armor = playerAttribute.armor,
        shoe = playerAttribute.shoe,
        ring = playerAttribute.ring,
        entries = [],
        potentials = [];
      var hpPercent = playerAttribute.attribute.CURHP.value/playerAttribute.attribute.MAXHP.value,
          mpPercent = playerAttribute.attribute.CURMP.value/playerAttribute.attribute.MAXMP.value;
      var attribute = {};
      var attributes = [
        'MAXHP','CURHP','MAXMP','CURMP','STR','AGI','INT','ALL','CRIT','CRITDMG','ATK','DEF','DEFRED','AP','MR','HP','MP',
        'STRP','AGIP','INTP','ALLP','ATKP','APP', 'MRP','DEFP','HPP','MPP',
      ];
      var advancedAttributes = ['STR','AGI','INT','ALL','STRP','AGIP','INTP','ALLP',];
      var normalAttributes = [
        'CRIT','CRITDMG','ATK','DEF','DEFRED','AP','MR','HP','MP',
        'ATKP','APP', 'MRP','DEFP','HPP','MPP',
      ];
      var percent = [
        'STRP','AGIP','INTP','ALLP','CRIT','CRITDMG','ATKP','DEFP','APP','MRP','HPP','MPP'
      ];
      var hasPercent = [
        'STR','AGI','INT','ALL','ATK','DEF','AP','MR','HP','MP'
      ];
      var advancedAttr = {
        STR: { HP: 5, ATK: 1 }, 
        AGI: { DEF: 1, MR: 1, CRITDMG: 2 }, 
        INT: { MP: 3, AP: 1 }, 
      };
      attributes.forEach(attr => {
        attribute[attr] = { baseVal: this.state.baseAttribute[attr], value: this.state.baseAttribute[attr], showValue: this.state.baseAttribute[attr]}
      });
      entries = [].concat(weapon.baseEntry, weapon.extraEntry, 
                          helmet.baseEntry, helmet.extraEntry, 
                          necklace.baseEntry, necklace.extraEntry, 
                          armor.baseEntry, armor.extraEntry, 
                          shoe.baseEntry, shoe.extraEntry, 
                          ring.baseEntry, ring.extraEntry);
      entries.forEach(entry => {
        attribute[entry.type].baseVal += entry.value;
      });
      potentials = [].concat(weapon.potential, helmet.potential, 
                          necklace.potential, armor.potential, 
                          shoe.potential, ring.potential);
      potentials.forEach(potential => {
        if(potential != undefined && potential.active)
          attribute[potential.type].baseVal += potential.value;
      });

      advancedAttributes.forEach(attr => {
        if(hasPercent.indexOf(attr) > -1)
          attribute[attr].value = Math.round(attribute[attr].baseVal*(1+attribute[attr+'P'].baseVal/100));
        else
          attribute[attr].value = attribute[attr].baseVal;
      });
      attribute['STR'].value += attribute['ALL'].value;
      attribute['AGI'].value += attribute['ALL'].value;
      attribute['INT'].value += attribute['ALL'].value;
      for(var adv in advancedAttr) {
        for(var attr in advancedAttr[adv]) {
          attribute[attr].baseVal += advancedAttr[adv][attr]*attribute[adv].value;
        }
      }
      normalAttributes.forEach(attr => {
        if(hasPercent.indexOf(attr) > -1)
          attribute[attr].value = Math.round(attribute[attr].baseVal*(1+attribute[attr+'P'].baseVal/100));
        else
          attribute[attr].value = attribute[attr].baseVal;
      });

      for(var key in attribute) {
        if(percent.indexOf(key) > -1)
          attribute[key].showValue = attribute[key].value + '%';
        else
          attribute[key].showValue = attribute[key].value;
      }
      attribute['MAXHP'].value += attribute['HP'].value;
      attribute['CURHP'].value = Math.floor(hpPercent*attribute['HP'].value);
      attribute['MAXHP'].showValue += attribute['HP'].value;
      attribute['CURHP'].showValue += playerAttribute.attribute['CURHP'].value;
      attribute['MAXMP'].value += attribute['MP'].value;
      attribute['CURMP'].value = Math.floor(mpPercent*attribute['MP'].value);
      attribute['MAXMP'].showValue += attribute['MP'].value;
      attribute['CURMP'].showValue += playerAttribute.attribute['CURMP'].value;
      attribute['DEFRED'].value = Math.round(0.01 * attribute['DEF'].value / (1 + (0.0105 * attribute['DEF'].value))*10000)/100;
      attribute['DEFRED'].showValue = attribute['DEFRED'].value+'%';
      
      playerAttribute.attribute = attribute;
    },
    set_player_hp(state, data) {
      var CURHP = this.state.playerAttribute.attribute.CURHP,
        MAXHP = this.state.playerAttribute.attribute.MAXHP
      if(data == 'full'){
        CURHP.value = MAXHP.value
      }
      else if(data == 'dead'){
        CURHP.value = 0;
      }
      else {
        CURHP.value += Number(data);
        if (CURHP.value > MAXHP.value) {
          CURHP.value = MAXHP.value;
        }
        else if (CURHP.value <= 0) {
          CURHP.value = 0;
        }
      }
      CURHP.showValue = CURHP.value;
    },
    set_player_mp(state, data) {
      var CURMP = this.state.playerAttribute.attribute.CURMP,
        MAXMP = this.state.playerAttribute.attribute.MAXMP
      if(data == 'full'){
        CURMP.value = MAXMP.value
      }
      else {
        CURMP.value += Number(data);;
        if (CURMP.value > MAXMP.value) {
          CURMP.value = MAXMP.value;
        }
        else if (CURMP.value <= 0) {
          CURMP.value = 0;
        }
      }
      CURMP.showValue = CURMP.value;
    },
    set_enermy_attribute(state, data) {
      this.state.enermyAttribute = data;
    },
    set_enermy_hp(state, data) {
      var CURHP = this.state.enermyAttribute.attribute.CURHP,
        MAXHP = this.state.enermyAttribute.attribute.MAXHP
      if(data == 'full'){
        CURHP.value = MAXHP.value;
      }
      else if(data == 'dead'){
        CURHP.value = 0;
      }
      else {
        CURHP.value += Number(data);;
        if (CURHP.value > MAXHP.value) {
          CURHP.value = MAXHP.value;
        }
        if (CURHP.value <= 0) {
          CURHP.value = 0;
        }
      }
      CURHP.showValue = CURHP.value;
    },    
    set_sys_info(state, data) {
      this.state.sysInfo.push(data);
      // var time = +new Date()
      // var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
      // this.state.sysInfo[this.state.sysInfo.length - 1].time = date.toJSON().substr(11, 8).replace('T', ' ')
      if (this.state.sysInfo.length > 50) {
        this.state.sysInfo.shift()
      }
    },
    clear_sys_info(state, data) {
      this.state.sysInfo.splice(0, this.state.sysInfo.length);
    },    
    set_battle_info(state, data) {
      this.state.battleInfo.push(data);
      // var time = +new Date()
      // var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
      // this.state.sysInfo[this.state.sysInfo.length - 1].time = date.toJSON().substr(11, 8).replace('T', ' ')
      if (this.state.battleInfo.length > 50) {
        this.state.battleInfo.shift()
      }
    },
    clear_battle_info(state, data) {
      this.state.battleInfo.splice(0, this.state.battleInfo.length);
    },    
  },
}

)