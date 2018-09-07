<template>
  <m-popup
    :title="title"
    :no-title="noTitle"
    :confirm-text="confirmText"
    :content-height="contentHeight"
    :show-btn="confirmShow"
    :title-align="titleAlign"
    :visible="visible"
    :main-color="mainColor"
    @confirm="$emit('common-btn')"
    @toggle="$emit('toggle-show', false)"
  >
    <template slot="content">
      <p class="address__empty" v-if="!commonList || commonList.length === 0">{{ emptyText }}</p>
      <template v-else>
        <cell
          v-if="cancelText"
          :label="cancelText"
          :value="' '"
          :is-link="false"
          @on-click="onSelect()"
        />
        <cell
          v-for="item in commonList"
          class="position-r"
          :style="getColorMain(isCurrent(item))"
          :key="item.id"
          :is-link="false"
          :height="cellHeight"
          @on-click="onSelect(item)"
        >
          <template slot="label">
            <slot :row="item" />
          </template>
          <i
            v-if="hasLink && isCurrent(item)"
            class="iconfont icon-duigou px-font-14"
            :style="getColorMain(isCurrent(item))"
          />
          <i v-else />
        </cell>
      </template>
    </template>
  </m-popup>
</template>

<script>
// import { Cell, CellGroup, Icon } from 'vant'
import MPopup from '../popup'
import Cell from '../cell'

export default {
  name: 'address-select',

  components: {
    MPopup, Cell
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
    title: {
      type: String,
      default: '公共选择'
    },
    noTitle: {
      type: Boolean,
      default: false
    },
    contentHeight: {
      type: Number
    },
    titleAlign: {
      type: String,
      default: function () {
        return 'text-center'
      }
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    emptyText: {
      type: String,
      default: '暂无数据哦～'
    },
    confirmShow: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    commonList: {
      type: Array,
      default() {
        return []
      }
    },
    commonCurrent: {
      type: Object,
      default() {
        return null
      }
    },
    cancelText: String,
    hasLink: {
      type: Boolean,
      default: true
    },
    cellHeight: Number
  },

  methods: {
    getColorMain(predicate) {
      return predicate ? this.colorMain : null
    },

    isDef(val) {
      return val !== undefined && val !== null
    },

    isCurrent(item) {
      return this.commonCurrent && this.commonCurrent.id === item.id
    },

    onSelect(item) {
      this.$emit('toggle-show', false)
      if (item) {
        this.$emit('common-select', item)
      } else {
        this.$emit('cancel-select')
      }
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
.position-r
{
  position:relative
}
.px-font-14
{
  font-size:14px !important
}

</style>
