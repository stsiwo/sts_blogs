import { HandlerType } from '../types'
import { TagType } from '../../../domain/tag/TagType';
import { ActionTypeEnum } from '../../../actions/types';
import { assignTagsCaseReducer } from '../../caseReducers/domain/tagsCaseReducers';

export const tagsHandler: HandlerType<TagType[]> = {
    [ActionTypeEnum.ASSIGN_TAGS]: assignTagsCaseReducer,
  }


