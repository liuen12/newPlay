import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  editableTabsValue: '1-1',
  editableTabs: [{title: '欢迎使用', name: '1-1', content: 'Advert'}],
  tabIndex: '1-1',
  isCollapse: false,
  token: '',
  isLoading: false,
  user: {},
  breadcrumb: {
    title: '',
    band: ''
  },
  agent: {},
  agentGroup: {}
}
const mutations = {
//  添加Tabs
  addTabs (state, target) {
    let hasTabs = true
    let name = target.name.slice(0, 1)
    state.editableTabs.forEach(function (o, i) {
      if (o.name === target.name) {
        hasTabs = false
//  第二次Tab
        state.editableTabsValue = target.name
        if (name === '1') {
          state.breadcrumb.band = '内容管理'
        }
        if (name === '2') {
          state.breadcrumb.band = '银证业务'
        }
        if (name === '3') {
          state.breadcrumb.band = '用户管理'
        }
        if (name === '4') {
          state.breadcrumb.band = '交易查询'
        }
        if (name === '5') {
          state.breadcrumb.band = '系统管理'
        }
        if (name === '6') {
          state.breadcrumb.band = '代理管理'
        }
        if (name === '7') {
          state.breadcrumb.band = '网站管理'
        }
        state.breadcrumb.title = target.title
      }
    })
    if (hasTabs) {
//  第一次Tab
      state.editableTabsValue = target.name
      state.tabIndex = target.name
      state.editableTabs.push(target)
      if (name === '1') {
        state.breadcrumb.band = '内容管理'
      }
      if (name === '2') {
        state.breadcrumb.title = '银证业务'
      }
      if (name === '3') {
        state.breadcrumb.title = '用户管理'
      }
      if (name === '4') {
        state.breadcrumb.title = '交易查询'
      }
      if (name === '5') {
        state.breadcrumb.title = '系统管理'
      }
      if (name === '6') {
        state.breadcrumb.title = '代理管理'
      }
      if (name === '7') {
        state.breadcrumb.title = '网站管理'
      }
      state.breadcrumb.title = target.title
    }
  },
  removeTab (state, target) {
    let tabs = state.editableTabs
    let activeName = state.editableTabsValue
    if (activeName === target) {
      tabs.forEach((tab, index) => {
        if (tab.name === target) {
          let nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }
    state.editableTabsValue = activeName
    state.editableTabs = tabs.filter(tab => tab.name !== target)
  },
  // 折叠面板
  collApse (state) {
    state.isCollapse = !state.isCollapse
  },
  setToken (state, token) {
    state.token = token
    Vue.prototype.$Token = token
  },
  setUser (state, token) {
    // encodeURI编码 encodeURI(JSON.stringify(token))
    // decodeURI解码JSON.parse(decodeURI(encodeURI(JSON.stringify(token))))
    state.user = encodeURI(JSON.stringify(token))
  },
  showMessage (state, msg) {},
  transferAgent (state, row) {
    state.agent = row
  },
//  传递对象
  addAgentGroup (state, row) {
    state.agentGroup = row
  },
//  传递对象
  setLoading (state, val) {
    state.isLoading = val
  }
}
export default new Vuex.Store({
  state, mutations
})
