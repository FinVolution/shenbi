<template>
    <section :style="generateStyleByObj(selfStyle)">
        <div class="participation-card" v-if="switchOldVersion">
            <div v-if="status === 0" class="card card-middle">
                <div class="card-title unqualified-and-unselected-title">
                    <div class="card-title-left" />
                    <div class="card-title-amount num-family">{{ targetAmount | formatAmount }}</div>
                    <div class="card-title-right" />
                </div>
                <div class="steps" />
                <div class="card-footer">
                    <div class="card-button" @click="$emit('goToLoan', diffAmount)">xxx</div>
                    <div class="card-bubble">还差{{ diffAmount }}元</div>
                </div>
            </div>
            <!-- xx达标&&未选奖品 -->
            <div v-else-if="status === 1" class="card card-small">
                <div class="card-title title-large">恭喜，您已获得领奖资格</div>
                <div class="card-subtitle subtitle-large">好礼免费包邮到家，快去领奖品吧！</div>
            </div>
            <!-- xx未达标&&已选奖品 -->
            <div v-else-if="status === 2" class="card card-middle">
                <div class="card-title">xx满{{ targetAmount | formatAmount }}元免费领</div>
                <div class="card-subtitle">xx成功到账，即可免费获得礼品</div>
                <div class="award">
                    <img :src="choiceAward.smallPic" alt="award" class="award-img" />
                    <div class="award-name">{{ choiceAward.awardName }}</div>
                </div>
                <div class="card-footer">
                    <div class="card-button" @click="$emit('goToLoan', diffAmount)">xxx</div>
                    <div class="card-bubble">还差{{ diffAmount }}元</div>
                </div>
            </div>
            <!-- xx达标&&已选奖品未领取 -->
            <div v-else-if="status === 3" class="card card-middle">
                <div class="card-title">恭喜，您已获得领奖资格</div>
                <div class="card-subtitle">点击下方确认按钮，即可成功领取奖品</div>
                <div class="award">
                    <img :src="choiceAward.smallPic" alt="award" class="award-img" />
                    <div class="award-name">{{ choiceAward.awardName }}</div>
                </div>
                <div class="card-button" @click="$emit('showConfirm')">确认领取</div>
            </div>
            <!-- xx达标&&已领奖&&发奖中 -->
            <div v-else-if="status === 4" class="card card-middle">
                <div class="card-title">领取中…</div>
                <div class="card-subtitle">领取成功将在7日内发货，请及时关注领取状态</div>
                <div class="award">
                    <img :src="choiceAward.smallPic" alt="award" class="award-img" />
                    <div class="award-name">{{ choiceAward.awardName }}</div>
                </div>
            </div>
            <!-- 发奖成功 -->
            <div v-else-if="status === 5" class="card card-middle">
                <div class="card-title">恭喜，领取成功</div>
                <div class="card-subtitle">领取成功将在7日内发货，请及时关注物流状态</div>
                <div class="award">
                    <img :src="choiceAward.smallPic" alt="award" class="award-img" />
                    <div class="award-name">{{ choiceAward.awardName }}</div>
                </div>
                <div class="card-button" @click="$emit('showExpressDialog')">查看物流</div>
            </div>
            <!-- 发奖失败 -->
            <div v-else-if="status === 6" class="card card-small">
                <div class="card-title title-large" style="margin-top: -4px">领取失败，请重新领取</div>
                <div class="card-subtitle subtitle-large">
                    <div>抱歉，您选择的{{ choiceAward.awardName }}无货，</div>
                    <div>请重新选取其他奖品</div>
                </div>
            </div>
        </div>
        <div v-else>
            <!-- xx未达标&&未选奖品 -->
            <div v-if="status === 0" class="new-card new-card-middle" :style="generateStyleByObj(elemStyle.redBigBg)">
                <div class="new-card-title new-unqualified-and-unselected-title">
                    <div class="new-card-title-left" :style="generateStyleByObj(elemStyle.redWordBefore)"/>
                    <div class="new-card-title-amount num-family">{{ targetAmount | formatAmount }}</div>
                    <div class="new-card-title-right" :style="generateStyleByObj(elemStyle.redWordAfter)"/>
                </div>
                <div class="new-steps" :style="generateStyleByObj(elemStyle.redWord)"/>
                <div class="new-card-footer">
                    <div class="new-card-button" @click="$emit('goToLoan', diffAmount)">xxx</div>
                    <div class="new-card-bubble" :style="generateStyleByObj(elemStyle.redTag)">还差{{ diffAmount }}元</div>
                </div>
            </div>
            <!-- xx达标&&未选奖品 -->
            <div v-else-if="status === 1" class="new-card new-card-small" :style="generateStyleByObj(elemStyle.redSmallBg)">
                <div class="new-card-title new-title-large">恭喜，您已获得领奖资格</div>
                <div class="card-subtitle subtitle-large">好礼免费包邮到家，快去领奖品吧！</div>
            </div>
            <!-- xx未达标&&已选奖品 -->
            <div v-else-if="status === 2" class="new-card new-card-middle" :style="generateStyleByObj(elemStyle.redBigBg)">
                <div class="flex-row mt-90 flex-items-center">
                    <div class="new-award">
                        <img :src="choiceAward.smallPic" alt="award" class="new-award-img" />
                    </div>
                    <section class="ml-5">
                        <div class="new-red-title">xx满{{ targetAmount | formatAmount }}元免费领</div>
                        <div class="new-red-subtitle mt-5">xx成功到账，即可免费获得礼品</div>
                    </section>
                </div>
                
                <div class="new-card-footer mt-0">
                    <div class="new-card-button" @click="$emit('goToLoan', diffAmount)">xxx</div>
                    <div class="new-card-bubble" :style="generateStyleByObj(elemStyle.redTag)">还差{{ diffAmount }}元</div>
                </div>
            </div>
            <!-- xx达标&&已选奖品未领取 -->
            <div v-else-if="status === 3" class="new-card new-card-middle" :style="generateStyleByObj(elemStyle.redBigBg)">
                <div class="flex-row mt-90 flex-items-center">
                    <div class="new-award">
                        <img :src="choiceAward.smallPic" alt="award" class="new-award-img" />
                    </div>
                    <section class="ml-5">
                        <div class="new-red-title">恭喜，您已获得领奖资格</div>
                        <div class="new-red-subtitle mt-5">点击下方确认按钮，即可成功领取奖品</div>
                    </section>
                </div>
                <div class="new-card-button" @click="$emit('showConfirm')">确认领取</div>
            </div>
            <!-- xx达标&&已领奖&&发奖中 -->
            <div v-else-if="status === 4" class="new-card new-card-small" :style="generateStyleByObj(elemStyle.redSmallBg)">
                <div class="flex-row mt-90 flex-items-center">
                    <div class="new-award">
                        <img :src="choiceAward.smallPic" alt="award" class="new-award-img" />
                    </div>
                    <section class="ml-5">
                        <div class="new-red-title">领取中…</div>
                        <div class="new-red-subtitle mt-5 w-190">领取成功将在7日内发货，请及时关注领取状态</div>
                    </section>
                </div>
            </div>
            <!-- 发奖成功 -->
            <div v-else-if="status === 5" class="new-card new-card-middle" :style="generateStyleByObj(elemStyle.redBigBg)">
                <div class="flex-row mt-90 flex-items-center">
                    <div class="new-award">
                        <img :src="choiceAward.smallPic" alt="award" class="new-award-img" />
                    </div>
                    <section class="ml-5">
                        <div class="new-red-title">恭喜，领取成功</div>
                        <div class="new-red-subtitle mt-5 w-190">领取成功将在7日内发货，请及时关注物流状态</div>
                    </section>
                </div>
                <div class="new-card-button" @click="$emit('showExpressDialog')">查看物流</div>
            </div>
            <!-- 发奖失败 -->
            <div v-else-if="status === 6" class="new-card new-card-small" :style="generateStyleByObj(elemStyle.redSmallBg)">
                <div class="new-card-title new-title-large" style="margin-top: -4px">领取失败，请重新领取</div>
                <div class="new-card-subtitle new-subtitle-large">
                    <div>抱歉，您选择的{{ choiceAward.awardName }}无货，</div>
                    <div>请重新选取其他奖品</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { generateStyleByObj } from '../../index';

