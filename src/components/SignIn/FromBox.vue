<template>
  <div>
    <el-form class="FromClass" :ref="config.ref" :model="formData">
      <el-form-item>
        <div class="fromTitle">
          <span class="el-icon-back" style="cursor: pointer" @click="changeBack(isType)"></span>
          <span >{{config.title}}</span>
        </div>
      </el-form-item>
      <template v-for="(item, $index) in formLabel">
        <el-form-item :style="`display: ${item.type === 'checkbox' ||  item.type === 'text'? 'inline-block' : ''}`">
          <el-input v-if="item.type === 'input'"
                    v-model="formData[item.model]"
                    :placeholder="item.label"
                    auto-complete="no"
                    :type="item.inputType"
                    :prefix-icon="item.icon" >
          </el-input>
          <el-input v-if="item.type === 'inputBtn'"
                    v-model="formData[item.model]"
                    :placeholder="item.label"
                    :type="item.inputType"
                    :prefix-icon="item.icon" >
            <el-button slot="append" @click="sendClick(item.sendSMS)">{{item.sendText}}</el-button>
          </el-input>
          <el-switch v-if="item.type === 'switch'"
                     v-model="formData[item.model]"
                     :active-text="item.active"
                     :inactive-text="item.inactive"
          ></el-switch>
          <el-checkbox-group v-if="item.type === 'checkbox'" v-model="checkbox" style="margin-right: 20px">
            <template v-for="radio in item.checkbox">
              <el-checkbox :label="radio.label"></el-checkbox>
            </template>
          </el-checkbox-group>
          <template v-if="item.type === 'text'">
            <span style="cursor: pointer;color: #409EFF" @click="Agreement">《使用协议》</span>及
            <span style="cursor: pointer;color: #409EFF" @click="Privacy">《隐私条款》</span>
          </template>
          <el-button v-if="item.type === 'btn'" :type="item.class" @click="onSubmit" style="width:100%" v-text="item.text"></el-button>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
<script>
  export default {
    mixins: [],
    props: ['config', 'formData', 'formLabel', 'isType'],
    data () {
      return {
        checkbox: ''
      }
    },
    mounted () {},
    destroyed () {},
    watch: {
      'checkbox' (ne) {
        console.log(ne)
      }
    },
    methods: {
      changeBack (val, isType) {
        this.$emit('changeBack', val, isType)
      },
      Agreement () {
        this.$emit('Agreement')
      },
      Privacy () {
        this.$emit('Privacy')
      },
      onSubmit () {
        let el = this
        this.$refs[el.config.ref].validate((valid) => {
          if (valid) {
            this.$emit('onSubmit', this.formData, this.isType)
          } else {
            return false
          }
        })
      },
      change (val) {
        console.log(val)
      },
      resetForm (formName) {
        this.$refs.numberValidateForm.model.admin_password = ''
        this.$refs[formName].resetFields()
      },
      sendClick (evenName) {
        this.$emit(evenName, this.formData, this.isType)
      }
    }
  }
</script>
<style scoped>
  .el-form {width: 330px}
  .fromTitle{ color: rgb(51, 51, 51);font-size: 28px;font-weight: bold;}
  .FromClass{background: #fff; padding:26px 40px 4px 40px;}
  .el-checkbox-group {text-align: left}
  .el-form-item {text-align: left}
  .el-radio-group {text-align: left}
  .el-form-item .el-form-item__content .el-input-group .el-input-group__append, .el-input-group__prepend{background: #0074D9}
</style>
