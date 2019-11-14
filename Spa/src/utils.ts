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

  const esc = encodeURIComponent
  return '?' + Object.keys(queryStringObject)
    .filter(key => queryStringObject[key] !== null && queryStringObject[key] !== undefined && queryStringObject[key].lenth != 0 && queryStringObject[key] != '')
    .map(key => esc(key) + '=' + esc(queryStringObject[key]))
    .join('&')
}
