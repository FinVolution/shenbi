<template>
  <div class="layout">
    <div class="topbar">
      <div class="header">
        <div class="logo"></div>
        <div class="title"><span>神笔设计平台</span></div>
      </div>
      <div class="operation">
        <SvgIcon class-name="bell" icon-class="bell" @click="noticeDialogVisible = true"></SvgIcon>
        <button type="button" class="cancel" @click.stop="quitOut">退出编辑</button>
        <button type="button" class="save" @click.stop="doSaveProject">完成编辑</button>
      </div>
    </div>
    <div class="g-container">
      <Panel></Panel>
      <Chose></Chose>
      <div :class="{ 'g-center': true, 'has-padding-right': isCenterHasPaddding() }">
        <!-- <Undo></Undo> -->
        <DesignEditor></DesignEditor>
        <PopupContainer></PopupContainer>
      </div>
      <div class="g-right"><ToolIndex></ToolIndex></div>
    </div>
    <RclkMenu></RclkMenu>
  </div>
</template>
<script>
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'
import DesignEditor from '~/editor/main/index'
import ToolIndex from '~/editor/tools'
import Chose from '~/editor/main/chose'
import Panel from '~/editor/main/panel'
import PopupContainer from '~/editor/popup'
import RclkMenu from '~/base/rclkMenu'
import Undo from '~/base/undo'

export default {
  data() {
    return {
      type: '', //操作类型  创建：create   编辑未上线：preEdit  编辑已上线： edit
      noticeDialogVisible: false //版本升级公告 默认隐藏
    }
  },
  computed: {
    ...mapGetters('editor', ['componentPropertyName']),
    ...mapState('editor', {
      componentList: state => state.componentList,
      activeComponentItem: state => state.activeComponent,
      pageInfo: state => state.pageInfo,
      projectId: state => state.projectId,
      preId: state => state.preId
    })
  },
  components: { DesignEditor, ToolIndex, Chose, PopupContainer, Panel, RclkMenu, Undo },
  methods: {
    ...mapMutations('editor', ['editorInint', 'setObject']),
    ...mapActions('editor', ['saveProject']),
    doCloseTab() {
      let browserName = navigator.appName
      if (browserName == 'Netscape') {
        window.location.href = 'about:blank' //关键是这句话
        window.close()
      } else if (browserName == 'Microsoft Internet Explorer') {
        window.opener = null
        window.close()
      }
    },
    isCenterHasPaddding() {
      let { activeComponentItem } = this
      console.log('activeComponentItem',activeComponentItem)
      if (activeComponentItem) {
        let { propertyName, property } = activeComponentItem
        if (propertyName === 'o2oLogin') {
          if (property.switchSubstep){
              return true
            } else {
              return false
            }
        }
        return ['o2oLogin'].indexOf(propertyName) > -1
      }
      return false
    },
    // 判断是否弹出公告
    checkAnnouncement() {
      this.$http.checkAnnouncement().then(res => {
        if (res.Content === 1) {
          Object.assign(this, { noticeDialogVisible: true })
        }
      })
    },
    announcementConfirm(value) {
      Object.assign(this, { noticeDialogVisible: value })
    },
    //退出
    quitOut() {
      this.$confirm('您还未保存项目，您确定离开此页面吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => this.doCloseTab())
        .catch(() => {})
    },
    //获取h5编辑的json
    getProjectConfigJson() {
      let { projectId, preId } = this
      console.log('getProjectConfigJson', projectId, preId)
      this.$http
        .editPreviewProject({ projectId, preId })
        .then(response => {
          let { Result, Content } = response
          if (Result === 200 && Content) {
            this.editorInint(Content['pageList'])
          }
        })
        .catch(err => {
          console.info(err)
        })
    },
    // 保存提交
    doSaveProject(json) {
      let { projectId, preId, componentList, pageInfo } = this
      let requestObj = { projectId, preId, pageId: 1 }
      let resultComponentList = []
      let resultPageProperties = []
      if (componentList && componentList.length > 0) {
        for (let i = 0; i < componentList.length; i++) {
          let item = componentList[i]
          let { propertyName, property, componentId, name, style, innerStyle } = item
          let validResult = this.formValidate(propertyName, property)
          if (!validResult) {
            return false
          }
        }
      }
      this.saveProject()
        .then(() => {
          this.$message({
            type: 'success',
            message: '保存成功!',
            duration: 1500,
            onClose: () => {
              this.doCloseTab()
            }
          })
        })
        .catch(errMsg => {
          console.log({ errMsg })
        })
    },
    formValidate(propertyName, property) {
      if (propertyName === 'o2oLogin') {
        let {
          loginRedirectUrl,
          reigsterRedirectUrl,
        } = property
        if (!loginRedirectUrl || !reigsterRedirectUrl) {
          this.$message.error('注册登录跳转url不能为空！')
          return false
        }
      }
      return true
    },
  },
  created() {
    //全局获取项目id和草稿id
    let { projectId, preId, type } = this.$route.query || {}
    this.setObject({ key: 'projectId', val: projectId })
    this.setObject({ key: 'preId', val: preId })
    Object.assign(this, { type })
    if (this.type === 'edit' || this.type === 'preEdit') {
      this.getProjectConfigJson()
    } else {
      // this.paletteInint()
    }
    // this.checkAnnouncement()
  }
}
</script>
<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';
@asserts: '../../../assets/images';
.layout {
  .setSize(100%, 100%);
  font-weight: 400;
  background-color: #1a1b1f;
  overflow-y: hidden;
  .setFlexPos(column, flex-start, flex-start);
  .topbar {
    .setSize(100vw, 46px);
    min-height: 46px;
    background-color: hsla(0, 0%, 100%, 0.08);
    padding: 0 20px 0 0;
    .setFlexPos(row, space-between, center);
    .header {
      .setSize(auto, 100%);
      box-sizing: border-box;
      border: 6px solid transparent;
      .setFlexPos(row, flex-start, center);
      .logo {
        .setSize(90px, 100%);
        .setBgImg('@{asserts}/palette/logo.png', center, middle, contain, no-repeat);
      }
      .title {
        color: #fff;
        font-size: 17px;
      }
    }
    .operation {
      .setFlexPos(row, space-between, center);
      .bell {
        font-size: 16px;
        color: #fff;
        margin: 0 10px 0 0;
        cursor: pointer;
      }
      .cancel,
      .save {
        font-size: 12px;
        margin: 0 10px 0 0;
        cursor: pointer;
        color: #fff;
        &:focus {
          outline: none;
        }
      }
      .save {
        padding: 5px 10px;
        border-radius: 3px;
        background-color: #ce2038;
        border: none;
      }
      .cancel {
        background: none;
        border: none;
      }
    }
  }
  .g-container {
    flex: 1;
    .setSize(100%, 100%);
    .setFlexPos(row, space-between, flex-start);
    .g-center {
      flex: 1;
      height: 100%;
      min-width: 740px;
      .scrollBar();
      overflow-y: auto;
      padding: 10px 0;
      position: relative;
      &.has-padding-right {
        padding: 10px 354px 10px 0;
      }
    }
    .g-right {
      .setSize(342px, 100%);
      min-width: 342px;
      overflow: scroll; // 修复 按钮背景颜色无法调整 原因-视图被遮盖
      .scrollBar();
      background-color: hsla(0, 0%, 100%, 0.04);
    }
  }
}
</style>
<style>
.el-color-picker__trigger {
  border: none;
  padding: 3px;
}
</style>
