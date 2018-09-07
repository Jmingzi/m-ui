<template>
  <div class="feed-back px-padding-t10">
    <textarea
      class="px-padding-10"
      :maxlength="query.maxlength || 500"
      :placeholder="placeholder"
      :value="content"
      @input="handleInput"
    />
    <div
      class="feed-btn"
      :style="{ backgroundColor: mainColor }"
      @click="onBtn"
    >
      {{ btnText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'feedback',

  data() {
    return {
      content: this.value
    }
  },

  props: {
    placeholder: {
      type: String,
      default: '请输入'
    },
    btnText: {
      type: String,
      default: '保存'
    },
    mainColor: {
      type: String,
      default: 'red'
    },
    value: String,
    title: String
  },

  computed: {
    query() {
      return this.$route.query
    }
  },

  watch: {
    value(val) {
      this.content = val
    }
  },

  created() {
    document.title = this.query.title || this.title
    if (this.query.value) {
      this.content = decodeURIComponent(this.query.value)
    }
  },

  methods: {
    onBtn() {
      if (this.query.sessionKey) {
        sessionStorage.setItem(this.query.sessionKey, this.content)
        history.back()
      } else {
        this.$emit('on-btn', this.content)
      }
    },

    handleInput(e) {
      this.content = e.target.value
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .feed-back {
    padding-bottom: 10px;
  }
  .feed-btn {
    margin: 40px 30px 0 30px;
    line-height: 50px;
    border-radius: 4px;
    color: #fff;
    text-align: center;
  }
  textarea {
    width: 100%;
    height: 150px;
    background-color: #fff;
    margin: 0;
    border: none;
    &:focus {
      outline: none;
    }
  }
.px-padding-t10
{
  padding:10px 0 0 0
}
.px-padding-10
{
  padding:10px
}

</style>
