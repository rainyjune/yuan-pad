<?php if(!defined('IN_MP')){die('Access denied!');} ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title><?php echo t('LOGIN');?></title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <!-- Bootstrap -->
    <link href="<?php echo './themes/'.ZFramework::app()->theme.'/css/bootstrap.min.css';?>" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    
    <div class="container">
      <div id="backtoindex"><a href="index.php" title="<?php echo t('WHERE_AM_I');?>">&larr; <?php echo t('BACK');?></a></div>
      <?php if(@$errormsg){?>
      <div id="login_error" class="bg-danger"><?php echo $errormsg;?><br /></div>
      <?php } ?>

      <form class="form-horizontal" role="form" action="<?php echo $_SERVER['PHP_SELF'];?>?controller=user&amp;action=login" method="post">
        <div class="form-group">
          <label for="user" class="col-sm-2 control-label"><?php echo t('USERNAME');?></label>
          <div class="col-sm-10">
            <input type="text" name="user" id="user" class="form-control">
          </div>
        </div>
        <div class="form-group">
          <label for="password" class="col-sm-2 control-label"><?php echo t('ADMIN_PWD');?></label>
          <div class="col-sm-10">
            <input type="password" name="password" id="password" class="form-control">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-10 col-sm-offset-2">
            <button type="submit" class="btn btn-default"><?php echo t('SUBMIT');?></button>
          </div>
        </div>
      </form>
    
      <footer>
      Powered by YuanPad <?php echo MP_VERSION;?>  Copyright &copy;2008-2014
      </footer>
    </div>
    
    <script>window.jQuery || document.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"><\/script>')</script>
  </body>
</html>