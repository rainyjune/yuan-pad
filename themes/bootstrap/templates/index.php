<?php if(!defined('IN_MP')){die('Access denied!');} ?>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charset="utf-8" />
    <title><?php echo t('WELCOME',array('{site_name}'=>ZFramework::app()->board_name));?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="Cache-Control" content="no-cache,must-revalidate" />
    <meta http-equiv="expires" content="0" />
    <!-- Bootstrap -->
    <link href="<?php echo './themes/'.ZFramework::app()->theme.'/css/bootstrap.min.css';?>" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link href="misc/prettify.css" rel="stylesheet" />
    <script src="misc/prettify.js"></script>
    <!-- Custom styles for this template -->
    <link href="<?php echo './themes/'.ZFramework::app()->theme.'/css/index.css';?>" rel="stylesheet">
  </head>

  <body>
    <div class="container">
    
      <div class="page-header">
        <h1><?php echo t('WELCOME_POST');?></h1>
      </div>
      
      <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
          <ul class="nav navbar-nav">
            <li><a href="#postForm">Post</a></li>
          </ul>
          <p class="navbar-text navbar-right">
            <?php if(ZFramework::app()->site_close):?><span class="notice"><?php echo t('OFF_LINE_MODE');?></span><?php endif;?>
            <?php
            if(!isset ($_SESSION['admin']) && !isset ($_SESSION['user'])) {
                echo '<a data-toggle="modal" data-target="#myModal" href="index.php?controller=user&amp;action=create">'.t('REGISTER').'</a>&nbsp;';
                echo '<a data-toggle="modal" data-target="#myModal" href="index.php?controller=user&amp;action=login">'.t('LOGIN').'</a>';
            }
            if(isset ($_SESSION['user']) || isset ($_SESSION['admin']))
                echo 'Hello, '.(isset ($_SESSION['user']) ?  $_SESSION['user'] : $_SESSION['admin']).' <a href="index.php?controller=user&amp;action=logout">'.t('LOGOUT').'</a>';
            if(isset ($_SESSION['user']))
                echo '&nbsp;<a class="thickbox" href="index.php?controller=user&amp;action=update&amp;uid='.$_SESSION['uid'].'&amp;width=600&amp;height=50%">'.t('UPDATE').'</a>';
            ?>
          </p>
          <form class="navbar-form navbar-right" role="search" id="postForm">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Search">
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
          </form>
        </div>
      </nav>
      
      <!-- Main Table Start-->
      <div class="table-responsive">
        <table class="table table-bordered">
          <?php foreach($data as $m){?>
          <tr>
            <td class="col-md-3 col-xs-2"><?php echo (int)$m['uid']?$m['b_username']:$m['user'];?></td>
            <td class=""><?php echo nl2brPre($m['post_content']);?></td>
          </tr>
          <?php }?>
        </table>
      </div>
      <!-- Main Table End-->
      
      <?php if(ZFramework::app()->page_on){?>
      <ul class="pagination">
        <?php for($i=0;$i<$pages;$i++){?>
          <li <?php if($i==$current_page){ echo 'class="active"';} ?>>
            <a href='index.php?pid=<?php echo $i;?>'>
              <?php echo $i + 1; ?>
            </a>
          </li>
        <?php }?>
      </ul>
      <?php }?>
      
      <!-- Form Start-->
      <div class="container-fluid">
        <form role="form" action="index.php?controller=post&amp;action=create" method="post">
          <input id="pid" type="hidden" name="pid" value="<?php echo @$_GET['pid'];?>" />
          <div class="form-group">
            <label for="user"><?php echo t('NICKNAME');?></label>
            <?php if($admin == true){?>
            <input name="user" id="user" type="hidden" maxlength="10" value="<?php echo $adminName;?>" /><?php echo $adminName;?>
            <?php }elseif(isset($_SESSION['user'])){ ?>
            <input name="user" id="user" type="hidden" maxlength="10" value="<?php echo $_SESSION['user'];?>" /><?php echo $_SESSION['user'];?>
            <?php }else{?>
            <input class="form-control" name="user" id="user" type="text" maxlength="10" value="anonymous" />
            <?php }?>
          </div>
          <div class="form-group">
            <label for="content"><?php echo t('CONTENT');?></label>
            <textarea id="content" name="content" class="form-control" rows="3"></textarea>
          </div>
          <?php if(ZFramework::app()->valid_code_open && gd_loaded()){?>
          <div class="form-group">
              <label for="content"><?php echo t('VALIDATE_CODE');?></label>
              <input class="form-control" id="valid_code" type="text" name="valid_code" size="4" maxlength="4" />&nbsp;<img id="captcha_img" src="index.php?action=captcha" title="<?php echo t('CLICK_TO_REFRESH');?>" alt="<?php echo t('CAPTCHA');?>" />
          </div>
          <?php }?>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <!-- Form End-->

    </div>
    
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content"></div><!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
    
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="<?php echo './themes/'.ZFramework::app()->theme.'/js/bootstrap.min.js';?>"></script>
    <script src="<?php echo './themes/'.ZFramework::app()->theme.'/js/index.js';?>"></script>
  </body>
</html>