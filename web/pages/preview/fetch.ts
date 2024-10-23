import { ISSRContext } from 'ssr-types'
import { VueRouter } from 'vue-router/types/router'
import { getConfigPreview } from '../../service/index'
import { IPageConfigResult } from '../../interface/index'
import { inApp } from '@/utils'
import hook from '@/preflight/hook'

interface IApiService {
  configPreview: (params: { projectId: string, preId: string }) => Promise<{ data: IPageConfigResult }>
}

export default async (
  { store, router }
    : { router: VueRouter, store: any },
  ctx?: ISSRContext<{ apiService?: IApiService }>
) => {
  const res = __isBrowser__
    ? await getConfigPreview({ projectId: router?.params?.projectId, preId: router?.params?.preId })
    : await ctx?.apiService?.configPreview({ projectId: ctx?.params?.projectId, preId: ctx?.params?.preId })
  await store.dispatch('previewStore/initialData', { payload: res?.data })
  if (__isBrowser__){
    try {
      await new hook(res?.data, store, router, ctx).startHook()
    } catch (error) {
      console.log('hook error', error)
    }
  }

  const userAgent = __isBrowser__
    ? navigator.userAgent
    : ctx?.headers['user-agent'];
  await store.commit('indexStore/setData', { isApp: inApp(userAgent) });
  await store.dispatch('homeStore/initialData', { payload: res?.data });
}
