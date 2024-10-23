<template>
    <div class="question" :style="generateStyleByObj(itemConfig.selfStyle)">
        <div class="question-title">
            <img src="../images/title_left@2x.png" />
            <span :style="generateStyleByObj(elemStyle.listTitle)">{{property.title}}</span>
            <img src="../images/title_right@2x.png" />
        </div>
        <div v-if="elemStyle.listImage.bgImgUrl" class="process-img" :style="generateStyleByObj(elemStyle.listImage)">
            <img :src="elemStyle.listImage.bgImgUrl" />
        </div>
        <div :class="`question-${index}`" class="item" v-for="(item, index) of property.list" :key="index">
            <div class="qa_icon" v-if="elemStyle.listItemIcon.bgImgUrl">
                <img :src="elemStyle.listItemIcon.bgImgUrl" />
            </div>
            <div v-else class="dot_icon"><span></span></div>
            <div>
                <div v-if="item.question" :style="generateStyleByObj(elemStyle.listItemTitle)">{{item.question}}</div>
                <div v-if="item.answer" :class="elemStyle.listItemIcon.bgImgUrl?'answer':'title'" :style="generateStyleByObj(elemStyle.listItemContent)">{{item.answer}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { generateStyleByObj } from '../../index';

export default {
    name: 'o2oComList',
    props: {
        itemConfig: {
            type: Object,
            default() {
                return {
                    containerStyle: null,
                    property: null,
                    elemStyle: null,
                    selfStyle: null
                };
            }
        }
    },
    computed: {
        property() {
            return this.itemConfig.property;
        },
        elemStyle() {
            return this.itemConfig.elemStyle;
        }
    },
    methods: {
        generateStyleByObj
    }
};
</script>

<style lang="less" scoped>
.question {
    .question-title {
        padding: 0 0 26px;
        text-align: center;
        img {
            width: 37px;
            height: 3px;
            vertical-align: middle;
        }
        span {
            margin: 0 10px;
            vertical-align: middle;
        }
    }
    .process-img {
        margin: 0 auto;
        text-align: center;
        img {
            width: 293px;
            height: 67px;
            opacity: 0.3;
        }
    }
    .item {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        .qa_icon {
            margin-right: 8px;
            img {
                width: 16px;
                height: 16px;
            }
        }
        .dot_icon {
            width: 16px;
            height: 13px;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                display: block;
                width: 3px;
                height: 3px;
                background: #40526A;
                border-radius: 1.5px;
            }
        }
        .answer {
            opacity: 0.6;
        }
        .title {
            opacity: 0.8;
        }
    }
}
</style>