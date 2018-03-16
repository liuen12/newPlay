<!--员工列表-->
<template>
    <el-row>
      <!--搜索-->
      <SearchBox style="text-align: left"
         :searchModel="searchModel"
         :searchData="searchData"
         :searchConfig="searchConfig"
         @scoutAround="scoutAround"
         @AddInformation="AddInformation"
      />
<!--Table-->
      <PublicTable
        :TableData="TableData"
        :TableLabel="TableLabel"
        @SetInformation="SetInformation"
        />
<!--分页-->
      <Pagination class="Pagination"
        :paginationConfig="paginationConfig"
        @currentChange="currentChange"/>

      <el-dialog :title="isAddOrSet === 1 ? '添加员工' : '修改员工信息'" :visible.sync="isModifyShow" width="35%" top="3%">
        <el-form :model="ModifyShowData" ref="agentGroundData" :rules="rule" size="mini">
          <el-form-item label="所属代理商" prop="admin_group_id" :label-width="labelWidth">
            <el-select v-model="ModifyShowData.agent_id" placeholder="请选择">
              <el-option
                v-for="item in agentGroup"
                :key="item.id"
                :label="item.agent_no"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="员工姓名" prop="staff_name" :label-width="labelWidth">
            <el-input v-model="ModifyShowData.staff_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="登录名" prop="user_name" :label-width="labelWidth">
            <el-input v-model="ModifyShowData.user_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :label-width="labelWidth">
            <el-input v-model="ModifyShowData.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel" :label-width="labelWidth">
            <el-input v-model="ModifyShowData.tel" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="权限分组" prop="admin_group_id" :label-width="labelWidth">
            <el-select v-model="ModifyShowData.admin_group_id" placeholder="请选择">
              <el-option v-for="item in ModifyArr" :key="item.id" :label="item.role_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="佣金比例" prop="commison" :label-width="labelWidth">
            <el-input v-model="ModifyShowData.commison" auto-complete="off">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="号码隐私" prop="commison" :label-width="labelWidth">
            <el-select v-model="ModifyShowData.is_m_show" placeholder="请选择活动区域">
              <el-option label="号码可见" :value="1"></el-option>
              <el-option label="号码带*" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提现状态" prop="status" :label-width="labelWidth">
            <template>
              <el-switch v-model="ModifyShowData.status"
                         :active-value="1"
                         :inactive-value="0"
                         active-color="#13ce66"
                         inactive-color="#ff4949"></el-switch>
              <span style="padding-left: 15px">*是否可以提现</span>
            </template>
          </el-form-item>
          <el-form-item label="登录激活状态" prop="login_status" :label-width="labelWidth">
            <template>
              <el-switch v-model="ModifyShowData.login_status"
                         :active-value="1"
                         :inactive-value="0"
                         active-color="#13ce66"
                         inactive-color="#ff4949"></el-switch>
              <span style="padding-left: 15px">*该员工是否可以登录</span>
            </template>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="isModifyShow = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="addModify">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
</template>
<script>
  import store from '@/vuex/state'
  export default {
    mixins: [],
    props: ['contents'],
    data () {
      return {
//      搜索
        searchModel: {},
        searchData: [
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'AddInformation', evenText: '新增员工'}]},
          {isType: 'input', label: '', model: 'tel', placeholder: '手机号码'},
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'scoutAround', evenText: '查询'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'column', prop: 'staff_key_no', label: '员工编号', width: ''},
          {isType: 'column', prop: 'user_name', label: '登录名', width: ''},
          {isType: 'column', prop: 'staff_name', label: '员工名称', width: ''},
          {isType: 'column', prop: 'tel', label: '联系人电话', width: ''},
          {isType: 'column', prop: 'commison', label: '佣金比例', width: ''},
          {isType: 'money', prop: 'money', label: '佣金', width: ''},
          {isType: 'scope', prop: 'status', label: '提现状态', width: '', status: [{state: 0, label: '否'}, {state: 1, label: '是'}]},
          {isType: 'scope', prop: 'login_status', label: '登录状态', width: '', status: [{state: 0, label: '禁用'}, {state: 1, label: '正常'}]},
          {isType: 'button', prop: '', label: '操作', width: '260', btnArr: [{size: 'mini', type: 'text', label: '修改', evenName: 'SetInformation', attr: 'b'}]}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
        ModifyData: [],
        isAddOrSet: 1,
//       员工分组
        ModifyArr: [],
        multipleSelection: [],
