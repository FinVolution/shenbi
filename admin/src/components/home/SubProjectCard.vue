<template>
    <div>
        <!-- 落地页 -->
        <template v-if="childItemType === 100">
            <el-table :data="tableData" row-key="projectId" align="center" style="width: 100%" v-if="visiableVersionList">
                <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label"
                    :formatter="item.formatter"></el-table-column>
                <el-table-column fixed="right" label="操作" width="480">
                    <template slot-scope="data">
                        <ConfigurableButton type="dropdown" :buttonOptions="generateButtonOptions(data.row)" />
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!-- 资源位 -->
        <template v-if="childItemType === 101">
            <div v-for="(item, index) in tableData" :key="index" class="detail-item">
                <el-card class="detail-left-card">
                    <template>
                        <img :src="item.resourceUrl" />
                        <div class="item-title">
                            <!-- <div class="right-info"> -->
                                <div style="flex:1;">版本名称：{{ item.versionName }}</div>
                                <div style="flex:1;">资源类型：{{ resourceTypeFormatter(item.resourceType) }}</div>
                            <!-- </div> -->
                            <!-- <div class="right-info"> -->
                                <div style="flex:1;">资源位ID：{{ item.resourceLocationId }}</div>
                                <div style="flex:1;">iviewid：{{ item.iviewid }}</div>
                            <!-- </div> -->
                        </div>
                        <ConfigurableButton type="dropdown" :buttonOptions="generateButtonOptions(item)" />
                    </template>

                </el-card>
            </div>
        </template>
        <!-- 弹窗 -->
        <template v-if="childItemType === 102">
            <el-table :data="tableData" row-key="projectId" align="center" style="width: 100%">
                <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label"
                    :formatter="item.formatter"></el-table-column>
                <el-table-column fixed="right" label="操作" width="240">
                    <template slot-scope="data">
                        <ConfigurableButton type="dropdown" :buttonOptions="generateButtonOptions(data.row)" />
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
import _ from 'lodash';
import ConfigurableButton from '~/base/ConfigurableButton';
import { resourceTypeOptions } from '@/common/const';
import { mapState, mapMutations, mapActions } from 'vuex'

const DEFAULT_COLUMNS = [
    { label: '版本名称', prop: 'versionName' },
    { label: '产品ID', prop: 'productId' },
];
const DEFAULT_COLUMNS_STATC = [
    { label: '版本名称', prop: 'versionName' },
    { label: '产品ID', prop: 'productId' },
    {
        label: '发布状态',
        prop: 'publishStatus',
        formatter: row => publishStatusFormatter(row.publishStatus)
    },
];
const DEFAULT_COLUMNS_RESOURCE = [
    { label: '版本名称', prop: 'versionName' },
    {
        label: '资源类型',
        prop: 'resourceType',
        formatter: row => resourceTypeFormatter(row.resourceType)
    },
    { label: '关联已有资源', prop: 'resourceUrl' },
    { label: '资源位ID', prop: 'resourceLocationId' },
    { label: '创意ID', prop: 'creativeIdeaId' },
];

const publishStatusFormatter = publishStatus =>  {
    switch (publishStatus) {
        case 0: return '未发布';
        case 1: return '发布成功';
        case 2: return '发布中';
        case 3: return '发布失败';
    }
    return ''
};
const resourceTypeFormatter = value => {
    return resourceTypeOptions.find(item => item.value === value)?.label;
};

