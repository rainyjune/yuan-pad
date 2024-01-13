import type { IUserUpdateReducerAction, IUserModalState } from '../common/types';

export const userUpdateInitialState: IUserModalState = {
  updateErrorMsg: '',
  updateModalIsOpen: false,
  updatedModalUserId: null,
};

export function userUpdateReducer(state: IUserModalState, action: IUserUpdateReducerAction) {
  switch(action.type) {
    case 'saved': {
      return {
        updateErrorMsg: '',
        updatedModalUserId: null,
        updateModalIsOpen: false,
      };
    }
    case 'cancelled': {
      return {
        updateErrorMsg: '',
        updatedModalUserId: null,
        updateModalIsOpen: false,
      };
    }
    case 'selected': {
      return {
          updateErrorMsg: '',
          updatedModalUserId: action.id ?? null,
          updateModalIsOpen: true,
      }
    }
    default: {
      return state;
    }
  }
}