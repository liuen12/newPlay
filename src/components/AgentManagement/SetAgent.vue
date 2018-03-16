<!--代理列表-->
<template>
  <el-row>
    <!--<RecursiveTable></RecursiveTable>-->
      <!--搜索-->
      <SearchBox style="text-align: left"
         :searchModel="searchModel"
         :searchData="searchData"
         :searchConfig="searchConfig"
         @scoutAround="scoutAround"
         @getBonl="getBonl"
      />
      <Tables
        :TableData="agentData"
        @getTableData="getAgentList"
      />
      <!--分页-->
      <Pagination class="Pagination"
        :paginationConfig="paginationConfig"
        @currentChange="currentChange"/>
      <!--添加代理-->
    <el-dialog title="添加代理" :visible.sync="isElement" width="40%" top="0%">
      <el-form :model="agentGroundData" size="mini" ref="agentGroundData" :rules="rules">
        <el-form-item label="所属代理" prop="agent_id" :label-width="labelWidth" >
          <el-select v-model="agentGroundData.agent_id"  placeholder="请选择所属代理">
            <el-option :key="999" label="顶级代理" :value="0"></el-option>
            <el-option v-for="(items, index) in belong" :key="index" :label="items.agent_no" :value="items.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代理权限" prop="agent_id" :label-width="labelWidth" >
          <el-select v-model="agentGroundData.auth" placeholder="请选择代理权限">
            <el-option  v-for="(items, index) in getauthList" :key="index" :label="items.role_name" :value="items.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代理名称" prop="agent_name" :label-width="labelWidth">
          <el-input v-model="agentGroundData.agent_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="labelWidth">
          <el-input v-model="agentGroundData.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="禁用状态" :label-width="labelWidth" style="text-align: left">
          <el-switch v-model="agentGroundData.status"
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
            <el-switch v-model="agentGroundData.is_bank_status"
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
          <el-input v-model="agentGroundData.contacts" auto-complete="off"></el-input>
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
        <el-button size="mini" type="primary" @click="addAgent">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
  import Tables from './Pri/Recursion.vue'
  export default {
    mixins: [],
    props: ['contents'],
    data () {
      return {
//      搜索
        searchModel: {},
        searchData: [
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'getBonl', evenText: '添加代理'}]},
          {isType: 'input', label: '', model: 'tel', placeholder: '手机号码'},
          {isType: 'input', label: '', model: 'cid', placeholder: '代理ID'},
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
        agentData: [],
        getauthList: [],
        threeCities: [],
        isLookAgent: false,
        isElement: false,
        belong: [],
        agentGroundData: {
          agent_id: '',
          auth: '',
          agent_name: '',
          password: '',
          agent_no: '',
          contacts: '',
          kaihui_bank: '',
          bank_name: '',
          contacts_tel: '',
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
          contacts: [
            {validator: this.$verify.notEmpty, trigger: 'blur'}
          ],
          kaihui_bank: [
            {validator: this.$verify.notEmpty, trigger: 'blur'}
          ],
          bank_name: [
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
        }
      }
    },
    mounted () {
      this.getAgentList()
      this.getGetauth()
    },
    destroyed () {},
    components: {
      Tables
    },
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '6-1') {
          let Group = Math.random() * 100
          this.$store.commit('addAgentGroup', Group)
        }
      }
    },
    methods: {
      scoutAround (val) {
        this.getAgentList(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getAgentList(this.paginationConfig)
      },
//    获取代理商列表
      getAgentList (queryData) {
        queryData = Object.assign(this.searchModel, queryData)
        let el = this
        this.$store.commit('setLoading', true)
        el.$http(el.$api.getAgent, queryData)
          .then((res) => {
            this.$store.commit('setLoading', false)
            if (res.code === 1) {
              el.agentData = []
              el.agentData = Object.values(res.data)
              el.paginationConfig.total = res.pageInfo.TotalItem || 1
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    添加代理
      addAgent (queryData) {
        let Group = Math.random() * 100
        let el = this
        el.queryData = queryData || {}
        queryData = this.agentGroundData
//      添加代理
        el.$http(el.$api.addAgent, queryData)
          .then((res) => {
            if (res.code === 1) {
              this.$message({message: res.msg, type: 'success'})
              this.$store.commit('addAgentGroup', Group)
              el.isElement = false
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    所属代理
      getBonl () {
        let el = this
        el.isElement = true
        let queryData = {}
        queryData.agent_id = 0
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
    }
  }
</script>
<style scoped>
  .el-table-column{
    cursor: pointer;
  }
  .el-table-expanded{
    padding: 0 !important;
  }
</style>
