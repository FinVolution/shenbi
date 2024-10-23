<template>
    <div id="swiperBySelf" class="swiper-content" :style="generateStyleByObj(itemConfig.selfStyle)" v-if="property.swiperist">
            <div ref="mySwiper2" class="swiper-container">
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide"
                        v-for="(item, index) in property.swiperist"
                        :key="index"
                    >
                        <div class="swiper_card" @click="storyClick(item)">
                            <img :src="item.bgImg || item.icon" alt="" />
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import { generateStyleByObj } from '../index'
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
export default {
    components: {
    },
    data() {
        return {
            idx: 0,
            swiperOption: {
                loop: false,
                speed: 800,
                spaceBetween: 0,
                slidesPerView: 'auto',
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                direction: 'horizontal',
            },
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
    created() {
    },
    mounted() {
        this.mySwiper = new Swiper('.swiper-container', this.swiperOption);
    },
    computed: {
        getLeft: function () {
                let left = ''
                if (this.idx == 0) {
                   left = 0
                } else if(this.idx >= this.gsgsList.length - 2) {
                    left = 16 + 'px'
                } else {
                    left = 16 / (this.gsgsList.length - 1) * this.idx + 'px'
                }
                return left
            },
    },
    methods: {
        generateStyleByObj,
        storyClick(item) {
            this.$emit('onCardItemClick', item)
        }
    }
}

</script>

<style lang="less" scoped>
.swiper-content {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    .swiper-container {
        width: 100%;
        height: 100%;
        .swiper-slide {
            width: 188px !important;
            margin-left: 15px;
            .swiper_card {
                width: 188px;
                height: 171px;
                img {
                    width: 188px;
                    height: 171px;
                }
            }
        }
    }
}
</style>
