import axios from 'axios'

const getWeChatSharingConfig = () => {
  const href = window.location.href
  const url = '/jssdk/init?url=' + encodeURIComponent(href)
  return axios.get(url, false)
}

const jsApiList = [
  'onMenuShareAppMessage',
  'onMenuShareTimeline',
  'onMenuShareQQ',
  'onMenuShareWeibo',
  'onMenuShareQZone',
]

const defaultOptions = {
  title: 'xxx',
  desc: 'xxx',
  link: '',
  imgUrl: '',
}

export const weChatShare = async (
  options = defaultOptions,
  success = () => {},
  cancel = () => {}
) => {
  const { status, data } = await getWeChatSharingConfig()
  if (status === 200) {
    const { content } = data
    const { appId, nonceStr, signature, timestamp } = content
    window.wx.config({
      debug: false,
      appId,
      timestamp,
      nonceStr,
      signature,
      jsApiList,
    })
    const sharingOptions = {
      ...options,
      success,
      cancel,
    }
    window.wx.ready(() => {
      window.wx.onMenuShareTimeline(sharingOptions)
      window.wx.onMenuShareAppMessage(sharingOptions)
      window.wx.onMenuShareQQ(sharingOptions)
      window.wx.onMenuShareWeibo(sharingOptions)
      window.wx.onMenuShareQZone(sharingOptions)
    })
  } else {
    return false
  }
}