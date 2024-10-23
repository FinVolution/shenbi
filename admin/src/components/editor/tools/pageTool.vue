<template>
  <div class="tool-page-container">
    <div class="config-title-outer"><span>背景图:</span></div>
    <ImgUpload :imgUrl="bgImgUrl" @uploadSucc="uploadImgSuccess" @deleteImg="deleteImage"></ImgUpload>
    <div class="form-group config-title-outer">
      <span class="config-title">背景颜色:</span>
      <el-color-picker v-model="bgColor" show-alpha @change="setColor" size="mini"></el-color-picker>
      <input type="text" v-model="bgColor" class="tool-input" />
    </div>
    <div class="config-title-outer"><span>导航:</span></div>
    <div class="form-group config-title-outer">
      <span class="config-title">导航开关:</span>
      <el-switch v-model="titleSwitch" active-text="开" inactive-text="关" @change="setTitleSwitch"> </el-switch>
    </div>
    <ImgUpload :imgUrl="titleBgImgUrl" @uploadSucc="uploadTitleImgSuccess" @deleteImg="deleteTitleImage"></ImgUpload>
    <div class="form-group config-title-outer">
      <span class="config-title">导航背景颜色:</span>
      <el-color-picker v-model="titleBgColor" show-alpha @change="setTitleBgColor" size="mini"></el-color-picker>
      <input type="text" v-model="titleBgColor" class="tool-input" />
    </div>
    <div class="form-group">
      <span class="config-title">标题:</span>
      <input type="text" v-model="title" class="tool-input" @input="changePageTitle" />
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


    <!-- 页面投放端 app端 非app端 -->
    <div class="form-group config-title-outer">
      <span class="config-title">仅APP端投放开关:</span>
      <el-switch v-model="isAppSwitch" active-text="开" inactive-text="关" @change="setIsAppSwitch"> </el-switch>
    </div>
    <div class="form-group">
      <span class="config-title">页面点击跳转链接:</span>
      <textarea rows="6" type="text" v-model="linkUrl" class="tool-input w-220 auto-height" @input="changePageLinkUrl">
      </textarea>
    </div>
    <!-- 挽留弹窗 -->
    <div class="form-group config-title-outer">
      <span class="config-title">挽留弹窗开关:</span>
      <el-switch v-model="retainPopupSwitch" active-text="开" inactive-text="关" @change="setRetainPopupSwitch"></el-switch>
    </div>
    <!-- 挽留弹窗 -->
    <div class="form-group config-title-outer">
      <span class="config-title">导航栏分享开关:</span>
      <el-switch v-model="showRightShareButton" active-text="开" inactive-text="关" @change="setShowRightShareButton"></el-switch>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import ImgUpload from '~/base/imgUpload'
import InputNum from '~/base/inputNum'
import GradientBgTool from '~/base/gradientBg'

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
      showGradient: false,
      retainPopupSwitch: false,
      showRightShareButton: false,
    }
  },
  computed: {
    ...mapState('editor', {
      pageInfo: state => state.pageInfo
    })
  },
  watch: {
    popupBgColor: {
      handler: function(newVal) {
        this.changePageInfoConfig({ key: 'popupBgColor', val: newVal })
      },
      deep: true
    },
    popupFontColor: {
      handler: function(newVal) {
        this.changePageInfoConfig({ key: 'popupFontColor', val: newVal })
      },
      deep: true
    },
    pageInfo: {
      handler: function(newVal) {
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
          linkUrl: newVal['linkUrl'],
          retainPopupSwitch: newVal['retainPopupSwitch'],
          showRightShareButton: newVal['showRightShareButton'],
        })
      },
      deep: true
    }
  },
  components: { InputNum, ImgUpload, GradientBgTool },
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
    changePageTitle() {
      this.changePageInfoConfig({ key: 'title', val: this.title })
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
    changePageLinkUrl() {
      this.changePageInfoConfig({ key: 'linkUrl', val: this.linkUrl })
    },
    setIsAppSwitch(nSwitch) {
      this.changePageInfoConfig({ key: 'isAppSwitch', val: nSwitch })
    },
    setRetainPopupSwitch(val) {
      this.changePageInfoConfig({ key: 'retainPopupSwitch', val })
    },
    setShowRightShareButton(val) {
      this.changePageInfoConfig({ key: 'showRightShareButton', val })
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
}
</style>
