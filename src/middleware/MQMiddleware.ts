import { Provide } from "@midwayjs/decorator";
import { IWebMiddleware, IMidwayWebNext } from "@midwayjs/web";
import { AxiosBaseService } from "../service/axiosBaseService";
import { sha256 } from 'js-sha256';
import { Context } from "egg";
@Provide("MQMiddleware")
export class MQMiddleware extends AxiosBaseService implements IWebMiddleware {
  static SHENBI_QUERY_URL = '/api/acp/projectService/query'
  static SHENBI_PREVIEW_URL = '/api/acp/projectService/preview'
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      try {
        const params = this.matchParams(ctx) as any
        if (params) {
          const header = ctx?.request?.header
          const cookie = header?.cookie || "";
          const [userInfo, projectConfig] = await Promise.all([
            await this.getUserID(ctx),
            await this.httpService.request({
              url: params?.preId ? MQMiddleware.SHENBI_PREVIEW_URL : MQMiddleware.SHENBI_QUERY_URL,
              method: 'post',
              headers: { cookie },
              data: params,
            })
          ])
          if (projectConfig.Content?.projectTypeTag === 100) {
            await this.postMessage(userInfo, projectConfig, ctx, 0)
          }
          await next()
        } else {
          await next()
        }
      } catch (error) {
        await next()
      }
    };
  }
  async postMessage(userInfo, projectConfig: { Result: number, Content: any }, ctx, count) {
    if (userInfo.Result === 0 && projectConfig.Result === 200 && count < 5) {
      try {
        const projectInfo = projectConfig.Content
        // 获取项目id
        const activityIdList = projectInfo.projectProperties.filter(item => item.propertyName === 'activityID')
        const activityId = activityIdList.length > 0 ? activityIdList[0]?.propertyValue?.activityID || -1 : -1
        const productTagList = projectInfo.projectProperties.filter(item => item.propertyName === 'productTag')
        const productTag = productTagList.length > 0 ? productTagList[0]?.propertyValue?.productTag || '2022shuang11_huodong_qianduantoutu' : '2022shuang11_huodong_qianduantoutu'
        let dynamicConfigArray = projectInfo?.projectItems
        // 获取动态随机数配置
        dynamicConfigArray = dynamicConfigArray.map(items => {
          const item = items.properties.filter(item => item.propertyName === 'projectMain')[0].propertyValue
          return { ...item, versionName: items.projectName, projectId: items.projectId }
        })
        //  根据随机数命中的版本进行请求接口
        let productId = ''
        let versionName = ''
        let randomNum = 0
        let projectIdTag = ''
        for (const item of dynamicConfigArray) {
          randomNum = this.randomUUID(`${productTag}`, userInfo.UserID)
          if (randomNum >= parseFloat(item.min) && randomNum < parseFloat(item.max)) {
            productId = item.productId
            versionName = item.versionName
            projectIdTag = item.projectId
            break
          }
        }

        if (!projectIdTag) projectIdTag = `${dynamicConfigArray[0].projectId}_bak`
        if (!productId) productId = `${dynamicConfigArray[0].productId}_bak`
        if (!versionName) versionName = `${dynamicConfigArray[0].versionName}_bak`

        ctx.cookies.set('productId', productId, { domain: '.xxx.com', httpOnly: false })
        ctx.cookies.set('projectIdTag', projectIdTag, { domain: '.xxx.com', httpOnly: false })
        ctx.cookies.set('activityIdTag', activityId, { domain: '.xxx.com', httpOnly: false })
      } catch (error) {}
    }
  }

  /**
   * 生成动态随机数
   * @param prefix 动态随机数前缀
   * @param userid 用户id
   * @returns 
   */
  randomUUID(prefix, userid) {
    let messageDigest = sha256.array(`${prefix}${userid}`.trim())
    let firstUnsignedLong = []
    for (let i = 0; i < 8; i++) {
      firstUnsignedLong[7 - i] = messageDigest[i];
    }
    const no = BigInt('0x' + firstUnsignedLong.map(byte => byte.toString(16).padStart(2, '0')).join(''))
    const division = BigInt("18446744073709551616")
    return parseFloat(`${parseFloat(`${no}`) / parseFloat(`${division}`)}`)
  }
  async getUserID(ctx: Context) {
    const TokenID = this.getCookieByContext(ctx, 'token');
    const DeviceID = this.getCookieByContext(ctx, 'deviceid');
    console.log(new Date(), 'token===', TokenID, DeviceID)
    return {
      Result: 0,
      UserID: '12345678'
    }
  }

  getCookieByContext(ctx: Context, name: string) {
    const cookies = ctx?.request?.header?.cookie || '';
    const arr = cookies.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null)
      return unescape(arr[2]);
    return null;
  }

  /**
   * 根据路由地址获取项目数据 项目id/租户id/预渲染id
   * @param ctx 当前路由上下文
   * @returns 
   */
  matchParams(ctx: Context) {
    const routerParams = [
      { path: '/view/' },
      { path: '/preview/' }
    ]
    return routerParams.filter(item => {
      return ctx.path.includes(item.path)
    })?.map(item => {
      if (item.path === '/view/') return { projectId: ctx.path.match(/\/view\/(\d+)\//)[1], tenantId: 'op' }
      if (item.path === '/preview/') return { projectId: ctx.path.match(/\/preview\/(\d+)\/(\d+)/)[1], tenantId: 'op', preId: ctx.path.match(/\/preview\/(\d+)\/(\d+)/)[2] }
      return null
    })[0] || null
  }
}

