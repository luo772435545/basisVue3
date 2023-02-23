export interface ResponseResult<T = any, U = any> {
  code: number;
  datas: T;
  message: string;
  others: U;
  success: boolean;
}

declare module "axios" {
  interface AxiosResponse<T = any> extends ResponseResult {}
}
