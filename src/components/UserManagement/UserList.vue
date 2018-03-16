<!--用户列表-->
<template>
    <el-row>
<!--搜索-->
      <SearchBox style="text-align: left"
           :searchModel="searchModel"
           :searchData="searchData"
           :searchConfig="searchConfig"
           @scoutAround="scoutAround"
           @downloadAll="downloadAll"
           @addUserClick="addUserClick"
           @setModify="setModify"
      />
<!--Table-->
      <PublicTable
        :TableData="TableData"
        :TableLabel="TableLabel"
        @handleClick="handleClick"
        @Determine="Determine"
        @handleChange="handleChange"
        />
<!--分页-->
      <Pagination class="Pagination"
      :paginationConfig="paginationConfig"
      @currentChange="currentChange"/>
      <!--用户充值-->
      <el-dialog title="充值" :visible.sync="dialogRecharge" width="30%">
        <el-form :model="userRecharge" size="mini">
          <el-form-item label="会员账号" label-width="80px">
            <el-input v-model="userRecharge.id"  :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" label-width="80px">
            <el-input v-model="userRecharge.mobile"  :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="姓名" label-width="80px">
            <el-input v-model="userRecharge.user_name"  :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="开户行" label-width="80px">
            <el-select v-model="userRecharge.bank_id" placeholder="请选择开户行">
              <el-option v-for="item in bankList" :key="item.bank_id" :label="item.bank_name" :value="item.bank_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="充值金额" label-width="80px">
            <el-input v-model="userRecharge.deposit"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button  size="mini" @click="dialogRecharge = false">取 消</el-button>
          <el-button  size="mini" type="primary" @click="setRechargeMoney">确 定</el-button>
        </div>
      </el-dialog>
      <!--调整金额-->
      <el-dialog title="调整金额" :visible.sync="dialogMoney" width="30%">
        <el-form :model="setUserMoney" size="mini">
          <el-form-item label="会员账号" label-width="80px">
            <el-input v-model="setUserMoney.user_id"  :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" label-width="80px">
            <el-input v-model="setUserMoney.user_phone"  :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="姓名" label-width="80px">
            <el-input v-model="setUserMoney.user_name"  :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="调整金额" label-width="80px">
            <el-input v-model="setUserMoney.UM_MoneyVal"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button  size="mini" @click="dialogMoney = false">取 消</el-button>
          <el-button  size="mini" type="primary" @click="setUsertM">确 定</el-button>
        </div>
      </el-dialog>
      <!--添加用户-->
      <el-dialog title="添加用户" :visible.sync="dialogaddUser" width="30%">
        <el-form :model="addUser" size="mini">
          <el-form-item label="昵称" label-width="100px">
            <el-input v-model="addUser.user_name"></el-input>
          </el-form-item>
          <el-form-item label="手机号" label-width="100px">
            <el-input v-model="addUser.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button  size="mini" @click="dialogaddUser = false">取 消</el-button>
          <el-button  size="mini" type="primary" @click="addUsers">确 定</el-button>
        </div>
      </el-dialog>
      <!--实名认证-->
      <el-dialog :title="isModify ? '实名认证' : '修改用户信息'" :visible.sync="dialogSetUser" width="30%" top="1%">
        <el-form :model="setUser" size="mini">
          <el-form-item label="姓名" label-width="100px">
            <el-input v-model="setUser.user_name" :disabled="isModify"></el-input>
          </el-form-item>
          <el-form-item label="性别" label-width="100px">
            <el-input v-model="setUser.sex" :disabled="isModify"></el-input>
          </el-form-item>
          <el-form-item label="证件号码" label-width="100px">
            <el-input v-model="setUser.id_number" :disabled="isModify"></el-input>
          </el-form-item>
          <el-form-item label="邮编" label-width="100px">
            <el-input v-model="setUser.youbian" :disabled="isModify"></el-input>
          </el-form-item>
          <el-form-item label="联系地址" label-width="100px">
            <el-input v-model="setUser.zhuzhi" :disabled="isModify"></el-input>
          </el-form-item>
          <el-form-item label="实际受益人" label-width="100px">
            <el-input v-model="setUser.jiaoyishouyiren" :disabled="isModify"></el-input>
          </el-form-item>
          <el-form-item label="不良诚信记录" label-width="100px">
            <el-input v-model="setUser.buliang" :disabled="isModify"></el-input>
          </el-form-item>
          <el-form-item label="实际受益人" label-width="100px">
            <el-input v-model="setUser.jiaoyishouyiren" :disabled="isModify"></el-input>
          </el-form-item>
        </el-form>
        <div style="display: flex;justify-content: space-around">
            <div v-if="isModify">
              <el-button  size="mini" type="danger" @click="setUserX('a')">审核未通过</el-button>
              <el-button  size="mini" type="primary" @click="setUserX('b')">通过审核</el-button>
            </div>
            <div v-else>
              <el-button  size="mini" type="primary" @click="upUser">确认修改</el-button>
            </div>
          </div>
        <hr>
        <el-form :model="setUser" size="mini">
          <el-form-item>
            <h3>协议认证</h3>
          </el-form-item>
          <el-form-item v-if="isModify" label="委托合作协议" label-width="100px">
            <div style="background: #666;width: 80%;height: 80px;text-align: left">
              <img :src="setUser.htimage" alt="委托合作协议" style="height: 135px;height: 80px">
            </div>
          </el-form-item>
          <el-form-item v-if="isModify" label="风险协议" label-width="100px">
            <div style="background: #666;width: 80%;height: 80px;text-align: left">
              <img :src="setUser.image" alt="风险协议" style="height: 135px;height: 80px">
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="display: flex;justify-content: space-around">
          <div>
            <el-button  size="mini" type="primary" @click="autograph()">驳回</el-button>
          </div>
        </div>
      </el-dialog>
      <!--给用户绑定银行卡-->
      <el-dialog title="绑定银行卡" :visible.sync="dialogBands" width="30%">
        <el-form :model="addBank" size="mini">
          <el-form-item label="账户ID" label-width="80px">
            <el-input v-model="addBank.id"  :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="姓名" label-width="80px">
            <el-input v-model="addBank.user_name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" label-width="80px">
            <el-input v-model="addBank.mobile"  :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="省份选择" label-width="80px">
            <el-cascader v-model="addBank.provinces" :options="threeCities" change-on-select></el-cascader>
          </el-form-item>
          <el-form-item label="开户名" label-width="80px">
            <el-input v-model="addBank.account_name"></el-input>
          </el-form-item>
          <el-form-item label="开户行" label-width="80px">
            <el-select v-model="addBank.bank_config_name" placeholder="请选择开户行">
              <el-option v-for="item in addBank.bankConfigName" :key="item.key" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户分行" label-width="80px">
            <el-input v-model="addBank.bank_name"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号" label-width="80px">
            <el-input v-model="addBank.bank_no"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogBands = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="addBands">确 定</el-button>
        </div>
      </el-dialog>
      <!--客户归属-->
      <el-dialog title="客户归属" :visible.sync="isAps" width="30%">
        <el-form :model="apsData" size="mini">
          <el-form-item label="所属代理" prop="agent_id" :label-width="labelWidth" >
            <el-select v-model="apsData.agent_id"  placeholder="请选择所属代理">
              <el-option :key="999" label="顶级代理" :value="0"></el-option>
              <el-option v-for="(items, index) in apsList" :key="index" :label="items.agent_no" :value="items.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="apsData.agent_id !== ''" label="所属推荐人" prop="agent_id" :label-width="labelWidth" >
            <el-select v-model="apsData.staff_id"  placeholder="请选择推荐人">
              <el-option v-for="(items, index) in staffList" :key="index" :label="items.staff_name" :value="items.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="">
          <el-button size="mini" @click="isAps = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="setAps">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
