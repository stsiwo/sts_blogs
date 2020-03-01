import * as React from 'react'
import { ForgotPasswordType } from 'domain/user/UserType';
import { DomainValidationType, ValidationType } from '../types';

export declare type UseForgotPasswordValidationStatusInputType = {
  domain: ForgotPasswordType
}

export declare type UseForgotPasswordValidationStatusOutputType = {
  currentValidationError: ValidationType<ForgotPasswordType> 
  touch: (name: string) => void,
  validate: () => Promise<void>
}
