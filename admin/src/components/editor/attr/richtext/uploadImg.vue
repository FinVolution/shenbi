<template>
  <div class="upload-img" style="background: white;">
    <el-upload class="quill-upload" ref="upload" :file-list="fileList" :show-file-list="false" :multiple="false"
               :headers="uploadCasHeaders" name="file" :http-request="ossUpload" action="" :limit="1">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import {API_APP_ID} from '@/common/const'
import {getCookie} from '@/utils'
import OSSClient from '@/utils/ossUpload'
import {mapActions} from 'vuex'

export default {
  name: 'QuillEditorUploadImg',
  data() {
    return {
      fileList: [],
      uploadCasHeaders: {},
    }
  },
  mounted() {
    this.initConfig()
  },
  methods: {
    ...mapActions('oss', ['initOssToken']),
    initConfig() {
      this.uploadCasHeaders = {}
    },
    quillSuccess(response) {
      if (response) {
        // 获取文本编辑器
        const quill = this.$refs.myQuillEditor.quill
        // 获取光标位置
        const pos = quill.getSelection().index
        // 插入图片到光标位置
        quill.insertEmbed(pos, 'image', response.data.url)
      } else {
        this.$essage.error('图片插入失败')
      }
    },
    async ossUpload(file) {
      await this.initOssToken()
      this.client = new OSSClient('xxx/uploadImages', this.content)
      this.$refs.upload.clearFiles()
      this.client.ossUpload(file).then(
        res => {
          this.fileInfo = res
          this.$emit('uploadSucc', res.url)
        },
        error => {
          this.$message({
            type: 'error',
            message: error
          })
        })
    },
  }
}
</script>

<style lang="less" scoped>
.upload-img {
  display: none;
}
</style>
