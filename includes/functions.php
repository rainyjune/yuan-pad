<?php
/**
 * @author rainyjune <rainyjune@live.cn>
 * @version $Id$
 */

/**
 * Validate IP Address
 *
 * @param string $ip
 * @return boolean
 */
function valid_ip($ip)
{
    return filter_var($ip,FILTER_VALIDATE_IP);
}

/**
 * Is this a POST request?
 */
function is_post() {
    if ($_SERVER['REQUEST_METHOD'] !== "POST") {
        exitWithResponse(405);
    }
}


/**
 * Watchdog for Admin Ajax requests.
 * @return void
 */
function isAdminAjaxRequest() {
    $currentUser = getCurrentUser();
    if ($currentUser['user_type'] !== "admin") {
        exitWithResponse(403);
    } elseif (isTokenValid() == false) {
        exitWithResponse(400);
    }
}

/**
 * Check the user is root user or not.
 */
function isAdmin() {
    $currentUser = getCurrentUser();
    if ($currentUser['user_type'] !== "admin") {
        exitWithResponse(403);
    }
}

/**
 * Returns an array that represent current status.
 * @param number $statusCode The status code.
 * @return array 
 */
function getStatusArray($statusCode) {
    global $API_CODE;
    $status = array('statusCode'=>$statusCode, 'statusText'=>$API_CODE[$statusCode]);
    return $status;
}

/**
 * @param number $statusCode The status code.
 * @param array $data The response JSON data.
 *
 */
function exitWithResponse($statusCode, $data=array()) {
    header("Content-type: application/json");
    die(json_encode(getStatusArray($statusCode) + array('response'=>$data)));
}

/**
 * Verify a specified paramter in the POST .
 * @param mixed $param The paramter.
 * @return void
 */
function issetPostParam($params, $message = null) {
    $result = true;
    if (is_array($params)) {
        foreach($params as $v) {
            if (!isset($_POST[$v])) {
              $result = false;
              break;
            }
        }
    } elseif (is_string($params)) {
      $result = isset($_POST[$params]);
    }
    if(!$result) {
        $message = $message ? $message : array();
        exitWithResponse(400, $message);
    }
}

/**
 * Verify a specified paramter in the GET .
 * @param string $param The paramter.
 * @return void
 */
function issetGETParam($params, $message = null) {
    $result = true;
    if (is_array($params)) {
        foreach($params as $v) {
            if (!isset($_GET[$v])) {
              $result = false;
              break;
            }
        }
    } elseif (is_string($params)) {
      $result = isset($_GET[$params]);
    }
    if(!$result) {
        $message = $message ? $message : array();
        exitWithResponse(400, $message);
    }
}

/**
 * Verify a specified paramter in the GET or POST .
 * @param string $param The paramter.
 * @return void
 */
function issetRequestParam($param) {
    if(!isset($_REQUEST[$param])) {
        exitWithResponse(400);
    }
}

/**
 * Is GD Installed?
 * CI 1.7.2
 * @access  public
 * @return  bool
 */
function gd_loaded()
{
    if ( ! extension_loaded('gd'))
    {
        if ( ! @dl('gd.so')) {
            return FALSE;
        }
    }
    return TRUE;
}

/**
 * Get GD version
 *
 * @access  public
 * @return  mixed
 */
function gd_version()
{
    $gd_version=FALSE;
    if (defined('GD_VERSION')) {
        $gd_version=GD_VERSION;
    } elseif(function_exists('gd_info')) {
        $gd_version = @gd_info();
        $gd_version = $gd_version['GD Version'];
    }
    return $gd_version;
}

/**
 * Get IP of visitor
 *
 * @return string
 */
function getIP()
{
    $ip = $_SERVER['REMOTE_ADDR'];
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    $ip=$ip?$ip:'127.0.0.1';
    return $ip;
}

/**
 * Finds whether a value is a valid email
 *
 * @param string $value
 * @return bool
 */
function is_email($value)
{
    return preg_match('/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i', $value);
}

/**
 * Attach one event to an action
 *
 * @global array $actionEvent
 * @param string $action <p>The name of action</p>
 * @param mixed $evt <p>The name of event</p>
 */
function attachEvent($action,$evt)
{
    global $actionEvent;
    if (!@in_array($evt, $actionEvent[$action])) {
        $actionEvent[$action][]=$evt;
    }
}
/**
 * Trigger all events attached to the specified action
 * @global array $actionEvent
 * @param string $action
 * @param array $param
 */
