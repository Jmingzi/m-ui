<template>
  <common-entry title="侧边popup">
    <p @click="visible = true">打开显示</p>
    <popup-side
      ref="popup"
      align="left"
      :visible="visible"
      :num="3"
      @toggle="visible = !visible"
    >
      <p slot="0" @click="$refs.popup.next(1)">下一页1</p>
      <p slot="1" @click="$refs.popup.next(2)">下一页2</p>
      <p slot="2" @click="$refs.popup.next(0)">下一页0</p>
    </popup-side>
  </common-entry>
</template>

<script>
import CommonEntry from './commonEntry'
import PopupSide from '../../src/components/popup-side'

export default {
  name: 'cell',

  components: {
    CommonEntry,
    PopupSide
  },

  data() {
    return {
      visible: false
    }
  }
}
</script>

<style scoped>

</style>
