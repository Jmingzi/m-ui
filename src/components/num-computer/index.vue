<template>
  <div class="num-compute cl text-center px-height-30 px-width-100 color-c999 input-db bg-fff">
    <div
      :class="`decrease fl px-font-20 ${Number(num) === Number(min) || !num ? 'bg-f2' : 'hover-bg'} px-width-30 height-100`"
      @click.stop="add(false)">
      <span>-</span>
    </div>
    <div
      :class="`plus fr px-font-20 ${Number(num) === Number(max) ? 'bg-f2' : 'hover-bg'} px-width-30 height-100`"
      @click.stop="add(true)">
      <span>+</span>
    </div>
    <div class="px-width-40 height-100 display-ib">
      <input
        type="tel"
        class="text-center width-100 height-100"
        ref="input"
        @click.stop=""
        @input="changeNum"
        @blur="checkNum"
        @focus="handleFocus"
        :value="num"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'alter-num',

  data() {
    return {
      num: this.value,
      timer: null
    }
  },

  watch: {
    value(num) {
      this.num = num
      this.$refs.input.value = num
    }
  },

  methods: {
    isEmpty(val) {
      return val === ''
    },

    isInputEvent(event) {
      if (event.constructor) {
        return /Event/.test(event.constructor.name)
      }
      return false
    },

    checkNum(e) {
      if (this.isEmpty(e.target.value)) {
        this.num = this.value
        this.changeNum(this.num)
      }
    },

    changeNum(e) {
      let val = this.isInputEvent(e) ? e.target.value : e
      if (this.isEmpty(val)) {
        this.num = ''
        this.timer && clearTimeout(this.timer)
      } else if (
        /^[1-9]\d*$/.test(val) &&
        val >= this.min &&
        val <= this.max
      ) {
        this.num = val
        this.$refs.input.value = this.num

        // clear
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.broadCast(this.num)
        }, this.inputWait)
      } else {
        if (val > this.max) {
          this.num = this.max
          this.$refs.input.value = this.max
          this.changeNum(this.max)
          this.$emit('invalid', val)
        } else {
          console.log(`val is not legal : ${val}, max: ${this.max}, min: ${this.min}`)
          this.$refs.input.value = this.num
          this.timer && clearTimeout(this.timer)
        }
      }
    },

    add(isAdd) {
      this.timer && clearTimeout(this.timer)
      if (isAdd && this.num < this.max) {
        this.num++
        this.broadCast(this.num)
      } else if (isAdd === false && this.num > this.min) {
        this.num--
        this.broadCast(this.num)
      }
    },

    broadCast(num) {
      // numChangeCallback
      // @param num {Number} 更新后的数量
      // @param val {Number} 更新前的数量
      this.$emit('input', num)
      this.$emit('on-change', num, this.value)
    },

    handleFocus() {
      this.$refs.input.scrollIntoView(true)
      // this.$refs.input.scrollIntoViewIfNeeded(true)
    }
  },

  props: {
    value: {
      type: [Number, String],
      default: 1
    },
    max: {
      type: [Number, String],
      default: 200
    },
    min: {
      type: [Number, String],
      default: 1
    },
    inputWait: {
      type: [Number, String],
      default: 500
    }
  }
}
</script>

<style lang="scss">
  .num-compute {
    border-radius: 2px;
    overflow: hidden;
    &.input-db {
      border-top: 1px #f2f2f2 solid;
      border-bottom: 1px #f2f2f2 solid;
    }
    input {
      border: none;
      margin: 0;
      padding: 0;
    }
    .decrease,
    .plus {
      line-height: 25px;
      border-left: 1px #f2f2f2 solid;
      border-right: 1px #f2f2f2 solid;
    }
  }
</style>
