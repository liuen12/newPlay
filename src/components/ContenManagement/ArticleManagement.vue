<!--资讯管理-->
<template>
  <el-row>
    <!--搜索-->
    <SearchBox style="text-align: left"
       :searchModel="searchModel"
       :searchData="searchData"
       :searchConfig="searchConfig"
       @addCon="addCon"
    />
    <!--Table-->
    <PublicTable
      :TableData="TableData"
      :TableLabel="TableLabel"
      @revise="revise"
      @delRevise="delRevise"
      @autoSort="autoSort"
    />
    <!--分页-->
    <Pagination class="Pagination"
        :paginationConfig="paginationConfig"
        @currentChange="currentChange"/>
    <el-dialog title="提示" :visible.sync="dialogQuill" width="100%" top="0%">
      <el-form name="Quills" id="Quills" size="mini" :inline="true" :model="QuillData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="QuillData.title" placeholder="标题名称"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <input id="Img" type="file" title="JPG,GIF,PNG" name="image" @change="getImg">
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
        <el-button size="mini" @click="dialogQuill = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="Protocol">保 存</el-button>
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
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'addCon', evenText: '添加资讯'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'column', prop: 'id', label: 'ID', width: '60'},
          {isType: 'autoSort', prop: 'displayorder', label: '排序', width: '100'},
          {isType: 'column', prop: 'title', label: '标题', width: ''},
          {isType: 'column', prop: 'update_at', label: '创建时间', width: ''},
          {isType: 'button', prop: '', label: '操作', width: '200', btnArr: [{size: 'mini', type: 'text', label: '修改', evenName: 'revise', attr: 'a'}, {size: 'mini', type: 'text', label: '删除', evenName: 'delRevise', attr: ''}]}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
//        upUrl: 'http://192.168.1.188:8081/image',
        upUrl: `http://${window.location.hostname}:8005/image`,
        cont: '',
        informationListData: [],
        dialogQuill: false,
        QuillData: {
          id: '',
          type: '',
          content: '',
          title: '',
          image: '',
          is_position: ''
        },
        isQuill: '',
        editorOption: {}
      }
    },
    mounted () {
      this.getInformationList()
    },
    computed: {},
    destroyed () {},
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '1-5') {
          this.getInformationList()
        }
      }
    },
    methods: {
      search (val) {
        this.getInformationList(val)
      },
      currentChange (val) {
        this.paginationConfig.page = val
        this.getInformationList(this.paginationConfig)
      },
      addCon () {
        this.revise(undefined, 'b')
      },
      autoSort (val) {
        if (val === 1) {
          this.getInformationList()
        }
      },
//     获取询价列表
      getInformationList (queryData) {
        this.queryData = queryData || {}
        let el = this
        this.$store.commit('setLoading', true)
        el.$http(el.$api.getInformation, queryData)
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
          el.QuillData.type = ''
          el.QuillData.content = ''
          el.QuillData.title = ''
          el.QuillData = el.copyObj(row, el.QuillData)
          el.cont = row.content
        }
        if (n === 'b') {
          el.QuillData.type = ''
          el.QuillData.content = ''
          el.QuillData.title = ''
          el.cont = ''
        }
        el.dialogQuill = true
      },
      Protocol () {
        let el = this
        let httpURL = ''
        let queryData = {}
        queryData = el.QuillData
        if (el.isQuill === 'a') {
          httpURL = el.$api.updateInformation
        }
        if (el.isQuill === 'b') {
          httpURL = el.$api.addInformation
        }
        el.$http(httpURL, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$message(res.msg)
              el.getInformationList()
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
        this.$alert('确定要删除？', '删除资讯', {
          confirmButtonText: '确定',
          callback: action => {
            el.$http(el.$api.delInformation, queryData)
              .then((res) => {
                if (res.code === 1) {
                  el.$message(res.msg)
                  el.getInformationList()
                  el.informationListData.forEach(function (i, o) {
                    if (i.id === row.id) {
                      el.informationListData.splice(o, 1)
                    }
                  })
                } else if (res.code === 0) {
                  el.$message.error(res.msg)
                }
              }, (error) => {
                console.log(error)
              })
          }
        })
      },
      getImg (e) {
        let el = this
        let img = e.target.files[0]
        if (!img) {
          return
        }
        if (!(img.type.indexOf('image') === 0 && img.type && /\.(?:jpg|png|gif)$/.test(img.name))) {
          alert('图片只能是jpg,gif,png')
        } else {
          let reader = new FileReader()
          reader.readAsDataURL(img)
          reader.onload = function (e) {
            el.QuillData.image = e.target.result
          }
        }
      },
      getContent (val) {
        this.QuillData.content = val
      }
    }
  }
</script>
<style scoped>
</style>
