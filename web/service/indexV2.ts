import { IPageConfigResult } from '../interface/home'
import {
  IBaseResult,
  IHomeProperties
} from "../interface/nineGird"
import { post, get } from '../utils/request'
export const getConfigProduction = async (
  projectId: String, tenantId: String
): Promise<{ data: IPageConfigResult }> => {
  return await post('/xx/xx/query', {
    projectId: projectId
  }, false, {});
};

export const getHomePageConfig = async (
  activityType: number,
  callerType: number,
): Promise<{ data: IBaseResult<IHomeProperties> }> => {
  const res = await post("/xx/xx/homeData", {
    activityType,
    callerType,
  });
  return res
};

export const getConfigPreview = async (
  params: { projectId: String, preId: String, tenantId: String }
): Promise<{ data: IPageConfigResult }> => {
  return await post('/acp/projectService/preview', params, false, { });
};

export const wxShare = async (): Promise<any> => {
  const res = await get(`/xx/xx?url=${encodeURIComponent(window.location.href)}`);
  return res.data
};