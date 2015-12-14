<?php
class BaseController{
    public function render($tplFile,$vars=NULL){
        if ($vars) {
            extract($vars);
        }
        $tplDir='themes/'.ZFramework::app()->theme.'/templates/';
        $file=$tplDir.$tplFile;
        include $file.'.php';
    }
}

class ZFramework{
    protected   $_controller;
    protected   $_action;
    protected   $_params;
    protected   $_controllerPath='controllers';
    public      $defaultController='SiteController';
    public      $defaultAction='actionIndex';
    static      $_instance;

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
        $this->preloadAllControllers();
        $this->_controller=!empty ($_GET['controller'])?ucfirst($_GET['controller']).'Controller':$this->defaultController;
        $this->_action=!empty ($_GET['action'])?'action'.ucfirst($_GET['action']):$this->defaultAction;
        foreach ($_GET as $key=>$value) {
            $this->_params[$key]=$value;
        }
    }

    protected function preloadAllControllers(){
        $dir=dirname(__FILE__).'/'.$this->_controllerPath;
        $d=dir($dir);
        while(false !==($entry=$d->read())){
            if(substr($entry, 0, 1)!='.'){
                include_once $dir.'/'.$entry;
            }
        }
        $d->close();
    }

    public function run() {
        try {
            if(class_exists($this->getController())) {
                $rc=new ReflectionClass($this->getController());
                if($rc->isSubclassOf('BaseController')) {
                    if($rc->hasMethod($this->getAction())) {
                        get_alll_plugins(TRUE);
                        $controller=$rc->newInstance();
                        $method=$rc->getMethod($this->getAction());
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

    public function getParams(){
        return $this->_params;
    }

    public function getController(){
        return $this->_controller;
    }

    public function getAction(){
        return $this->_action;
    }
}
