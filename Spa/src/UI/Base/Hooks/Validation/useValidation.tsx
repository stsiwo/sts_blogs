import * as React from 'react'
import { UseValidationStatusInputType, UseValidationStatusOutputType, DomainValidationType, DomainInputTouchedType } from './types';
import * as yup from 'yup'

const createInitialValidationError = <D extends object = {}>(domain: D): DomainValidationType<D> => {
  return Object.keys(domain).reduce((pre: DomainValidationType<D>, cur: string) => {
    pre[cur as keyof DomainValidationType<D>] = ''
    return pre
  }, {}) as DomainValidationType<D>
}

const createInitialInputTouchedError = <D extends object = {}>(domain: D): DomainInputTouchedType<D> => {
  return Object.keys(domain).reduce((pre: DomainInputTouchedType<D>, cur: string) => {
    pre[cur as keyof DomainInputTouchedType<D>] = false 
    return pre
  }, {}) as DomainInputTouchedType<D>
}

export const useValidation = <D extends object>(input: UseValidationStatusInputType<D>): UseValidationStatusOutputType<D> => {

  const initialValidationError = createInitialValidationError<D>(input.domain)
  const initialInputTouched = createInitialInputTouchedError<D>(input.domain)

  // should provide initial value #DOUBT
  const [currentValidationError, setValidationError] = React.useState<DomainValidationType<D>>(initialValidationError)
  const [currentInputTouched, setInputTouched] = React.useState<DomainInputTouchedType<D>>(initialInputTouched)

  // make a specific input touch to true
  const touch: (name: string) => void = (name) => {
    currentInputTouched[name as keyof DomainInputTouchedType<D>] = true
    setInputTouched({
      ...currentInputTouched
    })
  }

  // validate function for before submit button
  const validate: () => Promise<void> = () => {
    return input.schema.validate(input.domain, {
      abortEarly: false
    })
      .then(async () => {
        return Promise.resolve()
      })
      .catch((error: yup.ValidationError) => {
        console.log('validation failed')
        console.log(error)
        error.inner.forEach((eachError: yup.ValidationError) => {
          currentValidationError[eachError.path as keyof D] = eachError.message
        })
        setValidationError({
          ...currentValidationError
        })
        return Promise.reject(error)
      })
  }

  // lifecycle: every time 'currentValidationError' and 'currentInputTouch' changes, run this one
  React.useEffect(() => {
    function validateFormInput() {
      input.schema
        .validate(input.domain, {
          abortEarly: false
        })
        .then(() => {
          console.log('validation passed')
          setValidationError({
            ...initialValidationError
          })
        })
        .catch((error: yup.ValidationError) => {
          console.log('validation error detected')
          console.log(error)
          // clear all of error message first
          for (let key in currentValidationError)
            delete currentValidationError[key as keyof DomainValidationType<D>]
          // assign new error message 
          error.inner.forEach((eachError: yup.ValidationError) => {
            if (currentInputTouched[eachError.path as keyof DomainInputTouchedType<D>])
              currentValidationError[eachError.path as keyof DomainValidationType<D>] = eachError.message
          })
          setValidationError({
            ...currentValidationError
          })
        })
    }
    console.log('validating input.... should be called only mount and when input is updated')
    validateFormInput()
    return () => {
    };
  }, [
      ...Object.keys(input.domain).map(key => input.domain[key as keyof D]),
      ...Object.keys(currentInputTouched).map(key => currentInputTouched[key as keyof DomainInputTouchedType<D>]),
      // for update when input focus
    ]);

  return {
    currentValidationError: currentValidationError,
    touch: touch,
    validate: validate,
  }
}



