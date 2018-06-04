<template>
  <common-entry title="msgbox">
    <pre>
      import { Msgbox } from 'xm-mui'
    </pre>
    <div style="text-align:center">
      <p>
        <a href="javascript:" @click="msgBoxAlert">alert弹窗</a>
      </p>
      <p>
        <a href="javascript:" @click="msgBoxConfirm">confirm弹窗</a>
      </p>
      <p>
        <a href="javascript:" @click="msgBoxConfirm2">vNode message</a>
      </p>
    </div>
    <p class="px-margin-t20">tips: 支持传vNode</p>
    <p>代码示例</p>
    <pre>
      msgBox.alert(1)
      msgBox.confirm(2)
      msgBox.confirm({
        msg: this.$createElement('p', null, '我是vNode')
      })
    </pre>
    <p>options</p>
    <pre>
      const defaultOptions = {
        title: '',
        msg: '这是一段提示',
        cancelTxt: '取消',
        okTxt: '确认',
        noCancel: false,
        noConfirm: false,
        visible: false
      }
    </pre>
  </common-entry>
</template>

<script>
import CommonEntry from './commonEntry'
import msgBox from '../../src/components/msgbox/index'

export default {
  name: 'msg-box',

  components: {
    CommonEntry
  },

  methods: {
    msgBoxAlert() {
      msgBox.alert({
        title: '标题文案文案文案文案文案案文案案文案案文案案文案',
        msg: '文案文案文案文案文案案文案案文案案文案案文案'
      })
    },

    msgBoxConfirm() {
      msgBox.confirm('文案文案文案文案文案案文案案文案案文案案文案文案文案文案文案文案案文案案文案案文案案文案文案文案文案文案文案案文案案文案案文案案文案文案文案文案文案文案案文案案文案案文案案文案文案文案文案文案文案案文案案文案案文案案文案文案文案文案文案文案案文案案文案案文案案文案文案文案文案文案文案案文案案文案案文案案文案文案文案文案文案文案案文案案文案案文案案文案文案文案文案文案文案案文案案文案案文案案文案')
    },

    msgBoxConfirm2() {
      msgBox.confirm({
        msg: this.$createElement('p', null, '我是vNode')
      })
    }
  }
}
</script>

<style scoped>

</style>
