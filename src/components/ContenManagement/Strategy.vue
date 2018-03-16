<!--广告管理-->
<template>
  <el-row>
    <!--搜索-->
    <SearchBox style="text-align: left"
       :searchModel="searchModel"
       :searchData="searchData"
       :searchConfig="searchConfig"
       @addAD="addAD"
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

    <el-dialog :title="isAdv ? '添加广告' : '修改广告'" :visible.sync="dialogQuill" width="30%" top="5%">
      <el-form  :model="QuillData" class="demo-form-inline" size="mini">
        <el-form-item label="标题">
          <el-input v-model="QuillData.title" placeholder="标题名称"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="QuillData.link" placeholder="链接"></el-input>
        </el-form-item>
        <el-form-item label="启用状态">
          <el-select v-model="QuillData.status" placeholder="请选择指定协议">
            <el-option key="1" label="启用" :value="1"></el-option>
            <el-option key="2" label="未启用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片">
          <input id="Img" type="file" title="JPG,GIF,PNG" name="image" @change="getImg">
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
//          {isType: 'select', label: '', model: 'd', placeholder: 'asd', selectArr: [{label: '', value: ''}]},
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'addAD', evenText: '添加广告'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'column', prop: 'id', label: 'ID', width: ''},
          {isType: 'column', prop: 'title', label: '广告IP', width: ''},
          {isType: 'scope', prop: 'status', label: '使用状态', width: '', status: [{state: 0, label: '未启用'}, {state: 1, label: '启用'}]},
          {isType: 'column', prop: 'link', label: '链接', width: ''},
          {isType: 'button', prop: '', label: '操作', width: '260', btnArr: [{size: 'mini', type: 'text', label: '修改', evenName: 'revise', attr: 'a'}, {size: 'mini', type: 'text', label: '删除', evenName: 'delRevise', attr: 't'}]}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
        adData: [],
        dialogQuill: false,
        isAdv: true,
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
      this.getAdList()
    },
    computed: {},
    destroyed () {},
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '1-7') {
          this.getAdList()
        }
      }
    },
    methods: {
//      搜索
      search (val) {
        this.getAdList(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getAdList(this.paginationConfig)
      },
      addAD () {
        this.revise(undefined, 'b')
      },
//   获取广告列表
      getAdList (queryData) {
        this.queryData = queryData || {}
        let el = this
        this.$store.commit('setLoading', true)
        el.$http(el.$api.getAd, queryData)
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
//   修改广告信息
      revise (row, n) {
        let el = this
        el.isQuill = n
        if (n === 'a') {
          el.isAdv = false
          el.QuillData.type = ''
          el.QuillData.content = ''
          el.QuillData.title = ''
          el.QuillData.is_position = ''
          el.QuillData = el.copyObj(row, el.QuillData)
        }
        if (n === 'b') {
          el.isAdv = true
          el.QuillData.type = ''
          el.QuillData.content = ''
          el.QuillData.title = ''
          el.QuillData.is_position = ''
        }
        el.dialogQuill = true
      },
      Protocol () {
        let el = this
        let httpURL = ''
        let queryData = {}
        queryData = el.QuillData
        if (el.isQuill === 'a') {
          httpURL = el.$api.updateAd
        }
        if (el.isQuill === 'b') {
          httpURL = el.$api.addAd
        }
        el.$http(httpURL, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$message(res.msg)
              el.getAdList()
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
      delRevise (row) {
        let el = this
        let queryData = {}
        queryData.id = row.id
        el.$http(el.$api.delAd, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$message(res.msg)
              el.getAdList()
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
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
      }
    }
  }
</script>
<style scoped>
</style>

