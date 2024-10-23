const common = {
    // 设置cookie
    setCookie(c_name, value, expiredays) {
        const exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = `${c_name}=${escape(value)}${
            expiredays == null ? '' : `;expires=${exdate.toGMTString()}`
        }`;
    },
    getCookie(c_name) {
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
    },
    setStorage(type, key, val) {
        const storage = type === 'SESSION' ? window.sessionStorage : window.localStorage;
        if (typeof val === 'string') {
            storage.setItem(key, val);
        } else {
            storage.setItem(key, JSON.stringify(val));
        }
    },
    getStorage(type, key) {
        const storage = type === 'SESSION' ? window.sessionStorage : window.localStorage;
        let value = storage.getItem(key);

        if (typeof value === 'undefined') {
            return value;
        }
        try {
            value = JSON.parse(value);
        } catch (e) {}
        return value;
    },
    loadScript(url) {
        return new Promise((resolve, reject) => {
            const body = document.getElementsByTagName('head')[0];
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            body.appendChild(script);
        });
    }
}

export default common;