import { ISSRContext } from 'ssr-types'
import { VueRouter } from 'vue-router/types/router'
import { Store } from 'vuex/types/index'
export default async ({ store, router }: { store: typeof Store, router: VueRouter }, ctx?: ISSRContext) => {
    
}
