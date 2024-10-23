<template>
  <div class="panel-container">
    <div class="tag-contaner" v-if="!isDialogEdit">
      <div :class="{ title: true, active: item.tag === activeTag }" :key="'tag_' + index" v-for="(item, index) in tagMapArr" @click="activeTag = item.tag" >
        {{ item.name }}
      </div>
    </div>
    <div class="sub-container">
      <div class="sub-item" v-for="(item, index) in Object.values(compList)" v-if="item.tag === activeTag" :key="index" @click="handleSelect(item.propertyName)">
        <div class="item-content" draggable="false" v-if="['container', 'popup'].indexOf(item.propertyName) > -1">
          <SvgIcon :icon-class="item.icon" :class-name="item.icon"></SvgIcon>
          <span class="desc">{{ item.name }}</span>
        </div>
        <div class="item-content" draggable="true" @dragstart="onDrag($event, item.propertyName)" v-else>
          <SvgIcon :icon-class="item.icon" :class-name="item.icon"></SvgIcon>
          <span class="desc">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import configJson, { TAG_COMPONENT_ARR } from '$root/common/config/editor'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      tagMapArr: TAG_COMPONENT_ARR,
      compList: configJson,
      activeTag: TAG_COMPONENT_ARR[0]['tag']
    }
  },
  props: {
    isDialogEdit: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isDialogEdit: {
      deep: true,
      immediate: true,
      handler(val) {
        if(val) {
          this.activeTag = 'popup'
        }
      }
    },
  },
  methods: {
    ...mapMutations('editor', ['addComponent']),
    handleSelect(propertyName) {
      this.addComponent({ propertyName })
    },
    onDrag(ev, propertyName) {
      console.log(propertyName)
      ev.dataTransfer.setData('Text', `component_${propertyName}`)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../../../assets/less/base/mixins.less';
.panel-container {
  .setSize(260px, 100%);
  min-width: 258px;
  background-color: hsla(0, 0%, 100%, 0.04);
  border-right: 1px solid hsla(0, 0%, 100%, 0.04);
  box-sizing: border-box;
  .setFlexPos(row, flex-start, flex-start);
  .tag-contaner {
    .setSize(28px, 100%);
    box-sizing: border-box;
    .setFlexPos(column, flex-start, center);
    background-color: hsla(0, 0%, 100%, 0.08);
    overflow: auto;
    padding: 0 0 60px 0;
    .scrollBar();
    .title {
      position: relative;
      writing-mode: vertical-lr;
      font-size: 14px;
      min-height: 140px;
      font-weight: 500;
      color: #d7d7d7;
      padding: 50px 0 0 2px;
      letter-spacing: 8px;
      .setSize(20px, auto);
      box-sizing: border-box;
      cursor: pointer;
      border-bottom: 1px solid #777;
      &.active {
        color: #93c8fd;
        &::after {
          content: '';
          .setPosition(absolute, 64px, -2px, auto, auto);
          border: solid 4px transparent;
          border-right-color: #93c8fd;
        }
      }
    }
  }
  .sub-container {
    .setSize(100%, 100%);
    overflow: auto;
    padding: 10px 0 50px 0;
    .scrollBar();
    .sub-item {
      display: inline-block;
      .setSize(100px, 76px);
      margin: 0 0 6px 8px;
      border: 1px solid #444;
      border-radius: 4px;
      &:hover {
        border-color: rgba(238, 5, 43, 0.24);
        background-color: #444;
      }
      cursor: pointer;
      .item-content {
        .setSize(100%, 100%);
        .setFlexPos(column, space-around, center);
        .svg-icon {
          color: #fff;
          font-size: 18px;
          font-weight: 600;
        }
        .desc {
          font-size: 13px;
          font-weight: 400;
          color: #fff;
        }
      }
    }
  }
}
</style>
