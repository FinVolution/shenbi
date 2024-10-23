<template>
  <div class="drap-resize_main">
    <div class="drap-resize_eline line">
      <div class="drap-resize_e"></div>
    </div>
    <div class="drap-resize_sline line">
      <div class="drap-resize_s"></div>
    </div>
    <div class="drap-resize_wline line">
      <div class="drap-resize_w" v-show="position != 'relative'"></div>
    </div>
    <div class="drap-resize_nline line">
      <div class="drap-resize_n" v-show="position != 'relative'"></div>
    </div>
    <div class="drag-move p-nw" v-show="position != 'relative'"></div>
    <div class="drag-move p-ne" v-show="position != 'relative'"></div>
    <div class="drag-move p-sw" v-show="position != 'relative'"></div>
    <div class="drag-move p-se" v-show="position != 'relative'"></div>
  </div>
</template>

<script>
import draggable from '@/utils/draggable'
import { mapMutations, mapState } from 'vuex'
const dragEle = [
  { class: '.drap-resize_e', direction: 'east' },
  { class: '.drap-resize_s', direction: 'sourth' },
  { class: '.drap-resize_w', direction: 'west' },
  { class: '.drap-resize_n', direction: 'north' },
  { class: '.drag-move.p-nw', direction: 'all' },
  { class: '.drag-move.p-ne', direction: 'all' },
  { class: '.drag-move.p-sw', direction: 'all' },
  { class: '.drag-move.p-se', direction: 'all' }
]

export default {
  data() {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      position: null,
      startPos: {}
    }
  },
  props: {
    componentItem: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    ...mapState('editor', {})
  },
  watch: {
    componentItem: {
      handler: function(nVal, oVal) {
        let { containerStyle, selfStyle } = nVal || {}
        let { top, left, position } = containerStyle || {}
        let { width, height } = selfStyle || {}
        Object.assign(this, { width, height, top, left, position })
      },
      immediate: true,
      deep: true
    }
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
        param: { direction }
      })
    },
    //拖拽更新位置
    handleDrag(event, direction) {
      let { startPos, width, height, top, left } = this
      let currentPos = { x: event.clientX, y: event.clientY }
      let [xOffset, yOffset] = [currentPos.x - startPos.x, currentPos.y - startPos.y]
      let [tempWidth, tempHeight, tempLeft, tempTop] = [0, 0, 0, 0]
      switch (direction) {
        case 'east':
          tempWidth = Math.max(0, width + xOffset)
          if (tempWidth > 375) break
          this.changeComponentAttr({
            key: 'selfStyle',
            newConfig: { width: tempWidth }
          })
          break
        case 'sourth':
          tempHeight = Math.max(0, height + yOffset)
          this.changeComponentAttr({
            key: 'selfStyle',
            newConfig: { height: tempHeight }
          })
          break
        case 'west':
          tempWidth = Math.max(0, width - xOffset)
          if (tempWidth > 375) break
          tempLeft = Math.max(0, left + xOffset)
          this.changeComponentAttr({
            key: 'selfStyle',
            newConfig: { width: tempWidth }
          })
          this.changeComponentAttr({
            key: 'containerStyle',
            newConfig: { left: tempLeft }
          })
          break
        case 'north':
          tempHeight = Math.max(0, height - yOffset)
          tempTop = Math.max(0, top + yOffset)
          this.changeComponentAttr({
            key: 'selfStyle',
            newConfig: { height: tempHeight }
          })
          this.changeComponentAttr({
            key: 'containerStyle',
            newConfig: { top: tempTop }
          })
          break
        case 'all':
          tempLeft = xOffset + left
          tempTop = yOffset + top
          this.changeComponentAttr({
            key: 'containerStyle',
            newConfig: { top: tempTop, left: tempLeft }
          })
          break
        default:
          break
      }
      this.startPos = currentPos
    }
  },
  mounted() {
    dragEle.forEach(item => {
      this.dragCall(item['class'], item['direction'])
    })
  }
}
</script>
<style lang="less">
@import '../../../../assets/less/base/mixins.less';
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
  .drap-resize_s {
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
  .drag-move {
    .setSize(14px, 14px);
    cursor: move;
    &.p-nw {
      .setPosition(absolute, 0, auto, auto, 0);
      background-image: linear-gradient(135deg, rgba(17, 17, 17, 0.432) 55%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0) 100%);
    }
    &.p-ne {
      .setPosition(absolute, 0, 0, auto, auto);
      background-image: linear-gradient(225deg, rgba(17, 17, 17, 0.432) 55%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0) 100%);
    }
    &.p-sw {
      .setPosition(absolute, auto, auto, 0, 0);
      background-image: linear-gradient(45deg, rgba(17, 17, 17, 0.432) 55%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0) 100%);
    }
    &.p-se {
      .setPosition(absolute, auto, 0, 0, auto);
      background-image: linear-gradient(315deg, rgba(17, 17, 17, 0.432) 55%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0) 100%);
    }
  }
}
</style>
