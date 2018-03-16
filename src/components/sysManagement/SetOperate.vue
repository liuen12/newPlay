<!--站点配置-->
<template>
  <el-row>
    <!--App设置-->
    <el-col>
      <h3 style="text-align: left;padding-left: 30px">App设置</h3>
    </el-col>
    <el-col :span="8" v-for="(siteItem, $index) in siteData" :key="siteItem.id">
      <el-card>
        <div slot="header" class="clearfix">
          <span class="card" v-text="siteItem.siteCard"></span>
          <el-button style="float: right;" type="primary" v-text="siteItem.btn" @click="siteObj(siteItem, 'app')">设置</el-button>
        </div>
        <div v-if="siteItem.type === '3'" class="text item" >
          <img :src="siteItem.content" alt="" style="height: 100%">
        </div>
        <div  class="text item" v-else v-html="siteItem.content"></div>
      </el-card>
    </el-col>
    <!--admin设置-->
    <el-col>
      <h3 style="text-align: left;padding-left: 30px;margin-top: 10px">admin设置</h3>
    </el-col>
    <el-col :span="8" v-for="(adminItem, $admin) in adminSite" :key="$admin">
      <el-card>
        <div slot="header" class="clearfix">
          <span class="card" v-text="adminItem.siteCard"></span>
          <el-button style="float: right;" type="primary" v-text="adminItem.btn" @click="siteObj(adminItem, 'admin')">设置</el-button>
        </div>
        <div v-if="adminItem.type === '3'" class="text item" >
          <img :src="adminItem.content" alt="" style="height: 100%">
        </div>
        <div v-else-if="adminItem.type === '4'" class="text item" >
          <span>{{`${adminItem.content ?  adminItem.content : '0'}/分钟`}}</span>
        </div>
        <div class="text item" v-else  v-html="adminItem.content"></div>
      </el-card>
    </el-col>
    <!--投资确认书-->
    <el-dialog :title="siteCon.siteCard" :visible.sync="dialogSite" :width="siteCon.type === '1' ? '100%' : '35%'" :top="siteCon.type === '1' ? '0%' : '15%'">
      <el-form :model="siteCon" id="form">
        <el-form-item v-if="siteCon.type === '1'">
          <quill-editor v-model="siteCon.content"  ref="myQuillEditor" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item v-if="siteCon.type === '2'">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model= 'siteCon.content'>
          </el-input>
        </el-form-item>
        <el-form-item v-if="siteCon.type === '3'">
          <input @change="fileImage"  type="file"  accept="image/jpeg,image/x-png,image/gif">
        </el-form-item>
        <el-form-item v-if="siteCon.type === '4'">
          <el-input placeholder="请输入时间" v-model="siteCon.time_out_fail">
            <template slot="append">/分钟</template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogSite = false">取 消</el-button>
          <el-button type="primary" @click="setSite">保 存</el-button>
        </span>
    </el-dialog>
  </el-row>
</template>
<script>
  import {quillEditor} from 'vue-quill-editor'
  export default {
    mixins: [],
    components: {quillEditor},
    props: ['contents'],
    data () {
      return {
        siteData: [
          {siteCard: '投资确认书', btn: '设置', type: '1', mode: 'confirmation', content: ''},
          {siteCard: '客服电话', btn: '设置', type: '2', mode: 'tel', content: ''},
          {siteCard: '公司名称', btn: '设置', type: '2', mode: 'company_name', content: ''},
          {siteCard: '特别说明', btn: '设置', type: '1', mode: 'special_version', content: ''},
          {siteCard: '前台logo', btn: '设置', type: '3', mode: 'app_logo', content: ''},
          {siteCard: 'title', btn: '设置', type: '2', mode: 'app_title', content: ''},
          {siteCard: '二维码', btn: '设置', type: '3', mode: 'qcode_url', content: ''},
          {siteCard: '充值提示', btn: '设置', type: '2', mode: 'qcode_cz_add', content: ''},
          {siteCard: '注意', btn: '设置', type: '2', mode: 'qcode_cz', content: ''},
          {siteCard: 'PC充值域名', btn: '设置', type: '2', mode: 'action_url', content: ''},
          {siteCard: '收款人', btn: '设置', type: '2', mode: 'qcode_cz_name', content: ''},
          {siteCard: '收款卡号', btn: '设置', type: '2', mode: 'qcode_cz_bankno', content: ''},
          {siteCard: '开户行', btn: '设置', type: '2', mode: 'qcode_cz_zy', content: ''},
          {siteCard: '询价递增资金', btn: '设置', type: '2', mode: 'increase_fund', content: ''}
        ],
        adminSite: [
          {siteCard: '后台logo', btn: '设置', type: '3', mode: 'admin_logo', content: ''},
          {siteCard: 'Title', btn: '设置', type: '2', mode: 'admin_copywriting_title', content: ''},
          {siteCard: '主页Logo', btn: '设置', type: '3', mode: 'main_logo_zhuye', content: ''},
          {siteCard: '主页头像', btn: '设置', type: '3', mode: 'main_thumb', content: ''},
          {siteCard: '推广域名', btn: '设置', type: '2', mode: 'h5_url', content: ''},
          {siteCard: '撤单时间', btn: '设置', type: '4', mode: 'time_out_fail', content: ''}
        ],
        dialogSite: false,
        editorOption: {},
        siteCon: {},
        mode: '',
        isApp: ''
      }
    },
    mounted () {
      this.getSite()
    },
    destroyed () {
    },
    watch: {
      'contents': function (val) {
        if (val.active === true && val.name === '5-5') {
          this.getSite()
        }
      }
    },
    methods: {
      siteObj (obj, a) {
        this.siteCon = obj
        this.dialogSite = true
        this.isApp = a
      },
      fileImage (e) {
        let el = this
        let file = e.target.files[0]
        let imgSize = file.size / 1024
        if (imgSize > 200) {
          el.$message.error('请上传大小不要超过200KB的图片')
        } else {
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onloadend = function () {
            el.siteCon.content = reader.result
          }
        }
      },
      getSite () {
        let el = this
        el.$http(el.$api.getSite)
          .then((res) => {
            if (res.code === 1) {
              let siteList = res.data
              for (let o in siteList) {
                el.siteData.forEach((j, k) => {
                  if (j.mode === o) {
                    j.content = siteList[o]
                  }
                })
                el.adminSite.forEach((j, k) => {
                  if (j.mode === o) {
                    j.content = siteList[o]
                  }
                })
              }
            } else if (res.code === 0) {
              el.$message.error(res.msg)
            }
          }, (error) => {
            console.log(error)
          })
      },
      setSite (n) {
        let el = this
        let queryData = {}
        if (this.isApp === 'app') {
          el.siteData.forEach((j, i) => {
            if (j.mode === el.siteCon.mode) {
              queryData[j.mode] = el.siteCon.content
            }
          })
        }
        if (this.isApp === 'admin') {
          el.adminSite.forEach((j, i) => {
            if (j.mode === el.siteCon.mode) {
              if (el.siteCon.time_out_fail) {
                queryData[j.mode] = el.siteCon.time_out_fail
              } else {
                queryData[j.mode] = el.siteCon.content
              }
            }
          })
        }
        el.$http(el.$api.setSite, queryData)
          .then((res) => {
            if (res.code === 1) {
              el.$message(res.msg)
              el.getSite()
              el.dialogSite = false
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
