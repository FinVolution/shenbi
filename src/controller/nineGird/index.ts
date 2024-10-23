import { Readable } from 'stream';
import { Controller, Get, Provide, Inject } from '@midwayjs/decorator';
import { Context } from 'egg';
import { render } from 'ssr-core-vue';
import { IApiMktingOpService } from '../../interface/nineGird';
import { IApiService } from '../../interface/index'

interface IEggContext extends Context {
    mktingOpService: IApiMktingOpService;
    mktingService: IApiService

}

@Provide()
@Controller('/nineGrid')
export class NineGird {
    @Inject()
    ctx: IEggContext;

    @Inject('ApiMktingOpService')
    mktingOpService: IApiMktingOpService;

    @Inject('ApiService')
    mktingService: IApiService

    @Get('/list/:activityType/:projectId')
    @Get('/listCustom/:activityType/:projectId')
    @Get('/address')
    async list(): Promise<void> {
        try {
            this.ctx.mktingOpService = this.mktingOpService;
            this.ctx.mktingService = this.mktingService
            const stream = await render<Readable>(this.ctx, { stream: true });
            stream.on("error", async () => {
              stream.destroy();
              const newStream = await render<string>(this.ctx, {
                stream: false,
                mode: "csr",
              });
              this.ctx.res.end(newStream);
            });
            this.ctx.body = stream;
        } catch (error) {
            console.log("error", error);
            this.ctx.body = "Internal Error";
        }
    }
}
