import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import index from '@/components/index'
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import NavLeft from '@/components/Navs/NavLeft'
import NavTop from '@/components/Navs/NavTop'
import SignIn from '@/components/SignIn/signIn'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      components: {
        default: index,
        nav_top: NavTop,
        nav_left: NavLeft
      }
    },
    {
      path: '/SignIn',
      name: 'SignIn',
      components: {
        login: SignIn
      }
    }
  ]
})
