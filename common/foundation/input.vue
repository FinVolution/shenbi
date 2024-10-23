<template>
  <input class="editor-input" :style="styleStr" :placeholder="placeholder"></input>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入手机号码'
    },
    styleStr: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/base/mixins.less';
@asserts: '../../assets/images';
.editor-input {
  background-color: transparent;
  box-sizing: border-box;
  appearance: none;
  .placeholder();
}
</style>
