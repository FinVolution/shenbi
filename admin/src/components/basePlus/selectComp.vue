<template>
    <div class="tool-select-string">
        <div class="tool-select-title">{{ title }}</div>
        <el-select v-model="currentVal" size="mini" style="width:200px" placeholder='请选择' @change="onSelectValChange"  class="tool-select">
            <el-option v-for="(item, index) in options" :value="item.val" :key="index" :label="item.label" class="tool-select-item">{{item.label}}</el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    data() {
        return {
            currentVal: this.value
        }
    },
    props: {
        value: [String, Number, Boolean],
        keyValue: { type: String, default: '' },
        title: { type: String, default: '' },
        options: {
            type: Array,
            required: true,
            validator: function (val) {
                return val && val.length >= 0
            }
        }
    },
    watch: {
        value: {
            handler: function (n, o) {
                Object.assign(this, { currentVal: n })
            },
            immediate: true
        }
    },
    methods: {
        onSelectValChange(val) {
            this.$emit('onSelectValChange', this.keyValue, val)
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';
@import '../../../../assets/less/pc/tools.less';

.tool-select-string {
    position: relative;
    width: 100%;
    .setFlexPos(column, flex-start, flex-start);

    .tool-select-title {
        font-size: 14px;
        color: white;
        text-align: left;
        width: 100%;
        margin-top: 10px;
        margin-left: 10px;
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
  