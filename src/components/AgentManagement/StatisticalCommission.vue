<!--统计佣金-->
<template>
</template>
<script>
  export default {
    mixins: [],
    data () {
      return {
        tableData: [{
          date: '2016',
          name: '王小虎',
          province: '1',
          city: '益峰电子',
          address: '0.00'
        },
        {
          date: '2016',
          name: '深圳恒泰王招商部',
          province: '1',
          city: '益峰电子',
          address: '0.00'
        },
        {
          date: '2016',
          name: '吴小丽',
          province: '1',
          city: '湖南永州道县风云电子商务有限公司',
          address: '0.00'
        },
        {
          date: '2016',
          name: '王小虎',
          province: '1',
          city: '益峰电子',
          address: '0.00'
        }],
        formInline: {},
        currentPage4: 4,
        multipleSelection: []
      }
    },
    mounted () {
    },
    destroyed () {
    },
    watch: {},
    methods: {
      onSubmit () {
        console.log('submit!')
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
//      选择项
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      }
    }
  }
</script>
<style scoped>
</style>
