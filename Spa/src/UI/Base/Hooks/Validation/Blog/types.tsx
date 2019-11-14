import * as React from 'react'
import { DomainValidationType, ValidationType } from '../types';
import { BlogType } from 'domain/blog/BlogType'

export declare type UseBlogValidationStatusInputType = {
  domain: BlogType
}

export declare type UseBlogValidationStatusOutputType = {
  currentValidationError: ValidationType<BlogType> 
  touch: (name: string) => void,
  validate: () => Promise<void>
}
