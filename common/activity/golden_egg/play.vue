<template>
  <div class="play-container" :style="generateStyleByObj(selfStyle)">
    <div class="play-egg">
      <div class="content" v-for="(item, index) in award" :key="index">
        <img :src="showImg(item)" alt="" :id="'img'+item.lotteryType">
        <div :id="'egg'+item.lotteryType" class="egg"></div>
        <div class="swiper mySwiper" @click="playAnimation(item.lotteryType, btnText(item))" :class="'lotteryType '+item.lotteryType" v-if="!btnText(item).includes('next')">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(_,btnIndex) in 2" :key="index+'key'+item.lotteryType+btnIndex">
                    <div v-if="btnIndex === 0" class="state" :class="btnText(item)">{{ originText(btnText(item)) }}</div>
                    <div v-else class="state" :class="btnText(item)" :id="'img'+item.lotteryType">{{ scrollText(item.lotteryType) }}</div>
                </div>
            </div>
        </div>
        <div v-else class="state" :class="btnText(item)">下周再来</div>
        <template v-if="item.lotteryType === 3">
          <div class="subtitle" v-if="currentOpen || taskAmountScene === 'showAmount'">{{ item.desc }}</div>
          <div class="subtitle" v-else>xxxx用户可享</div>
        </template>
        <template v-else>
          <div class="subtitle">{{ item.desc }}</div>
        </template>
        <img v-if="showAnimHand === 1 && currentOpen === true && handNum === item.lotteryType" :class="'shake-hand'+index" :src="elemStyle.hand_bg.bgImgUrl" style="pointer-events: none;"/>
      </div>
    </div>

    <slot>
      <AwardShow :itemConfig="itemConfig"/>
    </slot>
  </div>
</template>
<script>
import { generateStyleByObj } from '../../index';
import _ from 'lodash';
import lottie from 'lottie-web';
import animationGold from '../../../public/json/golden_egg/gold/gold.json'
import animationSilver from '../../../public/json/golden_egg/silver/silver.json'
import animationCopper from '../../../public/json/golden_egg/copper/copper.json'
import Swiper from 'swiper';
import AwardShow from './award.vue';

