import configJson from '$root/common/config/editor'
import { activeIndexFromList, uuid } from '@/utils'
import { Object } from 'core-js'
import Vue from 'vue'
import MutationTypes from '../../types/mutation-types'
import { DEFAULT_INIT_PAGE_INFO } from './const'
import { nextStep, prevStep, pushStep, clearStep } from './history.js'

const confuseComponentItem = componentItem => {
  const innerConfigJson = JSON.parse(JSON.stringify(configJson))
  let { componentId, propertyName, propertyValue } = componentItem
  let defaultPropertyItem = innerConfigJson[propertyName] || {}
  let { icon, tag, name, dragable, containerStyle: defaultItemContainerStyle, selfStyle: defaultItemSelfStyle, containerStyleReNoOper, containerStyleAbNoOper, selfStyleNoOper, containerAbInitStyle, selfAbInitStyle, property: defaultItemProperty, elemConfig, elemStyle: defaultItemElemStyle } = defaultPropertyItem
  let { containerStyle, property, selfStyle, parentId, children, elemStyle } = propertyValue
  if(elemStyle && defaultItemElemStyle){
    Object.keys(defaultItemElemStyle).forEach(item=>{
      let defaultVal = defaultItemElemStyle[item]
      if(elemStyle.hasOwnProperty(item)){
        let tempElemStyle = elemStyle[item]
        elemStyle[item] = Object.keys(defaultVal).reduce((prev,cur)=>{
          tempElemStyle.hasOwnProperty(cur) ? prev[cur] = tempElemStyle[cur] : prev[cur] = defaultVal[cur]
          return prev
        }, {})
      }else{
        Object.assign(elemStyle,{[item]:defaultVal})
      }
    })
  }
  if(selfStyle && defaultItemSelfStyle) {
    selfStyle = Object.keys(defaultItemSelfStyle).reduce((prev,cur)=>{
      selfStyle.hasOwnProperty(cur) ? prev[cur] = selfStyle[cur] : prev[cur] = defaultItemSelfStyle[cur]
      return prev
    }, {})
  }
  if(containerStyle && defaultItemContainerStyle) {
    containerStyle = Object.keys(defaultItemContainerStyle).reduce((prev,cur)=>{
      containerStyle.hasOwnProperty(cur) ? prev[cur] = containerStyle[cur] : prev[cur] = defaultItemContainerStyle[cur]
      return prev
    }, {})
  }
  let tempProperty = property || {}
  if(tempProperty && defaultItemProperty) {
    property = Object.keys(defaultItemProperty).reduce((prev,cur)=>{
      tempProperty.hasOwnProperty(cur) ? prev[cur] = property[cur] : prev[cur] = defaultItemProperty[cur]
      return prev
    }, {})
  }
  let resultItem = { propertyName, id: componentId, icon, tag, name, dragable }
  containerStyleReNoOper && Object.assign(resultItem, { containerStyleReNoOper })
  containerStyleAbNoOper && Object.assign(resultItem, { containerStyleAbNoOper })
  selfStyleNoOper && Object.assign(resultItem, { selfStyleNoOper })
  containerAbInitStyle && Object.assign(resultItem, { containerAbInitStyle })
  selfAbInitStyle && Object.assign(resultItem, { selfAbInitStyle })
  selfStyle && Object.assign(resultItem, { selfStyle })
  elemStyle && Object.assign(resultItem, { elemStyle })
  containerStyle && Object.assign(resultItem, { containerStyle })
  property && Object.assign(resultItem, { property })
  parentId && Object.assign(resultItem, { parentId })
  elemConfig && Object.assign(resultItem, { elemConfig })
  if (children) {
    children.length > 0 ? (resultItem['children'] = children.map(childItem => confuseComponentItem(childItem))) : (resultItem['children'] = [])
  }
  return resultItem
}

