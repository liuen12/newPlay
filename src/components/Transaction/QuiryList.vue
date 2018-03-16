<!--QuiryList询价列表-->
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
      @handleChange="handleChange"
      @handleReceipt="handleReceipt"
    />
    <Pagination class="Pagination"
          :paginationConfig="paginationConfig"
          @currentChange="currentChange"
    />
    <!--回执界面-->
    <el-dialog title="确认回执" :visible.sync="dialogReceipt" width="30%">
      <el-form :model="Receipt">
        <el-form-item label="手机号码" label-width="80px">
          <el-input v-model="Receipt.mobile"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="标的名称" label-width="80px">
          <el-input v-model="Receipt.name"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="标的代码" label-width="80px">
          <el-input v-model="Receipt.code"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="标的期限" label-width="80px">
          <el-input v-model="Receipt.mouth_config_id"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="名义本金" label-width="80px">
          <el-input v-model.number="Receipt.capital_money"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="管理费率" label-width="80px"  icon="edit">
          <el-input placeholder="请输入内容" v-model.number="Receipt.manage_per">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="管理费" label-width="80px">
          <el-input v-model="Receipt.manage_money"></el-input>
        </el-form-item>
        <el-form-item label="选择确认书" label-width="85px">
          <el-select v-model="Receipt.protocol_id" placeholder="选择确认书">
            <el-option
              v-for="item in ProtocolList"
              :key="item.agent_id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogReceipt = false">取 消</el-button>
        <el-button type="primary" @click="setReceipt">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
  import upFile from '../Tool/upDate'
  export default {
    components: {upFile},
    props: ['contents'],
    mixins: [],
    data () {
      return {
//      搜索
        searchModel: {},
        searchData: [
          {isType: 'input', label: '', model: 'mobile', placeholder: '手机号码'},
//          {isType: 'select', label: '', model: 'd', placeholder: '审核状态', selectArr: [{label: '全部', value: ''}, {label: '未给价', value: '0'}, {label: '已给价', value: '1'}, {label: '委托中', value: '2'}, {label: '作废', value: '3'}]},
          {isType: 'time', label: '', model: 'arrTime', placeholder: ''},
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}, {type: 'primary', evenName: 'downloadAll', evenText: '导出Excel'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
//          {isType: 'selection', prop: 'mobile', label: '', width: '60'},
          {isType: 'column', prop: 'mobile', label: '手机号码', width: '100'},
          {isType: 'column', prop: 'xingming', label: '姓名', width: ''},
          {isType: 'column', prop: 'code', label: '标的代码', width: ''},
          {isType: 'column', prop: 'name', label: '标的名称', width: ''},
          {isType: 'money', prop: 'capital_money', label: '名义本金', width: ''},
          {isType: 'column', prop: 'mouth_config_id', label: '期限', width: ''},
          {isType: 'popover', prop: 'staff_id', label: '所属员工', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'staff_id', defaults: '0', popoverList: [{label: '所属员工', props: 'staff_id_name', defaults: '无'}]}},
          {isType: 'popover', prop: 'agent_id', label: '所属代理', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'agent_id', defaults: '0', popoverList: [{label: '所属代理', props: 'agent_id_name', defaults: '无'}]}},
          {isType: 'scope', prop: 'status', label: '状态', width: '', status: [{state: 0, label: '待回复', color: '#ff6666'}, {state: 1, label: '已回复', color: '#6699cc'}, {state: 2, label: '', color: '#409eff'}, {state: 3, label: '过期废单', color: '#b0b0b0'}]},
          {isType: 'column', prop: 'ask_time', label: '询价时间', width: '90'},
          {isType: 'column', prop: 'allowtime_before', label: '失效时间', width: '90'},
          {isType: 'button', prop: '', label: '操作', width: '100', btnArr: [{size: 'mini', type: 'text', label: '回执', evenName: 'handleReceipt', attr: 'a'}]}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
//      上传
        upConfig: {
          type: 'success',
          text: '上传报价',
          upUrl: `http://${location.hostname}:8005/admin/image/upload`
//          upUrl: `http://192.168.1.188:8081/admin/image/upload`
        },
        tHeader: ['ID', '手机号码', '标的代码', '标的名称', '名义本金', '询价状态', '管理费率', '管理费', '期限(/月)', '询价时间', '失效时间'],
        listData: [],
        index: '',
        dialogReceipt: false,
        Receipt: {
          id: '',
          allowtime_before: '',
          mobile: '',
          name: '',
          code: '',
          capital_money: '',
          manage_per: 0, //  管理率
          manage_money: 0, // 管理费用
          inquir_id: '',
          protocol_id: '',
          mouth_config_id: ''
        },
        multipleSelection: [],
//      协议列表
        ProtocolList: [],
        issetTime: true // 轮询
      }
    },
    mounted () {
      this.getQuiryList()
      if (this.issetTime) {
        this.setTime()
      }
    },
    destroyed () {
    },
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '4-9') {
          this.getQuiryList()
        }
      },
      'Receipt': {
        handler: function (val, oldVal) {
          //   capital_money名义本金  manage_per费率 manage_money费用
          val.manage_money = (val.capital_money * this.setNum(val.manage_per)).toFixed(2)
        },
        deep: true
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
        this.getQuiryList(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getQuiryList(this.paginationConfig)
      },
//      数字处理
      setNum (num) {
        if (num !== null) {
          let number = num / 100
          return number
        }
      },
      handleReceipt (row, attr, index) {
        let el = this
        el.index = index
        el.dialogReceipt = true
        row.manage_money = parseInt(row.manage_money)
        el.Receipt = row
        el.Receipt.manage_money = 0.00
        el.Receipt.manage_per = 0
        el.getProtocolList()
      },
//      回执
      setReceipt () {
        let el = this
        let queryData = {}
        queryData = el.Receipt
        queryData.inquir_id = el.Receipt.id
        queryData.option_code = '1212'
        el.$http(el.$api.setConfirmstatus, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$message({ message: res.msg, type: 'success' })
              el.getQuiryList()
              el.dialogReceipt = false
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    获取询价列表
      getQuiryList (queryData, n) {
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
      },
//    协议列表
      getProtocolList () {
        let el = this
        let queryData = {}
        el.$http(el.$api.getProtoco, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.ProtocolList = []
              el.ProtocolList = Object.values(res.data)
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    选择做废单按钮  以后可做选择下载
      handleChange (val) {
        if (val.length !== 0) {
          val[0].order_id = val[0].id
          val[0].user_id = val[0].user_id
        }
        this.multipleSelection = val
      },
//    判断选择了几个废单
      toolShow () {
        let el = this
        if (el.multipleSelection.length === 0) {
          el.$message({ message: '请选择要废弃的单子', type: 'warning' })
          el.visible = false
          return false
        } else if (el.multipleSelection.length > 1) {
          el.$message.error('设置为废单只能选择一个的操作哦！！')
          el.visible = false
          return false
        } else {
          this.$confirm('设置为废单不能撤回, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.abolish()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        }
      },
//    设置为废单
      abolish () { // getAbolish
        let el = this
        let queryData = {}
        queryData.order_id = el.multipleSelection[0].order_id
        queryData.user_id = el.multipleSelection[0].user_id
        el.$http(el.$api.getAbolish, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$message({ message: res.msg, type: 'success' })
              el.$refs.multipleTable.clearSelection()
              el.visible = false
              el.getOrderList()
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    全部导出表格
      downloadAll () {
        let Table = this.TableKey(this.TableLabel)
        this.exportExcel(Table[0], Table[1], this.TableData, '询价列表')
      },
//    定时刷新
      setTime () {
        this.issetTime = false
        setInterval(() => {
          this.getQuiryList()
        }, 100000)
      }
    }
  }
</script>
<style scoped>
</style>
