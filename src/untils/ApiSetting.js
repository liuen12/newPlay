const serviceModule = {
//  登陆接口
  login: {
    url: 'out/adminusers/login',
    method: 'get'
  },
//  获取用户信息
  getUserList: {
    url: 'users',
    method: 'get'
  },
//  后台询价记录
  getAenquiry: {
    url: 'aenquiry',
    method: 'get'
  },
//  回执确认
  setConfirmstatus: {
    url: 'admin/aenquiry/confirmstatus',
    method: 'post'
  },
//  获取协议列表
  getProtoco: {
    url: 'admin/protoco/index2',
    method: 'get'
  },
  //  获取银行卡列表 和
  getBanks: {
    url: 'bank',
    method: 'get'
  },
//  添加银行卡
  addBanks: {
    url: 'bank',
    method: 'post'
  },
//  获取银行卡
  getConfigBanks: {
    url: 'admin/comm/get_banks',
    method: 'get'
  },
//  获取流水日志配置信息
  getJours: {
    url: 'admin/comm/get_jours',
    method: 'get'
  },
//  获取订单列表
  getOrderList: {
    url: 'orderdetails',
    method: 'get'
  },
//  获取流水日志
  getAcclogs: {
    url: 'acclogs',
    method: 'get'
  },
//  获取流水日志
  getJournal: {
    url: 'journal',
    method: 'get'
  },
// 上报券商
  setAudit: {
    url: 'admin/order_details/audit',
    method: 'get'
  },
// 上报券商
  setDelegation: {
    url: 'admin/order_details/delegation',
    method: 'get'
  },
//  确定卖出
  fixSell: {
    url: 'admin/order_details/abolish',
    method: 'post'
  },
//  卖出回执
  sellReceipt: {
    url: 'admin/order_details/selllast',
    method: 'post'
  },
//  卖出回执
  selllastTime: {
    url: 'admin/order_details/selllasttime',
    method: 'post'
  },
//  卖出驳回
  sellBohui: {
    url: 'admin/order_details/bohui',
    method: 'post'
  },
//  用户出入金
  getRecharge: {
    url: 'recharge',
    method: 'get'
  },
//  添加用户
  addUser: {
    url: 'users',
    method: 'post'
  },
//  获取银行列表
  getBankList: {
    url: 'admin/users/banklist',
    method: 'get'
  },
//  用户充值
  setRecharge: {
    url: 'admin/users/recharge',
    method: 'post'
  },
//  确认充值
  onfirmRechargec: {
    url: 'admin/recharge/changestatus',
    method: 'post'
  },
//  驳回充值
  onfirmReject: {
    url: 'admin/recharge/reject',
    method: 'post'
  },
// 获取本地json数据
  getJson: {
    url: 'out/users/jsons',
    method: 'get'
  },
// 获取实名认证的信息
  getIdCards: {
    url: 'admin/users/idcards',
    method: 'get'
  },
// 修改个人信息(实名认证 通过)
  setBasic: {
    url: 'admin/users/basic',
    method: 'post'
  },
// 修改个人信息(实名认证 未通过)
  setBasicFail: {
    url: 'admin/users/basicfail',
    method: 'post'
  },
//  用户操作日志logs
  getLogs: {
    url: 'logs',
    method: 'get'
  },
//  用户提现确认
  getChangetx: {
    url: 'admin/recharge/changetx',
    method: 'get'
  },
//  用户提现确认
  getRejectx: {
    url: 'admin/recharge/reject',
    method: 'get'
  },
  getAbolish: {
    url: 'admin/order_details/revokeapply',
    method: 'post'
  },
//  获取代理列表
  getAgent: {
    url: 'agent',
    method: 'get'
  },
//  获取代理分类
  getbBeLong: {
    url: 'admin/agent/tree',
    method: 'get'
  },
//  添加代理商
  addAgent: {
    url: 'agent',
    method: 'post'
  },
//  修改代理商
  setAgent: {
    url: 'admin/agent/editdaili',
    method: 'post'
  },
// 修改代理信息
  modifyAgent: {
    url: 'agent',
    method: 'post'
  },
// 获取员工列表
  getModify: {
    url: 'staff',
    method: 'get'
  },
// 添加员工
  addModify: {
    url: 'staff',
    method: 'post'
  },
// 显示员工组信息
  getRolepower: {
    url: 'admin/role/rolepower',
    method: 'post'
  },
// 修改员工信息
  setModify: {
    url: 'admin/staff/editdaili',
    method: 'post'
  },
//  获取角色列表role
  getRole: {
    url: 'role',
    method: 'get'
  },
//  管理员权限树获取
  getPrivilege: {
    url: 'privilege',
    method: 'get'
  },
//  显示层权限
  getPrivilegeShow: {
    url: 'admin/privilege/show',
    method: 'get'
  },
//  修改权限
  setEditpower: {
    url: 'admin/role/editpower',
    method: 'post'
  },
//  获取推广列表
  getGeneralize: {
    url: 'generalize',
    method: 'get'
  },
// 获取侧导航
  getSideLeft: {
    url: 'admin/privilege/listpri',
    method: 'get'
  },
//  添加角色
  addRole: {
    url: 'role',
    method: 'post'
  },
  getCommissions: {
    url: 'commission',
    method: 'get'
  },
  rechargeMoney: {
    url: 'admin/recharge/agentrecharge',
    method: 'get'
  },
// statistics
  getStatistics: {
    url: 'statistics',
    method: 'get'
  },
//  佣金提现
  getCommission: {
    url: 'admin/recharge/agentwithdraw',
    method: 'post'
  },
//  内容管理
//  获取协议
  getProtocol: {
    url: 'protoco',
    method: 'get'
  },
//  添加协议
  addProtocol: {
    url: 'protoco',
    method: 'post'
  },
//  更新协议
  updateProtocol: {
    url: 'admin/protoco/updateit',
    method: 'post'
  },
//  删除协议
  delProtocol: {
    url: 'admin/protoco/del',
    method: 'post'
  },
//  获取广告ad
  getAd: {
    url: 'ad',
    method: 'get'
  },
//  添加广告
  addAd: {
    url: 'ad',
    method: 'post'
  },
//  更新广告
  updateAd: {
    url: 'admin/Advertising/updateit',
    method: 'post'
  },
//  删除广告
  delAd: {
    url: 'admin/Advertising/del',
    method: 'post'
  },
//  获取答题列表timu
  getTimu: {
    url: 'timu',
    method: 'get'
  },
//  更新答题列表
  updateTimu: {
    url: 'admin/timu/updateit',
    method: 'post'
  },
  //  获取资讯
  getInformation: {
    url: 'information',
    method: 'get'
  },
//  添加资讯
  addInformation: {
    url: 'information',
    method: 'post'
  },
//  更新资讯
  updateInformation: {
    url: 'admin/information/updateit',
    method: 'post'
  },
//  删除资讯
  delInformation: {
    url: 'admin/information/del',
    method: 'post'
  },
//  修改密码
  setPwd: {
    url: 'admin/staff/editpswd',
    method: 'post'
  },
// 获取配置交易
  getConfig: {
    url: 'configs',
    method: 'get'
  },
// 配置交易
  setConfig: {
    url: 'admin/configs/updateit',
    method: 'post'
  },
//  获取站点配置
  getSite: {
    url: 'site',
    method: 'get'
  },
//  站点配置
  setSite: {
    url: 'site',
    method: 'post'
  },
//  第三方支付设置
  setPayment: {
    url: 'payment',
    method: 'post'
  },
//  获取第三方支付设置
  getPayment: {
    url: 'payment',
    method: 'get'
  },
  //  获取第三方短信设置
  getSMS: {
    url: 'sms',
    method: 'get'
  },
//  短信列表
  SmsList: {
    url: 'sendlog',
    method: 'get'
  },
//  删除权限组角色
  delRole: {
    url: 'admin/role/del',
    method: 'post'
  },
  //  删除权限组角色
  getUsers: {
    url: 'out/users/get_site',
    method: 'post'
  },
//  删除权限组角色
  getCapital: {
    url: 'plats',
    method: 'get'
  },
//  修改用户归属
  getChange: {
    url: 'admin/users/change',
    method: 'post'
  },
//  修改用户归属
  getDisorder: {
    url: 'admin/information/disorder',
    method: 'get'
  },
//  修改用户归属
  upImage: {
    url: 'image',
    method: 'post'
  },
  //  获取实时消息
  getSysmessage: {
    url: 'sysmessage',
    method: 'get'
  },
  //  获取消息
  getSmg: {
    url: 'admin/message/imessage',
    method: 'get'
  },
//  获取历史消息
  getHis: {
    url: 'admin/message/his',
    method: 'get'
  },
  //  获取未读消息
  getRead: {
    url: 'admin/message/getread',
    method: 'get'
  },
//  获取消息数量
  getMessageNum: {
    url: 'admin/message/messagenum',
    method: 'get'
  },
//  2018-1-11
//  下载模板
  downTomplate: {
    url: '',
    method: 'get'
  },
//  修改期初价
  setChangebeginning: {
    url: 'admin/order_details/changebeginning',
    method: 'post'
  },
//  修改期初价
  getCodeList: {
    url: 'offer',
    method: 'get'
  },
//  获取代理权限分组
  getGetauthlist: {
    url: 'admin/agent/getauthlist',
    method: 'get'
  },
// PC站点配置
  getPosition: {
    url: 'position',
    method: 'get'
  },
// 增加PC站点配置
  setPosition: {
    url: 'position',
    method: 'post'
  },
// 获取详情
  getPcsite: {
    url: 'pcsite',
    method: 'get'
  },
// 添加获取详情
  setPcsite: {
    url: 'pcsite',
    method: 'post'
  },
// 修改详情
  upPcsite: {
    url: 'admin/pcsite/up',
    method: 'post'
  },
// 修改賺點配置
  upPosition: {
    url: 'admin/position/up',
    method: 'post'
  },
// 修改賺點配置
  getHelp: {
    url: 'help',
    method: 'get'
  },
// 修改賺點配置
  setHelp: {
    url: 'help',
    method: 'post'
  },
// 修改賺點配置
  uptHelp: {
    url: 'admin/help/up',
    method: 'get'
  },
// 修改賺點配置
  delHelp: {
    url: 'admin/help/del',
    method: 'post'
  },
// 禁用用户
  getDisenable: {
    url: 'admin/users/disenable',
    method: 'get'
  },
// 平仓列表
  getPing: {
    url: 'admin/order_details/ping',
    method: 'get'
  },
// 持仓列表
  getPositions: {
    url: 'admin/order_details/position',
    method: 'get'
  },
// 所有询价记录
  getSucceed: {
    url: 'admin/aenquiry/succeed',
    method: 'get'
  },
// 所有交易记录
  getTransaction: {
    url: 'admin/order_details/transaction',
    method: 'get'
  },
// 所有废单记录
  getWaste: {
    url: 'admin/order_details/waste',
    method: 'get'
  },
// 所有废单记录
  setChange: {
    url: 'admin/users/changestate',
    method: 'get'
  },
// 添加标的
  setOffer: {
    url: 'offer',
    method: 'post'
  },
// 修改标的
  upCode: {
    url: 'admin/offer/upcode',
    method: 'post'
  },
// 修改银行卡
  upBank: {
    url: 'admin/bank/upbank',
    method: 'post'
  },
// 修改标的
  upload: {
    url: 'admin/image/upload',
    method: 'post'
  },
// 修改标的
  upUser: {
    url: 'admin/users/cinfo',
    method: 'post'
  },
// 三方代付
  payfor: {
    url: 'payfor',
    method: 'post'
  },
// 要平仓列表
  getLiquidated: {
    url: 'admin/order_details/liquidated',
    method: 'get'
  },
// 要平仓列表
  setEditqx: {
    url: 'admin/order_details/editqx',
    method: 'post'
  },
// 获取管理员列表
  getAdminList: {
    url: 'admin',
    method: 'get'
  },
// 添加管理员
  pAdminList: {
    url: 'admin',
    method: 'post'
  },
// 更新管理员
  upAdminList: {
    url: 'admin/admin/edits',
    method: 'post'
  },
// 更新管理员
  setReview: {
    url: '/admin/users/review',
    method: 'post'
  }
}
const ApiSetting = { ...serviceModule }

export default ApiSetting