export default {
  [MutationTypes.SETOBJECT](state, { key, val }) {
    if (state.hasOwnProperty(key)) {
      state[key] = val
    }
  },
  // 添加页面
  [MutationTypes.ADDPAGE](state) {
    let { pageList } = state
    let insertIndex = pageList && pageList.length
    let [tempPageInfo, tempComponentList] = [JSON.parse(JSON.stringify(DEFAULT_INIT_PAGE_INFO)), []]
    tempPageInfo['id'] = insertIndex
    Vue.set(pageList, insertIndex, { pageInfo: tempPageInfo, componentList: tempComponentList, pageId: insertIndex })
    let clearResult = clearStep()
    Object.assign(state, {
      componentList: tempComponentList,
      activeComponent: null,
      pageInfo: tempPageInfo,
      undo: clearResult
    })
    
  },
  // 切换激活的页面
  [MutationTypes.CHANGEPAGEACTIVE](state, pageId) {
    let { pageList } = state
    if (pageList && pageList.length > 0) {
      let { item: activePageItem } = activeIndexFromList(pageList, pItem => pItem['pageId'] === pageId)
      let clearResult = clearStep()
      let componentList = activePageItem && activePageItem['componentList']
      componentList && componentList.length > 0 && componentList.forEach(item => item['isActive'] = false)
      Object.assign(state, { componentList, pageInfo: activePageItem['pageInfo'], activeComponent: null, undo: clearResult})
    }
  },
  // 新增组件
  [MutationTypes.ADDCOMPONENT](state, { propertyName }) {
    let { componentList, pageInfo } = state
    // 隐藏右键菜单
    Object.assign(state.rightClkInfo, { show: false, clientX: 0, clientY: 0, flag: null })
    if (configJson[propertyName]) {
      let tempComponentConfigInfo = JSON.parse(JSON.stringify(configJson[propertyName]))
      if (['button', 'image', 'input', 'text', 'benefit'].indexOf(propertyName) > -1) {
        Object.assign(tempComponentConfigInfo['containerStyle'], { align: 'center' })
      }
      Object.assign(tempComponentConfigInfo, { isActive: true, id: `c_${uuid(12)}`, children: [] })
      if (componentList.length === 0 && tempComponentConfigInfo.containerStyle) {
        Object.assign(tempComponentConfigInfo.containerStyle, { marginTop: 0 })
      }
      if(tempComponentConfigInfo.propertyName === 'popupContainer' || tempComponentConfigInfo.propertyName === 'popupContainerSec' || tempComponentConfigInfo.propertyName === 'holidayPopup'){
        Object.assign(tempComponentConfigInfo.containerStyle, { marginTop: 'auto' })
      }
      if (componentList && componentList.length > 0) {
        componentList.forEach((item, index) => {
          item['isActive'] = false
          Vue.set(componentList, index, item)
        })
      }
      let insertIndex = componentList && componentList.length
      state.activeComponent = tempComponentConfigInfo

      // 弹窗类的子组件放在容器下
      if(['popupButton', 'popupImage', 'popupText', 'popupAD'].indexOf(propertyName) != -1){
        let preComponent = componentList[insertIndex-1]
        if(preComponent){
          if(preComponent.propertyName === 'popupContainer' || preComponent.propertyName === 'popupContainerSec' || preComponent.propertyName === 'holidayPopup'){
            tempComponentConfigInfo.parentId = preComponent.id
            preComponent.children.push(tempComponentConfigInfo)
            Vue.set(componentList, insertIndex-1, preComponent)
          }
        }else{
          Vue.set(componentList, insertIndex, tempComponentConfigInfo)
        }
      }else{
        Vue.set(componentList, insertIndex, tempComponentConfigInfo)
      }
      
      if(propertyName === 'popup'){
        Object.assign(state.pageInfo, pageInfo,{bgColor: 'rgba(0,0,0,0.6)',})
      }
      Object.assign(state.undo, pushStep(state))
    }
  },
  // 切换激活的组件
  [MutationTypes.CHANGECOMPONENTACITVE](state, { componentId, childComponentId }) {
    let { componentList } = state
    if (componentList && componentList.length > 0) {
      componentList.forEach((innerItem, innerIndex) => {
        if (innerItem['id'] === componentId) {
          innerItem['isActive'] = true
          if (childComponentId) {
            let children = innerItem['children']
            if (children && children.length > 0) {
              for (let childIndex = 0; childIndex < children.length; childIndex++) {
                let childItem = children[childIndex]
                if (childItem['id'] === childComponentId) {
                  state.activeComponent = childItem
                  break
                }
              }
            }
          } else {
            state.activeComponent = innerItem
          }
        } else {
          innerItem['isActive'] = false
        }
        Vue.set(componentList, innerIndex, innerItem)
      })
    }
    Object.assign(state, { toolTabType: 'component-config' })
  },
  // 处理组件拖动更新顺序
  [MutationTypes.COMPONENTDRAGUPDATE](state, values) {
    state.componentList = values
    Object.assign(state.undo, pushStep(state))
  },
  // 修改组件属性
  [MutationTypes.CHANGECOMPONENTATTR](state, { key, newConfig }) {
    console.log('CHANGECOMPONENTATTR', key, newConfig)
    let { componentList, activeComponent } = state
    let { id: componentId, parentId: parentComponentId } = activeComponent || {}
    if (parentComponentId) {
      let parentComponent = componentList.find(cItem => cItem['id'] === parentComponentId)
      componentList = parentComponent && parentComponent['children']
    }
    if (componentList && componentList.length > 0) {
      let { index: currentIndex, item: currentComponent } = activeIndexFromList(componentList, cItem => cItem['id'] === componentId)
      if (currentComponent) {
        if (key.indexOf('.') > -1) {
          let keySplitArr = key.split('.')
          if (keySplitArr.length === 2) {
            let currentComponentConfig = currentComponent[keySplitArr[0]] && currentComponent[keySplitArr[0]][keySplitArr[1]]
            currentComponentConfig && (currentComponent[keySplitArr[0]][keySplitArr[1]] = Object.assign(currentComponentConfig, newConfig))
            currentComponentConfig && Vue.set(componentList, currentIndex, currentComponent)
          } else if (keySplitArr.length === 3) {
            let currentComponentConfig = currentComponent[keySplitArr[0]] && currentComponent[keySplitArr[0]][keySplitArr[1]] && currentComponent[keySplitArr[0]][keySplitArr[1]][keySplitArr[2]]
            currentComponentConfig && (currentComponent[keySplitArr[0]][keySplitArr[1]][keySplitArr[2]] = Object.assign(currentComponentConfig, newConfig))
            currentComponentConfig && Vue.set(componentList, currentIndex, currentComponent)
          }
        } else {
          if (currentComponent.hasOwnProperty(key)) {
            currentComponent[key] = Object.assign(currentComponent[key], newConfig)
            Vue.set(componentList, currentIndex, currentComponent)
          }
        }
        Object.assign(state.undo, pushStep(state))
      }
    }
  },
  // 删除组件
  [MutationTypes.DELETECOMPONENT](state) {
    let { componentList, activeComponent } = state
    let { id, parentId } = activeComponent || {}
    let [listForDelete, deleteIndex] = [componentList, -1]
    if (!!parentId) {
      let { item: parentComponent } = activeIndexFromList(componentList, cItem => cItem['id'] === parentId)
      listForDelete = parentComponent['children'] || []
      let { index: currentIndex } = activeIndexFromList(listForDelete, cItem => cItem['id'] === id)
      deleteIndex = currentIndex
    } else {
      let { index: currentIndex } = activeIndexFromList(componentList, cItem => cItem['id'] === id)
      deleteIndex = currentIndex
    }
    if (listForDelete && listForDelete.length > 0 && deleteIndex > -1) {
      let pushResult = pushStep(state)
      Vue.delete(listForDelete, deleteIndex, 1)
      Object.assign(state,{ activeComponent: null, undo: pushResult})
    }
  },
  // 复制组件
  [MutationTypes.COPYCOMPONENT](state) {
    let { componentList, activeComponent } = state
    let { id, parentId } = activeComponent || {}
    let newComponent = JSON.parse(JSON.stringify(activeComponent))
    if (!!parentId) {
      let { item: parentComponent } = activeIndexFromList(componentList, cItem => cItem['id'] === parentId)
      let listForCopy = parentComponent['children'] || []
      let { index: currentIndex } = activeIndexFromList(listForCopy, cItem => cItem['id'] === id)
      newComponent['id'] = `c_c_${uuid(12)}`
      listForCopy.splice(currentIndex, 0, newComponent)
    } else {
      let { index: currentIndex } = activeIndexFromList(componentList, cItem => cItem['id'] === id)
      let newId = `c_${uuid(12)}`
      newComponent['id'] = newId
      let childComponentList = newComponent['children']
      if (childComponentList && childComponentList.length > 0) {
        childComponentList.forEach(item => {
          item['id'] = `c_c_${uuid(12)}`
          item['parentId'] = newId
        })
      }
      componentList.splice(currentIndex, 0, newComponent)
    }
  },
  // 新增子组件
  [MutationTypes.ADDCHILDCOMPONENT](state, { parentId, propertyName }) {
    let { componentList } = state
    // 隐藏右键菜单
    Object.assign(state.rightClkInfo, { show: false, clientX: 0, clientY: 0, flag: null })
    if (componentList && componentList.length > 0) {
      let parentComponent = componentList.find(item => item['id'] === parentId)
      if (parentComponent) {
        let children = parentComponent['children']
        if (children && configJson[propertyName]) {
          let tempComponentConfigInfo = JSON.parse(JSON.stringify(configJson[propertyName]))
          let { selfAbInitStyle, containerAbInitStyle } = tempComponentConfigInfo
          containerAbInitStyle && Object.assign(tempComponentConfigInfo['containerStyle'], containerAbInitStyle)
          selfAbInitStyle && Object.assign(tempComponentConfigInfo['selfStyle'], selfAbInitStyle)
          Object.assign(tempComponentConfigInfo, { parentId, isActive: true, id: `c_c_${uuid(12)}` })
          let insertIndex = children && children.length
          state.activeComponent = tempComponentConfigInfo
          Vue.set(children, insertIndex, tempComponentConfigInfo)
          Object.assign(state.undo, pushStep(state))
        }
      }
    }
  },
  // 修改页面配置
  [MutationTypes.CHANGEPAGEINFOCONFIG](state, { key, val }) {
    let { pageInfo: currentPageInfo, pageId, pageList } = state
    let newPageInfo = Object.assign(JSON.parse(JSON.stringify(currentPageInfo)), { [key]: val })
    state.pageInfo = newPageInfo
    let { item: currentItem, index: currentPageIndex } = activeIndexFromList(pageList, pItem => pItem['pageId'] === currentPageInfo['id'])
    currentItem ? currentItem['pageInfo'] = newPageInfo : () => {
      return {
        pageInfo: newPageInfo 
      }
    }
    Vue.set(pageList, currentPageIndex, currentItem)
    // 新增操作历史记录
    Object.assign(state.undo, pushStep(state))
  },
  // 上一步
  [MutationTypes.GOPREVSTEP](state) {
    let prevStepResult = prevStep()
    if (prevStepResult) {
      let { state: storState, hasPrev, hasNext } = prevStepResult
      Object.assign(storState.undo, { hasPrev, hasNext })
      Object.assign(state, storState)
    }
  },
  // 下一步
  [MutationTypes.GONEXTSTEP](state) {
    let nextStepResult = nextStep()
    if (nextStepResult) {
      let { state: storState, hasPrev, hasNext } = nextStepResult
      Object.assign(storState.undo, { hasPrev, hasNext })
      Object.assign(state, storState)
    }
  },
  // editor state 初始化
  [MutationTypes.EDITORININT](state, pageList) {
    if (pageList && pageList.length > 0) {
      let resultList = []
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
      resultList[0]['pageInfo'] && Object.assign(state, { pageInfo: resultList[0]['pageInfo'] })
      resultList[0]['componentList'] && Object.assign(state, { componentList: resultList[0]['componentList'] })
      Object.assign(state.undo, pushStep(state))
    }
  },
  [MutationTypes.CHANGERIGHTCLICK](state, { show, clientX, clientY, flag }) {
    Object.assign(state, { rightClkInfo: { show, clientX, clientY, flag } })
  },
  [MutationTypes.CHANGETOOLTABTYPE](state, tabType) {
    Object.assign(state, { toolTabType: tabType })
  }
}
