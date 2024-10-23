<template>
  <div class="button-attr-config-wrap">
    <div class="form-group config-title-outer">
      <RadioGroup
          title="跳转类型："
          :options="[
            { val: 0, label: '无' },
            { val: 1, label: '跳转' },
            { val: 2, label: 'app内外判断' },
            // { val: 3, label: '系统判断' },
            { val: 4, label: 'app内跳转关闭页面' },
            { val: 5, label: '弹窗默认跳转' },
            { val: 6, label: '弹窗自定义跳转' },
            { val: 7, label: '小程序跳转' },
            { val: 8, label: 'toast' },
            
          ]"
          :value="clickType"
          keyValue="clickType"
          @onRadioValChange="handleChangeProperty"
        ></RadioGroup>
    </div>
    <div class="form-group config-title-outer">
      <InputString :title="'跳转链接:'" keyValue="linkUrl" :value="linkUrl" @input="handleChangeProperty">
      </InputString>
    </div>
    <div class="form-group config-title-outer">
      <InputString :title="'Toast内容:'" keyValue="toastMsg" :value="toastMsg" @input="handleChangeProperty">
      </InputString>
    </div>

  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import InputString from '~/basePlus/inputString'
import RadioGroup from '~/basePlus/radioGroup'

export default {
  data() {
    return {
    }
  },
  components: {
    InputString,
    RadioGroup
  },
  computed: {
    ...mapGetters('editor', ['componentProperty']),
    linkUrl() {
      return this.componentProperty.linkUrl;
    },
    toastMsg() {
      return this.componentProperty.toastMsg;
    },
    clickType() {
      return this.componentProperty.clickType;
    },
  },
 
  methods: {
    ...mapMutations('editor', ['changeComponentAttr']),
    handleChangeProperty(key, newValue) {
      this.changeComponentAttr({
        key: 'property',
        newConfig: { [key]: newValue }
      });
    },
  }
}
</script>

<style lang="less" scoped>
@import '../../../../../assets/less/base/mixins.less';

.button-attr-config-wrap {
  background-color: #292a2e;
  position: relative;

  .el-radio-self {
    margin-right: 10px;
  }

  @import '../../../../../assets/less/pc/tools.less';
}
</style>