function performEvent($action,$param=array())
{
    global $actionEvent;
    $functions=@$actionEvent[$action];
    if($functions){
        foreach($functions as $function){
            call_user_func_array($function, $param);
        }
    }
}

/**
 * Find the appropriate configuration directory.
 *
 * Try finding a matching configuration directory by stripping the website's
 * hostname from left to right and pathname from right to left. The first
 * configuration file found will be used; the remaining will ignored. If no
 * configuration file is found, return a default value '$confdir/default'.
 *
 * Example for a fictitious site installed at
 * http://www.drupal.org:8080/mysite/test/ the 'settings.php' is searched in
 * the following directories:
 *
 *  1. $confdir/8080.www.drupal.org.mysite.test
 *  2. $confdir/www.drupal.org.mysite.test
 *  3. $confdir/drupal.org.mysite.test
 *  4. $confdir/org.mysite.test
 *
 *  5. $confdir/8080.www.drupal.org.mysite
 *  6. $confdir/www.drupal.org.mysite
 *  7. $confdir/drupal.org.mysite
 *  8. $confdir/org.mysite
 *
 *  9. $confdir/8080.www.drupal.org
 * 10. $confdir/www.drupal.org
 * 11. $confdir/drupal.org
 * 12. $confdir/org
 *
 * 13. $confdir/default
 *
 * @param $require_settings
 *   Only configuration directories with an existing settings.php file
 *   will be recognized. Defaults to TRUE. During initial installation,
 *   this is set to FALSE so that Drupal can detect a matching directory,
 *   then create a new settings.php file in it.
 * @param reset
 *   Force a full search for matching directories even if one had been
 *   found previously.
 * @return
 *   The path of the matching directory.
 */
function conf_path($require_settings = TRUE, $reset = FALSE)
{
    static $conf = '';

    if ($conf && !$reset) {
        return $conf;
    }

    $confdir = 'sites';
    $uri = explode('/', $_SERVER['SCRIPT_NAME'] ? $_SERVER['SCRIPT_NAME'] : $_SERVER['SCRIPT_FILENAME']);
    $server = explode('.', implode('.', array_reverse(explode(':', rtrim($_SERVER['HTTP_HOST'], '.')))));
    for ($i = count($uri) - 1; $i > 0; $i--) {
        for ($j = count($server); $j > 0; $j--) {
            $dir = implode('.', array_slice($server, -$j)) . implode('.', array_slice($uri, 0, $i));
            if (file_exists("$confdir/$dir/config.php") || (!$require_settings && file_exists("$confdir/$dir"))) {
                $conf = "$confdir/$dir";
                return $conf;
            }
        }
    }
    $conf = "$confdir/default";
    return $conf;
}

/**
 * Finds whether an IP address is blocked by guest book
 *
 * @global string $db_url
 * @param string $ip
 * @return bool
 */
function is_baned($ip)
{
    global $db_url;
    $all_baned_ips=array();
    $db=YDB::factory($db_url);
    $result=$db->queryAll(sprintf(parse_tbprefix("SELECT * FROM <badip> WHERE ip='%s'"),$db->escape_string($ip)));
    if($result) {
        return true;
    }
    return false;
}

/**
 *
 *
 * @global string $db_prefix
 * @param string $str
 * @return string
 */
function parse_tbprefix($str)
{
    global $db_prefix;
    return strtr($str,array('<'=>$db_prefix,'>'=>''));
}

/**
 *
 * @param boolean $filter_words Defaults to TRUE
 * @param boolean $apply_filter Defaults to TRUE
 * @return array
 */
function formatComments($data, $filter_words=true, $stripTags=true) {
    foreach ($data as &$_data) {
        if ($stripTags && ZFramework::app()->filter_type == constant('FILTER_TRIPTAGS')) {
            $_data['post_content'] = strip_tags($_data['post_content'], ZFramework::app()->allowed_tags);
            $_data['reply_content'] = strip_tags($_data['reply_content'], ZFramework::app()->allowed_tags);
        } else {
            $_data['post_content'] =  htmlentities($_data['post_content'],ENT_COMPAT,'UTF-8');
            $_data['reply_content'] = htmlentities($_data['reply_content'],ENT_COMPAT,'UTF-8');
        }
        if($filter_words) {
            $_data['post_content']=filter_words($_data['post_content']);
        }
        $_data['time']=date('m-d H:i',$_data['time']+ZFramework::app()->timezone*60*60);
        $_data['reply_time']=date('m-d H:i',$_data['reply_time']+ZFramework::app()->timezone*60*60);
    }
    return $data;
}

