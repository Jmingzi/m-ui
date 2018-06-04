<template>
  <transition name="fade">
    <div
      class="m-toast position-f radius-4 overflow-h"
      :class="className"
      v-show="visible"
    >
      <div class="m-toast__text px-font-14 color-fff">{{ message }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'toast',

  props: {
    message: String,
    className: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      visible: false
    }
  }
}
</script>

<style lang="scss">
  .m-toast {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0,0,0,.7);
    z-index: 1110;
  }
  .m-toast__text {
    padding: 5px 10px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
