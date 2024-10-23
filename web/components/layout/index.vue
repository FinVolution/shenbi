<template>
  <!-- 注：Layout 只会在服务端被渲染，不要在此运行客户端有关逻辑 -->
  <!-- 页面初始化数据注入内容已经过 serialize-javascript 转义 防止 xss -->
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
      />
      <meta
        data-n-head="true"
        data-hid="meta-key-words"
        name="keywords"
      />
      <meta name="theme-color" content="#000000" />
      <title>​</title>
      <slot name="viteClient" />
      <!-- 用于通过配置插入自定义的 script 为了避免影响期望功能这块内容不做 escape，为了避免 xss 需要保证插入脚本代码的安全性  -->
      <slot name="customeHeadScript" />
      <slot name="cssInject" />
    </head>
    <body>
      <slot name="children" />
      <slot name="initialData" />
      <slot name="jsInject" />
    </body>
  </html>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['ctx', 'config'],
  computed:{
    ...mapState('indexStore',{
      title:state=>state.title
    })
  },
  created () {}
}
</script>
<style lang="less">
@import './index.less';
</style>
