<!--绑定银行卡-->
<template>
  <el-row>
    <!--搜索-->
      <SearchBox style="text-align: left"
         :searchModel="searchModel"
         :searchData="searchData"
         :searchConfig="searchConfig"
         @scoutAround="scoutAround" />
<!--Table-->
    <PublicTable
      :TableData="TableData"
      :TableLabel="TableLabel"
      @handleClick="handleClick"
    />
    <!--分页-->
    <Pagination class="Pagination"
        :paginationConfig="paginationConfig"
        @currentChange="currentChange"/>
    <DialogBox
    :dialogConfig="dialogConfig"
    :dialogForm="dialogForm"
    :dialogData="dialogData"
    @Determine="Determine"
    />
  </el-row>
</template>
<script>
  export default {
    mixins: [],
    props: ['contents'],
    components: {},
    data () {
      return {
//      搜索
        searchModel: {},
        searchData: [
          {isType: 'input', label: '', model: 'mobile', placeholder: '手机号码'},
          {isType: 'button', label: '', model: '', placeholder: '', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [ // upBank
          {isType: 'column', prop: 'id', label: '账户ID', width: '90'},
          {isType: 'column', prop: 'mobile', label: '账户手机', width: ''},
          {isType: 'column', prop: 'account_name', label: '开户名', width: ''},
          {isType: 'column', prop: 'bank_config_namer', label: '开户行', width: ''},
          {isType: 'column', prop: 'bank_name', label: '开户分行', width: ''},
          {isType: 'column', prop: 'bank_no', label: '银行卡号', width: ''},
          {isType: 'button', prop: '', label: '操作', width: '', btnArr: [{size: 'mini', type: 'text', label: '修改', evenName: 'handleClick', attr: ''}]}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
        dialogConfig: {
          title: '修改银行卡',
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
          {isType: 'input', label: '账户手机', placeholder: '账户手机', disabled: false, model: 'mobile'},
          {isType: 'input', label: '开户名', placeholder: '开户名', disabled: false, model: 'account_name'},
          {isType: 'banks', label: '开户行', placeholder: '开户行', disabled: false, model: 'bank_config_name', selectArr: []},
          {isType: 'input', label: '开户分行', placeholder: '开户分行', disabled: false, model: 'bank_name'},
          {isType: 'input', label: '银行卡号', placeholder: '银行卡号', disabled: false, model: 'bank_no'}
        ],
        listData: []
      }
    },
    mounted () {
      this.getRecharge()
    },
    destroyed () {
    },
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '2-6') {
          this.getRecharge()
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
        this.getRecharge(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getRecharge(this.paginationConfig)
      },
      handleClick (val) {
        this.dialogConfig.visible = true
        this.dialogForm = val
        this.getBankList()
      },
//     获取银行列表
      getRecharge (queryData, n) {
        queryData = Object.assign(this.searchModel, queryData)
        let el = this
        el.$store.commit('setLoading', true)
        el.$http(el.$api.getBanks, queryData, 'get')
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
      Determine (val) {
        let queryData = val
//        queryData.bank_no = Number(val.bank_no)
        let el = this
        el.$store.commit('setLoading', true)
        el.$http(el.$api.upBank, queryData)
          .then((res) => {
            el.$store.commit('setLoading', false)
            if (res.code === 1) {
              this.getRecharge()
              this.dialogConfig.visible = false
              this.$message({ message: res.msg, type: 'success' })
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            el.$store.commit('setLoading', false)
            console.log(error)
          })
      },
      getBankList () {
        let el = this
        el.$http(el.$api.getConfigBanks)
          .then((res) => {
            if (res.code === 1) {
              this.dialogData.forEach((o, i) => {
                if (o.isType === 'banks') {
                  o.selectArr = Object.values(res.data)
                }
              })
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
