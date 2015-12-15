<?php
/**
 * Bootstrap file
 * @author rainyjune <rainyjune@live.cn>
 * 
 */
if(!defined('IN_MP')){die('Access denied!');}
if(version_compare(PHP_VERSION,'5.2.0','<')){die('PHP Version 5.2.0+ required!');}
date_default_timezone_set('UTC');

if (defined('DEBUG_MODE') && DEBUG_MODE) {
    error_reporting(E_ALL);
} else {
    error_reporting(0);
}

require 'functions.php';

ini_set('arg_separator.output',     '&amp;');
ini_set('magic_quotes_runtime',     0);
ini_set('magic_quotes_sybase',      0);
if(get_magic_quotes_gpc())
{
    $_POST	=array_map('stripslashes_deep',$_POST);
    $_GET	=array_map('stripslashes_deep',$_GET);
    $_COOKIE=array_map('stripslashes_deep',$_COOKIE);
    $_REQUEST=array_map('stripslashes_deep',$_REQUEST);
}

maple_unset_globals();

//Load database library
require APPROOT.'/includes/database/YDB.php';
//Load the configuration file
if(file_exists(conf_path().'/config.php')) {
    include_once conf_path().'/config.php';
} else {
    include './sites/default/default.config.php';
}

define('CONFIGFILE', conf_path().'/config.php');
define('MP_VERSION','1.2');
define('THEMEDIR', 'themes/');
define('PLUGINDIR', 'plugins/');

define('FILTER_TRIPTAGS', 1);
define('FILTER_ESCAPE', 2);

include_once 'Imgcode.php';
// Load ZFramework
require 'ZFramework.php';

$gd_exist=gd_loaded();
$zip_support=class_exists('ZipArchive')?'On':'Off';

if(is_installed()){
    if(is_baned(getIP())) {
        die('Access denied!');
    }
} elseif ($_GET['action']!='install'){
    header("Location:index.php?action=install");exit;
}