//      员工信息修改
        isModifyShow: false,
        agentGroup: [],
        ModifyShowData: {
          password: '' || 666666,
//         员工开户行
          cityThree: [],
          user_name: '',
          staff_name: '',
          commison: '',
          tel: '',
          real_name: '',
          admin_group_id: '',
          status: 0,
          login_status: 1,
          is_m_show: '0',
          agent_id: '',
          id: '',
          remark: ''
        },
        rule: {
          staff_name: [
            {validator: this.$verify.notEmpty, trigger: 'blur'}
          ],
          user_name: [
            {validator: this.$verify.notEmpty, trigger: 'blur'}
          ],
          real_name: [
            {validator: this.$verify.notEmpty, trigger: 'blur'}
          ],
          tel: [
            {validator: this.$verify.checkAge, trigger: 'blur'}
          ],
          commison: [
            {validator: this.$verify.notEmpty, trigger: 'blur'}
          ]
        },
        labelWidth: '100px',
        agent: {},
        bankList: [],
        agentId: ''
      }
    },
    mounted () {
      this.agentId = this.$store.state.agent.id
      this.getModify()
    },
    computed: {
      getAgent () {
        this.agent = this.$store.state.agent
        return this.$store.state.agent
      }
    },
    destroyed () {},
    updated () {},
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '6-16') {
          this.getModify()
        }
      },
      getAgent: {
        handler: function (val) {
          this.agent = val
          this.agentId = val.id
          this.getModify()
        },
        deep: true
      }
    },
    methods: {
      scoutAround (val) {
        this.getModify(val)
      },
      currentChange (val) {
        this.paginationConfig.page = val
        this.getModify(this.paginationConfig)
      },
      AddInformation () {
        this.SetInformation(undefined, 'a')
      },
//    选择项
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
//    获取员工列表
      getModify (queryDatas) {
        let el = this
        this.$store.commit('setLoading', true)
        queryDatas = Object.assign(this.searchModel, queryDatas)
        queryDatas.agent_ids = el.agentId
        el.$http(el.$api.getModify, queryDatas)
          .then((res) => {
            this.$store.commit('setLoading', false)
            if (res.code === 1) {
              el.TableData = []
              el.TableData = Object.values(res.data)
              el.paginationConfig.total = res.pageInfo.TotalItem
            } else if (res.code === 0) {
              el.ModifyData = []
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    修改添加员工
      addModify (o) {
        let el = this
        let queryData = {}
        queryData = JSON.parse(JSON.stringify(el.ModifyShowData))
//      添加员工
        if (el.isAddOrSet === 1) {
          el.$http(el.$api.addModify, queryData)
            .then((res) => {
              if (res.code === 1) {
                el.$message({message: res.msg, type: 'success'})
                el.getModify()
                el.isModifyShow = false
              } else if (res.code === 0) {
                el.$message.error(res.msg)
              }
            }, (error) => {
              console.log(error)
            })
        }
//      修改员工
        if (el.isAddOrSet === 2) {
          el.$http(el.$api.setModify, queryData)
            .then((res) => {
              if (res.code === 1) {
                el.$message({message: res.msg, type: 'success'})
                el.isModifyShow = false
                el.getModify()
              } else if (res.code === 0) {
                el.$message.error(res.msg)
              }
            }, (error) => {
              console.log(error)
            })
        }
      },
//    修改添加员工按钮
      SetInformation (row, n) {
        let el = this
        el.isModifyShow = true
        el.getGroup()
        el.ModifyArrs()
//      修改员工预处理
        if (n === 'b') {
          el.isAddOrSet = 2
          el.ModifyShowData = row
          el.ModifyShowData.commison = parseFloat(el.ModifyShowData.commison)
        }
//      添加员工预处理
        if (n === 'a') {
          el.isAddOrSet = 1
          for (let i in el.ModifyShowData) {
            el.ModifyShowData[i] = ''
          }
          el.ModifyShowData.admin_group_id = ''
          el.ModifyShowData.agent_id = el.agent.id
        }
      },
//    获取代理商分组
      getGroup () { //  getbBeLong
        let el = this
        let queryData = {}
        queryData.agent_id = 0
        el.$http(el.$api.getbBeLong, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.agentGroup = Object.values(res.data)
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    获取员工分组
      ModifyArrs () {
        let el = this
        el.$http(el.$api.getGetauthlist)
          .then((res) => {
            if (res.code === 1) {
              el.ModifyArr = res.data
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
              el.bankList = JSON.parse(res.data[0])
              el.bankList = el.chuLi(el.bankList)
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
      }
    },
    store
  }
</script>
<style scoped>
  .cursor{
    cursor: pointer;
    display: inline-block;
  }
</style>

