<?php
class SearchController extends BaseController{
    protected $_db;
    public function  __construct() {
        global $db_url;
        $this->_db=YDB::factory($db_url);
    }
    
    public function actionIndex(){
        issetRequestParam('s');
        
        $s = trim($_REQUEST['s']);
        $sql=sprintf(parse_tbprefix("SELECT p.pid AS id, p.ip AS ip , p.uid AS uid ,p.uname AS uname,p.content AS post_content,p.post_time AS time,r.content AS reply_content,r.r_time AS reply_time ,u.username AS b_username FROM <post> AS p LEFT JOIN <reply> AS r ON p.pid=r.pid LEFT JOIN <sysuser> AS u ON p.uid=u.uid WHERE p.content LIKE '%%%s%%' OR r.content LIKE '%%%s%%' ORDER BY p.post_time DESC"), $s, $s);
        $result_array=$this->_db->queryAll($sql);
        $statusCode = count($result_array) ? 200 : 404;
        exitWithResponse($statusCode,$result_array);
    }
}
