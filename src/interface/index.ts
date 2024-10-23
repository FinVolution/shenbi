export interface Params {
    "tenantId": string
    "projectId": number,
    "preId": number,
    "envId": string,
    "operatorId": number,
    "operatorName": string,
    "operatorToken": string,
}

export interface buildResultParams {
    status: number, // 构建状态 1则为成功，非1则为失败
    imageName?: string, // 构建产物名称，若status非1则不传
    message: string, // 构建结果信息
    jobName: string,    //  构建任务名称
    environment: string,    //  环境信息
    virtualSiteName: string, // 虚拟站点名称
    operatorToken: string,  // cas token
}
export interface getNebulaEnvsParams {
    applicant: string, //操作人姓名
}
export interface IApiService {
    configProduction: (projectId: string) => Promise<any>
    configPreview: (params: { projectId: string, preId: string }) => Promise<any>
    wxShare: () => Promise<any>;
    pushStatus: (params: Object) => Promise<any>
    ssrTo: ({projectId, pageId}) => Promise<any>;
    Render: (param: any) => Promise<any>;
    hs: () => Promise<any>;
}

export interface pushStatusBody {
    operatorId?: number,//操作人id
    operatorName?: string,//操作人姓名
    preId?: number,//发布编号id
    projectId: number,//项目id
    status: 1|3,//1-发布成功 3-发布失败
}
