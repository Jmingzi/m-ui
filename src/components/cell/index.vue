<template>
  <div
    class="cell overflow-h text-right bg-fff"
    :class="{
      'm-bd-b': border
    }"
    :style="{
      height: `${height}px`,
      lineHeight: `${height}px`
    }"
    @click="$emit('on-click')"
  >
    <div class="fl">
      <div class="ib-middle cell__label">
        <slot name="label">
          <span>{{ label }}</span>
        </slot>
      </div>
      <i
        v-show="hasInfo"
        class="iconfont icon-shuoming ib-middle color-info"
        @click.stop="$emit('on-click-info')"
      />
      <div class="ib-middle">
        <slot name="label-desc">
          <span class="color-c999 px-font-12">{{ labelDesc }}</span>
        </slot>
      </div>
    </div>

    <i class="iconfont icon-jinru fr color-c999" v-show="isLink && !loading"/>
    <img
      v-show="loading"
      class="fr px-margin-t15"
      :src="require('../../assets/loading.gif')"
      width="20px"
    >
    <div class="over-text">
      <slot>
        <span v-if="value">{{ value }}</span>
        <span class="color-c999" v-else-if="isLink">请选择</span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cell',

  props: {
    height: {
      type: Number,
      default: 50
    },
    border: {
      type: Boolean,
      default: true
    },
    isLink: {
      type: Boolean,
      default: true
    },
    hasInfo: Boolean,
    loading: Boolean,
    label: String,
    labelDesc: String,
    value: String
  }
}
</script>

<style lang="scss">
  .cell {
    padding: 0 10px;

    .cell__label {
      color: #959ba3;
    }
  }
</style>
