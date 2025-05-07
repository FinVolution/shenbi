import { IBaseResult, IHomeProperties } from '../interface/nineGird';

import { post, get } from '../utils/request';

export const marqueeShow = async (params: {
    activityType: number;
}): Promise<{ data: IBaseResult<IHomeProperties> }> => {
    return await post('/invoper/physicalActivityService/marquee', params, true);
};

export const queryHomeData = async (params: {
    activityType: number;
}): Promise<{ data: IBaseResult<IHomeProperties> }> => {
    return await post('/invoper/physicalActivityService/homeData', params, true);
};

export const choiceAward = async (params: {
    activityType: number;
    awardKey: string;
    addressId?: string;
}): Promise<{ data: IBaseResult<IHomeProperties> }> => {
    return await post('/invoper/physicalActivityService/choiceAward', params, true);
};

export const bindingAddress = async (params: {
    activityType: number;
    addressId: number;
    recordId: number;
}): Promise<{ data: IBaseResult<IHomeProperties> }> => {
    return await post('/invoper/physicalActivityService/bindingAddress', params, true);
};

export const receiveAward = async (params: {
    activityType: number;
    recordId: number;
}): Promise<{ data: IBaseResult<IHomeProperties> }> => {
    return await post('/invoper/physicalActivityService/receiveAward', params, true);
};
