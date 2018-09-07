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
    <p class="px-font-16 color-c333 px-margin-t30">{{ title }}</p>
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
.width-100
{
  width:100%
}
.text-center
{
  text-align:center
}
.px-padding-t30
{
  padding:30px 0 0 0
}
.px-width-90
{
  width:90px
}
.px-height-90
{
  height:90px
}
.margin-auto
{
  margin:0 auto
}
.height-100
{
  height:100%
}
.color-c666
{
  color:#666
}
.px-font-16
{
  font-size:16px !important
}
.px-margin-t30
{
  margin:30px 0 0 0
}
.color-c999
{
  color:#999
}
.px-font-12
{
  font-size:12px !important
}
.ib-middle
{
  display:inline-block;
  vertical-align: middle;
}
.m-bd
{
  position:relative
}
.px-margin-t20
{
  margin:20px 0 0 0
}

</style>
