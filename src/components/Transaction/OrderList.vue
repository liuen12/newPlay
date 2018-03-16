<!--OrderList开仓委托-->
<template>
  <el-row>
    <!--设为费单没有做呢-->
    <!--搜索-->
    <SearchBox style="text-align: left"
         :searchModel="searchModel"
         :searchData="searchData"
         :searchConfig="searchConfig"
         @scoutAround="scoutAround"
         @toolShow="toolShow"
         @downloadAll="downloadAll"
      />
    <PublicTable
      :TableData="TableData"
      :TableLabel="TableLabel"
      @handleOrder="handleOrder"
      @handleChange="handleChange"
    />
    <!--分页-->
    <Pagination class="Pagination"
          :paginationConfig="paginationConfig"
          @currentChange="currentChange"/>
    <!--确认下单界面-->
    <el-dialog :title="title" :visible.sync="dialogOrder" width="35%" top="2%">
      <el-form :model="Order" size="small">
        <el-form-item label="手机号码" label-width="80px">
          <el-input v-model="Order.mobile" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="下单时间" label-width="80px">
          <el-input v-model="Order.created_at" :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="标的名称" label-width="80px">
          <el-input v-model="Order.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="标的代码" label-width="80px">
          <el-input v-model="Order.code" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="名义本金" label-width="80px">
          <el-input v-model="Order.capital_money"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="管理费率" label-width="80px">
          <el-input v-model="Order.manage_per"  :disabled="isPer ? false:true" @blur="equityNums(Order.equity_nums, 'f')">
            <template slot="prepend">%</template>
            <template>
              <el-checkbox  slot="append" v-model="isPer">修改费率</el-checkbox>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="管理费用" label-width="80px">
          <el-input v-model="Order.manage_money"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="委托数量" label-width="80px">
          <el-input v-model="Order.equity_nums" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="期初日" label-width="80px">
          <el-date-picker v-model="Order.money_value_date"
              type="date" placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="行权日" label-width="80px">
          <el-date-picker v-model="Order.money_expiry_date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="期初价格" label-width="80px">
          <el-input v-model="Order.Initial_price" @focus="focusNum('b')" @blur="equityNums(Order.Initial_price, 'b')"></el-input>
        </el-form-item>
        <el-form-item label="成交金额" label-width="80px">
          <el-input v-model="Order.totalAssets" @focus="focusNum('a')" @blur="equityNums(Order.totalAssets, 'a')" :disabled="isrevise"></el-input>
        </el-form-item>
        <el-form-item label="期权编号" label-width="80px">
          <el-input v-model="Order.option_code" :disabled="isrevise"></el-input>
        </el-form-item>
        <el-form-item label="备   注" label-width="80px">
          <el-input v-model="Order.remark" :disabled="isrevise"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogOrder = false">取 消</el-button>
        <el-button type="primary" @click="setOrder">确 定</el-button>
      </div>
    </el-dialog>
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
          {isType: 'button', label: '', model: 'c', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}, {type: 'primary', evenName: 'downloadAll', evenText: '导出Excel'}, {type: 'danger', evenName: 'toolShow', evenText: '设为废单'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'selection', prop: '', label: '', width: '60'},
          {isType: 'column', prop: 'xingming', label: '姓名', width: ''},
          {isType: 'column', prop: 'mobile', label: '手机号码', width: '100'},
          {isType: 'column', prop: 'created_at', label: '询价时间', width: '90'},
          {isType: 'column', prop: 'code', label: '标的代码', width: ''},
          {isType: 'column', prop: 'name', label: '标的名称', width: ''},
          {isType: 'money', prop: 'manage_money', label: '管理费', width: ''},
          {isType: 'scope', prop: 'direction', label: '标志', width: '', status: [{state: 0, label: '卖出', color: '#f56c6c'}, {state: 1, label: ' 买入', color: '#67c23a'}]},
          {isType: 'money', prop: 'capital_money', label: '名义本金', width: ''},
          {isType: 'money', prop: 'platform_sc', label: '服务费', width: ''},
          {isType: 'money', prop: 'Initial_price', label: '期初价格', width: ''},
          {isType: 'column', prop: 'mouth_config_id', label: '期限', width: ''},
          {isType: 'scope', prop: 'status', label: '状态', width: '', status: [{state: 0, label: '待确认', color: '#e6a23c'}, {state: 1, label: '待回复', color: '#67c23a'}]},
          {isType: 'money', prop: 'yh', label: '盈亏', width: ''},
          {isType: 'button', prop: '', label: '开仓操作', width: '100', btnArr: [{size: 'mini', type: 'text', label: '确认开仓', evenName: 'handleOrder', attr: 's', isShow: 'status', status: 0}, {size: 'mini', type: 'text', label: '开仓回执', evenName: 'handleOrder', attr: 'a', isShow: 'status', status: 1}, {size: 'mini', type: 'text', label: '持仓中', evenName: 'handleOrder', attr: 'b', isShow: 'status', status: 2}]}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
        Config: {
          ref: 'ref',
          placement: 'top',
          title: 'asd',
          width: '160',
          trigger: '',
          model: true,
          style: 'red',
          content: '设为废单后不能撤回，确定要设为废单吗？',
          cancel: '取消',
          Determine: '确定'
        },
        isPer: false,
        orderData: [],
        listData: [],
        index: '',
