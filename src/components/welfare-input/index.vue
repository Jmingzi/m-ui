<template>
  <div class="welfare-input">
    <div class="welfare" v-if="stableWay !== 2">
      <div class="custom__cell bg-fff m-bd-b">
        <checkbox
          v-if="restAmountWelfare"
          :value="isOpenWelfare"
          :check-icon="'icon-quanxuan'"
          :checked-icon="'icon-quanxuancopy'"
          :main-color="mainColor"
          class="fr"
          @change="val => onChangeOpen(val, 'welfare')"
        />
        <div class="ib-top px-width-60 position-r color-c666">
          积分
          <img class="position-a welfare__tag" :src="require('../../assets/images/tag.png')" width="36px">
        </div>
        <div
          class="ib-top color-c999 line-normal"
          :class="{ 'welfare__info': restAmountWelfare }"
        >
          <span v-if="restAmountWelfare">
            您有{{ restAmountWelfare / 100 }}积分，可抵¥{{ restAmountWelfare | formatPrice }}
          </span>
          <span :style="{fontSize: '3.73vw'}" v-else>您没有可用积分，暂不可用积分抵扣</span>
          <i class="iconfont icon-shuoming color-info" @click="onClickWelfareInfo" />
        </div>
      </div>
      <cell
        v-if="isOpenWelfare && restAmountWelfare"
        :is-link="false"
        value=" "
      >
        <div slot="label" class="text-left">
          <span class="ib-middle px-width-60">使用</span>
          <m-input
            v-model="welfareUseNum"
            :max="maxNumWelfare"
            :min="0"
            :fixed="2"
            type="number"
            class="welfare__input ib-middle"
            placeholder="请输入"
          />
          <span class="color-000 ib-middle" v-if="welfareUseNum">
            积分，抵 <span class="color-red">¥{{ Number(welfareUseNum).toFixed(2) }}</span>
          </span>
        </div>
      </cell>
    </div>
    <div class="cai-dou" v-if="restAmountCaidou && stableWay !== 1">
      <div class="custom__cell bg-fff m-bd-b">
        <checkbox
          :value="isOpenCaidou"
          :check-icon="'icon-quanxuan'"
          :checked-icon="'icon-quanxuancopy'"
          :main-color="mainColor"
          class="fr"
          @change="val => onChangeOpen(val, 'caidou')"
        />
        <div class="ib-top px-width-60 position-r color-c666">彩豆</div>
        <div
          class="ib-top color-c999 line-normal"
          :class="{ 'welfare__info': restAmountCaidou }"
        >
          <span>
            共{{ restAmountCaidou }}彩豆，可抵¥{{ restAmountCaidou | formatPrice }}
          </span>
          <i class="iconfont icon-shuoming color-info" @click="onClickCaidouInfo" />
        </div>
      </div>
      <cell
        v-if="isOpenCaidou"
        :is-link="false"
        value=" "
      >
        <div slot="label" class="text-left">
          <span class="ib-middle px-width-60">使用</span>
          <m-input
            v-model="caidouUseNum"
            :max="maxNumCaidou"
            :min="0"
            type="number"
            class="welfare__input ib-middle"
            placeholder="请输入"
          />
          <span class="color-000 ib-middle" v-if="caidouUseNum">
            彩豆，抵 <span class="color-red">¥{{ caidouUseNum | formatPrice }}</span>
          </span>
        </div>
      </cell>
    </div>
  </div>
</template>

<script>
import { scenesLink } from '@xm/es-config'
// import MSwitch from '../switch/index'
import Checkbox from '../checkbox/index'
import CommonSelect from '../common-select/index'
import Cell from '../cell/index'
import utils from '../../utils/utils'
import MInput from '../m-input/index'
import Msgbox from '../msgbox/index'
// import Toast from '../toast/index'
import Http from '../http'

const http = new Http({
  baseURL: location.port === '8071' ? '//app.e.uban360.net' : '',
  uri: {
    urlWelfare: '/welfare/mall/user/accountTwo',
    urlRate: '/config/rateConfig/getIntegralRate'
  }
})

