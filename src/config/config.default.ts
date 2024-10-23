import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import { join } from 'path'
const fs = require('fs')

export type DefaultConfig = PowerPartial<EggAppConfig>
export const cache = {
  store: 'memory',
  options: {
    max: 100,
    ttl: 5 * 60, // 修改默认的ttl配置
  },
};

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig
  config.bodyParser = {
    enable: true,
    ignore:(ctx:any)=>{
      return ctx.request.url.includes('/api') // 过滤csr请求的接口 否则会因为bodyparse 吃了 request body
    }
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611038425326_4049'
  // add your config here
  config.middleware = []
  config.static = {
    prefix: '/build',
    dir: [join(appInfo.appDir, './build'), join(appInfo.appDir, './public')]
  },
    config.security = {
      csrf: { enable: false },
      xframe: {
        enable: true,
        value: 'ALLOW-FROM'
      },
    }

  config.siteFile = {
    '/favicon.ico': fs.readFileSync(join(appInfo.appDir, 'favicon.ico')),
  };
  config.multipart = { mode: "stream", fileSize: "600mb" };
  return config
}
