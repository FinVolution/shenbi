<template>
  <div class="palette-container">
    <div class="editor-container">
      <div class="page-title">
        <i class="el-icon-close"></i>
        <span>{{ pageInfo.title }}</span>
        <i class="el-icon-more"></i>
      </div>
      <div
        class="editor"
        @click="onEditorMainContainerClick"
        :style="pageStyle"
      >
        <div
          :key="item.id"
          v-for="item in componentList"
          :class="generateContainerClass(item.containerStyle)"
          :style="item.propertyName!='marquee'?generateStyleByObj(item.containerStyle):''"
          @click="onCompontItemSelect(item, $event)"
          @contextmenu.prevent="rightClick($event, item, 'outer')"
          :id="`id_component_${item.id}`"
        >   
            <CompList
              :item="item"
              :activeComponent="activeComponent"
              @onCompontItemSelect="onCompontItemSelect"
              @rightSubClick="rightSubClick"
              @rightClick="rightClick"
            />       
            <Shadow v-show="item.isActive">
            </Shadow>
          </div>
      </div>
      <div class="page-footer"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { generateStyleByObj } from "$root/common/index";
import Shadow from "~/base/shadow";
import CompList from './components.vue'
export default {
  data() {
    return {
      pageStyle: "",
      defaultImg: require("$root/assets/images/defaultImg.png"),
      startPos: [0, 0],
    };
  },
  computed: {
    ...mapState("editor", {
      activeComponent: (state) => state.activeComponent,
      pageInfo: (state) => state.pageInfo,
    }),
    ...mapGetters("editor", ["rightMenuShow"]),
    componentList: {
      get() {
        return this.$store.state.editor.componentList;
      },
      set(values) {
        this.$store.commit("editor/componentDragUpdate", values);
      },
    },
    showDragContainer() {
      return this.activeComponent && ['popupAD', 'popupImage', 'popupText'].includes(this.activeComponent.propertyName)
    }
  },
  watch: {
    activeComponent(newVal, oldVal) {
      let { dragable, id } = newVal || {}
      if (dragable) {
      }
    },
    // 获取页面样式[背景图片，背景颜色，高度]
    pageInfo: {
      handler: function (newVal) {
        let { bgColor, bgImgUrl } = newVal;
        let tempPageStyle = {};
        if (bgImgUrl) {
          if (bgImgUrl.indexOf("http") > -1) {
            tempPageStyle = {
              backgroundImage: `url(${bgImgUrl})`,
              backgroundPosition: `top center`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              backgroundColor: `${bgColor}`,
              backgroundSize:'100%',
              'padding-bottom': '0.1px',
              'padding-top': '0.1px'
            };
          } else {
            tempPageStyle = {
              backgroundImage: bgImgUrl,
              backgroundImage: `-webkit-${bgImgUrl}`,
              width: '100%',
              backgroundColor: `${bgColor}`,
              backgroundSize:'100%',
              'padding-bottom': '0.1px',
              'padding-top': '0.1px'
            };
          }
        } else {
          tempPageStyle = {
            backgroundColor: `${bgColor}`,
            width: '100%',
            'padding-bottom': '0.1px',
            'padding-top': '0.1px'
            // height:'100%'
          };
        }
        Object.assign(this, { pageStyle: tempPageStyle });
      },
      immediate: true,
      deep: true,
    },
  },
  components: {
    Shadow,
    CompList,
  },
  methods: {
    ...mapMutations("editor", [
      "changeComponentAcitve",
      "changeRightClick",
      "addChildComponent",
      "changeComponentAttr"
    ]),
    generateStyleByObj,
    onCompontSubItemSelect(obj){
      this.onCompontItemSelect(obj.item, obj.e)
    },
    onCompontItemSelect(compontItem, e) {
      if (compontItem.parentId) {
        this.changeComponentAcitve({
          componentId: compontItem.parentId,
          childComponentId: compontItem.id,
        });
      } else {
        this.changeComponentAcitve({ componentId: compontItem.id });
      }
    },
    rightSubClick(obj){
      this.rightClick(obj.e, obj.item, obj.action);
    },
    // 组件右键菜单
    rightClick(e, componentItem, flag) {
      this.onCompontItemSelect(componentItem);
      if (this.rightMenuShow) {
        this.changeRightClick({
          show: false,
          clientX: 0,
          clientY: 0,
          flag: null,
        });
        this.$nextTick(() => {
          this.changeRightClick({
            show: true,
            clientX: e.clientX,
            clientY: e.clientY,
            flag,
          });
        });
      } else {
        this.changeRightClick({
          show: true,
          clientX: e.clientX,
          clientY: e.clientY,
          flag,
        });
      }
    },
    onEditorMainContainerClick() {
      this.changeRightClick({
        show: false,
        clientX: 0,
        clientY: 0,
        flag: null,
      });
    },
    generateContainerClass(containerStyle) {
      let { align, flexDirection } = containerStyle || {};
      if (align || flexDirection) {
        let alingClassMap = {
          left: "align-left",
          center: "align-center",
          right: "align-right",
        };
        let directionClassMap = { row: "dir-row", column: "dir-column" };
        let alignClassName = alingClassMap[align];
        let directionClassName = directionClassMap[flexDirection];
        let resultClasaName = `component-item with-flex`;
        resultClasaName = alignClassName
          ? `${resultClasaName} ${alignClassName}`
          : resultClasaName;
        resultClasaName = directionClassName
          ? `${resultClasaName} ${directionClassName}`
          : resultClasaName;
        return resultClasaName;
      } else {
        return `component-item`;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {});
  },
};
</script>
<style lang="less" scoped>
@import "../../../../../assets/less/base/mixins.less";
@asserts: "../../../../../assets/images";
.palette-container {
  .setSize(100%, 100%);
  min-width: 375px;
  .setFlexPos(row, center, flex-start);
  font-weight: normal;
  .editor-container {
    .setSize(375px, auto);
    margin: 0 0 180px 0;
    .page-title {
      .setFlexPos(row, space-between, center);
      color: #fff;
      .setSize(100%, 40px);
      background-color: #666;
      font-weight: normal;
      padding: 0 10px;
      i {
        font-size: 16px;
      }
    }
    .editor {
      .setSize(100%, auto);
      position: relative;
      min-height: 667px;
      position: relative;
      padding-top: 0.1px;
      padding-bottom: 0.1px;
      box-shadow: 0 0 6px 1px #999;
      .dragger {
        border-top: 1px solid #666;
      }
      .component-item {
        position: relative;
        color: #fff;
        cursor: pointer;
        &.with-flex {
          .setFlexPos(row, space-between, center);
          flex-wrap: wrap;
          &.dir-row {
            flex-direction: row;
          }
          &.dir-column {
            flex-direction: column;
          }
          &.align-left {
            justify-content: flex-start;
          }
          &.align-center {
            justify-content: center;
          }
          &.align-right {
            justify-content: flex-end;
          }
        }
      }
    }
    .page-footer {
      height: 80px;
    }
  }
}
</style>
