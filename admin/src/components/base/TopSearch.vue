<template>
  <el-row class="search-form-container">
    <div class="left-container">
      <slot name="header"></slot>
    </div>
    <div class="right-container" :style="{ width: `${rightWidth}px` }">
      <slot name="operator"></slot>
    </div>
    <div class="other-container">
      <slot name="other"></slot>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    rightWidth: {
      type: Number,
      default: 268
    }
  },
  components: {},
  methods: {},
  created() {}
}
</script>

<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';
.search-form-container {
  .setFlexPos(row, flex-start, flex-start);
  .left-container {
  }
  .right-container {
    padding: 0 0 0 12px;
  }
  .other-container{
    align-self: flex-end;
  }
}
</style>

<style lang="less">
@import '../../../../assets/less/base/mixins.less';
.search-form-container {
  .el-form .el-form-item {
    margin-bottom: 0;
  }
}
</style>
