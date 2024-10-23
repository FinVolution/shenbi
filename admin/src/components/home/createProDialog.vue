<template>
<el-dialog :title="dataSource.projectId ? '编辑项目':'新建项目'" :visible="showCreateProDialog" width="600px" @close="closeModal" :close-on-click-modal="false">
    <el-form :model="dataSource" ref="ruleForm" :rules="rules" size="mini" label-width="120px" label-suffix=":">
        <el-form-item label="项目类型" prop="projectType">
            <el-select v-model="dataSource.projectType" placeholder="请选择项目类型" size="mini" style="width: 400px;" :disabled="dataSource.projectId?true:false">
                <el-option v-for="item in typeOptions" :value="item.value" :label="item.label"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="dataSource.projectName" placeholder="请输入项目名称" size="mini" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item v-if="dataSource.projectType === 1" label="活动ID" prop="activityID">
            <el-input v-model="dataSource.activityID" placeholder="请输入活动ID" size="mini" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item v-if="dataSource.projectType === 2" label="项目url" prop="url">
            <el-input type="textarea" rows="3" v-model="dataSource.url" placeholder="请输入项目url" size="mini" style="width: 400px;"></el-input>
        </el-form-item>
        <template v-else>
            <el-form-item label="项目开始时间" prop="projectStartTime">
                <el-date-picker type="datetime" v-model="dataSource.projectStartTime" placeholder="请选择项目开始时间" size="mini" style="width: 400px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="项目结束时间" prop="projectEndTime">
                <el-date-picker type="datetime" v-model="dataSource.projectEndTime" placeholder="请选择项目结束时间" size="mini" style="width: 400px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="项目描述" prop="projectDesc">
                <el-input type="textarea" v-model="dataSource.projectDesc" placeholder="请输入项目描述" rows="3" size="mini" style="width: 400px;"></el-input>
            </el-form-item>
        </template>
    </el-form>
    <slot slot="footer" name="btn-area"></slot>
</el-dialog>
</template>

<script>
import ConfigurableForm from '~/basePlus/ConfigurableForm'
import { projectTypeOptions, projectO2OTypeOptions } from '@/common/const'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            formOptions: [],
            typeOptions:[],
            rules: {
                projectType: [{ required: true, message: '请选择项目类型', trigger: 'change' }],
                projectName: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度不能超过100个字符', trigger: 'blur' }
                ],
                activityID: [{ required: true, message: '请输入活动id', trigger: 'blur' }],
                url: [{ required: true, message: '请输入项目url', trigger: 'blur' }],
                projectStartTime: [{ required: true, message: '请选择日期时间', trigger: 'change' }],
                projectEndTime: [{ required: true, message: '请选择日期时间', trigger: 'change' }],
            },
        }
    },
    props: {
        dataSource: Object,
        showCreateProDialog: Boolean,
        closeModal: Function,
        refresh: Function,
    },
    components: {
        ConfigurableForm
    },
    created() {
        // this.configFormOptions()
        this.typeOptions = projectTypeOptions
    },
    watch: {
      currentTenantId:{
        deep: true,
        handler: function(val){
            if (val === 'o2o') {
                this.typeOptions = projectO2OTypeOptions
            } else {
                this.typeOptions = projectTypeOptions
            }
            this.configFormOptions()
        }
      },
    },
    computed: {
        ...mapState('tenant', ['menus', 'currentTenantId', 'currentTenantName'])
    },
    methods: {
        validateForm() {
            let validateFlag = null
            this.$refs['ruleForm'].validate(valid => {
                validateFlag = valid ? true : false
            })
            return validateFlag
        },
        configFormOptions() {
            this.formOptions = [
                {
                    type: 'el-select',
                    label: '项目类型',
                    key: 'projectType',
                    props: {
                        placeholder: '请选择项目类型',
                        options: this.typeOptions,
                        onChange: () => {}
                    }
                },
                {
                    type: 'el-input',
                    label: '项目名称',
                    key: 'projectName',
                    props: {
                        placeholder: '请输入项目名称',
                        clearable: true,
                        onChange: () => {}
                    }
                },
                {
                    type: 'el-date-picker',
                    label: '项目开始时间',
                    key: 'projectStartTime',
                    props: {
                        placeholder: '请选择项目开始时间',
                        clearable: true,
                        onChange: () => {}
                    }
                },
                {
                    type: 'el-date-picker',
                    label: '项目结束时间',
                    key: 'projectStartTime',
                    props: {
                        placeholder: '请选择项目结束时间',
                        clearable: true,
                        onChange: () => {}
                    }
                },
                {
                    type: 'el-textarea-input',
                    label: '项目描述',
                    key: 'projectDesc',
                    props: {
                        placeholder: '请输入项目描述',
                        clearable: true,
                        onChange: () => {},
                        rows: 3
                    }
                }
            ]
        }
    }
}
</script>