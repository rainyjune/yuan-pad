/**
 * @fileoverview The script files used in the installation.
 *
 */
window.onload = initAll;
function initAll() {
  var submitButton = document.getElementById('submitButton');
  var agreeButton = document.getElementById('agree');
  var theForm = document.forms[0];
  var dbTypeEle = document.getElementById('dbtype');
  if (submitButton) {
    submitButton.disabled = 'disabled';
  }
  if (agreeButton) {
    agreeButton.onclick = function() {
      if (agreeButton.checked) {
        submitButton.disabled = "";
      } else {
        submitButton.disabled = "disabled";
      }
    };
  }
  if (theForm) {
    theForm.onsubmit = function() {
      if (dbTypeEle.value == "") {
        var dbTip = dbTypeEle.options[0].text;
        alert(dbTip);
        return false;
      }
      return true;
    }
  }
}
