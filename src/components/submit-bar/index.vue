<template>
  <div class="width-100 px-height-50 bg-fff text-right">
    <div v-if="$slots.default" class="fl px-width-60 px-line-50 text-left">
      <slot />
    </div>
    <slot v-if="$slots.info" name="info" />
    <div class="font-bold font-16 ib-middle px-margin-r5" v-else>
      <span class="color-c000">{{ subText }}：</span>
      <span :style="{ color: mainColor }">¥ {{ money }}</span>
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
.width-100
{
  width:100%
}
.px-height-50
{
  height:50px
}
.bg-fff
{
  background-color:#fff
}
.text-right
{
  text-align:right
}
.fl
{
  float:left
}
.px-width-60
{
  width:60px
}
.px-line-50
{
  line-height:50px
}
.text-left
{
  text-align:left
}
.font-bold
{
  font-weight:bold
}
.ib-middle
{
  display:inline-block;
  vertical-align: middle;
}
.px-margin-r5
{
  margin:0 5px 0 0
}
.px-width-100
{
  width:100px
}
.height-100
{
  height:100%
}
.color-fff
{
  color:#fff
}
.text-center
{
  text-align:center
}

</style>
