<!--股票配置-->
<template>
  <el-row>
    <el-col :xs="24" style="text-align: left">
      <SearchBox style="display: inline-block"
         :searchModel="searchModel"
         :searchData="searchData"
         :searchConfig="searchConfig"
         :upConfig="upConfig"
         @scoutAround="scoutAround"
         @downloadAll="downloadAll"
         @toolShow="toolShow"
         @dowTemplate="dowTemplate"
      />
      <!--<el-button type="primary" size="small" @click="downloadAll">导出Excel</el-button>-->
    </el-col>
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
      @upCode="upCode"
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
          {isType: 'input', label: '', model: 'code', placeholder: '标的代码'},
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}, {type: 'primary', evenName: 'dowTemplate', evenText: '下载模板'}, {isType: 'up', type: 'primary', evenName: 'search', evenText: '上传模板'}, {type: 'primary', evenName: 'downloadAll', evenText: '导出Excel'}, {type: 'primary', evenName: 'toolShow', evenText: '添加标的', attr: 'b'}, {type: 'primary', evenName: 'toolShow', evenText: '修改标的', attr: 'a'}]}
        ],
        upConfig: {
          type: 'primary',
          text: '上传模板',
          keys: 'key',
          upUrl: `http://${window.location.hostname}:8005/admin/image/upload`
//          upUrl: 'http://192.168.1.188:9293/admin/image/upload'
        },
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'selection', prop: '', label: 'ID', width: '50'},
          {isType: 'column', prop: 'name', label: '标的名称', width: ''},
          {isType: 'column', prop: 'code', label: '标的代码', width: ''},
          {isType: 'column', prop: 'one', label: '一个月', width: '60'},
          {isType: 'column', prop: 'two', label: '二个月', width: '60'},
          {isType: 'column', prop: 'three', label: '三个月', width: '60'},
          {isType: 'column', prop: 'four', label: '四个月', width: '60'},
          {isType: 'column', prop: 'five', label: '五个月', width: '60'},
          {isType: 'column', prop: 'six', label: '六个月', width: '60'},
          {isType: 'column', prop: 'seven', label: '七个月', width: '60'},
          {isType: 'column', prop: 'eight', label: '八个月', width: '60'},
          {isType: 'column', prop: 'nine', label: '九个月', width: '60'},
          {isType: 'column', prop: 'ten', label: '十个月', width: '60'},
          {isType: 'column', prop: 'eleven', label: '十一个月', width: ''},
          {isType: 'column', prop: 'twelve', label: '十二个月', width: ''},
          {isType: 'column', prop: 'fday', label: '五天', width: '60'},
          {isType: 'column', prop: 'tday', label: '十天', width: '60'},
          {isType: 'column', prop: 'fifteen', label: '十五天', width: '60'}
        ],
