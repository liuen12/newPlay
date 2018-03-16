<!--管理员列表 5-11-->
<template>
    <div>
      <!--搜索-->
      <SearchBox style="text-align: left"
         :searchModel="searchModel"
         :searchData="searchData"
         :searchConfig="searchConfig"
         @addAdmin="addAdmin"
         />
      <!--Table-->
      <PublicTable
        :TableData="TableData"
        :TableLabel="TableLabel"
        @upAdmin="upAdmin"
      />
      <!--分页-->
      <Pagination class="Pagination"
        :paginationConfig="paginationConfig"
        @currentChange="currentChange"/>
      <DialogBox
        :dialogConfig="dialogConfig"
        :dialogForm="dialogForm"
        :dialogData="dialogData"
        @Determine="Determine"
        @addAdmins="addAdmins"
      />
    </div>
</template>
<script>
  export default {
    mixins: [],
    props: ['contents'],
    data () {
      return {
        // 搜索
        searchModel: {},
        searchData: [
          {isType: 'button', label: '', model: '', placeholder: '', buttonArr: [{type: 'primary', evenName: 'addAdmin', evenText: '添加管理员'}]}
        ],
        searchConfig: {
          size: 'small'
        },
        // Table
        TableData: [],
        TableLabel: [
          {isType: 'column', prop: 'id', label: 'ID', width: ''},
          {isType: 'column', prop: 'user_name', label: '登录名', width: ''},
          {isType: 'scope', prop: 'admin_group_id', label: '权限属性', width: '', status: []},
          {isType: 'scope', prop: 'status', label: '启用状态', width: '', status: [{state: 0, label: '是', color: '#6699cc'}, {state: 1, label: '否', color: '#ff6666'}]},
          {isType: 'scope', prop: 'login_status', label: '登录状态', width: '', status: [{state: 0, label: '禁用', color: '#ff6666'}, {state: 1, label: '正常', color: '#6699cc'}]},
          {isType: 'scope', prop: 'is_m_show', label: '号码是否可见', width: '', status: [{state: 0, label: '否', color: '#ff6666'}, {state: 1, label: '是', color: '#6699cc'}]},
          {isType: 'button', prop: '', label: '操作', width: '', btnArr: [{size: 'mini', type: 'text', label: '修改', evenName: 'upAdmin', attr: ''}]}
        ],
        // 分页
        paginationConfig: {
          layout: 'prev, pager, next',
          total: ''
        },
        dialogConfig: {
          title: '修改管理员',
          visible: false,
          width: '40%',
          dialogLabelWidth: '100px',
          buttonArr: [
            {type: 'primary', size: 'mini', evenName: '', evenText: '取 消', attr: ''},
            {type: 'primary', size: 'mini', evenName: '', evenText: '确 定', attr: 'a'}
          ]
        },
        dialogForm: {},
        dialogData: [
          {isType: 'input', label: '登录名', placeholder: '登录名', disabled: false, model: 'user_name'},
          {isType: 'select', label: '权限属性', placeholder: '权限属性', disabled: false, model: 'admin_group_id', selectArr: []},
          {isType: 'input', label: '登录密码', placeholder: '登录密码', disabled: false, model: 'password'},
          {isType: 'select', label: '启用状态', placeholder: '启用状态', disabled: false, model: 'status', selectArr: [{label: '是', value: 0}, {label: '否', value: 1}]},
          {isType: 'select', label: '登录状态', placeholder: '登录状态', disabled: false, model: 'login_status', selectArr: [{label: '禁用', value: 0}, {label: '正常', value: 1}]},
          {isType: 'select', label: '号码是否可见', placeholder: '号码是否可见', disabled: false, model: 'is_m_show', selectArr: [{label: '否', value: 0}, {label: '是', value: 1}]}
        ]
      }
    },
    mounted () {
      this.getAdmin()
      this.getbBeLong()
    },
    destroyed () {},
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '5-11') {
          this.getAdmin()
        }
      }
    },
    methods: {
      scoutAround (val) {
        this.getAdmin(val)
      },
      currentChange (val) {
        this.paginationConfig = Object.assign(this.searchModel, this.paginationConfig)
        this.paginationConfig.page = val
        this.getAdmin(this.paginationConfig)
      },
      getAdmin (val) {
        let el = this
        el.$store.commit('setLoading', true)
        el.$http(el.$api.getAdminList, val)
          .then((res) => {
            el.$store.commit('setLoading', false)
            if (res.code === 1) {
              el.TableData = Object.values(res.data)
              el.paginationConfig.total = res.pageInfo.TotalItem || 1
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
      addAdmin () {
        this.dialogForm = {}
        this.getbBeLong('a')
        this.dialogConfig.visible = true
        this.dialogConfig.title = '添加管理员'
        this.dialogConfig.buttonArr[1].evenName = 'addAdmins'
      },
      upAdmin (val) {
        this.dialogForm = val
        this.getbBeLong('a')
        this.dialogConfig.title = '修改管理员'
        this.dialogConfig.visible = true
        this.dialogConfig.buttonArr[1].evenName = 'Determine'
      },
//    添加
      addAdmins (val) {
        let el = this
        el.$http(el.$api.pAdminList, val)
          .then((res) => {
            if (res.code === 1) {
              el.dialogConfig.visible = false
              el.$message({ message: res.msg, type: 'success' })
              el.getAdmin()
              el.getbBeLong()
            } else {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    更新
      Determine (val) {
        let el = this
        el.$http(el.$api.upAdminList, val)
          .then((res) => {
            if (res.code === 1) {
              el.dialogConfig.visible = false
              el.$message({ message: res.msg, type: 'success' })
              el.getAdmin()
              el.getbBeLong()
            } else {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
//    获取权限树
      getbBeLong (n) {
        let el = this
        let queryData = {}
        queryData.dd = 1
        let arr = []
        el.$http(el.$api.getGetauthlist, queryData)
          .then((res) => {
            if (res.code === 1) {
              Object.values(res.data).forEach((o, i) => {
                o.value = o.id
                o.state = o.id
                o.label = o.role_name
                arr.push(o)
              })
              if (n === 'a') {
                this.dialogData[1].selectArr = arr
              } else {
                this.TableLabel[2].status = arr
              }
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
</style>
