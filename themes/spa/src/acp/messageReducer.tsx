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
              data: res.data.response.comments,
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
      case 'DELETEMULTI':
        try {
          const res = await dataProvider.deleteMutiComments(action.data);
          if (res.status === 200) {
            //
          }
        } catch (e) {
          //dispatch({ type: 'LOAD_ERROR' });
        }
        break;
      case 'DELETEALL':
        try {
          const res = await dataProvider.deleteAllComments();
          if (res.status === 200) {
            //
          }
        } catch (e) {
          //dispatch({ type: 'LOAD_ERROR' });
        }
        break;
      case 'DELETEALLREPLIES':
        try {
          const res = await dataProvider.deleteAllReplies();
          if (res.status === 200) {
            //
          }
        } catch (e) {
          //dispatch({ type: 'LOAD_ERROR' });
        }
        break;
      default:
        return dispatch(action);
    }
  };
}
