import { Provide, Inject } from '@midwayjs/decorator';
import { Context } from 'egg';
import axios from 'axios';
// import { getCookie } from '@/src/utils/util';
import { uploadKey } from '../utils/const';
// import { UploadParams } from '../interface/api'
import { setTimestamp } from "../utils/httpErrorHandle";
// import Multipart from './baseService/Multipart';
const Instance = axios.create({
    baseURL: '',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    }
})

@Provide('CommonApiService')
export class CommonApiService {
    @Inject()
    ctx: Context

    async upload(params) {
        try {
            return new Promise(async(resolve, reject) => {
                const { fileExtension, appId, file, ext } = params;
                const sign = uploadKey
                const reqParams = {
                    ...(fileExtension?{fileExtension: fileExtension}:{}),
                    uploadTime: setTimestamp(new Date(), false),
                    appid: appId,
                    file,
                    ...(ext?{ext}:{}),
                    sign
                }
                console.log('reqParams===>',reqParams)
                const result: any = await Instance.post('', reqParams, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                console.log('response===>',result.data)
                return resolve(result.data)
            })
        } catch(error) {
              console.log(error, 'upload error');
        }
    }
}