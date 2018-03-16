<!--input框-->
<template>
    <el-dialog
        :title="config.title"
        :visible.sync="config.Dialog"
        :width="config.width">
      <el-form :label-position="config.labelPosition" :label-width="config.labelWidth" :model="formData">
        <template v-for="(list, $list) in labelData" >
          <el-form-item v-if="list.isType === 'input'" :label="list.label">
            <el-input :type="list.type || 'text'" v-model="formData[list.props]" :disabled="list.disabled" :placeholder="list.placeholder"></el-input>
          </el-form-item>
          <el-form-item v-if="list.isType === 'text'" :label="list.label" style="text-align: left">
            <template slot-scope="scope">
                <span>{{list.text}}</span>
            </template>
          </el-form-item>
          <el-form-item v-if="list.isType === 'slot'" :label="list.label">
            <el-input v-model="formData[list.props]" :placeholder="list.placeholder">
              <el-button :slot="list.slot" @click="slotClick(list, labelData)">{{list.slotText}}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item v-if="list.isType === 'area'" :label="list.label">
            <el-input type="textarea" :rows="2" v-model="formData[list.props]" :placeholder="list.placeholder"></el-input>
          </el-form-item>
          <el-form-item v-if="list.isType === 'img'" v-show="isSherry === 1"  :label="list.label" style="text-align: left">
            <img :src.native="config.imgUrl" style="height: 80px;width: 80px;display: inline-block;vertical-align: bottom"  alt="">
            <upImg style="display: inline-block"
              :upConfig="list.upConfig"
              @changeURL="getUrls"
              />
          </el-form-item>
          <el-form-item v-if="list.isType === 'switch'" :label="list.label" style="text-align: left">
            <el-switch v-model="value3" :disabled="list.disabled" on-color="#13ce66" off-color="#ff4949"  :active-value="1" :inactive-value="0"></el-switch>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="config.Dialog = false">取 消</el-button>
        <el-button type="primary" @click="Submit(config.evenName, formData)">{{config.SubmitText}}</el-button>
      </span>
    </el-dialog>
</template>
<script>
  import upImg from './upDate'
  export default {
    mixins: [],
    components: {upImg},
    props: ['config', 'formData', 'labelData'],
    data () {
      return {
        isSherry: 1,
        value3: 1
//        config: {
//          labelPosition: '',
//          Dialog: false,
//          title: '',
//          width: '30%',
//          labelWidth: '90px',
//          SubmitText: '',
//          evenName: ''
//        },
//       {isType: 'text', props: 'name', label: '手机号码', placeholder: '', text: ''},
//      {isType: 'slot', props: 'code', label: '输入验证码', placeholder: '验证码', slot: 'append', slotText: '获取验证码'}
//      {isType: 'input', props: 'transact_password', label: '提现密码', placeholder: '提现密码', text: '17601211250'}
      }
    },
    render () {},
    mounted () {
      this.dataInit()
    },
    updated () {},
    computed: {},
    destroyed () {},
    watch: {
      'value3' (val) {
        this.isSherry = val
        this.dataInit()
      },
      'config.action': {
        deep: true,
        handler (val) {
          if (this.config.action === 'edit') {
            this.isSherry = 1
            this.value3 = 1
          } else {
            this.isSherry = 1
            this.value3 = 1
          }
        }
      }
    },
    methods: {
      dataInit () {
//        this.isSherry = this.formData.is_images === 1 ? 1 : 0
      },
      Submit (evenName, val) {
        if (this.isSherry === 1) {
          val.value = this.config.imgUrl
          val.is_images = this.isSherry
        }
        this.$emit(evenName, val)
      },
      slotClick (val, labelData) {
        this.$emit('slotClick', val, labelData)
      },
      getUrls (urls) {
        this.$emit('setImgUrl', urls.image)
      }
    }
  }
</script>
<style scoped>
.dialog-footer{
  display: flex;
  justify-content: space-around;
}
</style>
