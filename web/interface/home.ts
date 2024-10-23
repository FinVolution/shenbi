export interface IPageConfigResult {
  Result: number
  CodeMsg: any
  Content: IPageConfig
  ResultMessage: string
}

export interface IPageConfig {
  projectTimeStatus: number
  projectStatus: number
  pageList: IPageItem[]
  projectProperties: IProperties[]
}

export interface IPageItem {
  pageId: number
  pageProperties: IProperties[]
  componentProperties: IComponentProperties[]
}

export interface IComponentProperties{
  componentId: string
  pageId?: number|string
  propertyName: string
  propertyValue: IComponentPropertyValue
}

export interface IComponentPropertyValue{
  parentId?: string
  children?: IComponentProperties[]
  containerStyle: {[propName: string]: any}
  property?: {[propName: string]: any}
  selfStyle?: {[propName: string]: any}
  elemStyle?: {[propName: string]: any}
}

export interface IProperties {
  propertyName: string
  propertyValue: IPropertyValue
  [propName: string]: any
}

export interface IPropertyValue {
  [propName: string]: any
}
