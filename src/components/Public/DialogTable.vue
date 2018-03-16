<!--DialogBox-->
<template>
  <el-dialog
      :title="dialogTableConfig.title"
      :visible.sync="dialogTableConfig.visible"
      :width="dialogTableConfig.width"
      :top="dialogTableConfig.top">
    <el-table
        :data="dialogTableData"
        size="mini"
        border
        :show-header='dialogTableConfig.showHeader'
        :row-class-name="tableRowClassName"
        style="width: 100%">
      <template v-for="(item, $item) in dialogTableLabel">
        <el-table-column v-if="item.isType === 'column'" :prop="item.prop" :label="item.label" :width="item.width" :key="$item">
          <template slot-scope="scope">
            <span :style="`color: ${item.color}`">{{scope.row[item.prop]}}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
      <span slot="footer" class="dialog-footer dialog-btn">
        <template v-for="btns in dialogTableConfig.buttonArr">
          <el-button size="mini" @click="EnbsClick(btns.evenName)" :key="btns.evenText">{{btns.evenText}}</el-button>
        </template>
      </span>
  </el-dialog>
</template>
<script>
  export default {
    mixins: [],
    props: ['dialogTableConfig', 'dialogTableData', 'dialogTableLabel'],
    data () {
      return {
//        dialogTableData: [{
//          date: '2016-05-02',
//          name: '王小虎',
//          address: '上海市普陀区金沙江路 1518 弄'
//        }],
//        dialogTableLabel: [
//          {isType: 'column', prop: 'name', label: '手机号码', width: ''},
//          {isType: 'column', prop: 'name', label: '手机号码', width: ''}
//        ],
//        dialogTableConfig: {
//          title: '提示',
//          visible: true,
//          width: '30%',
//          showHeader: false,
//          dialogLabelWidth: '80px',
//          buttonArr: [
//            {type: 'primary', size: 'mini', evenName: 'CloseDialog', evenText: '取 消', attr: ''},
//            {type: 'primary', size: 'mini', evenName: 'Determine', evenText: '确 定', attr: ''}
//          ]
//        }
      }
    },
    mounted () {},
    destroyed () {},
    watch: {},
    methods: {
      EnbsClick (evenName, val) {
        if (evenName === '') {
          this.dialogConfig.visible = false
        } else {
          this.$emit(evenName, val)
        }
      }
    }
  }
</script>
<style scoped>
  .dialog-btn{
    justify-content: space-between;width: 100%;display: inline-flex;
  }
</style>
