<!--代理列表-->
<template>
    <div>
      <el-table :data="agentData" :show-header="isShow" border size="mini"  header-align="center" :row-class-name="tableRowClassName">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <Tables :TablesPro="scope.row" :isShow="false"></Tables>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="代理ID" width="80"></el-table-column>
        <el-table-column prop="agent_key_no" label="代理编码" width="120"></el-table-column>
        <el-table-column prop="agent_name" label="代理名称" width="120"></el-table-column>
        <el-table-column prop="area" label="代理域名"></el-table-column>
        <el-table-column prop="contacts_tel" label="联系人电话"></el-table-column>
        <el-table-column prop="commission" label="佣金比例">
          <template slot-scope="scope">
            <span>{{`${scope.row.commission}%`}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="佣金"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status === 1 ? '启用': '禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="content" label="操作" width="200">
          <template slot-scope="scope">
           <span class="cursor" @click="forwardStaff(scope.row)">员工</span>
           <span class="cursor" @click="dynamic(scope.row , 'a')">添加下级</span>
           <span class="cursor" @click="dynamic(scope.row , 'b')">修改</span>
          </template>
        </el-table-column>
      </el-table>
      <!--修改代理-->
      <el-dialog :title="addOrconfirm === 1 ? '添加代理' : '修改代理'" :visible.sync="isElement" width="35%" top="2%">
        <el-form :model="agentGroundData" size="mini" ref="agentGroundData" :rules="rules">
          <el-form-item label="所属代理" prop="agent_id" :label-width="labelWidth" >
            <el-select v-model="agentGroundData.agent_id" placeholder="请选择所属代理">
              <el-option :key="999" label="顶级代理" :value="0"></el-option>
              <el-option v-for="(items, index) in belong" :key="index" :label="items.agent_no" :value="items.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理权限" prop="agent_id" :label-width="labelWidth" >
            <el-select v-model="agentGroundData.auth" placeholder="请选择代理权限">
              <el-option v-for="(list, $index) in getauthList" :key="$index" :label="list.role_name" :value="list.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理名称" prop="agent_name" :label-width="labelWidth">
            <el-input v-model="agentGroundData.agent_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :label-width="labelWidth">
            <el-input v-model="agentGroundData.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="禁用状态" :label-width="labelWidth" style="text-align: left">
            <el-switch
              v-model="agentGroundData.status"
             :active-value="1"
             :inactive-value="0"
             active-color="#13ce66"
             inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item label="开户行"  prop="kaihui_bank" :label-width="labelWidth">
            <el-input v-model="agentGroundData.kaihui_bank" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="开户名"  prop="bank_name" :label-width="labelWidth">
            <el-input v-model="agentGroundData.bank_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="提现银行卡" prop="bank_no" :label-width="labelWidth">
            <el-input v-model="agentGroundData.bank_no" auto-complete="off">
              <template slot="append">*银行卡号</template>
            </el-input>
          </el-form-item>
          <el-form-item label="提现状态" :label-width="labelWidth" style="text-align: left">
            <template>
              <el-switch
                v-model="agentGroundData.is_bank_status"
               :active-value="1"
               :inactive-value="0"
               active-color="#13ce66"
               inactive-color="#ff4949"></el-switch>
              <span style="padding-left: 15px">*是否禁止该代理提现</span>
            </template>
          </el-form-item>
          <el-form-item label="代理区域" prop="area" :label-width="labelWidth">
            <el-input v-model="agentGroundData.area" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系人姓名" prop="contacts" :label-width="labelWidth">
            <el-input v-model="agentGroundData.bank_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话" prop="contacts_tel" :label-width="labelWidth">
            <el-input v-model="agentGroundData.contacts_tel" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="加盟费" prop="cash" :label-width="labelWidth">
            <el-input v-model="agentGroundData.cash" auto-complete="off">
              <template slot="append">不允许提现</template>
            </el-input>
          </el-form-item>
          <el-form-item label="利润分成提成比例" prop="commission" :label-width="labelWidth">
            <el-input v-model="agentGroundData.commission" auto-complete="off">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="labelWidth">
            <el-input v-model="agentGroundData.remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="isElement = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
  import AddModify from '../AddModify'
  import store from '@/vuex/state'
  export default {
    name: 'Tables',
    props: ['TablesPro', 'isShow', 'TableData'],
    mixins: [],
    data () {
      return {
        agentData: this.TableData,
        isElement: false,
        getauthList: [],
//      所属代理
        belong: [],
        agentGroundData: {
          id: '',
          agent_id: '',
          password: '',
          auth: '',
          agent_name: '',
          agent_no: '',
          contacts: '',
          contacts_tel: '',
          kaihui_bank: '',
          bank_name: '',
          area: '',
          is_bank_status: 1,
          bank_no: '',
          cash: '',
          commission: '',
          status: 1,
          remark: ''
        },
        labelWidth: '125px',
        rules: {
          agent_id: [
            {validator: this.$verify.notEmpty, trigger: 'blur'}
          ],
          agent_name: [
            {validator: this.$verify.notEmpty, trigger: 'blur'}
          ],
          kaihui_bank: [
            {validator: this.$verify.notEmpty, trigger: 'blur'}
          ],
          bank_name: [
            {validator: this.$verify.notEmpty, trigger: 'blur'}
          ],
          contacts: [
            {validator: this.$verify.notEmpty, trigger: 'blur'}
          ],
          bank_no: [
            {validator: this.$verify.checkBack, trigger: 'blur'}
          ],
          area: [
            {validator: this.$verify.notEmpty, trigger: 'blur'}
          ],
          contacts_tel: [
            {validator: this.$verify.resPhone, trigger: 'blur'}
          ],
          cash: [
            {validator: this.$verify.notEmpty, trigger: 'blur'}
          ],
          commission: [
            {validator: this.$verify.notEmpty, trigger: 'blur'}
          ]
        },
        addOrconfirm: 1
      }
    },
    components: {
      AddModify
    },
    computed: {
      agentGroup () {
        return this.$store.state.agentGroup
      }
    },
    mounted () {
      this.agentData = this.TableData
      if (this.TablesPro === undefined) {
        this.getAgentList()
      } else {
        let r = {}
        r.agent_id = this.TablesPro.id
        r.level = this.TablesPro.level
        this.getAgentList(r)
      }
      this.getGetauth()
    },
    updated () {},
    destroyed () {},
    watch: {
      'TableData' (val) {
        this.agentData = val
      },
      agentGroup: function (newVal, old) {
        this.getAgentList()
      },
      'isElement': function (val) {
        if (!val) {
          this.agentGroundData.agent_id = ''
        }
      }
    },
    methods: {
//    代理列表
      getAgentList (queryData) {
        this.queryData = queryData || {}
        let el = this
        this.$store.commit('setLoading', true)
        el.$http(el.$api.getAgent, queryData)
          .then((res) => {
            if (res.code === 1) {
              this.$store.commit('setLoading', false)
              el.agentData = []
              el.agentData = Object.values(res.data)
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    获取代理归属列表
      dynamic (row, n) {
        let el = this
        this.agentGroundData.id = row.id
        this.agentGroundData.agent_id = row.id
        el.isElement = true
        if (n === 'a') {
          this.getGetauth()
          el.addOrconfirm = 1
          let queryData = {}
          queryData.agent_id = row.id
          el.$http(el.$api.getbBeLong, queryData)
            .then((res) => {
              if (res.code === 1) {
                el.belong = Object.values(res.data)
                for (let k in el.belong) {
                  el.belong[k].agent_no = '--|'.repeat(el.belong[k].level) + el.belong[k].agent_no
                }
              } else if (res.code === 0) {
                el.$message.error(res.msg)
              }
            }, (error) => {
              console.log(error)
            })
        }
        if (n === 'b') {
          el.addOrconfirm = 2
          let queryData = {}
          queryData.agent_id = row.id
          el.$http(el.$api.getbBeLong, queryData)
            .then((res) => {
              if (res.code === 1) {
                el.belong = Object.values(res.data)
                for (let k in el.belong) {
                  el.belong[k].agent_no = '--|'.repeat(el.belong[k].level) + el.belong[k].agent_no
                }
              } else if (res.code === 0) {
                el.$message.error(res.msg)
              }
            }, (error) => {
              console.log(error)
            })
          el.agentGroundData = el.copyObj(row, el.agentGroundData)
        }
      },
//    添加修改代理
      confirm (queryData) {
        let el = this
        el.queryData = queryData || {}
        queryData = JSON.parse(JSON.stringify(el.agentGroundData))
        if (el.addOrconfirm === 1) {
//          添加代理
          el.$http(el.$api.addAgent, queryData)
            .then((res) => {
              if (res.code === 1) {
                el.$message(res.msg)
                el.isElement = false
                this.$message({message: res.msg, type: 'success'})
              } else if (res.code === 0) {
                el.$message.error(res.msg)
              }
            }, (error) => {
              console.log(error)
            })
        }
//        修改代理
        if (el.addOrconfirm === 2) { // setAgent
          el.$http(el.$api.setAgent, queryData)
            .then((res) => {
              if (res.code === 1) {
                el.$message(res.msg)
                el.isElement = false
                el.agentGroundData.password = ''
                el.getAgentList()
              } else if (res.code === 0) {
                el.$message.error(res.msg)
              }
            }, (error) => {
              console.log(error)
            })
        }
      },
//    跳转员工
      forwardStaff (row) {
        let target = {}
        target.content = 'AddModify'
        target.name = '6-16'
        target.title = '代理员工列表'
        this.$store.commit('addTabs', target)
        this.$store.commit('transferAgent', row)
      },
//     获取代理权限分组 getGetauthlist
      getGetauth () {
        let el = this
        el.$http(el.$api.getGetauthlist)
          .then((res) => {
            if (res.code === 1) {
              el.getauthList = Object.values(res.data)
            } else if (res.code === 0) {
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
  .cursor{
    cursor: pointer;
    display: inline-block;
  }
  .cursors{
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: inline-block;
  }
  .el-table__expanded-cell{
    padding: 0 !important;
  }
</style>
