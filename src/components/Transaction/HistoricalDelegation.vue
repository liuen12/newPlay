<!--交易记录4-2HistoricalDelegation-->
<template>
  <el-row>
    <SearchBox style="text-align: left"
       :searchModel="searchModel"
       :searchData="searchData"
       :searchConfig="searchConfig"
       @scoutAround="scoutAround"
       @downloadAll="downloadAll"
    />
    <PublicTable
      :TableData="TableData"
      :TableLabel="TableLabel"
      @tableRowClassName="tableRowClassName"
    />
    <Pagination class="Pagination"
        :paginationConfig="paginationConfig"
        @currentChange="currentChange"
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
          {isType: 'input', label: '', model: 'option_code', placeholder: '期权编号'},
          {isType: 'select', label: '', model: 'direction', placeholder: '买卖状态', selectArr: [{label: '买入', value: '1'}, {label: '卖出', value: '0'}]},
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}, {type: 'primary', evenName: 'downloadAll', evenText: '导出Excel'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
//         user_id"=>$orderDe['user_id']
          {isType: 'column', prop: 'mobile', label: '手机号码', width: '100'},
          {isType: 'column', prop: 'user_name', label: '姓名', width: '80'},
          {isType: 'column', prop: 'code', label: '标的代码', width: ''},
          {isType: 'column', prop: 'code_name', label: '标的名称', width: ''},
          {isType: 'money', prop: 'capital_money', label: '名义本金', width: ''},
          {isType: 'column', prop: 'mouth', label: '期限', width: ''},
          {isType: 'per', prop: 'manage_per', label: '管理费率', width: ''},
          {isType: 'money', prop: 'manage_money', label: '管理费', width: ''},
          {isType: 'money', prop: 'transaction_price', label: '成交价格', width: ''},
          {isType: 'money', prop: 'transaction_money', label: '成交金额', width: ''},
          {isType: 'money', prop: 'wax', label: '盈亏金额', width: ''},
          {isType: 'scope', prop: 'direction', label: '买卖标志', width: '', status: [{state: 0, label: '卖出', color: '#e6a23c'}, {state: 1, label: '买入', color: '#67c23a'}]},
          {isType: 'popover', prop: 'staff_id', label: '所属员工', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'staff_id', defaults: '0', popoverList: [{label: '所属员工', props: 'staff_id_name', defaults: '无'}]}},
          {isType: 'popover', prop: 'agent_id', label: '所属代理', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'agent_id', defaults: '0', popoverList: [{label: '所属代理', props: 'agent_id_name', defaults: '无'}]}},
//          {isType: 'scope', prop: 'status', label: '状态', width: '', status: [{state: 0, label: '待确认', color: '#e6a23c'}, {state: 1, label: '待回复', color: '#67c23a'}, {state: 2, label: '持仓中', color: '#409eff'}, {state: 3, label: '已开仓', color: '#909399'}, {state: 4, label: '废单', color: '#909399'}]},
          {isType: 'column', prop: 'created_at', label: '成交时间', width: '90'},
          {isType: 'column', prop: 'option_code', label: '期权编号', width: '90'},
          {isType: 'column', prop: 'ordersn', label: '订单编号', width: ''}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        }
      }
    },
    mounted () {
      this.getTransactionList()
    },
    destroyed () {},
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '4-2') {
          this.getTransactionList()
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
        this.getTransactionList(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getTransactionList(this.paginationConfig)
      },
//    自动询价
      getTransactionList (queryData, n) {
        queryData = Object.assign(this.searchModel, queryData)
        let el = this
        el.$store.commit('setLoading', true)
        el.$http(el.$api.getTransaction, queryData)
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
      tableRowClassName (row) {
        if (row.direction === 1) {
          return 'el-sell1'
        } else if (row.direction === 2) {
          return 'el-sell2'
        }
      },
      downloadAll () {
        let Table = this.TableKey(this.TableLabel)
        this.exportExcel(Table[0], Table[1], this.TableData, '交易记录')
      }
    }
  }
</script>
<style scoped>
  .el-sell1{
    background: #a71d5d;
  }
  .el-sell2{
    background: #df5000;
  }
</style>
