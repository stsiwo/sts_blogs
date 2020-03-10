import * as React from 'react'
import { DomainValidationType, ValidationType, InputTouchedType } from '../types';
import { BlogType } from 'domain/blog/BlogType'
import { BlogValidationType } from 'domain/blog/BlogValidationType';

export declare type UseBlogValidationStatusInputType = {
  domain: BlogValidationType
}

export declare type UseBlogValidationStatusOutputType = {
  currentValidationError: ValidationType<BlogValidationType> 
  touch: (name: string) => void,
  validate: (field: string, value: any, context?: any) => void
  validationSummaryCheck: () => boolean
  currentTouch: InputTouchedType<BlogValidationType> 
}
