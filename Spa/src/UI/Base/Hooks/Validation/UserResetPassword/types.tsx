import * as React from 'react'
import { UserResetPasswordType } from 'domain/user/UserType';
import { DomainValidationType, ValidationType } from '../types';

export declare type UseUserResetPasswordValidationStatusInputType = {
  domain: UserResetPasswordType
}

export declare type UseUserResetPasswordValidationStatusOutputType = {
  currentValidationError: ValidationType<UserResetPasswordType> 
  touch: (name: string) => void,
  validate: (field: string, value: string, context?: any) => void
  validationSummaryCheck: () => boolean
}
