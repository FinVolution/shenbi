<template>
  <div class="drap-resize_main">
    <div class="drap-resize_eline line">
      <div class="drap-resize_e"></div>
    </div>
    <div class="drap-resize_sline line">
      <div class="drap-resize_s"></div>
    </div>
    <div class="drap-resize_wline line">
      <div class="drap-resize_w"></div>
    </div>
    <div class="drap-resize_nline line">
      <div class="drap-resize_n"></div>
    </div>
    <div class="drap-resize_ne"></div>
    <div class="drap-resize_se"></div>
    <div class="drap-resize_sw"></div>
    <div class="drap-resize_nw"></div>
  </div>
</template>

<script>
import draggable from '../../../utils/draggable'
import { mapMutations } from 'vuex'
const dragEle = [
  { class: '.drap-resize_e', direction: 'east' },
  { class: '.drap-resize_s', direction: 'sourth' },
  { class: '.drap-resize_w', direction: 'west' },
  { class: '.drap-resize_n', direction: 'north' },
  { class: '.drap-resize_ne', direction: 'northeast' },
  { class: '.drap-resize_se', direction: 'sourtheast' },
  { class: '.drap-resize_sw', direction: 'sourthwest' },
  { class: '.drap-resize_nw', direction: 'northwest' },
]

