<template>
  <div v-if="show" class="right-btn-menu" :style="{ top: top + 'px', left: left + 'px' }">
    <template v-if="flag === 'outer'">
      <div class="right-btn-menu-item">
        <span class="item-self" @click.stop="alignLeft">居左</span>
        <span class="item-self" @click.stop="alignCenter">居中</span>
        <span class="item-self" @click.stop="alignRight">居右</span>
      </div>
      <div class="right-btn-menu-item">
        <span class="item-self" @click.stop="copyElement">复制</span>
        <span class="item-self" @click.stop="deleteElement">删除</span>
      </div>
    </template>
    <template v-else-if="flag === 'inner'">
      <div class="right-btn-menu-item">
        <span class="item-self" @click.stop="countIndex('plus')">向上一层</span>
        <span class="item-self" @click.stop="countIndex('minus')">向下一层</span>
      </div>
      <div class="right-btn-menu-item">
        <span class="item-self" @click.stop="copyElement">复制</span>
        <span class="item-self" @click.stop="deleteElement">删除</span>
      </div>
    </template>
    <template v-else>
      <div class="right-btn-menu-item">
        <span class="item-self" @click.stop="copy">复制</span>
        <span class="item-self" @click.stop="deleteElement">删除</span>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return { top: 0, left: 0 }
  },
  computed: {
    ...mapState('editor', {
      show: state => state.rightClkInfo && state.rightClkInfo.show,
      clientX: state => state.rightClkInfo && state.rightClkInfo.clientX,
      clientY: state => state.rightClkInfo && state.rightClkInfo.clientY,
      flag: state => state.rightClkInfo && state.rightClkInfo.flag,
      activeComponent: state => state.activeComponent
    })
  },
  created() {},
  watch: {
    show(newVal) {
      newVal && this.doShow()
    }
  },
  methods: {
    ...mapMutations('editor', ['deleteComponent', 'changeComponentAttr', 'changeComponentIndex', 'changeRightClick', 'copyComponent']),
    deleteElement() {
      this.deleteComponent()
      this.hide()
    },
    copyElement() {
      this.copyComponent()
      this.hide()
    },
    doShow() {
      this.left = this.clientX
      this.top = this.clientY
    },
    hide() {
      this.changeRightClick({ show: false, clientX: 0, clientY: 0, flag: null })
    },
    // 加减
    countIndex(flag) {
      let { activeComponent } = this
      let { zIndex } = (activeComponent && activeComponent['containerStyle']) || {}
      this.changeComponentAttr({
        key: 'containerStyle',
        newConfig: {
          zIndex: flag === 'plus' ? ++zIndex : Math.max(0, --zIndex)
        }
      })
      this.hide()
    },
    alignLeft() {
      this.changeComponentAttr({
        key: `containerStyle`,
        newConfig: { align: 'left' }
      })
      this.hide()
    },
    alignCenter() {
      this.changeComponentAttr({
        key: `containerStyle`,
        newConfig: { align: 'center' }
      })
      this.hide()
    },
    alignRight() {
      this.changeComponentAttr({
        key: `containerStyle`,
        newConfig: { align: 'right' }
      })
      this.hide()
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';
@asserts: '../../../../assets/images';
.right-btn-menu {
  position: fixed;
  top: 0;
  .setSize(120px, auto);
  color: #fff;
  background-color: #666;
  border-radius: 2px;
  z-index: 10001;
  border-top: 1px solid rgba(238, 5, 43, 0.24);
  border-left: 1px solid rgba(238, 5, 43, 0.24);
  .right-btn-menu-item {
    .setSize(100%, 28px);
    .setFlexPos(row, flex-start, center);
    cursor: pointer;
    .item-self {
      display: block;
      cursor: pointer;
      .setFlexPos(row, center, center);
      border-bottom: 1px solid rgba(238, 5, 43, 0.24);
      border-right: 1px solid rgba(238, 5, 43, 0.24);
      font-size: 12px;
      font-weight: 500;
      text-align: center;
      .setSize(100%, 100%);
      &:hover,
      &.active {
        background: #ce2038;
        color: #fff;
      }
    }
  }
}
</style>
