export const buffSystem = {
    data() {
        return {
            // buffTarget: {
            //     player: {},
            //     enermy: {},
            //     trial: {}
            // }
        }
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

        // 添加buff
        buffApply(source, target, type, stack=1){
            var buffer = ['sunder', 'penetrate', 'lifesteal', 'manasteal','charge']
            if(target.buff == undefined)
                target.buff = {};
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
            delete target.buff[type];
            this.$set(target.buff, type, undefined)
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
        // 触发buff
        buffOccur(source, target, type){

        },
        // 按时间触发buff
        buffOnTick() {

        },
        // 受伤触发buff
        buffOnHurt(target, dmg) {
            dmg = this.void(target, dmg);
            dmg = this.absorb(target, dmg);
            return dmg;
        },
        // 受攻击触发buff
        buffOnHit(source, target, type){

        },
        // 临死前触发buff
        buffBeforeKilled(target, dmg) {
            dmg = this.deathImmune(target, dmg);
            return dmg;
        },
        // 死亡后触发buff
        buffAfterKilled() {

        },
        // 返回新护甲值
        sunder(source, armor) {
            if(this.buffReduce(source, source, 'sunder')) {
                var sunderRatio = 0.25;
                return armor * (1-sunderRatio);
            }
            else
                return armor;
        },
        // 返回穿透伤害
        penetrate(source, dmg) {
            if(this.buffReduce(source, source, 'penetrate')) {
                var penRatio = 0.1;
                return Math.round(dmg * penRatio);
            }
            else
                return 0;
        },
        // 生命窃取
        lifesteal(source, dmg) {
            if(this.buffReduce(source, source, 'lifesteal')) {
                var lsRatio = 0.5;
                var value = Math.round(lsRatio*dmg);
                if(source == 'player')
                    this.set_player_hp(value);
                else
                    this.set_enermy_hp(value);
            }
        },
        // 魔法窃取
        manasteal(source, dmg) {
            if(this.buffReduce(source, source, 'manasteal')) {
                var msRatio = 0.1;
                var value = Math.round(msRatio*dmg);
                if(source == 'player')
                    this.$store.commit('set_player_mp', value);
            }
        },
        // 返回蓄力伤害
        charge(source, dmg) {
            if(this.buffReduce(source, source, 'charge')) {
                var chargeRatio = 1.5;
                return Math.round(dmg * chargeRatio);
            }
            else
                return dmg;
        },
        deathImmune(source, dmg) {
            if(this.buffReduce(source, source, 'deathImmune')) {
                return 0;
            }
            else
                return dmg;

        },
        void(target, dmg) {
            if(dmg == 0)
                return dmg;
            if(this.buffReduce(target, target, 'void')) {
                this.$store.commit("set_battle_info", {
                    type: '',
                    msg: '【虚无】无视了' + -1*dmg+ '点伤害'
                })
                return 0;
            }
            else
                return dmg;
        },
        absorb(target, dmg) {
            if(dmg == 0)
                return dmg;
            if(this.buffReduce(target, target, 'absorb')) {
                this.$store.commit("set_battle_info", {
                    type: 'win',
                    msg: '【吸收】恢复了' + -2*dmg+ '点生命值'
                })
                return -1*dmg;
            }
            else
                return dmg;
        },
        // stun
        stun(source) {
            var sourceType = source.type==undefined? 'player':source.type;
            if(this.buffReduce(source, source, 'stun')) {
                if(sourceType == 'player') {
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
        set_player_hp(data) {
            var target = this.$store.state.playerAttribute;
            var CURHP = target.attribute.CURHP,
                MAXHP = target.attribute.MAXHP;
            if(data < 0)
                data = this.buffOnHurt(target, data);
            if(-1*data >= CURHP.value)
                data = this.buffBeforeKilled(target, data);
            this.$store.commit('set_hp', {data, CURHP, MAXHP});
            CURHP.showValue = CURHP.value;
        },
        set_enermy_hp(data) {
            var target = this.$store.state.enermyAttribute;
            if(this.$store.state.dungeonInfo.current == 'trial') {
                target = this.$store.state.trialAttribute;
            }
            var CURHP = target.attribute.CURHP,
                MAXHP = target.attribute.MAXHP;
            if(-1*data >= CURHP.value)
                data = this.buffBeforeKilled(target, data);
            this.$store.commit('set_hp', {data, CURHP, MAXHP});
            CURHP.showValue = CURHP.value;
        },    
        set_trial_hp(data) {
            var target = this.$store.state.trialAttribute;
            var CURHP = target.attribute.CURHP,
                MAXHP = target.attribute.MAXHP;
            if(-1*data >= CURHP.value)
                data = this.buffBeforeKilled(target, data);
            this.$store.commit('set_hp', {data, CURHP, MAXHP});
            CURHP.showValue = CURHP.value;
        },  
    }
}