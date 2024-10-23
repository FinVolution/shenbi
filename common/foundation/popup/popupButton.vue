<template>
  <button ref="popupText" class="editor-button" :style="styleStr" @click="onBtnClick" v-text="property.text" />
</template>
<script>
export default {
  props: {
    property: {
      type: Object,
      default () {
        return {}
      }
    },
    styleStr: {
      type: Object,
      default () {
        return {}
      }
    },
    paramObj: {
      type: Object,
      default() {
        return {}
      }
    },
    type: {
      type: String,
      default: 'editor',
    }
  },
  data () {
    return {
        buttonText: null,
    }
  },
  mounted(){
    // 动态更换参数
    if(this.paramObj && JSON.stringify(this.paramObj) !=="{}"){
      console.log('111111',this.$refs.popupText)
      let node = this.$refs.popupText;
      if (node.innerText) {
        var param = node.innerText;
        var array = param.match(/\{\{(.+?)\}\}/g);
        if(array && array.length){
            for (var j = 0; j < array.length; j++) {
                var key = array[j];
                var originKey = key.replace(/\{|\}/gi, '');
                var value = this.paramObj[originKey];
                node.innerText = node.innerText.replace(key, value);
            }
        }
        this.buttonText = node.innerText;
      }
    }
  },
  methods: {
    onBtnClick () {
      if(this.type !== 'editor'){
        this.$emit('btnClick', this.buttonText);
        let { linkUrl, routerPageId} = this.property || {}
        // 动态参数下发替换
        let linkUrlStr = linkUrl;
        var array = linkUrl.match(/\{\{(.+?)\}\}/g);
        if(array && array.length && array[0]){
            let key = array[0];
            var originKey = key.replace(/\{|\}/gi, '');
            var value = this.paramObj[originKey];
            linkUrlStr = linkUrlStr.replace(key, value);
        }
        if(linkUrlStr){
            window.location.href = linkUrlStr
        }
      }  
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/base/mixins.less';
@asserts: '../../../assets/images';
.editor-button {
  outline: none;
  cursor: pointer;
  letter-spacing: 1px;
  appearance: none;
  box-sizing: border-box;
}
</style>
