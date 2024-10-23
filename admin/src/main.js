// 基本公共样式
import '$root/assets/less/pc/common.less'
import '@/icons'
// 调用接口封装
import api from '@/service'
// element UI 主题
import 'element-theme-dark'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// 浏览器默认样式重置
import 'normalize.css/normalize.css'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import App from './App'
// 引入过滤器
import './filters'
import router from './router'
import store from './store'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor, /* { default global options } */)

import 'echarts'
import ECharts from 'vue-echarts'
Vue.component('VueEcharts', ECharts)

import Editor from 'bin-ace-editor';
require('brace/ext/language_tools') // language extension
require('brace/mode/json')
require('brace/snippets/json')
require('brace/theme/cobalt')
Vue.component(Editor.name, Editor)

import Cookies from 'js-cookie';

Vue.prototype.$handlePoint = (event, params) =>{}

// 将调用接口的函数扩展到每个组件中
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
window.__isBrowser__ = true
// mock 数据
if (process.env.VUE_APP_MOCK === 'yes') require('@/service/mock')

Vue.prototype.$http = api
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
