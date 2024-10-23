<template>
    <div v-if="visible" class="mask">
        <!-- 物流弹窗 快递单号展示 -->
        <div v-if="expressNo" class="dialog express-dialog">
            <div class="dialog-title">已发货</div>
            <div class="express-bold">快递公司：{{ expressName }}</div>
            <div class="express-bold">
                <span>物流单号：{{ expressNo }}</span>
                <a class="button-copy" @click="handleCopy">复制</a>
            </div>
            <div class="dialog-content express-dialog-content">
                请在{{ expressName }}官网查询详细物流信息
            </div>
            <div class="dialog-footer">
                <button class="dialog-button" @click="handleClose">关闭</button>
            </div>
        </div>
        <!-- 物流弹窗 发货中 -->
        <div v-else class="dialog">
            <div class="dialog-title">发货中</div>
            <div class="dialog-content">礼品发货后我们会尽快告知物流信息</div>
            <div class="dialog-footer">
                <button class="dialog-button" @click="handleClose">关闭</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('regularCustomerStore', {
            expressNo: state => state.homeData.choiceAward.expressNo,
            expressName: state => state.homeData.choiceAward.expressName,
        }),
    },
    methods: {
        handleClose() {
            this.$emit('update:visible', false);
        },
        handleCopy() {
            this.$copyText(this.expressNo)
                .then(res => {
                    this.$toast('已成功复制，可直接去粘贴');
                })
                .catch(err => {
                    this.$toast('复制失败');
                });
        },
    },
};
</script>

<style lang="less" scoped>
@import './index.less';

.express-dialog {
    height: 245px;
}
.express-bold {
    position: relative;
    margin-bottom: 9px;
    font-size: 14px;
    font-weight: 800;
    color: #002a3c;
    line-height: 17px;
    text-align: left;
}
.express-dialog-content {
    padding-top: 7px;
    text-align: left;
}
.button-copy {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 14px;
    font-weight: 400;
    color: #447bf9;
}
</style>
