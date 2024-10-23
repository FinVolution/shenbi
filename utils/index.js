// common方法定义在这里
const urlRegExp = /^((https?:)?\/\/)/

/**
 * 生成uuid，以作临时id用
 * @param {生成的uuid的长度} len
 * @param {随机的字符范围}} radix
 * @returns 返回uuid字符串
 */
export const uuid = (len, radix) => {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  let i = 0
  let r = 0
  radix = radix || chars.length
  if (len) {
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)]
    }
  } else {
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}
/**
 * 深拷贝数组
 * @param {原对象} source
 * @returns 新的深度拷贝对象
 */
export const deepClone = source => {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

/**
 * merge对象
 * @param {*} target
 */
export const merge = target => {
  for (let i = 1, j = arguments.length; i < j; i++) {
    const source = arguments[i] || {}
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }
  return target
}

/**
 * 加载图片promise版本
 * @param {加载图片的url地址} url
 * @returns 返回promise对象
 */
export const preloadImg = url => {
  return new Promise(resolve => {
    let img = new Image()
    img.src = url
    img.onload = () => {
      resolve()
    }
  })
}

/**
 * 转换querystring为对象并返回该对象
 */
export const getUrlParams = () => {
  let query = ''
  if (location.hash.split('?')[1]) {
    query = location.hash.split('?')[1]
  }
  let queryObj = {}
  if (query) {
    let splitArr = query.split('&')
    if (splitArr.length) {
      for (let queryStr of splitArr) {
        let strArr = queryStr.split('=')
        if (strArr[0] !== undefined && strArr[0] !== null) {
          queryObj[strArr[0]] = strArr[1] || ''
        }
      }
    }
  }
  return queryObj
}
/**
 * 将对象转换为queryString
 * @param {要转换为queryString的对象} obj
 */
export const createSearch = obj => {
  let search = ''
  if (typeof obj === 'object' && !(obj instanceof Array)) {
    let array = []
    for (let key of Object.keys(obj)) {
      array.push({
        key: key,
        value: obj[key]
      })
    }
    if (array.length === 0) {
      return search
    }
    for (let i = 0; i < array.length; i++) {
      let str = i === 0 ? '?' : '&'
      search += str + array[i].key + '=' + encodeURIComponent(array[i].value)
    }
  }
  return search
}

/**
 * 判断值是否为空
 * @param {要判断的值} val
 * @param {0是否为空}} isZeroNull
 * @returns Boolean
 */
export const isEmpty = (val, isZeroNull = false) => {
  return val === '' || val === null || val === undefined || (isZeroNull && val === 0)
}
/**
 * 判断对象是否非空
 * @param {要判断的值} val
 * @param {0是否为空} isZeroNull
 */
export const isNotEmpty = (val, isZeroNull = false) => {
  return !isEmpty(val, isZeroNull)
}

/**
 * 日期计算
 * @param strInterval  string 可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
 * @param num          int
 * @param date         Date 日期对象
 * @return Date        返回日期对象
 */
export const dateAdd = (strInterval, num, date) => {
  date = arguments[2] || new Date()
  switch (strInterval) {
    case 's':
      return new Date(date.getTime() + 1000 * num)
    case 'n':
      return new Date(date.getTime() + 60000 * num)
    case 'h':
      return new Date(date.getTime() + 3600000 * num)
    case 'd':
      return new Date(date.getTime() + 86400000 * num)
    case 'w':
      return new Date(date.getTime() + 86400000 * 7 * num)
    case 'm':
      return new Date(date.getFullYear(), date.getMonth() + num, 1, date.getHours(), date.getMinutes(), date.getSeconds())
    case 'y':
      return new Date(date.getFullYear() + num, date.getMonth(), 1, date.getHours(), date.getMinutes(), date.getSeconds())
  }
}
/**
 * 将日期字符串转成日期
 * 字符串fmt【格式】：yyyy-MM-dd HH:mm:ss 或 yyyy-MM-dd 或者 yyyy-MM-dd HH:mm:ss.ms
 * @param {日期字符串}} str
 */
export const parseDate = str => {
  if (typeof str === 'string') {
    let results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/)
    if (results && results.length > 3) {
      return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]))
    }
    results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/)
    if (results && results.length > 6) {
      return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]), parseInt(results[4]), parseInt(results[5]), parseInt(results[6]))
    }
    results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/)
    if (results && results.length > 7) {
      return new Date(
        parseInt(results[1]),
        parseInt(results[2]) - 1,
        parseInt(results[3]),
        parseInt(results[4]),
        parseInt(results[5]),
        parseInt(results[6]),
        parseInt(results[7])
      )
    }
  }
  return null
}
/**
 * 日期格式化
 * @param {日期对象} date
 * @param {格式符} fmt
 */
export const fomatDate = (date, fmt = 'yyyy-MM-dd') => {
  let addZero = function(num) {
    if (typeof num === 'number') {
      if (num < 10) {
        return '0' + num
      }
      return '' + num
    } else {
      return null
    }
  }
  let yyyy = date.getFullYear()
  let MM = date.getMonth()
  let dd = date.getDate()
  let HH = date.getHours()
  let mm = date.getMinutes()
  let ss = date.getSeconds()
  let hh = HH > 12 ? HH - 12 : HH
  let dateStr = fmt
    .replace('yyyy', yyyy)
    .replace('MM', addZero(MM + 1))
    .replace('dd', addZero(dd))
    .replace('HH', addZero(HH))
    .replace('mm', addZero(mm))
    .replace('ss', addZero(ss))
    .replace('hh', addZero(hh))
  return dateStr
}

/**
 * 数字保留*位小数，返回相应位数小数的字符串
 * @param {要保留位数的值，可以为数字或者数字字符串} val
 * @param {要保留的小数位数，整型} digits
 */
