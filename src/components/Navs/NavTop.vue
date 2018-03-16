<template>
  <el-row style="margin-left: -10px">
    <el-menu
      @select="handleSelect"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal">
      <el-menu-item index="2" style="float: right" @click="signOut = true"><i class="el-icon-erp-icon_tuichu-"></i></el-menu-item>
      <el-submenu index="3" style="float: right">
          <template slot="title"><i class="el-icon-erp-icon_kongzhi-"></i></template>
          <el-menu-item index="2-1" v-if="user.is_agent === 1">管理员:{{user.agent_name}}</el-menu-item>
          <el-menu-item index="2-1" v-else>管理员：{{user.user_name}}</el-menu-item>
          <el-menu-item index="2-6" v-if="user.is_admin === 1" v-text="user.platform_m ? '剩余预存款 :'+user.platform_m : '剩余预存款 :0'"> </el-menu-item>
          <el-menu-item index="2-2">平台佣金:{{user.money}}</el-menu-item>
          <el-menu-item index="2-3"@click="isRecharge = true">资金充值</el-menu-item>
          <el-menu-item index="2-4"@click="isCommission = true">佣金提现</el-menu-item>
        <el-menu-item index="2-5"@click="isUserPwd = true">修改账户密码</el-menu-item>
      </el-submenu>
      <div class="msgBox" @click.stop="showMsg">
        <el-badge :value="num" class="el-icon-message"></el-badge>
      </div>
    </el-menu>
    <MsgBox
      style="width: 320px"
      :listData="listData"
      @redNum="redNum"
      class="items"/>
    <!--确认要退出-->
    <el-dialog title="温馨提示":visible.sync="signOut" width="20%">
      <h4>确认要退出?</h4>
      <span slot="footer" class="dialog-footer">
            <el-button @click="signOut = false">取 消</el-button>
            <el-button type="primary" @click="signOuts">确 定</el-button>
          </span>
    </el-dialog>
    <!--充值-->
    <el-dialog title="充值页面":visible.sync="isRecharge">
      <el-form :model="rechargeMoney" label-width="80px" class="demo-ruleForm" width="20%">
        <el-form-item label="充值金额">
          <el-input type="age" v-model.number="rechargeMoney.deposit" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isRecharge = false">取 消</el-button>
        <el-button type="primary" @click="Recharge">确 定</el-button>
      </span>
    </el-dialog>
    <!--佣金提现-->
    <el-dialog title="佣金提现" :visible.sync="isCommission" width="35%">
      <el-form :model="commission">
        <el-form-item label="代理编码" :label-width="commissionWidth">
          <el-input v-model="commission.agent_no" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="佣金比例" :label-width="commissionWidth">
          <el-input v-if="user.is_agent === 0" v-model="commission.staff_commion" auto-complete="off" :disabled="true"></el-input>
          <el-input v-if="user.is_agent === 1" v-model="commission.commission" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="提现佣金" :label-width="commissionWidth">
          <el-input v-model="commission.deposit" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isCommission = false">取 消</el-button>
        <el-button type="primary" @click="setCommission">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改账号密码-->
    <el-dialog title="修改账号密码":visible.sync="isUserPwd">
      <el-form :model="userPwd" label-width="80px" class="demo-ruleForm" size="tiny">
        <el-form-item label="用户姓名">
          <el-input type="text" v-model.number="userPwd.user_name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input type="password" v-model.number="userPwd.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUserPwd = false">取 消</el-button>
        <el-button type="primary" @click="setPwd">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
  import store from '@/vuex/state'
  import MsgBox from '../Private/MsgBox'
  export default {
    mixins: [],
    components: {MsgBox},
    data () {
      return {
        msgList: {
          'Unread': [{title: '普通用戶', content: 'UserList', name: '2-1', msgContent: '订单:H2254348980 撤单成功', msgTitle: '订单'}],
          'History': [{title: '普通用戶', content: 'UserList', name: '2-1', msgContent: '订单:H2254348980 撤单成功', msgTitle: '订单'}],
          'Messaging': [{title: '普通用戶', content: 'UserList', name: '2-1', msgContent: '订单:H2254348980 撤单成功', msgTitle: '订单'}],
          'messagesNum': '2'
        },
        listData: [{label: '未读消息', name: '0', content: []}, {label: '历史消息', name: '1', content: []}],
        num: '',
        user: {},
        isRecharge: false,
        activeIndex: '1',
        signOut: false,
        isUserPwd: false,
        cval: null,
        rechargeMoney: {
          deposit: ''
        },
//      佣金提现
        isCommission: false,
        commission: {
          id: '',
          agent_no: '',
          contacts: '',
          commission: '',
          staff_commion: '',
          deposit: ''
        },
        commissionWidth: '90px',
//      修改账号密码
        userPwd: {
          user_name: '',
          password: ''
        }
      }
    },
    mounted () {
      this.webSocket()
      this.colorMsg()
      this.user = this.getUser()
      this.commission = this.copyObj(this.user, this.commission)
      this.userPwd = this.copyObj(this.getUser(), this.userPwd)
    },
    destroyed () {},
    watch: {
      cval (vla, newvla) {
        if (newvla === null) {
          this.$router.push('/SignIn')
          localStorage.removeItem('user')
        }
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        if (key === '1') {
          this.$store.commit('collApse')
        }
      },
      signOuts () {
        let el = this
        store.state.editableTabs = []
        let target = {content: 'Advert', name: '1-1', title: '欢迎使用'}
        el.signOut = true
        el.delCookie('personal')
        this.webSocket('1')
        this.$store.commit('addTabs', target)
      },
      delCookie (name) {
        let el = this
        let exp = new Date()
        exp.setTime(exp.getTime() - 1)
        el.cval = el.getCookie(name)
        if (el.cval !== null) {
          document.cookie = name + '=' + el.cval + ';expires=' + exp.toGMTString()
        }
      },
      getCookie (name) {
        let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
        let arr = document.cookie.match(reg)
        if (arr) {
//          this.$store.commit('setUser', JSON.parse(unescape(arr[2])))
          return unescape(arr[2])
        } else {
          return null
        }
      },
      getUser () {
        return JSON.parse(decodeURI(this.$store.state.user))
      },
      showMsg () {
        let itemsStyle = document.querySelector('.items')
        if (itemsStyle) {
          if (itemsStyle.style.display === 'block') {
            itemsStyle.style.display = 'none'
          } else {
            itemsStyle.style.display = 'block'
          }
        }
      },
      colorMsg () {
        if (document.querySelector('#app')) {
          document.querySelector('#app').addEventListener('click', function (e) {
            document.querySelector('.items').addEventListener('click', function (e) {
              e.cancelBubble = true
            })
            let itemsStyle = document.querySelector('.items')
            if (itemsStyle) {
              if (itemsStyle.style.display === 'block') {
                itemsStyle.style.display = 'none'
              }
            }
          })
        }
      },
//    充值
      Recharge () {
        let el = this
        let queryData = {}
        queryData = el.rechargeMoney
        el.$http(el.$api.rechargeMoney, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$message('充值成功,请等待审核！！')
              el.isRecharge = false
            }
          }, (error) => {
            console.log(error)
          })
      },
      setCommission () {
        let el = this
        let queryData = {}
        queryData = el.commission
        el.$http(el.$api.getCommission, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$message(res.msg)
              el.isCommission = false
            } else if (res.code === '') {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    修改密码
      setPwd () {
        let el = this
        let queryData = {}
        queryData = el.userPwd
        el.$http(el.$api.setPwd, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$message('修改密码成功！！')
              el.isUserPwd = false
            } else if (res.code === '') {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    消除未读出的状态
      redNum (val) {
        if (val.type === 1) {
          this.num -= 1
        }
      },
      webSocket (isClose) {
        let ws = process.env.NODE_ENV === 'development' ? new WebSocket('ws://q.q-q-q.cn:8080') : new WebSocket(`ws://${window.location.hostname}:8080`)
        const h = this.$createElement
        ws.onopen = function (evt) {
          console.log('正在建立连接...')
          let obj = {}
          obj.admin_sid = localStorage.getItem('admin_sid') || ''
          obj.adminmessage = 1
          ws.send(JSON.stringify(obj))
        }
        ws.onmessage = evt => {
          let date = JSON.parse(evt.data)
          if (date.data.code === 0) {
            this.webSocket()
          }
          if (this.num !== date.data.messagesNum) {
            document.querySelector('#audio').play()
          }
          this.listData[0].content = date.data.Unread
          this.listData[1].content = date.data.History
          this.num = date.data.messagesNum
          if (date.data.Messaging && date.data.Messaging.length >= 1) {
            Object.values(date.data.Messaging).forEach((o, i) => {
              document.querySelector('#audio').play()
              this.$notify({
                title: '消息通知',
                message: h('i', {style: 'color: red'}, o.content)
              })
            })
          }
        }
        if (isClose === '1') {
          console.log('关闭连接')
          ws.close()
        }
        ws.onclose = evt => {
//          this.webSocket()
          console.log('连接错误')
        }
      }
    },
    store
  }
</script>
<style scoped>
  .isSHow:hover .items{display: block}
  .items {display:none;position: absolute;right: 168px;top: 61px;z-index: 1024;background: #fff;color: #20a0ff}
  .item {font-size: 18px;}
  .msgBox{display: inline-block;float: right;line-height: 60px;padding: 0 15px;cursor: pointer}
</style>
