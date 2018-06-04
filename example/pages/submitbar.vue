<template>
  <common-entry title="提交栏">
    <m-submit-bar
      money="12"
      sub-text="合计"
      main-text="呵呵"
    >
      <span>全选</span>
    </m-submit-bar>
  </common-entry>
</template>

<script>
import CommonEntry from './commonEntry'
import MSubmitBar from '../../src/components/submit-bar'

export default {
  name: 'cell',

  components: {
    CommonEntry, MSubmitBar
  }
}
</script>

<style scoped>

</style>
