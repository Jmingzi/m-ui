<template>
  <common-entry title="地址选择">
    <p>Demo</p>
    <van-cell
      title="当前地址"
      is-link
      :value="currAddress"
      @click="toggleAddress()"
    />

    <m-address-select
      :visible="showAddress"
      :address-list="addressList"
      :address-current="addressCurrent"
      @toggle-show="toggleAddress"
      @address-add="clickBtn"
      @address-select="handleAddressSelect"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.formatAddress }}</span>
      </template>
    </m-address-select>

    <p class="px-margin-t20">Props 与 Methods</p>
    <pre>
      :visible  // Boolean
      :address-list  // Array
      :address-current  // Object
      :main-color // String
      @toggle-show // @params type 控制是否显示
      @address-add // 点击底部按钮
      @address-select // 选择每一项地址
    </pre>

    <p class="px-margin-t20">关于addressList必须是包含以下字段</p>
    <pre>
      [
        {
          id: 1,
          formatAddress: '浙江省杭州市西湖区...'
          // ...
        }
      ]
    </pre>

    <p class="px-margin-t20">用法</p>
    <pre>
      &lt;address-select
        :visible="showAddress"
        :address-list="[]"
        :address-current="undefined"
        @toggle-show="toggleAddress"
        @address-add="clickBtn"
        @address-select="handleAddressSelect"
      &gt;
        &lt;span&gt;icon&lt;/span&gt;
      &lt;/address-select&gt;
    </pre>
  </common-entry>
</template>

<script>
import CommonEntry from './commonEntry'
import MAddressSelect from '../../src/components/address-select'
const addressList = [
  {
    id: 1,
    formatName: '杨明 18358185826',
    formatAddress: '浙江省杭州市西湖区蒋村街道808号',
    self: { id: 22 }
  },
  {
    id: 2,
    formatName: '杨明 18358185826',
    formatAddress: '赣州市天河区',
    self: { id: 22 }
  },
  {
    id: 3,
    formatName: '杨明 18358185826',
    formatAddress: '赣州市天河区',
    self: { id: 22 }
  },
  {
    id: 4,
    formatName: '杨明 18358185826',
    formatAddress: '赣州市天河区',
    self: { id: 22 }
  },
  {
    id: 5,
    formatName: '杨明 18358185826',
    formatAddress: '赣州市天河区',
    self: { id: 22 }
  },
  {
    id: 6,
    formatName: '杨明 18358185826',
    formatAddress: '赣州市天河区',
    self: { id: 22 }
  },
  {
    id: 7,
    formatName: '杨明 18358185826',
    formatAddress: '浙江省杭州市西湖区蒋村街道808号',
    self: { id: 22 }
  },
  {
    id: 8,
    formatName: '杨明 18358185826',
    formatAddress: '浙江省杭州市西湖区蒋村街道808号',
    self: { id: 22 }
  }
]

export default {
  name: 'address-select',

  components: {
    CommonEntry, MAddressSelect
  },

  computed: {
    currAddress() {
      return this.addressCurrent ? this.addressCurrent.formatAddress : '请选择'
    }
  },

  data() {
    return {
      showAddress: false,
      addressList,
      addressCurrent: null
    }
  },

  methods: {
    toggleAddress(type = true) {
      this.showAddress = type
    },

    clickBtn() {
      this.$dialog.alert({ message: 'ok' })
    },

    handleAddressSelect(item) {
      this.addressCurrent = item
    }
  }
}
</script>

<style scoped>

</style>
