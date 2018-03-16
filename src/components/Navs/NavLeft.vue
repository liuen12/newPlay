<template>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="Collapse"
      background-color="#324157"
      text-color="#fff"
      active-text-color="#20a0ff"
      >
      <el-menu-item index="1000" :class="Collapse ? 'userLogin-small': 'userLogin'">
        <img :src="siteDate.main_logo_zhuye" alt="LOGIN" :class="Collapse ? 'userLogin-img-small': 'userLogin-img'">
      </el-menu-item>
      <el-menu-item index="999" :class="Collapse ? 'userHeader-small': 'userHeader'">
        <img :src="siteDate.main_thumb" alt="userHeader" :class="Collapse ? 'userHeader-img-small': 'userHeader-img'">
      </el-menu-item>
      <el-submenu :index="''+index" v-for="(items,index) in submenuNav" :key="''+index">
        <template slot="title">
          <i :class="items.class"></i>
          <span slot="title" v-text="items.title"></span>
        </template>
        <el-menu-item-group v-for="groups in items.arr" :key="groups.name">
          <el-menu-item :index="groups.name" v-text="groups.title" @click="addTabs(groups)">选项</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>
<script>
  import store from '@/vuex/state'
  export default {
    mixins: [],
    data () {
      return {
        isCollapse: false,
        siteDate: {},
        submenuNav: [
//          {
//            calss: 'el-icon-erp-icon_neirong',
//            title: '内容管理',
//            arr: [
//              {name: '1-1', title: '广告管理', content: 'Advert'},
//              {name: '1-2', title: '各种协议', content: 'Agreement'},
//              {name: '1-3', title: '帮助中心', content: 'Help'},
//              {name: '1-4', title: '文章分类', content: 'ArticleClassify'},
//              {name: '1-5', title: '文章管理', content: 'ArticleManagement'},
//              {name: '1-6', title: '常见问题', content: 'Question'},
//              {name: '1-7', title: '策略榜单', content: 'Strategy'}
//            ]
//          },
//          {
//            calss: 'el-icon-erp-icon_yonghu',
//            title: '用户管理',
//            arr: [
//              {name: '2-1', title: '用户列表', content: 'UserList'},
//              {name: '2-2', title: '用户出入金', content: 'EntryEPayments'},
//              {name: '2-7', title: '确认充值', content: 'ConfirmRecharge'},
//              {name: '2-3', title: '充值记录', content: 'RechargeList'},
//              {name: '2-8', title: '确认提现', content: 'ConfirmMoney'},
//              {name: '2-4', title: '提现记录', content: 'PresentList'},
//              {name: '2-5', title: '短信记录', content: 'SMSList'},
//              {name: '2-6', title: '绑定银行卡', content: 'BindBank'}
//            ]
//          },
//          {
//            calss: 'el-icon-erp-icon_caopan',
//            title: '操盘管理',
//            arr: [
//              {name: '3-1', title: '操盘母账户', content: 'TradersAccount'},
//              {name: '3-2', title: '风控管理', content: 'RiskManagement'}
//            ]
//          },
//          {
//            calss: 'el-icon-erp-icon_jiaoyi',
//            title: '交易查询',
//            arr: [
//              {name: '4-9', title: '询价记录', content: 'QuiryList'},
//              {name: '4-10', title: '订单列表', content: 'OrderList'}
//              {name: '4-11', title: '卖出列表', content: 'SellList'},
//              {name: '4-1', title: '当日委托', content: 'DayCommission'},
//              {name: '4-3', title: '委托记录', content: 'HistoricalDelegation'},
//              {name: '4-2', title: '成交记录', content: 'DayDeal'}
//              {name: '4-4', title: '平仓记录', content: 'LiquidationRecord'},
//              {name: '4-5', title: '持仓股份', content: 'OpenShares'}
//              {name: '4-6', title: '风控日志', content: 'Journal'},
//              {name: '4-7', title: '平台资金', content: 'PlatformFund'}
//              {name: '4-8', title: '除权降息', content: 'ExCut'}
//            ]
//          },
//          {
//            calss: 'el-icon-erp-icon_xitong',
//            title: '系统管理',
//            arr: [
//              {name: '5-1', title: '管理员管理', content: 'Administrator'},
//              {name: '5-2', title: '操作日志', content: 'Logs'},
//              {name: '5-3', title: '流水日志', content: 'SetJournal'},
//              {name: '5-4', title: '资金流水', content: 'StockAllocation'}
//              {name: '5-5', title: '操盘设置', content: 'SetOperate'},
//              {name: '5-6', title: '系统设置', content: 'SetSys'},
//             {name: '5-7', title: '后台导航管理', content: 'SetNavs'}
//            ]
//          },
//          {
//            calss: 'el-icon-erp-icon_daili',
//            title: '代理管理',
//            arr: [
//              {name: '6-1', title: '代理管理', content: 'SetAgent'},
//              {name: '6-7', title: '角色管理', content: 'RoleMan'},
//              {name: '6-8', title: '推广管理', content: 'Extension'}
//             {name: '6-2', title: '佣金明细', content: 'CommissionDetails'},
//              {name: '6-3', title: '佣金提现', content: 'Commission'},
//              {name: '6-4', title: '佣金统计', content: 'StatisticalCommission'}
//            ]
//          }
//          {
//            calss: 'el-icon-erp-icon_chaxun',
//            title: '查询统计',
//            arr: [
//              {name: '7-1', title: '运营总报表', content: 'OGReport'},
//              {name: '7-2', title: '运营日报表', content: 'DailyReport'},
//              {name: '7-3', title: '员工总报表', content: 'SGReport'},
//              {name: '7-4', title: '员工日报表', content: 'EDReport'},
//              {name: '7-4', title: '员工业绩表', content: 'EPTable'},
//              {name: '7-4', title: '代理业绩表', content: 'APStatement'}
//            ]
//          }
        ],
        Collapse: false,
        userImg: require('../../assets/userLogin.png')
      }
    },
    computed: {
      getCollapse () {
        return this.$store.state.isCollapse
      }
    },
    mounted () {
      this.getSideLeft()
      this.getSite()
    },
    destroyed () {
    },
    watch: {
      getCollapse: function (val) {
        this.Collapse = val
        if (this.Collapse === false) {
          this.userImg = require('../../assets/userLogin.png')
        }
        if (this.Collapse === true) {
          this.userImg = require('../../assets/userLogin_small.png')
        }
      }
    },
    methods: {
      addTabs (target) {
        this.$store.commit('addTabs', target)
      },
      getSideLeft () { // getSideLeft
        let el = this
        el.$http(el.$api.getSideLeft)
          .then((res) => {
            if (res.code === 1) {
              let diction = Object.values(res.data)
              let leng = diction.length - 1
              for (let i = 0; i <= leng; i++) {
                if (diction[i].parent_id === 0) {
                  diction[i].arr = []
                  for (let j = 0; j <= leng; j++) {
                    if (diction[i].id === diction[j].parent_id) {
                      diction[i].arr.push(diction[j])
                    }
                  }
                }
              }
              setTimeout(function () {
                diction.forEach(function (i, k) {
                  if (i.arr) {
                    el.submenuNav.push(i)
                  }
                })
              }, 300)
            } else if (res.code === '') {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
      getSite () {
        let el = this
        el.$http(el.$api.getUsers)
          .then((res) => {
            if (res.code === 1) {
              el.siteDate = res.data
            } else if (res.code === '') {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      }
    },
    store
  }
</script>
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-width: 50px;
    height: 100%;
  }
  .el-menu{
    height: 100%;
  }
  .userLogin{
    height: 80px;
  }
  .userLogin-small{
    height: 50px;
    padding: 0;
  }
  .userLogin-small.el-tooltip{
    padding: 0;
  }
  .userLogin-img{
    height: 42px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .userLogin-img-small{
    height: 20px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin-left: -3px;
  }
  .userHeader{
    height: 200px;
  }
  .userHeader-small{
    height: 100px;
  }
  .userHeader-img{
    height: 80px;
    position: relative;
    top: 50%;
    transform: translateY(-50%)
  }
  .userHeader-img-small{
    height: 30px;
    position: relative;
    top: 50%;
    transform: translateY(-50%)
  }
</style>
