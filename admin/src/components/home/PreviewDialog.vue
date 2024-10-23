<template>
  <div :class="{ 'preview-modal-container': true, hide: !visible }" @click="onClose">
    <div class="preview-content" style="z-index: 202;" @click.stop>
      <span class="close" @click="onClose">×</span>
      <div class="preview-modal-left">
        <div :class="{
          'preview-emulator-container': true,
          'preview-emulator-type1': previewMobileType === 'normal',
          'preview-emulator-type2': previewMobileType === 'full',
          'preview-emulator-type3': previewMobileType === 'hair',
          'preview-emulator-type4': previewMobileType === 'small'
        }">
          <div class="preview-emulator-navbar"></div>
          <div class="preview-emulator-title">xxx</div>
          <div class="preview-emulator-body">
            <iframe class="preview-iframe" allowTransparency="true" scrolling="auto" :src="iframeUrl"></iframe>
          </div>
        </div>
        <div class="preview-modal-gap"></div>
      </div>
      <div class="preview-modal-right">
        <h2>落地页预览</h2>
        <h4>画布尺寸</h4>
        <div class="preview-right-list">
          <div class="preview-selector active">
            <div class="preview-selector-container">
              <div :class="{ 'preview-scItem': true, active: previewMobileType == 'normal' }"
                @click="changePreviewMobileType('normal')">
                <SvgIcon class-name="mobile_normal_screen" icon-class="mobile_normal_screen"></SvgIcon>
                <p>主流机型</p>
              </div>
              <div :class="{ 'preview-scItem': true, active: previewMobileType == 'full' }"
                @click="changePreviewMobileType('full')">
                <SvgIcon class-name="mobile_full_screen" icon-class="mobile_full_screen"></SvgIcon>
                <p>全面屏</p>
              </div>
              <div :class="{ 'preview-scItem': true, active: previewMobileType == 'hair' }"
                @click="changePreviewMobileType('hair')">
                <SvgIcon class-name="mobile_hair_screen" icon-class="mobile_hair_screen"></SvgIcon>
                <p>刘海屏</p>
              </div>
              <div :class="{ 'preview-scItem': true, active: previewMobileType == 'small' }"
                @click="changePreviewMobileType('small')">
                <SvgIcon class-name="mobile_small_screen" icon-class="mobile_small_screen"></SvgIcon>
                <p>小屏手机</p>
              </div>
            </div>
          </div>
        </div>
        <h4>手机预览</h4>
        <div class="preview-qrcode-box">
          <div class="preview-qrcode">
            <VueQr :logoSrc="logoSrc" :text="previewSrc" :size="200" :margin="20"></VueQr>
          </div>
        </div>
        <h4>落地页地址</h4>

        <div class="preview-url">
          <span class="preview-url-text"> {{ previewSrc }} </span>
          <span class="preview-url-tip"></span>
          <el-button plain size="mini" v-clipboard:copy="previewSrc" v-clipboard:success="onCopySuccexss">复制链接
          </el-button>
          <el-button plain size="mini" @click="openOnNewTab(previewSrc)">新标签页打开</el-button>
          <br />
        </div>
        <div class="reflush-container">
          <el-button type="primary" size="large" @click="reflush">刷新</el-button>
        </div>
        <div class="preview-right-close">
          <div class="icon-container">
            <div class="spaui-icon icon-plus" style="font-size: 16px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueQr from 'vue-qr'
