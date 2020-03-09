import * as React from 'react'
import { UserSignupType } from 'domain/user/UserType';
import { DomainValidationType, ValidationType, InputTouchedType } from '../types';

export declare type UseUserSignupValidationStatusInputType = {
  domain: UserSignupType
}

export declare type UseUserSignupValidationStatusOutputType = {
  currentValidationError: ValidationType<UserSignupType> 
  touch: (name: string) => void,
  currentTouch: InputTouchedType<UserSignupType>,
  validate: (field: string, value: any, context?: any) => void
  validationSummaryCheck: () => boolean
}
