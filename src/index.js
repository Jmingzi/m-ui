// This file is auto gererated by build/bin/build-entry.js
// import 'weui/dist/style/weui.min.css'
// import '../src/style/component.scss'
import AddressSelect from './components/address-select'
import ApproveSelect from './components/approve-select'
import ApproveSelect2 from './components/approve-select-2'
import Avatar from './components/avatar'
import BottomTab from './components/bottom-tab'
import BottomTabItem from './components/bottom-tab-item'
import Cell from './components/cell'
import Checkbox from './components/checkbox'
import CitySelect from './components/city-select'
import CitySelectItem from './components/city-select-item'
import CommonSelect from './components/common-select'
import ConfirmModules from './components/confirm-modules'
import DatePicker from './components/date-picker'
import Empty from './components/empty'
import Esc from './components/esc'
import Feedback from './components/feedback'
import GoodsCard from './components/goods-card'
import GoodsCardGroup from './components/goods-card-group'
import HitDot from './components/hit-dot'
import Http from './components/http'
import LazyImg from './components/lazy-img'
import Loading from './components/loading'
import MInput from './components/m-input'
import Mask from './components/mask'
import Message from './components/message'
import Msgbox from './components/msgbox'
import MsgboxStyle from './components/msgbox-style'
import NumComputer from './components/num-computer'
import Popup from './components/popup'
import PopupSide from './components/popup-side'
import Search from './components/search'
import SubmitBar from './components/submit-bar'
import Switch from './components/switch'
import Tab from './components/tab'
import Tag from './components/tag'
import TagSelect from './components/tag-select'
import Toast from './components/toast'
import TravelPanel from './components/travel-panel'
import UserPanel from './components/user-panel'

const version = '1.0.85'
const components = [
  AddressSelect,
  ApproveSelect,
  ApproveSelect2,
  Avatar,
  BottomTab,
  BottomTabItem,
  Cell,
  Checkbox,
  CitySelect,
  CitySelectItem,
  CommonSelect,
  ConfirmModules,
  DatePicker,
  Empty,
  Esc,
  Feedback,
  GoodsCard,
  GoodsCardGroup,
  HitDot,
  Http,
  LazyImg,
  Loading,
  MInput,
  Mask,
  Message,
  Msgbox,
  MsgboxStyle,
  NumComputer,
  Popup,
  PopupSide,
  Search,
  SubmitBar,
  Switch,
  Tab,
  Tag,
  TagSelect,
  Toast,
  TravelPanel,
  UserPanel
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
