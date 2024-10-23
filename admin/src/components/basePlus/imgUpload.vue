<template>
  <div class="form-group component-img">
    <GradientBgTool :show.sync="gradientToolShow" :clientX="gradientToolClientX" :clientY="gradientToolClientY"
      @change="onGradientChange" v-model="gradientStr"></GradientBgTool>
    <div class="img-preview">
      <img :src="imgUrl" class="el-upload-img" alt="背景图片" v-if="imgUrl && imgUrl.indexOf('http') > -1" />
      <div :style="{ 'background-image': imgUrl, width: '100%', height: '100%' }"
        v-else-if="imgUrl && imgUrl.indexOf('linear-gradient') > -1"></div>
    </div>
    <div >
      <div v-if="fileInfo && imgUrl && imgUrl.indexOf('http') > -1" :class="fileInfo.afterSize > maxImageSize ? 'imgsize-max' : 'imgsize'"> {{fileInfo.afterSize > maxImageSize ? '图片过大' : '大小'}}：{{fileInfo.afterSize | formatbytes}} </div>
      <div class="image-opts">
        <el-upload class="upload-demo" ref="upload" :file-list="fileList" :show-file-list="false" :multiple="false"
          :headers="uploadCasHeaders" name="file" :http-request="ossUpload" action="" :limit="1">
          <button slot="trigger" class="normal-button upload-button">上传图片</button>
        </el-upload>
        <el-upload class="upload-demo" ref="upload1" :file-list="fileList" :show-file-list="false" :multiple="false"
          :headers="uploadCasHeaders" name="file" :http-request="fileUpload" action="" :limit="1">
          <button slot="trigger" class="normal-button upload-button">上传到华为云</button>
        </el-upload>
        <div class="compress-image" @click="onCompressImage">去压缩图片</div>
      </div>
    </div>
    <button class="normal-button" @click.stop="editGradient($event)" v-show="showGradient">渐变</button>
    <!-- <button class="normal-button" @click="deleteImage">清空</button> -->
    <InputString :title="'图片名称:'" keyValue="imgName" :value="imgName" @input="handleChangeProperty">
    </InputString>
  </div>
</template>

<script>
import { API_APP_ID, bucketAppId, bucketKey } from '@/common/const'
import { getCookie } from '@/utils'
import lrz from 'lrz'
import GradientBgTool from '~/base/gradientBg'
import OSSClient from '@/utils/ossUpload'
import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'
import moment from 'moment'
import md5 from "js-md5"
import InputString from '~/basePlus/inputString'

export default {
  data() {
    return {
      fileList: [],
      uploadCasHeaders: {},
      gradientToolShow: false,
      gradientToolClientX: 0,
      gradientToolClientY: 0,
      gradientStr: null,
      oss: {
        key: "",
        policy: "",
        Signature: "",
        host: "",
        success_action_status: 200,
        callback: ""
      },
      fileUnikey: '',
      client: null,
      fileInfo: null,
      maxImageSize: 1024 * 100 * 2
    }
  },
  computed: {
    ...mapState('oss', ['content']),
    ...mapGetters('editor', ['componentProperty']),
    imgName() {
      return this.componentProperty?.imgName;
    }
  },
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    showGradient: {
      type: Boolean,
      default: true
    }
  },
  components: { GradientBgTool, InputString },
  methods: {
    ...mapActions('oss', ['initOssToken']),
    ...mapMutations('editor', ['changeComponentAttr']),
    async ossUpload(file) {
      await this.initOssToken()
      this.client = new OSSClient('xxx/uploadImages', this.content)
      this.$refs.upload.clearFiles()
      this.client.ossUpload(file).then(
        res => {
          this.fileInfo = res;
          this.$emit('uploadSucc', res.url)
          this.handleChangeProperty('imgName', file.file.name)
        },
        error => {
          this.$message({
            type: 'error',
            message: error
          })
        })
    },
    // 支持上传到华为云
    async fileUpload(file) {
      const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      const sign = md5(`${bucketAppId}${time}${bucketKey}`);
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("appid", bucketAppId);
      formData.append("uploadTime", time);
      formData.append("sign", sign);
      this.$refs.upload1.clearFiles();
      this.$http.imageUploadOss(formData).then(res => {
        this.fileInfo = res.data.file_url;
        this.$emit('uploadSucc', res.data.file_url);
        this.handleChangeProperty('imgName', file.file.name)
      });
    },
    onCompressImage() {
      window.open("https://tinypng.com/");
    },
    deleteImage() {
      this.$emit('deleteImg')
      this.$refs.upload.clearFiles()
    },
    onGradientChange(newBg) {
      this.$emit('uploadSucc', newBg)
    },
    editGradient(e) {
      let { imgUrl, gradientToolShow } = this
      if (gradientToolShow) {
        Object.assign(this, { gradientToolShow: false })
      } else {
        Object.assign(this, {
          gradientToolShow: true,
          gradientToolClientX: e.clientX,
          gradientToolClientY: e.clientY
        })
        if (imgUrl && imgUrl.indexOf('linear-gradient') > -1) {
          Object.assign(this, { gradientStr: imgUrl })
        } else {
          Object.assign(this, { gradientStr: null })
        }
      }
    },
    // 原始参数处理
    handleChangeProperty(key, newValue) {
      this.changeComponentAttr({
        key: 'property',
        newConfig: {
          [key]: newValue
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';
@import '../../../../assets/less/pcV2/tools.less';

.form-group.component-img {
  flex-direction: column !important;
  .img-preview {
    flex-direction: column;
    .setSize(100%, 120px);

    img {
      max-height: 100px;
      height: auto;
      width: auto;
    }
  }
  .imgsize{
    margin-top: 5px;
    color: white;
  }
  .imgsize-max{
    margin-top: 5px;
    color: brown;
    font-weight: bold;
  }
  .image-opts{
    display: flex;
    .upload-button {
      width: 100px;
      margin: 5px 0 0 5px;
    }
    .compress-image{
        background-color: #343437;
        border: #49494c solid 1px;
        border-radius: 16px;
        width: 100px;
        margin-left: 20px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: #c3c3c3;
        font-size: 12px;
        margin: 5px 0px 0px 5px;
    }
    .compress-image:hover {
      background-color: white;
      color: black;
    }
  }
}
</style>
