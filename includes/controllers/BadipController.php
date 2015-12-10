<?php
/**
 * Badip controller
 *
 * @author rainyjune <rainyjune@live.cn>
 * @version $Id$
 */
class BadipController extends BaseController
{
    public $_model;
    public function  __construct()
	{
        global $db_url;
        $this->_model=  YDB::factory($db_url);
    }
    public function actionCreate()
	{
        is_admin();
        $ip=@$_POST['ip'];
        if (valid_ip($ip)==false)
		{
            header("Location:index.php?action=control_panel&subtab=message");exit;
        }
        if(is_baned($ip))
		{
            header("Location:index.php?action=control_panel&subtab=ban_ip");exit;
        }
        $this->_model->query(sprintf(parse_tbprefix("INSERT INTO <badip> ( ip ) VALUES ( '%s' )"),$ip));
        if (defined('API_MODE')) {
          header("Content-type: application/json");
					$result=array('status'=>'OK');
          die(function_exists('json_encode') ? json_encode($result) : CJSON::encode($result));
        }
        header("Location:index.php?action=control_panel&subtab=ban_ip");
    }
    public function actionUpdate()
	{
        is_admin();
        @$ip_update_array=$_POST['select_ip'];
        if(!$ip_update_array)
		{
            header("Location:index.php?action=control_panel&subtab=ban_ip");exit;
        }
        foreach ($ip_update_array as $_ip)
		{
            $this->_model->query(sprintf(parse_tbprefix("DELETE FROM <badip> WHERE ip = '%s'"),$_ip));
        }
        header("Location:index.php?action=control_panel&subtab=ban_ip");
    }
}
