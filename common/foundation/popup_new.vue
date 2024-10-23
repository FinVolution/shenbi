<template>
  <van-overlay
    class="activity-popup"
    v-if="popupIsShow"
    :show="popupIsShow"
    :lock-scroll="true"
  >
    <div class="activity-popup-mask">
      <div class="activity-popup-container">
        <div class="activity-popup-title">
          <div class="activity-popup-close" @click="closePopup">
            <img src="../../assets/images/common/close.png" />
          </div>
          {{ lotteryResult.title }}
        </div>
        <div
          class="activity-popup-top-tip"
          v-if="lotteryResult.awardTitle"
          v-html="lotteryResult.awardTitle"
        ></div>
        <div class="activity-popup-content" v-if="lotteryResult.picUrl">
          <div
            class="activity-popup-bg"
            v-if="(lotteryResult.awardType != 4 && lotteryResult.awardType != 11 && lotteryResult.awardType != 12)"
            :style="{
              backgroundImage: 'url(' + lotteryResult.picUrl + ')',
              backgroundSize: '100% 100%',
            }"
          >
            <div class="activity-popup-amount">
              <span>¥</span>{{ lotteryResult.amount }}
            </div>
            <div class="activity-popup-awardType">
              {{ lotteryResult.awardName }}
              <div class="sub-title">{{ lotteryResult.subTitle }}</div>
            </div>
          </div>
          <img :src="lotteryResult.picUrl" v-else />
        </div>
        <div class="activity-popup-button">
          <button @click="lotteryResult.callback" :style="popButtonStyleObj">
            {{ lotteryResult.buttonText || "确 定" }}
          </button>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>

const generatePageStyle = (pageInfo)=>{
  let { popupFontColor, popupBgColor } = pageInfo
  let resultPageStyle = {}
  if (popupBgColor) {
    resultPageStyle = {
      backgroundColor: popupBgColor,
    }
  } 
  if (popupFontColor) {
    resultPageStyle = {...resultPageStyle, color: popupFontColor}
  }
  return resultPageStyle
}
import { mapState } from 'vuex'
export default {
  name: "popup-page",
  props: {
    popupIsShow: {
      type: Boolean,
      default: false,
    },
    lotteryResult: {
      type: Object,
      default() {
        return {};
      },
    },
    propType: {
      type: Number,
      default() {
        return -1;
      },
    },

  },
  data() {
    return {
      popStyleObj: null,
      popButtonStyleObj: null,
      pageInfo:{},

    };
  },
  computed:{
     ...mapState('indexStore',{
         isApp: state => state.isApp,
         linkUrl: state => state.linkUrl,
         pageTitle: state => state.title,
     }),
     ...mapState('homeStore',{
         projectProperties: state => state.projectProperties,
         pageList: state => state.pageList,
     })
  },
  created() {
    if (__isBrowser__) {
      this.init()
    }
  },
  methods: {
    init(){
      let { pageList } = this || {}
      let { pageId } = this.$route.params || {}
      pageId = pageId || 1
      pageId !=null && pageId != undefined && pageId != '' && (pageId = parseInt(pageId))
      let homePage = pageList && pageList.find(item=>item['pageId'] === pageId)
      if(homePage){
        let {pageInfo} = homePage
        this.popButtonStyleObj = generatePageStyle(pageInfo)
      } else {
        // this.$router.push('/error')
      }
    },
    getStyleObject(componentItemStyle) {
      const noUnitStyleAttr = [
        "zIndex",
        "position",
        "borderColor",
        "borderStyle",
        "borderColor",
        "color",
        "backgroundColor",
        "fontWeight",
        "lineHeight",
        "boxSizing",
        "textAlign",
        "fontStyle",
      ];
      if (componentItemStyle) {
        let resultObject = {};
        for (let innerStyleItem in componentItemStyle) {
          if (noUnitStyleAttr.indexOf(innerStyleItem) > -1) {
            resultObject[innerStyleItem] = componentItemStyle[innerStyleItem];
          } else {
            resultObject[innerStyleItem] = `${pxToVw(
              componentItemStyle[innerStyleItem]
            )}`;
          }
        }
        return resultObject;
      }
      return null;
    },
    closePopup() {
      if (this.lotteryResult.close) {
        this.lotteryResult.close();
      } else {
        this.$emit("close");
      }
    },
    activityPopupRedirect() {
      let { lotteryResult } = this;
      let { awardLink } = lotteryResult;
      if (awardLink) {
        window.location.href = awardLink;
      } else {
        this.$emit("close");
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/less/base/mixins.less";
.activity-popup {
    z-index: 111;
  .activity-popup-mask {
    .setSize(100%, 100%);
    background-color: rgba(0, 0, 0, 0.6);
    .activity-popup-container {
      .setPosition(absolute, 50%, "", "", 50%);
      transform: translate(-50%, -50%);
      width: 303px;
      .setFlexPos(column, flex-start, flex-start);
      border-radius: 8px;
      background-color: #fff;
      padding: 0 24px 22px;
      box-sizing: border-box;
      .activity-popup-top-container {
      }
      .activity-popup-title {
        .f-18-bold();
        width: 100%;
        text-align: center;
        padding: 31px 0 0;
        color: #002a3c;
        .activity-popup-sub-title {
          .f-16();
          padding-top: 12px;
          margin-bottom: -10px;
        }
        .activity-popup-close {
          color: #ccc;
          .setSize(20px, 20px);
          .setPosition(absolute, 12px, 12px, "", "");
          .setFlexPos(row, center, center);
          img {
            .setSize(12px, 12px);
          }
        }
      }
      .activity-popup-top-tip {
        width: 100%;
        padding-top: 16px;
        .f-15();
        line-height: 22px;
        color: #49596c;
      }
      .activity-popup-content {
        padding: 10px 0 0;
        .setSize(100%, "");
        overflow-y: auto;
        overflow-x: hidden;
        img {
          .setSize(100%, 100%);
        }
        .activity-popup-bg {
          .setSize(100%, 88px);
          .setFlexPos(row, flex-start, center);
          .activity-popup-amount {
            width: 94px;
            padding: 0 10px;
            span {
              font-size: 15px;
            }
            font-size: 30px;
            font-weight: 400;
            color: #fff;
            text-align: center;
            box-sizing: border-box;
            .unite {
              font-size: 19px;
            }
          }
          .yellow {
            color: #ff670d;
          }
          .blue {
            color: #6183e9;
          }
          .golden {
            color: #d28820;
          }
          .purple {
            color: #7c5ddf;
          }
          .activity-popup-awardType {
            width: 160px;
            padding: 0 6px 0 14px;
            box-sizing: border-box;
            .f-16-bold();
            color: #ff8601;
            .sub-title {
              margin-top: 5px;
              .f-12-bold();
              color: #be917f;
              line-height: 14px;
            }
          }
        }
      }
      .activity-popup-tip {
        font-size: 13px;
        color: #3a465a;
        line-height: 13px;
        padding-top: 14px;
        word-break: break-word;
      }
      .activity-popup-button {
        width: 100%;
        .setFlexPos(row, space-between, center);
        padding-top: 30px;
        button {
          .setSize(100%, 36px);
          border: none;
          outline: none;
          .f-16-bold();
          border-radius: 8px;
          padding: 0;
        }
        .cancel {
          color: #616b78;
          border: 1px solid #dce1e6;
          background: transparent;
        }
      }
    }
  }
}
</style>
