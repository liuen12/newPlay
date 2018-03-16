<!--操作日志-->
<template>
  <el-row>
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
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'column', prop: 'id', label: 'ID', width: ''},
          {isType: 'column', prop: 'action_ip', label: '操作ip', width: ''},
          {isType: 'column', prop: 'user_name', label: '操作人', width: ''},
          {isType: 'column', prop: 'code', label: '操作状态', width: '', status: [{state: 0, label: 'qwe'}, {state: 1, label: 'qwe1'}, {state: 2, label: 'qwe2'}]},
          {isType: 'column', prop: 'name', label: '动作名称', width: '145'},
          {isType: 'column', prop: 'action', label: '动作路径', width: ''},
//          {isType: 'column', prop: 'content', label: '操作内容', width: ''},
          {isType: 'column', prop: 'msg', label: '返回消息', width: ''},
          {isType: 'column', prop: 'created_at', label: '操作时间', width: ''}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
        LogsData: []
      }
    },
    mounted () {
      this.getLogsList()
    },
    destroyed () {},
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '5-2') {
          this.getLogsList()
        }
      }
    },
    methods: {
      search (val) {
        this.getLogsList(val)
      },
      currentChange (val) {
        this.paginationConfig.page = val
        this.getLogsList(this.paginationConfig)
      },
//      获取询价列表
      getLogsList (queryData) {
        this.queryData = queryData || {}
        let el = this
        el.$store.commit('setLoading', true)
        el.$http(el.$api.getLogs, queryData, 'get')
          .then((res) => {
            el.$store.commit('setLoading', false)
            if (res.code === 1) {
              el.TableData = []
              el.TableData = Object.values(res.data)
              el.paginationConfig.total = res.pageInfo.TotalItem
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
</script>
<style scoped>
</style>
