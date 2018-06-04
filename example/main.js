import Vue from 'vue'
import { Cell, CellGroup, NavBar, Search, Icon, Dialog, Toast } from 'vant'
import App from './app.vue'
import './assets/style/demo.scss'
import './assets/iconfont/iconfont.css'
import router from './router'
import Loading from '../src/components/loading'
import Box from '../src/components/msgbox'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(Loading)
Vue.use(NavBar)
Vue.use(Search)
Vue.use(Icon)
// Vue.use(Dialog)
Vue.use(Cell).use(CellGroup)
Vue.prototype.$dialog = Dialog
Vue.prototype.$toast = Toast
Vue.prototype.$box = Box

router.afterEach((to) => {
  document.title = to.meta.title
})

/* eslint-disable no-new */
new Vue({
  el: '#app',

  render: h => h(App),

  router,

  data () {
    return {
      transitionName: 'slide-right'
    }
  },

  methods: {
    message (msg) {
      this.$toast.text(msg)
    }
  },

  watch: {
    '$route' (to, from) {
      this.transitionName = from.name === 'index' ? 'slide-left' : 'slide-right'
    }
  }
})
