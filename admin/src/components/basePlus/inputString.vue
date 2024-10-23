<template>
  <div class="tool-input-string">
    <div class="tool-input-title">{{ title }}</div>
    <input type="text" v-model="currentVal" class="tool-input" :class="{ error: !!errMsg }" :style="{  }"
      @input="onInputChange" @keyup.up="onInputChange('plus', true)" @keyup.down="onInputChange('minus', true)" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentVal: 0,
      errMsg: false
    }
  },
  props: {
    value: String,
    width: { type: Number, default: 215 },
    max: { type: Number, default: 9999 },
    mouseMoveStep: { type: Number, default: 1 },
    title: { type: String, default: '' },
    keyValue: { type: String, default: '' }
  },
  watch: {
    value: {
      handler: function (n, o) {
        Object.assign(this, { currentVal: n })
      },
      immediate: true
    }
  },
  methods: {
    onInputChange(event) {
      this.$emit('input', this.keyValue, event.target.value.trim())
    },
  }
}
</script>
<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';

.tool-input-string {
  position: relative;
  width: 100%;
  .setFlexPos(column, flex-start, flex-start);
  .tool-input-title{
    font-size: 14px;
    color: white;
    text-align: left;
    width: 100%;
    margin-top: 10px;
    margin-left: 10px;
  }
  .tool-input {
    background-color: #343437;
    border: #49494c solid 1px;
    outline: none;
    color: #c3c3c3;
    padding: 0px 14px 0px 8px;
    height: 30px;
    font-size: 13px;
    border-radius: 0;
    box-sizing: border-box;
    width: 270px;
    margin: 10px 0 0 10px;
    &.error {
      color: #ce2038;
      border-color: #851221;
    }
  }


}
</style>
