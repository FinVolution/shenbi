<template>
    <div class="question" :style="generateStyleByObj(itemConfig.selfStyle)">
        <div class="question-title">
            <img src="../images/dot_left@2x.png" />
            <span :style="generateStyleByObj(elemStyle.listTitle)">{{property.title}}</span>
            <img src="../images/dot_right@2x.png" />
        </div>
        <div :class="`question-${index}`" class="item" v-for="(item, index) of property.list" :key="index">
            <div class="qa_icon">
                <img :src="elemStyle.listItemIcon.bgImgUrl" />
            </div>
            <div>
                <div :style="generateStyleByObj(elemStyle.listItemTitle)">{{item.question}}</div>
                <div :style="generateStyleByObj(elemStyle.listItemContent)">{{item.answer}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { generateStyleByObj } from '../../index';

export default {
    name: 'o2oList',
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
            width: 10px;
            height: 7px;
            vertical-align: middle;
        }
        span {
            margin: 0 8px;
            vertical-align: middle;
        }
    }
    .item {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .qa_icon {
            margin-right: 6px;
            img {
                width: 16px;
                height: 16px;
            }
        }
    }
}
</style>