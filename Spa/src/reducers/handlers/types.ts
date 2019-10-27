import { Action } from 'redux'
import { CaseReducerType } from '../caseReducers/CaseReducerType';
import { ActionTypeType } from '../../actions/types';

export type HandlerType<T> = {
  [P in keyof ActionTypeType]?: CaseReducerType<T>;
  }
