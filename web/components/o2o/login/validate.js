export function isEmpty(value) {
    // 空校验
    return value === void 0 || value === null || value === '';
}
export function isMobile(value, model = 'default') {
    // 手机校验
    if (model === 'daichao') return /^1[3-9]\d{9}$/.test(value);
    const validateReg = /^((\+?86)|(\(\+86\))|(0086)|(86))?1[3-9]\d{9}$/;
    return validateReg.test(value);
}
export function isTel(val) {
    // 电话校验，纯数字4-15位
    let param = val && val.replace('-', '');
    let telLength = param.length; // 电话长度
    const validateReg = /^[0-9]*$/;
    if (validateReg.test(param) && telLength >= 4 && telLength <= 15) {
        // 电话校验，返回[区号，电话号]
        // 区号 3、4位
        let code3 = param.substr(0, 3);
        let code4 = param.substr(0, 4);
        let telNum = null;
        let head4 = param.charAt(0) === '4'; // 电话第一位，是否为4
        let resCode = tel_code.find(item => {
            if (item === code3) {
                telNum = param.substr(3, telLength);
                return true;
            } else if (item === code4) {
                telNum = param.substr(4, telLength);
                return true;
            }
        });
        if (head4) {
            // 如果是4开头的，限定为数字10位
            if (telLength !== 10) {
                return { tel: [param], err: '请输入正确座机号码' };
            } else {
                return { tel: [param] };
            }
        } else {
            // 普通电话则需要带区号
            if (!resCode) {
                // 如果不是4开头的，就要填区号
                return { tel: [param] };
            } else if (telNum.length !== 7 && telNum.length !== 8) {
                return { tel: [param] };
            } else {
                return { tel: [resCode, telNum] };
            }
        }
    } else {
        return { tel: [param], err: '请输入正确座机号码' };
    }
}
export function isPersonName(value, model = 'default') {
    if (model === 'daichao') {
        // 2-8位全中文
        return /^[\u4E00-\u9FA5]{2,8}$/.test(value);
    }
    // 人名校验，全数字不能过，全字符不能过，只有一个字符怎么样都能过
    const validateReg = /^.{1}$/; // 只有一个字符，true，能过
    const validateReg1 = /^[\d]{2,}$/; // 一位以上的全数字，true，不能过
    const validateReg2 = /^[^\d\u4E00-\u9FA5A-Za-z]{2,}$/; // 除了字母，数字，中文之外，true，不能过
    const validateReg3 = /^.{1,12}$/; // 校验个数，不能超过12个字符，true,能过
    return (
        !isEmpty(value) &&
        validateReg3.test(value) &&
        (validateReg.test(value) ||
            !(validateReg1.test(value) || validateReg2.test(value)))
    );
}

export function isIDCard(value) {
    const validateReg = /^[\d]{1,17}[\dxX]{1}$/; // 校验个数，不能超过18个字符，true,能过
    const validateReg1 = /^.{18}$/; // 校验个数，不能超过18个字符，true,能过
    return validateReg.test(value) && validateReg1.test(value);
}