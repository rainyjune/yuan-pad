<?php
class BaseController{
    public function render($tplFile,$vars=NULL){
        if ($vars) {
            extract($vars);
        }
        $tplDir='themes/'.ZFramework::app()->theme.'/templates/';
        $file=$tplDir.$tplFile;
        if (file_exists($file.'.php')) {
            include $file.'.php';
        } else if (file_exists($file.'.html')) {
            include $file.'.html';
        }
    }
}

class ZFramework{
    protected   $_controller;
    protected   $_action;
    protected   $_controllerPath = 'controllers';
    public      $defaultController = 'SiteController';
    public      $defaultAction = 'actionIndex';
    static      $_instance;
    private     $_maintenanceSafeAPI = array(
                                             'SiteController/actionIndex',
                                             'SiteController/actionControl_panel',
                                             'ConfigController/actionShow',
                                             'ConfigController/actionGettranslations',
                                             'UserController/actionLogin');

    public static function app(){
        if(!(self::$_instance instanceof  self)){
            self::$_instance=new self();
        }
        return self::$_instance;
    }

    public function  __get($name) {
        return getConfigVar($name);
    }

    private function  __construct(){
        $this->_controller = !empty($_GET['controller']) ? ucfirst(strtolower($_GET['controller'])).'Controller' : $this->defaultController;
        $this->_action = !empty($_GET['action']) ? 'action'.ucfirst(strtolower($_GET['action'])) : $this->defaultAction;
    }

    public function run() {
        $thisController = $this->_controller;
        $thisAction = $this->_action;
        $currentUser = getCurrentUser();
        if(getConfigVar('site_close') == 1 && ($currentUser['user_type'] !== "admin") && !in_array($thisController.'/'.$thisAction, $this->_maintenanceSafeAPI)) {
            exitWithResponse(503, getConfigVar('close_reason'));
        }
        try {
            @include_once dirname(__FILE__).'/'.$this->_controllerPath.'/'.$thisController.'.php';
            if(class_exists($thisController)) {
                $rc=new ReflectionClass($thisController);
                if($rc->isSubclassOf('BaseController')) {
                    if($rc->hasMethod($thisAction)) {
                        get_all_plugins(TRUE);
                        $controller=$rc->newInstance();
                        $method=$rc->getMethod($thisAction);
                        $method->invoke($controller);
                    } else {
                        exitWithResponse(404);
                    }
                } else {
                    exitWithResponse(404);
                }
            } else {
                exitWithResponse(404);
            }
        } catch (Exception $e) {
            exitWithResponse(520);
        }
    }
}
