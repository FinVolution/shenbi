// 全局filter定义在这里
import { isEmpty } from '@/utils'
import Vue from 'vue'

// 处理返回值为空的情况【'' , null】
Vue.filter('dealEmpty', (val, replaceMent = '--', suffix = '', withZero = false) => {
  if (withZero) {
    return val === '' || val === 0 || val === null || val === undefined ? replaceMent : val + suffix
  } else {
    return val === '' || val === null || val === undefined ? replaceMent : val + suffix
  }
})

// 超长截断
Vue.filter('limitIn', (val, limitLength = 20, ellipsis = '...', nullReplacer = '***') => {
  if (val === '' || val === null || val === undefined) {
    return nullReplacer
  } else if (val.length > limitLength) {
    return val.substring(0, limitLength - 1) + ellipsis
  }
  return val
})

// 手机号部分隐藏
Vue.filter('shodowStr', (val, front = 4, behind = 3, replaceStr = '***') => {
  if (isEmpty(val)) {
    return ''
  } else if (val.length <= front + behind) {
    return val
  } else {
    return val.substr(0, front) + replaceStr + val.substr(-behind)
  }
})

/**
 * 存储单位换算
 * @param {*} bytes  
 */
 Vue.filter('formatbytes', function(bytes){
  if (bytes === 0) return '0 B'
   const k = 1024
   const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
   const i = Math.floor(Math.log(bytes) / Math.log(k))
   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
});