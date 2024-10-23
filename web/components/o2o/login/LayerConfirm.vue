<template>
  <div class="layerConfirm">
    <h2 class="cont">您已有申请中的订单，请确认是否需要再次申请</h2>
    <div class="btnWrap">
      <a href="javascript:;" class="btn btn_left" @click="cancel">取消</a>
      <a href="javascript:;" class="btn btn_right" @click="sure">确认</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    cancel() {
      this.$emit('hideConfirm');
    },
    sure() {
      this.$emit('sureConfirm');
    }
  }
}
</script>
<style scoped lang="less">
.layerConfirm {
  width: 303px;
  padding: 30px 24px 22px;
  background: #FFFFFF;
  font-size: 16px;
  color: #002A3C;
  line-height: 24px;
  .cont {
    margin-bottom: 30px;
  }
  .btnWrap {
    display: flex;
    justify-content: space-between;
    
    .btn {
      width: 117px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      border-radius: 8px;
      font-weight: bold;
    }
    .btn_left {
      border: 1px solid #DCE1E6;
      color: #616B78;
    }
    .btn_right {
      background: linear-gradient(270deg, #3CA5E2 0%, #4DBAF9 100%);
      border: 1px solid #3CA5E2;
      color: #FFFFFF;
    }
  }
}
</style>