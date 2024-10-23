<template>
    <div class="house-index">
        <div class="houseApplyInfo" :style="generateStyleByObj(itemConfig.selfStyle)">
            <!-- 申请form表单 -->
            <template v-if="switchOldVersion">
                <form-item v-for="(item, index) in otherInfoForm" v-if="!item.isHidden" :key="index" v-model="formData[item.key]" :data="item"
                    :other-info-form="otherInfoForm" :cur-key="item.key"
                    :styleConfig="generateStyleByObj(itemConfig.elemStyle.mainTheme)" :type="item.type" @linkTo="linkTo"
                    @changeInput="changeItem" @blurItem="blurItem" @focusInput="focusInput">
                </form-item>
            </template>
            <template v-else>
                <!-- 申请form表单 -->
                <form-item-v2 v-for="(item, index) in otherInfoForm" v-if="!item.isHidden" :key="index" v-model="formData[item.key]" :data="item"
                    :other-info-form="otherInfoForm" :cur-key="item.key"
                    :styleConfig="generateStyleByObj(itemConfig.elemStyle.mainTheme)" :type="item.type" @linkTo="linkTo"
                    @changeInput="changeItem" @blurItem="blurItem" @focusInput="focusInput">
                </form-item-v2>
            </template>

            <acsdk ref="acsdkRefs" :source-id="sourceId" @clickSendCode="clickSendCode" @afterLoginOrReg="afterLoginOrReg"
                v-if="!itemConfig.property.switchSubstep" @onerror="onerrorAC"
                :switchOldVersion="switchOldVersion"
                @focusLoginInput="focusLoginInput"
                :styleMSGConfig="generateStyleByObj(itemConfig.elemStyle.msgColor)"
                :styleConfig="generateStyleByObj(itemConfig.elemStyle.mainTheme)" @sendSmsFail="sendSmsFail"></acsdk>

            <div v-else class="step-sdk-layer" v-show="showStepLayer">
                <SmsCode :itemConfig="itemConfig" :formData="formData" :showStepLayer.sync="showStepLayer"
                    :styleMSGConfig="generateStyleByObj(itemConfig.elemStyle.msgColor)" :source-id="sourceId"
                    @focusLoginInput="focusLoginInput"
                    @onerror="onerrorAC" @clickSendCode="clickSendCode" @afterLoginOrReg="afterLoginOrReg" />
            </div>
            <protocol-wrap :title="'本人已阅读并同意'" :is-agree="isAgree"
                :styleConfig="generateStyleByObj(itemConfig.elemStyle.protocal)"
                :linkStyleConfig="generateStyleByObj(itemConfig.elemStyle.protocalLink)"
                :iconStyleConfig="generateStyleByObj(itemConfig.elemStyle.protocalIcon)"
                :propsConfig="itemConfig.property" @jumpItem="jumpProtocol" @changeAgree="changeAgree"></protocol-wrap>
            <div id="submit" class="btn_apply" :style="generateStyleByObj(itemConfig.elemStyle.commitBtn)">{{itemConfig.property.applyButtonText}}</div>
        </div>
    </div>
</template>

