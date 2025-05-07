<template>
  <van-overlay :show="show" :lock-scroll="true" class="flex overlay-cls items-center justify-center actstatus">
    <div class="dialog-content flex flex-layout-v items-center">
      <div class="dialog-content-title">
        活动已结束
      </div>
      <div class="dialog-content-content text-center">
        抱歉活动已结束，请关注平台其他活动
      </div>
      <div class="dialog-content-btn" @click="close">
        关闭
      </div>
    </div>
  </van-overlay>
</template>

<script>
export default {
    'props': ['show'],
    data () {
        return { 'isApp': false }
    },
    'computed': {
    },
    created () {
    },
    mounted() {
      this.isApp = window.PPDWebUI && window.PPDWebUI.os.inApp
    },
    'methods': {
        close () {
            window.PPDWebUI.CommonService.close({})
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
    background: linear-gradient(180deg, #FFFFFF 0%, #FCF6FF 100%);
    border-radius: 8px;
    width: 303px;
    padding: 30px 0;

    &-title {
        color: #002A3C;
        font-size: 18px;
        font-weight: bold;
    }

    &-content {
        margin-top: 16px;
        font-size: 15px;
        color: #49596C;
        line-height: 22px;
        width: 255px;
        text-align: left;
    }

    &-btn {
        width: 255px;
        height: 45px;
        margin-top: 30px;
        background: linear-gradient(270deg, #FF0120 0%, #FF744E 100%);
        box-shadow: 0px 1px 10px -1px rgba(255, 87, 87, 0.6);
        border-radius: 23px;
        line-height: 45px;
        text-align: center;
        font-size: 18px;
        color: white;

    }
}
</style>
