<template>
  <m-mask
    :show="visible"
    :style="{
      textAlign: this.align
    }"
    @tap="hide"
  >
    <transition :name="`fade-${this.align}`">
      <div
        v-if="visible && localVar"
        class="m-popup-side display-ib height-100 bg-fff overflow-h"
        @click.stop=""
      >
        <div
          class="m-popup-side__content height-100 no-wrap font-0"
          :style="{
            width: `${100 * num}%`,
            transform: `translateX(${currentIndex * -(100/num)}%)`,
            '-webkit-transform': `-webkit-translateX(${currentIndex * -(100/num)}%)`
          }"
        >
          <div
            v-for="(key, i) in slotsArr"
            :key="i"
            class="ib-middle height-100 px-font-14 overflow-a touch-scroll"
            :style="{
              width: `${100/num}%`
            }"
          >
            <slot :name="key" />
          </div>
        </div>
      </div>
    </transition>
  </m-mask>
</template>

<script>
import Mask from '../mask/mask.vue'

export default {
  name: 'popup-side',

  components: {
    MMask: Mask
  },

  props: {
    align: {
      type: String,
      default: 'right'
    },
    visible: Boolean,
    num: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      localVar: false,
      currentIndex: 0
    }
  },

  computed: {
    slotsArr() {
      return Object.keys(this.$slots)
    }
  },

  watch: {
    visible(val) {
      this.localVar = val
    }
  },

  created() {
    this.localVar = this.visible
  },

  methods: {
    hide() {
      this.localVar = false
      setTimeout(() => {
        this.$emit('toggle')
      }, 200)
    },

    next(num) {
      this.currentIndex = num
    }
  }
}
</script>

<style lang="scss">
  .m-popup-side {
    width: 8rem;
    transition: transform .2s;
  }
  .m-popup-side__content {
    transition: transform .2s;
  }
  .fade-right-enter-active {
    transform: translateX(100%);
  }
  .fade-left-enter-active {
    transform: translateX(-100%);
  }
  .fade-right-leave-active {
    transform: translateX(100%);
  }
  .fade-left-leave-active {
    transform: translateX(-100%);
  }
.display-ib
{
  display:inline-block !important
}
.height-100
{
  height:100%
}
.bg-fff
{
  background-color:#fff
}
.overflow-h
{
  overflow:hidden !important
}
.font-0
{
  font-size:0 !important
}
.ib-middle
{
  display:inline-block;
  vertical-align: middle;
}
.px-font-14
{
  font-size:14px !important
}
.overflow-a
{
  overflow:auto !important
}
.touch-scroll
{
  -webkit-overflow-scrolling:touch
}

</style>
