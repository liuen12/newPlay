<!--银证转账-->
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
        @handleReceipt="handleReceipt"
      />
<!--分页-->
      <Pagination class="Pagination"
        :paginationConfig="paginationConfig"
        @currentChange="currentChange"/>

      <DialogText
      :dialogConfig="dialogConfig"
      :dialogData="dialogData"
      @CloseDialog="CloseDialog"
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
          {isType: 'input', label: '', model: 'mobile', placeholder: '手机号'},
          {isType: 'select', label: '', model: 'type', placeholder: '收支状态', selectArr: [{label: '全部状态', value: ''}, {label: '入金', value: '1'}, {label: '出金', value: '2'}]},
          {isType: 'select', label: '', model: 'status', placeholder: '审核状态', selectArr: [{label: '全部状态', value: ''}, {label: '已审核', value: '1'}, {label: '未审核', value: '0'}, {label: '已驳回', value: '2'}]},
          {isType: 'button', label: '', model: '', placeholder: '', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}, {type: 'primary', evenName: 'downloadAll', evenText: '导出Excel'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'column', prop: 'id', label: '用户ID', width: '75'},
          {isType: 'column', prop: 'mobile', label: '账号（手机）', width: '100'},
          {isType: 'column', prop: 'account_name', label: '开户名', width: ''},
          {isType: 'column', prop: 'bank_no', label: '银行卡号', width: '170'},
          {isType: 'money', prop: 'deposit', label: '发生金额', width: ''},
          {isType: 'defaults', prop: 'service_charge', label: '手续费', width: '', defaults: '0.00'},
          {isType: 'defaults', prop: 'account_amount', label: '实际金额', width: '', defaults: '0.00'},
          {isType: 'scope', prop: 'status', label: '审核状态', width: '', status: [{state: 0, label: '未审核', color: '#b0b0b0'}, {state: 1, label: '已审核', color: '#6699cc'}, {state: 2, label: '已驳回', color: '#ff6666'}]},
          {isType: 'scope', prop: 'type', label: '收支状态', width: '', status: [{state: 1, label: '入金', color: '#ff9900'}, {state: 2, label: '出金', color: '#99cc33'}]},
          {isType: 'column', prop: 'value', label: '支付方式', width: '75'},
          {isType: 'popover', prop: 'staff_id', label: '所属员工', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'staff_id', defaults: '0', popoverList: [{label: '所属员工', props: 'staff_id_name', defaults: '无'}]}},
          {isType: 'popover', prop: 'agent_id', label: '所属代理', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'agent_id', defaults: '0', popoverList: [{label: '所属代理', props: 'agent_id_name', defaults: '无'}]}},
          {isType: 'column', prop: 'created_at', label: '调拨时间', width: '95'},
          {isType: 'popover', prop: 'remark', label: '备注', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: '', defaults: '查看备注', popoverList: [{label: '备注', props: 'remark'}]}},
          {isType: 'button', prop: '', label: '操作', width: '160', btnArr: [{size: 'mini', type: 'text', label: '确认充值', evenName: 'handleReceipt', attr: 'a'}, {size: 'mini', type: 'text', label: '确认提现', evenName: 'handleReceipt', attr: 'b'}]},
          {isType: 'column', prop: 'pay_no', label: '本地流水', width: '110'},
          {isType: 'column', prop: 'thirdparty_payno', label: '第三方流水', width: '110'}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
        Template: {type: 'selection', content: {}, label: '用户ID', width: '55', selection: true},
        listData: [],
        dialogConfig: {
          title: '温馨提示',
          visible: false,
          width: '30%',
          dialogLabelWidth: '80px',
          buttonArr: [
            {type: 'primary', size: 'mini', evenName: 'CloseDialog', evenText: '驳 回', attr: ''},
            {type: 'primary', size: 'mini', evenName: 'Determine', evenText: '确 定', attr: ''}
          ]
        },
        dialogData: '',
        isHandle: '',
        handleRow: {}
      }
    },
    mounted () {
      this.getEntry()
    },
    destroyed () {},
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '2-2') {
          this.getEntry()
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
        this.getEntry(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getEntry(this.paginationConfig)
      },
//    确认充值
      handleReceipt (row, a) { //  onfirmRechargec
        let queryData = {}
        this.isHandle = a
        this.handleRow = row
        queryData.id = row.id
        if (a === 'a') {
          this.dialogConfig.visible = true
          this.dialogData = '是否充值？'
        }
        if (a === 'b') {
          this.dialogConfig.visible = true
          this.dialogData = '是否提现？'
        }
      },
//    驳回操作
      CloseDialog () {
        let el = this
        let queryData = {}
        queryData.id = this.handleRow.id
        if (this.isHandle === 'a') {
          el.$http(el.$api.onfirmReject, queryData)
            .then((res) => {
              this.dialogConfig.visible = false
              if (res.code === 1) {
                el.getEntry()
                el.$message({ message: '充值驳回成功！！', type: 'success' })
              } else {
                el.$message({ message: '充值驳回失败！！', type: 'warning' })
              }
            }, (error) => {
              console.log(error)
            })
        }
        if (this.isHandle === 'b') {
          el.$http(el.$api.onfirmReject, queryData)
            .then((res) => {
              this.dialogConfig.visible = false
              if (res.code === 1) {
                el.getEntry()
                el.$message({ message: '提现驳回成功！！', type: 'success' })
              } else {
                el.$message({ message: '提现驳回失败！！', type: 'warning' })
              }
            }, (error) => {
              console.log(error)
            })
        }
      },
//    确定操作
      Determine () {
        let el = this
        let queryData = {}
        queryData.id = this.handleRow.id
        if (this.isHandle === 'a') {
          el.$http(el.$api.onfirmRechargec, queryData)
            .then((res) => {
              this.dialogConfig.visible = false
              if (res.code === 1) {
                el.getEntry()
                el.$message({ message: res.msg, type: 'success' })
              } else {
                el.$message({message: '充值失败！！', type: 'warning'})
              }
            }, (error) => {
              console.log(error)
            })
        }
        if (this.isHandle === 'b') {
          el.$http(el.$api.getChangetx, queryData)
            .then((res) => {
              this.dialogConfig.visible = false
              if (res.code === 1) {
                el.getEntry()
                el.$message({ message: res.msg, type: 'success' })
              } else {
                el.$message({ message: '提现失败！！', type: 'warning' })
              }
            }, (error) => {
              console.log(error)
            })
        }
      },
      getEntry (queryData, n) {
        let el = this
        el.$store.commit('setLoading', true)
        this.isPage = false
        queryData = Object.assign(this.searchModel, queryData)
        el.$http(el.$api.getRecharge, queryData)
          .then((res) => {
            el.$store.commit('setLoading', false)
            if (res.code === 1) {
              if (n === 'all') {
                this.listData = Object.values(res.data)
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
//    全部导出表格
      downloadAll () {
        let Table = this.TableKey(this.TableLabel)
        this.exportExcel(Table[0], Table[1], this.TableData, '银证转账')
      }
    }
  }
</script>
<style scoped>
</style>
