import { QueryStringType } from "requests/types";
import isEmpty = require('lodash/isEmpty');
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
  return new URL(process.env.PUBLIC_IMAGE_PATH + userId + '/' + imageName, process.env.API1_URL)
}
