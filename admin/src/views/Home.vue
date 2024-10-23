<template>
    <div class="home">
        <Toolbar @queryProjectList="queryProjectList"/>
        <el-main >
            <el-tabs v-model="activeTab" type="card" @tab-click="onTabClick" size="mini">
                <el-tab-pane v-for="(item, index) in tabOptions" :label="item.label" :name="item.name" :key="index">
                    <TopSearch style="margin-bottom: 15px;" :rightWidth="130">
                        <template v-slot:header>
                            <ConfigurableForm :dataSource.sync="projectListFilter" :formOptions="formOptions" />
                        </template>
                        <template v-slot:operator>
                            <el-button type="primary" icon="el-icon-search" @click="onSearch" size="mini">搜索</el-button>
                        </template>
                        <template v-slot:other>
                            <ConfigurableButton :buttonOptions="buttonOptions" />
                        </template>
                            
                    </TopSearch>
                    <ConfigurableTable :columns="columns" :tableData="tableData" :onExpandChange="queryItemsOnGroup">
                        <template slot-scope="data">
                            <ConfigurableButton type="dropdown" :buttonOptions="generateButtonOptions(data.row)" />
                        </template>
                        <template v-slot:expand>
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <SubProjectCard
                                        v-if="showChartVisiable(props)"
                                        :dataSource="props.row"
                                        :childItemType="searchProjectType"
                                        @onEditProject="state => showSubProjectDialog(state, 'edit')"
                                        @onPreviewProject="onPreviewProject"
                                        @publishProject="publishProject"
                                        @deleteProject="deleteProject"
                                        @onCopyProject="onCopyProject"
                                        @onQueryLog="onQueryLog"
                                    />
                                    
                                </template>
                            </el-table-column>
                        </template>
                    </ConfigurableTable>
                </el-tab-pane>
            </el-tabs>
            <div class="pagination">
                <el-pagination background @size-change="onPageSizeChange" @current-change="onCurPageChange"
                    :current-page.sync="pageIndex" :page-sizes="[10, 15, 20, 50, 100]" :page-size.sync="pageSize"
                    layout="total, sizes, prev, pager, next" :total="total" />
            </div>
        </el-main>

        <CreateProDialog :showCreateProDialog="showCreateProDialog" ref="formRules" :dataSource="dataSource"
            :closeModal="() => closeModal('showCreateProDialog')">
            <template v-slot:btn-area>
                <el-button type="primary" size="mini" @click="onSave(1)">保存项目</el-button>
                <el-button type="primary" size="mini" @click="onSave(2)">{{
                        dataSource.projectId ? '开始编辑' : '立即创建'
                }}</el-button>
                <el-button @click="() => closeModal('showCreateProDialog')" size="mini">取消</el-button>
            </template>
        </CreateProDialog>

        <LogDialog :showLogDialog="showLogDialog" :tableData="logTableData"
            :closeModal="() => closeModal('showLogDialog')" />

        <PreviewDialog :visible.sync="previewDialogShow" :previewSrc="previewSrc" />

        <!-- 神笔 项目弹窗 -->
        <ProjectDialog
            :visible.sync="projectDialogVisible"
            :dataSource="projectDialogState"
            :onlineType="onlineType"
            @reloadTableData="handleSubmitSuccessCb"
            @showSubProjectDialog="showSubProjectDialog"
        />
        <!-- 神笔 版本弹窗 -->
        <SubProjectDialog
            :visible.sync="subProjectDialogVisible"
            :action="subProjectDialogAction"
            :dataSource="subProjectDialogState"
            :onlineType="onlineType"
            @reloadTableData="handleSubmitSuccessCb"
        />

        <el-dialog
            title="发布确认"
            :visible.sync="showPublishConfirmDialog"
            :close-on-click-modal="false"
            :modal="true"
            :show-close="false"
            :close-on-press-escape="false"
            width="30%">
            <span>每次仅可以发布一个项目，发布成功后可进行其他操作，是否确认发布？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="onCanclePublish">取 消</el-button>
            <el-button type="primary" @click="onPublishConfirm">确 定</el-button>
        </span>
        </el-dialog>

    </div>
</template>

