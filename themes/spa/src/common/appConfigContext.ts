import React from "react";
import type { IConfigParams } from '../common/types';

export const initialState: IConfigParams = {
  board_name: '',
  site_close: 0,
  close_reason: '',
  admin_email: '',
  copyright_info: '',
  valid_code_open: '0',
  page_on: 0,
  num_perpage: 0,
  theme: '',
  admin: '',
  lang: '',
  timezone: '0',
  filter_type: 1,
  allowed_tags: '',
  dateformat: "",
  filter_words: "",
}
const AppConfigContext = React.createContext(initialState);

export default AppConfigContext;
