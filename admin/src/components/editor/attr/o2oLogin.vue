<template>
    <div class="component-turntable">
        <div class="form-group config-title-outer">
            <span class="config-title">按钮文案:</span>
            <input type="text" v-model="applyButtonText" class="tool-input"
                @input="updatePropertyAttr('applyButtonText', 'applyButtonText')" style="width:240px" />
        </div>
        <div class="form-group config-title-outer">
            <span class="config-title">协议文案:</span>
            <input type="text" v-model="protocalText" class="tool-input"
                @input="updatePropertyAttr('protocalText', 'protocalText')" style="width:240px" />
        </div>
        <div class="form-group config-title-outer">
            <span class="config-title">协议链接:</span>
            <input type="text" v-model="protocalLinkUrl" class="tool-input"
                @input="updatePropertyAttr('protocalLinkUrl', 'protocalLinkUrl')" style="width:240px" />
        </div>
        <div class="form-group config-title-outer">
            <span class="config-title">登录成功链接:</span>
            <input type="text" v-model="loginRedirectUrl" class="tool-input"
                @input="updatePropertyAttr('loginRedirectUrl', 'loginRedirectUrl')" style="width:230px" />
        </div>
        <div class="form-group config-title-outer">
            <span class="config-title">注册成功链接:</span>
            <input type="text" v-model="reigsterRedirectUrl" class="tool-input"
                @input="updatePropertyAttr('reigsterRedirectUrl', 'reigsterRedirectUrl')" style="width:230px" />
        </div>
        <div class="form-group config-title-outer">
            <span class="config-title">分布注册开关:</span>
            <el-switch v-model="switchSubstep" @input="onStepLoginSwitchChange" active-text="开" inactive-text="关">
            </el-switch>
        </div>
        
        <div class="form-group config-title-outer">
            <span class="config-title">切换老版本UI:</span>
            <el-switch v-model="switchOldVersion" @input="updatePropertyAttr('switchOldVersion', 'switchOldVersion')" active-text="开" inactive-text="关">
            </el-switch>
        </div>
        <div class="form-group config-title-outer">
            <span class="config-title">是否开启挽留弹窗:</span>
            <el-switch v-model="retainPopAvailable" @input="updatePropertyAttr('retainPopAvailable', 'retainPopAvailable')" active-text="开" inactive-text="关">
            </el-switch>
        </div>
        <div class="form-group config-title-outer">
            <span class="config-title">表单配置</span>
            <span class="tool-input-plus el-icon-plus" @click.stop="onplusClick()"></span>
        </div>

        <draggable v-model="applyInfoForm" group="cplistForChose" @start="drag = true" @end="onDragEnd">
            <transition-group>
                <div class="form-group config-title-outer" v-for="(item, index) in applyInfoForm" :key="index">
                    <div class="form-content-wrap">
                      <div class="is-hidden">
                        <div class="link-input ">
                          <span class="label">是否隐藏:</span>
                          <el-switch  class="tool-input" style="width:200px;margin-left:12px;" v-model="item.isHidden" @input="updatePropertyAttr('applyInfoForm', 'applyInfoForm')" active-text="是" inactive-text="否">
                          </el-switch>
                        </div>
                      </div>
                      <template v-if="!item.isHidden">
                        <div class="form-content inner-container">
                          <div class="form-item ">
                            <span>表单名称：</span>
                            <input type="text" v-model="item.name" class="tool-input"
                                   @input="updatePropertyAttr('applyInfoForm', 'applyInfoForm')" style="width:200px" />

                          </div>
                          <div class="link-input ">
                            <span>表单占位：</span>
                            <input type="text" v-model="item.hint" class="tool-input"
                                   @input="updatePropertyAttr('applyInfoForm', 'applyInfoForm')" style="width:200px" />
                          </div>
                          <div class="link-input ">
                            <span >是否脱敏:</span>
                            <el-switch  class="tool-input" style="width:200px;margin-left:12px;" v-model="item.desensitization" @input="updatePropertyAttr('applyInfoForm', 'applyInfoForm')" active-text="是" inactive-text="否">
                            </el-switch>
                          </div>
                          <div class="link-input ">
                            <span>后端字段：</span>
                            <input type="text" v-model="item.key" class="tool-input"
                                   @input="updatePropertyAttr('applyInfoForm', 'applyInfoForm')" style="width:200px" />
                          </div>
                          <div class="link-input ">
                            <span>校验规则：</span>
                            <input type="text" v-model="item.reg" class="tool-input"
                                   @input="updatePropertyAttr('applyInfoForm', 'applyInfoForm')" style="width:120px" />
                            <el-select v-model="item.reg" size="mini" style="width:110px"
                                       @change="updatePropertyAttr('applyInfoForm', 'applyInfoForm')" :placeholder="'请选择'">
                              <el-option v-for="option in formItemReg" :key="option.value" :label="option.label"
                                         :value="option.value" />
                            </el-select>
                          </div>
                          <div class="link-input ">
                            <span>表单类型：</span>
                            <el-select v-model="item.type" size="mini" style="width:200px"
                                       @change="updatePropertyAttr('applyInfoForm', 'applyInfoForm')" :placeholder="'请选择'">
                              <el-option v-for="option in formItemType" :key="option.value" :label="option.label"
                                         :value="option.value" />
                            </el-select>
                          </div>
                          <div class="link-input" v-if="item.type === 'address'">
                            <span>是否配置城市：</span>
                            <el-select v-model="item.needConfigCity" size="mini" style="width:200px" placeholder='请选择'>
                              <el-option :value="1" label="是">是</el-option>
                              <el-option :value="0" label="否">否</el-option>
                            </el-select>
                          </div>
                          <div class="link-input" v-if="item.needConfigCity">
                            <span>配置城市：</span>
                            <CityList :selected="item.configCities" @selectCities="(val) => addCityConfig(item, val)" />
                          </div>
                          <div class="link-input">
                            <span>输入类型：</span>
                            <input type="text" v-model="item.inputType" class="tool-input"
                                   @input="updatePropertyAttr('applyInfoForm', 'applyInfoForm')" style="width:120px" />
                            <el-select v-model="item.inputType" size="mini" style="width:110px"
                                       @change="updatePropertyAttr('applyInfoForm', 'applyInfoForm')" :placeholder="'请选择'">
                              <el-option v-for="option in formItemInputType" :key="option.value" :label="option.label"
                                         :value="option.value" />
                            </el-select>
                          </div>
                          <span class="tool-input-minus el-icon-minus" @click.stop="onMinusClick(item, index)"></span>
                        </div>
                      </template>
                      <template v-else>
                        <div class="form-content inner-container">
                          <div class="link-input ">
                            <span>表单类型：</span>
                            <el-select v-model="item.type" size="mini" style="width:200px"
                                       @change="updatePropertyAttr('applyInfoForm', 'applyInfoForm')" :placeholder="'请选择'">
                              <el-option v-for="option in formItemType" :key="option.value" :label="option.label"
                                         :value="option.value" />
                            </el-select>
                          </div>
                          <div class="link-input" v-if="item.type !== 'address'">
                            <span>后端字段：</span>
                            <input type="text" v-model="item.key" class="tool-input"
                                   @input="updatePropertyAttr('applyInfoForm', 'applyInfoForm')" style="width:200px" />
                          </div>
                          <div class="link-input" v-if="item.type !== 'address'">
                            <span>默认值：</span>
                            <input type="text" v-model="item.defaultValue" class="tool-input"
                                   @input="updatePropertyAttr('applyInfoForm', 'applyInfoForm')" style="width:200px" />
                          </div>
                          <div class="form-item " v-if="item.type === 'address'">
                            <div class="form-item " v-if="item.type === 'address'">
                              <span>省份名：</span>
                              <input type="text" v-model="item.province" class="tool-input"
                                     @input="updatePropertyAttr('applyInfoForm', 'applyInfoForm')" style="width:200px" />

                            </div>
                            <span>省份code：</span>
                            <input type="text" v-model="item.provinceCode" class="tool-input"
                                   @input="updatePropertyAttr('applyInfoForm', 'applyInfoForm')" style="width:200px" />

                          </div>
                          <div class="form-item " v-if="item.type === 'address'">
                            <span>城市名：</span>
                            <input type="text" v-model="item.city" class="tool-input"
                                   @input="updatePropertyAttr('applyInfoForm', 'applyInfoForm')" style="width:200px" />

                          </div>
                          <div class="form-item " v-if="item.type === 'address'">
                            <span>城市code：</span>
                            <input type="text" v-model="item.cityCode" class="tool-input"
                                   @input="updatePropertyAttr('applyInfoForm', 'applyInfoForm')" style="width:200px" />

                          </div>
                        </div>
                      </template>
                    </div>
                </div>
            </transition-group>
        </draggable>

    </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import draggable from 'vuedraggable'
