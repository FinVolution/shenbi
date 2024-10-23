import { Provide } from '@midwayjs/decorator'
import axios from 'axios'
import { ACP_API_URL } from '../common/const'
import { Context } from 'egg';
import { Inject } from '@midwayjs/decorator';
const acpInstance = axios.create({
  baseURL: ACP_API_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }
})

@Provide('ApiServiceV2')
export class ApiIndexServiceV2 {
  @Inject()
  ctx: Context

  async configProduction(projectId: string, tenantId: string): Promise<any> {
    const res = await acpInstance.request({
      url: '/acp/projectService/query',
      method: 'post',
      data: {
        projectId
      },
    })
    return res.data
  }

  async configPreview(params: { projectId: string, preId: string, tenantId: string }): Promise<any> {
    const res = await acpInstance.request({
      url: '/acp/projectService/preview',
      method: 'post',
      data: params,
    })
    return res.data
  }

  async wxShare(): Promise<any> {
    return await acpInstance.get(`/jssdk/init?url=${encodeURIComponent(window.location.href)}`)
  }

  async hs(): Promise<any> {
    return await Promise.resolve('OK')
  }
};
