<template>
  <common-entry title="地址选择">
    <p>Demo</p>
    <van-cell
      title="当前审批单"
      is-link
      :value="currApprove"
      @click="toggleApprove()"
    />

    <m-approve-select
      :visible="showApprove"
      :approve-list="approveList"
      :approve-current="approveCurrent"
      @toggle-show="toggleApprove"
      @approve-btn="clickBtn"
      @approve-select="handleAddressSelect"
    />

    <p class="px-margin-t20">Props 与 Methods</p>
    <pre>
      :visible  // Boolean
      :approve-list  // Array
      :approve-current  // Object
      :main-color // String
      @toggle-show // @params type 控制是否显示
      @approve-btn // 点击底部按钮
      @approve-select // 选择每一项地址
    </pre>

    <p class="px-margin-t20">关于approveList必须是包含以下字段</p>
    <pre>
      [
        {
          id: 1,
          approveReason: '审批单事由1',
          approveId: '23243545465768789',
          // ...
        }
      ]
    </pre>

    <p class="px-margin-t20">用法</p>
    <pre>
      &lt;approve-select
        :visible="showApprove"
        :approve-list="[]"
        :approve-current="undefined"
        @toggle-show="toggleApprove"
        @approve-btn="clickBtn"
        @approve-select="handleAddressSelect"
      &gt;
        &lt;span&gt;icon&lt;/span&gt;
      &lt;/approve-select&gt;
    </pre>
  </common-entry>
</template>

<script>
import CommonEntry from './commonEntry'
import MApproveSelect from '../../src/components/approve-select'
const approveList = [
  {
    id: 1,
    approveReason: '审批单事由1',
    approveId: '23243545465768789'
  },
  {
    id: 2,
    approveReason: '审批单事由2',
    approveId: '23243545465768789'
  }
]

export default {
  name: 'addressselect',

  components: {
    CommonEntry, MApproveSelect
  },

  computed: {
    currApprove() {
      return this.approveCurrent ? this.approveCurrent.approveReason : '请选择'
    }
  },

  data() {
    return {
      showApprove: false,
      approveList,
      approveCurrent: null
    }
  },

  methods: {
    toggleApprove(type = true) {
      this.showApprove = type
    },

    clickBtn() {
      this.$dialog.alert({ message: 'ok' })
    },

    handleAddressSelect(item) {
      this.approveCurrent = item
    }
  }
}
</script>

<style scoped>

</style>
