<?php if(!defined('IN_MP')){die('Access denied!');} ?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title><?php echo t('UPDATE');?></title>
        <link rel="stylesheet" href="misc/reset-fonts-grids.css" type="text/css" />
        <link rel="stylesheet" href="themes/simple/scripts/user_update.css" type="text/css">
    </head>
  <body>
      <?php if(@$errorMsg):?>
	    <div id="login_error"><?php echo $errorMsg;?><br /></div>
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
  </body>
</html>