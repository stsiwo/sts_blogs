import * as React from 'react';
import { logger } from 'configs/logger';
import { usePrevious } from 'Hooks/Previous/usePrevious';
const log = logger("Test");


const Test: React.FunctionComponent<{}> = (props: {}) => {

  /**
   * test react component & hook flow
   **/
  log("before useEffect")

  const [curState, setState] = React.useState<{ test: number, test1: number }>({ test: 1, test1: 1 })

  const mockPromise: (v: number, v1: number) => void = (v, v1) => {
    new Promise((res) => {
      log("inside Promise")
      res({ v: v, v1: v1 })
    })
      .then((data: { v: number, v1: number }) => {
        log("before setState")
        setState(prev => ({
          ...prev,
          test: data.v,
          test1: data.v1
        }))

      })
  }

  const eh: React.EventHandler<React.MouseEvent<HTMLElement>> = (e) => {

    log("before mockPromise")
    mockPromise(2, 2)
    mockPromise(3, 3)
    log("after mockPromise")
  }

  return (
    <section className="content-wrapper">
      <button onClick={eh} >ClickMe</button>
    </section>
  );
}

export default Test;

