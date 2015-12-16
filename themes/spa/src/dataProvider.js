// TODO => POST
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

function deleteAllReplies(successCallback, errorCallback) {
  yuanjs.ajax({
    type: "GET",
    url: 'api.php',
    data: {controller: "reply", action: "reply"},
    //dataType: "json",
    success: successCallback,
    error: errorCallback
  });
}

function deleteAllComments(successCallback, errorCallback) {
  yuanjs.ajax({
    type: "POST",
    url: 'api.php',
    data: {controller: "post", action: "deleteAll"},
    dataType: "json",
    success: successCallback,
    error: errorCallback
  });
}

function deleteAllUsers(successCallback, errorCallback) {
  yuanjs.ajax({
    type: "POST",
    url: 'api.php?controller=user&action=deleteAll',
    dataType: "json",
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

function deleteMutiComments(dataObj, successCallback, errorCallback) {
  yuanjs.ajax({
    type: "POST",
    url: "api.php?controller=post&action=delete_multi_messages",
    data: dataObj,
    dataType: "json",
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

function deleteUser(uid, successCallback, errorCallback) {
  yuanjs.ajax({
    type: "POST",
    url: "api.php?controller=user&action=delete",
    data: {uid: uid},
    dataType: "json",
    success: successCallback,
    error: errorCallback
  });
}

/**
 * Get cookie value by a specific name.
 * http://stackoverflow.com/a/15724300
 */
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
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
 * Create or update a reply.
 *
 */
function reply(replyData, successCallback, errorCallback) {
  var formData = {
    mid: replyData.pid,
    content: replyData.content
  };
  if (replyData.rid) {
    formData.update = 1;
  }
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

module.exports = {
  banIP: banIP,
  createPost: createPost,
  deleteAllComments: deleteAllComments,
  deleteAllReplies: deleteAllReplies,
  deleteAllUsers: deleteAllUsers,
  deleteComment: deleteComment,
  deleteMutiComments: deleteMutiComments,
  deleteReply: deleteReply,
  deleteUser: deleteUser,
  getAppConfig: getAppConfig,
  getAppConfigACP: getAppConfigACP,
  getAllUsers: getAllUsers,
  getSystemInformation: getSystemInformation,
  getTranslations: getTranslations,
  reply: reply,
  signIn: signIn,
  signOut: signOut,
  signUp: signUp,
  updateComment: updateComment,
  updateUser: updateUser,
  loadAllCommentsFromServer: loadAllCommentsFromServer,
  loadCommentsFromServer: loadCommentsFromServer,
  loadUserDataFromServer: loadUserDataFromServer,
  getUserInfo: getUserInfo,
  search: search,
  updateSiteConfig: updateSiteConfig
};