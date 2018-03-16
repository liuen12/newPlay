<!--分页-->
<template>
  <el-pagination
    background
    @current-change="currentChange"
    :page-size="15"
    :layout="paginationConfig.layout"
    :total="parseInt(paginationConfig.total)">
  </el-pagination>
</template>
<script>
  export default {
    mixins: [],
    props: ['paginationConfig'],
    data () {
      return {
//        paginationConfig: {
//          layout: 'prev, pager, next',
//          total: 1000
//        }
      }
    },
    updated () {},
    mounted () {},
    destroyed () {},
    watch: {},
    methods: {
      currentChange (val) {
        this.$emit('currentChange', val)
      }
    }
  }
</script>
<style scoped>

</style>
