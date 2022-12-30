const yuanjs = require('@rainyjune/yuanjs');

import { ConfigResponse, GetUserInfoResponse, PostListResponse, ReplyObj, SearchResponse, TranslationResponse, UpdateCommentObj } from './common/types';

/**
 * Tested 1.
 */
function banIP(ip: string, successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
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

/**
 * Tested 1.
 */
function deleteMultiIPs(ips: string[], successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
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

/**
 * Tested 1.
 *
 *
 *
 */
function signIn(credentials: any, successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
  yuanjs.ajax({
    type: "POST",
    url: "index.php?controller=user&action=login",
    data: credentials,
    dataType: 'json',
    success: successCallback,
    error: errorCallback
  });
}

/**
 * Tested 1.
 *
 *
 *
 */
function loadUserDataFromServer(uid: number | string, successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
  yuanjs.ajax({
    type: "GET",
    url: 'index.php?controller=user&action=show&uid=' + uid,
    dataType: 'json',
    cache: false,
    success: successCallback,
    error: errorCallback
  });
}

/**
 * Tested 1.
 *
 *
 */
function getUserInfo(successCallback: (res: GetUserInfoResponse) => void, errorCallback = () => {}) {
  yuanjs.ajax({
    type: "GET",
    url: 'index.php?controller=user&action=getUserInfo',
    dataType: 'json',
    cache: false,
    success: successCallback,
    error: errorCallback
  });
}

/**
 * Tested 1.
 *
 *
 */
function getAppConfig(successCallback: (res: ConfigResponse) => void , errorCallback = () => {}) {
  yuanjs.ajax({
    type: "GET",
    url: 'index.php?controller=config&action=show',
    dataType: "json",
    success: successCallback,
    error:  errorCallback
  });
}

/**
 * Tested 1
 *
 *
 *
 */
function signOut(successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
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

/***
 * Tested 1
 *
 *
 */
function updateUser(userData: any, successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
  yuanjs.ajax({
    type: "POST",
    url: "index.php?controller=user&action=update",
    data: userData,
    dataType: 'json',
    success: successCallback,
    error: errorCallback
  });
}

/**
 * Tested 1
 *
 *
 */
function signUp(userData: any, successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
  yuanjs.ajax({
    type: "POST",
    url: "index.php?controller=user&action=create",
    data: userData,
    dataType: 'json',
    success: successCallback,
    error: errorCallback
  });
}

/**
 * Tested 1.
 *
 *
 */
function loadCommentsFromServer(pageId: number | string, successCallback: (res: PostListResponse) => void, errorCallback = () => {}) {
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

/**
 * Tested 1.
 */
function loadAllCommentsFromServer(successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
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

/**
 * Tested 1.
 *
 *
 *
 */
function search(keyword: string, successCallback: (res: SearchResponse) => void, errorCallback = () => {}) {
  yuanjs.ajax({
    type: "POST",
    url: "index.php?controller=search",
    data: {s:keyword},
    dataType: 'json',
    success: successCallback,
    error: errorCallback,
  });
}

/**
 * Tested 1.
 *
 *
 *
 */
function createPost(comment: any, successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
  comment.ajax = true;
    yuanjs.ajax({
      type: "POST",
      url: "./index.php?controller=post&action=create",
      data: comment,
      success: successCallback,
      error: errorCallback
    });
}

/**
 * Tested 1.
 *
 *
 */
function getAppConfigACP(successCallback: (res: ConfigResponse) => void, errorCallback = () => {}) {
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

/**
 * Tested 1.
 */
function updateSiteConfig(configObj: any, successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
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

/**
 * Tested 1.
 */
function getAllUsers(successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
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

/**
 * Tested 1.
 */
function deleteAllReplies(successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
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

/**
 * Tested 1.
 */
function deleteAllComments(successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
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

/**
 * Tested 1.
 */
function deleteAllUsers(successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
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

/**
 * Tested 1.
 */
function deleteComment(commentId: number, reply: string, successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
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

/**
 * Tested 1.
 */
function deleteMutiComments(dataObj: number[], successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
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

/**
 * Tested 1.
 *
 */
function deleteReply(commentId: number, successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
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

/**
 * Tested 1.
 */
function deleteUser(uid: number, successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
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

/**
 * Tested 1.
 */
function deleteMutiUsers(uids: Array<string | number>, successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
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

/**
 * Tested 1.
 *
 *
 */
function getTranslations(successCallback: (res: TranslationResponse) => void, errorCallback = () => {}) {
  yuanjs.ajax({
    type: "GET",
    url: 'index.php?controller=config&action=getTranslations',
    dataType: "json",
    success: successCallback,
    error: errorCallback
  });
}

/**
 * Tested 1.
 *
 *
 */
function getSystemInformation(successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
  yuanjs.ajax({
    type: "GET",
    url: 'index.php?controller=site&action=getSystemInformation',
    dataType: "json",
    success: successCallback,
    error: errorCallback
  });
}

/**
 * Tested 1.
 * Create a reply.
 *
 */
function createReply(replyData: any, successCallback?: (res: any) => void, errorCallback ?: (e: any) => void) {
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

/**
 * Tested 1.
 */
function updateReply(replyData: any, successCallback?: (res: any) => void, errorCallback?: (e: any) => void) {
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

/**
 * Tested 1.
 */
function updateComment(commentData: UpdateCommentObj, successCallback?: (res: any) => void, errorCallback ?: (e: any) => void) {
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

/**
 * Tested 1.
 */
function getIPBlackList(successCallback: (res: any) => void, errorCallback?: (e: any) => void) {
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