//      选择做废单按钮  以后可做选择下载
        title: '',
        isrevise: false,
        visible: false,
        multipleSelection: [],
        dialogOrder: false,
        Order: {
          id: '',
          mobile: '',
          created_at: '',
          name: '',
          code: '',
          manage_per: '',
          capital_money: '',
          totalAssets: '' || '',
          manage_money: '',
          equity_nums: '' || '',
          remark: '',
          money_value_date: new Date(),
          money_expiry_date: '',
          Initial_price: ''
        }
      }
    },
    mounted () {
      this.getOrderList()
      if (this.issetTime) {
        this.setTime()
      }
    },
    destroyed () {},
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '4-10') {
          this.getOrderList()
        }
      },
      'SellData.exercise_price': function (val) {
        this.SellData.all_price = val * this.SellData.equity_nums
      }
    },
    methods: {
//      搜索
      scoutAround (val) {
        if (val.arrTime) {
          val.start_time = val.arrTime[0]
          val.end_time = val.arrTime[1]
        } else {
          val.start_time = ''
          val.end_time = ''
        }
        this.getOrderList(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getOrderList(this.paginationConfig)
      },
      handleOrder (row, i, index) {
        let el = this
        if (i === 'a') {
          el.dialogOrder = true
          this.isrevise = false
          el.title = '确认下单'
          el.index = index
          el.Order = row
          el.Order.Initial_price = ''
          el.Order.totalAssets = ''
          el.Order.option_code = ''
          el.Order.remark = ''
          el.Order.money_value_date = row.created_at // 默认期初日
          el.Order.money_expiry_date = this.defaultTime(row)   // 默认行权日
        }
        if (i === 's') {
          el.index = index
          el.setReporting(row)
        }
        if (i === 'b') {
          this.isrevise = true
          el.dialogOrder = true
          el.index = index
          el.title = '修改期初价格'
          el.Order = row
//          el.setReporting(row)
        }
        if (i === 'd') {
          el.index = index
          el.fixSell(row)
        }
        if (i === 'f') {
          el.dialogSell = true
          el.index = index
          el.SellData = el.copyObj(row, el.SellData)
        }
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
      abolish () {
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
            } else {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    上报券商
      setReporting (row) {
        let el = this
        let queryData = {}
        queryData.id = row.id
        el.$http(el.$api.setAudit, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$message({ message: res.msg, type: 'success' })
              el.getOrderList()
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    确认下单
      setOrder () { // setDelegation
        let el = this
        let queryData = {}
        queryData = el.Order
        let API_URL = ''
        if (this.isrevise) {
          queryData = {}
          queryData.order_id = el.Order.id
          queryData.Initial_price = el.Order.Initial_price
          API_URL = el.$api.setChangebeginning
        } else {
          if (el.Order.equity_nums) {
            queryData.equity_nums = el.Order.equity_nums.replace(/,/g, '')
          }
          if (el.Order.totalAssets) {
            queryData.totalAssets = el.Order.totalAssets.replace(/,/g, '')
          }
          if (el.Order.Initial_price) {
            queryData.Initial_price = el.Order.Initial_price.replace(/,/g, '')
          }
          API_URL = el.$api.setDelegation
        }
        el.$http(API_URL, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$message({ message: res.msg, type: 'success' })
              el.getOrderList()
              el.dialogOrder = false
            }
            if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    获取订单列表
      getOrderList (queryData, n) {
        queryData = Object.assign(this.searchModel, queryData)
        let el = this
        el.$store.commit('setLoading', true)
        el.$http(el.$api.getOrderList, queryData, 'get')
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
              el.TableData = []
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//     获取焦点时处理数字
      focusNum (a) {
        let num = this.Order
        if (a === 'a') {
          if (num.totalAssets !== 0) {
            if (num.totalAssets !== undefined) {
              num.totalAssets = num.totalAssets.replace(/,/g, '') | 0
            }
          }
        } else {
          num.Initial_price = num.Initial_price.replace(/,/g, '') | 0
        }
      },
//    离开焦点处理数字
      equityNums (value, b) {
        let num = this.Order
        if (b === 'f') {
          num.manage_money = (num.capital_money / 100 * num.manage_per).toFixed(2)
        } else {
          let a = parseFloat(value).toLocaleString()
          if (b === 'a') {
            num.totalAssets = a
            if (num.Initial_price) {
              num.equity_nums = parseFloat(value / num.Initial_price.replace(/,/g, '')).toLocaleString()
            }
          }
          if (b === 'b') {
            num.Initial_price = a
            if (num.totalAssets !== undefined) {
              num.equity_nums = parseFloat(num.totalAssets.replace(/,/g, '') / value).toLocaleString()
            }
          }
        }
      },
//    全部导出表格
      downloadAll () {
        let Table = this.TableKey(this.TableLabel)
        this.exportExcel(Table[0], Table[1], this.TableData, '开仓委托')
      },
//    默认时间
      defaultTime (row) {
        let num = parseInt(row.mouth_config_id)
        let odd = ['01', '03', '05', '07', '08', '10', '12']
        let even = ['04', '06', '09', '11']
        let sp = ['02']
        let times = row.created_at.split(' ')[0].split('-')
        if (num && num <= 12) {
          if (odd.includes(times[1])) {
            return this.addDate(row.created_at, num * 31)
          }
          if (even.includes(times[1])) {
            return this.addDate(row.created_at, num * 30)
          }
          if (sp.includes(times[1])) {
            return this.addDate(row.created_at, num * 28)
          }
        } else {
          return this.addDate(row.created_at, num)
        }
      },
      addDate (date, days) {
        let d = new Date(date)
        d.setDate(d.getDate() + days)
        let m = d.getMonth() + 1
        return d.getFullYear() + '-' + m + '-' + d.getDate()
      },
//    定时刷新
      setTime () {
        this.issetTime = false
        setInterval(() => {
          this.getOrderList()
        }, 100000)
      }
    }
  }
</script>
<style scoped>
  .btn-w{
    width: 70px;
  }
  .abolishs{
    float: right;
    margin-right: 30px
  }
  .btn-info{
    background: #878d99!important;
    border-color: transparent !important;
  }
  .el-date-editor.el-input{
    width: 100% !important;
  }
</style>
