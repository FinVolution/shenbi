import { Provide, Inject } from '@midwayjs/decorator';
import { RenderMode } from '../../types/mode'
import { CacheManager } from '@midwayjs/cache';
@Provide('ApolloTaskService')
export class ApolloTaskService {

    @Inject()
    cache: CacheManager;
    // 例如下面是每秒钟执行一次
    // @TaskLocal('* * * * * *')
    // 例如下面是每分钟执行一次
    // @TaskLocal('0 */3 * * * *')
    // async job() {
    //     try {
    //         const res = await Apollo('xxx', 'application')
    //         const config = res.configurations?.mode
    //         await this.cache.set(`modeConfig`, config);
    //         // console.log('mode', config)
    //     } catch (error) {
    //         console.log(error)            
    //     }
    // }

    async getRenderMode(activityName: string): Promise<RenderMode> {
        const defaultMode = 'csr'
        let mode = defaultMode
        try {
            const modeConfig = await this.cache.get<string>(`modeConfig`)
            let config = modeConfig?JSON.parse(modeConfig):{}
            mode = config[activityName] || defaultMode;
        } catch (error) {
            mode = defaultMode
        }
        return (mode || defaultMode) as RenderMode
    }
}
