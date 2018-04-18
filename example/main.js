import Vue from 'vue'
import { Cell, CellGroup, NavBar, Search, Icon, Dialog } from 'vant'
import App from './app.vue'
import './assets/style/demo.scss'
import './assets/iconfont/iconfont.css'
import router from './router'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(NavBar)
Vue.use(Search)
Vue.use(Icon)
// Vue.use(Dialog)
Vue.use(Cell).use(CellGroup)
Vue.prototype.$dialog = Dialog

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
