<template>
  <div :style="generateStyleByObj(obj.containerStyle)" @click.stop="onCompontItemSelect(obj)" @contextmenu.prevent.stop="rightClick($event, obj)">
    <DragTool v-show="activeComponent && activeComponent.id === obj.id" :componentItem="obj"></DragTool>
    <CText :content="obj.property.html" v-if="obj.propertyName == 'text'" :styleStr="generateStyleByObj(obj.selfStyle)" :id="obj.id" :forEdit="activeComponent && obj.id === activeComponent.id"></CText>
    <CImage :url="obj.property.url" v-else-if="obj.propertyName == 'image'" :isApp="false" :styleStr="generateStyleByObj(obj.selfStyle)
    " :defaultImg="defaultImg"></CImage>
    <CInput :placeholder="obj.property.placeholder" v-else-if="obj.propertyName == 'input'" :styleStr="generateStyleByObj(obj.selfStyle)"></CInput>
    <CButton :propery="obj.property" v-else-if="obj.propertyName == 'button'" :styleStr="generateStyleByObj(obj.selfStyle)"></CButton>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CImage from '$root/common/foundation/image'
import CInput from '$root/common/foundation/input'
import CText from '$root/common/foundation/text'
import CButton from '$root/common/foundation/button'
import DragTool from '~/base/drag'
import { generateStyleByObj } from '$root/common/index'
export default {
  data() {
    return { 
      componentList: [] ,
      defaultImg:require('$root/assets/images/defaultImg.png')
    }
  },
  props: {
    obj: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    ...mapState('editor', {
      activeComponent: state => state.activeComponent
    })
  },
  watch: {},
  components: { CImage, CInput, CText, CButton, DragTool },
  methods: {
    generateStyleByObj,
    onCompontItemSelect(childItem) {
      this.$emit('click', childItem)
    },
    // 组件右键菜单
    rightClick(e, componentItem) {
      this.$emit('mouseRightClick', e, componentItem, 'inner')
    },
    onDragStart(e, item) {
      let { id, parentId } = item
      let { clientX, clientY } = e
      e.dataTransfer.setData('Text', `child_component_${clientX}|${clientY}|${parentId}|${id}`)
      console.log('drag start:', { id, parentId, clientX, clientY })
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
@import '../../../../../assets/less/base/mixins.less';
@asserts: '../../../../../assets/images';
</style>