//      弹框数据
        dialogConfig: {
          title: '修改',
          visible: false,
          width: '35%',
          top: '2%',
          inline: true,
          dialogLabelWidth: '80px',
          buttonArr: [
            {type: 'primary', size: 'mini', evenName: '', evenText: '取 消', attr: ''},
            {type: 'primary', size: 'mini', evenName: 'upCode', evenText: '确 定', attr: ''}
          ]
        },
        dialogForm: {},
        dialogData: [
          {isType: 'input', label: '标的名称', placeholder: '标的名称', disabled: false, model: 'name', isSHow: true},
          {isType: 'input', label: '标的代码', placeholder: '标的代码', disabled: false, model: 'code', isSHow: true},
          {isType: 'select', label: '标的属性', placeholder: '标的属性', disabled: false, model: 'attributeCode', isSHow: true, selectArr: [{label: 'SH', value: 'SH'}, {label: 'SZ', value: 'SZ'}]},
//          {isType: 'select', label: '状态', placeholder: '状态', disabled: false, model: 'mstatus', isSHow: true, selectArr: [{label: '禁用', value: '0'}, {label: '正常', value: '1'}]},
          {isType: 'input', label: '一个月', placeholder: '一个月', disabled: false, model: 'one', isSHow: true},
          {isType: 'input', label: '二个月', placeholder: '二个月', disabled: false, model: 'two', isSHow: true},
          {isType: 'input', label: '三个月', placeholder: '三个月', disabled: false, model: 'three', isSHow: true},
          {isType: 'input', label: '四个月', placeholder: '四个月', disabled: false, model: 'four', isSHow: true},
          {isType: 'input', label: '五个月', placeholder: '五个月', disabled: false, model: 'five', isSHow: true},
          {isType: 'input', label: '六个月', placeholder: '六个月', disabled: false, model: 'six', isSHow: true},
          {isType: 'input', label: '七个月', placeholder: '七个月', disabled: false, model: 'seven', isSHow: true},
          {isType: 'input', label: '八个月', placeholder: '八个月', disabled: false, model: 'eight', isSHow: true},
          {isType: 'input', label: '九个月', placeholder: '九个月', disabled: false, model: 'nine', isSHow: true},
          {isType: 'input', label: '十个月', placeholder: '十个月', disabled: false, model: 'ten', isSHow: true},
          {isType: 'input', label: '十一个月', placeholder: '十一个月', disabled: false, model: 'eleven', isSHow: true},
          {isType: 'input', label: '十二个月', placeholder: '十二个月', disabled: false, model: 'twelve', isSHow: true},
          {isType: 'input', label: '五天', placeholder: '五天', disabled: false, model: 'fday', isSHow: true},
          {isType: 'input', label: '十天', placeholder: '十天', disabled: false, model: 'tday', isSHow: true},
          {isType: 'input', label: '十五天', placeholder: '十五天', disabled: false, model: 'fifteen', isSHow: true}
        ],
        multipleSelection: [],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
        listCodeData: [],
        listData: [],
        downUrl: `http://${window.location.hostname}:8005/报价模板列表.xlsx`,
//        downUrl: `http://192.168.1.188:8081/报价模板列表.xlsx`
        attr: ''
      }
    },
    mounted () {
      this.getListCode()
    },
    destroyed () {
    },
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '5-9') {
          this.getListCode()
        }
      }
    },
    methods: {
      scoutAround (val) {
        this.getListCode(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getListCode(this.paginationConfig)
      },
//     获取询价列表
      getListCode (queryData, n) {
        queryData = Object.assign(this.searchModel, queryData)
        let el = this
        el.$store.commit('setLoading', true)
        el.$http(el.$api.getCodeList, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$store.commit('setLoading', false)
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
      handleChange (val) {
        this.multipleSelection = val
      },
      toolShow (val, attr) {
        this.attr = attr
        this.dialogForm = {}
        if (attr === 'a') {
          let el = this
          if (el.multipleSelection.length === 0) {
            el.$message({message: '请选择要修改的标的', type: 'warning'})
            el.visible = false
            return false
          } else if (el.multipleSelection.length > 1) {
            el.$message.error('选择一个的操作哦！！')
            el.visible = false
            return false
          } else {
            this.dialogConfig.title = '修改标的'
            this.dialogForm = this.multipleSelection[0]
            this.dialogConfig.visible = true
          }
        } else {
          this.dialogConfig.visible = true
        }
      },
//    添加修改标的
      upCode (val) { // upCode
        let el = this
        let queryData = val
        if (this.attr === 'a') {
          el.$http(el.$api.upCode, queryData)
            .then((res) => {
              if (res.code === 1) {
                this.getListCode()
                this.dialogConfig.visible = false
                this.$message({ message: res.msg, type: 'success' })
              } else {
                this.$message.error(res.msg)
              }
            }, (error) => {
              console.log(error)
            })
        } else { // setOffer
          el.$http(el.$api.setOffer, queryData)
            .then((res) => {
              if (res.code === 1) {
                this.getListCode()
                this.dialogConfig.visible = false
                this.$message({ message: res.msg, type: 'success' })
              } else {
                this.$message.error(res.msg)
              }
            }, (error) => {
              console.log(error)
            })
        }
      },
//    下载模板
      dowTemplate () {
        window.location.href = this.downUrl
      },
//    全部导出表格
      downloadAll () {
        let Table = this.TableKey(this.TableLabel)
        this.exportExcel(Table[0], Table[1], this.TableData, '流水日志')
      }
    }
  }
</script>
<style scoped>
</style>
