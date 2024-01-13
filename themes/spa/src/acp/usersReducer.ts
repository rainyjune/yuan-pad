import dataProvider from '../common/dataProvider';
import type { IUser, IUserReducerAction } from '../common/types';

export function usersReducer(users: Array<IUser>, action: IUserReducerAction) {
  switch(action.type) {
    case 'loaded':
      return action.data;
    default:
      return users;
  }
}

export function dispatchMiddleware(dispatch: (obj: IUserReducerAction) => void) {
  return async (action: IUserReducerAction) => {
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
            //
          }
        } catch(e) {
          debugger;
        }
        break;
      case 'delete':
        try {
          const res = await dataProvider.deleteUser(action.uid ?? 0);
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
            //
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