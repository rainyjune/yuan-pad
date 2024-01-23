import type { IUser } from '../common/types';

export const initialState: IUser = {
  uid: -1,
  user_type: 'guest',
  username: '',
  email: '',
};
