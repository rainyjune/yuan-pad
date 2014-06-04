<?php if(!defined('IN_MP')){die('Access denied!');} ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
<title><?php echo t('UPDATE');?></title>
</head>

<body>
    <form action="index.php?controller=post&amp;action=update" method="post">
        <input type="hidden" name="mid" value="<?php echo $mid;?>" />
        <textarea name="update_content" cols="40" rows="9"><?php echo str_replace('<br />', "\n", $message_info['content']);?></textarea><br />
        <input type="submit" name="Submit" value="<?php echo t('UPDATE');?>" />&nbsp;<a href="index.php?action=control_panel&amp;subtab=message"><?php echo t('CANCEL');?></a>
    </form>
</body>
</html>
