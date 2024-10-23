<template>
    <div class="container">
        <el-cascader
            v-model="selected"
            :options="options"
            :props="{ multiple: true }"
            collapse-tags
            clearable
            @change="onSelectCityChange"
        ></el-cascader>
    </div>
</template>

<script>
import { Province } from './data';
import { transformRawToCascader } from './utils';
import 'element-ui/lib/theme-chalk/cascader-panel.css';

const options = transformRawToCascader(Province);

export default {
    props: {
        selected: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            options
        };
    },
    methods: {
        onSelectCityChange(val) {
            console.log(val)
            this.$emit('selectCities', val);
        }
    }
};
</script>

<style lang="less" scoped>
.container /deep/ .el-cascader__tags {
    position: absolute;
    left: 0;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-wrap: wrap;
    line-height: normal;
    text-align: left;
    box-sizing: border-box;
    .el-tag {
        display: inline-flex;
        align-items: center;
        max-width: 100%;
        margin: 2px 0 2px 6px;
        text-overflow: ellipsis;
        background: #f0f2f5;
    }
}
</style>