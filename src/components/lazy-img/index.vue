<template>
  <div class="m-lazyImg__wrap" ref="lazyImgWrap">
    <slot />
  </div>
</template>

<script>
import testMeet from './testMeet'
import throttle from './throttle'
// 参考
// https://github.com/hilongjw/vue-lazyload/blob/master/src/lazy.js
// https://github.com/lzxb/lazy-load-img/blob/master/examples/mode-default.html

export default {
  props: {
    selector: {
      type: String,
      required: true
    },
    throttleTime: {
      type: Number,
      default: 300
    },
    loadType: {
      type: String,
      default: 'img'
    },
    scrollWrapSelector: String
  },

  data() {
    return {
      moveEventSwitch: true,
      wrapElem: null,
      loadFun: throttle(
        () => { this.moveEventSwitch && this.start() },
        this.throttleTime,
        { leading: true, trailing: true }
      )
    }
  },

  computed: {
    isDefaultLoad() {
      return this.loadType === 'img'
    },

    isBackgroundLoad() {
      return this.loadType === 'background'
    }
  },

  mounted() {
    this.wrapElem = this.scrollWrapSelector
      ? document.querySelector(this.scrollWrapSelector)
      : window
    // const imgWrap = this.$refs.lazyImgWrap
    this.wrapElem.addEventListener('scroll', this.loadFun)
  },

  beforeDestroy() {
    this.wrapElem.removeEventListener('scroll', this.loadFun)
  },

  methods: {
    start() {
      this.moveEventSwitch = true
      const imgNodes = this.$el.querySelectorAll(this.selector)
      const imgList = Array.from(imgNodes).filter(el =>
        el.dataset.src &&
        !el.dataset.load &&
        this.inViewport(el)
      )
      imgList.forEach(el => this.loadImg(el))
    },

    destroy() {
      this.moveEventSwitch = false
    },

    inViewport(el) {
      return testMeet(el, {
        top: 0, // 元素距离顶部
        right: 0, // 元素距离右边
        bottom: 0, // 元素距离下面
        left: 0 // 元素距离左边
      })
    },

    loadImg(el) {
      const img = new Image()
      img.src = el.dataset.src
      img.onload = () => {
        if (this.isDefaultLoad) {
          el.src = el.dataset.src
        } else if (this.isBackgroundLoad) {
          el.style.backgroundImage = `url(${el.dataset.src})`
        }
        el.setAttribute('data-load', true)
      }
      img.onerror = () => {
        el.setAttribute('data-load', true)
      }
    }
  }
}
</script>

<style>
  .m-lazyImg__wrap {}
</style>
