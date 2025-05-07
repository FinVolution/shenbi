import { post } from '../../utils/request';

const ACTIVITY_TYPE = 1234;

export const homeDataPre = async () => {
  const url = `/invoper/goldenEggs/homeData`;
  return await post(url, { activityType: ACTIVITY_TYPE }, true);
}
export const queryCouponV2 = async () => {
  const url = `/invoper/commonLoginService/queryCouponV2`;
  return await post(url, { activityType: ACTIVITY_TYPE }, true);
}
