<template>
  <div class="confirm-modules bg-f2">
    <m-message
      v-if="false && showSubscribeMessage && isPurchase"
      :message="`温馨提示：您所在企业尚未开通企业版${app.name}，暂只支持个人消费，点击立即开通！`"
      :ball="false"
      @on-close="closeNotSubMessage"
      @on-click="$emit('open-app', scopeInfo.appId)"
    />

    <slot />

    <p
      v-if="config === null"
      class="text-center color-c999 px-padding-tb50"
    >
      支付信息加载中...
    </p>

    <cell
      v-if="hasTravelTypeModule"
      label="消费方式"
      :value="travelType === 0 ? '因公消费' : '因私消费'"
      :is-link="false"
    />

    <template v-if="hasApproveModule">
      <cell
        :label="approveTitle"
        :loading="loading.approve"
        @on-click="getApprove"
      >
        <template class="ib-middle" v-if="approveCurrent">
          <span>{{ formatApproveItem(approveCurrent).title }}</span>
          <span class="color-c999" v-show="formatApproveItem(approveCurrent).reason">
            ({{ formatApproveItem(approveCurrent).reason }})
          </span>
        </template>
      </cell>
      <common-select
        :title="approveTitle"
        class="select-approve"
        :visible="showApprovePopup"
        :confirm-show="false"
        :cancel-text="isPurchase ? `取消${approveTitle}` : ''"
        :common-list="approveList || []"
        :common-current="formatApproveItem(approveCurrent)"
        :main-color="mainColor"
        :has-link="false"
        :cell-height="isPurchase ? undefined : 80"
        @toggle-show="showApprovePopup = false"
        @common-select="item => $emit('select-approve', item)"
        @cancel-select="$emit('cancel-select-approve')"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.approveId"
            class="position-a px-right-10 px-top-15 m-bd px-padding-lr5 color-c666 line-normal"
            @click.stop="openApproveDetail(scope.row)"
          >
            查看详情
          </span>
          <div class="line-normal text-left">
            <p
              v-if="scope.row.typeName"
              class="px-font-16"
              :style="isCurrentItem(approveCurrent, scope)"
            >
              {{ scope.row.typeName }}
              <span v-if="scope.row.balance">({{ scope.row.balance.toFixed(2) }})元</span>
            </p>
            <div
              :style="isCurrentItem(approveCurrent, scope, false)"
            >
              <p>{{ scope.row.title || '标题' }}</p>
              <span>{{ scope.row.reason }}</span>
            </div>
          </div>
        </template>
      </common-select>
    </template>

    <template v-if="hasOverStandModule">
      <over-tand
        ref="overStand"
        :main-color="mainColor"
        :is-over-stand="isOverStand"
        @on-click-stand="$emit('on-click-stand')"
      />
    </template>

    <template v-if="hasPayWayModule">
      <cell
        label="支付方式"
        :value="payWay ? payWay.title : ''"
        :is-link="payWayList.length > 1"
        @on-click="payWayList.length > 1 ? showPayWayPopup = true : void 0"
      />
      <common-select
        title="选择支付方式"
        :visible="showPayWayPopup"
        :confirm-show="false"
        :common-list="payWayList"
        :common-current="payWay"
        :cell-height="isPurchase ? 60 : undefined"
        :main-color="mainColor"
        @toggle-show="showPayWayPopup = false"
        @common-select="item => $emit('select-pay-way', item)"
      >
        <template slot-scope="scope">
          <div class="line-normal text-left">
            <p
              class="px-font-16"
              :style="isCurrentItem(payWay, scope)"
            >
              {{ scope.row.title }}
            </p>
            <span
              :style="isCurrentItem(payWay, scope, false)"
            >
              {{ scope.row.msg }}
            </span>
          </div>
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
      <welfare-input
        v-if="payWay"
        ref="welfareInput"
        :is-open-welfare="isOpenWelfare"
        :is-open-caidou="isOpenCaidou"
        :pay-way-id="payWay && payWay.id"
        :total-money="totalMoney - (couponMoney || 0)"
        :main-color="mainColor"
        :biz-type="bizType"
        :sub-biz-type="subBizType"
        :app-type="appType"
        @change-open-welfare="val => changeOpen(val, 'welfare')"
        @change-open-caidou="val => changeOpen(val, 'caidou')"
        @welfare-num-change="num => onChangeLocalNum(num, 'welfare')"
        @caidou-num-change="num => onChangeLocalNum(num, 'caidou')"
        @change-open-welfare-error="$emit('change-open-welfare-error')"
        @welfare-data-change="onWelfareDataChange"
      />
    </template>

    <slot name="coupon" />

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
          v-if="Number(bizType) === 22"
          class="iconfont icon-shuoming ib-middle color-info"
          @click="freightDesc"
        />
        <span class="color-c999 fr">+ ¥ {{ freightMoney | formatPrice }}</span>
      </p>
      <p v-if="serviceRate">
        <span class="ib-middle">服务费</span>
        <i
          class="iconfont icon-shuoming ib-middle color-info"
          @click="serviceRateDesc"
        />
        <span class="color-c999 fr">
          <template v-if="$slots.service">
            <slot name="service" />
          </template>
          <template v-else>¥ {{ formatPrice(Math.ceil(serviceRate * skuMoney)) }}</template>
        </span>
      </p>
      <p v-if="hasWelfareModule && isOpenWelfare && welfareLocalNum">
        <span class="ib-middle">积分抵扣</span>
        <span class="color-c999 fr" v-if="welfareLocalNum">
          - ¥ {{ welfareLocalNum | formatPrice }}({{ welfareLocalNum | formatPrice }}积分)
        </span>
      </p>
      <p v-if="hasWelfareModule && isOpenCaidou && caidouLocalNum">
        <span class="ib-middle">彩豆抵扣</span>
        <span class="color-c999 fr" v-if="caidouLocalNum">
          - ¥ {{ caidouLocalNum | formatPrice }}({{ caidouLocalNum }}彩豆)
        </span>
      </p>
      <p v-if="couponMoney && payWay && payWay.id === 3">
        <span class="ib-middle">优惠券</span>
        <span class="color-c999 fr">
          - ¥ {{ couponMoney | formatPrice }}
        </span>
      </p>
      <slot name="price-detail" />
    </div>
  </div>
