import {
    IBaseResult,
    IBaseArrayResult,
} from "../interface/fd";

import { post, get } from '../utils/request'

export const landingPageReport = async (params: any): Promise<{ data: IBaseResult<Boolean> }> => {
    return await post("/xpfsapp/deliverModel/landingPageReport", { ...params }, false);
};
export const getHouseOrderList = async (params: any): Promise<{ data: IBaseArrayResult<any> }> => {
    return await post("/mortgageService/trafficPlatformDock/getHouseOrderList", {
    }, true);
};
export const loanApplyByDeliver = async (
    params: any
): Promise<{ data: IBaseArrayResult<any> }> => {
    return await post("/mortgageService/trafficPlatformDock/loanApplyByDeliverV2", {
        ...params,
    }, true);
};
export const merchantLoanApplyByDeliver = async (
    params: any
): Promise<{ data: IBaseArrayResult<any> }> => {
    return await post("/mortgageService/trafficPlatformDock/deliverForStore", {
        ...params,
    }, true);
};
export const getOrderStatusV3 = async (
    params: any
): Promise<{ data: IBaseArrayResult<any> }> => {
    return await post("/mortgageService/trafficPlatformDock/getOrderStatusV3", { ...params }, true);
};
export const getCustomerLink = async (
    params: any
): Promise<{ data: IBaseArrayResult<any> }> => {
    return await post("/xpfsapp/externalContact/getCustomerLink", { ...params }, true);
};
