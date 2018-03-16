<!--协议管理-->
<template>
  <el-row>
<!--搜索-->
    <SearchBox style="text-align: left"
         :searchModel="searchModel"
         :searchData="searchData"
         :searchConfig="searchConfig"
         @revises="revises"
    />
<!--Table-->
    <PublicTable
      :TableData="TableData"
      :TableLabel="TableLabel"
      @revise="revise"
      @delRevise="delRevise"
    />
<!--分页-->
    <Pagination class="Pagination"
          :paginationConfig="paginationConfig"
          @currentChange="currentChange"/>
<!--添加协议' : '修改协议'-->
    <el-dialog :title="isAgreement ? '添加协议' : '修改协议'" :visible.sync="dialogQuill" width="100%" top="0%">
      <el-form :inline="true" :model="QuillData"  size="mini" class="demo-form-inline">
        <el-form-item label="指定协议" v-if="QuillData.type !== 1">
          <el-select v-model="QuillData.is_position" placeholder="请选择指定协议">
            <el-option key="1" label="指定" :value="1"></el-option>
            <el-option key="2" label="未指定" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="协议类型">
          <el-select v-model="QuillData.type" placeholder="请选择协议类型">
            <el-option key="1" label="交易确认书" :value="1"></el-option>
            <el-option key="2" label="协议书" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="QuillData.title" placeholder="标题名称"></el-input>
        </el-form-item>
      </el-form>
      <quill-editor v-model="QuillData.content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)">
      </quill-editor>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogQuill = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="Protocol">保 存</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
import {quillEditor} from 'vue-quill-editor'
export default {
  mixins: [],
  props: ['contents'],
  components: {quillEditor},
  data () {
    return {
      //      搜索
      searchModel: {},
      searchData: [
        {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'revises', evenText: '添加协议'}]}
      ],
      searchConfig: {
        size: 'small'
      },
//      Table
      TableData: [],
      TableLabel: [
        {isType: 'column', prop: 'id', label: 'ID', width: ''},
        {isType: 'scope', prop: 'type', label: '协议类型', width: '', status: [{state: 0, label: '协议书'}, {state: 1, label: '交易确认书'}]},
        {isType: 'column', prop: 'title', label: '协议', width: ''},
        {isType: 'button', prop: '', label: '操作', width: '260', btnArr: [{size: 'mini', type: 'text', label: '修改', evenName: 'revise', attr: 'a'}, {size: 'mini', type: 'text', label: '删除', evenName: 'delRevise', attr: ''}]}
      ],
//      分页
      paginationConfig: {
        layout: 'prev, pager, next',
        total: ''
      },
      protocolData: [],
      dialogQuill: false,
      isAgreement: true,
      QuillData: {
        id: '',
        type: '',
        content: '',
        title: '',
        image: '',
        is_position: 0
      },
      isQuill: '',
      editorOption: {}
    }
  },
  mounted () {
    this.getProtocolList()
  },
  computed: {},
  destroyed () {},
  watch: {
    'contents': function (val) {
      if (val.active === true && val.name === '1-2') {
        this.getProtocolList()
      }
    }
  },
  methods: {
    search (val) {
      this.getProtocolList(val)
    },
    currentChange (val) {
      this.paginationConfig.page = val
      this.getProtocolList(this.paginationConfig)
    },
    revises () {
      this.revise(undefined, 'b')
    },
//  获取协议管理列表
    getProtocolList (queryData) {
      queryData = Object.assign(this.searchModel, queryData)
      let el = this
      this.$store.commit('setLoading', true)
      el.$http(el.$api.getProtocol, queryData)
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
//   修改协议信息
    revise (row, n) {
      let el = this
      el.isQuill = n
      if (n === 'a') {
        el.isAgreement = false
        el.QuillData.type = ''
        el.QuillData.content = ''
        el.QuillData.title = ''
        el.QuillData = el.copyObj(row, el.QuillData)
      }
      if (n === 'b') {
        el.isAgreement = true
        el.QuillData.type = ''
        el.QuillData.content = ''
        el.QuillData.title = ''
      }
      el.dialogQuill = true
    },
    Protocol () {
      let el = this
      let httpURL = ''
      let queryData = {}
      queryData = el.QuillData
      if (el.isQuill === 'a') {
        httpURL = el.$api.updateProtocol
      }
      if (el.isQuill === 'b') {
        httpURL = el.$api.addProtocol
      }
      el.$http(httpURL, queryData)
        .then((res) => {
          if (res.code === 1) {
            el.$message(res.msg)
            el.dialogQuill = false
          } else if (res.code === 0) {
            el.$message.error(res.msg)
          }
        }, (error) => {
          console.log(error)
        })
    },
    delRevise (row) {
      let el = this
      let queryData = {}
      queryData.id = row.id
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        el.$http(el.$api.delProtocol, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$message(res.msg)
              el.getProtocolList()
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      }).catch(() => {
        el.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    onEditorBlur (editor) {
//      console.log('editor onEditorBlur!', editor)
    },
    onEditorFocus (editor) {
//      console.log('editor onEditorFocus!', editor)
    },
    onEditorReady (editor) {
//      console.log('editor onEditorReady!', editor)
    }
  }
}
</script>
<style scoped>
</style>
