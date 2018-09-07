<template>
  <m-popup
    title="选择审批单"
    :confirm-text="confirmText"
    :show-btn="confirmShow"
    :visible="visible"
    @confirm="$emit('approve-btn')"
    @toggle="$emit('toggle-show', false)"
  >
    <template slot="content">
      <p class="address__empty" v-if="!approveList || approveList.length === 0">审批单为空哦～</p>
      <cell-group v-else>
        <cell
          v-for="item in approveList"
          class="address-list__item"
          @click="addressSelect(item)"
          :style="getColorMain(addressIsCurrent(item))"
          :key="item.id"
        >
          <template slot="title">
            <p>{{ item.approveReason }}</p>
            <p
              :style="getColorMain(addressIsCurrent(item))"
              class="color-c999"
            >
              {{ item.approveId }}
            </p>
          </template>
          <icon
            v-show="addressIsCurrent(item)"
            slot="right-icon"
            name="success"
            class="van-cell__right-icon"
            :style="getColorMain(addressIsCurrent(item))"
          />
        </cell>
      </cell-group>
    </template>
  </m-popup>
</template>

<script>
import { Cell, CellGroup, Icon } from 'vant'
import MPopup from '../popup'

export default {
  name: 'approve-select',

  components: {
    MPopup, Cell, CellGroup, Icon
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
.color-c999
{
  color:#999
}

</style>
