import { HandlerType } from '../types'
import { TagType } from '../../../domain/tag/TagType';
import { ActionTypeEnum } from '../../../actions/types';
import { UserType } from '../../../domain/user/UserType';
import { assignUserCaseReducer } from '../../caseReducers/domain/userCaseReducer';

export const userHandler: HandlerType<UserType> = {
    [ActionTypeEnum.ASSIGN_USER]: assignUserCaseReducer,
  }



