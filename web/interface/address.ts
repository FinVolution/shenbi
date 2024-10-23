export interface IBaseAddressResult<T> {
  ret: number;
  data: T;
  msg: string;
}

export interface IItemProperties<T> {
  code: string;
  name: string;
  children: T[];
}
