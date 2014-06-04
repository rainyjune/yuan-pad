$(function () {
  console.log("Index page ready.");
  
  // Fix the issue: Twitter bootstrap remote modal shows same content everytime
  $('body').on('hidden.bs.modal', '.modal', function () {
    $(this).removeData('bs.modal');
  });
  
});