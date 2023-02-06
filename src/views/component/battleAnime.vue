<template>
<draggable v-show="size!='none'" :left_limit="-750" :right_limit="600" :top_limit="-200" :bot_limit="400" style="position:absolute; top:0;" :style="{width:size=='large'?'535px':size=='medium'?'410px':'355px'}" >
    <template slot="header">
        <div class="battleAnimeHeader"></div>
    </template>
    <template slot="main" >
        <canvas id="battleAnimeCanvas" :class="{large: size=='large', medium: size=='medium', small: size=='small'}"></canvas>
        <div id="battleAnimeWrapper" :class="{large: size=='large', medium: size=='medium', small: size=='small'}">
            <div id="playerHpBar">
                <hpmpBar :vpMin="0" :vpNow="attribute.CURHP.value" :vpMax="attribute.MAXHP.value" :shield="attribute.SHIELD.value" :target="'player'" :type="'hp'"></hpmpBar>
                <hpmpBar :vpMin="0" :vpNow="attribute.CURMP.value" :vpMax="attribute.MAXMP.value" :target="'player'" :type="'mp'"></hpmpBar>
            </div>
            <div class="playerInitPos">
                <div id="playerAnime">
                </div>
            </div>
            <div id="playerSpellText" class="playerInitPos"></div>
            <div id="playerDmgText" class="playerInitPos"></div>
            <div id="enemyHpBar">
                <hpmpBar :vpMin="0" :vpNow="enemyAttr.attribute.CURHP.value" :vpMax="enemyAttr.attribute.MAXHP.value" :shield="enemyAttr.attribute.SHIELD.value" :target="'enemy'" :type="'hp'"></hpmpBar>
            </div>
            <div class="enemyInitPos">
                <div id="enemyAnime">
                </div>
            </div>
            <div id="enemySpellText" class="enemyInitPos"></div>
            <div id="enemyDmgText" class="enemyInitPos"></div>
        </div>
    </template>
</draggable>
</template>

<script>
import hpmpBar from '../uiComponent/hpmpBar';
import draggable from '../uiComponent/draggable';
import { effectConfig } from '@/assets/config/effectConfig'
export default {
    name: "battleAnime",
    mixins: [effectConfig],
    components: {hpmpBar, draggable},
    mounted() {
        this.$store.globalComponent.battleAnime = this;
    },
    data() {
        return {
            playerLastDmg: 0,
            enemyLastDmg: 0,
        };
    },
    props: {
    },
    computed: {
        attribute() { return this.$store.state.playerAttribute.attribute },
        enemyAttr() { return this.$store.state.enemyAttribute; },
        size() { return this.$store.state.setting.animeSize; },
    },
    methods: {   
        playerMove(spell){
            this.displayEffect(spell);

            if(this.size == 'none')
                return;
            let playerPos = document.getElementById("playerAnime");
            playerPos.style.left = "50%";
            setTimeout(() => {
                playerPos.style.left = "10%";
            }, 100);
        },
        enemyMove(){
            if(this.size == 'none')
                return;
            let enemyPos = document.getElementById("enemyAnime");
            enemyPos.style.right = "50%"
            setTimeout(() => {
                enemyPos.style.right = "10%";
            }, 100);
        },
        displayText(target, type, text) {
            if(this.size == 'none')
                return;
            let parentNode;
            let isNew = true;
            let node = document.createElement("DIV");
            if(target == 'player') {
                parentNode = type == 'dmg' ? document.getElementById("playerDmgText") :  document.getElementById("playerSpellText");
                if(type == 'dmg' && Date.now()-this.playerLastDmg < 100) {
                    node = parentNode.lastChild;
                    isNew = false;
                }
            }
            else {
                parentNode = type == 'dmg' ? document.getElementById("enemyDmgText") :  document.getElementById("enemySpellText");
                if(type == 'dmg' && Date.now()-this.enemyLastDmg < 100) {
                    node = parentNode.lastChild;
                    isNew = false;
                }
            }
            let textnode;
            let duration = 1900;
            node.classList.add("floatingText");
            switch(type) {
                case 'dmg':
                    node.classList.add("dmgText");
                    if(isNew) {
                        if(target == 'player')
                            this.playerLastDmg = Date.now();
                        else
                            this.enemyLastDmg = Date.now();
                    }
                    for(let i in text) {
                        if(isNaN(text[i]))
                            continue;
                        let span = document.createElement("DIV");
                        if(i == "adDmg") {
                            span.style.color = "#ff0000";
                            textnode = document.createTextNode("-"+text[i]);
                        }
                        if(i == "apDmg") {
                            span.style.color = "#2ab0ff";
                            textnode = document.createTextNode("-"+text[i]);
                        }
                        if(i == "trueDmg") {
                            span.style.color = "#ffffff";
                            textnode = document.createTextNode("-"+text[i]);
                        }
                        if(i == "heal") {
                            span.style.color = "#00ff00";
                            textnode = document.createTextNode(text[i]);
                        }
                        span.classList.add("innerFloatingText");
                        span.appendChild(textnode);
                        node.appendChild(span);
                    }
                    break;
                case 'spell':
                case 'failSpell':
                    duration = 1500;
                    node.classList.add("spellName");
                    textnode = document.createTextNode("【"+text+"】");
                    node.appendChild(textnode);
                    if(target == 'player') {
                        node.classList.add("playerSpellText");
                        node.style.left = "-35%";
                    }
                    else {
                        node.classList.add("enermySpellText");
                        node.style.right = "-35%";
                    }
                    if(type == 'failSpell') {
                        node.style.textDecoration = "line-through";
                        node.style.color = "#ff0000";
                    }
                    break;
                default:
                    textnode = document.createTextNode(text);
                    node.appendChild(textnode);
                    break;
            }
            parentNode.appendChild(node); 
            if(isNew) {
                setTimeout(() => {
                    parentNode.removeChild(node);
                }, duration);
            }
        },
        displayEffect(name) {
            let info = this.effectList[name];
            if(!info) {
                return;
            }
            let ctx = null;
            let delay = info.delay;
            let imgCount = info.imgCount;
            let col = info.col;
            let row = info.row;
            const canvas = document.getElementById('battleAnimeCanvas');
            const images = new Image();
            images.src = info.src;
            images.onload = () => {
                animation(0);
            }
            const animation = (i) => {
                let width = images.width/col;
                let height = images.height/row;
                const cWidth = canvas.width;
                const cHeight = canvas.height;
                let posX = info.posX;
                let posY = info.posY;
                let frameX = i%col;
                let frameY = Math.floor(i/col);
                ctx = canvas.getContext('2d')
                if (!ctx) 
                    return;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // 图片，原图片x轴，原图片y轴，原图片宽，原图片长，显示位置x轴，显示位置y轴，显示区域宽度，显示区域长读
                // x、y轴以左上角为准，超出canvas大小不显示
                ctx.drawImage(images, frameX*width,frameY*height, width,height, cWidth*posX,cHeight*posY, width,height);
                if (i != imgCount) {
                    setTimeout(() => {
                        animation(i + 1);
                    }, delay);
                }
            }
        },
    }   
}
</script>

