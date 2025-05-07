<template>
    <van-overlay :show="show" :lock-scroll="true" class="flex overlay-cls items-center justify-center actstatus">
        <div class="dialog-content flex flex-layout-v items-center">
            <img :src="src" />
            <div class="dialog-content-close" @click="closeDialogClick"></div>
            <div class="dialog-content-title" v-if="lockDialog === 2">
                周末借款<span>累计金额</span>达到<span>{{ goldTaskAmount/100 }}元</span>
            </div>
            <div class="dialog-content-title" v-if="firstCoupon">
                使用优惠券借款, 最高得<span>1700元现金</span>
                <div class="coupon" >
                    <div class="coupon-amount" v-if="firstCoupon.couponType == 0">
                        <span class="coupon-amount-icon">￥</span>{{ firstCoupon.amount/100 }}
                    </div>
                    <div class="coupon-free" v-if="firstCoupon.couponType == 1">
                        <span>{{ firstCoupon.amount }}</span>天免息
                    </div>
                    <div class="coupon-discount" v-if="firstCoupon.couponType == 2">
                        <span>{{ firstCoupon.couponDiscountDesc }}</span>折
                    </div>
                    <div class="coupon-text">
                        <div class="coupon-text-title">{{ firstCoupon.couponTitle }}</div> 
                        <div class="coupon-text-subtitle">{{ firstCoupon.couponDesc }}</div>
                    </div>
                </div>
                <div class="tip">
                    借款满{{ goldTaskAmount/100 }}元，获得<span>1000元、500元、200元</span>现金抽取机会各1次
                </div>
            </div>
            <div class="dialog-content-title">
                <div class="dialog-content-title-"></div>
            </div>
            <div class="dialog-content-btn" @click="clickLoanBtn">{{ text }}<span v-if="isCountdown">({{ countdown }}s)</span></div>
        </div>
    </van-overlay>
</template>

