import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/state'
import PublcTool from './components/Public/index'
import * as VueFilter from './Filter/VueFilter'
import untils from './untils/TwoPackage'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './icon/iconfont.css'

Vue.use(untils)
Vue.use(PublcTool)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  computed: {},
  //  监听路由检查登录
  watch: {
    '$route': 'checkLogin'
  },
  created () {
    this.checkLogin()
    this.setFliter()
  },
  methods: {
    // 登录检查
    checkLogin (to, from) {
      if (to !== undefined) {
        if (to.path === '/SignIn' || false) {
          if (!this.getCookie('personal')) {
            this.$router.push('/SignIn')
          } else {
            this.$router.push(from.path)
          }
        }
      } else {
        this.$store.commit('setUser', JSON.parse(decodeURI(localStorage.getItem('user'))))
        Vue.prototype.$Token = localStorage.getItem('Token')
        this.$store.commit('setToken', localStorage.getItem('Token'))
      }
      if (!this.getCookie('personal')) {
        this.$router.push('/SignIn')
      } else {
      }
    },
    getCookie (name) {
      let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      let arr = document.cookie.match(reg)
      if (arr) {
        return unescape(arr[2])
      } else {
        return null
      }
    },
    setFliter () {
      Object.keys(VueFilter).forEach(key => {
        Vue.filter(key, VueFilter[key])
      })
    }
  },
  store
})
