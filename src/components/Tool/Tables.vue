<!--记录表格-->
<template>
  <div>
    <el-table :data="tableData" size="mini" border>
      <template v-for="item in listProps">
        <el-table-column v-if="item.isType === 'z'" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
        <el-table-column v-if="item.isType === 't'" :prop="item.prop" :label="item.label" :width="item.width">
          <template slot-scope="props">
            {{props.row[item.prop] | YMR}}
          </template>
        </el-table-column>
        <el-table-column v-if="item.isType === 's'" :prop="item.prop" :label="item.label" :width="item.width">
          <template slot-scope="props">
            <template v-for="list in item.arr">
              <span v-if="list.start === props.row[item.prop]">{{list.text}}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column v-if="item.isType === 'b'" :prop="item.prop" :label="item.label" :width="item.width">
          <template slot-scope="props">
            <template v-for="list in item.button">
              <el-button :type="list.type" @click="jumpPath(list.evenName, props.row)">{{list.text}}</el-button>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!--<div style="text-align: right;margin-top: 20px">-->
      <!--<el-pagination-->
        <!--@current-change="changeSize"-->
        <!--layout="prev, pager, next"-->
        <!--:page-size="15"-->
        <!--:total="total">-->
      <!--</el-pagination>-->
    <!--</div>-->
  </div>
</template>
<script>
  export default {
    mixins: [],
    props: ['tableData', 'listProps', 'total'],
    data () {
      return {
//        tableData: [],
//        listProps: [
//          {isType: 't', prop: 'created_at', label: '日期', width: ''},
//          {isType: 'z', prop: 'ordersn', label: '编号', width: ''},
//          {isType: 'b', prop: 'balance', label: '编号', width: '', button: [{type: '', evenName: '' ,text: '' }]}
//        ],
//        total: 0
      }
    },
    mounted () {},
    destroyed () {
    },
    watch: {},
    methods: {
      jumpPath (evenName, val) {
        this.$emit(evenName, val)
      },
      changeSize (val) {
        this.$emit('changeSize', val)
      }
    }
  }
</script>
<style scoped>
  .el-menu{
    text-align: left;
    height: 600px;
  }
  .el-table .cell .textVertical{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
</style>
