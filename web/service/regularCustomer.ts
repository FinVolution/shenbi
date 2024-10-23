import { IBaseResult, IHomeProperties } from '../interface/nineGird';

import { post, get } from '../utils/request';

// 老客实物-跑马灯接口–需要登录
export const marqueeShow = async (params: {
    activityType: number;
}): Promise<{ data: IBaseResult<IHomeProperties> }> => {
    return await post('/invoper/physicalActivityService/marquee', params, true);
};

// 老客实物-首页接口–需要登录
export const queryHomeData = async (params: {
    activityType: number;
}): Promise<{ data: IBaseResult<IHomeProperties> }> => {
    return await post('/invoper/physicalActivityService/homeData', params, true);
};

// 老客实物-选择礼品接口–需要登录
export const choiceAward = async (params: {
    activityType: number;
    awardKey: string;
    addressId?: string;
}): Promise<{ data: IBaseResult<IHomeProperties> }> => {
    return await post('/invoper/physicalActivityService/choiceAward', params, true);
};

// 老客实物-绑定地址接口–需要登录
export const bindingAddress = async (params: {
    activityType: number;
    addressId: number;
    recordId: number;
}): Promise<{ data: IBaseResult<IHomeProperties> }> => {
    return await post('/invoper/physicalActivityService/bindingAddress', params, true);
};

// 老客实物-领取礼品接口–需要登录
export const receiveAward = async (params: {
    activityType: number;
    recordId: number;
}): Promise<{ data: IBaseResult<IHomeProperties> }> => {
    return await post('/invoper/physicalActivityService/receiveAward', params, true);
};

// 查询用户实物收货地址列表
export const queryShippingAddressList = async (batchNo: string) => {
    const url = `/market/address/queryShippingAddressList?appId=1000003401&batchNo=${batchNo}`;
    return await get(url, true);
};
