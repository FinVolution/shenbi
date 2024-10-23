export function inApp(ua) {
    if (ua && ua.indexOf('xxxxApp') > -1) {
        return true;
    } else {
        return false;
    }
};

export function getCookie(ctx, name: string) {
    const cookies = ctx?.request?.header?.cookie || '';
    const arr = cookies.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null)
        return unescape(arr[2]);
    return null;
}
export function getUserAgent(ctx) {
    return ctx?.request?.header['user-agent'] || '';
}

const LOGIN_URL = "";
export const goToLogin = (ctx): string => {
    // const protocol = ctx.request.protocol
    const protocol = 'https'
    let rawUrl = `${protocol}://${ctx.host}${ctx.originalUrl}`
    let redirectUrl = ''
    if (inApp(getUserAgent(ctx))) {
        redirectUrl = `${protocol}://${ctx.host}/common/redirectLogin?returnUrl=${encodeURIComponent(rawUrl)}`
    } else {
        redirectUrl = `${protocol}:` + LOGIN_URL + encodeURIComponent(rawUrl);
    }
    return redirectUrl
};