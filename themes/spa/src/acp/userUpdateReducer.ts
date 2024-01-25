import type { IUserUpdateReducerAction, IUserModalState } from '../common/types';

export const userUpdateInitialState: IUserModalState = {
  updateErrorMsg: '',
  updateModalIsOpen: false,
  updatedModalUserId: null,
};

export function getState(action: IUserUpdateReducerAction): IUserModalState {
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
    case 'error': {
      return {
        updateErrorMsg: action.error ?? '',
        updatedModalUserId: action.id ?? null,
        updateModalIsOpen: true,
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}