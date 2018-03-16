<!--推广管理推广管理-->
<template>
  <el-row>
<!--搜索-->
    <SearchBox style="text-align: left"
       :searchModel="searchModel"
       :searchData="searchData"
       :searchConfig="searchConfig"
       @getGeneralize="getGeneralize"
    />
    <PublicTable
      :TableData="TableData"
      :TableLabel="TableLabel[isStaOrEx]"
      @enlargeImg="enlargeImg"
      />
<!--分页-->
    <Pagination class="Pagination"
        :paginationConfig="paginationConfig"
        @currentChange="currentChange"/>
    <el-dialog :title="agent.nameImg" :visible.sync="pImg" width="35%">
      <img style="height: 230px" :src="agent.oImg" alt="推广二维码">
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
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'getGeneralize', evenText: '代理商', attr: 1}, {type: 'primary', evenName: 'getGeneralize', evenText: '员工', attr: 2}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: {
          '1': [
            {isType: 'column', prop: 'id', label: '序号', width: ''},
            {isType: 'column', prop: 'agent_key_no', label: '代理商编号', width: ''},
            {isType: 'column', prop: 'area', label: '代理商区域', width: ''},
            {isType: 'column', prop: 'redeem_code', label: '邀请码', width: ''},
            {isType: 'column', prop: 'wap_link', label: '推广链接', width: ''},
            {isType: 'image', prop: 'link_code', label: '推广二维码', width: ''}
          ],
          '2': [
            {isType: 'column', prop: 'id', label: '序号', width: ''},
            {isType: 'column', prop: 'agent_key_no', label: '代理商编号', width: ''},
            {isType: 'column', prop: 'staff_key_no', label: '员工编号', width: ''},
            {isType: 'column', prop: 'staff_name', label: '员工名称', width: ''},
            {isType: 'column', prop: 'area', label: '代理商区域', width: ''},
            {isType: 'column', prop: 'redeem_code', label: '邀请码', width: ''},
            {isType: 'column', prop: 'wap_link', label: '推广链接', width: ''},
            {isType: 'image', prop: 'link_code', label: '推广二维码', width: ''}
          ]
        },
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
        isStaOrEx: 1,
        pImg: false,
        agent: {
          oImg: '',
          nameImg: ''
        }
      }
    },
    mounted () {
      this.getGeneralize()
    },
    destroyed () {
    },
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '6-7') {
          this.getGeneralize()
        }
      }
    },
    methods: {
      search (val) {
        this.getGeneralize(val)
      },
      currentChange (val) {
        this.paginationConfig.page = val
        this.getGeneralize(this.paginationConfig)
      },
//    获取推广列表
      getGeneralize (mode, n) {
        let el = this
        this.$store.commit('setLoading', true)
        let queryData = {}
        if (n === 2) {
          el.isStaOrEx = 2
        }
        if (n === 1) {
          el.isStaOrEx = 1
        }
        queryData.type = n || 1
        el.$http(el.$api.getGeneralize, queryData)
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
      enlargeImg (val) {
        this.pImg = true
        this.agent.nameImg = val.agent_name || val.staff_name
        this.agent.oImg = val.link_code
      }
    }
  }
</script>
<style scoped>
</style>
