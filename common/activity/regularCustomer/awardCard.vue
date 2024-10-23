<template>
    <section :style="generateStyleByObj(selfStyle)">
        <div class="award-card" v-if="switchOldVersion">
            <div class="card-title" :style="generateStyleByObj(itemConfig.elemStyle.titleColor)">
                {{ property.title }}
            </div>
            <ul class="card-body">
                <li v-for="(item, index) in awardList" :key="index" class="card-body-item">
                    <div class="award-box" :style="generateStyleByObj(itemConfig.elemStyle.awardBg)">
                        <img :src="item.bigPic" alt="award" class="award-img" />
                        <div class="award-name">{{ item.awardName }}</div>
                    </div>
                    <div
                    :class="['award-button', 'flex', { disabled: item.buttonDisabled }]"
                    :style="generateStyleByObj(itemConfig.elemStyle.buttonBgColor)"
                    @click="handleClick(item)"
                    >
                        <span :style="generateStyleByObj(itemConfig.elemStyle.buttonColor)">
                            {{ item.buttonText }}
                        </span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="award-card-new" v-else :style="generateStyleByObj(itemConfig.elemStyle.redAwardCardBg)">
            <div v-for="(item, index) in awardList" :key="index" class="card-body-new">
                <div class="award-name-new">{{ item.awardName }}</div>
                <img :src="item.bigPic" alt="award" class="award-img-new" />
                <div
                :class="['award-button-new', { 'disabled-new': item.buttonDisabled }]"
                :style="[generateStyleByObj(itemConfig.elemStyle.redAwardCardButton),generateStyleByObj(itemConfig.elemStyle.buttonColor)]"
                @click="handleClick(item)"
                >
                    {{ item.buttonText }}    
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { generateStyleByObj } from '../../index';

export default {
    name: 'RCAwardCard',
    props: {
        itemConfig: {
            type: Object,
            default() {
                return {
                    containerStyle: null,
                    property: null,
                    elemStyle: null,
                    selfStyle: null,
                };
            },
        },
        list: {
            type: Array,
            default: null,
        },
        isTemplate: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {};
    },
    computed: {
        switchOldVersion() {
            return this.itemConfig.property.switchOldVersion
        },
        awardList() {
            if (this.list && this.list.length) {
                return this.list
            } else {
                if (!this.isTemplate) return []
                if (this.switchOldVersion) {
                    return new Array(4).fill({
                        status: 0,
                        picUrl: '',
                        smallPic: '',
                        bigPic: 'https://maumkt.ppdaicdn.com/acp/uploadImages/baicaowei.png',
                        awardKey: 'xxx',
                        awardName: 'xxx',
                        awardType: null,
                        batchNo: '',
                        recordId: null,
                        addressId: null,
                        expressNo: null,
                        expressName: null,
                        buttonText: 'xxx',
                        disabled: false,
                    });
                } else {
                    return new Array(4).fill({
                        status: 0,
                        picUrl: '',
                        smallPic: '',
                        bigPic: 'https://maumkt.ppdaicdn.com/22total_loan/red_sanjiantao.png',
                        awardKey: 'xxx',
                        awardName: 'xxx',
                        awardType: null,
                        batchNo: '',
                        recordId: null,
                        addressId: null,
                        expressNo: null,
                        expressName: null,
                        buttonText: 'xxx',
                        disabled: false,
                    });
                }
            }
        }
    },
    watch: {
        itemConfig: {
            handler: function (nObj) {
                let { property, elemStyle, selfStyle } = nObj || {};
                Object.assign(this, { property, elemStyle, selfStyle });
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        generateStyleByObj,

        handleClick(award) {
            const { buttonDisabled, buttonCallback } = award;
            if (buttonDisabled) return;
            if (typeof buttonCallback === 'function') {
                buttonCallback(award);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.card-title {
    padding-top: 20px;
    padding-bottom: 15px;
    font-size: 15px;
    font-weight: 600;
}
.card-body {
    width: 323px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.card-body-item {
    margin-bottom: 16px;
}
.award-box {
    width: 156px;
    height: 167px;
    margin-bottom: 9px;
}
.award-img {
    width: 166px;
    height: 131px;
    margin-left: -4px;
}
.award-name {
    height: 34px;
    font-size: 14px;
    font-weight: 600;
    color: #8a2504;
    line-height: 34px;
}
.award-button {
    width: 128px;
    height: 34px;
    font-size: 15px;
    font-weight: 400;
    border-radius: 19px;
}
.flex {
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
.disabled {
    background: #d7d7d7 !important;
}
.award-card-new {
    width: 361px;
    height: 498px;
    padding-top: 81px;
    display: flex;
    padding-left: 30px;
    flex-flow: wrap;
    align-content: flex-start;
}
.card-body-new {
    margin-right: 20px;
    display: flex;
    margin-bottom: 23px;
    flex-direction: column;
    align-items: center;
    height: 181px;
    .award-name-new {
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        color: #ffdebe;
    }
    .award-img-new {
        width: 140px;
        height: 116px;
        margin-top: 8px;
    }
    .award-button-new {
        width: 118px;
        margin-top: 5px;
        height: 30px;
        border-radius: 19px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
    }
    
}
.disabled-new {
    background: #b6b6b6 !important;
}
</style>
