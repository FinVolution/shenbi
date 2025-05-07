<template>
  <!-- 领取奖励弹窗 -->
  <van-overlay
    :show="show"
    :lock-scroll="true"
    class=" overlayCls flex-layout-h flex-item-center flex-justify-center"
  >
    <div class="popup-bg">
      <img class="icon_close" src="/build/images/national_day24/dialog_close.png" alt="" @click="closeDialogClick">
      <div class="icon-rank">
        借款赚机会
      </div>
      <div class="award-container">
        借款每满3000元获得<span>1次机会</span>，满6000元<span>得2次</span>，以此类推。
      </div>
      <img src="/build/images/national_day24/loan_box.png" class="loan-box">
      <a href="javascript:;" class="btn" @click="clickLoanBtn">去借款({{ countdown }}s)</a>
    </div>
  </van-overlay>
</template>
<script>
import { skipRouterConfig } from '../SkipRouterConfig'
import { redirectTo } from '@/utils/redirect'
export default {
    'props': ['show'],
    data () {
        return {
            'countdown': 5,
            'timeFlag': null,
            'loanUrl': skipRouterConfig.goToLoanUrl
        }
    },
    'computed': {
    },
    'watch': {
        show (val) {
            if (val) {
                this.countdown = 5
                clearTimeout(this.timeFlag)
                this.customInterval(5)
            }
        }
    },
    created () {
    },
    mounted () {
    },
    'methods': {
        customInterval (count) {
            if (count <= 0 && this.show) {
                this.$emit('tracePoint', {
                    'event': 'h5_clk',
                    'params': {
                        'tgt_event_id': 'super_loan_popup',
                        'tgt_name': 'super-借款引导弹窗',
                        'param1': `自动跳转`,
                        'param2': this.loanUrl
                    }
                })
                // this.$emit('clickLoanBtn', this.loanUrl)
                redirectTo(this.loanUrl)
                this.$emit('update:show', false)
                this.$emit('close')

                return
            }
            this.timeFlag = setTimeout(() => {
                if (this.countdown <= 0) {
                    if (this.show) {
                        this.$emit('tracePoint', {
                            'event': 'h5_clk',
                            'params': {
                                'tgt_event_id': 'super_loan_popup',
                                'tgt_name': 'super-借款引导弹窗',
                                'param1': `自动跳转`,
                                'param2': this.loanUrl
                            }
                        })
                        // this.$emit('clickLoanBtn', this.loanUrl)
                        redirectTo(this.loanUrl)
                        this.$emit('update:show', false)
                        this.$emit('close')

                    }
                    return
                }
                this.countdown -= 1
                this.customInterval(count - 1)
            }, 1000)
        },
        closeDialogClick () {
            this.$emit('tracePoint', {
                'event': 'h5_clk',
                'params': {
                    'tgt_event_id': 'super_loan_popup',
                    'tgt_name': 'super-借款引导弹窗',
                    'param1': `关闭`
                }
            })
            this.$emit('update:show', false)
            this.$emit('close')

        },
        clickLoanBtn () {
            this.$emit('tracePoint', {
                'event': 'h5_clk',
                'params': {
                    'tgt_event_id': 'super_loan_popup',
                    'tgt_name': 'super-借款引导弹窗',
                    'param1': `去借款`,
                    'param2': this.loanUrl
                }
            })
            // this.$emit('clickLoanBtn', this.loanUrl)
            redirectTo(this.loanUrl)
            this.$emit('update:show', false)
            this.$emit('close')

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
    position: relative;
    display: flex;
    color: white;
    font-size: 16px;
    flex-direction: column;
    align-items: center;
    padding-top: 0.1px;
    height: 316px;
    background: url('@{baseImgUrl}dialog_chance_bg.png');
    background-size: 100% 100%;
    .icon-rank {
        font-size: 22px;
        color: #382929;
        font-weight: bold;
        margin-top: 25px;
        span {
            color: #FA1A31
        }
        text-align: center;
    }
    .loan-box {
        width: 122px;
        height: 123px;
        margin-top: 20px;
    }
    .award-container {
        font-size: 15px;
        padding: 15px 30px;
        padding-bottom: 0px;
        font-weight: 600;
        text-align: left;
        line-height: 19px;
        color: #912B08;
        span {
            color: #FF5E34;
        }
    }
    .icon_close {
        position: absolute;
        right: 15px;
        top: 15px;
        width: 20px;
        height: 20px;
    }
    .btn {
        display: block;
        width: 223px;
        height: 42px;
        line-height: 42px;
        margin: 21px auto 0;
        border-radius: 22px;
        background: linear-gradient(270deg, #FF0059 0%, #FF8D23 97%);
        color: #fff;
        margin-top: 10px;
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
        color: #5A3D3D;
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
