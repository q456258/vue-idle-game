import { buffConfig } from '@/assets/config/buffConfig';
export const buffAndTrigger = {
    mixins: [buffConfig],
    data() {
        return {
            centralTimer: 0,
            playerTimers: [],
            enemyTimers: [],
            buffCounter: {}
        }
    },
    mounted() {
    },
    computed: {
        player() {return this.$store.state.playerAttribute; },
        enemies() {
            let enemies = {
                normal: this.$store.state.enemyAttribute,
                elite: this.$store.state.eliteAttribute,
                boss: this.$store.state.bossAttribute
            }
            return enemies; 
        }

    },
    methods: {
        // 内部运算 
        // 1、是否包含技能效果? （提高/降低 攻击 命中 闪避 移动速度 群体伤害 替换技能ID 等 ） 
        // 2、是否包含阶段效果? （BUFF分为多个阶段, 不同的阶段有不同的效果, 比如影之哀伤） 
        // 3、是否包含计时器? （持续时长计算、叠加时长计算 总之所有关于持续性时间的问题 都丢这里） 
        // 4、是否包含计数器? （用来计算阶段、剩余生效次数、比如影之哀伤 LOL电刀） 
        // 5、是否具备分类规则? （魔法效果 诅咒效果 中毒效果 用于进行归类 方便程序进行的 驱散筛选判断） 
        // 6、是否可以被驱散?  （魔法效果只能用祛除魔法解除 中毒效果只能用解药祛除） 
        // 7、是否具备优先级? （附加优先级, 低等级BUFF会被高等级BUFF替换, 低等级BUFF无法附加给高等级怪） 
        // 8、是否保留母体信息? （比如传染性的DEBUFF, 感染者传播一次, 母体会获得额外巴拉巴拉。。。多个项） 
        // 9、是否共享同步规则? （比如多个角色共享一个BUFF状态, 一个人的BUFF被祛除则其他人也被祛除） 
        // 10、以上功能可以进行再补充, 没有需求则可以逐个剔除。

        // 外部表现 
        // 1、是否显示BUFF图标? （传奇里道士的BUFF是不显示图标的） 
        // 2、是否不同阶段表现不同的图标?  
        // 3、是否显示计时器?  
        // 4、是否显示计数器?  
        // 5、是否显示BUFF文字说明? （对BUFF类型、效果的描述）
        // 6、是否改变角色外形? （DNF里的冰冻、WOW里的变形） 
        // 7、以上表现功能可以进行再补充, 同上。

        // 启用中心计时器, 按时间减少buff时间
        buffTimer(time){
            this.centralTimer = setInterval(() => {
                let achievement = this.$store.globalComponent["achievement"];  
                achievement.set_statistic({gameTime: 1000});
                let now = Date.now();
                let playerBuff = this.player.buff;
                let timeGap = 0;
                let stackRemain = 0;
                for(let buff in this.player.timedBuff) {
                    timeGap = this.getTimeGap(this.player.timedBuff[buff], now);
                    stackRemain = Math.ceil((this.player.timedBuff[buff] - now)/1000);
                    if(stackRemain == 120 || stackRemain == 7200)
                        this.buffSetStack(this.player, this.player, buff, 120);
                    let curStack = (this.player.timedBuff[buff] - now)/timeGap;
                    if(curStack < 0)
                        this.buffRemoved(this.player, this.player, buff);
                    let diff = Math.floor(playerBuff[buff] - curStack);
                    if(diff > 0)
                        this.buffReduce(this.player, this.player, buff, diff);
                }
                playerBuff = this.player.tempStat;
                for(let i=playerBuff.length-1; i>=0; i--) {
                    if(playerBuff[i].expire < now) {
                        this.statBuffRemove(this.player, this.player, playerBuff[i].type, playerBuff[i].value, i);
                    }
                }
                this.checkShield(this.player);
                for(let type in this.enemies) {
                    let enemy = this.enemies[type];
                    let enemyBuff = enemy.buff;
                    this.checkShield(enemy);
                    for(let buff in enemy.timedBuff) {
                        timeGap = this.getTimeGap(enemy.timedBuff[buff], now);
                        stackRemain = Math.ceil((this.player.timedBuff[buff] - now)/1000);
                        if(stackRemain == 120 || stackRemain == 7200)
                            this.buffSetStack(this.player, this.player, buff, 120);
                        let curStack = (enemy.timedBuff[buff] - now)/timeGap;
                        if(curStack < 0)
                            this.buffRemoved(enemy, enemy, buff);
                        let diff = Math.floor(enemyBuff[buff] - curStack);
                        if(diff > 0)
                            this.buffReduce(enemy, enemy, buff, diff);
                    }
                    enemyBuff = enemy.tempStat;
                    for(let i=enemyBuff.length-1; i>=0; i--) {
                        if(enemyBuff[i].expire < now) {
                            this.statBuffRemove(enemy, enemy, enemyBuff[i].type, enemyBuff[i].value, i);
                        }
                    }
                }
            }, 1000);
        },
        // 添加buff
        buffApply(source, target, type, stack=1){
            let now = Date.now();
            // 优雅
            let talent = 'spell_holy_hopeandgrace';
            if(target.talent[talent] > 0 && this.buffType.statusDebuff[type] != undefined) {
                let ran = Math.random()*100;
                if(ran < target.talent[talent]*2) {
                    return;
                }
            }
            if(this.buffCateg.timed.indexOf(type) != -1) {
                if(target.timedBuff[type] == undefined) {
                    target.timedBuff[type] = now+stack*1000;
                }
                else
                    target.timedBuff[type] += stack*1000;
                let timeGap = this.getTimeGap(target.timedBuff[type], now);
                if(target.buff[type])
                    stack = Math.floor((target.timedBuff[type]-now)/timeGap)-target.buff[type];
                else
                    stack = Math.floor((target.timedBuff[type]-now)/timeGap);
            }
            if(this.buffCateg.onTick.indexOf(type) != -1 && target.buff[type] == undefined)
                this.buffOnTick(source, target, type);
            if(this.buffCateg.counter.indexOf(type) != -1)
                target.buffCounter[type] = 0;
            if(this.buffCateg.buffer.indexOf(type) == -1) {
                if(target.buff[type] == undefined)
                    this.setBuff(source, target, type, stack);
                else
                    this.setBuff(source, target, type, target.buff[type]+stack);
            }
            else {
                setTimeout(() => {
                    if(target.buff[type] == undefined)
                        this.setBuff(source, target, type, stack);
                    else
                        this.setBuff(source, target, type, target.buff[type]+stack);
                }, 10);
            }
        },
        // 添加buff
        statBuffApply(source, target, type, value, stack=1, buffGroup=false) {
            if(isNaN(value)) {
                console.trace();
                console.log("属性buff传入无效数字");
            }
            value = Math.round(value);
            let attr = target.attribute;
            let percent = [
                'STRP','AGIP','INTP','STAP','SPIP','ALLP','CRIT','CRITDMG','APCRIT','APCRITDMG','ATKP','DEFP','BLOCKP','APP','APPENP','MRP','HPP','MPP'
            ];
            this.removeStatBuffByGroup(source, target, buffGroup);
            let buff = {type: type, value: value, expire: Date.now()+stack*1000, buffGroup: buffGroup};
            target.tempStat.push(buff);
            attr[type].value += value;

            if(percent.indexOf(type) > -1)
                attr[type].showValue = attr[type].value + '%';
            else
                attr[type].showValue = attr[type].value;
            if(type == 'DEF') {
                attr['DEFRED'].value = Math.round((attr['DEF'].value/(attr['DEF'].value+3000))*10000)/100;
                attr['DEFRED'].showValue = attr['DEFRED'].value+'%';
            } else if(type == 'VERS') {
                attr['VERSBONUS'].value = Math.round(attr['VERS'].value*4)/100;
                attr['VERSBONUS'].showValue = attr['VERSBONUS'].value+'%';
            }
        },
        setBuff(source, target, type, stack) {
            let mapEvent = this.$store.globalComponent["mapEvent"];
            let talent = 'spell_arcane_arcane01'
            if(type == 'arcCharge')
                stack = Math.min(stack, source.talent[talent]);
            if(this.buffStatBonus[type] != undefined) {
                mapEvent.applyStatBuff(source, target, this.buffStatBonus[type]);
            }
            this.$set(target.buff, type, stack);
        },
        // 战斗结束移除buff
        clearTurnbaseBuff(target){
            for(let buff in target.buff) {
                if(this.buffType.statusBuff[buff] && this.buffType.statusBuff[buff].turnbased) {
                    this.buffRemoved(target, target, buff);
                } else if(this.buffType.statusDebuff[buff] && this.buffType.statusDebuff[buff].turnbased) {
                    this.buffRemoved(target, target, buff);
                }
            }
        },
        clearAllBuff(target) {
            for(let buff in target.buff) {
                this.buffRemoved(target, target, buff);
            }
        },
        // 移除buff
        buffRemoved(source, target, type){
            if(this.buffStatBonus[type] != undefined) {
                for(let i in this.buffStatBonus[type]) {
                    let buffInfo = this.buffStatBonus[type][i];
                    this.removeStatBuffByGroup(source, target, buffInfo.buffGroup);
                }
            }
            let attr = this.player.attribute;
            if(type == 'icenova') {
                let dmgs = {apDmg: target.buffCounter[type]*0.25};
                this.damage(source, target, dmgs, '大法师之触');
                delete target.buffCounter[type];
            }
            if(type == 'hell') {
                if(attr.CURHP.value < attr.MAXHP.value*0.5) {
                    this.set_player_hp('dead', source);
                    this.$store.commit("set_battle_info", {
                        type: 'danger',
                        msg: '【炼狱】您已死亡'
                    })
                }
            }
            this.$delete(target.buff, type)
            this.$delete(target.timedBuff, type)
        },
        statBuffRemove(source, target, type, value, index){
            let attr = target.attribute;
            let percent = [
                'STRP','AGIP','INTP','STAP','SPIP','ALLP','CRIT','CRITDMG','APCRIT','APCRITDMG','ATKP','DEFP','BLOCKP','APP','APPENP','MRP','HPP','MPP'
            ];
            // 容易出现浮点错误
            attr[type].value = Math.round((attr[type].value-value)*100)/100;
            attr[type].bonus = Math.round((attr[type].bonus-value)*100)/100;
            target.tempStat.splice(index, 1);

            if(percent.indexOf(type) > -1) {
                attr[type].showValue = attr[type].value + '%';
                attr[type].bonusShowValue = attr[type].bonus + '%';
            }
            else {
                attr[type].showValue = attr[type].value;
                attr[type].bonusShowValue = attr[type].bonus;
            }
            if(type == 'DEF') {
                attr['DEFRED'].value = Math.round((attr['DEF'].value/(attr['DEF'].value+3000))*10000)/100;
                attr['DEFRED'].showValue = attr['DEFRED'].value+'%';
            } else if(type == 'VERS') {
                attr['VERSBONUS'].value = Math.round(attr['VERS'].value*4)/100;
                attr['VERSBONUS'].showValue = attr['VERSBONUS'].value+'%';
            } else if(type == 'MAXHP') {
                attr['CURHP'].value = Math.min(attr['CURHP'].value, attr['MAXHP'].value);
                attr['CURHP'].showValue = attr['CURHP'].value;
            }
        },
        removeStatBuffByGroup(source, target, buffGroup) {
            if(buffGroup) {
                for(let i in target.tempStat) {
                    if(target.tempStat[i].buffGroup == buffGroup) {
                        // 如果重复添加不可叠加buff，移除原有的，再添加新的
                        this.statBuffRemove(source, target, target.tempStat[i].type, target.tempStat[i].value, i);
                        return true;
                    }
                }
            }
            return false;
        },
        // 减少buff层数
        buffReduce(source, target, type, stack=1){
            if(target.buff == undefined)
                target.buff = {};
            if(target.buff[type] != undefined) {
                this.$set(target.buff, type, target.buff[type]-stack)
                if(target.buff[type] <= 0){
                    this.buffRemoved(source, target, type);
                }
                return true;
            }
            return false;
        },
        // 更改buff层数，主要为时间类型改动(小时->分钟->秒)
        buffSetStack(source, target, type, stack=1){
            if(target.buff[type] != undefined) {
                this.$set(target.buff, type, stack)
                if(target.buff[type] <= 0){
                    this.buffRemoved(source, target, type);
                }
                return true;
            }
            return false;
        },
        // 按时间触发buff
        buffOnTick(source, target, type) {
            let gap = 1000;
            switch(type) {
                case 'poison':
                case 'burn':
                    gap = 1000;
                    break;
            }
            let timer = setInterval(() => {
                if(!this.buffReduce(target, target, type, 1)) {
                    this.removeFromTimerList(target.type, timer);
                    return;
                }
                switch(type) {
                    case 'poison':
                        this.poison(source, target);
                        break;
                    case 'burn':
                        this.burn(source, target);
                        break;
                }
            }, gap);
            this.addToTimerList(target.type, timer);
        },
        checkShield(target) {
            let shieldList = target.attribute.SHIELD.list;
            if(shieldList == undefined)
                return;
            let now = Date.now();
            for(let shield in shieldList) {
                if(shieldList[shield].time < now) {
                    this.removeShield(undefined, target, shield);
                }
            }
        },
        removeShield(source, target, shield) {
            let shieldList = target.attribute.SHIELD.list;
            target.attribute.SHIELD.value -= shieldList[shield].val;
            this.triggerOnShieldBreak(source, target, shield);
            delete shieldList[shield];
        },
        addToTimerList(type, timer) {
            if(type == 'player')
                this.playerTimers.push(timer);
            else
                this.enemyTimers.push(timer);
        },
        removeFromTimerList(type, timer) {
            if(type == 'player')
                this.playerTimers.splice(this.playerTimers.indexOf(timer), 1);
            else
                this.enemyTimers.splice(this.enemyTimers.indexOf(timer), 1);
            clearInterval(timer);
        },
        clearTickTimers(type) {
            if(type == 'player') {
                for(let i in this.playerTimers)
                    clearInterval(this.playerTimers[i]);
                this.playerTimers = []
            }
            else {
                for(let i in this.enemyTimers)
                    clearInterval(this.enemyTimers[i]);
                this.enemyTimers = []
            }
        },
        // 返回新护甲值
        sunder(source, armor) {
            if(this.buffReduce(source, source, 'sunder')) {
                let sunderRatio = 0.25;
                let talent = 'sunder_buff';
                if(source.talent[talent] > 0) {
                    sunderRatio += source.talent[talent]*0.02;
                }
                return armor * (1-sunderRatio);
            }
            else
                return armor;
        },
        // 返回穿透伤害
        penetrate(source, dmg) {
            if(this.buffReduce(source, source, 'penetrate')) {
                let penRatio = 0.1;
                let talent = 'penetrate_buff';
                if(source.talent[talent] > 0) {
                    penRatio += source.talent[talent]*0.01;
                }
                return Math.round(dmg * penRatio);
            }
            else
                return 0;
        },
        // 生命窃取
        lifesteal(source, dmgs) {
            if(this.get_dmg(dmgs, 'ad'))
                return;
            if(this.buffReduce(source, source, 'lifesteal')) {
                let lsRatio = 0.5;
                let value = Math.round(lsRatio*this.get_dmg(dmgs, 'ad'));
                this.hpChange(source, source, {heal: value});
            }
        },
        // 魔法窃取
        manasteal(source, dmgs) {
            if(this.get_dmg(dmgs, 'ap') == 0)
                return;
            if(this.buffReduce(source, source, 'manasteal')) {
                let msRatio = 0.1;
                let value = Math.round(msRatio*this.get_dmg(dmgs, 'ap'));
                if(source.type == 'player')
                    this.mpChange(source, source, value);
            }
        },
        // 返回蓄力伤害
        charge(source, dmg) {
            if(dmg == 0)
                return 0;
            if(this.buffReduce(source, source, 'charge')) {
                let chargeRatio = 1.5;
                return dmg*chargeRatio;
            }
            return dmg;
        },
        //死亡免疫
        deathImmune(source, dmg) {
            if(dmg == 0)
                return 0;
            if(this.buffReduce(source, source, 'deathImmune')) {
                return 0;
            }
            return dmg;
        },
        // 虚无
        void(target, dmgs) {
            if(this.get_dmg(dmgs, 'ad') == 0 && this.get_dmg(dmgs, 'ap') == 0)
                return;
            if(this.buffReduce(target, target, 'void')) {
                this.$store.commit("set_battle_info", {
                    html: '【虚无】无视了' + -1*(this.get_dmg(dmgs, 'ad')+this.get_dmg(dmgs, 'ap'))+ '点伤害'
                })
                this.set_ad_dmg(dmgs, 0);
                this.set_ap_dmg(dmgs, 0);
            }
        },
        // 吸收
        absorb(target, dmgs) {
            if(this.get_dmg(dmgs, 'ad') == 0)
                return;
            if(this.buffReduce(target, target, 'absorb')) {
                let dmg = Math.ceil(this.get_dmg(dmgs, 'ad'));
                this.$store.commit("set_battle_info", {
                    html: '<span style="color:#00ff00">【吸收】恢复了' + -1*dmg+ '点生命值</span>'
                })
                this.set_player_hp(dmg, player);
                this.set_ad_dmg(dmgs, 0);
            }
        },
        // 格挡
        block(target, dmg) {
            if(dmg == 0)
                return 0;
            if(this.buffReduce(target, target, 'block'))     
                return 0;  
            return dmg;
        },
        // 元素亲和
        elementAffinity(source, ap) {
            if(ap == 0)
                return ap;
            if(this.buffReduce(source, source, 'elementAffinity')) {
                return 0;
            }
            else
                return ap;
        },
        // 自然之力
        forceOfNature(target, ap) {
            if(ap == 0)
                return ap;
            if(this.buffReduce(target, target, 'elementAffinity')) {
                return ap*2;
            }
            else
                return ap;
            
        },
        // 野怪杀手
        minionSlayer(source, target, dmgs) {
            if(this.get_dmg(dmgs, 'ad') == 0 && this.get_dmg(dmgs, 'ap') == 0)
                return;
            if(source.buff['minionSlayer'] != undefined && target.type == 'normal' && target.lv < source.lv) {
                this.$store.commit("set_battle_info", {
                    type: 'dmg',
                    msg: '【野怪杀手】额外造成'+Math.round(0.5*(this.get_dmg(dmgs, 'ad')+this.get_dmg(dmgs, 'ap')))+'伤害'
                })
                this.set_ad_dmg(dmgs, this.get_dmg(dmgs, 'ad')*1.5);
                this.set_ap_dmg(dmgs, this.get_dmg(dmgs, 'ap')*1.5);
            }
        },
        // stun
        stun(source) {
            if(this.buffReduce(source, source, 'stun')) {
                if(source.type == 'player') {
                    this.$store.commit("set_battle_info", {
                        type: 'dmg',
                        msg: '处于眩晕状态中, 无法行动'
                    })
                }
                else {
                    this.$store.commit("set_battle_info", {
                        type: 'danger',
                        msg: '目标处于眩晕状态中, 无法行动'
                    })
                }
                return true;
            }
            else
                return false;
        },    
        // weak
        weak(source, dmgs) {
            if(this.get_dmg(dmgs, 'ad') == 0 && this.get_dmg(dmgs, 'ap') == 0)
                return;
            if(this.buffReduce(source, source, 'weak')) {
                this.set_ad_dmg(dmgs, this.get_dmg(dmgs, 'ad')*0.5);
                this.set_ap_dmg(dmgs, this.get_dmg(dmgs, 'ap')*0.5);
            }
        },    
        // vulnerable
        vulnerable(target, dmgs) {
            if(this.get_dmg(dmgs, 'ad') == 0 && this.get_dmg(dmgs, 'ap') == 0)
                return;
            if(this.buffReduce(target, target, 'vulnerable')) {
                this.set_ad_dmg(dmgs, this.get_dmg(dmgs, 'ad')*1.3);
                this.set_ap_dmg(dmgs, this.get_dmg(dmgs, 'ap')*1.3);
            }
        },    
        // 灼伤
        burn(source, target) {
            let burnDmg = target.attribute.MAXHP.value * 0.005;
            let dmgs = {trueDmg: Math.round(burnDmg)};
            this.damage(source, target, dmgs, '灼伤');
        },
        // 中毒
        poison(source, target) {
            let dmg = (target.buff['poison'] || 0)+1;
            let dmgs = {apDmg: Math.round(dmg)};
            this.damage(source, target, dmgs, '中毒');
        },
        // 攻击起手触发, source为攻击发起者
        TriggerOnAttack(source, target) {
            this.buffReduce(source, source, 'hell');
            let talent = 'ability_rogue_preparation';
            if(source.talent[talent] > 0) {
                let recover = source.talent[talent]*5;
                this.mpChange(source, source, recover);
                recover += Math.ceil(source.attribute.MAXHP.value*source.talent[talent]*0.002);
                this.hpChange(source, source, {heal: recover});
            }
        },
        // 受攻击伤害触发, source为攻击发起者
        triggerOnHit(source, target) {
        },
        // 受伤触发
        triggerOnHurt(source, target) {
        },
        // 回血触发
        triggerOnHeal(source, target) {
        },
        // 破盾触发
        triggerOnShieldBreak(source, target, shieldType) {
            if(shieldType == 'inv_spiritshard_01') {
                this.buffApply(target, target, 'vulnerable', 3);
            }
        },
        // 临死前触发, target为被杀者
        triggerBeforeKilled(source, target, dmg) {
            dmg = this.deathImmune(target, dmg);
            let talent = 'inv_misc_shadowegg';
            if(dmg < 0 && target.talent[talent] > 0 && (source.globalCD[talent] || 0) < Date.now()) {
                // 10分钟cd
                source.globalCD[talent] = Date.now()+1000*60*10;
                dmg = 0;
                this.buffApply(target, target, 'hell', 3);
                this.buffApply(target, target, 'deathImmune', 2);
            }
            talent = 'spell_holy_sealofsalvation';
            if(dmg < 0 && target.talent[talent] > 0 && Math.random() < target.talent[talent]*0.0025) {
                this.set_player_hp('full', source);
                this.$store.commit("set_battle_info", {
                    type: 'win',
                    msg: '发动【希望人没事】恢复所有生命值'
                })
            }
            return dmg;
        },
        // 死亡后触发, source为击杀者
        triggerAfterKilled(source, target) {
            let talentTree = this.$store.globalComponent["talentTree"];
            if(target.type == 'player' && this.$store.state.statistic.death%50 == 0 && this.$store.state.statistic.death > 0) {
                let itemInfo = this.$store.globalComponent["itemInfo"];
                let item = itemInfo.createItem('inv_potion_27', 1);  
                itemInfo.addItem(JSON.parse(item));
            }
            //生命摄取
            let talent = 'spell_deathknight_bloodpresence';
            if(source.talent[talent] > 0)
                talentTree.talentTrigger('spell_deathknight_bloodpresence');
            //能量摄取
            talent = 'spell_deathknight_frostpresence';
            if(source.talent[talent] > 0)
                talentTree.talentTrigger('spell_deathknight_frostpresence');
            // 生命残留
            talent = 'spell_shadow_bloodboil';
            if(source.talent[talent] > 0) {
                let recover = Math.min(target.attribute.MAXHP.value*0.01, source.attribute.MAXHP.value*source.talent[talent]*0.01);
                this.hpChange(source, source, {heal: recover});
            }
            // 法力残留
            talent = 'inv_elemental_mote_mana';
            if(source.talent[talent] > 0) {
                let recover = Math.min(target.attribute.MAXHP.value*0.0025, source.attribute.MAXMP.value*source.talent[talent]*0.01);
                this.mpChange(source, source, recover);
            }
            // 复活术
            talent = 'spell_holy_resurrection';
            if(target.talent[talent] > 0) {
                let recover = target.attribute.MAXHP.value*0.15*target.talent[talent];
                setTimeout(() => {
                    this.hpChange(target, target, {heal: recover});
                }, 1000);
            }
            let achievement = this.$store.globalComponent["achievement"];
            if(target.type != 'player' && this.monsterId.hasOwnProperty(target.name)) {
                let id = this.monsterId[target.name];
                let slain = {slain: {}};
                slain['slain'][id] = 1;
                achievement.set_statistic(slain);
            }
        },
        hpChange(source, target, dmgs, sourceName) {
            this.absorb(target, dmgs);
            if(dmgs.adDmg != undefined || dmgs.apDmg != undefined || dmgs.trueDmg != undefined)
                this.damage(source, target, dmgs, sourceName);
            if(!isNaN(dmgs.heal))
                this.heal(source, source, this.get_dmg(dmgs, 'heal'), sourceName);
            if(!isNaN(dmgs.enemyHeal))
                this.heal(source, target, this.get_dmg(dmgs, 'enemyHeal'), sourceName);
        },
        damage(source, target, dmgs, sourceName) {
            let battleAnime = this.$store.globalComponent["battleAnime"];
            if(target.buff['spell_fire_immolation'] != undefined && this.get_dmg(dmgs, 'ad') > 0)
                this.damage(target, source, {apDmg: 150});
            this.weak(source, dmgs);
            this.vulnerable(target, dmgs);
            this.void(target, dmgs);
            this.minionSlayer(source, target, dmgs);
            this.calcShield(source, target, dmgs, sourceName);
            for(let dmgType in dmgs)
                dmgs[dmgType] = Math.round(dmgs[dmgType]);
            let totalDmg = this.get_dmg(dmgs, 'ad')+this.get_dmg(dmgs, 'ap')+this.get_dmg(dmgs, 'true');

            let dmgType = '伤害';
            let dmgText = ' 0 ';
            let dmgTypeCount = dmgs.adDmg == undefined ? 0 : 1;
            dmgs.apDmg == undefined ? 0 : dmgTypeCount++;
            dmgs.trueDmg == undefined ? 0 : dmgTypeCount++;
            
            if(target.buff['icenova'] != undefined)
                target.buffCounter['icenova'] += totalDmg;
    

            battleAnime.displayText(target.type, "dmg", {adDmg: dmgs.adDmg, apDmg: dmgs.apDmg, trueDmg: dmgs.trueDmg});
            if(dmgTypeCount > 1) {
                dmgText = '<span style="color:#ffffff"> '+totalDmg +'</span>(';
                if(dmgs.adDmg != undefined)
                    dmgText += '<span style="color:#ff0000">'+this.get_dmg(dmgs, 'ad')+'</span>';
                if(dmgs.apDmg != undefined) {
                    if(dmgs.adDmg != undefined)
                        dmgText += '+';
                    dmgText += '<span style="color:#2ab0ff">'+this.get_dmg(dmgs, 'ap')+'</span>';
                }
                if(dmgs.trueDmg != undefined) {
                    if(dmgs.adDmg != undefined || dmgs.apDmg != undefined)
                        dmgText += '+';
                    dmgText += '<span style="color:#ffffff">'+this.get_dmg(dmgs, 'true')+'</span>';
                }
                dmgText += ')';
            } else if (dmgs.adDmg != undefined) {
                dmgType = '物理伤害';
                dmgText = '<span style="color:#ff0000">'+this.get_dmg(dmgs, 'ad')+'</span> ';
            } else if (dmgs.apDmg != undefined) {
                dmgType = '魔法伤害';
                dmgText = '<span style="color:#2ab0ff">'+this.get_dmg(dmgs, 'ap')+'</span> ';
            } else if (dmgs.trueDmg != undefined) {
                dmgType = '神圣伤害';
                dmgText = '<span style="color:#ffffff">'+this.get_dmg(dmgs, 'true')+'</span> ';
            }
            if(sourceName != undefined) {
                if(target.type == source.type) {
                    this.$store.commit("set_battle_info", {
                        source: source.type,
                        html: source.name+' 使用<span style="color:#888888">【'+sourceName+'】</span>对 自己 造成了<span style="color:#ff0000">' + dmgText+ '</span>点'+dmgType
                    })
                }
                else {
                    this.$store.commit("set_battle_info", {
                        source: source.type,
                        html: source.name+' 使用<span style="color:#888888">【'+sourceName+'】</span>对 '+target.name+' 造成了'+dmgText+'点'+dmgType
                    })
                }
            }
            if(target.type == 'player')
                this.set_player_hp(-1*totalDmg, source);
            else
                this.set_enemy_hp(-1*totalDmg, source, target);
        },
        heal(source, target, heal, sourceName) {
            if(target.buff['plague'] != undefined)
                heal = heal/2;
            // 灵魂护壳
            let talent = 'ability_shaman_astralshift';
            if(target.talent[talent] > 0 || sourceName == '圣言术：静') {
                let shield = {};
                let shieldVal = heal-(target.attribute.MAXHP.value-target.attribute.CURHP.value);
                if(shieldVal > 0) {
                    if(sourceName != '圣言术：静')
                        shieldVal = shieldVal*0.8
                    heal -= shieldVal;
                    shield.val = shieldVal;
                    shield.time = 20;
                    this.shield(source, target, shield, sourceName);
                }
            }
            heal = Math.round(heal);
            // this.triggerOnHeal(source, target)
            let battleAnime = this.$store.globalComponent["battleAnime"];
            battleAnime.displayText(target.type, "dmg", {heal: heal});
            if(target.type == 'player')
                this.set_player_hp(heal, source);
            else
                this.set_enemy_hp(heal, source, target);
            if(sourceName != undefined) {
                if(target.type == source.type) {
                    this.$store.commit("set_battle_info", {
                        source: source.type,
                        html: source.name+' 使用<span style="color:#888888">【'+sourceName+'】</span>恢复了<span style="color:#00ff00">' + heal+ '</span>点生命值'
                    })
                }
                else {
                    this.$store.commit("set_battle_info", {
                        source: source.type,
                        html: source.name+' 使用<span style="color:#888888">【'+sourceName+'】</span>为 '+target.name+' 恢复了<span style="color:#00ff00">' + heal+ '</span>点生命值'
                    })
                }
            }
        },
        shield(source, target, shield, sourceName) {
            let val = Math.round(shield.val)
            if(target.attribute.SHIELD.list == undefined)
                target.attribute.SHIELD.list = {};
            target.attribute.SHIELD.list[sourceName] = {val: val, time: Date.now()+shield.time*1000}
            if(target.attribute.SHIELD.value == undefined)
                target.attribute.SHIELD.value = val;
            else 
                target.attribute.SHIELD.value += val;
        },
        calcShield(source, target, dmgs, sourceName) {
            if(target.attribute.SHIELD.value == undefined)
                return;
            let block = Math.min(target.attribute.SHIELD.value, this.get_dmg(dmgs, 'ad'));
            this.dmgShield(source, target, block);
            this.set_ad_dmg(dmgs, this.get_dmg(dmgs, 'ad')-block);
            
            block = Math.min(target.attribute.SHIELD.value, this.get_dmg(dmgs, 'ap'));
            this.dmgShield(source, target, block);
            this.set_ap_dmg(dmgs, this.get_dmg(dmgs, 'ap')-block);

            this.recalcShield(target);
        },
        dmgShield(source, target, dmg) {
            let shieldList = target.attribute.SHIELD.list;
            for(let shield in shieldList) {
                if(dmg <= 0)
                    break;
                let shieldBreak = Math.min(dmg, shieldList[shield].val);
                target.attribute.SHIELD.value -= shieldBreak;
                shieldList[shield].val -= shieldBreak;
                dmg -= shieldBreak;
                if(shieldList[shield].val <= 0)
                    this.removeShield(source, target, shield);
            }
        },
        recalcShield(target) {
            let shieldList = target.attribute.SHIELD.list;
            let sum = 0;
            for(let shield in shieldList) {
                sum += shieldList[shield].val;
            }
            target.attribute.SHIELD.value = Math.floor(sum);
        },
        clearShield(target) {
            target.attribute.SHIELD =  { baseVal: 0, value: 0, showbaseVal: 0};
        },
        mpChange(source, target, value, sourceName) {
            value = Math.round(value);
            if(value > 0) {
                this.mpRecover(source, target, value, sourceName);
            }
            else if(value < 0) {
                this.mpLoss(source, target, value, sourceName);
            }
        },
        mpRecover(source, target, value, sourceName) {
            this.$store.commit('set_player_mp', value);
        },
        mpLoss(source, target, value, sourceName) {
            this.$store.commit('set_player_mp', value);
        },
        get_dmg(dmgs, type) {
            let dmg = 0;
            switch(type) {
                case 'ad':
                    dmg = dmgs.adDmg;
                    break;
                case 'ap':
                    dmg = dmgs.apDmg;
                    break;
                case 'true':
                    dmg = dmgs.trueDmg;
                    break;
                case 'heal':
                    dmg = dmgs.heal;
                    break;
                case 'enemyHeal':
                    dmg = dmgs.enemyHeal;
                    break;
                default:
                    console.log("获取伤害类型错误");
                    console.trace();
                    break;
            }
            return isNaN(dmg) ? 0 : dmg;
        },
        set_ad_dmg(dmgs, target) {
            if(dmgs.adDmg == undefined && target == 0)
                return;
            if(isNaN(target)) {
                console.log("物理伤害传入非数字字符: " +target);
                console.trace();
                return;
            }
            if(target < 0)
                target = 0;
            dmgs.adDmg = target;
        },
        set_ap_dmg(dmgs, target) {
            if(dmgs.apDmg == undefined && target == 0)
                return;
            if(isNaN(target)) {
                console.log("魔法伤害传入非数字字符: " +target);
                console.trace();
                return;
            }
            if(target < 0)
                target = 0;
            dmgs.apDmg = target;
        },
        set_heal(dmgs, target) {
            if(dmgs.heal == undefined && target == 0)
                return;
            if(isNaN(target)) {
                console.log("治疗数据传入非数字字符: " +target);
                console.trace();
                return;
            }
            dmgs.heal = target;
        },
        set_player_hp(data, source) {
            let target = this.player;
            let CURHP = target.attribute.CURHP,
                MAXHP = target.attribute.MAXHP;
            let mapEvent = this.$store.globalComponent["mapEvent"];
            let achievement = this.$store.globalComponent["achievement"];
            // dead/full 等, 跳过乱七八糟的判断
            if(isNaN(data)) {
                this.$store.commit('set_hp', {data, CURHP, MAXHP});
                if(data == 'dead' || data == 'remove') {
                    this.clearTickTimers(target.type);
                    if(source != undefined) {
                        let slainBy = {};
                        slainBy[source.name] = 1;
                        this.$store.commit('set_statistic', {slainBy: slainBy});
                        this.triggerAfterKilled(source, target);
                    }
                }
                if(data == 'dead') {
                    mapEvent.defeat(source, target);
                }
                return;
            }
            if(data < 0)
                this.triggerOnHurt(source, target, data);
            if(-1*data >= CURHP.value)
                data = this.triggerBeforeKilled(source, target, data);
            this.$store.commit('set_hp', {data, CURHP, MAXHP});
            if(CURHP.value <= 0) {
                mapEvent.defeat(source, target);
                this.clearTickTimers(target.type);
                this.clearAllBuff(target);
                let slainBy = {};
                slainBy[source.name] = 1;
                achievement.set_statistic({death: 1});
                this.$store.commit('set_statistic', {slainBy: slainBy});
                this.triggerAfterKilled(source, target);
            }
            CURHP.showValue = CURHP.value;
        },
        // remove=移除怪物, dead=击杀
        set_enemy_hp(data, source, target) {
            let CURHP = target.attribute.CURHP,
                MAXHP = target.attribute.MAXHP;
            let mapEvent = this.$store.globalComponent["mapEvent"];
            if(isNaN(data)) {
                if(data == 'dead' || data == 'remove') {
                    this.clearTickTimers(target.type);
                }
                if(data == 'dead') {
                    mapEvent.victory(source, target);
                    this.triggerAfterKilled(source, target);
                }
                this.$store.commit('set_hp', {data, CURHP, MAXHP});
                return;
            }
            if(data < 0)
                this.triggerOnHurt(source, target, data);
            if(-1*data >= CURHP.value)
                data = this.triggerBeforeKilled(source, target, data);
            this.$store.commit('set_hp', {data, CURHP, MAXHP});
            if(CURHP.value <= 0)  {
                mapEvent.victory(source, target);
                this.clearTickTimers(target.type);
                this.triggerAfterKilled(source, target);
            }
            CURHP.showValue = CURHP.value;
        },    
        // 获取计时buff时间间隔，低于120秒按秒显示，高于120秒低于120分钟按分钟显示，高于120分钟按小时显示
        getTimeGap(time, now) {
            let timeGap = 60000;
            if((time-now)/1000 < 120)
                timeGap = 1000;
            else if((time-now)/1000 > 7200)
                timeGap = 3600000;
            return timeGap;
        }
    }
}