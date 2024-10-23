<template>
  <button class="editor-button" :style="generateStyleByObj(selfStyle)" @click="onBtnClick" v-text="property.text" />
</template>
<script>
import { generateStyleByObj } from "../index";
export default {
  props: {
    itemConfig: {
      type: Object,
      default () {
          return {
            property: null,
            elemStyle: null,
            selfStyle: null
          }
      }
    },
  },
  watch: {
    itemConfig: {
        handler: function(nObj){
          let { property, elemStyle, selfStyle, containerStyleStr } = nObj || {}
          Object.assign(this,{ property, elemStyle, selfStyle, containerStyleStr })
        },
        immediate: true,
        deep: true
    },
  },
  methods: {
    generateStyleByObj,
    onBtnClick () {
      this.$emit('onBtnClick');
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/base/mixins.less';
@asserts: '../../assets/images';
.editor-button {
  outline: none;
  cursor: pointer;
  letter-spacing: 1px;
  appearance: none;
  box-sizing: border-box;
}
</style>
