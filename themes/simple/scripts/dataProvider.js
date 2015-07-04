function getSysJSON(successCallback, errorCallback) {
  var d = new Date();
  $.ajax({
    type: "GET",
    url: 'index.php',
    data: {action: "getSysJSON",t:d.getTime()},
    dataType: 'json',
    cache:false,
    contentType: "application/json",
    success: successCallback,
    error: errorCallback
  });
}

function createPost(form, beforeSendCallback, successCallback, errorCallback, completeCallback) {
  $.ajax({
    type: "POST",
    url: "index.php?controller=post&action=create",
    data: form.serialize(),
    beforeSend: beforeSendCallback,
    success: successCallback,
    error: errorCallback,
    complete: completeCallback
  });
}

function getDataByPage(pageNumber, successCallback) {
  $.getJSON('index.php',
    {ajax:'yes',pid: pageNumber},
    successCallback
  );
}
