// 富文本
export default {
  propertyName: 'text',
  icon: 'text',
  tag: 'common',
  name: '文本',
  position: 'flex',
  containerStyle: {
    bgImgUrl: '',
    bgColor: 'rgba(0,0,0,0)',
    position: 'relative',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 10,
    paddingBottom: 10,
    minHeight: 12,
    top: 0,
    left: 0,
    zIndex: 0,
    order: 0,
    align: null
  },
  selfStyle: {
    bgImgUrl: '',
    bgColor: 'rgba(0,0,0,0)',
    borderWidth: 0,
    borderRadius: 4,
    width: 375,
    color: '#334455',
    borderColor: '#666',
    borderStyle: 'solid',
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 8,
    textAlign: 'center'
  },
  containerStyleReNoOper: ['width', 'left', 'top', 'position'],
  containerStyleAbNoOper: ['width', 'marginTop', 'marginBottom', 'position'],
  selfStyleNoOper: [],
  containerAbInitStyle: { position: 'absolute', width: 'auto', paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, top: 10, left: 10, zIndex: 10 },
  selfAbInitStyle: { width: 200 },
  property: {
    html: '<p>请输入文本</p>',
    clickType: 0,
    linkUrl: ''
  }
}