<style>
#battleAnimeCanvas {
    position: relative;
    z-index: 4;
}
#battleAnimeHeader {
    height: 10px;
}
#battleAnimeWrapper {
    position: absolute;
    width: 535px;
    height: 300px;
    top: 0px;
    z-index: 1;
    /* background-image: url("/icons/maps/fairbreezeValleyBattle.jpg"); */
    background-image: url("/icons/maps/battleBG1.jpg");
    background-size: cover;
}
#battleAnimeWrapper.small, #battleAnimeCanvas.small {
    width: 355px;
    height: 200px;
}
#battleAnimeWrapper.medium, #battleAnimeCanvas.medium {
    width: 410px;
    height: 230px;
}
#battleAnimeWrapper.large, #battleAnimeCanvas.large {
    width: 535px;
    height: 300px;
}
#playerAnime {
    position: relative;
    width: 100%;
    height: 0;
    left: 10%;
    padding-bottom: 100%;
    /* background-image: url("/icons/other/normal.png"); */
    background-image: url("/icons/character/player1.png");
    background-size: contain;
    background-repeat: no-repeat;
    image-rendering: crisp-edges;
    image-rendering: -moz-crisp-edges;
    image-rendering: -o-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    -ms-interpolation-mode: nearest-neighbor;
}
#enemyAnime {
    position: relative;
    width: 100%;
    height: 0;
    right: 10%;
    padding-bottom: 100%;
    /* background-image: url("/icons/other/boss.png"); */
    background-image: url("/icons/character/player1.png");
    background-size: contain;
    background-repeat: no-repeat;
    image-rendering: crisp-edges;
    image-rendering: -moz-crisp-edges;
    image-rendering: -o-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    -ms-interpolation-mode: nearest-neighbor;
}
#playerHpBar {
    position: absolute;
    width: 40%;
    top: 5%;
    left: 5%;
}
#enemyHpBar {
    position: absolute;
    width: 40%;
    top: 5%;
    right: 5%;
}
.playerInitPos {
    position: absolute;
    text-align: center;
    top: 40%;
    left: 10%;
    width: 30%;
}
.enemyInitPos {
    position: absolute;
    text-align: center;
    top: 40%;
    right: 10%;
    width: 30%;
}
.floatingText {
    position: absolute;
    color: whitesmoke;
    font-size: 22px;
    text-shadow: 0 0 1px white;
    user-select: none;
    pointer-events: none;
    cursor: default;
    z-index: 1;
    width: 100%;
    text-align: center;
}
.dmgText {
    top: -75px;
    will-change: transform, opacity;
    animation-timing-function: ease-out;
    animation: move 2000ms;
}
.floatingText.spellName {
    font-size: 15px;
    /* opacity: 0; */
    color: #cfcfcf;
}
.playerSpellText {
    will-change: transform, opacity;
    animation-timing-function: ease-out;
    animation: playerSpellMove 1300ms;
}
.enermySpellText {
    will-change: transform, opacity;
    animation-timing-function: ease-out;
    animation: enermySpellMove 1300ms;
}
.innerFloatingText {
    margin-top: -15px;
}
@keyframes move {
    0% {
        top: 0;
    }
    50% {
        opacity: 0.75;
    }
    100% {
        opacity: 0;
        transform: none;
    }
}
@keyframes playerSpellMove {
    0% {
        left: -50%;
        text-decoration: none;
        color: #ffffff;
    }
    25% {
        left: -35%;
    }
    100% {
        opacity: 1;
        transform: none;
    }
}
@keyframes enermySpellMove {
    0% {
        right: -50%;
    }
    25% {
        right: -35%;
    }
    100% {
        opacity: 1;
        transform: none;
    }
}
</style>