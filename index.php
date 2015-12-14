<?php
/**
 * @author rainyjune <rainyjune@live.cn>
 * @link https://github.com/rainyjune/yuan-pad 
 * @copyright Copyright &copy; 2008-2015 rainyjune
 * @license MIT
 */

// Makes the cookie only accessible through the HTTP protocal. This setting can effectively help to reduce identit theft through XSS attacks.
// This must be set before session_start().
ini_set('session.cookie_httponly', 1); 
session_start();
define('IN_MP',true);
define('APPROOT', dirname(__FILE__));
define('DEBUG_MODE', true);
include APPROOT.'/includes/api_code.php';
require_once('./includes/preload.php');
ZFramework::app()->run();