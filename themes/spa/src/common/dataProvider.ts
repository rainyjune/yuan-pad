import axios from 'axios';
import qs from 'qs';

import { SignInData, UpdateCommentObj } from '../common/types';

function banIP(ip: string) {
  return axios({
    method: 'post',
    url: 'index.php',
    data: qs.stringify({ip: ip}),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'badip', action: 'create'
    }
  });
}

function deleteMultiIPs(ips: string[]) {
  return axios({
    method: 'post',
    url: 'index.php',
    data: qs.stringify({select_ip: ips}),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'badip', action: 'update'
    }
  });
}

function signIn(credentials: SignInData) {
  return axios({
    method: 'post',
    url: 'index.php',
    data: qs.stringify(credentials),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'user', action: 'login'
    }
  });
}

function getUserInfo() {
  return axios({
    method: 'get',
    url: 'index.php',
    headers: {'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''},
    params: {
      controller: 'user', action: 'getUserInfo'
    }
  });
}

function getAppConfig() {
  return axios({
    method: 'get',
    url: 'index.php',
    headers: {'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''},
    params: {
      controller: 'config', action: 'show'
    }
  });
}

function signOut() {
  return axios({
    method: 'post',
    url: 'index.php',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'user', action: 'logout'
    }
  });
}

function updateUser(userData: object) {
  return axios({
    method: 'post',
    url: 'index.php',
    data: qs.stringify(userData),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'user', action: 'update'
    }
  });
}

function signUp(userData: object) {
  return axios({
    method: 'post',
    url: 'index.php',
    data: qs.stringify(userData),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'user', action: 'create'
    }
  });
}

function loadCommentsFromServer(pageId: number | string) {
  return axios({
    method: 'get',
    url: 'index.php',
    headers: {'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''},
    params: {
      controller: 'post', action: 'list', page: pageId
    }
  });
}

function loadAllCommentsFromServer() {
  return axios({
    method: 'get',
    url: 'index.php',
    headers: {'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''},
    params: {
      controller: 'post', action: 'all'
    }
  });
}

function search(keyword: string) {
  return axios({
    method: 'post',
    url: 'index.php',
    data: qs.stringify({s:keyword}),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'search'
    }
  });
}

function createPost(comment: any) {
  comment.ajax = true;
  return axios({
    method: 'post',
    url: 'index.php',
    data: qs.stringify(comment),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'post', action: 'create'
    }
  });
}

function getAppConfigACP() {
  return axios({
    method: 'get',
    url: 'index.php',
    headers: {'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''},
    params: {
      controller: 'config', action: 'showAll'
    }
  });
}

function updateSiteConfig(configObj: object) {
  return axios({
    method: 'post',
    url: 'index.php',
    data: qs.stringify(configObj),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'config', action: 'update'
    }
  });
}

function getAllUsers() {
  return axios({
    method: 'get',
    url: 'index.php',
    headers: {'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''},
    params: {
      controller: 'user', action: 'list'
    }
  });
}

function deleteAllReplies() {
  return axios({
    method: 'post',
    url: 'index.php',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'reply', action: 'deleteAll'
    }
  });
}

function deleteAllComments() {
  return axios({
    method: 'post',
    url: 'index.php',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'post', action: 'deleteAll'
    }
  });
}

function deleteAllUsers() {
  return axios({
    method: 'post',
    url: 'index.php',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'user', action: 'deleteAll'
    }
  });
}

function deleteComment(commentId: number, reply: string) {
  return axios({
    method: 'post',
    url: 'index.php',
    data: qs.stringify({mid: commentId, reply: reply}),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'post', action: 'delete'
    }
  });
}

function deleteMutiComments(dataObj: number[]) {
  return axios({
    method: 'post',
    url: 'index.php',
    data: qs.stringify({select_mid: dataObj}),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'post', action: 'delete_multi_messages'
    }
  });
}

function deleteReply(commentId: number) {
  return axios({
    method: 'post',
    url: 'index.php',
    data: qs.stringify({mid: commentId}),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'reply', action: 'delete'
    }
  });
}

function deleteUser(uid: number) {
  return axios({
    method: 'post',
    url: 'index.php',
    data: qs.stringify({uid: uid}),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'user', action: 'delete'
    }
  });
}

function deleteMutiUsers(uids: Array<string | number>) {
  return axios({
    method: 'post',
    url: 'index.php',
    data: qs.stringify({select_uid: uids}),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'user', action: 'delete_multi'
    }
  });
}

/**
 * Get cookie value by a specific name.
 * http://stackoverflow.com/a/15724300
 */
function getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length == 2) {
    return parts.pop()?.split(";").shift();
  } else {
    return null;
  }
}

function getTranslations() {
  return axios({
    method: 'get',
    url: 'index.php',
    headers: {'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''},
    params: {
      controller: 'config', action: 'getTranslations'
    }
  });
}

function getSystemInformation() {
  return axios({
    method: 'get',
    url: 'index.php',
    headers: {'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''},
    params: {
      controller: 'site', action: 'getSystemInformation'
    }
  });
}

function createReply(replyData: any) {
  return axios({
    method: 'post',
    url: 'index.php',
    data: qs.stringify({
      mid: replyData.pid,
      content: replyData.content
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'reply', action: 'create'
    }
  });
}

function updateReply(replyData: any) {
  return axios({
    method: 'post',
    url: 'index.php',
    data: qs.stringify({
      mid: replyData.pid,
      content: replyData.content
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'reply', action: 'update'
    }
  });
}

function updateComment(commentData: UpdateCommentObj) {
  return axios({
    method: 'post',
    url: 'index.php',
    data: qs.stringify(commentData),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    params: {
      controller: 'post', action: 'update'
    }
  });
}

function getIPBlackList() {
  return axios({
    method: 'get',
    url: 'index.php',
    headers: {'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''},
    params: {
      controller: 'badip', action: 'list'
    }
  });
}

export default {
  banIP,
  createPost,
  createReply,
  deleteAllComments,
  deleteAllReplies,
  deleteAllUsers,
  deleteComment,
  deleteMutiComments,
  deleteReply,
  deleteUser,
  deleteMutiUsers,
  deleteMultiIPs,
  getIPBlackList, 
  getAppConfig,
  getAppConfigACP,
  getAllUsers,
  getSystemInformation,
  getTranslations,
  signIn,
  signOut,
  signUp,
  updateComment,
  updateReply,
  updateUser,
  loadAllCommentsFromServer,
  loadCommentsFromServer,
  getUserInfo,
  search,
  updateSiteConfig
};