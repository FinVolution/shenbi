import { Store } from 'vuex';
import { Route } from 'vue-router';
import { ISSRContext } from 'ssr-types';
const preflight_array = []
export default class PreflightRequest {
    pageList: object
    store: Store<any>
    router: Route
    ctx?: ISSRContext<{
        apiService: any
    }>
    constructor(pageList: object, store: Store<any>, router: Route, ctx?: ISSRContext<{
        apiService: any
    }>) {
        this.pageList = pageList
        this.store = store
        this.router = router
        this.ctx = ctx
    }
    async request() {
        this.pageList?.componentProperties.forEach((item: any) => {
            const { propertyName } = item;
            preflight_array.forEach(async (pre: any) => {
                const { folder } = pre
                if (propertyName === pre.propertyName) {
                    const { request } = await folder;
                    await request(this.store, this.ctx)
                }
            });
        });

    }
}