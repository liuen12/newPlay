<template>
  <quill-editor ref="myTextEditor"
        v-model="content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)" >
        <div id="toolbar" slot="toolbar">
          <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
          <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
          <span class="ql-formats"><button type="button" class="ql-underline"></button></span>
          <span class="ql-formats"><button type="button" class="ql-strike"></button></span>
          <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
          <span class="ql-formats"><button type="button" class="ql-code-block"></button></span>
          <span class="ql-formats"><button type="button" class="ql-header" value="1"></button></span>
          <span class="ql-formats"><button type="button" class="ql-header" value="2"></button></span>
          <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
          <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
          <span class="ql-formats"><button type="button" class="ql-script" value="sub"></button></span>
          <span class="ql-formats"><button type="button" class="ql-script" value="super"></button></span>
          <span class="ql-formats"><button type="button" class="ql-indent" value="-1"></button></span>
          <span class="ql-formats"><button type="button" class="ql-indent" value="+1"></button></span>
          <span class="ql-formats"> <button type="button" class="ql-direction" value="rtl"></button></span>

          <span class="ql-formats">
              <select class="ql-size">
              <option value="small"></option>
              <option selected></option>
              <option value="large"></option>
              <option value="huge"></option>
            </select>
          </span>
          <span class="ql-formats">
              <select class="ql-header" >
              <option value="1"></option>
              <option value="2"></option>
              <option value="3"></option>
              <option value="4"></option>
              <option value="5"></option>
              <option value="6"></option>
              <option selected="selected"></option>
            </select>
          </span>
          <span class="ql-formats"><select class="ql-color">
        <option selected="selected"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option value="#ffffff"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
      </select></span>
          <span class="ql-formats"> <select class="ql-background">
        <option value="#000000"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option selected="selected"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
      </select></span>
          <span class="ql-formats"><select class="ql-font">
        <option selected="selected"></option>
        <option value="serif"></option>
        <option value="monospace"></option>
      </select></span>
          <span class="ql-formats">
        <select class="ql-align">
        <option selected="selected"></option>
        <option value="center"></option>
        <option value="right"></option>
        <option value="justify"></option>
      </select>
      </span>
          <span class="ql-formats"><button type="button" class="ql-clean"></button></span>
          <span class="ql-formats"><button type="button" class="ql-link"></button></span>
      <span class="ql-formats">
        <button type="button" @click="customButtonClick">img</button>
        <input type="file" class="custom-input" @change='upload' style='display: none !important;'>
      </span>
    </div>
  </quill-editor>
</template>
<script>
  import axios from 'axios'
  import {quillEditor} from 'vue-quill-editor'
  export default {
    mixins: [],
    props: ['upUrl', 'cont'],
    components: {quillEditor},
    data () {
      return {
        length: '',
        editor: {},
        content: this.cont,
        editorOption: {
          modules: {
            toolbar: '#toolbar'
          }
        }
      }
    },
    mounted () {},
    destroyed () {},
    watch: {
      'cont': function (val) {
        this.content = val
      },
      'content': function (val) {
        this.$emit('getContent', this.content)
      }
    },
    methods: {
      onEditorFocus (editor) {
        this.editor = editor   // 当content获取到焦点的时候就 存储editor
      },
      onEditorReady (editor) {
        this.editor = editor // 当quill实例化完先 存储editor
      },
      onEditorBlur () {
        this.$emit('getContent', this.content)
      },
      customButtonClick () {
        let range
        if (this.editor.getSelection() !== null) {
          range = this.editor.getSelection()
          this.length = range.index  // content获取到焦点，计算光标所在位置，目的为了在该位置插入img
        } else {
          this.length = this.content.length  // content没有获取到焦点时候 目的是为了在content末尾插入img
        }
        this.$el.querySelector('.custom-input').click()   // 打开file 选择图片
      },
      upload (event) {
        let el = this
        let file = event.target.files[0]
        let formdata = new FormData()
        formdata.append('token', this.getToken('newToken'))
        formdata.append('admin_sid', this.getAdminSid('admin_sid'))
        formdata.append('image', file)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post(this.upUrl, formdata, config)
          .then((res) => {
            if (res.data.code === 1) {
              el.editor.insertEmbed(el.length, 'image', res.data.data.image)
            }
          })
          .catch((err) => {
            console.log(err)
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
