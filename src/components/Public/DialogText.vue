<!--DialogBox-->
<template>
  <el-dialog
      :title="dialogConfig.title"
      :visible.sync="dialogConfig.visible"
      :width="dialogConfig.width"
      :top="dialogConfig.top">
    <span>
      {{dialogData}}
    </span>
      <span slot="footer" class="dialog-footer">
        <template v-for="btns in dialogConfig.buttonArr">
          <el-button size="mini" @click="EnbsClick(btns.evenName)" :key="btns.evenText">{{btns.evenText}}</el-button>
        </template>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    mixins: [],
    props: ['dialogConfig', 'dialogData'],
    data () {
      return {
//        dialogConfig: {
//          title: '提示',
//          visible: true,
//          width: '30%',
//          dialogLabelWidth: '80px',
//          buttonArr: [
//            {type: 'primary', size: 'mini', evenName: 'CloseDialog', evenText: '取 消', attr: ''},
//            {type: 'primary', size: 'mini', evenName: 'Determine', evenText: '确 定', attr: ''}
//          ]
//        },
//        dialogData: ''
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
</style>
