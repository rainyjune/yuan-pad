<?php
/**
 * @version $Id$
 *
 */
if(!defined('IN_MP')){die('Access denied!');}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title><?php echo t('INSTALL_PANEL', array(), $language);?></title>
        <link rel="stylesheet" href="misc/installation.css" type="text/css">
        <script type="text/javascript" src="misc/installation.js"></script>
	</head>
	<body>
		<div id="custom-doc" class="yui-t7">
		<?php
			if($installed){
				echo t('FINISHED', array(), $language);
			}else{
		?>
			<div id="hd" role="banner">
				<div class="right"><a href="index.php?action=install&amp;l=en">English</a>&nbsp;<a href="index.php?action=install&amp;l=zh_cn">中文</a></div>
				<h1><?php echo t('INSTALL_MP', array(), $language);?></h1>
			</div>
			<div id="bd" role="main">
				<div class="yui-g">
				<?php
				if(!empty($tips)){
					echo '<ol>';
					foreach($tips as $tip)
					{
						echo '<li><font color="red">'.$tip."</font></li>";
					}
					echo '</ol>';
					echo "<a href='{$_SERVER["PHP_SELF"]}?action=install&l=$language&amp;s=".  rand()."'>".t('RETRY', array(), $language)."</a>&nbsp;";
					echo "<a href='https://github.com/rainyjune/yuan-pad' target='_blank'>".t('INSTALL_NEED_HELP', array(), $language)."</a>";
				}else{
					if(@$formError){
						echo '<p><font color="red">'.$formError.'</font></p>';
					}
					?>
				<form action="index.php?action=install&l=<?php echo $language;?>" method="post">
				<table align="center">
					<tr>
						<td><?php echo t('DB_TYPE',array(),$language); ?><span class="require">*</span></td>
						<td>
							<select id="dbtype" name="dbtype">
							<option value=""><?php echo t('DB_TYPE_SELECT',array(),$language);?></option>
							<optgroup label="FlatFile db" >
							<option value="flatfile">Text DB API</option>
							</optgroup>
							<?php $db_types=get_supported_rdbms();if($db_types):?>
							<optgroup label="RDBMS"> <!-- -->
							<?php foreach ($db_types as $key => $value):?>
							<option value="<?php echo $value;?>"><?php echo $key;?></option>
							<?php endforeach;?><!-- -->
							</optgroup>
							<?php endif;?>
							</select>
						</td><td>&nbsp;</td>
					</tr>
					<tr>
						<td><?php echo t('DB_HOST',array(),$language); ?><span class="require">*</span></td><td><input type="text" name="dbhost" value="localhost" /></td><td>&nbsp;</td>
					</tr>
					<tr>
						<td><?php echo t('DB_USER',array(),$language); ?><span class="require">*</span></td><td><input type="text" name="dbusername" maxlength="10" value="root" /></td><td>&nbsp;</td>
					</tr>
					<tr>
						<td><?php echo t('DB_PWD',array(),$language); ?></td><td><input type="text" name="dbpwd" maxlength="10" value="" /></td><td>&nbsp;</td>
					</tr>
					<tr>
						<td><?php echo t('DB_NAME',array(),$language); ?><span class="require">*</span></td><td><input type="text" name="dbname" maxlength="10" value="mapleleaf" /></td><td>&nbsp;</td>
					</tr>
					<tr>
						<td><?php echo t('TB_PREFIX',array(),$language); ?></td><td><input type="text" name="tbprefix" maxlength="10" value="mp_" /></td><td>&nbsp;</td>
					</tr>
					<tr>
						<td><?php echo t('ADMIN_USERNAME',array(),$language); ?> <span class="require">*</span></td><td><input type="text" name="adminname" />&nbsp;</td><td><?php echo t('ADMIN_USERNAME_MIN', array(), $language);?></td>
					</tr>
					<tr>
						<td><?php echo t('ADMIN_PASSWORD',array(),$language); ?><span class="require">*</span></td><td><input type="password" name="adminpass" /></td><td>&nbsp;</td>
					</tr>
					<tr>
						<td colspan="3"><input type="checkbox" name="agree" id="agree" />&nbsp;<?php echo t('INSTALL_AGREEMENT', array(), $language);?></td>
					</tr>
					<tr>
						<td colspan="3"><input id="submitButton" type="submit" value="<?php echo t('INSTALL', array(), $language);?>" /></td>
					</tr>
				</table>
				</form>
				<?php
		}
	?>
		</div>

		</div>
		<div id="ft" role="contentinfo"><p>Powered by YuanPad <?php echo MP_VERSION;?></p></div>
		<?php }?>
		</div>
	</body>
</html>
