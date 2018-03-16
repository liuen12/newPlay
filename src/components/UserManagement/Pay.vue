<!--确认提现-->
<template>
  <el-row>
    <el-col :span='8'>
      <el-form ref="form" :model="form" :label-width="labelWidth" size='small'>
        <el-form-item label="代付金额">
          <el-input v-model="form.deposit"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.CertName"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="form.CertNo"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.Phone"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input v-model="form.bank_no"></el-input>
        </el-form-item>
        <el-form-item label="银行名称">
          <el-input v-model="form.bank_general_name"></el-input>
        </el-form-item>
        <el-form-item label="银行名称">
          <el-input v-model="form.bank_name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <div id="ff" style="display: none" v-html="formContent">
    </div>
  </el-row>
</template>
<script>
  export default {
    mixins: [],
    data () {
      return {
        labelWidth: '80px',
        form: {
          deposit: '',
          CertName: '',
          CertNo: '',
          Phone: '',
          bank_no: '',
          bank_general_name: '',
          bank_name: ''
        },
        formContent: ''
      }
    },
    mounted () {},
    destroyed () {},
    watch: {},
    methods: {
      onSubmit () {
        let queryData = {}
        queryData = this.form
        this.$http(this.$api.payfor, queryData)
          .then(res => {
            if (res.code === 1) {
              this.formContent = res.data.url
            } else {
              this.$message.error(res.msg)
            }
          })
          .then(res => {
            if (document.querySelector('#form1')) {
              document.querySelector('#form1').submit()
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>
<style scoped>
</style>
