<template>
    <div v-if="data.type !== 'gap'" class="formItem borderBottom" :class="[
        { disabled: !data.modify },
        { isFocus: isFocus },
        { isError: isEmpty || isError },
        { isCode: data.type === 'code' },
    ]" @click="linkTo">
        <h4 class="title" :class="{ visible: visible || finishContact }" style="margin:0px;" :style="styleConfig">
            {{ data.required ? data.name : data.name + '（非必填）' }}
        </h4>
        <!-- 输入框 -->
        <template v-if="data.type === 'textInput'">
            <input :id="inputId" class="textContent" :class="[{ textEmpty: isEmpty }]" type="text"
                :maxlength="data.maxLength > 0 && data.maxLength" :minlength="data.maxLength > 0 && data.minLength"
                :placeholder="inputPlaceholder" :value="data.value" @input="changeInput" @blur="blurInput"
                @focus="focusInput" />
            <p v-if="isLengthErr" class="errorMsg">
                {{ `请输入不少于${data.minLength}字的${data.name}` }}
            </p>
            <p v-else-if="isError" class="errorMsg">请输入正确的{{ data.name }}</p>
            <span class="icon_clear" :class="{ visible: visible }" @click="clearInput"></span>
        </template>
        <!-- 验证码输入框 -->
        <template v-if="data.type === 'code'">
            <input :id="inputId" class="textContent" :class="[{ textEmpty: isEmpty, codeInput: data.type === 'code' }]"
                type="tel" :maxlength="data.maxLength > 0 && data.maxLength"
                :minlength="data.maxLength > 0 && data.minLength" :placeholder="inputPlaceholder" :value="data.value"
                @input="changeInput" @blur="blurInput" @focus="focusInput" />
            <a id="send_sms" ref="sms" href="javascript:;" class="btn_code" :style="styleMSGConfig"
                :class="{ disbled: !canClickCode }" @click="clickCode">
                {{ codeText }}
            </a>
            <!-- ac组件的报错 -->
            <div id="reg_errormsg"></div>
            <p v-if="isLengthErr" class="errorMsg">
                {{ `请输入不少于${data.minLength}字的${data.name}` }}
            </p>
            <p v-else-if="isError && !noNeedErrInfo" class="errorMsg">
                请输入正确的{{ data.name }}
            </p>
            <span class="icon_clear" :class="{ visible: visible }" @click="clearInput"></span>
        </template>
        <!-- 选择框 -->
        <template v-else-if="data.type === 'selectInput' || data.type === 'linkInput'">
            <p v-if="!data.value" class="textContent" :class="{ disabled: !value }">
                {{ inputPlaceholder }}
            </p>
            <p v-else class="textContent">{{ data.text || curText }}</p>
            <span class="icon_arrow"></span>
        </template>
        <!-- 紧急联系人 -->
        <template v-else-if="data.type === 'contacts'">
            <p v-if="!finishContact" class="textContent" :class="{ disabled: !value }">
                {{ '请选择紧急联系人' }}
            </p>
            <p v-else class="textContent">{{ '已填写' }}</p>
            <span v-if="!finishContact" class="icon_arrow"></span>
        </template>
        <!-- 城市 -->
        <template v-else-if="data.type === 'location'">
            <div class="flex">
                <p class="textContent" :class="{ disabled: !data.value }">{{ inputPlaceholder }}</p>
                <span class="icon_arrow"></span>
            </div>
        </template>
        <!-- address -->
        <template v-else-if="data.type === 'address'">
            <p v-if="!this.data.value" class="textContent" :class="{ disabled: !value }">
                {{ inputPlaceholder }}
            </p>

            <p v-else class="textContent">{{ data.text || curText }}</p>
            <span class="icon_arrow"></span>
        </template>
    </div>
</template>

