<template>
  <div class="form-group component-img">
    <GradientBgTool
      :show.sync="gradientToolShow"
      :clientX="gradientToolClientX"
      :clientY="gradientToolClientY"
      @change="onGradientChange"
      v-model="gradientStr"
    ></GradientBgTool>
    <div class="img-preview">
      <img
        :src="imgUrl"
        class="el-upload-img"
        alt="背景图片"
        v-if="imgUrl && imgUrl.indexOf('http') > -1"
      />
      <div
        :style="{ 'background-image': imgUrl, width: '100%', height: '100%' }"
        v-else-if="imgUrl && imgUrl.indexOf('linear-gradient') > -1"
      ></div>
    </div>
    <div
      v-if="fileInfo && imgUrl && imgUrl.indexOf('http') > -1"
      class="image-opts"
    >
      <div
        :class="fileInfo.afterSize > maxImageSize ? 'imgsize-max' : 'imgsize'"
      >
        {{ fileInfo.afterSize > maxImageSize ? '过大（请压缩)' : '大小' }}：{{
          fileInfo.afterSize | formatbytes
        }}
      </div>
      <div class="compress-image" @click="onCompressImage">去压缩图片</div>
    </div>
    <div class="upload-img">
      <el-upload
        class="upload-demo"
        ref="upload"
        :file-list="fileList"
        :show-file-list="false"
        :multiple="false"
        :headers="uploadCasHeaders"
        name="file"
        :http-request="ossUpload"
        action=""
        :limit="1"
      >
        <button slot="trigger" class="normal-button">上传图片</button>
      </el-upload>
      <button
        class="normal-button"
        @click.stop="editGradient($event)"
        v-show="showGradient"
      >
        渐变
      </button>
      <button class="normal-button" @click="deleteImage">清空</button>
    </div>
  </div>
</template>

<script>
import { API_APP_ID } from '@/common/const';
import { getCookie } from '@/utils';
import lrz from 'lrz';
import GradientBgTool from '~/base/gradientBg';
import OSSClient from '@/utils/ossUpload';
import { mapState, mapActions } from 'vuex';
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
        key: '',
        policy: '',
        Signature: '',
        host: '',
        success_action_status: 200,
        callback: '',
      },
      fileUnikey: '',
      client: null,
      fileInfo: null,
      maxImageSize: 1024 * 100 * 2,
    };
  },
  computed: {
    ...mapState('oss', ['content']),
  },
  props: {
    imgUrl: {
      type: String,
      default: '',
    },
    showGradient: {
      type: Boolean,
      default: true,
    },
  },
  components: { GradientBgTool },
  methods: {
    ...mapActions('oss', ['initOssToken']),
    async ossUpload(file) {
      await this.initOssToken();
      this.client = new OSSClient('xxx/uploadImages', this.content);
      this.$refs.upload.clearFiles();
      this.client.ossUpload(file).then(
        (res) => {
          this.fileInfo = res;
          this.$emit('uploadSucc', res.url);
        },
        (error) => {
          this.$message({
            type: 'error',
            message: error,
          });
        }
      );
    },
    onCompressImage() {
      window.open('https://tinypng.com/');
    },
    deleteImage() {
      this.$emit('deleteImg');
      this.$refs.upload.clearFiles();
    },
    onGradientChange(newBg) {
      this.$emit('uploadSucc', newBg);
    },
    editGradient(e) {
      let { imgUrl, gradientToolShow } = this;
      if (gradientToolShow) {
        Object.assign(this, { gradientToolShow: false });
      } else {
        Object.assign(this, {
          gradientToolShow: true,
          gradientToolClientX: e.clientX,
          gradientToolClientY: e.clientY,
        });
        if (imgUrl && imgUrl.indexOf('linear-gradient') > -1) {
          Object.assign(this, { gradientStr: imgUrl });
        } else {
          Object.assign(this, { gradientStr: null });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';
@import '../../../../assets/less/pc/tools.less';

.form-group.component-img {
  .img-preview {
    .setSize(100px, 76px);

    img {
      max-height: 76px;
      height: auto;
      max-width: 100px;
    }
  }
  .imgsize {
    margin-top: 5px;
    color: white;
  }
  .imgsize-max {
    margin-top: 5px;
    color: brown;
    font-weight: bold;
  }
  .image-opts {
    display: flex;
    flex-direction: column;
    padding: 0 3px;
    .compress-image {
      background-color: #343437;
      border: #49494c solid 1px;
      border-radius: 5px;
      margin-left: 20px;
      height: 22px;
      padding: 0 2px;
      line-height: 22px;
      text-align: center;
      color: #c3c3c3;
      font-size: 12px;
    }
    .compress-image:hover {
      background-color: white;
      color: black;
    }
  }
}
</style>
