<template>
    <van-overlay
      :show="show"
      :lock-scroll="true"
      class=" overlayCls flex-layout-h flex-item-center flex-justify-center"
    >
      <div class="popup-bg">
        <img class="icon_close" src="/build/images/national_day24/dialog_close.png" alt="" @click="closeDialogClick">
        <section v-if="status === 0">
          <div class="icon-rank">
            恭喜您获得<span>1张优惠券</span>
          </div>
          <div class="coupon-container">
            <div class="coupon-amount">
              <section v-if="couponResponse.couponType === 1">
                免息
              </section>
              <section v-else-if="couponResponse.couponType === 2 || couponResponse.couponType === 7">
                {{ couponResponse.couponDiscountDesc }}<span style="font-weight: bold;color:#EC300A;">折</span>
              </section>
              <section v-else>
                ¥{{ (couponResponse.amount/100).toFixed(0) }}
              </section>
            </div>
            <div class="coupon-type">
              {{ result.couponResponse.couponName }}<br /><span>{{ result.couponResponse.couponDesc }}</span>
            </div>
          </div>
          <div class="tips">
            今日借款，有机会得华为Mate XT三折屏手机哦!
          </div>
        </section>
        <section v-if="status === 4">
          <div class="icon-rank">
            限时任务
          </div>
          <div class="award-container">
            今日再借<span>{{ (limitTaskResponse.taskGapAmount/100).toFixed(0) }}元</span>即可领京东卡<span>{{ (limitTaskResponse.amount/100).toFixed(0) }}元</span>
          </div>
          <div class="coupon-container" style="">
            <div class="coupon-amount">
                ¥{{ (limitTaskResponse.amount/100).toFixed(0) }}
            </div>
            <div class="coupon-type">
              {{ limitTaskResponse.taskTitle }}<br /><span>累计借款满{{ (limitTaskResponse.targetLoanAmount/100).toFixed(0) }}元</span>
            </div>
          </div>
          <div class="tips">
            今日借款，有机会得华为Mate XT三折屏手机哦!
          </div>
        </section>
        <section v-if="status === 2">
          <div class="icon-rank">
            您有<span>1张优惠券</span>未使用
          </div>
          <div class="coupon-container">
            <div class="coupon-amount">
              <section v-if="couponResponse.couponType === 1">
                免息
              </section>
              <section v-else-if="couponResponse.couponType === 2 || couponResponse.couponType === 7">
                {{ couponResponse.couponDiscountDesc }}<span>折</span>
              </section>
              <section v-else>
                ¥{{ (couponResponse.amount/100).toFixed(0) }}
              </section>
            </div>
            <div class="coupon-type">
              {{ result.couponResponse.couponName }}<br /><span>{{ result.couponResponse.couponDesc }}</span>
            </div>
          </div>
          <div class="tips">
            今日借款，有机会得华为Mate XT三折屏手机哦!
          </div>
        </section>
        <section v-if="status===1">
          <div class="icon-rank">
            恭喜您获得<span>限时任务</span>
          </div>
          <div class="award-container">
            <section v-if="couponResponse.couponType === 1">
              今日可享免息借款+领京东卡<span>{{ (result.limitTaskResponse.amount/100).toFixed(0) }}元</span>
            </section>
            <section v-else-if="couponResponse.couponType === 2 || couponResponse.couponType === 7">
              今日可享息费<span>{{ couponResponse.couponDiscountDesc }}折</span>借款+领京东卡<span>{{ (result.limitTaskResponse.amount/100).toFixed(0) }}元</span>
            </section>
            <section v-else>
              今日借款可省<span>{{ (result.couponResponse.amount / 100).toFixed(0) }}元</span>+领京东卡<span>{{ (result.limitTaskResponse.amount/100).toFixed(0) }}元</span>
            </section>
          </div>
          <div class="coupon-multi-container" style="padding: 0px 0px !important;">
            <div class="coupon-right">
              {{ result.couponResponse.couponName }}<br /><div class="coupon-right-amount">
                <section v-if="couponResponse.couponType === 1" class="p-tb">
                  免息
                </section>
                <section v-else-if="couponResponse.couponType === 2 || couponResponse.couponType === 7" class="p-tb">
                  {{ couponResponse.couponDiscountDesc }}<span style="font-weight: bold;color:#EC300A;">折</span>
                </section>
                <section v-else>
                  ¥{{ (couponResponse.amount/100).toFixed(0) }}
                </section>
              </div><span>{{ result.couponResponse.couponDesc }}</span>
            </div>
            <div class="coupon-left">
              {{ result.limitTaskResponse.taskTitle }}<br /><div class="coupon-left-amount">
                ¥{{ (result.limitTaskResponse.amount/100).toFixed(0) }}
              </div><span>累计借款满{{ (result.limitTaskResponse.targetLoanAmount/100).toFixed(0) }}元</span>
            </div>
          </div>
          <div class="tips">
            今日借款，有机会得华为Mate XT三折屏手机哦!
          </div>
        </section>
        <section v-if="status===3">
          <div class="icon-rank">
            限时任务
          </div>
          <div class="award-container">
            <section v-if="couponResponse.couponType === 1">
              今日可享<span>免息借款</span>+领京东卡<span>{{ (result.limitTaskResponse.amount/100).toFixed(0) }}元</span>
            </section>
            <section v-else-if="couponResponse.couponType === 2 || couponResponse.couponType === 7">
              今日可享<span>息费{{ couponResponse.couponDiscountDesc }}折借款</span>+领京东卡<span>{{ (result.limitTaskResponse.amount/100).toFixed(0) }}元</span>
            </section>
            <section v-else>
              今日借款可省<span>{{ (result.couponResponse.amount / 100).toFixed(0) }}元</span>+领京东卡<span>{{ (result.limitTaskResponse.amount/100).toFixed(0) }}元</span>
            </section>
          </div>
          <div class="coupon-multi-container" style="padding: 0px 0px !important;">
            <div class="coupon-right">
              {{ couponResponse.couponName }}<br /><div class="coupon-right-amount">
                <section v-if="couponResponse.couponType === 1" class="p-tb">
                  免息
                </section>
                <section v-else-if="couponResponse.couponType === 2 || couponResponse.couponType === 7" class="p-tb">
                  {{ couponResponse.couponDiscountDesc }}<span style="font-weight: bold;color:#EC300A;">折</span>
                </section>
                <section v-else>
                  ¥{{ (couponResponse.amount/100).toFixed(0) }}
                </section>
              </div><span>{{ couponResponse.couponDesc }}</span>
            </div>
            <div class="coupon-left">
              {{ limitTaskResponse.taskTitle }}<br /><div class="coupon-left-amount">
                ¥{{ (limitTaskResponse.amount/100).toFixed(0) }}
              </div><span>累计借款满{{ (limitTaskResponse.targetLoanAmount/100).toFixed(0) }}元</span>
            </div>
          </div>
          <div class="tips">
            今日借款，有机会得华为Mate XT三折屏手机哦!
          </div>
        </section>
        <a href="javascript:;" class="btn" @click="clickLoanBtn">{{ btnTxt }}</a>
      </div>
    </van-overlay>
  </template>
  <script>
  export default {
      'props': ['show', 'status', 'result'],
      data () {
          return {
            // status: 1,
            // result: {
            //     "combineScene": "not_first_coupon_task|a2da001b34384cf3a408c86a34d90748",
            //     "couponResponse": {
            //         "amount": 0,
            //         "batchNo": "a2da001b34384cf3a408c86a34d90748",
            //         "couponDesc": "用券借款更优惠",
            //         "couponName": "0息借款",
            //         "couponTitle": null,
            //         "couponType": 1,
            //         "isShow": null,
            //         "receiveStatus": 1
            //     },
            //     "limitTaskResponse": {
            //         "amount": 10000,
            //         "status": 2,
            //         "targetLoanAmount": 3000000.0000,
            //         "taskDesc": "1万元巴黎观赛津贴",
            //         "taskEndTime": 1719676800000,
            //         "taskGapAmount": 2500000,
            //         "taskTitle": "限时返现"
            //     },
            //     "scene": "detain_coupon_task",
            //     "sceneDesc": "非首次有券有任务"
            // }
          }
      },
      'computed': {
          btnTxt () {
              switch (this.status) {
                      case 0:
                          return '立即使用'
                      case 1:
                          return '去做任务'
                      case 2:
                          return '立即使用'
                      case 3:
                          return '去做任务'
                      case 4:
                          return '去做任务'
                      default:
                          return '立即使用'
              }
          },
          couponResponse () {
              return this.result.couponResponse
          },
          limitTaskResponse () {
              return this.result.limitTaskResponse
          }
      },
      'watch': {
      },
      created () {
      },
      mounted () {
      },
      'methods': {
          closeDialogClick () {
              this.$emit('clickLoanBtn', false)
              this.$emit('update:show', false)
          },
          clickLoanBtn () {
              this.$emit('clickLoanBtn', true)
              this.$emit('update:show', false)
          }
      }
  }
  </script>
  <style lang="less" scoped>
  @baseImgUrl: '/build/images/national_day24/';

  .overlayCls {
      z-index: 112;
  }
  .popup-bg {
      width: 303px;
      padding-top: 28px;
      padding-bottom: 24px;
      position: relative;
      color: #49596C;
      display: flex;
      color: white;
      font-size: 16px;
      flex-direction: column;
      align-items: center;
      background: url('@{baseImgUrl}retain_bg.png');
      background-size: 100% 100%;
      .p-tb {
        // margin: -3px 0px !important;
        font-size: 27px !important;
      }
      .icon-rank {
          font-size: 22px;
          color: #382929;
          font-weight: bold;
          span {
              color: #FA1A31
          }
          text-align: center;
      }
      .loan-box {
          width: 161px;
          height: 131px;
          margin-top: 10px;
      }
      .coupon-multi-container {
          width: 267px;
          height: 101px;
          background: url('@{baseImgUrl}dialog_retain_two.png');
          background-size: 100% 100%;
          display: flex;
          box-sizing: border-box;
          align-items: center;
          padding: 0px 20px;
          margin: auto;
          margin-top: 20px;
          justify-content: space-between;
          .coupon-left {
              font-size: 13px;
              color: #954E4E;
              flex: 1;
              display: flex;
              margin-left: 10px;
              flex-direction: column;
              align-items: center;
              font-weight: bold;
              &-amount {
                  font-size: 31px;
                  margin-top: 5px;
                  color: #EC300A;
                  font-family: uni_sans_regular;
                  line-height: 35px;
              }
              span {
                  color: #FF6018;
                  font-size: 12px;
                  font-weight: normal;
              }
          }
          .coupon-right {
              flex: 1;
              font-size: 13px;
              display: flex;
              flex-direction: column;
              align-items: center;
              color: #954E4E;
              font-weight: bold;
              &-amount {
                  font-size: 31px;
                  font-family: uni_sans_regular;
                  color: #EC300A;
                  line-height: 35px;
                  margin-top: 5px;
              }
              span {
                  color: #FF6018;
                  font-size: 12px;
                  font-weight: normal;
              }
  
          }
          .coupon-amount {
              font-family: uni_sans_regular;
              font-size: 30px;
              color: #EC300A;
          }
          .coupon-type {
              margin-right: 15px;
              color: #954E4E;
              font-size: 17px;
              span {
                  font-size: 12px;
                  color: #FF6018;
              }
          }
      }
      .coupon-container {
          width: 267px;
          height: 94px;
          background: url('@{baseImgUrl}dialog_ratain_one.png');
          background-size: 100% 100%;
          margin: auto;
          margin-top: 30px;
          display: flex;
          box-sizing: border-box;
          align-items: center;
          position: relative;
          justify-content: space-between;
          .coupon-left {
              font-size: 15px;
              color: #954E4E;
              display: flex;
              flex-direction: column;
              align-items: center;
              &-amount {
                  font-size: 31px;
                  color: #EC300A;
              }
              span {
                  color: #FF6018;
                  font-size: 12px;
              }
          }
          .coupon-right {
              font-size: 15px;
              display: flex;
              flex-direction: column;
              align-items: center;
              color: #954E4E;
              &-amount {
                  font-size: 31px;
                  color: #EC300A;
              }
              span {
                  color: #FF6018;
                  font-size: 12px;
              }
  
          }
          .coupon-amount {
              font-size: 30px;
              color: #EC300A;
              font-weight: bold;
              margin-left: 7px;
              width: 100px;
              text-align: center;
              margin-top: 7px;
              span {
                font-size: 16px;
                font-family: normal;
              }
              font-family: uni_sans_regular;
          }
          .coupon-type {
              margin-right: 15px;
              color: #954E4E;
              font-size: 17px;
              font-weight: bold;
              position: absolute;
              left: 120px;
              bottom: 30px;
              span {
                  font-size: 12px;
                  font-weight: normal;
                  color: #FF6018;
              }
          }
      }
      .award-container {
          font-size: 15px;
          margin-top: 10px;
          font-weight: 600;
          font-weight: bold;
          text-align: center;
          color: #5A3D3D;
          span{
              color: #FF4545;
          }
      }
      .icon_close {
          position: absolute;
          right: 10px;
          top: 10px;
          width: 20px;
          height: 20px;
      }
      .btn {
          display: block;
          width: 223px;
          height: 42px;
          line-height: 42px;
          margin: 18px auto 0;
          border-radius: 22px;
          background: linear-gradient(270deg, #FF0059 0%, #FF8D23 97%);
          color: #fff;
          text-align: center;
          font-size: 16px;
          font-weight: bold;
      }
      .infoText {
          width: 255px;
          line-height: 22px;
          margin: 10px auto 10px;
          text-align: center;
          font-size: 15px;
          color: #874826;
          span {
              color: #FB162E
          }
      }
      img {
          height: 120px;
          width: 179px;
      }
      .tips {
          margin-top: 12px;
          font-size: 12px;
          margin-top: 15px;
          padding: 0 5px;
          color: #8F949A;
          span {
              color: #FF224C;
          }
      }
      .city {
          margin-top: 5px;
          font-weight: bold;
          text-align: center;
          color: #595959;
          font-size: 18px;
          span {
              font-weight: normal;
              font-size: 14px;
              color: #595959;
          }
      }
  }
  </style>
  