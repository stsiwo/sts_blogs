import { CacheData } from './types'
var debug = require('debug')('ui:getCachedData')

function deserialize(serializedJavascript: string){
  /**
   * eval: check string and convert js code or object
   **/
  return eval('(' + serializedJavascript + ')');
}

/**
 * return cached data if available otherwise return null.
 *  - availablities:
 *  - cache exists in localstorage
 *  - cache before expireAt
 **/
export function getCachedData(path: string) {
  debug("getCachedData is called with path: " + path)
  const cache: CacheData = deserialize(localStorage.getItem(path))

  debug("content of cache")
  debug(cache)
  if (cache) {
    debug("cache.expireAt > Date.now()")
    debug(cache.expireAt > Date.now())
    if (cache.expireAt > Date.now()) {
      debug("before expire")
      return cache.data
    }
  }
  return null
}
