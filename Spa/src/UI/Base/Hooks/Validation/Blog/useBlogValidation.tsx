import { useValidation } from '../useValidation';
import { UseBlogValidationStatusInputType, UseBlogValidationStatusOutputType } from './types';
import { BlogType } from 'domain/blog/BlogType'
import * as yup from 'yup'
import { Node } from 'Components/fork/slate'

export const useBlogValidation = (input: UseBlogValidationStatusInputType): UseBlogValidationStatusOutputType => {


  // define validation schema
  let schema = yup.object().shape<BlogType>({
    id: yup.string(),
    title: yup.string().required(),
    subtitle: yup.string().required(),
    content: yup.array<Node>(),
    createdDate: yup.date().required(),
  });

  const { currentValidationError, touch, validate } = useValidation<BlogType>({
    domain: input.domain,
    schema: schema
  })

  return {
    currentValidationError: currentValidationError,
    touch: touch,
    validate: validate,
  }
}
