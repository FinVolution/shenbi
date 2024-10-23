<template>
  <div class="button-attr-config-wrap">
    <div class="form-group">
      <span class="config-title">按钮文案:</span>
      <input type="text" v-model="button_text" class="tool-input" @input="updatePropertyAttr('text', 'button_text')" style="width:240px" />
    </div>
    <div class="form-group">
      <span class="config-title c-red">跳转链接:</span>
      <textarea rows="6" type="text" v-model="button_link_url" class="tool-input w-240 auto-height" @input="updatePropertyAttr('linkUrl', 'button_link_url')"></textarea>
    </div>
     <div class="form-group">
      <span class="config-title c-red">打开页面:</span>
      <RadioGroup :options="generatePageRouterOptions()" v-model="router_page_id"
        @input="updatePropertyAttr('routerPageId', 'router_page_id')"></RadioGroup>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import RadioGroup from '~/base/radioGroup'
export default {
  data() {
    return {
      // button
      button_text: '',
      button_link_url: '',
      router_page_id:''
    }
  },
  computed: {
    ...mapState('editor',{
      pageList:state=>state.pageList
    }),
    ...mapGetters('editor', ['componentProperty'])
  },
  components:{RadioGroup},
  watch: {
    componentProperty: {
      handler: function(property) {
        let {text, linkUrl, routerPageId} = property 
        if(routerPageId === null || routerPageId === undefined || routerPageId === ''){
          routerPageId = -1
        }
        Object.assign(this, { button_text: text || '', button_link_url: linkUrl || '', router_page_id: routerPageId })
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapMutations('editor', ['changeComponentAttr']),
    updatePropertyAttr(attrKey, dataKey) {
      this.changeComponentAttr({
        key: 'property',
        newConfig: { [attrKey]: this[dataKey] }
      })
    },
    generatePageRouterOptions(){
      let {pageList} = this
      if(pageList && pageList.length>0){
        return pageList.map(item=>{
          let {pageInfo} = item
          return  { val: pageInfo.id, label: pageInfo.id }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../../../assets/less/base/mixins.less';
.button-attr-config-wrap {
  background-color: #292a2e;
  position: relative;
  @import '../../../../../assets/less/pc/tools.less';
}
</style>
