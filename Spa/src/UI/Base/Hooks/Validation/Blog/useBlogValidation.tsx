import { useValidation } from '../useValidation';
import { UseBlogValidationStatusInputType, UseBlogValidationStatusOutputType } from './types';
import { BlogType } from 'domain/blog/BlogType'
import * as yup from 'yup'
import { Node } from 'Components/fork/slate'
import { BlogValidationType } from 'domain/blog/BlogValidationType';

export const useBlogValidation = (input: UseBlogValidationStatusInputType): UseBlogValidationStatusOutputType => {


  // define validation schema
  let schema = yup.object().shape<BlogValidationType>({
    title: yup.string().required(),
    subtitle: yup.string().required(),
  });

  const { currentValidationError, touch, validate, validationSummaryCheck, currentTouch } = useValidation<BlogValidationType>({
    domain: input.domain,
    schema: schema,
  })

  return {
    currentValidationError: currentValidationError,
    touch: touch,
    validate: validate,
    validationSummaryCheck: validationSummaryCheck,
    currentTouch: currentTouch
  }
}
