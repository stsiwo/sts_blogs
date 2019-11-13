import { AxiosRequestConfig } from "axios";

export const apiConfig: AxiosRequestConfig = {
  baseURL: process.env.API1_URL,
  timeout: 5000,

}
