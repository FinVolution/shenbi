// @ts-nocheck
import axios from 'axios'
import { IPageConfigResult } from '../interface/home'
import { getCookie } from '@/utils/util'
import {
  IBaseResult,
  IHomeProperties
} from "../interface/nineGird"

export const instance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  timeout: 20000,
  validateStatus: function (status: Number) {
    return true
  },
  withCredentials: true
});

export const getConfigProduction = async (
  projectId: String
): Promise<{ data: IPageConfigResult }> => {
  const productId = getCookie('productId')
  const projectIdTag = getCookie('projectIdTag')
  let res = null
  if (productId && projectIdTag) {
    console.log('命中版本', productId, projectIdTag)
    res = await instance.post('/api/acp/projectService/query', {
      projectId: projectIdTag
    });
  } else {
    console.log('命中版本', productId, projectIdTag)
    res = await instance.post('/api/acp/projectService/query', {
      projectId
    });
  }
  return res
};

export const getHomePageConfig = async (
  activityType: number,
  callerType: number
): Promise<{ data: IBaseResult<IHomeProperties> }> => {
  const res = await instance.post("/api/mktop/turntableService/homeData", {
    activityType,
    callerType,
  });
  return res
};

export const getConfigPreview = async (
  params: { projectId: String, preId: String }
): Promise<{ data: IPageConfigResult }> => {
  const productId = getCookie('productId')
  if (productId) {
    console.log('命中版本', productId)
  } else {
    console.log('命中版本', productId)
  }
  return await instance.post('/api/acp/projectService/preview', params);
};

export const wxShare = async (): Promise<any> => {
  const res = await instance.get(`/jssdk/init?url=${encodeURIComponent(window.location.href)}`);
  return res.data
};