export default {
    props: {
        itemConfig: {
            type: Object,
            default() {
                return {
                    containerStyle: null,
                    property: null,
                    elemStyle: null,
                    selfStyle: null,
                };
            },
        },
        loanAmount: {
            type: Number,
            default: -1,
        },
        targetAmount: {
            type: Number,
            default: -1,
        },
        award: {
            type: Object,
            default: null,
        },
        isTemplate: {
            type: Boolean,
            default: false,
        }

    },
    filters: {
        // 金额 分转化元
        formatAmount(value) {
            if (value || value === 0) {
                return Number.parseInt(value * 0.01);
            } else {
                return '';
            }
        },
    },
    watch: {
        itemConfig: {
            handler: function (nObj) {
                let { property, elemStyle, selfStyle } = nObj || {};
                Object.assign(this, { property, elemStyle, selfStyle });
            },
            immediate: true,
            deep: true,
        },
    },
    computed: {
        switchOldVersion() {
            return this.itemConfig.property.switchOldVersion
        },
        choiceAward() {
            if (this.isTemplate) {
                return {
                    awardName: '红包123',
                    smallPic: 'https://maumkt.ppdaicdn.com/22total_loan/smallawardjiangguo.png',
                    status: 0,
                }
            } else {
                return this.award
            }
        },
        status() {
            if (!this.choiceAward) {
                if (this.loanAmount === -1) return -1;
                return this.loanAmount >= this.targetAmount ? 1 : 0; // 0-未达标未选礼品，1-已达标未选礼品
            } else {
                return this.choiceAward.status;
            }
        },
        diffAmount() {
            return Math.ceil((this.targetAmount - this.loanAmount) * 0.01);
        },
    },
    methods: {
        generateStyleByObj,
    },
};
</script>