</template>

<script>
import MSwitch from '../switch'
import CommonSelect from '../common-select'
import MMessage from '../message'
import Cell from '../cell'
import WelfareInput from '../welfare-input/index'
import utils from '../../utils/utils'
import { BILL_METHOD, BILL_TYPE_LIST, PAY_WAY } from './constant'
import esc from '../esc'
import Http from '../http'
import Msgbox from '../msgbox'
import OverTand from '../over-stand'

const http = new Http({
  baseURL: location.port === '8071' ? '//app.e.uban360.net' : '',
  uri: {
    urlPurchaseScope: '/mc/order/checkScopeDetail',
    urlTravelScope: '/gateway/common/payAuth',
    urlConfig: '/gateway/buycenter/module/getModuleList',
    urlApprove: '/gateway/buycenter/approve/getList',
    urlBill: '/gateway/buycenter/invoice/getList'
  }
})

export default {
  name: 'confirm-modules',

  components: {
    MSwitch,
    CommonSelect,
    Cell,
    MMessage,
    // PopupOverStand,
    WelfareInput,
    OverTand
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
    subBizType: [Number, String],
    appType: {
      type: Number,
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
    isOpenCaidou: Boolean,
    isShowApproveCell: Boolean,
    skuMoney: Number,
    freightMoney: Number,
    couponMoney: Number,
    totalMoney: {
      type: Number,
      required: true
    },
    // welfareMaxUseNum: Number,
    // caidouMaxUseNum: Number,
    approveTitle: String,
    travelType: {
      // 默认因私消费
      type: Number,
      default: 1
    },
    isOverStand: Boolean,
    onlySelfPay: Boolean,
    scopeType: {
      type: [Number, String],
      default: 0
    },
    serviceRate: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      config: null,
      approveList: null,
      billList: null,
      welfare: null,
      payWayList: [],

      scopeInfo: {},

      // 积分使用数量
      welfareLocalNum: 0,
      caidouLocalNum: 0,

      loading: {
        approve: false,
        bill: false,
        welfare: false
      },

      // showWelfareCell: true,
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
    hasTravelTypeModule() {
      return this.config ? this.config.indexOf(3) > -1 : false
    },

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
        // ? this.config.indexOf(11) > -1 &&
        //   (this.isPurchase || (!this.isPurchase && this.payWay && this.payWay.id === 3))
        ? this.config.indexOf(11) > -1 && this.payWay && this.payWay.id === 3
        : false
    },

    hasOverStandModule() {
      return this.config
        ? this.config.indexOf(5) > -1 && this.isPublicExpense
        : false
    },

    hasOverStandReasonModule() {
      return this.config
        ? this.config.indexOf(6) > -1 && this.isPublicExpense
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
    },

    app() {
      return esc.app[this.bizType]
    },

    // 采购类型的支付方式依旧支持个人垫付
    // 其它只有因公因私 和 个人企业支付
    isPurchase() {
      return [22, 129, 139, 190].indexOf(Number(this.bizType)) > -1
    },

    // 因公消费
    isPublicExpense() {
      return this.travelType === 0
    }
  },

  watch: {
    payWay(item, oldItem) {
      if (this.hasBillModule) {
        this.initBill(false)
      }
      if (!oldItem || item.id !== oldItem.id) {
        // this.initWelfare()
        this.toggleWelfareInput(item.id === 3)
      }
    },

    'loading.approve': function(val) {
      if (!val) {
        this.showApprovePopup = true
      }
    },

    totalMoney(val) {
      // 更新最大数量
      const { welfareInput } = this.$refs
      if (welfareInput) {
        welfareInput.setWelfareNum(val, true)
        welfareInput.setCaidouNum(val, true)
      }
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
      return http.get('urlConfig', { bizType: this.bizType })
      // return this.get(this.urlConfig, { bizType: this.bizType })
        .then(res => {
          this.config = res.data
          return res
        })
        .catch(error => this.$emit('error-callback', error))
    },

    getScopeInfo() {
      const handle = this.isPurchase
        ? http.get('urlPurchaseScope', { bizType: this.bizType })
        // travelType 1机票 2火车票 3酒店 4打车
        : http.get('urlTravelScope', { bizType: this.bizType, travelType: this.scopeType })
      return handle.then(res => {
        this.scopeInfo = res.data
        this.$emit('load-scope-detail', this.scopeInfo)
        return this.scopeInfo
      }).catch(error => this.$emit('error-callback', error))
    },

    // 审批单有额度、出差、采购3种格式，未统一
    formatApproveItem(item) {
      if (!item) {
        return
      }
      let title = item.title
      let reason = item.reason
      let typeName = item.typeName
      const formatTime = time => {
        const { year, month, date } = utils.getTime(time)
        return `${year}/${month}/${date}`
      }

      if (this.isPurchase) {
        title = item.title
        reason = item.reason
      } else if (!item.hasTransferField) {
        // 未做过字段对调
        const approveTypeName = ['', '固定额度', '临时额度', '出差', '外出']
        title = item.reason || item.approveReason
        reason = `${formatTime(item.startTime)}-${formatTime(item.endTime)}`
        typeName = approveTypeName[item.quotaType]
      }
      return {
        ...item,
        id: item.approveId || item.quotaId,
        title,
        reason,
        typeName,
        hasTransferField: true
      }
    },

    getApprove() {
      this.loading.approve = true
      // this.get(this.urlApprove, { bizType: this.bizType })
      http.get('urlApprove', { bizType: this.bizType })
        .then(res => {
          this.approveList = res.data.map(x => (this.formatApproveItem(x)))
          this.loading.approve = false
        })
        .catch(error => this.$emit('error-callback', error))
    },

    getBillList() {
      this.loading.bill = true
      // this.get(this.urlBill)
      http.get('urlBill')
        .then(res => {
          this.billList = res.data.map(x => ({ ...x, id: x.titleId }))
          this.loading.bill = false
          if (!this.billCurrent) {
            this.$emit('select-bill', this.billList[0])
          }
        })
        .catch(error => this.$emit('error-callback', error))
    },

    getWelfare() {
      if (this.welfare) {
        return Promise.resolve()
      }

      this.loading.welfare = true
      const { welfareInput } = this.$refs
      return welfareInput && welfareInput.getWelfare().then(res => {
        this.welfare = res
        this.loading.welfare = false
      })
    },

    onWelfareDataChange(data, isFirst) {
      this.welfare = data
      if (isFirst) {
        this.initWelfare()
      }
    },

    initPay() {
      // 账户信息
      this.getScopeInfo().then(res => {
        let payWayList = []
        // 非采购 且 因私消费 只支持个人支付
        // 因公消费 个人支付为 个人垫付
        if (
          (!this.isPurchase && !this.isPublicExpense) ||
          this.onlySelfPay
        ) {
          this.payWayList = [PAY_WAY[2]]
          this.$emit('select-pay-way', PAY_WAY[2])
          return
        }

        const { balance, buyer, subscription, haveOrgPay } = res
        if (!subscription || (!buyer && this.isPurchase)) {
          // 只支持个人支付
          payWayList = [PAY_WAY[2]]
        } else if (
          (this.isPurchase && !balance) ||
          (!this.isPurchase && !haveOrgPay)
        ) {
          // 支持垫付与个人支付
          payWayList = PAY_WAY.slice(1, 3)
        } else {
          // 3种都支持
          payWayList = PAY_WAY.slice()
        }

        if (this.isPurchase) {
          if (this.approveCurrent) {
            // 如果关联了审批单，不支持个人支付
            payWayList = payWayList.filter(x => x.id !== 3)
          }
        } else {
          // 没有个人支付，此时个人垫付就是个人支付
          payWayList = payWayList
            .filter(x => x.id !== 3)
            .map(x => ({
              ...x,
              msg: '',
              title: x.id === 2 ? '个人支付' : x.title
            }))
        }

        if (
          !this.payWay ||
          payWayList.every(x => x.id !== this.payWay.id)
        ) {
          // 支付方式不存在
          // 当前支付方式不在可选支付列表中
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
        if (
          id === 1 ||
          id === 2 ||
          (id === 3 && this.isPublicExpense)
        ) {
          // 企业支付
          // 个人垫付
          // 因公消费的个人支付 不支持积分
          this.getWelfare().then(() => {
            this.toggleWelfareInput(false)
          })
        } else {
          this.getWelfare().then(() => {
            this.toggleWelfareInput(true)
          })
        }
      }
    },

    changeOpen(val, type) {
      this.$emit(`change-open-${type}`, val)
    },

    toggleWelfareInput(show) {
      if (!show) {
        this.$emit('change-open-welfare', false)
        this.$emit('change-open-caidou', false)
      } else if (
        this.$refs.welfareInput &&
        this.$refs.welfareInput.welfareData &&
        this.$refs.welfareInput.welfareData.restAmountCaidou
      ) {
        this.$emit('change-open-welfare', false)
        this.$emit('change-open-caidou', true)
      } else {
        this.$emit('change-open-welfare', true)
        this.$emit('change-open-caidou', false)
      }
    },

    // 暴露给外部重置调用
    reInitWelfare() {
      const { welfareInput } = this.$refs
      welfareInput.resetNum()
      welfareInput.getWelfare().then(() => {
        welfareInput.getCaidouRate()
      })
    },

    toSelectBill() {
      this.showBillPopup = true
      this.getBillList()
    },

    onClickBillInfo() {
      const h = this.$createElement
      Msgbox({
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

    onChangeLocalNum(num, type) {
      this[`${type}LocalNum`] = num
      this.$emit(`${type}-num-change`, num)
    },

    freightDesc() {
      const p = this.$createElement('p', {class: 'px-padding-b10 px-margin-lr10 text-left'},
        '运费将根据订单金额以及地区由京东自动计算生成，订单金额达到一定数额时将降低或免运费' +
        '（免运费订单金额110元左右，以页面实际展示为准）'
      )
      Msgbox({
        title: '运费说明',
        msg: p,
        noCancel: true,
        okTxt: '我知道了'
      })
    },

    serviceRateDesc() {
      Msgbox({
        title: '服务费说明',
        msg: `该商品需收取${(this.serviceRate * 100).toFixed(2)}%的服务费。`,
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
        // 兼容老版本
        isUseWelfare: this.isOpenWelfare,
        welfare: { restAmount: this.welfare && this.welfare.restAmountWelfare },
        isOverStand: this.isOverStand,
        ...(this.$refs.welfareInput ? this.$refs.welfareInput.getData() : {}),
        overStandReason: this.$refs.overStand && this.$refs.overStand.getData()
      }
    },

    openApproveDetail(item) {
      if (window.AppInfo && window.AppInfo.data && window.AppInfo.data.approveUrl) {
        utils.openUrl(`${window.AppInfo.data.approveUrl}#/detail/${item.id}`)
      } else {
        this.$emit('open-approve', `#/detail/${item.id}`, item)
      }
    },

    isCurrentItem(item, scope, title = true) {
      return {
        color: item && item.id === scope.row.id ? this.mainColor : title ? '#262A30' : ''
      }
    },

    onChangeOpenWelfare(val) {
      if (this.payWay && this.payWay.id === 3) {
        this.$emit('change-open-welfare', val)
      } else {
        this.$emit('change-open-welfare-error')
      }
    },

    noop() {
    },

    formatPrice(num) {
      return utils.formatMoney(num)
    }
  }
}
</script>

<style lang="scss">
  .confirm-modules {
    .m-bd-b:before {
      border-color: #e5e5e5;
    }
    .color-red {
      color: red;
    }
    .custom__cell {
      padding: 15px 10px;
      .radio {
        margin-top: -5px;
      }
    }
    .color-000 {
      color: #000;
    }
  }
</style>
