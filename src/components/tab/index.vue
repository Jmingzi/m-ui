<template>
  <div class="tab font-0 position-r bg-fff">
    <div
      v-for="(item, i) in tabs"
      :class="`tab__item px-font-14 ib-middle px-line-40 text-center ${itemCls} ${currTab === i ? 'active' : ''}`"
      :style="[tabItemWidth, currTab === i ? fontColor : '']"
      :key="i"
      @click="clickTab(item, i)">
      {{ item }}
    </div>
    <div
      v-if="!noTabLine"
      class="position-a bottom-0 tab__line text-center"
      :style="tabLineStyle">
      <div class="tab__line-color display-ib" :style="[bgColor, tabColorWidth]" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currTab: this.activeTab
    }
  },

  watch: {
    activeTab(val) {
      this.currTab = val
      return val
    }
  },

  computed: {
    tabItemWidth() {
      return { width: `${(100 / this.tabs.length).toFixed(3)}%` }
    },
    tabLineStyle() {
      return {
        ...this.tabItemWidth,
        left: `${this.currTab * (100 / this.tabs.length)}%`
      }
    },
    tabColorWidth() {
      return { width: `${this.tabLineWidth}px` }
    },
    fontColor() {
      return { color: this.color }
    },
    bgColor() {
      return { backgroundColor: this.color }
    }
  },

  methods: {
    clickTab(item, i) {
      if (!this.disableTab.includes(i)) {
        this.currTab = i
      }
      this.$emit('callback', i)
    }
  },

  props: {
    tabs: {
      type: Array,
      default: function () {
        return []
      }
    },
    itemCls: {
      type: String,
      default: ''
    },
    activeTab: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#fa565a'
    },
    tabLineWidth: {
      type: Number,
      default: 60
    },
    noTabLine: {
      type: Boolean,
      default: false
    },
    disableTab: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
  .tab__line {
    transition: left .2s;
  }
  .tab__line-color {
    width: 60px;
    height: 2px;
  }
</style>
