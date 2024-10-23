export interface IApiServiceV2 {
    configProduction: (projectId: string, tenantId: string) => Promise<any>
    configPreview: (params: {tenantId: string, projectId: string, preId: string}) => Promise<any>
    wxShare: () => Promise<any>
    hs: () => Promise<any>
}