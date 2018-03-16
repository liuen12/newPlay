<!--角色管理-->
<template>
  <el-row>
<!--搜索-->
    <SearchBox style="text-align: left"
       :searchModel="searchModel"
       :searchData="searchData"
       :searchConfig="searchConfig"
       @addRoler="addRoler"
    />
<!--Table-->
    <PublicTable
      :TableData="TableData"
      :TableLabel="TableLabel"
      @setJurisdiction="getPlan"
      @delRole="delRole"
    />
<!--分页-->
    <Pagination class="Pagination"
          :paginationConfig="paginationConfig"
          @currentChange="currentChange"/>
    <!--赋值权限-->
    <el-dialog title="权限设置" :visible.sync="Power" width="35%">
      <el-tree
        :data="listData"
        show-checkbox
        accordion
        node-key="id"
        ref="tree"
        :default-checked-keys="PlanKey"
        @check-change="handleCheckChange"
        :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Power = false">取 消</el-button>
        <el-button type="primary" @click="setPlan">确 定</el-button>
      </div>
    </el-dialog>
    <!--添加角色-->
    <el-dialog title="添加角色" :visible.sync="isRole" width="35%">
      <el-form :model="RoleShowData" ref="agentGroundData" :rules="rules">
        <el-form-item label="角色名称" prop="role_name" :label-width="labelWidth">
          <el-input v-model="RoleShowData.role_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="isRole = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
  export default {
    mixins: [],
    props: ['contents'],
    data () {
      return {
        //      搜索
        searchModel: {},
        searchData: [
          {isType: 'button', label: '', model: 'v', placeholder: 'asd', buttonArr: [{type: 'primary', evenName: 'addRoler', evenText: '添加角色'}]}
        ],
        searchConfig: {
          size: 'small'
        },
//      Table
        TableData: [],
        TableLabel: [
          {isType: 'column', prop: 'id', label: 'ID', width: '90'},
          {isType: 'defaults', prop: 'agent_key_no', label: '代理商编号', width: '90', defaults: '平台管理员'},
          {isType: 'column', prop: 'role_name', label: '角色名称', width: ''},
          {isType: 'column', prop: 'created_at', label: '创建时间', width: ''},
          {isType: 'button', prop: '', label: '操作', width: '', btnArr: [{size: 'mini', type: 'text', label: '权限控制', evenName: 'setJurisdiction', attr: 'a'}, {size: 'mini', type: 'text', label: '删除角色', evenName: 'delRole', attr: '', color: '#ddd'}]}
        ],
//      分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
        rules: {
          role_name: [
            {validator: this.$verify.notEmpty, trigger: 'blur'}
          ]
        },
        isRole: false,
        labelWidth: '80px',
        RoleShowData: {},
        Power: false,
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        listData: [],
        PlanKey: [],
        PlanID: ''
      }
    },
    mounted () {
      this.getRoleList()
    },
    destroyed () {
    },
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '6-7') {
          this.getRoleList()
        }
      }
    },
    methods: {
      search (val) {
        this.getRoleList(val)
      },
      currentChange (val) {
        this.paginationConfig.page = val
        this.getRoleList(this.paginationConfig)
      },
//    获取角色列表
      getRoleList () {
        let el = this
        this.$store.commit('setLoading', true)
        el.$http(el.$api.getRole)
          .then((res) => {
            this.$store.commit('setLoading', false)
            if (res.code === 1) {
              el.TableData = []
              el.TableData = Object.values(res.data)
              el.paginationConfig.total = res.pageInfo.TotalItem
            } else if (res.code === 0) {
              el.TableData = []
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    打开权限列表
      getPlan (val, n) {
//        let arr = [0, 60, 1, 105, 41, 82]
        this.$store.commit('setLoading', true)
        this.PlanID = val.id
        let el = this
        el.$http(el.$api.getPrivilege)
          .then((res) => {
            if (res.code === 1) {
              this.$store.commit('setLoading', false)
              this.PlanKey = JSON.parse(JSON.stringify(val.privilegeh)) || []
              this.listData = Object.values(res.data)
              this.Power = true
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    权限选择
      handleCheckChange (data, key) {
        let arr = []
        let arr2 = []
        arr = this.$refs.tree.getHalfCheckedKeys()
        arr2 = this.$refs.tree.getCheckedKeys()
        this.PlanKey = arr.concat(arr2) || this.PlanKey
      },
//    修改权限
      setPlan () {
        let el = this
        let queryData = {}
        queryData.privilege = [...new Set(el.PlanKey)]
        queryData.privilege = queryData.privilege ? queryData.privilege.join(',') : ''
        queryData.id = el.PlanID
        el.$http(el.$api.setEditpower, queryData)
          .then((res) => {
            if (res.code === 1) {
              this.Power = false
              this.$message({ message: res.msg, type: 'success' })
              el.getRoleList()
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    添加角色
      addRoler () {
        this.isRole = true
      },
      addRole () { // addRole
        let el = this
        let queryData = {}
        queryData = el.RoleShowData
        el.$http(el.$api.addRole, queryData)
          .then((res) => {
            if (res.code === 1) {
              this.$message({ message: '添加角色成功！！', type: 'success' })
              el.isRole = false
              this.getRoleList()
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
          .then(res => {
            if (res === 1) {
              el.getRoleList()
            }
          })
      },
//    删除角色
      delRole (row) { // addRole
        let el = this
        let queryData = {}
        queryData.id = row.id
        this.$confirm('确定要删除角色？删除后不可恢复。。。', '删除角色', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          el.$http(el.$api.delRole, queryData)
            .then((res) => {
              if (res.code === 1) {
                this.$message({
                  message: '删除角色成功！！',
                  type: 'success'
                })
                el.getRoleList()
              } else if (res.code === 0) {
                el.$message.error(res.msg)
              }
            }, (error) => {
              console.log(error)
            })
        }).catch(() => {})
      }
    }
  }
</script>
<style scoped>
  .el-collapse{
    text-align: left;
  }
</style>
