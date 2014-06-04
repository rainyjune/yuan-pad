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
      <!-- Form Start-->
      <div class="container-fluid">
        <form role="form">
          <div class="form-group">
            <label for="userName">User name</label>
            <input type="text" class="form-control" id="userName" name="userName" placeholder="Enter user name">
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <textarea id="content" name="content" class="form-control" rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <!-- Form End-->
    </div>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="<?php echo './themes/'.ZFramework::app()->theme.'/js/bootstrap.min.js';?>"></script>
    <script src="<?php echo './themes/'.ZFramework::app()->theme.'/js/index.js';?>"></script>
  </body>
</html>