<script>
import TopSearch from '~/basePlus/topSearch';
import ConfigurableButton from '~/basePlus/ConfigurableButton';
import ConfigurableTable from '~/basePlus/ConfigurableTable';
import ConfigurableForm from '~/basePlus/ConfigurableForm';
import CreateProDialog from '~/home/createProDialog';
import LogDialog from '~/home/LogDialog';
import PreviewDialog from '~/home/PreviewDialog';
import ProjectDialog from '~/home/ProjectDialog';
import SubProjectDialog from '~/home/SubProjectDialog';
import SubProjectCard from '~/home/SubProjectCard';

import { tabOptionsV2 as tabOptions, projectListColumnsV2 as projectListColumns, getDomainNameByTenantId, publishStatusTenantIdList, thirdProjectListColumns, projectUnlineListColumns, ACT_URL, projectTypeOptionsV2 as searchProjectTypeOptions } from '@/common/const';
import { fomatDate } from '@/utils';
let Base64 = require('js-base64').Base64;
import { mapState, mapMutations, mapActions } from 'vuex'
let DEFAULT_CREATE_PROJECT_FORM = {
    projectName: '',
    projectStartTime: fomatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    projectEndTime: '2038-01-01 23:59:59',
    projectType: 1,
    activityID: '',
    url: '',
    projectDesc: ''
};

