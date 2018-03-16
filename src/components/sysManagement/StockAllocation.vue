<!--资金流水-->
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
          {isType: 'input', label: '', model: 'mobile', placeholder: '手机号码'},
//          {isType: 'input', label: '', model: 'newtype', placeholder: '订单类型'},
//          {isType: 'input', label: '', model: 'is_admin', placeholder: '资金类型'},
          {isType: 'time', label: '', model: 'arrTime', placeholder: ''},
          {isType: 'select', label: '', model: 'newtype', placeholder: '资金类型', selectArr: []},
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}, {type: 'primary', evenName: 'downloadAll', evenText: '导出Excel'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'column', prop: 'id', label: 'ID', width: ''},
          {isType: 'column', prop: 'mobile', label: '手机号码', width: ''},
          {isType: 'column', prop: 'ordersn', label: '订单编号', width: ''},
          {isType: 'scope', prop: 'is_admin', label: '是不是平台', width: '', status: [{state: 0, label: '否'}, {state: 1, label: '是'}]},
          {isType: 'column', prop: 'type', label: '类型', width: '145'},
          {isType: 'money', prop: 'balance', label: '金额', width: ''},
          {isType: 'column', prop: 'orientation', label: '方向', width: ''},
          {isType: 'column', prop: 'created_at', label: '时间', width: ''}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
        stockData: [],
        listData: [],
        journals: []
      }
    },
    mounted () {
      this.getJournalList()
      this.getJournal()
    },
    destroyed () {},
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '5-4') {
          this.getJournalList()
          this.getJournal()
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
        this.getJournalList(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getJournalList(this.paginationConfig)
      },
//    获取询价列表
      getJournalList (queryData, n) {
        queryData = Object.assign(this.searchModel, queryData)
        let el = this
        el.$store.commit('setLoading', true)
        el.$http(el.$api.getJournal, queryData)
          .then((res) => {
            el.$store.commit('setLoading', false)
            if (res.code === 1) {
              if (n === 'all') {
                el.listData = Object.values(res.data)
              } else {
                el.TableData = []
                el.TableData = Object.values(res.data)
                el.paginationConfig.total = res.pageInfo.TotalItem
              }
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    搜索时流水日志配置信息
      getJournal (queryData) {
        this.queryData = queryData || {}
        let el = this
        let attr = []
        el.$http(el.$api.getJours, queryData, 'get')
          .then((res) => {
            if (res.code === 1) {
              Object.values(res.data).forEach((j, k) => {
                j.label = j.value
                j.value = j.id
                attr.push(j)
              })
              this.searchData[2].selectArr = attr
            } else {
              el.$message.error(res.msg)
            }
          })
      },
//    全部导出表格
      downloadAll () {
        let Table = this.TableKey(this.TableLabel)
        this.exportExcel(Table[0], Table[1], this.TableData, '资金流水')
      }
    }
  }
</script>
<style scoped>
</style>
