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
      <div id="login_error" class="bg-warning"><?php echo $errorMsg;?><br /></div>
      <?php  endif;?>
    
      <form action="index.php?controller=user&amp;action=update&amp;uid=<?php echo $_GET['uid'];?>" method="post">
      <div class="inputbox">
      <dl>
      <dt><?php echo t('USERNAME');?></dt>
      <dd><input type="text" readonly="readonly" value="<?php echo $user_data['username'];?>" name="user" id="user" size="20" onfocus="this.style.borderColor='#F93'" onblur="this.style.borderColor='#888'" />
      </dd>
      </dl>
      <dl>
      <dt><?php echo t('PASSWORD');?></dt>
      <dd><input type="password" value="<?php echo $user_data['password'];?>" id="password" name="pwd" size="20" onfocus="this.style.borderColor='#F93'" onblur="this.style.borderColor='#888'" />
      </dd>
      </dl>
      <dl>
      <dt><?php echo t('EMAIL');?></dt>
      <dd><input type="text" value="<?php echo $user_data['email'];?>" id="email" name="email" size="20" onfocus="this.style.borderColor='#F93'" onblur="this.style.borderColor='#888'" />
      </dd>
      </dl>
      </div>
      <div class="butbox">
      <dl>
      <dt><input id="submit_button" name="submit" type="submit" value="<?php echo t('UPDATE');?>" /></dt>
      </dl>
      </div>
      </form>
    </div>    
  </body>
</html>