<template>
  <div class="confirm-modules bg-f2">
    <m-message
      v-if="showSubscribeMessage"
      message="温馨提示：您所在企业尚未开通企业版京东采购，暂只支持个人消费，点击立即开通！"
      :ball="false"
      @on-close="closeNotSubMessage"
      @on-click="$emit('open-app', scopeInfo.appId)"
    />

    <slot />

    <p
      v-if="config === null"
      class="text-center color-c999 px-padding-tb50"
    >
      模块信息加载中
    </p>

    <template v-if="hasApproveModule">
      <cell
        :label="approveTitle"
        :loading="loading.approve"
        @on-click="getApprove"
      >
        <template class="ib-middle" v-if="approveCurrent">
          <span>{{ approveCurrent.title }}</span>
          <span class="color-c999" v-show="approveCurrent.reason">
            ({{ approveCurrent.reason }})
          </span>
        </template>
      </cell>
      <common-select
        :title="approveTitle"
        class="select-approve"
        :visible="showApprovePopup"
        :confirm-show="false"
        :cancel-text="`取消${approveTitle}`"
        :common-list="approveList || []"
        :common-current="approveCurrent"
        :main-color="mainColor"
        :has-link="false"
        @toggle-show="showApprovePopup = false"
        @common-select="item => $emit('select-approve', item)"
        @cancel-select="$emit('cancel-select-approve')"
      >
        <template slot-scope="scope">
          <p>
            <span class="fr m-bd px-padding-lr5 color-c666" @click.stop="openApproveDetail(scope.row)">查看详情</span>
            <span>{{ scope.row.title }}</span>
          </p>
          <p
            :class="{ 'color-c999': !approveCurrent || scope.row.id !== approveCurrent.id }"
          >
            {{ scope.row.reason }}
          </p>
        </template>
      </common-select>
    </template>

    <template v-if="hasPayWayModule">
      <cell
        label="支付方式"
        :value="payWay ? payWay.title : ''"
        @on-click="showPayWayPopup = true"
      />
      <common-select
        title="选择支付方式"
        :visible="showPayWayPopup"
        :confirm-show="false"
        :common-list="payWayList"
        :common-current="payWay"
        :main-color="mainColor"
        @toggle-show="showPayWayPopup = false"
        @common-select="item => $emit('select-pay-way', item)"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.title }}</p>
          <p
            :class="{ 'color-c999': !payWay || scope.row.id !== payWay.id }"
          >
            {{ scope.row.msg }}
          </p>
        </template>
      </common-select>
    </template>

    <template v-if="hasBillModule">
      <cell
        v-if="payWay && payWay.id === 3"
        label="开具发票"
        has-info
        :is-link="false"
        @on-click-info="onClickBillInfo"
      >
        <m-switch
          :value="isOpenBill"
          :main-color="mainColor"
          @change="val => $emit('change-open-bill', val)"
        />
      </cell>
      <template v-if="isOpenBill">
        <cell
          v-if="showBillMethodCell"
          label="开票方式"
          :value="billMethodCurrent ? billMethodCurrent.title : ''"
          @on-click="showBillMethodPopup = true"
        />
        <cell
          label="发票类型"
          :value="billTypeCurrent ? billTypeCurrent.title : ''"
          @on-click="showBillTypePopup = true"
        />
        <cell
          label="发票信息"
          :value="billCurrent ? billCurrent.orgName : ''"
          @on-click="toSelectBill"
        />
      </template>

      <!--开票方式-->
      <common-select
        title="开票方式"
        :visible="showBillMethodPopup"
        :confirm-show="false"
        :common-list="BILL_METHOD"
        :common-current="billMethodCurrent"
        :main-color="mainColor"
        @toggle-show="showBillMethodPopup = false"
        @common-select="item => $emit('select-bill-method', item)"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.title }}</p>
        </template>
      </common-select>
      <!--发票类型-->
      <common-select
        title="发票类型"
        :visible="showBillTypePopup"
        :confirm-show="false"
        :common-list="BILL_TYPE_LIST"
        :common-current="billTypeCurrent"
        :main-color="mainColor"
        @toggle-show="showBillTypePopup = false"
        @common-select="item => $emit('select-bill-type', item)"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.title }}</p>
        </template>
      </common-select>
      <!--发票信息-->
      <common-select
        title="发票信息"
        :visible="showBillPopup"
        :confirm-show="true"
        confirm-text="管理发票信息"
        :common-list="billList || []"
        :common-current="billCurrent"
        :main-color="mainColor"
        @toggle-show="showBillPopup = false"
        @common-select="item => $emit('select-bill', item)"
        @common-btn="$emit('open-bill-app', 8687222)"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.orgName }}</p>
        </template>
      </common-select>
    </template>

    <template v-if="hasWelfareModule">
      <cell
        label="福利积分"
        label-desc="每100积分可抵扣1.00元"
        has-info
        :is-link="false"
        @on-click-info="onClickWelfareInfo"
      >
        <m-switch
          :value="isOpenWelfare"
          :main-color="mainColor"
          @change="val => $emit('change-open-welfare', val)"
        />
      </cell>
      <cell
        v-if="isOpenWelfare"
        :is-link="false"
        label="使用数量"
        @on-click="noon"
      >
        <input
          type="tel"
          ref="welfareInput"
          class="text-right"
          :placeholder="welfare ? `剩余可用${welfare.restAmount}积分` : '加载中'"
          :value="welfareUseNum"
          @input="handleInputWelfare"
        >
      </cell>
    </template>

    <div v-if="hasMoneySum" class="px-padding-10 bg-fff px-margin-t10">
      <p class="px-font-16">
        <span class="font-bold color-c000">订单总金额：</span>
        <span class="color-red fr">¥ {{ totalMoney | formatPrice }}</span>
      </p>
      <p>
        <span>商品金额</span>
        <span class="color-c999 fr">¥ {{ skuMoney | formatPrice }}</span>
      </p>
      <p>
        <span class="ib-middle">运费</span>
        <i
          class="iconfont icon-shuoming ib-middle color-info"
          @click="freightDesc"
        />
        <span class="color-c999 fr">+ ¥ {{ freightMoney | formatPrice }}</span>
      </p>
      <p v-if="hasWelfareModule && isOpenWelfare && welfareUseNum">
        <span class="ib-middle">积分抵扣</span>
        <span class="color-c999 fr">- ¥ {{ welfareUseNum | formatPrice }}({{ welfareUseNum }}积分)</span>
      </p>
    </div>
  </div>
