<template>
  <div
    v-show="visible || show"
    class="m-mask__wrap position-f left-0 top-0 bottom-0 width-100"
    @click.stop="$emit('tap')"
    @touchmove.prevent=""
  >
    <div v-if="$slots.default" class="width-100 height-100">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'm-mask',

  data() {
    return {
      visible: false
    }
  },

  props: {
    show: {
      type: Boolean,
      default: function () {
        return false
      }
    }
  },

  watch: {
    visible(val) {
      this.showOverflow(val)
      return val
    },

    show(val) {
      this.showOverflow(val)
      return val
    }
  },

  created() {
    if (this.visible || this.show) {
      this.showOverflow(true)
    }
  },

  methods: {
    showOverflow(hide) {
      // document.documentElement.style.overflow = hide ? 'hidden' : ''
    }
  }
}
</script>

<style lang="scss">
  .m-mask__wrap {
    background-color: rgba(0,0,0,.59);
    z-index: 1001;
    transition: opacity .2s;
  }
.position-f
{
  position:fixed
}
.left-0
{
  left:0
}
.top-0
{
  top:0
}
.bottom-0
{
  bottom:0
}
.width-100
{
  width:100%
}
.height-100
{
  height:100%
}

</style>
