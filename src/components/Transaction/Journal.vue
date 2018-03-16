<!--平仓点 6-8-->
<template>
  <el-row>
    <!--搜索-->
    <SearchBox style="text-align: left"
       :searchModel="searchModel"
       :searchData="searchData"
       :searchConfig="searchConfig"
       @scoutAround="scoutAround"
       @toolShow="toolShow"/>
<!--Table-->
    <PublicTable
      :TableData="TableData"
      :TableLabel="TableLabel"
      @handleChange="handleChange"
    />
<!--分页-->
    <Pagination class="Pagination"
          :paginationConfig="paginationConfig"
          @currentChange="currentChange"/>
    <DialogBox
      :dialogConfig="dialogConfig"
      :dialogForm="dialogForm"
      :dialogData="dialogData"
      @survey="survey"
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
          {isType: 'input', label: '', model: 'mobile', placeholder: '手机号码'},
          {isType: 'button', label: '', model: '', placeholder: '', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}, {type: 'warning', evenName: 'toolShow', evenText: '手动平仓'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
//          {isType: 'column', prop: 'id', label: 'ID', width: ''},
          {isType: 'selection', prop: '', label: '', width: '60'},
          {isType: 'column', prop: 'mobile', label: '账号(手机)', width: '100'},
          {isType: 'column', prop: 'xingming', label: '姓名', width: ''},
          {isType: 'column', prop: 'code', label: '标的代码', width: ''},
          {isType: 'column', prop: 'name', label: '标的名称', width: ''},
          {isType: 'money', prop: 'capital_money', label: '名义本金', width: ''},
          {isType: 'column', prop: 'mouth_config_id', label: '期限', width: ''},
          {isType: 'column', prop: 'manage_per', label: '管理费率', width: ''},
          {isType: 'column', prop: 'manage_money', label: '管理费', width: ''},
          {isType: 'column', prop: 'Initial_price', label: '期初价格', width: ''},
          {isType: 'column', prop: 'manage_money', label: '当前价格', width: ''},
          {isType: 'column', prop: 'rose', label: '盈亏比例', width: ''},
          {isType: 'column', prop: 'yh', label: '浮动盈亏', width: ''},
          {isType: 'column', prop: 'lasttime', label: '最新市值', width: ''},
          {isType: 'popover', prop: 'staff_id', label: '所属员工', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'staff_id', defaults: '0', popoverList: [{label: '所属员工', props: 'staff_id_name', defaults: '无'}]}},
          {isType: 'popover', prop: 'agent_id', label: '所属代理', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'agent_id', defaults: '0', popoverList: [{label: '所属代理', props: 'agent_id_name', defaults: '无'}]}},
          {isType: 'column', prop: 'money_value_date', label: '起息日', width: '90'},
          {isType: 'column', prop: 'money_expiry_date', label: '到息日', width: '90'},
          {isType: 'column', prop: 'created_at', label: '下单时间', width: '90'},
          {isType: 'column', prop: 'option_code', label: '期权编号', width: ''},
          {isType: 'column', prop: 'ordersn', label: '订单编号', width: ''}
        ],
        //      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
        dialogConfig: {
          title: '手动平仓',
          visible: false,
          width: '30%',
          dialogLabelWidth: '80px',
          buttonArr: [
            {type: 'primary', size: 'mini', evenName: '', evenText: '取 消', attr: ''},
            {type: 'primary', size: 'mini', evenName: 'Determine', evenText: '确 定', attr: ''}
          ]
        },
        dialogForm: {},
        dialogData: [
          {isType: 'input', label: '姓名', placeholder: '姓名', disabled: true, model: 'xingming'},
          {isType: 'input', label: '标的代码', placeholder: '标的代码', disabled: true, model: 'code'},
          {isType: 'input', label: '标的名称', placeholder: '标的名称', disabled: true, model: 'name'},
          {isType: 'input', label: '名义本金', placeholder: '名义本金', disabled: true, model: 'capital_money'},
          {isType: 'input', label: '期限', placeholder: '期限', disabled: true, model: 'mouth_config_id'},
          {isType: 'input', label: '期初价格', placeholder: '期初价格', disabled: true, model: 'Initial_price'},
          {isType: 'input', label: '当前价格', placeholder: '当前价格', disabled: true, model: 'manage_money'},
          {isType: 'input', label: '盈亏比例', placeholder: '盈亏比例', disabled: true, model: 'rose'},
          {isType: 'input', label: '浮动盈亏', placeholder: '浮动盈亏', disabled: true, model: 'yh'},
          {isType: 'input', label: '最新市值', placeholder: '最新市值', disabled: true, model: 'lasttime'},
          {isType: 'input', label: '行权价格', placeholder: '行权价格', disabled: false, model: 'exercise_price'},
          {isType: 'input', label: '行权金额', placeholder: '行权金额', disabled: false, model: 'all_price'}
        ],
        multipleSelection: []
      }
    },
    mounted () {
      this.Liquidated()
    },
    destroyed () {},
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '6-8') {
          this.Liquidated()
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
        this.Liquidated(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.Liquidated(this.paginationConfig)
      },
//    选择做平仓按钮
      handleChange (val) {
        this.multipleSelection = val
      },
//    判断选择了几个废单
      toolShow () {
        let el = this
        if (el.multipleSelection.length === 0) {
          el.$message({ message: '请选择要平仓的单子', type: 'warning' })
          el.dialogConfig.visible = false
          return false
        } else if (el.multipleSelection.length > 1) {
          el.$message.error('平仓只能选择一个的操作哦！！')
          el.dialogConfig.visible = false
          return false
        } else {
          this.dialogForm = el.multipleSelection[0]
          el.dialogConfig.visible = true
        }
      },
//    平仓操作
      Determine (val) {
        let queryData = val
        this.$http(this.$api.selllastTime, queryData)
          .then(res => {
            if (res.code === 1) {
              this.dialogConfig.visible = false
              this.dialogForm.exercise_price = 0
              this.$message({ message: res.msg, type: 'success' })
              this.Liquidated()
            } else {
              this.$message.error(res.msg)
            }
          })
      },
      survey (val, oldVal) {
        val.all_price = parseInt(parseFloat(val.capital_money) / parseFloat(val.Initial_price) * parseFloat(val.exercise_price))
      },
//     获取快要平仓的列表
      Liquidated (queryData) {
        this.$store.commit('setLoading', true)
        queryData = Object.assign(this.searchModel, queryData)
        this.$http(this.$api.getLiquidated, queryData)
          .then(res => {
            this.$store.commit('setLoading', false)
            if (res.code === 1) {
              this.TableData = []
              this.TableData = Object.values(res.data)
              this.paginationConfig.total = res.pageInfo.TotalItem
            }
          })
      }
    }
  }
</script>
<style scoped>
</style>
