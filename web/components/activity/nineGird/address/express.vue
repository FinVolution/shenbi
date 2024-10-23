<template>
    <div v-if="show" class="express-dialog-container">
        <div class="express-dialog-container-item">
            <img class="express-dialog-container-item-close" src="/images/nineGrid/close.png" @click="onCloseClick"/>
            <div class="express-dialog-container-item-title">您的奖品已发出</div>
            <div class="express-dialog-container-item-number">快递单号：{{ expressNumber }}</div>
            <div class="express-dialog-container-item-btn" @click="onCloseClick">知道了</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'express',
    props: ['show', 'expressNumber'],
    data() {
        return {};
    },
    created() {},
    methods: {
        onCloseClick() {
            this.$emit('update:show', false);
        },
    },
};
</script>
<style lang="less" scoped>
.express-dialog-container {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 303px;
        background: #ffffff;
        border-radius: 8px;
        font-weight: bold;
        padding-bottom: 30px;
        &-close {
            width: 15px;
            height: 15px;
            align-self: flex-end;
            margin-right: 20px;
            margin-top: 20px;
        }
        &-title {
            margin-top: 15px;
            font-size: 18px;
            color: #002a3c;
        }
        &-number {
            margin-top: 20px;
            font-size: 15px;
            color: #49596c;
        }
        &-btn {
            width: 255px;
            height: 41px;
            font-size: 16px;
            margin-top: 30px;
            color: white;
            background: linear-gradient(270deg, #3ca5e2 0%, #4dbaf9 100%);
            border-radius: 8px;
            text-align: center;
            line-height: 41px;
        }
    }
}
</style>
