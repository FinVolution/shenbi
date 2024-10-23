<template>
  <div class="no-service">
    <div class="desc">很抱歉，您所在的城市暂无服务点
      我们正在全力建设中！</div>
    <div class="btn" @click="close">我知道了</div>
  </div>
</template>

<script>
export default {
  name: "noService",
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.no-service {
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
}
</style>