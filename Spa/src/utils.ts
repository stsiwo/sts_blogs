import { QueryStringType } from "requests/types";
import isEmpty = require('lodash/isEmpty');
const  uuidv4 = require('uuid/v4')
var debug = require('debug')('utils')


export const prettyConsole = (target: any): void => {
  var cache: any[] = []
  debug(JSON.stringify(target, function(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
            // Duplicate reference found, discard key
            return;
        }
        // Store value in our collection
        cache.push(value);
    }
    return value;
}, 2));
  cache = null
}

export const dateFormatOption =  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}

export const buildQueryString = (queryStringObject: QueryStringType = {}): string => {

  if (isEmpty(queryStringObject)) return ''

  return '?' + Object.keys(queryStringObject)
    .filter(key => queryStringObject[key] !== null && queryStringObject[key] !== undefined && queryStringObject[key].lenth != 0 && queryStringObject[key] != '')
    .map(key => key + '=' + queryStringObject[key])
    .join('&')
}

export const generateBlogContentPublicImageUrl = (userId: string, imageName: string): URL => {
  return new URL(PUBLIC_IMAGE_PATH + userId + '/' + imageName, API1_URL)
}

export const generateBlogContentPublicImagePath = (userId: string, imageName: string): string => {
  return PUBLIC_IMAGE_PATH + userId + '/' + imageName;
}

export function getCookie(name: string): string {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  else return null;
}

export function generateFileWithUuidv4(targetFile: File) {
  var blob: Blob = targetFile.slice(0, targetFile.size, targetFile.type)
  return new File([blob], targetFile.name.replace(/.*(?=\.)/, uuidv4()), { type: targetFile.type })
}

export function getUuidv4() {
  return uuidv4()
}
