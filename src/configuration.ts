import { Configuration } from '@midwayjs/decorator'
import * as axios from '@midwayjs/axios'
import { join } from 'path'
import { IMidwayContainer } from '@midwayjs/core'
import * as task from '@midwayjs/task';
// import { QueueService } from '@midwayjs/task';
import * as cache from '@midwayjs/cache';	
@Configuration({
  imports: [
    task,
    cache,
    axios // 导入 axios 组件
  ],
  importConfigs: [join(__dirname, 'config')]
})
export class ContainerLifeCycle {
  async onReady (container: IMidwayContainer) {
    // let result: any = await container.getAsync(QueueService);
    // let job: Queue = result.getQueueTask(`HelloTask`, 'task') // 此处第一个是你任务的类名，第二个任务的名字也就是装饰器Task的函数名
    // job.add({}, {delay: 0}) // 表示立即执行。
    
    // // LocalTask的启动后立马执行
    // let result: any = await container.getAsync(QueueService);
    // let job = result.getLocalTask(`HelloTask`, 'task'); // 参数1:类名 参数2: 装饰器TaskLocal的函数名
    // job(); // 表示立即执行
  }
}
