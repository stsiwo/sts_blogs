import { UseKeyupListenerInput } from "./types";
import * as React from "react";
import { logger } from 'configs/logger';
const log = logger("useKeyupListener");

export const useKeyupListener = (input: UseKeyupListenerInput): void => {
  
  React.useEffect(() => {

    function handleSubmitEnterKeyupEvent(e: KeyboardEvent) {
      log('subscribe auto key up event listener')
      if (e.key === input.keyType) {
        log('"enter" is entered')
        input.listener()
      }
    }

    document.addEventListener<'keyup'>('keyup', handleSubmitEnterKeyupEvent)
    return () => {
      document.removeEventListener<'keyup'>('keyup', handleSubmitEnterKeyupEvent)
    }

  })

}
