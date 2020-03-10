import * as React from 'react'
import { ForgotPasswordType } from 'domain/user/UserType';
import { DomainValidationType, ValidationType, InputTouchedType } from '../types';

export declare type UseForgotPasswordValidationStatusInputType = {
  domain: ForgotPasswordType
}

export declare type UseForgotPasswordValidationStatusOutputType = {
  currentValidationError: ValidationType<ForgotPasswordType> 
  touch: (name: string) => void,
  validate: (field: string, value: any, context?: any) => void
  validationSummaryCheck: () => boolean
  currentTouch: InputTouchedType<ForgotPasswordType>
}