</template>

<script>
import MSwitch from '../switch'
import CommonSelect from '../common-select'
import MMessage from '../message'
import Cell from '../cell'
import utils from '../../utils/utils'
import { BILL_METHOD, BILL_TYPE_LIST, PAY_WAY } from './constant'
import { get, post } from './http'
const baseUrl = `//app.e.uban360.${utils.online ? 'com' : 'net'}`

export default {
  name: 'confirm-modules',

  components: {
    MSwitch,
    CommonSelect,
    Cell,
    MMessage
  },

  filters: {
    formatPrice(num) {
      return utils.formatMoney(num)
    }
  },

  props: {
    bizType: {
      type: [Number, String],
      required: true
    },
    mainColor: {
      type: String,
      default: 'red'
    },

    approveCurrent: Object,
    isOpenBill: Boolean,
    billMethodCurrent: Object,
    billTypeCurrent: Object,
    billCurrent: Object,
    payWay: Object,
    isOpenWelfare: Boolean,
    isShowApproveCell: Boolean,
    skuMoney: Number,
    freightMoney: Number,
    totalMoney: Number,
    welfareMaxUseNum: Number,
    approveTitle: String
  },

  data() {
    return {
      urlScope: `${baseUrl}/purchase/order/checkScopeDetail`,
      urlConfig: `${baseUrl}/gateway/buycenter/module/getModuleList`,
      urlApprove: `${baseUrl}/gateway/buycenter/approve/getList`,
      urlBill: `${baseUrl}/gateway/buycenter/invoice/getList`,
      urlWelfare: `${baseUrl}/welfare/mall/user/account`,

      config: null,
      approveList: null,
      billList: null,
      welfare: null,
      payWayList: [],

      // 积分使用数量
      welfareUseNum: '',
      scopeInfo: {},

      loading: {
        approve: false,
        bill: false,
        welfare: false
      },

      showWelfareCell: true,
      showPayWayPopup: false,
      showApprovePopup: false,
      showBillMethodPopup: false,
      showBillTypePopup: false,
      showBillPopup: false,
      showBillMethodCell: false,

      BILL_METHOD,
      BILL_TYPE_LIST
    }
  },

  computed: {
    hasPayWayModule() {
      return this.config ? this.config.indexOf(8) > -1 : false
    },

    hasApproveModule() {
      return this.config
        ? this.config.indexOf(4) > -1 && this.isShowApproveCell
        : false
    },

    hasBillModule() {
      return this.config ? this.config.indexOf(10) > -1 : false
    },

    hasWelfareModule() {
      return this.config
        ? this.config.indexOf(11) > -1 && this.showWelfareCell
        : false
    },

    hasMoneySum() {
      return this.config ? this.config.indexOf(15) > -1 : false
    },

    showSubscribeMessage() {
      const { subscription } = this.scopeInfo
      if (subscription === undefined) {
        return false
      }
      if (sessionStorage.getItem('not-subscribe-message')) {
        return false
      }
      return !subscription
    }
  },

  watch: {
    isOpenWelfare(val) {
      if (val) {
        this.getWelfare()
      } else {
        this.welfare = null
      }
    },

    payWay: {
      deep: true,
      handler() {
        this.initBill(false)
        this.initWelfare()
      }
    },

    'loading.approve': function(val) {
      if (!val) {
        this.showApprovePopup = true
      }
    },

    welfareUseNum(num) {
      // 通知业务num变化
      this.$emit('welfare-num-change', num)
    },

    approveCurrent(val) {
      if (val === null && !this.payWayList.find(x => x.id === 3)) {
        this.payWayList.push(PAY_WAY[2])
      }
    }
  },

  created() {
    // 模块配置
    this.getConfig().then(() => {
      if (this.hasPayWayModule) {
        this.initPay()
      }
      if (this.hasBillModule) {
        this.initBill()
      }
      if (this.hasWelfareModule) {
        this.initWelfare()
      }
    })
  },

  methods: {
    getConfig() {
      return get(this.urlConfig, { bizType: this.bizType })
        .then(res => {
          this.config = res
          return res
        })
        .catch(error => this.$emit('error-callback', error))
    },

    getScopeInfo() {
      return post(this.urlScope, { bizType: this.bizType })
        .then(res => {
          this.scopeInfo = res
          // this.scopeInfo = {
          //   balance: false,
          //   subscription: false,
          //   buyer: true
          // }
          this.$emit('load-scope-detail', res)
          return this.scopeInfo
        })
        .catch(error => this.$emit('error-callback', error))
    },

    getApprove() {
      this.loading.approve = true
      get(this.urlApprove, { bizType: this.bizType })
        .then(res => {
          this.approveList = res.map(x => ({ ...x, id: x.approveId }))
          this.loading.approve = false
        })
        .catch(error => this.$emit('error-callback', error))
    },

    getBillList() {
      this.loading.bill = true
      get(this.urlBill)
        .then(res => {
          this.billList = res.map(x => ({ ...x, id: x.titleId }))
          this.loading.bill = false
          if (!this.billCurrent) {
            this.$emit('select-bill', this.billList[0])
          }
        })
        .catch(error => this.$emit('error-callback', error))
    },

    getWelfare() {
      this.loading.welfare = true
      get(this.urlWelfare)
        .then(res => {
          let data = { ...res }
          if (data.restAmount < 0) {
            // this.$box.alert('剩余可用积分数量为0').then(() => {
            //   this.$emit('change-open-welfare', false)
            // })
            data.restAmount = 0
            data.originRestAmount = res.restAmount
          }
          this.welfare = data
          this.loading.welfare = false
        })
        .catch(error => this.$emit('error-callback', error))
    },

    initPay() {
      // 账户信息
      this.getScopeInfo().then(res => {
        const { balance, buyer, subscription } = res
        // const buyer = false
        // const balance = false
        // const subscription = true

        let payWayList = []

        if (!subscription || !buyer) {
          payWayList = [PAY_WAY[2]]
        } else if (!balance) {
          if (this.approveCurrent) {
            payWayList = [PAY_WAY[1]]
          } else {
            payWayList = PAY_WAY.slice(1, 3)
          }
        } else {
          payWayList = PAY_WAY.slice()
        }

        // 如果关联了审批单，没有个人支付
        if (this.approveCurrent) {
          payWayList = payWayList.filter(x => x.id !== 3)
        }

        if (
          !this.payWay ||
          payWayList.every(x => x.id !== this.payWay.id)
        ) {
          this.$emit('select-pay-way', payWayList[0])
        }
        this.payWayList = payWayList
      })
    },

    initBill(isNeedRequest = true) {
      // 根据支付方式来控制发票模块的显示与隐藏
      if (this.payWay) {
        const { id } = this.payWay
        if (id === 1 || id === 3) {
          this.showBillMethodCell = false
        } else {
          this.showBillMethodCell = true
        }
        this.$emit('change-open-bill', id !== 3)
      }

      if (isNeedRequest) {
        this.getBillList()
      }
      // 初始化开票方式等
      if (!this.billMethodCurrent) {
        this.$emit('select-bill-method', BILL_METHOD[0])
      }
      if (!this.billTypeCurrent) {
        this.$emit('select-bill-type', BILL_TYPE_LIST[0])
      }
    },

    initWelfare() {
      // 根据支付方式来控制积分模块的显示与隐藏
      if (this.payWay) {
        const { id } = this.payWay
        if (id === 1 || id === 2) {
          this.toggleWelfareCell(false)
        } else {
          this.toggleWelfareCell(true)
        }

        if (this.isOpenWelfare && id === 3) {
          this.$nextTick(this.getWelfare)
        }
      }
    },

    // 暴露给外部重置调用
    reInitWelfare() {
      this.welfareUseNum = ''
      this.$refs.welfareInput.value = ''
      this.getWelfare()
    },

    toSelectBill() {
      this.showBillPopup = true
      this.getBillList()
    },

    onClickBillInfo() {
      const h = this.$createElement
      this.$box({
        title: '发票说明',
        msg: h('div', { class: 'px-padding-lr10' }, [
          h('p', { class: 'text-left' }, '1.用户下单时没有选择开具发票，后续将不再提供发票'),
          h('p', { class: 'text-left' }, '2.请确保您选择的发票抬头信息有效，如因抬头信息错误导致开出的发票无效或者开不出发票将由用户自行承担后果'),
          h('p', { class: 'text-left px-padding-b20' }, '3.发票将在用户收到货后的7-15天寄出')
        ]),
        noCancel: true,
        okTxt: '我知道了'
      })
    },

    onClickWelfareInfo() {
      this.$box.alert('积分抵扣金额将不开具发票')
    },

    freightDesc() {
      const p = this.$createElement('p', {class: 'px-padding-b10 px-margin-lr10 text-left'},
        '运费将根据订单金额以及地区由京东自动计算生成，订单金额达到一定数额时将降低或免运费' +
        '（免运费订单金额110元左右，以页面实际展示为准）'
      )
      this.$box({
        title: '运费说明',
        msg: p,
        noCancel: true,
        okTxt: '我知道了'
      })
    },

    closeNotSubMessage() {
      sessionStorage.setItem('not-subscribe-message', 1)
    },

    getModulesData() {
      return {
        payWay: this.payWay,
        isOpenBill: this.isOpenBill,
        billMethod: this.billMethodCurrent,
        billType: this.billTypeCurrent,
        bill: this.billCurrent,
        billList: this.billList,
        approve: this.approveCurrent,
        isUseWelfare: this.isOpenWelfare,
        welfareNum: this.welfareUseNum ? Number(this.welfareUseNum) : 0,
        welfare: this.welfare
      }
    },

    handleInputWelfare(e) {
      const val = e.target.value
      const input = this.$refs.welfareInput
      const maxNum = this.welfareMaxUseNum
        ? Math.min(this.welfareMaxUseNum, this.welfare.restAmount)
        : this.welfare.restAmount

      if (val === '') {
        this.welfareUseNum = ''
      } else if (!/^\d+$/.test(val)) {
        // 不合法的数字
        input.value = this.welfareUseNum
      } else if (Number(val) > maxNum) {
        // 大于最大值
        input.value = maxNum
        this.welfareUseNum = maxNum
      } else {
        this.welfareUseNum = Number(val)
        input.value = this.welfareUseNum
      }
    },

    toggleWelfareCell(show) {
      this.showWelfareCell = show
      if (!show) {
        this.welfareUseNum = ''
        this.$emit('change-open-welfare', false)
      } else {
        this.$emit('change-open-welfare', true)
      }
    },

    openApproveDetail(item) {
      console.log(`${window.AppInfo.data.approveUrl}#/detail/${item.id}`)
      window.JSBridge.native('openurl', {
        url: `${window.AppInfo.data.approveUrl}#/detail/${item.id}`,
        noDefaultMenu: 1,
        cookie: 1
      })
    },

    noon() {

    }
  }
}
</script>

<style lang="scss">
  .confirm-modules {
    .confirm-modules__item {
      line-height: 45px;
      padding: 0 10px;
    }
    input {
      border: none;
      margin: 0;
      padding: 0;
    }
    .color-red {
      color: red;
    }
  }
</style>
