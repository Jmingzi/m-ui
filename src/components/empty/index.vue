<template>
  <div class="m-empty__wrap width-100 text-center px-padding-t30">
    <div class="px-width-90 px-height-90 margin-auto">
      <img
        v-if="iconImg"
        :src="iconImg"
        class="width-100 height-100"
      >
      <i
        class="iconfont color-c666"
        :class="icon"
        v-else
      />
    </div>
    <p class="px-font-16 color-c333">{{ title }}</p>
    <p class="color-c999 px-font-12">{{ desc }}</p>
    <div
      v-show="btnText"
      class="ib-middle m-empty__btn m-bd color-c666 px-font-12 px-margin-t20"
      @click="$emit('on-click')">
      {{ btnText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'empty',

  props: {
    title: {
      type: String,
      default: '没有数据哦～'
    },
    desc: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: ''
    },
    iconImg: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
  .m-empty__wrap {
    .iconfont {
      font-size: 60px;
    }
    .m-empty__btn {
      padding: 5px 15px;
    }
  }
</style>
