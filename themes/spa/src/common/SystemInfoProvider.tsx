import { useReducer } from 'react';
import { SystemInfoContext, SystemInfoDispatchContext } from './SystemInfoContext';
import dataProvider from './dataProvider';

export default function SystemInfoProvider({ children }) {
  const [systemInfo, dispatchBase] = useReducer(systemInfoReducer, initialState);
  const dispatch = dispatchMiddleware(dispatchBase);

  return (
    <SystemInfoContext.Provider value={systemInfo}>
      <SystemInfoDispatchContext.Provider value={dispatch}>{children}</SystemInfoDispatchContext.Provider>
    </SystemInfoContext.Provider>
  );
}

export function dispatchMiddleware(dispatch) {
  return async (action) => {
    switch (action.type) {
      case 'loaded': {
        const res = await dataProvider.getSystemInformation();
        if (res.status === 200 && res.data.statusCode === 200) {
          dispatch({
            type: 'loaded',
            data: res.data.response,
          });
        } else {
          //alert(res.data.statusText);
        }
        break;
      }
      default:
        return dispatch(action);
    }
  };
}

function systemInfoReducer(systemInfo, action) {
  switch (action.type) {
    case 'loaded': {
      return {
        ...systemInfo,
        ...action.data,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialState = {
  commentsTotal: 0,
  repliesTotal: 0,
  appVersion: '',
  phpVersion: '',
  gd_loaded: false,
  gdVersion: '',
  registerGlobals: '',
  magicQuotesGPC: '',
  zipSupport: '',
  themes: {},
  timezones: {},
  languages: {},
  dateFormates: {},
};
