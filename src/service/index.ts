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

@Provide('ApiService')
export class ApiIndexService {
    @Inject()
    ctx: Context

    deployUrl = ''

    constructor() {
    }

    async configProduction(projectId: string): Promise<any> {
        const productId = this.ctx?.cookies.get('productId')
        const projectIdTag = this.ctx?.cookies.get('projectIdTag')
        let res = null
        if (productId && projectIdTag) {
            console.log('ssr命中版本', productId, projectIdTag)
            res = await acpInstance.post('/acp/projectService/query', { projectId: projectIdTag })
        } else {
            console.log('ssr命中版本', productId, projectId)
            res = await acpInstance.post('/acp/projectService/query', { projectId })
        }
        return res
    }

    async configPreview(params: { projectId: string, preId: string }): Promise<any> {
        const res = await acpInstance.post('/acp/projectService/preview', params)
        return res
    }

    async wxShare(): Promise<any> {
        return await acpInstance.get(`/jssdk/init?url=${encodeURIComponent(window.location.href)}`)
    }

    get getCurrentEnv() {
        let ENV: string = 'pro';
        const GATEWAY_URL = process.env['xxxgateway']
        if (!GATEWAY_URL) {
            return 'fat'
        }

        if (GATEWAY_URL.includes('fat')) {
            ENV = 'fat'
        } else if (GATEWAY_URL.includes('pre')) {
            ENV = 'pre'
        }
        return ENV
    }

    async hs(): Promise<any> {
        return await Promise.resolve('OK')
    }
};
