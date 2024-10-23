<template>
  <div :style="generateStyleByObj(obj.containerStyle,true)">
    <CText :content="obj.property.html" v-if="obj.propertyName == 'text'" :styleStr="generateStyleByObj(obj.selfStyle, true)" :id="obj.id"/>
    <CImage :url="obj.property.url" v-else-if="obj.propertyName == 'image'" :styleStr="generateStyleByObj(obj.selfStyle, true)"/>
    <CInput :placeholder="obj.property.placeholder" v-else-if="obj.propertyName == 'input'" :styleStr="generateStyleByObj(obj.selfStyle, true)"/>
    <CButton :propery="obj.property" v-else-if="obj.propertyName == 'button'" :styleStr="generateStyleByObj(obj.selfStyle, true)"/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CImage from './image'
import CInput from './input'
import CText from './text'
import CButton from './button'
import { generateStyleByObj } from '../index'
export default {
  data() {
    return { componentList: [] }
  },
  props: {
    obj: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {},
  watch: {},
  components: { CImage, CInput, CText, CButton },
  methods: {
    generateStyleByObj
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
@import '../../assets/less/base/mixins.less';
@asserts: '../../assets/images';
</style>
