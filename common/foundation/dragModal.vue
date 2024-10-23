<template>
  <div class="drag-modal"></div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
@import '../../assets/less/base/mixins.less';
@asserts: '../../../assets/images';
.drag-modal {
  z-index: 2;
  background-color: transparent;
  .setPosition(absolute, 0, 0, 0, 0);
}
</style>


