<template>
    <div class="address">
        <ul class="form">
            <li class="form-item">
                <input type="text" v-model="form.receiverName" placeholder="请输入您的姓名" />
            </li>
            <li class="form-item">
                <input type="text" v-model="form.receiverMobile" placeholder="请输入您的手机号" />
            </li>
            <li class="form-item form-item-cascader" @click="visible = true">
                <span v-if="addressStr">{{ addressStr }}</span>
                <span v-else class="fake-placeholder">请选择您的收货地址</span>
            </li>
            <li class="form-item">
                <input v-model="form.addressDetail" placeholder="请输入您的详细地址" />
            </li>
        </ul>
        <button class="block-button" @click="handleSubmit">确认</button>

        <!-- 省市区选择 -->
        <van-popup v-model="visible" round position="bottom">
            <van-cascader
                v-model="cascaderValue"
                title="请选择"
                :options="addressList"
                :field-names="fieldNames"
                active-color="#3ca5e2"
                @close="visible = false"
                @change="onChangeCascader"
            >
            </van-cascader>
        </van-popup>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { customeTitle } from '@/utils/titlebar';
import { getQueryString } from '@/utils/query';
import { bindingAddress, choiceAward } from '@/service/regularCustomer';

export default {
    data() {
        return {
            titleBar: {
                fullScreen: '2', // 1全屏，2非全屏
                visible: '1',
                titleView: {
                    text: '新增收货地址',
                    color: '#000000',
                },
            },
            batchNo: '',
            form: {
                receiverName: '',
                receiverMobile: '',
                addressDetail: '',
            },
            addressStr: '', // 级联地址拼接后的字符串
            addressState: {
                provinceId: '',
                provinceName: '',
                cityId: '',
                cityName: '',
                areaId: '', // 三级地址（区县编码）
                areaName: '', // 三级地址（区县名称）
                townId: '', // 四级地址（乡镇编码）
                townName: '', // 四级地址（乡镇名称）
                batchNo: '', // 批次编号
            },
            visible: false,
            cascaderValue: '',
            fieldNames: {
                text: 'name',
                value: 'code',
                children: 'children',
            },
            activeCase: '', // 埋点用 触发场景：0选品|1更改地址
            loanTaskDone: '', // 埋点用 1-xx达标，0-未达标
            loading: false, // 防重点击
            activityType: '',
            recordId: '',
            awardKey: '',
        };
    },
    computed: {
        ...mapState('commonStore/address', ['addressList']),
    },
    created() {
        if (__isBrowser__) {
            customeTitle(this.titleBar);
            this.batchNo = getQueryString('batchNo');
            this.getProvinceList(this.batchNo);
            this.activityType = getQueryString('activityType');
            this.activeCase = parseInt(getQueryString('activeCase'));
            this.loanTaskDone = getQueryString('loanTaskDone');
            this.recordId = getQueryString('recordId');
            this.awardKey = getQueryString('awardKey');
        }
    },
    methods: {
        ...mapActions('commonStore/address', [
            'getProvinceList',
            'getStreeList',
            'saveShippingAddress',
        ]),

        goBack() {},

        async onChangeCascader({ value, selectedOptions, tabIndex }) {
            // 选中三级地址时，异步加载四级地址
            if (tabIndex === 2) {
                const { ret, data, msg } = await this.getStreeList({
                    parentId: value,
                    batchNo: this.batchNo,
                });
                if (ret === 0) {
                    if (data && data.length) {
                        selectedOptions[selectedOptions.length - 1].children = data;
                    }
                } else {
                    this.$toast(msg);
                }
            }
            // 手动触发onFinish
            if (!selectedOptions[selectedOptions.length - 1].children) {
                this.onFinish(selectedOptions);
            }
        },
        onFinish(selectedOptions) {
            this.visible = false;
            this.addressStr = selectedOptions.map(option => option.name).join('');
            this.addressState = {
                provinceId: selectedOptions[0].code,
                provinceName: selectedOptions[0].name,
                cityId: selectedOptions[1].code,
                cityName: selectedOptions[1].name,
                areaId: selectedOptions[2]?.code || '',
                areaName: selectedOptions[2]?.name || '',
                townId: selectedOptions[3]?.code || '',
                townName: selectedOptions[3]?.name || '',
            };
        },

        validate() {
            return new Promise((resolve, reject) => {
                if (!this.form.receiverName) {
                    reject('请输入您的姓名');
                }
                if (!/^\d{4}\d{3}\d{4}$/.test(this.form.receiverMobile)) {
                    reject('请输入正确的手机号码');
                }
                if (!this.addressState.provinceName) {
                    reject('请选择您的收货地址');
                }
                if (!this.form.addressDetail) {
                    reject('请输入您的详细地址');
                }
                resolve(true);
            });
        },

        handleSubmit() {
            if (this.loading) return;
            this.loading = true;
            this.validate()
                .then(async () => {
                    const params = {
                        batchNo: this.batchNo,
                        ...this.form,
                        ...this.addressState,
                    };
                    const res = await this.saveShippingAddress(params);
                    if (res && res.ret === 0) {
                        this.handleSubmitSuccess(res.data.addressId);
                    } else {
                        this.$toast({ position: 'middle', message: res.msg });
                    }
                })
                .catch(err => {
                    this.$toast(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        // 地址保存成功后，继续更换地址/选择礼品
        handleSubmitSuccess(addressId) {
            if (this.activeCase === 0) {
                this.handleChoiceAward(addressId);
            } else if (this.activeCase === 1) {
                this.handleBindingAddress(addressId);
            }
        },

        // 更换地址
        async handleBindingAddress(addressId) {
            const params = {
                addressId,
                activityType: this.activityType,
                recordId: this.recordId,
            };
            this.$toast.loading({
                duration: 0,
                forbidClick: true,
                message: '',
            });
            const { Result, Content, ResultMessage } = await bindingAddress(params);
            this.$toast.clear();
            if (Result === 200 && Content) {
                this.goBack();
            } else {
                this.setActivityStatus({
                    result: Result,
                    activityStatusMsg: ResultMessage,
                });
            }
        },

        // 选择礼品
        async handleChoiceAward(addressId) {
            const params = {
                addressId,
                activityType: this.activityType,
                awardKey: this.awardKey,
            };
            this.$toast.loading({
                duration: 0,
                forbidClick: true,
                message: '',
            });
            const { Result, Content, ResultMessage } = await choiceAward(params);
            this.$toast.clear();
            if (Result === 200 && Content) {
                this.goBack();
            } else {
                this.setActivityStatus({
                    result: Result,
                    activityStatusMsg: ResultMessage,
                });
            }
        },
    },
};
</script>

<style lang="less" scoped>
.address {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.form {
    margin: 0 20px;
    font-size: 16px;
    font-weight: 400;
    color: #002a3c;
}
.form-item {
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    height: 70px;
    padding: 7px 0;
    border-bottom: 1px solid #dae0ec;
    input {
        width: 100%;
    }
    input::-webkit-input-placeholder {
        color: #9faab5;
    }
}
.form-item-cascader {
    position: relative;
    &::after {
        position: absolute;
        right: 0;
        bottom: 10px;
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        border-color: #dae0ec;
        border-style: solid;
        border-width: 2px 2px 0 0;
        transform: rotate(45deg);
    }
}
.fake-placeholder {
    color: #9faab5;
}
.block-button {
    position: absolute;
    left: 50%;
    bottom: 40px;
    transform: translateX(-50%);
    width: 343px;
    height: 46px;
    font-size: 16px;
    font-weight: 800;
    color: #fcfffe;
    background: linear-gradient(90deg, #fb6d46 0%, #f83871 100%);
    border-radius: 22px;
    -webkit-tap-highlight-color: transparent;
}
</style>
