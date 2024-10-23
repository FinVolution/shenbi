<template>
  <div class="tool-attr-container">
    <AttrComponents />
  </div>
</template>
<script>
import AttrComponents from '../tools/attrComponents.vue'
export default {
  data() {
    return {
    }
  },
  props: {},
  components: { AttrComponents },
  computed: {}
}
</script>
<style lang="less" scoped>
@import '../../../../../assets/less/base/mixins.less';
.tool-attr-container {
  padding: 0 4px 10px 4px;
  background-color: #292a2e;
  position: relative;
  @import '../../../../../assets/less/pc/tools.less';
  .editor {
    background-color: rgb(218 211 191);
    font-weight: normal;
    // position: relative;
    // height: 400px;
    z-index: 2;
  }
  .wang_editor_textarea{
    width: 100%;
    height: auto;
    min-height: 44px;
    margin-top: 5px;
    color: black;
    background-color: #fff;
  }
}
</style>
<style lang="less">
.editor {
  .ql-tooltip.ql-editing {
    left: 0 !important;
  }
}
</style>
