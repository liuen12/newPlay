const verification = {
  notEmpty: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('选项不能为空！！'))
    } else {
      callback()
    }
  },
// 登录账号验证
  checkAge: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('账号不能为空！！'))
    }
    if (Reg.regPhone.test(value)) {
      callback()
    } else {
      return callback(new Error('手机号码格式不正确！！'))
    }
  },
  resPhone: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('选项不能为空！！'))
    }
    if (Reg.regPhone.test(value)) {
      callback()
    } else {
      return callback(new Error('手机号码格式不正确！！'))
    }
  },
  checkBack: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('银行卡号不能为空！！'))
    }
    if (Reg.regBack.test(value)) {
      callback()
    } else {
      return callback(new Error('银行卡号码格式不正确！！'))
    }
  }
}
const verify = { ...verification }
export default verify

var Reg = {
  regPhone: /^1[34578][0-9]\d{8}$/,
  regBack: /\d{15}|\d{19}/
}
