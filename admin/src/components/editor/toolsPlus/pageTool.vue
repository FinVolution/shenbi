<template>
  <div class="tool-page-container">
    <div class="config-title-outer config-title-outer"><span>背景图:</span></div>
    <ImgUpload :imgUrl="bgImgUrl" @uploadSucc="uploadImgSuccess" @deleteImg="deleteImage"></ImgUpload>
    <div class="config-title-outer config-title-outer"><span>导航背景图片:</span></div>
    <ImgUpload :imgUrl="titleBgImgUrl" @uploadSucc="uploadTitleImgSuccess" @deleteImg="deleteTitleImage"></ImgUpload>


    <div class="form-group config-title-outer">
      <span class="config-title">背景延伸颜色:</span>
      <el-color-picker v-model="bgColor" show-alpha @change="setColor" size="mini"></el-color-picker>
      <input type="text" v-model="bgColor" class="tool-input" />
    </div>
    <div class="form-group config-title-outer">
      <span class="config-title">导航背景颜色:</span>
      <el-color-picker v-model="titleBgColor" show-alpha @change="setTitleBgColor" size="mini"></el-color-picker>
      <input type="text" v-model="titleBgColor" class="tool-input" />
    </div>

    <div class="form-group config-title-outer">
      <span class="config-title">标题文字颜色:</span>
      <el-color-picker v-model="titleColor" show-alpha @change="setTitleColor" size="mini"></el-color-picker>
      <input type="text" v-model="titleColor" class="tool-input" />
    </div>


    <div class="form-group config-title-outer">
      <span class="config-title">弹窗按钮颜色:</span>
      <el-color-picker v-model="popupBgColor" show-alpha @change="setPopupBgColor" size="mini"></el-color-picker>
      <!-- <button class="normal-button" @click.stop="editGradient($event)" v-show="showGradient">渐变</button> -->
      <input type="text" v-model="popupBgColor" class="tool-input" />
    </div>

    <div class="form-group config-title-outer">
      <span class="config-title">弹窗文字颜色:</span>
      <el-color-picker v-model="popupFontColor" show-alpha @change="setPopupFontColor" size="mini"></el-color-picker>
      <input type="text" v-model="popupFontColor" class="tool-input" />
    </div>

    <div class="form-group config-title-outer">
      <span class="config-title">导航开关:</span>
      <el-switch v-model="titleSwitch" active-text="开" inactive-text="关" @change="setTitleSwitch"> </el-switch>
    </div>
    <!-- 页面投放端 app端 非app端 -->
    <div class="form-group config-title-outer">
      <span class="config-title">仅APP端投放开关:</span>
      <el-switch v-model="isAppSwitch" active-text="开" inactive-text="关" @change="setIsAppSwitch"> </el-switch>
    </div>
    <div class="form-group config-title-outer">
      <InputString :title="'页面点击跳转链接:'" keyValue="linkUrl" :value="linkUrl" @input="changePageLinkUrl"></InputString>
    </div>
    <div class="form-group config-title-outer">
      <InputString :title="'页面标题:'" keyValue="title" :value="title" @input="changePageTitle"></InputString>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import ImgUpload from '~/basePlus/imgUpload'
import InputNum from '~/basePlus/inputNum'
import InputString from '~/basePlus/inputString'
import GradientBgTool from '~/basePlus/gradientBg'

export default {
  data() {
    return {
      title: null,
      bgImgUrl: null,
      bgColor: null,
      popupBgColor: null,
      popupFontColor: null,
      titleSwitch: false,
      titleColor: null,
      titleBgImgUrl: null,
      titleBgColor: null,
      isAppSwitch: false,
      linkUrl: null,
      showGradient: false
    }
  },
  computed: {
    ...mapState('editor', {
      pageInfo: state => state.pageInfo
    })
  },
  watch: {
    popupBgColor: {
      handler: function (newVal) {
        this.changePageInfoConfig({ key: 'popupBgColor', val: newVal })
      },
      deep: true
    },
    popupFontColor: {
      handler: function (newVal) {
        this.changePageInfoConfig({ key: 'popupFontColor', val: newVal })
      },
      deep: true
    },
    pageInfo: {
      handler: function (newVal) {
        Object.assign(this, {
          title: newVal['title'],
          bgImgUrl: newVal['bgImgUrl'],
          popupBgColor: newVal['popupBgColor'],
          popupFontColor: newVal['popupFontColor'],
          bgColor: newVal['bgColor'],
          titleSwitch: newVal['titleSwitch'],
          titleColor: newVal['titleColor'],
          titleBgImgUrl: newVal['titleBgImgUrl'],
          titleBgColor: newVal['titleBgColor'],
          isAppSwitch: newVal['isAppSwitch'],
          linkUrl: newVal['linkUrl']
        })
      },
      deep: true,
    }
  },
  components: { InputNum, ImgUpload, GradientBgTool, InputString },
  props: {},
  methods: {
    ...mapMutations('editor', ['changePageInfoConfig']),
    deleteImage() {
      Object.assign(this, { bgImgUrl: '' })
      this.changePageInfoConfig({ key: 'bgImgUrl', val: '' })
    },
    uploadImgSuccess(url) {
      this.changePageInfoConfig({ key: 'bgImgUrl', val: url })
    },
    changePageTitle(key, value) {
      this.changePageInfoConfig({ key, val: value })
    },
    setColor(nColor) {
      this.changePageInfoConfig({ key: 'bgColor', val: nColor })
    },
    uploadTitleImgSuccess(url) {
      this.changePageInfoConfig({ key: 'titleBgImgUrl', val: url })
    },
    deleteTitleImage() {
      Object.assign(this, { titleBgImgUrl: '' })
      this.changePageInfoConfig({ key: 'titleBgImgUrl', val: '' })
    },
    setTitleSwitch(nSwitch) {
      this.changePageInfoConfig({ key: 'titleSwitch', val: nSwitch })
    },
    setTitleBgColor(nColor) {
      this.changePageInfoConfig({ key: 'titleBgColor', val: nColor })
    },
    setTitleColor(nColor) {
      this.changePageInfoConfig({ key: 'titleColor', val: nColor })
    },
    setPopupFontColor(nColor) {
      this.changePageInfoConfig({ key: 'popupFontColor', val: nColor })
    },
    setPopupBgColor(nColor) {
      this.changePageInfoConfig({ key: 'popupBgColor', val: nColor })
    },
    changePageLinkUrl(key, value) {
      this.changePageInfoConfig({ key, val: value })
    },
    setIsAppSwitch(nSwitch) {
      this.changePageInfoConfig({ key: 'isAppSwitch', val: nSwitch })
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
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../../../assets/less/base/mixins.less';

.tool-page-container {
  padding: 0 8px 12px 8px;
  background-color: #292a2e;
  @import '../../../../../assets/less/pc/tools.less';

  .form-group .config-title-outer {}
}

/deep/ .config-title {
  font-size: 14px !important;
  margin-left: 10px;
}
</style>
