<template>
  <ul class="tool-radio-group">
    <li v-for="(item, index) in options" @click="onClick(item.val)" :class="{ active: currentVal === item.val }">{{ item.label }}</li>
  </ul>
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
    options: {
      type: Array,
      required: true,
      validator: function(val) {
        return val && val.length >= 0
      }
    }
  },
  watch: {
    value: {
      handler: function(n, o) {
        Object.assign(this, { currentVal: n })
      },
      immediate: true
    }
  },
  methods: {
    onClick(val) {
      this.$emit('input', val, this.currentVal)
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';
.tool-radio-group {
  .setFlexPos(row, center, center);
  margin: 0 4px 0 0;
  li {
    border-left: 1px solid #49494c;
    border-top: 1px solid #49494c;
    border-bottom: 1px solid #49494c;
    padding: 5px 10px;
    cursor: pointer;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    &.active {
      color: #409eff;
      background-color: #49494c;
    }
    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-right: 1px solid #49494c;
    }
  }
}
</style>
