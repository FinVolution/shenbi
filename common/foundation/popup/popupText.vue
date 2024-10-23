<template>
  <section :class="anim" :style="animStyle">
    <div class="editor-text" :style="styleStr">{{ parseContent }}</div>
  </section>

</template>
<script>
export default {
  data() {
    return {
    }
  },
  props: {
    property: {
      type: Object,
      default() {
        return {
          html: '动态文案请用{{}}包起来，如{{amount}}',
          clickType: 0,
          linkUrl: '',
          animDuration: 1,
          animName: '',
          animCss: '',
          animLoop: false,
        }
      }
    },
    id: { type: String, default: 'default' },
    content: { type: String, default: '' },
    forEdit: { type: Boolean, default: false },
    styleStr: {
      type: Object,
      default() {
        return {}
      }
    },
    paramObj: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    parseContent() {
      return this.forEdit ? this.content : this.analysisContent()
    },
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
    analysisContent() {
      let tempCotent = this.content
      console.log(tempCotent)
      const arrayReg = tempCotent.match(/\{\{(.+?)\}\}/g) || [];
      for (let j = 0; j < arrayReg.length; j++) {
        let key = arrayReg[j];
        let originKey = key.replace(/\{|\}/gi, '');
        let value = this.getQueryString(originKey);
        console.log('originKey', originKey, 'value', value);
        tempCotent = tempCotent.replace(key, value);
      }
      return tempCotent
    },
    getQueryString(name) {
      const param = 'paramJson'
      let match = RegExp('[?&]' + param + '=([^&]*)').exec(window.location.search);
      let paramJson = match && decodeURIComponent(match[1].replace(/\+/g, ' '));
      return paramJson && JSON.parse(paramJson)[name] || '';
    }
  },
}
</script>
<style lang="less">
@import '../../../assets/less/base/mixins.less';
@asserts: '../../../assets/images';

.editor-text {
  box-sizing: border-box;
  color: #fff;
  padding: 0;
  line-height: 1.5;
  appearance: none;
  font-size: 16px;

  >ul,
  ol {
    margin: 10px 0 10px 20px;
  }

  >h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    line-height: 1.5;
  }

  p {
    padding: 0 0;
    margin: 0;
    line-height: 1.5;
  }

  .w-e-text-container {
    background-color: transparent;

    .w-e-text {
      padding: 0;

      p {
        padding: 0 0;
        margin: 0;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 0;
      }
    }
  }

  font[size='1'] {
    font-size: 10px;
  }

  font[size='2'] {
    font-size: 13px;
  }

  font[size='3'] {
    font-size: 16px;
  }

  font[size='4'] {
    font-size: 18px;
  }

  font[size='5'] {
    font-size: 24px;
  }

  font[size='6'] {
    font-size: 32px;
  }

  font[size='7'] {
    font-size: 48px;
  }
}
</style>
<style lang="less">
.editor-text .w-e-text-container {
  .placeholder {
    top: 0;
  }
}
</style>
