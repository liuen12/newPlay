<template>
    <div>
      <el-col style="text-align: left;padding-left: 18px">
        <el-form :inline="true" :model="Page" class="demo-form-inline">
          <el-form-item>
            <el-button size="mini" type="primary" @click="addPC">添加详情</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <Tables
        :tableData="tableData"
        :listProps="listProps"
        :total="total"
        @DetialList="DetialList"
        @balList="balList"
      />
      <Pagination class="Pagination"
          :paginationConfig="paginationConfig"
          @currentChange="currentChange"/>
      <BomBox
        :config="config"
        :formData="formData"
        :labelData="labelData"
        @deposit="deposit"
        @balsit="balsit"
        @setImgUrl="setImgUrl"
      />
    </div>
</template>
<script>
  import BomBox from './../Tool/BombBox'
  import Tables from './../Tool/Tables'
  export default {
    mixins: [],
    components: {BomBox, Tables},
    data () {
      return {
//        分页
        Page: {
          CurrPage: 0,
          PageSize: 15,
          TotalItem: 0,
          page: 1,
          TotalPage: 0
        },
        config: {
          labelPosition: '',
          Dialog: false,
          title: 'PC站点配置',
          width: '35%',
          labelWidth: '90px',
          SubmitText: '确定',
          evenName: 'deposit',
          action: '',
          imgUrl: ''
        },
        formData: {
          title: '',
          key: '',
          value: '',
          sub_content: '',
          is_images: ''
        },
        labelData: [
          {isType: 'input', props: 'title', label: '标题', placeholder: '标题', text: 'qweqw', disabled: false},
          {isType: 'input', props: 'key', label: '标识', placeholder: '标识', text: '', disabled: false},
          {isType: 'area', props: 'value', label: '内容', placeholder: '内容', text: '', disabled: false},
          {isType: 'input', props: 'sub_content', label: '链接地址', placeholder: '链接地址', text: '', disabled: false},
          {isType: 'img', props: 'value', label: '位置图片', placeholder: '位置图片', text: '', disabled: false, upConfig: {type: 'primary', text: '上传图片', upUrl: `http://${window.location.hostname}:8005/image`, src: '', keys: 'image'}},
          {isType: 'switch', props: 'is_images', label: '是不是图片', placeholder: '名称', text: '', disabled: false}
        ],
//      表单
        tableData: [],
        listProps: [
          {isType: 'z', prop: 'id', label: 'ID', width: '60px'},
          {isType: 'z', prop: 'title', label: 'Title', width: '100px'},
          {isType: 'z', prop: 'name', label: '位置', width: ''},
          {isType: 'z', prop: 'value', label: '内容', width: ''},
          {isType: 'z', prop: 'sub_content', label: '链接地址', width: ''},
          {isType: 'b', prop: 'balance', label: '操作', width: '300px', button: [{type: 'text', evenName: 'balList', text: '修改'}]}
        ],
        total: 0,
        position_key: '',
        keyID: '',
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        }
      }
    },
    mounted () {
      this.DetialList()
    },
    computed: {
      getPostion () {
        return this.$store.state.agentGroup.position_key
      }
    },
    destroyed () {},
    watch: {
      'getPostion' (val) {
        this.position_key = val
        this.tableData = []
        this.DetialList()
      }
    },
    methods: {
      DetialList (val) {
        let QueryData = {}
        this.$store.commit('setLoading', true)
        QueryData.position_key = this.position_key || this.$store.state.agentGroup.position_key
        this.$http(this.$api.getPcsite, QueryData, val)
          .then(res => {
            this.$store.commit('setLoading', false)
            if (res.code === 1) {
              this.tableData = Object.values(res.data)
              this.paginationConfig.total = res.pageInfo.TotalItem
            }
          })
          .then(err => {
            console.log(err)
          })
      },
      currentChange (val) {
        this.paginationConfig.page = val
        this.DetialList(this.paginationConfig)
      },
//     添加
      addPC () {
        this.formData = {}
        this.config.imgUrl = ''
        this.config.Dialog = true
        this.config.title = '添加详情'
        this.config.evenName = 'deposit'
        this.config.action = 'add'
        let con = [{key: {disabled: false}}]
        this.Processing(this.labelData, con)
      },
      deposit (val) {
        let listData = {}
        listData = JSON.parse(JSON.stringify(val))
        listData.position_key = this.position_key || this.$store.state.agentGroup.position_key
        this.$http(this.$api.setPcsite, listData)
          .then(res => {
            if (res.code === 1) {
              this.config.Dialog = false
              this.DetialList()
              this.$message(res.msg)
            }
            if (res.code === 0) {
              this.$message.error(res.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
//    修改配置组
      balList (val) {
        this.config.imgUrl = val.is_images === 1 ? val.value : ''
        this.formData = {}
        this.config.Dialog = true
        this.config.title = '修改'
        this.config.evenName = 'balsit'
        this.config.action = 'edit'
        this.keyID = val.id
        this.labelData.forEach((o, i) => {
          for (let k in val) {
            if (o.props === k) {
              this.formData[k] = val[k]
            }
          }
        })
        let con = [{key: {disabled: true}}]
        this.Processing(this.labelData, con)
      },
      setImgUrl (val) {
        this.config.imgUrl = val
      },
      balsit (val) {
        let listData = {}
        listData = val
        listData.id = this.keyID
        this.$http(this.$api.upPcsite, listData)
          .then(res => {
            if (res.code === 1) {
              this.config.Dialog = false
              this.DetialList()
              this.$message(res.msg)
            }
            if (res.code === 0) {
              this.$message.error(res.msg)
            }
          })
          .then(err => {
            console.log(err)
          })
      }
    }
  }
</script>
<style scoped>
</style>
