<template>
  <div class="travel-panel">
    <div class="travel-panel__item" @click="$emit('on-personal')">
      <div class="travel-panel__icon">
        <img :src="imgPer" width="100%" height="100%">
      </div>
      <span>因私出行</span>
    </div>
    <div class="travel-panel__item" @click="$emit('on-public')">
      <div class="travel-panel__icon">
        <img :src="imgPub" width="100%" height="100%">
      </div>
      <span>因公出行</span>
    </div>
    <div class="travel-panel__item" @click="$emit('on-list')">
      <div class="travel-panel__icon travel-panel__icon-last">
        <img :src="imgList" width="100%" height="100%">
        <div class="travel-panel__tag">去报销</div>
      </div>
      <span>我的行程</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'travel-panel',

  data() {
    return {
      // eslint-disable-next-line
      imgPer: require('../../assets/images/personal.png'),
      // eslint-disable-next-line
      imgPub: require('../../assets/images/public.png'),
      // eslint-disable-next-line
      imgList: require('../../assets/images/list.png')
    }
  }
}
</script>

<style lang="stylus">
  @import '../../style/base.styl'

  .travel-panel
    background-color #fff
    text-align center
    overflow hidden
    width 100%
    height px2vw(140)
    box-shadow 0 0 10px 0 rgba(0,0,0,0.10)
    border-radius 4px
    color #5C626B

  .travel-panel__item
    width 33.3333%
    float left
    height 100%

  .travel-panel__icon
    width 45px
    height 45px
    margin 33px auto 15px auto

    &.travel-panel__icon-last
      position relative

  .travel-panel__tag
    position absolute
    color #fff
    background-color #FFA400
    right px2vw(-30)
    top px2vw(-6)
    line-height 1
    border-radius 4px
    padding px2vw(3)
    transform scale(.7)
</style>
