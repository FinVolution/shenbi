<template>
  <div class="editor-popup-container">
    <div class="editor-popup-close" :style="elemStyle && generateStyleByObj(elemStyle.close)" @click="closePop"></div>
    <div :key="subItem.id" v-for="subItem in itemConfig.children" :style="generateStyleByObj(subItem.containerStyle)"
      @click="onCompontItemSelect(subItem, $event)" @contextmenu.stop="rightClick($event, subItem, 'outer')"
      :id="`id_component_${subItem.id}`">
      
      <PopupText v-if="subItem.propertyName == 'popupText'" :content="subItem.property.html"
        :property="subItem.property" :styleStr="generateStyleByObj(subItem.selfStyle)" :id="subItem.id"
        :forEdit="activeComponent && subItem.id === activeComponent.id" :paramObj="paramObj" />
      <PopupButton v-else-if="subItem.propertyName == 'popupButton'" :property="subItem.property"
        :buttonText="subItem.property.text" :styleStr="generateStyleByObj(subItem.selfStyle)" :paramObj="paramObj" />
      <PopupImage :property="subItem.property" v-else-if="subItem.propertyName == 'popupImage'"
        :styleStr="generateStyleByObj(subItem.selfStyle)" :defaultImg="defaultImg" :paramObj="paramObj" />
      <DragModal v-if="JSON.stringify(paramObj) === '{}' && isTemplate" :id="subItem.id"></DragModal>
    </div>
    <section v-for="(subItem, index) in itemConfig.children" :key="index">
      <DragPro v-if="showDragContainer && subItem.id === clickedItem.id" :parentConfig="itemConfig" :itemConfig="subItem"/>
    </section>
  </div>
</template>
<script>
import { generateStyleByObj } from '../../index'
import { mapState } from "vuex";
import PopupText from "./popupText.vue";
import PopupButton from "./popupButton.vue";
import PopupImage from "./popupImage";
import Drag from '../../../admin/src/components/editor/tools/drag';
import DragModal from '../../../common/foundation/dragModal';
import DragPro from '../../../admin/src/components/editor/tools/dragPro';

export default {
  components: {
    PopupText,
    PopupButton,
    PopupImage,
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
    }
  },
  computed: {
    showDragContainer() {
        return this.type === 'editor' && this.isTemplate && this.activeComponent && ['popupAD', 'popupImage', 'popupText'].includes(this.activeComponent.propertyName)
    },
  },
  mounted() {
  },
  methods: {
    generateStyleByObj,
    closePop() {
      window.location.href = "xxxx";
    },
    onCompontItemSelect(item, $event) {
      console.log('$event', $event)
      $event.stopPropagation();
      this.$emit('onCompontSubItemSelect', {
        item, e: $event
      })
    },
    rightClick($event, subItem, action) {
      this.$emit('rightSubClick', {
        e: $event,
        item: subItem,
        action
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/base/mixins.less';
@asserts: '../../../assets/images';

.editor-popup-container {
  .setSize(100%, 100%);
  color: #fff;

  .editor-popup-close {
    float: right;
  }
}
</style>
