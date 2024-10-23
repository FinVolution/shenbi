export const uuid = () => {
    let s = [];
    let hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-';

    let uuid = s.join('');
    return uuid;
};

function addZeroToNumber(num: any, count: any) {
    let arr = [];
    let len = String(num).length;
    if (len < count) {
        let space = count - len;
        for (let i = 0; i < space; i++) {
            arr.push('0');
        }
        return arr.join('') + num;
    }
    return num;
}

export const setTimestamp = (t: any, hasMilliSeconds=true) => {
    if (t) {
        let year = t.getFullYear();
        let month = addZeroToNumber(t.getMonth() + 1, 2);
        let date = addZeroToNumber(t.getDate(), 2);
        let hour = addZeroToNumber(t.getHours(), 2);
        let min = addZeroToNumber(t.getMinutes(), 2);
        let seconds = addZeroToNumber(t.getSeconds(), 2);
        let milliSeconds = addZeroToNumber(t.getMilliseconds(), 3);
        return (
            [year, month, date].join('-') +
            ' ' +
            [hour, min, seconds].join(':') +
            (hasMilliSeconds? '.' +
            milliSeconds : '')
        );
    } else {
        return false;
    }
};
export const handleError = (
    url: string,
    response: any,
    instance: any,
    userAgent: any,
    locationURL: string
) => {
    let {
        config,
        data, // 返回回来的对象
        request,
    } = response;
    const {status} = response;
    let appIdReg = /.*AppID\/(\d+).*/;
    let duidReg = /.*DUID\/([a-zA-Z0-9]+).*/;
    let versionReg = new RegExp('.*' + 'xxxxApp' + '/([.0-9]+).*');
    let buildTypeReg = /.*BuildType\/([a-zA-Z]+)*/;
    let appId = (appIdReg.exec(userAgent) && appIdReg.exec(userAgent)[1]) || '';
    // let duid = duidReg.exec(userAgent) && duidReg.exec(userAgent)[1] || '';
    let duid = (duidReg.exec(userAgent) && duidReg.exec(userAgent)[1]) || '';
    let version = (versionReg.exec(userAgent) && versionReg.exec(userAgent)[1]) || '';
    let buildType = (buildTypeReg.exec(userAgent) && buildTypeReg.exec(userAgent)[1]) || '';
    let platform = '';
    if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1) {
        platform = 'android';
    } else {
        platform = 'ios';
    }
    const requestURL = request.responseURL || request.path;
    let params = {
        eventId: uuid(),
        eventType: 'h5_ajax_error',
        openid: '',
        errorCode: status,
        errorMessage:
            (data && (data.message || data.Message || data.ResultMessage)) || request.statusText,
        requestURL: requestURL,
        method: config.method,
        userAgent: userAgent,
        url: locationURL,
        timestamp: setTimestamp(new Date()),
        platform: platform,
        version: version,
        duid: duid,
        pid: 'xxxxApp',
        appId: appId,
        buildType: buildType,
    };
    // 如果监控报错不处理
    if (requestURL.indexOf('xxxmonitor') > -1) {
        return;
    }
    return instance.post(url, {jsonBody: params});
};
type  resultType = 0 | 1; //0 success 1 error

export interface ResponseResult {
    "result": resultType, //
    "resultCode": null,
    "resultMessage": null|string,
    "resultContent": any,
}

export const responseMessage: ResponseResult = {
    "result": 0, //
    "resultCode": null,
    "resultMessage": null,
    "resultContent": {},
}
