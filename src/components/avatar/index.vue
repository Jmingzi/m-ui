<template>
  <div
    class="m-avatar overflow-h position-r"
    :class="{
      [sizeCls]: true,
      'ib-middle': !isBlock
    }"
    :style="{
      borderRadius: `${radius}px`
    }"
  >
    <div
      class="width-100 height-100 color-fff text-center px-font-16"
      :style="errorBg"
    >
      {{ substrName(user.name, 2) }}
    </div>
    <div class="width-100 height-100 top-0 position-a overflow-h" :style="imgBgUrl" />
  </div>
</template>

<script>
const ERROR_AVATAR_BG_COLOR = ['#f17474', '#7ac47a', '#efbc6b', '#75a4d7', '#45b2e3']

export default {
  name: 'avatar',
  props: {
    size: {
      type: String,
      default: 's60'
    },
    user: {
      type: Object,
      default() {
        return {}
      }
    },
    avatarUrl: {
      type: String,
      required: true
    },
    isBlock: Boolean,
    radius: {
      type: Number,
      default: 6
    }
  },
  computed: {
    errorBg () {
      return { backgroundColor: this.errorColor }
    },
    imgBgUrl () {
      return {
        background: `url(${this.imgUrl(this.user.uid)}) center/cover no-repeat`,
        borderRadius: `${this.radius}px`
      }
    },
    sizeCls() {
      if (this.size === 's60') {
        return 'px-width-60 px-height-60 px-line-60'
      } else if (this.size === 's36') {
        return 's36'
      }
    },
    errorColor() {
      return this.getBgColor(this.user.uid)
    }
  },
  methods: {
    substrName(name, len = 2) {
      if (!name) return ''

      if (name.length > len) {
        return name.substring(name.length - len)
      } else return name
    },
    imgUrl(uid) {
      return this.avatarUrl + uid
    },
    getBgColor (uid) {
      return ERROR_AVATAR_BG_COLOR[Number(uid) % 5]
    }
  }
}
</script>

<style lang="scss">
  .m-avatar {
    &.s36 {
      width: 36px;
      height: 36px;
      line-height: 36px;
    }
  }
.px-width-60{
  width: 60px;
}
.px-height-60{
  height: 60ox;
}
.px-line-60 {
  line-height: 60px;
}
.overflow-h
{
  overflow:hidden !important
}
.position-r
{
  position:relative
}
.width-100
{
  width:100%
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
.px-font-16
{
  font-size:16px !important
}
.top-0
{
  top:0
}
.position-a
{
  position:absolute
}

</style>
