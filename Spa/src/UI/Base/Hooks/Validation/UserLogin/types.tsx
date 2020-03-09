import * as React from 'react'
import { UserLoginType } from 'domain/user/UserType';
import { DomainValidationType, ValidationType, InputTouchedType } from '../types';
import { MutableRefObject } from 'react';

export declare type UseUserLoginValidationStatusInputType = {
  domain: UserLoginType
}

export declare type UseUserLoginValidationStatusOutputType = {
  currentValidationError: ValidationType<UserLoginType> 
  touch: (name: string) => void,
  currentTouch: InputTouchedType<UserLoginType>,
  validate: (field: string, value: any, context?: any) => void
  validationSummaryCheck: () => boolean
}
