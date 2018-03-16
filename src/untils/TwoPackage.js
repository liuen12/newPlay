import http from './http'
import ApiSetting from './ApiSetting'
import verify from './ElementVerify'

export default{
  install (Vue, options) {
    Vue.prototype.$http = http
    Vue.prototype.$api = ApiSetting
    Vue.prototype.$verify = verify
//  存
    Vue.prototype.setStorage = function (data, name) {
      localStorage.setItem(name, JSON.stringify(data))
    }
//  取
    Vue.prototype.getStorage = function (name) {
      let key = JSON.parse(localStorage.getItem(name))
      return key
    }
//  删
    Vue.prototype.delStorage = function (name) {
      localStorage.removeItem(name)
    }
//  时间
    Vue.prototype.formDate = function (now) {
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var date = now.getDate()
      return year + '-' + month + '-' + date
    }
//  隔行换色
    Vue.prototype.tableRowClassName = function (row, index) {
      if (index % 2 === 1) {
        return 'info-row'
      } else if (index % 2 === 0) {
        return 'positive-row'
      }
      return ''
    }
//  对比Copy 对象 o:copy的对象 j:要copy的对象
    Vue.prototype.copyObj = function (o, j) {
      for (let key in o) {
        for (let k in j) {
          if (key === k) {
            j[k] = o[key]
          }
        }
      }
      return j
    }
//  生成DialogBox所要的数据
    Vue.prototype.makeData = function (arr) {
      let arrs = []
      let formData = {}
      let data = {isType: 'input', label: '', placeholder: '', disabled: false, model: '', isSHow: true}
      arr.forEach((o, i) => {
        data.label = o.label
        data.placeholder = o.label
        data.model = o.prop
        arrs.push(JSON.parse(JSON.stringify(data)))
        formData[o.prop] = ''
      })
      return {data: arrs, formData: formData}
    }
//  判断数字是否有小数点
    Vue.prototype.isDot = function (num) {
      let result = (num.toString()).indexOf('.')
      if (result !== -1) {
      //  含有小数点
        return 1
      } else {
      //  不含小数点
        return -1
      }
    }
// 获取焦点时对数字的处理
    Vue.prototype.$focus = function (num) {
      num = num | ''
      return num.replace(/,/g, '')
    }
//  离开焦点时对数字的处理
    Vue.prototype.$blur = function (num) {
      let n = num
      let s = n.toLocaleString()
      alert(s)
    }
// 生成表格头部
    Vue.prototype.TableKey = function (arr) {
      let label = []
      let prop = []
      arr.forEach((i, o) => {
        label.push(i.label)
        if (i.isType === 'scope') {
          prop.push(i.prop)
        } else {
          prop.push(i.prop)
        }
      })
      let ars = [label, prop]
      return ars
    }
    Vue.prototype.Processing = function (data, config) {
      data.forEach((j, k) => {
        config.forEach((w, q) => {
          if (j.props === Object.keys(w)[0]) {
//            配置的key Object.keys(w[j.props])[0] disabled
//            配置的val Object.keys(w[j.props])[0] disabled
//             w[j.props][Object.keys(w[j.props])[0]]
            j[Object.keys(w[j.props])[0]] = w[j.props][Object.keys(w[j.props])[0]]
          }
        })
      })
    }
    Vue.prototype.exportExcel = function (Header, TableKey, tempData, textName) {
      require.ensure([], () => {
      //  Header 表格的头
      //  TableKey 为了取数据中key
      //  tempData 导出的数据
        const { export_json_to_excel } = require('../vendor/Export2Excel')
        const data = formatJson(TableKey, tempData)
        export_json_to_excel(Header, data, textName)
      })
    }
    Vue.prototype.removeArr = function (arr, data) {
      data.forEach((o, i) => {
        arr.forEach((j, k) => {
          if (o === j) {
            data.splice(i, 1)
          }
        })
      })
      return data
    }
  }
}

function formatJson (filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
}
