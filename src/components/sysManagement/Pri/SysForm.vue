<!--站点配置-->
<template>
  <el-form ref="form" :model="appForm" label-width="80px" size="mini">
    <template v-for="app in appData">
      <el-form-item :label="app.label">
        <!--<Editor style="width: 80%;height: 120px"></Editor>-->
      </el-form-item>
    </template>
  </el-form>
</template>
<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import Editor from '../../Tool/Editor.vue'
  export default {
    mixins: [],
    components: {Editor},
    props: ['contents'],
    data () {
      return {
        appForm: {
          confirmation: '',
          tel: '',
          company_name: '',
          special_version: '',
          app_logo: '',
          app_title: ''
        },
        appData: [
          {label: '投资确认书', prop: 'confirmation'},
          {label: '客服电话', prop: 'tel'},
          {label: '公司名称', prop: 'company_name'},
          {label: '特别说明', prop: 'special_version'},
          {label: '前台logo', prop: 'app_logo'},
          {label: 'title', prop: 'app_title'}
        ]
      }
    },
    mounted () {
      this.getSite()
    },
    destroyed () {
    },
    watch: {},
    methods: {
      getSite () {
        let el = this
        el.$http(el.$api.getSite)
          .then((res) => {
            if (res.code === 1) {
              let siteList = res.data
              for (let o in siteList) {
                for (let j in this.appForm) {
                  if (o === j) {
                    this.appForm[j] = siteList[o]
                  }
                  console.log(j)
                }
              }
              console.log(this.appForm)
            } else if (res.code === '') {
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
  .el-card{
    margin-top: 15px;
  }
  .card{
    line-height: 36px;
    font-weight: bold;
    float: left
  }
  .text {
    font-size: 14px;
    height: 55px;
    width: 400px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
