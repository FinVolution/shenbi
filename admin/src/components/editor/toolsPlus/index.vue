<template>
  <div class="tool-index">
    <div class="tab-container" v-show="tabType === 'component-config'">
      <div class="style-config">
        <template v-if="activeComponent && !!activeComponent.elemStyle">
          <!-- <div class="style-panel-title">内部样式</div> -->
          <ElemStyle :activeKey.sync='activeElemStyleKey'></ElemStyle>
        </template>
      </div>
      <div class="item-config">
        <!-- <div class="title">
          <i class="el-icon-caret-bottom"></i>
          <span>属性配置</span>
        </div> -->
        <AttrTool></AttrTool>
      </div>
      
    </div>
    <div class="tab-container" v-show="tabType === 'page-config'">
      <div class="page-config">
        <PageTool></PageTool>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import PageTool from './pageTool'
import AttrTool from './attrTool'
import StyleTool from './styleTool'
import ElemStyle from './elemStyle'
import PageList from './pageList'
export default {
  data() {
    return {
      activeElemStyleKey:''
    }
  },
  computed: {
    ...mapState('editor', {
      // ['component-config':'组件配置'，'page-config':'页面配置'，'page-manage':'组件管理']
      tabType: state => state.toolTabType,
      activeComponent: state => state.activeComponent,
    })
  },
  props: {},
  watch: {},
  components: { PageTool, AttrTool, StyleTool, PageList, ElemStyle },
  methods: {
    ...mapMutations('editor', { changeTabType: 'changeToolTabType' })
  }
}
</script>
<style lang="less" scoped>
@import '../../../../../assets/less/base/mixins.less';
@asserts: '../../../../../assets/images';
.tool-index {
  .setSize(100%, 100%);
  overflow: scroll; // 修复 按钮背景颜色无法调整 原因-视图被遮盖
  padding: 32px 0 0 0;
  .tab-header {
    .setSize(342px, 32px);
    .setFlexPos(row, space-around, center);
    border-bottom: 1px solid #505050;
    z-index: 100;
    background-color: #26272a;
    li {
      position: relative;
      cursor: pointer;
      font-size: 13px;
      padding: 10px 0;
      &:hover,
      &.active {
        color: #93c8fd;
        font-weight: 400;
        &::after {
          background-color: #409eff;
        }
      }
      &::after {
        position: absolute;
        top: 31px;
        left: 0;
        content: '';
        .setSize(100%, 2px);
        border-radius: 4px;
      }
    }
  }
  .tab-container {
    .item-config,
    .style-config,
    .page-config {
      // background-color: rgba(0, 0, 0, 0.85);
      .setSize(100%, auto);
      .title {
        padding: 7px 6px;
        height: 32px;
        color: #d1d1d1;
        line-height: 1.5;
        font-size: 14px;
        font-weight: normal;
      }
      .style-panel-title{
        background-color: #292a2e;
        font-size: 14px;
        color: #ce2038;
        padding: 6px 0 6px 10px;
        border-bottom: 1px solid #444;
      }
    }
    .page-config {
      margin: 6px 0 80px 0;
    }
  }
}
</style>
<style lang="less">
.el-switch__label {
  color: #c3c3c3;
  span {
    font-weight: normal;
    font-size: 12px;
  }
  &.is-active {
    color: #409eff;
  }
}
.el-radio__label {
  font-size: 12px;
  font-weight: normal;
}
</style>
