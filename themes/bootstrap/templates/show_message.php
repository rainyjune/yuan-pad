<?php if(!defined('IN_MP')){die('Access denied!');} ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <title><?php echo t('TIPS');?></title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <!-- Bootstrap -->
    <link href="<?php echo './themes/'.ZFramework::app()->theme.'/css/bootstrap.min.css';?>" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <?php
    if($redirect==true)
    {
      echo "<meta http-equiv='Refresh' content='$time_delay;URL=$redirect_url' />";
    }
    ?>
  </head>
  <body>
    <div class="container">
      <h2><?php echo t('MESSAGE');?></h2>

      <?php
      echo '<pre>';
      print_r($msg);
      echo '</pre>';
      ?>
      <br />
      <?php echo (ZFramework::app()->copyright_info)?htmlspecialchars_decode(ZFramework::app()->copyright_info):"Powered by YuanPad";?>

    </div>
  </body>
</html>