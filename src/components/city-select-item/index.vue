<template>
  <div class="city-select-item">
    <div class="px-height-40 px-line-40 m-bd-b bg-fff">
      <span
        class="rem-width-70 over-text ib-middle text-center"
        v-for="(item, i) in selectedRes"
        :key="`${currLevel}-${item.code}`"
        @click="handleSelectTab(item, i)"
      >
        {{ item.name }}
      </span>
      <span
        v-show="!isLastLevel"
        class="wait-select ib-middle px-width-60 text-center px-margin-lr5"
        :style="{
          borderColor: this.mainColor
        }"
      >
        请选择
      </span>
    </div>
    <div
      v-show="!isLastLevel"
      ref="wrapper"
      class="position-a px-top-40 bottom-0 overflow-a touch-scroll width-100"
    >
      <p
        class="color-c999 text-center px-padding-t30"
        v-if="currentLevelList === null"
      >
        加载中...
      </p>
      <p
        v-for="(item, index) in currentLevelList"
        class="px-line-40 px-padding-lr10 hover-bg"
        @click="handleSelect(item, index)"
        :key="index"
        v-else
      >
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'city-select-item',

  data() {
    return {
      selectedIndex: [],
      selectedRes: []
    }
  },

  props: {
    mainColor: {
      type: String,
      default: 'red'
    },
    maxLevel: {
      type: Number,
      default: 3
    },
    currentLevelList: [Array, null]
  },

  computed: {
    currLevel() {
      return this.selectedIndex.length
    },

    isLastLevel() {
      return this.currLevel === this.maxLevel
    }
  },

  watch: {
    currentLevelList(val) {
      if (val && val.length === 0) {
        // 说明加载完成
        this.doSelect()
      }
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      this.cityChange(null, 0, 0)
    },

    doSelect() {
      this.$emit('on-select', this.selectedRes, this.selectedIndex)
    },

    handleSelect(item, index) {
      if (this.currLevel === this.maxLevel) {
        console.log(`level is max now: ${this.maxLevel}`)
      } else if (this.currLevel < this.maxLevel) {
        this.$refs['wrapper'].scrollTop = 0
        this.selectedIndex.push(index)
        this.selectedRes.push({ ...item, index })

        if (this.isLastLevel) {
          this.doSelect()
        } else {
          this.cityChange(item, index, this.currLevel)
        }
      }
    },

    handleSelectTab(item, level) {
      this.selectedRes = this.selectedRes.slice(0, level)
      this.selectedIndex = this.selectedIndex.slice(0, level)

      if (level === 0) {
        this.init()
      } else {
        const lastIndex = this.selectedRes.length - 1
        this.cityChange(this.selectedRes[lastIndex], this.selectedIndex[lastIndex], level)
      }
    },

    cityChange(currentItem, currentIndex, currentLevel) {
      this.$emit(
        'on-city-change',
        currentItem,
        currentIndex,
        currentLevel
      )
    },

    reset() {
      this.selectedIndex = []
      this.selectedRes = []
    }
  }
}
</script>

<style lang="scss">
  .wait-select {
    line-height: 37px;
    border-bottom: 2px transparent solid;
    transition: all .3s linear;
    color: #666666;
    z-index: 2;
  }
</style>
