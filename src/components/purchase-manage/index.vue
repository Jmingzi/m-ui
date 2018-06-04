<template>
  <div class="position-r height-100">
    <tab
      :tabs="solveLabels"
      :color="mainColor"
      @callback="handleTabChange"
    />

    <div
      v-if="scopeInfo"
      v-page="{ wrapperCls: 'purchase__list-wrap', callback: getList, loadingOpen: false }"
      class="position-a px-top-40 bottom-0 width-100 overflow-a touch-scroll"
    >
      <div class="purchase__list-wrap overflow-h">
        <div
          class="bg-fff px-padding-10 px-margin-t10 cl hover-bg"
          v-for="(item, index) in (listData || [])"
          :key="index"
          @click="toDetail(item)"
        >
          <div class="px-width-40 px-margin-r10 fl px-height-40 font-0" v-show="currentTab === 1">
            <avatar
              size="s36"
              :user="{uid: item.uid, name: item.name}"
              avatar-url="http://filesystem.api.jituancaiyun.net/sfs/avatar?uid="
            />
          </div>
          <div class="overflow-h">
            <p class="line-1 font-0">
              <span class="px-font-16">
                {{ item.approveType === 2 ? item.templateName : `${ item.name }的采购申请` }}
              </span>
              <span class="color-c999 px-font-12 fr">
                {{ formatTime(item.startTime) }}
              </span>
            </p>
            <p
              class="color-c999 px-margin-tb5 px-font-12"
              v-if="(currentTab === 0 && item.totalPrice)
              || (currentTab === 1 && item.approveReason)"
            >
              {{ currentTab === 0 ? `总采购金额：${item.totalPrice}` : `采购事由：${item.approveReason}` }}
            </p>
            <p class="cl">
              <span
                v-if="isShowBtn(item)"
                class="tag type default fr m-bd px-font-12"
                @click.stop="handleBtn(item)"
              >
                {{ item.statusInfo.btn }}
              </span>
              <!--待报销的新审批 去采购-->
              <span
                v-if="isNewApproveNotReimbursement(item)"
                class="tag type default fr px-margin-r10 m-bd px-font-12"
                @click.stop="toPurchase(item)"
              >
                去采购
              </span>
              <span
                :style="{color: item.statusInfo.color}"
                class="display-b px-margin-t5 hover-bg px-font-12"
              >
                {{ item.statusInfo.name }}
              </span>
            </p>
          </div>
        </div>
      </div>

      <empty
        v-if="!listData || listData.length === 0"
        :icon-img="require('../../assets/images/empty-sp.png')"
        :title="``"
        :desc="!listData ? '加载中' : (currentTab === 1 ? '没有待我处理的采购' :'没有我发起的采购')"
      />
    </div>
  </div>
</template>

<script>
import Page from 'vue-mobile-page'
import utils from '../../utils/utils'
import { TabLabels, LIST_STATE } from './data'

const requireComponent = [
  { name: 'Tab', path: 'tab' },
  { name: 'Empty', path: 'empty' },
  { name: 'Avatar', path: 'avatar' }
]

function importComponent(components) {
  const res = {}
  components.forEach(component => {
    res[component.name] = () => import(`@/components/${component.path}`)
  })

  return res
}

const components = importComponent(requireComponent)
const baseUrl = `//app.e.uban360.${utils.online ? 'com' : 'net'}`

