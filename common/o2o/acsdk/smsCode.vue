<template>
    <div class="sms-code-container">
        <div class="close-container" @click="closeStepLayer">
            <img src="../images/close.png" />
        </div>
        <div class="sms-code-tip ql-editor" v-html="smsCodeTip"></div>
        <div class="code-send-wrap">
            <span>验证码已发送至</span>
            <span class="mobile-number" :style="generateStyleByObj(itemConfig.elemStyle.mainTheme)">{{ phoneNumber()
            }}</span>
        </div>
        <div class="code-input-contianer">
            <div :class="{ 'code-display': true, 'len-4': smsCodeLength === 4 }">
                <input v-for="(c, index) in ct" :key="index" type="number" class="display-item" :class="[`sms-code-${index}`]" v-model="ct[index]"
                    ref="input" :style="{ borderBottomColor: index <= cIndex ? '#333' : '' }"
                    @input="e => { onInput(e.target.value, index) }"
                    @keydown.delete="e => { onKeydown(e.target.value, index) }" @focus="onFocus" @blur="onBlur" :disabled="loading" />
            </div>
        </div>
        <input id='sms_code_input' type="number" ref="placeholderInput" :value="rawCode" style="height: 1px;"  />
        <section class="send-code-content">
            <div class="reflush-code-btn" :style="styleMSGConfig" :class="{ disbled: !canClickCode }" id="send_sms"
                ref="sms" href="javascript:;" @click="clickCode"> {{ codeText }}
            </div>
        </section>
    </div>
</template>

