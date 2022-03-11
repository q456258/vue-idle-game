<template>
<div id="minesweeper-container" v-show="display">
    <!-- <div id="minesweeper-header">
        <a id="menu-link" href="#" class="active" @click="close">Game</a>
        <a href="#" class="close" @click="close"></a>
    </div> -->
    <div id="minesweeper-board-wrapper">
        <div id="minesweeper-header">
            <!-- <div id="mine-count" class="numbers">{{remain}}</div> -->
            <a href="#" class="close" @click="close"></a>
            <div class="reward">产出: 
                <div v-for="(v, k) in rewardList" :key="k">
                    <div v-if="v[0]">
                        <div class="smallIconContainer">
                            <del :class="[{grey:v[0].quality.qualityLv==1, green:v[0].quality.qualityLv==3, blue:v[0].quality.qualityLv==4, purple:v[0].quality.qualityLv==5, orange:v[0].quality.qualityLv==6}, 'smallIcon iconBorder']"></del>
                            <img :src="v[0].description.iconSrc" alt="" />
                        </div>
                        <!-- <div class="quantity">{{v[1]+'%'}}</div> -->
                    </div>
                </div>
            </div>
        </div>
        <div id="minefield">
            <div class="covered" @click="dig(k)" @contextmenu="flag(k)" v-on:dblclick="autoDig(k)" v-for="(v,k) in mines" :key="k"></div>
        </div>
        <div id="minesweeper-end" v-if="gameover">
            本次收益
            <div v-for="(v, k) in rewardList" :key="k">
                <div v-if="v[0].quantity>0">
                    <div>{{v[0].description.name}}x{{v[0].quantity}}</div>
                </div>
            </div>
            <a href="#" @click="close">关闭</a>
        </div>
    </div>