export default {
  name: 'index',

  components,

  mixins: [Page],

  props: {
    get: {
      type: Function,
      required: true
    },
    tabs: {
      type: Array,
      default() {
        return TabLabels
      }
    },
    initTab: {
      type: Number,
      default: 0
    },
    mainColor: {
      type: String,
      default: '#FF8100'
    },
    scopeInfo: {
      type: Object,
      required: true
    },
    listState: {
      type: Array,
      default() {
        return LIST_STATE
      }
    }
  },

  data() {
    return {
      listData: undefined,
      currentTab: this.initTab,
      pages: -1,
      approveUrl: `${baseUrl}/mc/manager/queryPurchaseApprove`
    }
  },

  computed: {
    solveLabels() {
      return this.tabs.map(x => x.label)
    }
  },

  created() {
    this.doCallback(this.getList)
  },

  methods: {
    fillZero(num) {
      return Number(num) < 10 ? `0${num}` : num
    },
    formatTime(val) {
      const date = new Date(val)
      const [
        year,
        month,
        day,
        hour,
        minute
      ] = [
        date.getFullYear(),
        this.fillZero(date.getMonth() + 1),
        this.fillZero(date.getDate()),
        this.fillZero(date.getHours()),
        this.fillZero(date.getMinutes())
      ]
      return `${year}/${month}/${day} ${hour}:${minute}`
    },

    resetPage() {
      this.currentPage = 1
      this.pageSize = 20
      this.noData = false
      this.pageLoading = false
      this.pageOpen = true
      this.listData = undefined
    },

    handleTabChange(index) {
      this.currentTab = index
      this.resetPage()
      this.getList()
    },

    getList(pageCallback) {
      const data = {
        flag: this.currentTab,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        bizType: 139
      }
      if (
        (this.currentPage >= this.pages) &&
        (this.pages !== -1)
      ) {
        this.doCallback(this.getList)
        this.$toast({
          message: '没有更多了!',
          duration: 1000
        })
        return
      }
      if (this.listData) {
        this.$toast('加载中...')
      }
      this.get(this.approveUrl, data)
        .then(res => {
          this.$toast.clear()
          if (this.currentPage === 2) {
            this.pages = Math.ceil(res.totalCount / this.pageSize)
          }

          const d = res.rows.map(item => {
            /* eslint-disable-next-line */
            item.status = Number(item.status)
            /* eslint-disable-next-line */
            item.statusInfo = this.listState.find(x => x.status === item.status) || {}
            // 新审批 非采购员不出现 去采购 按钮
            if (item.approveType === 3 && [8, 9].includes(item.status) &&
              (this.scopeInfo && !this.scopeInfo.buyer)) {
              /* eslint-disable-next-line */
              item.statusInfo = {
                ...item.statusInfo,
                btn: ''
              }
            }
            return item
          })
          this.listData = (this.listData || []).concat(d)
          if (typeof pageCallback === 'function') {
            pageCallback(res.rows)
          }
        })
    },

    isShowBtn(item) {
      // approveType
      // 2 先下单后审批
      // 3 先审批后下单
      if (item.statusInfo.btn) {
        return (item.approveType === 2 &&
          item.statusInfo.status !== 8 &&
          item.statusInfo.status !== 9) ||
          this.currentTab === 1
      }
      return false
    },

    // 待报销的新审批
    isNewApproveNotReimbursement(item) {
      return this.scopeInfo.buyer && this.currentTab === 1 &&
        item.status === 11 && item.approveType === 3
    },

    handleBtn(item) {
      switch (Number(item.status)) {
        case 5:
          this.toPay()
          break
        case 8:
        case 9: {
          this.toPurchase(item)
          break
        }
        case 11: {
          this.toExpense(item)
          break
        }
        default:
      }
    },

    toDetail(item) {
      this.$emit('to-detail', item)
    },

    toPay() {
      this.$emit('to-pay')
    },

    toPurchase(item) {
      this.$emit('to-purchase', item)
    },

    toExpense(item) {
      const common = () => {
        this.resetPage()
        this.listData = null
        this.pages = -1
        this.doCallback(this.getList)
      }

      this.$box.confirm('请确认您的审批是否已提交报销').then(common).catch(common)
      this.$emit('to-expense', item.approveId)
    }
  }
}
</script>

<style lang="scss">
.line-1 {
  line-height: 1;
}

.tag {
  &.type {
    padding: 4px 15px;

    &.default{
      &:before{
        border-color: #ebebeb;
      }
    }
  }
}
</style>
