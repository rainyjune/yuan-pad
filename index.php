<?php
/**
 * @author rainyjune <rainyjune@live.cn>
 * @link https://github.com/rainyjune/yuan-pad 
 * @copyright Copyright &copy; 2008-2011 rainyjune
 * @license GPL2
 * @version $Id$
 */

session_start();
define('IN_MP',true);
define('APPROOT', dirname(__FILE__));
define('DEBUG_MODE', true);
#define('DEBUG_MODE', false);
include APPROOT.'/includes/api_code.php';
require_once('./includes/preload.php');
ZFramework::app()->run();
