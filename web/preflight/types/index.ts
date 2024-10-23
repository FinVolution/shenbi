export interface BaseResponse<T> {
    Result: number;
    ResultMessage: string;
    Content: T;
    CodeMsg: string;
}
