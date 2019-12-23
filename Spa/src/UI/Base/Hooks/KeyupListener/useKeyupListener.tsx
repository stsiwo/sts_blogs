import { UseKeyupListenerInput } from "./types";
import * as React from "react";
var debug = require('debug')('ui:KeyupListener')

export const useKeyupListener = (input: UseKeyupListenerInput): void => {
  
  React.useEffect(() => {

    function handleSubmitEnterKeyupEvent(e: KeyboardEvent) {
      debug('subscribe auto key up event listener')
      if (e.key === input.keyType) {
        debug('"enter" is entered')
        input.listener()
      }
    }

    document.addEventListener<'keyup'>('keyup', handleSubmitEnterKeyupEvent)
    return () => {
      document.removeEventListener<'keyup'>('keyup', handleSubmitEnterKeyupEvent)
    }

  })

}
