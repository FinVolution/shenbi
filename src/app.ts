import { initialSSRDevProxy } from 'ssr-server-utils'
import { Inject } from '@midwayjs/decorator';
import { Application } from 'egg'
import { CacheManager } from '@midwayjs/cache';
import { createProxyMiddleware } from 'http-proxy-middleware';
const koaConnect = require('koa2-connect');

class AppBootHook {
  @Inject()
  cache: CacheManager;

  app: Application
  constructor (app) {
    this.app = app;
  }

  async didReady() {
    const apiProxy = koaConnect(
      createProxyMiddleware(
        "/api",
        {
          target: 'xxx',
          ws: true,
          changeOrigin: true,
          secure: false,
          logLevel: "debug",
        }
      )
    );
    this.app.use(apiProxy);
    await initialSSRDevProxy(this.app);
  }
}

export default AppBootHook
