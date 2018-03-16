<!--文章分类 && 配置交易-->
<template>
    <el-row>
      <el-col :span="8" v-for="item in cardHeaader" :key="item.id">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;font-weight: bold" v-text="item.tCard"></span>
            <el-button style="float: right;" type="primary" v-text="item.type" @click="openM(item)">设置</el-button>
            <el-button style="float: left;" type="primary" v-if="item.isSelect === '3'" @click="dialogPlay = true">支付配置</el-button>
            <el-button style="float: left;" type="primary" v-if="item.isSelect === '4'" @click="dialogSMS = true">短信配置</el-button>
          </div>
          <div class="text item" v-if="item.data.key === 'lowest_pric'">
          {{item.tCard}} : {{item.data.value | grouping}}
          </div>
          <div class="text item" v-else-if="item.data.key === 'aotoprice'">
            {{item.tCard}} : {{item.data.value === '0' ? '手动' : (item.data.value === '1' ? '自动' : '手动上传')}}
          </div>
          <div class="text item" v-else>
            {{item.tCard}} : {{item.data.value}}{{item.Company}}
          </div>
        </el-card>
      </el-col>
      <!--操作-->
      <el-dialog :title="Card.tCard" :visible.sync="dialogPageCon" width="35%">
        <el-form :model="upCon">
          <el-form-item v-if="Card.isSelect === '2'" :label="Card.tCard" :label-width="labelWidth">
            <el-select v-model="upCon.value" :placeholder="Card.tCard">
              <el-option label="T0" value="69"></el-option>
              <el-option label="T1" value="39"></el-option>
              <el-option label="T2" value="40"></el-option>
              <el-option label="T3" value="41"></el-option>
              <el-option label="T4" value="64"></el-option>
              <el-option label="T5" value="65"></el-option>
              <el-option label="T6" value="66"></el-option>
              <el-option label="T7" value="67"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else-if="Card.isSelect === '5'" :label="Card.tCard" :label-width="labelWidth">
            <el-select v-model="upCon.value" :placeholder="Card.tCard">
              <el-option label="T0" value="0"></el-option>
              <el-option label="T1" value="1"></el-option>
              <el-option label="T2" value="2"></el-option>
              <el-option label="T3" value="3"></el-option>
              <el-option label="T4" value="4"></el-option>
              <el-option label="T5" value="5"></el-option>
              <el-option label="T6" value="6"></el-option>
              <el-option label="T7" value="7"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else-if="Card.isSelect === '6'" :label="Card.tCard" :label-width="labelWidth">
            <el-select v-model="upCon.value" :placeholder="Card.tCard">
              <el-option label="自动" value="1"></el-option>
              <el-option label="手动" value="0"></el-option>
              <el-option label="手动上传" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else-if="Card.isSelect === '3'" :label="Card.tCard" :label-width="labelWidth">
            <el-select  v-model="upCon.id" :placeholder="Card.tCard">
              <el-option v-for="pay in Payment" :key="pay.id" :label="pay.value" :value="pay.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else-if="Card.isSelect === '4'" :label="Card.tCard" :label-width="labelWidth">
            <el-select v-model="upCon.id" :placeholder="Card.tCard">
              <el-option v-for="sms in message" :key="sms.id" :label="sms.value" :value="sms.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else :label="Card.tCard" :label-width="labelWidth">
            <el-input v-model="upCon.value" auto-complete="off">
              <template slot="append">{{Card.Company}}</template>
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogPageCon = false">取 消</el-button>
          <el-button type="primary" @click="setPageCon">保 存</el-button>
        </span>
      </el-dialog>
      <!--第三方支付配置-->
      <el-dialog title="第三方支付配置" :visible.sync="dialogPlay" width="35%">
        <el-form :model="playData[isKey]">
          <el-form-item label="支付方式" :label-width="labelPlayWidth">
            <el-select v-model="playData.key" placeholder="支付方式">
              <el-option v-for="pay in Payment" :key="pay.id" :label="pay.value" :value="pay.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-for="play in playList[isKey]" :label="play.name" :key="play.key" :label-width="labelPlayWidth">
            <el-input  v-if="play.isSelect === '0'" v-model="playData[isKey][play.key]" auto-complete="off"></el-input>
            <el-select v-else-if="play.isSelect === '1'" v-model="playData[isKey][play.key]" :placeholder="play.name">
              <el-option v-for="itemPlay in play.modeArr" :key="itemPlay.name" :label="itemPlay.name" :value="itemPlay.val"></el-option>
            </el-select>
            <el-input  v-if="play.isSelect === '2'" type="textarea" v-model="playData[isKey][play.key]" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogPlay = false">取 消</el-button>
          <el-button type="primary" @click="sysPlay('zhi')">保 存</el-button>
        </span>
      </el-dialog>
      <!--第三方短信配置-->
      <el-dialog title="第三方短信配置" :visible.sync="dialogSMS" width="35%">
        <el-form :model="smsData[isSMS]"  size="mini">
          <el-form-item label="短信商" :label-width="labelPlayWidth">
            <el-select v-model="smsData.key" placeholder="">
              <el-option v-for="sms in message" :key="sms.id" :label="sms.value" :value="sms.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-for="play in smsList[isSMS]" :label="play.name" :key="play.key" :label-width="labelPlayWidth">
            <el-input  v-if="play.isSelect === '0'" v-model="smsData[isSMS][play.key]" auto-complete="off"></el-input>
            <el-select v-else-if="play.isSelect === '1'" v-model="smsData[isSMS][play.key]" :placeholder="play.name">
              <el-option v-for="itemPlay in play.modeArr" :key="itemPlay.name" :label="itemPlay.name" :value="itemPlay.val"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogSMS = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="sysPlay('sms')">保 存</el-button>
        </span>
      </el-dialog>
    </el-row>
