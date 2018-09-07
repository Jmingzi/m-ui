<template>
  <span
    class="m__tag"
    :style="{
      color: mainColor,
      borderColor: borderColor,
      backgroundColor: bgColor
    }"
    @click.stop="$emit('on-click')"
  >
    <slot />
  </span>
</template>

<script>
export default {
  name: 'tag',

  props: {
    mainColor: {
      type: String,
      default: 'red'
    },
    // eslint-disable-next-line
    bdColor: String,
    bgColor: {
      type: String,
      default: 'transparent'
    }
  },

  computed: {
    borderColor() {
      return this.bdColor || this.mainColor
    }
  }
}
</script>

<style lang="stylus">
  .m__tag
    display inline-block
    vertical-align middle
    line-height 1
    padding 2px 5px
    font-size 10px
    border transparent 1px solid
    border-radius 2px
</style>

<style lang="scss">
</style>

