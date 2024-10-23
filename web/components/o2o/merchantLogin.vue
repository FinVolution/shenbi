<template>
    <div class="login-container">
        <Login ref="o2oLogin" :itemConfig="itemConfig" @linkTo="linkTo" @changeItem="changeItem" @blurItem="blurItem"
            @clickSendCode="clickSendCode" @sendSmsFail="sendSmsFail" @afterLoginOrReg="afterLoginOrReg"
            @onerrorAC="onerrorAC" :isAgree="isAgree" @jumpProtocol="jumpProtocol" @clickBtn="clickBtn"
            @focusLoginInput="focusLoginInput" @focusInput="focusInput"
            @stepSMSInputShowCallback="stepSMSInputShowCallback" @changeAgree="changeAgree" />

        <!-- <van-popup v-model="smsDialog" class="layerConfirmWrap" position="center" safe-area-inset-bottom
            :close-on-click-overlay="true" round>
            <SmsCode :itemConfig="itemConfig" />
        </van-popup> -->

        <loading :is-loading="isLoading"></loading>
        <!-- 确认申请弹窗 -->
        <van-popup v-model="layerConfirmVisible" class="layerConfirmWrap" position="center" safe-area-inset-bottom
            :close-on-click-overlay="true" round>
            <layer-confirm @hideConfirm="hideConfirm" @sureConfirm="sureConfirm">
            </layer-confirm>
        </van-popup>
        <van-popup v-model="addressVisible" v-if="addressVisible" class="layerAddressWrap" position="bottom"
            :close-on-click-overlay="false" safe-area-inset-bottom round>
            <layer-address v-if="addressVisible" :address-visible="addressVisible" :address="address"
                :province="province" :need-clear="true" @closeAddress="closeAddress" @choseFinish="choseFinish">
            </layer-address>
        </van-popup>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Login from '../../../common/o2o/login/index.vue'
