export const DEFAULT_INIT_PAGE_INFO = {
  bgColor: 'rgba(255,255,255,1)',
  titleSwitch: false,
  titleBgImgUrl: null,
  titleColor: 'rgba(0,0,0,1)',
  titleBgColor: 'rgba(255,255,255,1)',
  popupFontColor: 'rgba(0,0,0,1)',
  popupBgColor: 'rgba(255,255,255,1)',
  routerName: 'home',
  title: 'xxx',
  bgImgUrl: null,
  isAppSwitch: false,
  linkUrl: '',
  version: '3.0',
  retainPopupSwitch: false,
  showRightShareButton: false,
}

export const DEFAULT_INIT_STATE = {
  projectId: null,
  preId: null,
  pageList: [],
  pageInfo: JSON.parse(JSON.stringify(DEFAULT_INIT_PAGE_INFO)),
  componentList: [],
  activeComponent: null,
  rightClkInfo: { show: false, clientX: 0, clientY: 0, flag: null },
  toolTabType: 'page-config',
  undo: { hasPrev: false, hasNext: false }
}
