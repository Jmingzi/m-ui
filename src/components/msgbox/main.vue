<template>
  <div
    v-show="visible"
    class="m-msgBox__wrap position-f top-0 bottom-0 left-0 right-0 overflow-a"
  >
    <!--为解决滑动穿透，加一层节点来"吃掉"穿透的滚动-->
    <!--<div style="height: 200%" />-->

    <m-mask :show="visible" />

    <transition name="bounce">
      <div class="m-msgBox" v-show="visible" @touchmove.stop="">
        <div class="m-msgBox_title" v-if="title">{{ title }}</div>
        <div class="m-msgBox_content overflow-a touch-scroll">
          <slot>
            <span>{{ msg }}</span>
          </slot>
        </div>
        <div class="m-msgBox_foot m-bd-t">
          <a
            v-if="!noCancel"
            href="javascript:"
            class="m-msgBox_btn"
            :class="{
              'm-bd-r': !this.noConfirm,
              'w100': this.noConfirm
            }"
            @click="doAction('cancel')"
          >
            {{ cancelTxt }}
          </a>
          <a
            v-if="!noConfirm"
            href="javascript:"
            class="m-msgBox_btn"
            :class="{
              'w100': this.noCancel,
              [confirmCls]: !this.noCancel
            }"
            @click="doAction('confirm')"
          >
            {{ okTxt }}
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MMask from '../mask/mask'

export default {
  name: 'msg-box',

  components: {
    MMask
  },

  data() {
    return {
      title: '',
      msg: '',
      cancelTxt: '取消',
      okTxt: '确认',
      noCancel: false,
      noConfirm: false,
      visible: false,
      confirmCls: ''
    }
  },
  destroyed() {
    this.visible = false
  },
  methods: {
    doAction(action) {
      // eslint-disable-next-line
      this.callback.call(this, action)
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .m-msgBox__wrap {
    z-index: 1003;
  }
  .m-msgBox {
    position: fixed;
    width: 270px;
    background-color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    text-align: center;
    overflow: hidden;
    font-size: 14px;
    z-index: 1003;

    .m-msgBox_title {
      font-size: 18px;
      padding: 20px 20px 0 20px;
    }
    .m-msgBox_content {
      max-height: 250px;
      overflow: hidden;
      color: #262A30;
      padding: 15px 20px;
    }
    .m-msgBox_foot {
      font-size: 0;

      .m-msgBox_btn {
        display: inline-block;
        vertical-align: middle;
        width: 50%;
        font-size: 17px;
        line-height: 44px;
        color: #0076FF;
        &.w100 {
          width: 100%;
        }
        &.color-blue {
          color: #0076FF !important;
        }
      }
    }
  }

  .bounce-enter,
  .bounce-enter-active {
    opacity: 0;
  }
  .bounce-enter-to {
    opacity: 1;
    transition: opacity .1s;
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
.overflow-a
{
  overflow:auto !important
}
.touch-scroll
{
  -webkit-overflow-scrolling:touch
}
.m-bd-t
{
  position:relative
}

</style>
