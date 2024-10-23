<template>
  <VueDragResize
      class="drag-resize"
      :isActive.sync="isActive"
      :w="w"
      :h="h"
      :x="x"
      :y="y"
      :r="r"
      :z="0"
      :parentW="parentW"
      :parentH="parentH"
      :minw="10"
      :minh="10"
      :parentScaleX="1"
      :parentScaleY="1"
      :isDraggable="true"
      :isResizable="true"
      :parentLimitation="false"
      :snapToGrid="false"
      :aspectRatio="false"
      :disabled="false"
      :isHeightAuto="true"
      v-on:resizing="resize"
      v-on:dragging="dragging"
      @rotating="onRotate"
      @rotatestop="onRotateStop"
      @clicked="onActivated"
      @deactivated="deactivated"
  >
  </VueDragResize>
</template>

<script>
import VueDragResize from './vue-drag-resize/vue-drag-resize.vue';
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'dragPro',
  components: {
    VueDragResize,
  },
  props: {
    parentConfig:{
      type: Object,
      default: ()=> { return {} }
    },
    itemConfig:{
      type: Object,
      default: ()=> { return {} }
    },
  },
  data () {
    return {
      isActive: true,
    }
  },
  computed: {
    ...mapState("editor", {
      activeComponent: (state) => state.activeComponent,
    }),
    selfStyle() {
      return this.itemConfig?.selfStyle
    },
    containerStyle() {
      return this.itemConfig?.containerStyle
    },
    parentW() {
      return this.parentConfig.containerStyle.width;
    },
    parentH() {
      return this.parentConfig.containerStyle.height;
    },
    w: {
      set(val) {
        this.selfStyle.width = val
      },
      get() {
        return this.selfStyle?.width
      },
    },
    h: {
      set(val) {
        this.selfStyle.height = val
      },
      get() {
        return this.selfStyle?.height
      },
    },
    y: {
      set(val) {
        this.containerStyle.top = val
      },
      get() {
        return this.containerStyle?.top
      },
    },
    x: {
      set(val) {
        this.containerStyle.left = val
      },
      get() {
        return this.containerStyle?.left
      },
    },
    r() {
      return this.selfStyle?.rotate
    },
  },
  watch: {
    activeComponent: {
      deep: true,
      handler(val) {
      }
    },
  },
  methods: {
    ...mapMutations('editor', ['changeComponentAttr']),
    updateDragResizeInfo(fromStyle, dragResizeInfo) {
      this.changeComponentAttr({ key: fromStyle, newConfig: dragResizeInfo })
    },
    resize(newRect) {
      this.updateDragResizeInfo('selfStyle', {
        width: newRect.width,
        height: newRect.height,
      });
    },
    dragging(newRect) {
      const { left, top } = newRect;
      this.updateDragResizeInfo('containerStyle', {
        left,
        top,
      });
    },
    onRotate(e) {
      if (!this.rotating) {
        this.rotating = true
      }
      console.log('e', e)
      this.updateDragResizeInfo('selfStyle', {
        rotate: e,
      });
    },
    onRotateStop() {
      this.rotating = false
    },
    onActivated(e) {
      if (e) {
        if (e.shiftKey) {
          e.preventDefault();
          // this.addActiveItem(this.item);
        } else {
          // this.replaceActiveItem([this.item]);
        }
      }
    },
    deactivated() {
      // this.removeActiveItem(this.item);
    },
  },
};
</script>

<style lang="less" scoped>
.drag-resize {
  z-index: 99 !important;
  .active {
    &:before {
      outline: 2px solid #000000;
    }
  }
}
</style>
