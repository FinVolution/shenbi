<template>
    <el-dialog
        :title="isEdit ? '编辑项目' : '新建项目'"
        :visible="visible"
        :close-on-click-modal="false"
        @close="handleClose"
        width="600px"
    >
        <el-form
            ref="ruleForm"
            :model="formState"
            :rules="rules"
            size="mini"
            label-width="120px"
            label-suffix=":"
        >
            <el-form-item label="项目类型" prop="projectType">
                <el-select
                    v-model="formState.projectType"
                    placeholder="请选择项目类型"
                    style="width: 400px"
                    :disabled="isEdit"
                >
                    <el-option
                        v-for="item in projectTypeOptions"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目名称" prop="projectName">
                <el-input
                    v-model="formState.projectName"
                    placeholder="请输入项目名称"
                    style="width: 400px"
                ></el-input>
            </el-form-item>
            <el-form-item label="随机数" prop="productTag">
                <el-input
                    v-model="formState.productTag"
                    placeholder="请输入非中文字符(用于用户随机数)"
                    style="width: 400px"
                ></el-input>
            </el-form-item>
            <el-form-item label="活动ID" prop="activityID">
                <el-input
                    v-model="formState.activityID"
                    placeholder="请输入活动ID（无请填0）"
                    style="width: 400px"
                ></el-input>
            </el-form-item>
            <el-form-item label="项目开始时间" prop="projectStartTime">
                <el-date-picker
                    type="datetime"
                    v-model="formState.projectStartTime"
                    placeholder="请选择项目开始时间"
                    style="width: 400px"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="项目结束时间" prop="projectEndTime">
                <el-date-picker
                    type="datetime"
                    v-model="formState.projectEndTime"
                    placeholder="请选择项目结束时间"
                    style="width: 400px"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="项目描述" prop="projectDesc">
                <el-input
                    type="textarea"
                    v-model="formState.projectDesc"
                    placeholder="请输入项目描述"
                    rows="3"
                    style="width: 400px"
                ></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button type="primary" size="mini" @click="handleSubmit">保存</el-button>
            <el-button type="primary" size="mini" @click="handleSubmit(showSubProjectDialog)">
                添加版本
            </el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import _ from 'lodash';
import { projectTypeOptionsV2 as projectTypeOptions, projectO2OTypeOptions } from '@/common/const';
import { fomatDate } from '@/utils';

const DEFAULT_FORM_STATE = {
    projectName: '',
    projectStartTime: fomatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    projectEndTime: '2038-01-01 23:59:59',
    projectType: 100, // 100-落地页, 101-资源位, 102-弹窗
    activityID: '',
    projectDesc: '',
    projectTypeTag: 100, // 项目类型标记 0-基础项目(默认) 100-项目组 101-项目组子项目
    productTag: '', // 产品ID
    iViewID: 0, // 项目组IViewId
    diffIViewID: 0, // 项目组成交IViewId
};

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        dataSource: {
            type: Object,
            default: () => null
        },
        // 0-未上线项目，1-已上线项目
        onlineType: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            projectTypeOptions,
            rules: {
                projectType: [{ required: true, message: '请选择项目类型', trigger: 'change' }],
                projectName: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度不能超过100个字符', trigger: 'blur' }
                ],
                activityID: [{ required: true, message: '请输入活动id', trigger: 'blur' }],
                projectStartTime: [
                    { required: true, message: '请选择日期时间', trigger: 'change' }
                ],
                projectEndTime: [{ required: true, message: '请选择日期时间', trigger: 'change' }],
                productTag: [
                    { required: true, message: '请输入产品id', trigger: 'blur' },
                    { pattern: /^[^\u4e00-\u9fa5]+$/, message: '请输入非中文字符', trigger: 'change' },
                ],
                iViewID: [
                    { required: false, message: '请输入iviewid', trigger: 'blur' },
                    { pattern: /^[0-9]*$/, message: '请输入数字', trigger: 'change' }
                ],
                diffIViewID: [
                    { required: false, message: '请输入diffIviewid', trigger: 'blur' },
                    { pattern: /^[0-9]*$/, message: '请输入数字', trigger: 'change' }
                ]
            },
            formState: _.cloneDeep(DEFAULT_FORM_STATE)
        };
    },
    watch: {
        currentTenantId: {
            handler(val) {
                this.projectTypeOptions = projectTypeOptions;
            },
            deep: true,
            immediate: true
        },
        dataSource: {
            handler(val) {
                if (val) {
                    this.formState = _.cloneDeep(val);
                } else {
                    this.formState = _.cloneDeep(DEFAULT_FORM_STATE);
                }
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        ...mapState('tenant', ['currentTenantId']),
        isEdit() {
            return !!this.dataSource?.projectId;
        },
        properties() {
            return [
                {
                    propertyName: 'activityID',
                    propertyValue: {
                        activityID: this.formState?.activityID,
                    }
                },
                {
                    propertyName: 'productTag',
                    propertyValue: {
                        productTag: this.formState?.productTag,
                    }
                },
                {
                    propertyName: 'iViewID',
                    propertyValue: {
                        iViewID: this.formState?.iViewID,
                    }
                },
                {
                    propertyName: 'diffIViewID',
                    propertyValue: {
                        diffIViewID: this.formState?.diffIViewID,
                    }
                }
            ];
        }
    },
    methods: {
        handleSubmit(callback) {
            this.$refs['ruleForm'].validate(async valid => {
                if (!valid) return false;
                const res = this.isEdit
                    ? await this.handleEditSubmit()
                    : await this.handleAddSubmit();
                this.$message.success('保存成功！');
                this.$emit('update:visible', false);
                this.$emit('reloadTableData');
                if (typeof callback === 'function' && res) {
                    callback(res);
                }
                this.$refs['ruleForm'].resetFields();
            });
        },
        async handleAddSubmit() {
            const params = {
                ...this.formState,
                properties: this.properties,
                parentProjectId: null,
                projectTypeTag: 100,
                projectDbInstanceIndex: 0
            };
            const { Result, Content } = await this.$http.createProject(params);
            if (Result === 200) return Content;
        },
        async handleEditSubmit() {
            const params = {
                ...this.formState,
                properties: this.properties,
                preId: this.onlineType === 0 ? this.formState.id : null
            };
            const { Result, Content } = await this.$http.editProjectBasicInfo(params);
            if (Result === 200) return Content;
        },
        // 展示创建版本弹窗
        showSubProjectDialog({ projectId }) {
            const defaultState = {
                parentProjectId: projectId,
                projectType: this.formState.projectType,
                properties: this.properties
            };
            this.$emit('showSubProjectDialog', defaultState);
        },
        handleClose() {
            this.$emit('update:visible', false);
            this.$refs['ruleForm'].resetFields();
        }
    }
};
</script>
