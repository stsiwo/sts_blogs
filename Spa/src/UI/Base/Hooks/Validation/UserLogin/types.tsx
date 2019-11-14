import * as React from 'react'
import { UserLoginType } from 'domain/user/UserType';
import { DomainValidationType, ValidationType } from '../types';

export declare type UseUserLoginValidationStatusInputType = {
  domain: UserLoginType
}

export declare type UseUserLoginValidationStatusOutputType = {
  currentValidationError: ValidationType<UserLoginType> 
  touch: (name: string) => void,
  validate: () => Promise<void>
}
