<template>
    <van-overlay :show="show" :lock-scroll="true" class="flex overlay-cls items-center justify-center actstatus">
      <div class="dialog-content flex flex-layout-v items-center">
        <div class="dialog-content-title">
            恭喜获得膨胀机会
        </div>
        <img class="icon_close" src="/build/images/national_day24/dialog_close.png" alt="" @click="closeDialogClick">
        <div class="dialog-content-content text-center" v-if="!isDiscountCoupon">
            最高可膨胀到<span>999</span>元
        </div>
        <div class="dialog-content-content text-center" v-else>
            最高可膨胀到<span>1</span>折
        </div>
        <div class="swell-container" v-if="before">
            <div class="swell-container-left">
                <div class="swell-container-left-title">{{ before.couponTitle }}</div>
                <div class="swell-container-left-amount" v-if="!isDiscountCoupon"><span>¥</span>{{ before.amount/100 }}</div>
                <div class="swell-container-left-amount" v-else>{{ before.couponDiscountDesc }}<span>折</span></div>
                <div class="swell-container-left-desc">{{ before.couponDesc }}</div>
            </div>
            <img src="/build/images/national_day24/swell_arrow.png" :class="before ? 'img-anim' : ''"/>
            <div class="swell-container-right" :class="before ? 'swell-container-right-anim' : ''">
                <div class="swell-container-right-title">{{ after.couponTitle }}</div>
                <div class="swell-container-right-amount" v-if="!isDiscountCoupon">¥<span :class="before ? 'swell-container-right-amount-anim' : ''">{{ currentValue }}</span></div>
                <div class="swell-container-right-amount" v-else><span :class="before ? 'swell-container-right-amount-anim' : ''">{{ currentValue }}</span>折</div>
                <div class="swell-container-right-desc">{{ after.couponDesc }}</div>
            </div>
        </div>
        <div class="swell-tips">
            今日借款，有机会得华为Mate XT三折屏手机哦!
        </div>
        <!-- <div class="dialog-content-btn" @click="goToLoan" :class="{'dialog-content-btn-anim': currentText === '去使用'}"> -->
        <div class="dialog-content-btn" @click="goToLoan">
          {{ currentText }}
        </div>
      </div>
    </van-overlay>
  </template>
  
  <script>
  export default {
      'props': ['show', 'before', 'after'],
      data () {
          return { 'isApp': false, currentValue: 0, currentText: '膨胀中...' }
      },
      'computed': {
        isDiscountCoupon() {
            return this.before && this.before.awardType === 2
        },
      },
      watch: {
        before: {
            deep: true,
            immediate: true,
            handler(val) {
                console.log('handler', val)
                if (!val) return
                this.currentValue = this.isDiscountCoupon ? Number(this.before.couponDiscountDesc) : this.before.amount/100
                this.isApp = window.PPDWebUI && window.PPDWebUI.os.inApp
                setTimeout(() => {
                    const duration = 2000; // 2 seconds
                    const steps = duration / 60; // number of intervals to complete in 2 seconds
                    let interval;
                    
                    if (this.isDiscountCoupon) {
                        const targetValue = Number(this.after.couponDiscountDesc);
                        const changePerStep = 0.1;
                        console.log('changePerStep',changePerStep)
                        interval = setInterval(() => {
                            this.currentValue -= changePerStep;
                            this.currentValue = parseFloat(this.currentValue.toFixed(1));

                            if (this.currentValue <= targetValue) {
                                clearInterval(interval);
                                this.currentValue = targetValue;

                                // 如果小数为0，转换为整数
                                if (this.currentValue % 1 === 0) {
                                    this.currentValue = Math.round(this.currentValue);
                                }
                                
                                this.currentText = '去使用';
                            }
                        }, 20);
                    } else {
                        const duration = 1000; // Time duration in milliseconds (2 seconds)
                        const targetValue = (this.after.amount / 100).toFixed(0);
                        const frameDuration = 1000 / 60; // Approximately 16.67 ms per frame for 60 FPS
                        const steps = duration / frameDuration;
                        const changePerStep = (targetValue - this.currentValue) / steps;
                        console.log('changePerStep', changePerStep)

                        let startTime;

                        const animate = (timestamp) => {
                            if (!startTime) startTime = timestamp;

                            const elapsed = timestamp - startTime;
                            const progress = Math.min(elapsed / duration, 1);

                            this.currentValue += changePerStep;
                            this.currentValue = parseFloat(this.currentValue.toFixed(0));

                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            } else {
                                this.currentValue = targetValue;

                                // 如果小数为0，转换为整数
                                if (this.currentValue % 1 === 0) {
                                    this.currentValue = Math.round(this.currentValue);
                                }

                                this.currentText = '去使用';
                            }
                        }

                        // Start the animation
                        requestAnimationFrame(animate);
                    }
                }, 300);

           
            }
          
        },
        currentText(val) {
            if (val === '去使用') {
                
            }
        }
      },
      created () {
      },
      mounted() {
        if (!this.before) return
        
      },
      'methods': {
        goToLoan () {
            this.$emit('goToLoan')
            this.$emit("update:show", false)
          },
          closeDialogClick() {
            this.$emit("update:show", false)
          }
      }
  }
  </script>
  
  <style lang="less" scoped>
  .backgroundImage(@width, @height, @url) {
      width: @width;
      height: @height;
      background-image: url(@url);
      background-size: 100% 100%;
  }
  @baseImgUrl: '/build/images/national_day24/';

  .overlay-cls {
      z-index: 999;
  }
  
  .dialog-content {
    .backgroundImage(303px, 316px, '@{baseImgUrl}swell_bg.png');
    padding: 30px 0;
    box-sizing: border-box;
    position: relative;
      &-title {
          color: #382929;
          font-size: 22px;
          font-weight: bold;
      }
      .icon_close {
        position: absolute;
        right: 15px;
        top: 15px;
        width: 20px;
        height: 20px;
    }
      .swell-container {
        display: flex;
        margin-top: 15px;
        align-content: center;
        align-items: center;
        justify-content: center;
        &-left {
            margin-right: -10px;
            display: flex;
            flex-direction: column;
            align-content: center;
            padding: 12px 0;
            margin-bottom: -20px;
            text-align: center;
            .backgroundImage(102px, 80px, '@{baseImgUrl}swell_one.png');
            &-title{
                font-size: 10px;
                color: #954E4E;
                font-weight: bold;
            }
            &-amount{
                margin-top: 6px;
                font-size: 25px;
                font-weight: bold;
                color: #EC300A;
                font-family: uni_sans_regular;
                span{
                    font-size: 16px;
                }
            }
            &-desc{
                margin-top: 5px;
                font-size: 8px;
                color: #FF6018;
            }
        }
        &-right-anim {
            transform-origin: left bottom;
            animation: fadeIn .5s forwards; /* 2秒渐显动画 */
            animation-delay: .3s;
        }
        &-right {
            transform: scale(0);
            margin-left: -10px;
            .backgroundImage(128px, 101px, '@{baseImgUrl}swell_two.png');
            display: flex;
            flex-direction: column;
            align-content: center;
            padding: 12px 0;
            text-align: center;
            &-title{
                font-size: 13px;
                color: #954E4E;
                font-weight: bold;
            }
            &-amount{
                margin-top: 6px;
                color: #EC300A;
                font-weight: bold;
                font-size:20px;
                font-family: uni_sans_regular;
                span{
                    font-size: 31px;
                    opacity: 0;
                    font-weight: bold;
                    color: #EC300A;
                }
                &-anim {
                    animation: fadeIn2 2s forwards;
                    animation-delay: .3s;
                }
            }
            &-desc{
                margin-top: 5px;
               font-size: 11px;
                color: #FF6018;
            }
        }
        img {
            width: 40px;
            height: 30px;
            z-index: 11;
            margin-bottom: -30px;
            transform: scale(0);
        }
        .img-anim {
            transform-origin: left bottom;
            animation: scale-up .5s forwards;
        }
        @keyframes scale-up {
            0% {
                transform: scale(0);
            }
            100% {
                transform: scale(1);
            }
        }
      }
      &-content {
          margin-top: 10px;
          font-size: 15px;
          color: #733A26;
          line-height: 22px;
          font-weight: bold;
          width: 255px;
          span {
            color: #FF4545;
          }
      }
      .swell-tips {
        font-size: 12px;
        color: #8F949A;
        text-align: center;
        margin-top: 15px;
      }
  
      &-btn {
        //   width: 255px;
        //   height: 45px;
        //   margin-top: 20px;
        //   background: linear-gradient(270deg, #FF0120 0%, #FF744E 100%);
        //   box-shadow: 0px 1px 10px -1px rgba(255, 87, 87, 0.6);
        //   border-radius: 23px;
        //   line-height: 45px;
        //   text-align: center;
        //   font-size: 18px;
        // //   animation-delay: 2s;
        //   color: white;

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
      .dialog-content-btn-anim {
        animation: flashBackgrounds 1s forwards; /* 2秒动画，循环播放 */
      }
      @keyframes flashBackgrounds {
        0%, 33.33%, 66.66%, 100% {
            background: linear-gradient(270deg, #FF0120 0%, #FF744E 100%);
        }
        16.66%, 50%, 83.33% {
            background: #FFC300;
        }
    }
    @keyframes fadeIn {
        from {
            transform: scale(0);
            opacity: 0.2; /* 从30%透明度开始 */
        }
        to {
            transform: scale(1);
            opacity: 1; /* 渐显到100%透明度 */
        }
    }
    @keyframes fadeIn2 {
        from {
            opacity: 0.2; /* 从30%透明度开始 */
        }
        to {
            opacity: 1; /* 渐显到100%透明度 */
        }
    }
  }
  </style>
  