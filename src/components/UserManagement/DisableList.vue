<!--禁用账户2-4-->
<template>
  <el-row>
    <!--搜索-->
    <SearchBox style="text-align: left"
       :searchModel="searchModel"
       :searchData="searchData"
       :searchConfig="searchConfig"
       @scoutAround="scoutAround"
    />
    <!--Table-->
    <PublicTable
      :TableData="TableData"
      :TableLabel="TableLabel"
      @Determine="Determine"
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
          {isType: 'input', label: '', model: 'staff_id', placeholder: '员工ID'},
          {isType: 'input', label: '', model: 'agent_id', placeholder: '代理商ID'},
          {isType: 'input', label: '', model: 'mobile', placeholder: '手机号码'},
          {isType: 'input', label: '', model: 'user_name', placeholder: '姓名'},
//          {isType: 'select', label: '', model: 'd', placeholder: 'asd', selectArr: [{label: '', value: ''}]},
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}, {type: 'primary', evenName: 'downloadAll', evenText: '导出Excel'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'column', prop: 'mobile', label: '账号（手机）', width: '100'},
          {isType: 'column', prop: 'user_name', label: '姓名', width: ''},
          {isType: 'money', prop: 'balance', label: '用户余额', width: ''},
          {isType: 'money', prop: 'money', label: '可用资金', width: ''},
          {isType: 'money', prop: 'advisable', label: '可取资金', width: ''},
          {isType: 'money', prop: 'freeze', label: '冻结资金', width: ''},
//          {isType: 'money', prop: 'freeze', label: '股票市值', width: ''}, // 没有做
//          {isType: 'money', prop: 'freeze', label: '盈亏金额', width: ''}, // 没有做
          {isType: 'column', prop: 'resiger_time', label: '注册时间', width: '90'},
//          {isType: 'scope', prop: 'iv_status', label: '实名状态', width: '', status: [{state: 0, label: '审核中', color: '#e6a23c'}, {state: 1, label: '审核通过', color: '#67c23a'}, {state: 2, label: '审核失败', color: '#f56c6c'}]},
          {isType: 'popover', prop: 'state', label: '账号状态', width: '', popover: {isButConfig: {isButton: true, isStatu: 'popTag', props: 'state', cancel: '取消', mine: '确定'}, popoverList: [{label: '操作', props: '', defaults: '是否启用账户？'}], statuList: [{state: 0, label: '正常', color: '#67c23a'}, {state: 1, label: '禁用', color: '#e6a23c'}]}},
          {isType: 'popover', prop: 'staff_id', label: '所属员工', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'staff_id', defaults: '0', popoverList: [{label: '所属员工', props: 'staff_id_name', defaults: '无'}]}},
          {isType: 'popover', prop: 'agent_id', label: '所属代理', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'agent_id', defaults: '0', popoverList: [{label: '所属代理', props: 'agent_id_name', defaults: '无'}]}}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        }
      }
    },
    mounted () {
      this.getDisenableList()
    },
    destroyed () {},
    watch: {
//      监控是否点击tabs 点击则刷新列表
      'contents': function (val) {
        if (val.active === true && val.name === '2-4') {
          this.getDisenableList()
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
        this.getDisenableList(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getDisenableList(this.paginationConfig)
      },
      Determine (val) {
        let el = this
        let queryData = {}
        queryData.id = val.id
        queryData.state = 0
        el.$http(el.$api.setChange, queryData)
          .then((res) => {
            if (res.code === 1) {
              this.getDisenableList()
              this.$message({message: res.msg, type: 'success'})
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    获取用户列表
      getDisenableList (queryData, n) {
        this.queryData = queryData || {}
        let el = this
        el.$store.commit('setLoading', true)
        el.$http(el.$api.getDisenable, queryData)
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
      }
    }
  }
</script>
<style scoped>
</style>
