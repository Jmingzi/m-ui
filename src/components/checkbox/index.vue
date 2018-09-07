<template>
  <div class="m-checkbox" @click.stop="onClick">
    <div
      class="m-checkbox__check ib-middle"
      :class="{
        'bg-f2': disabled
      }"
      :style="boxSizeStyle"
    >
      <i
        class="iconfont"
        :class="{
          [checkIconLocal]: !value,
          [checkedIconLocal]: value,
          'color-c999': !value
        }"
        :style="{
          fontSize: `${this.size}px`
        }"
      />
    </div>
    <span class="ib-middle" v-show="label">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: 'checkbox',

  data() {
    return {
      checkIconLocal: '',
      checkedIconLocal: ''
    }
  },

  props: {
    value: Boolean,
    label: String,
    mainColor: {
      type: String,
      default: 'red'
    },
    size: {
      type: Number,
      default: 16
    },
    checkIcon: {
      type: String,
      default: 'icon-duoxuankexuan'
    },
    checkedIcon: {
      type: String,
      default: 'icon-duoxuanxuanzhong'
    },
    checkType: {
      type: [Number, String],
      default: 1 // 复选框 // 2 单选框
    },
    disabled: Boolean,
    radius: {
      type: String,
      default: '2'
    }
  },

  computed: {
    boxSizeStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        borderRadius: `${this.radius === 'circle' ? this.size / 2 : this.radius}px`,
        color: this.value ? this.mainColor : '',
        borderColor: this.value ? this.mainColor : '',
        border: this.checkIcon ? 'none' : '1px solid #dedede'
      }
    }
  },

  watch: {
    checkType() {
      this.setIcon()
    }
  },

  created() {
    this.setIcon()
  },

  methods: {
    setIcon() {
      if (this.checkType === 1) {
        this.checkIconLocal = this.checkIcon
        this.checkedIconLocal = this.checkedIcon
      } else {
        this.checkIconLocal = 'icon-quanxuan'
        this.checkedIconLocal = 'icon-quanxuanxuanzhong'
      }
    },

    onClick() {
      this.$emit('input', !this.value)
      this.$emit('change', !this.value)
    }
  }
}
</script>

<style lang="scss">
  .m-checkbox__check {
    line-height: 1;
  }
.ib-middle
{
  display:inline-block;
  vertical-align: middle;
}

</style>
