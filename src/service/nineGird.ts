import { Provide } from '@midwayjs/decorator';
import { AxiosBaseService } from './axiosBaseService';

const url = ''
@Provide('ApiMktingOpService')
export class ApiMktingOpService extends AxiosBaseService {

    async getHomePageConfig(activityType: number, callerType: number): Promise<any> {
        return await this.post(
            url,
            {
                activityType,
                callerType,
            }, true
        );
    }

    async marqueeShow(activityType: number): Promise<any> {
        return await this.post(
            url,
            {
                activityType,
            }, true
        );
    }

    async getUserAwardList(activityType: number): Promise<any> {
        return await this.post(
            url,
            {
                activityType,
            },
            true
        );
    }
    async getUserAwardList2( openId: string,
        identification: string): Promise<any> {
        return await this.post(
            url,
            {
                openId,
                identification
            },
            true
        );
    }
    async checkToken(): Promise<any> {
        return await this.post(
            url,  {},
            true
        );
    }
    async getProvinceCityAreaList(): Promise<any> {
        return await this.post(
            url,
            {},
            true
        );
    }
}
