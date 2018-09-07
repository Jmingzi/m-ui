<template>
  <div
    class="message__wrap px-padding-tb5"
    :class="`message__wrap-${type}`"
    v-show="showWarning"
  >
    <div class="message__left">
      <div class="message__icon" v-if="ball && icon">
        <i class="font-12" :class="icon" />
      </div>
      <p
        class="message px-font-12 px-margin-l10"
        @click="$emit('on-click')"
      >
        {{ message }}
      </p>
    </div>
    <div v-if="close" class="message__close" @click="doClose">
      <i class="iconfont icon-guanbi font-10" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'warn-message',
  data() {
    return {
      showWarning: true
    }
  },
  methods: {
    doClose() {
      this.showWarning = false
      this.$emit('on-close')
    }
  },
  props: {
    message: {
      type: String,
      default: '这是一段提示'
    },
    // 废弃
    ball: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: 'iconfont icon-tixing'
    },
    close: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'warn'
    }
  }
}
</script>

<style lang="scss">
  .message__wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .message__left {
    display: flex;
    align-items: center;

    .message {
      display: flex;
      justify-content: start;
    }
  }
  .message__wrap-warn {
    background-color: #FEFBE5;
    color: #FE6A00;
  }
  .message__close,
  .message__icon {
    padding: 0 7px;
  }
  .message__icon {
    padding-right: 0;
  }
.px-padding-tb5
{
  padding:5px 0
}
.px-font-12
{
  font-size:12px !important
}
.px-margin-l10
{
  margin:0 0 0 10px
}

</style>
