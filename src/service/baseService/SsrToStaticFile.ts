import axios from 'axios';
import {pushStatusBody} from "../../interface";
import {AppName,aladdinConfig} from "../../utils/const";
let timer = null;
let timeOut = null;
const Instance = axios.create({
    baseURL: '',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    }
})
export default class SsrToStaticFile {
    statusBody: pushStatusBody;
    tenantId: string | number;

    constructor(params) {
        const { tenantId } = params;
        this.tenantId = tenantId;
        this.statusBody = {...params};
    }

    /**
     *
     * @param path  路径
     */
    async getSsrResult(path: string) {
        return new Promise(async (resolve, reject) => {
            const getPort = process.env.DEPLOY_ENV === 'dev'?'3000':'8080';
            const result: any = await Instance.get(`http://127.0.0.1:${getPort}/${path}`);
            const ssrFail = result?.headers?.ssrfail === 'false';
            if (ssrFail) {
                return reject(false);
            }
            return resolve(result) ;
        })
    }

    async pushStatus(status:number) {
        const params = {...this.statusBody,status};
        return await Instance.request({
            url: '',
            method: 'post',
            data: params
        })
    }
    async pushService({pack_url, Env, tenantId, deployUrl}):Promise<boolean|number|string> {
        return new Promise(async (resolve, reject) => {
            const res_host = Env == 'fat' ? [AppName[tenantId].host] : [];
            const headers = Env == 'fat' ? {} : {apikey: ""};
            const serviceParams = {
                appname: AppName[tenantId].appName,
                env: Env,
                pack_url,
                enable_cdn: Env=='pro'&&!!AppName[tenantId].cdnName,
                res_host, 
                dest_dir: `/www/${AppName[tenantId].appName}`,
                applicant: 'yebin'
            }
            const pushResult = await Instance.request({
                url: `${deployUrl}/xx/`,
                method: 'post',
                headers,
                data: serviceParams
            })
            const pushStatus: boolean = pushResult?.data?.code === 0;
            const msg:boolean = pushResult?.data?.msg ==='success';
            if (pushStatus&&msg) {
                const operation_id: number = pushResult?.data?.detail.id;
                return resolve(operation_id)
            }
            return reject(pushResult?.data)

        })
    }
    async publishResult(operation_id: number|string,deployUrl:string) {
        if (timer) {
            clearInterval(timer);

        }
        if (timeOut){
            clearTimeout(timeOut);
        }
        return new Promise((resolve, reject) => {
            timeOut = setTimeout(()=>{
                clearInterval(timer)
                reject(false);
            },600000)
            //轮训
            timer = setInterval(async () => {
                await (async () => {
                    try {
                        const result = await Instance.request({
                            url: `${deployUrl}/xxx/${operation_id}/xxx/`,
                            method: 'get',
                            headers: {apikey: ""}
                        })
                        if (result.data.code === 0) {
                            const getPackFileStatus = result?.data.detail?.find(({key})=>key==='pack_file')||{};
                            const getMd5CheckStatus = result?.data.detail?.find(({key})=>key==='md5_check')||{};
                            const getUploadStatus = result?.data.detail?.find(({key})=>key==='upload')||{};
                            const allStatus = [getPackFileStatus,getMd5CheckStatus,getUploadStatus]
                            if (allStatus.every(({status})=>status=== 'succeed'||status=== 'skipped') ) {
                                clearInterval(timer);
                                resolve(true);
                            } else if (allStatus.every(({status})=>status && status!== 'new')  && allStatus.every(({status})=>status && status!== 'running') ) {
                                clearInterval(timer);
                                reject(result?.data.detail);
                            }
                        } else {
                            clearInterval(timer);
                            reject(result.data);
                        }
                    } catch (e) {
                        clearInterval(timer);
                        reject(e);
                    }
                })()
            }, 1500)

        })
    }
    async buildImageService({pack_url, Env, envId, operatorToken = undefined}) {
        return new Promise(async (resolve, reject) => {
            try {
                const reqDomain = aladdinConfig[Env];
                const serviceParams = {
                    siteName: AppName[this.tenantId].appName,
                    environment: envId,
                    virtualSiteName: AppName[this.tenantId].virtualName,
                    packageDownloadUrl: pack_url,
                    operatorToken,
                }
                const result: any = await Instance.request({
                    url: `${reqDomain}/xxx`,
                    method: 'post',
                    data: serviceParams,
                });
                if (result?.data?.status === 1 && result?.data?.success === true) {
                    resolve(result?.data);
                } else {
                    reject(result?.data);
                }
            } catch(e) {
                reject(false);
            }
        })
    }

    async publishStatus(params: any, type: number) {
        try {
            const requestUrl = type === 2 ? AppName[this.tenantId]['batchStatusCallbackApi'] : AppName[this.tenantId]['statusCallbackApi'];
            return await Instance.request({
                url: requestUrl,
                method: 'post',
                data: params
            });
        } catch(e) {
            return { data: { status: 0,  message: '回调接口异常'} };
        }
        
    }
     async getDocumentHtml(url: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const result: any = await Instance.get(url);
                if (result?.status === 200 && result?.data) {
                    return resolve(result?.data);
                } else {
                    return reject(false);
                }
            } catch(e) {
                reject(false);
            }
        })
    }
};
