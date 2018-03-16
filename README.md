# s

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

****************************************************************************************************

## Public => PublicTable  全局Table
  isType = selection 选择框
  isType = column 正常的
  isType = defaults 带有默认值的
  isType = html 渲染带有html的字符串
  isType = number 渲染日期的
  isType = per 渲染数字解加‘%’的
  isType = money 渲染钱的保留两位小数
  isType = scope 渲染带有状态的字段
  isType = profit 角色列表里独有的 不显示‘系统管理员’的操作按钮
  isType = popover 带有弹出框的表格
  isType = button 按钮 接收一个数组
  isType = image 现推广二维码独有 展示图片
  isType = autoSort 表格数据里可以调节排序
  eg:   用戶列表
            {isType: 'selection', prop: '', label: '', width: '40'},
            {isType: 'column', prop: 'mobile', label: '账号（手机）', width: '100'},
            {isType: 'column', prop: 'user_name', label: '姓名', width: '90'},
            {isType: 'money', prop: 'balance', label: '用户余额', width: '130'},
            {isType: 'money', prop: 'money', label: '可用资金', width: ''},
            {isType: 'money', prop: 'advisable', label: '可取资金', width: ''},
            {isType: 'money', prop: 'freeze', label: '冻结资金', width: ''},
            {isType: 'column', prop: 'lasttime', label: '股票市值', width: ''}, // 没有做
            {isType: 'column', prop: 'yh', label: '盈亏金额', width: ''}, // 没有做
            {isType: 'column', prop: 'resiger_time', label: '注册时间', width: '90'},
            {isType: 'scope', prop: 'iv_status', label: '实名状态', width: '', status: [{state: 0, label: '待认证', color: '#ff6666'}, {state: 1, label: '已通过', color: '#6699cc'}, {state: 2, label: '未通过', color: '#b0b0b0'}]},
            {isType: 'popover', prop: 'state', label: '账号状态', width: '', popover: {isButConfig: {isButton: true, isStatu: 'popTag', props: 'state', cancel: '取消', mine: '确定'}, popoverList: [{label: '操作', props: '', defaults: '是否禁用用户？'}], statuList: [{state: 0, label: '正常', color: '#6699cc'}, {state: 1, label: '禁用', color: '#b0b0b0'}]}},
            {isType: 'popover', prop: 'staff_id', label: '所属员工', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'staff_id', defaults: '0', popoverList: [{label: '所属员工', props: 'staff_id_name', defaults: '无'}]}},
            {isType: 'popover', prop: 'agent_id', label: '所属代理', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'agent_id', defaults: '0', popoverList: [{label: '所属代理', props: 'agent_id_name', defaults: '无'}]}},
            {isType: 'button', prop: '', label: '操作', width: '270', btnArr: [{size: 'mini', type: 'text', label: '手动转账', evenName: 'handleClick', attr: 'a'}, {size: 'mini', type: 'text', label: '修改归属', evenName: 'handleClick', attr: 't'}, {size: 'mini', type: 'text', label: '信息审核', evenName: 'handleClick', attr: 'c', isShow: 2, prop: 'iv_status'}, {size: 'mini', type: 'text', label: '添加银行卡', evenName: 'handleClick', attr: 'd'}]}

## Public => SearchBox  全局搜索框
  isType = input 输入框
  isType = select 选择框
  isType = time 时间选择框
  isType = button 按钮 接收一个数组

  eg:   用戶列表
          {isType: 'button', label: '', model: '', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'addUserClick', evenText: '添加用户'}]},
          {isType: 'time', label: '', model: 'arrTime', placeholder: ''},
          {isType: 'input', label: '', model: 'staff_id', placeholder: '员工ID'},
          {isType: 'input', label: '', model: 'agent_id', placeholder: '代理商ID'},
          {isType: 'input', label: '', model: 'mobile', placeholder: '手机号码'},
          {isType: 'input', label: '', model: 'user_name', placeholder: '姓名'},
          {isType: 'select', label: '', model: 'status', placeholder: '实名状态', selectArr: [{label: '全部状态', value: ''}, {label: '已实名', value: '1'}, {label: '待认证', value: '0'}]},
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}, {type: 'primary', evenName: 'downloadAll', evenText: '导出Excel'}, {type: 'primary', evenName: 'setModify', evenText: '修改用户信息'}]}

## Public => PopoverBox  表格内弹出框

## Public => Pagination  分页

  eg:   用戶列表
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        }

## Public => DialogBox  彈出框
  eg:   银行卡列表
        TableLabel: [
          {isType: 'column', prop: 'id', label: '账户ID', width: '90'},
          {isType: 'column', prop: 'mobile', label: '账户手机', width: ''},
          {isType: 'column', prop: 'account_name', label: '开户名', width: ''},
          {isType: 'column', prop: 'bank_config_namer', label: '开户行', width: ''},
          {isType: 'column', prop: 'bank_name', label: '开户分行', width: ''},
          {isType: 'column', prop: 'bank_no', label: '银行卡号', width: ''},
          {isType: 'button', prop: '', label: '操作', width: '', btnArr: [{size: 'mini', type: 'text', label: '修改', evenName: 'handleClick', attr: ''}]}
        ],

****************************************************************

vendor    富文本编辑插件

untils => axios配置文件 api我文件 全局函数  正则

Filter => 过滤器

icon => 第三方图标库
