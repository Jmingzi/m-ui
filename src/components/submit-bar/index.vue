<template>
  <div class="width-100 px-height-50 text-right bg-fff">
    <div v-if="$slots.default" class="fl px-width-60 px-line-50 text-left">
      <slot />
    </div>
    <div class="font-bold font-16 ib-middle px-margin-r5">
      <span class="color-c000">{{ subText }}：</span>
      <span style="color: red;">¥ {{ money }}</span>
    </div>
    <div
      class="ib-middle px-width-100 height-100 px-line-50 color-fff text-center"
      :style="{ backgroundColor: mainColor }"
      @click="$emit('on-submit')"
    >
      {{ mainText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    money: [Number, String],
    mainText: {
      type: String,
      default: '提交订单'
    },
    subText: {
      type: String,
      default: '实付款'
    },
    mainColor: {
      type: String,
      default: 'red'
    }
  }
}
</script>

<style lang="scss">

</style>
