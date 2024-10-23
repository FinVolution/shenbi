<template>
    <div class="tool-switch">
        <span class="tool-switch-title" v-if="title">{{  title  }}</span>
        <el-switch v-model="currentVal" active-text="开" inactive-text="关" @input="onSwitchValChange">
        </el-switch>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentVal: 0
        }
    },
    props: {
        value: [String, Number, Boolean],
        keyValue: { type: String, default: '' },
        title: { type: String, default: '' },
    },
    watch: {
        value: {
            handler: function(n, o) {
                Object.assign(this, { currentVal: n })
            },
            immediate: true
        }
    },
    methods: {
        onSwitchValChange(val) {
            this.$emit('onSwitchValChange', this.keyValue, val)
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';
@import '../../../../assets/less/pc/tools.less';
.tool-switch {
    position: relative;
    width: 100%;
    padding-left: 10px;
    .setFlexPos(column, flex-start, flex-start);
    .tool-switch-title {
        font-size: 14px;
        color: white;
        text-align: left;
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .tool-select {
        color: #c3c3c3;
        font-size: 13px;
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        margin-top: 10px;
        padding-top: 5px;
        .tool-select-item {
            margin-left: 0px !important;
            margin-top: 5px;
        }
    }
}
</style>
  