export default {
    data() {
        return {
            buttonOptions: [],
            activeTab: 'first',
            tabOptions,
            showPublishConfirmDialog: false,
            formOptions: [],
            projectListFilter: {
                projectId: '',
                createName: '',
                projectTypeTags: [0, 100],
                projectTypes: [1, 100]
            },
            projectIdList: [],
            createNames: [],
            columns: [],
            tableData: [],
            pageIndex: 1,
            pageSize: 15,
            total: 0,
            // projectTypes: [],
            onlineType: 1, // 0-未上线项目，1-已上线项目
            showCreateProDialog: false,
            dataSource: JSON.parse(JSON.stringify(DEFAULT_CREATE_PROJECT_FORM)),
            showLogDialog: false,
            logTableData: [],
            previewDialogShow: false,
            previewSrc: '',
            searchProjectTypeOptions, // 神笔 顶部查询 100-落地页, 101-资源位, 102-弹窗
            searchProjectType: 100,
            projectDialogVisible: false, // 项目弹窗
            projectDialogState: null,
            subProjectDialogVisible: false, // 版本弹窗
            subProjectDialogState: null,
            subProjectDialogAction: 'add', // add-新增 edit-编辑
        };
    },
    watch: {
        currentTenantId: {
            handler(newVal) {
                this.activeTab = 'first'
                this.queryProjectList(true)
            }
        },
        activeTab: {
            handler(newVal) {
                this.projectListFilter.projectId = '';
                this.projectListFilter.createName = '';
                // this.projectListFilter.projectTypeTags = '';
                this.pageIndex = 1;
                this.pageSize = 10;
                this.total = 0;

                this.columns = projectListColumns;
                // 非项目组的 静态站点展示发布状态
                if (publishStatusTenantIdList.includes(this.currentTenantId)) {
                    this.columns = newVal === 'first' ? projectListColumns : projectUnlineListColumns;
                }

                this.onlineType = newVal === 'first' ? 1 : 0;

                if (this.currentTenantId) this.queryProjectList(true)
            },
            immediate: true
        },
        showPublishConfirmDialog: {
            handler(newVal) {
                if (!newVal) {
                    this.isPublishing = false
                }
            }
        }
    },
    computed: {
        ...mapState('tenant', ['currentTenantId']),

        // 项目类型 [1,2,3] 兼容基础活动
        projectTypes() {
            return [1, this.searchProjectType];
        },
        
    },
    components: {
        TopSearch,
        ConfigurableButton,
        ConfigurableTable,
        ConfigurableForm,
        CreateProDialog,
        LogDialog,
        PreviewDialog,
        ProjectDialog,
        SubProjectDialog,
        SubProjectCard,
        Toolbar: () => import('./components/toolbar'),
    },
    created() {
        this.init();
    },
    mounted() {
        this.initButtonOptions();
    },
    methods: {
        ...mapMutations('tenant', ['setCurrentTenantId']),
        ...mapActions('tenant', ['initMenusList']),
        showChartVisiable(props) {
            if (![1,2,3].includes(props.row.projectType) || publishStatusTenantIdList.includes(this.currentTenantId)) {
                return true;
            }
            return false;
        },
        initButtonOptions() {
            this.buttonOptions = [
                {
                    name: '新建项目',
                    onClick: () => {
                        this.onCreateProject();
                    }
                },

            ];
        },
        onCreateProject() {
            this.projectDialogState = null;
            this.projectDialogVisible = true;
        },
        async init() {
            await this.queryProjectList(true)
            this.configFormOptions();
        },
       
        gotoRouter(routerName, query, params) {
            this.$router.push({ name: routerName, query, params });
        },
        configFormOptions() {
            const { projectIdList, createNames } = this;
            this.formOptions = [
                {
                    type: 'el-input',
                    key: 'projectId',
                    label: '',
                    clearable:true,
                    props: {
                        placeholder: '项目ID',
                        onChange: (value) => { 
                            this.projectListFilter.projectId = value;
               
                        }
                    }
                },
                {
                    type: 'el-input',
                    key: 'createName',
                    clearable:true,
                    props: {
                        placeholder: '创建人',
                        onChange: (value) => { 
                            this.projectListFilter.createName = value;
                        }
                    }
                }
            ];
        },
        async queryProjectIdList() {
            let { Content } = await this.$http.queryProjectIdList();
            this.projectIdList = Content;
        },
        async queryCreateNameList() {
            let { Content } = await this.$http.queryCreateNameList();
            this.createNames = Content.createNames;
        },
        onSearch() {
            this.queryProjectList(true);
        },
        queryProjectList(isFirstPage = false) {
            if (isFirstPage) {
                this.pageIndex = 1;
            }
            const { projectId, createName, projectTypeTags, projectTypes } = this.projectListFilter;
            const { onlineType, pageIndex, pageSize } = this;
            const params = {
                projectId,
                createName,
                onlineType,
                pageNum: pageIndex,
                pageSize,
                projectTypes : projectTypes || [1, 100],
                projectTypeTags: projectTypeTags || [0, 100]
            };
            this.$http.queryProjectList(params).then(res => {
                const list = res.Content.pageList || [];
                list.forEach(row => {
                    row.subProjectList = [];
                }); // 为了后续行展开时视图可以立即更新，添加 subProjectList 字段
                this.tableData = list;
                this.total = res.Content.totalCount;
            });
        },
        onTabClick() { },
        onPageSizeChange() {
            this.queryProjectList(true);
        },
        onCurPageChange() {
            this.queryProjectList();
        },
        generateButtonOptions(row) {
            const {
                onEditProject,
                onCopyProject,
                publishProject,
                deleteProject,
                onChangeStatus,
                onQueryLog,
                onRepublsh,
                onPreviewProject
            } = this;
            let tableButtonOptions = [];
            const { projectTypeTag, projectId, projectType } = row
            if (this.activeTab === 'first') {
                if (projectTypeTag === 100) { //项目组
                    tableButtonOptions = [
                        { name: '添加版本', onClick: () => this.handleAddSubProject(row) },
                        {
                            name: '编辑',
                            style: 'marginLeft: 5px',
                            onClick: () => onEditProject(row)
                        }
                    ];
                    if (projectType === 100 || projectType === 102) { // 落地页支持
                        if (!publishStatusTenantIdList.includes(this.currentTenantId)) {
                            tableButtonOptions.push({
                                name: '打开链接',
                                style: 'marginLeft: 5px',
                                onClick: () => {
                                    window.open(`${ACT_URL}/view/${projectId}/1/?csr=true`)
                                }
                            })
                        }
                    }
                } else {
                    tableButtonOptions = [
                        { name: '预览', onClick: () => onPreviewProject(row) },
                        {
                            name: '编辑',
                            dropMenu: [
                                { name: '克隆', onClick: () => onCopyProject(row) },
                                { name: row.projectStatusId === 0 ? '禁用' : '启用', onClick: () => onChangeStatus(row) },
                                { name: '日志', onClick: () => onQueryLog(row) },
                                // { name: '重新生成', onClick: () => onRepublsh(row) }
                            ],
                            style: 'marginLeft: 5px',
                            onClick: () => onEditProject(row)
                        }
                    ];
                }
            } else {
                if (projectTypeTag === 100) { //项目组toFixed
                    tableButtonOptions = [
                        { name: '编辑', onClick: () => onEditProject(row) },
                        { name: '添加版本', onClick: () => this.handleAddSubProject(row) },
                        // { name: '删除', onClick: () => deleteProject(row) },
                    ];
                } else {
                    tableButtonOptions = [
                        { name: '预览', onClick: () => onPreviewProject(row) },
                        {
                            name: '编辑',
                            dropMenu: [
                                { name: '删除', onClick: () => deleteProject(row) },
                                { name: '发布', onClick: () => publishProject(row) },
                            ],
                            style: 'marginLeft: 5px',
                            onClick: () => onEditProject(row)
                        },
                    ];
                }
            }
            return tableButtonOptions;
        },
        getPagePropertiesObj(pageProperties) {
            let pagePropertiesObj = {};
            if (pageProperties && pageProperties.length > 0) {
                pageProperties.forEach(item => {
                    let { propertyName, propertyValue } = item;
                    pagePropertiesObj[propertyName] = propertyValue[propertyName];
                });
            }
            return pagePropertiesObj;
        },
        // 预览
        onPreviewProject(row) {
            let { activeTab } = this
            let { projectId, projectType, id: preId } = row
            switch (`${activeTab}_${projectType}`) {
                case 'first_1': // 已上线 运营活动
                case 'first_100':
                case 'first_101':
                case 'first_102': // 落地页和资源位
                if (publishStatusTenantIdList.includes(this.currentTenantId)) {
                        const domain = getDomainNameByTenantId[this.currentTenantId]
                        if (domain) {
                            Object.assign(this, {
                                previewDialogShow: true,
                                previewSrc: `http://${domain}/viewV2/${this.currentTenantId}/${projectId}/`
                            })
                        } else {
                            Object.assign(this, {
                                previewDialogShow: true,
                                previewSrc: `${ACT_URL}/viewV2/${this.currentTenantId}/${projectId}/?csr=true`
                            })
                        }
                    } else {
                        Object.assign(this, {
                            previewDialogShow: true,
                            previewSrc: `${ACT_URL}/view/${projectId}/1/?csr=true`
                        })
                    }
                    break
                case 'second_1': // 未上线 运营活动
                case 'second_100':
                case 'second_101':
                case 'second_102': // 落地页和资源位
                    if (publishStatusTenantIdList.includes(this.currentTenantId)) {
                        Object.assign(this, {
                            previewDialogShow: true,
                            previewSrc: `${ACT_URL}/viewV2/${this.currentTenantId}/${projectId}/?csr=true&preId=${preId}`
                        })
                    } else {
                        Object.assign(this, {
                            previewDialogShow: true,
                            previewSrc: `${ACT_URL}/preview/${projectId}/${preId}/1/?csr=true`
                        })
                    }
                    break
                
                default:
                    this.$message({ type: 'warning', message: '暂不支持此类型项目预览!!' })
                    break
            }
        },
        // 编辑项目 草稿或已上线
        onEditProject(row) {
            let pagePropertiesObj = this.getPagePropertiesObj(row.properties);
            let pagePropertyInfo = {
                activityID: pagePropertiesObj['activityID'] || 0
            };
            if (row.projectTypeTag === 0) { 
                this.dataSource = { ...row, ...pagePropertyInfo };
                this.showModal('showCreateProDialog'); // 基础项目 没有版本概念 旧的编辑弹窗
            } else if (row.projectTypeTag === 100) { 
                const { subProjectList, ...rest } = row; // 编辑项目并不需要 subProjectList 字段
                this.projectDialogState = { ...rest, ...pagePropertiesObj };
                this.projectDialogVisible = true;
            }
        },
        onSave(type) {
            let validateFlag = this.$refs['formRules'].validateForm();
            if (!validateFlag) {
                return false;
            }
            this.startCreateProject(type);
        },
        startCreateProject(type) {
            let { dataSource, onlineType } = this;
            let { projectId, id, url, projectType, activityID } = dataSource;
            let exttrackStr = JSON.stringify({ param25: `${projectId}` });
            let exttrackObj = Base64.encode(exttrackStr);
            let queryParams =
                url && url.indexOf('?') > 0
                    ? '&exttrack=${exttrackObj}'
                    : '?exttrack=${exttrackObj}';
            let selfUrl = `${ACT_URL}/${projectId}/?exttrack=${exttrackObj}`;
            let otherUrl = `${url}${queryParams}`;
            let fullUrl = projectType === 2 ? otherUrl : selfUrl;
            dataSource['properties'] = [
                {
                    propertyName: 'projectUrl',
                    propertyValue: {
                        projectUrl: fullUrl
                    }
                }
            ];
            if (projectType === 1) {
                dataSource['properties'].push({
                    propertyName: 'activityID',
                    propertyValue: {
                        activityID: activityID
                    }
                });
            }

            if (projectId) {
                dataSource['preId'] = onlineType === 0 ? id : null;
                this.$http.editProjectBasicInfo(dataSource).then(res => {
                    if (type === 1) {
                        this.$message.success('保存成功！');
                        this.closeModal('showCreateProDialog');
                        this.activeTab = 'second';
                        this.queryProjectList(true);
                    } else {
                        this.closeModal('showCreateProDialog');
                        this.queryProjectList(true);
                        let newpage = this.$router.resolve({
                            path: '/design',
                            query: {
                                projectId: res.Content.projectId,
                                preId: res.Content.preId,
                                type: this.activeTab === 'second' ? 'preEdit' : 'edit',
                                projectType,
                            }
                        });
                        window.open(newpage.href, '_blank');
                    }
                });
            } else {
                dataSource['projectDbInstanceIndex'] = 0;
                this.$http.createProject(dataSource).then(res => {
                    if (type === 1) {
                        this.$message.success('保存成功！');
                        if (projectType === 2) {
                            const params = res.Content;
                            this.$http.publishProject(params).then(res => {
                                this.closeModal('showCreateProDialog');
                                this.activeTab = 'third';
                            });
                        } else {
                            this.closeModal('showCreateProDialog');
                            this.activeTab = 'second';
                        }
                        this.queryProjectList(true);
                    } else {
                        this.closeModal('showCreateProDialog');
                        this.queryProjectList(true);
                        let newpage = this.$router.resolve({
                            path: '/design',
                            query: {
                                projectId: res.Content.projectId,
                                preId: res.Content.preId,
                                type: 'create',
                                projectType,
                            }
                        });
                        window.open(newpage.href, '_blank');
                    }
                });
            }
        },
        closeModal(type) {
            this[type] = false;
        },
        showModal(type) {
            this[type] = true;
        },
        onCopyProject(row) {
            let tempProjectInfo = {
                projectName: `${row.projectName}_副本`,
                projectDbInstanceIndex: 0
            };
            let params = { ...row, ...tempProjectInfo };
            this.$http.createProject(params).then(res => {
                Object.assign(this, {
                    copyProjectId: res.Content.projectId,
                    copyPreId: res.Content.preId
                });
                this.getEditProjectInfo(row);
            });
        },
        getEditProjectInfo(row) {
            const params = {
                projectId: row.projectId
            };
            this.$http.queryProject(params).then(res => {
                this.saveProject(res.Content);
            });
        },
        saveProject(copyProjectInfo) {
            const params = copyProjectInfo.pageList[0] && {
                ...copyProjectInfo.pageList[0],
                ...{
                    projectId: this.copyProjectId,
                    preId: this.copyPreId
                }
            };
            this.$http.saveProject(params).then(res => {
                this.$message.success('副本创建成功！');
                this.activeTab = 'second';
            });
        },
        onCanclePublish() {
            if (this.isPublishing) return
            this.showPublishConfirmDialog = false

        },
        onPublishConfirm() {
            if (this.isPublishing) return
            this.isPublishing = true
            this.publishProjectController(this.publishRow)
        },
        publishProject(row) {
            this.showPublishConfirmDialog = true
            this.publishRow = row
        },
        // 发布草稿项目
        publishProjectController(row) {
            const params = {
                projectId: row.projectId,
                preId: row.id
            };
            this.$http.publishProject(params).then(res => {
                if (publishStatusTenantIdList.includes(this.currentTenantId)) {
                    this.$message.success('请等待当前发布成功后再继续发布！！！');
                    this.pollingProjectPublishStatus(row)
                } else {
                    this.$message.success('发布成功！');
                    this.showPublishConfirmDialog = false
                    this.activeTab = 'first';
                }
            });
        },
        /**
         * 正常项目进行轮训发布状态
         * @param {*} projectId 
         */
        pollingProjectPublishStatus(row) {
            this.queryProjectListById(row)
        },
        /**
         * 根据projectid 轮询子项目项目
         * @param {*} projectId 
         */
        async queryProjectListById(row) {
            const { projectId } = row
            if(!projectId) return
            const { createName, projectTypeTags, projectTypes } = this.projectListFilter;
            const { onlineType, pageIndex, pageSize } = this;
            const params = {
                projectId,
                createName,
                onlineType,
                projectTypes : projectTypes || [1, 100],
                projectTypeTags: projectTypeTags || [0, 101],
                pageNum: pageIndex,
                pageSize
            };
            try {
                const res = await this.$http.queryProjectList(params)
                if (res.Content.pageList.length > 0) {
                    // 0-未发布 1-发布成功 2-发布中 3-发布失败
                    const { publishStatus } = res.Content.pageList[0]
                    if (row.projectType === 100) { 
                        row.publishStatus = publishStatus
                    } else {
                        this.tableData.map(item => {
                            if (item.projectId === projectId) {
                                item.publishStatus = publishStatus
                            }
                            return item
                        })
                    }
                    if (publishStatus === 1 || publishStatus === 3) return
                     setTimeout(() => {
                        this.$message.success('发布中！');
                        this.queryProjectListById(row)
                    }, 2000);
                } else {
                    this.activeTab = 'first'
                    this.$message.success('发布成功！');
                    this.showPublishConfirmDialog = false
                    this.queryProjectList()
                }
            } catch (error) {
                 setTimeout(() => {
                    this.queryProjectListById(row)
                }, 2000);
            }

    },
    // 删除草稿项目
    deleteProject(row) {
        this.$confirm(`此操作将永久删除该<span style="color:red;">《${row.projectName}》</span>项目, 是否继续?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            dangerouslyUseHTMLString: true
        }).then(() => {
            let params = {
                projectId: row.projectId,
                preId: row.id
            }
            this.$http.deleteProject(params).then(res => {
                this.$message.success('删除成功！');
                this.queryProjectList()
            })
        })
    },
    // 禁用已上线项目
    onChangeStatus(row) {
        let $html = row.projectStatusId === 0
            ? '禁用此项目可能造成严重资损，确定要禁用么?'
            : '启用后立即生效，确定要启用么'
        this.$confirm($html, '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let params = {
                id: row.id,
                projectId: row.projectId,
                opType: row.projectStatusId === 0 ? -1 : 0
            }
            this.$http.doProjectStatus(params).then(res => {
                this.$message.success('操作成功！');
                this.queryProjectList()
            })
        })
    },
    // 查看已上线日志
    onQueryLog(row) {
        this.$http.queryPublishLog({
            projectId: row.projectId
        })
            .then(res => {
                this.logTableData = res.Content.publishLogList || [];
                this.showModal('showLogDialog');
            })
    },
    // 重新发布已上线项目
    onRepublsh(row) {
        this.$confirm('确认重新发布该项目么?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let params = {
                projectIds: [row.projectId]
            }
            this.$http.republishProjects(params)
                .then(res => {
                    this.$message.success('重新发布成功！');
                    this.queryProjectList()
                })
        })
    },
    // 神笔 查询版本列表
    async queryItemsOnGroup(row, expandedRows) {
        const expanded = expandedRows.some(item => item.id === row.id); // true-行展开, false-行收起
        if (!expanded || !row.itemsCount) return; // 行收起、版本数量为0
        const params = {
            projectId: row.projectId,
            onlineType: this.onlineType
        };
        const { Result, Content } = await this.$http.queryItemsOnGroup(params);
        if (Result === 200) {
            row.subProjectList = Content;
        }
    },
    // 项目保存成功的回调
    handleSubmitSuccessCb() {
        this.activeTab = 'second';
        this.queryProjectList(true);
    },
    // 新增/编辑版本
    showSubProjectDialog(defaultState, action = "add") {
        this.subProjectDialogAction = action;
        this.subProjectDialogState = defaultState;
        this.subProjectDialogVisible = true;
    },
    // 添加版本
    handleAddSubProject(row) {
        const { projectId, projectType, properties } = row;
        const propertyActivityID = properties.find(item => item.propertyName === 'activityID');
        const defaultState = {
            parentProjectId: projectId,
            projectType,
            properties: [propertyActivityID]
        };
        this.showSubProjectDialog(defaultState);
    }
}
};
</script>

<style lang="less">
@import '../../../assets/less/base/mixins.less';
.home {
    .main {
        .setFlexPos(row, space-between, center);
    }

    .right {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
    }

    .pagination {
        margin: 20px auto;
        text-align: center;
    }
}

</style>