</template>
<script>
  export default {
    mixins: [],
    props: ['contents'],
    data () {
      return {// cz_procedure_fetx_procedure_fee_pay
        cardHeaader: [
          {tCard: '名义本金', type: '设置', Company: '万', isSelect: '1', data: {}},
          {tCard: '提现交易日', type: '设置', Company: '天', isSelect: '2', data: {}},
          {tCard: '询价方式', type: '设置', Company: '    ', isSelect: '6', data: {}},
          {tCard: '平台抽成', type: '设置', Company: '%', isSelect: '1', data: {}},
          {tCard: '第三方支付配置', type: '设置', Company: '', isSelect: '3', data: {}},
          {tCard: '短信配置', type: '设置', Company: '', isSelect: '4', data: {}},
          {tCard: '充值手续费', type: '设置', Company: '‰', isSelect: '1', data: {}},
          {tCard: '提现手续费', type: '设置', Company: '元', isSelect: '1', data: {}},
          {tCard: '最低平仓日', type: '设置', Company: '天', isSelect: '5', data: {}},
          {tCard: '充值限额', type: '设置', Company: '元', isSelect: '1', data: {}},
          {tCard: '提现限额', type: '设置', Company: '元', isSelect: '1', data: {}}
        ],
        dialogPageCon: false,
        labelWidth: '80px',
        Card: {
          data: {}
        },
        upCon: {
          id: '',
          value: ''
        },
        Payment: [],
//      支付配置
        dialogPlay: false,
        playList: {
          'benyuan': [
            {key: 'MerId', name: '商户号', isSelect: '0'},
            {key: 'SecondMerId', name: '二级商户号', isSelect: '0'},
            {key: 'TermId', name: '终端号', isSelect: '0'},
            {key: 'NotificationUrl', name: '异步通知地址', isSelect: '0'},
            {key: 'CallBackUrl', name: '回调地址', isSelect: '0'},
            {key: 'UserType', name: '网关类型', isSelect: '1', modeArr: [{name: '个人网关', val: 'CB'}, {name: '企业网关', val: 'CP'}]},
            {key: 'url', name: '接口地址', isSelect: '0'}],
          'tixia': [
            {key: 'mchId', name: '商户号', isSelect: '0'},
            {key: 'apiKey', name: '秘钥', isSelect: '0'},
            {key: 'URL', name: 'URL', isSelect: '0'}
          ],
          'yitianmao': [
            {key: 'version', name: '版本号', isSelect: '0'},
            {key: 'syscode', name: '系统码', isSelect: '0'},
            {key: 'account', name: '商户号', isSelect: '0'},
            {key: 'apiKey', name: '密钥', isSelect: '0'},
            {key: 'pay_mode', name: '支付方式', isSelect: '1', modeArr: [{name: '网关', val: 'API_GATEWAY'}, {name: '手机wab快捷', val: ' API_QWAB'}]},
            {key: 'aging', name: '支付时效', isSelect: '1', modeArr: [{name: 'T+2', val: '1'}, {name: 'T+1', val: ' 2'}]},
            {key: 'notify_url', name: '异步同时地址', isSelect: '0'},
            {key: 'callback_url', name: '成功跳转地址', isSelect: '0'}
          ],
          'lian': [
            {key: 'URL', name: 'URL', isSelect: '0'},
            {key: 'apiKey', name: '秘钥', isSelect: '2'},
            {key: 'mchId', name: '商户号', isSelect: '0'}
          ],
          'tlian': [
            {key: 'URL', name: 'URL', isSelect: '0'},
            {key: 'apiKey', name: '秘钥', isSelect: '0'},
            {key: 'sp_id', name: '服务商号', isSelect: '0'},
            {key: 'mchId', name: '商户号', isSelect: '0'},
            {key: 'pccallback', name: 'PC回调', isSelect: '0'}
          ],
          'znan': [
            {key: 'URL', name: 'URL', isSelect: '0'},
            {key: 'apiKey', name: '秘钥', isSelect: '0'},
            {key: 'mchId', name: '商户号', isSelect: '0'},
            {key: 'pccallback', name: 'PC回调', isSelect: '0'}
          ]
        },
        playData: {
          key: '',
          'yitianmao': {
            MerId: '',
            SecondMerId: '',
            TermId: '',
            NotificationUrl: '',
            CallBackUrl: '',
            UserType: 'CB',
            url: ''
          },
          'benyuan': {
            version: '',
            syscode: '',
            account: '',
            apiKey: '',
            pay_mode: 'API_QWAB',
            aging: 2,
            notify_url: '',
            callback_url: ''
          },
          'tixia': {
            mchId: '',
            apiKey: '',
            URL: ''
          },
          'lian': {
            mchId: '',
            apiKey: '',
            URL: ''
          },
          'tlian': {
            mchId: '',
            apiKey: '',
            URL: '',
            pccallback: '',
            sp_id: ''
          },
          'znan': {
            mchId: '',
            apiKey: '',
            URL: '',
            pccallback: ''
          }
        },
        isKey: 'benyuan',
        labelPlayWidth: '100px',
//      短信设置
        smsList: {
          'smsbao': [
            {key: 'user', name: '用户名', isSelect: '0'},
            {key: 'password', name: '密码', isSelect: '0'},
            {key: 'prefix', name: '短信前缀', isSelect: '0'},
            {key: 'smsUrl', name: 'URL', isSelect: '0'},
            {key: 'buy', name: '买入模板', isSelect: '0'},
            {key: 'sell', name: '卖出模板', isSelect: '0'},
            {key: 'chongzhi', name: '充值模板', isSelect: '0'},
            {key: 'txmessage', name: '提现模板', isSelect: '0'},
            {key: 'smscode', name: '验证模板', isSelect: '0'}
          ],
          'he': [
            {key: 'user', name: '用户名', isSelect: '0'},
            {key: 'password', name: '密码', isSelect: '0'},
            {key: 'prefix', name: '短信前缀', isSelect: '0'},
            {key: 'smsUrl', name: 'URL', isSelect: '0'},
            {key: 'buy', name: '买入模板', isSelect: '0'},
            {key: 'sell', name: '卖出模板', isSelect: '0'},
            {key: 'chongzhi', name: '充值模板', isSelect: '0'},
            {key: 'txmessage', name: '体现模板', isSelect: '0'},
            {key: 'smscode', name: '验证模板', isSelect: '0'}
          ]
        },
        message: [],
        isSMS: 'smsbao',
        dialogSMS: false,
        smsData: {
          key: '',
          'smsbao': {
            user: '',
            password: '',
            prefix: '',
            smsUrl: '',
            buy: '',
            sell: '',
            chongzhi: '',
            txmessage: '',
            smscode: ''
          },
          'he': {
            user: '',
            password: '',
            prefix: '',
            smsUrl: '',
            buy: '',
            sell: '',
            chongzhi: '',
            txmessage: '',
            smscode: ''
          },
          'smsdisable': {
            user: '',
            password: '',
            prefix: '',
            smsUrl: '',
            buy: '',
            sell: '',
            chongzhi: '',
            txmessage: '',
            smscode: ''
          }
        }
      }
    },
    mounted () {
      this.getPageCon()
      this.getPayment()
      this.getSMSS()
    },
    destroyed () {
    },
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '1-4') {
          this.getPageCon()
        }
      },
      'playData.key': function (val) {
        this.isKey = val
      },
      'smsData.key': function (val) {
        this.isSMS = val
      }
    },
    methods: {
//    获取配置配置
      getPageCon () {
        let el = this
        el.$http(el.$api.getConfig)
          .then((res) => {
            if (res.code === 1) {
              el.Payment = []
              el.message = []
              Object.values(res.data).forEach((i, o) => {
                if (i.key === 'commission') {
                  el.cardHeaader[3].data = i
                }
                if (i.key === 'lowest_pric') {
                  el.cardHeaader[0].data = i
                }
                if (i.key === 'aotoprice') {
                  el.cardHeaader[2].data = i
                }
                if (i.key === 'cz_procedure_fe') {
                  el.cardHeaader[6].data = i
                }
                if (i.key === 'tx_procedure_fee_pay') {
                  el.cardHeaader[7].data = i
                }
                if (i.key === 'ppoint') {
                  el.cardHeaader[8].data = i
                }
                if (i.key === 'last_cz') {
                  el.cardHeaader[9].data = i
                }
                if (i.key === 'last_tx') {
                  el.cardHeaader[10].data = i
                }
                if (i.group_config_id === 6 && i.is_position === 1) {
                  el.cardHeaader[1].data = i
                }
                if (i.group_config_id === 5 && i.is_position === 1) {
                  el.cardHeaader[4].data = i
                }
                if (i.group_config_id === 8 && i.is_position === 1) {
                  el.cardHeaader[5].data = i
                }
                if (i.group_config_id === 5) {
                  el.Payment.push(i)
                }
                if (i.group_config_id === 8) {
                  el.message.push(i)
                }
              })
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
      setPageCon () {
        let el = this
        let queryData = {}
        queryData = el.upCon
        queryData.is_position = el.Card.data.is_position
        if (el.Card.data.group_config_id !== 5 && el.Card.data.group_config_id !== 8) {
          queryData.id = el.Card.data.id
        }
        if (el.Card.data.key === 'lowest_pric') {
          queryData.value = queryData.value * 10000
        }
        if (el.Card.tCard === '提现交易日') {
          queryData.id = el.upCon.value
        }
        el.$http(el.$api.setConfig, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$message(res.msg)
              el.getPageCon()
              el.dialogPageCon = false
            } else if (res.code === '') {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
      openM (item) {
        this.dialogPageCon = true
        this.upCon.value = ''
        this.upCon.id = ''
        this.Card = item
      },
//    第三方支付参数获取
      sysPlay (uu) {
        let el = this
        let queryData = {}
        if (uu === 'zhi') {
          queryData.key = el.isKey
          let query = el.playData[el.isKey]
          queryData.payment = {}
          for (let k in query) {
            queryData.payment[k] = query[k]
          }
        }
        if (uu === 'sms') {
          queryData.key = el.isSMS
          let query = el.smsData[el.isSMS]
          queryData.payment = {}
          for (let k in query) {
            queryData.payment[k] = query[k]
          }
        }
        el.$http(el.$api.setPayment, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.dialogPlay = false
              el.dialogSMS = false
              el.getPageCon()
              el.$message(res.msg)
            } else if (res.code === '') {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    获取支付详情
      getPayment () {
        let el = this
        el.$http(el.$api.getPayment)
          .then((res) => {
            if (res.code === 1) {
              let a = Object.keys(res.data)
              let b = Object.values(res.data)
              a.forEach((q, w) => {
                for (let j in el.playData) {
                  if (q === j) {
                    el.playData[j] = b[w]
                  }
                }
              })
            } else if (res.code === '') {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    获取短信详情
      getSMSS () {
        let el = this
        el.$http(el.$api.getSMS)
          .then((res) => {
            if (res.code === 1) {
              let data = this.setObj(res.data)
              for (let k in data) {
                for (let o in el.smsData) {
                  if (k === o) {
                    el.smsData[o] = el.copyObj(data[k], el.smsData[o])
                  }
                }
              }
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
      setObj (data) {
        for (let k in data) {
          if (data[k].template) {
            data[k] = Object.assign(data[k], data[k].template)
            delete data[k].template
          }
        }
        return data
      }
    }
  }
</script>
<style scoped>
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
    text-align: left;
  }
  .clearfix:after {
    clear: both
  }
</style>