</template>
<script>
  import upDate from '../Tool/upDate.vue'
  export default {
    mixins: [],
    components: {upDate},
    props: ['contents'],
    data () {
      return {
//      搜索
        searchModel: {},
        searchData: [
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'addUserClick', evenText: '添加用户'}]},
          {isType: 'time', label: '', model: 'arrTime', placeholder: ''},
          {isType: 'input', label: '', model: 'staff_id', placeholder: '员工ID'},
          {isType: 'input', label: '', model: 'agent_id', placeholder: '代理商ID'},
          {isType: 'input', label: '', model: 'mobile', placeholder: '手机号码'},
          {isType: 'input', label: '', model: 'user_name', placeholder: '姓名'},
          {isType: 'select', label: '', model: 'status', placeholder: '实名状态', selectArr: [{label: '全部状态', value: ''}, {label: '已实名', value: '1'}, {label: '待认证', value: '0'}]},
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}, {type: 'primary', evenName: 'downloadAll', evenText: '导出Excel'}, {type: 'primary', evenName: 'setModify', evenText: '修改用户信息'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'selection', prop: '', label: '', width: '40'},
          {isType: 'column', prop: 'mobile', label: '账号（手机）', width: '100'},
          {isType: 'column', prop: 'user_name', label: '姓名', width: '90'},
          {isType: 'money', prop: 'balance', label: '用户余额', width: '130'},
          {isType: 'money', prop: 'money', label: '可用资金', width: ''},
          {isType: 'money', prop: 'advisable', label: '可取资金', width: ''},
          {isType: 'money', prop: 'freeze', label: '冻结资金', width: ''},