/**
 * Filter words
 * @param array $input
 */
function filter_words($input)
{
    $filter_array=explode(',',  ZFramework::app()->filter_words);
    $input=str_ireplace($filter_array,'***',$input);
    return $input;
}

/**
 *
 * @param array $filter_words
 */
function fix_filter_string($filter_words)
{
    $new_string=trim($filter_words,',');
    $new_string=str_replace(array("\t","\r","\n",'  ',' '),'',$new_string);
    return $new_string;
}

/**
 * Gets supported RDBMS type
 *
 * @return array
 */
function get_supported_rdbms()
{
    $supported_rdbms=array();
    $rdbms_functions=array('mysql'=>'mysql_connect','mysqli'=>'mysqli_connect','sqlite'=>'sqlite_open', 'mssql'=>'sqlsrv_connect');
    $rdbms_names=array('mysql'=>'MySQL','mysqli'=>'MySQL Improved','sqlite'=>'SQLite', 'mssql'=>'Microsoft SQL Server');
    foreach ($rdbms_functions as $k => $v) {
        if(function_exists($v)){
            $supported_rdbms[$rdbms_names[$k]]=$k;
        }
    }
    return $supported_rdbms;
}
/**
 * Determine whether the app installed or not
 *
 * @return bool
 */
function is_installed()
{
    global $db_url;
    if($db_url=='dummydb://username:password@localhost/databasename') {
        return false;
    }
    return true;
}

function maple_quotes($var,$charset='UTF-8')
{
    return htmlspecialchars(trim($var),ENT_QUOTES,  $charset);
}

/**
 * Get specified config value
 * @param $name config name
 * @return mixed config value or NULL
 */
function getConfigVar($name)
{
    global $db_url;
    $db=YDB::factory($db_url);
    $result=$db->queryAll(sprintf(parse_tbprefix("SELECT * FROM <sysvar> WHERE varname='%s'"),  $db->escape_string($name)));
    $result=@$result[0]['varvalue'];
    if($result) {
        return $result;
    } else {
        return null;
    }
}

/**
 * Get all available themes
 */
function get_all_themes()
{
    $themes=array();
    $d=dir(THEMEDIR);
    while(false!==($entry=$d->read())){
        if(substr($entry,0,1)!='.') {
            $themes[$entry]=$entry;
        }
    }
    $d->close();
    return array_filter($themes,'_removeIndex');
}

/**
 * Get all available languages
 *
 * @return array
 */
function get_all_langs()
{
    $langs=array();
    $d=dir(APPROOT.'/languages/');
    while(false!==($entry=$d->read())){
        if(substr($entry,0,1)!='.') {
            $langs[substr($entry,0,-4)]=substr($entry,0,-4);
        }
    }
    $d->close();
    return array_filter($langs,'_removeIndex');
}

function _removeIndex($var){
    return (!($var == 'index' || $var == 'index.php'));
}

/**
 * Get all time zones.
 *
 * @return array
 */
function get_all_timezone() {
    $timezone=  include APPROOT.'/languages/'.getConfigVar('lang').'.php';
    return $timezone['TZ_ZONES'];
}

/**
 * Get specified language
 *
 * @param mixed $userSpecifiedLanguage
 * @return array
 */
function getLangArray($userSpecifiedLanguage=null) {
    if($userSpecifiedLanguage)
    {
        if(file_exists(APPROOT.'/languages/'.$userSpecifiedLanguage.'.php'))
        {
            return include APPROOT.'/languages/'.$userSpecifiedLanguage.'.php';
        }
    }
    return include APPROOT.'/languages/'.getConfigVar('lang').'.php';
}

/**
 * Get all available plugins
 *
 * @param boolean $loadPlugin
 * @return array
 */
function get_alll_plugins($loadPlugin=FALSE) {
    $plugins=array();
    $d=dir(PLUGINDIR);
    while(false!==($entry=$d->read())){
        if(substr($entry,0,1)!='.' && is_dir(PLUGINDIR.DIRECTORY_SEPARATOR.$entry)){
            $plugins[$entry]=$entry;
            if($loadPlugin){
                require_once PLUGINDIR.$entry.DIRECTORY_SEPARATOR.$entry.'.php';
            }
        }
    }
    $d->close();
    return array_filter($plugins,'_removeIndex');
}

