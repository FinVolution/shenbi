<template>
    <el-dialog
        :title="`${action === 'add' ? '新建' : '编辑'}版本`"
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
            <el-form-item label="版本名称" prop="versionName">
                <el-input
                    v-model="formState.versionName"
                    placeholder="请输入版本名称"
                    style="width: 400px"
                ></el-input>
            </el-form-item>
            <!-- 资源位 -->
            <template v-if="dataSource && dataSource.projectType === 101">
                <el-form-item label="资源类型" prop="resourceType">
                    <el-select
                        v-model="formState.resourceType"
                        placeholder="请选择资源类型"
                        style="width: 400px"
                    >
                        <el-option
                            v-for="item in resourceTypeOptions"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <template v-slot:label>
                        <span class="label-required">关联已有资源</span>
                    </template>
                    <el-col :span="17">
                        <el-form-item prop="resourceUrl" style="margin-bottom:0">
                            <el-input
                                v-model="formState.resourceUrl"
                                placeholder="请输入url或上传图片"
                                style="width: 100%"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-form-item style="margin-bottom:0">
                            <el-upload
                                ref="upload"
                                :show-file-list="false"
                                :multiple="false"
                                :headers="uploadCasHeaders"
                                :http-request="handleUpload"
                                action=""
                            >
                                <el-button type="primary" size="mini">上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="资源位ID" prop="resourceLocationId">
                    <el-input
                        v-model="formState.resourceLocationId"
                        placeholder="请输入资源位ID"
                        style="width: 400px"
                    ></el-input>
                </el-form-item>
                <el-form-item label="创意ID" prop="creativeIdeaId">
                    <el-input
                        v-model="formState.creativeIdeaId"
                        placeholder="请输入创意ID"
                        style="width: 400px"
                    ></el-input>
                </el-form-item>
            </template>
            <!-- 落地页、弹窗 -->
            <template v-else>
                <el-form-item label="产品ID" prop="productId">
                    <el-input
                        v-model="formState.productId"
                        placeholder="只能由英文字母和数字组成，长度不超过20个字符"
                        style="width: 400px"
                    ></el-input>
                </el-form-item>
               
                <el-form-item label="最小值" prop="min">
                    <el-input-number
                        v-model="formState.min"
                        :precision="2"
                        :step="0.1"
                        :min="0"
                        :max="1"
                        placeholder="动态随机数"
                        style="width: 400px"
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="最大值" prop="max">
                    <el-input-number
                        v-model="formState.max"
                        :precision="2"
                        :step="0.1"
                        :min="0"
                        :max="1"
                        placeholder="动态随机数"
                        style="width: 400px"
                    ></el-input-number>
                </el-form-item>
            </template>
        </el-form>
        <span slot="footer">
            <el-button type="primary" size="mini" @click="handleSubmit">保存</el-button>
            <el-button type="primary" size="mini" @click="handleSubmit(goToDesign)">开始编辑</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import _ from 'lodash';
import { resourceTypeOptions } from '@/common/const';
import { API_APP_ID } from '@/common/const';
import OSSClient from '@/utils/ossUpload';
import { fomatDate } from '@/utils';

