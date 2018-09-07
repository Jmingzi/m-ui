<template>
  <div
    class="bottom-tab__item ib-middle height-100 px-font-10"
    :style="{ width: `${(100 / $parent.tabLen)}%`, color: active ? $parent.mainColor : '' }"
    @click="onClick"
  >
    <div class="display-ib text-center px-height-30">
      <i class="position-r iconfont px-font-24" :class="active ? currIcon : icon" >
        <span
          v-if="num"
          class="badge"
          :style="{ backgroundColor: $parent.mainColor }"
        >
          {{ num }}
        </span>
      </i>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'bottom-tab-item',

  props: {
    currIcon: String,
    icon: String,
    num: [String, Number],
    path: String
  },

  data() {
    return {
      active: false
    }
  },

  beforeCreate() {
    this.$parent.tabs.push(this)
  },

  destroyed() {
    this.$parent.tabs.splice(this.$parent.tabs.indexOf(this), 1)
  },

  methods: {
    onClick(event) {
      this.$parent.onChange(this.$parent.tabs.indexOf(this))
      this.$emit('click', event)

      if (this.path) {
        this.$router.push(this.path)
      }
    }
  }
}
</script>

<style lang="scss">
  .badge {
    color: #fff;
    left: 50%;
    // top: -.5em;
    top: .2em;
    font-size: .5em;
    margin-left: .8em;
    padding: 0 .3em;
    text-align: center;
    min-width: 1.2em;
    line-height: 1.2;
    position: absolute;
    border-radius: .6em;
    box-sizing: border-box;
    // background-color: #f44;
    font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
  }
.ib-middle
{
  display:inline-block;
  vertical-align: middle;
}
.height-100
{
  height:100%
}
.px-font-10
{
  font-size:10px !important
}
.display-ib
{
  display:inline-block !important
}
.text-center
{
  text-align:center
}
.px-height-30
{
  height:30px
}
.position-r
{
  position:relative
}
.px-font-24
{
  font-size:24px !important
}

</style>
