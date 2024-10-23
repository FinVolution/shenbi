<template>
<div class="nineGird-container1">
    <NineGird
        :itemConfig="itemConfig"
        @onStartGame="onStartGame"
        :result="gameResult"
        :isStart="gameIsStart"
        :remainOpportunity="remainOpportunity"
    />

    <PopupBox
        :popupIsShow="popupIsShow"
        :lotteryResult="lotteryResult"
        :propType="propType"
        @close="popupIsShow=false"
    />
    <PopupBoxVip
        :popupIsShow="popupVipIsShow"
        :lotteryResult="lotteryVipResult"
        :propType="-1"
        @close="popupVipIsShow=false"
    />
</div>
</template>

<script>
import { mapState } from 'vuex'
import NineGird from '../../../../common/activity/nineGird'
import PopupBox from '../../../../common/foundation/popup_new'
import PopupBoxVip from '../../../../common/foundation/popup_newvip'
import { turntableLottery, getHomePageConfig } from "../../../service/nineGird"
import { getQueryString } from '@/utils/util'
export default {
    data() {
        return {
            popupVipIsShow: false, // 会员固定弹窗
            lotteryVipResult: {
                    title: '您来晚了，下月18日开始',
                    buttonText: '知道了',
                    callback: () => this.gameOver(),
                    close: () => this.gameOver(),
            },
            running: false,
            activityType: null,
            remainOpportunity: null,
            gameResult: -1,
            gameIsStart: false,
            popupIsShow: false,
            lotteryResult: null,
            currentTime: new Date().getTime(),
            propType: -1
        }
    },
    props: {
        itemConfig: {
            type: Object,
            default() {
                return {
                    property: null
                }
            }
        },
    },
    watch: {
        itemConfig: {
            handler: function(nObj){
                let { property } = nObj || {}
                Object.assign(this, { property })
            },
            immediate: true,
            deep: true
        },
    },
    components: { NineGird, PopupBox, PopupBoxVip },
    computed:{
        ...mapState('indexStore',{
            isApp: state => state.isApp,
            linkUrl: state => state.linkUrl,
            pageTitle: state => state.title,
            pageInfo: state => state.pageInfo
        }),
        ...mapState('homeStore',{
            projectProperties: state => state.projectProperties
        })
    },
    created() {
        if (__isBrowser__) {
            const isVip = getQueryString('isVip')
            if (isVip) {
                this.popupVipIsShow = true
            }
        }
        this.activityType = parseFloat(this.projectProperties.activityID)
        if ((this.isApp && this.pageInfo.isAppSwitch) || !this.pageInfo.isAppSwitch) {
            this.getHomeData()
        } else {
            this.remainOpportunity = 3;
        }
    },
    methods: {
        async getHomeData() {
            this.$toast.loading({
                duration: 0,
                message: '数据加载中...',
                forbidClick: true,
            })
            const { Result, Content, ResultMessage } = await getHomePageConfig(this.activityType, 0)
            this.$toast.clear()
            if (Result === 200) {
                this.remainOpportunity = Content.availableOpportunity || 0
            } else if (Result === 40600) {
                this.lotteryResult = {
                    title: '您来晚了，活动已结束',
                    buttonText: '知道了',
                    callback: () => this.gameOver(),
                    close: () => this.gameOver(),
                }
                this.popupIsShow = true
            } else if (Result === 40601) {
                this.lotteryResult = {
                    title: '活动参与失败',
                    buttonText: '知道了',
                    callback: () => this.gameOver(),
                    close: () => this.gameOver(),
                }
                this.propType = 1;
                this.popupIsShow = true
            } else if (Result === 40900) {
                this.lotteryResult = {
                    title: '很遗憾，参与失败',
                    awardTitle: '<div style="text-align: center">本活动仅针对受邀用户</div>',
                    buttonText: '知道了',
                    callback: () => this.gameOver(),
                    close: () => this.gameOver(),
                }
                this.popupIsShow = true
            }
        },
        onStartGame() {
            if ((this.isApp && this.pageInfo.isAppSwitch) || !this.pageInfo.isAppSwitch) {
                this.onStartNineGird()
            } else {
                this.onDownload()
            }
        },
        onDownload() {
            setTimeout(() => {
                window.location.href = this.linkUrl
            }, 200)
        },
        async onStartNineGird() {
            if (this.running) return;
            if (this.remainOpportunity <= 0) {
                this.lotteryResult = {
                    title: '抽奖机会不足,下次再来',
                    buttonText: '知道了',
                    callback: () => this.closePopup('popupIsShow')
                }
                this.popupIsShow = true
                return
            }
            this.running = true
            const { Result, Content, ResultMessage } = await turntableLottery(this.activityType)
            if (Result === 200) {
                this.gameIsStart = true
                let realIndex = 7
                let awardType = Content.awardInfo ? Content.awardInfo.awardKey : -1
                for (let i = 0; i < this.property.list.length; i++) {
                    let awardTypeArray = this.property.list[i].type && this.property.list[i].type.split(',')
                    if (awardTypeArray.indexOf(awardType) > -1) {
                        realIndex = i
                        break;
                    }
                }

                this.gameResult = realIndex
                if (!Content.awardInfo) {
                    this.gameResult = 4
                }

                setTimeout(() => {
                    if (!Content.awardInfo) {
                        this.lotteryResult = {
                            title: '很遗憾未中奖',
                            buttonText: '再抽一次',
                            callback: () => this.closePopup('popupIsShow')
                        }
                        this.propType = 2;
                    } else {
                        this.lotteryResult = {
                            title: '恭喜您中奖啦！',
                            buttonText: '知道了',
                            callback: () => this.redirect(Content.awardInfo.awardLink)
                        }
                        this.propType = 3;
                    }
                    this.remainOpportunity = Content.remainOpportunity
                    this.lotteryResult = Object.assign(this.lotteryResult, Content.awardInfo)
                    this.popupIsShow = true
                    this.gameIsStart = false
                    this.running = false
                }, 5000)
            } else if (Result === 40609) {
                this.lotteryResult = {
                    title: '抽奖机会不足,下次再来',
                    buttonText: '知道了',
                    callback: () => this.closePopup('popupIsShow')
                }
                this.popupIsShow = true
                this.running = false
            } else if (Result === 40600) {
                this.lotteryResult = {
                    title: '您来晚了，活动已结束',
                    buttonText: '知道了',
                    callback: () => this.gameOver(),
                    close: () => this.gameOver(),
                }
                this.popupIsShow = true
                this.running = false
            } else {
                this.$toast(ResultMessage)
                this.running = false
            }
        },
        closePopup(type) {
            this[type] = false
        },
        gameOver() {
            this.$router.go(-1)
        },
        redirect(url) {
            if (!url) return
            this.popupIsShow = false
            window.location.href = url
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../../../assets//less/base/mixins.less";
.nineGird-container1 {
    // .setSize(100%, 100%);
}
</style>
