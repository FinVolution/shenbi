import axios from 'axios';
import { panguConfig, applicant, nebulaApikey, AppName } from "../../utils/const";
import { setTimestamp } from "../../utils/httpErrorHandle";
let timer = null;
let timeOut = null;
const Instance = axios.create({
    baseURL: '',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'apikey': nebulaApikey
    }
})

export default class PublishNebula {
    curEnv: string;
    envid: string;
    image: string;
    token: string;
    virtualSiteName: string;
    tenantId: string;
    operatorName: string;
    constructor(params) {
        const { Env, environment, imageName, virtualSiteName, tenantId, operatorToken, operatorName } = params;
        this.curEnv = Env;
        this.envid = environment;
        this.image = imageName;
        this.tenantId = tenantId;
        this.token = operatorToken;
        this.virtualSiteName = virtualSiteName;
        this.operatorName = operatorName;
    }

    async getNebulaEnvs(applicant) {
        return new Promise(async (resolve, reject) => {
            try {
                const reqUrl = `${panguConfig[this.curEnv]}/xx/xx/xx/envs/?applicant=${applicant}`;
                const result: any = await Instance.request({
                    url: reqUrl,
                    method: 'get',
                });
                resolve(result?.data?.detail);
            } catch(e) {
                reject(false);
            }
        })
    }

    async getAppInstances() {
        try {
            return new Promise(async (resolve, reject) => {
                const reqUrl = `${panguConfig[this.curEnv]}/xx/xx/xx/app/instances/?envid=${this.envid}&app=${this.virtualSiteName}`;
                let serviceParams: object = {
                    image: this.image,
                    applicant: applicant,
                    app: this.virtualSiteName
                };
                try {
                    const result:any = await Instance.request({
                        url: reqUrl,
                        method: 'get',
                        headers: { 
                            Authorization: `Token ${this.token}`,
                        },
                    });
                    const status: boolean = result?.data?.code === 0;
                    const msg:boolean = result?.data?.msg ==='success';
                    if (status && msg) {
                        const detailLen: number = result?.detail?.length;
                        if (detailLen > 0) {
                            const { name } = result?.detail[0];
                            serviceParams = {...serviceParams, ...{ecs_name: name}};
                        } else {
                            const tempParams = {
                                envid: this.envid,
                                spec: 'C',
                                apollo: 'default',
                                port: 8080,
                            }
                            serviceParams = {...serviceParams, ...tempParams};
                        }
                        return this.operateIntance(serviceParams, resolve, reject);
                    }
                    return reject(result?.data);
                } catch(e) {
                    console.log('getAppInstances error===>',e);
                }
            })
        } catch(e) {
            console.log(e);
        }
    }
    async operateIntance(params, resolve, reject) {
        const reqUrl = `${panguConfig[this.curEnv]}/xx/xx/xx/instance/operate/`;
        const result = await Instance.request({
            url: reqUrl,
            method: 'post',
            data: params,
            headers: { Authorization: `Token ${this.token}` },
        })
        const status: boolean = result?.data?.code === 0;
        const msg: boolean = result?.data?.msg ==='success';
        if (status && msg) {
            const operation_id: number = result?.data?.detail.id;
            return resolve(operation_id);
        }
        return reject(result?.data);
    }
    async publishNebualResult(operation_id: number|string) {
        if (timer) {
            clearInterval(timer);
        }
        if (timeOut) {
            clearTimeout(timeOut);
        }
        return new Promise((resolve, reject) => {
            //增加超时处理
            timeOut = setTimeout(() => {
                clearInterval(timer);
                reject(false);
            },600000);
            // 轮循发布结果
            timer = setInterval(async () => {
                await (async () => {
                    try {
                        const result = await Instance.request({
                            url: `${panguConfig[this.curEnv]}/xx/xx/xx/operation/${operation_id}/`,
                            method: 'get',
                            headers: { Authorization: `Token ${this.token}` },
                        })
                        if (result?.data?.code === 0) {
                            const { status } = result?.data?.detail;
                            if (status === 'succeed' || status === 'skipped') {
                                clearInterval(timer);
                                resolve(true);
                            } else if (status !== 'running' && status!== 'new') {
                                clearInterval(timer);
                                reject(result?.data?.detail);
                            }
                        } else {
                            clearInterval(timer);
                            reject(result.data);
                        }
                    } catch(e) {
                        clearInterval(timer);
                        reject(e);
                    }
                })()
            }, 1500)
        })
    }

    async insertDomain(domain) {
        return new Promise(async (resolve, reject) => {
            try {
                const updateTime = setTimestamp(new Date());
                const params = {
                    appId: AppName[this.tenantId].appId,
                    branch: '',
                    domain,
                    envId: this.envid,
                    updateBy: this.operatorName,
                    updateTime: updateTime ? updateTime.replace(' ','T') : '',
                }
                const result = await Instance.request({
                    url: '',
                    method: 'post',
                    data: params,
                });
                const insertStatus: boolean = result?.data?.code === 0;
                const insertResult: boolean = result?.data?.result;
                if (insertStatus && insertResult) {
                    resolve(true);
                } else {
                    reject(result?.data);
                }
            } catch(e) {
                reject(e);
            }
        })
    }
}