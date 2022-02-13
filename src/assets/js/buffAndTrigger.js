export const buffAndTrigger = {
    data() {
        return {
            centralTimer: 0,
        }
    },
    mounted() {
    },
    computed: {
        player() {return this.$store.state.playerAttribute; }

    },
    methods: {
        // 内部运算 
        // 1、是否包含技能效果？（提高/降低 攻击 命中 闪避 移动速度 群体伤害 替换技能ID 等 ） 
        // 2、是否包含阶段效果？（BUFF分为多个阶段，不同的阶段有不同的效果，比如影之哀伤） 
        // 3、是否包含计时器？（持续时长计算、叠加时长计算 总之所有关于持续性时间的问题 都丢这里） 
        // 4、是否包含计数器？（用来计算阶段、剩余生效次数、比如影之哀伤 LOL电刀） 
        // 5、是否具备分类规则？（魔法效果 诅咒效果 中毒效果 用于进行归类 方便程序进行的 驱散筛选判断） 
        // 6、是否可以被驱散？ （魔法效果只能用祛除魔法解除 中毒效果只能用解药祛除） 
        // 7、是否具备优先级？（附加优先级，低等级BUFF会被高等级BUFF替换，低等级BUFF无法附加给高等级怪） 
        // 8、是否保留母体信息？（比如传染性的DEBUFF，感染者传播一次，母体会获得额外巴拉巴拉。。。多个项） 
        // 9、是否共享同步规则？（比如多个角色共享一个BUFF状态，一个人的BUFF被祛除则其他人也被祛除） 
        // 10、以上功能可以进行再补充，没有需求则可以逐个剔除。

        // 外部表现 
        // 1、是否显示BUFF图标？（传奇里道士的BUFF是不显示图标的） 
        // 2、是否不同阶段表现不同的图标？ 
        // 3、是否显示计时器？ 
        // 4、是否显示计数器？ 
        // 5、是否显示BUFF文字说明？（对BUFF类型、效果的描述）
        // 6、是否改变角色外形？（DNF里的冰冻、WOW里的变形） 
        // 7、以上表现功能可以进行再补充，同上。

        // 启用中心计时器，按时间减少buff时间
        buffTimer(time){
            this.centralTimer = setInterval(() => {
                let achievement = this.findComponentDownward(this, 'achievement');  
                achievement.set_statistic({gameTime: 1000});
                let now = Date.now();
                let playerBuff = this.player.buff;
                for(let buff in this.player.timedBuff) {
                    let curStack = (this.player.timedBuff[buff] - now)/60000;
                    if(curStack < 0)
                        this.buffRemoved(this.player, this.player, buff);
                    let diff = Math.floor(playerBuff[buff] - curStack);
                    if(diff > 0)
                        this.buffReduce(this.player, this.player, buff, diff);
                }
            }, 1000);
        },
        // 添加buff
        buffApply(source, target, type, stack=1){
            let buffer = ['sunder', 'penetrate', 'lifesteal', 'manasteal','charge','deathImmune','void','absorb','hell'];
            let timed = ['minionSlayer'];
            if(target.buff == undefined)
                target.buff = {};
            if(target.timedBuff == undefined)
                target.timedBuff = {};
            if(timed.indexOf(type) != -1) {
                if(target.timedBuff[type] == undefined)
                    target.timedBuff[type] = Date.now()+stack*1000;
                else
                    target.timedBuff[type] += stack*1000;
                if(target.buff[type])
                    stack = Math.ceil((target.timedBuff[type]-Date.now())/60000)-target.buff[type];
                else
                    stack = Math.ceil((target.timedBuff[type]-Date.now())/60000);
            }
            if(buffer.indexOf(type) == -1) {
                if(target.buff[type] == undefined) {
                    this.$set(target.buff, type, stack)
                }
                else {
                    this.$set(target.buff, type, target.buff[type]+stack)
                }
            }
            else {
                setTimeout(() => {
                    if(target.buff[type] == undefined) {
                        this.$set(target.buff, type, stack)
                    }
                    else {
                        this.$set(target.buff, type, target.buff[type]+stack)
                    }
                }, 10);
            }
        },
        // 移除buff
        buffRemoved(source, target, type){
            if(type == 'hell') {
                let attr = this.player.attribute;
                if(attr.CURHP.value < attr.MAXHP.value*0.5) {
                    this.set_player_hp('dead', source);
                    this.$store.commit("set_battle_info", {
                        type: 'dmged',
                        msg: '【炼狱】您已死亡'
                    })
                }
            }
            this.$delete(target.buff, type)
            this.$delete(target.timedBuff, type)
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
        // 按时间触发buff
        buffOnTick() {

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
                this.hpChange(source, source, value);
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
            if(source.buff['minionSlayer'] != undefined && target.type == 'normal') {
                this.$store.commit("set_battle_info", {
                    type: 'dmg',
                    msg: '【野怪杀手】额外造成'+Math.round(-0.5*(this.get_dmg(dmgs, 'ad')+this.get_dmg(dmgs, 'ap')))+'伤害'
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
                        msg: '处于眩晕状态中，无法行动'
                    })
                }
                else {
                    this.$store.commit("set_battle_info", {
                        type: 'dmged',
                        msg: '目标处于眩晕状态中，无法行动'
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
            }
        },    
        // 攻击起手触发, source为攻击发起者
        TriggerOnAttack(source, target) {
            this.buffReduce(source, source, 'hell');
            let talent = 'ability_rogue_preparation';
            if(source.talent[talent] > 0) {
                let recover = source.talent[talent]*10;
                this.hpChange(source, source, recover);
                this.mpChange(source, source, recover);
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
        // 死亡后触发，source为击杀者
        triggerAfterKilled(source, target) {
            if(target.type == 'player' && this.$store.state.statistic.death%50 == 0 && this.$store.state.statistic.death > 0) {
                let itemInfo = this.findBrothersComponents(this, 'itemInfo', false)[0];
                let item = itemInfo.createItem('inv_potion_27', 1);  
                itemInfo.addItem(JSON.parse(item));
            }
            let talent = 'spell_shadow_bloodboil';
            if(source.talent[talent] > 0) {
                let recover = Math.min(target.attribute.MAXHP.value*0.01, source.attribute.MAXHP.value*source.talent[talent]*0.01);
                this.hpChange(source, source, recover);
            }
            talent = 'inv_elemental_mote_mana';
            if(source.talent[talent] > 0) {
                let recover = Math.min(target.attribute.MAXHP.value*0.0025, source.attribute.MAXMP.value*source.talent[talent]*0.01);
                this.mpChange(source, source, recover);
            }
        },
        hpChange(source, target, dmgs, sourceName) {
            this.absorb(target, dmgs);
            this.damage(source, target, dmgs, sourceName);
            if(!isNaN(dmgs.heal))
                this.heal(source, target, this.get_dmg(dmgs, 'heal'), sourceName);
        },
        damage(source, target, dmgs, sourceName) {
            this.weak(source, dmgs);
            this.void(target, dmgs);
            this.minionSlayer(source, target, dmgs);
            let totalDmg = this.get_dmg(dmgs, 'ad')+this.get_dmg(dmgs, 'ap');
            let dmgType = '伤害';
            let dmgText = ' 0 ';
            if(this.get_dmg(dmgs, 'ad') > 0) {
                if(this.get_dmg(dmgs, 'ap') > 0) {
                    dmgText = '<span style="color:#ffffff"> '+(this.get_dmg(dmgs, 'ad')+this.get_dmg(dmgs, 'ap'))
                        +'</span>(<span style="color:#ff0000">'+this.get_dmg(dmgs, 'ad')+'</span>+<span style="color:#2ab0ff">'+this.get_dmg(dmgs, 'ap')+'</span>) ';
                } else {
                    dmgType = '物理伤害';
                    dmgText = '<span style="color:#ff0000">'+this.get_dmg(dmgs, 'ad')+'</span> ';
                }
            } else if (this.get_dmg(dmgs, 'ap') > 0) {
                dmgType = '魔法伤害';
                dmgText = '<span style="color:#2ab0ff">'+this.get_dmg(dmgs, 'ap')+'</span> ';
            }
            // let totalDmg = this.get_dmg(dmgs, 'ad')+this.get_dmg(dmgs, 'ap');
            if(target.type == 'player')
                this.set_player_hp(-1*totalDmg, source);
            else
                this.set_enermy_hp(-1*totalDmg, source);
            if(sourceName != undefined) {
                if(target.type == source.type) {
                    this.$store.commit("set_battle_info", {
                        source: source.type,
                        html: source.name+'使用<span style="color:#888888">【'+sourceName+'】</span>对 自己 造成了<span style="color:#ff0000">' + dmgText+ '</span>点'+dmgType
                    })
                }
                else {
                    this.$store.commit("set_battle_info", {
                        source: source.type,
                        html: source.name+' 使用<span style="color:#888888">【'+sourceName+'】</span>对 '+target.name+' 造成了'+dmgText+'点'+dmgType
                    })
                }
            }
        },
        heal(source, target, heal, sourceName) {
            // this.triggerOnHeal(source, target)
            if(target.type == 'player')
                this.set_player_hp(heal, source);
            else
                this.set_enermy_hp(heal);
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
        mpChange(source, target, value, sourceName) {
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
                case 'heal':
                    dmg = dmgs.heal;
                    break;
                default:
                    console.log("获取伤害类型错误");
                    break;
            }
            return isNaN(dmg) ? 0 : dmg;
        },
        set_ad_dmg(dmgs, target) {
            if(dmgs.adDmg == undefined)
                return;
            if(isNaN(target)) {
                console.log("物理伤害传入非数字字符: " +target);
                return;
            }
            if(target < 0)
                target = 0;
            dmgs.adDmg = target;
        },
        set_ap_dmg(dmgs, target) {
            if(dmgs.apDmg == undefined)
                return;
            if(isNaN(target)) {
                console.log("魔法伤害传入非数字字符: " +target);
                return;
            }
            if(target < 0)
                target = 0;
            dmgs.apDmg = target;
        },
        set_heal(dmgs, target) {
            if(dmgs.heal == undefined)
                return;
            if(isNaN(target)) {
                console.log("治疗数据传入非数字字符: " +target);
                return;
            }
            dmgs.heal = target;
        },
        set_player_hp(data, source) {
            let target = this.player;
            let CURHP = target.attribute.CURHP,
                MAXHP = target.attribute.MAXHP;
            // dead/full 等，跳过乱七八糟的判断
            if(isNaN(data)) {
                this.$store.commit('set_hp', {data, CURHP, MAXHP});
                if(source != undefined) {
                    let slainBy = {};
                    slainBy[source.name] = 1;
                    this.$store.commit('set_statistic', {slainBy: slainBy});
                    this.triggerAfterKilled(source, target);
                }
                return;
            }
            if(data < 0)
                this.triggerOnHurt(source, target, data);
            if(-1*data >= CURHP.value)
                data = this.triggerBeforeKilled(source, target, data);
            if(-1*data >= CURHP.value) {
                let slainBy = {};
                slainBy[source.name] = 1;
                this.$store.commit('set_statistic', {slainBy: slainBy});
                this.triggerAfterKilled(source, target);
            }
            this.$store.commit('set_hp', {data, CURHP, MAXHP});
            CURHP.showValue = CURHP.value;
        },
        set_enermy_hp(data) {
            let source = this.player;
            let target = this.$store.state.enermyAttribute;
            let CURHP = target.attribute.CURHP,
                MAXHP = target.attribute.MAXHP;
            if(data < 0)
                this.triggerOnHurt(source, target, data);
            if(-1*data >= CURHP.value)
                data = this.triggerBeforeKilled(source, target, data);
            if(-1*data >= CURHP.value)
                this.triggerAfterKilled(source, target);
            this.$store.commit('set_hp', {data, CURHP, MAXHP});
            CURHP.showValue = CURHP.value;
        },    
    }
}