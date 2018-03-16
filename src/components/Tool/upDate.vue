<template>
    <div>
      <el-button size="small" :type="upConfig.type" @click="upDate">{{upConfig.text}}</el-button>
      <input type="file" ref="MyFile" @change="upq()" style="display: none">
    </div>
</template>
<script>
  import axios from 'axios'
  export default {
    mixins: [],
    props: ['upConfig'],
    data () {
      return {}
    },
    mounted () {
    },
    destroyed () {
    },
    watch: {},
    methods: {
      upDate () {
        this.$refs.MyFile.click()
      },
      upq () {
        let file = event.target.files[0]
        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        let fileData = new FormData()
//        fileData.append('token', this.getToken('newToken'))
        //  fileData.append('admin_sid', this.getAdminSid('admin_sid'))
        fileData.append(this.upConfig.keys || 'key', file)
        axios.post(this.upConfig.upUrl + `?admin_sid=${this.getAdminSid('admin_sid')}`, fileData, config)
          .then((res) => {
            this.$message({ message: res.data.msg, type: 'success' })
            this.$emit('changeURL', res.data.data)
            this.$refs.MyFile.value = ''
          })
          .catch((err) => {
            console.log(err.data.msg)
          })
      },
      getToken (token) {
        if (localStorage.getItem(token)) {
          let newToken = localStorage.getItem(token) || ''
          return newToken
        }
      },
      getAdminSid (sid) {
        if (localStorage.getItem(sid)) {
          let newsid = localStorage.getItem(sid) || ''
          return newsid
        }
      }
    }
  }
</script>
<style scoped>
</style>
