<template>
      <div
      :class="[{ 'image-fit': !property.url , 'not-app-marign' : !isApp && property.setAppMarignTop}]" :style="generateStyleByObj(selfStyle)"
      @click="onImageClick" ></div>
  </template>
  <script>
  import { generateStyleByObj } from "../index";
  export default {
    props: {
      itemConfig: {
        type: Object,
        default () {
            return {
              property: null,
              elemStyle: null,
              selfStyle: null,
            }
        }
      },
      isApp: {
        type: Boolean,
        default: false
      },
      defaultImg: {
        type: String,
        default: ''
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
    watch: {
      itemConfig: {
          handler: function(nObj){
            let { property, elemStyle, selfStyle, containerStyleStr } = nObj || {}
            Object.assign(this,{ property, elemStyle, selfStyle, containerStyleStr })
          },
          immediate: true,
          deep: true
      },
    },
    methods: {
      generateStyleByObj,
      forceHttps(url) {
        if (this.property.url) {
          return url.includes('http://') ? url.replace('http://', 'https://') : url
        }
        return url
      },
      onImageClick() {
        this.$emit('onImageClick')
      }
    }
  }
  </script>
  <style lang="less" scoped>
  @import '../../assets/less/base/mixins.less';
  @asserts: '../../assets/images';
  
  .editor-component-img {
    &.image-fit {
      object-fit: cover;
    }
  
  }
  .not-app-marign {
    margin-top: 0px !important;
  }
  </style>
  