<!--DialogBox-->
<template>
  <el-dialog
      :title="dialogConfig.title"
      :visible.sync="dialogConfig.visible"
      :width="dialogConfig.width"
      :top="dialogConfig.top">
    <el-form :model="dialogForm" size="mini">
      <template v-for="list in dialogData">
        <el-form-item v-if="list.isType === 'input'"   :label="list.label" :label-width="dialogConfig.dialogLabelWidth">
          <el-input  v-model="dialogForm[list.model]" :placeholder="list.placeholder" :disabled="list.disabled" :key="list.model" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="list.isType === 'select'" :label="list.label" :label-width="dialogConfig.dialogLabelWidth">
          <el-select  v-model="dialogForm[list.model]" :placeholder="list.placeholder" :disabled="list.disabled" :key="list.model">
            <el-option v-for="lists in list.selectArr" :label="lists.label" :value="lists.value" :key="lists.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="list.isType === 'banks'" :label="list.label" :label-width="dialogConfig.dialogLabelWidth">
          <el-select  v-model="dialogForm[list.model]" :placeholder="list.placeholder" :disabled="list.disabled" :key="list.model">
            <el-option v-for="lists in list.selectArr" :label="lists.value" :value="lists.id" :key="lists.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="list.isType === 'dateTime'" :label="list.label" :label-width="dialogConfig.dialogLabelWidth">
          <el-date-picker style="width: 100%"
            v-model="dialogForm[list.model]"
            type="date"
            :placeholder="list.placeholder"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </template>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <template v-for="btns in dialogConfig.buttonArr">
          <el-button size="mini" @click="EnbsClick(btns.evenName, dialogForm)" :key="btns.evenText">{{btns.evenText}}</el-button>
        </template>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    mixins: [],
    props: ['dialogConfig', 'dialogForm', 'dialogData'],
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
//        dialogForm: {},
//        dialogData: [
//          {isType: 'input', label: '活动名称', placeholder: '活动名称', disabled: false, model: 'name'},
//          {isType: 'select', label: '活动名称', placeholder: '活动名称', disabled: false, model: 'label', selectArr: [{label: '', value: 'shanghai'}]}
//        ]
      }
    },
    mounted () {},
    destroyed () {},
    watch: {
      'dialogForm': {
        handler: function (val, oldVal) {
          this.$emit('survey', val, oldVal)
        },
        deep: true
      }
    },
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
