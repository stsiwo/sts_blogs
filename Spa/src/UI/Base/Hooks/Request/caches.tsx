import { CacheData } from './types'
import { logger } from 'configs/logger';
const log = logger("getCachedData");

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
  log("getCachedData is called with path: " + path)
  const cache: CacheData = deserialize(localStorage.getItem(path))

  log("content of cache")
  log(cache)
  if (cache) {
    log("cache.expireAt > Date.now()")
    log(cache.expireAt > Date.now())
    if (cache.expireAt > Date.now()) {
      log("before expire")
      return cache.data
    }
  }
  return null
}
