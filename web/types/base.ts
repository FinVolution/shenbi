
interface Params<T> {
    state: T;
    commit: any;

}

interface BaseResponse<T> {
    Result: number;
    ResultMessage: string;
    Content: T;
    CodeMsg?: string;
}
export { Params, BaseResponse }