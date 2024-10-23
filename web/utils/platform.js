export const inApp = () => {
  return false
}

export const inWeChat = () => {
  if (navigator) {
    const u = navigator.userAgent.toLowerCase()
    return u.includes('micromessenger')
  } else {
    return false
  }
}

export const judgePlatform = () => {
  return {
    inApp: inApp(),
    inWeChat: inWeChat(),
    inH5: !inApp() && !inWeChat(),
  }
}
