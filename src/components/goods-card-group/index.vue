<template>
  <div class="m-goods-card-group" @click="$emit('on-click')">
    <div
      class="m-goods-card-group__title overflow-h px-padding-lr10 bg-fff"
      :class="{
        'm-bd-b': border
      }"
    >
      <div v-if="$slots.info" class="fr m-goods-card-group__title-info">
        <slot name="info" />
      </div>
      <div class="m-goods-card-group__label font-0">
        <div v-if="isShowCheckbox" class="ib-middle px-width-30">
          <checkbox
            check-icon="icon-quanxuan"
            checked-icon="icon-quanxuancopy"
            radius="circle"
            :value="isChecked"
            @change="onCheckLabel"
          />
        </div>
        <div
          v-if="$slots.label"
          class="px-font-14 ib-middle color-c262"
          @click.stop="$emit('on-label-click')"
        >
          <slot name="label" />
          <icon class="ib-middle color-ccc px-font-12" name="arrow"/>
        </div>
      </div>
    </div>

    <div class="m-goods-card-group__content">
      <slot />
    </div>

    <div
      v-if="$slots.bottom"
      class="m-goods-card-group__bottom text-right bg-fff"
      :class="{
        'm-bd-t': border
      }"
    >
      <slot name="bottom" />
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
import Checkbox from '../checkbox'

export default {
  components: {
    Checkbox, Icon
  },

  model: {
    prop: 'isChecked'
  },

  props: {
    isShowCheckbox: {
      type: Boolean,
      default: false
    },
    isChecked: Boolean,
    border: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      goodsCardItem: []
    }
  },

  methods: {
    checkGoodsCardAllChecked() {
      const check = this.goodsCardItem.every(item => item.isCheckboxChecked)
      this.$emit('input', check)
      this.$emit('change', check)
    },

    onCheckLabel(val) {
      this.$emit('input', val)
      // 勾选子节点
      this.goodsCardItem.forEach(goods => {
        if (!goods.isCheckboxDisable) {
          goods.$emit('input', val)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .color-c262 { color: #262a30; }
  .m-goods-card-group__title,
  .m-goods-card-group__bottom {
    line-height: 50px;
  }
.overflow-h
{
  overflow:hidden !important
}
.px-padding-lr10
{
  padding:0 10px
}
.bg-fff
{
  background-color:#fff
}
.fr
{
  float:right
}
.font-0
{
  font-size:0 !important
}
.ib-middle
{
  display:inline-block;
  vertical-align: middle;
}
.px-width-30
{
  width:30px
}
.px-font-14
{
  font-size:14px !important
}
.color-ccc
{
  color:#ccc
}
.px-font-12
{
  font-size:12px !important
}
.text-right
{
  text-align:right
}

</style>
