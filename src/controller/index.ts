import { Readable } from 'stream'
import { Controller, Get, Provide, Inject, Post } from '@midwayjs/decorator'
import { Context } from 'egg'
import { render } from 'ssr-core-vue'
import { IApiService } from '../interface'
import { IApiServiceV2 } from '../interface/indexV2'
import { IApolloService } from "../interface/common/index";
const path = require('path');
const fs = require('fs');

interface IEggContext extends Context {
    apiService: IApiService,
    apiServiceV2: IApiServiceV2,
    apolloService: IApolloService
}

@Provide()
@Controller('/')
export class Index {
    @Inject()
    ctx: IEggContext

    @Inject('ApiService')
    apiService: IApiService

    @Inject('ApiServiceV2')
    apiServiceV2: IApiServiceV2

    @Inject("ApolloTaskService")
    apolloService: IApolloService

    @Get('/hs')
    async hs(): Promise<void> {
        const data = await this.apiService.hs()
        return data
    }

    @Get('/download/:tgtName')
    async downloadZip() {
        try {
            console.log('downloadZip filename ', this.ctx.params.tgtName)
            console.log('downloadZip filepath ', path.join(__dirname, `../../build/tgz`, `${this.ctx.params.tgtName}`))
            const fileName = this.ctx.params.tgtName
            const filePath = path.join(__dirname, `../../build/tgz`, `${this.ctx.params.tgtName}`)
            this.ctx.attachment(fileName,{
                fallback:true,
                type:'attachment' // [string] attachment/inline
            });
            const fileSize = fs.statSync(filePath).size;
            this.ctx.set('Content-Length', fileSize) 
            this.ctx.set('Content-Disposition',`attachment; filename=${fileName}`)
            this.ctx.body = fs.createReadStream(filePath);
        } catch (error) {
            console.log('downloadZip error', error)
        }
    }
    

    @Get('/view/:projectId/:pageId', { middleware: ['MQMiddleware'] })
    @Get('/preview/:projectId/:preId/:pageId')
    async viewHandler(): Promise<void> {
        try {
            const mode = await this.apolloService.getRenderMode('acp_template') || 'csr';
            this.ctx.apiService = this.apiService
            this.ctx.apiServiceV2 = this.apiServiceV2
            const stream = await render<Readable>(this.ctx, { mode  , stream: true })
            stream.on("error", async () => {
                console.log("stream error ", 'csr')
                // ssr 渲染失败
                this.ctx.res.setHeader('ssrfail', 'false')
                stream.destroy();
                const newStream = await render<string>(this.ctx, {
                    stream: false,
                    mode: "csr",
                });

                this.ctx.res.end(newStream);
            });
            this.ctx.body = stream
        } catch (error) {
            console.log('catch error ', error)
            // ssr 渲染失败
            this.ctx.res.setHeader('ssrfail', 'false')
            const stream = await render<Readable>(this.ctx, { mode: 'csr', stream: true })
            this.ctx.body = stream
        }
    }
}
