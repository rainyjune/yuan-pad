<?php if(!defined('IN_MP')){die('Access denied!');} ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title><?php echo t('UPDATE');?></title>
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
    
      <?php if(@$errorMsg):?>
      <div id="login_error" class="bg-danger"><?php echo $errorMsg;?><br /></div>
      <?php  endif;?>      
      
      <form role="form" action="index.php?controller=user&amp;action=update&amp;uid=<?php echo $_GET['uid'];?>" method="post">
        <div class="form-group">
          <label for="user"><?php echo t('USERNAME');?></label>
          <input type="text" readonly="readonly" class="form-control" id="user" name="user" value="<?php echo $user_data['username'];?>">
        </div>
        <div class="form-group">
          <label for="pwd"><?php echo t('PASSWORD');?></label>
          <input value="<?php echo $user_data['password'];?>" type="password" class="form-control" id="pwd" name="pwd">
        </div>
        <div class="form-group">
          <label for="email"><?php echo t('EMAIL');?></label>
          <input type="email" class="form-control" id="email" name="email" value="<?php echo $user_data['email'];?>">
        </div>

        <button type="submit" class="btn btn-default"><?php echo t('UPDATE');?></button>
      </form>
    
    </div>    
  </body>
</html>