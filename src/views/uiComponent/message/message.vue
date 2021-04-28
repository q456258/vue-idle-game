<template>
  <transition name="fade">
    <div class="message" v-show="visible">
      <div class="title">
        <span>{{title}}</span>
      </div>
      <div class="body">
        <p>{{ message }}</p>
      </div>

      <div class="footer">
        <div class="btn" @click="handleClick()" @keydown.enter="handleClick()">{{confirmBtnText}}</div>
        <div class="btn" @click="close()" @keydown.enter="close()">{{closeBtnText}}</div>
      </div>
    </div>
  </transition>
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
<style lang="scss">
.message {
  position: absolute;
  z-index: 9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #fff;
  border-radius: 6px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.7);
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  width: 20rem;
  .title {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-start;
    padding-left: .7rem;
    font-size: 20px;
    height: 3rem;
  }
  .body {
    padding: 0.5rem 0.7rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    font-size: 1rem;
    p{
      // text-indent: .32rem;
      letter-spacing: 1px;
    }
  }
  .footer {
    padding:1rem 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .btn {
      margin: 0.5rem;
      border: 2px solid #fff;
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.7);
      color: #fff;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>