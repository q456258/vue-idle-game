<template>
<draggable style="position:absolute; top:0; width:500px">
    <template slot="header">
        <div class="battleAnimeHeader"></div>
    </template>
    <template slot="main" >
        <div id="battleAnimeWrapper">
            <div id="playerHpBar">
                <hpmpBar :vpMin="0" :vpNow="attribute.CURHP.value" :vpMax="attribute.MAXHP.value" :target="'player'" :type="'hp'"></hpmpBar>
                <hpmpBar :vpMin="0" :vpNow="attribute.CURMP.value" :vpMax="attribute.MAXMP.value" :target="'player'" :type="'mp'"></hpmpBar>
            </div>
            <div class="playerInitPos">
                <div id="playerAnime">
                </div>
            </div>
            <div id="playerText" class="playerInitPos" @click="simulate">
            </div>
            <div id="enemyHpBar">
                <hpmpBar :vpMin="0" :vpNow="enemyAttr.attribute.CURHP.value" :vpMax="enemyAttr.attribute.MAXHP.value" :target="'enemy'" :type="'hp'"></hpmpBar>
            </div>
            <div class="enemyInitPos">
                <div id="enemyAnime">
                </div>
            </div>
            <div id="enemyText" class="enemyInitPos">
            </div>
        </div>
    </template>
</draggable>
</template>

<script>
import hpmpBar from '../uiComponent/hpmpBar';
import draggable from '../uiComponent/draggable';
export default {
    name: "battleAnime",
    components: {hpmpBar, draggable},
    mounted() {
        this.$store.globalComponent.battleAnime = this;
    },
    data() {
        return {
        };
    },
    props: {
    },
    computed: {
        attribute() { return this.$store.state.playerAttribute.attribute },
        enemyAttr() { return this.$store.state.enemyAttribute; },
    },
    methods: {   
        simulate() {
            let count = 0;
            let timer = setInterval(() => {
                this.playerMove();
                setTimeout(() => {
                    this.enemyMove();
                }, 1000);
                count++;
                if(count>5)
                    clearInterval(timer);
            }, 2000);
        },
        playerMove(){
            let playerPos = document.getElementById("playerAnime");
            playerPos.style.left = "50%";
            setTimeout(() => {
                playerPos.style.left = "10%";
            }, 100);
        },
        enemyMove(){
            let enemyPos = document.getElementById("enemyAnime");
            enemyPos.style.right = "50%"
            setTimeout(() => {
                enemyPos.style.right = "10%";
            }, 100);
        },
        displayText(target, type, text) {
            let parentNode;
            if(target == 'player')
                parentNode = document.getElementById("playerText");
            else
                parentNode = document.getElementById("enemyText");
            let node = document.createElement("DIV");
            let textnode;
            let duration = 1900;
            node.classList.add("floatingText");
            switch(type) {
                case 'dmg':
                    node.classList.add("dmg");
                    for(let i in text) {
                        if(isNaN(text[i]))
                            continue;
                        let span = document.createElement("DIV");
                        if(i == "adDmg")
                            span.style.color = "#ff0000";
                        if(i == "apDmg")
                            span.style.color = "#2ab0ff";
                        if(i == "heal")
                            span.style.color = "#00ff00";
                        textnode = document.createTextNode("-"+text[i]);
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
            setTimeout(() => {
                parentNode.removeChild(node);
            }, duration);
        }
    }   
}
</script>

<style>
#battleAnimeHeader {
    height: 10px;
}
#battleAnimeWrapper {
    position: absolute;
    width: 500px;
    height: 300px;
    top: 0px;
    z-index: 1;
    /* background-image: url("/icons/maps/fairbreezeValleyBattle.jpg"); */
    background-image: url("/icons/maps/battleBG1.jpg");
    background-size: cover;
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
    padding-bottom: 20%;
}
.enemyInitPos {
    position: absolute;
    text-align: center;
    top: 40%;
    right: 10%;
    width: 30%;
    padding-bottom: 20%;
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
.dmg {
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