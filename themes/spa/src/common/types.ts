export interface GetUserInfoResponse {
  statusCode: number;
  statusText: string;
  response: {
    uid: number | string;
    user_type: string;
    username: string;
    email: string;
  }
}

export interface PostListResponse {
  statusCode: number;
  statusText: string;
  response: {
    total: number,
    comments: Array<IComment>
  }
}

export interface SearchResponse {
  statusCode: number;
  statusText: string;
  response: {
    comments: Array<IComment>;
    total: number;
  }
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

export interface TranslationResponse {
  statusCode: number;
  statusText: string;
  response: object;
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