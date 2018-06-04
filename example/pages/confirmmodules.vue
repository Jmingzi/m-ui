<template>
  <common-entry title="确认订单模块">
    <div class="mg--10">
      <m-confirm-order
        ref="modules"
        biz-type="22"
        approve-title="关联采购单"
        :approve-current="selectApprove"
        :bill-method-current="billMethod"
        :bill-type-current="billType"
        :bill-current="bill"
        :is-open-bill="isOpenBill"
        :is-open-welfare="isOpenWelfare"
        :pay-way="payWay"
        :sku-money="100"
        :freight-money="33"
        :total-money="4999"
        :is-show-approve-cell="true"
        :welfare-max-use-num="20"
        @select-approve="item => selectApprove = item"
        @cancel-select-approve="selectApprove = null"
        @change-open-bill="val => isOpenBill = val"
        @change-open-welfare="val => isOpenWelfare = val"
        @select-bill-method="item => billMethod = item"
        @select-bill-type="item => billType = item"
        @select-bill="item => bill = item"
        @select-pay-way="item => payWay = item"
      />
    </div>

    <p class="px-margin-20">
      <a href="javascript:" @click="getModulesData">获取data</a>
    </p>
  </common-entry>
</template>

<script>
import CommonEntry from './commonEntry'
import MConfirmOrder from '../../src/components/confirm-modules/index'
// import { get, post } from '../assets/http'

export default {
  name: 'cell',

  components: {
    CommonEntry,
    MConfirmOrder
  },

  data() {
    return {
      selectApprove: null,
      isOpenBill: false,
      billMethod: null,
      billType: null,
      bill: null,
      isOpenWelfare: false,
      payWay: null
    }
  },

  methods: {
    getModulesData() {
      console.log(this.$refs.modules.getModulesData())
    }
  }
}
</script>

<style scoped>

</style>
