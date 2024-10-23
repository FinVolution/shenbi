<template>
  <ul class="page-list">
    <li class="page-preview" v-for="item in pageList" :key="item.pageId" :class="{ active: pageInfo.id === item.pageId }" @click="changeActivePage(item)">
      <div class="preview-area">
        <ul class="area">
          <li class="title"></li>
          <li class="swapper"></li>
          <li class="panel">
            <span></span>
            <span></span>
            <span></span>
          </li>
          <li class="content">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </li>
          <li class="footer">
            <span></span>
            <span></span>
            <span></span>
          </li>
        </ul>
      </div>
      <div class="preview-title">{{ item.pageInfo && item.pageInfo.title }}</div>
      <div class="preview-index">页面ID:
        <span>{{ item.pageInfo && item.pageInfo.id }}</span>
      </div>
    </li>
    <li class="add-page">
       <button class="add-btn" @click="onAddPage"><i class="el-icon-circle-plus-outline"></i></button>
    </li>
  </ul>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('editor', {
      pageList: state => state.pageList,
      pageInfo: state => state.pageInfo
    })
  },
  watch: {},
  components: {},
  props: {},
  methods: {
    ...mapMutations('editor', ['changePageActive','addPage']),
    ...mapActions('editor', ['saveProject']),
    changeActivePage(pageItem) {
      if (pageItem.pageId === this.pageInfo.id) return false
      this.saveProject().then(() => {
        this.changePageActive(pageItem.pageId)
      })
    },
    onAddPage(){
       this.saveProject().then(() => {
        this.addPage()
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../../../assets/less/base/mixins.less';
.page-list {
  .setSize(100%, auto);
  .page-preview {
    padding: 0 0 0 60px;
    margin: 8px 0;
    position: relative;
    cursor: pointer;
    &::before {
      position: absolute;
      .setSize(2px, 100%);
      left: 0;
      content: '';
      border-radius: 3px;
    }
    .preview-area {
      background-color: #d1d1d1;
      .setSize(82px, 120px);
      border-radius: 3px;
      .area{
        .setSize(100%,100%);
        .setFlexPos(column,flex-start,flex-start);
        padding: 5px;
        .title{
          .setSize(50%,5px);
          background-color: #999;
        }
        .swapper{
          position: relative;
          .setSize(100%,32px);
          margin: 5px 0 0 0;
          background-color: #999;
          &::after{
            content: '...';
            .setPosition(absolute, auto, auto, 2px,31px);
            font-size: 16px;
            color: #777;
          }
        }
        .panel{
          .setSize(100%,26px);
           padding: 0 1px;
          .setFlexPos(row,space-between,center);
          span{
            display: inline-block;
            .setSize(20px,16px);
            background-color: #999;
            border-radius: 3px;
          }
        }
        .content{
           .setSize(100%,auto);
           padding: 0 1px;
          .setFlexPos(column,flex-start,flex-start);
          span{
            display: inline-block;
            margin: 2px 0 0 0 ;
            .setSize(100%,4px);
            background-color: #999;
            &:first-child{
              .setSize(90%,4px);
              align-self: flex-end;
            }
            &:last-child{
               .setSize(90%,4px);
            }
          }
        }
        .footer{
           .setSize(100%,auto);
           margin: 5px 0 0 0 ;
          .setFlexPos(row,space-between,center);
          span{
            display: inline-block;
            .setSize(20px,10px);
            background-color: #999;
            border-radius: 8px;
          }
        }
      }
    }
    .preview-title {
      color: #fff;
      padding: 4px 7px;
      font-size: 14px;
      font-weight: 400;
      .setPosition(absolute, 10px, auto, auto, 160px);
    }
    .preview-index {
      color: #000;
      padding: 4px 7px;
      background-color: #e0e0e0;
      border-radius: 2px;
      font-size: 13px;
      font-weight: 400;
      .setPosition(absolute, auto, auto, 4px, 164px);
      span{
        font-weight: 600;
        margin: 0 0 0 6px;
      }
    }
    &.active {
      &::before {
        background-color: #409eff;
      }
      .preview-title {
        color: #409eff;
      }
      .preview-index {
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  .add-page{
    padding: 0 0 0 60px;
    .add-btn{
      .setSize(82px, 50px);
      background-color: #d1d1d1;
      border-radius: 3px;
      border: none;
      margin: 0;
      font-size: 36px;
      padding: 0;
      color: #777;
      cursor: pointer;
    }
  }
}
</style>
