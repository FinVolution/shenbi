import { wxShare } from '../service/index'

// 获取平台
export function judgeDeviceType() {
    let ua = window.navigator.userAgent.toLocaleLowerCase();
    let isIOS = /iphone|ipad|ipod/.test(ua);
    let isAndroid = /android/.test(ua);

    return {
        isIOS: isIOS,
        isAndroid: isAndroid
    };
}

export function inApp(ua) {
    let isIOS = /iphone|ipad|ipod/.test(ua);
    let isAndroid = /android/.test(ua);
    if (ua && ua.indexOf('xxxxApp') > -1) {
        return true;
    } else {
        return false;
    }
};

// 判断是否是微信
export const isWeixin = function() {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/micromessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
};

// 接入微信分享jssdk
export const WeiXinShare = function(shareOption, callback) {
    wxShare()
        .then(data => {
            window.wx.config({
                debug: false,
                appId: data.content.appId,
                timestamp: data.content.timestamp,
                nonceStr: data.content.nonceStr,
                signature: data.content.signature,
                jsApiList: [
                    'onMenuShareAppMessage',
                    'onMenuShareTimeline',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone'
                ]
            });
            if (!shareOption) {
                shareOption = {
                    title: 'xxx',
                    desc: 'xxx',
                    linkUrl: window.location.href,
                    imgUrl: ''
                };
            }
            if (!callback) {
                callback = function() {};
            }
            window.wx.ready(function() {
                /* 分享到朋友圈 */
                window.wx.onMenuShareTimeline({
                    title: shareOption.title,
                    link: shareOption.linkUrl,
                    imgUrl: shareOption.imgUrl,
                    success: callback,
                    cancel: function() {}
                });

                /* 分享给朋友 */
                window.wx.onMenuShareAppMessage({
                    title: shareOption.title,
                    desc: shareOption.desc,
                    link: shareOption.linkUrl,
                    imgUrl: shareOption.imgUrl,
                    success: callback,
                    cancel: function() {}
                });

                /* 分享到QQ */
                window.wx.onMenuShareQQ({
                    title: shareOption.title,
                    desc: shareOption.desc,
                    link: shareOption.linkUrl,
                    imgUrl: shareOption.imgUrl,
                    success: callback,
                    cancel: function() {}
                });

                /* 分享到腾讯微博 */
                window.wx.onMenuShareWeibo({
                    title: shareOption.title,
                    desc: shareOption.desc,
                    link: shareOption.linkUrl,
                    imgUrl: shareOption.imgUrl,
                    success: callback,
                    cancel: function() {}
                });

                /* 分享到QQ空间 */
                window.wx.onMenuShareQZone({
                    title: shareOption.title,
                    desc: shareOption.desc,
                    link: shareOption.linkUrl,
                    imgUrl: shareOption.imgUrl,
                    success: callback,
                    cancel: function() {}
                });
            });
        })
        .catch(error => {
            console.log('wx', error);
        });
};

export const getCookie = (cookies='', name: string) => {
    if (cookies.length > 0) {
        const strcookie = cookies; // 获取cookie字符串
        const arrcookie = strcookie.split(';'); // 分割
        // 遍历匹配
        for (let i = 0; i < arrcookie.length; i++) {
            const arr = arrcookie[i].trim().split('=');
            if (arr[0] === name) {
                return arr[1];
            }
        }
        return '';
    }
    return '';
}
