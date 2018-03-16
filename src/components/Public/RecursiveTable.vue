<!--记录表格-->
<template>
    <el-table
      border
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
</template>
<script>
  export default {
    name: 'Recursive',
    mixins: [],
    props: [],
    data () {
      return {
        tableData: [{date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          lsit: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }]
        }]
      }
    },
    mounted () {},
    destroyed () {},
    watch: {},
    methods: {}
  }
</script>
<style scoped>
</style>
