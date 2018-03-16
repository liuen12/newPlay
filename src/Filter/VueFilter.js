import Vue from 'vue'

Vue.filter('time', function (value, type) {
  var dataTime = ''
  var data = new Date()
  data.setTime(value)
  var year = data.getFullYear()
  var month = data.getMonth()
  month = month + 1
  var day = data.getDate()
  var hour = data.getHours()
  var minute = data.getMinutes()
  var second = data.getSeconds()
  if (type === 'YMD') {
    dataTime = year + '-' + month + '-' + day
  } else if (type === 'YMDHMS') {
    dataTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  } else if (type === 'HMS') {
    dataTime = hour + ':' + minute + ':' + second
  } else if (type === 'YM') {
    dataTime = year + '-' + month
  }
  return dataTime //  将格式化后的字符串输出到前端显示
})
//  处理数字 把数字每三个用‘，’隔开
Vue.filter('grouping', function (Num) {
  let n = Number(Num).toLocaleString()
  if (n.indexOf('.') === -1) {
    n += '.00'
  }
  return n
})
Vue.filter('YMR', function (time) {
  if (time) {
    return time.split(' ')[0]
  }
})
Vue.filter('per', function (data) {
  return data + '%'
})
