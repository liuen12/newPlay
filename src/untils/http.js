import axios from 'axios'
import qs from 'qs'
console.log('>>>>>>>>>>', process.env.BASE_URL)
axios.interceptors.request.use(config => {
  // store.commit('UPDATE_LOADING', true)
  //  显示loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})
//  接收到的数据初始化
function receiveData (obj) {
  return obj
}
//  发送的数据初始化
function sendData (obj) {
  for (let key in obj) {
    if (obj[key] === '') {
      delete obj[key]
    }
  }
  return obj || {}
}
function errorState (response) {
  // store.commit('UPDATE_LOADING',false)  //隐藏loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    console.log('错误信息但是状态吗正常')
    return response
//    如果不需要除了data之外的数据，可以直接 return response.data
  }
  // else {
  //   Vue.prototype.$msg.alert.show({
  //     title: '提示',
  //     content: '网络异常'
  //   })
  // }
}
function successState (res) {
  if (res.data.code === 101) {
    $delCookie('personal')
    alert('您的账号已在其它地点登录，如若不是本人操作请尽快修改密码！！')
    location.reload()
    return false
  }
  if (res.data.code === 0) {
    return res
  }
  if (res.data.data.admin_sid) {
    localStorage.setItem('admin_sid', res.data.data.admin_sid)
    delete res.data.data.admin_sid
  }
  if (res.data.data.token) {
    localStorage.setItem('newToken', res.data.data.token)
    delete res.data.data.token
  }
}
function getToken (token) {
  if (localStorage.getItem(token)) {
    let newToken = localStorage.getItem(token) || ''
    return newToken
  }
}
function getAdminSid (sid) {
  if (localStorage.getItem(sid)) {
    let newsid = localStorage.getItem(sid) || ''
    return newsid
  }
}
function $delCookie (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = $getCookie(name)
  if (cval !== null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}
function $getCookie (name) {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  if (arr) {
    return (arr[2])
  } else {
    return null
  }
}
const httpServer = (opts, data) => {
  let Public = {
//  公共参数
    'token': getToken('newToken'),
    'admin_sid': getAdminSid('admin_sid'),
    'ttime': new Date().getTime()
  }

  let httpDefaultOpts = {
//   http默认配置
    method: opts.method,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://q.q-q-q.cn:8005' : `http://${window.location.hostname}:8005`,
    url: opts.url,
    timeout: 10000,
    params: Object.assign(Public, sendData(data)),
    data: qs.stringify(Object.assign(Public, data)),
    headers: opts.method === 'get' ? {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    } : {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
  if (opts.method === 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }
  let promise = new Promise(function (resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        successState(res)
        resolve(receiveData(res.data))
      }
    ).catch(
      (response) => {
        errorState(response)
        reject(response)
      }
    )
  })
  return promise
}
export default httpServer
