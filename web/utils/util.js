export const debounce = function (func, wait, immediate = true) {
    let timeout, result;
    const later = (context, args) =>
        setTimeout(() => {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                context = args = null;
            }
        }, wait);
    let debounced = function (...params) {
        if (!timeout) {
            timeout = later(this, params);
            if (immediate) {
                result = func.apply(this, params);
            }
        } else {
            clearTimeout(timeout);
            timeout = later(this, params);
        }
        return result;
    };
    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };
    return debounced;
};
export const getQueryString = function (name, isDecode = true) {
    let after = isDecode ? decodeURIComponent(
        window.location.hash.split('?')[1] || window.location.search.split('?')[1]
    ) : window.location.hash.split('?')[1] || window.location.search.split('?')[1];
    if (after) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        let r = after.match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        } else {
            return null;
        }
    }
};
export const updateQueryStringParameter = function (uri, key, value) {
    var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    var separator = uri.indexOf('?') !== -1 ? '&' : '?';
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + '=' + value + '$2');
    } else {
        return uri + separator + key + '=' + value;
    }
};
export const setStorage = function (type, key, val) {
    const storage = type === 'SESSION' ? window.sessionStorage : window.localStorage;
    if (typeof val === 'string') {
        storage.setItem(key, val);
    } else {
        storage.setItem(key, JSON.stringify(val));
    }
};
export const getCookie = function (c_name) {
    if (document.cookie.length > 0) {
        const strcookie = document.cookie; // 获取cookie字符串
        const arrcookie = strcookie.split(';'); // 分割
        // 遍历匹配
        for (let i = 0; i < arrcookie.length; i++) {
            const arr = arrcookie[i].trim().split('=');
            if (arr[0] === c_name) {
                return arr[1];
            }
        }
        return '';
    }
    return '';
};

/**
 * 转换querystring为对象并返回该对象
 */
export const getUrlParams = () => {
    let query = '',
        paramStr = location.href.split('?');
    if (paramStr) {
        query = paramStr[1];
    }
    let queryObj = [];
    if (query) {
        let splitArr = query.split('&');
        if (splitArr.length) {
            for (let queryStr of splitArr) {
                let strArr = queryStr.split('=');
                if (strArr[0] !== undefined && strArr[0] !== null) {
                    queryObj.push(strArr[1] || '');
                }
            }
        }
    }
    return queryObj;
};
/**
 * 转换拿到的链接参数数组转为参数对象
 */
export const getAllParamsObj = objList => {
    let queryObj = {};
    try {
        for (let obj of objList) {
            if (obj.indexOf('#/') !== -1) {
                obj = obj.replace('#/', '');
            }
            let decodeObjStr = decodeURIComponent(decodeURIComponent(obj));
            // 判断里面有没有内嵌套
            let preIndex = decodeObjStr.indexOf('={');
            if (preIndex !== -1) {
                let latterIndex = decodeObjStr.indexOf('}');
                decodeObjStr =
                    decodeObjStr.slice(0, preIndex) +
                    decodeObjStr.slice(latterIndex + 1, decodeObjStr.length);
            }
            let decodeObj = JSON.parse(decodeObjStr);
            queryObj = Object.assign(queryObj, decodeObj);
        }
        return queryObj;
    } catch (e) {
        console.log('查看链接是否符合规范');
    }
};
export const jumpToUrl = url => {
    window.location.href = url;
};
// 关闭原有页面，新开页面，浏览器返回不到上一页
export const jumpNewUrl = url => {
    window.location.href = url;
};