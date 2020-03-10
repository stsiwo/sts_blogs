import * as React from 'react'
import { UserType, UserProfileType } from 'domain/user/UserType';
import { DomainValidationType, InputTouchedType } from '../types';

export declare type UseProfileValidationStatusInputType = {
  domain: UserProfileType
}

export declare type UseProfileValidationStatusOutputType = {
  currentValidationError: DomainValidationType<UserProfileType> 
  touch: (name: string) => void,
  validate: (field: string, value: any, context?: any) => void
  validationSummaryCheck: () => boolean
  currentTouch: InputTouchedType<UserProfileType>
}
