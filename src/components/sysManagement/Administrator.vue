<!--平台资金管控-->
<template>
  <el-row>
    <!--Table-->
    <PublicTable
      :TableData="TableData"
      :TableLabel="TableLabel"
      />
    <!--分页-->
    <Pagination class="Pagination"
      :paginationConfig="paginationConfig"
      @currentChange="currentChange"/>
  </el-row>
</template>
<script>
  export default {
    mixins: [],
    props: ['contents'],
    data () {
      return {
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'column', prop: 'platform_na', label: '平台', width: ''},
          {isType: 'column', prop: 'platform_m', label: '管理费', width: ''},
          {isType: 'column', prop: 'platform_sc', label: '管理费率（‱）', width: ''}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        }
      }
    },
    mounted () {
      this.getCapital()
    },
    destroyed () {
    },
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '5-10') {
          this.getSite()
        }
      }
    },
    methods: {
      scoutAround (val) {
        this.getUserList(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getUserList(this.paginationConfig)
      },
      getCapital () {
        let el = this
        el.$store.commit('setLoading', true)
        el.$http(el.$api.getCapital)
          .then((res) => {
            el.$store.commit('setLoading', false)
            if (res.code === 1) {
              el.TableData = Object.values(res.data)
              el.paginationConfig.total = res.pageInfo.TotalItem || 1
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
</script>
<style scoped>
  .el-card{
    margin-top: 15px;
  }
  .card{
    line-height: 36px;
    font-weight: bold;
    float: left
  }
  .text {
    font-size: 14px;
    height: 55px;
    width: 400px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .item {
    padding: 18px 0;
    text-align: left;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
    text-align: left;
  }
  .clearfix:after {
    clear: both
  }
</style>
