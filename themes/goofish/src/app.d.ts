interface UserInfo {
  user_type: string;
  username: string;
}

interface UserData extends UserInfo {
  uid: number;
  email: string;
}

interface LoginData {
  user: string;
  password: string;
}

type MainComponentName = 'Main' | 'ACP';

type ACPTabName = 'overview' | 'posts' | 'users' | 'config' | 'ips';

interface PostRow {
  b_username: null | string;
  id: number; 
  ip: string;
  post_content: string;
  reply_content: string;
  reply_id: null | number;
  reply_time: null | string; 
  time: string;
  uid: null | number;
  uname: string; 
}

type PostDataRowFunction = (index: number, row: PostRow) => void;


/*
interface LoginModalProps {
  dialogVisible: boolean;
}
*/