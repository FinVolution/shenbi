// 根据配置对象生成vue样式对象
export const generateStyleByObj = (styleObj, useVw = false) => {
  const noUnitStyleAttr = ['zIndex', 'position', 'borderColor', 'borderStyle', 'borderColor', 'color', 'bgColor', 'fontWeight', 'fontFamily', 'boxSizing', 'textAlign', 'fontStyle', 'order', 'justifyContent', 'backgroundSize', 'borderTopLeftRadius',
    'borderBottomLeftRadius',
    'borderTopRightRadius',
    'borderTopRightRadius',
    'overflow',
    'rotate'
  ]
  if (styleObj) {
    const resultObject = {}
    for (const innerStyleItem in styleObj) {
      if (['align', 'bgImgUrl', 'bgColor', 'flexDirection', 'rotate'].indexOf(innerStyleItem) < 0) {
        if (noUnitStyleAttr.indexOf(innerStyleItem) > -1) {
          resultObject[innerStyleItem] = styleObj[innerStyleItem]
        } else {
          if (['auto'].indexOf(styleObj[innerStyleItem]) > -1 || `${styleObj[innerStyleItem]}`.indexOf('%') > -1) {
            resultObject[innerStyleItem] = styleObj[innerStyleItem]
          } else {
            if (!useVw) {
              // 获取当前为PC端还是手机端
              if (__isBrowser__) {
                if (/Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(navigator.userAgent)) {
                  useVw = true;
                } else {
                  if (location.href.includes('design')) {
                    useVw = false;
                  } else {
                    useVw = true;
                  }
                }
              } else {
                useVw = true;
              }
            }
            resultObject[innerStyleItem] = useVw ? `${(styleObj[innerStyleItem] / 3.75).toFixed(2)}vw` : `${styleObj[innerStyleItem]}px`
          }
        }
      } else if (innerStyleItem === 'bgImgUrl') {
        const bgImgUrl = styleObj[innerStyleItem]
        if (bgImgUrl && bgImgUrl.indexOf('http') > -1) {
          resultObject.backgroundImage = `url(${bgImgUrl})`
          resultObject.backgroundPosition = 'center center'
          resultObject.backgroundSize = '100% 100%'
          resultObject.backgroundRepeat = 'no-repeat'
        } else if (bgImgUrl && bgImgUrl.indexOf('linear-gradient') > -1) {
          resultObject.backgroundImage = bgImgUrl
        }
      } else if (innerStyleItem === 'bgColor') {
        resultObject.backgroundColor = styleObj[innerStyleItem]
      } else if (innerStyleItem === 'rotate') {
        resultObject.rotate = `${styleObj[innerStyleItem]}deg`
      }
    }
    return resultObject
  }
}
export const formatDate = (d) => {
  if (typeof d === 'undefined' || !d) {
    return '1970-01-01 00:00:00';
  }
  if (d.indexOf(':') <= -1) {
    return d.replace(/\./g, '-') + ' 00:00:00' || '1970-01-01 00:00:00';
  } else {
    return d.replace(/\./g, '-');
  }
}

export function judgeDeviceType() {
  let ua = window.navigator.userAgent.toLocaleLowerCase();
  let isIOS = /iphone|ipad|ipod/.test(ua);
  let isAndroid = /android/.test(ua);

  return {
      isIOS: isIOS,
      isAndroid: isAndroid
  };
}