//          {isType: 'column', prop: 'lasttime', label: '股票市值', width: ''}, // 没有做
//          {isType: 'column', prop: 'yh', label: '盈亏金额', width: ''}, // 没有做
          {isType: 'column', prop: 'resiger_time', label: '注册时间', width: '90'},
          {isType: 'scope', prop: 'iv_status', label: '实名状态', width: '', status: [{state: 0, label: '待认证', color: '#ff6666'}, {state: 1, label: '已通过', color: '#6699cc'}, {state: 2, label: '未通过', color: '#b0b0b0'}]},
          {isType: 'popover', prop: 'state', label: '账号状态', width: '', popover: {isButConfig: {isButton: true, isStatu: 'popTag', props: 'state', cancel: '取消', mine: '确定'}, popoverList: [{label: '操作', props: '', defaults: '是否禁用用户？'}], statuList: [{state: 0, label: '正常', color: '#6699cc'}, {state: 1, label: '禁用', color: '#b0b0b0'}]}},
          {isType: 'popover', prop: 'staff_id', label: '所属员工', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'staff_id', defaults: '0', popoverList: [{label: '所属员工', props: 'staff_id_name', defaults: '无'}]}},
          {isType: 'popover', prop: 'agent_id', label: '所属代理', width: '', popover: {isButConfig: {isButton: false, cancel: '取消', mine: '确定'}, text: 'agent_id', defaults: '0', popoverList: [{label: '所属代理', props: 'agent_id_name', defaults: '无'}]}},
          {isType: 'button', prop: '', label: '操作', width: '270', btnArr: [{size: 'mini', type: 'text', label: '手动转账', evenName: 'handleClick', attr: 'a'}, {size: 'mini', type: 'text', label: '修改归属', evenName: 'handleClick', attr: 't'}, {size: 'mini', type: 'text', label: '信息审核', evenName: 'handleClick', attr: 'c', isShow: 2, prop: 'iv_status'}, {size: 'mini', type: 'text', label: '添加银行卡', evenName: 'handleClick', attr: 'd'}]}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
        isAps: false,
//      用户归属
        apsData: {
          id: '',
          staff_id: '',
          agent_id: ''
        },
        apsList: [],
        staffList: [],
        labelWidth: '90px',
        listData: [],
//      添加用户
        dialogaddUser: false,
        addUser: {
          user_name: '',
          mobile: ''
        },
//      用户充值
        dialogRecharge: false,
//      银行卡
        bankList: [],
        threeCities: [],
        userRecharge: {
          id: '',
          mobile: '',
          real_name: '',
          deposit: '',
          bank_id: ''
        },
//      调整金额
        dialogMoney: false,
        setUserMoney: {
          user_id: '',
          user_phone: '',
          user_name: ''
        },
//      修改信息
        dialogSetUser: false,
        setUser: {},
