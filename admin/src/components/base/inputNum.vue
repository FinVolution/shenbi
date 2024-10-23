<template>
  <div class="tool-input-num" @mousedown.left="onInputLeftClick" @mousemove.left="onInputMousemove" @mouseleave.left="clickFlag = false" @mouseup.left="clickFlag = false">
    <span class="tool-input-minus el-icon-minus" @click.stop="onInputChange('minus')" v-if="showMinus"></span>
    <input type="text" v-model="currentVal" class="tool-input" :class="{ error: !!errMsg }" :style="{ width: width + 'px' }" @input="onInputChange" @keyup.up="onInputChange('plus', true)" @keyup.down="onInputChange('minus', true)" />
    <span class="tool-input-plus el-icon-plus" @click.stop="onInputChange('plus')" v-if="showPlus"></span>
    <i class="el-icon-error" @click="doClear"></i>
  </div>
</template>
<script>
import { accAdd, accSub } from '@/utils/amount'
export default {
  data() {
    return {
      currentVal: 0,
      lastClickTime: 0,
      // 单击增益
      gainRate: 1,
      clickFlag: false,
      errMsg: false
    }
  },
  props: {
    value: Number,
    showMinus: { type: Boolean, default: true },
    showPlus: { type: Boolean, default: true },
    step: { type: Number, default: 1 },
    width: { type: Number, default: 100 },
    max: { type: Number, default: 9999 },
    mouseMoveStep: { type: Number, default: 1 }
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
    onInputChange(flagType, withSoildStep = false) {
      let { value, step, currentVal, lastClickTime, gainRate, max } = this
      let currentClickTime = new Date().getTime()
      let tempStep = step
      if (!withSoildStep) {
        if (currentClickTime - lastClickTime < 280) {
          gainRate += 1
          tempStep *= gainRate
        } else {
          gainRate = 1
        }
      }
      Object.assign(this, { lastClickTime: currentClickTime, gainRate })
      if (flagType === 'minus') {
        this.$emit('input', Math.max(accSub(value, tempStep)))
      } else if (flagType === 'plus') {
        let tempVal = Math.min(accAdd(value, tempStep), max)
        this.$emit('input', tempVal)
      } else {
        let tempVal = Math.min(parseInt(currentVal) || 0, max)
        this.$emit('input', tempVal)
      }
    },
    onInputLeftClick(event) {
      Object.assign(this, { clickFlag: true, clickClientX: event.clientX })
    },
    onInputMousemove(event) {
      if (this.clickFlag) {
        let { clickClientX, mouseMoveStep, max, value } = this
        let { clientX } = event
        let gainRes = (clientX - clickClientX) * mouseMoveStep
        Object.assign(this, { clickClientX: clientX })
        let val = clientX - clickClientX > 0 ? Math.min(parseFloat(value) + gainRes, max) : Math.max(0, parseFloat(value) + gainRes)
        this.$emit('input', val)
      }
    },
    doClear() {
      this.$emit('input', 0)
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';
.tool-input-num {
  position: relative;
  .setFlexPos(row, flex-start, center);
  .tool-input {
    background-color: #343437;
    border: #49494c solid 1px;
    outline: none;
    color: #c3c3c3;
    padding: 0px 14px 0px 8px;
    height: 24px;
    font-size: 13px;
    border-radius: 0;
    &.error {
      color: #ce2038;
      border-color: #851221;
    }
  }
  .tool-input-minus,
  .tool-input-plus {
    display: inline-block;
    .setFlexPos(row, center, center);
    background-color: #343437;
    border-top: #49494c solid 1px;
    border-bottom: #49494c solid 1px;
    outline: none;
    color: #c3c3c3;
    font-size: 13px;
    .setSize(22px, 24px);
    cursor: pointer;
  }
  .tool-input-minus {
    border-left: #49494c solid 1px;
  }
  .tool-input-plus {
    border-right: #49494c solid 1px;
  }
  .el-icon-error {
    position: absolute;
    font-size: 12px;
    top: 7px;
    color: #93c8fd63;
    right: 26px;
    cursor: pointer;
    display: none;
  }
  &:hover {
    .el-icon-error {
      display: inline-block;
    }
  }
}
</style>
