// This file is auto gererated by build/bin/build-entry.js
// import 'weui/dist/style/weui.min.css'
// import '../src/style/component.scss'
import AddressSelect from './components/address-select'
import ApproveSelect from './components/approve-select'
import ApproveSelect2 from './components/approve-select-2'
import Avatar from './components/avatar'
import BackTop from './components/back-top'
import BottomTab from './components/bottom-tab'
import BottomTabItem from './components/bottom-tab-item'
import Cell from './components/cell'
import Checkbox from './components/checkbox'
import CitySelect from './components/city-select'
import CitySelectItem from './components/city-select-item'
import CommonSelect from './components/common-select'
import ConfirmModules from './components/confirm-modules'
import Coupon from './components/coupon'
import DatePicker from './components/date-picker'
import DetailTitleBar from './components/detail-title-bar'
import Empty from './components/empty'
import Esc from './components/esc'
import Feedback from './components/feedback'
import GoodsCard from './components/goods-card'
import GoodsCardGroup from './components/goods-card-group'
import HitDot from './components/hit-dot'
import Http from './components/http'
import InfiniteScroll from './components/infinite-scroll'
import LazyImg from './components/lazy-img'
import Loading from './components/loading'
import MInput from './components/m-input'
import Mask from './components/mask'
import Message from './components/message'
import Msgbox from './components/msgbox'
import MsgboxStyle from './components/msgbox-style'
import NumComputer from './components/num-computer'
import OverStand from './components/over-stand'
import Popup from './components/popup'
import PopupSide from './components/popup-side'
import Search from './components/search'
import Sentry from './components/sentry'
import ShopBar from './components/shop-bar'
import Sku from './components/sku'
import SubmitBar from './components/submit-bar'
import SuspendedNav from './components/suspended-nav'
import Switch from './components/switch'
import Tab from './components/tab'
import Tag from './components/tag'
import TagSelect from './components/tag-select'
import Toast from './components/toast'
import TravelPanel from './components/travel-panel'
import UserPanel from './components/user-panel'
import WelfareInput from './components/welfare-input'
import WordLine from './components/word-line'

const version = '2.0.48'
const components = [
  AddressSelect,
  ApproveSelect,
  ApproveSelect2,
  Avatar,
  BackTop,
  BottomTab,
  BottomTabItem,
  Cell,
  Checkbox,
  CitySelect,
  CitySelectItem,
  CommonSelect,
  ConfirmModules,
  Coupon,
  DatePicker,
  DetailTitleBar,
  Empty,
  Esc,
  Feedback,
  GoodsCard,
  GoodsCardGroup,
  HitDot,
  Http,
  InfiniteScroll,
  LazyImg,
  Loading,
  MInput,
  Mask,
  Message,
  Msgbox,
  MsgboxStyle,
  NumComputer,
  OverStand,
  Popup,
  PopupSide,
  Search,
  Sentry,
  ShopBar,
  Sku,
  SubmitBar,
  SuspendedNav,
  Switch,
  Tab,
  Tag,
  TagSelect,
  Toast,
  TravelPanel,
  UserPanel,
  WelfareInput,
  WordLine
]

const install = (Vue, config = {}) => {
  components.forEach(Component => {
    Vue.use(Component)
  })

  // Vue.use(InfiniteScroll)
  // Vue.use(Lazyload, {
  //  loading: require('./assets/loading-spin.svg'),
  //  attempt: 3,
  //  ...config.lazyload
  // })

  // Vue.$dialog = Vue.prototype.$dialog = Dialog
  // Vue.$toast = Vue.prototype.$toast = Toast
  // Vue.$toptips = Vue.prototype.$toptips = TopTips
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  version
}

export default {
  install,
  version
}
