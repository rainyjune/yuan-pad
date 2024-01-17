import type { IMessageState, IMessageReducerAction } from '../common/types';

export const initialState = {
  isLoading: false,
  isError: false,
  data: [],
};

export function messageReducer(state: IMessageState, action: IMessageReducerAction) {
  switch (action.type) {
    case 'LOAD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.data,
      };
    case 'LOAD_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw Error('Unknown action: ' + action.type);
  }
}
