<!--持仓列表DayDeal4-8-->
<template>
  <el-row>
    <SearchBox style="text-align: left"
       :searchModel="searchModel"
       :searchData="searchData"
       :searchConfig="searchConfig"
       @scoutAround="scoutAround"
       @downloadAll="downloadAll"
       @revisionPeriod="revisionPeriod"
    />
    <PublicTable
      :TableData="TableData"
      :TableLabel="TableLabel"
      @handleChange="handleChange"
    />
    <Pagination class="Pagination"
      :paginationConfig="paginationConfig"
      @currentChange="currentChange"
    />
    <DialogBox
      :dialogConfig="dialogConfig"
      :dialogForm="dialogForm"
      :dialogData="dialogData"
      @Determine="Determine"
    />
  </el-row>
</template>
<script>
  export default {
    mixins: [],
    props: ['contents'],
    data () {
      return {
//      搜索
        searchModel: {},
        searchData: [
          {isType: 'time', label: '', model: 'arrTime', placeholder: ''},
          {isType: 'input', label: '', model: 'mobile', placeholder: '手机号码'},
          {isType: 'input', label: '', model: 'ordersn', placeholder: '订单编号'},
//          {isType: 'select', label: '', model: 'd', placeholder: '审核状态', selectArr: [{label: '全部', value: ''}, {label: '未给价', value: '0'}, {label: '已给价', value: '1'}, {label: '委托中', value: '2'}, {label: '作废', value: '3'}]},
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}, {type: 'primary', evenName: 'downloadAll', evenText: '导出Excel'}, {type: 'warning', evenName: 'revisionPeriod', evenText: '修改期限'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
//          {isType: 'column', prop: 'id', label: 'ID', width: ''},
          {isType: 'selection', prop: '', label: '', width: '50'},
          {isType: 'column', prop: 'mobile', label: '账号(手机)', width: '100'},
          {isType: 'column', prop: 'xingming', label: '姓名', width: ''},
          {isType: 'column', prop: 'code', label: '标的代码', width: ''},
          {isType: 'column', prop: 'name', label: '标的名称', width: ''},
          {isType: 'money', prop: 'capital_money', label: '名义本金', width: ''},
          {isType: 'column', prop: 'mouth_config_id', label: '期限', width: ''},
          {isType: 'per', prop: 'manage_per', label: '管理费率', width: ''},
          {isType: 'column', prop: 'manage_money', label: '管理费', width: ''},
          {isType: 'column', prop: 'Initial_price', label: '期初价格', width: ''},
          {isType: 'column', prop: 'lasttime', label: '当前价格', width: ''}, // 管理费没有给
          {isType: 'column', prop: 'rose', label: '盈亏比例', width: ''},
          {isType: 'column', prop: 'yh', label: '浮动盈亏', width: ''},
//          {isType: 'column', prop: 'lasttime', label: '最新市值', width: ''},
          {isType: 'popover', prop: 'staff_id', label: '所属员工', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'staff_id', defaults: '0', popoverList: [{label: '所属员工', props: 'staff_id_name', defaults: '无'}]}},
          {isType: 'popover', prop: 'agent_id', label: '所属代理', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'agent_id', defaults: '0', popoverList: [{label: '所属代理', props: 'agent_id_name', defaults: '无'}]}},
          {isType: 'column', prop: 'money_value_date', label: '起息日', width: '90'},
          {isType: 'column', prop: 'money_expiry_date', label: '到息日', width: '90'},
          {isType: 'column', prop: 'created_at', label: '下单时间', width: '90'},
          {isType: 'column', prop: 'option_code', label: '期权编号', width: ''},
          {isType: 'column', prop: 'ordersn', label: '订单编号', width: ''}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
        //      DialogBox配置卖出操作
        dialogConfig: {
          title: '提示',
          visible: false,
          width: '30%',
          top: '2%',
          dialogLabelWidth: '80px',
          buttonArr: [
            {type: 'primary', size: 'mini', evenName: 'CloseDialog', evenText: '取 消', attr: ''},
            {type: 'primary', size: 'mini', evenName: 'Determine', evenText: '确 定', attr: ''}
          ]
        },
        dialogForm: {},
        dialogData: [
          {isType: 'input', label: '姓名', placeholder: '姓名', disabled: true, model: 'xingming'},
          {isType: 'input', label: '标的代码', placeholder: '标的代码', disabled: true, model: 'code'},
          {isType: 'input', label: '标的名称', placeholder: '标的名称', disabled: true, model: 'name'},
          {isType: 'input', label: '名义本金', placeholder: '名义本金', disabled: true, model: 'capital_money'},
          {isType: 'input', label: '期限', placeholder: '期限', disabled: true, model: 'mouth_config_id'},
          {isType: 'input', label: '期初价格', placeholder: '期初价格', disabled: true, model: 'Initial_price'},
          {isType: 'input', label: '当前价格', placeholder: '当前价格', disabled: true, model: 'manage_money'},
          {isType: 'input', label: '盈亏比例', placeholder: '盈亏比例', disabled: true, model: 'rose'},
          {isType: 'input', label: '浮动盈亏', placeholder: '浮动盈亏', disabled: true, model: 'yh'},
          {isType: 'input', label: '最新市值', placeholder: '最新市值', disabled: true, model: 'lasttime'},
          {isType: 'dateTime', label: '起息日', placeholder: '选择日期', disabled: false, model: 'money_value_date'},
          {isType: 'dateTime', label: '到息日', placeholder: '选择日期', disabled: false, model: 'money_expiry_date'}
        ],
        multipleSelection: [] // 平仓
      }
    },
    mounted () {
      this.getPositionList()
    },
    destroyed () {},
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '4-8') {
          this.getPositionList()
        }
      }
    },
    methods: {
//    搜索
      scoutAround (val) {
        if (val.arrTime) {
          val.start_time = val.arrTime[0]
          val.end_time = val.arrTime[1]
        } else {
          val.start_time = ''
          val.end_time = ''
        }
        this.getPositionList(val)
      },
//
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getPositionList(this.paginationConfig)
      },
