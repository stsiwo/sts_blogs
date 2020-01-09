import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { ErrorResponseDataType } from "requests/types";

export const apiConfig: AxiosRequestConfig = {
  baseURL: API1_URL,
  timeout: 5000,
  // work like middleware between client and backend about response
  // can transform response data (json) 
  transformResponse: function (data) {
    return JSON.parse(data, (key: string, value: any) => {
      if (key === 'createdDate') {
        return new Date(value)
      }
      // TODO: need to distinguish blog content and comment content
      if (key === 'content' && value) {
        return JSON.parse(value)
      }
      // convert list to set (tags
      if (key === 'tags') {
        return new Set(value) 
      }
      return value
    });
  },
  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: true, // default

}

