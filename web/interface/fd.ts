export interface IBaseResult<T> {
  Result: number;
  ResultMessage: any;
  Content: T;
  CodeMsg: string;
}
export interface IBaseArrayResult<T> {
  Result: number;
  ResultMessage: any;
  Content: T[];
  CodeMsg: string;
}

export interface IHomeProperties {
  isMobile: boolean;
  isOldCustomer: boolean;
  isMobileTitle: boolean;
  availableOpportunity: number;
}

export interface ITurntableProperties {
  awardInfo: any;
  remainOpportunity: number;
}