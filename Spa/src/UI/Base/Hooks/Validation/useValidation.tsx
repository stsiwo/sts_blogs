import * as React from 'react'
import { UseValidationStatusInputType, UseValidationStatusOutputType, DomainValidationType, DomainInputTouchedType, ValidationType, InputTouchedType, SubmitInputTouchedType } from './types';
import * as yup from 'yup'
import { UserSignupType } from 'domain/user/UserType';
import { logger } from 'configs/logger';
const log = logger("hook:useValidation");


const createInitialValidationError = <D extends object = {}>(domain: D): ValidationType<D> => {
  const initialValidationError = Object.keys(domain).reduce<DomainValidationType<D>>((pre: DomainValidationType<D>, cur: string) => {
    pre[cur as keyof DomainValidationType<D>] = ''
    return pre
  }, {} as DomainValidationType<D>) as ValidationType<D>

  initialValidationError.submit = ''
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

  // make a specific input touch to true
  const touch: (name: keyof D | keyof SubmitInputTouchedType) => void = (name) => {
    setInputTouched({
      ...currentInputTouched,
      [name]: true
    })
  }

  // validate function for before submit button
  const validate: () => Promise<void> = () => {
    return input.schema.validate(input.domain, {
      abortEarly: false
    })
      .then(async () => {
        log('validation success')
        return Promise.resolve()
      })
      .catch((error: yup.ValidationError) => {
        log('validation failed')
        log(error)
        error.inner.forEach((eachError: yup.ValidationError) => {
          currentValidationError[eachError.path as keyof ValidationType<D>] = eachError.message as ValidationType<D>[keyof D]
        })
        currentValidationError.submit = 'please fix validation errors before submit'
        setValidationError({
          ...currentValidationError
        })
        return Promise.reject()
      })
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
          for (let key in currentValidationError)
            delete currentValidationError[key as keyof DomainValidationType<D>]
          // assign new error message 
          error.inner.forEach((eachError: yup.ValidationError) => {
            if (currentInputTouched[eachError.path as keyof DomainInputTouchedType<D>])
              currentValidationError[eachError.path as keyof DomainValidationType<D>] = eachError.message as ValidationType<D>[keyof D]
          })
          if (currentInputTouched.submit) currentValidationError.submit = 'please fix validation errors before submit'
          setValidationError({
            ...currentValidationError
          })
        })
    }
    log('validating input.... should be called only mount and when input is updated')
    log(input.domain)
    validateFormInput()
    return () => {
    };
  }, [
      /** object comparison is more preferable over array **/
      JSON.stringify(input.domain),
      JSON.stringify(currentInputTouched)
      //...Object.keys(input.domain).map(key => input.domain[key as keyof D]),
      //...Object.keys(currentInputTouched).map(key => currentInputTouched[key as keyof DomainInputTouchedType<D>]),
      // for update when input focus
    ]);

  return {
    currentValidationError: currentValidationError,
    touch: touch,
    validate: validate,
  }
}



