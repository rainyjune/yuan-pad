<?php if(!defined('IN_MP')){die('Access denied!');} ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title><?php echo t('ACP_INDEX');?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <link href="<?php echo './themes/'.ZFramework::app()->theme.'/css/bootstrap.min.css';?>" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <!-- Custom styles for this template -->
    <link href="<?php echo './themes/'.ZFramework::app()->theme.'/css/admin.css';?>" rel="stylesheet">
  </head>
  
  <body>
    <div class="container">
    
      <div class="bg-info text-right">
        <?php if(ZFramework::app()->site_close):?><span class="text-right bg-warning"><?php echo t('OFF_LINE_MODE');?></span><?php endif;?>
        <a href="index.php"><?php echo t('HOME');?></a>&nbsp;<a href="index.php?controller=user&amp;action=logout" title="<?php echo t('LOGOUT');?>"><?php echo t('LOGOUT');?></a>
      </div>
      
      <!-- Nav tabs -->
      <ul class="nav nav-tabs">
        <?php for($i=0,$c=count($tabs_array);$i<$c;$i++) { ?>
        <li <?php if($current_tab==$tabs_array[$i]) { echo 'class="active"';} ?>><a data-toggle="tab" href="<?php if($current_tab==$tabs_array[$i]) { echo '#'.$tabs_array[$i];} else { echo "index.php?action=control_panel&subtab={$tabs_array[$i]}"; } ?>"><?php echo $tabs_name_array[$i];?></a></li>
        <?php } ?>
      </ul>
      
      <!-- Tab panes -->
      <div class="tab-content">
        <div class="tab-pane active" id="user">
          <form id="user_manage" action="index.php?controller=user&amp;action=delete_multi" method="post">
          <table width="800px">
            <thead>
                <tr class="header">
                    <th class="span-1"><?php echo t('SELECT');?></th><th class="span-3"><?php echo t('NICKNAME');?></th><th class="span-6"><?php echo t('EMAIL');?></th><th><?php echo t('OPERATION');?></th>
                </tr>
            </thead>
          <?php foreach($users as $u){?>
          <tr>
              <td><input type='checkbox' name='select_uid[]' value='<?php echo $u['uid'];?>' /></td>
              <td><?php echo $u['username'];?></td>
              <td><?php echo $u['email'];?></td>
                                <td><a href='index.php?controller=user&amp;action=delete&amp;uid=<?php echo $u['uid'];?>'><?php echo t('DELETE');?></a>
                                    <a class="ex2trigger" href='index.php?controller=user&amp;action=update&amp;uid=<?php echo $u['uid'];?>'><?php echo t('UPDATE');?></a>
              </td>
          </tr>
               <?php }?>

          <tr>
              <td colspan='4'>
                                    <span class="check_span"><a href="#" id="m_checkall"><?php echo t('CHECK_ALL');?></a> &nbsp;
            <a href="#" id="m_checknone"><?php echo t('CHECK_NONE');?></a> &nbsp;
            <a href="#" id="m_checkxor"><?php echo t('CHECK_INVERT');?></a>&nbsp;</span>
            <input type='submit' value='<?php echo t('DELETE_CHECKED');?>' />&nbsp;
            <a id="deleteallLink" href="index.php?controller=post&amp;action=deleteAll"><?php echo t('DELETE_ALL');?></a>&nbsp;
                                    <?php if(is_flatfile()):?><a href="index.php?controller=backup&amp;action=create"><?php echo t('BACKUP');endif;?></a>
              </td></tr>

          </table>
          </form>
        </div>
      </div>
    
      <div class="ft">
          Powered by <a href="http://yuan-pad.googlecode.com/">YuanPad <?php echo MP_VERSION;?></a>
      </div><!-- footer -->

    </div>
  </body>
</html>