<script>
export default {
    components: {},
    props: ['curKey', 'data', 'otherInfoForm', 'finishContact', 'time', 'inputId', 'noNeedErrInfo', 'styleConfig', 'styleMSGConfig'],
    data() {
        return {
            value: '',
            curText: '',
            isEmpty: false,
            isError: false,
            placeholder: '',
            isLengthErr: false,
            isFocus: false, // 标记当前选项是否聚焦
            canClickCode: true,
        };
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
        // 计算属性的 getter
        visible() {
            // `this` 指向 vm 实例
            return !!this.data.value;
        },
        emailLayerVisible() {
            console.log(
                'emailLayerVisible',
                this.data.key === 'email',
                this.isFocus,
                this.value.slice(-1) === '@'
            );
            return this.data.key === 'email' && this.isFocus && this.value.slice(-1) === '@';
        },
        inputPlaceholder() {
            let str = '';
            switch (this.data.type) {
                case 'textInput':
                    str = this.data.hint + ((!this.data.required && '（非必填）') || '');
                    break;
                case 'code':
                    str = this.data.hint + ((!this.data.required && '（非必填）') || '');
                    break;
                case 'selectInput':
                case 'linkInput':
                    str = `请选择${this.data.name}${(!this.data.required && '（非必填）') || ''}`;
                    break;
                case 'location':
                    str = this.data.value || `城市${(!this.data.required && '（非必填）') || ''}`;
                    break;
                case 'address':
                    str = `请选择${this.data.name}${(!this.data.required && '（非必填）') || ''}`;
                    break;
            }
            return str;
        },
    },
    watch: {
        data: {
            immediate: true,
            handler() {
                const list = this.data.data;
                if (typeof list === 'undefined') {
                    return;
                }
                list.length &&
                    list.forEach(item => {
                        if (
                            (this.data.type === 'selectInput' || this.data.type === 'linkInput') &&
                            item.value === this.data.value
                        ) {
                            this.curText = item.text;
                        }
                        console.log('this.data.type:', this.data.value);
                        if (this.data.type === 'textInput') {
                            this.curText = this.data.value;
                        }
                    });
            },
        },
    },
    created() { },
    methods: {
        // 点击获取验证码
        clickCode() {
            this.$emit('sendCode');
        },
        changeInput(e) {
            const val = e.target.value;
            this.value = val;
            this.$set(this.otherInfoForm[this.curKey], 'value', val);
            this.isEmpty = false;
            this.isError = false;
            this.$emit('input', val);
            // 如果是邮箱，需要联想功能
            // if (this.data.key === 'email') {
            //     if (val.slice(-1) === '@') {
            //     }
            // }
        },
        clearInput() {
            this.value = '';
            this.$set(this.otherInfoForm[this.curKey], 'value', '');
            this.$set(this.otherInfoForm[this.curKey], 'isError', '');
            this.isEmpty = false;
            this.isError = false;
            this.$emit('input', '');
        },
        linkTo() {
            this.$emit('linkTo', this.data);
        },
        focusInput() {
            this.isFocus = true;
            this.isEmpty = false;
            this.$emit('focusInput', this.data)
        },
        // 失焦校验
        blurInput() {
            if (!this.value) {
                return;
            }
            this.isFocus = false;
            this.value = this.value && this.value.replace(/[\u200B-\u200D\uFEFF]/g, '');
            // 为空
            if (!this.value) {
                this.isEmpty = true;
                this.isLengthErr = false;
                this.$emit('blurItem', this.data, 0);
            } else if (
                this.data.minLength !== 0 &&
                this.data.maxLength !== 0 &&
                (this.value.length < this.data.minLength || this.value.length > this.data.maxLength)
            ) {
                console.log('blur3');
                // 长度限制
                this.isEmpty = false;
                this.isLengthErr = true;
                this.isError = true;
                this.$set(this.otherInfoForm[this.curKey], 'isError', true);
                this.$emit('blurItem', this.data, 1);
            } else if (this.data.reg) {
                console.log('blur2');
                const reg = new RegExp(this.data.reg);
                this.isLengthErr = false;
                // console.log('正则匹配结果：', reg.test(this.value));
                if (!reg.test(this.value)) {
                    // 不满足正则匹配
                    this.isError = true;
                    this.$set(this.otherInfoForm[this.curKey], 'isError', true);
                    this.$emit('blurItem', this.data, 2);
                } else {
                    this.isError = false;
                    this.$set(this.otherInfoForm[this.curKey], 'isError', '');
                    this.$emit('blurItem', this.data, 'finish');
                }
            } else {
                this.isEmpty = false;
                this.isError = false;
                this.isLengthErr = false;
                this.$set(this.otherInfoForm[this.curKey], 'isError', '');
                this.$emit('blurItem', this.data, 'finish');
            }
        },
        // 选择@的邮箱
        choseEmail(val) {
            console.log('val:', val);
            this.value = val;
            this.data.value = val;
            this.blurInput();
        },
    },
};
</script>

<style lang="less" scoped>
input {
    -webkit-user-modify: read-write-plaintext-only;
    -webkit-appearance: none;
    border: none;
    padding: 0px;
    margin: 0;
}

input[type='button']:active,
input:focus {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
    -webkit-focus-ring-color: rgba(0, 0, 0, 0) !important;
    outline: none !important;
    -webkit-appearance: none;
    -webkit-user-modify: read-write-plaintext-only;
    /*针对andriod4.0以上版本去除高亮边框*/
}

/*-----------去除浏览器对输入框的默认黄色内阴影-------------*/

input:-webkit-autofill {
    background-color: #ffffff !important;
    background-image: none;
    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset;
}

.disabled {
    color: #b2bac9 !important;
}

.formItem.disabled {
    pointer-events: none;
}

.formItem {
    position: relative;
    height: 70px;
    padding: 27px 0 1px;

    &.isCode {
        .icon_clear {
            right: 100px;
        }
    }

    .btn_code {
        position: absolute;
        right: 0;
        width: 80px;
        height: 28px;
        border-radius: 14px;
        font-size: 12px;
        text-align: center;
        font-weight: 500;
        color: #fff;
        line-height: 28px;
        background-color: #3ca5e2;

        &.disbled {
            pointer-events: none;
            background: #9faab5;
        }
    }

    .title {
        visibility: hidden;
        height: 10px;
        color: #60bbf0;
        font-size: 10px;
        font-weight: bold;
    }

    .icon_clear {
        visibility: hidden;
        position: absolute;
        right: 0;
        bottom: 9px;
        width: 18px;
        height: 18px;
        background: url('../images/ic_deleteall@3x.png') no-repeat;
        background-size: 100% 100%;
    }

    .icon_arrow {
        position: absolute;
        right: 0;
        bottom: 9px;
        width: 18px;
        height: 18px;
        background: url('../images/ic_arrowgoto@3x.png') no-repeat;
        background-size: 100% 100%;
    }

    .visible {
        visibility: visible;
    }

    .textContent {
        overflow: hidden;
        width: 90%;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        padding-left: 0;
        color: #384369; // font-family: 'fzlt';

        &.codeInput {
            width: 70%;
        }
    }

    ::placeholder {
        // font-family: 'fzlt';
        color: #b2bac9;
    }

    .textEmpty::placeholder {
        // color: #ff5A5A;
    }
}

.isFocus {
    // border-bottom: solid #437cee 2px !important;
    // border-bottom: solid var(--p1) 2px !important;
}

.isError {
    // border-bottom: solid #ff5a5a 2px !important;
}

.errorMsg,
.emptyMsg {
    color: #ff5a5a;
    font-size: 10px;
}

.emptyMsg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 90%;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
}

.errorMsg {
    line-height: 20px;
    margin-top: 2px;
}
</style>
