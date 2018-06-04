<template>
  <div
    class="goods-card font-0"
    :style="{ background: cardBg }"
    @click="$emit('on-click')"
  >
    <div
      v-if="isShowCheckbox"
      class="goods-card__checkbox ib-top px-font-16 rem-width-40 text-center px-padding-tb10"
      :style="[imgHeightStyle, imgLineHeight]"
      @click.stop="checkCard"
    >
      <checkbox
        check-icon="icon-quanxuan"
        checked-icon="icon-quanxuancopy"
        :check-type="checkboxIconType"
        :value="isCheckboxChecked"
        :disabled="isCheckboxDisable"
        :main-color="this.mainColor"
        radius="circle"
        @change="checkCard"
      />
    </div>
    <div
      class="goods-card__item ib-top px-font-14 overflow-h"
      :class="{
        'm-bd-b': border
      }"
      :style="itemWidthStyle"
    >
      <div
        class="goods-card__img fl bg-f2 position-r"
        :class="{
          'px-margin-r10': isShowCheckbox,
          'px-margin-lr10': !isShowCheckbox
        }"
        :style="[imgWidthStyle, imgHeightStyle]"
      >
        <slot v-if="$slots.img" name="img" />
        <img :src="img || imgDefault" width="100%" height="100%" v-else>

        <div v-if="isAbnormal" class="position-a width-100 height-100 top-0 left-0">
          <img :src="abnormalImg" width="100%" height="100%">
        </div>
      </div>
      <div
        class="overflow-h position-r"
        :style="itemHeightStyle"
      >
        <p
          class="goods-card__name two-line"
          :class="{ 'color-c999': isAbnormal }"
        >
          {{ name }}
        </p>

        <div class="goods-card__item-info position-a bottom-0 left-0 width-100">
          <p class="color-c999 px-font-12" v-if="spec">{{ spec }}</p>
          <div class="fr color-c999">
            <slot v-if="$slots.right" name="right" />
            <template v-else-if="num !== undefined">x{{ num }}</template>
          </div>
          <div
            v-if="isMainPriceStyle"
            v-html="genderPrice(price)"
          />
          <span
            class="color-c999"
            v-else
          >
            ¥ {{ (price / 100).toFixed(2) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from '../checkbox'

export default {
  name: 'goods-card',

  components: {
    Checkbox
  },

  model: {
    prop: 'isCheckboxChecked',
    event: 'input'
  },

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
    isCheckboxChecked: Boolean,
    checkboxIconType: {
      type: [String, Number],
      default: 1
    }
  },

  computed: {
    imgHeightStyle() {
      return { height: `${this.imgHeight}px` }
    },
    imgWidthStyle() {
      return { width: `${this.imgHeight}px` }
    },
    imgLineHeight() {
      return { lineHeight: `${this.imgHeight - 5}px` }
    },
    itemWidthStyle() {
      const width = this.isShowCheckbox ? 335 : 375
      return { width: `${width / 37.5}rem` }
    },
    itemHeightStyle() {
      return { height: `${this.contentHeight}px` }
    }
  },

  watch: {
    isCheckboxChecked() {
      const { checkGoodsCardAllChecked } = this.$parent
      checkGoodsCardAllChecked && checkGoodsCardAllChecked()
    }
  },

  beforeCreate() {
    this.$parent.goodsCardItem && this.$parent.goodsCardItem.push(this)
  },

  methods: {
    genderPrice(price, color = this.mainColor) {
      const num = Number(price / 100).toFixed(this.priceFixed).split('.')
      if (this.isAbnormal) {
        color = '#999'
      }
      return `<span class="rem-font-10" style="color: ${color}">¥ ` +
        `<span class="rem-font-16">${num[0]}</span>.<span>${num[1]}</span>` +
        `</span>`
    },

    checkCard(checked) {
      if (!this.isCheckboxDisable) {
        this.$emit('input', checked)
        this.$emit('change', checked)
      }
    }
  }
}
</script>

<style>
  .goods-card__item {
    padding: 10px 10px 10px 0;
  }
</style>
