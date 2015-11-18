<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title><?php echo t('WELCOME',array('{site_name}'=>ZFramework::app()->board_name));?></title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.2/react.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.2/react-dom.min.js"></script>
    <script src="https://cdn.rawgit.com/rainyjune/yuanjs/master/build/yuan.min.js"></script>
    <script src="//cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
    <link rel="stylesheet" href="./themes/spa/css/style.css" />
  </head>
  <body>
    <div id="content"></div>
    <script src='./themes/spa/build/index.js'></script>
  </body>
</html>