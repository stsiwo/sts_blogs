import * as React from 'react'
import { UserSignupType } from 'domain/user/UserType';
import { DomainValidationType, ValidationType } from '../types';

export declare type UseUserSignupValidationStatusInputType = {
  domain: UserSignupType
}

export declare type UseUserSignupValidationStatusOutputType = {
  currentValidationError: ValidationType<UserSignupType> 
  touch: (name: string) => void,
  validate: () => Promise<void>
}