<script>
import formItem from './formItem';
import formItemV2 from './formItemV2';
import acsdk from '../acsdk/index.vue';
import protocolWrap from './protocolWrap.vue';
import { generateStyleByObj } from '../../index'
import SmsCode from '../acsdk/smsCode.vue'
export default {
    name: 'Index',
    components: {
        formItem,
        formItemV2,
        acsdk,
        protocolWrap,
        SmsCode,
    },
    data() {
        return {
            sourceId: '2450834',
            otherInfoForm: {},
            formData: {},
            showStepLayer: false,
            curKey: null,
            protocolList: [
                {
                    text: this.itemConfig.property.protocalText,
                    link: this.itemConfig.property.protocalLinkUrl,
                }
            ],
            province: {},
            address: {},
        }
    },
    props: {
        itemConfig: {
            type: Object,
            default() {
                return {
                    containerStyle: null,
                    property: null,
                    elemStyle: null,
                    selfStyle: null,

                }
            }
        },
        isAgree: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    watch: {
        itemConfig: {
            deep: true,
            handler(val) {
                this.itemConfig = val
                this.init()
            }
        },
        showStepLayer: {
            deep: true,
            handler(val) {
                if (val) {
                    this.$emit('stepSMSInputShowCallback')
                }
            }
        }
    },
    created() {
        this.init();
    },
    mounted() {
        this.sourceId = this.getQueryString('sourceId')
    },
    computed: {
        switchOldVersion() {
            return this.itemConfig.property.switchOldVersion
        }
    },
    methods: {
        generateStyleByObj,
        init() {
            this.otherInfoForm = this.handleDataToObject(this.itemConfig.property.applyInfoForm);
        },
        focusInput(data) {
            this.$emit('focusInput', data)
        },
        focusLoginInput() {
            this.$emit('focusLoginInput')
        },
        // 曝光接口
        landingPageReport() {
        },
        clearSMSCode() {
            if (this.$refs.acsdkRefs) {
                this.$refs.acsdkRefs.clearSMSCode()
            }
        },
        handlerSensor(event, obj) {
        },
        pageViewPoint() {
        },
        handleDataToObject(arr) {
            const obj = {};
            arr.forEach(item => {
                const { key } = item;
              if (item.isHidden) {
                if (key === 'city') {
                  this.$set(this.formData, 'city', `${item.province}${item.city}`);
                  this.$set(this.formData, 'provinceId', item.provinceCode);
                  this.$set(this.formData, 'cityId', item.cityCode);
                } else {
                  this.$set(this.formData, key, item.defaultValue);
                }
              } else {
                if (typeof item.data === 'string') {
                  item.value = item.data;
                  this.$set(this.formData, key, item.value);
                }
              }
                obj[key] = item;
            });
            return obj;
        },
        // 点击信息框
        linkTo(data) {
            this.curKey = data.key;
            this.$emit('linkTo', data)
        },
        // 输入文字后更新
        changeItem(val, key) {
            this.$emit('changeItem', val, key)
        },
        // 失焦点
        blurItem(errMsg) {
            this.$emit('blurItem', errMsg)
        },
        // 获取验证码
        clickSendCode() {
            this.$emit('clickSendCode')
        },
        // 发送短信失败时回调函数
        sendSmsFail(data) {
            this.$emit('sendSmsFail', data)
        },
        // 登录成功之后
        afterLoginOrReg(data) {
            this.$emit('afterLoginOrReg', data)
        },

        sensorLoginAuth(obj) {
        },
        onerrorAC(errMsg) {
            this.$emit('onerrorAC', errMsg)
        },
        // 跳转协议
        jumpProtocol(item) {
            this.$emit('jumpProtocol', item)
        },
        // 勾选协议
        changeAgree(val) {
            this.$emit('changeAgree', val)
        },
        // 点击提交按钮
        clickBtn() {
            this.$emit('clickBtn')
        },
        updateAddressData(data) {
            // 对非直辖区之外的省份加上“省”
            const list = ['北京', '天津', '上海', '重庆'];
            const _province = list.includes(data.province) ? data.province : `${data.province}省`;
            this.formData[this.curKey] = `${_province}${data.city}${data.area}`;
            this.formData['provinceId'] = data.provinceCode;
            this.formData['cityId'] = data.cityCode;
            this.init()
        },
        getQueryString(name) {
            let after = decodeURIComponent(window.location.hash.split('?')[1] || window.location.search.split('?')[1]);
            if (after) {
                let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
                let r = after.match(reg);
                if (r != null) {
                    return decodeURIComponent(r[2]);
                } else {
                    return null;
                }
            }
        }
    }
}

</script>

<style lang="less" scoped>
.house-index {
    position: relative;
    box-sizing: border-box;

    .houseApplyInfo {
        position: relative;
        margin: 0 14px 10px;
        background: #ffffff;
        padding: 0 18px;
        border-radius: 10px;


        .btn_apply {
            margin: 8px 0 30px;
            width: 303px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background: linear-gradient(108deg, #5bbceb 0%, #25a1da 100%);
            border-radius: 25px;
            font-weight: bold;
            font-size: 18px;
            color: #ffffff;
        }

        .step-sdk-layer {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.525);
            display: flex;
            align-content: center;
            align-items: center;
            justify-content: center;
            z-index: 99;
        }
    }

    /deep/ .layerConfirmWrap {
        border-radius: 8px !important;
    }
}
</style>
