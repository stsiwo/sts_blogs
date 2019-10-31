import { HandlerType } from '../types'
import { BlogType } from '../../../domain/blog/BlogType';
import { ActionTypeEnum } from '../../../actions/types';
import { assignBlogsCaseReducer } from '../../caseReducers/domain/blogsCaseReducers';

export const blogsHandler: HandlerType<BlogType[]> = {
    [ActionTypeEnum.ASSIGN_BLOGS]: assignBlogsCaseReducer,
  }



