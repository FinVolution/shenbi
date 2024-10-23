<template>
  <div class="elem-style-attr-container">
    <div v-for="item in styleContainerList" :key="`${activeComponent.id}_${item.key}`"
      :class="{ 'active': item.isActive }" @click="changeElemStyleKey(item)" class="inner-style-container-item">
      <div class="item-title">{{ item.title }}</div>
      <StyleTool flag="elem" :flagKey="item.key"></StyleTool>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import StyleTool from './styleTool'
export default {
  data() {
    return {
      styleContainerList: []
    }
  },
  props: {
    activeKey: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('editor', {
      activeComponent: state => state.activeComponent,
    })
  },
  components: { StyleTool },
  watch: {
    activeComponent: {
      handler: function (n, o) {
        if (n !== null && n !== undefined) {
          let elemConfig = n['elemConfig'] || {}
          let styleContainerList = Object.keys(elemConfig).map((item, index) => {
            let val = elemConfig[item]
            index === 0 && this.$emit('update:activeKey', item)
            return {
              key: item,
              title: val['title'],
              isActive: index === 0 ? true : !!this.activeKey ? this.activeKey === item : false
            }
          })
          Object.assign(this, { styleContainerList })
        } else {
          Object.assign(this, { styleContainerList: [] })
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    changeElemStyleKey(itemObj) {
      this.$emit('update:activeKey', itemObj.key)
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

.elem-style-attr-container {
  .inner-style-container-item {
    border: 1px solid #333;
    margin: 2px;
    color: white;
    background: #26272B;
    padding-top: 10px;

    &.active {
      color: #93c8fd;
      border-color: #93c8fd;
    }
    .item-title{
      font-size: 14px;
      margin-left: 10px;
    }
  }
}
</style>