
declare interface IndexState{
  title:string,
  isApp: Boolean,
  isIOS: Boolean,
  linkUrl: string,
  pageInfo: Object,
}

const indexStore = {
  namespaced: true,
  state: {
    title: 'xxx',
    isApp: false,
    isIOS: false,
    linkUrl: null,
    pageInfo: null,
    isLogin: false,
  },
  mutations: {
    setData (state:IndexState, payload:{[prop:string]:any}) {
      Object.assign(state,payload)
    }
  }
}

export {
  indexStore
}
