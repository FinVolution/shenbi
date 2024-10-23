<template>
  <div class="elem-style-attr-container">
    <ul class="inner-style-container-list">
      <li v-for="item in styleContainerList" :key="`${activeComponent.id}_${item.key}`" class="inner-style-container-item" :class="{'active': item.isActive}" @click="changeElemStyleKey(item)">
        {{item.title}}
      </li>
    </ul>
    <StyleTool flag="elem" :flagKey="activeKey"></StyleTool>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import StyleTool from './styleTool'
export default {
  data() {
    return {
      styleContainerList: [],
      activeKey: ''
    }
  },
  computed: {
    ...mapState('editor', {
      activeComponent: state => state.activeComponent,
    })
  },
  components:{ StyleTool },
  watch: {
    activeComponent: {
      handler: function(n, o) {
        if (n !== null && n !== undefined) {
          let elemConfig = n['elemConfig'] || {}
          let styleContainerList = Object.keys(elemConfig).map((item,index)=> {
            let val = elemConfig[item]
            return {
              key: item,
              title: val['title'],
              isActive: this.activeKey ? this.activeKey === item : index === 0 ? true : false
            }
          })
          Object.assign(this, { styleContainerList })
        } else {
          Object.assign(this, { styleContainerList: [] })
        }
      },
      immediate:true,
      deep:true
    }
  },
  mounted() {
    this.activeKey = this.styleContainerList && this.styleContainerList.length > 0 ? this.styleContainerList[0].key : ''
  },
  methods:{
    changeElemStyleKey(itemObj){
      this.activeKey = itemObj.key
      let { styleContainerList } = this 
      if (styleContainerList && styleContainerList.length > 0) {
        styleContainerList.forEach((item, index) => {
          item['isActive'] = item.key === itemObj.key
          this.$set(styleContainerList, index, item)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../../../../assets/less/base/mixins.less';
  .elem-style-attr-container{
    .inner-style-container-list{
      .setFlexPos(row,flex-start,flex-start);
      padding: 0 6px;
      background-color: #292a2e;
      flex-wrap: wrap;
      .inner-style-container-item{
        .setSize(90px, 28px);
        .setFlexPos(row, center, center);
        border: 1px solid #333;
        margin: 2px;
        color:white;
        cursor: pointer;
        &.active{
          color: #93c8fd;
          border-color: #93c8fd;
        }
      }
    }
  }
</style>