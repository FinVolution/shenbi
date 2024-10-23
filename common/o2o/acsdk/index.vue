<template>
    <div class="acsdkWrap">
        <template v-if="switchOldVersion">
            <form-item
                v-for="(item, index) in userInfo"
                :key="index"
                v-model="formData[item.key]"
                :input-id="item.id"
                :data="item"
                :other-info-form="userInfo"
                :cur-key="item.key"
                :type="item.type"
                :time="time"
                :styleMSGConfig="styleMSGConfig"
                :styleConfig="styleConfig"
                :need-err-info="true"
                @blurItem="blurItem"
                @sendCode="sendCode"
                @focusInput="focusInput"
            ></form-item>
        </template>
        <template v-else>
            <form-item-v2
                v-for="(item, index) in userInfo"
                :key="index"
                v-model="formData[item.key]"
                :input-id="item.id"
                :data="item"
                :other-info-form="userInfo"
                :cur-key="item.key"
                :type="item.type"
                :time="time"
                :styleMSGConfig="styleMSGConfig"
                :styleConfig="styleConfig"
                :need-err-info="true"
                @blurItem="blurItem"
                @sendCode="sendCode"
                @focusInput="focusInput"
            ></form-item-v2>
        </template>

    </div>
</template>

<script>
import formItem from './formItem';
import formItemV2 from './formItemV2';
import common from './common';

export default {
    components: {
        formItem,
        formItemV2,
    },
    props: {
        sourceId: {
            type: String,
            default: '',
        },
        styleConfig: {
            type: Object
        },
        styleMSGConfig: {
            type: Object
        },
        switchOldVersion: {
            type: Boolean
        }
    },
    data() {
        return {
            userInfo: {
                code: {
                    hint: '请输入验证码',
                    key: 'code',
                    maxLength: 6,
                    minLength: 0,
                    name: '验证码',
                    required: true,
                    modify: true,
                    type: 'code',
                    // reg: '^[0-9]+$',
                    id: 'sms_code_input',
                },
            },
            time: 60,
            formData: {},
            telTips: false,
            smsTips: false,
            imgTips: false,
            smsClose: false,
            telClose: false,
            imgClose: false,
            smsValue: '',
            telValue: '',
            imgValue: '',
            checkboxValue: true,
            imgBox: false,
            smsBgcolor: '',
        };
    },
    watch: {
        telValue(value) {
            if (value.length) {
                this.telTips = true;
                this.telClose = true;
            } else {
                this.telTips = false;
                this.telClose = false;
            }
        },
    },
    methods: {
        blur() {},
        focusInput(data) {
            this.$emit('focusLoginInput')
        },
        blurItem() {},
        sendCode() {
            this.$emit('clickSendCode');
        },
        clearSMSCode() {
            this.userInfo.code.value = ''
            this.formData = {}
        },
    },
};
</script>

<style lang="less">
.panel_slide {
    box-sizing: content-box;
}
#riskapp {
    position: fixed !important;
}
#riskapp * {
    box-sizing: content-box;
}
#reg_errormsg {
    line-height: 20px;
    margin-top: 2px;
    color: #ff5a5a;
    font-size: 10px;
}
</style>

<style lang="less" scoped>
.acsdkWrap {
    position: relative;
    &::after {
        content: ' ';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        border-top: 1px solid #dce1e6;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
}
</style>