/**
 * Translate one message
 *
 * @param mixed $message
 * @param array $params
 * @param mixed $userSpecifiedLanguage
 * @return string
 */
function t($message,$params=array(),$userSpecifiedLanguage=null) {
    $messages=getLangArray($userSpecifiedLanguage);
    if(isset ($messages[$message]) && $messages[$message]!=='') {
        $message=$messages[$message];
    }
    return $params!==array()?strtr($message, $params):$message;
}

/**
 * Un-quotes a string or an array
 *
 * @param mixed $value
 * @return mixed
 */
function stripslashes_deep($value)
{
    return is_array($value)?array_map('stripslashes_deep',$value):stripslashes($value);
}

/**
 * Unset all disabled global variables.
 * @return void
 */
function maple_unset_globals()
{
    if (ini_get('register_globals') && (strtolower(ini_get('register_globals'))!='off'))
    {
        $allowed = array('_ENV' => 1, '_GET' => 1, '_POST' => 1, '_COOKIE' => 1,'_SESSION'=>1,'_FILES' => 1, '_SERVER' => 1, '_REQUEST' => 1, 'GLOBALS' => 1);
        foreach ($GLOBALS as $key => $value)
        {
            if (!isset($allowed[$key])) {
                unset($GLOBALS[$key]);
            }
        }
    }
}

/**
 * Generates a base64-encoded token. Requires PHP 5.3.0 + , and with OpenSSL support.
 * @return string A base64-encoded token.
 */
function getToken() {
    return base64_encode(openssl_random_pseudo_bytes(32));
}

/**
 * Tests the token in the request header against the one that was generated.
 * @return bool Is the current token valid or not.
 */
function isTokenValid() {
    $headers = getallheaders();
    $requestToken = array_key_exists('RequestVerificationToken', $headers) ? $headers['RequestVerificationToken'] : null;
    return isset($_SESSION['token']) && ($requestToken === $_SESSION['token']);
}

/**
 * Hash the password.
 * @param string $password The password string provided by user.
 * @return string The hashed password string.
 */
function hashPassword($password) {
    $cost = 10;
    $salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_RANDOM)), '+', '.');
    $salt = sprintf("$2a$%02d$", $cost).$salt;
    $hash = crypt($password, $salt);
    return $hash;
}

/**
 * The hash_equals() function polyfill.
 * The hash_equals() function was introduced in PHP 5.6, if you are using older PHP versions, the following polyfill is required.
 * @param string $str1 The string to compare against.
 * @param string $str2 The user-supplied string
 * @return bool Returns TRUE if the two strings are equal, FALSE otherwise.
 */
if(!function_exists('hash_equals')) {
    function hash_equals($str1, $str2) {
        if(strlen($str1) != strlen($str2)) {
            return false;
        } else {
            $res = $str1 ^ $str2;
            $ret = 0;
            for($i = strlen($res) - 1; $i >= 0; $i--) {
                $ret |= ord($res[$i]);
            }
            return !$ret;
        }
    }
}

/**
 * This is a thin wrap of the hash_equals function to verify user password.
 * @param string $password The user-supplied password
 * @param string $hashStr The hashed string stored in database
 * @return bool Returns TRUE if the password is correct, FALSE otherwise.
 */
function verifyPassword($password, $hashStr) {
    return hash_equals($hashStr, crypt($password, $hashStr));
}

/**
 * Get current user's information.
 * @return array
 */
function getCurrentUser() {
    $result = array(
        'uid'       => -1,
        'user_type' => 'guest',
        'username'  => '',
        'email'     => ''
    );
    if (isset($_SESSION['uid'])) {
        $result['uid'] = $_SESSION['uid'];
    }
    if (isset($_SESSION['email'])) {
        $result['email'] = $_SESSION['email'];
    }
    if (isset($_SESSION['admin'])) {
        $result['user_type'] = 'admin';
        $result['username'] = $_SESSION['admin'];
    } elseif (isset($_SESSION['user'])) {
        $result['user_type'] = 'regular';
        $result['username'] = $_SESSION['user'];
    }
    return $result;
}