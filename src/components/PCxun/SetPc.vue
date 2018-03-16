<template>
    <div>
      <el-col style="text-align: left;padding-left: 18px">
        <el-form :inline="true" :model="Page" class="demo-form-inline">
          <el-form-item>
            <el-button size="mini" type="primary" @click="addPC">添加站点位置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <Tables
        :tableData="tableData"
        :listProps="listProps"
        :total="total"
        @DetialList="DetialList"
        @xiuList="xiuList"
      />
      <Pagination class="Pagination"
          :paginationConfig="paginationConfig"
          @currentChange="currentChange"/>
      <BomBox
        :config="config"
        :formData="formData"
        :labelData="labelData"
        @deposit="deposit"
        @xiusit="xiusit"
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
          title: '添加位置',
          width: '35%',
          labelWidth: '90px',
          SubmitText: '确定',
          evenName: 'deposit'
        },
        formData: {
          id: '',
          name: '',
          position_key: ''
        },
        labelData: [
          {isType: 'input', props: 'id', label: 'ID', placeholder: 'ID', text: '', disabled: false},
          {isType: 'input', props: 'name', label: '名称', placeholder: '名称', text: ''},
          {isType: 'input', props: 'position_key', label: '位置标识', placeholder: '位置标识', disabled: false, text: '', upConfig: {type: 'primary', text: '上传图片', upUrl: 'pcImage', src: '', keys: 'image'}}
        ],
//      表单
        tableData: [],
        listProps: [
          {isType: 'z', prop: 'id', label: 'ID', width: '100px'},
          {isType: 'z', prop: 'name', label: 'Title', width: ''},
          {isType: 'z', prop: 'position_key', label: '标识', width: ''},
          {isType: 't', prop: 'created_at', label: '日期', width: '100px'},
          {isType: 'b', prop: 'balance', label: '操作', width: '300px', button: [{type: 'text', evenName: 'DetialList', text: '详情'}, {type: 'text', evenName: 'xiuList', text: '修改'}]}
        ],
        total: 0,
  //      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        }
      }
    },
    mounted () {
      this.getPositions()
    },
    destroyed () {},
    watch: {},
    methods: {
      getPositions (val) {
        this.$store.commit('setLoading', true)
        this.$http(this.$api.getPosition, val)
          .then(res => {
            this.$store.commit('setLoading', false)
            if (res.code === 1) {
              this.tableData = Object.values(res.data)
              this.paginationConfig.total = res.pageInfo.TotalItem
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      currentChange (val) {
        this.paginationConfig.page = val
        this.getPositions(this.paginationConfig)
      },
      addPC () {
        this.formData = {}
        this.config.title = '添加位置'
        this.config.evenName = 'deposit'
        let con = [{id: {disabled: true}}]
        this.Processing(this.labelData, con)
        this.config.Dialog = true
      },
//     详情
      DetialList (val) {
        let target = {}
        target.content = 'Detial'
        target.name = '9-12'
        target.title = '详情'
        this.$store.commit('addTabs', target)
        this.$store.commit('addAgentGroup', val)
      },
      deposit (val) {
        let listData = {}
        listData = val
        this.$http(this.$api.setPosition, listData)
          .then(res => {
            if (res.code === 1) {
              this.config.Dialog = false
              this.getPositions()
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
      xiuList (val) {
        if (val.is_images === 1) {
          this.config.imgUrl = val.value
        } else {
          this.config.imgUrl = ''
        }
        this.config.title = '修改'
        this.config.evenName = 'xiusit'
        for (let y in val) {
          for (let i in this.formData) {
            if (y === i) {
              this.formData[i] = val[y]
            }
          }
        }
        let con = [{id: {disabled: true}}, {position_key: {disabled: true}}]
        this.Processing(this.labelData, con)
        this.config.Dialog = true
      },
      xiusit (val) {
        let listData = {}
        listData = val
        this.$http(this.$api.upPosition, listData)
          .then((res) => {
            if (res.code === 1) {
              this.config.Dialog = false
              this.getPositions()
              this.$message(res.msg)
            }
            if (res.code === 0) {
              this.$message.error(res.msg)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
</script>
<style scoped>
</style>
