<?php
/**
 * @author rainyjune <dreamneverfall@gmail.com>
 * @version $Id: api.php 591 2011-09-17 04:03:22Z dreamneverfall@gmail.com $
 * @since 1.9
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
