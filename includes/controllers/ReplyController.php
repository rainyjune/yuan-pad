<?php
class ReplyController extends BaseController{
    public $_model;
    public function  __construct(){
        global $db_url;
        $this->_model=  YDB::factory($db_url);
    }
    
    public function actionReply(){
        isAdminAjaxRequest();
        is_post();
        issetPostParam('mid');
        issetPostParam('content');

        $mid=(int)$_POST['mid'];
        $reply_content = $this->_model->escape_string(str_replace(array("\n", "\r\n", "\r"), '', nl2br($_POST['content'])));
        
        if (trim($reply_content)=='') {
            exitWithResponse(400, array('response'=>t('REPLY_EMPTY')));
        }
        if(isset($_POST['update'])) {
            $this->_model->query(sprintf(parse_tbprefix("UPDATE <reply> SET content='%s' WHERE pid=%d"),$reply_content,$mid));
        } else {
            $this->_model->query(sprintf(parse_tbprefix("INSERT INTO <reply> ( pid , content , r_time ) VALUES ( %d , '%s' , %d )"),$mid,$reply_content,time()));
        }
        exitWithResponse(200);
    }
    
    public function actionShow() {
        isAdminAjaxRequest();
        issetGETParam('mid');
        $reply_data=$this->loadModel();
        exitWithResponse(200, array('response'=>$reply_data));
    }

    protected function loadModel() {
        $mid=(int)$_GET['mid'];
        $reply_data=$this->_model->queryAll(sprintf(parse_tbprefix("SELECT * FROM <reply> WHERE pid=%d"),$mid));
        if($reply_data) {
            $reply_data=$reply_data[0];
        }
        return $reply_data;
    }

    public  function actionDelete(){
        isAdminAjaxRequest();
        is_post();
        issetPostParam('mid');
        
        $mid = (int)$_POST['mid'];
        $this->_model->query(sprintf(parse_tbprefix("DELETE FROM <reply> WHERE pid=%d"),$mid));
        exitWithResponse(200);
    }

    public  function actionDeleteAll(){
        isAdminAjaxRequest();
        is_post();
        $this->_model->query(parse_tbprefix("DELETE FROM <reply>"));
        exitWithResponse(200);
    }
}
