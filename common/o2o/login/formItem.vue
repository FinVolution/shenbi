<template>
    <div v-if="data.type !== 'gap'" class="formItem" @click="linkTo">
        <h4 class="title" :class="{ visible: visible || finishContact }" style="margin:0px;" :style="styleConfig">
            {{ data.name }}
        </h4>
        <!-- 数字输入框 -->
        <template v-if="data.inputType === 'tel'" class="textInputContent">
            <input
                class="textContent"
                :class="[{ textEmpty: isEmpty }]"
                :type="data.inputType || 'text'"
                :maxlength="data.maxLength > 0 && data.maxLength"
                :minlength="data.maxLength > 0 && data.minLength"
                :placeholder="placeholder || data.hint"
                :value="curValue"
                :id="data.key === 'phone' ? 'tel_number': ''"
                oninput="value=value.replace(/[^\d]/g,'')"
                @input="changeInput"
                @blur="blurInput"
                @focus="focusInput"
            />
            <span class="textContentUnit">{{ data.unit }}</span>
        </template>
        <!-- 输入框 -->
        <template v-else-if="data.type === 'textInput'" class="textInputContent">
            <input
                class="textContent"
                :class="[{ textEmpty: isEmpty }]"
                :type="data.type || 'text'"
                :maxlength="data.maxLength > 0 && data.maxLength"
                :minlength="data.maxLength > 0 && data.minLength"
                :placeholder="placeholder || data.hint"
                :value="curValue"
                @input="changeInput"
                @blur="blurInput"
                @focus="focusInput"
            />
            <span class="textContentUnit">{{ data.unit }}</span>
        </template>

        <!-- 选择框 -->
        <template v-else-if="data.type === 'selectInput'">
            <p v-if="!curValue" class="textContent textPlaceholder">
                {{ data.hint }}
            </p>
            <p v-else class="textContent">
                {{ (data.key === 'ownerShip' || data.key === 'isLoan') ? (curValue || curText) : selectValue }}
            </p>
            <span class="icon_arrow"></span>
        </template>

        <!-- address -->
        <template v-else-if="data.type === 'address'">
            <p v-if="!this.curValue" class="textContent textPlaceholder">
                {{ data.hint }}
            </p>
            <p v-else class="textContent">
                {{ curValue || curText }}
            </p>
            <span class="icon_arrow"></span>
        </template>
    </div>
</template>
<script>
export default {
    props: ['curKey', 'data', 'otherInfoForm', 'finishContact', 'value', 'selectValue', 'styleConfig'],
    data() {
        return {
            curValue: '',
            curText: '',
            isEmpty: false,
            placeholder: '',
            isFocus: false, // 标记当前选项是否聚焦
        };
    },
    computed: {
        visible() {
            return !!this.curValue;
        },
    },
    watch: {
        data: {
            immediate: true,
            handler() {
                const list = this.data.data;
                if (
                    typeof list !== 'undefined' &&
                    Object.prototype.toString.call(list) === '[object Array]'
                ) {
                    list.length &&
                        list.forEach(item => {
                            if (
                                this.data.type === 'selectInput' &&
                                item.curValue === this.data.curValue
                            ) {
                                this.curText = item.text;
                            }
                            if (this.data.type === 'textInput') {
                                this.curText = this.data.value;
                            }
                        });
                }
            },
        },
        value: {
            immediate: true,
            handler(val) {
                setTimeout(() => {
                    this.curValue = val;
                }, 0);
            },
        },
    },
    methods: {
        changeInput(e) {
            const val = e.target.value;
            this.curValue = val;
            this.$set(this.otherInfoForm[this.curKey], 'value', val);
            this.isEmpty = false;
            this.$emit('changeInput', val, this.curKey);
        },
        linkTo() {
            this.$emit('linkTo', this.data);
        },
        focusInput() {
            this.$emit('focusInput', this.data)
            this.isFocus = true;
            this.isEmpty = false;
        },
        // 失焦校验
        blurInput() {
            let errMsg = '';
            this.isFocus = false;
            if (this.curValue) {
                this.curValue = this.curValue.replace(/[\u200B-\u200D\uFEFF]/g, '');
            }
            // 为空
            if (!this.curValue) {
                this.isEmpty = true;
                // this.$emit('blurItem', 0);
            } else if (
                this.curValue === this.value &&
                this.curValue.includes('*') &&
                ['applyName', 'phone'].includes(this.curKey)
            ) {
                // 用户信息填写未曾修改，不需要校验正则
                console.log('未曾修改过');
            } else if (
                this.data.minLength !== 0 &&
                this.data.maxLength !== 0 &&
                (this.curValue.length < this.data.minLength ||
                    this.curValue.length > this.data.maxLength)
            ) {
                // 长度限制
                this.isEmpty = false;
                if (this.curValue.length < this.data.minLength) {
                    errMsg = `最低不能少于${this.data.minLength}位`;
                    this.$toast(errMsg);
                } else {
                    errMsg = `最高不超过${this.data.maxLength}位`;
                    this.$toast(errMsg);
                }
                this.$emit('blurItem', errMsg);
            } else if (this.data.reg) {
                const reg = new RegExp(this.data.reg);
                console.log('reg',reg,'val',this.curValue)
                if (!reg.test(this.curValue)) {
                    errMsg = `请输入正确的${this.data.name}`;
                    this.$toast(errMsg);
                    this.isEmpty = false;
                    this.$emit('blurItem', errMsg);
                }
            } else {
                this.isEmpty = false;
                // this.$emit('blurItem', this.data, 'finish');
            }
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
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)!important;
    -webkit-focus-ring-color: rgba(0, 0, 0, 0)!important;
    outline: none!important;
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
.formItem {
    position: relative;
    height: 69px;
    padding: 27px 0 1px;
    .title {
        visibility: hidden;
        height: 10px;
        color: #60bbf0;
        font-size: 10px;
        font-weight: bold;
    }
    .icon_arrow {
        position: absolute;
        right: 0;
        bottom: 9px;
        width: 8px;
        height: 10px;
        background: url('../images/right_arrow.png') no-repeat;
        background-size: 100% 100%;
    }
    .visible {
        visibility: visible;
    }
    .textInputContent {
        position: relative;
        
    }
    .textContent {
        overflow: hidden;
        width: 90%;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        padding-left: 0;
        padding-top: 2px;
        color: #002A3C;
    }
    ::placeholder {
        color: #b2bac9;
    }
    .textPlaceholder {
        color: #b2bac9;
    }
    .textContentUnit {
        position: absolute;
        right: 0;
        bottom: 8px;
        font-size: 16px;
        color: #49596c;
    }
}
.formItem::after {
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
</style>
