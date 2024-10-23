import { Context } from 'egg';
import { Inject } from '@midwayjs/decorator';
import axios from 'axios';
import { handleError } from '../utils/httpErrorHandle';

const DEPLOY_ENV: string = process.env.DEPLOY_ENV || 'prod';
const UNAUTHORIZED_CODES = [400, 401]
const VALIDATA_TOKEN_URL = ``;

export class AxiosBaseService {
  @Inject()
  ctx: Context
  public static GATEWAY_URL = process.env['xxxgateway']
  httpService: any
  constructor() {
    AxiosBaseService.GATEWAY_URL = process.env['xxxgateway']

    const axiosInstance = axios.create({
      baseURL: AxiosBaseService.GATEWAY_URL,
      timeout: 10000,
      withCredentials: false,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    })
    axiosInstance.interceptors.response.use(
      async (response) => {
        const Result = response?.data?.Result
        const path = response?.request?.path
        if (path?.indexOf('xxxxService') === -1) {
          if (Result !== 0 && Result !== 200 && response?.data?.ResultMessage) {
            handleError(
              this.getErrorReportUrl(),
              response,
              axiosInstance,
              this.getUserAgent(),
              this.ctx?.url
            )
          }
        }
        return await Promise.resolve(response.data)
      },
      async (error) => {
        if (!error?.config?.url.includes('xxxxService')) {
          // 超时
          if (error.message.includes('timeout')) {
            handleError(
              this.getErrorReportUrl(),
              error.response,
              axiosInstance,
              this.getUserAgent(),
              this.ctx?.url
            )
          }
          // 捕获异常
          if (error?.response && error.response.status) {
            handleError(
              this.getErrorReportUrl(),
              error.response,
              axiosInstance,
              this.getUserAgent(),
              this.ctx?.url
            )
          }
        }

        return await Promise.reject(error)
      }
    )
    axiosInstance.interceptors.request.use(
      async (config) => {
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    this.httpService = axiosInstance
  }
  async validateToken() {
    const TokenID = this.getCookie('token');
    const DeviceID = this.getCookie('deviceid');
    console.log(new Date(), 'token===', TokenID, DeviceID)
    return await this.httpService.request({
      url: VALIDATA_TOKEN_URL,
      method: 'post',
      data: { TokenID, DeviceID },
    })
  }
  async post(url: string, payload: any, requireAuth: boolean) {
    try {
      const cookie = this?.ctx?.request?.header?.cookie || "";
      let UserID = -1;
      const isNotH5gateway = url.indexOf('xxxgateway') === -1
      if (isNotH5gateway) { // 走网关
        const tokenResult = await this.validateToken()
        UserID = tokenResult.UserID
      } else {
        UserID = 1
      }
      if (UserID > 0) {
        let paramData = {
          ...payload
        }
        if (isNotH5gateway) {
          paramData = {...paramData, userId: UserID}
        }
        const data = await this.httpService.request({
          url,
          method: 'post',
          headers: { cookie },
          data: paramData,
        })
        return { ok: true, ...data }
      } else {
        this.jump2Login()
        return {
          ok: false,
          CodeMsg: null,
          Content: null,
          Result: 400,
          ResultMessage: 'user token invalidate',
        }
      }
    } catch (error) {
      const errorResponse = error.response
      if (UNAUTHORIZED_CODES.includes(errorResponse?.status || 0) && requireAuth) {
        this.jump2Login()
      }
      return {
        ok: false,
        CodeMsg: null,
        Content: null,
        Result: errorResponse?.status,
        ResultMessage: errorResponse,
      }
    }
  }



  async get(url: string, requireAuth: boolean) {
    try {
      const cookie = this?.ctx?.request?.header?.cookie || "";
      let UserID = -1;
      if (url.indexOf('http') === -1) { // 走网关
        const tokenResult = await this.validateToken()
        UserID = tokenResult.UserID
      } else {
        UserID = 1
      }
      if (UserID > 0) {
        const data = await this.httpService.request({
          url,
          method: 'get',
          headers: { cookie },
        });
        return { ok: true, ...data }
      } else {
        this.jump2Login()
        return {
          ok: false,
          CodeMsg: null,
          Content: null,
          Result: 400,
          ResultMessage: 'user token invalidate',
        }
      }
    } catch (error) {
      const errorResponse = error.response
      const { status } = errorResponse
      if (UNAUTHORIZED_CODES.includes(status) && requireAuth) {
        this.jump2Login()
      }
      return {
        ok: false,
        CodeMsg: null,
        Content: null,
        Result: status,
        ResultMessage: errorResponse,
      }
    }
  }

  jump2Login() { // todo app 打开 登陆失效应该打开openurl
    let protocal = 'https://';
    if (DEPLOY_ENV !== 'prod') {
      protocal = 'http://';
    }
    const href = ``
    this.ctx.redirect(href)
  }
  getErrorReportUrl() {
    return `${AxiosBaseService.GATEWAY_URL}/api/xxx`;
  }
  getCookie(name: string,) {
    const cookies = this?.ctx?.request?.header?.cookie || '';
    const arr = cookies.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null)
      return unescape(arr[2]);
    return null;
  }
  getUserAgent() {
    return this.ctx?.request?.header['user-agent'] || '';
  }
}
