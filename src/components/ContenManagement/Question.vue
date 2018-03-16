<!--答卷信息-->
<template>
  <el-row>
    <!--Table-->
    <PublicTable
      :TableData="TableData"
      :TableLabel="TableLabel"
      @revise="revise"
    />
    <!--分页-->
    <Pagination class="Pagination"
            :paginationConfig="paginationConfig"
            @currentChange="currentChange"/>
    <el-dialog title="提示" :visible.sync="dialogQuill" width="30%" top="10%">
      <el-form size="mini"  :model="QuillData" class="demo-form-inline">
        <el-form-item label="修改选项">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"  v-model="QuillData.wenti"></el-input>
        </el-form-item>
        <el-form-item label="修改选项">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"  v-model="QuillData.daan"></el-input>
        </el-form-item>
        <el-form-item label="修改选项">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"  v-model="QuillData.getgrade"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogQuill = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="Protocol">保 存</el-button>
      </span>
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
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'addUserClick', evenText: '添加用户'}]},
          {isType: 'time', label: '', model: 'arrTime', placeholder: ''},
          {isType: 'input', label: '', model: 'user_id', placeholder: '用户ID'},
          {isType: 'input', label: '', model: 'agent_id', placeholder: '代理商ID'},
          {isType: 'input', label: '', model: 'mobile', placeholder: '手机号码'},
          {isType: 'input', label: '', model: 'user_name', placeholder: '姓名'},
//          {isType: 'select', label: '', model: 'd', placeholder: 'asd', selectArr: [{label: '', value: ''}]},
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'search', evenText: '查询'}, {type: 'primary', evenName: 'downloadAll', evenText: '导出Excel'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'html', prop: 'id', label: 'ID', width: '60'},
          {isType: 'html', prop: 'wenti', label: '问题', width: ''},
          {isType: 'html', prop: 'daan', label: '答案', width: ''},
          {isType: 'html', prop: 'getgrade', label: '分值', width: '145'},
          {isType: 'button', prop: '', label: '操作', width: '260', btnArr: [{size: 'mini', type: 'text', label: '修改', evenName: 'revise', attr: ''}]}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
        dialogQuill: false,
        QuillData: {
          id: '',
          wenti: '',
          daan: '',
          getgrade: ''
        },
        isQuill: '',
        editorOption: {}
      }
    },
    mounted () {
      this.getTimulList()
    },
    computed: {},
    destroyed () {},
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '1-6') {
          this.getTimulList()
        }
      }
    },
    methods: {
      search (val) {
        this.getTimulList(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getTimulList(this.paginationConfig)
      },
//  获取答卷信息列表
      getTimulList (queryData) {
        this.queryData = queryData || {}
        let el = this
        this.$store.commit('setLoading', true)
        el.$http(el.$api.getTimu, queryData)
          .then((res) => {
            this.$store.commit('setLoading', false)
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
      },
//   修改答卷信息
      revise (row) {  //  isQuill
        let el = this
        el.QuillData = el.copyObj(row, el.QuillData)
        el.QuillData.content = el.QuillData.wenti
        el.dialogQuill = true
      },
      Protocol () {
        let el = this
        let queryData = {}
        queryData = el.QuillData
        el.$http(el.$api.updateTimu, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$message(res.msg)
              el.getTimulList()
              setTimeout(() => {
                el.dialogQuill = false
              }, 800)
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
      onEditorBlur (editor) {
//        console.log('editor onEditorBlur!', editor)
      },
      onEditorFocus (editor) {
//        console.log('editor onEditorFocus!', editor)
      },
      onEditorReady (editor) {
//        console.log('editor onEditorReady!', editor)
      }
    }
  }
</script>
<style scoped>
</style>
