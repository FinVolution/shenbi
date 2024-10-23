<template>
  <section :class="anim" :style="animStyle">
    <img :src="property.url || defaultImg" class="editor-component-img" :class="{ 'image-fit': !property.url }"
      :style="styleStr" @click="onClick" />
  </section>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    property: {
      type: Object,
      default() {
        return {
          url: null,
          clickType: 0,
          linkUrl: '',
          hreftype: 0,
          animDuration: 1,
          animName: '',
          animCss: '',
          animLoop: false,
        }
      }
    },
    styleStr: {
      type: Object,
      default() {
        return {}
      }
    },
    isTemplate: {
      type: Boolean,
      default() {
        return true
      }
    },
    defaultImg: {
      type: String,
      default: ''
    },
    paramObj: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    anim() {
      let css = this.property.animCss;
      return css
    },
    animStyle(){
      const loop = this.property.animLoop ? 'infinite' : 1
      return `animation-iteration-count:${loop};animation-duration:${this.property.animDuration}s;`
    }
  },
  methods: {
    onClick() {
      if (!this.isTemplate) {
        this.$emit('onDialogImageClick', this.property)
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/base/mixins.less';
@asserts: '../../../assets/images';
@import '../css/animimage.css';

.editor-component-img {
  .setSize(100%, 100%);
  box-sizing: border-box;
  appearance: none;
  
  &.image-fit {
    object-fit: cover;
  }
}
</style>
