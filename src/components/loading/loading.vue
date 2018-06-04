<template>
  <transition name="loading">
    <div
      v-show="visible"
      class="m-loading__wrap"
      :class="customClass"
      @touchmove.prevent=""
    >
      <div class="loading-spinner">
        <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"/>
        </svg>
        <!--<p v-show="text" class="el-loading-text">{{ text }}</p>-->
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      text: null,
      visible: false,
      customClass: ''
    }
  },
  methods: {
    // setText (text) {
    //   this.text = text
    // }
    open() {
      this.visible = true
    },
    close() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
  .m-loading__wrap {
    position: fixed;
    top:0;
    right:0;
    left:0;
    bottom:0;
    background-color: transparent;
    text-align: center;
    color: #fff;
    font-size: 16px;
    z-index: 1111;
    .loading-spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      padding: 10px;
      // width: 90px;
      // min-height: 80px;
      border-radius: 3px;
      background-color: rgba(0,0,0,.6);
      transform: translate(-50%, -50%);
      // box-shadow: 0 0 1px rgba(0,0,0,.3);
    }
    .el-loading-text {
      font-size: 12px;
    }
    .circular {
      width: 32px;
      height: 32px;
      animation:loading-rotate 2s linear infinite
    }
    .path{
      animation:loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray:90,150;
      stroke-dashoffset:0;
      stroke-width:2;
      stroke:#fff;
      stroke-linecap:round;
    }
  }
  .loading-enter-active,
  .loading-leave-active {
    transition: all .5s ease;
  }
  .loading-enter,
  .loading-leave-active {
    opacity: 0;
  }
  @keyframes loading-rotate{
    100%{transform:rotate(360deg)}
  }
  @keyframes loading-dash{
    0%{stroke-dasharray:1,200;stroke-dashoffset:0}
    50%{stroke-dasharray:90,150;stroke-dashoffset:-40px}
    100%{stroke-dasharray:90,150;stroke-dashoffset:-120px}
  }
</style>
