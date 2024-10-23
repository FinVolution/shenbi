import { Provide, Controller, Post, Inject } from "@midwayjs/decorator";
import { ResponseMessage } from "../utils/const";
import { Context } from 'egg';
import { ICommonApiService } from '../interface/api';

interface IEggContext extends Context {
    commonApiService: ICommonApiService
}

@Provide()
@Controller('/')
export class commonAPI {
    @Inject()
    ctx: IEggContext

    @Inject('CommonApiService')
    commonApiService: ICommonApiService

    @Post('/uploadService/upload')
    async upload() {
        try {
            const { ctx, commonApiService } = this;
            const file = await ctx.getFileStream()
            const param = {...ctx.request.body, ...{file}};
            console.log(file, 'xxxx上传接口请求参数');

            const res = await commonApiService.upload(param);
            ResponseMessage.Result = res?.result || res?.Result || res?.status || 1;
            ResponseMessage.ResultMessage = res?.resultMessage || res?.ResultMessage || res?.message || '';
        } catch(e) {

            ResponseMessage.ResultMessage = e;
        }
        return ResponseMessage;
    }
}