<template>
<el-dialog title="发布日志" :visible="showLogDialog" width="800px" @close="closeModal" :close-on-click-modal="false">
    <ConfigurableTable :columns="columns" :tableData="tableData" class="logDialogClass" />
</el-dialog>
</template>

<script>
import ConfigurableTable from '~/basePlus/ConfigurableTable';
import { logListColumns } from '@/common/const';
export default {
    data() {
        return {
            columns: logListColumns,
        }
    },
    components: { ConfigurableTable },
    props: {
        showLogDialog: Boolean,
        closeModal: Function,
        tableData: Array,
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.logDialogClass {
  height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>