<template>
  <div
    class="radio ib-middle"
    :class="{
      checked: value
    }"
    :style="bgMain"
    @click="onClick"
  >
    <div class="state text-center">
      <img
        :src="require('../../assets/loading.gif')"
        width="20px"
        v-show="loading"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'm-switch',

  props: {
    value: Boolean,
    loading: Boolean,
    mainColor: {
      type: String,
      default: 'red'
    }
  },

  computed: {
    bgMain() {
      return { backgroundColor: this.value ? this.mainColor : '' }
    }
  },

  watch: {
    // loading(val) {
    //   if (!val) {
    //     this.onClick()
    //   }
    // }
  },

  methods: {
    onClick() {
      // const value = this.loading ? false : !this.value
      this.$emit('input', !this.value)
      this.$emit('change', !this.value)
    }
  }
}
</script>

<style lang="scss">
  .radio {
    width: 46px;
    height: 28px;
    border-radius: 40px;
    background: #aaa;
    transition: all .5s ease;
    // margin-top: 8.5px;
    &.checked {
      .state {
        float: right;
        margin-left: 0;
        margin-right: 1px;
      }
    }
    .state {
      width: 26px;
      height: 26px;
      line-height: 26px;
      border-radius: 26px;
      margin-left: 1px;
      background: #FFFFFF;
      margin-top: 0.5px;
      box-shadow: 0 3px 1px 0 rgba(0,0,0,0.05), 0 2px 2px 0 rgba(0,0,0,0.10), 0 3px 3px 0 rgba(0,0,0,0.05);
    }
  }
.ib-middle
{
  display:inline-block;
  vertical-align: middle;
}
.text-center
{
  text-align:center
}

</style>
