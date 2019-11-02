import { QueryStringType } from "./requests/types";

export const prettyConsole = (target: any): void => {
  var cache: any[] = []
  console.log(JSON.stringify(target, function(key, value) {
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

export const buildQueryString = (queryStringObject: QueryStringType): string => {
  const esc = encodeURIComponent
  return '?' + Object.keys(queryStringObject)
    .map(key => esc(key) + '=' + esc(queryStringObject[key]))
    .join('&')
}
