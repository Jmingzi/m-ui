<template functional>
  <m-common-select
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot />
  </m-common-select>
</template>

<script>
import MCommonSelect from '../common-select'

export default {
  name: 'approve-select',

  components: {
    MCommonSelect
  },

  computed: {
    colorMain() {
      return { color: this.mainColor }
    }
  },

  props: {
    mainColor: {
      type: String,
      default: 'red'
    },
    visible: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String
    },
    confirmShow: {
      type: Boolean,
      default: false
    },
    approveList: {
      type: Array,
      default() {
        return []
      }
    },
    approveCurrent: {
      type: Object,
      default() {
        return null
      }
    }
  },

  methods: {
    getColorMain(predicate) {
      return predicate ? this.colorMain : null
    },

    isDef(val) {
      return val !== undefined && val !== null
    },

    addressIsCurrent(item) {
      return this.approveCurrent && this.approveCurrent.id === item.id
    },

    addressSelect(item) {
      this.$emit('approve-select', item)
      this.$emit('toggle-show', false)
    }
  }
}
</script>

<style lang="scss">
  .address__empty {
    text-align: center;
    padding-top: 80px;
    color: #9c9c9c;
  }
</style>