const DEFAULT_FORM_STATE = {
    versionName: '',
    productId: '',
    min: 0,
    max: 1,
    iviewid: '',
};
// 资源位类型
const DEFAULT_FORM_STATE_RESOURCE = {
    versionName: '',
    resourceType: 0,
    resourceUrl: '',
    resourceLocationId: '',
    creativeIdeaId: '',
    iviewid: '',
};

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        action: {
            type: String,
            default: 'add'
        },
        dataSource: {
            type: Object,
            default: () => null
        },
        onlineType: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            rules: {
                versionName: [
                    { required: true, message: '请输入版本名称', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度不能超过100个字符', trigger: 'blur' }
                ],
                productId: [
                    { required: true, message: '请输入产品ID', trigger: 'blur' },
                    { pattern: /^[a-z0-9]+$/i, message: '只能由英文字母和数字组成', trigger: 'change' },
                    { min: 1, max: 20, message: '长度不能超过20个字符', trigger: 'change' },
                ],
                max: [
                    { required: true, message: '请输入最大值', trigger: 'blur' },
                    { type: 'number', message: '请输入数字' }
                ],
                min: [
                    { required: true, message: '请输入最小值', trigger: 'blur' },
                    { type: 'number', message: '请输入数字' }
                ],
                resourceType: [{ required: true, message: '请选择资源类型', trigger: 'change' }],
                resourceUrl: [{ required: true, message: '请关联已有资源', trigger: 'change' }],
                resourceLocationId: [
                    { required: true, message: '请输入资源位ID', trigger: 'blur' }
                ],
                creativeIdeaId: [{ required: true, message: '请输入创意ID', trigger: 'blur' }]
            },
            formState: _.cloneDeep(DEFAULT_FORM_STATE),
            resourceTypeOptions,
            client: null,
            uploadCasHeaders: {}
        };
    },
    watch: {
        visible: {
            handler(val) {
                if (!val) return;
                this.setDefaultFormState();
            },
            immediate: true
        }
    },
    computed: {
        ...mapState('tenant', ['currentTenantId']),
        ...mapState('oss', ['content']),

        properties() {
            const newProperties = _.cloneDeep(this.dataSource.properties);
            if (this.action === 'add') {
                // 新增，往 properties 里添加一项 projectMain
                newProperties.push({
                    propertyName: 'projectMain',
                    propertyValue: this.formState
                });
            } else {
                // 编辑，修改 properties 的 projectMain
                for (let item of newProperties) {
                    if (item.propertyName === 'projectMain') {
                        item.propertyValue = this.formState;
                    }
                }
            }
            return newProperties;
        }
    },
    methods: {
        ...mapActions('oss', ['initOssToken']),
        setDefaultFormState() {
            if (this.action === 'add') {
                const state =
                    this.dataSource.projectType === 101
                        ? DEFAULT_FORM_STATE_RESOURCE
                        : DEFAULT_FORM_STATE;
                this.formState = _.cloneDeep(state);
            } else {
                const propertyValue = this.dataSource.properties.find(
                    item => item.propertyName === 'projectMain'
                )?.propertyValue;
                this.formState = _.cloneDeep(propertyValue);
            }
        },
        handleSubmit(callback) {
            this.$refs['ruleForm'].validate(async valid => {
                if (!valid) return false;
                const res =
                    this.action === 'add'
                        ? await this.handleAddSubmit()
                        : await this.handleEditSubmit();
                this.$message.success('保存成功！');
                this.$emit('update:visible', false);
                this.$emit('reloadTableData');
                if (typeof callback === 'function' && res) {
                    callback(res);
                }
            });
        },
        async handleAddSubmit() {
            const params = {
                ...this.dataSource,
                projectName: this.formState.versionName,
                properties: this.properties,
                projectTypeTag: 101,
                projectStartTime: fomatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                projectEndTime: '2038-01-01 23:59:59',
                projectDesc: '',
                projectDbInstanceIndex: 0
            };
            const { Result, Content } = await this.$http.createProject(params);
            if (Result === 200) return Content;
        },
        async handleEditSubmit() {
            const params = {
                ...this.dataSource,
                properties: this.properties,
                preId: this.onlineType === 0 ? this.dataSource.id : null
            };
            const { Result, Content } = await this.$http.editProjectBasicInfo(params);
            if (Result === 200) return Content;
        },
        goToDesign({ projectId, preId }) {
            // 资源位
            if (this.dataSource.projectType === 101) {
                return this.$message({ type: 'warning', message: '暂不支持此类型编辑!!' });
            }
            // 弹窗
            if (this.dataSource.projectType === 102) {
                // onlineType 0-未上线项目，1-已上线项目
                const type =
                    this.action === 'add' ? 'create' : this.onlineType === 0 ? 'preEdit' : 'edit';
                const editType = this.dataSource.editType
                const newpage = this.$router.resolve({
                    path: editType === 2 ? '/designPlus' : '/designDialog',
                    query: {
                        projectId,
                        preId,
                        type,
                        projectType: this.dataSource.projectType,
                        tenantId: this.currentTenantId
                    }
                });
                window.open(newpage.href, '_blank');
            }
            // 落地页
            if (this.dataSource.projectType === 100) {
                // onlineType 0-未上线项目，1-已上线项目
                const type =
                    this.action === 'add' ? 'create' : this.onlineType === 0 ? 'preEdit' : 'edit';
                const editType = this.dataSource.editType
                const newpage = this.$router.resolve({
                    path: editType === 2 ? '/designPlus' : '/design',
                    query: {
                        projectId,
                        preId,
                        type,
                        projectType: this.dataSource.projectType,
                        tenantId: this.currentTenantId
                    }
                });
                window.open(newpage.href, '_blank');
            }
        },
        handleClose() {
            this.$emit('update:visible', false);
        },
        async handleUpload(file) {
            await this.initOssToken()
            this.client = new OSSClient('xxx/uploadImages', this.content)
            this.client.ossUpload(file).then(
                res => {
                    this.formState.resourceUrl = res.url;
                    this.$message.success('上传成功');
                },
                error => {
                    this.$message({
                        type: 'error',
                        message: error
                    });
                }
            );
        }
    }
};
</script>

<style lang="less" scoped>
.label-required::before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
}
</style>