<style lang="less" scoped>
@baseImgUrl: '../../../assets/images/activity/regularCustomer/';
@import './index.less';

.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 357px;
    margin: 0 auto;
    overflow: hidden;
}
.card-middle {
    height: 230px;
    background: no-repeat center/100% url('@{baseImgUrl}card-middle.png');
}
.card-small {
    height: 118px;
    background: no-repeat center/100% url('@{baseImgUrl}card-small.png');
}


// title
.card-title {
    margin-bottom: 2px;
    font-size: 15px;
    font-weight: 600;
    color: #441003;
    line-height: 21px;
}

.unqualified-and-unselected-title {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 16px;
}
.title-large {
    font-size: 17px;
    margin-bottom: 6px;
}

.distribute-failed-title {
    margin-top: -3px;
}

// subtitle
.card-subtitle {
    font-size: 12px;
    font-weight: 400;
    color: #737373;
    line-height: 18px;
    text-align: center;
}

.subtitle-large {
    font-size: 13px;
}

// 奖品缩略图 box
.award {
    margin-top: 8px;
    margin-bottom: 12px;
    text-align: center;
}
.award-img {
    width: 100px;
    height: 70px;
    margin-bottom: 6px;
}
.award-name {
    font-size: 12px;
    font-weight: 600;
    color: #441003;
}

// 按钮
.card-footer {
    position: relative;
    width: 220px;
    height: 40px;
    margin: 0 auto;
}
.card-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 220px;
    height: 40px;
    margin: 0 auto;
    font-size: 16px;
    font-weight: 800;
    color: #fcfffe;
    background: linear-gradient(90deg, #fb6d46 0%, #f83871 100%);
    border-radius: 22px;
    -webkit-tap-highlight-color: transparent;
}
.card-bubble {
    position: absolute;
    left: 139px;
    top: -16px;
    width: 104px;
    height: 34px;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    line-height: 27px;
    background: no-repeat center/100% url('@{baseImgUrl}bubble.png');
    text-align: center;
}

// 其他
.steps {
    width: 235px;
    height: 24px;
    background: no-repeat center/100% url('@{baseImgUrl}steps.png');
    margin-bottom: 40px;
}
.card-title-left {
    width: 58px;
    height: 28px;
    background: no-repeat center/100% url('@{baseImgUrl}card-title-left.png');
}
.card-title-right {
    width: 150px;
    height: 28px;
    background: no-repeat center/100% url('@{baseImgUrl}card-title-right.png');
}
.card-title-amount {
    height: 32px;
    padding: 0 2px;
    font-size: 32px;
    color: #fc4127;
    line-height: 40px;

}


.new-card-subtitle {
    font-size: 12px;
    font-weight: 400;
    color: #828282;
    line-height: 18px;
    text-align: center;
}

.new-subtitle-large {
    font-size: 12px;
}
.new-title-large {
    font-size: 15px;
    color: #AB0B0D;
    font-weight: bold;
    margin-bottom: 6px;
    margin-top: 110px !important;
}
.new-red-title{
    font-size: 15px;
    color: #AB0B0D;
    font-weight: bold;
}
.new-red-subtitle{
    font-size: 12px;
    font-weight: 400;
    color: #828282;
    line-height: 18px;
}
.new-card-small {
    height: 191px;
}
.new-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 361px;
    margin: 0 auto;
    overflow: hidden;
    box-sizing: border-box;
}
.new-card-middle {
    height: 248px;
    padding-top: 0.1px;
}
.new-card-title {
    margin-top: 90px;
}
.new-unqualified-and-unselected-title {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
// 其他
.new-steps {
    width: 202px;
    height: 21px;
    margin-top: 15px;
}
.new-card-title-left {
    width: 50px;
    height: 24px;
}
.new-card-title-right {
    width: 128px;
    height: 24px;
}
.new-card-title-amount {
    height: 30px;
    padding: 0 2px;
    font-size: 30px;
    color: #fc4127;
    line-height: 40px;
}


// 按钮
.new-card-footer {
    position: relative;
    width: 265px;
    height: 40px;
    margin: 0 auto;
    margin-top: 25px;
}
.new-card-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 265px;
    height: 40px;
    margin: 0 auto;
    font-size: 16px;
    font-weight: 800;
    color: #fcfffe;
    background: linear-gradient(90deg, #fb6d46 0%, #f2442c 100%);
    border-radius: 22px;
    -webkit-tap-highlight-color: transparent;
}
.new-card-bubble {
    position: absolute;
    left: 163px;
    top: -6px;
    width: 86px;
    height: 23px;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    line-height: 23px;
    text-align: center;
}


// 奖品缩略图 box
.new-award {
}
.new-award-img {
    width: 70px;
    height: 83px;
}
.new-award-name {
    font-size: 12px;
    font-weight: 600;
    color: #441003;
}
</style>
