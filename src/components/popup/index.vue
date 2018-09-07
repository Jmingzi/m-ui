<template>
  <div
    class="m-popup__container-width-mask scroll-wrap position-f top-0 bottom-0 left-0 right-0"
    v-show="showMask"
  >
    <!--为解决滑动穿透，加一层节点来"吃掉"穿透的滚动-->
    <!--<div style="height: 200%;" class="empty__child" />-->

    <m-mask :show="showMask" />

    <transition name="m-popup__zoom-up">
      <div
        v-show="visible"
        class="m-popup__wrap position-f bottom-0 bg-fff left-0 width-100"
        :class="[getWrapperClass]"
      >
        <div
          v-if="!noTitle"
          :class="`title-wrap ${titleAlign} px-padding-lr10`"
          class="position-r m-bd-b"
        >
          <div class="right-close position-a right-0 px-line-45 text-center" @click.stop="close">
            <slot name="icon">
              <i class="iconfont icon-guanbi" />
            </slot>
          </div>
          <div class="title color-c666 px-font-16">{{ title }}</div>
        </div>
        <div
          :class="`content-wrap touch-scroll overflow-a ${noTitle ? 'no-title' : ''}`"
          :style="{height: `${contentHeight}px`}"
        >
          <div class="content-item-wrap break-all height-100">
            <slot v-if="$slots.default" />
            <slot name="content" v-else>
              <p class="text-center">这是内容</p>
            </slot>
          </div>
        </div>
        <div
          v-if="showBtn"
          class="btn-wrap hover-bg-main text-center px-font-18 color-fff"
          :style="{ backgroundColor: mainColor }"
          @click="confirm"
        >
          {{ confirmText }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MMask from '../mask/mask'

export default {
  name: 'm-popup',

  props: {
    title: {
      type: String,
      default: '标题'
    },
    titleAlign: {
      type: String,
      default: 'text-center'
    },
    contentHeight: {
      type: Number
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    noTitle: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    mainColor: {
      type: String,
      default: 'red'
    }
  },

  computed: {
    getWrapperClass() {
      if (!this.showBtn && !this.contentHeight) {
        return 'no-confirm'
      }
      return ''
    }
  },

  data() {
    return {
      showMask: this.visible
    }
  },

  watch: {
    visible(val) {
      // document.documentElement.style.overflow = val ? 'hidden' : ''
      if (val) {
        this.showMask = true
      } else {
        setTimeout(() => {
          this.showMask = false
        }, 300)
      }
    }
  },

  methods: {
    confirm() {
      this.$emit('confirm')
      this.$emit('toggle')
      this.$emit('update:visible', false)
    },
    close() {
      this.$emit('close')
      this.$emit('toggle')
      this.$emit('update:visible', false)
    }
  },
  destroyed () {
    this.$emit('toggle')
  },

  components: {
    MMask
  }
}
</script>

<style lang="scss">
  .m-popup__container-width-mask {
    z-index: 1000;
  }

  .m-popup__wrap {
    box-shadow: 0 -1px 6px 0 rgba(0,0,0,0.50);
    z-index: 1002;

    &.no-confirm {
      height: 360px;
    }

    .title-wrap {
      height: 45px;
      line-height: 45px;

      .right-close {
        height: 100%;
        width: 50px;
        color: #9c9c9c;
      }
    }

    .content-wrap {
      height: 315px;
      &.no-title {
        height: 360px;
      }
    }

    .btn-wrap {
      height: 55px;
      line-height: 55px;
    }
  }

  .m-popup__zoom-up-enter-active {
    animation: m-popup__fadeInUp ease-out .3s;
  }
  .m-popup__zoom-up-leave-active {
    animation: m-popup__fadeOutDown ease-out .3s;
  }
  @keyframes m-popup__fadeInUp {
    from {
      transform: translate3d(0, 100%, 0);
    }
    to {
      transform: none;
    }
  }
  @keyframes m-popup__fadeOutDown {
    from {
    }
    to {
      transform: translate3d(0, 100%, 0);
    }
  }
.position-f
{
  position:fixed
}
.top-0
{
  top:0
}
.bottom-0
{
  bottom:0
}
.left-0
{
  left:0
}
.right-0
{
  right:0
}
.bg-fff
{
  background-color:#fff
}
.width-100
{
  width:100%
}
.position-r
{
  position:relative
}
.m-bd-b
{
  position:relative
}
.position-a
{
  position:absolute
}
.px-line-45
{
  line-height:45px
}
.text-center
{
  text-align:center
}
.color-c666
{
  color:#666
}
.px-font-16
{
  font-size:16px !important
}
.break-all
{
  word-break:break-all
}
.height-100
{
  height:100%
}
.px-font-18
{
  font-size:18px !important
}
.color-fff
{
  color:#fff
}
.overflow-a{
  overflow: auto;
}
</style>
