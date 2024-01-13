export const userUpdateInitialState = {
  updateErrorMsg: '',
  updateModalIsOpen: false,
  updatedModalUserId: null,
};

export function userUpdateReducer(state, action) {
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
          updatedModalUserId: action.id,
          updateModalIsOpen: true,
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}