<!--欢迎页面-->
<template>
  <div>
    <el-card class="box-card" v-for="(o, i) in arrText" :key="i">
      <div slot="header" class="clearfix">
        <span>{{o}}</span>
      </div>
      <div class="text item">
        <span v-if="i === 0" v-text="statisticsData.UserCount | 0">{{}}</span>
        <span v-if="i === 1" v-text="statisticsData.UserCz | 0"></span>
        <span v-if="i === 2" v-text="statisticsData.UserTx | 0"></span>
        <span v-if="i === 3" v-text="statisticsData.UserBuyMoney | 0"></span>
        <span v-if="i === 4" v-text="statisticsData.UserSellMoney | 0"></span>
        <span v-if="i === 5" v-text="statisticsData.CurrMoney | 0"></span>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    mixins: [],
    data () {
      return {
        statisticsData: {},
        arrText: ['今日注册人数', '充值', '提现', '买入', '卖出', '当前余额']
      }
    },
    mounted () {
      this.getStatistics()
    },
    destroyed () {
    },
    watch: {},
    methods: {
      getStatistics () { // rechargeMoney
        let el = this
        el.$http(el.$api.getStatistics)
          .then((res) => {
            if (res.code === 1) {
              el.statisticsData = res.data
            }
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
</script>
<style scoped>
  .user-class{background: #fff;margin: 47px 47px 18px;box-shadow: 0 1px 7px #333;text-align: left;border-radius: 8px;padding-bottom: 36px;}
  .users{margin-left: 87px;line-height: 61px;}
  .user-content{height: 306px;border: 2px solid #ddd;border-radius: 5px;;margin: 0 45px;display: flex;flex: 1 1 auto;flex-wrap: wrap}
  .user-num1:before{position: relative;content: '';width: 12px;height: 90px;background: #df5000;display: inline-block;top: 0;left: -1px;}
  .Total{display: flex;width: 50%;height:85px;margin-top: 43px;justify-content: space-around;align-items: flex-end;}
  .Total:before{position: relative;content: '';display: inline-block;width: 6px;height: 85px;background: #df5000;top:0;left: 0}
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 480px;
    display: inline-block;
    text-align: left;
    margin-right: 15px;
    margin-top: 15px;
  }

</style>
