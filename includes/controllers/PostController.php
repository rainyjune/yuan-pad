<?php
class PostController extends BaseController{
    public  $_model;
    public  $_verifyCode;
    public function  __construct(){
        global $db_url;
        $this->_model=  YDB::factory($db_url);
        $this->_verifyCode=new FLEA_Helper_ImgCode();
    }
    /**
     *
     * @return mixed
     */
    public function actionCreate() {
        is_post();
        issetPostParam('user');
        issetPostParam('content');
        
        //Validation
        $new_data_error_msg='';
        if ( !strlen(trim($_POST['user'])) || !strlen(trim($_POST['content']))) {
            $new_data_error_msg=t('FILL_NOT_COMPLETE');
        } elseif(strlen($_POST['content']>580)) {
            $new_data_error_msg=t('WORDS_TOO_LONG');
        } elseif (ZFramework::app()->valid_code_open==1 && gd_loaded() && !$this->_verifyCode->check(@$_POST['valid_code'])) {
            $new_data_error_msg=t('CAPTCHA_WRONG');
        }
        if($new_data_error_msg){
            exitWithResponse(400, $new_data_error_msg);
        }
        
        // Ready to send query to database
        $user=  $this->_model->escape_string($_POST['user']);
        if(!isset($_SESSION['admin']) && $_POST['user']==ZFramework::app()->admin ) {
            $user='anonymous';
        }
        $userExists =  $this->_model->queryAll(sprintf(parse_tbprefix("SELECT * FROM <sysuser> WHERE username='%s'"),  $this->_model->escape_string($_POST['user'])));
        if($userExists && (@$_SESSION['user']!=$_POST['user'])) {
            $user='anonymous';
        }
        $content = $this->_model->escape_string($_POST['content']);
        if(isset ($_SESSION['uid'])) {
            $sql_insert= sprintf (parse_tbprefix("INSERT INTO <post> ( uid , content , post_time , ip ) VALUES ( %d , '%s' , %d , '%s' )"), $_SESSION['uid'],$content,  time (),  getIp ());
        } else {
            $sql_insert = sprintf (parse_tbprefix("INSERT INTO <post> ( uname , content , post_time , ip ) VALUES ( '%s' ,'%s' , %d , '%s')"), $user,$content,  time (),  getIp ());
        }
        // Send query to database
        if(!$this->_model->query($sql_insert)) {
            exitWithResponse(500, array('response'=>$this->_model->error()));
        }
        performEvent('PostController/actionCreate',array($user,$content, time()+ZFramework::app()->timezone*60*60));
        $json_array=array('insert_id'=>  $this->_model->insert_id());
        exitWithResponse(200, $json_array);
    }
    
    public function actionUpdate(){
        isAdminAjaxRequest();
        is_post();
        issetPostParam('mid');
        issetPostParam('update_content');
        
        $mid=(int)$_POST['mid'];        
        $update_content = $this->_model->escape_string(str_replace(array("\n", "\r\n", "\r"), '', nl2br($_POST['update_content'])));
        $this->_model->query(sprintf(parse_tbprefix("UPDATE <post> SET content='%s' WHERE pid=%d"),$update_content,$mid));
        exitWithResponse(200, $json_array);
    }
    
    public function actionShow() {
        issetGETParam('mid');
        
        $mid=(int)$_GET['mid'];
        $message_info=$this->_model->queryAll(sprintf(parse_tbprefix("SELECT * FROM <post> WHERE pid=%d"),$mid));
        if(!$message_info){
            exitWithResponse(500, array('response'=> t('QUERY_ERROR')));
        }
        $message_info=$message_info[0];
        exitWithResponse(200, array('response'=> $message_info));
    }
    
    public function actionDelete() {
        isAdminAjaxRequest();
        is_post();
        issetPostParam('mid');
        
        $mid = (int)$_POST['mid'];
        $this->_model->query(parse_tbprefix("DELETE FROM <post> WHERE pid=$mid"));
        $this->_model->query(parse_tbprefix("DELETE FROM <reply> WHERE pid=$mid"));
        exitWithResponse(200);
    }
    
    public  function actionDelete_multi_messages(){
        isAdminAjaxRequest();
        is_post();
        issetPostParam('select_mid');
        
        $del_ids = $_POST['select_mid'];
        foreach($del_ids as $deleted_id) {
            $this->_model->query(parse_tbprefix("DELETE FROM <post> WHERE pid=$deleted_id"));
            $this->_model->query(parse_tbprefix("DELETE FROM <reply> WHERE pid=$deleted_id"));
        }
        exitWithResponse(200);
    }

    public  function actionDeleteAll() {
        isAdminAjaxRequest();
        is_post();
        
        $this->_model->query(parse_tbprefix("DELETE FROM <post>"));
        $this->_model->query(parse_tbprefix("DELETE FROM <reply>"));
        exitWithResponse(200);
    }

    public function actionList() {
        $result = array();
        $isPaginationOn = (bool)getConfigVar('page_on');
        $paginationSize = (int)getConfigVar('num_perpage');
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 0;
        $sql = parse_tbprefix("SELECT p.pid AS id, p.ip AS ip , p.uid AS uid ,p.uname AS uname,p.content AS post_content,p.post_time AS time,r.content AS reply_content,r.r_time AS reply_time ,u.username AS b_username FROM <post> AS p LEFT JOIN <reply> AS r ON p.pid=r.pid LEFT JOIN <sysuser> AS u ON p.uid=u.uid ORDER BY p.pid DESC");
        if ($isPaginationOn) {
            $offset = $page * $paginationSize;
            $commentsArr = $this->_model->queryWithLimit($sql, $offset, $paginationSize);
        } else {
            $commentsArr = $this->_model->queryAll($sql);
        }
        $countSql = parse_tbprefix("SELECT * FROM <post>");
        $result['total'] = $this->_model->num_rows($this->_model->query($countSql));
        $result['comments'] = formatComments($commentsArr);
        $statusCode = count($result['comments']) ? 200 : 404;
        exitWithResponse($statusCode, $result);
    }
}
