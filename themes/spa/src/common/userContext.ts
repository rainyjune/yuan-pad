import { createContext } from "react";
import type { IUser } from '../common/types';

export const initialState: IUser = {
  uid: -1,
  user_type: 'guest',
  username: '',
  email: '',
};
export default createContext(initialState);
