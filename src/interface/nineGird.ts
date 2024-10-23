export interface IApiMktingOpService {
  getHomePageConfig: (activityType: number, callerType: number) => Promise<any>;
  getUserAwardList: (activityType: number) => Promise<any>;
  getUserAwardList2: (openId: string, identification: string) => Promise<any>;
  getProvinceCityAreaList: () => Promise<any>;
  checkToken: () => Promise<any>;
}
