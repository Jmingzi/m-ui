<template>
  <div
    class="m-search__wrap px-height-50 px-line-50 px-padding-t10 px-font-14"
    @click="onClick"
  >
    <div
      class="m-search__input px-height-30 px-line-30 px-margin-lr15 color-c999"
      :class="{
        radius: !isOpen,
        'px-padding-lr10': !isOpen
      }"
      :style="{
        backgroundColor: isOpen ? '' : this.bgColor
      }"
    >
      <div
        v-if="isOpen"
        class="m-search__input-con position-r"
        @click.stop="focusInput"
      >
        <div
          class="fr m-search__btn px-width-50 text-center color-fff radius-2"
          :style="{
            backgroundColor: this.color
          }"
          @click="search"
        >
          搜索
        </div>
        <form class="m-search__form" action="javascript:">
          <input
            ref="input"
            class="radius"
            type="search"
            :placeholder="placeholder"
            :style="{
              backgroundColor: this.bgColor
            }"
            @keyup.enter.prevent="search"
            v-model.trim="input"
          >
        </form>
        <i class="iconfont icon-sousuo position-a" />
        <i
          v-show="input"
          class="iconfont icon-tupian- position-a"
          @click.stop="clear"
        />
      </div>
      <template v-else>
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
    value: String
  },

  data() {
    return {
      input: ''
    }
  },

  created() {
    if (this.value) {
      this.input = this.value
    }
  },

  methods: {
    onClick() {
      this.$emit('on-click')
    },

    focusInput() {
      this.$refs.input.focus()
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
    }
  }
  .m-search__btn {
    line-height: 25px;
    margin-top: 2.5px;
  }
  ::-webkit-search-cancel-button { display: none; }
</style>