export default {
  components: {
    Checkbox,
    CommonSelect,
    Cell,
    MInput
  },

  filters: {
    formatPrice(num) {
      return utils.formatMoney(num)
    }
  },

  props: {
    mainColor: String,
    isOpenWelfare: Boolean,
    isOpenCaidou: Boolean,
    payWayId: {
      type: Number,
      required: true
    },
    subPayWayId: Number,
    totalMoney: {
      type: Number,
      required: true
    },
    bizType: [Number, String],
    subBizType: [Number, String],
    appType: Number,
    // 固定的支付方式
    // 0 彩豆和积分同时支持
    // 1 只允许积分
    // 2 只允许彩豆
    stableWay: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      welfareUseNum: '',
      caidouUseNum: '',
      caidouRate: 0,
      caidouMaxUseNum: 0,
      welfareMaxUseNum: this.totalMoney,
      welfareData: null
    }
  },

  computed: {
    maxNumWelfare() {
      const num = /\d+/.test(this.welfareMaxUseNum)
        ? Math.min(this.welfareMaxUseNum, this.restAmountWelfare)
        : this.restAmountWelfare
      return num / 100
    },
    maxNumCaidou() {
      return /\d+/.test(this.caidouMaxUseNum)
        ? Math.min(this.caidouMaxUseNum, this.restAmountCaidou)
        : this.restAmountCaidou
    },

    restAmountWelfare() {
      return this.welfareData && this.welfareData.restAmountWelfare
    },

    restAmountCaidou() {
      return this.welfareData && this.welfareData.restAmountCaidou
    }
  },

  watch: {
    welfareUseNum(num) {
      // 通知业务num变化
      this.$emit('welfare-num-change', this.outputNum(num))
    },
    caidouUseNum(num) {
      this.$emit('caidou-num-change', num ? Number(num) : 0)
    },
    payWayId(val) {
      if (!this.welfareData) {
        this.init()
      } else if (val === 3) {
        console.log('welfare data 存在')  // eslint-disable-line
      }
    },
    welfareData(val, oldVal) {
      this.$emit('welfare-data-change', val, !oldVal)
    },
    // 初始化时，彩豆开关是关闭的；
    // 当获取彩豆将开关打开后再决定要不要拉取彩豆费率
    isOpenCaidou() {
      this.getCaidouRate()
    },
    totalMoney(val) {
      this.setWelfareNum(val)
      this.setCaidouNum(val)
    }
  },

  created() {
    this.init().then(() => {
      this.getCaidouRate()
    })
  },

  methods: {
    init() {
      // console.log('this.payWayId', this.payWayId)
      return this.getWelfare()
      // .then(() => {
      // })
    },

    getWelfare(needSetNum = true) {
      if (this.payWayId !== 3) {
        return Promise.reject() // eslint-disable-line
      }
      return http.get('urlWelfare').then(res => {
      // const mock = {
      //   value: [{ integralType: 1, restAmount: 1000 }, { integralType: 2, restAmount: 2000 }]
      // }
      // console.log('getWelfare')
      // return Promise.resolve(mock).then(res => {
        const restAmountWelfare = res.value.find(x => x.integralType === 1).restAmount
        const restAmountCaidou = res.value.find(x => x.integralType === 2).restAmount
        this.welfareData = {
          restAmountWelfare: restAmountWelfare > 0 ? restAmountWelfare : 0,
          restAmountCaidou: restAmountCaidou > 0 ? restAmountCaidou : 0
        }

        if (needSetNum) {
          this.setWelfareNum()
        }

        return this.welfareData
      })
    },

    getCaidouRate() {
      if (!this.isOpenCaidou) {
        // console.log('isOpenCaidou is false')
        return Promise.reject() // eslint-disable-line
      }

      if (
        this.welfareData &&
        !this.welfareData.restAmountCaidou
      ) {
        this.setCaidouNum()
        return Promise.resolve()
      }

      // console.log('getCaidouRate')
      // return Promise.resolve({ data: { businessRate: 80 } })
      return http.get('urlRate', {
        bizType: this.bizType,
        subBizType: this.subBizType,
        appType: this.appType,
        integralType: 2 // 积分类型（1积分，2彩豆）
      }).then(res => {
        this.caidouRate = res.data.businessRate
        this.setCaidouNum()
        return ''
      })
    },

    setWelfareNum(totalMoney = this.totalMoney) {
      this.welfareMaxUseNum = totalMoney
      this.$nextTick(() => {
        this.welfareUseNum = this.maxNumWelfare
      })
      // 当总金额变化时，强制更新
      // if (
      //   this.welfareUseNum > this.maxNumWelfare ||
      //   !this.welfareUseNum ||
      //   force
      // ) {
      //   this.welfareMaxUseNum = totalMoney
      //   this.$nextTick(() => {
      //     this.welfareUseNum = this.maxNumWelfare
      //   })
      // } else {
      //   console.log('welfareUseNum 小于 maxNumWelfare，不更新输入') // eslint-disable-line
      // }
    },

    setCaidouNum(totalMoney = this.totalMoney) {
      this.caidouMaxUseNum = Math.floor(totalMoney * this.caidouRate / 100)
      this.$nextTick(() => {
        this.caidouUseNum = this.maxNumCaidou
      })
      // if (
      //   this.caidouUseNum > this.maxNumCaidou ||
      //   !this.caidouUseNum ||
      //   force
      // ) {
      //   this.caidouMaxUseNum = Math.floor(totalMoney * this.caidouRate / 100)
      //   this.$nextTick(() => {
      //     this.caidouUseNum = this.maxNumCaidou
      //   })
      // } else {
      //   console.log('caidouUseNum 小于 maxNumCaidou，不更新输入') // eslint-disable-line
      // }
    },

    resetNum() {
      this.welfareUseNum = ''
      this.caidouUseNum = ''
    },

    // 获取data
    getData() {
      return {
        welfareNum: this.isOpenWelfare ? this.outputNum(this.welfareUseNum) : 0,
        caidouNum: this.isOpenCaidou ? this.caidouUseNum : 0,
        isOpenWelfare: this.isOpenWelfare,
        isOpenCaidou: this.isOpenCaidou
      }
    },

    // 传递分出去
    outputNum(num) {
      return num ? ((Number(num) * 1000) / 10).toFixed(0) * 1 : 0
    },

    onChangeOpen(val, type) {
      const isWelfare = type === 'welfare'
      const isCaidou = type === 'caidou'

      if (this.payWayId === 3) {
        if (isWelfare && val && this.isOpenCaidou) {
          // 关闭彩豆
          this.$emit('change-open-caidou', false)
        } else if (isCaidou && val && this.isOpenWelfare) {
          // 关闭积分
          this.$emit('change-open-welfare', false)
        }
        this.$emit(`change-open-${type}`, val)
        this.init()
      } else {
        this.$emit('change-open-welfare-error')
      }
    },

    onClickWelfareInfo() {
      const h = this.$createElement
      Msgbox.confirm({
        title: '积分使用规则',
        msg: h('div', null, [
          h('p', { class: 'text-left' }, '1.积分为贵司发放给员工的一种福利，可直接抵扣现金'),
          h('p', { class: 'text-left' }, '2.1积分可抵扣1.00元，若全额抵扣则无需再支付现金'),
          h('p', { class: 'text-left' }, '3.积分抵扣的部分金额不开具发票')
        ]),
        okTxt: '了解详情',
        cancelTxt: '我知道了'
      }).then(() => {
        try {
          // eslint-disable-next-line
          JSBridge.native('openurl', {
            noDefaultMenu: 1,
            // url: 'https://cms.jituancaiyun.com/xme/qiyefuwu/index.html#/huoqujifen'
            url: scenesLink.scenesWelfareGet
          })
        } catch (e) {
          // eslint-disable-next-line
          console.error(e)
        }
      })
    },

    onClickCaidouInfo() {
      const h = this.$createElement
      Msgbox.confirm({
        title: '彩豆使用规则',
        msg: h('div', null, [
          h('p', { class: 'text-left' }, '1.彩豆可用于福利商城的京东商城、中粮我买网、大众点评、美团外卖、手机充值、油卡充值、卡券、酒店、火车票服务中下单抵扣使用'),
          h('p', { class: 'text-left' }, '2.100彩豆可抵扣1.00元，每次最多抵扣订单金额的98%'),
          h('p', { class: 'text-left' }, '3.彩豆抵扣的部分金额不开具发票'),
          h('p', { class: 'text-left' }, '4.彩豆不可与福利积分同时使用')
        ]),
        okTxt: '了解详情',
        cancelTxt: '我知道了'
      }).then(() => {
        try {
          // eslint-disable-next-line
          JSBridge.native('openurl', {
            noDefaultMenu: 1,
            url: 'https://note.api.jituancaiyun.com/u-h5/show/index.html?name=ydcy-cdsm2-cy&dadian='
          })
        } catch (e) {
          // eslint-disable-next-line
          console.error(e)
        }
      })
    }
  }
}
</script>

<style lang="stylus">
  .welfare-input
    .m-bd-b:before
      border-color: #e5e5e5;
    .color-red
      color: red
    .custom__cell
      padding: 15px 10px;
      .radio
        margin-top: -5px;
    .welfare__tag
      top: -10px;
      right: -5px;
    .welfare__info
      width: 60vw;
      @media screen and (max-width: 320px)
        width: 55vw;
      word-break: break-all;
    .welfare__input
      input
        width: 100px;
        height: 26px;
        border-radius: 2px;
        text-align: center;
        line-height: normal;
        -webkit-appearance: none;
</style>
