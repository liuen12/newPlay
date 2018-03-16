<!--收益明细明细-->
<template>
  <el-row>
<!--搜索-->
    <SearchBox style="text-align: left"
       :searchModel="searchModel"
       :searchData="searchData"
       :searchConfig="searchConfig"
       @scoutAround="scoutAround"
       @downloadAll="downloadAll"
    />
<!--Table-->
    <PublicTable
      :TableData="TableData"
      :TableLabel="TableLabel"
    />
<!--分页-->
    <Pagination class="Pagination"
        :paginationConfig="paginationConfig"
        @currentChange="currentChange"/>
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
          {isType: 'input', label: '', model: 'agent_name', placeholder: '代理商姓名'},
          {isType: 'input', label: '', model: 'staff_name', placeholder: '员工姓名'},
          {isType: 'input', label: '', model: 'ordersn', placeholder: '订单编号'},
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}, {type: 'primary', evenName: 'downloadAll', evenText: '导出Excel'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'column', prop: 'id', label: 'ID', width: '80'},
          {isType: 'column', prop: 'mobile', label: '手机号码', width: ''},
          {isType: 'column', prop: 'agent_id_name', label: '代理商名称', width: ''},
          {isType: 'column', prop: 'agent_id', label: '代理商ID', width: ''},
          {isType: 'column', prop: 'staff_id', label: '员工ID', width: ''},
          {isType: 'column', prop: 'area', label: '区域', width: ''},
          {isType: 'profit', prop: 'staff_id_name', label: '员工名称', width: ''},
          {isType: 'column', prop: 'code', label: '股票代码', width: ''},
          {isType: 'column', prop: 'ordersn', label: '订单编号', width: ''},
          {isType: 'money', prop: 'capital_money', label: '名义本金', width: ''},
          {isType: 'per', prop: 'manage_per', label: '管理费率', width: ''},
          {isType: 'number', prop: 'income', label: '收入', width: ''},
          {isType: 'number', prop: 'balance', label: '利润', width: ''},
          {isType: 'column', prop: 'orientation', label: '方向', width: ''},
          {isType: 'column', prop: 'type', label: '佣金类型', width: ''}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
        listData: []
      }
    },
    mounted () {
      this.getCommissions()
    },
    destroyed () {},
    watch: {
//      监控是否点击tabs 点击则刷新列表
      'contents': function (val) {
        if (val.active === true && val.name === '6-2') {
          this.getCommissions()
        }
      }
    },
    methods: {
      scoutAround (val) {
        if (val.arrTime) {
          val.start_time = val.arrTime[0]
          val.end_time = val.arrTime[1]
        } else {
          val.start_time = ''
          val.end_time = ''
        }
        this.getCommissions(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getCommissions(this.paginationConfig)
      },
//    获取佣金明细列表
      getCommissions (queryData, n) {
        queryData = Object.assign(this.searchModel, queryData)
        let el = this
        this.$store.commit('setLoading', true)
        el.$http(el.$api.getCommissions, queryData)
          .then((res) => {
            this.$store.commit('setLoading', false)
            if (res.code === 1) {
              if (n === 'all') {
                el.listData = Object.values(res.data)
              } else {
                el.TableData = []
                el.TableData = Object.values(res.data)
                el.paginationConfig.total = res.pageInfo.TotalItem
              }
            } else if (res.code === 0) {
              el.TableData = []
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    全部导出表格
      downloadAll () {
        let Table = this.TableKey(this.TableLabel)
        this.exportExcel(Table[0], Table[1], this.TableData, '佣金明细')
      }
    }
  }
</script>
<style scoped>
</style>
