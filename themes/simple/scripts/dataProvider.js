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
