<template>
<draggable class="saveload">
    <template slot="header">
    </template>
    <template slot="main" >
        <a href="#" class="close" @click="closeSaveload()"></a>
        <div class="save">
            <div class="title">
                <span>导出存档</span>
            </div>
            <div class="body">
                <textarea id="imSavedata" class="scrollbar-morpheus-den form-control z-depth-1 savedata-textarea" v-model="saveData"></textarea>
            </div>

            <div class="footer">
                <button class="btn btn-outline-light btn-sm" @click="saveGame">刷新</button>
                <button class="btn btn-outline-light btn-sm" @click="copySavaData">复制文本到剪贴板</button>
            </div>
        </div>
        <div class="save">
            <div class="title">
                <span>导入存档</span>
            </div>
            <div class="body">
                <textarea id="exSavadata" class="scrollbar-morpheus-den form-control z-depth-1 savedata-textarea" @focus="loadData = ''" v-model="loadData" placeholder="请先输入存档数据"></textarea></div>
            <div class="footer">
                <button class="btn btn-outline-light btn-sm" @click="loadGame(loadData)">导入</button>

            </div>
        </div>
    </template>
</draggable>
</template>
<script>
import draggable from '../uiComponent/draggable';
import { assist } from '../../assets/js/assist';
import { Base64 } from 'js-base64';
export default {    
    name: 'saveload',
    props: {
    },
    mixins: [assist],
    components: {draggable},
    data() {
        return {
            dragging: false,
            saveData: '',
            loadData: ''
        };
    },
    mounted() {
    },
    watch: {
    },
    computed: {
    },
    methods: {
        copySavaData() {
            var imSavadataTextArea = document.getElementById("imSavedata");
            imSavadataTextArea.select(); // 选中文本
            document.execCommand("copy"); // 执行浏览器复制命令
        }, 
        async saveGame(needInfo) {
            var data = {}
            var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
            data = {
                state: this.$store.state,
                backpackEquipment: backpack.grid,
                backpackItem: backpack.itemGrid,
            }
            var saveData = Base64.encode(Base64.encode(JSON.stringify(data)));
            localStorage.setItem('_sd', saveData);

            needInfo && this.$store.commit("set_sys_info", {
                msg: `
                    游戏进度已保存。
                    `,
                type: 'win'
            });
            this.saveData = saveData;
        },
        loadGame(loadData) {
            if(!loadData)
                return;
            try {
                var data = JSON.parse(Base64.decode(Base64.decode(loadData)));
                if(data.state.setting == undefined)
                    data.state.setting = {};
                this.$store.replaceState(data.state);
                var backpack = this.findBrothersComponents(this, 'backpack', false)[0];
                var mapEvent = this.findBrothersComponents(this, 'mapEvent', false)[0];
                backpack.grid = data.backpackEquipment;
                
                var index = this.findComponentUpward(this, 'index');
                this.$store.state.dungeonInfo.auto = false;
                this.$store.state.dungeonInfo.inBattle = false;
                this.$store.state.enermyAttribute.attribute.CURHP.value = 0;
                index.sysInfo = this.$store.state.sysInfo;
                index.battleInfo = this.$store.state.battleInfo;
                index.dungeonInfo = this.$store.state.dungeonInfo;
                index.createMaps(this.$store.state.playerAttribute.lv);
                index.switchZone('trial');
                mapEvent.generateEnermy('trial', this.$store.state.dungeonInfo['trial'].level);
                index.switchZone('advanture');
                if(this.$store.state.playerAttribute.spells.spell == undefined) {
                    this.$store.state.playerAttribute.spells = {        
                        weight: 100,
                        spell: {
                            attack: true, 
                        },
                    }
                }

                var guild = this.findComponentDownward(index, 'guild');
                guild.getAllCost();
                this.closeSaveload();
            } catch (error) {
                console.log(error)
                this.$store.commit("set_sys_info", {
                    msg: `
                        存档加载失败！
                        `,
                    type: 'warning'
                });
            }
        },
        closeSaveload() {
            var index = this.findComponentUpward(this, 'index');
            index.closeMenuPanel('save');
        }
    }
}
</script>
<style lang="scss" scoped>
#draggable-header {
    left: 0px;
    top: 0px;
    height: 2.5rem;
}
.saveload {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20rem;
    width: 50rem;
    border: 4px solid rgb(37, 32, 32);
    // padding: 1rem;
    background: linear-gradient(180deg, rgb(99, 87, 90) 0%, rgb(139, 139, 139) 20%, rgb(104, 101, 98) 100%);
    margin: auto;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    
    .save{
        margin: 2rem 0.5rem 0.5rem 0.5rem;
        width: 50%;
    }
}
.savedata-textarea {
    height: 10rem;
}
.close {
    position: absolute;
    right: 10px;
    top: 5px;
    width: 32px;
    height: 32px;
    opacity: 0.7;
    z-index: 6;
}
.close:hover {
    opacity: 1;
}
.close:before, .close:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: rgb(255, 255, 255);
}
.close:before {
    transform: rotate(45deg);
}
.close:after {
    transform: rotate(-45deg);
}

</style>