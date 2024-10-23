import {
  IBaseResult,
  IHomeProperties,
  IAwardProperties,
  IBaseArrayResult,
  ITurntableProperties
} from "../interface/nineGird";

import { post,get } from '../utils/request'

export const getHomePageConfig = async (
  activityType: number,
  callerType: number
): Promise<{ data: IBaseResult<IHomeProperties> }> => {
  return await post("/mktop/turntableService/homeData", {
    activityType,
    callerType
  },true);
};

export const getUserAwardList = async (
  activityType: number
): Promise<{ data: IBaseArrayResult<IAwardProperties> }> => {
  return await post("/mktop/turntableService/getUserAwardList", {
    activityType,
  });
};

export const marqueeShow = async (
  activityType: number
): Promise<{ data: IBaseArrayResult<any> }> => {
  return await post("/mktop/turntableNoneService/marqueeShow", {
    activityType,
  });
};

export const jobListData = async (
  activityType: number
): Promise<{ data: IBaseArrayResult<any> }> => {
  return await post("/invoper/festival/taskList", {
    activityType,
  });
};

export const taskSubmit = async (
  params: object
): Promise<{ data: IBaseArrayResult<any> }> => {
  return await post("/invoper/redRain/taskSubmit", {
    activityType: params.activityType,
    taskId: params.taskId,
  });
};

export const turntableLottery = async (
  activityType: number
): Promise<{ data: IBaseResult<ITurntableProperties> }> => {
  return await post("/mktop/turntableService/turntableLottery", {
    activityType,
  },true);
};