import { createContext, useContext } from 'react';

export const SystemInfoContext = createContext(null);

export const SystemInfoDispatchContext = createContext<any>(null);

export function useSystemInfo() {
  return useContext(SystemInfoContext);
}

export function useSystemInfoDispatch() {
  return useContext(SystemInfoDispatchContext);
}
