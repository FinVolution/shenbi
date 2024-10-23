<template>
  <div class="editor-popup-container" @click.stop="$emit('onBackgroundClick', itemConfig.property)">
    <div :key="subItem.id" v-for="subItem in itemConfig.children" :style="[generateStyleByObj(subItem.containerStyle)]"
      @click="onCompontItemSelect(subItem, $event)" @contextmenu.prevent="rightClick($event, subItem, 'outer')"
      :id="`id_component_${subItem.id}`">
      <PopupText v-if="subItem.propertyName == 'popupText'" :content="subItem.property.html"
        :property="subItem.property" :styleStr="generateStyleByObj(subItem.selfStyle)" :forEdit="forEdit"
        :paramObj="paramObj" />
      <popupAD v-if="subItem.propertyName == 'popupAD'" :content="subItem.property.html"
        :property="subItem.property" :styleStr="generateStyleByObj(subItem.selfStyle)"
        :paramObj="paramObj" />
      <PopupImage :property="subItem.property" v-if="subItem.propertyName == 'popupImage'"
        :styleStr="generateStyleByObj(subItem.selfStyle)" :defaultImg="defaultImg" :paramObj="paramObj" v-on="$listeners" :isTemplate="isTemplate"/>
    </div>
    <div v-if="property.showClose" class="editor-popup-close" :style="elemStyle && generateStyleByObj(elemStyle.close)" @click.stop="$emit('onDialogCloseBtnClick')"></div>
    <section v-for="(subItem, index) in itemConfig.children" :key="index">
      <DragPro v-if="showDragContainer && subItem.id === clickedItem.id" :parentConfig="itemConfig" :itemConfig="subItem" />
    </section>
  </div>
</template>
<script>
import { generateStyleByObj } from '../../index'
import PopupText from "./popupText.vue";
import PopupImage from "./popupImage";
import popupAD from "./popupAD.vue";
import Drag from '../../../admin/src/components/editor/tools/drag';
import DragPro from '../../../admin/src/components/editor/tools/dragPro';
import DragModal from '../../../common/foundation/dragModal';
export default {
  components: {
    PopupText,
    PopupImage,
    popupAD,
    Drag,
    DragPro,
    DragModal
  },
  props: {
    itemConfig: {
      type: Object,
      default() {
        return {
          property: null,
          elemStyle: null
        }
      }
    },
    forEdit: { type: Boolean, default: false },
    paramObj: {
      type: Object,
      default() {
        return {}
      }
    },
    type: {
      type: String,
      default: 'editor'
    },
    activeComponent: {
      type: Object,
      default() {
        return null
      }
    },
    isTemplate: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  computed: {
    showDragContainer() {
        return this.type === 'editor' && this.isTemplate && this.activeComponent && ['popupAD', 'popupImage', 'popupText'].includes(this.activeComponent.propertyName)
    },
    itemWrapper() {
      return {
        w:100,
        h:100,
        x:100,
        y:100,
        r:1,
        minw:100,
        minh:100,
        scale:1,
        isDraggable:true,
        isResizable:true,
        aspectRatio:true,
        template: {
          w:375,
          h:667,
          scale:1,
        }
      }
    }
  },
  watch: {
    itemConfig: {
      handler: function (nObj) {
        let { property, elemStyle } = nObj || {}
        Object.assign(this, { property, elemStyle })
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      defaultImg: require("../../../assets/images/defaultImg.png"),
      clickedItem: {},
    }
  },
  mounted() {
  
  },
  methods: {
    generateStyleByObj,
    onCompontItemSelect(item, $event) {
      this.clickedItem = item;
      $event.stopPropagation();
      this.$emit('onCompontSubItemSelect', {
        item, e: $event
      })
    },
    rightClick($event, subItem, action) {
      $event.stopPropagation();
      this.$emit('rightSubClick', {
        e: $event,
        item: subItem,
        action
      })
    },
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/base/mixins.less';
@asserts: '../../../assets/images';

.editor-popup-container {
  .setSize(100%, 100%);
  color: #fff;
  display: flex;
  .editor-popup-close {
    float: right;
    margin: auto;
  }
  .adtag {
    background: #fff;
    width: 40px;
    color: black;
    line-height: 20px;
    text-align: center;
    height: 20px;
    border-top-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .editor-popup-pic {
    outline: none;
    appearance: none;
    box-sizing: border-box;
  }
}
</style>