//      新增银行卡
        addBank: {
          id: '',
          mobile: '',
          user_name: '',
          provinces: [],
          bank_config_name: '',
          bankConfigName: [],
          account_name: '',
          bank_name: '',
          bank_no: ''
        },
        dialogBands: false,
        multipleSelection: [],
        isModify: false
      }
    },
    mounted () {
      this.getUserList()
      this.getCity()
    },
    destroyed () {},
    watch: {
//      监控是否点击tabs 点击则刷新列表
      'contents': function (val) {
        if (val.active === true && val.name === '2-1') {
          this.getUserList()
        }
      },
      'apsData.agent_id': function (val) {
        let el = this
        el.staffList = []
        el.apsData.staff_id = ''
        let queryData = {}
        queryData.agent_ids = val
        el.$http(el.$api.getModify, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.staffList = Object.values(res.data)
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      }
    },
    methods: {
      scoutAround (val) {
        if (val.arrTime) {
          val.start_time = val.arrTime[0]
          val.end_time = val.arrTime[1]
        } else {
          val.start_time = ''
          val.end_time = ''
        }
        this.getUserList(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getUserList(this.paginationConfig)
      },
      Determine (val) {
        let el = this
        let queryData = {}
        queryData.id = val.id
        queryData.state = 1
        el.$http(el.$api.setChange, queryData)
          .then((res) => {
            if (res.code === 1) {
              this.getUserList()
              this.$message({message: res.msg, type: 'success'})
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    充值金额
      setRechargeMoney () {
        let el = this
        let queryData = {}
        queryData = el.userRecharge
        queryData.user_id = ''
        queryData.user_id = el.userRecharge.id
        const h = el.$createElement
        for (let key in queryData) {
          if (key === 'deposit' && queryData[key] === '') {
            el.$notify({
              title: '温馨提示',
              message: h('span', {style: 'color: red'}, '请填写充值金额')
            })
            return
          }
          if (key === 'bank_id' && queryData[key] === '') {
            el.$notify({
              title: '温馨提示',
              message: h('span', {style: 'color: red'}, '请选择银行卡')
            })
            return
          }
        }
        el.$http(el.$api.setRecharge, queryData)
          .then((res) => {
            const h = el.$createElement
            if (res.code === 1) {
              el.$notify({
                title: '温馨提示',
                message: h('span', {style: 'color: #67C23A'}, res.msg)
              })
              el.dialogRecharge = false
            } else {
              el.$notify({
                title: '温馨提示',
                message: h('span', {style: 'color: #67C23A'}, res.msg)
              })
              el.dialogRecharge = false
            }
          }, (error) => {
            console.log(error)
          })
      },
//    获取银行列表
      getBanks (row) {
        let el = this
        let queryData = {}
        queryData.user_id = row.id
        el.$http(el.$api.getBankList, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.bankList = Object.values(res.data)
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    获取三级联动
      getCity () {
        let el = this
        let queryData = {}
        el.$http(el.$api.getJson, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.threeCities = el.chuLi(JSON.parse(res.data[0]))
            }
          }, (error) => {
            console.log(error)
          })
      },
//    修改金额
      setUsertM () {
        let el = this
        let queryURL = this.$http + '/index.php?group=admin&module=transaction&action=editUserMoneyVal'
        let queryDate = {}
        queryDate = el.setUserMoney
        queryDate.UM_UserPhone = el.setUserMoney.user_phone
        queryDate.token = el.$Token
        this.$axios.post(queryURL, queryDate)
          .then(function (response) {
            if (response.status === 200) {
              let res = response.data
              if (res.STATE === 1) {
                this.$message({ message: '充值申请成功！！', type: 'success' })
                el.dialogMoney = false
                el.getUserList()
              } else {
                el.$message.error('修改金额失败！！')
              }
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
//    添加用户
      addUserClick () {
        this.dialogaddUser = true
      },
//    添加用户
      addUsers () {
        let el = this
        let queryData = {}
        queryData = el.addUser
        el.$http(el.$api.addUser, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$notify({
                title: '温馨提示',
                message: '添加用户成功默认密码 666666a',
                duration: 0
              })
              el.dialogaddUser = false
            } else {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    实名认证
      setUserX (n) {
        let el = this
        let httpUrl = ''
        let queryData = {}
        queryData.user_id = el.setUser.shiID
        if (n === 'a') {
          httpUrl = el.$api.setBasicFail
        }
        if (n === 'b') {
          httpUrl = el.$api.setBasic
        }
        const h = this.$createElement
        el.$http(httpUrl, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$notify({
                title: '温馨提示',
                message: h('span', {style: 'color: #999'}, res.msg),
                duration: 0
              })
              el.getUserList()
              this.dialogSetUser = false
            }
            if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
      handleClick (row, i) {
        let el = this
        if (i === 'a') {
          this.dialogRecharge = true
          el.userRecharge = row
          el.getBanks(row)
        }
        if (i === 'b') {
          this.dialogMoney = true
          el.setUserMoney = row
        }
        if (i === 'c') {
          let el = this
          let queryData = {}
          this.isModify = true
          this.dialogSetUser = true
          el.setUser = el.copyObj(row, el.setUser)
          queryData.user_id = row.id
          el.$http(el.$api.getIdCards, queryData)
            .then((res) => {
              if (res.code === 1) {
                el.setUser = res.data
                el.setUser.shiID = row.id
              } else if (res.code === 0) {
                el.$message.error(res.msg)
                el.dialogSetUser = false
              }
            }, (error) => {
              console.log(error)
            })
        }
//      获取银行列表
        if (i === 'd') {
          el.dialogBands = true
          el.addBank = el.copyObj(row, el.addBank)
          el.$http(el.$api.getConfigBanks)
            .then((res) => {
              if (res.code === 1) {
                el.addBank.bankConfigName = Object.values(res.data)
              }
            }, (error) => {
              console.log(error)
            })
        }
        if (i === 't') {
          this.apsData.id = row.id
          el.apsList = []
          this.isAps = true
          el.$http(el.$api.getbBeLong)
            .then((res) => {
              if (res.code === 1) {
                el.apsList = Object.values(res.data)
                for (let k in el.apsList) {
                  el.apsList[k].agent_no = '--|'.repeat(el.apsList[k].level) + el.apsList[k].agent_no
                }
              } else if (res.code === 0) {
                el.$message.error(res.msg)
              }
            }, (error) => {
              console.log(error)
            })
        }
      },
//    设置用户归属
      setAps () {
        let el = this
        let queryData = {}
        queryData = el.apsData
        el.$http(el.$api.getChange, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$message(res.msg)
              el.isAps = false
              el.getUserList()
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    新增银行卡
      addBands () {
        let el = this
        let queryData = el.addBank
        queryData.user_id = queryData.id
        queryData.province = queryData.provinces[0]
        queryData.city = queryData.provinces[1]
        queryData.district = queryData.provinces[2]
        queryData.mobiles = queryData.mobile
        delete queryData.bankConfigName
        if (queryData.user_name === null) {
          el.$message({ message: '请先实名认证哦！', type: 'warning' })
        } else if (queryData.account_name === queryData.user_name) {
          el.$http(el.$api.addBanks, queryData)
            .then((res) => {
              if (res.code === 1) {
                el.$message('添加银行卡成功！！')
                el.dialogBands = false
              }
            }, (error) => {
              console.log(error)
            })
        } else {
          el.$message.error('开户名和实名认证的姓名不一致哦！！')
        }
      },
//    获取用户列表
      getUserList (queryData, n) {
//        this.queryData = queryData || {}
        this.queryData = Object.assign(this.searchModel, queryData)
        let el = this
        el.$store.commit('setLoading', true)
        el.$http(el.$api.getUserList, queryData)
          .then((res) => {
            el.$store.commit('setLoading', false)
            if (res.code === 1) {
              if (n === 'all') {
                el.listData = Object.values(res.data)
              } else {
                el.TableData = []
                el.TableData = Object.values(res.data)
              }
              el.paginationConfig.total = res.pageInfo.TotalItem
            } else if (res.code === 0) {
              el.TableData = []
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    选择修改信息
      handleChange (val) {
        if (val.length !== 0) {
          val[0].order_id = val[0].id
          val[0].user_id = val[0].user_id
        }
        this.multipleSelection = val
      },
//    判断选择了几个客户
      setModify () {
        let el = this
        let queryData = {}
        let row = el.multipleSelection[0]
        if (el.multipleSelection.length === 0) {
          el.$message({ message: '请选择要修改的用户', type: 'warning' })
          return false
        } else if (el.multipleSelection.length > 1) {
          el.$message.error('修改用户只能选择一个的操作哦！！')
          return false
        } else {
          this.isModify = false
          this.dialogSetUser = true
          el.setUser = row
          queryData.user_id = row.id
          el.$http(el.$api.getIdCards, queryData)
            .then((res) => {
              if (res.code === 1) {
                el.setUser = res.data
                el.setUser.shiID = row.id
              } else if (res.code === 0) {
                el.$message.error(res.msg)
                el.dialogSetUser = false
              }
            }, (error) => {
              console.log(error)
            })
        }
      },
//    前签名认证
      autograph (val) {
        let queryData = {}
        queryData.user_id = this.setUser.user_id
        this.$http(this.$api.setReview, queryData)
          .then(res => {
            if (res.code === 1) {
              this.$message({ message: res.msg, type: 'success' })
              this.dialogSetUser = false
            } else {
              this.$message.error(res.msg)
            }
          })
      },
//   修改用户信息
      upUser () {
        let el = this
        let queryData = {}
        queryData = el.setUser
        queryData.user_id = el.setUser.shiID
        el.$http(el.$api.upUser, queryData)
          .then((res) => {
            if (res.code === 1) {
              this.dialogSetUser = false
              this.$message({ message: res.msg, type: 'success' })
            } else {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
      chuLi (List) {
        let el = this
        List.forEach(function (i, o) {
          if (i !== '') {
            i.value = i.label
            if (i.children) {
              el.chuLi(i.children)
            }
          }
        })
        return List
      },
//    全部导出表格
      downloadAll () {
        let Table = this.TableKey(this.TableLabel)
        this.exportExcel(Table[0], Table[1], this.TableData, '用户列表')
      }
    }
  }
</script>
<style scoped>
  .el-dialog__body{padding: 10px 20px}
</style>
