<template>
  <div class="consult">
    <div class="close" @click="close"></div>
    <div class="desc">您近期已提交过申请，客户经理正在跟进中，如您需要，可立即咨询</div>
    <div class="btn" @click="handleConsult">立即咨询</div>
  </div>
</template>

<script>
export default {
  name: "consult",
  methods: {
    close() {
      this.$emit('close')
    },
    handleConsult() {
      this.$emit('consult')
    },
  }
}
</script>

<style lang="less" scoped>
.consult {
  width: 303px;
  height: 181px;
  border-radius: 8px !important;
  background: #FFFFFF;
  padding: 40px 24px;
  .desc {
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    text-align: justify;
    color: #002A3C;
  }
  .btn {
    width: 255px;
    height: 41px;
    border-radius: 8px;
    opacity: 1;
    background: linear-gradient(270deg, #3CA5E2 0%, #4DBAF9 100%);
    text-align: center;
    line-height: 41px;
    font-size: 16px;
    font-weight: 600;
    color: #FFFFFF;
    margin-top: 30px;
  }
  .close {
    width: 20px;
    height: 20px;
    background-image: url('../images/close.png');
    background-repeat: no-repeat;
    background-size: 100%;
    position: absolute;
    right: 12px;
    top: 12px;
  }
}
</style>