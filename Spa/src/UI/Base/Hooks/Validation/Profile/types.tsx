import * as React from 'react'
import { UserType } from 'domain/user/UserType';
import { DomainValidationType } from '../types';

export declare type UseProfileValidationStatusInputType = {
  domain: UserType
}

export declare type UseProfileValidationStatusOutputType = {
  currentValidationError: DomainValidationType<UserType> 
  touch: (name: string) => void,
  validate: () => Promise<void>
}
