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
    <link href="misc/prettify.css" rel="stylesheet" />
    <script src="misc/prettify.js"></script>
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
        <li <?php if($current_tab==$tabs_array[$i]) { echo 'class="active"';} ?>><a data-toggle="tab" href="#<?php echo $tabs_array[$i];?>"><?php echo $tabs_name_array[$i];?></a></li>
        <?php } ?>
        <li><a href="index.php?controller=user"><?php echo t('USER_ADMIN');?></a></li>
      </ul>
      
      <!-- Tab panes -->
      <div class="tab-content">
        <div class="tab-pane active" id="overview">
          <table>
          <tr>
          <td><h1><?php echo t('WELCOME_SYS');?></h1></td>
          </tr>
          <tr>
          <td ><?php echo t('THANKS');?></td>
          </tr>
          </table>
          <table>
          <tr>
          <td colspan="2" ><b><?php echo t('STATS_INFO');?></b></td>
          </tr>
          <tr>
          <td ><?php echo t('NUM_POSTS');?>：</td><td align="right"><?php echo $nums;?></td>
          </tr>
          <tr>
          <td ><?php echo t('NUM_REPLY');?>：</td><td align="right"><?php echo $reply_num;?></td>
          </tr>
          <tr>
          <td ><?php echo t('MP_VERSION');?>：</td><td align="right"><?php echo MP_VERSION;?></td>
          </tr>
          <tr>
          <td  colspan="2"><b><?php echo t('SYS_INFO');?></b></td>
          </tr>
          <tr>
          <td ><?php echo t('PHP_VERSION');?>：</td><td align="right"><?php echo PHP_VERSION;?></td>
          </tr>
          <tr>
          <td ><?php echo t('GD_VERSION');?>： </td><td align="right"><?php echo $gd_version;?></td>
          </tr>
          <tr>
          <td >Register_Globals：</td><td align="right"><?php echo $register_globals;?></td>
          </tr>
          <tr>
          <td >Magic_Quotes_Gpc：</td><td align="right"><?php echo $magic_quotes_gpc;?></td>
          </tr>
          <tr>
          <td >ZipArchive：</td><td align="right"><?php echo $zip_support;?></td>
          </tr>
          </table>
        </div>
        <div class="tab-pane" id="siteset">
          <form action="index.php?controller=config&amp;action=update" method="post">
          <fieldset>
          <legend><?php echo t('SYS_CONF');?></legend>
          <table>
          <tr>
          <td><?php echo t('BOARD_NAME');?>:</td><td><input name="board_name" type="text" size="20" value="<?php echo ZFramework::app()->board_name;?>" /></td>
          </tr>
          <tr>
          <td><?php echo t('CLOSE_BOARD');?>:</td><td><input name="site_close" type="radio" value="1"
          <?php if(ZFramework::app()->site_close==1){?> checked='checked' <?php }?> /><?php echo t('YES');?><input name="site_close" type="radio" value="0" <?php if(ZFramework::app()->site_close==0){?> checked='checked' <?php }?> /><?php echo t('NO');?></td>
          </tr>
          <tr>
          <td><?php echo t('CLOSE_REASON');?>:</td><td><textarea  class="span-9" name="close_reason" cols="30" rows="3"><?php echo ZFramework::app()->close_reason;?></textarea></td>
          </tr>
          <tr>
          <td><?php echo t('ADMIN_EMAIL');?>:</td><td><input name="admin_email" type="text" size="20" value="<?php echo ZFramework::app()->admin_email;?>" /></td>
          </tr>
          <tr>
          <td><?php echo t('COPY_INFO');?>:</td><td><textarea class="span-9" name="copyright_info" cols="30" rows="3"><?php echo ZFramework::app()->copyright_info;?></textarea></td>
          </tr>
          <tr>
          <td><?php echo t('SYS_THEME');?>:</td><td><select name="theme"><?php foreach ($themes as $per_theme){?><option value="<?php echo $per_theme;?>" <?php if($per_theme==ZFramework::app()->theme){echo 'selected="selected"';}?>><?php echo $per_theme;?></option><?php }?></select></td>
          </tr>
          <tr>
          <td><?php echo t('TIMEZONE');?>:</td>
          <td>
          <select name="timezone">

          <?php foreach ($timezone_array as $key=>$per_timezone)
          {
          ?>
          <option value="<?php echo $key;?>" <?php if($key==ZFramework::app()->timezone){echo 'selected="selected"';}?>>
          <?php echo $per_timezone;?></option>
          <?php }?>

          </select>
          </td>
          </tr>
          <tr>
          <td><?php echo t('LANG');?>:</td><td><select name="lang"><?php foreach ($languages as $language){?><option value="<?php echo $language;?>" <?php if($language==ZFramework::app()->lang){echo 'selected="selected"';}?>><?php echo $language;?></option><?php }?></select></td>
          </tr>
          </table>
          </fieldset>
          <fieldset>
          <legend><?php echo t('POST_CONF');?></legend>
          <table>
          <tr>
          <td><?php echo t('FILTER_WORDS');?>：</td><td><textarea class="span-9" name="filter_words" cols="20" rows="3"><?php echo ZFramework::app()->filter_words;?></textarea></td>
          </tr>
          <tr>
          <td><?php echo t('ENABLE_CAPTCHA');?>：</td>
          <td>
          <?php if(gd_loaded()):?>
          <input name="valid_code_open" type="radio" value="1" <?php if(ZFramework::app()->valid_code_open==1){?> checked='checked' <?php }?> /><?php echo t('YES');?><input name="valid_code_open" type="radio" value="0" <?php if(ZFramework::app()->valid_code_open==0){?> checked='checked' <?php }?> /><?php echo t('NO');?>
          <?php else: ?>
          <input name="valid_code_open" type="radio" value="1" /><?php echo t('YES');?><input name="valid_code_open" type="radio" value="0" checked='checked' /><?php echo t('NO');?><?php echo t('GD_DISABLED_NOTICE');?>
          <?php endif;?>
          </td>
          </tr>
          <tr>
          <td><?php echo t('ENABLE_PAGE');?>：</td><td><input name="page_on" type="radio" value="1" <?php if(ZFramework::app()->page_on==1){?> checked='checked' <?php }?> /><?php echo t('YES');?><input name="page_on" type="radio" value="0" <?php if(ZFramework::app()->page_on==0){?> checked='checked'<?php }?> /><?php echo t('NO');?></td>
          </tr>
          <tr>
          <td><?php echo t('POST_PERPAGE');?>：</td><td><input name="num_perpage" type="text" value="<?php echo ZFramework::app()->num_perpage;?>" /><?php echo t('PAGINATION_TIP');?></td>
          </tr>
          <tr>
          <td><?php echo t('FILTER_HTML_TAGS');?>：</td><td><input name="filter_type" type="radio" value="1" <?php if(ZFramework::app()->filter_type==1){?> checked='checked' <?php }?> /><?php echo t('STRIP_DISALLOWED_TAGS');?><input name="filter_type" type="radio" value="2" <?php if(ZFramework::app()->filter_type==2){?> checked='checked'<?php }?> /><?php echo t('ESCAPE_ALL_TAGS');?></td>
          </tr>
          <tr>
          <td><?php echo t('ALLOWED_HTML_TAGS');?>：</td><td><input name="allowed_tags" type="text" value="<?php echo ZFramework::app()->allowed_tags;?>" /></td>
          </tr>
          </table>
          </fieldset>
          <fieldset>
          <legend><?php echo t('ADMIN_CONF');?></legend>
          <table>
          <tr>
          <td><?php echo t('CHANGE_PWD');?>:</td><td ><input name="password" type="password"  />&nbsp;<?php echo t('PWD_TIP');?></td>
          </tr>
          </table>
          </fieldset>
          <input type="submit" value="<?php echo t('SUBMIT');?>" /><input type="reset" value="<?php echo t('RESET');?>" />
          </form>
        </div>
        <div class="tab-pane" id="message">
          <form id="message_manage" action="index.php?controller=post&amp;action=delete_multi_messages" method="post">
          <table width="800px">
          <thead>
          <tr class="header">
          <th class="span-1"><?php echo t('SELECT');?></th><th class="span-3"><?php echo t('NICKNAME');?></th><th class="span-15"><?php echo t('MESSAGE');?></th><th><?php echo t('OPERATION');?></th>
          </tr>
          </thead>
          <?php foreach($data as $m){?>
          <tr>
          <td><input type='checkbox' name='select_mid[]' value='<?php echo $m['id'];?>' />
          <input type='hidden' name='<?php echo $m['id'];?>' value='<?php if(@$m['reply']){ echo "1";}else{echo "0";}?>' />
          </td>
          <td><?php echo $m['uid']?$m['b_username']:$m['user'];?></td>
          <td  class='admin_message'>
          <div style='word-wrap: break-word;word-break:break-all;width:590px;'>
          <?php echo $m['post_content'];?><br /><?php echo t('TIME');?>：<?php echo $m['time'];?>
          <?php if($m['reply_content']){?>
          <br />
          <?php echo t('YOU_REPLIED',array('{reply_time}'=>$m['reply_time'],'{reply_content}'=>$m['reply_content']));?>
          <span>&nbsp;<a href="index.php?controller=reply&amp;action=delete&amp;mid=<?php echo $m['id'];?>"><?php echo t('DELETE_THIS_REPLY');?></a></span>
          <?php }?>
          </div>
          </td>
          <td><a href='index.php?controller=post&amp;action=delete&amp;mid=<?php echo $m['id'];?>&amp;reply=<?php if(@$m['reply']){ echo "1";}else{ echo "0";}?>'><?php echo t('DELETE');?></a>
          <a class="ex2trigger" href='index.php?controller=reply&amp;action=reply&amp;mid=<?php echo $m['id'];?>'><?php echo t('REPLY');?></a>
          <a class="ex2trigger" href='index.php?controller=post&amp;action=update&amp;mid=<?php echo $m['id'];?>'><?php echo t('UPDATE');?></a>
          <a href='index.php?controller=badip&amp;action=create&amp;ip=<?php echo $m['ip'];?>'><?php echo t('BAN');?></a></td>
          </tr>
          <?php }?>

          <tr>
          <td colspan='4'>
          <span class="check_span"><a href="#" id="m_checkall"><?php echo t('CHECK_ALL');?></a> &nbsp;
          <a href="#" id="m_checknone"><?php echo t('CHECK_NONE');?></a> &nbsp;
          <a href="#" id="m_checkxor"><?php echo t('CHECK_INVERT');?></a>&nbsp;</span>
          <input type='submit' value='<?php echo t('DELETE_CHECKED');?>' />&nbsp;
          <a id="deleteallLink" href="index.php?controller=post&amp;action=deleteAll"><?php echo t('DELETE_ALL');?></a>&nbsp;
          <a id="deleteallreplyLink" href="index.php?controller=reply&amp;action=deleteAll"><?php echo t('DELETE_ALL_REPLY');?></a>
          <?php if(is_flatfile()):?><a href="index.php?controller=backup&amp;action=create"><?php echo t('BACKUP');endif;?></a>
          </td></tr>

          </table>
          </form>
        </div>
        <div class="tab-pane" id="ban_ip">
          <form id="banip_manage" action="index.php?controller=badip&amp;action=update" method="post">
          <table class="table2">
          <thead>
          <tr class="header">
          <th><?php echo t('SELECT');?></th><th><?php echo t('BAD_IP');?></th>
          </tr>
          </thead>
          <?php foreach($ban_ip_info as $m){?>
          <tr class='admin_message'>
          <td><input type='checkbox' name='select_ip[]' value='<?php echo $m["ip"];?>' /></td>
          <td><?php echo $m["ip"];?></td>
          </tr>
          <?php }?>
          <tr><td colspan='2' align='left'><span class="check_span"><a href="#" id="ip_checkall"><?php echo t('CHECK_ALL');?></a> &nbsp; <a href="#" id="ip_checknone"><?php echo t('CHECK_NONE');?></a> &nbsp;<a href="#" id="ip_checkxor"><?php echo t('CHECK_INVERT');?></a>&nbsp;</span><input type='submit' value='<?php echo t('DELETE_CHECKED');?>' /></td></tr>
          </table>
          </form>
        </div>
      </div>
      


      <footer>
        <p class="text-center">Powered by <a href="http://yuan-pad.googlecode.com/">YuanPad <?php echo MP_VERSION;?></a></p>
      </footer><!-- footer -->

    </div>
    
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="<?php echo './themes/'.ZFramework::app()->theme.'/js/bootstrap.min.js';?>"></script>
    <script src="<?php echo './themes/'.ZFramework::app()->theme.'/js/admin.js';?>"></script>
  </body>
</html>