//    持仓列表
      getPositionList (queryData, n) {
        queryData = Object.assign(this.searchModel, queryData)
        let el = this
        el.$store.commit('setLoading', true)
        el.$http(el.$api.getPositions, queryData)
          .then((res) => {
            el.$store.commit('setLoading', false)
            if (res.code === 1) {
              if (n === 'all') {
                el.listData = Object.values(res.data)
              } else {
                el.TableData = []
                el.TableData = Object.values(res.data)
              }
              el.paginationConfig.total = res.pageInfo.TotalItem
            } else if (res.code === 0) {
              el.TableData = []
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    选择做废单按钮
      handleChange (val) {
        this.multipleSelection = val
      },
//    判断选择了几个单子
      revisionPeriod () {
        let el = this
        if (el.multipleSelection.length === 0) {
          el.$message({ message: '请选择要修改的单子', type: 'warning' })
          el.dialogConfig.visible = false
          return false
        } else if (el.multipleSelection.length > 1) {
          el.$message.error('只能选择一个的操作哦！！')
          el.dialogConfig.visible = false
          return false
        } else {
          this.dialogForm = el.multipleSelection[0]
          el.dialogConfig.visible = true
        }
      },
//    修改期限
      Determine () {
        let el = this
        let queryData = {}
        queryData.id = this.multipleSelection[0].id
        queryData.money_value_date = this.multipleSelection[0].money_value_date
        queryData.money_expiry_date = this.multipleSelection[0].money_expiry_date
        el.$http(el.$api.setEditqx, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$message({ message: res.msg, type: 'success' })
              el.dialogConfig.visible = false
              el.getPositionList()
            } else {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
      downloadAll () {
        let Table = this.TableKey(this.TableLabel)
        this.exportExcel(Table[0], Table[1], this.TableData, '持仓列表')
      }
    }
  }
</script>
<style scoped>
</style>

