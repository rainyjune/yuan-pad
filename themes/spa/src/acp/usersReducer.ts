import dataProvider from '../common/dataProvider';

export function usersReducer(users, action) {
  switch(action.type) {
    case 'loaded':
      return action.data;
    default:
      throw Error('Unknown action: ' + action.type);
  }
}

export function dispatchMiddleware(dispatch) {
  return async (action) => {
    switch(action.type) {
      case 'loadAll':
        try {
          const res = await dataProvider.getAllUsers();
          if (res.status === 200 && res.data.statusCode === 200) {
            const data = res.data.response;
            dispatch(
              {
                type: 'loaded',
                data
              }
            );
            //addSelectedFlag(data);
            //setUsers(data);
          } else {
            debugger;
            // todo
            //alert(res.data.statusText);
          }
        } catch (e) {
          debugger;
          // todo
        }
        break;
      case 'update':
        try {
          const res = await dataProvider.updateUser(action.data);
          if (res.data.statusCode === 200) {
            /*
            dispatch({
              type: 'loadAll'
            })
            */
          }
        } catch(e) {
          debugger;
        }
        break;
      case 'delete':
        try {
          const res = await dataProvider.deleteUser(action.uid);
          if (res.data.statusCode === 200) {
            //
          }
        } catch(e) {
          debugger;
        }
        break;
      case 'deleteAll':
        try {
          const res = await dataProvider.deleteAllUsers();
          if (res.data.statusCode === 200) {
            //
          }
        } catch(e) {
          debugger;
        }
        break;
      case 'deleteMulti':
        try {
          const res = await dataProvider.deleteMutiUsers(action.data);
          debugger;
          if (res.data.statusCode === 200) {
            /*
            dispatch({
              type: 'loadAll'
            })
            */
          } else {
            alert('delete error');
          }
        } catch(e) {
          debugger;
        }
        break;
      default:
        return dispatch(action);
    }
  }
}