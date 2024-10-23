<template>
    <div>
        <!-- 活动已结束/暂未开放弹窗 -->
        <ActivityStatus />

        <!-- 四宫格礼品栏位 -->
        <RCAwardCard :itemConfig="itemConfig" :list="list" />

        <!-- 更换礼品 二次确认弹窗 -->
        <ChangeAwardConfirm :visible.sync="confirmVisible" :award="activeAward" />
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import RCAwardCard from '../../../../common/activity/regularCustomer/awardCard';
import { ActivityStatus, ChangeAwardConfirm } from './dialog/index';
import { getCookie } from '@/utils/util';
import { redirectTo } from '@/utils/redirect';

export default {
    props: {
        itemConfig: {
            type: Object,
            default() {
                return {
                    property: null,
                };
            },
        },
    },
    components: {
        ActivityStatus,
        RCAwardCard,
        ChangeAwardConfirm,
    },
    data() {
        return {
            confirmVisible: false, // 更换礼品 二次确认
            hitVersion: null, // 命中的版本：0老版本|1新版本
            activeAward: null, // 四宫格奖品中 当前正在操作（免费领/更换地址）的奖品
            activeCase: 0, // 新增地址页面 触发场景：0-选品，1-更改地址
        };
    },
    watch: {
        itemConfig: {
            handler: function (nObj) {
                let { property } = nObj || {};
                Object.assign(this, { property });
            },
            immediate: true,
            deep: true,
        },
        // 监听选中奖品 替换奖品链接
        choiceAward: {
            handler(value) {
                if (!value) return;
                this.replaceSmallPicOfChoiceAward(value);
            },
            immediate: true,
            deep: true,
        },
        // 监听奖品列表 替换奖品链接
        awardList: {
            handler(value) {
                if (!value || value.length === 0) return;
                this.replaceBigPicOfAwardList(value);
            },
            immediate: true,
            deep: true,
        },
    },
    computed: {
        ...mapState('homeStore', {
            activityType: state => state.projectProperties.activityID,
        }),
        ...mapState('regularCustomerStore', {
            choiceAward: state => state.homeData.choiceAward,
            awardList: state => state.homeData.awardList,
            tag: state => state.homeData.tag,
        }),
        ...mapGetters('regularCustomerStore', ['loanTaskDone', 'receiveResult']),

        awardListFromProperty() {
            return this.property?.awardList || [];
        },

        list() {
            return this.awardList.map(this.addButtonTextAndCallback).map(this.addButtonDisabled);
        },
    },
    created() {
        if (__isBrowser__) {
            this.getHomeData();
            const productId = getCookie('productId');
            this.hitVersion = productId === 'golden' ? 0 : productId === 'red' ? 1 : null;
        }
    },
    methods: {
        ...mapActions('regularCustomerStore', ['getHomeData']),
        ...mapMutations('regularCustomerStore', ['setChoiceAward', 'setAwardList']),

        // 替换 awardList 中的 bigPic
        replaceBigPicOfAwardList(list) {
            list.forEach(award => {
                const target = this.awardListFromProperty.find(
                    item => item.awardKey === award.awardKey
                );
                if (!target) return;
                award.bigPic = target.bigPic;
            });
            this.setAwardList(list);
        },

        // 替换 choiceAward 中的 smallPic
        replaceSmallPicOfChoiceAward(choiceAward) {
            const target = this.awardListFromProperty.find(
                item => item.awardKey === choiceAward.awardKey
            );
            if (!target) return;
            choiceAward.smallPic = target.smallPic;
            this.setChoiceAward(choiceAward);
        },

        // 判断按钮文案和点击事件
        // 礼品状态(0-未达标未选礼品，1-已达标未选礼品，2-已选未达标，3-已选已达标未领取，4-发放中，5-发放成功，6-发放失败)
        addButtonTextAndCallback(award) {
            const { status, addressId } = award;
            if (status === 6) {
                return {
                    ...award,
                    buttonText: '已抢光',
                    buttonCallback: null,
                };
            } else if ([4, 5].includes(status)) {
                return {
                    ...award,
                    buttonText: '已领取',
                    buttonCallback: null,
                };
            } else if (addressId) {
                return {
                    ...award,
                    buttonText: '更换地址',
                    buttonCallback: this.changeAddress,
                };
            } else {
                let buttonCallback = null;
                if (!this.choiceAward || this.choiceAward.status === 6) {
                    buttonCallback = this.selectAward; // 首次领礼品/发放失败后重新选礼品 跳转新增地址页面 选择礼品接口
                } else {
                    buttonCallback = this.changeAward; // 更换礼品 确认更换礼品弹窗 选择礼品接口
                }
                return {
                    ...award,
                    buttonText: '免费领',
                    buttonCallback,
                };
            }
        },

        // 判断按钮置灰状态
        addButtonDisabled(award) {
            // 发放中/发放成功，按钮都置灰
            if ([4, 5].includes(this.choiceAward?.status)) {
                return {
                    ...award,
                    buttonDisabled: true,
                };
            }
            if (award.status === 6) {
                return {
                    ...award,
                    buttonDisabled: true,
                };
            }
            return {
                ...award,
                buttonDisabled: false,
            };
        },

        // 更换地址 跳转新增地址页面-绑定地址接口
        changeAddress(award) {
            this.activeAward = award;
            this.activeCase = 1;
            this.goToAddress();
        },

        // “免费领”按钮点击事件包含如下三个场景：
        // 场景1：首次选礼品 跳转新增地址页面-选择礼品接口
        // 场景2：发放失败后重新选礼品 跳转新增地址页面-选择礼品接口
        selectAward(award) {
            this.activeAward = award;
            this.activeCase = 0;
            this.goToAddress();
        },

        // 场景3：更换礼品 点击展示“确认更换礼品弹窗” 弹窗确认-选择礼品接口
        changeAward(award) {
            this.activeAward = award;
            this.confirmVisible = true;
        },

        goToAddress() {
            const { batchNo, recordId, awardKey } = this.activeAward;
            redirectTo(
                `${location.protocol}//${location.host}/regularCustomer/address?batchNo=${batchNo}&awardKey=${awardKey}&recordId=${recordId}&activityType=${this.activityType}&activeCase=${this.activeCase}&loanTaskDone=${this.loanTaskDone}`
            );
        },
    },
};
</script>
