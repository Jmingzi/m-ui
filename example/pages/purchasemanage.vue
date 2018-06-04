<template>
  <div class="height-100 overflow-h">
    <common-entry title="采购管理组件">
      <div class="position-r px-height-300">
        <purchase-manage
          :scope-info="scopeInfo"
          :get="get"
          @to-detail="toDetail"
          @to-pay="toPay"
          @to-purchase="toPurchase"
          @to-expense="toExpense"
        />
      </div>
      <div class="px-margin-t30">
        <pre>
          import { PurchaseManage } from 'xm-mui'
        </pre>
        <p>events</p>
        <pre>
          @to-detail
          @to-pay
          @to-purchase
          @to-expense
        </pre>
        <p>props</p>
        <pre class="px-font-12">
          props: {
            get: {
              type: Function,
              required: true
            },
            tabs: {
              type: Array,
              default() {
                return TabLabels
              }
            },
            initTab: {
              type: Number,
              default: 0
            },
            mainColor: {
              type: String,
              default: '#FF8100'
            },
            scopeInfo: {
              type: Object,
              required: true
            },
            listState: {
              type: Array,
              default() {
                return LIST_STATE
              }
            }
          }
        </pre>
      </div>
    </common-entry>
  </div>
</template>

<script>
import CommonEntry from './commonEntry'
import PurchaseManage from '../../src/components/purchase-manage'
import { get } from '../assets/http'

export default {
  name: 'purchasemanage',

  components: {
    PurchaseManage,
    CommonEntry
  },

  data() {
    return {
      scopeInfo: {
        subscription: true,
        buyer: true
      }
    }
  },

  methods: {
    get(url, params) {
      return get(url, params)
    },

    toDetail(item) {
      console.log(`去详情:`)
      console.log(item)
    },

    toPay() {
      console.log('去支付')
    },

    toPurchase(item) {
      console.log(`去采购:`)
      console.log(item)
    },

    toExpense(item) {
      console.log(`去报销:`)
      console.log(item)
    }
  }
}
</script>

<style lang="scss">
.common-entry,
.common-style {
  height: 100% !important;
  overflow: auto;
}

.px-height-300 {
  height: 300px;
}

.mg--10 {
  margin: -10px;
}
</style>
