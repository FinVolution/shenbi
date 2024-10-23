export interface UploadParams {
    fileExtension?: string,
    file: File,
    appId: string,
    ext?: string,
}

export interface ICommonApiService {
    upload: (params: UploadParams) => Promise<any>;
}