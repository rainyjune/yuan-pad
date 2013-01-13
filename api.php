<?php
/**
 * @author rainyjune <rainyjune@live.cn>
 * @version $Id$
 */
session_start();
define('IN_MP',true);
define('APPROOT', dirname(__FILE__));
define('DEBUG_MODE', true);
define('API_MODE', true);
include APPROOT.'/includes/api_code.php';
#define('DEBUG_MODE', false);
require_once('./includes/preload.php');
ZFramework::app()->run();
