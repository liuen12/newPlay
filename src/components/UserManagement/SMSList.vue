<!--短信记录-->
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
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}, {type: 'primary', evenName: 'downloadAll', evenText: '导出Excel'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'column', prop: 'phone', label: '手机', width: '100'},
          {isType: 'scope', prop: 'user_type', label: '用户类型', width: '', status: [{state: 1, label: '后台', color: ''}, {state: 2, label: '后台', color: ''}, {state: 3, label: '后台', color: ''}, {state: 4, label: '前台', color: ''}, {state: 5, label: '前台', color: ''}, {state: 6, label: '前台', color: ''}]},
          {isType: 'column', prop: 'content', label: '发送内容', width: ''}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        }
      }
    },
    mounted () {
      this.getSMSList()
    },
    destroyed () {},
    watch: {
//      监控是否点击tabs 点击则刷新列表
      'contents': function (val) {
        if (val.active === true && val.name === '5-6') {
          this.getSMSList()
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
        this.getSMSList(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getSMSList(this.paginationConfig)
      },
      getSMSList (queryData) {
        this.queryData = Object.assign(this.searchModel, queryData)
        let el = this
        el.$store.commit('setLoading', true)
        el.$http(el.$api.SmsList, queryData)
          .then((res) => {
            el.$store.commit('setLoading', false)
            if (res.code === 1) {
              el.TableData = []
              el.TableData = res.data.res
              el.paginationConfig.total = res.pageInfo.TotalItem || 1
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
        this.exportExcel(Table[0], Table[1], this.TableData, '短信记录')
      }
    }
  }
</script>
<style scoped>
</style>
