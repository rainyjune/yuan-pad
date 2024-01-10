import dataProvider from '../common/dataProvider';

export function messageReducer(state, action) {
  console.log(action.type);

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
    case 'TOGGLE':
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.id) {
            return {
              ...item,
              checked: !item.checked,
            };
          } else {
            return item;
          }
        }),
      };
    case 'TOGGLEALL':
      return {
        ...state,
        data: state.data.map((item) => {
          return {
            ...item,
            checked: action.checked,
          };
        }),
      };
    default:
      return state;
  }
}

export function dispatchMiddleware(dispatch) {
  return async (action) => {
    switch (action.type) {
      case 'LOAD':
        try {
          const res = await dataProvider.loadAllCommentsFromServer();
          if (res.status === 200) {
            dispatch({
              type: 'LOAD_SUCCESS',
              data: res.data.response.comments.map((comment) => {
                return {
                  ...comment,
                  checked: false,
                };
              }),
            });
          }
        } catch (e) {
          dispatch({ type: 'LOAD_ERROR' });
        }
        break;
      case 'DELETE':
        console.log('DELETE');
        try {
          const res = await dataProvider.deleteComment(action.commentId, action.reply);
          if (res.status === 200) {
            dispatch({
              type: 'LOAD',
            });
          }
        } catch (e) {
          dispatch({ type: 'LOAD_ERROR' });
        }
        break;
      default:
        return dispatch(action);
    }
  };
}
