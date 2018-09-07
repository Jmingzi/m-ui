<template>
  <div class="m-input__wrap">
    <input
      :type="inputType"
      :placeholder="placeholder"
      :value="value"
      ref="input"
      @input="handleInput"
    >
  </div>
</template>

<script>
export default {
  name: 'm-input',

  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    fixed: {
      type: [String, Number],
      default: 0
    },
    placeholder: String,
    max: {
      type: Number,
      default: Number.MAX_VALUE
    },
    min: {
      type: Number,
      default: Number.MIN_VALUE
    }
  },

  computed: {
    isNumber() {
      return this.type === 'number'
    },

    isInt() {
      return this.fixed === 0 && this.isNumber
    },

    inputType() {
      if (this.isInt) {
        return 'tel'
      } else if (this.isNumber) {
        return 'number'
      }
      return 'text'
    }
  },

  methods: {
    handleInput(e) {
      // this.$emit('input', val)
      const val = e.target.value.trim()
      const input = this.$refs.input
      const maxNum = (this.welfareMaxUseNum
        ? Math.min(this.welfareMaxUseNum, this.welfare.restAmount)
        : this.welfare.restAmount) / 100

      if (val === '') {
        this.welfareUseNum = ''
      } else if (!/^\d+(\.{0,1}\d{0,2})$/.test(val)) {
        // 不合法的数字
        input.value = this.welfareUseNum
      } else if (/^\d+\.$/.test(val)) {
        // 小数点结尾，认为未输入完成
        // input.value = this.welfareUseNum
      } else if (Number(val) > maxNum) {
        // 大于最大值
        input.value = maxNum
        this.welfareUseNum = maxNum
      } else {
        this.welfareUseNum = val
        input.value = this.welfareUseNum
      }
    }
  }
}
</script>

<style lang="stylus">
  .m-input__wrap
    input
      -webkit-appearance none
      border 1px #dcdcdc solid
      border-radius 2px
      padding 0 10px
</style>

<style lang="scss">
</style>
