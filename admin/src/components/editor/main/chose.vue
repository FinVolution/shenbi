<template>
  <div class="choose-container" @click="onMainContainerClick">
    <span class="title">已选组件</span>
    <ul class="choose-list" v-if="componentList && componentList.length > 0">
      <draggable v-model="componentList" group="cplistForChose" @start="drag = true" @end="drag = false">
        <transition-group>
          <li v-for="item in componentList" :key="`choose_item_${item.id}`" :class="{ 'thumbnail-item': true, 'is-active': item.isActive }" @click="onCompontItemSelect(item)" @contextmenu.prevent="rightClick($event, item, 'outer')">
            <div class="content" :class="{ 'has-border-bottom': item.children && item.children.length > 0 }">
              <SvgIcon :icon-class="item.icon" :class-name="item.icon"></SvgIcon>
              <span class="desc"> {{ item.name }} </span>
            </div>
            <ul class="child-list" v-if="item.children && item.children.length > 0">
              <li
                class="child-item content"
                :class="{ active: activeComponent && activeComponent.id === childItem.id }"
                v-for="childItem in item.children"
                :key="`child_item_${childItem.id}`"
                @click.stop="onCompontItemSelect(childItem)"
                @contextmenu.prevent.stop="rightClick($event, childItem, 'inner')"
              >
                <SvgIcon :icon-class="childItem.icon" :class-name="childItem.icon"></SvgIcon>
                <span class="desc"> {{ childItem.name }} </span>
              </li>
            </ul>
          </li>
        </transition-group>
      </draggable>
    </ul>
    <div class="no-data" v-else>
      <SvgIcon icon-class="spinner-bars" class-name="spinner-bars"></SvgIcon>
      <span>暂无数据</span>
      <SvgIcon icon-class="spinner-bars" class-name="spinner-bars"></SvgIcon>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import draggable from 'vuedraggable'
export default {
  data() {
    return {}
  },
  components: { draggable },
  computed: {
    ...mapState('editor', {
      activeComponent: state => state.activeComponent
    }),
    ...mapGetters('editor', ['rightMenuShow']),
    componentList: {
      get() {
        return this.$store.state.editor.componentList
      },
      set(value) {
        this.$store.commit('editor/componentDragUpdate', value)
      }
    }
  },
  methods: {
    ...mapMutations('editor', ['changeComponentAcitve', 'changeRightClick']),
    // 组件右键菜单
    rightClick(e, componentItem, flag) {
      this.onCompontItemSelect(componentItem)
      if (this.rightMenuShow) {
        this.changeRightClick({ show: false, clientX: 0, clientY: 0, flag: null })
        this.$nextTick(() => {
          this.changeRightClick({ show: true, clientX: e.clientX, clientY: e.clientY, flag })
        })
      } else {
        this.changeRightClick({ show: true, clientX: e.clientX, clientY: e.clientY, flag })
      }
    },
    onCompontItemSelect(compontItem) {
      if (compontItem.parentId) {
        this.changeComponentAcitve({ componentId: compontItem.parentId, childComponentId: compontItem.id })
      } else {
        this.changeComponentAcitve({ componentId: compontItem.id })
      }
    },
    onMainContainerClick() {
      this.changeRightClick({ show: false, clientX: 0, clientY: 0, flag: null })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../../../assets/less/base/mixins.less';
.choose-container {
  .setSize(150px, 100%);
  min-width: 150px;
  .scrollBar();
  overflow: auto;
  background-color: hsla(0, 0%, 100%, 0.04);
  position: relative;
  padding: 0 0 84px 0;
  .setFlexPos(column, flex-start, center);
  .title {
    .setSize(100%, 40px);
    display: block;
    font-size: 13px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.04);
  }
  .choose-list {
    flex: 1;
    .setSize(100%, auto);
    overflow: auto;
    .scrollBar();
    .thumbnail-item {
      .setSize(100%, 100%);
      border-bottom: 1px solid hsla(0, 0%, 100%, 0.04);
      border-radius: 2px;
      cursor: pointer;
      border: 1px solid rgb(92, 92, 92);
      margin: 0 0 4px 0;
      padding: 4px 0 4px 0;
      .content {
        .setFlexPos(row, space-between, center);
        .setSize(100%, 24px);
        padding: 0 12px;
        font-size: 12px;
        color: #ededed;
        .svg-icon {
          font-size: 14px;
        }
        &.has-border-bottom {
          height: 28px;
          border-bottom: 1px solid rgb(92, 92, 92);
        }
      }
      &:hover {
        background-color: rgb(92, 92, 92);
      }
      &.is-active {
        background-color: #444;
        &:hover {
          background-color: rgb(104, 104, 104);
        }
      }
      .child-list {
        padding: 0 0 0 36px;
        .child-item {
          position: relative;
          .setSize(100%, 32px);
          &:first-child {
            &::before {
              height: 15px;
              top: 0px;
            }
          }
          &::before {
            content: ' ';
            .setSize(12px, 30px);
            .setPosition(absolute, -15px, auto, auto, -8px);
            border-left: 1px dashed rgb(189, 189, 189);
            border-bottom: 1px dashed rgb(189, 189, 189);
          }
          &.active {
            border-bottom: 1px solid rgb(180, 19, 46);
          }
        }
      }
    }
  }
  .no-data {
    .setSize(100%, 100%);
    .setFlexPos(column, space-around, center);
    font-size: 16px;
    color: #fff;
    .spinner-bars {
      font-size: 20px;
    }
  }
}
</style>
