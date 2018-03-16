<template>
    <div>
      <div class="breadcrumb-Box">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$store.state.breadcrumb.band || '内容管理'}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{$store.state.breadcrumb.title || '广告管理'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name" >
          <component v-show="isLoading" is="Loading" v-bind:contents="tabContent">
            <!--keep-alive-->
            <!-- 组件在 vm.currentview 变化时改变！ -->
          </component>
          <component :is="item.content" v-bind:contents="tabContent">
            <!--keep-alive-->
            <!-- 组件在 vm.currentview 变化时改变！ -->
          </component>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>
<script>
  import store from '@/vuex/state'
  import Loading from '@/components/Tool/Loading'
//  内容管理
  import Advert from '@/components/ContenManagement/Advert'
  import Agreement from '@/components/ContenManagement/Agreement'
  import ArticleClassify from '@/components/ContenManagement/ArticleClassify'
  import Help from '@/components/ContenManagement/Help'
  import Question from '@/components/ContenManagement/Question'
  import Strategy from '@/components/ContenManagement/Strategy'
  import ArticleManagement from '@/components/ContenManagement/ArticleManagement'
//  用户管理
  import BindBank from '@/components/UserManagement/BindBank'
  import EntryEPayments from '@/components/UserManagement/EntryEPayments'
  import PresentList from '@/components/UserManagement/PresentList'
  import DisableList from '@/components/UserManagement/DisableList'
  import SMSList from '@/components/UserManagement/SMSList'
  import UserList from '@/components/UserManagement/UserList'
  import ConfirmRecharge from '@/components/UserManagement/ConfirmRecharge'
  import Pay from '@/components/UserManagement/Pay'
//  操盘断力
  import RiskManagement from '@/components/TraderManagement/RiskManagement'
  import TradersAccount from '@/components/TraderManagement/TradersAccount'
//  交易查询
  import DayCommission from '@/components/Transaction/DayCommission'
  import DayDeal from '@/components/Transaction/DayDeal'
  import ExCut from '@/components/Transaction/ExCut'
  import HistoricalDelegation from '@/components/Transaction/HistoricalDelegation'
  import Journal from '@/components/Transaction/Journal'
  import LiquidationRecord from '@/components/Transaction/LiquidationRecord'
  import OpenShares from '@/components/Transaction/OpenShares'
  import PlatformFund from '@/components/Transaction/PlatformFund'
  import QuiryList from '@/components/Transaction/QuiryList'
  import OrderList from '@/components/Transaction/OrderList'
  import SellList from '@/components/Transaction/SellList'
  import Scrap from '@/components/Transaction/Scrap'
  import Auto from '@/components/Transaction/Auto'

//  系统管理
  import Administrator from '@/components/sysManagement/Administrator'
  import Logs from '@/components/sysManagement/Logs'
  import SetJournal from '@/components/sysManagement/SetJournal'
  import SetCode from '@/components/sysManagement/SetCode'
  import SetOperate from '@/components/sysManagement/SetOperate'
  import SetSys from '@/components/sysManagement/SetSys'
  import StockAllocation from '@/components/sysManagement/StockAllocation'
//  代理管理
  import Commission from '@/components/AgentManagement/Commission'
  import CommissionDetails from '@/components/AgentManagement/CommissionDetails'
  import SetAgent from '@/components/AgentManagement/SetAgent'
  import StatisticalCommission from '@/components/AgentManagement/StatisticalCommission'
  import AddModify from '@/components/AgentManagement/AddModify'
  import RoleMan from '@/components/AgentManagement/RoleMan'
  import Extension from '@/components/AgentManagement/Extension'
//  查询统计
  import APStatement from '@/components/QueryStatistics/APStatement'
  import DailyReport from '@/components/QueryStatistics/DailyReport'
  import EDReport from '@/components/QueryStatistics/EDReport'
  import EPTable from '@/components/QueryStatistics/EPTable'
  import OGReport from '@/components/QueryStatistics/OGReport'
  import SGReport from '@/components/QueryStatistics/SGReport'
//  pc设置
  import SetPc from './PCxun/SetPc'
  import Detial from './PCxun/Detial'
  export default {
    mixins: [],
    data () {
      return {
        tabContent: '',
        editableTabsValue: '1-1', // 激活状态
        editableTabs: [{
          title: '欢迎使用',
          name: '1-1',
          content: 'Advert'
        }],
        tabIndex: '1',
        siteDate: {},
        isLoading: false
      }
    },
    components: { // 声明子组件
      Scrap,
      ExCut,
      Journal,
      OpenShares,
      Auto,
      Loading,
      Advert,
      Agreement,
      ArticleClassify,
      Help,
      Question,
      Strategy,
      ArticleManagement,
      BindBank,
      EntryEPayments,
      PresentList,
      DisableList,
      SMSList,
      UserList,
      RiskManagement,
      TradersAccount,
      DayCommission,
      DayDeal,
      HistoricalDelegation,
      LiquidationRecord,
      PlatformFund,
      Administrator,
      Logs,
      SetJournal,
      SetCode,
      SetOperate,
      SetSys,
      StockAllocation,
      Commission,
      CommissionDetails,
      SetAgent,
      StatisticalCommission,
      APStatement,
      DailyReport,
      EDReport,
      EPTable,
      OGReport,
      SGReport,
      QuiryList,
      OrderList,
      ConfirmRecharge,
      Pay,
      SellList,
      AddModify,
      RoleMan,
      SetPc,
      Detial,
      Extension
    },
    computed: {
      getLoad () {
        return store.state.isLoading
      },
      getTabs () {
        this.editableTabs = this.$store.state.editableTabs
        return this.$store.state.editableTabs
      },
      getActive () {
        return this.$store.state.tabIndex
      },
      geTeditableTabsValue () {
        let TabsValue = this.$store.state.editableTabsValue
        return TabsValue
      }
    },
    mounted () {
      this.getSite()
    },
    destroyed () {
    },
    watch: {
      getLoad: function (val) {
        this.isLoading = val
      },
      getTabs: {
        handler: function (newVal) {
          this.editableTabs = newVal
        },
        deep: true
      },
      getActive: function (val) {
        this.tabIndex = val
      },
      geTeditableTabsValue: function (val) {
        this.editableTabsValue = val
      }
    },
    methods: {
      handleClick (tab, event) {
        // this.editableTabsValue = tab.name
        this.tabContent = tab
        this.$store.commit('addTabs', tab)
      },
      removeTab (name) {
        this.$store.commit('removeTab', name)
      },
      getSite () {
        let el = this
        el.$http(el.$api.getUsers)
          .then((res) => {
            if (res.code === 1) {
              el.siteDate = res.data
              document.title = el.siteDate.admin_copywriting_title
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
<style>
  .el-table__expanded-cell{
    padding: 0;
  }
  .el-table th>.cell{
    text-align: center;
  }
  .breadcrumb-Box{
    padding: 0 0px 20px;
    color:#606266;
  }
  .quill-editor {
    height: 745px;
  }
  .ql-container {
    height: 680px;
  }
  .limit {
    height: 30px;
    border: 1px solid #ccc;
    line-height: 30px;
    text-align: right;
  }
  /*span {*/
    /*color: #ee2a7b;*/
  /*}*/
  .ql-snow .ql-editor img {
    max-width: 480px;
  }
  .ql-editor .ql-video {
    max-width: 480px;
  }
</style>