<script>
import { generateStyleByObj } from '../../index'
import common from './common';
export default {
    data() {
        return {
            code_val_position_1: '6',
            code_val_position_2: '6',
            code_val_position_3: '6',
            code_val_position_4: '6',
            code_val_position_5: '6',
            code_val_position_6: '6',
            ct: ['', '', '', '', '', ''],
            loading: false,
            msg: '',
            time: 60,
            canClickCode: true,
            rawCode: '',
            smsCodeBlurFlag: true
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
        sourceId: {
            type: String,
            default: '',
        },
        showStepLayer: {
            type: Boolean,
            default: false,
        },
        formData: {
            type: Object,
            default: {
            }
        },
        smsCodeTip: {
            type: String,
            default: '请输入验证码领取'
        },
        smsCodeLength: {
            type: Number,
            default: 6
        },
        styleMSGConfig: {
            type: Object
        },
    },
    computed: {
        codeText() {
            let text = '';
            if (this.time === 60) {
                text = '获取验证码';
                this.canClickCode = true;
            } else if (this.time < 60 && this.time > 0) {
                text = `重发${this.time}s`;
                this.canClickCode = false;
            } else {
                text = `重新发送`;
                this.canClickCode = true;
            }
            return text;
        },
        ctSize() {
            return this.ct.length;
        },
       
        cIndex() {
            let i = this.ct.findIndex(item => item === '');
            i = (i + this.ctSize) % this.ctSize;
            return i;
        },
        lastCode() {
            return this.ct[this.ctSize - 1];
        },
        code() {
            return this.ct.join('')
        }
    },
    watch: {
        cIndex() {
            this.resetCaret();
        },
        lastCode(val) {
            if (val) {
                console.log('this.ctSize', this.ctSize)
                this.$refs.input[this.ctSize - 1].blur();
                this.rawCode = this.ct.join('')
                this.sendCaptcha();
            }
        },
        showStepLayer(val) {
            if (!val) {
                this.reset()
            }
        }
    },
    mounted() {
        this.resetCaret();
        this.createScript();
    },
    methods: {
        generateStyleByObj,
        blur() { },
        blurItem() { },
        clickCode() {
            this.$emit('clickSendCode');
        },
        phoneNumber() {
            return this.formData.phone
        },
        closeStepLayer() {
            this.$emit("update:showStepLayer", false)
        },
        onInput(val, index) {
            this.msg = ''
            val = val.replace(/\s/g, '');
            if (index == this.ctSize - 1) {
                this.ct[this.ctSize - 1] = val[0]; // 最后一个码，只允许输入一个字符。
            } else if (val.length > 1) {
                let i = index;
                for (i = index; i < this.ctSize && i - index < val.length; i++) {
                    this.ct[i] = val[i];
                }
                this.resetCaret();
            }
        },
        // 重置光标位置。
        resetCaret() {
            this.$refs.input[this.ctSize - 1].focus();
        },
        onFocus() {
            // 监听 focus 事件，将光标重定位到“第一个空白符的位置”。
            let index = this.ct.findIndex(item => item === '');
            index = (index + this.ctSize) % this.ctSize;
            this.$refs.input[index].focus();
          if (this.smsCodeBlurFlag) {
              this.smsCodeBlurFlag = false
              this.$emit('focusLoginInput')
            }
        },
        judgeBlur() {
          return this.ct.some((item, index) => {
            return document.querySelector(`.sms-code-${index}`) === document.activeElement
          })
        },
        onBlur() {
          setTimeout(() => {
            if (!this.judgeBlur()) {
              this.smsCodeBlurFlag = true
            }
          })
        },
        onKeydown(val, index) {
            if (val === '') {
                // 删除上一个input里的值，并对其focus。
                if (index > 0) {
                    this.ct[index - 1] = '';
                    this.$refs.input[index - 1].focus();
                }
            }
        },
        sendCaptcha() {
            console.log(`发送验证码到服务器：${this.rawCode}`);
            this.$refs.placeholderInput.focus();
            this.$refs.placeholderInput.blur();
            setTimeout(() => {
                document.querySelector('#submit').click()
            }, 500);
        },

        reset() {
            // 重置。一般是验证码错误时触发。
            this.ct = this.ct.map(item => '');
            this.rawCode = this.ct.join('')
            this.resetCaret();
        }
    }

}
</script>

<style lang="less" scoped>
.setSize(@width; @height) {
    width: @width;
    height: @height;
}

.setFlexPos(@direction;
    @xPos;

    @yPos) {
    display: -webkit-flex;
    display: flex;
    flex-direction: @direction;
    justify-content: @xPos;
    align-items: @yPos;
}

.setBgImg(@url;
    @position-horizontal;
    @position-vertical;
    @size;

    @repeat) when(isstring(@url)) {
    background-image: url(@url);
    background-position: @position-horizontal @position-vertical;
    background-size: @size;
    background-repeat: @repeat;
}

.send-code-content {
    .setFlexPos(row, right, center)
}

.sms-code-container {
    position: relative;
    border-radius: 6px;
    background-color: #fff;
    padding: 36px 16px 22px 16px;

    .close-container {
        .setFlexPos(row, space-between, center);
        width: 40px;
        position: absolute;
        right: -10px;
        top: 0px;
        height: 40px;

        img {
            width: 20px;
            height: 20px;
        }
    }

    .sms-code-tip {
        padding: 0;
        margin: 0;
        color: #002A3C;
        font-size: 19px;
        font-weight: bold;
        overflow: hidden;
    }

    .code-send-wrap {
        margin: 8px 0 0 0;
        color: #2b293a;
        font-size: 12px;
        font-weight: normal;

        span {
            color: #7C8893;
        }

        .mobile-number {
            color: #3CA5E2;
        }
    }

    .code-input-contianer {
        position: relative;
        margin: 20px 0 0 0;

        .code-display {
            margin: 0 auto;
            .setSize(100%, 43px);
            .setFlexPos(row, space-between, center);
            z-index: 1;

            &.len-4 {
                padding: 0 20px;
            }

            .display-item {
                margin: 0 4px;
                box-sizing: border-box;
                .setSize(38px, 43px);
                background: rgba(247, 247, 247, 1);
                border-radius: 4px;
                .setFlexPos(row, center, center);
                font-size: 24px;
                font-weight: bold;
                color: #2b293a;
            }
        }
    }

    .reflush-code-btn {
        margin: 0 0 0 0; // background-color: #dedede;
        border: none;
        width: 80px;
        padding: 5px 0;
        border-radius: 4px;
        text-align: center;
        font-size: 12px;
        font-weight: normal;

        &.disbled {
            pointer-events: none;
            background: #9faab5;
        }
    }

    .captcha {
        display: flex;
        justify-content: center;
        margin-top: 40px;
    }

    input {
        margin-right: 20px;
        width: 45px;
        text-align: center;
        border: none;
        font-size: 24px;
        outline: none;
    }

    input:last-of-type {
        margin-right: 0;
    }

    input:disabled {
        color: #000;
        background-color: #fff;
    }

    .msg {
        text-align: center;
    }
}
</style>
