<template>
  <common-entry title="差旅入口面板">
    <m-travel-panel />
  </common-entry>
</template>

<script>
import CommonEntry from './commonEntry'
import MTravelPanel from '../../src/components/travel-panel'

export default {
  name: 'cell',

  components: {
    CommonEntry, MTravelPanel
  }
}
</script>

<style scoped>

</style>
