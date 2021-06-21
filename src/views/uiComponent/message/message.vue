<template>
    <div class="confirm" v-if="visible">
        <h1>{{ title }}</h1>
        <p>{{ message }}</p>
        <button @click="handleClick()" @keydown.enter="handleClick()">{{confirmBtnText}}</button>
        <button @click="close()" @keydown.enter="close()">{{closeBtnText}}</button>
    </div>
</template>

<script>
export default {
    name: 'MizMessage',
    data() {
        return {
            visible: true,
            message: '',
            closed: false,
            onClose: null,
            onCancel:null,
            verticalOffset: 0,
            closeBtnText:'取消',
            confirmBtnText:'确认',
            title:'提示'
        }
    },
    computed: {
        style() {
            return {
                'top': this.verticalOffset + 'px'
            }
        }
    },
    methods: {
        close() {
            this.visible = false
            this.closed = true
            if (typeof this.onCancel === 'function') {
                this.onCancel(this)
            }
        },
        handleClick(){
            this.visible = false 
            this.closed = true
            if (typeof this.onClose === 'function') {
                this.onClose(this)
            }
        }
    },
    mounted() {
    }
}
</script>
<style lang="scss" scoped>

body {
    background: #467fae;
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Arial', 'Lucida Grande', sans-serif;
    z-index: 9;
}
// @keyframes fade {
//     from {
//         opacity: 0.5;
//         transform: translate(-50%, -50%) scale(0.8);
//     }
//     to {
//         opacity: 1;
//         transform: translate(-50%, -50%) scale(1);
//     }
// }
.confirm {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    min-width: 280px;
    max-width: 420px;
    height: auto;
    background: #3a3a3a;
    color: #EFEFEF;
    border-radius: 10px;
    padding: 0;
    margin: 0;
    border-top: 1px solid rgb(88, 88, 88);
    box-shadow: inset 0 0 5px 1px rgb(155, 155, 155);
}
.confirm h1 {
    text-align: center;
    font-size: 1.2rem;
    margin: 1.5rem 1rem 0.5rem;
}
.confirm p {
    text-align: center;
    font-size: 1rem;
    margin: 0 2rem 4.5rem;
}
.confirm button {
    background: transparent;
    border: none;
    color: #EFEFEF;
    height: 3rem;
    font-size: 1rem;
    width: 50%;
    position: absolute;
    bottom: 0;
    cursor: pointer;
}
.confirm button:nth-of-type(1) {
    border-top: 1px solid #B4B4B4;
    border-right: 1px solid #B4B4B4;
    left: 0;
    border-radius: 0 0 0 10px;
}
.confirm button:nth-of-type(2) {
    border-top: 1px solid #B4B4B4;
    right: 0;
    border-radius: 0 0 10px 0;
}
.confirm button:hover {
    // font-weight: bold;
    background: #303030;
    color: #B4B4B4;
}
.confirm button:active {
    background: #1a1a1a;
}

</style>