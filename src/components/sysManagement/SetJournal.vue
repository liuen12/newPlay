<!--暂时没用流水日志-->
<template>
  <el-row>
    <el-col style="text-align: left;padding-left: 18px">
      <el-form :inline="true" :model="Page" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="Page.mobile" placeholder="用户手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="Page.arrTime" type="daterange" placeholder="选择日期范围"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item style="float: right;padding-right: 20px">
          <el-button type="primary" @click="downloadAll">导出Excel</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col>
      <el-table :data="journalData" border style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="id" label="ID" width="150"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="170"></el-table-column>
        <el-table-column prop="user_name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="is_admin" label="是否是平台" width="120">
          <template slot-scope="scope">
            <span v-text="scope.row.is_admin === 1 ? '是' : '否'"></span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="下单冻结订单资金"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
      </el-table>
    </el-col>
    <el-col :span="12" :offset="12">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="Page.CurrPage"
        :page-sizes="[10, 15, 20]"
        :page-size='Page.PageSize'
        layout="total, sizes, prev, pager, next, jumper"
        :total='Page.TotalItem'>
      </el-pagination>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    mixins: [],
    props: ['contents'],
    data () {
      return {
        journalData: [],
        tHeader: ['ID', '手机号码', '姓名', '是否是平台', '下单冻结订单资金', '内容'],
        listData: []
      }
    },
    mounted () {
      this.getJournalList()
    },
    destroyed () {
    },
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '5-3') {
          this.getJournalList()
        }
      }
    },
    methods: {
//      获取询价列表
      getJournalList (queryData, n) {
        this.queryData = queryData || {}
        let el = this
        el.$store.commit('setLoading', true)
        el.$http(el.$api.getAcclogs, queryData, 'get')
          .then((res) => {
            el.$store.commit('setLoading', false)
            if (res.code === 1) {
              if (n === 'all') {
                el.listData = Object.values(res.data)
                console.log(el.listData)
              } else {
                el.journalData = []
                el.journalData = Object.values(res.data)
                el.Page = el.copyObj(res.pageInfo, el.Page)
              }
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    全部导出表格
      downloadAll () {
        this.Page.export = 'all'
        this.getJournalList(this.Page, 'all')
        let TableKey = ['id', 'mobile', 'user_name', 'is_admin', 'name', 'content']
        setTimeout(() => this.exportExcel(this.tHeader, TableKey, this.listData, '流水日志'), 800)
      }
    }
  }
</script>
<style scoped>
</style>
