import { AxiosRequestConfig } from "axios";

export const apiConfig: AxiosRequestConfig = {
  baseURL: process.env.API1_URL,
  timeout: 5000,
  // work like middleware between client and backend about response
  // can transform response data (json) 
  transformResponse: function (data) {
    return JSON.parse(data, (key: string, value: any) => {
      if (key === 'createdDate') {
        return new Date(value)
      }
      return value
    });
  },

}
