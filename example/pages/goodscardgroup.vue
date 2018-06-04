<template>
  <common-entry title="组合商品卡片">
    <div class="mg--10">
      <m-goods-card-group
        v-model="isCheck"
        :is-show-checkbox="true"
        :border="false"
        @on-label-click="onLabelClick"
        @on-click="onClick"
      >
        <span slot="label" class="color-info ib-middle">店铺名称</span>
        <span slot="info" class="color-error">已拒收</span>

        <m-goods-card
          v-for="(item, index) in list"
          v-model="childCheckList[item.id]"
          :key="index"
          :is-checkbox-disable="true"
          :is-show-checkbox="true"
          :is-abnormal="false"
          content-height="100"
          :price="item.price"
          :num="item.num"
          :spec="item.spec"
          :name="item.name"
          :border="true"
          :checkbox-icon-type="2"
          card-bg="#f7f8f9"
          @on-click="onClickCard"
        >
          <p slot="right">right info x 123</p>
        </m-goods-card>

        <div slot="bottom">
          <span>小计</span>
          <span class="color-error">5.00元</span>
        </div>
      </m-goods-card-group>
    </div>

    <p class="px-margin-t30">slot</p>
    <pre>
      default // 商品列表
      label // 例如店铺名称
      info  // 店铺状态
      bottom // 底部操作栏
    </pre>
    <p>model</p>
    <pre>
      v-model=""
    </pre>
    <p>props</p>
    <pre>
     props: {
        isShowCheckbox: {
          type: Boolean,
          default: false
        }
      }
    </pre>
    <p>events</p>
    <pre>
      @on-label-click="onLabelClick"
    </pre>
    <p>判断是否选中</p>
    <pre>
      // 组件data中的状态
      groupChecked: true
    </pre>
  </common-entry>
</template>

<script>
import CommonEntry from './commonEntry'
import MGoodsCardGroup from '../../src/components/goods-card-group'
import MGoodsCard from '../../src/components/goods-card'

const list = [
  {
    id: 1,
    name: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
    spec: '25盒 * 12',
    num: 10,
    price: 100000
  },
  {
    id: 2,
    name: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
    spec: '25盒 * 12',
    num: 10,
    price: 100000
  }
]
export default {
  name: 'example-goods-card',

  components: {
    CommonEntry, MGoodsCardGroup, MGoodsCard
  },

  data() {
    return {
      list,
      isCheck: false,
      childCheckList: {}
    }
  },

  watch: {
    isCheck(val) {
      this.$dialog.alert({ message: `checkbox : ${val}` })
    }
  },

  methods: {
    onClickCard() {
      this.$dialog.alert({ message: 'click card' })
    },
    onLabelClick() {
      this.$dialog.alert({ message: 'click label' })
    },
    onClick() {
      this.$dialog.alert({ message: 'click' })
    }
  }
}
</script>

<style lang="scss">

</style>
