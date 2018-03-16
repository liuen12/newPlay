<!--平仓操作SellList4-6-->
<template>
  <el-row>
    <SearchBox style="text-align: left"
         :searchModel="searchModel"
         :searchData="searchData"
         :searchConfig="searchConfig"
         @scoutAround="scoutAround"
         @downloadAll="downloadAll"
         @setSell="setSell"
    />
    <PublicTable
      :TableData="TableData"
      :TableLabel="TableLabel"
      @fixSell="fixSell"
      @handleReceipt="handleReceipt"
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
    @survey="survey"
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
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}, {type: 'primary', evenName: 'downloadAll', evenText: '导出Excel'}, {type: 'primary', evenName: 'setSell', evenText: '平仓驳回'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'selection', prop: '', label: '', width: '40'},
          {isType: 'column', prop: 'mobile', label: '手机号码', width: '100'},
          {isType: 'column', prop: 'xingming', label: '姓名', width: ''},
          {isType: 'column', prop: 'code', label: '标的代码', width: ''},
          {isType: 'column', prop: 'name', label: '标的名称', width: ''},
          {isType: 'money', prop: 'capital_money', label: '名义本金', width: ''},
          {isType: 'column', prop: 'mouth_config_id', label: '期限', width: ''},
          {isType: 'per', prop: 'manage_per', label: '管理费率', width: ''},
          {isType: 'column', prop: 'manage_money', label: '管理费', width: ''},
          {isType: 'column', prop: 'Initial_price', label: '期初价格', width: ''},
          {isType: 'column', prop: 'lasttime', label: '当前价格', width: ''},
          {isType: 'column', prop: 'rose', label: '盈亏比例', width: ''},
          {isType: 'column', prop: 'yh', label: '浮动盈亏', width: '120'},
          {isType: 'popover', prop: 'staff_id', label: '所属员工', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'staff_id', defaults: '0', popoverList: [{label: '所属员工', props: 'staff_id_name', defaults: '无'}]}},
          {isType: 'popover', prop: 'agent_id', label: '所属代理', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'agent_id', defaults: '0', popoverList: [{label: '所属代理', props: 'agent_id_name', defaults: '无'}]}},
          {isType: 'number', prop: 'buy_time', label: '下单时间', width: '95'},
          {isType: 'button', prop: '', label: '操作', width: '100', btnArr: [{size: 'mini', type: 'text', label: '确认平仓', evenName: 'fixSell', attr: '', isShow: 'is_sell_status', status: 1}, {size: 'mini', type: 'text', label: '平仓回执', evenName: 'handleReceipt', attr: '', isShow: 'is_sell_status', status: 2}]},
          {isType: 'number', prop: 'option_code', label: '期权编号', width: ''},
          {isType: 'number', prop: 'ordersn', label: '订单编号', width: ''}
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
          {isType: 'input', label: '行权价格', placeholder: '行权价格', disabled: false, model: 'exercise_price'},
          {isType: 'input', label: '行权金额', placeholder: '行权金额', disabled: false, model: 'all_price'}
        ],
        multipleSelection: []
      }
    },
    mounted () {
      this.getPingList()
    },
    destroyed () {},
    watch: {
      'contents' (val) {
        if (val.active === true && val.name === '4-6') {
          this.getPingList()
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
        this.getPingList(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getPingList(this.paginationConfig)
      },
//    平仓列表
      getPingList (queryData, n) {
        queryData = Object.assign(this.searchModel, queryData)
        let el = this
        el.$store.commit('setLoading', true)
        el.$http(el.$api.getPing, queryData)
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
      handleReceipt (val) {
        this.dialogForm = val
        this.dialogConfig.visible = true
      },
//    选择修改信息
      handleChange (val) {
        if (val.length !== 0) {
          val[0].order_id = val[0].id
          val[0].user_id = val[0].user_id
        }
        this.multipleSelection = val
      },
//    判断选择了几个客户
      setSell () {
        let el = this
        let row = el.multipleSelection[0]
        if (el.multipleSelection.length === 0) {
          el.$message({ message: '请选择要修改的订单', type: 'warning' })
          return false
        } else if (el.multipleSelection.length > 1) {
          el.$message.error('修改订单只能选择一个的操作哦！！')
          return false
        } else {
          this.$confirm('驳回不能撤回, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.eveningUp(row)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        }
      },
//    确定卖出
      fixSell (row) {
        let el = this
        let queryData = {}
        queryData.id = row.id
        el.$http(el.$api.fixSell, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$message({ message: res.msg, type: 'success' })
              el.getPingList()
            } else if (res.code === '') {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
      eveningUp (row) {
        let el = this
        let queryData = {}
        queryData.id = row.id
        el.$http(el.$api.sellBohui, queryData)
          .then((res) => {
            if (res.code === 1) {
//              this.dialogConfig.visible = false
              el.$message({ message: res.msg, type: 'success' })
              el.dialogSell = false
            } else {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    卖出回执
      Determine (val) {
        let el = this
        let queryData = val
        el.$http(el.$api.sellReceipt, queryData)
          .then((res) => {
            if (res.code === 1) {
              this.dialogConfig.visible = false
              el.$message({ message: res.msg, type: 'success' })
              el.getPingList()
              el.dialogSell = false
            } else if (res.code === '') {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
      survey (val, oldVal) {
        val.all_price = (parseFloat(val.capital_money) / parseFloat(val.Initial_price) * parseFloat(val.exercise_price)).toFixed(2)
      },
//    全部导出表格
      downloadAll () {
        let Table = this.TableKey(this.TableLabel)
        this.exportExcel(Table[0], Table[1], this.TableData, '平仓操作')
      }
    }
  }
</script>
<style scoped>
</style>

