import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { ErrorResponseDataType } from "requests/types";
import { logger } from "./logger";
const log = logger("apiConfig");

export const apiConfig: AxiosRequestConfig = {
  baseURL: API1_URL,
  timeout: 30000, // default 30 sec
  // work like middleware between client and backend about response
  // can transform response data (json) 
  transformResponse: function(data) {
    log("start transforming response at middleware")
    if (data) {
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
    }
    return data
  },
  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: true, // default

}

