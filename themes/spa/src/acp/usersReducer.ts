import dataProvider from '../common/dataProvider';

export function usersReducer(users, action) {
  switch(action.type) {
    case 'loaded':
      return action.data;
    case 'toggle':
      return users.map(user => {
        if (user.uid === action.uid) {
          return {
            ...user,
            checked: !user.checked
          };
        } else {
          return user;
        }
      });
    case 'toggleAll':
      return users.map(user => {
        return {
          ...user,
          checked: action.checked
        };
      })
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
                data: data.map(item=> {
                  return {
                    ...item,
                    checked: false
                  }
                })
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