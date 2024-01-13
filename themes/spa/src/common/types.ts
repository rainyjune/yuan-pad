export interface GetUserInfoResponse {
  statusCode: number;
  statusText: string;
  response: {
    uid: number | string;
    user_type: string;
    username: string;
    email: string;
  };
}

export interface PostListResponse {
  statusCode: number;
  statusText: string;
  response: {
    total: number;
    comments: Array<IComment>;
  };
}

export interface SearchResponse {
  statusCode: number;
  statusText: string;
  response: {
    comments: Array<IComment>;
    total: number;
  };
}

export interface IConfigParams {
  board_name: string;
  site_close: string | number;
  close_reason: string;
  admin_email: string;
  copyright_info: string;
  valid_code_open: string | number;
  page_on: string | number;
  num_perpage: string | number;
  theme: string;
  admin: string;
  lang: string;
  timezone: string;
  filter_type: number;
  allowed_tags: string;
}

export interface ConfigResponse {
  statusCode: number;
  statusText: string;
  response: IConfigParams;
}

export interface ITranslationData {
  DEL_SINGLEUSER_CONFIRM: string;
  DEL_REPLY_CONFIRM: string;
  DEL_COMMENT_CONFIRM: string;
  DEL_SELECTEDUSERS_CONFIRM: string;
  DEL_SELECTEDCOMMENTS_CONFIRM: string;
  UPDATE_IPLIST_CONFIRM: string;
  WELCOME_SYS: string;
  THANKS: string;
  STATS_INFO: string;
  NUM_POSTS: string;
  NUM_REPLY: string;
  MP_VERSION: string;
  SYS_INFO: string;
  PHP_VERSION: string;
  GD_VERSION: string;
  SAFE_MODE: string;
  SYS_CONF: string;
  BOARD_NAME: string;
  CLOSE_BOARD: string;
  CLOSE_REASON: string;
  COPY_INFO: string;
  SYS_THEME: string;
  TIMEZONE: string;
  POST_CONF: string;
  FILTER_WORDS: string;
  ENABLE_CAPTCHA: string;
  ENABLE_PAGE: string;
  PAGINATION_TIP: string;
  POST_PERPAGE: string;
  ADMIN_CONF: string;
  CHANGE_PWD: string;
  PWD_TIP: string;
  RESET: string;
  SELECT: string;
  OPERATION: string;
  REPLY: string;
  UPDATE: string;
  BAN: string;
  DELETE: string;
  YOU_REPLIED: string;
  DELETE_THIS_REPLY: string;
  CHECK_ALL: string;
  CHECK_NONE: string;
  CHECK_INVERT: string;
  DELETE_CHECKED: string;
  DELETE_ALL: string;
  DELETE_ALL_REPLY: string;
  BACKUP: string;
  BAD_IP: string;
  CANCEL: string;
  TIPS: string;
  TZ_ZONES: object;
  WELCOME: string;
  WELCOME_POST: string;
  NICKNAME: string;
  MESSAGE: string;
  TIME: string;
  PAGE_NAV: string;
  ADMIN_REPLIED: string;
  CLICK_POST: string;
  CONTENT: string;
  SUBMIT: string;
  POST_SHORTCUT: string;
  ADMIN_EMAIL: string;
  ACP: string;
  ACP_INDEX: string;
  VALIDATE_CODE: string;
  ACP_LOGIN: string;
  BACK: string;
  LOGIN: string;
  ADMIN_NAME: string;
  ADMIN_PWD: string;
  HOME: string;
  LOGOUT: string;
  ACP_OVERVIEW: string;
  ACP_CONFSET: string;
  ACP_MANAGE_POST: string;
  ACP_MANAGE_IP: string;
  LANG: string;
  YES: string;
  NO: string;
  LOGIN_ERROR: string;
  USERNAME_NOT_EMPTY: string;
  USERNAME_NOT_AVAILABLE: string;
  PWD_NOT_EMPTY: string;
  USERNAME_TOO_SHORT: string;
  MESSAGE_NOT_EMPTY: string;
  CAPTCHA_NOT_EMPTY: string;
  EMAIL_INVALID: string;
  POST_OK: string;
  CLICK_TO_REFRESH: string;
  CAPTCHA: string;
  DEL_ALL_CONFIRM: string;
  DEL_ALL_REPLY_CONFIRM: string;
  WHERE_AM_I: string;
  QUERY_ERROR: string;
  REPLY_EMPTY: string;
  BACKUP_NOTSUPPORT: string;
  BACKUP_TYPE_NOTSUPPORT: string;
  FILL_NOT_COMPLETE: string;
  WORDS_TOO_LONG: string;
  CAPTCHA_WRONG: string;
  UNKNOWN: string;
  NOT_SUPPORT: string;
  LOGIN_DENIED: string;
  USERNAME: string;
  PASSWORD: string;
  EMAIL: string;
  REGISTER: string;
  USERUPDATEFAILED: string;
  OFF_LINE_MODE: string;
  SENDING: string;
  THEMES_DIR_NOTEXISTS: string;
  SMILEY_DIR_NOTEXISTS: string;
  CONFIG_FILE_NOTEXISTS: string;
  CONFIG_FILE_NOTWRITABLE: string;
  SITENAME_ERROR: string;
  SITESTATUS_ERROR: string;
  SITECLOSEREASON_ERROR: string;
  ADMINEMAIL_ERROR: string;
  COPYRIGHT_ERROR: string;
  BADWORDS_ERROR: string;
  CAPTCHASTATUS_ERROR: string;
  PAGINATIONSTATUS_ERROR: string;
  TIMEZONE_ERROR: string;
  PAGINATION_PARAMETER_ERROR: string;
  THEME_ERROR: string;
  ADMINNAME_ERROR: string;
  ADMINPASS_ERROR: string;
  LANGUAGE_ERROR: string;
  INSTALL_PANEL: string;
  INSTALL_MP: string;
  ADMIN_USERNAME: string;
  ADMIN_USERNAME_MIN: string;
  ADMIN_PASSWORD: string;
  DB_TYPE_SELECT: string;
  DB_TYPE: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PWD: string;
  DB_HOST: string;
  TB_PREFIX: string;
  INSTALL: string;
  FINISHED: string;
  RETRY: string;
  DATADIR_NOT_WRITABLE: string;
  DB_CONNECT_ERROR: string;
  INSTALL_NEED_HELP: string;
  INSTALL_AGREEMENT: string;
  GD_DISABLED_NOTICE: string;
  SEARCH_NOTFOUND: string;
  SEARCH_FOUND: string;
  ONLY_POST: string;
  NO_SEARCH_PARAM: string;
  API_REQUEST_ERROR: string;
  LOGIN_REQUIRED: string;
  PARAM_ERROR: string;
  USER_ADMIN: string;
  DEL_ALLUSER_CONFIRM: string;
  ALLOWED_TAGS: string;
  FILTER_HTML_TAGS: string;
  STRIP_DISALLOWED_TAGS: string;
  ESCAPE_ALL_TAGS: string;
  ALLOWED_HTML_TAGS: string;
  USER_NOT_EXISTS: string;
}

export interface TranslationResponse {
  statusCode: number;
  statusText: string;
  response: ITranslationData;
}

export interface IUser {
  uid: number | string;
  user_type: string;
  username: string;
  email: string;
}

export interface IComment {
  id: number;
  ip: string;
  uid: any;
  uname: string;
  post_content: string;
  time: string;
  reply_id: any;
  reply_content: string;
  reply_time: string;
  b_username: any;
}

export interface UpdateCommentObj {
  mid: number;
  update_content: string;
}

export interface ReplyObj {
  pid: number;
  mid: number;
  content: string;
}

export interface SignInData {
  user: string;
  password: string;
}

export interface UserUpdateData {
  uid: number | string;
  user: string;
  pwd: string;
  email: string;
}

export type AjaxSuccCallback = (res: any) => void;
export type AjaxErrCallback = (e: any) => void;
