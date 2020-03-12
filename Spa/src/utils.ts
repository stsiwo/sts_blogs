import { QueryStringType } from "requests/types";
const  uuidv4 = require('uuid/v4')
import { logger } from 'configs/logger';
import isEmpty from "lodash/isEmpty";
const log = logger("utils");


export const prettyConsole = (target: any): void => {
  var cache: any[] = []
  log(JSON.stringify(target, function(key, value) {
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

export function getTimeOneHourAfter() {
  var dt = new Date();
  dt.setHours( dt.getHours() + 1 )
  return dt.getTime()
}

/**
 * check two object has the same properties (could have different values for the same properties)
 *  - just check two object has same form (properties) or not
 **/
export function isSameObjectForm(a: object, b: object): boolean {
  let isSame = true
  Object.keys(a).forEach((key: string) => {
    if (!b.hasOwnProperty(key)) {
      isSame = false
    }
  })
  return isSame
}

export function transformObject<A extends object, B extends object>(original: A, destination: B): B {
  if (!isSameObjectForm(original, destination)) {
    
  }
  else return destination
}