export default {
  props: {
    previewSrc: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: { VueQr },
  watch: {
    previewSrc: {
      handler: function (newVal, oldVal) {
        Object.assign(this, { iframeUrl: newVal })
      },
      immediate: true
    },
    visible: {
      handler: function (val, oldVal) {
        if (val) {
          this.reflush()
        }
      }
    }
  },
  data() {
    return {
      // 预览中手机的屏幕类型
      previewMobileType: 'normal',
      logoSrc: require('@/assets/images/ppd.png'),
      iframeUrl: ''
    }
  },
  mounted() {
  },
  methods: {
    onCopySuccexss() {
      this.$message('复制成功')
    },
    changePreviewMobileType(type) {
      Object.assign(this, { previewMobileType: type })
    },
    onClose() {
      this.$emit('update:visible', false)
    },
    openOnNewTab(src) {
      window.open(src)
    },
    reflush() {
      let { previewSrc } = this
      let iframeUrl = ''
      let nowDateTime = new Date().getTime()
      if (previewSrc.indexOf('?') > -1) {
        iframeUrl = `${previewSrc}&t=${nowDateTime}`
      } else {
        iframeUrl = `${previewSrc}?t=${nowDateTime}`
      }
      Object.assign(this, { iframeUrl })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';
@assets: '../../../assets';

.preview-modal-container {
  &.hide {
    display: none;
  }

  z-index: 201;
  .setPosition(fixed, 0, 0, 0, 0);
  .setFlexPos(row, center, center);
  background-color: rgba(0, 0, 0, 0.541);

  // 分步登录注册组件 - 不带额度验证码弹窗
  .preview-content {
    background-color: #fff;
    position: relative;
    .setFlexPos(row, flex-start, flex-start);

    .close {
      color: rgba(202, 202, 202, 1);
      text-align: center;
      font-size: 26px;
      padding: 0 8px 8px 8px;
      top: 10px;
      right: 12px;
      position: absolute;
      cursor: pointer;
      z-index: 300;
    }

    .preview-modal-left {
      padding: 0 50px;
      min-height: 850px;
      background: #eef1f4;
      .setFlexPos(row, center, center);

      .preview-emulator-container {
        position: relative;

        &.preview-emulator-type1 {
          .preview-emulator-navbar {
            width: 398px;
            .setBgImg('@{assets}/images/preview/mobile_normal_screen.png', 0, 0, 100%, no-repeat);
            padding-bottom: 749px;
          }

          .preview-emulator-title {
            top: 84px;
            font-size: 16px;
          }

          .preview-emulator-body {
            .setSize(371px, 596px);
            top: 113px;
            margin: 0 auto;
          }
        }

        &.preview-emulator-type2 {
          .preview-emulator-navbar {
            width: 398px;
            .setBgImg('@{assets}/images/preview/mobile_full_screen.png', 0, 0, 100%, no-repeat);
            padding-bottom: 784px;
          }

          .preview-emulator-title {
            top: 54px;
            font-size: 16px;
          }

          .preview-emulator-body {
            .setSize(371px, 677px);
            top: 83px;
            margin: 0 auto;
          }
        }

        &.preview-emulator-type3 {
          .preview-emulator-navbar {
            width: 398px;
            .setBgImg('@{assets}/images/preview/mobile_hair_screen.png', 0, 0, 100%, no-repeat);
            padding-bottom: 826px;
          }

          .preview-emulator-title {
            top: 51px;
            font-size: 16px;
          }

          .preview-emulator-body {
            .setSize(371px, 731px);
            top: 78px;
            margin: 0 auto;
          }
        }

        &.preview-emulator-type4 {
          .preview-emulator-navbar {
            width: 398px;
            .setBgImg('@{assets}/images/preview/mobile_small_screen.png', 0, 0, 100%, no-repeat);
            padding-bottom: 722px;
          }

          .preview-emulator-title {
            top: 121px;
            font-size: 16px;
          }

          .preview-emulator-body {
            .setSize(371px, 430px);
            top: 153px;
            margin: 0 auto;
          }
        }

        .preview-emulator-navbar {
          z-index: 1;
          position: relative;
          pointer-events: none;
        }

        .preview-emulator-title {
          position: absolute;
          left: 50%;
          font-weight: 600;
          transform: translateX(-50%);
          font-size: 14px;
          color: rgba(0, 0, 0, 0.8);
          z-index: 4999;
          white-space: nowrap;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .preview-emulator-body {
          background: #fff;
          position: absolute;
          left: 50%;
          transform: translate(-50%);
          top: 0;
          font-size: 0;

          .preview-iframe {
            .setSize(100%, 100%);
            .scrollBar();
            border: 0;
          }
        }
      }
    }

    .preview-modal-right {
      width: 450px;
      box-sizing: border-box;
      padding: 24px 30px;
      flex: 0 0 auto;
      position: relative;

      h2 {
        font-size: 18px;
        font-weight: 500;
      }

      h4 {
        margin: 15px 0 10px;
      }

      .preview-right-list {
        padding-bottom: 20px;
        border-bottom: 1px solid #dcdee3;

        .preview-selector {
          box-sizing: border-box;
          height: 100%;
          left: -280px;
          transition: all 0.3s ease;
          top: 0;
          z-index: 20;

          &.active {
            left: 0;

            .preview-scItem {
              transition: all 0.2s ease-in-out;
            }
          }

          .preview-selector-container {
            overflow: auto;
            height: 100%;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: 100px;
            grid-column-gap: 10px;

            .preview-scItem {
              .setFlexPos(column, center, center);
              box-sizing: border-box;
              transition: all 0.3s ease;
              overflow: hidden;
              cursor: pointer;
              border-radius: 2px;
              position: relative;
              box-shadow: inset 0 0 0 1px #dcdee3;
              font-size: 12px;

              &.active {
                box-shadow: inset 0 0 0 2px #2096f5;

                .svg-icon {
                  color: #2096f5;
                }

                p {
                  color: #2096f5;
                }
              }

              .svg-icon {
                .setSize(24px, 48px);
                margin: 0 0 10px 0;
              }
            }
          }
        }
      }

      .preview-qrcode-box {
        .preview-qrcode {
          img {
            border: 2px solid #dcdee3;
            border-radius: 4px;
          }
        }
      }

      .preview-url {
        .preview-url-text {
          font-size: 16px;
          color: #949496;
          word-break: break-all;
          display: block;
          line-height: 1.2;
          margin: 0 0 10px 0;
        }

        .preview-url-tip {
          font-size: 13px;
          color: #2096f5;
          word-break: break-all;
          display: block;
          line-height: 1.2;
          margin: 0 0 20px 0;
        }
      }

      .reflush-container {
        margin: 30px 0 0 0;
      }
    }
  }
}
</style>