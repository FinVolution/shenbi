<template>
    <van-overlay
        :show="show"
        :lock-scroll="true"
        class=" overlayCls flex-layout-h flex-item-center flex-justify-center"
    >
        <div class="popup-bg">
            <img class="icon_close" src="/build/images/national_day24/dialog_close.png" alt="" @click="closeDialogClick('关闭')">
            <div v-if="awardType === 2" class="popup-content">
                <img src="/build/images/national_day24/xianjin_bg.png" alt="" class="dialog-bg">
                <div class="img-acount">¥<span>{{ award.awardAmount/100 }}</span></div>
                <div class="subtitle">{{ awardTitle }}</div>
                <div class="tips">
                    可前往 <span>我的-我的钱包</span> 中查看
                </div>
            </div>
            <div v-if="awardType === 4" class="popup-content">
                <img src="/build/images/national_day24/tx_bg.png" alt="" class="dialog-bg">
                <div class="subtitle">腾讯视频周卡</div>
                <div class="tips">
                    可前往 <span>借款-消息</span> 中领取
                </div>
            </div>
            <a href="javascript:;" v-if="showBtnText" class="btn" @click="closeDialogClick('开心收下')">开心收下</a>
            <a href="javascript:;" v-else class="btn" @click="nextEggClick">继续砸蛋({{ countdown }}s)</a>
        </div>
    </van-overlay>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    'props': ['show', 'award'],
    data () {
        return {
            'countdown': 3,
            'timeFlag': null,
        }
    },
    'computed': {
        awardTitle() {
            return this.award && this.award.awardTitle || ''
        },
        awardType() {
            return this.award && this.award.awardType || 0
        },
        ...mapState('goldenEggStore/home', [
            'opportunityList',
            'acquireEggType',
        ]),
        showBtnText() {
            // console.log('debugger', this.acquireEggType)
            if (this.acquireEggType === 2 || this.acquireEggType === 1) {
                return false
            }
            if (this.acquireEggType === 3 ) {
                let status = true
                this.opportunityList.forEach(item => {
                    if (item.lotteryType === 3 && item.availableOpportunity > 0) {
                        status = false
                        return
                    }
                    if (item.lotteryType === 2 && item.availableOpportunity > 0) {
                        status = false
                        return
                    }
                    if (item.lotteryType === 1 && item.availableOpportunity > 0) {
                        status = false
                        return
                    }
                })
                return status
            }
            return true
        }
    },
    'watch': {
        show (val) {
            if (val) {
                this.$emit('trace', {
                    'event': 'h5_element_imp',
                    'params': {
                        'tgt_event_id': 'super_reward_popup',
                        'tgt_name': 'super-奖励弹窗',
                        'param1': this.award.awardName,
                        'param3': this.showBtnText? '开心收下':'继续砸蛋',
                    }
                })
                this.countdown = 3
                if(this.showBtnText) return
                clearTimeout(this.timeFlag)
                this.customInterval(3)
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
                // this.$emit('clickLoanBtn', this.loanUrl)
                this.nextEggClick()
                return
            }
            this.timeFlag = setTimeout(() => {
                if (this.countdown <= 0) {
                    if (this.show) {
                        // this.$emit('clickLoanBtn', this.loanUrl)
                        this.nextEggClick()
                    }
                    return
                }
                this.countdown -= 1
                this.customInterval(count - 1)
            }, 1000)
        },
        closeDialogClick (text){
            this.$emit('closeDialogClick', {award: this.award, text: text})
            this.$emit('update:show', false)
        },
        nextEggClick() {
            this.$emit('trace', {
                'event': 'h5_clk',
                'params': {
                    'tgt_event_id': 'super_reward_popup',
                    'tgt_name': 'super-奖励弹窗',
                    'param1': this.award.awardName,
                    'param3': '继续砸蛋',
                }
            })
            clearTimeout(this.timeFlag)
            this.$emit('nextEggClick', this.award.type)
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
    width: 301px;
    position: relative;
    display: flex;
    color: white;
    font-size: 16px;
    flex-direction: column;
    align-items: center;
    padding: 97px 0 20px 0;
    background: url('@{baseImgUrl}dialog_egg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .icon_close {
        position: absolute;
        right: 15px;
        top: 15px;
        width: 20px;
        height: 20px;
    }
    .popup-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
    .dialog-bg {
        width: 147px;
        height: 105px;
    }
    .img-acount {
        position: absolute;
        top: 33px;
        font-family: uni_sans_regular;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        line-height: 20px;
        color: #F4221C;
        span {
            margin-left: 2px;
            font-size: 23px;
            line-height: 23px;
            letter-spacing: -1px;
        }
    }
    .img-jd {
        position: absolute;
        top: 156px;
        right: 112px;
        font-family: uni_sans_regular;
        font-size: 12px;
        font-weight: normal;
        line-height: 12px;
        color: #FFFFFF;
        span {
            font-size: 20px;
            line-height: 20px;
        }
    }
    .subtitle {
        font-size: 14px;
        font-weight: 600;
        line-height: 14px;
        text-align: center;
        color: #FFFFFF;
        margin-top: 6px;
    }
    .tips {
        margin-top: 26px;
        font-size: 12px;
        color: #8F949A;
        text-align: center;
        span {
            color: #FF8C24;
        }
    }
    .btn {
        display: block;
        width: 245px;
        height: 44px;
        line-height: 44px;
        margin: 16px auto 0;
        border-radius: 22px;
        background: linear-gradient(100deg, #FC8D06 0%, #FF5B24 91%);
        color: #fff;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
    }
}
</style>
  