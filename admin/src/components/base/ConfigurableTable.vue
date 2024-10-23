<template>
    <el-table :data="tableData" border size="mini" @sort-change="onSortChange" :header-cell-style="headerCellStyle" @expand-change="onExpandChange" @selection-change="handleSelectionChange">
        <!-- 展开行 -->
        <slot name="expand"></slot>
        <template v-for="(column, index) in columns">
            <template v-if="column.type === 'action'">
                <el-table-column  :key="column.key" :label="column.label"
                    :minWidth="column.minWidth || 100" :align="column.align || 'center'">
                    <template slot-scope="scope">
                        <slot :row="scope.row" />
                    </template>
                </el-table-column>
            </template>
            <template v-else-if="column.type === 'selection'">
                <el-table-column
                    :type="column.type"
                    :align="column.align || 'center'"
                    :width="column.width"
                    :minWidth="column.minWidth || 100">
                </el-table-column>
            </template>
            <template v-else>
                <el-table-column :key="column.prop" :prop="column.prop" :label="column.label"
                    :minWidth="column.minWidth || 100" :width="column.width" :formatter="column.formatter || null"
                    :align="column.align || 'center'" :sortable="column.sortable">
                    <template slot-scope="scope">
                        <i class="el-icon-loading" v-if="column.prop === 'publishStatus' && scope.row[column.prop] === 2"></i>
                       {{column.formatter ? column.formatter(scope.row) : scope.row[column.prop]  }}
                    </template>
                </el-table-column>
            </template>
        </template>
    </el-table>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        tableData: {
            type: Array,
            default: () => []
        },
        headerCellStyle: {
            type: Object,
            default: () => ({ fontSize: '12px', fontWeight: '600' })
        },
        columns: {
            type: Array,
            required: true
        },
        onSortChange: {
            type: Function,
            default: () => { }
        },
        onExpandChange: {
            type: Function,
            default: () => { }
        },
        onSelectionChange: {
            type: Function,
            default: () => {}
        },
    },
    methods: {
        handleSelectionChange(rows) {
            this.$emit('onSelectionChange',rows);
        }
    }
}
</script>