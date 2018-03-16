<!--幫助配置-->
<template>
  <el-row>
<!--搜索-->
    <SearchBox style="text-align: left"
       :searchModel="searchModel"
       :searchData="searchData"
       :searchConfig="searchConfig"
       @addHelp="addHelp"
    />
<!--Table-->
    <PublicTable
      :TableData="TableData"
      :TableLabel="TableLabel"
      @addHelp="addHelp"
      @delHelp="delHelp"
    />
<!--分页-->
    <Pagination class="Pagination"
        :paginationConfig="paginationConfig"
        @currentChange="currentChange"/>

    <el-dialog title="提示" :visible.sync="dialogQuill" width="100%" top="0%">
      <el-form name="Quills" :model="QuillData" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="QuillData.tilte" placeholder="标题名称"></el-input>
        </el-form-item>
        <el-form-item>
          <Editor
            :upUrl="upUrl"
            :cont="cont"
            @getContent="getContent"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogQuill = false">取 消</el-button>
        <el-button type="primary" @click="Protocol">保 存</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
  import Editor from '../Tool/Editor.vue'
  export default {
    mixins: [],
    props: ['contents'],
    components: {Editor},
    data () {
      return {
        //      搜索
        searchModel: {},
        searchData: [
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'addHelp', evenText: '添加帮助', attr: 'h'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'column', prop: 'id', label: '会员账号', width: '80'},
          {isType: 'column', prop: 'tilte', label: '标题', width: ''},
          {isType: 'column', prop: 'update_at', label: '创建时间', width: ''},
          {isType: 'button', prop: '', label: '操作', width: '260', btnArr: [{size: 'mini', type: 'text', label: '修改', evenName: 'addHelp', attr: 's'}, {size: 'mini', type: 'text', label: '删除', evenName: 'delHelp', attr: ''}]}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
//        upUrl: 'http://192.168.1.188:8081/image',
        upUrl: `http://${window.location.hostname}:8005/image`,
        cont: '',
        HelpData: [],
        isAu: '',
        dialogQuill: false,
        QuillData: {
          id: '',
          content: '',
          tilte: ''
        }
      }
    },
    mounted () {
      this.getHelpDataList()
    },
    computed: {},
    destroyed () {},
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '1-15') {
          this.getHelpDataList()
        }
      }
    },
    methods: {
//     搜索
      search (val) {
        this.getUserList(val)
      },
      currentChange (val) {
        this.paginationConfig.page = val
        this.getUserList(this.paginationConfig)
      },
//    幫助列表
      getHelpDataList (queryData) {
        this.queryData = queryData || {}
        let el = this
        this.$store.commit('setLoading', true)
        el.$http(el.$api.getHelp, queryData)
          .then((res) => {
            this.$store.commit('setLoading', false)
            if (res.code === 1) {
              el.TableData = []
              el.TableData = Object.values(res.data)
              el.paginationConfig.total = res.pageInfo.TotalItem
            } else if (res.code === 0) {
              el.TableData = []
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
      getContent (val) {
        this.QuillData.content = val
      },
      addHelp (val, vals) {
        this.isAu = vals
        if (this.isAu === 'h') {
          for (let q in this.QuillData) {
            this.QuillData[q] = ''
          }
          this.cont = ''
        }
        if (this.isAu === 's') {
          for (let y in val) {
            for (let q in this.QuillData) {
              if (y === q) {
                this.QuillData[q] = val[y]
              }
            }
          }
          this.cont = this.QuillData.content
        }
        this.dialogQuill = true
      },
//    删除帮助
      delHelp (val) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http(this.$api.delHelp, {id: val.id})
            .then(res => {
              if (res.code === 1) {
                this.getHelpDataList()
                this.$message({ type: 'success', message: '删除成功!' })
              } else {
                this.$message.error(res.msg)
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      Protocol () {
        let HURL = ''
        if (this.isAu === 'h') {
          HURL = this.$api.setHelp
        } else if (this.isAu === 's') {
          HURL = this.$api.uptHelp
        }
        this.$http(HURL, this.QuillData)
          .then(res => {
            if (res.code === 1) {
              this.isAu = ''
              this.dialogQuill = false
              this.getHelpDataList()
              this.$message(res.msg)
            } else {
              this.$message.error(res.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>
<style scoped>
</style>
