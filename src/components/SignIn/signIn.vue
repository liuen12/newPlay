<template>
    <el-row class="new-Home">
      <el-col style="text-align: left;height: 60px;background: #333;opacity: .8">
        <div style="width: 1200px;margin: 0 auto;height: 60px">
          <img :src="siteDate.admin_logo" alt="LOGO" style="height: 45px;margin-top: 8px;">
        </div>
      </el-col>
      <el-row class="new-Box">
        <el-col>
          <el-col :span="4" :offset="4"  class="new-left">
            <h2 style="text-align: left;margin-bottom: 40px;font-weight: 400;letter-spacing:6px;padding-top: 40px">安全的期权交易中心</h2>
            <h5 style="text-align: left;font-weight: 200;line-height: 30px">
              快速查询和报价的轻量级服务平台 <br>
              简单易上手，操作更轻松 <br>
              更低价格更高服务增值 <br>
            </h5>
          </el-col>
          <el-col :span="12" :offset="4">
            <el-form :model="user" ref="numberValidateForm" label-width="30px" class=" new-from demo-input-suffix">
              <el-form-item label-width="0px">
                <template slot-scope="scope">
                  <h2 style="text-align: left;padding-left: 30px;color: #333;font-weight: 400">用户登录</h2>
                </template>
              </el-form-item>
              <el-form-item  prop="user_name" :rules="[{required: true, message: '账号不能为空'}]">
                <el-input type="text" v-model="user.user_name" placeholder="请输入管理员/代理商/员工账号">
                  <i slot="prefix" class="el-icon-erp-loginuser"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="password" :rules="[{required: true, message: '密码不能为空'}]">
                <el-input type="password" v-model="user.password" placeholder="密码">
                  <i slot="prefix" class="el-icon-erp-loginpassword"></i>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button  type="primary" @click="submitForm('numberValidateForm')" class='btns'>提交</el-button>
              </el-form-item>
              <el-form-item style="text-align: left">
                <el-checkbox size="small" v-model="checked">记住用户名</el-checkbox>
              </el-form-item>
            </el-form>
          </el-col>
        </el-col>
      </el-row>
      <el-col style="text-align: center;height: 70px;background: #333;opacity: .8;position: absolute;bottom: 0">
        <div style="width: 1200px;margin: 0 auto;color: #656867;line-height: 70px">
          您好，欢迎使用个股场外期权系统
        </div>
      </el-col>
    </el-row>
</template>
<script>
  export default {
    mixins: [],
    data () {
      return {
        checked: false,
        user: {
          user_name: '',
          password: ''
        },
        numberValidateForm: {
          age: ''
        },
        siteDate: {}
      }
    },
    mounted () {
      this.getSite()
    },
    destroyed () {
    },
    watch: {},
    methods: {
      submitForm (formName) {
        let el = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            el.signIn()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs.numberValidateForm.model.admin_password = ''
        this.$refs[formName].resetFields()
      },
      signIn () {
        let el = this
        let queryDate = {}
        queryDate = this.user
        el.$http(el.$api.login, queryDate)
          .then((res) => {
            if (res.code === 1) {
              el.$message({message: '登陆成功！！', type: 'success'})
//            添加addUser用户信息
              el.$store.commit('setUser', res.data)
              localStorage.setItem('user', encodeURI(JSON.stringify(res.data)))
              el.setCookie('personal', JSON.stringify(res.data), 'h2')
              el.$router.push('/')
            } else if (res.code === 0) {
              el.$message.error(res.msg)
              el.resetForm()
            }
          }, (error) => {
            console.log(error)
          })
      },
      setCookie (name, value, time) {
//  s20是代表20秒
//  h是指小时，如12小时则是：h12
//  d是天数，30天则：d30
        var strsec = this.getsec(time)
        var exp = new Date()
        exp.setTime(exp.getTime() + strsec * 1)
        document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
      },
      getsec (str) {
        let str1 = str.substring(1, str.length) * 1
        let str2 = str.substring(0, 1)
        if (str2 === 's') {
          return str1 * 1000
        } else if (str2 === 'h') {
          return str1 * 60 * 60 * 1000
        } else if (str2 === 'd') {
          return str1 * 24 * 60 * 60 * 1000
        }
      },
      getSite () {
        let el = this
        el.$http(el.$api.getUsers)
          .then((res) => {
            if (res.code === 1) {
              el.siteDate = res.data
              document.title = el.siteDate.admin_copywriting_title
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
</script>
<style scoped>
  .new-Home{
    background: url("../../assets/Sign.png") no-repeat;
    background-size: 100% 100%;
    height: calc(100%);
    width: 100%;
    position: fixed;
    bottom: 0;
  }
  .new-left{
    color: #fff;
  }
  .new-Box{
    position: absolute;
    top:40%;
    color: #fff !important;
    left: 50%;
    width: 100%;
    transform: translate(-50%,-50%);
  }
  .new-from{
    width: 320px;
    top:0;
    background: #fff;
    padding-top: 20px;
    padding-right: 30px;
    padding-bottom: 6px;
  }
  [class^='el-icon-3q-pintu']:before{
    margin-right: 8px;
    width: 23px!important;
    height: 40px!important;
    display: inline-block!important;
  }
  .btns{width: 100%;background: #ffc300;border: none}
</style>
