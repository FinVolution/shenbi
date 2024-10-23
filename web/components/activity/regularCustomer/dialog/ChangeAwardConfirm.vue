<!-- 更换礼品 二次确认弹窗 -->
<template>
    <div v-if="visible" class="mask">
        <div class="dialog confirm-dialog">
            <div class="dialog-title">更换礼品</div>
            <div class="dialog-content">确认将礼品更换为{{ award.awardName }}吗？</div>
            <div class="dialog-footer flex flex-justify-space">
                <button class="dialog-button button-cancel" @click="handleCancel">我再想想</button>
                <button class="dialog-button button-ok" @click="handleOk">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { choiceAward } from '@/service/regularCustomer';

export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        award: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        ...mapState('homeStore', {
            activityType: state => state.projectProperties.activityID,
        }),
    },
    methods: {
        ...mapActions('regularCustomerStore', ['getHomeData']),
        ...mapMutations('regularCustomerStore', ['setActivityStatus']),

        handleCancel() {
            this.$emit('update:visible', false);
        },
        async handleOk() {
            try {
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    message: '',
                });
                const params = {
                    activityType: this.activityType,
                    awardKey: this.award.awardKey,
                };
                const { Result, Content, ResultMessage } = await choiceAward(params);
                if (Result === 200 && Content) {
                    this.$emit('update:visible', false);
                    this.getHomeData();
                } else {
                    this.$emit('update:visible', false);
                    this.setActivityStatus({
                        result: Result,
                        activityStatusMsg: ResultMessage,
                    });
                }
            } catch (err) {
            } finally {
                this.$toast.clear();
            }
        },
    },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
