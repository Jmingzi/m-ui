<template>
  <common-entry title="商品卡片">
    <div class="mg--10">
      <m-goods-card
        v-model="isCheck"
        :is-checkbox-disable="false"
        :is-show-checkbox="true"
        :is-abnormal="true"
        content-height="100"
        card-bg="#f7f8f9"
        :price="10"
        :border="true"
        num="100"
        spec="25盒 * 12"
        name="商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称"
        @on-click="onClick"
      >
        <p slot="right">右下角slots</p>
      </m-goods-card>
    </div>
    <div class="px-margin-t30">
      <pre>
        import { GoodsCard } from 'xm-mui'
      </pre>
    </div>
    <p>slots</p>
    <pre>
      $slots.img
      $slots.right
    </pre>
    <p>events</p>
    <pre>
      @on-check
      @on-click
    </pre>
    <p>props</p>
    <pre class="px-font-12">
  props: {
    name: {
      type: String,
      required: true
    },
    img: String,
    num: [String, Number],
    imgDefault: String,
    border: {
      type: Boolean,
      default: false
    },
    spec: String,
    imgHeight: {
      type: [String, Number],
      default: 80
    },
    contentHeight: {
      type: [String, Number],
      default: 80
    },
    mainColor: {
      type: String,
      default: 'red'
    },
    isMainPriceStyle: {
      type: Boolean,
      default: true
    },
    cardBg: {
      type: String,
      default: '#ffffff'
    },
    priceFixed: {
      type: Number,
      default: 2
    },
    price: {
      type: Number,
      default: 0
    },
    isShowCheckbox: {
      type: Boolean,
      default: false
    },
    // 非正常商品
    isAbnormal: {
      type: Boolean,
      default: false
    },
    abnormalImg: String,
    isCheckboxDisable: {
      type: Boolean,
      default: false
    },
    checkboxIconType: {
      type: [String, Number],
      default: 1
    }
  }
    </pre>
  </common-entry>
</template>

<script>
import CommonEntry from './commonEntry'
import MGoodsCard from '../../src/components/goods-card'

export default {
  name: 'goods-card',

  components: {
    CommonEntry, MGoodsCard
  },

  data() {
    return {
      isCheck: false
    }
  },

  methods: {
    onClick() {
      console.log(1)
    }
  }
}
</script>

<style lang="scss">

</style>