</div>
</template>
<script>
import { assist } from '../../assets/js/assist';
export default {    
    name: 'minesweeper',
    mixins: [assist],
    components: {},
    props: {
        difficulty: {
            type: Number
        },
        rewardList: {
            type: Array
        },
    },
    data() {
        return {
            mines: [],
            remain: 0,
            bomb: 10,
            row: 10,
            col: 8,
            gridSet: false,
            display: false,
            gameover: false,
            // rewards: {}
        };
    },
    mounted() {
        // this.init()
    },
    watch: {
    },
    computed: {
    },
    methods: {
        init() {
            if(this.gridSet) {
                this.gameLost();
            }
            this.reset();
        },
        reset() {
            switch(this.difficulty) {
                case 0:
                    this.row = 9;
                    this.col = 9;
                    this.bomb = 10;
                    break;
                case 1:
                    this.row = 16;
                    this.col = 16;
                    this.bomb = 40;
                    break;
                case 2:
                    this.row = 16;
                    this.col = 30;
                    this.bomb = 99;
                    break;
            }
            let gridCount = this.row*this.col;
            this.remain = gridCount-this.bomb;
            this.gridSet = false;
            this.gameover = false;
            this.display = true;
            this.mines = new Array(gridCount).fill(0);
            let container = document.getElementById('minesweeper-container');
            let minefield = document.getElementById('minefield');
            let minefields = minefield.children;

            container.style.left = 100+-0.5*(21+29*this.col)+"px";
            // container.style.top = -1*(20+29*this.row)+"px";
            minefield.style.width = 1+29*this.col+"px";
            minefield.style.height = 29*this.row+"px";

            for(let i=0; i<minefields.length; i++) {
                minefields[i].classList.remove("flagged");
                minefields[i].classList.remove("flipped");
                minefields[i].innerHTML = "";
                minefields[i].style.backgroundColor = "";
            }
        },
        generateMines(start=-1) {
            this.gridSet = true;
            let gridCount = this.row*this.col;
            this.remain = gridCount-this.bomb;
            let arrList = Array.from(Array(gridCount).keys());
            if(start != -1) {
                [arrList[start], arrList[arrList.length-1]] = [arrList[arrList.length-1], arrList[start]];
                arrList.pop();
            }
            for(let i=0; i<this.bomb; i++) {
                let ran = Math.floor(Math.random()*arrList.length);
                this.mines[arrList[ran]] = -1;
                this.addToSurrounding(arrList[ran]);
                [arrList[ran], arrList[arrList.length-1]] = [arrList[arrList.length-1], arrList[ran]];
                arrList.pop();
            }
            this.$set(this.mines, 0, this.mines[0]);
        },
        addToSurrounding(pos) {
            for(let i=-1; i<2; i++) {
                if(pos+i*this.col < 0 || pos+i*this.col >= this.mines.length)
                    continue;
                for(let k=-1; k<2; k++) {
                    let col = pos%this.col;
                    if(col+k<0 || col+k>=this.col || (i==0 && k==0))
                        continue;
                    let newPos = pos + i*this.col + k;
                    if(this.mines[newPos] != -1)
                        this.mines[newPos]++;
                }
            }
        },
        flag(index) {
            if(this.gameover)
                return;
            if(!this.gridSet)
                this.generateMines(index);
            let target = document.getElementById('minefield').children[index];
            if(target.classList.contains("flipped"))
                return;
            if(target.classList.contains("flagged")) {
                target.innerHTML = "";
                target.classList.remove("flagged");
                this.mines[index] /= 10;
            } else {
                target.innerHTML = "⛏️";//💣💎
                target.classList.add("flagged")
                this.mines[index] *= 10;
            }
        },
        dig(index, force=false) {
            if(this.gameover)
                return;
            if(!this.gridSet)
                this.generateMines(index);
            let target = document.getElementById('minefield').children[index];
            if(target.classList.contains("flipped") || (target.classList.contains("flagged") && !(force && this.mines[index]==0)))
                return;
            // let target = minefield[index];
            target.classList.add('flipped');
            if(this.mines[index] == 0) {
                target.innerHTML = "";
                for(let i=-1; i<2; i++) {
                    if(index+i*this.col < 0 || index+i*this.col >= this.mines.length)
                        continue;
                    for(let k=-1; k<2; k++) {
                        let col = index%this.col;
                        if(col+k<0 || col+k>=this.col || (i==0 && k==0))
                            continue;
                        let newPos = index + i*this.col + k;
                        this.dig(newPos, true);
                    }
                }
            } else if(this.mines[index] == -1) {
                target.style.backgroundColor = "#ff0000";
                target.innerHTML = "💎";
                this.gameLost();
            } else {
                target.innerHTML = this.mines[index];
            }
            this.remain--;
            if(this.remain<=0)
                this.gameWon();
        },
        autoDig(index) {
            let target = document.getElementById('minefield').children[index];
            if(!isNaN(target.innerHTML)) {
                let val = target.innerHTML;
                let flagCount = 0;
                for(let i=-1; i<2; i++) {
                    if(index+i*this.col < 0 || index+i*this.col >= this.mines.length)
                        continue;
                    for(let k=-1; k<2; k++) {
                        let col = index%this.col;
                        if(col+k<0 || col+k>=this.col || (i==0 && k==0))
                            continue;
                        let newPos = index + i*this.col + k;
                        if(Math.abs(this.mines[newPos])>=10)
                            flagCount++;
                    }
                }
                if(flagCount >= val) {
                    for(let i=-1; i<2; i++) {
                        if(index+i*this.col < 0 || index+i*this.col >= this.mines.length)
                            continue;
                        for(let k=-1; k<2; k++) {
                            let col = index%this.col;
                            if(col+k<0 || col+k>=this.col || (i==0 && k==0))
                                continue;
                            let newPos = index + i*this.col + k;
                            this.dig(newPos);
                        }
                    }
                }
            }
        },
        gameLost() {
            this.gridSet = false;
            this.gameover = true;
            let rewardCount = 10;
            let target = document.getElementById('minefield').children;
            for(let i=0; i<this.mines.length; i++) {
                if(this.mines[i] == -1) {
                    target[i].style.backgroundColor = "#ff0000";
                    target[i].innerHTML = "💎";
                    target[i].classList.add('flipped');
                    target[i].classList.remove("flagged");
                    rewardCount--;
                } else if(this.mines[i] == -10) {
                    target[i].style.backgroundColor = "#00ff00";
                    target[i].innerHTML = "💎";
                    target[i].classList.add('flipped');
                    target[i].classList.remove("flagged");
                 }
            }
            this.reward(rewardCount);
        },
        gameWon() {
            this.gridSet = false;
            this.gameover = true;
            let target = document.getElementById('minefield').children;
            for(let i=0; i<this.mines.length; i++) {
                if(this.mines[i] == -1 || this.mines[i] == -10) {
                    target[i].style.backgroundColor = "#00ff00";
                    target[i].innerHTML = "💎";
                    target[i].classList.add('flipped')
                    target[i].classList.remove("flagged")
                }
            }
            this.reward(10);
        },
        close() {
            this.gridSet = false;
            this.display = false;
            this.gameover = true;
            this.mines = [];
        },
        reward(rewardCount) {
            // 清零
            for(let k=0; k<this.rewardList.length; k++) {
                this.rewardList[k][0].quantity = 0;
            }
            if(rewardCount <= 0)
                return;
            let mapEvent = this.findComponentUpward(this, 'mapEvent');
            let itemInfo = this.findBrothersComponents(mapEvent, 'itemInfo', false)[0];
            // 添加数量
            while(rewardCount > 0) {
                for(let k=0; k<this.rewardList.length; k++) {
                    let random = Math.random()*100;
                    if(random <= this.rewardList[k][1]) {
                        this.rewardList[k][0].quantity++;
                    }
                }
                rewardCount--;
            }
            // 给予奖励
            for(let k=0; k<this.rewardList.length; k++) {
                itemInfo.addItem(this.rewardList[k][0]);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
#minesweeper-container {    
    position: absolute;
    top: -10px;
    z-index: 1;
    border: 2px solid;
}
#minesweeper-header {
    background-color: #202020;
    padding: 5px 0px 2px 5px;
}
#minesweeper-end {    
    position: absolute;
    top: 40%;
    left: 0;
    right: 0;
    margin: auto;
    width: 100px;
    background-color: #2b2b2b;
}
#minefield {
    width: 400px;
    height: 400px;
    display: flex;
    flex-wrap: wrap;
    background: #ffffff;
    // border: 10px solid #7b7b7b;
    // border-color:  #7b7b7b #ffffff #ffffff#7b7b7b;
}
.covered {
    width: 30px;
    height: 30px;
    margin: -1px 0 0 -1px;
    background-color: #bdbdbd;
    border: 5px solid;
    border-color: #ffffff #7b7b7b #7b7b7b #ffffff;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.flipped {
    background-color: #b3b3b3;
    border: 1px solid rgb(123,123,123);
    cursor: initial;
}
</style>