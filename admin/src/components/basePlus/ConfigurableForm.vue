<template>
<el-form :inline="inline" size="mini" :label-position="labelPosition" :label-width="labelWidth" :model="dataSource">
    <el-form-item v-for="(item, index) in formOptions" :key="index" :label="item.label" class="el-form-item">
        <!---输入框-->
        <el-input
            v-if="item.type === 'el-input'"
            v-model="dataSource[item.key]"
            size="mini"
            @change="item.props.onChange"
            :placeholder="item.props.placeholder"
            :disabled="item.props.disabled"
            :clearable="item.props.clearable"
            :style="item.style"
        />

        <!-- 选择框 -->
        <el-select
            v-if="item.type === 'el-select'"
            v-model="dataSource[item.key]"
            size="mini"
            @change="item.props.onChange"
            :placeholder="item.props.placeholder"
            :disabled="item.props.disabled"
            :clearable="item.props.clearable"
            :style="item.style"
        >
            <el-option v-for="(option, index) in item.props.options" :key="index" :label="option.label" :value="option.value" />
        </el-select>
    </el-form-item>
</el-form>
</template>

<script>
export default {
    props: {
        dataSource: Object,
        formOptions: {
            type: Array,
            default: () => []
        },
        inline: {
            type: Boolean,
            default: true
        },
        labelPosition: {
            type: String,
            default: 'right'
        },
        labelWidth: String
    },
}
</script>

<style lang="less">
.el-form-item {
    .el-form-item__label {
        font-size: 14px;
        font-weight: 600;
    }
}
</style>