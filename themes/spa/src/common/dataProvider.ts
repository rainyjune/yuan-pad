// @ts-ignore
import * as yuanjs from '@rainyjune/yuanjs';

import { AjaxErrCallback, AjaxSuccCallback, SignInData, UpdateCommentObj } from '../common/types';

function banIP(ip: string, successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "POST",
    url: 'index.php?controller=badip&action=create',
    data: {ip: ip},
    dataType: 'json',
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    success: successCallback,
    error: errorCallback
  });
}

function deleteMultiIPs(ips: string[], successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "POST",
    url: 'index.php?controller=badip&action=update',
    data: {select_ip: ips},
    dataType: 'json',
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    success: successCallback,
    error: errorCallback
  });
}

function signIn(credentials: SignInData, successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "POST",
    url: "index.php?controller=user&action=login",
    data: credentials,
    dataType: 'json',
    success: successCallback,
    error: errorCallback
  });
}

function loadUserDataFromServer(uid: number | string, successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "GET",
    url: 'index.php?controller=user&action=show&uid=' + uid,
    dataType: 'json',
    cache: false,
    success: successCallback,
    error: errorCallback
  });
}

function getUserInfo(successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "GET",
    url: 'index.php?controller=user&action=getUserInfo',
    dataType: 'json',
    cache: false,
    success: successCallback,
    error: errorCallback
  });
}

function getAppConfig(successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "GET",
    url: 'index.php?controller=config&action=show',
    dataType: "json",
    success: successCallback,
    error:  errorCallback
  });
}

function signOut(successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "POST",
    url: 'index.php?controller=user&action=logout',
    dataType: 'json',
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    }, 
    success: successCallback,
    error: errorCallback
  });
}

function updateUser(userData: object, successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "POST",
    url: "index.php?controller=user&action=update",
    data: userData,
    dataType: 'json',
    success: successCallback,
    error: errorCallback
  });
}

function signUp(userData: object, successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "POST",
    url: "index.php?controller=user&action=create",
    data: userData,
    dataType: 'json',
    success: successCallback,
    error: errorCallback
  });
}

function loadCommentsFromServer(pageId: number | string, successCallback: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    url: 'index.php',
    dataType: 'json',
    method: 'GET',
    cache: false,
    data: {controller: 'post', action: 'list', page: pageId},
    success: successCallback,
    error: errorCallback
  });
}

function loadAllCommentsFromServer(successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    url: 'index.php',
    dataType: 'json',
    method: 'GET',
    cache: false,
    data: {controller: 'post', action: 'all'},
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    success: successCallback,
    error: errorCallback
  });
}

function search(keyword: string, successCallback: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "POST",
    url: "index.php?controller=search",
    data: {s:keyword},
    dataType: 'json',
    success: successCallback,
    error: errorCallback,
  });
}

function createPost(comment: any, successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  comment.ajax = true;
  yuanjs.ajax({
    type: "POST",
    url: "./index.php?controller=post&action=create",
    data: comment,
    success: successCallback,
    error: errorCallback
  });
}

function getAppConfigACP(successCallback: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "GET",
    url: 'index.php?controller=config&action=showAll',
    cache: false,
    dataType: "json",
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    success: successCallback,
    error: errorCallback
  });
}

function updateSiteConfig(configObj: object, successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "POST",
    url: "index.php?controller=config&action=update",
    data: configObj,
    dataType: "json",
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    success: successCallback,
    error: errorCallback
  });
}

function getAllUsers(successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "GET",
    url: 'index.php',
    data: {controller: "user", action: "list"},
    cache: false,
    dataType: "json",
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    success: successCallback,
    error: errorCallback
  });
}

function deleteAllReplies(successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "POST",
    url: 'index.php?controller=reply&action=deleteAll',
    dataType: "json",
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    success: successCallback,
    error: errorCallback
  });
}

function deleteAllComments(successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "POST",
    url: 'index.php?controller=post&action=deleteAll',
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    dataType: "json",
    success: successCallback,
    error: errorCallback
  });
}

function deleteAllUsers(successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "POST",
    url: 'index.php?controller=user&action=deleteAll',
    dataType: "json",
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    success: successCallback,
    error: errorCallback
  });
}

function deleteComment(commentId: number, reply: string, successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "POST",
    url: 'index.php?controller=post&action=delete',
    data: {mid: commentId, reply: reply},
    dataType: "json",
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    success: successCallback,
    error: errorCallback
  });
}

function deleteMutiComments(dataObj: number[], successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "POST",
    url: "index.php?controller=post&action=delete_multi_messages",
    data: {select_mid: dataObj},
    dataType: "json",
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    success: successCallback,
    error: errorCallback
  });
}

function deleteReply(commentId: number, successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "POST",
    url: "index.php?controller=reply&action=delete",
    data: {mid: commentId},
    dataType: "json",
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    success: successCallback,
    error: errorCallback
  });
}

function deleteUser(uid: number, successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "POST",
    url: "index.php?controller=user&action=delete",
    data: {uid: uid},
    dataType: "json",
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    success: successCallback,
    error: errorCallback
  });
}

function deleteMutiUsers(uids: Array<string | number>, successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "POST",
    url: "index.php?controller=user&action=delete_multi",
    data: {select_uid: uids},
    dataType: "json",
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    success: successCallback,
    error: errorCallback
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

function getTranslations(successCallback: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "GET",
    url: 'index.php?controller=config&action=getTranslations',
    dataType: "json",
    success: successCallback,
    error: errorCallback
  });
}

function getSystemInformation(successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "GET",
    url: 'index.php?controller=site&action=getSystemInformation',
    dataType: "json",
    success: successCallback,
    error: errorCallback
  });
}

function createReply(replyData: any, successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  let formData = {
    mid: replyData.pid,
    content: replyData.content
  };
  yuanjs.ajax({
    type: "POST",
    url: "index.php?controller=reply&action=create",
    data: formData,
    dataType: "json",
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    success: successCallback,
    error: errorCallback
  });
}

function updateReply(replyData: any, successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  let formData = {
    mid: replyData.pid,
    content: replyData.content
  };
  yuanjs.ajax({
    type: "POST",
    url: "index.php?controller=reply&action=update",
    data: formData,
    dataType: "json",
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    success: successCallback,
    error: errorCallback
  });
}

function updateComment(commentData: UpdateCommentObj, successCallback?: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "POST",
    url: "index.php?controller=post&action=update",
    data: commentData,
    dataType: "json",
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    success: successCallback,
    error: errorCallback
  });
}

function getIPBlackList(successCallback: AjaxSuccCallback, errorCallback?: AjaxErrCallback) {
  yuanjs.ajax({
    type: "GET",
    url: "index.php?controller=badip&action=list",
    dataType: "json",
    headers: {
      'RequestVerificationToken': getCookie('CSRF-TOKEN') || ''
    },
    success: successCallback,
    error: errorCallback
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
  loadUserDataFromServer,
  getUserInfo,
  search,
  updateSiteConfig
};