export const cutNumber = (val, digits) => {
  if (isEmpty(val)) {
    return 0
  } else {
    if (Number.isInteger(val)) {
      return val.toFixed(digits)
    }
    let strVal = String(val)
    let strArr = strVal.split('.')
    if (strArr.length === 1) {
      strArr[1] = padEnd('', digits, 0)
    } else {
      if (strArr[1].length > digits) {
        strArr[1] = strArr[1].substr(0, digits)
      } else {
        strArr[1] = padEnd(strArr[1], digits, 0)
      }
    }
    return strArr.join('.')
  }
}
/**
 * 数字格式化
 * @param {要格式话的数字} amount
 */
export const formatNumber = amount => {
  if (!amount) return 0
  let isNegative = String(amount).indexOf('-') === 0
  amount = isNegative ? amount.substring(1, amount.length) : amount
  let iAmount = String(amount).split('.')[0]
  let dAmount = String(amount).split('.')[1]
  let reversedAmount = iAmount.split('').reverse()
  let computedArr = []
  for (let i = 0; i < reversedAmount.length; i++) {
    computedArr.unshift(reversedAmount[i])
    if (i % 3 === 2 && i !== reversedAmount.length - 1) {
      computedArr.unshift(',')
    }
  }
  let returnStr = computedArr.join('') + (dAmount ? '.' + dAmount : '')
  return isNegative ? '-' + returnStr : returnStr
}

/**
 * 判断变量是否为对象
 * @param {变量} val
 */
export const isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

/**
 * 判断变量是否为数组
 * @param {变量} val
 */
export const isArray = val => {
  return Object.prototype.toString.call(val) === '[object Array]'
}

/**
 * 判断变量是否为数字
 * @param {变量} val
 */
export const isNumber = val => {
  return Object.prototype.toString.call(val) === '[object Number]'
}

/**
 * 判断变量是否为undefined
 * @param {变量} val
 */
export const isUndefined = val => {
  return Object.prototype.toString.call(val) === '[object Undefined]'
}

/**
 * 判断变量是否为字符串
 * @param {变量} val
 */
export const isString = val => {
  return Object.prototype.toString.call(val) === '[object String]'
}

/**
 * 判断变量是否为函数
 * @param {变量} val
 */
export const isFunction = val => {
  return Object.prototype.toString.call(val) === '[object Function]'
}

/**
 * 判断变量是否为正则表达式
 * @param {变量} val
 */
export const isRegExp = val => {
  return Object.prototype.toString.call(val) === '[object RegExp]'
}

/**
 * 判断变量是否为boolean类型
 * @param {变量} val
 */
export const isBoolean = val => {
  return Object.prototype.toString.call(val) === '[object Boolean]'
}

/**
 * 判断字符串是否为合法的url
 * @param {url字符串} str
 */
export const isValidUrl = str => {
  return urlRegExp.test(str)
}

/**
 * 判断字符串是否为路由path
 * @param {变量} str
 */
export const isUrlPath = str => {
  return !isValidUrl(str) && str.indexOf('/') === 0
}

export const formatAndRetainTwoDecimal = amount => {
  if (isEmpty(amount)) {
    return 0
  }
  let cuttedNumber = cutNumber(amount, 2)
  return formatNumber(cuttedNumber)
}

// 处理sessionStorage OR loaclStorage 处理浏览器本利存储
export const storageSet = (storgeType, key, val) => {
  if (storgeType === 'session') {
    try {
      window.sessionStorage && window.sessionStorage.setItem(key, JSON.stringify(val))
    } catch (error) {
      console.info(JSON.stringify(error))
    }
  } else if (storgeType === 'local') {
    try {
      window.localStorage && window.localStorage.setItem(key, JSON.stringify(val))
    } catch (error) {
      console.info(JSON.stringify(error))
    }
  }
}

export const storageGet = (storgeType, key) => {
  if (storgeType === 'session') {
    if (window.sessionStorage) {
      let tempValue = window.sessionStorage.getItem(key)
      return tempValue
    }
  } else if (storgeType === 'local') {
    if (window.localStorage) {
      let tempValue = window.localStorage.getItem(key)
      return tempValue
    }
  }
}

/**
 * 获取字符数，1个中文=2个英文字符，标点为一个英文字符
 * @param {传入的字符串} str
 */
export const getStrLength = str => {
  let value = str
  let length = value.length
  if (length > 0) {
    for (let i = 0; i < length; i++) {
      let valueSubstr = value.substr(i, 1) // 截取字符串
      let valueEscape = escape(valueSubstr) // 编码
      if (valueEscape.indexOf('%u') > -1) {
        length++
      } // 是否搜索到指定字符串
    }
  }
  return length
}

// 不区分大小写字符串比较 String compare
export const caseInsensitiveStringCompare = (compareA, compareB) => {
  return (compareA + '').toLowerCase() === (compareB + '').toLowerCase()
}

// px转vw
export const pxToVw = (size, designWidth = 375) => {
  return ((size * 1.0 * 100) / designWidth).toFixed(2) + 'vw'
}

// px转vh
export const pxToVh = (size, designWidth = 667) => {
  return ((size * 1.0 * 100) / designWidth).toFixed(2) + 'vh'
}

// 获取cookie
export const getCookie = name => {
  let arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
  if (arr != null) {
    return unescape(arr[2])
  } else {
    return null
  }
}

// 获取平台
export const judgePlatform = () => {
  let ua = window.navigator.userAgent.toLocaleLowerCase();
  let isIOS = /iphone|ipad|ipod/.test(ua);
  let isAndroid = /android/.test(ua);

  if(isIOS || isAndroid) {
    return true;
  } else {
    return false;
  }
}