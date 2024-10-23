import text from './text'

const benefit = {
  ...text,
  propertyName: 'benefit',
  name: '利益点',
  icon: 'sign-up',
  property: {
    html: `
      <div>
        <div style="padding-bottom: 20px;font-size: 12px!important;color: #7C8893;line-height: 22px">
          <div>沪ICP备00000000号</div>
          <div>xxxx有限公司</div>
          <div>客服热线（8:00-20:00）000-000-0000</div>
        </div>
        <div style="width: 249px;border: 1px dashed #D0D0D0;margin: 0 auto;transform: scaleY(0.5);"></div>
        <div style="padding: 18px 8px 34px;font-size: 10px!important;color: #7C8893;line-height: 19px">
          <div>一段文字一段文字一段文字</div>
          <div>一段文字一段文字一段文字</div>
          <div>一段文字一段文字一段文字</div>
          <div>一段文字一段文字一段文字</div>
          <div>一段文字一段文字一段文字</div>
          <div>一段文字一段文字一段文字</div>
        </div>
      </div>
    `,
    clickType: 0,
    linkUrl: ''
  },
  containerStyle: {
    bgColor: '#f5f8fa',
    width: 375,
    height: 310,
    align: 'center',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 10,
    borderColor: '#666',
    borderStyle: 'solid',
    borderWidth: 0,
    textAlign: 'center'
  },
  selfStyle: {
    width: 340,
    bgColor: '#fff',
    height: 310,
    align: 'center',
    marginLeft: 0,
    marginRight: 0,
    paddingRight: 27,
    paddingTop: 39,
    borderRadius: 10,
    paddingBottom: 20,
    paddingLeft: 27
  },
}


export default benefit