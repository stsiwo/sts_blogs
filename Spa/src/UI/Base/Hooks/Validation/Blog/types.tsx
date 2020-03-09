import * as React from 'react'
import { DomainValidationType, ValidationType, InputTouchedType } from '../types';
import { BlogType } from 'domain/blog/BlogType'

export declare type UseBlogValidationStatusInputType = {
  domain: BlogType
}

export declare type UseBlogValidationStatusOutputType = {
  currentValidationError: ValidationType<BlogType> 
  touch: (name: string) => void,
  validate: (field: string, value: any, context?: any) => void
  validationSummaryCheck: () => boolean
  currentTouch: InputTouchedType<BlogType> 
}