import CityList from '../../../../../common/o2o/cityList/index.vue'
export default {
    data() {
        return {
            drag: false,
            switchSubstep: false,
            switchOldVersion: false,
            retainPopAvailable: false,
            defaultHeight: 270,
            protocalText: '',
            protocalLinkUrl: '',
            applyInfoForm: [],
            reigsterRedirectUrl: '',
            loginRedirectUrl: '',
            applyButtonText: '',
            formItemType: [
                {
                    value: 'textInput',
                    label: '输入框'
                },
                {
                    value: 'address',
                    label: '地址框'
                },
                {
                    value: 'selectInput',
                    label: '选择框'
                }
            ],
            formItemReg: [
                {
                    value: '^[\u4E00-\u9FA5A-Za-z0-9]+$',
                    label: '中英文数字校验'
                },
                {
                    value: '^[A-Za-z0-9]+$',
                    label: '字母数字校验'
                },
                {
                    value: '^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$',
                    label: '小数点两位'
                },
                {
                    value: '(^[0-9]{3,4}[0-9]{7,8}$)|(^[0-9]{3,4}\\-[0-9]{7,8}$)|(^1[34578][0-9]{9}$)',
                    label: '手机号校验'
                },
                {
                    value: '^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$',
                    label: '身份证校验'
                },
                {
                    value: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$',
                    label: '邮箱校验'
                },
            ],
            formItemInputType: [
                {
                    value: 'tel',
                    label: '数字'
                },
                {
                    value: 'text',
                    label: '文本'
                },
            ],
        }
    },
    watch: {
        componentProperty: {
            handler: function (property) {
                Object.assign(this, {
                    switchSubstep: property['switchSubstep'] || false,
                    switchOldVersion: property['switchOldVersion'] || false,
                    retainPopAvailable: property['retainPopAvailable'] || false,
                    protocalText: property['protocalText'] || '',
                    applyButtonText: property['applyButtonText'] || '',
                    protocalLinkUrl: property['protocalLinkUrl'] || '',
                    applyInfoForm: property['applyInfoForm'] || [],
                    reigsterRedirectUrl: property['reigsterRedirectUrl'] || [],
                    loginRedirectUrl: property['loginRedirectUrl'] || [],
                    defaultHeight: property['switchSubstep'] ? 200 : 270
                })
            },
            deep: true,
            immediate: true,
        },
    },
    components: {
        draggable,
        CityList
    },
    computed: {
        ...mapGetters('editor', ['componentProperty'])
    },
    methods: {
        ...mapMutations('editor', ['changeComponentAttr']),
        updatePropertyAttr(attrKey, dataKey) {
            this.changeComponentAttr({
                key: 'property',
                newConfig: { [attrKey]: this[dataKey] }
            })
        },
        onplusClick() {
            this.applyInfoForm.push({
                data: null,
                hint: "",
                inputType: "",
                key: `key${this.applyInfoForm.length}`,
                maxLength: 100,
                maxValue: "",
                minLength: 1,
                minValue: "",
                modify: true,
                name: "",
                reg: "",
                required: true,
                desensitization: false,
                isHidden: false,
                type: "textInput",
                unit: "",
                cityCode: '',
                provinceCode: '',
                city: '',
                province: '',
                defaultValue: ''
            })
            this.updateStyleAttr()
        },
        updateStyleAttr() {
            const height = this.defaultHeight + ((this.applyInfoForm.length - 1) * 70)
            this.changeComponentAttr({ key: 'containerStyle', newConfig: { 'height': height } })
            this.changeComponentAttr({ key: 'selfStyle', newConfig: { 'height': height } })
        },
        onMinusClick(item, index) {
            this.applyInfoForm.splice(index, 1)
            this.updateStyleAttr()
        },
        onStepLoginSwitchChange(val) {
            this.updatePropertyAttr('switchSubstep', 'switchSubstep')
            if (val) {
                this.defaultHeight -= 70
            } else {
                this.defaultHeight += 70
            }
            this.updateStyleAttr()
        },
        onDragEnd() {
            this.drag = false;
            this.updatePropertyAttr('applyInfoForm', 'applyInfoForm')
        },
        addCityConfig(item, val) {
            item.configCities = val
        },
        deleteCityConfig(item, city) {
            const { configCities } = item
            const cityToDeleteIndex = configCities.map(city => city.name).indexOf(city.name)
            console.log(cityToDeleteIndex)
            configCities.splice(cityToDeleteIndex, 1)
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../../../../assets/less/base/mixins.less';
@import '../../../../../assets/less/pc/tools.less';

.form-group.component-img {
    justify-content: flex-start;

    .img-preview {
        .setSize(100px, 76px);

        img {
            max-height: 76px;
            height: auto;
            max-width: 100px;
        }
    }

    .img-desc {
        .setFlexPos(column, flex-start, flex-start);

        .upload-img {
            .setFlexPos(row, flex-start, flex-start);
        }

        .img-input {
            margin: 5px 3px 0;
        }
    }
}
</style>