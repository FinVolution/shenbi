<!-- 领取礼品 二次确认弹窗 -->
<template>
    <div v-if="visible" class="mask">
        <div class="dialog confirm-dialog">
            <div class="dialog-title">确认领取</div>
            <div class="dialog-content">领取后，无法更换其他礼品及更改收货地址，确认领取吗？</div>
            <div class="dialog-footer flex flex-justify-space">
                <button class="dialog-button button-cancel" @click="handleCancel">我再想想</button>
                <button class="dialog-button button-ok" @click="handleOk">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import { receiveAward } from '@/service/regularCustomer';

export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('homeStore', {
            activityType: state => state.projectProperties.activityID,
        }),
        ...mapState('regularCustomerStore', {
            choiceAward: state => state.homeData.choiceAward,
        }),
    },
    methods: {
        ...mapActions('regularCustomerStore', ['getHomeData']),
        ...mapMutations('regularCustomerStore', ['setActivityStatus']),

        handleCancel() {
            this.$emit('update:visible', false);
        },

        // 领取礼品
        async handleOk() {
            const params = {
                activityType: this.activityType,
                recordId: this.choiceAward.recordId,
            };
            this.$toast.loading({
                duration: 0,
                forbidClick: true,
                message: ""
            })
            const { Result, Content, ResultMessage } = await receiveAward(params);
            this.$toast.clear();
            if (Result === 200 && Content) {
                this.$emit('update:visible', false);
                this.getHomeData();
            } else {
                this.$emit('update:visible', false);
                this.setActivityStatus({
                    result: Result, 
                    activityStatusMsg: ResultMessage
                });
            }
        },
    },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
