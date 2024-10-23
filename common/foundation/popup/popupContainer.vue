<template>
  <div class="editor-popup-container">
    <div class="editor-popup-close">
      <img src="./img/close-standard@2x.png" @click.stop="$emit('onDialogCloseBtnClick')" />
    </div>
    <div :key="subItem.id" v-for="subItem in itemConfig.children" :style="generateStyleByObj(subItem.containerStyle)"
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
      <DragModal v-if="type === 'editor' && subItem.id === clickedItem.id && isTemplate" :id="subItem.id"></DragModal>
    </div>
    <section v-for="(subItem, index) in itemConfig.children" :key="index">
      <DragPro v-if="showDragContainer && subItem.id === clickedItem.id" :parentConfig="itemConfig" :itemConfig="subItem"/>
    </section>
  </div>
</template>
<script>
import { generateStyleByObj } from '../../index'
import PopupText from "./popupText.vue";
import popupAD from "./popupAD.vue";
import PopupImage from "./popupImage";
import DragPro from '../../../admin/src/components/editor/tools/dragPro';

import Drag from '../../../admin/src/components/editor/tools/drag';
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
  box-sizing: border-box;
  .setFlexPos(column, center, center);

  .editor-popup-pic {
    outline: none;
    appearance: none;
    box-sizing: border-box;
  }

  .editor-popup-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 20px;
    height: 20px;

    >img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
