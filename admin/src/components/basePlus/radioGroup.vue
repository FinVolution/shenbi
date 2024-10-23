<template>
  <div class="tool-radio-string">
    <div class="tool-radio-title">{{ title }}</div>
    <el-radio-group v-model="currentVal" @change="onRadioValChange" class="tool-radio">
      <el-radio v-for="(item, index) in options" :label="item.val" :key="index" class="tool-radio-item">{{ item.label }}</el-radio>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentVal: 0
    }
  },
  props: {
    value: [String, Number],
    keyValue: { type: String, default: '' },
    title: { type: String, default: '' },
    options: {
      type: Array,
      required: true,
      validator: function (val) {
        return val && val.length >= 0
      }
    }
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
    onRadioValChange(val) {
      this.$emit('onRadioValChange', this.keyValue, val)
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';
@import '../../../../assets/less/pc/tools.less';

.tool-radio-string {
  position: relative;
  width: 100%;
  .setFlexPos(column, flex-start, flex-start);
  .tool-radio-title{
    font-size: 14px;
    color: white;
    text-align: left;
    width: 100%;
    margin-top: 10px;
    margin-left: 10px;
  }
  .tool-radio {
    color: #c3c3c3;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    padding-top: 5px;
    .tool-radio-item{
      margin-left: 0px !important;
      margin-top: 5px;
    }
  }
}
</style>
