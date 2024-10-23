<template>
    <div v-if="[40600, 40900, 42001].includes(activityStatus)" class="mask">
        <!-- 活动已结束 -->
        <div v-if="activityStatus === 40600" class="dialog ended-dialog">
            <div class="dialog-title">活动已结束</div>
            <div class="dialog-content">活动已结束，您还可以参与其他平台活动</div>
            <div class="dialog-footer">
                <button class="dialog-button" @click="handleClose">确定</button>
            </div>
        </div>
        <!-- 暂不满足参与条件 -->
        <div v-else-if="activityStatus === 40900" class="dialog unqualified-dialog">
            <div class="dialog-title unqualified-dialog-title">暂不满足参与条件</div>
            <div class="dialog-content unqualified-dialog-content">
                活动还在测试中，暂未对您开放，请参与其他活动
            </div>
            <div class="dialog-footer">
                <button class="dialog-button" @click="handleClose">确定</button>
            </div>
        </div>
        <!-- 暂不满足参与条件 -->
        <div v-else-if="activityStatus === 42001" class="dialog unqualified-dialog">
            <div class="dialog-title unqualified-dialog-title">暂时无法参与</div>
            <div class="dialog-content unqualified-dialog-content">
                抱歉，您暂时无法参与活动，请明天再来
            </div>
            <div class="dialog-footer">
                <button class="dialog-button" @click="handleClose">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('regularCustomerStore', {
            activityStatus: state => state.activityStatus,
            activityStatusMsg: state => state.activityStatusMsg,
        }),
    },
    methods: {
        handleClose() {},
    },
};
</script>

<style lang="less" scoped>
@import './index.less';

.ended-dialog {
    padding-left: 0;
    padding-right: 0;
}
.unqualified-dialog {
    height: 206px;
}
.unqualified-dialog-title {
    margin-bottom: 19px;
}
.unqualified-dialog-content {
    text-align: left;
}
</style>
