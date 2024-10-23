<template>
    <div class="editor-nineGird-container" :style="elemStyle && generateStyleByObj(selfStyle)">
        <div class="nineGird-container" :style="elemStyle && generateStyleByObj(elemStyle.outerBg)">
            <div class="nineGird-list" :class="isStart ? 'start' : 'normal'">
                <div class="item-container">
                    <div
                        v-for="(item, index) in property.list"
                        :key="index"
                        class="item"
                        :class="rotateDeg(index)"
                        :style="generateStyleByObj(elemStyle.awardList)"
                    >
                        <img :src="item.url" v-if="item.url" :style="generateStyleByObj(elemStyle.awardImg)"/>
                        <div class="title">{{ item.name }}</div>
                    </div>
                </div>
            </div>
            <div class="nineGird-light" :style="elemStyle && generateStyleByObj(elemStyle.light1)" v-show="rotateLight"></div>
            <div class="nineGird-light" :style="elemStyle && generateStyleByObj(elemStyle.light2)" v-show="!rotateLight"></div>
            <div class="gift-start" :style="elemStyle && generateStyleByObj(elemStyle.button)"></div>
            <div class="gift-start-div" @click="onStartGame"></div>
        </div>
        <div class="nineGird-count" v-if="property.opportunitySwitch" :style="elemStyle && generateStyleByObj(elemStyle.oppotunityColor)">
            您有<span :style="elemStyle && generateStyleByObj(elemStyle.oppotunityCountColor)">{{remainOpportunity}}</span>次抽奖机会
        </div>
    </div>
</template>

<script>
import { generateStyleByObj } from '../index'