export default {
  data() {
    return {
      width: this.elWidth,
      height: this.elHeight,
      top: this.cursorTop,
      left: this.cursorLeft,
      startPos: {},
    }
  },
  props: ['elWidth', 'elHeight', 'cursorTop', 'cursorLeft'],
  watch: {
    elWidth(val) {
      this.width = val
    },
    elHeight(val) {
      this.height = val
    },
    cursorTop(val) {
      this.top = val
    },
    cursorLeft(val) {
      this.left = val
    },
  },
  methods: {
    ...mapMutations('editor', ['changeComponentAttr']),
    dragCall(className, direction) {
      let target = this.$el.querySelector(className)
      draggable(target, document.querySelector('.palette-container'), {
        start: event => {
          this.startPos = { x: event.clientX, y: event.clientY }
        },
        drag: (event, { direction }) => {
          this.handleDrag(event, direction)
        },
        param: { direction },
      })
    },
    //拖拽更新位置
    handleDrag(event, direction) {
      let { startPos, width, height, top, left } = this
      let currentPos = { x: event.clientX, y: event.clientY }
      console.log('currentPos',currentPos)
      let [xOffset, yOffset] = [currentPos.x - startPos.x, currentPos.y - startPos.y]
      let [tempWidth, tempHeight, tempLeft, tempTop] = [0, 0, 0, 0]
      switch (direction) {
        case 'east':
          tempWidth = Math.max(0, width + xOffset)
          if (tempWidth > 375) break
          this.changeComponentAttr({
            key: 'containerStyle',
            newConfig: {
              top,
              left,
              width: tempWidth,
              height,
            },
          })
          break
        case 'sourth':
          tempHeight = Math.max(0, height + yOffset)
          this.changeComponentAttr({
            key: 'containerStyle',
            newConfig: {
              top,
              left,
              width,
              height: tempHeight,
            },
          })
          break
        case 'west':
          tempWidth = Math.max(0, width - xOffset)
          if (tempWidth > 375) break
          tempLeft = Math.max(0, left + xOffset)
          this.changeComponentAttr({
            key: 'containerStyle',
            newConfig: {
              top,
              left: tempLeft,
              width: tempWidth,
              height,
            },
          })
          break
        case 'north':
          tempHeight = Math.max(0, height - yOffset)
          tempTop = Math.max(0, top + yOffset)
          this.changeComponentAttr({
            key: 'containerStyle',
            newConfig: {
              top: tempTop,
              left,
              width,
              height: tempHeight,
            },
          })
          break
        case 'northeast':
          tempWidth = Math.max(0, width + xOffset)
          if (tempWidth > 375) break
          tempHeight = Math.max(0, height + xOffset * (height / width))
          tempTop = Math.max(0, top - xOffset * (height / width))
          this.changeComponentAttr({
            key: 'containerStyle',
            newConfig: {
              top: tempTop,
              left,
              width: tempWidth,
              height: tempHeight,
            },
          })
          break
        case 'sourtheast':
          tempWidth = Math.max(0, width + xOffset)
          if (tempWidth > 375) break
          tempHeight = Math.max(0, height + xOffset * (height / width))
          this.changeComponentAttr({
            key: 'containerStyle',
            newConfig: {
              top,
              left,
              width: tempWidth,
              height: tempHeight,
            },
          })
          break
        case 'sourthwest':
          tempWidth = Math.max(0, width - xOffset)
          if (tempWidth > 375) break
          tempHeight = Math.max(0, height - xOffset * (height / width))
          tempLeft = Math.max(0, left + xOffset * (height / width))
          this.changeComponentAttr({
            key: 'containerStyle',
            newConfig: {
              top,
              left: tempLeft,
              width: tempWidth,
              height: tempHeight,
            },
          })
          break
        case 'northwest':
          tempWidth = Math.max(0, width - xOffset)
          if (tempWidth > 375) break
          tempHeight = Math.max(0, height - xOffset * (height / width))
          tempTop = Math.max(0, top + xOffset * (height / width))
          tempLeft = Math.max(0, left + xOffset * (height / width))
          this.changeComponentAttr({
            key: 'containerStyle',
            newConfig: {
              top: tempTop,
              left: tempLeft,
              width: tempWidth,
              height: tempHeight,
            },
          })
          break
      }
      this.startPos = currentPos
    },
  },
  mounted() {
    dragEle.forEach(item => {
      this.dragCall(item['class'], item['direction'])
    })
  },
}
</script>
<style lang="less">
@import '../../../../../assets/less/base/mixins.less';
.drap-resize_main {
  .line {
    position: absolute;
    background-color: rgba(103, 176, 235, 0.247);
  }
  .drap-resize_nline {
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
  }
  .drap-resize_eline {
    top: 0;
    right: 0;
    height: 100%;
    width: 1px;
  }
  .drap-resize_sline {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
  }
  .drap-resize_wline {
    top: 0;
    left: 0;
    height: 100%;
    width: 1px;
  }
  .drap-resize_n,
  .drap-resize_e,
  .drap-resize_w,
  .drap-resize_s,
  .drap-resize_ne,
  .drap-resize_nw,
  .drap-resize_se,
  .drap-resize_sw {
    width: 10px;
    height: 10px;
    background: rgba(44, 151, 238, 0.72);
    border: 1px solid hsla(0, 0%, 100%, 0.18);
    border-radius: 50%;
    position: absolute;
    z-index: @drag-point-z-index;
  }
  .drap-resize_n,
  .drap-resize_s {
    left: 50%;
    margin-left: -5px;
  }
  .drap-resize_w,
  .drap-resize_e {
    top: 50%;
    margin-top: -5px;
  }
  .drap-resize_n,
  .drap-resize_s {
    cursor: ns-resize;
  }
  .drap-resize_w,
  .drap-resize_e {
    cursor: ew-resize;
  }
  .drap-resize_n {
    top: -5px;
  }
  .drap-resize_e {
    right: -5px;
  }
  .drap-resize_s {
    bottom: -5px;
  }
  .drap-resize_w {
    left: -5px;
  }
  .drap-resize_ne {
    right: -5px;
    top: -5px;
    cursor: ne-resize;
    pointer-events: auto;
  }
  .drap-resize_nw {
    left: -5px;
    top: -5px;
    cursor: nw-resize;
    pointer-events: auto;
  }
  .drap-resize_se {
    right: -5px;
    bottom: -5px;
    cursor: se-resize;
    pointer-events: auto;
  }
  .drap-resize_sw {
    left: -5px;
    bottom: -5px;
    cursor: sw-resize;
    pointer-events: auto;
  }
}
</style>
