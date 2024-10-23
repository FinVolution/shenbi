<template>
    <div class="login-container" :imphooks-name="itemConfig.id">
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
                :province="province" :need-clear="true" @closeAddress="closeAddress" @choseFinish="choseFinish" @clickAddress="clickAddress">
            </layer-address>
        </van-popup>
<!--        无服务-->
        <van-popup
            v-model="showNoServicePop"
            class="no-service-pop"
            position="center"
            >
            <NoService @close="showNoServicePop = false"/>
        </van-popup>
<!--      立即咨询-->
      <van-popup
            v-model="showConsultPop"
            class="consult-pop"
            position="center">
            <Consult @close="closeConsultPop" @consult="handleConsult"/>
        </van-popup>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import Login from '../../../common/o2o/login/index.vue'
import layerAddress from '../../../common/o2o/cityList/layerAddress.vue'
import { filterProvince } from '../../../common/o2o/cityList/utils'
import { Province } from '../../../common/o2o/cityList/data'
import SmsCode from '../../../common/o2o/acsdk/smsCode.vue'
import { landingPageReport, getHouseOrderList, loanApplyByDeliver, getOrderStatusV3, getCustomerLink } from "../../service/fd"
import { getQueryString, getCookie, setStorage, updateQueryStringParameter } from '@/utils/util'
import Loading from './login/Loading';
import LayerConfirm from './login/LayerConfirm.vue';
import { judgeDeviceType } from '../../utils/index';
import { appointCityList, directCityIdList } from './consts';
import NoService from "../../../common/o2o/constraintsDialog/noService";
import Consult from "../../../common/o2o/constraintsDialog/consult";
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
            sourceId: '',
            channelAlias: '',
            channelId: '',
            pageType: '',
            submitSource: 'xxxx',
            bxid: '',
            loginType: 'reg',
            addressKey: '',
            showNoServicePop: false,
            showConsultPop: false,
            clueId: ''
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
    components: {Consult, NoService, Login, SmsCode, Loading, LayerConfirm, layerAddress },
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
                    return this.formData.city
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
        ...mapActions('commonStore/scrollImp', [
          'setImpConfig',
        ]),
        focusLoginInput() {
            console.log('focusLoginInput')
        },
        focusInput(data) {
            console.log('focusInput', data)
        },
        getItemByFormData(key) {
            const val = this.itemConfig.property.applyInfoForm.filter(item => {
                return item.key === key
            });
            return val && val.length > 0 ? val[0] : null
        },
        handlerSensor(event, obj) {
        },
        // 分布注册弹窗曝光
        stepSMSInputShowCallback() {
        },
        // 曝光接口
        landingPageReport() {
            landingPageReport({
                url: window.location.href
            })
        },
        pageViewPoint() {
        },
        // 点击信息框
        linkTo(data) {
            const { type, key } = data;
            if (type === 'address') {
                this.addressVisible = true;
                this.addressKey = key;
                // if (data.data) {
                //     // 服务端有返回地址
                //     this.province = data.data;
                // } else {
                //     // 服务端没有返回地址，使用前端写死的所有的地区
                //     this.province = Province;
                // }
            }
            if (type === 'address') {
              this.focusInput(data)
            }
        },
        // 输入文字后更新
        changeItem(val, key) {
            this.formData[key] = val;
        },
        // 失焦点
        blurItem(errMsg) {
        },
        // 获取验证码
        clickSendCode() {},
        // 发送短信失败时回调函数
        sendSmsFail(data) {
        },
        // 登录成功之后
        afterLoginOrReg(data) {},
        getOrderList() {
            getHouseOrderList({}).then(res => {
                this.orderList = res.Content;
            }).catch(err => {
                console.log('获取订单列表接口异常===》', err);
                this.clickBtn();
            });
        },
        sensorLoginAuth(obj) {
        },
        onerrorAC(errMsg) {
            this.sensorLoginAuth({ retCode: 0 });
        },
        // 跳转协议
        jumpProtocol(item) {},
        // 勾选协议
        changeAgree(val) {
            this.isAgree = val;
        },

        // 点击提交按钮
        clickBtn() {
            let errMsg = '';
            if (!this.isAgree) {
                errMsg = '请先勾选协议';
                this.$toast(errMsg);
                return;
            }
            const formChecked = this.checkFormData();
            if (!formChecked) {
                return;
            }

            // 若用户申请订单数达到5，点击提交申请，弹出toast 
            if (this.orderList.length === 5) {
                errMsg = '您申请的订单过多，暂无法继续申请';
                this.$toast(errMsg);
                return;
            }
            // 若用户已经有进行中的订单时，仍点击提交申请，弹出弹窗
            if (this.orderList.length) {
                this.layerConfirmVisible = true;
                return;
            }
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
                        result = false;
                        break;
                    } else if (reg) {
                        if (!reg.test(this.formData[prop])) {
                            this.$toast(`请输入正确的${infoForm.name}`);
                            result = false;
                            break;
                        }
                    }
                }
            }
            return result;
        },
        sureConfirm() {
            this.layerConfirmVisible = false;
            this.submiting();
        },
        hideConfirm() {
            this.layerConfirmVisible = false;
        },
        submiting() {
            this.$toast.loading({
                duration: 0,
                forbidClick: true,
                message: "加载中..."
            })
            console.log('submiting', JSON.stringify(this.formData))
        },
        getUrlValue(kValue, url) {
          const reg = /([^?&=]+)=([^?&=]+)/g;
          const obj = {};
          url.replace(reg, function ($, $1, $2) {
            obj[$1] = $2;
          })
          for (let keyName in obj) {
            if (keyName === kValue) {
              return obj[keyName];
            }
          }
        },
        sensorAuth(obj) {
        },
        toastErrorSensor(errMsg) {
        },
        // 关闭省市区弹层
        closeAddress(type) {
            this.addressVisible = false;
        },
        // 选择地区结束
        choseFinish(data) {
            this.$refs.o2oLogin.updateAddressData(data)
            this.closeAddress('finish');
        },
        clickAddress(data) {},
        closeConsultPop() {
          this.showConsultPop = false
        },
        handleConsult() {},
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
.no-service-pop, .consult-pop {
  border-radius: 8px;
}
</style>
