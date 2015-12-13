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
    public function  __construct() {
        global $db_url;
        $this->_model=  YDB::factory($db_url);
    }

    /**
     * Add an IP to the black list.
     */
    public function actionCreate() {
        isAdminAjaxRequest();
        is_post();
        if (!isset($_POST['ip']) || (valid_ip($_POST['ip']) == false)) {
            exitWithResponse(400);
        }
        $ip = $_POST['ip'];
        if(is_baned($ip)) {
            exitWithResponse(304);
        }
        $this->_model->query(sprintf(parse_tbprefix("INSERT INTO <badip> ( ip ) VALUES ( '%s' )"),$ip));
        exitWithResponse(200);
    }

    /**
     * Remove one or more IP from the black list.
     */
    public function actionUpdate() {
        isAdminAjaxRequest();
        is_post();
        if (!isset($_POST['select_ip'])) {
            exitWithResponse(400);
        }
        foreach ($_POST['select_ip'] as $_ip) {
            $this->_model->query(sprintf(parse_tbprefix("DELETE FROM <badip> WHERE ip = '%s'"),$_ip));
        }
        exitWithResponse(200);
    }
}