export default {
    props: {
        dataSource: {
            type: Object,
            default: {}
        },
        childItemType: {
            type: Number,
            default: -1
        }
    },
    components: {
        ConfigurableButton,
    },
    computed: {
        columns() {
            return this.childItemType === 101
                ? DEFAULT_COLUMNS_RESOURCE
                : DEFAULT_COLUMNS;
        },
        publishStatus() {
            return this.dataSource.publishStatus
        },

    },
    watch: {
        dataSource: {
            deep: true,
            immediate: true,
            handler(val) {
                if (val) {
                    this.tableData = this.dataSource.subProjectList.map(row => {
                        const target = row.properties?.find(item => item.propertyName === 'projectMain');
                        return { ...target.propertyValue, ...row };
                    });
                    const iviewIdArray = this.dataSource.properties.filter(item => item.propertyName === 'iViewID')
                    this.iViewId = iviewIdArray && iviewIdArray.length > 0 ? iviewIdArray[0].propertyValue.iViewID : '';

                    const diffIviewIdArray = this.dataSource.properties.filter(item => item.propertyName === 'diffIViewID')
                    this.diffIviewId = diffIviewIdArray && diffIviewIdArray.length > 0 ? diffIviewIdArray[0].propertyValue.diffIViewID : '';

                    const activityIdArray = this.dataSource.properties.filter(item => item.propertyName === 'activityID')
                    this.activityId = activityIdArray && activityIdArray.length > 0 ? activityIdArray[0].propertyValue.activityID : '';

                    this.visiableVersionList = ![1,2,3].includes(val.projectType)
                }
            }

        },
    },
    data() {
        return {
            tableData: [],
            iViewId: '',
            diffIviewId: '',
            activityId: '',
            visiableVersionList: false,
        };
    },
    methods: {
        resourceTypeFormatter(type) {
            return resourceTypeOptions.find(item => item.value === type)?.label;
        },
        handleEdit(projectId, type) {
            const target = this.dataSource.subProjectList.find(row => row.projectId === projectId);
            this.$emit('onEditProject', { ...target, editType: type });
        },
        onPreviewProject(row) {
            this.$emit('onPreviewProject', row)
        },
        publishProject(row) {
            this.$emit('publishProject', row)
        },
        deleteProject(row) {
            this.$emit('deleteProject', row)
        },
        onCopyProject(row) {
            const rowCopy = _.cloneDeep(row)
            // 修改 versionName
            for (let item of rowCopy.properties) {
                if (item.propertyName === 'projectMain') {
                    const { versionName } = item.propertyValue;
                    item.propertyValue.versionName = `${versionName}_副本`;
                }
            }
            this.$emit('onCopyProject', rowCopy);
        },
        onQueryLog(row) {
            this.$emit('onQueryLog', row)
        },
        copyTxt(text) {
            this.$copyText(text).then((e) => {
                this.$message.success('复制成功');
            }, function (e) {
                this.$message.success('复制失败');
            })
        },
        generateButtonOptions(row) {
            let tableButtonOptions = [];
            const { projectTypeTag, publishStatus } = row
                // 落地页
            if (this.childItemType === 100) {
                if (publishStatus === 1) { // 已上线
                    tableButtonOptions = [
                        { name: '预览', onClick: () => this.onPreviewProject(row) },
                        { name: '克隆', onClick: () => this.onCopyProject(row) },
                        { name: '模版使用', onClick: () => this.handleEdit(row.projectId, 2) },
                        { name: '模版编辑', onClick: () => this.handleEdit(row.projectId, 1) },
                        { name: '日志', onClick: () => this.onQueryLog(row) },
                        { name: '导出', onClick: () => this.exportProjectJSON(row.projectId) },
                    ];
                }
                if (publishStatus === 0 || publishStatus === 2) { // 未上线
                    tableButtonOptions = [
                        { name: '预览', onClick: () => this.onPreviewProject(row) },
                        { name: '发布', onClick: () => this.publishProject(row) },
                        { name: '模版使用', onClick: () => this.handleEdit(row.projectId, 2) },
                        { name: '模版编辑', onClick: () => this.handleEdit(row.projectId, 1) },
                        { name: '删除', onClick: () => this.deleteProject(row) },
                        { name: '导出', onClick: () => this.exportProjectJSON(row.projectId) },
                    ];
                }
            }
            // 资源位
            if (this.childItemType === 101) {
                if (publishStatus === 1) {
                    tableButtonOptions = [
                        { name: '编辑', onClick: () => this.handleEdit(row.projectId, 1) },
                        { name: '克隆', onClick: () => this.onCopyProject(row) },
                        { name: '复制链接', onClick: () => this.copyTxt(row.resourceUrl) },
                    ];
                }
                if (publishStatus === 0) {
                    tableButtonOptions = [
                        { name: '删除', onClick: () => this.deleteProject(row) },
                        { name: '编辑', onClick: () => this.handleEdit(row.projectId, 1) },
                        { name: '发布', onClick: () => this.publishProject(row) },
                    ];
                }
            }
            // 弹窗
            if (this.childItemType === 102) {
                if (publishStatus === 1) {
                    tableButtonOptions = [
                        { name: '预览', onClick: () => this.onPreviewProject(row) },
                        { name: '模版编辑', onClick: () => this.handleEdit(row.projectId, 1)},
                        { name: '克隆', onClick: () => this.onCopyProject(row) },
                        { name: '日志', onClick: () => this.onQueryLog(row) },
                    ];
                }
                if (publishStatus === 0) { // 未上线
                    tableButtonOptions = [
                        { name: '预览', onClick: () => this.onPreviewProject(row) },
                        { name: '模版编辑', onClick: () => this.handleEdit(row.projectId, 1)},
                        { name: '删除', onClick: () => this.deleteProject(row) },
                        { name: '发布', onClick: () => this.publishProject(row) },
                    ];
                }
            }
            return tableButtonOptions;
        },
        exportProjectJSON(projectId) {
            this.$http.exportProjectJSON({ projectId }).then(res => {
                const jsonString = JSON.stringify(res.Content, null, 2);
                const blob = new Blob([jsonString], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.setAttribute('download', 'data.json');
                a.href = url;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        }
    }
};
</script>

<style scoped lang="scss">
.detail-item {
    display: flex;
}

.detail-left-card {
    .item-title {
        display: flex;
        flex-direction: column;
        line-height: 20px;
        margin-bottom: 10px;

        .right-info {
            display: flex;
        }
    }

    img {
        width: 300px;
        height: 250px;
        object-fit: contain;
    }
}

.detail-right-card {
    flex: 1;
}
</style>
