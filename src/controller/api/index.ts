import { Controller, Inject, Provide, Get } from '@midwayjs/decorator'
import { Context } from 'egg'
import { IApiService } from '../../interface'

@Provide()
@Controller('/api')
export class Api {
    @Inject()
    ctx: Context

    @Inject('ApiService')
    service: IApiService

    @Get('/render/test')
    async render() {
        const { service } = this
        return await service.Render('a');
    }
}