export default {
    props: {
        itemConfig: {
            type: Object,
            default () {
                return {
                    property: null,
                    elemStyle: null,
                    selfStyle: null
                }
            }
        },
        result: {
            type: Number,
            default: -1
        },
        isStart: {
            type: Boolean,
            default: false
        },
        remainOpportunity: {
            type: Number,
            default: 0
        },
    },
    watch:{
        itemConfig: {
            handler: function(nObj){
                let {property, elemStyle, selfStyle} = nObj || {}
                Object.assign(this,{property, elemStyle, selfStyle})
            },
            immediate: true,
            deep: true
        },
        isStart(newVal, oldVal) {
            if (newVal) {
                this.starAnim()
            }
        }
    },
    data() {
        return {
            currentIndex: 0,
            rotateLight: false,
            count: 0
        }
    },
    created() {
        setInterval(() => {
            this.rotateLight = !this.rotateLight;
        }, 300);
    },
    methods: {
        generateStyleByObj,
        starAnim() {
            clearInterval(this.initAnimDefalut);
            this.startAnim = setInterval(() => {
                this.currentIndex++;
                if (this.gameOver) {
                    if (this.currentIndex === this.result) {
                        clearInterval(this.startAnim);
                        this.gameOver = false;
                        this.count = 0;
                        this.slowAnim();
                    }
                }

                if (this.currentIndex >= this.property.list.length) {
                    this.currentIndex = 0;
                    this.count++;
                }
                if (this.count >= 3) {
                    this.gameOver = true;
                    if (this.currentIndex === this.result) {
                        clearInterval(this.startAnim);
                        this.gameOver = false;
                        this.count = 0;
                        this.slowAnim();
                    }
                }
            }, 50);
        },
        slowAnim() {
            this.slowAnimation = setInterval(() => {
                this.currentIndex++;
                if (this.gameOver) {
                    if (this.currentIndex === this.result) {
                        clearInterval(this.slowAnimation);
                        this.gameOver = false;
                        this.count = 0;
                        this.endAnim();
                    }
                }
                if (this.currentIndex >= this.property.list.length) {
                    this.currentIndex = 0;
                    this.count++;
                }
                if (this.count >= 2) {
                    this.gameOver = true;
                    if (this.currentIndex === this.result) {
                        clearInterval(this.slowAnimation);
                        this.gameOver = false;
                        this.count = 0;
                        this.endAnim();
                    }
                }
            }, 80);
        },
        endAnim() {
            this.endAnimation = setInterval(() => {
                this.currentIndex++;
                if (this.gameOver) {
                    if (this.currentIndex === this.result) {
                        clearInterval(this.endAnimation);
                        this.gameOver = false;
                        this.count = 0;
                    }
                }
                if (this.currentIndex >= this.property.list.length) {
                    this.currentIndex = 0;
                    this.count++;
                }
                if (this.count >= 1) {
                    this.gameOver = true;
                    if (this.currentIndex === this.result) {
                        clearInterval(this.endAnimation);
                        this.gameOver = false;
                        this.count = 0;
                    }
                }
            }, 200);
        },
        rotateDeg(index) {
            let secondStyle = this.currentIndex === index ? 'cover-opacity' : 'cover-opacity-half'
            if (!this.isStart) {
                secondStyle = 'cover-opacity'
            }
            return `${secondStyle} item${index}`
        },
        onStartGame() {
            this.$emit('onStartGame')
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/base/mixins.less';
@asserts: '../../images';
.editor-nineGird-container {
    .setSize(100%, 100%);
    .nineGird-container {
        width: 337px;
        height: 344px;
        .setFlexPos(column, flex-start, center);
        position: relative;
        .nineGird-list {
            .setPosition(absolute, 0, 0, 0 ,0);
            margin: auto;
            .item-container {
                .setSize(100%, 100%);
                position: relative;
                box-sizing: border-box;
                .item {
                    .setFlexPos(column, center, center);
                    img {
                        .setSize(66px, 50px);
                        
                        min-height: 46px;
                        object-fit: cover;
                    }
                    .title {
                        text-align: center;
                        margin-top: 5px;
                        line-height: 12px;
                        color: #4a4a4a;
                        .f-10-bold();
                    }
                }
                .cover {
                    background: rgba(95, 180, 251, 1);
                    border-radius: 8px;
                    opacity: 0.5;
                    position: absolute;
                    display: inline-block;
                }
                .cover-opacity {
                    opacity: 1;
                    background: transparent;
                }
                .cover-opacity-half {
                    opacity: 0.5;
                }
                .item0 {
                    left: 28px;
                    top: 28px;
                }
                .item1 {
                    left: 126px;
                    top: 28px;
                }
                .item2 {
                    left: 224px;
                    top: 28px;
                }
                .item3 {
                    left: 224px;
                    top: 127px;
                }
                .item4 {
                    left: 224px;
                    top: 226px;
                }
                .item5 {
                    left: 126px;
                    top: 226px;
                }
                .item6 {
                    left: 28px;
                    top: 226px;
                }
                .item7 {
                    left: 28px;
                    top: 127px;
                }
            }
        }
        .start {
            animation: rotate-center-start 5s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes rotate-center-start {
            0% {
                -webkit-transform: rotate(0);
                transform: rotate(0);
            }
            100% {
                -webkit-transform: var(--rotateReg);
                transform: var(--rotateReg);
            }
        }
        .gift-start {
            .setSize(93px, 92px);
        }
        .gift-start-div {
            .setSize(93px, 92px);
            .setPosition(absolute, 0, 0, 0 ,0);
            z-index: 11;
            margin: auto;
        }
        @keyframes scale-up-center {
            0% {
                -webkit-transform: scale(0.9);
                transform: scale(0.9);
            }
            100% {
                -webkit-transform: scale(1);
                transform: scale(1);
            }
        }
        .nineGird-light {
            .setSize(100%, 100%);
            .setPosition(absolute, 0, 0, 0 ,0);
        }
    }
    .nineGird-count {
        .f-16-bold();
        color: #fff;
        text-align: center;
        line-height: 18px;
        margin-top: 18px;
        span {
            padding: 0 5px;
            color: #FF9663;
        }
    }
}
</style>