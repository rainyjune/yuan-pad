<?php 
if(!defined('IN_MP')){die('Access denied!');} 

$app = ZFramework::app();
$theme = $app->theme;
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="./themes/<?= $theme ?>/scripts/blueprint/screen.css" type="text/css" media="screen, projection" />
    <link rel="stylesheet" href="./themes/<?= $theme ?>/scripts/blueprint/print.css" type="text/css" media="print" />
    <!--[if lt IE 8]><link rel="stylesheet" href="/themes/<?= $theme ?>/scripts/blueprint/ie.css" type="text/css" media="screen, projection" /><![endif]-->
    <link type="text/css" rel="stylesheet" href="//cdn.jsdelivr.net/jqmodal/0.1/jqModal.css" />
    <link type="text/css" rel="stylesheet" href="./themes/<?= $theme ?>/scripts/index.css" />
    <link type="text/css" rel="stylesheet" href="./themes/<?= $theme ?>/scripts/jqModal_frame.css" />
    <title><?php echo t('WELCOME',array('{site_name}'=>$app->board_name));?></title>
  </head>

  <body>
    <div class="container">
      <div id="hd">
        <div class="right">
          <?php if($app->site_close):?>
          <span class="notice"><?php echo t('OFF_LINE_MODE');?></span>
          <?php endif;?>

          <?php if(!isset ($_SESSION['admin']) && !isset ($_SESSION['user'])): ?>
          <a class="thickbox" href="index.php?controller=user&amp;action=create&amp;width=630&amp;height=45%"><?= t('REGISTER') ?></a>&nbsp;
          <a href="index.php?controller=user&amp;action=login"><?= t('LOGIN') ?></a>
          <?php endif;?>
          <?php if(isset ($_SESSION['user']) || isset ($_SESSION['admin'])): ?>
          <a href="index.php?controller=user&amp;action=logout"><?= t('LOGOUT') ?></a>
          <?php endif;?>
          <?php if(isset ($_SESSION['user'])): ?>
          &nbsp;<a class="thickbox" href="index.php?controller=user&amp;action=update&amp;uid=<?= $_SESSION['uid'] ?>&amp;width=600&amp;height=50%"><?= t('UPDATE') ?></a>
          <?php endif;?>
        </div>
        <h1><?php echo t('WELCOME_POST');?></h1>
      </div><!--  header  -->

      <div id="bd">
        <div class="yui-g">
          <table id="main_table">
            <thead>
              <tr class="header">
                <th class="span-4"><?php echo t('NICKNAME');?></th>
                <th class="span-17"><?php echo t('MESSAGE');?></th>
                <th class="span-3"><?php echo t('TIME');?></th>
              </tr>
            </thead>
            <tbody>
              <?php foreach($data as $m){?>
              <tr>
                <td><?php echo (int)$m['uid']?$m['b_username']:$m['user'];?></td>
                <td><div style='word-wrap: break-word;word-break:break-all;width:450px;'><?php echo nl2brPre($m['post_content']);?><br />
                      <?php if(@$m['reply_content']){ echo t('ADMIN_REPLIED',array('{admin_name}'=>$app->admin,'{reply_time}'=>$m['reply_time'],'{reply_content}'=>$m['reply_content']));}?></div>
                  </td>
                <td><?php echo $m['time'];?></td>
              </tr>
              <?php }?>
            </tbody>
          </table>
        </div>
        <?php if($app->page_on){?>
        <div id="pagination">
          <?php echo t('PAGE_NAV',array('{num_of_post}'=>$nums,'{num_of_page}'=>$pages));?>
          <span id="pagenumString">
          <?php for($i=0;$i<$pages;$i++){?>
            <a href='index.php?pid=<?php echo $i;?>'> <?php if($i==$current_page){ echo '<font size="+2">'.($i+1)."</font>";}else{ echo $i+1;} ?> </a>&nbsp;
          <?php }?>
          </span>
        </div>
        <?php }?>
        <div style="text-align:center"><h4><span id="toggleForm"><?php echo t('CLICK_POST');?></span></h4></div>
        <div class="span-20" style="overflow: visible;">
          <div id="returnedError"></div>
          <form id="guestbook" name="guestbook" action="index.php?controller=post&amp;action=create" method="post">
            <input id="pid" type="hidden" name="pid" value="<?php echo @$_GET['pid'];?>" />
            <table id="add_table">
              <tr>
                <td class="span-3"><?php echo t('NICKNAME');?></td>
                <td>
                              <?php if($admin == true){?>
                              <input name="user" id="user" type="hidden" maxlength="10" value="<?php echo $adminName;?>" /><?php echo $adminName;?>
                              <?php }elseif(isset($_SESSION['user'])){ ?>
                              <input name="user" id="user" type="hidden" maxlength="10" value="<?php echo $_SESSION['user'];?>" /><?php echo $_SESSION['user'];?>
                              <?php }else{?>
                              <input name="user" id="user" type="text" maxlength="10" value="anonymous" />
                              <?php }?>
                </td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td><?php echo t('CONTENT');?></td>
                <td><textarea id="content" name="content" cols="45" rows="8" ></textarea></td>
                <td><div id='smileys'><?php echo $smileys;?></div>&nbsp;<br /><p><?php if(ConfigController::FILTER_TRIPTAGS==$app->filter_type){ echo t('ALLOWED_TAGS', array('{allowed_tags}'=> htmlentities($app->allowed_tags)));}?></p></td>
              </tr>
              <?php if($app->valid_code_open && gd_loaded()){?>
              <tr>
                <td class="l"><?php echo t('VALIDATE_CODE');?></td>
                <td class="left"><input id="valid_code" type="text" name="valid_code" size="4" maxlength="4" />&nbsp;<img id="captcha_img" src="index.php?action=captcha" title="<?php echo t('CLICK_TO_REFRESH');?>" alt="<?php echo t('CAPTCHA');?>" /></td>
                <td class="left">&nbsp;</td>
              </tr>
              <?php }?>
              <tr>
                <td>&nbsp;</td>
                <td colspan="2"><input id="submit" name="submit" type="submit"  value="<?php echo t('SUBMIT');?>" /><span id="post_shortcut" style="display:none"><?php echo t('POST_SHORTCUT');?></span></td>
              </tr>
            </table>
          </form>
        </div>
        <div class="clear">
          <form action="index.php?controller=search" method="post">
            <input id="search" type="text" size="10" value="Search" name="s">
            <input type="image" src="misc/images/search.gif" value="Search" alt="Search" name="searchImg">
          </form>
        </div>
      </div><!-- body -->

      <div class="clear"><?php echo htmlspecialchars_decode($app->copyright_info);?> <a href="mailto:<?php echo $app->admin_email;?>"><?php echo t('ADMIN_EMAIL');?></a> <?php if(!isset($_SESSION['user'])): ?><a href="index.php?action=control_panel"><?php echo t('ACP');?></a><?php endif;?> Powered by <a href="https://github.com/rainyjune/yuan-pad" target="_blank" title="Find More">YuanPad <?php echo MP_VERSION;?></a> <a href="index.php?action=rss"><img src="misc/images/rss-icon.png" alt="rss" /></a></div><!-- footer -->

      <!-- jqModal window -->
      <div id="modalWindow" class="jqmWindow">
        <div id="jqmTitle">
          <button class="jqmClose">X</button>
        </div>
        <iframe id="jqmContent" src=""></iframe>
      </div>
      <!-- end of jqModal window -->
    </div>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
    <script src="//cdn.jsdelivr.net/jqmodal/0.1/jqModal.js"></script>
    <script src="//cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js" type="text/javascript"></script>
    <script type="text/javascript" src="./themes/<?= $theme ?>/scripts/dataProvider.js"></script>
    <script type="text/javascript" src="./themes/<?= $theme ?>/scripts/indexModal.js"></script>
    <script type="text/javascript" src="./themes/<?= $theme ?>/scripts/index.js"></script>
  </body>
</html>
