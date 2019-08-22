<template>
  <div class="sku">
    <div
      v-for="(level, levelIndex) in attrList"
      :key="levelIndex"
      class="sku-attr"
    >
      <span class="sku-attr__name">{{ level.tagName }}</span>
      <div class="sku-attr__wrap">
        <div
          class="sku-attr__item"
          v-for="(attr, attrIndex) in level.attrs"
          :key="attr.tagValue"
          :class="{
            'sku-attr__selected': isSelected(levelIndex, attr),
            'sku-attr__disabled': isDisabled(levelIndex, attrIndex, attr)
          }"
          @click="onClick(levelIndex, attrIndex, attr.tagValue)"
        >
          <span>{{ attr.tagValue }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from './util'

export default {
  name: 'sku',

  model: {
    prop: 'skuId',
    event: 'change'
  },

  props: {
    skuList: {
      type: Array,
      default () {
        return []
      }
    },
    attrList: {
      type: Array,
      default () {
        return []
      }
    },
    skuId: Number,
    isSkuAbnormal: Function
  },

  data () {
    return {
      selectedAttr: [],
      sameLevelCache: []
    }
  },

  computed: {
    isSkuAbnormalFn () {
      return this.isSkuAbnormal instanceof Function
        ? this.isSkuAbnormal
        : () => false
    }
  },

  watch: {
    skuId(val) {
      this.setSelectedAttr(val)
    }
  },

  created () {
    // 初始化选择 sku
    if (this.skuId) {
      this.setSelectedAttr(this.skuId)
    }
  },

  methods: {
    setSelectedAttr(skuId) {
      this.selectedAttr = this.attrList.map(level => {
        const attr = level.attrs.find(x => x.skuIdList.some(y => y === skuId))
        return attr.tagValue
      })
    },

    isSelected (levelIndex, attr) {
      return this.selectedAttr.some(x => x === attr.tagValue)
    },

    // 是否禁用
    isDisabled (levelIndex, attrIndex, attr) {
      let isDisable = attr.skuIdList.every(id => {
        // 规格包含的商品都是非正常商品
        const sku = this.skuList.find(x => x.skuId === id)
        return this.isSkuAbnormalFn(sku)
      })
      // 同层级比较缓存
      const levelCache = this.sameLevelCache[levelIndex]
      // 非同级已选择组合结果
      let excludeRemain = levelCache || []

      if (this.selectedAttr.length) {
        if (!levelCache) {
          this.selectedAttr.forEach((selected, index) => {
            if (levelIndex !== index && selected) {
              const item = this.attrList[index].attrs.find(x => x.tagValue === selected)
              excludeRemain.push(item ? item.skuIdList : [])
            }
          })
          // 将同级缓存
          this.sameLevelCache[levelIndex] = excludeRemain
        }

        // 非同级已选择组合有值
        if (excludeRemain.length) {
          // 与当前循环的属性求交集
          const result = util.intersection(...excludeRemain, attr.skuIdList)
          if (result.length) {
            const sku = this.skuList.find(x => x.skuId === result[0])
            isDisable = this.isSkuAbnormalFn(sku)
          } else {
            isDisable = true
          }
        }
      }
      return isDisable
    },

    onClick (levelIndex, attrIndex, tagValue) {
      // 清空缓存
      this.sameLevelCache = []
      this.$set(
        this.selectedAttr,
        levelIndex,
        this.selectedAttr[levelIndex] === tagValue ? null : tagValue
      )

      if (this.selectedAttr.every(x => x)) {
        const idArr = this.selectedAttr.map((attr, i) => {
          const item = this.attrList[i].attrs.find(x => x.tagValue === attr)
          return item.skuIdList
        })
        this.$emit(
          'change',
          (idArr.length === 1 ? idArr[0] : util.intersection(...idArr))[0]
        )
      } else {
        this.$emit('change', null)
      }
    }
  }
}
</script>

<style lang="stylus">
vw(px)
  return unit(px/3.75, 'vw')
.sku
  .sku-attr
    display flex
    // align-items top
    flex-direction column
    padding vw(10) vw(15)
    &__wrap
      display flex
      flex-wrap wrap
      // margin-left vw(5)
      // width vw(310)
    &__item
      position relative
      padding 0 vw(15)
      display flex
      align-items center
      justify-content center
      height 30px
      margin 10px 0 0 10px
      border 1px #ccc solid
      border-radius 2px
      font-size 12px
      &:first-child
        margin-left 0
    &__name
      display: flex
      align-items: center
      // width vw(30)
      // height 40px
      color #959BA3
      font-size 14px
    &__reason
      position absolute
      width: 80%
      top: -45%
      right: -50%
      font-size: 10px
      background-color: yellow
      z-index 10
    &__selected
      border-color red
      color red
    &__disabled
      border-style dashed
      pointer-events none
      background-color #f2f2f2
</style>
