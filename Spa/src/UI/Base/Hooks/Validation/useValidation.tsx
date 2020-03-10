import * as React from 'react'
import { UseValidationStatusInputType, UseValidationStatusOutputType, DomainValidationType, DomainInputTouchedType, ValidationType, InputTouchedType, SubmitInputTouchedType } from './types';
import * as yup from 'yup'
import { UserSignupType } from 'domain/user/UserType';
import { logger } from 'configs/logger';
import cloneDeep = require('lodash/cloneDeep');
import { usePrevious } from 'Hooks/Previous/usePrevious';
const log = logger("hook:useValidation");


const createInitialValidationError = <D extends object = {}>(domain: D): ValidationType<D> => {
  const initialValidationError = Object.keys(domain).reduce<DomainValidationType<D>>((pre: DomainValidationType<D>, cur: string) => {
    pre[cur as keyof DomainValidationType<D>] = ''
    return pre
  }, {} as DomainValidationType<D>) as ValidationType<D>

  initialValidationError.submit = ''
  initialValidationError.confirmTriggerCounter = 0
  return initialValidationError as ValidationType<D>
}

const createInitialInputTouchedError = <D extends object = {}>(domain: D): InputTouchedType<D> => {
  const initialInputTouched = Object.keys(domain).reduce<DomainInputTouchedType<D>>((pre: DomainInputTouchedType<D>, cur: string) => {
    pre[cur as keyof DomainInputTouchedType<D>] = false
    return pre
  }, {} as DomainInputTouchedType<D>) as InputTouchedType<D>

  initialInputTouched.submit = false
  return initialInputTouched as InputTouchedType<D>
}

export const useValidation = <D extends object>(input: UseValidationStatusInputType<D>): UseValidationStatusOutputType<D> => {

  const initialValidationError = createInitialValidationError<D>(input.domain)
  const initialInputTouched = createInitialInputTouchedError<D>(input.domain)

  // should provide initial value #DOUBT
  const [currentValidationError, setValidationError] = React.useState<ValidationType<D>>(initialValidationError)
  const [currentInputTouched, setInputTouched] = React.useState<InputTouchedType<D>>(initialInputTouched)
  const isInitialMount = React.useRef<boolean>(true);
  const previousDomain = usePrevious({ value: input.domain })

  // make a specific input touch to true
  const touch: (name: keyof D | keyof SubmitInputTouchedType) => void = (name) => {
    setInputTouched({
      ...currentInputTouched,
      [name]: true
    })
  }

  // validate for a specific field; use when onChange of field at domain component
  const validate: (path: string, domain: D) => Promise<void> = (path, domain) => {
    return input.schema.validateAt(path, domain, {
      abortEarly: false
    })
      .then(async () => {
        log('validation success')
        setValidationError({
          ...currentValidationError,
          [path]: "",
          ...( path === 'password' && { confirmTriggerCounter: ++currentValidationError.confirmTriggerCounter })
        })
        return Promise.resolve()
      })
      .catch(async (error: yup.ValidationError) => {
        log('validation failed')
        const tmpValidationError = cloneDeep(currentValidationError)
        // use 'error.inner' array to pick the LAST error message as representitive
        tmpValidationError[error.inner[error.inner.length -1].path as keyof DomainValidationType<D>] = error.inner[error.inner.length - 1].message as unknown as any // typescript bug again
        if (error.path === 'password') tmpValidationError.confirmTriggerCounter++
        log(error)
        log(tmpValidationError)
        setValidationError({
          ...tmpValidationError

        })
        return Promise.resolve()
      })
  }

  /**
   * check all fields pass the validation
   *
   * @return (boolean) true if passed validation of all field otherwise false
   **/
  const validationSummaryCheck: () => boolean = () => {
    log("start validationSummaryCheck")
    let isPassed: boolean = true
    Object.keys(currentValidationError).forEach((key: string) => {
      if (key !== 'submit' && input.domain.hasOwnProperty(key) && currentValidationError[key as keyof D] !== "") {
        log("validation error detected at " + key + " with " + currentValidationError[key as keyof D])
        isPassed = false
      }
    })

    log("isPassed: " + isPassed)
    // touch all fields
    log("touch all fields")
    const tmpInputTouch = cloneDeep(currentInputTouched)
    Object.keys(tmpInputTouch).forEach((key: string) => {
      const propertyName = key as keyof InputTouchedType<D>
      /**
       * wierd bug: Type 'true' is not assignable to type '(InputTouchedType<D>[keyof D] & false) | (InputTouchedType<D>[keyof D] & true)'.
       * - so use 'as unknown as any' hack
       **/
      tmpInputTouch[propertyName] = true as unknown as any  // wierd bug  
    })
    setInputTouched({
      ...tmpInputTouch
    })
    // set 'submit' message if isPassed is false
    let submitMessage = ''
    if (!isPassed) submitMessage = "please fix validation errors before submit"

    setValidationError((prev: ValidationType<D>) => ({
      ...prev,
      submit: submitMessage
    }))

    return isPassed
  }

  // lifecycle: every time 'currentValidationError' and 'currentInputTouch' changes, run this one
  React.useEffect(() => {
    function validateFormInput() {
      input.schema
        .validate(input.domain, {
          abortEarly: false,
        })
        .then(() => {
          log('validation passed')
          setValidationError({
            ...initialValidationError
          })
        })
        .catch((error: yup.ValidationError) => {
          log('validation error detected')
          log(error)
          // clear all of error message first
          //for (let key in currentValidationError)
          // delete currentValidationError[key as keyof DomainValidationType<D>]
          // assign new error message 
          const tempValidationError = cloneDeep(currentValidationError)
          error.inner.forEach((eachError: yup.ValidationError) => {
            tempValidationError[eachError.path as keyof DomainValidationType<D>] = eachError.message as ValidationType<D>[keyof D]
          })
          log(tempValidationError)
          //if (currentInputTouched.submit) currentValidationError.submit = 'please fix validation errors before submit'
          setValidationError({
            ...tempValidationError
          })
        })
    }
    if (isInitialMount.current) {
      // initial mount
      log('componentDidMount')
      validateFormInput()
      isInitialMount.current = false
    } else {
      log("componentDidUpdate")
      // when update
      // check current domain has changed or not
      Object.keys(input.domain).forEach((key: string) => {
        if (input.domain[key as keyof D] !== previousDomain[key as keyof D]) {
          log("identify the key which is different from previous value: " + key)
          validate(key, input.domain)
        }
      })
    }
    return () => {
    };
  }, [
      /** object comparison is more preferable over array **/
      JSON.stringify(input.domain),
      //JSON.stringify(currentInputTouched)
      //...Object.keys(input.domain).map(key => input.domain[key as keyof D]),
      //...Object.keys(currentInputTouched).map(key => currentInputTouched[key as keyof DomainInputTouchedType<D>]),
      // for update when input focus
    ]);

  return {
    currentValidationError: currentValidationError,
    touch: touch,
    currentTouch: currentInputTouched,
    validate: validate,
    validationSummaryCheck: validationSummaryCheck,
  }
}



