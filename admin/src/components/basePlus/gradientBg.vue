<template>
  <div v-if="show" class="gradient-bg-chose" :style="{ top: top + 'px', left: left + 'px' }">
    <vue-gpickr v-model="selfGradient" />
    <el-input type="textarea" :rows="2" v-model="selfGradientStr" class="gradient-input" size="mini"></el-input>
    <i class="el-icon-refresh" @click="reflush"></i>
    <div class="operation">
      <button class="normal-button" @click="doClose">关闭</button>
      <button class="normal-button" @click="doCommit">确定</button>
    </div>
  </div>
</template>
<script>
import { VueGpickr, LinearGradient } from 'vue-gpickr'
const TOOL_HEIGHT = 374
const defaultLinearGradient = new LinearGradient({
  angle: 0,
  stops: [
    ['#0359b5', 0],
    ['#f6ce01', 1]
  ]
})

const generateGradienObjFromStr = newBg => {
  let angleReg = /^linear-gradient\((\d{0,3})deg.*\)$/
  let percentReg = /.*\s+(\d{0,3})$/
  if (newBg && angleReg.test(newBg)) {
    let angleMatchResult = newBg.match(angleReg)
    let angle = angleMatchResult && angleMatchResult.length > 0 && angleMatchResult[1]
    angle = parseInt(angle)
    let colorPercentStr = newBg.substring(`linear-gradient(${angle}deg,`.length, newBg.length - 1)
    let colorPercentArr = colorPercentStr && colorPercentStr.split('%')
    let stops =
      colorPercentArr &&
      colorPercentArr.length > 0 &&
      colorPercentArr.reduce((prev, cur, index) => {
        let currentStr = cur.trim()
        if (currentStr) {
          currentStr.indexOf(',') === 0 && (currentStr = currentStr.substring(1))
          currentStr = currentStr.trim()
          let percentMatchResult = currentStr.match(percentReg)
          let percent = percentMatchResult && percentMatchResult.length > 0 && percentMatchResult[1]
          let color = currentStr.substring(0, currentStr.length - percent.length)
          color && (color = color.trim())
          percent = parseInt(percent)
          percent = (percent * 1.0) / 100
          prev.push([color, percent])
        }
        return prev
      }, [])
    console.log({ angle, stops })
    let tempGradient = { angle, stops }
    return new LinearGradient(tempGradient)
  }
  return defaultLinearGradient
}
export default {
  data() {
    return {
      selfGradientStr: defaultLinearGradient.toString(),
      selfGradient: defaultLinearGradient,
      top: 0,
      left: 0
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    clientX: {
      type: Number,
      default: 0
    },
    clientY: {
      type: Number,
      default: 0
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {},
  components: { VueGpickr },
  created() {},
  watch: {
    value: {
      handler: function(newBg) {
        let linearGradientObj = generateGradienObjFromStr(newBg)
        Object.assign(this, { selfGradient: linearGradientObj, selfGradientStr: linearGradientObj.toString() })
      },
      immediate: true
    },
    show(newVal) {
      newVal && this.doShow()
    },
    selfGradient(n) {
      Object.assign(this, { selfGradientStr: n.toString() })
    }
  },
  methods: {
    doShow() {
      let { clientX, clientY } = this
      let clientHeight = document.body.clientHeight
      this.left = clientX - 470
      if (clientY < TOOL_HEIGHT) {
        this.top = 0
      } else if (clientY > clientHeight - TOOL_HEIGHT) {
        this.top = clientHeight - TOOL_HEIGHT
      } else {
        this.top = this.clientY - TOOL_HEIGHT / 2
      }
    },
    doClose() {
      this.$emit('update:show', false)
    },
    doCommit() {
      let { selfGradientStr } = this
      this.$emit('input', selfGradientStr)
      this.$emit('change', selfGradientStr)
      this.$emit('update:show', false)
    },
    reflush() {
      let { selfGradientStr } = this
      let linearGradientObj = generateGradienObjFromStr(selfGradientStr)
      Object.assign(this, { selfGradient: linearGradientObj, selfGradientStr: linearGradientObj.toString() })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';
@asserts: '../../../../assets/images';
.gradient-bg-chose {
  .setPosition(fixed, 0, auto, auto, auto);
  .setSize(450px, auto);
  color: #fff;
  background-color: #666;
  border-radius: 2px;
  padding: 10px 0;
  z-index: 10001;
  .setFlexPos(column, flex-start, center);
  .gradient-input {
    margin: 10px 0;
    width: 380px;
  }
  .el-icon-refresh {
    .setPosition(absolute, 284px, 15px, auto, auto);
  }
  .operation {
    padding: 15px 0 0 0;
    .normal-button {
      background-color: #343437;
      border: #49494c solid 1px;
      border-radius: 2px;
      outline: none;
      color: #c3c3c3;
      padding: 5px 10px;
      cursor: pointer;
      font-size: 12px;
      &:last-child {
        margin: 0 0 0 20px;
      }
      &:hover {
        color: #343437;
        background-color: #fff;
      }
    }
  }
}
</style>
