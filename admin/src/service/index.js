import { API_APP_ID, NO_USER_TOKEN_STATUS_CODE_GATEWAY, REQUEST_METHOD_GET, REQUEST_METHOD_POST } from '@/common/const'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { addQueryToUrl } from '@/utils/query'
import main from './procedure/main'

const API_VERSION_INFO = { appId: API_APP_ID, version: '1.0.0' }
const defaultConfig = {
  baseURL: '/api',
  module: '',
  timeout: 10000,
  validateStatus: function (status) {
    return true
  },
  withCredentials: true
}

function Service() {
  let services = [...main]
  let _this = this
  let _http = axios.create(defaultConfig)

  // 添加请求拦截器
  _http.interceptors.request.use(
    config => {
      return config
    },
    error => {
      // 对请求错误做些什么
      console && console.log({ error })
      Promise.reject(error)
    }
  )

  _http.interceptors.response.use(
    response => {
      let { data: res, status: httpStatus } = response
      if (httpStatus === NO_USER_TOKEN_STATUS_CODE_GATEWAY) {
      } else {
        let { Result, ResultMessage, CodeMsg } = res
        if (Result === 200 || res.ret === 0) {
          return res
        } else {
          Message({ message: ResultMessage, type: 'error', duration: 5 * 1000 })
          return Promise.reject(res)
        }
      }
    },
    // 服务器出现问题，无法给予正确的响应
    error => {
      Message({
        message: '发生异常错误,请刷新页面重试,或联系程序员',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )

  services.forEach(item => {
    let { subUrl, name, method, headers } = item
    _this[name] = params => {
      if (method === REQUEST_METHOD_GET) {
        return _http.request({
          url: addQueryToUrl(subUrl,params),
          method: 'get',
          data: { ...params, ...API_VERSION_INFO }
        })
      }
      if (method === REQUEST_METHOD_POST) {
        console.log('store', store)
        return _http.request({
          url: subUrl,
          method: 'post',
          data: name === 'imageUploadOss'? params : { ...params, ...API_VERSION_INFO }
        })
      }
    }
  })
}

export default new Service()