export default {
  name: 'guagualeplayComponent',
  components: {
    AwardShow
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
    },
    showAnimHand: {
        type: Number,
        default: 2,
    },
    isTemplate: {
        type: Boolean,
        default: false,
    },
    chance: {
      type: Number,
      default: 0,
    },
    award: {
      type: Array,
      default: function() { 
        return [
          {
            "availableOpportunity": 100,
            "desc": "xxxx用户可享",
            "lotteryType": 1,
            "totalOpportunity": 100
          },
          {
            "availableOpportunity": 100,
            "desc": "xxxx用户可享",
            "lotteryType": 2,
            "totalOpportunity": 100
          },
          {
            "availableOpportunity": 100,
            "desc": "周末活动xxxx",
            "lotteryType": 3,
            "totalOpportunity": 100
          }
        ]
      },
    },
    startGame: {
      type: Function,
      default: () => {}
    },
    currentOpen: {
      type: Number | Boolean,
      default: false,
    },
    handNum: {
      type: Number,
      default: -1,
    },
    taskAmountScene: {
      type: String,
      default: '',
    }
  
  },
  data() {
    return {
      showFloating: false,
      imgList: [],
    }
  },
  watch: {
    itemConfig: {
      handler: function(nObj) {
          let { property, elemStyle, selfStyle } = nObj || {};
          Object.assign(this, { property, elemStyle, selfStyle });
          this.imgList = [
            {
              staicImg: elemStyle.coppery_egg.bgImgUrl,
              openImg: elemStyle.coppery_open.bgImgUrl,
            },
            {
              staicImg: elemStyle.silvery_egg.bgImgUrl,
              openImg: elemStyle.silvery_open.bgImgUrl,
            },
            {
              staicImg: elemStyle.golden_egg.bgImgUrl,
              openImg: elemStyle.golden_open.bgImgUrl,
            },]
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    awardTitle() {
      return this.award && this.award.desc || ''
    }
  },
  mounted() {
    this.trace(this.award)
    this.initSwiper()
  },
  methods: {
    initSwiper() {
      this.swiper = new Swiper('.mySwiper', {
        slidesPerView: 'auto',
        loop: true,
        direction: 'vertical',
        allowTouchMove: false,
        autoplay: {
          delay: 3000,  // 每 3 秒自动切换
          disableOnInteraction: false  // 用户交互后继续自动播放
        },
      });
    },
    generateStyleByObj,
    trace(obj) {
      obj.forEach(item => {
        let stateEgg = this.btnText(item).split(' ')[0]
      });
    },
    scrollText(val) {
      return val === 1? '最高200元' : val === 2? '最高500元' : val === 3? '最高1000元' : ''
    },
    originText(val) {
      let btnType = val.split(' ')[0]
      return btnType === 'open-egg'? '立即砸蛋' : btnType === 'next-egg'? '下周再来' : btnType === 'lock-egg'? '点击解锁' : ''
    },
    btnText(item) {
      if(item.totalOpportunity > 0 && item.availableOpportunity > 0) {
        return 'open-egg'+` ${item.lotteryType}`
      }else if(item.totalOpportunity > 0 && item.availableOpportunity === 0) {
        return 'next-egg'+` ${item.lotteryType}`
      }else if(item.totalOpportunity === 0){
        return 'lock-egg'+` ${item.lotteryType}`
      } else {
        return 'lock-egg'+` ${item.lotteryType}`
      }
    },
    showImg(item) {
      if(item.totalOpportunity > 0 && item.availableOpportunity > 0) {
        return this.imgList[item.lotteryType-1].staicImg
      }else if(item.totalOpportunity > 0 && item.availableOpportunity === 0) {
        return this.imgList[item.lotteryType-1].openImg
      }else if(item.totalOpportunity === 0){
        return this.imgList[item.lotteryType-1].staicImg
      } else {
        return this.imgList[item.lotteryType-1].staicImg
      }
    },
    reset(){
      console.log('游戏结果 reset', this.$refs.scratch)
      this.$refs.scratch.reset()
    },
    start(nObj) {
      if(nObj) {
           this.selectRandomImgs();
      }else {
        this.luckyImgs = this.imgList
      }
      console.log('游戏结果start ')
    },
    async outerTapEgg(type) {
      await this.playAnimation(type, this.btnText(this.award[type - 1]))
    },
  async playAnimation(lotteryType, type) {
      console.log('playAnimation', type)
      let stateType = type.split(' ')[0]
      if(this.startAnimation) {
        return
      }
      this.startAnimation = true
      if(stateType === 'open-egg') {
        this.animation = lottie.loadAnimation({
            container: document.getElementById('egg'+lotteryType),
            renderer: 'svg',
            loop: false,
            name: 'egg',
            autoplay: false,
            animationData: lotteryType == 1? animationCopper : lotteryType == 2? animationSilver : lotteryType == 3? animationGold : animationGold,
        });
        this.$nextTick(() => {
            this.animation.play();
        });
        this.animationIndex = lotteryType
        await this.startGame(lotteryType)
        this.startAnimation = false;
      }else if(stateType === 'lock-egg') {
        this.startAnimation = false;
        this.$emit('lockEgg', lotteryType)
      }else {
        this.startAnimation = false;
      }
    },
    limitClick() {
      this.startAnimation = false
    },
    stopAnimation() {
      this.animation.destroy();
    },
  }
}
</script>
<style lang="less" scoped>
.mySwiper {
    width: 71px;
    height: 22px;
    overflow: hidden;
    position: relative;
    .swiper-wrapper {
      width: 71px;
    }
    .swiper-slide {
        width: 71px;
        height: 22px;
    }
}
.play-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 56px 18px 18px 24px;
    .play-egg {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        img {
          width: 100px;
          height: 130px;
          margin-bottom: 6px;
        }
        .state {
          width: 71px;
          height: 22px;
          font-size: 13px;
          font-weight: 600;
          line-height: 22px;
          letter-spacing: -1px;
          color: #FFFFFF;
          text-align: center;
        }
        .open-egg {
          background: url("https://maumkt.ppdaicdn.com/acp/uploadImages/NOYOLP20250224032702.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .lock-egg {
          background: url("https://maumkt.ppdaicdn.com/acp/uploadImages/PWGTVF20250224032716.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .next-egg {
          background: url("https://maumkt.ppdaicdn.com/acp/uploadImages/GVHBDO20250224032726.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .subtitle {
          font-size: 11px;
          font-weight: normal;
          line-height: 12px;
          text-align: center;
          color: #906B5D;
          margin-top: 6px;
        }
        .egg {
          position: absolute;
          width: 100px;
          height: 130px;
          margin-bottom: 6px;
        }
        .shake-hand0 {
          width: 30 * 2.5px;
          height: 33 * 2.5px;
          z-index: 88;
          position: absolute;
          margin: auto;
          right: -10px;
          bottom: -30px;
          animation: scaleDrew 2.5s ease-in-out infinite;
      }
      .shake-hand1 {
          width: 30 * 2.5px;
          height: 33 * 2.5px;
          z-index: 88;
          position: absolute;
          margin: auto;
          right: -10px;
          bottom: -30px;
          animation: scaleDrew 2.5s ease-in-out infinite;
      }
      .shake-hand2 {
          width: 30 * 2.5px;
          height: 33 * 2.5px;
          z-index: 88;
          position: absolute;
          margin: auto;
          right: -10px;
          bottom: -30px;
          animation: scaleDrew 2.5s ease-in-out infinite;
      }
      @keyframes scaleDrew {
          0% {
          transform: scale(1);
          }

          25% {
          transform: scale(1.2);
          }

          50% {
          transform: scale(1);
          }

          75% {
          transform: scale(1.2);
          }
      }
      }
    }

}
</style>
