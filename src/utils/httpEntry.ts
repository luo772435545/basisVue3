import axios from "@/utils/http";
import { AxiosRequestConfig, AxiosResponse } from "axios";
const IS_PROD: boolean = ["production", "prod"].includes(process.env.NODE_ENV);
const prefix = IS_PROD ? "." : "/tms-service";

export const GET = (url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>> => {
  return axios.get(prefix + url, config);
};
export const POST = (url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>> => {
  return axios.post(prefix + url, data, config);
};
export const PUT = (url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>> => {
  return axios.put(prefix + url, data, config);
};
export const DELETE = (url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>> => {
  return axios.delete(prefix + url, config);
};
