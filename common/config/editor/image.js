// 图片
export default {
  propertyName: 'image',
  icon: 'pic',
  tag: 'common',
  name: '图片',
  containerStyle: {
    position: 'relative',
    bgImgUrl: '',
    bgColor: 'rgba(0,0,0,0)',
    marginTop: 0,
    marginBottom: 0,
    width: 375,
    paddingTop: 0,
    paddingBottom: 0,
    top: 0,
    left: 0,
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 0,
    borderStyle: 'solid',
    borderRadius: 0,
    zIndex: 0,
    order: 0,
    align: null
  },
  selfStyle: {
    width: 375,
    height: 200,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0,
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 0,
    borderStyle: 'solid',
    borderRadius: 0
  },
  containerStyleReNoOper: ['width', 'left', 'top', 'position'],
  containerStyleAbNoOper: ['width', 'marginTop', 'marginBottom', 'position'],
  selfStyleNoOper: [],
  containerAbInitStyle: {
    position: 'absolute', width: 'auto', paddingLeft: 0, paddingRight: 0, marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0, paddingTop: 0, paddingBottom: 0, top: 10, left: 10, zIndex: 10
  },
  selfAbInitStyle: { width: 150, height: 150 },
  property: {
    url: null,
    clickType: 0,
    linkUrl: '',
    toastMsg: '',
    setAppMarignTop: false, // 用户配置沉浸式导航栏距离顶部导航栏距离,
    animDuration: 1,
    animName: '',
    animCss: '',
    animLoop: false,
    imgName: '',
    tgtName: '',
    tgtId: '',
  }
}
