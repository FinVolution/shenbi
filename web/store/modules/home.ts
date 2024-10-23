import { IPageConfigResult, IPageConfig, IPageItem,IComponentProperties } from '@/interface/index'
import { Commit } from 'vuex/types/index'
import configJson from '../../../common/config/editor'
declare interface HomeState{
  pageList: IPageItem[],
  projectProperties: any
}

const confuseComponentItem = (componentItem:IComponentProperties) => {
  let { componentId, propertyName, propertyValue } = componentItem
  let defaultPropertyItem = configJson[propertyName] || {}
  let { containerStyle: defaultItemContainerStyle, selfStyle: defaultItemSelfStyle, elemStyle: defaultItemElemStyle, property: defaultItemProperty } = defaultPropertyItem
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
  let newElemStyle =
    elemStyle &&
    Object.keys(defaultItemElemStyle).reduce((prev:{[prop:string]:any}, item) => {
      prev[item] = elemStyle&& elemStyle[item]
      return prev
    }, {})
  let newProperty =
    property &&
    Object.keys(defaultItemProperty).reduce((prev:{[prop:string]:any}, item) => {
      prev[item] = property && property[item]
      return prev
    }, {})
  let resultItem:{[prop:string]:any} = { propertyName, id: componentId }
  newSelfStyle && Object.assign(resultItem, { selfStyle: newSelfStyle })
  newContainerStyle && Object.assign(resultItem, { containerStyle: newContainerStyle })
  newProperty && Object.assign(resultItem, { property: newProperty })
  newElemStyle && Object.assign(resultItem, { elemStyle: newElemStyle })
  parentId && Object.assign(resultItem, { parentId })
  if (children) {
    children.length > 0 ? (resultItem['children'] = children.map(childItem => confuseComponentItem(childItem))) : (resultItem['children'] = [])
  }
  return resultItem
}

const homeStore = {
  namespaced: true,
  state: {
    pageList: [],
    projectProperties: null
  },
  mutations: {
    async setData (state: HomeState, payload: IPageConfig) {
      let {pageList, projectProperties, projectTimeStatus, projectStatus } = payload
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
          if (componentProperties && componentProperties.length > 0) {
            componentProperties.forEach(item => {
              let { propertyName } = item
              if (propertyName && propertyName === 'nineGird') {
              }
            })
          }
        })
        Object.assign(state, { pageList: resultList })
      }

      if (projectProperties && projectProperties.length > 0) {
        let projectConfig:any = { projectTimeStatus, projectStatus }
        projectProperties.forEach(item => {
          let { propertyName, propertyValue } = item
          projectConfig[propertyName] = propertyValue[propertyName]
        })
        Object.assign(state, { projectProperties: projectConfig })
      }
    }
  },
  actions: {
    initialData ({ commit }: {commit: Commit}, params: { payload: IPageConfigResult }) {
      const { Result, Content } = params.payload
      if (Result === 200) commit('setData', Content)
    }
  }
}

export {
  homeStore
}