<script>
import { skipRouterConfig } from '../SkipRouterConfig'
import { redirectTo } from '@/utils/redirect'
export default {
    'props': ['show', 'src', 'text', 'isCountdown', 'subscribeScene', 'lockDialog', 'goldTaskAmount', 'firstCoupon', 'subscribeType'],
    data() {
        return {
            'isApp': false,
            'timeFlag': null,
            'loanUrl': skipRouterConfig.goToLoanUrl,
            'countdown': 0,
        }
    },
    'watch': {
        show(val) {
            if (val && this.isCountdown) {
                this.countdown = 5
                clearTimeout(this.timeFlag)
                this.customInterval(5)
            }
        }
    },

    created() {

    },
    mounted() {

    },
    'methods': {
        customInterval(count) {
            if (count <= 0 && this.show) {
                this.$emit('trace', {
                    'event': 'h5_clk',
                    'params': {
                        'tgt_event_id': 'super_unlock_popup',
                        'tgt_name': 'super-解锁弹窗',
                        'param1':  this.lockDialog === 0? '银蛋' : this.lockDialog === 1? '金蛋' : this.lockDialog === 2? '金银蛋' :'',
                        'param2': this.loanUrl,
                        'param3': '去做任务',
                        'param4': '自动跳转',
                        'param21': '13',
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
                        this.$emit('trace', {
                            'event': 'h5_clk',
                            'params': {
                                'tgt_event_id': 'super_unlock_popup',
                                'tgt_name': 'super-解锁弹窗',
                                'param1':  this.lockDialog === 0? '银蛋' : this.lockDialog === 1? '金蛋' : this.lockDialog === 2? '金银蛋' :'',
                                'param2': this.loanUrl,
                                'param3': '去做任务',
                                'param4': '自动跳转',
                                'param21': '13',
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
        closeDialogClick() {
            if(this.isCountdown) {
                if(this.firstCoupon) {
                    this.$emit('trace', {
                        'event': 'h5_clk',
                        'params': {
                            'tgt_event_id': 'super_guide_popup',
                            'tgt_name': 'super-活动引导弹窗',
                            'param1': '券',
                            'param3': '关闭',
                            'param4': this.firstCoupon.couponTitle,
                            'param7': this.firstCoupon.couponType == 2? this.firstCoupon.couponDiscountDesc : this.firstCoupon.couponType == 1? this.firstCoupon.amount : this.firstCoupon.couponType == 0? this.firstCoupon.amount/100 : '',
                        }
                    })
                }else {
                    this.$emit('trace', {
                        'event': 'h5_clk',
                        'params': {
                            'tgt_event_id': 'super_unlock_popup',
                            'tgt_name': 'super-解锁弹窗',
                            'param1': this.lockDialog === 0? '银蛋' : this.lockDialog === 1? '金蛋' : this.lockDialog === 2? '金银蛋' :'',
                            'param3': '关闭'
                        }
                    })
                }
            }else {
                this.$emit('trace', {
                    'event': 'h5_clk',
                    'params': {
                        'tgt_event_id': 'super_order',
                        'tgt_name': 'super-预约弹窗',
                        'param1': this.subscribeType === 0? '通用' : this.subscribeType === 1? '铜蛋' : this.subscribeType === 2? '银蛋' :  this.subscribeType === 3? '金蛋' : '',
                        'param3': '关闭'
                    }
                })
            }
            if(this.subscribeScene === 'close') {
                window.PPDWebUI.CommonService.close({})
            }else {
                this.$emit('update:show', false)
                this.$emit('close')
            }
        },
        clickLoanBtn() {
            if (this.isCountdown) {
                if(this.firstCoupon) {
                    this.$emit('trace', {
                        'event': 'h5_clk',
                        'params': {
                            'tgt_event_id': 'super_guide_popup',
                            'tgt_name': 'super-活动引导弹窗',
                            'param1': '券',
                            'param3': '使用优惠券',
                            'param4': this.firstCoupon.couponTitle,
                            'param7': this.firstCoupon.couponType == 2? this.firstCoupon.couponDiscountDesc : this.firstCoupon.couponType == 1? this.firstCoupon.amount : this.firstCoupon.couponType == 0? this.firstCoupon.amount/100 : '',
                        }
                    })
                }else {
                    this.$emit('trace', {
                        'event': 'h5_clk',
                        'params': {
                            'tgt_event_id': 'super_unlock_popup',
                            'tgt_name': 'super-解锁弹窗',
                            'param1': this.lockDialog === 0? '银蛋' : this.lockDialog === 1? '金蛋' : this.lockDialog === 2? '金银蛋' :'',
                            'param2': this.loanUrl,
                            'param3': `去做任务`,
                            'param4': '手动跳转',
                            'param21': '13',
                        }
                    })
                }
                setTimeout(() => {
                    redirectTo(this.loanUrl)
                }, 500)
                // this.$emit('clickLoanBtn', this.loanUrl)
                
            }else {
                this.$emit('trace', {
                    'event': 'h5_clk',
                    'params': {
                        'tgt_event_id': 'super_order',
                        'tgt_name': 'super-预约弹窗',
                        'param3': '我知道了'
                    }
                })
            }
            if(this.subscribeScene === 'close') {
                window.PPDWebUI.CommonService.close({})
            }else {
                this.$emit('update:show', false)
                this.$emit('close')
            }
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

.overlay-cls {
    z-index: 999;
}

.dialog-content {
    width: 301px;
    position: relative;
    img {
        width: 301px;
        height: 340px;
    }
    &-close {
        width: 30px;
        position: absolute;
        right: 10px;
        top: 10px;
        height: 30px;
    }
    &-title {
        width: 301px;
        margin-top: 84px;
        position: absolute;
        font-size: 15px;
        line-height: 19px;
        text-align: center;
        font-weight: 400;
        color: #906B5D;
        padding: 0px 23px;
        span {
            font-weight: 600;
            color: #FF5B24;
        }
        .coupon {
            display: flex;
            align-items: center;
            margin-top: 45px;
            &-amount {
                width: 93px;
                font-family: uni_sans_regular;
                font-size: 28px;
                font-weight: normal;
                line-height: 28px;
                text-align: center;
                color: #EC390A;
                margin-top: 3px;
                padding-left: 5px;
                &-icon {
                    color: #EC390A;
                    font-size: 20px;
                    margin-right: -3px;
                }
            }
            &-free {
                width: 93px;
                font-size: 16px;
                font-weight: 600;
                line-height: 16px;
                text-align: center;
                color: #EC390A;
                padding-left: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                span {
                    font-family: uni_sans_regular;
                    font-size: 28px;
                    font-weight: normal;
                    line-height: 28px;
                    color: #EC390A;
                    margin-right: 1px;
                    display: inline-block;
                }
            }
            &-discount {
                width: 93px;
                font-size: 16px;
                font-weight: 600;
                line-height: 16px;
                text-align: center;
                color: #EC390A;
                padding-left: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                span {
                    font-family: uni_sans_regular;
                    font-size: 28px;
                    font-weight: normal;
                    line-height: 28px;
                    text-align: center;
                    color: #EC390A;
                    margin-right: 3px;
                    display: inline-block;
                }
            }
            &-text {
                width: 162px;
                font-size: 16px;
                font-weight: 600;
                line-height: 16px;
                color: #B43004;
                text-align: left;
                padding-left: 15px;
                &-subtitle {
                    font-size: 10px;
                    font-weight: normal;
                    line-height: 12px;
                    color: #F37922;
                    margin-top: 4px;
                }
            }
        }
        .tip {
            font-size: 13px;
            margin-top: 42px;
            text-align: left;
        }
    }
    &-btn {
        width: 255px;
        height: 45px;
        margin-top: 30px;
        position: absolute;
        bottom: 20px;
        font-size: 16px;
        line-height: 47px;
        font-weight: bold;
        text-align: center;
        left: 0px;
        right: 0px;
        margin: auto;
    }
}
</style>
