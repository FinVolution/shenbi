import { Readable } from 'stream';
import { Controller, Get, Provide, Inject } from '@midwayjs/decorator';
import { Context } from 'egg';
import { render } from 'ssr-core-vue';
import { IApolloService } from '../../interface/common/index';

@Provide()
@Controller('/regularCustomer')
export class RegularCustomer {
    @Inject()
    ctx: Context;

    @Inject('ApolloTaskService')
    apolloService: IApolloService;

    @Get('/address')
    async handler(): Promise<void> {
        try {
            const mode = (await this.apolloService.getRenderMode('regularCustomer')) || 'csr';
            const stream = await render<Readable>(this.ctx, {
                stream: true,
                mode,
            });
            stream.on('error', async () => {
                stream.destroy();
                const newStream = await render<string>(this.ctx, {
                    stream: false,
                    mode: 'csr',
                });
                this.ctx.res.end(newStream);
            });

            this.ctx.body = stream;
        } catch (error) {
            console.log(new Date(), 'error', error);
            this.ctx.body = 'Internal Error';
        }
    }
}
