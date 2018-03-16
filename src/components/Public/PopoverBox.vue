<!--表格内弹出款框-->
<template>
  <el-popover trigger="hover" placement="top">
    <template v-for="pop in PopoverData.popoverList">
      <p>{{pop.label}}: {{PopoverRow[pop.props] || pop.defaults}}</p>
    </template>
    <div v-if="PopoverData.isButConfig.isButton" style="text-align: center">
      <el-button size="mini" @click="cancel">{{PopoverData.isButConfig.cancel}}</el-button>
      <el-button size="mini" @click="mine">{{PopoverData.isButConfig.mine}}</el-button>
    </div>
    <div slot="reference" class="name-wrapper">
      <!--有状态-->
      <template v-if="PopoverData.isButConfig.isStatu === 'popTag'">
        <el-tag size="mini"  v-for="lists in PopoverData.statuList" :key="lists.label" v-if="lists.state === PopoverRow[PopoverData.isButConfig.props] " :style="`color: ${lists.color}`">{{lists.label}}</el-tag>
      </template>
      <!--没有状态-->
      <template v-else>
        <el-tag size="medium">{{PopoverRow[PopoverData.text] || PopoverData.defaults}}</el-tag>
      </template>
    </div>
  </el-popover>
</template>
<script>
  export default {
    mixins: [],
    props: ['PopoverRow', 'PopoverData'],
    data () {
      return {
//   数据格式w$$ 无状态 {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'staff_id', defaults: '0', popoverList: [{label: '所属员工', props: 'staff_name', defaults: '默认文本'}]}
//   数据格式w$$ 有状态 {isButConfig: {isButton: true,isStatu: 'popTag', cancel: '取消', mine: '确定'}, statuList: [{state: 0, label: '审核中', color: '#e6a23c'}, {state: 1, label: '审核通过', color: '#67c23a'}, {state: 2, label: '审核失败', color: '#f56c6c'}]}},
      }
    },
    mounted () {},
    destroyed () {},
    watch: {},
    methods: {
      cancel () {
        this.$emit('cancel', this.PopoverRow)
      },
      mine () {
        this.$emit('mine', this.PopoverRow)
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
