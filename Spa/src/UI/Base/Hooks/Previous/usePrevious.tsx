import { UsePreviousInput } from "./types";
import * as React from "react";
import { logger } from 'configs/logger';
const log = logger("usePrevious");

export const usePrevious = <S extends any>(input: UsePreviousInput<S>): S => {

  const ref = React.useRef<S>();

  React.useEffect(() => {
    ref.current = input.value
  }, [input.value])

  return ref.current as S
}

