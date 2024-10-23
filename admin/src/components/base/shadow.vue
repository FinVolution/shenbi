<template>
  <div class="shadow_main">
    <div class="shadow_eline line"></div>
    <div class="shadow_sline line"></div>
    <div class="shadow_wline line"></div>
    <div class="shadow_nline line"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  watch: {},
  methods: {},
  mounted() {}
}
</script>
<style lang="less">
@import '../../../../assets/less/base/mixins.less';
.shadow_main {
  z-index: 1;
  .setPosition(absolute, 0, 0, 0, 0);
  .line {
    position: absolute;
  }
  .shadow_nline {
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    border-top: 1px dashed rgb(43, 148, 235);
  }
  .shadow_eline {
    top: 0;
    right: 0;
    height: 100%;
    width: 1px;
    border-right: 1px dashed rgba(43, 148, 235);
  }
  .shadow_sline {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed rgba(43, 148, 235);
  }
  .shadow_wline {
    top: 0;
    left: 0;
    height: 100%;
    width: 1px;
    border-left: 1px dashed rgba(43, 148, 235);
  }
}
</style>