import layerAddress from '../../../common/o2o/cityList/layerAddress.vue'
import { filterProvince } from '../../../common/o2o/cityList/utils'
import { Province } from '../../../common/o2o/cityList/data'
import SmsCode from '../../../common/o2o/acsdk/smsCode.vue'
import { landingPageReport, getHouseOrderList, merchantLoanApplyByDeliver, getOrderStatusV3 } from "../../service/fd"
import { getQueryString, getCookie, setStorage, updateQueryStringParameter } from '@/utils/util'
import Loading from './login/Loading';
import LayerConfirm from './login/LayerConfirm.vue';
import { judgeDeviceType } from '../../utils/index'
export default {
    data() {
        return {
            isAgree: false,
            addressVisible: false,
            address: {},
            province: {},
            orderList: [],
            layerConfirmVisible: false,
            isLoading: false,
            sourceId: '2450834',
            channelAlias: 'O2O_Chengyi',
            channelId: '',
            pageType: '',
            submitSource: 'xxxx',
            bxid: '',
            loginType: 'reg',
        }
    },
    props: {
        itemConfig: {
            type: Object,
            default() {
                return {
                    property: null
                }
            }
        },
    },
    watch: {
        itemConfig: {
            handler: function (nObj) {
                let { property } = nObj || {}
                Object.assign(this, { property })
            },
            immediate: true,
            deep: true
        },
    },
    components: { Login, SmsCode, Loading, LayerConfirm, layerAddress },
    computed: {
        ...mapState('homeStore', {
            pageList: state => state.pageList,
        }),
        ...mapState('indexStore', {
            isApp: state => state.isApp,
            linkUrl: state => state.linkUrl,
            pageTitle: state => state.title,
            pageInfo: state => state.pageInfo
        }),
        ...mapState('homeStore', {
            projectProperties: state => state.projectProperties
        }),
        smsDialog() {
            return this.itemConfig.property.switchSubstep
        },
        formData() {
            return this.$refs.o2oLogin.formData
        },

        fieldNameList() {
            const tempFieldNameList = this.itemConfig.property.applyInfoForm.map(item => {
                return item.name
            });
            if (tempFieldNameList.indexOf('验证码') === -1) {
                tempFieldNameList.push('验证码');
            }
            return tempFieldNameList.length > 0 && tempFieldNameList.join('|');
        },
        applyName() {
            const applyName = this.getItemByFormData('applyName')
            if (applyName) {
                if (applyName.desensitization) {
                    return "****";
                } else {
                    return applyName.value
                }
            } else {
                return this.formData.applyName
            }
        },
        city() {
            const city = this.getItemByFormData('city')
            if (city) {
                if (city.desensitization) {
                    return "****";
                } else {
                    return city.value
                }
            } else {
                return this.formData.city
            }
        },
        userPhone() {
            const phone = this.getItemByFormData('phone')
            if (phone) {
                if (phone.desensitization) {
                    return phone.value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                } else {
                    return phone.value
                }
            } else {
                return this.formData.phone
            }

        },
        protocolNameList() {
            return this.itemConfig.property.protocalText;
        },

        otherInfoForm() {
            return this.$refs.o2oLogin.otherInfoForm
        },
        loginRedirectUrl() {
            return this.itemConfig.property.loginRedirectUrl || ''
        },
        reigsterRedirectUrl() {
            return this.itemConfig.property.reigsterRedirectUrl || ''
        },
        isLoginStepSDK() {
            return this.itemConfig.property.switchSubstep
        },
        components() {
            let { pageList } = this || {}
            let homePage = pageList[0]
            if (homePage) {
                let { componentList } = homePage
                return componentList.map(item => item.propertyName).join('|')
            } else {
                return ''
            }
        }
    },

    created() {
        if (__isBrowser__) {
            const { getRSAEncryptKey, aesEncrypt, getPublicKey } = require('./login/encrypt')
            Object.assign(this, { getRSAEncryptKey, aesEncrypt, getPublicKey })
            this.sourceId = getQueryString('sourceId') || '2450834'
            this.channelAlias = getQueryString('channelAlias') || 'O2O_Chengyi'
            this.channelId = getQueryString('channelId')
            this.pageType = this.$route.meta.pageType
            this.submitSource = getQueryString('submitSource') || 'xxxx'
            this.bxid = getQueryString('bxid') || getCookie('o2o_bxid')
            this.landingPageReport();
            this.getPublicKey();
            this.pageViewPoint();
        }
    },
    mounted() {
        const customAddressConfig = this.itemConfig.property.applyInfoForm.find(item => item.type === 'address')
        if (customAddressConfig && customAddressConfig.needConfigCity) {
            this.province = filterProvince(Province, customAddressConfig.configCities)
        } else {
            this.province = Province
        }
        console.log('customAddressConfig', this.province)
        this.platform = judgeDeviceType()
    },
    methods: {
        focusLoginInput() {
            console.log('focusLoginInput')
            this.handlerSensor('h5_clk', {
                'tgt_event_id': 'super_input_clk',
                'tgt_name': `super-验证码聚焦`,
                param: `${this.platform.isIOS ? 'ios' : 'android'}`,
                param3:`${this.bxid}`,
                param4:`${this.sourceId}`,
                param5:`${this.fieldNameList}`,
                param7:`${this.protocolNameList}`,
                param15:`${this.components}`

            })
        },
        focusInput(data) {
            console.log('focusInput', data)
            this.handlerSensor('h5_clk', {
                'tgt_event_id': 'super_input_clk',
                'tgt_name': `super-${data.name}聚焦`,
                param: `${this.platform.isIOS ? 'ios' : 'android'}`,
                param3:`${this.bxid}`,
                param4:`${this.sourceId}`,
                param5:`${this.fieldNameList}`,
                param7:`${this.protocolNameList}`,
                param15:`${this.components}`

            })
        },
        getItemByFormData(key) {
            const val = this.itemConfig.property.applyInfoForm.filter(item => {
                return item.key === key
            });
            return val && val.length > 0 ? val[0] : null
        },
        handlerSensor(event, obj) {
            this.$handlePoint(event, {
                ...{ page: 'super-房抵投放Landing页' },
                ...obj,
            });
            // window.SB && window.SB.track(event, {
            //     ...{ page: 'super-房抵投放Landing页' },
            //     ...obj,
            // });
        },
        // 分布注册弹窗曝光
        stepSMSInputShowCallback() {
            this.handlerSensor('h5_element_imp', {
                tgt_event_id: 'super_step',
                tgt_name: 'super-分布注册弹窗曝光',
            });
        },
        // 曝光接口
        landingPageReport() {
            landingPageReport({
                url: window.location.href
            })
        },
        pageViewPoint() {
            this.handlerSensor('h5_element_imp', {
                tgt_event_id: 'super_pageview',
                tgt_name: 'super-页面曝光',
                param3: this.bxid,
                param4: this.sourceId,
                param5: this.fieldNameList,
                param6: `banner${this.pageType}`,
                param7: this.protocolNameList,
                param15: this.components,
                param1: `${this.isLoginStepSDK ? '是' : '不是'}分步注册`
            });
        },
        // 点击信息框
        linkTo(data) {
            const { type } = data;
            if (type === 'address') {
                this.addressVisible = true;
                // if (data.data) {
                //     // 服务端有返回地址
                //     this.province = data.data;
                // } else {
                //     // 服务端没有返回地址，使用前端写死的所有的地区
                //     this.province = Province;
                // }
            }
            this.focusInput(data)
        },
        // 输入文字后更新
        changeItem(val, key) {
            this.formData[key] = val;
        },
        // 失焦点
        blurItem(errMsg) {
            this.handlerSensor('h5_element_imp', {
                tgt_event_id: 'super_toastError',
                tgt_name: 'super-toast错误提示',
                param: errMsg
            });
        },
        // 获取验证码
        clickSendCode() {
            this.handlerSensor('h5_clk', {
                tgt_event_id: 'super_AuthCode_clk',
                tgt_name: 'super-获取验证码点击',
            });
        },
        // 发送短信失败时回调函数
        sendSmsFail(data) {
            this.handlerSensor('h5_element_imp', {
                tgt_event_id: 'super_figureCode',
                tgt_name: 'super-滑动验证码',
            });
        },
        // 登录成功之后
        afterLoginOrReg(data) {
            this.loginType = data.type
            this.sensorLoginAuth({ retCode: 1, type: data.type });
            const dom = document.getElementById('submit');
            dom && (dom.innerText = '立即申请');
            dom && dom.removeAttribute('disabled');
            const dom1 = document.querySelectorAll('.btn_apply')[0];
            dom1 && (dom1.innerText = '立即申请');
            dom1 && dom1.removeAttribute('disabled');

            ppdFastLogin.reset({ isLoging: false, isRegistring: false });

            const formChecked = this.checkFormData();
            if (!formChecked) {
                return;
            }
            this.clickBtn();
        },
        getOrderList() {
            getHouseOrderList({}).then(res => {
                this.orderList = res.Content;
            }).catch(err => {
                console.log('获取订单列表接口异常===》', err);
                this.clickBtn();
            });
        },
        sensorLoginAuth(obj) {
            const { retCode } = obj;
            this.handlerSensor('h5_auth', {
                auth_tgt: 'super_register',
                auth_tgt_name: 'super-登录状态',
                ret_code: retCode,
                param: obj.type === 'login' ? '登录' : '注册',
                param1: `${this.isLoginStepSDK ? '是' : '不是'}分步注册`
            });
        },
        onerrorAC(errMsg) {
            this.handlerSensor('h5_element_imp', {
                tgt_event_id: 'super_toastError',
                tgt_name: 'super-toast错误提示',
                param: errMsg
            });
            this.sensorLoginAuth({ retCode: 0 });
        },
        // 跳转协议
        jumpProtocol(item) {
            this.handlerSensor('h5_clk', {
                tgt_event_id: 'super_Agreement_clk',
                tgt_name: 'super-协议点击',
                param: item.text,
                param1: item.link,
            });
            if (item.link && item.link.indexOf('http') > -1) {
                window.location.href = item.link;
            } else {
                window.location.href = `${window.location.origin}${item.link}`;
            }
        },
        // 勾选协议
        changeAgree(val) {
            this.isAgree = val;
            this.handlerSensor('h5_clk', {
                tgt_event_id: 'super_AgreementCheck',
                tgt_name: 'super-协议勾选点击',
            });
        },

        // 点击提交按钮
        clickBtn() {
            this.handlerSensor('h5_clk', {
                tgt_event_id: 'super_applyButton',
                tgt_name: 'super-立即申请点击',
                param3: this.bxid,
                param4: this.sourceId,
                param5: this.fieldNameList,
                param6: `banner${this.pageType}`,
                param7: this.protocolNameList,
                param8: this.applyName,
                param9: this.city,
                param10: this.userPhone,
                param11: document.querySelector('#sms_code_input').value,
            });
            let errMsg = '';
            if (!this.isAgree) {
                errMsg = '请先勾选协议';
                this.$toast(errMsg);
                this.handlerSensor('h5_element_imp', {
                    tgt_event_id: 'super_toastError',
                    tgt_name: 'super-toast错误提示',
                    param: errMsg
                });
                return;
            }
            const formChecked = this.checkFormData();
            if (!formChecked) {
                return;
            }

            // 若用户申请订单数达到5，点击提交申请，弹出toast
            // if (this.orderList.length === 5) {
            //     errMsg = '您申请的订单过多，暂无法继续申请';
            //     this.$toast(errMsg);
            //     this.handlerSensor('h5_element_imp', {
            //         tgt_event_id: 'super_toastError',
            //         tgt_name: 'super-toast错误提示',
            //         param: errMsg
            //     });
            //     return;
            // }
            // 若用户已经有进行中的订单时，仍点击提交申请，弹出弹窗
            // if (this.orderList.length) {
            //     this.layerConfirmVisible = true;
            //     this.handlerSensor('h5_element_imp', {
            //         tgt_event_id: 'super_popup',
            //         tgt_name: 'super-弹窗曝光',
            //         param: '您已有申请中的订单，请确认是否需要再次申请',
            //     });
            //     return;
            // }
            this.submiting();
        },
        // 校验formData数据
        checkFormData() {
            let result = true;
            for (const prop in this.otherInfoForm) {
                if (this.otherInfoForm.hasOwnProperty(prop)) {
                    const infoForm = this.otherInfoForm[prop];
                    const reg = (infoForm.reg && new RegExp(infoForm.reg)) || '';
                    if (!this.formData[prop]) {
                        this.$toast(infoForm.hint);
                        this.handlerSensor('h5_element_imp', {
                            tgt_event_id: 'super_toastError',
                            tgt_name: 'super-toast错误提示',
                            param: infoForm.hint,
                        });
                        result = false;
                        break;
                    } else if (reg) {
                        if (!reg.test(this.formData[prop])) {
                            this.$toast(`请输入正确的${infoForm.name}`);
                            this.handlerSensor('h5_element_imp', {
                                tgt_event_id: 'super_toastError',
                                tgt_name: 'super-toast错误提示',
                                param: `请输入正确的${infoForm.name}`,
                            });
                            result = false;
                            break;
                        }
                    }
                }
            }
            return result;
        },
        sureConfirm() {
            this.handlerSensor('h5_clk', {
                tgt_event_id: 'super_popup_clk',
                tgt_name: 'super-弹窗按钮点击-确认',
            });
            this.layerConfirmVisible = false;
            this.submiting();
        },
        hideConfirm() {
            this.handlerSensor('h5_clk', {
                tgt_event_id: 'super_popup_clk',
                tgt_name: 'super-弹窗按钮点击-取消'
            });
            this.layerConfirmVisible = false;
        },
        submiting() {
            this.$toast.loading({
                duration: 0,
                forbidClick: true,
                message: "加载中..."
            })
            console.log('submiting', JSON.stringify(this.formData))
            merchantLoanApplyByDeliver({
                channelAlias: this.channelAlias,
                formInfo: this.aesEncrypt(JSON.stringify(this.formData)),
                encryptAESKey: this.getRSAEncryptKey(),
                business: this.business,
                sourceId: this.sourceId,
                channelId: this.channelId,
                submitSource: this.submitSource,
                url: window.location.href,
            }).then(res => {
                this.$toast.clear();
                const { Result, Content, ResultMessage } = res;
                if (Result === 200 && Content.data.applyStatus === 1) {
                    const { channelAlias, clueId } = Content.data;
                    setStorage('SESSION', 'channelAlias', channelAlias);
                    this.sensorAuth({ ret_code: 1 });
                    // 进件成功
                    let url = '';
                    if (this.loginType === "login") {
                        url = this.loginRedirectUrl
                    } else if (this.loginType === 'reg') {
                        url = this.reigsterRedirectUrl
                    }
                    console.log(updateQueryStringParameter(url, 'clueId', clueId))
                    setTimeout(() => {
                        window.location.href = updateQueryStringParameter(url, 'clueId', clueId);
                    }, 400)
                } else {
                    this.$toast(ResultMessage);
                    this.sensorAuth({ ret_code: 0 });
                    this.toastErrorSensor(res.ResultMessage);
                    document.querySelector('#sms_code_input').value = '';
                    this.$refs.o2oLogin.clearSMSCode()
                }
            }).catch(err => {
                this.$toast.clear();
                document.querySelector('#sms_code_input').value = '';
                this.$refs.o2oLogin.clearSMSCode()
                this.sensorAuth({ ret_code: 99 });
                this.toastErrorSensor(err);
            });
        },
        sensorAuth(obj) {
            this.handlerSensor('h5_auth', {
                auth_tgt: 'super_next_step',
                auth_tgt_name: 'super-提交申请',
                ret_code: obj.ret_code,
            });
        },
        toastErrorSensor(errMsg) {
            this.handlerSensor('h5_element_imp', {
                tgt_event_id: 'super_toastError',
                tgt_name: 'super-toast错误提示',
                param: errMsg,
            });
        },
        // 关闭省市区弹层
        closeAddress() {
            this.addressVisible = false;
        },
        // 选择地区结束
        choseFinish(data) {
            this.$refs.o2oLogin.updateAddressData(data)
            this.closeAddress();
        },
    }
}
</script>

<style>
#riskapp {
    z-index: 999
}
</style>
<style lang="less" scoped>
@import "../../../assets/less/base/mixins.less";

.login-container {
    .setSize(100%, 100%);
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
}

/deep/ .layerConfirmWrap {
    border-radius: 8px !important;
    overflow: hidden;
}
</style>
