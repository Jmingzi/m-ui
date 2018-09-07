<template>
  <div
    class="m-search__wrap px-height-50 px-line-50 px-padding-t10 px-font-14"
    @click="onClick"
  >
    <div
      class="m-search__input px-height-30 px-line-30 px-margin-lr15 color-c999"
      :class="{
        'px-padding-lr10': !isOpen && !$slots.default,
        'px-padding-r10': !isOpen && $slots.default
      }"
      :style="{
        backgroundColor: isOpen ? '' : bgColor,
        borderRadius: isOpen ? '' : `${radius}px`
      }"
    >
      <div
        v-if="isOpen"
        class="m-search__input-con position-r"
        @click.stop="focusInput"
      >
        <div
          v-if="hasBtn"
          class="fr m-search__btn px-width-50 text-center color-fff radius-2"
          :style="{
            backgroundColor: color
          }"
          @click="search"
        >
          搜索
        </div>
        <form
          :class="{
            'm-search__form': hasBtn
          }"
          action="javascript:"
        >
          <input
            ref="input"
            type="search"
            :placeholder="placeholder"
            :style="{
              backgroundColor: bgColor,
              borderRadius: isOpen ? `${radius}px` : ''
            }"
            @keyup.enter.prevent="search"
            v-model.trim="input"
          >
        </form>
        <i class="iconfont icon-sousuo position-a" />
        <i
          v-show="input"
          class="iconfont icon-tupian- position-a"
          :class="{
            'right-no-btn': !hasBtn
          }"
          @click.stop="clear"
        />
      </div>
      <template v-else>
        <slot />
        <i class="iconfont icon-sousuo" />
        <span>{{ placeholder }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',

  props: {
    isOpen: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'red'
    },
    bgColor: {
      type: String,
      default: '#f7f8f9'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    value: String,
    radius: {
      type: Number,
      default: 15
    },
    hasBtn: {
      type: Boolean,
      default: true
    },
    autoFocus: Boolean
  },

  data() {
    return {
      input: ''
    }
  },

  watch: {
    isOpen(val) {
      if (val && this.autoFocus) {
        this.$nextTick(this.focusInput)
      }
    },
    input(val) {
      this.$emit('on-search', val, true)
    }
  },

  created() {
    if (this.value) {
      this.input = this.value
    }
  },

  mounted() {
    if (this.autoFocus) {
      this.focusInput()
    }
  },

  methods: {
    onClick() {
      this.$emit('on-click')
    },

    focusInput() {
      this.$refs.input && this.$refs.input.focus()
    },

    search() {
      this.$emit('on-search', this.input)
    },

    clear() {
      this.input = ''
      this.$refs.input.value = ''
      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="scss">
  .m-search__wrap {
    .bg {
      background-color: #f7f8f9;
    }
    .radius {
      border-radius: 15px;
    }
  }
  .m-search__input-con {
    .m-search__form {
      margin-right: 70px;
    }
    input {
      width: 100%;
      border: none;
      margin: 0;
      padding: 0 30px;
    }
    .icon-sousuo {
      left: 10px;
      top: 0;
    }
    .icon-tupian- {
      right: 80px;
      top: 0;
      &.right-no-btn {
        right: 10px;
      }
    }
  }
  .m-search__btn {
    line-height: 25px;
    margin-top: 2.5px;
  }
  ::-webkit-search-cancel-button { display: none; }
.px-height-50
{
  height:50px
}
.px-line-50
{
  line-height:50px
}
.px-padding-t10
{
  padding:10px 0 0 0
}
.px-font-14
{
  font-size:14px !important
}
.px-height-30
{
  height:30px
}
.px-line-30
{
  line-height:30px
}
.px-margin-lr15
{
  margin:0 15px
}
.color-c999
{
  color:#999
}
.position-r
{
  position:relative
}
.fr
{
  float:right
}
.px-width-50
{
  width:50px
}
.text-center
{
  text-align:center
}
.color-fff
{
  color:#fff
}
.radius-2
{
  border-radius:2px
}
.position-a
{
  position:absolute
}

</style>
