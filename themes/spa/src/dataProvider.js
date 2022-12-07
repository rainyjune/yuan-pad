const yuanjs = require('@rainyjune/yuanjs');

/**
 * Tested 1.
 */
function banIP(ip, successCallback, errorCallback) {
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
function deleteMultiIPs(ips, successCallback, errorCallback) {
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
function signIn(credentials, successCallback, errorCallback) {
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
function loadUserDataFromServer(uid, successCallback, errorCallback) {
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
function getUserInfo(successCallback, errorCallback) {
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
function getAppConfig(successCallback, errorCallback) {
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
function signOut(successCallback, errorCallback) {
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
function updateUser(userData, successCallback, errorCallback) {
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
function signUp(userData, successCallback, errorCallback) {
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
function loadCommentsFromServer(pageId, successCallback, errorCallback) {
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
function loadAllCommentsFromServer(successCallback, errorCallback) {
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
function search(keyword, successCallback, errorCallback) {
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
function createPost(comment, successCallback, errorCallback) {
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
function getAppConfigACP(successCallback, errorCallback) {
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
function updateSiteConfig(configObj, successCallback, errorCallback) {
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
function getAllUsers(successCallback, errorCallback) {
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
function deleteAllReplies(successCallback, errorCallback) {
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
function deleteAllComments(successCallback, errorCallback) {
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
function deleteAllUsers(successCallback, errorCallback) {
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
function deleteComment(commentId, reply, successCallback, errorCallback) {
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
function deleteMutiComments(dataObj, successCallback, errorCallback) {
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
function deleteReply(commentId, successCallback, errorCallback) {
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
function deleteUser(uid, successCallback, errorCallback) {
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
function deleteMutiUsers(uids, successCallback, errorCallback) {
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
function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length == 2) {
    return parts.pop().split(";").shift();
  } else {
    return null;
  }
}

/**
 * Tested 1.
 *
 *
 */
function getTranslations(successCallback, errorCallback) {
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
function getSystemInformation(successCallback, errorCallback) {
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
function createReply(replyData, successCallback, errorCallback) {
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
function updateReply(replyData, successCallback, errorCallback) {
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
function updateComment(commentData, successCallback, errorCallback) {
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
function getIPBlackList(successCallback, errorCallback) {
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