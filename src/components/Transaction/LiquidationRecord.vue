<!---->
<template>
  <el-row>
    <SearchBox style="text-align: left"
               :searchModel="searchModel"
               :searchData="searchData"
               :searchConfig="searchConfig"
               @scoutAround="scoutAround"
    />
    <PublicTable
      :TableData="TableData"
      :TableLabel="TableLabel"
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
    data () {
      return {
//      搜索
        searchModel: {},
        searchData: [
          {isType: 'input', label: '', model: 'mobile', placeholder: '手机号码'},
          {isType: 'select', label: '', model: 'd', placeholder: '审核状态', selectArr: [{label: '全部', value: ''}, {label: '未给价', value: '0'}, {label: '已给价', value: '1'}, {label: '委托中', value: '2'}, {label: '作废', value: '3'}]},
          {isType: 'time', label: '', model: 'arrTime', placeholder: ''},
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}, {type: 'primary', evenName: 'downloadAll', evenText: '导出Excel'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'column', prop: 'mobile', label: '手机号码', width: '100'},
          {isType: 'column', prop: 'xingming', label: '姓名', width: ''},
          {isType: 'column', prop: 'code', label: '标的代码', width: ''},
          {isType: 'column', prop: 'name', label: '标的名称', width: ''},
          {isType: 'money', prop: 'capital_money', label: '名义本金', width: ''},
          {isType: 'column', prop: 'mouth_config_id', label: '期限(/月)', width: ''},
          {isType: 'column', prop: 'manage_per', label: '管理费率', width: ''},
          {isType: 'column', prop: 'manage_money', label: '管理费', width: ''},
          {isType: 'popover', prop: 'staff_id', label: '所属员工', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'staff_id', defaults: '0', popoverList: [{label: '所属员工', props: 'staff_id_name', defaults: '无'}]}},
          {isType: 'popover', prop: 'agent_id', label: '所属代理', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'agent_id', defaults: '0', popoverList: [{label: '所属代理', props: 'agent_id_name', defaults: '无'}]}},
          {isType: 'scope', prop: 'status', label: '状态', width: '', status: [{state: 0, label: '待确认', color: '#e6a23c'}, {state: 1, label: '待回复', color: '#67c23a'}, {state: 2, label: '持仓中', color: '#409eff'}, {state: 3, label: '已开仓', color: '#909399'}, {state: 4, label: '废单', color: '#909399'}]},
          {isType: 'column', prop: 'ask_time', label: '下单时间', width: '90'},
          {isType: 'column', prop: 'allowtime_before', label: '失效时间', width: '90'},
          {isType: 'button', prop: '', label: '操作', width: '150', btnArr: [{size: 'mini', type: 'text', label: '回执', evenName: 'handleReceipt', attr: 'a'}]}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        }
      }
    },
    mounted () {
      this.getAutoList()
    },
    destroyed () {},
    watch: {},
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
        this.getAutoList(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getAutoList(this.paginationConfig)
      },
//    自动询价
      getAutoList (queryData, n) {
        queryData = Object.assign(this.searchModel, queryData)
        let el = this
        el.$store.commit('setLoading', true)
        el.$http(el.$api.getAenquiry, queryData)
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

