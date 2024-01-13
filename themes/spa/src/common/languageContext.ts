import React from "react";
import type { ITranslationData } from "./types";

const initialState: ITranslationData = {
  DEL_SINGLEUSER_CONFIRM: "",
  "DEL_REPLY_CONFIRM": "",
  "DEL_COMMENT_CONFIRM": "",
  "DEL_SELECTEDUSERS_CONFIRM": "",
  "DEL_SELECTEDCOMMENTS_CONFIRM": "",
  "UPDATE_IPLIST_CONFIRM": "",
  "WELCOME_SYS": "",
  "THANKS": "",
  "STATS_INFO": "",
  "NUM_POSTS": "",
  "NUM_REPLY": "",
  "MP_VERSION": "",
  "SYS_INFO": "",
  "PHP_VERSION": "",
  "GD_VERSION": "",
  "SAFE_MODE": "",
  "SYS_CONF": "",
  "BOARD_NAME": "",
  "CLOSE_BOARD": "",
  "CLOSE_REASON": "",
  "COPY_INFO": "",
  "SYS_THEME": "",
  "TIMEZONE": "",
  "POST_CONF": "",
  "FILTER_WORDS": "",
  "ENABLE_CAPTCHA": "",
  "ENABLE_PAGE": "",
  "PAGINATION_TIP": "",
  "POST_PERPAGE": "",
  "ADMIN_CONF": "",
  "CHANGE_PWD": "",
  "PWD_TIP": "",
  "RESET": "",
  "SELECT": "",
  "OPERATION": "",
  "REPLY": "",
  "UPDATE": "",
  "BAN": "",
  "DELETE": "",
  "YOU_REPLIED": "",
  "DELETE_THIS_REPLY": "",
  "CHECK_ALL": "",
  "CHECK_NONE": "",
  "CHECK_INVERT": "",
  "DELETE_CHECKED": "",
  "DELETE_ALL": "",
  "DELETE_ALL_REPLY": "",
  "BACKUP": "",
  "BAD_IP": "",
  "CANCEL": "",
  "TIPS": "",
  "TZ_ZONES": {},
  "WELCOME": "",
  "WELCOME_POST": "",
  "NICKNAME": "",
  "MESSAGE": "",
  "TIME": "",
  "PAGE_NAV": "",
  "ADMIN_REPLIED": "",
  "CLICK_POST": "",
  "CONTENT": "",
  "SUBMIT": "",
  "POST_SHORTCUT": "",
  "ADMIN_EMAIL": "",
  "ACP": "",
  "ACP_INDEX": "",
  "VALIDATE_CODE": "",
  "ACP_LOGIN": "",
  "BACK": "",
  "LOGIN": "",
  "ADMIN_NAME": "",
  "ADMIN_PWD": "",
  "HOME": "",
  "LOGOUT": "",
  "ACP_OVERVIEW": "",
  "ACP_CONFSET": "",
  "ACP_MANAGE_POST": "",
  "ACP_MANAGE_IP": "",
  "LANG": "",
  "YES": "",
  "NO": "",
  "LOGIN_ERROR": "",
  "USERNAME_NOT_EMPTY": "",
  "USERNAME_NOT_AVAILABLE": "",
  "PWD_NOT_EMPTY": "",
  "USERNAME_TOO_SHORT": "",
  "MESSAGE_NOT_EMPTY": "",
  "CAPTCHA_NOT_EMPTY": "",
  "EMAIL_INVALID": "",
  "POST_OK": "",
  "CLICK_TO_REFRESH": "",
  "CAPTCHA": "",
  "DEL_ALL_CONFIRM": "",
  "DEL_ALL_REPLY_CONFIRM": "",
  "WHERE_AM_I": "",
  "QUERY_ERROR": "",
  "REPLY_EMPTY": "",
  "BACKUP_NOTSUPPORT": "",
  "BACKUP_TYPE_NOTSUPPORT": "",
  "FILL_NOT_COMPLETE": "",
  "WORDS_TOO_LONG": "",
  "CAPTCHA_WRONG": "",
  "UNKNOWN": "",
  "NOT_SUPPORT": "",
  "LOGIN_DENIED": "",
  "USERNAME": "",
  "PASSWORD": "",
  "EMAIL": "",
  "REGISTER": "",
  "USERUPDATEFAILED": "",
  "OFF_LINE_MODE": "",
  "SENDING": "",
  "THEMES_DIR_NOTEXISTS": "",
  "SMILEY_DIR_NOTEXISTS": "",
  "CONFIG_FILE_NOTEXISTS": "",
  "CONFIG_FILE_NOTWRITABLE": "",
  "SITENAME_ERROR": "",
  "SITESTATUS_ERROR": "",
  "SITECLOSEREASON_ERROR": "",
  "ADMINEMAIL_ERROR": "",
  "COPYRIGHT_ERROR": "",
  "BADWORDS_ERROR": "",
  "CAPTCHASTATUS_ERROR": "",
  "PAGINATIONSTATUS_ERROR": "",
  "TIMEZONE_ERROR": "",
  "PAGINATION_PARAMETER_ERROR": "",
  "THEME_ERROR": "",
  "ADMINNAME_ERROR": "",
  "ADMINPASS_ERROR": "",
  "LANGUAGE_ERROR": "",
  "INSTALL_PANEL": "",
  "INSTALL_MP": "",
  "ADMIN_USERNAME": "",
  "ADMIN_USERNAME_MIN": "",
  "ADMIN_PASSWORD": "",
  "DB_TYPE_SELECT": "",
  "DB_TYPE": "",
  "DB_NAME": "",
  "DB_USER": "",
  "DB_PWD": "",
  "DB_HOST": "",
  "TB_PREFIX": "",
  "INSTALL": "",
  "FINISHED": "",
  "RETRY": "",
  "DATADIR_NOT_WRITABLE": "",
  "DB_CONNECT_ERROR": "",
  "INSTALL_NEED_HELP": "",
  "INSTALL_AGREEMENT": "",
  "GD_DISABLED_NOTICE": "",
  "SEARCH_NOTFOUND": "",
  "SEARCH_FOUND": "",
  "ONLY_POST": "",
  "NO_SEARCH_PARAM": "",
  "API_REQUEST_ERROR": "",
  "LOGIN_REQUIRED": "",
  "PARAM_ERROR": "",
  "USER_ADMIN": "",
  "DEL_ALLUSER_CONFIRM": "",
  "ALLOWED_TAGS": "",
  "FILTER_HTML_TAGS": "",
  "STRIP_DISALLOWED_TAGS": "",
  "ESCAPE_ALL_TAGS": "",
  "ALLOWED_HTML_TAGS": "",
  "USER_NOT_EXISTS": "",
};
const LanguageContext = React.createContext(initialState);

export default LanguageContext;
