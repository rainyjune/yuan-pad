<?php
/**
 * @author rainyjune <rainyjune@live.cn>
 * @link http://yuan-pad.googlecode.com/
 * @copyright Copyright &copy; 2008-2011 rainyjune
 * @license GPL2
 * @version $Id: index.php 584 2011-09-17 01:21:57Z dreamneverfall@gmail.com $
 */

session_start();
define('IN_MP',true);
define('APPROOT', dirname(__FILE__));
define('DEBUG_MODE', true);
#define('DEBUG_MODE', false);
require_once('./includes/preload.php');
ZFramework::app()->run();
