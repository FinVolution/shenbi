import { IPageConfigResult, IPageConfig, IPageItem,IComponentProperties } from '@/interface/index'
import { Commit } from 'vuex/types/index'
import configJson from '../../../common/config/editor'
declare interface PreviewState{
  pageList: IPageItem[]
}

const confuseComponentItem = (componentItem:IComponentProperties) => {
  let { componentId, propertyName, propertyValue } = componentItem
  if (!configJson[propertyName]) return {}
  let defaultPropertyItem =  configJson[propertyName] || {}
  let { containerStyle: defaultItemContainerStyle, selfStyle: defaultItemSelfStyle, property: defaultItemProperty } = defaultPropertyItem
  let { containerStyle, property, selfStyle, parentId, children, elemStyle } = propertyValue
  let newContainerStyle =
    containerStyle &&
    Object.keys(defaultItemContainerStyle).reduce((prev:{[prop:string]:any}, item) => {
      prev[item] = containerStyle[item]
      return prev
    }, {})
  let newSelfStyle =
    selfStyle &&
    Object.keys(defaultItemSelfStyle).reduce((prev:{[prop:string]:any}, item) => {
      prev[item] = selfStyle&& selfStyle[item]
      return prev
    }, {})
  let newProperty =
    property &&
    Object.keys(defaultItemProperty).reduce((prev:{[prop:string]:any}, item) => {
      prev[item] = property && property[item]
      return prev
    }, {})
  let resultItem:{[prop:string]:any} = { propertyName, id: componentId}
  newSelfStyle && Object.assign(resultItem, { selfStyle: newSelfStyle })
  newContainerStyle && Object.assign(resultItem, { containerStyle: newContainerStyle })
  newProperty && Object.assign(resultItem, { property: newProperty })
  elemStyle && Object.assign(resultItem, { elemStyle })
  parentId && Object.assign(resultItem, { parentId })
  if (children) {
    children.length > 0 ? (resultItem['children'] = children.map(childItem => confuseComponentItem(childItem))) : (resultItem['children'] = [])
  }
  return resultItem
}

const previewStore = {
  namespaced: true,
  state: {
    pageList: []
  },
  mutations: {
    setData (state: PreviewState, payload: IPageConfig) {
      console.log('payload===》',payload)
      let { pageList } = payload
      if (pageList && pageList.length > 0) {
        let resultList:any = []
        pageList.forEach(item => {
          let { componentProperties, pageId, pageProperties } = item
          let newPageItem = { pageId }
          if (componentProperties && componentProperties.length > 0) {
            Object.assign(newPageItem, { componentList: componentProperties.map(innerItem => confuseComponentItem(innerItem)) })
          }
          if (pageProperties && pageProperties.length > 0) {
            let pageProperty = pageProperties.find(i => i['propertyName'] === 'pageProperty')
            if (pageProperty) {
              let pageInfo = pageProperty['propertyValue']
              Object.assign(pageInfo, { id: pageId })
              Object.assign(newPageItem, { pageInfo })
            }
          }
          resultList.push(newPageItem)
        })
        Object.assign(state, { pageList: resultList })
      }
    }
  },
  actions: {
    initialData ({ commit }: {commit: Commit}, params: { payload: IPageConfigResult }) {
      console.log('params.payload===>',params.payload)
      const { Result, Content } = params.payload
      if (Result === 200) commit('setData', Content)
    }
  }
}

export {
  previewStore
}
