<template>
  <common-entry title="积分输入">
    <div class="mg--10">
      <welfare-input
        :is-open-welfare="openWelfare"
        :is-open-caidou="openCaidou"
        :pay-way-id="3"
        :total-money="1111"
        biz-type="144"
        :app-type="1"
        :stable-way="1"
        @welfare-num-change="changeNum"
        @caidou-num-change="val => caidouUseNum = val"
        @change-open-welfare="val => openWelfare = val"
        @change-open-caidou="val => openCaidou = val"
        @change-open-welfare-error="changeError"
      />
    </div>

    <p>props</p>
    <pre>
      {
        mainColor: String,
        // 可用积分数量
        restAmountWelfare: Number,
        // 可用彩豆数量
        restAmountCaidou: Number,
        // 是否使用积分
        isOpenWelfare: Boolean,
        // 是否使用彩豆
        isOpenCaidou: Boolean,
        // 支付方式Id
        payWayId: Number,
        // 总金额
        totalMoney: Number,
        // 积分与彩豆二选一，默认0，1 积分，2彩豆
        stableWay: Number
      }
    </pre>
    <p>events</p>
    <pre>
      @welfare-num-change
      @caidou-num-change
      @change-open-welfare
      @change-open-caidou
    </pre>
    <p>methods</p>
    <pre>
      // 重置数量为最大
      $refs.module.setWelfareNum()
      $refs.module.setCaidouNum()
      // 重置数量为0
      $refs.module.resetNum()
      // 获取data
      $refs.module.getData()
    </pre>
  </common-entry>
</template>

<script>
import CommonEntry from './commonEntry'
import WelfareInput from '../../src/components/welfare-input/index'

export default {
  name: 'm-welfare-input',

  data() {
    return {
      openWelfare: false,
      openCaidou: true,

      caidouUseNum: 0,
      welfareUseNum: 0
    }
  },

  components: {
    CommonEntry,
    WelfareInput
  },

  watch: {
    caidouUseNum(val) {
      console.log(val)
    }
  },

  methods: {
    changeNum(val) {
      console.log(val)
    },
    changeError() {
      alert('changeError')
    }
  }
}
</script>

<style scoped>

</style>
