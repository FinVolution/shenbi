import Axios from "axios";
import { goToLogin } from "./redirect";
import { handleError } from './httpErrorHandle';

const UNAUTHORIZED_CODES = [400, 401];
const REPORT_URL = '';
const axios = Axios.create({
    baseURL: "/api",
    withCredentials: true,
    timeout: 20000,
});

axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        const { data } = response;
        const { Result, ResultMessage } = response.data;
        const { responseURL } = response.request;
        if (responseURL?.indexOf('xxxxService') === -1) {
            if (Result !== 0 && Result !== 200 && ResultMessage) {
                handleError(
                    REPORT_URL,
                    response,
                    axios,
                    navigator.userAgent,
                    window.location.href
                );
            }
        }
        return Promise.resolve(data);
    },
    (error) => {
        if (!error.config.url.includes('xxxxService')) {
            // 超时
            if (error.message.includes('timeout')) {
                handleError(
                    REPORT_URL,
                    error.response,
                    axios,
                    navigator.userAgent,
                    window.location.href
                );
            }
            // 捕获异常
            if (error.response && error.response.status) {
                handleError(
                    REPORT_URL,
                    error.response,
                    axios,
                    navigator.userAgent,
                    window.location.href
                );
            }
        }
        return Promise.reject(error);
    }
);

export const post = async (url: string, payload = {}, requireAuth = true, extraInfo = {}): Promise<any> => {
    const headers = { "Content-Type": "application/json", ...extraInfo };

    try {
        const data = await axios.post(url, payload, { headers });
        return { ok: true, ...data };
    } catch (error:any) {
        const errorResponse = error.response;
        if (!error.message.includes('timeout') && errorResponse) {
            const { status } = errorResponse;
            if (UNAUTHORIZED_CODES.includes(status) && requireAuth) {
                goToLogin();
            }
        }
        return {
            ok: false,
            CodeMsg: null,
            Content: null,
            // Result: status,
            ResultMessage: errorResponse,
        };
    }
};
export const get = async (url: string, requireAuth = true): Promise<any> => {
    try {
        const data = await axios.get(url);
        return { ok: true, ...data };
    } catch (error:any) {
        const errorResponse = error.response;
        if (!error.message.includes('timeout')) {
            const { status } = errorResponse;
            if (UNAUTHORIZED_CODES.includes(status) && requireAuth) {
                goToLogin();
            }
        }
        return {
            ok: false,
            CodeMsg: null,
            Content: null,
            Result: status,
            ResultMessage: errorResponse,
        };
    }
};
