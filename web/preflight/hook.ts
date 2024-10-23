import Preflight from '@/preflight/index'
import { Store } from 'vuex';
import { Route } from 'vue-router';
import { ISSRContext } from 'ssr-types';
export default class Hook {
    pagejson: object | undefined
    preflight: Preflight | undefined
    store: Store<any>
    router: Route
    ctx?: ISSRContext<{
        apiService: any
    }>
    constructor(pagejson: object | undefined, store: Store<any>, router: Route, ctx?: ISSRContext<{
        apiService: any
    }>) {
        this.pagejson = pagejson
        this.store = store
        this.router = router
        this.ctx = ctx
    }
    async startHook() {
        if (this.pagejson?.Result === 200) {
            const pageList = this.pagejson?.Content?.pageList[0]
            this.preflight = new Preflight(pageList, this.store, this.router, this.ctx)
            await this.preflight.request()
        }
    }
}