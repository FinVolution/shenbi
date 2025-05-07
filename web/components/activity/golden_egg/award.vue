<template>
    <div class="footers">
      <Swiper ref="mySwiper" :options="swiperOption">
        <SwiperSlide v-for="item in list" :key="item.awardTime">
          <img :src="item" />
        </SwiperSlide>
      </Swiper>
    </div>
  </template>
  
  <script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'  
export default {
    'name': 'guagualeaward',
    'components': {
    Swiper,
    SwiperSlide
    },
    props: {
        itemConfig: {
            type: Object,
            default () {
                return {
                    containerStyle: null,
                    property: null,
                    elemStyle: null,
                    selfStyle: null,
                };
            },
        }
    },
    data () {
        return {
            'list': [],
            'swiperOption': {
                'autoplay': {
                    'delay': 0,
                    'autoplayDisableOnInteraction': false,
                    'disableOnInteraction': true
                },
                'centeredSlides': true,
                // 'autoplayDisableOnInteraction': false,
                'loop': true,
                'allowTouchMove': false,
                'spaceBetween': 2,
                'direction': 'horizontal',
                'speed': 2500,
                'slidesPerView': 4,
                // 'height': 74,
                // 'width': 64,
                'observer': true,
                'observeParents': true
            }
        }
    },
    watch: {
        itemConfig: {
            handler: function(nObj) {
                let { property, elemStyle, selfStyle } = nObj || {};
                Object.assign(this, { property, elemStyle, selfStyle });
                this.list = [
                    elemStyle.golden_award.bgImgUrl,
                    elemStyle.silvery_award.bgImgUrl,
                    elemStyle.coppery_award.bgImgUrl,
                    elemStyle.tengxun_award.bgImgUrl,
                    elemStyle.xianjin_award.bgImgUrl]
            },
            immediate: true,
            deep: true,
        },
    }
  }
  </script>
  <style >
  .swiper-wrapper {
      transition-timing-function: linear;
  }
  </style>
  <style lang="less" scoped>
  .footers {
      height: 96px;
      overflow: hidden;
      width: 100%;
      margin-top: 46px;
      padding: 0;
      color: #ffffff;
      img {
          width: 72px;
          height: 96px;
      }
  }
  </style>
  