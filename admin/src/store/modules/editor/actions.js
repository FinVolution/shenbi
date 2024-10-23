import api from '@/service'
import { activeIndexFromList } from '@/utils'
import Vue from 'vue'
const formValidate = (propertyName, property) => {
  return true
}

export default {
  saveProject({ state }) {
    let { projectId, preId, componentList, pageInfo, pageList } = state
    let { id: pageId } = pageInfo || {}
    let requestObj = { projectId, preId, pageId }
    let [resultComponentList, resultPageProperties] = [[], []]
    if (componentList && componentList.length > 0) {
      componentList.forEach(item => {
        let { propertyName, property, id, containerStyle, selfStyle, children, elemStyle } = item
        let validResult = formValidate(propertyName, property)
        if (!validResult) return false
        let requestComponentItem = { componentId: id, propertyName, propertyValue: { pageId, property, containerStyle, selfStyle, elemStyle } }
        children && children.length > 0
          ? (requestComponentItem['propertyValue']['children'] = children.map(childItem => {
              let { propertyName: childItemPropertyName, property: childItemProperty, id: childItemId, parentId: childItemParentId, containerStyle: childItemContainerStyle, selfStyle: childItemSelfStyle } = childItem
              return {
                componentId: childItemId,
                propertyName: childItemPropertyName,
                propertyValue: { property: childItemProperty, containerStyle: childItemContainerStyle, selfStyle: childItemSelfStyle, parentId: childItemParentId }
              }
            }))
          : (requestComponentItem['propertyValue']['children'] = [])
        resultComponentList.push(requestComponentItem)
      })
    }
    resultPageProperties.push({ propertyName: 'pageProperty', propertyValue: pageInfo })
    requestObj['pageProperties'] = resultPageProperties
    requestObj['componentProperties'] = resultComponentList
    requestObj['pageId'] = 1
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.saveProject(requestObj).then(res => {
        let { Result, ResultMessage } = res
        if (Result === 200) {
          let { item: currentItem, index: currentPageIndex } = activeIndexFromList(pageList, pItem => pItem['pageId'] === pageInfo['id'])
          if (currentItem) currentItem['componentList'] = componentList
          Vue.set(pageList, currentPageIndex, currentItem)
          resolve()
        } else {
          reject(ResultMessage)
        }
      })
    })
  }
}
