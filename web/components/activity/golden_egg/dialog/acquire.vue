<template>
  <van-overlay
    :show="show"
    :lock-scroll="true"
    class="flex overlay-cls items-center justify-center actstatus"
  >
    <div class="dialog-content flex flex-layout-v items-center">
      <img :src="currentUrl"/>
      <div class="dialog-content-close" @click="close"></div>
      <div class="dialog-content-btn" @click="closeBtn">立即砸蛋<span>({{ countdown }}s)</span></div>
    </div>
  </van-overlay>
</template>

<script>

export default {
    'props': ['show', 'amount'],
    data () {
        return { 
          'isApp': false,
          gold: "https://maumkt.ppdaicdn.com/acp/uploadImages/DVUZIW20250219075818.png",
          silver: "https://maumkt.ppdaicdn.com/acp/uploadImages/CWPTUX20250219075752.png",
          copper: "https://maumkt.ppdaicdn.com/acp/uploadImages/DXYKOT20250219075807.png",
          'countdown': 0,
          'timeFlag': null,
        }
    },
    'watch': {
      show(val) {
        if (val) {
          this.countdown = 3
          clearTimeout(this.timeFlag)
          this.customInterval(3)
        }
      }
    },
    computed: {
      currentUrl() {
        return this.amount === 3 ? this.gold : this.amount === 2 ? this.silver : this.copper
      },
    },
    created () {

    },
    'methods': {
      customInterval(count) {
        // 砸蛋逻辑
        if (count <= 0 && this.show) {
            this.$emit('update:show', false)
            this.$emit("tapEgg", this.amount)
            return
        }
        this.timeFlag = setTimeout(() => {
            if (this.countdown <= 0) {
                return
            }
            this.countdown -= 1
            this.customInterval(count - 1)
        }, 1000)
      },
      close () {
        this.$emit('trace', {
            'event': 'h5_clk',
            'params': {
                'tgt_event_id': 'super_guide_popup',
                'tgt_name': 'super-活动引导弹窗',
                'param1': this.amount,
                'param3': '关闭',
                'param4': 0,
                'param7': 0
            }
        })
        this.$emit('acquireCloseClick', this.amount)
        this.$emit('update:show', false)
      },
      closeBtn() {
        // 砸蛋逻辑
        this.$emit('trace', {
            'event': 'h5_clk',
            'params': {
                'tgt_event_id': 'super_guide_popup',
                'tgt_name': 'super-活动引导弹窗',
                'param1': this.amount,
                'param3': '立即砸蛋',
                'param4': 0,
                'param7': 0
            }
        })
        this.$emit("tapEgg", this.amount)
        this.$emit('update:show', false)
      }
    }
}
</script>

<style lang="less" scoped>
.backgroundImage(@width, @height, @url) {
    width: @width;
    height: @height;
    background-image: url(@url);
    background-size: 100% 100%;
}

.overlay-cls {
    z-index: 999;
}

.dialog-content {
    width: 301px;
    position: relative;
    img {
      width: 301px;
      height: 340px;
    }

    &-close {
      width: 30px;
      position: absolute;
      right: 10px;
      top: 10px;
      height: 30px;
    }

    &-btn {
        width: 255px;
        height: 45px;
        margin-top: 30px;
        position: absolute;
        bottom: 20px;
        font-size: 16px;
        line-height: 47px;
        font-weight: bold;
        text-align: center;
        left: 0px;
        right: 0px;
        margin: auto;
    }
}
</style>
